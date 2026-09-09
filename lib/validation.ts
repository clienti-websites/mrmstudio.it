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

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Inserisci il tuo nome.").max(120),
  contact: z.string().trim().min(5, "Inserisci un telefono o un'email.").max(200),
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
