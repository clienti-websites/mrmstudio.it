import Link from "next/link";
import { Hero } from "@/components/Hero";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";
import { ProjectGrid } from "@/components/ProjectGrid";
import { StatsSection } from "@/components/StatsSection";
import { CtaBand } from "@/components/CtaBand";
import { getAllProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getAllProjects().slice(0, 8);

  return (
    <>
      <Hero
        image={{ src: "/progetti/via-fedra-3/01-vista-aerea.jpg", alt: "Vista aerea di un progetto residenziale MRM Studio a Pescara" }}
        title="Dall'idea alla consegna delle chiavi."
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

      <StatsSection
        stats={[
          { label: "Anni di attività", value: null },
          { label: "Opere realizzate", value: null },
          { label: "Importo lavori gestito", value: null },
          { label: "Cantieri seguiti", value: null },
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

      <CtaBand
        title="Un solo interlocutore, dall'idea alla consegna."
        cta="Contattaci"
        href="/contatti"
        tone="dark"
      />
    </>
  );
}
