/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { POST } from "@/app/api/contatti/route";
import { SITE } from "@/lib/site";

jest.mock("nodemailer");

const inviaMock = jest.fn();
const creaTransport = nodemailer.createTransport as unknown as jest.Mock;

// Configurazione SMTP completa: senza, la route risponde 502 a prescindere.
const SMTP = {
  SMTP_HOST: "smtps.aruba.it",
  SMTP_PORT: "465",
  SMTP_USER: "studio@example.com",
  SMTP_PASS: "segreta",
  CONTACT_TO_EMAIL: "studio@example.com",
  CONTACT_FROM_EMAIL: "no-reply@example.com",
};

function makeRequest(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/contatti", {
    method: "POST",
    // Solo l'intestazione impostata dal proxy: quella dichiarata dal
    // chiamante non viene più consultata, apposta.
    headers: { "content-type": "application/json", "x-real-ip": ip },
    body: JSON.stringify(body),
  });
}

const validPayload = {
  name: "Mario Rossi",
  contact: "mario@example.com",
  interventionType: "Ristrutturazione di un immobile",
  message: "Vorrei una consulenza per ristrutturare casa.",
  consent: true,
};

describe("POST /api/contatti", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, ...SMTP };
    inviaMock.mockResolvedValue({ accepted: ["studio@example.com"] });
    creaTransport.mockReturnValue({ sendMail: inviaMock, close: jest.fn() });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns 200 and actually sends the email when the transport is configured and succeeds", async () => {
    const response = await POST(makeRequest(validPayload, "198.51.100.10"));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
    expect(inviaMock).toHaveBeenCalledTimes(1);
    expect(inviaMock.mock.calls[0][0].to).toBe("studio@example.com");
  });

  it("returns 400 for an invalid payload", async () => {
    const response = await POST(makeRequest({ ...validPayload, consent: false }, "198.51.100.11"));
    expect(response.status).toBe(400);
  });

  it("silently accepts but does not process or email honeypot submissions", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, website: "http://spam.example" }, "198.51.100.12")
    );
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
    expect(inviaMock).not.toHaveBeenCalled();
  });

  it("returns 429 after exceeding the rate limit for one IP", async () => {
    const ip = "198.51.100.13";
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload, ip));
    }
    const response = await POST(makeRequest(validPayload, ip));
    expect(response.status).toBe(429);
  });

  it("returns an honest 5xx with real contact details when the email transport isn't configured", async () => {
    process.env.SMTP_HOST = "";
    process.env.CONTACT_TO_EMAIL = "";

    const response = await POST(makeRequest(validPayload, "198.51.100.14"));

    expect(response.status).toBeGreaterThanOrEqual(500);
    const json = await response.json();
    expect(json.ok).not.toBe(true);
    expect(json.error).toEqual(expect.stringContaining(SITE.email));
    expect(json.error).toEqual(expect.stringContaining(SITE.offices[0].phoneDisplay));
    expect(json.error).toEqual(expect.stringContaining(SITE.offices[1].phoneDisplay));
  });

  it("returns an honest 5xx with real contact details when the provider send fails", async () => {
    inviaMock.mockRejectedValue(new Error("il server di posta rifiuta"));

    const response = await POST(makeRequest(validPayload, "198.51.100.15"));

    expect(response.status).toBeGreaterThanOrEqual(500);
    const json = await response.json();
    expect(json.ok).not.toBe(true);
    expect(json.error).toEqual(expect.stringContaining(SITE.email));
  });

  it("ignora x-forwarded-for, che il chiamante puo' dichiarare a piacere", async () => {
    // Sei invii con la stessa provenienza reale ma un x-forwarded-for
    // sempre diverso: se fosse ancora consultato, il limite non scatterebbe.
    const risposte = [];
    for (let i = 0; i < 6; i++) {
      const richiesta = new NextRequest("http://localhost/api/contatti", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-real-ip": "203.0.113.99",
          "x-forwarded-for": `198.51.100.${i}`,
        },
        body: JSON.stringify(validPayload),
      });
      risposte.push((await POST(richiesta)).status);
    }

    expect(risposte).toContain(429);
  });
});
