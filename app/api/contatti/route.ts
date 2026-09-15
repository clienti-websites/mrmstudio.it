import { NextRequest, NextResponse } from "next/server";

// nodemailer apre una connessione TCP verso il server di posta: gira solo
// sul runtime Node, non su Edge. Dichiararlo evita che una configurazione
// futura sposti la route senza che nessuno se ne accorga.
export const runtime = "nodejs";
import { contactFormSchema } from "@/lib/validation";
import { isRateLimited } from "@/lib/rateLimit";
import { sendContactEmail, contactFailureMessage } from "@/lib/email";
import { dimenticaRichiesta, salvaRichiesta } from "@/lib/richieste";

// Solo `x-real-ip`, che imposta il proxy davanti al sito e che il chiamante
// non può falsificare perché viene sovrascritto a ogni richiesta.
//
// `x-forwarded-for` non viene più consultato: la sua prima voce la scrive
// chi chiama, quindi bastava dichiararne una diversa a ogni invio per
// aggirare del tutto il limite di frequenza.
//
// Se l'indirizzo non si ricava, `isRateLimited` lascia passare invece di
// mettere tutti nello stesso secchio: il filtro anti-automatismi resta la
// difesa principale.
//
// NOTA PER L'INSTALLAZIONE: il proxy davanti a Node (nginx, Caddy o simili)
// deve impostare `X-Real-IP`. Senza, il limite di frequenza non si applica.
function resolveClientIp(request: NextRequest): string | null {
  return request.headers.get("x-real-ip")?.trim() || null;
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

  const dati = {
    name: parsed.data.name,
    contact: parsed.data.contact,
    interventionType: parsed.data.interventionType,
    stage: parsed.data.stage,
    place: parsed.data.place,
    message: parsed.data.message,
    reference: parsed.data.reference,
  };

  // Prima si mette al sicuro, poi si tenta la consegna. Se la cartella non è
  // configurata o non è scrivibile, `copia` è null e più avanti non si potrà
  // dire a chi ha scritto che la richiesta è arrivata.
  const copia = await salvaRichiesta({ ...dati, consent: parsed.data.consent });

  const sent = await sendContactEmail(dati);

  // Consegnata: la copia di sicurezza ha finito il suo compito e va tolta,
  // così nella cartella restano soltanto le richieste che non sono arrivate.
  if (sent && copia) await dimenticaRichiesta(copia);

  // Nessun dato personale nei registri tecnici: solo che una richiesta è
  // passata di qui, se era stata messa al sicuro e se la consegna è riuscita.
  console.info("Contatti: richiesta ricevuta", { protetta: copia !== null, sent });

  // La consegna è fallita ma la richiesta è su disco: dire che è arrivata è
  // vero, e sarà lo studio a leggerla dalla cartella.
  if (!sent && !copia) {
    return NextResponse.json({ error: contactFailureMessage() }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
