import { z } from "zod";

/**
 * Il modulo accompagna chi scrive invece di lasciarlo davanti a una casella
 * vuota: il tipo di intervento e il punto a cui si trova sono scelte, non
 * testo libero, e il messaggio è facoltativo. Chi non sa ancora cosa dire
 * riesce comunque a mandare una richiesta utile.
 */
export const INTERVENTION_TYPES = [
  "Ristrutturazione di un immobile",
  "Nuova costruzione",
  "Demolizione e ricostruzione",
  "Cambio di destinazione d'uso",
  "Recupero o riqualificazione",
  "Non lo so ancora",
] as const;

export const PROJECT_STAGES = [
  "Ho solo un'idea",
  "Ho già l'immobile o il terreno",
  "Ho già un progetto e mi serve chi lo segua",
  "Devo capire se è fattibile",
] as const;

/**
 * Il recapito è un campo solo: ci si può scrivere un telefono oppure
 * un'email. Va quindi riconosciuto quale dei due è, e va fatto con la mano
 * leggera: rifiutare il recapito di una persona vera costa molto più che
 * accettarne uno strano, perché la richiesta si perde e nessuno lo scopre.
 *
 * Email: basta che ci sia una chiocciola con qualcosa prima, un punto dopo e
 * un'estensione di almeno due lettere. Niente controlli sulla sintassi
 * completa, che rifiuterebbero indirizzi legittimi.
 *
 * Telefono: si tolgono spazi, punti, trattini, barre e parentesi, come li
 * scrive la gente, e restano solo le cifre. Devono essere da nove a quindici
 * (quindici è il massimo internazionale) e il numero deve cominciare con +,
 * con 0 o con 3, che copre fissi e cellulari italiani e i prefissi esteri
 * scritti per esteso. Otto cifre come "34828688" non bastano: un numero così
 * non è chiamabile.
 */
const EMAIL = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

export const CONTACT_ERROR = "Serve un numero di telefono o un'email a cui possiamo risponderti.";

export function isPlausibleContact(value: string): boolean {
  const pulito = value.trim();
  if (pulito.length < 5 || pulito.length > 200) return false;
  if (pulito.includes("@")) return EMAIL.test(pulito);

  const cifre = pulito.replace(/[\s.\-/()]/g, "");
  if (!/^\+?\d{9,15}$/.test(cifre)) return false;
  return /^[+03]/.test(cifre);
}

/** Un nome fatto solo di cifre o di punteggiatura non è un nome. */
export const NAME_ERROR = "Inserisci il tuo nome.";

export function isPlausibleName(value: string): boolean {
  const pulito = value.trim();
  return pulito.length >= 2 && pulito.length <= 120 && /\p{L}/u.test(pulito);
}

export const contactFormSchema = z.object({
  name: z.string().trim().refine(isPlausibleName, { message: NAME_ERROR }),
  contact: z.string().trim().refine(isPlausibleContact, { message: CONTACT_ERROR }),
  interventionType: z.enum(INTERVENTION_TYPES, {
    message: "Scegli il tipo di intervento.",
  }),
  stage: z.enum(PROJECT_STAGES).optional(),
  place: z.string().trim().max(200).optional(),
  // Facoltativo: le domande guidate raccolgono già l'essenziale.
  message: z.string().trim().max(4000).optional(),
  // Progetto da cui è partita la richiesta, quando si scrive da una scheda.
  reference: z.string().trim().max(200).optional(),
  consent: z.boolean().refine((v) => v === true, {
    message: "Devi accettare il trattamento dei dati per inviare il modulo.",
  }),
  website: z.string().max(0, "Richiesta non valida.").optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type InterventionType = (typeof INTERVENTION_TYPES)[number];
