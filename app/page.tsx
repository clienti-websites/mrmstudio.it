import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";
import { ProjectGrid } from "@/components/ProjectGrid";
import { StatsSection } from "@/components/StatsSection";
import { ContactForm } from "@/components/ContactForm";
import { getAllProjects } from "@/lib/projects";
import { getLavoriStats } from "@/lib/lavori";
import { SITE } from "@/lib/site";

// Filmato temporaneo, da sostituire con quello di MRM prima della messa
// online: cambiare questi due percorsi e sostituire i file in public/video.
const HERO_VIDEO = {
  src: "/video/hero.mp4",
  poster: "/video/hero-poster.jpg",
};

export default function HomePage() {
  const projects = getAllProjects().slice(0, 8);
  const stats = getLavoriStats();

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
          <h2 className="mb-10 text-2xl font-black text-grafite md:text-3xl">Progetti</h2>
          {projects.length > 0 ? (
            <ProjectGrid projects={projects} />
          ) : (
            <p className="text-pietra">Nuove schede progetto in arrivo.</p>
          )}
        </div>
      </section>

      {/*
        Le cifre sono calcolate dall'elenco lavori pubblicato dallo studio,
        non scritte a mano, e sono per definizione dei minimi: quell'elenco è
        una selezione, non la storia completa dello studio. Per questo sono
        presentate come "oltre" e la nota sotto lo dice apertamente — un
        numero secco leggerebbe come "hanno fatto solo questo".
      */}
      <StatsSection
        stats={[
          // Dato fornito dallo studio, da confermare prima della pubblicazione.
          { label: "Anni di attività", value: "25+" },
          {
            label: "Importo lavori gestito",
            value: `oltre € ${Math.floor(stats.importoTotale / 1_000_000)} mln`,
          },
          { label: "Cantieri seguiti in direzione lavori", value: `oltre ${stats.conDirezioneLavori}` },
          { label: "Sedi in Abruzzo", value: String(SITE.offices.length) },
        ]}
        note="Cifre ricavate dai lavori documentati sul sito: i totali effettivi dello studio sono superiori."
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
