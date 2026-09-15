"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";

/**
 * Mostrata quando una pagina non riesce a essere costruita. Stessa forma
 * della 404: si dice cosa è successo in una riga e si offrono le vie
 * d'uscita, compresi i recapiti veri, perché chi stava per scrivere non
 * debba rinunciare per colpa di un errore nostro.
 */
export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-24 md:px-12">
      <p className="mb-2 text-sm font-medium text-pietra">Errore</p>
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Qualcosa non ha funzionato</h1>
      <p className="mb-8 text-pietra">
        La pagina non è riuscita a caricarsi. Puoi riprovare, oppure ripartire da qui.
      </p>

      <div className="flex flex-wrap gap-4">
        <button
          type="button"
          onClick={reset}
          className="inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90"
        >
          Riprova
        </button>
        <Link
          href="/"
          className="inline-block border border-grafite px-6 py-3 font-medium text-grafite hover:bg-nebbia"
        >
          Torna alla home
        </Link>
      </div>

      <p className="mt-10 text-pietra">
        Se ti serve parlare con noi adesso:{" "}
        {SITE.offices.map((office, i) => (
          <span key={office.id}>
            {i > 0 && ", "}
            {office.city}{" "}
            <a href={`tel:${office.phone}`} className="py-1.5 text-muschio underline">
              {office.phoneDisplay}
            </a>
          </span>
        ))}
        , oppure{" "}
        <a href={`mailto:${SITE.email}`} className="py-1.5 text-muschio underline">
          {SITE.email}
        </a>
        .
      </p>
    </div>
  );
}
