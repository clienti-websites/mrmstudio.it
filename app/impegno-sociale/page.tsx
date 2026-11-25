import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectBySlug } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Impegno sociale: un campo a Roccaraso, una casa in Congo",
  description:
    "Il campo per la squadra di calcio a 5 di non vedenti di Sport Ability, a Roccaraso, e la Casa d'Accoglienza Beata Elena Aiello nella diocesi di Idiofa, in Congo: due progetti seguiti da MRM Studio pro bono.",
};

/**
 * Fino a ieri questa pagina diceva soltanto "in attesa di materiale". Il
 * materiale c'era: è la scheda della casa d'accoglienza pubblicata sul sito
 * attuale. Qui il progetto viene raccontato per quello che è, e la scheda
 * completa con le immagini sta fra le opere.
 *
 * Roccaraso sta sopra al Congo perche' e' del 2026 ed e' in Abruzzo, dove
 * sta chi legge. Non ha una scheda fra le opere e quindi nemmeno una
 * copertina: delle nove immagini che lo studio ha mandato, sette sono render
 * generati con l'AI, e finche' MRM non dice se si possono pubblicare
 * dichiarandoli come tali qui non ne va nessuna. Il testo intanto c'e', ed e'
 * solo quello che lo studio ha scritto: committenza, cosa fa, per chi e'
 * stato fatto il campo.
 *
 * DA CHIEDERE A MRM: se i render di Sport Ability si possono pubblicare come
 * render di progetto, e se l'APS Io Ci Sto ha un sito a cui rimandare.
 */
const SLUG = "casa-accoglienza-elena-aiello";

export default function ImpegnoSocialePage() {
  const progetto = getProjectBySlug(SLUG);

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-bold text-grafite md:text-4xl">Impegno sociale</h1>
      <p className="mb-14 max-w-2xl text-lg text-grafite">
        Una parte del lavoro dello studio non ha un committente che paga. La progettazione è la stessa, il
        metodo è lo stesso, e cambia solo chi ne beneficia.
      </p>

      <section className="border-t border-nebbia py-12">
        <h2 className="text-2xl font-bold text-grafite">Il campo di Sport Ability, a Roccaraso</h2>
        <p className="mt-5 text-grafite">
          Sport Ability è un&apos;organizzazione no profit di Roccaraso che promuove l&apos;inclusione nello
          sport delle persone con disabilità. Ha una squadra di calcio a 5 di non vedenti, e il campo è stato
          fatto per loro: lo abbiamo progettato nel 2026, pro bono.
        </p>
      </section>

      <section className="border-t border-nebbia py-12">
        <h2 className="text-2xl font-bold text-grafite">
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
