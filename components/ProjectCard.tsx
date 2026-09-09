import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link href={`/progetti/${project.slug}`} className={`group block ${featured ? "md:col-span-2" : ""}`}>
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-nebbia">
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {/*
        A caption row below the image, rather than a text-over-image
        gradient overlay, gives the title/location a reliable contrast
        floor regardless of the photo underneath — no alpha-over-image
        math to get wrong.
      */}
      <div className="pt-3">
        <h3 className="font-medium text-grafite">{project.title}</h3>
        <p className="text-sm text-pietra">{project.location}</p>
      </div>
    </Link>
  );
}
