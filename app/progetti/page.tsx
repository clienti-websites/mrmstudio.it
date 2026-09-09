import type { Metadata } from "next";
import { CATEGORIES, getAllProjects } from "@/lib/projects";
import { ProjectsWithFilter } from "@/components/ProjectsWithFilter";
import { TabellaLavori } from "@/components/TabellaLavori";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Progetti e lavori a Pescara e in Abruzzo",
  description:
    "I progetti di MRM Studio a Pescara, Castel di Sangro e in Abruzzo, e l'elenco completo dei lavori svolti con importi e prestazioni.",
};

export default function ProgettiPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
      <h1 className="text-3xl font-black text-grafite md:text-4xl">Progetti</h1>
      <div className="mt-10 mb-20">
        {projects.length > 0 ? (
          <ProjectsWithFilter projects={projects} categories={[...CATEGORIES]} />
        ) : (
          <p className="text-pietra">Nuove schede progetto in arrivo.</p>
        )}
      </div>

      <TabellaLavori />

      <CtaBand title="Vuoi discutere un intervento simile?" cta="Contattaci" href="/contatti" />
    </div>
  );
}
