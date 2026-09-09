import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getProjectBySlug, getProjectSlugs, type Project } from "@/lib/projects";
import { Gallery } from "@/components/Gallery";
import { FaseChecklist } from "@/components/FaseChecklist";
import { ContactForm } from "@/components/ContactForm";

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
            {[project.location, project.year].filter(Boolean).join(" · ")}
          </p>
        </div>
        {project.budget && <p className="text-lg font-medium text-grafite">{project.budget}</p>}
      </div>

      <div className="py-8">
        {project.phases.length > 0 ? (
          <FaseChecklist phases={[...project.phases]} />
        ) : (
          <p className="text-sm text-pietra">
            Prestazioni svolte su questo intervento: dettaglio in arrivo da MRM Studio.
          </p>
        )}
      </div>

      {/*
        No @tailwindcss/typography plugin here by design (this is a
        hand-built design system, and the plugin's opinions would fight
        it). Style the MDX output directly with arbitrary-variant rules on
        this wrapper instead — Tailwind v4 preflight zeroes all margins, so
        without this every paragraph/heading/list item would render flush
        against its neighbours.
      */}
      <div
        className="max-w-none py-4 text-grafite [&>blockquote]:mb-4 [&>blockquote]:max-w-[70ch] [&>blockquote]:border-l-2 [&>blockquote]:border-muschio [&>blockquote]:pl-4 [&>blockquote]:italic [&>h2]:mb-4 [&>h2]:mt-10 [&>h2]:text-2xl [&>h2]:font-black [&>h2]:text-grafite [&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-grafite [&>ol]:mb-4 [&>ol]:max-w-[70ch] [&>ol]:list-decimal [&>ol]:pl-6 [&>p]:mb-4 [&>p]:max-w-[70ch] [&>ul]:mb-4 [&>ul]:max-w-[70ch] [&>ul]:list-disc [&>ul]:pl-6 [&_a]:text-muschio [&_a]:underline [&_li]:mb-1"
      >
        <MDXRemote source={project.content} />
      </div>

      {project.outcome && (
        <div className="mt-8 border-t border-nebbia pt-8">
          <h2 className="mb-2 font-medium text-grafite">Esito</h2>
          <p className="text-pietra">{project.outcome}</p>
        </div>
      )}

      <section aria-labelledby="parlane-titolo" className="mt-16 scroll-mt-20 bg-nebbia p-8 md:p-12">
        <h2 id="parlane-titolo" className="text-2xl font-black text-grafite">
          Ti interessa un intervento come questo?
        </h2>
        <p className="mt-3 max-w-2xl text-pietra">
          Non serve avere già un progetto, né sapere cosa chiedere. Rispondi a tre domande e ti ricontattiamo
          noi: al resto pensiamo noi, come per {project.title}.
        </p>
        <div className="mt-8 max-w-2xl">
          <ContactForm reference={project.title} />
        </div>
      </section>
    </article>
  );
}
