import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/progetti", "/servizi", "/studio", "/impegno-sociale", "/contatti"].map((route) => ({
    url: `${SITE.url}${route}`,
    lastModified: new Date(),
  }));

  const projectRoutes = getAllProjects().map((project) => ({
    url: `${SITE.url}/progetti/${project.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes];
}
