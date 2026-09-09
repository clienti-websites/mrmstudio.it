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
