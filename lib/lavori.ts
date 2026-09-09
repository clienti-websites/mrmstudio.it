/**
 * Trascrizione dell'elenco lavori dichiarato da MRM Studio.
 *
 * Ogni voce riporta solo quanto lo studio ha già pubblicato: dove il dato non
 * c'è (importo non divulgato, luogo non indicato) il campo resta null e la
 * tabella lo mostra come non dichiarato, senza colmarlo.
 *
 * `slug` collega la voce alla scheda progetto con le immagini, dove esiste.
 */
export interface Lavoro {
  anno: string;
  committenza: "Privata" | "Pubblica";
  luogo: string | null;
  intervento: string;
  importo: string | null;
  prestazioni: string;
  slug?: string;
}

const PRESTAZIONI_COMPLETE =
  "Rilievo e grafici di restituzione, progetto architettonico, energetico e impianti, modellazione fotorealistica, grafici esecutivi, direzione lavori";

const PRESTAZIONI_RILIEVO_E_PROGETTO =
  "Rilievo topografico GPS, rilievo architettonico, grafici di restituzione DOCFA, progetto energetico e impianti";

export const LAVORI: Lavoro[] = [
  {
    anno: "2022 – in corso",
    committenza: "Privata",
    luogo: null,
    intervento: "Complessi residenziali da cinquantaquattro unità",
    importo: null,
    prestazioni: PRESTAZIONI_RILIEVO_E_PROGETTO,
    slug: "harmonia",
  },
  {
    anno: "2022 – in corso",
    committenza: "Privata",
    luogo: null,
    intervento: "Complesso residenziale da ventiquattro unità",
    importo: null,
    prestazioni: PRESTAZIONI_RILIEVO_E_PROGETTO,
  },
  {
    anno: "2022 – in corso",
    committenza: "Privata",
    luogo: "Pescara, Via Tiburtina 21",
    intervento:
      "Demolizione e ricostruzione di edificio residenziale, con adeguamento sismico ed efficientamento energetico",
    importo: "€ 3.200.000",
    prestazioni: PRESTAZIONI_COMPLETE,
  },
  {
    anno: "2022 – in corso",
    committenza: "Privata",
    luogo: "Castel di Sangro (AQ), Contrada Sant'Angelo, Masserie Paone",
    intervento:
      "Demolizione e ricostruzione di edificio residenziale, con adeguamento sismico ed efficientamento energetico",
    importo: "€ 1.300.000",
    prestazioni: PRESTAZIONI_COMPLETE,
  },
  {
    anno: "2021 – in corso",
    committenza: "Privata",
    luogo: "Pescara, Via dei Marsi 43",
    intervento: "Manutenzione straordinaria di edificio residenziale",
    importo: "€ 900.000",
    prestazioni: PRESTAZIONI_COMPLETE,
  },
  {
    anno: "2021 – in corso",
    committenza: "Privata",
    luogo: "Montesilvano, Corso Umberto 447-449",
    intervento: "Trasformazione di area a destinazione commerciale",
    importo: "€ 1.500.000",
    prestazioni: PRESTAZIONI_COMPLETE,
  },
  {
    anno: "2020 – in corso",
    committenza: "Privata",
    luogo: "Pescara, Via Venezia 4",
    intervento:
      "Manutenzione straordinaria con cambio di destinazione d'uso, nove unità residenziali",
    importo: "€ 900.000",
    prestazioni: PRESTAZIONI_COMPLETE,
    slug: "via-venezia",
  },
  {
    anno: "2019 – in corso",
    committenza: "Privata",
    luogo: "Castel di Sangro (AQ), S.S. 17",
    intervento: "Ventiquattro ville bifamiliari",
    importo: "€ 2.000.000",
    prestazioni:
      "Rilievo architettonico, grafici di restituzione, progetto architettonico ed energetico, modellazione fotorealistica, business plan",
  },
  {
    anno: "2018 – in corso",
    committenza: "Privata",
    luogo: "Pescara, Viale Guglielmo Marconi 136",
    intervento: "Ex uffici del NAS Carabinieri, trasformazione in unità residenziali",
    importo: "€ 500.000",
    prestazioni:
      "Rilievo e grafici di restituzione, progetto architettonico ed energetico, modellazione fotorealistica, grafici esecutivi, direzione lavori, certificazione di conformità, business plan",
  },
  {
    anno: "2018 – in corso",
    committenza: "Privata",
    luogo: "Pescara, Viale G. D'Annunzio",
    intervento: "Edificio a prevalenza residenziale",
    importo: "€ 5.000.000",
    prestazioni: "Progetto preliminare, business plan",
  },
  {
    anno: "2018 – 2019",
    committenza: "Privata",
    luogo: "Ussita (MC) e Tolentino (MC)",
    intervento:
      "Quattro edifici danneggiati dal sisma del 2016: riparazione e ricostruzione (incarico in ATP)",
    importo: "€ 5.500.000",
    prestazioni:
      "Rilievo architettonico, analisi del danno, progetto architettonico definitivo, progetto strutturale esecutivo, computo",
  },
  {
    anno: "2018 – 2019",
    committenza: "Privata",
    luogo: "Castel di Sangro (AQ), Comparto B6",
    intervento: "Piano Particolareggiato di area urbana a destinazione mista pubblica e privata",
    importo: "€ 12.000.000",
    prestazioni: "Pianificazione infrastrutturale e insediativa, coordinamento con gli enti",
  },
  {
    anno: "2017 – in corso",
    committenza: "Pubblica",
    luogo: "Castel di Sangro (AQ), Area Campus School",
    intervento: "Scuola primaria, opera strategica di Classe IV",
    importo: "€ 6.500.000, di cui € 1.250.000 per il primo stralcio",
    prestazioni:
      "Progetto architettonico definitivo, progetto strutturale esecutivo, modellazione fotorealistica, grafici esecutivi, computo",
  },
  {
    anno: "2016 – in corso",
    committenza: "Privata",
    luogo: "Roccaraso (AQ), Via Napoli, Ex Macello",
    intervento: "Piano di Intervento Integrato in project financing",
    importo: "€ 8.000.000",
    prestazioni: "Grafici di piano, testo normativo, coordinamento con gli enti, presentazione",
  },
  {
    anno: "2016",
    committenza: "Privata",
    luogo: "Castel di Sangro (AQ), Località Piana S. Liberata",
    intervento: "Edificio residenziale di quattro unità",
    importo: "€ 600.000",
    prestazioni:
      "Progetto definitivo, energetico e impianti, modellazione fotorealistica, grafici esecutivi, direzione lavori fino a fine lavori",
  },
  {
    anno: "2015",
    committenza: "Pubblica",
    luogo: "Scontrone (AQ)",
    intervento: "Integrazioni per le procedure VAS e VINCA del Piano Regolatore Generale (CIG ZF414ACD1F)",
    importo: null,
    prestazioni: "Elaborazione dei grafici progettuali, revisione del piano, stesura finale",
  },
  {
    anno: "2014",
    committenza: "Privata",
    luogo: "Area Campus School",
    intervento:
      "Scuola secondaria di primo grado con appalto integrato, incarico in ATP (Encema Srl). Terzo posto su oltre trenta concorrenti",
    importo: "€ 5.000.000",
    prestazioni: "Progetto architettonico definitivo, modellazione fotorealistica",
  },
  {
    anno: "2013 – 2016",
    committenza: "Privata",
    luogo: "Pescara, Via Fedra 3",
    intervento: "Edificio residenziale, demolizione e ricostruzione",
    importo: "€ 750.000",
    prestazioni:
      "Progetto definitivo, energetico e impianti, progetto esecutivo strutturale, modellazione fotorealistica, grafici esecutivi, direzione lavori, collaudo, agibilità",
    slug: "via-fedra-3",
  },
  {
    anno: "2013 – 2016",
    committenza: "Pubblica",
    luogo: "Scontrone (AQ)",
    intervento: "Piano Regolatore Generale (CIG Z3908A128E)",
    importo: null,
    prestazioni:
      "Elaborazione dei grafici progettuali di piano, collaborazione al testo normativo, documenti integrativi, revisione finale",
  },
];

/**
 * Statistiche ricavate dall'elenco lavori, non inserite a mano: restano vere
 * man mano che si aggiungono voci, e ogni cifra e' risalibile alla riga che
 * la produce. Gli importi non divulgati non entrano nella somma, quindi il
 * totale e' una stima per difetto.
 */
export function getLavoriStats() {
  const importi = LAVORI.map((lavoro) => lavoro.importo)
    .filter((importo): importo is string => importo !== null)
    // Primo numero della stringa: "€ 6.500.000, di cui € 1.250.000..." conta
    // l'importo dell'opera, non lo stralcio.
    .map((importo) => Number(importo.replace(/^[^\d]*/, "").split(",")[0].replace(/\./g, "")))
    .filter((valore) => Number.isFinite(valore) && valore > 0);

  return {
    lavori: LAVORI.length,
    importoTotale: importi.reduce((somma, valore) => somma + valore, 0),
    conDirezioneLavori: LAVORI.filter((lavoro) => /direzione lavori/i.test(lavoro.prestazioni)).length,
  };
}
