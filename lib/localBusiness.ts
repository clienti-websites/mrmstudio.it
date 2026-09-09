import { SITE, type Office } from "./site";

export function buildLocalBusinessJsonLd(office: Office) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${SITE.name} — ${office.city}`,
    url: SITE.url,
    telephone: office.phone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: office.streetAddress,
      addressLocality: office.city,
      addressRegion: office.region,
      addressCountry: "IT",
    },
    areaServed: "Abruzzo",
  } as const;
}
