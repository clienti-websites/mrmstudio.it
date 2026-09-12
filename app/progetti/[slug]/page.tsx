import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProjectBySlug, getProjectSlugs, type Project } from "@/lib/projects";
import { Gallery } from "@/components/Gallery";
import { FaseChecklist } from "@/components/FaseChecklist";
import { ContactForm } from "@/components/ContactForm";
import { LAVORI } from "@/lib/lavori";
import { SITE } from "@/lib/site";

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
    openGraph: {
      title: `${project.title} — ${project.location}`,
      description: project.excerpt,
      images: [{ url: project.coverImage.src, alt: project.coverImage.alt }],
    },
  };
}

export default async function ProgettoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const project = findProjectBySlug(slug);
  if (!project) notFound();

  // Precedente e successiva nello stesso ordine in cui compaiono nell'elenco:
  // chi arriva qui da una ricerca può sfogliare invece di tornare indietro.
  const tutti = getAllProjects();
  const posizione = tutti.findIndex((p) => p.slug === project.slug);
  const precedente = posizione > 0 ? tutti[posizione - 1] : null;
  const successiva = posizione >= 0 && posizione < tutti.length - 1 ? tutti[posizione + 1] : null;

  // Se l'opera compare anche nell'elenco delle commesse, val la pena dirlo:
  // è lì che stanno importo e prestazioni.
  const inElenco = LAVORI.some((lavoro) => lavoro.slug === project.slug);

  const briciole = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Progetti", item: `${SITE.url}/progetti` },
      { "@type": "ListItem", position: 3, name: project.title },
    ],
  };

  const opera = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.excerpt,
    locationCreated: project.location,
    image: `${SITE.url}${project.coverImage.src}`,
    creator: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
    ...(project.year ? { dateCreated: project.year } : {}),
  };

  return (
    <article className="mx-auto max-w-5xl px-6 py-16 md:px-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(briciole) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(opera) }} />

      {/* Il nome dell'opera prima delle fotografie: chi arriva da una ricerca
          altrimenti scorre dieci immagini senza sapere cosa sta guardando. */}
      <nav aria-label="Percorso" className="mb-6 text-sm text-pietra">
        <Link href="/progetti" className="inline-block py-1 text-muschio underline">
          Progetti
        </Link>
        <span className="px-2" aria-hidden="true">
          /
        </span>
        <span>{project.title}</span>
      </nav>

      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-nebbia pb-8">
        <div>
          <h1 className="text-3xl font-black text-grafite md:text-4xl">{project.title}</h1>
          <p className="mt-1 text-pietra">
            {[project.location, project.year].filter(Boolean).join(" · ")}
          </p>
        </div>
        {project.budget && <p className="text-lg font-medium text-grafite">{project.budget}</p>}
      </div>

      <Gallery images={project.gallery} />

      {inElenco && (
        <p className="mt-6 text-sm text-pietra">
          Questo intervento compare anche{" "}
          {/* py-1.5 su un elemento in linea allarga solo l'area toccabile:
              sborda sopra e sotto la riga senza spostare il testo. */}
          <Link href="/progetti#lavori-titolo" className="py-1.5 text-muschio underline">
            nell&apos;elenco dei lavori
          </Link>
          , con importo e prestazioni.
        </p>
      )}

      {project.phases.length > 0 && (
        <div className="py-8">
          <FaseChecklist phases={[...project.phases]} />
        </div>
      )}

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

      {/* Chi ha seguito il lavoro. Per un committente pubblico è
          un'informazione che pesa quanto le fotografie, e sul vecchio sito
          c'era: sta qui sotto il racconto, non sopra, perché prima viene
          l'opera e poi chi l'ha fatta. */}
      {project.team.length > 0 && (
        <section aria-labelledby="gruppo-titolo" className="mt-10 border-t border-nebbia pt-8">
          <h2 id="gruppo-titolo" className="mb-5 font-medium text-grafite">
            Chi ha seguito il lavoro
          </h2>
          <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
            {project.team.map((persona) => (
              <li key={persona.name} className="flex flex-wrap items-baseline gap-x-3">
                <span className="text-grafite">{persona.name}</span>
                {persona.role && <span className="text-sm text-pietra">{persona.role}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.outcome && (
        <div className="mt-8 border-t border-nebbia pt-8">
          <h2 className="mb-2 font-medium text-grafite">Esito</h2>
          <p className="text-pietra">{project.outcome}</p>
        </div>
      )}

      <nav
        aria-label="Altre opere"
        className="mt-12 grid gap-4 border-t border-nebbia pt-8 sm:grid-cols-2"
      >
        {precedente ? (
          <Link href={`/progetti/${precedente.slug}`} className="group block py-2">
            <span className="block text-sm text-pietra">Opera precedente</span>
            <span className="mt-1 block font-medium text-grafite group-hover:text-muschio">
              {precedente.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {successiva && (
          <Link href={`/progetti/${successiva.slug}`} className="group block py-2 sm:text-right">
            <span className="block text-sm text-pietra">Opera successiva</span>
            <span className="mt-1 block font-medium text-grafite group-hover:text-muschio">
              {successiva.title}
            </span>
          </Link>
        )}
      </nav>

      <section aria-labelledby="parlane-titolo" className="mt-16 scroll-mt-20 bg-nebbia p-8 md:p-12">
        <h2 id="parlane-titolo" className="text-2xl font-black text-grafite">
          Ti piacerebbe qualcosa di simile?
        </h2>
        <p className="mt-3 max-w-2xl text-pietra">
          Non serve che tu abbia già un progetto, né che sappia cosa chiedere. Rispondi a tre domande e ti
          richiamiamo noi.
        </p>
        <div className="mt-8 max-w-2xl">
          <ContactForm reference={project.title} />
        </div>
      </section>
    </article>
  );
}
