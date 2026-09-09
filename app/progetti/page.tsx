import type { Metadata } from "next";
import { CATEGORIES, getAllProjects } from "@/lib/projects";
import { ProjectsWithFilter } from "@/components/ProjectsWithFilter";

export const metadata: Metadata = {
  title: "Progetti a Pescara e in Abruzzo",
  description: "I progetti realizzati da MRM Studio a Pescara, Castel di Sangro e in tutto l'Abruzzo.",
};

export default function ProgettiPage() {
  const projects = getAllProjects();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:px-12">
      <h1 className="mb-10 text-3xl font-black text-grafite md:text-4xl">Progetti</h1>
      {projects.length > 0 ? (
        <ProjectsWithFilter projects={projects} categories={[...CATEGORIES]} />
      ) : (
        <p className="text-pietra">Nuove schede progetto in arrivo.</p>
      )}
    </div>
  );
}
