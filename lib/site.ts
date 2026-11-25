export const SITE = {
  name: "MRM Studio",
  legalName: "MRM Studio - Società di Architettura e Ingegneria SRL",
  url: "https://mrmstudio.it",
  email: "info@mrmstudio.it",
  vatNumber: "02120610668",
  rea: "AQ-203011",
  offices: [
    {
      id: "pescara",
      city: "Pescara",
      region: "Abruzzo",
      streetAddress: "Via Marino da Caramanico 13",
      phone: "+390852059552",
      phoneDisplay: "085 2059552",
      mobile: "+393284006099",
      mobileDisplay: "328 4006099",
      mapsUrl: "https://maps.app.goo.gl/6ZaGCcL5hkAgoLZD7",
    },
    {
      id: "castel-di-sangro",
      city: "Castel di Sangro",
      region: "Abruzzo",
      streetAddress: "Piazza Teofilo Patini 1",
      phone: "+390864845252",
      phoneDisplay: "0864 845252",
      mobile: "+393898769606",
      mobileDisplay: "389 8769606",
      mapsUrl: "https://maps.app.goo.gl/3UjuairwXsMuniN29",
    },
  ],
} as const;

export type Office = (typeof SITE.offices)[number];

/**
 * L'indirizzo WhatsApp di una sede, ricavato dal cellulare che sta gia'
 * nella scheda: un secondo campo da tenere allineato a mano sarebbe la
 * prima cosa a divergere. wa.me vuole il numero senza il piu' e senza spazi.
 *
 * Il messaggio precompilato dice da dove arriva chi scrive: su un telefono
 * di studio che riceve anche altro, sapere che la richiesta viene dal sito
 * cambia il modo di rispondere. Resta modificabile prima dell'invio, come
 * ogni messaggio WhatsApp.
 */
export function whatsappUrl(office: Office): string {
  const numero = office.mobile.replace(/[^0-9]/g, "");
  const testo = encodeURIComponent(`Buongiorno, vi scrivo dal sito ${SITE.name}.`);
  return `https://wa.me/${numero}?text=${testo}`;
}
