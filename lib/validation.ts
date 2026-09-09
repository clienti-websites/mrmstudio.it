import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Inserisci il tuo nome.").max(120),
  contact: z.string().trim().min(5, "Inserisci un telefono o un'email.").max(200),
  interventionType: z.string().trim().min(2, "Indica il tipo di intervento.").max(200),
  message: z.string().trim().min(10, "Il messaggio è troppo breve.").max(4000),
  consent: z.boolean().refine((v) => v === true, {
    message: "Devi accettare il trattamento dei dati per inviare il modulo.",
  }),
  website: z.string().max(0, "Richiesta non valida.").optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
