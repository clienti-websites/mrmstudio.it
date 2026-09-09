import { contactFormSchema } from "@/lib/validation";

const validPayload = {
  name: "Mario Rossi",
  contact: "mario@example.com",
  interventionType: "Ristrutturazione",
  message: "Vorrei una consulenza per ristrutturare casa.",
  consent: true,
};

describe("contactFormSchema", () => {
  it("accepts a fully valid payload", () => {
    expect(contactFormSchema.safeParse(validPayload).success).toBe(true);
  });

  it("rejects consent: false", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, consent: false });
    expect(result.success).toBe(false);
  });

  it("rejects a filled honeypot field", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, website: "http://spam.example" });
    expect(result.success).toBe(false);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, message: "Ciao" });
    expect(result.success).toBe(false);
  });
});
