import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Niente lastModified: rigenerandolo a ogni build dichiarerebbe che ogni
  // pagina e' cambiata a ogni pubblicazione, e non e' vero. Meglio nessuna
  // data che una data falsa.
  const staticRoutes = [
    "",
    "/progetti",
    "/servizi",
    "/assistenza-cantieristica-e-direzione-lavori",
    "/ristrutturazioni-chiavi-in-mano",
    "/studio",
    "/impegno-sociale",
    "/contatti",
    "/privacy",
  ].map((route) => ({
    url: `${SITE.url}${route}`,
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${SITE.url}/progetti/${project.slug}`,
  }));

  return [...staticRoutes, ...projectRoutes];
}
