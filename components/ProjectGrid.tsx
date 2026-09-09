import type { Project } from "@/lib/projects";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.slug} project={project} featured={i % 3 === 0} />
      ))}
    </div>
  );
}
