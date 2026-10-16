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
 * sviluppo immobiliare si affaccia. La seconda è che del percorso si può
 * prendere tutto o un tratto solo: non c'è una frase che lo spieghi, ci sono
 * due casi concreti in fondo, che è l'unico modo di dirlo senza spiegarlo.
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
          Si comincia da un terreno, da un immobile da rilevare, da un bando. Certe volte il terreno lo troviamo
          noi.
        </p>

        <ol className="mx-auto mt-16 grid max-w-5xl md:grid-cols-4 md:gap-x-8">
          {FERMATE.map((fermata, i) => (
            <li
              key={fermata.id}
              className="relative border-l border-nebbia pb-10 pl-7 last:border-l-transparent last:pb-0 md:border-l-0 md:pb-0 md:pl-0 md:text-center"
            >
              {/* Sul telefono il percorso scende, e a disegnarlo è il bordo
                  sinistro di ogni fermata. Da 768px si corica: la linea non
                  può più essere un bordo, così ogni fermata tira il proprio
                  tratto all'indietro fino al centro di quella precedente —
                  larga quanto sé stessa più il vuoto della griglia. L'ultima
                  non ha bordo perché il percorso finisce lì. */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute right-1/2 top-[3px] hidden h-px w-[calc(100%+2rem)] bg-nebbia md:block"
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

        {/* Tre buchi diversi, tre risposte che nominano il tratto di percorso
            che copriamo noi. Non c'è una frase che dica "ci adattiamo": sono
            i tre casi a dirlo, e si agganciano alle fermate qui sopra. */}
        <p className="mx-auto mt-16 max-w-3xl text-center text-lg text-grafite">
          Hai già l&apos;impresa? Progetto e direzione lavori li facciamo noi. Hai già il progetto? Ti seguiamo
          l&apos;appalto e il cantiere. Hai solo il terreno? Partiamo da prima del progetto.
        </p>
      </div>
    </section>
  );
}
