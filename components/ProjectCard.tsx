import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link
      href={`/progetti/${project.slug}`}
      className={`group relative block overflow-hidden bg-nebbia ${featured ? "md:col-span-2" : ""}`}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-grafite/80 to-transparent p-4">
        <p className="font-medium text-white">{project.title}</p>
        <p className="text-sm text-white/80">{project.location}</p>
      </div>
    </Link>
  );
}
