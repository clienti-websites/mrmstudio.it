import { LAVORI, type Lavoro } from "@/lib/lavori";
import type { Phase } from "@/lib/projects";

/**
 * I tre approcci con cui si entra nello studio.
 *
 * Non sono fasi: non c'è un ordine obbligato e non si attraversano tutti.
 * Cambia chi porta il lavoro. Nella progettazione il cliente arriva con un
 * bisogno; nell'appalto il progetto esiste già e noi stiamo dalla sua parte
 * del tavolo; nello sviluppo immobiliare l'occasione la portiamo noi.
 *
 * Prima erano quattro "fasi" su un'unica pagina /servizi. Direzione lavori e
 * interior design non erano approcci ma prestazioni dentro la progettazione,
 * e come voci a sé facevano sembrare lo studio un'impresa che vende reparti.
 *
 * Gli esempi vengono da due fonti, mai da una terza scritta qui:
 * - `fase`: le schede progetto che dichiarano quell'approccio nel frontmatter;
 * - `registro`: le righe dell'elenco lavori dichiarato dallo studio, prese
 *   per prefisso dell'intervento. La nota accanto dice cosa abbiamo svolto,
 *   con le parole del registro, non un giudizio aggiunto.
 *
 * DA CHIEDERE A MRM: quale approccio vale per ognuna delle 24 schede. Oggi
 * solo tre dichiarano una fase, quindi appalto e sviluppo immobiliare non
 * hanno immagini da mostrare e si appoggiano al solo registro.
 */
export interface Approccio {
  slug: string;
  label: string;
  /** L'icona è quella delle fasi: lo sviluppo immobiliare prende l'edificio. */
  icona: Phase;
  titolo: string;
  metaTitolo: string;
  metaDescrizione: string;
  apertura: string;
  rischio: string;
  come: string;
  /** La fase dichiarata nelle schede progetto, dove esiste. */
  fase: Phase | null;
  registro: Array<{ cerca: string; nota: string }>;
  registroIntro: string;
}

