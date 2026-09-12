import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectBySlug } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Impegno sociale: la casa d'accoglienza in Congo",
  description:
    "MRM Studio ha progettato la Casa d'Accoglienza Beata Elena Aiello nella diocesi di Idiofa, in Congo, per l'APS Io Ci Sto a sostegno delle Suore Minime della Passione.",
};

/**
 * Fino a ieri questa pagina diceva soltanto "in attesa di materiale". Il
 * materiale c'era: è la scheda della casa d'accoglienza pubblicata sul sito
 * attuale. Qui il progetto viene raccontato per quello che è, e la scheda
 * completa con le immagini sta fra le opere.
 *
 * DA CHIEDERE A MRM: se ci sono altre iniziative da affiancare a questa, e
 * se l'APS Io Ci Sto ha un sito a cui rimandare.
 */
const SLUG = "casa-accoglienza-elena-aiello";

export default function ImpegnoSocialePage() {
  const progetto = getProjectBySlug(SLUG);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Impegno sociale</h1>
      <p className="mb-14 max-w-2xl text-lg text-grafite">
        Una parte del lavoro dello studio non ha un committente che paga. La progettazione è la stessa, il
        metodo è lo stesso, e cambia solo chi ne beneficia.
      </p>

      <section className="border-t border-nebbia py-12">
        <h2 className="text-2xl font-black text-grafite">
          La casa d&apos;accoglienza nella diocesi di Idiofa
        </h2>
        <p className="mt-5 text-grafite">
          Nel cuore della Repubblica Democratica del Congo, nella diocesi di Idiofa, abbiamo progettato il
          primo intervento dell&apos;APS Io Ci Sto a sostegno delle Suore Minime della Passione. È una casa
          pensata per accogliere donne, bambini e famiglie in difficoltà: un luogo dove studiare, crescere,
          pregare e mangiare insieme.
        </p>
        <p className="mt-4 text-grafite">
          Scuola, chiesa, refettorio e dormitorio stanno in un unico complesso organizzato attorno a una corte
          centrale protetta. È costruito con materiali semplici e reperibili sul posto, seguendo i colori
          della terra e i modi dell&apos;architettura rurale locale, perché un edificio che nessuno del luogo
          sa manutenere non serve a niente.
        </p>

        <div className="mt-10 max-w-md">
          <ProjectCard project={progetto} />
        </div>
      </section>

      <section className="border-t border-nebbia py-12">
        <p className="text-pietra">
          Le altre opere dello studio, pubbliche e private, stanno{" "}
          <Link href="/progetti" className="inline-block py-2 text-muschio underline">
            nella pagina dei progetti
          </Link>
        </p>
      </section>

      <CtaBand title="Vuoi parlarci di un progetto?" cta="Contattaci" href="/#contatti" />
    </div>
  );
}
