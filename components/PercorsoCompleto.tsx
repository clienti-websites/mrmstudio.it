import Link from "next/link";
import { FaseIcon } from "./FaseIcon";

/**
 * La sezione è un percorso, non quattro riquadri affiancati: una linea con
 * le fermate, nell'ordine in cui si attraversano.
 *
 * Le prime tre sono gli approcci. La quarta, l'elenco dei lavori, non è un
 * modo di lavorare ed è ultima per questo: dopo aver letto cosa facciamo,
 * la domanda successiva è "e allora cosa avete fatto". Porta alla tabella
 * dentro /progetti, non a una pagina sua, e la sua icona è un documento e
 * non un oggetto del mestiere, così si vede che è di un'altra natura.
 *
 * Non ha un titolo: la riga di apertura dice già di cosa si parla, e un
 * titolo sopra avrebbe ripetuto "dal terreno alle chiavi in mano", che è la
 * descrizione della terza fermata. Senza titolo la sezione non è una
 * "regione" per chi naviga da lettore di schermo, ed è il prezzo accettato.
 *
 * Lo sviluppo immobiliare è una fermata in fila con le altre: dice che lo
 * studio parte dall'occasione e non dall'incarico senza doverlo spiegare.
 * La riga sotto le fermate gli dà il nome che gli serve, IconaCasa Abruzzo,
 * perché senza un nome "l'occasione la portiamo noi" resta un vanto che
 * nessuno può verificare. Il legame fra i due è di famiglia, ma in home non
 * si dice: sta su /sviluppo-immobiliare, dove chi è arrivato fin lì ha
 * motivo di saperlo.
 *
 * Il concetto chiave del sito è che lo studio è il pezzo che al cliente
 * manca. Prima stava in chiusura e per metafora, "copriamo il tratto che ti
 * manca", col percorso come figura implicita: non arrivava, perché chi legge
 * non ha in testa nessun tratto da coprire. Adesso sta in apertura, prima
 * delle fermate, e i tre casi sono scritti uno per uno — se non hai il
 * progetto siamo il progetto, e così per gli altri due — perché è il
 * parallelismo a far capire da sé che sono alternative e non tappe. La parola
 * "tratto" è sparita da questa sezione.
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
    href: "/progettazione",
    icona: "progettazione",
    label: "Progettazione",
    gloss: "Architettura, ingegneria, energia, urbanistica e direzione lavori.",
  },
  {
    id: "appalto",
    href: "/appalto",
    icona: "appalto",
    label: "Appalto",
    gloss: "Lavori pubblici e realizzazioni private.",
  },
  {
    id: "sviluppo-immobiliare",
    href: "/sviluppo-immobiliare",
    icona: "direzione-lavori",
    label: "Sviluppo immobiliare",
    gloss: "Dal terreno alle chiavi in mano.",
  },
  {
    id: "elenco-lavori",
    href: "/progetti#lavori-titolo",
    icona: "elenco",
    label: "Elenco lavori",
    gloss: "Gli incarichi svolti, con importo e prestazioni.",
  },
] as const;

export function PercorsoCompleto() {
  return (
    <section id="approcci" aria-label="Da dove si entra" className="scroll-mt-20 px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        {/* Una riga sola, grande, e sotto la prova in piccolo. Prima era un
            paragrafo di cinque frasi che cominciava spiegando la situazione
            del cliente: giusto nel contenuto, ma nessuno lo leggeva fino al
            punto in cui arrivava il concetto. Adesso il concetto e' la prima
            cosa che si vede, e i tre casi lo dimostrano dopo. */}
        <p className="mx-auto max-w-2xl text-center text-2xl font-medium leading-snug text-grafite md:text-3xl">
          Noi siamo la parte che ti manca.
        </p>
        <p className="mx-auto mt-5 max-w-xl text-center text-pietra">
          Se non hai il progetto, siamo il progetto. Se non hai l&apos;appalto, siamo l&apos;appalto. Se non
          hai l&apos;occasione, la portiamo noi.
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

              <Link href={fermata.href} className="group block">
                <FaseIcon phase={fermata.icona} className="h-10 w-10 text-muschio md:mx-auto" />
                <span className="mt-4 block font-medium text-grafite group-hover:text-muschio group-hover:underline">
                  {fermata.label}
                </span>
              </Link>
              <span className="mt-1 block max-w-[30ch] text-sm text-pietra md:mx-auto">{fermata.gloss}</span>
            </li>
          ))}
        </ol>

        {/* Testo di MRM, parola per parola. Prima diceva "a volte la
            portiamo davvero", che suonava come se le occasioni capitassero
            per fortuna, e tirava in mezzo la famiglia. */}
        <p className="mx-auto mt-16 max-w-2xl text-center text-lg text-grafite">
          Le occasioni le portiamo davvero: quello che passa per IconaCasa Abruzzo lo guardiamo già pensando a
          cosa può diventare.
        </p>

        {/* La biforcazione, in una riga sola: chi cerca un progettista resta
            sulle tre fermate, chi vuole la casa fatta prende tutti e tre.
            Una quarta fermata avrebbe detto che e' un approccio in piu', e
            non lo e': e' tutti e tre insieme. */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-pietra">
          E se ti manca tutto, facciamo tutto:{" "}
          <Link href="/servizi-integrati" className="inline-block py-2 text-muschio underline">
            si chiama servizi integrati
          </Link>
        </p>
      </div>
    </section>
  );
}
