import Link from "next/link";
import { FaseIcon } from "./FaseIcon";

/**
 * La sezione è un percorso, non tre riquadri affiancati: una linea con tre
 * fermate, nell'ordine in cui si attraversano.
 *
 * Non ha un titolo: la riga di apertura dice già di cosa si parla, e un
 * titolo sopra avrebbe ripetuto "dal terreno alle chiavi in mano", che è la
 * descrizione della terza fermata. Senza titolo la sezione non è una
 * "regione" per chi naviga da lettore di schermo, ed è il prezzo accettato.
 *
 * Lo sviluppo immobiliare è una fermata in fila con le altre: dice che lo
 * studio parte dall'occasione e non dall'incarico senza doverlo spiegare.
 * La riga di apertura gli dà il nome che gli serve — IconaCasa Abruzzo, il
 * legame è reale, i due titolari sono marito e moglie — perché senza un nome
 * "l'occasione la portiamo noi" resta un vanto che nessuno può verificare.
 *
 * Va fatto capire senza scriverlo che del percorso si può
 * prendere tutto o un tratto solo. La riga di chiusura non elenca i casi:
 * elencarli obbliga chi legge a riconoscersi in uno dei tre, e quasi nessuno
 * sa gia' dire quale pezzo gli manca. Dice invece che il pezzo lo copriamo
 * noi, qualunque sia, e che a individuarlo si pensa dopo.
 *
 * Opere pubbliche e urbanistica non hanno una fermata loro: comparirebbero
 * come un reparto a parte. Stanno dentro le glosse delle fermate che le
 * attraversano davvero.
 *
 * Ogni fermata ha adesso la sua pagina: /progettazione, /appalto,
 * /sviluppo-immobiliare. La sezione e' anche il bersaglio della voce
 * "Progetti" della barra, da cui l'id: chi arriva da li' si trova davanti i
 * tre modi di entrare, non un elenco di opere da interpretare.
 *
 * Lo sviluppo immobiliare prende l'icona dell'edificio, che fra quelle
 * disegnate e' la sola che gli somigli.
 */
const FERMATE = [
  {
    id: "progettazione",
    icona: "progettazione",
    label: "Progettazione",
    gloss: "Architettura, ingegneria, energia, urbanistica e direzione lavori.",
  },
  { id: "appalto", icona: "appalto", label: "Appalto", gloss: "Lavori pubblici e realizzazioni private." },
  {
    id: "sviluppo-immobiliare",
    icona: "direzione-lavori",
    label: "Sviluppo immobiliare",
    gloss: "Dal terreno alle chiavi in mano.",
  },
] as const;

export function PercorsoCompleto() {
  return (
    <section id="approcci" aria-label="I tre approcci" className="scroll-mt-20 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <p className="mx-auto max-w-2xl text-center text-lg text-grafite">
          Si comincia da un terreno, da un immobile da rilevare, da un bando. Certe volte l&apos;occasione la
          portiamo noi: collaboriamo con IconaCasa Abruzzo, e quello che passa di lì lo guardiamo già pensando
          a cosa può diventare.
        </p>

        <ol className="mx-auto mt-16 grid max-w-5xl md:grid-cols-3 md:gap-x-8">
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

              <Link href={`/${fermata.id}`} className="group block">
                <FaseIcon phase={fermata.icona} className="h-10 w-10 text-muschio md:mx-auto" />
                <span className="mt-4 block font-medium text-grafite group-hover:text-muschio group-hover:underline">
                  {fermata.label}
                </span>
              </Link>
              <span className="mt-1 block max-w-[30ch] text-sm text-pietra md:mx-auto">{fermata.gloss}</span>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-16 max-w-2xl text-center text-lg text-grafite">
          Copriamo il tratto che ti manca. Anche tutto, se ti manca tutto. Qual è, lo vediamo insieme.
        </p>

        {/* La biforcazione, in una riga sola: chi cerca un progettista resta
            sulle tre fermate, chi vuole la casa fatta prende il percorso
            intero. Una quarta fermata avrebbe detto che e' un approccio in
            piu', e non lo e': e' tutti e tre insieme. */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-pietra">
          Quando il tratto è tutto,{" "}
          <Link href="/servizi-integrati" className="inline-block py-2 text-muschio underline">
            si chiama servizi integrati
          </Link>
        </p>
      </div>
    </section>
  );
}