export const APPROCCI: Approccio[] = [
  {
    slug: "progettazione",
    label: "Progettazione",
    icona: "progettazione",
    titolo: "Le discipline stanno nella stessa stanza.",
    metaTitolo: "Progettazione integrata a Pescara e in Abruzzo",
    metaDescrizione:
      "Architettura, ingegneria, energia, urbanistica e direzione lavori dentro un solo studio, a Pescara e in Abruzzo: dal rilievo al collaudo senza passare il lavoro da uno studio all'altro.",
    apertura:
      "Architettura, ingegneria, energia, urbanistica e direzione lavori. Sono le competenze che di solito stanno in studi diversi, e qui stanno nella stessa stanza.",
    rischio:
      "Quando architettonico, strutture e impianti nascono in tre studi diversi, le incongruenze non vengono fuori sui disegni: vengono fuori dopo, come varianti e fermi che nessuno aveva previsto. E quando succede, ognuno indica l'altro.",
    come:
      "Facciamo il rilievo, il progetto architettonico e il definitivo, l'esecutivo strutturale, il progetto energetico e degli impianti, i grafici esecutivi e il computo, le viste fotorealistiche per vedere come verrà prima di cominciare, gli interni sugli stessi elaborati, e la direzione dei lavori fino al collaudo. Se una scelta strutturale complica gli impianti ce ne accorgiamo mentre disegniamo, non quando il muro è chiuso.",
    fase: "progettazione",
    registroIntro: "Qualche incarico di sola progettazione, dall'elenco dei lavori.",
    registro: [
      {
        cerca: "Piano Regolatore Generale (CIG Z3908A128E)",
        nota: "Piano, grafici e procedure VAS e VINCA",
      },
      {
        cerca: "Scuola primaria, opera strategica di Classe IV",
        nota: "Definitivo architettonico ed esecutivo strutturale",
      },
    ],
  },
  {
    slug: "appalto",
    label: "Appalto",
    icona: "appalto",
    titolo: "Il progetto esiste già. Noi stiamo dalla tua parte del tavolo.",
    metaTitolo: "Appalto e gare: assistenza tecnica a Pescara e in Abruzzo",
    metaDescrizione:
      "MRM Studio prepara la documentazione tecnica per la gara o la trattativa privata, confronta le offerte sul merito e verifica le condizioni contrattuali prima della firma.",
    apertura:
      "Un appalto si vince e si perde sulla carta, prima che qualcuno posi un mattone. Lavori pubblici o realizzazioni private: la differenza è la procedura, non il mestiere.",
    rischio:
      "L'affidamento dei lavori si decide tra voci di computo, tempi contrattuali, penali e riserve. Chi non ha gli strumenti per leggerli firma condizioni che si pagano più avanti, quando cambiarle non è più possibile.",
    come:
      "Prepariamo la documentazione tecnica per la gara o per la trattativa, confrontiamo le offerte sul merito e non solo sul ribasso, verifichiamo le condizioni contrattuali prima che tu firmi. Se il progetto è di altri lo leggiamo da capo: quello che non è disegnato oggi diventa una riserva domani.",
    fase: "appalto",
    registroIntro:
      "Il computo e i grafici esecutivi sono i documenti su cui si appalta: questi li abbiamo redatti noi.",
    registro: [
      {
        cerca: "Scuola primaria, opera strategica di Classe IV",
        nota: "Grafici esecutivi e computo, primo stralcio in corso",
      },
      {
        cerca: "Quattro edifici danneggiati dal sisma del 2016",
        nota: "Esecutivo strutturale e computo, incarico in ATP",
      },
    ],
  },
  {
    slug: "sviluppo-immobiliare",
    label: "Sviluppo immobiliare",
    icona: "sviluppo-immobiliare",
    titolo: "Qui l'incarico non arriva: l'occasione la portiamo noi.",
    metaTitolo: "Sviluppo immobiliare in Abruzzo: dal terreno alle chiavi",
    metaDescrizione:
      "Valutazione di terreni e immobili, verifica di cosa le norme consentono, preliminare e business plan, piani in project financing: MRM Studio porta l'operazione, non solo il progetto.",
    apertura:
      "Un terreno, un immobile da rilevare, un'area ferma da anni. Collaboriamo con IconaCasa Abruzzo — i titolari dei due studi sono marito e moglie — e quello che passa dall'agenzia lo guardiamo già pensando a cosa può diventare.",
    rischio:
      "Un'operazione immobiliare si decide prima del progetto: su cosa le norme consentono davvero in quel punto, su quanto costa realizzarlo e su quanto regge il mercato della zona. Sbagliato quel conto, il progetto più bello del mondo non torna.",
    come:
      "Verifichiamo la capacità edificatoria e i vincoli, stimiamo i costi, mettiamo giù il preliminare e il business plan, e portiamo il piano davanti al comune e agli enti. Dove serve strumento urbanistico, lo scriviamo: piani particolareggiati, piani di intervento integrato, project financing. Poi, se l'operazione va avanti, la seguiamo anche costruire.",
    fase: "sviluppo-immobiliare",
    registroIntro: "Le operazioni in cui abbiamo portato il piano, non solo il disegno.",
    registro: [
      {
        cerca: "Piano di Intervento Integrato in project financing",
        nota: "Grafici di piano, testo normativo, enti",
      },
      {
        cerca: "Piano Particolareggiato di area urbana",
        nota: "Pianificazione infrastrutturale e insediativa",
      },
      {
        cerca: "Edificio a prevalenza residenziale",
        nota: "Progetto preliminare e business plan",
      },
    ],
  },
];

export function getApproccio(slug: string): Approccio {
  const approccio = APPROCCI.find((voce) => voce.slug === slug);
  if (!approccio) throw new Error(`Approccio inesistente: ${slug}`);
  return approccio;
}

/**
 * Le righe del registro scelte per un approccio, con la nota accanto.
 *
 * Se una voce viene rinominata in lib/lavori.ts la build si ferma qui, invece
 * di pubblicare una pagina a cui manca l'esempio senza che nessuno lo veda.
 */
export function esempiRegistro(approccio: Approccio): Array<Lavoro & { nota: string }> {
  return approccio.registro.map(({ cerca, nota }) => {
    const voce = LAVORI.find((lavoro) => lavoro.intervento.startsWith(cerca));
    if (!voce) {
      throw new Error(
        `Approccio "${approccio.slug}": nessuna voce dell'elenco lavori comincia con "${cerca}". ` +
          "Se l'intervento è stato rinominato in lib/lavori.ts, aggiorna anche la scelta in lib/approcci.ts.",
      );
    }
    return { ...voce, nota };
  });
}

/** Quello che viene prima e quello che viene dopo, per i rimandi in fondo. */
export function vicini(slug: string) {
  const i = APPROCCI.findIndex((voce) => voce.slug === slug);
  return { prima: APPROCCI[i - 1] ?? null, dopo: APPROCCI[i + 1] ?? null };
}
