import Link from "next/link";
import { LAVORI, type Lavoro } from "@/lib/lavori";

/**
 * Le opere pubbliche e i piani urbanistici non sono un servizio in più da
 * vendere: sono la prova che lo studio regge una verifica. Un comune non
 * affida un piano regolatore a chi non ha requisiti, e un privato che legge
 * "piano regolatore" capisce da solo di che taglia è lo studio che sta
 * guardando. Per questo qui non c'è un aggettivo: ci sono quattro righe di
 * registro, con sigle e anni, e il collegamento all'elenco intero.
 *
 * Nella colonna di destra non ci sono più gli importi: una fila di cifre in
 * euro in home faceva il portfolio di un'impresa, non il curriculum di uno
 * studio. Dice invece che prestazione abbiamo svolto, con le parole del
 * registro. Gli importi restano, uno per uno, nell'elenco completo.
 *
 * I testi non sono ricopiati: vengono da lib/lavori.ts, l'elenco dichiarato
 * dallo studio. Se una voce cambia lì, cambia anche qui; se sparisce, la
 * build si ferma invece di lasciare in home una riga che non esiste più.
 */
const SCELTE: Array<{ cerca: string; nota: string }> = [
  { cerca: "Piano Regolatore Generale (CIG Z3908A128E)", nota: "Piano, procedure VAS e VINCA" },
  { cerca: "Scuola primaria, opera strategica di Classe IV", nota: "Definitivo ed esecutivo strutturale" },
  { cerca: "Piano Particolareggiato di area urbana", nota: "Pianificazione, rapporto con gli enti" },
  { cerca: "Piano di Intervento Integrato in project financing", nota: "Grafici di piano e testo normativo" },
];

function trova(cerca: string): Lavoro {
  const voce = LAVORI.find((lavoro) => lavoro.intervento.startsWith(cerca));
  if (!voce) {
    throw new Error(
      `OperePubbliche: nessuna voce dell'elenco lavori comincia con "${cerca}". ` +
        "Se l'intervento è stato rinominato in lib/lavori.ts, aggiorna anche la scelta qui.",
    );
  }
  return voce;
}

export function OperePubbliche() {
  const voci = SCELTE.map(({ cerca, nota }) => ({ ...trova(cerca), nota }));

  return (
    <section aria-labelledby="pubbliche-titolo" className="bg-nebbia px-6 py-24 md:px-12">
      <div className="mx-auto max-w-5xl">
        <h2 id="pubbliche-titolo" className="max-w-3xl text-3xl font-bold tracking-tight text-grafite md:text-4xl">
          Lavoriamo anche su opere pubbliche.
        </h2>

        {/* Un registro, non delle schede: quello che convince qui sono le
            sigle allineate, non quattro riquadri colorati. */}
        <dl className="mt-12 border-t border-grafite/15">
          {voci.map((voce) => (
            <div
              key={voce.intervento}
              className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-grafite/15 py-5"
            >
              <dt className="max-w-xl">
                <span className="block text-grafite">{voce.intervento}</span>
                <span className="mt-0.5 block text-sm text-pietra">
                  {[voce.luogo, voce.anno].filter(Boolean).join(" · ")}
                </span>
              </dt>
              <dd className="ml-0 max-w-xs text-sm text-pietra">{voce.nota}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-8 text-pietra">
          <Link href="/progetti#lavori-titolo" className="-my-2 inline-block py-2 text-muschio underline">
            L&apos;elenco completo dei lavori
          </Link>
          , con importi e prestazioni svolte.
        </p>
      </div>
    </section>
  );
}
