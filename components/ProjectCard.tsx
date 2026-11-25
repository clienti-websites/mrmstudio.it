import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <Link href={`/progetti/${project.slug}`} className={`group block ${featured ? "md:col-span-2" : ""}`}>
      <div
        className={`relative w-full overflow-hidden bg-nebbia ${
          featured ? "aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
        }`}
      >
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          // La griglia sta in un contenitore da 1152px: oltre quella soglia
          // l'immagine non cresce più, e dichiarare 100vw farebbe scaricare
          // file più grandi del necessario sugli schermi larghi.
          sizes={
            featured
              ? "(min-width: 1152px) 1152px, 100vw"
              : "(min-width: 1152px) 568px, (min-width: 768px) 50vw, 100vw"
          }
          // L'ingrandimento andava a scatti: il browser ri-rasterizzava una
          // fotografia grande a ogni fotogramma. transform-gpu la promuove a
          // un livello suo una volta sola, invece di ridisegnarla, e un
          // ingrandimento piu' corto su una curva piu' lunga lascia meno
          // lavoro per fotogramma.
          className="object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.03]"
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
