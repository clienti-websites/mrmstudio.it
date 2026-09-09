import { sendContactEmail, contactFailureMessage } from "@/lib/email";
import { SITE } from "@/lib/site";

const validInput = {
  name: "Mario Rossi",
  contact: "mario@example.com",
  interventionType: "Ristrutturazione",
  message: "Vorrei una consulenza per ristrutturare casa.",
};

describe("sendContactEmail", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("returns false without calling fetch when RESEND_API_KEY is missing", async () => {
    delete process.env.RESEND_API_KEY;
    process.env.CONTACT_TO_EMAIL = "studio@example.com";
    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    const result = await sendContactEmail(validInput);

    expect(result).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns false without calling fetch when CONTACT_TO_EMAIL is missing", async () => {
    process.env.RESEND_API_KEY = "test-key";
    delete process.env.CONTACT_TO_EMAIL;
    const fetchMock = jest.fn();
    global.fetch = fetchMock;

    const result = await sendContactEmail(validInput);

    expect(result).toBe(false);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns true when the transport is configured and the provider accepts the request", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "studio@example.com";
    global.fetch = jest.fn().mockResolvedValue({ ok: true });

    const result = await sendContactEmail(validInput);

    expect(result).toBe(true);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-key" }),
      })
    );
  });

  it("returns false when the provider responds with a non-2xx status", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "studio@example.com";
    global.fetch = jest.fn().mockResolvedValue({ ok: false });

    const result = await sendContactEmail(validInput);

    expect(result).toBe(false);
  });

  it("returns false when fetch throws (network failure)", async () => {
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_TO_EMAIL = "studio@example.com";
    global.fetch = jest.fn().mockRejectedValue(new Error("network error"));

    const result = await sendContactEmail(validInput);

    expect(result).toBe(false);
  });
});

describe("contactFailureMessage", () => {
  it("includes both offices' phone numbers and the studio email so the lead isn't lost", () => {
    const message = contactFailureMessage();

    expect(message).toContain(SITE.offices[0].phoneDisplay);
    expect(message).toContain(SITE.offices[1].phoneDisplay);
    expect(message).toContain(SITE.email);
  });
});
