/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { POST } from "@/app/api/contatti/route";

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
  interventionType: "Ristrutturazione",
  message: "Vorrei una consulenza per ristrutturare casa.",
  consent: true,
};

describe("POST /api/contatti", () => {
  it("returns 200 for a valid payload", async () => {
    const response = await POST(makeRequest(validPayload, "198.51.100.10"));
    expect(response.status).toBe(200);
    const json = await response.json();
    expect(json.ok).toBe(true);
  });

  it("returns 400 for an invalid payload", async () => {
    const response = await POST(makeRequest({ ...validPayload, consent: false }, "198.51.100.11"));
    expect(response.status).toBe(400);
  });

  it("silently accepts but does not process honeypot submissions", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, website: "http://spam.example" }, "198.51.100.12")
    );
    expect(response.status).toBe(200);
  });

  it("returns 429 after exceeding the rate limit for one IP", async () => {
    const ip = "198.51.100.13";
    for (let i = 0; i < 5; i++) {
      await POST(makeRequest(validPayload, ip));
    }
    const response = await POST(makeRequest(validPayload, ip));
    expect(response.status).toBe(429);
  });
});
