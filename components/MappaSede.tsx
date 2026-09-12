"use client";

import { useState } from "react";
import type { Office } from "@/lib/site";

/**
 * Mappa che si carica solo se qualcuno la chiede.
 *
 * Incorporare Google Maps subito significherebbe far partire una richiesta a
 * Google appena la pagina si apre, e quindi tornare ad avere bisogno del
 * banner dei cookie e del servizio che lo gestisce. Qui finché non si preme
 * non parte niente verso l'esterno: chi vuole la mappa la apre, e sa cosa sta
 * aprendo perché c'è scritto sopra.
 *
 * L'indirizzo di incorporamento non richiede chiavi e mostra il punto
 * indicato nella query.
 */
export function MappaSede({ office }: { office: Office }) {
  const [aperta, setAperta] = useState(false);
  const query = encodeURIComponent(`${office.streetAddress}, ${office.city}, ${office.region}`);
  const incorporata = `https://www.google.com/maps?q=${query}&output=embed`;

  if (aperta) {
    return (
      <iframe
        src={incorporata}
        title={`Mappa della sede di ${office.city}, ${office.streetAddress}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full border border-nebbia"
      />
    );
  }

  return (
    <div className="flex h-64 w-full flex-col items-start justify-end gap-3 border border-nebbia bg-nebbia p-5">
      <p className="text-sm text-grafite">
        La mappa di {office.city} è fornita da Google. Aprendola, Google può registrare la tua visita.
      </p>
      <button
        type="button"
        onClick={() => setAperta(true)}
        className="bg-muschio px-5 py-3 text-sm font-medium text-carta hover:bg-muschio/90"
      >
        Mostra la mappa
      </button>
      <a
        href={office.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="py-1 text-sm text-muschio underline"
      >
        Oppure apri le indicazioni stradali
      </a>
    </div>
  );
}
