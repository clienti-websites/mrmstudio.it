"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CONTACT_ERROR,
  INTERVENTION_TYPES,
  NAME_ERROR,
  PROJECT_STAGES,
  isPlausibleContact,
  isPlausibleName,
} from "@/lib/validation";
import { InterventoIcon } from "./InterventoIcon";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass = "border border-nebbia bg-carta px-3 py-2 text-grafite";
// Il campo sbagliato si distingue per il bordo più marcato, non per il solo
// colore: accanto compare comunque il testo che dice cosa manca.
const erroreFieldClass = "border-2 border-muschio bg-carta px-3 py-2 text-grafite";
const STEPS = ["Di cosa si tratta?", "A che punto sei?", "Come ti contattiamo?"] as const;

/**
 * Modulo in tre passi. Una domanda per volta: chi non ha vocabolario tecnico
 * si blocca davanti a un modulo lungo, mentre risponde volentieri a una
 * domanda semplice alla volta. Tutti i passi restano montati (nascosti con
 * `hidden`) così i valori già inseriti finiscono comunque nel FormData.
 *
 * `reference` è il progetto da cui arriva la richiesta: chi scrive dalla
 * scheda di un'opera non deve spiegare a cosa si riferisce.
 */
export function ContactForm({ reference }: { reference?: string }) {
  // Il riferimento si puo' sganciare: chi sta guardando un progetto ma
  // vuole chiedere altro non deve subirsi un modulo intestato a un'opera
  // che non c'entra, ne' andare a cercare un modulo neutro altrove.
  const [linkedProject, setLinkedProject] = useState(reference);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Errori per campo, mostrati sotto il campo invece che come un unico
  // "dati non validi" in fondo: chi sbaglia deve sapere dove.
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; contact?: string }>({});
  const headingRef = useRef<HTMLParagraphElement>(null);
  const confirmationRef = useRef<HTMLParagraphElement>(null);
  const movedRef = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "success") confirmationRef.current?.focus();
  }, [status]);

  // Il fuoco si sposta sul titolo del passo solo dopo una navigazione
  // dell'utente: al primo caricamento rubare il fuoco sarebbe sgradevole.
  useEffect(() => {
    if (movedRef.current) headingRef.current?.focus();
  }, [step]);

  function go(next: number) {
    movedRef.current = true;
    setStep(next);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);

    // Controllati qui prima di partire: gli stessi controlli girano anche sul
    // server, che resta l'autorità, ma far fare un giro di rete per dire che
    // "ciao" non è un recapito è tempo perso per chi scrive.
    const nome = String(form.get("name") ?? "");
    const recapito = String(form.get("contact") ?? "");
    const errori: { name?: string; contact?: string } = {};
    if (!isPlausibleName(nome)) errori.name = NAME_ERROR;
    if (!isPlausibleContact(recapito)) errori.contact = CONTACT_ERROR;

    if (errori.name || errori.contact) {
      setFieldErrors(errori);
      setStatus("idle");
      const primo = errori.name ? nameRef.current : contactRef.current;
      primo?.focus();
      return;
    }

    setFieldErrors({});

    const optional = (key: string) => {
      const value = String(form.get(key) ?? "").trim();
      return value === "" ? undefined : value;
    };

    const payload = {
      name: String(form.get("name") ?? ""),
      contact: String(form.get("contact") ?? ""),
      interventionType: String(form.get("interventionType") ?? ""),
      stage: optional("stage"),
      place: optional("place"),
      message: optional("message"),
      reference: optional("reference"),
      consent: form.get("consent") === "on",
      website: String(form.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contatti", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMessage(data.error ?? "Si è verificato un errore. Riprova.");
        setStatus("error");
      }
    } catch {
      setErrorMessage("Impossibile inviare il messaggio. Controlla la connessione e riprova.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p ref={confirmationRef} role="status" tabIndex={-1} className="text-grafite outline-none">
        Grazie, abbiamo ricevuto la tua richiesta. Ti ricontattiamo noi, di solito entro un paio di giorni.
      </p>
    );
  }

  const isLast = step === STEPS.length - 1;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {linkedProject && <input type="hidden" name="reference" value={linkedProject} />}

      <div>
        <div className="flex gap-1" aria-hidden="true">
          {STEPS.map((label, i) => (
            <span key={label} className={i <= step ? "h-0.5 flex-1 bg-muschio" : "h-0.5 flex-1 bg-nebbia"} />
          ))}
        </div>
        <p
          ref={headingRef}
          tabIndex={-1}
          aria-live="polite"
          className="mt-4 text-lg font-medium text-grafite outline-none"
        >
          <span className="block text-sm font-normal text-pietra">
            Passo {step + 1} di {STEPS.length}
          </span>
          {STEPS[step]}
        </p>
      </div>

      {linkedProject && step === 0 && (
        <div className="border-l-2 border-muschio pl-3 text-sm text-pietra">
          <p>
            Richiesta riferita a <span className="font-medium text-grafite">{linkedProject}</span>.
          </p>
          <button
            type="button"
            onClick={() => setLinkedProject(undefined)}
            className="-mb-2 inline-block py-2 underline hover:text-grafite"
          >
            Volevo chiedere di altro
          </button>
        </div>
      )}

      {/*
        Sei riquadri invece di sei pallini. Il comando resta un radio vero,
        steso invisibile a coprire tutta la casella: tastiera e lettura
        assistita funzionano come prima e l'area da toccare e' l'intero
        riquadro invece di un cerchietto.

        Da selezionato il riquadro si riempie di verde: e' un'inversione di
        luminosita', quindi si distingue anche senza vedere i colori, e non
        serve nessun segno di spunta accanto al testo. Il `!` sul fondo
        selezionato serve perche' altrimenti il passaggio del mouse
        vincerebbe e il riquadro scelto sembrerebbe deselezionarsi.
      */}
      <fieldset hidden={step !== 0} className={step !== 0 ? "hidden" : "grid grid-cols-2 gap-3"}>
        <legend className="sr-only">Di cosa si tratta?</legend>
        {INTERVENTION_TYPES.map((type, i) => (
          <label key={type} className="relative block cursor-pointer">
            <input
              type="radio"
              name="interventionType"
              value={type}
              defaultChecked={i === 0}
              required
              className="peer absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-xl"
            />
            <span className="flex h-full min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-nebbia bg-carta px-3 py-5 text-center text-sm leading-snug text-grafite transition-colors peer-hover:bg-nebbia/70 peer-checked:border-muschio peer-checked:bg-muschio! peer-checked:text-carta peer-checked:[&_svg]:text-carta peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-muschio">
              <InterventoIcon type={type} className="h-8 w-8 shrink-0 text-muschio" />
              <span className="text-balance">{type}</span>
            </span>
          </label>
        ))}
      </fieldset>

      <div hidden={step !== 1} className={step !== 1 ? "hidden" : "flex flex-col gap-5"}>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-grafite">A che punto sei?</span>
          <select name="stage" defaultValue="" className={fieldClass}>
            <option value="">Preferisco non specificare</option>
            {PROJECT_STAGES.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-grafite">Dove si trova?</span>
          <input name="place" type="text" placeholder="Comune o zona" className={fieldClass} />
        </label>
      </div>

      <div hidden={!isLast} className={!isLast ? "hidden" : "flex flex-col gap-5"}>
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-grafite">Come ti chiami?</span>
            <input
              ref={nameRef}
              name="name"
              type="text"
              autoComplete="name"
              required={isLast}
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? "errore-nome" : undefined}
              onChange={() => setFieldErrors((e) => ({ ...e, name: undefined }))}
              className={fieldErrors.name ? erroreFieldClass : fieldClass}
            />
            {fieldErrors.name && (
              <span id="errore-nome" className="text-sm text-grafite">
                {fieldErrors.name}
              </span>
            )}
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-grafite">Telefono o email</span>
            <input
              ref={contactRef}
              name="contact"
              type="text"
              inputMode="tel"
              autoComplete="tel"
              required={isLast}
              aria-invalid={fieldErrors.contact ? true : undefined}
              aria-describedby={fieldErrors.contact ? "errore-recapito" : undefined}
              onChange={() => setFieldErrors((e) => ({ ...e, contact: undefined }))}
              className={fieldErrors.contact ? erroreFieldClass : fieldClass}
            />
            {fieldErrors.contact && (
              <span id="errore-recapito" className="text-sm text-grafite">
                {fieldErrors.contact}
              </span>
            )}
          </label>
        </div>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium text-grafite">
            Vuoi aggiungere altro? <span className="font-normal text-pietra">(facoltativo)</span>
          </span>
          <textarea
            name="message"
            rows={3}
            placeholder="Anche solo due righe: cosa vorresti ottenere."
            className={fieldClass}
          />
        </label>

        <label className="flex items-start gap-2 text-sm text-pietra">
          <input
            type="checkbox"
            name="consent"
            defaultChecked={false}
            required={isLast}
            className="mt-0.5 h-6 w-6 shrink-0 accent-muschio"
          />
          <span>
            Acconsento al trattamento dei dati personali per essere ricontattato/a, come descritto{" "}
            <a href="/privacy" className="underline hover:text-grafite">nell&apos;informativa privacy</a>.
          </span>
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="border-l-2 border-muschio pl-3 text-sm text-grafite">
          {errorMessage}
        </p>
      )}

      <div className="flex items-center gap-4">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className="text-sm text-pietra underline">
            Indietro
          </button>
        )}

        {isLast ? (
          <button
            type="submit"
            disabled={status === "submitting"}
            className="bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90 disabled:opacity-60"
          >
            {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => go(step + 1)}
            className="bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90"
          >
            Avanti
          </button>
        )}
      </div>
    </form>
  );
}
