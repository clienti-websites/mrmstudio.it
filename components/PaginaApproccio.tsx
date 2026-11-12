import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaseIcon } from "@/components/FaseIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { esempiRegistro, vicini, type Approccio } from "@/lib/approcci";
import { getProjectsByPhase } from "@/lib/projects";

/**
 * La pagina di un approccio. Una sola per tutti e tre: cambia il testo, non
 * l'impaginazione, e tenerne tre copie avrebbe solo moltiplicato gli errori.
 *
 * In fondo non c'è una fila di tre riquadri con l'approccio corrente spento:
 * ci sono l'approccio prima e quello dopo, nominati. È lì che si capisce,
 * senza doverlo scrivere, che se ne può prendere uno solo.
 */
export function PaginaApproccio({ approccio }: { approccio: Approccio }) {
  const progetti = approccio.fase ? getProjectsByPhase(approccio.fase).slice(0, 3) : [];
  const righe = esempiRegistro(approccio);
  const { prima, dopo } = vicini(approccio.slug);

  return (
    <>
      <section className="bg-grafite px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <FaseIcon phase={approccio.icona} className="h-9 w-9 shrink-0 text-carta/70" />
            <span className="text-sm font-medium text-carta/70">{approccio.label}</span>
          </div>
          <h1 className="mt-6 text-3xl font-bold leading-tight text-carta md:text-5xl">{approccio.titolo}</h1>
          <p className="mt-6 max-w-2xl text-lg text-carta/85">{approccio.apertura}</p>
        </div>
      </section>

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <p className="text-lg leading-relaxed text-grafite">{approccio.rischio}</p>
          <p className="border-l-2 border-muschio pl-5 text-grafite">{approccio.come}</p>
        </div>
      </section>

      {progetti.length > 0 && (
        <section aria-labelledby="esempi-titolo" className="bg-nebbia px-6 py-20 md:px-12">
          <div className="mx-auto max-w-6xl">
            <h2 id="esempi-titolo" className="text-2xl font-bold text-grafite md:text-3xl">
              Dove l&apos;abbiamo fatto
            </h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {progetti.map((progetto) => (
                <ProjectCard key={progetto.slug} project={progetto} />
              ))}
            </div>
            <p className="mt-10 text-pietra">
              <Link href="/progetti" className="-my-2 inline-block py-2 text-muschio underline">
                Tutte le opere
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Un registro, non delle schede: qui contano le sigle e gli anni.
          I testi vengono dall'elenco dichiarato dallo studio. */}
      <section aria-labelledby="registro-titolo" className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 id="registro-titolo" className="text-2xl font-bold text-grafite md:text-3xl">
            Dall&apos;elenco dei lavori
          </h2>
          <p className="mt-3 max-w-2xl text-pietra">{approccio.registroIntro}</p>

          <dl className="mt-10 border-t border-grafite/15">
            {righe.map((riga) => (
              <div
                key={riga.intervento}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-grafite/15 py-5"
              >
                <dt className="max-w-xl">
                  <span className="block text-grafite">{riga.intervento}</span>
                  <span className="mt-0.5 block text-sm text-pietra">
                    {[riga.luogo, riga.anno].filter(Boolean).join(" · ")}
                  </span>
                </dt>
                <dd className="ml-0 text-sm text-pietra">{riga.nota}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-pietra">
            <Link href="/progetti#lavori-titolo" className="-my-2 inline-block py-2 text-muschio underline">
              L&apos;elenco completo
            </Link>
            , con importi e prestazioni svolte.
          </p>
        </div>
      </section>

      <section aria-labelledby="vicini-titolo" className="border-t border-grafite/15 px-6 py-20 md:px-12">
        <div className="mx-auto max-w-5xl">
          <h2 id="vicini-titolo" className="text-2xl font-bold text-grafite md:text-3xl">
            Prima e dopo questo
          </h2>
          <p className="mt-3 max-w-2xl text-pietra">
            Si prendono insieme o uno alla volta, a seconda di cosa hai già.
          </p>

          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {prima && (
              <Link href={`/${prima.slug}`} className="group block">
                <span className="block text-sm text-pietra">Prima</span>
                <span className="mt-2 flex items-center gap-3">
                  <FaseIcon phase={prima.icona} className="h-7 w-7 shrink-0 text-muschio" />
                  <span className="text-lg font-medium text-grafite group-hover:text-muschio group-hover:underline">
                    {prima.label}
                  </span>
                </span>
              </Link>
            )}
            {dopo && (
              <Link href={`/${dopo.slug}`} className="group block md:col-start-2">
                <span className="block text-sm text-pietra">Dopo</span>
                <span className="mt-2 flex items-center gap-3">
                  <FaseIcon phase={dopo.icona} className="h-7 w-7 shrink-0 text-muschio" />
                  <span className="text-lg font-medium text-grafite group-hover:text-muschio group-hover:underline">
                    {dopo.label}
                  </span>
                </span>
              </Link>
            )}
          </div>
        </div>
      </section>

      <CtaBand title="Dicci dove sei arrivato." cta="Contattaci" href="/contatti" tone="dark" />
    </>
  );
}
