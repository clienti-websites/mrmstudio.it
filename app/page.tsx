import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";
import { ProjectsWithFilter } from "@/components/ProjectsWithFilter";
import { StatsSection } from "@/components/StatsSection";
import { ContactForm } from "@/components/ContactForm";
import { CATEGORIES, getAllProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

// Filmato temporaneo, da sostituire con quello di MRM prima della messa
// online: cambiare questi due percorsi e sostituire i file in public/video.
const HERO_VIDEO = {
  src: "/video/hero.mp4",
  poster: "/video/hero-poster.jpg",
};

export default function HomePage() {
  const projects = getAllProjects();

  return (
    <>
      <Hero
        image={{ src: "/progetti/via-fedra-3/01-vista-aerea.jpg", alt: "Vista aerea di un progetto residenziale MRM Studio a Pescara" }}
        title="Dall'idea alla consegna delle chiavi."
        video={HERO_VIDEO}
        ctaHref="#contatti"
      />

      <PercorsoCompleto />

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-grafite md:text-3xl">Progetti</h2>
              <p className="mt-2 text-pietra">Una selezione. Cambia tipologia per vederne altri.</p>
            </div>
            <Link href="/progetti" className="text-muschio underline">
              Tutti i progetti e i lavori svolti
            </Link>
          </div>
          {projects.length > 0 ? (
            <ProjectsWithFilter projects={projects} categories={[...CATEGORIES]} limit={3} />
          ) : (
            <p className="text-pietra">Nuove schede progetto in arrivo.</p>
          )}
        </div>
      </section>

      {/*
        Niente importo lavori aggregato qui: sommare le opere darebbe una
        cifra in gran parte relativa a incarichi di solo progetto o piano
        urbanistico, che lo studio non ha "gestito". Il dettaglio corretto,
        importo per importo e con le prestazioni svolte, sta nella tabella
        dei lavori in /progetti.

        Anni e cantieri sono dati forniti dallo studio, non ricavati
        dall'elenco pubblicato (che ne documenta una parte): vanno confermati
        da MRM prima della messa online.
      */}
      <StatsSection
        title="Lo studio in breve"
        intro="Progettazione sviluppata internamente, cantieri seguiti di persona, due sedi in Abruzzo."
        stats={[
          { label: "Anni di attività", value: "19+" },
          { label: "Cantieri seguiti in direzione lavori", value: "20+" },
          { label: "Sedi in Abruzzo", value: String(SITE.offices.length) },
        ]}
      />

      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-2xl font-black text-grafite md:text-3xl">Impegno sociale</h2>
          <p className="text-pietra">
            Materiale e dettagli in arrivo da MRM Studio.{" "}
            <Link href="/impegno-sociale" className="text-muschio underline">
              Scopri di più
            </Link>
          </p>
        </div>
      </section>

      <section id="contatti" aria-labelledby="contatti-titolo" className="scroll-mt-20 bg-grafite px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <h2 id="contatti-titolo" className="text-2xl font-black text-carta md:text-3xl">
              Un solo interlocutore, dall&apos;idea alla consegna.
            </h2>
            <p className="mt-4 text-carta/80">
              Raccontaci l&apos;intervento che hai in mente. Ti richiamiamo noi.
            </p>
            <div className="mt-8 space-y-4 text-sm">
              {SITE.offices.map((office) => (
                <div key={office.id}>
                  <p className="font-medium text-carta">{office.city}</p>
                  <a href={`tel:${office.phone}`} className="text-carta/70 hover:text-carta">
                    {office.phoneDisplay}
                  </a>
                </div>
              ))}
              <a href={`mailto:${SITE.email}`} className="block text-carta/70 hover:text-carta">
                {SITE.email}
              </a>
              <Link href="/contatti" className="inline-block text-carta underline">
                Indicazioni e mappe delle due sedi
              </Link>
            </div>
          </div>

          <div className="bg-carta p-6 md:p-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
