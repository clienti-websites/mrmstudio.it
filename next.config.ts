import type { NextConfig } from "next";

/**
 * Rimandi dagli indirizzi del sito attuale a quelli nuovi.
 *
 * Servono il giorno della pubblicazione: quelle pagine sono online da anni e
 * i motori le conoscono. Senza questi rimandi, tutto il posizionamento
 * costruito finora finirebbe su pagine inesistenti e si ripartirebbe da zero.
 *
 * Le corrispondenze delle opere non sono a occhio: ogni scheda vecchia è
 * stata confrontata con la nuova per titolo, luogo e descrizione. Due erano
 * ambigue e sono state verificate sul testo (la demolizione e ricostruzione
 * corrisponde a Via Fedra 3, l'integrazione del tessuto urbano a Un Nuovo
 * Equilibrio Urbano).
 *
 * Non compaiono qui /contatti, /assistenza-cantieristica-e-direzione-lavori e
 * /ristrutturazioni-chiavi-in-mano: nel sito nuovo hanno lo stesso indirizzo,
 * quindi non c'è niente da rimandare.
 */
const PAGINE: Array<[string, string]> = [
  ["/chi-siamo", "/studio"],
  ["/team", "/studio"],
  ["/lavori", "/progetti"],
  ["/lavori/i-nostri-progetti", "/progetti"],
  ["/esperienze", "/progetti"],
  ["/privacy-policy", "/privacy"],
  ["/cookie-policy", "/privacy"],
  ["/prova-slide", "/"],
];

const OPERE: Array<[string, string]> = [
  ["polo-commerciale-polaris", "polo-commerciale-polaris"],
  ["casa-daccoglienza-beata-elena-aiello", "casa-accoglienza-elena-aiello"],
  ["villa-liberty", "villa-liberty"],
  ["residenza-privata", "residenza-privata"],
  ["residenza-di-montagna", "residenza-di-montagna"],
  ["residenze-di-montagna", "residenze-alto-sangro"],
  ["residenze-urbane-via-tiburtina", "via-tiburtina"],
  ["residenze-urbane-via-venezia", "via-venezia"],
  ["alloggi-di-montagna", "rifugi-di-montagna"],
  ["residenza-privata-di-montagna", "residenza-alto-sangro"],
  ["residenza-via-marchetti", "via-marchetti"],
  ["residenza-via-italica", "via-italica"],
  ["03-interior-design", "via-del-milite-ignoto"],
  ["residenza-via-bardet", "via-bardet"],
  ["corso-vittorio-emanuele-ii", "corso-vittorio-emanuele"],
  ["residenza-piazza-alessandrini", "piazza-alessandrini"],
  ["conversione-e-riqualificazione-urbanistica", "ex-scuola-alto-sangro"],
  ["rifunzionalizzazione-e-rigenerazione-dellarea-degradata-del-parco-comunale", "parco-comunale-fornelli"],
  ["eyra-contemporary-living", "eyra"],
  ["harmonia-eco-sustainable-residential-park", "harmonia"],
  ["arborea-designed-for-living", "arborea"],
  ["demolizione-e-ricostruzione-di-un-edificio-residenziale", "via-fedra-3"],
  ["progetto-di-integrazione-e-valorizzazione-del-tessuto-urbano", "equilibrio-urbano"],
  ["vista-mare", "vista-mare"],
];

const nextConfig: NextConfig = {
  /* config options here */
  // yet-another-react-lightbox ships ESM-only (no CJS build); this makes both
  // the Next.js build and the Jest test transform handle it correctly.
  transpilePackages: ["yet-another-react-lightbox"],

  images: {
    // AVIF prima di WebP: comprime circa un quinto in meno a parita' di
    // resa, e chi non lo supporta riceve comunque il WebP. La prima
    // conversione e' piu' lenta, poi resta in cache.
    formats: ["image/avif", "image/webp"],
  },

  async headers() {
    // Il sito attuale non manda nessuna di queste. Sono le protezioni che un
    // browser applica solo se glielo si chiede: obbligo di connessione
    // cifrata, divieto di indovinare il tipo di un file, divieto di
    // incorniciare le pagine dentro un altro sito, e un freno a quanto
    // indirizzo si porta dietro chi esce da qui.
    return [
      {
        source: "/:percorso*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Il sito non usa né camera, né microfono, né posizione: dirlo
          // impedisce a un eventuale contenuto di terzi di chiederli.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        ],
      },
    ];
  },

  async redirects() {
    return [
      ...PAGINE.map(([source, destination]) => ({ source, destination, permanent: true })),
      ...OPERE.map(([vecchio, nuovo]) => ({
        source: `/portfolio-item/${vecchio}`,
        destination: `/progetti/${nuovo}`,
        permanent: true,
      })),
      // Qualunque altra scheda del vecchio portfolio finisce sull'elenco
      // completo invece che su una pagina di errore.
      { source: "/portfolio-item/:slug*", destination: "/progetti", permanent: true },
    ];
  },
};

export default nextConfig;
