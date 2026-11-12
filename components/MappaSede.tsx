import type { Office } from "@/lib/site";

/**
 * La mappa della sede, visibile da subito.
 *
 * Prima stava dietro a un pulsante: finché non lo premevi, verso Google non
 * partiva niente. Adesso parte con la pagina, quindi chi apre i contatti
 * manda a Google il proprio indirizzo IP senza averlo chiesto. È una scelta
 * dello studio, non una svista: la sezione "Le mappe delle sedi"
 * dell'informativa è stata riscritta di conseguenza e va tenuta allineata a
 * questo file.
 *
 * L'indirizzo di incorporamento non richiede chiavi e mostra il punto
 * indicato nella query.
 */
export function MappaSede({ office }: { office: Office }) {
  const query = encodeURIComponent(`${office.streetAddress}, ${office.city}, ${office.region}`);

  return (
    <div>
      <iframe
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        title={`Mappa della sede di ${office.city}, ${office.streetAddress}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-64 w-full border border-nebbia"
      />
      <a
        href={office.mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-2 inline-block py-1 text-sm text-muschio underline"
      >
        Apri le indicazioni stradali
      </a>
    </div>
  );
}
