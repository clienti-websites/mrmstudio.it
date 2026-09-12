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
  "urbanistica-e-spazio-pubblico",
] as const;
export type Category = (typeof CATEGORIES)[number];

const galleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});
export type GalleryImage = z.infer<typeof galleryImageSchema>;

// Most works migrated from the studio's own archive have images but no
// published year, cost, or record of which phases MRM handled. Those fields
// are nullable so a project can be shown honestly with what is known, rather
// than padded with figures nobody verified.
export const frontmatterSchema = z.object({
  title: z.string(),
  location: z.string(),
  year: z.string().nullable().default(null),
  category: z.enum(CATEGORIES),
  budget: z.string().nullable().default(null),
  phases: z.array(z.enum(PHASES)).default([]),
  coverImage: galleryImageSchema,
  gallery: z.array(galleryImageSchema).min(1),
  // Chi ha seguito l'opera. Viene dalla sezione PROJECT TEAM delle schede
  // del sito attuale: i nomi sono quelli dichiarati da MRM, i ruoli sono la
  // traduzione delle etichette inglesi usate lì.
  team: z.array(z.object({ name: z.string(), role: z.string() })).default([]),
  outcome: z.string().nullable().default(null),
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

const SLUG_PATTERN = /^[a-z0-9-]+$/;

export function getProjectBySlug(slug: string): Project {
  if (!SLUG_PATTERN.test(slug)) {
    const error = new Error(`Invalid project slug: ${slug}`) as NodeJS.ErrnoException;
    error.code = "ENOENT";
    throw error;
  }

  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const frontmatter = frontmatterSchema.parse(data);
  return { slug, content, ...frontmatter };
}

export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map(getProjectBySlug)
    .sort((a, b) => {
      // Dated works first, most recent first; undated ones keep a stable
      // alphabetical order at the end rather than jumping around.
      if (a.year && b.year) return b.year.localeCompare(a.year);
      if (a.year) return -1;
      if (b.year) return 1;
      return a.title.localeCompare(b.title);
    });
}

export function getProjectsByCategory(category: Category): Project[] {
  return getAllProjects().filter((project) => project.category === category);
}

export function getProjectsByPhase(phase: Phase): Project[] {
  return getAllProjects().filter((project) => project.phases.includes(phase));
}
