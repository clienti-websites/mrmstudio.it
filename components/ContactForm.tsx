"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { INTERVENTION_TYPES, PROJECT_STAGES } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass = "border border-nebbia bg-carta px-3 py-2 text-grafite";
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
  const headingRef = useRef<HTMLParagraphElement>(null);
  const confirmationRef = useRef<HTMLParagraphElement>(null);
  const movedRef = useRef(false);

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
            className="mt-1 underline hover:text-grafite"
          >
            Volevo chiedere di altro
          </button>
        </div>
      )}

      <fieldset hidden={step !== 0} className={step !== 0 ? "hidden" : "flex flex-col gap-2"}>
        <legend className="sr-only">Di cosa si tratta?</legend>
        {INTERVENTION_TYPES.map((type, i) => (
          <label key={type} className="flex items-center gap-2 text-grafite">
            <input type="radio" name="interventionType" value={type} defaultChecked={i === 0} required />
            <span>{type}</span>
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
            <input name="name" type="text" required={isLast} className={fieldClass} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-grafite">Telefono o email</span>
            <input name="contact" type="text" required={isLast} className={fieldClass} />
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
          <input type="checkbox" name="consent" defaultChecked={false} required={isLast} className="mt-1" />
          <span>Acconsento al trattamento dei dati personali per essere ricontattato/a.</span>
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
