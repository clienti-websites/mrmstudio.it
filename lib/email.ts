import { SITE } from "@/lib/site";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export interface ContactEmailInput {
  name: string;
  contact: string;
  interventionType: string;
  message: string;
}

/**
 * Sends the contact-form enquiry via Resend's REST API using a plain `fetch`
 * call — no SDK dependency, provider-agnostic by design (any transport that
 * accepts a single POST could be swapped in behind this function).
 *
 * Returns `false` whenever the message cannot be CONFIRMED sent: missing
 * `RESEND_API_KEY`/`CONTACT_TO_EMAIL` configuration, a non-2xx response from
 * the provider, or a network failure. The caller must treat `false` as "the
 * enquiry was lost" and tell the sender honestly — never report success on a
 * guess.
 */
export async function sendContactEmail(input: ContactEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    return false;
  }

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: `${SITE.name} <no-reply@${new URL(SITE.url).hostname}>`,
        to: [to],
        subject: `Nuova richiesta dal sito — ${input.interventionType}`,
        text: [
          `Nome: ${input.name}`,
          `Contatto: ${input.contact}`,
          `Tipo di intervento: ${input.interventionType}`,
          "",
          input.message,
        ].join("\n"),
      }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

/**
 * Honest Italian copy shown to the enquirer when the email transport isn't
 * configured or the send failed, carrying every real contact channel from
 * lib/site.ts so the lead isn't lost even though the form itself failed.
 */
export function contactFailureMessage(): string {
  const phones = SITE.offices.map((office) => `${office.city} ${office.phoneDisplay}`).join(", ");
  return `Non siamo riusciti a inviare il messaggio. Contattaci direttamente: ${phones}, oppure scrivi a ${SITE.email}.`;
}
