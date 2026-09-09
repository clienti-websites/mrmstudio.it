import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contatti — Pescara e Castel di Sangro",
  description: "Contatta MRM Studio: sede a Pescara e a Castel di Sangro, Abruzzo.",
};

export default function ContattiPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 md:px-12">
      {SITE.offices.map((office) => (
        <LocalBusinessJsonLd key={office.id} office={office} />
      ))}

      <h1 className="mb-10 text-3xl font-black text-grafite md:text-4xl">Contatti</h1>

      <div className="grid gap-16 md:grid-cols-2">
        <div className="space-y-10">
          {SITE.offices.map((office) => (
            <div key={office.id}>
              <h2 className="mb-1 text-xl font-medium text-grafite">{office.city}</h2>
              <p className="text-pietra">{office.streetAddress}</p>
              <a href={`tel:${office.phone}`} className="mt-2 block text-muschio underline">
                {office.phoneDisplay}
              </a>
              <a href={`tel:${office.mobile}`} className="block text-muschio underline">
                {office.mobileDisplay}
              </a>
              <a
                href={office.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-block text-sm text-pietra underline"
              >
                Indicazioni stradali
              </a>
            </div>
          ))}
          <a href={`mailto:${SITE.email}`} className="block text-muschio underline">
            {SITE.email}
          </a>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
