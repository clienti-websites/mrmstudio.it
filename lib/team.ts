/**
 * Le persone dello studio.
 *
 * I dati vengono dalla pagina Team del sito attuale, che esiste ma non è
 * collegata da nessun menu: ci si arriva solo digitando l'indirizzo. I testi
 * sono stati accorciati togliendo le ripetizioni (la stessa frase sulla
 * fondazione compariva identica in tre profili), ma non è stato aggiunto né
 * tolto un fatto: anno di nascita, titolo, albo e anno di iscrizione,
 * specializzazione e sede sono quelli dichiarati da loro.
 *
 * DA FAR CONFERMARE A MRM prima della pubblicazione: che le persone siano
 * ancora tutte in studio, che ruoli e sedi siano aggiornati, e che ogni
 * ritratto corrisponda al nome giusto. L'abbinamento qui sotto viene dal
 * nome dei file sul loro server (MIRCO, ROBERTO, MARIO, ANTONIO, ANGELO,
 * MARIA-LAURA, FRANCESCA, MARIKA), non da un riconoscimento a occhio.
 */
export interface Persona {
  name: string;
  role: string;
  founder: boolean;
  office: "Pescara" | "Castel di Sangro" | null;
  /** Ritratto in bianco e nero su fondo bianco, dal set dello studio. */
  photo: string;
  bio: string;
}

export const TEAM: Persona[] = [
  {
    name: "Mirco Ciarlante",
    photo: "/team/mirco-ciarlante.jpg",
    role: "Architetto",
    founder: true,
    office: null,
    bio:
      "Classe 1987. Comincia come geometra, poi si laurea in Architettura alla G. d'Annunzio con una tesi sperimentale in urbanistica. Iscritto all'Ordine degli Architetti dell'Aquila dal 2013. Segue la progettazione architettonica e strutturale integrata, la direzione lavori su opere pubbliche e private e la progettazione urbanistica.",
  },
  {
    name: "Roberto Buzzelli",
    photo: "/team/roberto-buzzelli.jpg",
    role: "Geometra",
    founder: true,
    office: null,
    bio:
      "Classe 1988, abilitato alla professione nel 2010 e iscritto al Collegio dei Geometri della Provincia dell'Aquila dal 2012. Si occupa di accatastamenti, rilievi topografici e certificazione energetica, e segue direzione lavori e progettazione architettonica e urbanistica.",
  },
  {
    name: "Mario Di Menna",
    photo: "/team/mario-di-menna.jpg",
    role: "Geometra",
    founder: true,
    office: null,
    bio:
      "Classe 1989, abilitato nel 2010 e iscritto al Collegio dei Geometri della Provincia dell'Aquila dal 2013. Accatastamenti, rilievi topografici e certificazione energetica, insieme alla direzione lavori e alla progettazione architettonica e urbanistica.",
  },
  {
    name: "Antonio Di Loreto",
    photo: "/team/antonio-di-loreto.jpg",
    role: "Ingegnere",
    founder: false,
    office: "Castel di Sangro",
    bio:
      "Classe 1993. Diploma di geometra, poi laurea triennale in Ingegneria Civile e Ambientale e magistrale in Ingegneria Civile all'Università dell'Aquila. Abilitato alla professione e qualificato come coordinatore per la sicurezza in progettazione ed esecuzione. È chi redige i progetti strutturali, dalla modellazione alle relazioni di calcolo fino ai computi metrici.",
  },
  {
    name: "Angelo D'Alessandro",
    photo: "/team/angelo-dalessandro.jpg",
    role: "Dottore in architettura",
    founder: false,
    office: "Castel di Sangro",
    bio:
      "Classe 1989. Diploma di geometra e studi di architettura alla G. d'Annunzio di Pescara, con esperienze in studi fra Abruzzo e Molise. Segue la progettazione architettonica, in particolare quella complessa su edifici pubblici e privati, e si occupa di contabilità dei lavori e certificazione energetica.",
  },
  {
    name: "Maria Laura Di Franco",
    photo: "/team/maria-laura-di-franco.jpg",
    role: "Dottoressa in architettura",
    founder: false,
    office: "Castel di Sangro",
    bio:
      "Classe 1995. Diploma scientifico e laurea in Architettura alla G. d'Annunzio. Segue la progettazione architettonica ordinaria, la certificazione energetica e le pratiche catastali, compresi i frazionamenti.",
  },
  {
    name: "Francesca Savaiano",
    photo: "/team/francesca-savaiano.jpg",
    role: "Geometra",
    founder: false,
    office: "Castel di Sangro",
    bio:
      "Classe 1998, diplomata geometra e abilitata alla professione. Si occupa di accatastamenti, rilievi topografici e certificazione energetica degli edifici.",
  },
  {
    name: "Marika Di Nicola",
    photo: "/team/marika-di-nicola.jpg",
    role: "Interior designer",
    founder: false,
    office: "Pescara",
    bio:
      "Classe 2000. Diploma tecnico e specializzazione in interior design, con esperienze in altri studi abruzzesi. In studio segue la progettazione degli interni, la restituzione digitale dei progetti, la post produzione e la grafica.",
  },
];

export const FOUNDED = {
  studio: "maggio 2013",
  societa: "settembre 2021",
};
