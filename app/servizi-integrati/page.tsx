import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Servizi integrati: la casa chiavi in mano a Pescara e in Abruzzo",
  description:
    "Dall'idea alla consegna con un solo interlocutore: analisi tecnica, normativa ed economica, pratiche e permessi, interni su misura, tempi e budget concordati.",
};

/**
 * I servizi integrati: la competenza esecutiva, cioè quello che succede
 * quando dello spostare la casa da un'idea a una casa abitata ce ne
 * occupiamo noi.
 *
 * Il percorso viene da una tavola dello studio, "Scegli MRM: un percorso
 * senza ostacoli", e non è ricopiato: delle otto caselle disegnate lì, due
 * non sono tappe. "Tempi garantiti" e "costi garantiti" non succedono a un
 * certo punto del lavoro, valgono per tutto: messi in fila con le altre
 * sembravano due momenti che prima o poi passano, e invece sono la
 * condizione sotto cui passa tutto il resto. Stanno quindi sotto al
 * percorso, non dentro. Interior design e personalizzazione erano due
 * caselle per la stessa cosa — gli spazi scelti insieme — e sono una.
 *
 * Restano cinque fermate, nell'ordine in cui si attraversano davvero.
 */
const TAPPE = [
  {
    titolo: "L'idea",
    testo: "Ci racconti la casa che hai in testa, anche solo a parole. È il punto di partenza, non un modulo da compilare.",
    // Posto nella serpentina e punto in cui il pallino incontra la linea.
    cella: "md:col-start-1 md:row-start-1",
    x: 16.7,
    y: 7,
  },
  {
    titolo: "Analisi",
    testo:
      "Tecnica, normativa ed economica. Prima di decidere qualunque cosa sai cosa si può fare su quel terreno o in quell'immobile, cosa no, e quanto costa.",
    cella: "md:col-start-2 md:row-start-1",
    x: 50,
    y: 7,
  },
  {
    titolo: "Pratiche e permessi",
    testo:
      "Pratiche, permessi e coordinamento dei tecnici li teniamo noi. Non devi rincorrere nessuno né sapere a chi tocca cosa.",
    cella: "md:col-start-3 md:row-start-1",
    x: 83.3,
    y: 7,
  },
  {
    titolo: "Interni su misura",
    testo:
      "Spazi, materiali e finiture si scelgono insieme, quando un punto luce o una traccia si possono ancora spostare. La casa somiglia a te, non al catalogo.",
    cella: "md:col-start-3 md:row-start-2",
    x: 83.3,
    y: 57,
  },
  {
    titolo: "Consegna",
    testo: "Ti consegniamo la casa pronta da abitare.",
    cella: "md:col-start-2 md:row-start-2",
    x: 50,
    y: 57,
  },
];

/**
 * La linea passa esattamente per i cinque pallini.
 *
 * Il disegno ha un riquadro normalizzato 0–100 e non conserva le
 * proporzioni: un punto (x, y) del tracciato cade quindi a left:x% top:y%
 * del contenitore, le stesse percentuali con cui sono posati i pallini. I
 * tratti fra una fermata e l'altra sono quadratici con il punto di
 * controllo spostato in alto o in basso: la linea ondeggia ma gli estremi
 * restano sui pallini a qualunque larghezza. Lo stiramento non ingrossa il
 * tratto grazie a non-scaling-stroke.
 */
const TRACCIATO = "M 16.7 7 Q 33.3 11.5 50 7 Q 66.7 2.5 83.3 7 C 96 7 96 57 83.3 57 Q 66.7 61.5 50 57";

export default function ServiziIntegratiPage() {
  return (
    <>
      <section className="bg-grafite px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <span className="text-sm font-medium text-carta/70">Servizi integrati</span>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-carta md:text-5xl">
            Un percorso senza ostacoli.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-carta/85">
            Se della casa vuoi che ce ne occupiamo noi dall&apos;inizio alla fine, questo è il tratto che
            percorriamo. Un solo interlocutore, dalla prima idea alle chiavi.
          </p>
        </div>
      </section>

      <section aria-labelledby="percorso-titolo" className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 id="percorso-titolo" className="sr-only">
            Le cinque tappe del percorso
          </h2>

          <div className="relative md:grid md:min-h-[34rem] md:grid-cols-3 md:grid-rows-[1fr_1fr]">
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
              className="pointer-events-none absolute inset-0 hidden h-full w-full text-grafite/30 md:block"
            >
              <path
                d={TRACCIATO}
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="contents">
              {TAPPE.map((tappa, i) => (
                <li
                  key={tappa.titolo}
                  className={`relative border-l border-grafite/30 pb-10 pl-7 last:border-l-transparent last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:pt-14 md:text-center ${tappa.cella}`}
                >
                  {/* Sul telefono il pallino sta sul bordo che fa da linea;
                      da 768px si sposta sulla serpentina, alle stesse
                      percentuali del tracciato. Dentro c'e' il numero: le
                      cinque tappe sono una sequenza vera, si attraversano in
                      quest'ordine. */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7px] top-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-muschio text-[10px] font-medium text-carta md:left-[var(--x)] md:top-[var(--y)] md:h-9 md:w-9 md:-translate-x-1/2 md:-translate-y-1/2 md:text-sm"
                    style={{ "--x": `${tappa.x}%`, "--y": `${tappa.y}%` } as React.CSSProperties}
                  >
                    <span className="hidden md:inline">{i + 1}</span>
                  </span>
                  <h3 className="font-medium text-grafite">{tappa.titolo}</h3>
                  <p className="mt-1 max-w-[52ch] text-pietra md:mx-auto md:max-w-[34ch] md:text-sm">
                    {tappa.testo}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Le due garanzie della tavola originale non sono tappe: non
              arrivano a un certo punto, reggono tutto il percorso. Per questo
              stanno sotto, su una riga sola, e non in fila con le altre. */}
          <div className="mt-14 border-t-2 border-muschio pt-6 md:mt-4">
            <p className="max-w-[60ch] text-lg text-grafite">
              Per tutto il percorso le date restano quelle concordate e il budget quello approvato. Se qualcosa
              si muove lo sai prima, non alla consegna.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-nebbia px-6 py-20 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-grafite">
            La fiducia di chi ci dà un incarico è il patrimonio dello studio: si consolida con risposte
            concrete e tempi rispettati, non con le promesse.
          </p>
          <p className="mt-8 text-pietra">
            Se invece quello che ti serve è il progetto, e la realizzazione la segui tu,{" "}
            <Link href="/progettazione" className="inline-block py-2 text-muschio underline">
              qui c&apos;è come progettiamo
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Raccontaci la casa che hai in testa." cta="Contattaci" href="/contatti" tone="dark" />
    </>
  );
}
