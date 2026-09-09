"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
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
    const payload = {
      name: String(form.get("name") ?? ""),
      contact: String(form.get("contact") ?? ""),
      interventionType: String(form.get("interventionType") ?? ""),
      message: String(form.get("message") ?? ""),
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
        Grazie, il tuo messaggio è stato inviato. Ti risponderemo al più presto.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-grafite">Nome</span>
        <input name="name" type="text" required className="border border-nebbia bg-carta px-3 py-2" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-grafite">Telefono o email</span>
        <input name="contact" type="text" required className="border border-nebbia bg-carta px-3 py-2" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-grafite">Tipo di intervento</span>
        <input name="interventionType" type="text" required className="border border-nebbia bg-carta px-3 py-2" />
      </label>

      <label className="flex flex-col gap-1">
        <span className="text-sm font-medium text-grafite">Messaggio</span>
        <textarea name="message" rows={5} required className="border border-nebbia bg-carta px-3 py-2" />
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
        className="mt-2 bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90 disabled:opacity-60"
      >
        {status === "submitting" ? "Invio in corso…" : "Invia richiesta"}
      </button>
    </form>
  );
}
