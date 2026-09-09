import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getProjectSlugs, type Project } from "@/lib/projects";
import { Gallery } from "@/components/Gallery";
import { FaseChecklist } from "@/components/FaseChecklist";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

// Resolves a project by slug, returning null only when the .mdx file genuinely
// doesn't exist (ENOENT). Any other error — e.g. a Zod parse failure from
// malformed frontmatter on an existing file — is a real content bug and must
// propagate rather than being silently swallowed into a 404.
function findProjectBySlug(slug: string): Project | null {
  try {
    return getProjectBySlug(slug);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = findProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.location}`,
    description: project.excerpt,
  };
}

export default async function ProgettoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = findProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:px-12">
      <Gallery images={project.gallery} />

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-nebbia pb-8">
        <div>
          <h1 className="text-3xl font-black text-grafite md:text-4xl">{project.title}</h1>
          <p className="mt-1 text-pietra">
            {project.location} · {project.year}
          </p>
        </div>
        {project.budget && <p className="text-lg font-medium text-grafite">{project.budget}</p>}
      </div>

      <div className="py-8">
        <FaseChecklist phases={[...project.phases]} />
      </div>

      <div className="prose max-w-none py-4 text-grafite">
        <MDXRemote source={project.content} />
      </div>

      <div className="mt-8 border-t border-nebbia pt-8">
        <h2 className="mb-2 font-medium text-grafite">Esito</h2>
        <p className="text-pietra">{project.outcome}</p>
      </div>

      <div className="mt-12 bg-nebbia p-8 text-center">
        <p className="mb-4 text-lg font-medium text-grafite">Hai un progetto simile in mente?</p>
        <Link href="/contatti" className="inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90">
          Parlaci del tuo progetto
        </Link>
      </div>
    </article>
  );
}
