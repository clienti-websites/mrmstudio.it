import Link from "next/link";
import { FaseIcon } from "./FaseIcon";

/**
 * La sezione è un percorso, non quattro riquadri affiancati: una linea con
 * quattro fermate, nell'ordine in cui si attraversano.
 *
 * Due cose qui vanno fatte capire senza scriverle, altrimenti diventano una
 * brochure. La prima è che il lavoro comincia prima del progetto — da un
 * terreno, da un immobile da rilevare, da un bando — e che le occasioni certe
 * volte arrivano da noi: è la riga di apertura, ed è l'unico punto in cui lo
 * sviluppo immobiliare si affaccia. IconaCasa Abruzzo è nominata perché il
 * legame è reale — i due titolari sono marito e moglie — e perché senza un
 * nome "l'occasione la portiamo noi" resta un vanto che nessuno può
 * verificare. In pagina resta "collaboriamo", che è la forma scelta dallo
 * studio. La seconda è che del percorso si può
 * prendere tutto o un tratto solo. La riga di chiusura non elenca i casi:
 * elencarli obbliga chi legge a riconoscersi in uno dei tre, e quasi nessuno
 * sa gia' dire quale pezzo gli manca. Dice invece che il pezzo lo copriamo
 * noi, qualunque sia, e che a individuarlo si pensa dopo.
 *
 * Opere pubbliche e urbanistica non hanno una fermata loro: comparirebbero
 * come un reparto a parte. Stanno dentro le glosse delle fermate che le
 * attraversano davvero, il bando all'inizio e le gare all'appalto.
 */
const FERMATE = [
  { id: "progettazione", label: "Progettazione", gloss: "Architettura, strutture, impianti, urbanistica." },
  { id: "appalto", label: "Appalto", gloss: "Gare pubbliche e trattative private." },
  { id: "direzione-lavori", label: "Direzione lavori", gloss: "In cantiere ci stiamo noi." },
  { id: "interior-design", label: "Interior design", gloss: "Fino all'ultimo arredo." },
] as const;

export function PercorsoCompleto() {
  return (
    <section aria-labelledby="percorso-titolo" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2
          id="percorso-titolo"
          className="mx-auto max-w-3xl text-center text-3xl font-bold tracking-tight text-grafite md:text-4xl"
        >
          Dal terreno alle chiavi in mano.
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-pietra">
          Si comincia da un terreno, da un immobile da rilevare, da un bando. Certe volte l&apos;occasione la
          portiamo noi: collaboriamo con IconaCasa Abruzzo, e quello che passa di lì lo guardiamo
          già pensando a cosa può diventare.
        </p>

        <ol className="mx-auto mt-16 grid max-w-5xl md:grid-cols-4 md:gap-x-8">
          {FERMATE.map((fermata, i) => (
            <li
              key={fermata.id}
              className="relative border-l border-grafite/30 pb-10 pl-7 last:border-l-transparent last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:text-center"
            >
              {/* La linea non puo' essere nebbia: su carta fa 1,1 di contrasto
                  e sparisce. Qui serve grafite scaricata.

                  Sul telefono il percorso scende, e a disegnarlo è il bordo
                  sinistro di ogni fermata. Da 768px si corica: la linea non
                  può più essere un bordo, così ogni fermata tira il proprio
                  tratto all'indietro fino al centro di quella precedente —
                  larga quanto sé stessa più il vuoto della griglia. L'ultima
                  non ha bordo perché il percorso finisce lì. */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1/2 top-[3px] hidden h-px w-[calc(100%+2rem)] bg-grafite/30 md:block"
                />
              )}

              <span
                aria-hidden="true"
                className="absolute -left-[3px] top-[5px] h-[7px] w-[7px] rounded-full bg-muschio md:static md:mx-auto md:mb-6 md:block"
              />

              <Link href={`/servizi#${fermata.id}`} className="group block">
                <FaseIcon phase={fermata.id} className="h-10 w-10 text-muschio md:mx-auto" />
                <span className="mt-4 block font-medium text-grafite group-hover:text-muschio group-hover:underline">
                  {fermata.label}
                </span>
              </Link>
              <span className="mt-1 block max-w-[24ch] text-sm text-pietra md:mx-auto">{fermata.gloss}</span>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-16 max-w-2xl text-center text-lg text-grafite">
          Copriamo il tratto che ti manca. Anche tutto, se ti manca tutto. Qual è, lo vediamo insieme.
        </p>
      </div>
    </section>
  );
}
