import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";

export interface ContactEmailInput {
  name: string;
  contact: string;
  interventionType: string;
  stage?: string;
  place?: string;
  message?: string;
  reference?: string;
}

/**
 * I tempi di attesa stanno sotto il tetto di tempo del server (dieci
 * secondi, valore prudenziale): se il server di posta non risponde vogliamo un
 * errore leggibile da qui, non un 504 anonimo deciso dalla piattaforma a
 * cose già andate.
 *
 * Niente riuso delle connessioni: in un ambiente dove ogni richiesta può
 * girare su un processo diverso non porta vantaggi e aggiunge stati da
 * gestire.
 */
const ATTESE = {
  connectionTimeout: 5_000,
  greetingTimeout: 5_000,
  socketTimeout: 8_000,
} as const;

/** Serve solo a decidere se si può rispondere direttamente al mittente. */
function sembraEmail(valore: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(valore.trim());
}

function leggiConfigurazione() {
  const host = process.env.SMTP_HOST;
  const porta = Number(process.env.SMTP_PORT ?? 465);
  const utente = process.env.SMTP_USER;
  const password = process.env.SMTP_PASS;
  const destinatario = process.env.CONTACT_TO_EMAIL;
  const mittente = process.env.CONTACT_FROM_EMAIL;

  if (!host || !utente || !password || !destinatario || !mittente) return null;
  return { host, porta, utente, password, destinatario, mittente };
}

/**
 * Consegna la richiesta alla casella dello studio via SMTP.
 *
 * Restituisce `false` ogni volta che la consegna non è CONFERMATA:
 * configurazione incompleta, rifiuto del server di posta, tempo scaduto. Chi
 * chiama deve trattare `false` come "non è arrivata" e dirlo, senza mai
 * dichiarare un successo che non c'è stato.
 */
export async function sendContactEmail(input: ContactEmailInput): Promise<boolean> {
  const config = leggiConfigurazione();
  if (!config) return false;

  // La 465 parla cifrato dal primo byte; sulla 587 la cifratura si negozia
  // dopo il saluto, ed è la porta di ripiego se la 465 è chiusa in uscita.
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.porta,
    secure: config.porta === 465,
    requireTLS: config.porta !== 465,
    auth: { user: config.utente, pass: config.password },
    pool: false,
    ...ATTESE,
  });

  const oggetto = input.reference
    ? `Nuova richiesta dal sito — ${input.interventionType} (da ${input.reference})`
    : `Nuova richiesta dal sito — ${input.interventionType}`;

  const testo = [
    `Nome: ${input.name}`,
    `Contatto: ${input.contact}`,
    `Tipo di intervento: ${input.interventionType}`,
    input.stage ? `A che punto è: ${input.stage}` : null,
    input.place ? `Dove: ${input.place}` : null,
    input.reference ? `Arriva dalla scheda: ${input.reference}` : null,
    input.message ? `\n${input.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await transporter.sendMail({
      // Il mittente è sempre la casella dello studio: scrivere qui
      // l'indirizzo del visitatore farebbe fallire i controlli SPF e DMARC
      // del dominio e manderebbe la richiesta nella posta indesiderata.
      from: `${SITE.name} <${config.mittente}>`,
      to: config.destinatario,
      // Rispondere alla mail arriva al visitatore, ma solo se ha lasciato
      // un'email: se ha lasciato un numero non c'è niente a cui rispondere.
      ...(sembraEmail(input.contact) ? { replyTo: input.contact } : {}),
      subject: oggetto,
      text: testo,
    });
    return true;
  } catch {
    return false;
  } finally {
    transporter.close();
  }
}

/**
 * Testo mostrato a chi scrive quando la consegna non è confermata: porta con
 * sé tutti i recapiti veri, così la richiesta non si perde comunque.
 */
export function contactFailureMessage(): string {
  const phones = SITE.offices.map((office) => `${office.city} ${office.phoneDisplay}`).join(", ");
  return `Non siamo riusciti a inviare il messaggio. Contattaci direttamente: ${phones}, oppure scrivi a ${SITE.email}.`;
}
