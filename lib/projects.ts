import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const PROJECTS_DIR = path.join(process.cwd(), "content/progetti");

// I tre approcci con cui lo studio entra in un lavoro, dichiarati da MRM
// opera per opera. Non sono fasi: non c'e' un ordine e non si attraversano
// tutti. Direzione lavori e interior design erano due di queste voci, ma
// sono prestazioni dentro la progettazione, non modi di entrare.
export const PHASES = ["progettazione", "appalto", "sviluppo-immobiliare"] as const;
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

// Anno, importo e approcci sono quelli dichiarati da MRM l'11 novembre 2026,
// opera per opera. Restano annullabili per le schede che dovessero arrivare
// dopo senza quei dati: meglio una scheda onesta a meta' che una riempita
// con numeri che nessuno ha confermato.
export const frontmatterSchema = z.object({
  title: z.string(),
  location: z.string(),
  year: z.string().nullable().default(null),
  category: z.enum(CATEGORIES),
  budget: z.string().nullable().default(null),
  phases: z.array(z.enum(PHASES)).default([]),
  coverImage: galleryImageSchema,
  gallery: z.array(galleryImageSchema).min(1),
  // Il modello tridimensionale, quando lo studio ce l'ha: un .glb compresso
  // in public/modelli. Quasi nessuna scheda ne ha uno, da qui il nullable.
  modello: z.string().nullable().default(null),
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
