import { contactFormSchema } from "@/lib/validation";

const validPayload = {
  name: "Mario Rossi",
  contact: "mario@example.com",
  interventionType: "Ristrutturazione di un immobile",
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

  it("accepts a request with no free-text message at all", () => {
    // The guided questions carry the useful information, so someone who
    // doesn't know what to write can still send a usable enquiry.
    const { message, ...withoutMessage } = validPayload;
    void message;
    expect(contactFormSchema.safeParse(withoutMessage).success).toBe(true);
  });

  it("rejects an intervention type that isn't one of the offered options", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, interventionType: "qualcosa d'altro" });
    expect(result.success).toBe(false);
  });

  it("keeps the originating project when the request comes from a project page", () => {
    const result = contactFormSchema.safeParse({ ...validPayload, reference: "Via Venezia" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.reference).toBe("Via Venezia");
  });
});
