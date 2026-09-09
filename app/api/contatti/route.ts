import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

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

  // Nessun invio email nell'MVP: il messaggio viene registrato lato server.
  console.info("Nuovo contatto MRM Studio", {
    name: parsed.data.name,
    contact: parsed.data.contact,
    interventionType: parsed.data.interventionType,
  });

  return NextResponse.json({ ok: true });
}
