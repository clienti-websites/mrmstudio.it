/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contatti/route";
import { SITE } from "@/lib/site";

function makeRequest(body: unknown, ip: string) {
  return new NextRequest("http://localhost/api/contatti", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
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
    process.env = { ...originalEnv, RESEND_API_KEY: "test-key", CONTACT_TO_EMAIL: "studio@example.com" };
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns 200 and actually sends the email when the transport is configured and succeeds", async () => {
    const response = await POST(makeRequest(validPayload, "198.51.100.10"));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith("https://api.resend.com/emails", expect.objectContaining({ method: "POST" }));
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
    expect(global.fetch).not.toHaveBeenCalled();
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
    process.env.RESEND_API_KEY = "";
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
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    const response = await POST(makeRequest(validPayload, "198.51.100.15"));

    expect(response.status).toBeGreaterThanOrEqual(500);
    const json = await response.json();
    expect(json.ok).not.toBe(true);
    expect(json.error).toEqual(expect.stringContaining(SITE.email));
  });
});
