import Link from "next/link";
import { LAVORI } from "@/lib/lavori";

export function TabellaLavori() {
  return (
    <section aria-labelledby="lavori-titolo" className="border-t border-nebbia pt-16">
      <h2 id="lavori-titolo" className="text-2xl font-bold text-grafite md:text-3xl">
        Elenco dei lavori
      </h2>
      <p className="mt-3 max-w-2xl text-pietra">
        Gli incarichi che abbiamo svolto, con importo lavori e prestazioni. Di alcuni trovi anche la scheda con
        le immagini.
      </p>

      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[52rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-grafite">
              <th scope="col" className="py-3 pr-6 font-medium text-grafite">
                Anno
              </th>
              <th scope="col" className="py-3 pr-6 font-medium text-grafite">
                Luogo
              </th>
              <th scope="col" className="py-3 pr-6 font-medium text-grafite">
                Intervento
              </th>
              <th scope="col" className="py-3 pr-6 font-medium text-grafite">
                Importo lavori
              </th>
              <th scope="col" className="py-3 font-medium text-grafite">
                Committenza
              </th>
            </tr>
          </thead>
          <tbody>
            {LAVORI.map((lavoro, i) => (
              <tr key={`${lavoro.anno}-${i}`} className="border-b border-nebbia align-top">
                <th scope="row" className="whitespace-nowrap py-5 pr-6 font-medium text-grafite">
                  {lavoro.anno}
                </th>
                <td className="py-5 pr-6 text-pietra">{lavoro.luogo ?? "Non indicato"}</td>
                <td className="py-5 pr-6 text-grafite">
                  {lavoro.intervento}
                  <span className="mt-1 block text-pietra">{lavoro.prestazioni}</span>
                  {/* Un pulsante e non l'intervento sottolineato: in una
                      tabella di righe lunghe il titolo cliccabile non si
                      distingue da quello che non lo e'. L'etichetta per il
                      lettore di schermo dice di quale lavoro e' la scheda,
                      perche' "Vedi la scheda" si ripete su piu' righe. */}
                  {lavoro.slug && (
                    <Link
                      href={`/progetti/${lavoro.slug}`}
                      aria-label={`Vedi la scheda: ${lavoro.intervento}`}
                      className="mt-3 inline-block border border-grafite/30 px-3 py-1.5 text-xs font-medium text-grafite transition-colors hover:border-grafite/60 hover:bg-nebbia motion-reduce:transition-none"
                    >
                      Vedi la scheda
                    </Link>
                  )}
                </td>
                <td className="whitespace-nowrap py-5 pr-6 text-grafite">
                  {lavoro.importo ?? <span className="text-pietra">Non divulgato</span>}
                </td>
                <td className="py-5 text-pietra">{lavoro.committenza}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
