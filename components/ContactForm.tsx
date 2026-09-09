"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { INTERVENTION_TYPES, PROJECT_STAGES } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass = "border border-nebbia bg-carta px-3 py-2 text-grafite";

/**
 * `reference` è il progetto da cui arriva la richiesta: chi scrive dalla
 * scheda di un'opera non deve spiegare a cosa si riferisce.
 */
export function ContactForm({ reference }: { reference?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const confirmationRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (status === "success") {
      confirmationRef.current?.focus();
    }
  }, [status]);

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
      {reference && <input type="hidden" name="reference" value={reference} />}

      {reference && (
        <p className="border-l-2 border-muschio pl-3 text-sm text-pietra">
          Richiesta riferita a <span className="font-medium text-grafite">{reference}</span>.
        </p>
      )}

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-medium text-grafite">Di cosa si tratta?</legend>
        <div className="mt-1 flex flex-col gap-2">
          {INTERVENTION_TYPES.map((type, i) => (
            <label key={type} className="flex items-center gap-2 text-sm text-grafite">
              <input type="radio" name="interventionType" value={type} defaultChecked={i === 0} required />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </fieldset>

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

      <div className="border-t border-nebbia pt-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-grafite">Come ti chiami?</span>
            <input name="name" type="text" required className={fieldClass} />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-grafite">Telefono o email</span>
            <input name="contact" type="text" required className={fieldClass} />
          </label>
        </div>
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
        <input type="checkbox" name="consent" defaultChecked={false} required className="mt-1" />
        <span>Acconsento al trattamento dei dati personali per essere ricontattato/a.</span>
      </label>

      {status === "error" && (
        <p role="alert" className="border-l-2 border-muschio pl-3 text-sm text-grafite">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-1 self-start bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
      </button>
    </form>
  );
}
