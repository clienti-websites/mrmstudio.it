import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";
import { sendContactEmail, contactFailureMessage } from "@/lib/email";

// Prefer platform-set headers that a proxy in front of Next.js controls
// over `x-forwarded-for`, whose left-most entry is client-suppliable and
// therefore spoofable (a real fix needs deployment-specific proxy-trust
// config this project doesn't have). When no IP can be determined at all,
// `isRateLimited` fails open rather than collapsing every such visitor
// into one shared "unknown" bucket.
function resolveClientIp(request: NextRequest): string | null {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    null
  );
}

export async function POST(request: NextRequest) {
  const ip = resolveClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Troppe richieste. Riprova tra qualche minuto." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);

  if (body && typeof body === "object" && (body as Record<string, unknown>).website) {
    // Honeypot compilato da un bot: risposta positiva fittizia, nessun invio reale.
    // Controllato prima della validazione perché lo schema rifiuta un honeypot
    // non vuoto (vedi lib/validation.ts), il che darebbe altrimenti un 400
    // distinguibile da una risposta di successo e rivelerebbe il filtro al bot.
    return NextResponse.json({ ok: true });
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dati non validi.", issues: parsed.error.flatten() }, { status: 400 });
  }

  const sent = await sendContactEmail({
    name: parsed.data.name,
    contact: parsed.data.contact,
    interventionType: parsed.data.interventionType,
    message: parsed.data.message,
  });

  // No personal data logged (no name/contact/message) — only that a
  // submission occurred and whether the send succeeded.
  console.info("Contatti: richiesta ricevuta", { sent });

  if (!sent) {
    return NextResponse.json({ error: contactFailureMessage() }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
