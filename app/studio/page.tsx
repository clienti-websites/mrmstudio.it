import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lo Studio — Architettura e Ingegneria a Pescara e Abruzzo",
  description: "MRM Studio: sede a Pescara e a Castel di Sangro, progettazione interamente interna.",
};

export default function StudioPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Lo Studio</h1>
      <p className="mb-16 max-w-2xl text-pietra">
        MRM Studio è una società di architettura e ingegneria con sede a Pescara e a Castel di Sangro. Segue
        l&apos;opera dall&apos;idea alla consegna delle chiavi, con ogni disciplina di progettazione sviluppata
        internamente.
      </p>

      <section className="border-t border-nebbia py-12">
        <h2 className="mb-4 text-2xl font-black text-grafite">Il team</h2>
        <p className="text-pietra">
          Ritratti, nomi e abilitazioni dei professionisti dello studio: contenuto in arrivo da MRM Studio.
        </p>
      </section>

      <section className="border-t border-nebbia py-12">
        <h2 className="mb-4 text-2xl font-black text-grafite">Le sedi</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {SITE.offices.map((office) => (
            <div key={office.id}>
              <p className="font-medium text-grafite">{office.city}</p>
              <p className="text-pietra">{office.streetAddress}</p>
              <a href={`tel:${office.phone}`} className="mt-2 block text-sm text-muschio underline">
                {office.phoneDisplay}
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-16 bg-nebbia p-8 text-center">
        <p className="mb-4 text-lg font-medium text-grafite">Vuoi conoscerci di persona?</p>
        <Link href="/contatti" className="inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90">
          Contattaci
        </Link>
      </div>
    </div>
  );
}
