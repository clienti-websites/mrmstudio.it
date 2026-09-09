import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const PROJECTS_DIR = path.join(process.cwd(), "content/progetti");

export const PHASES = ["progettazione", "appalto", "direzione-lavori", "maestranze"] as const;
export type Phase = (typeof PHASES)[number];

export const CATEGORIES = [
  "residenziale",
  "ristrutturazione-e-recupero",
  "direzionale-e-commerciale",
  "ricettivo-e-turistico",
] as const;
export type Category = (typeof CATEGORIES)[number];

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});
export type GalleryImage = z.infer<typeof galleryImageSchema>;

export const frontmatterSchema = z.object({
  title: z.string(),
  location: z.string(),
  year: z.string(),
  category: z.enum(CATEGORIES),
  budget: z.string().nullable().default(null),
  phases: z.array(z.enum(PHASES)).min(1),
  coverImage: galleryImageSchema,
  gallery: z.array(galleryImageSchema).min(1),
  outcome: z.string(),
  excerpt: z.string(),
});
export type ProjectFrontmatter = z.infer<typeof frontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProjectBySlug(slug: string): Project {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = frontmatterSchema.parse(data);
  return { slug, content, ...frontmatter };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map(getProjectBySlug)
    .sort((a, b) => b.year.localeCompare(a.year));
}

export function getProjectsByCategory(category: Category): Project[] {
  return getAllProjects().filter((project) => project.category === category);
}
