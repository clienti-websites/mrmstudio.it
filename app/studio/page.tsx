import type { Metadata } from "next";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { FOUNDED, TEAM } from "@/lib/team";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Lo studio e le persone, a Pescara e Abruzzo",
  description:
    "Chi lavora in MRM Studio: architetti, ingegneri, geometri e interior designer, fra la sede di Pescara e quella di Castel di Sangro.",
};

export default function StudioPage() {
  const fondatori = TEAM.filter((persona) => persona.founder);
  const collaboratori = TEAM.filter((persona) => !persona.founder);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Lo Studio</h1>
      <p className="mb-4 max-w-2xl text-lg text-grafite">
        Siamo una società di architettura e ingegneria, con studio a Pescara e a Castel di Sangro. Progettiamo
        ogni disciplina qui dentro e restiamo sui lavori fino alla consegna delle chiavi.
      </p>
      <p className="mb-14 max-w-2xl text-pietra">
        Lo studio nasce nel {FOUNDED.studio} e diventa società nel {FOUNDED.societa}. Oggi ci lavorano{" "}
        {TEAM.length} persone fra architetti, ingegneri, geometri e interior designer, ed è il motivo per cui
        architettonico, strutture, impianti ed energetico non escono da studi diversi.
      </p>

      {/*
        I profili stanno in colonna, non in griglia: hanno lunghezze molto
        diverse e una griglia di riquadri li avrebbe allineati a forza,
        lasciando buchi sotto i più corti. Il nome fa da àncora a sinistra e
        il testo scorre accanto; su telefono si impilano.
      */}
      <section className="border-t border-nebbia py-12">
        <h2 className="text-2xl font-black text-grafite">Chi ha fondato lo studio</h2>
        <p className="mt-2 max-w-2xl text-pietra">
          Soci fondatori dello studio dal {FOUNDED.studio} e della società dal {FOUNDED.societa}.
        </p>

        <div className="mt-8">
          {fondatori.map((persona) => (
            <article
              key={persona.name}
              className="grid gap-1 border-t border-nebbia py-7 md:grid-cols-[13rem_1fr] md:gap-10"
            >
              <div>
                <div className="relative mb-3 aspect-[3/4] w-28 overflow-hidden bg-nebbia">
                  <Image
                    src={persona.photo}
                    alt={`Ritratto di ${persona.name}`}
                    fill
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="font-medium text-grafite">{persona.name}</h3>
                <p className="text-sm text-pietra">{persona.role}</p>
              </div>
              <p className="text-grafite">{persona.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-nebbia py-12">
        <h2 className="text-2xl font-black text-grafite">Chi ci lavora</h2>

        <div className="mt-8">
          {collaboratori.map((persona) => (
            <article
              key={persona.name}
              className="grid gap-1 border-t border-nebbia py-7 md:grid-cols-[13rem_1fr] md:gap-10"
            >
              <div>
                <div className="relative mb-3 aspect-[3/4] w-28 overflow-hidden bg-nebbia">
                  <Image
                    src={persona.photo}
                    alt={`Ritratto di ${persona.name}`}
                    fill
                    sizes="112px"
                    className="object-cover object-top"
                  />
                </div>
                <h3 className="font-medium text-grafite">{persona.name}</h3>
                <p className="text-sm text-pietra">{persona.role}</p>
                {persona.office && <p className="mt-1 text-sm text-pietra">Sede di {persona.office}</p>}
              </div>
              <p className="text-grafite">{persona.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-t border-nebbia py-12">
        <h2 className="mb-6 text-2xl font-black text-grafite">Le sedi</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {SITE.offices.map((office) => (
            <div key={office.id}>
              <p className="font-medium text-grafite">{office.city}</p>
              <p className="text-pietra">{office.streetAddress}</p>
              <a href={`tel:${office.phone}`} className="mt-1 block py-2 text-sm text-muschio underline">
                {office.phoneDisplay}
              </a>
            </div>
          ))}
        </div>
      </section>

      <CtaBand title="Vuoi conoscerci di persona?" cta="Contattaci" href="/contatti" />
    </div>
  );
}
