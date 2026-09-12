import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaseIcon } from "@/components/FaseIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByPhase } from "@/lib/projects";

/**
 * L'indirizzo è identico a quello della stessa pagina sul sito attuale, e
 * non è un caso: quella pagina è online da anni e i motori la conoscono.
 * Tenendo lo stesso percorso il posizionamento non si azzera e non serve
 * nemmeno un rimando.
 *
 * I compiti elencati sono quelli dichiarati da MRM sul proprio sito, qui
 * raggruppati per momento del cantiere invece che lasciati in un elenco di
 * diciassette voci di fila.
 */
export const metadata: Metadata = {
  title: "Direzione lavori e assistenza di cantiere",
  description:
    "MRM Studio segue la direzione lavori e l'assistenza al cantiere a Pescara e in Abruzzo: controllo dell'esecuzione, contabilità, sicurezza e collaudo.",
};

const MOMENTI: Array<{ titolo: string; quando: string; compiti: string[] }> = [
  {
    titolo: "Prima che il cantiere apra",
    quando: "Quando il progetto esiste ma non si è ancora mosso niente.",
    compiti: [
      "Esame del progetto e dei documenti contrattuali",
      "Pianificazione delle operazioni di cantiere per l'inizio dei lavori",
    ],
  },
  {
    titolo: "Mentre si costruisce",
    quando: "È la parte in cui il progetto incontra la realtà, ed è dove si decide come andrà a finire.",
    compiti: [
      "Verifica dell'avanzamento dei lavori rispetto al cronoprogramma",
      "Controllo della conformità di quanto eseguito al progetto",
      "Accettazione dei materiali prima della messa in opera",
      "Verifica delle certificazioni di conformità delle apparecchiature",
      "Assistenza alle prove di messa in servizio degli impianti",
      "Assistenza al coordinatore della sicurezza in fase di esecuzione",
      "Segnalazione al committente se l'impresa affidataria non rispetta le disposizioni contrattuali",
      "Individuazione degli interventi per eliminare difetti di progetto o di esecuzione",
      "Analisi delle cause che incidono sulla qualità dei lavori e azioni correttive",
    ],
  },
  {
    titolo: "I conti",
    quando: "Corrono in parallelo per tutta la durata dei lavori.",
    compiti: [
      "Verifica del corretto inserimento in contabilità delle lavorazioni",
      "Redazione dei documenti contabili e amministrativi",
    ],
  },
  {
    titolo: "Alla chiusura",
    quando: "Quello che serve perché l'opera sia consegnabile e difendibile.",
    compiti: [
      "Accertamento dell'ultimazione dei lavori",
      "Relazione sul conto finale dei lavori",
      "Assistenza alle operazioni di collaudo",
      "Redazione del certificato di regolare esecuzione, quando previsto",
    ],
  },
];

export default function DirezioneLavoriPage() {
  const esempi = getProjectsByPhase("direzione-lavori").slice(0, 2);

  return (
    <>
      <section className="bg-grafite px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <FaseIcon phase="direzione-lavori" className="h-9 w-9 shrink-0 text-carta/70" />
            <span className="text-sm text-carta/70">Una delle quattro fasi</span>
          </div>
          <h1 className="mt-6 text-3xl font-black text-carta md:text-5xl">
            Assistenza cantieristica e direzione lavori
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-carta/85">
            Dirigere i lavori vuol dire rispondere a chi paga, non all&apos;impresa che costruisce. Seguiamo il
            cantiere dall&apos;apertura alla consegna, a Pescara e in tutto l&apos;Abruzzo, con un obiettivo
            solo: che quello che viene costruito sia quello che hai approvato, nei tempi e nei costi che erano
            scritti.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-grafite">
            In cantiere le cose si decidono in fretta e quasi mai davanti a un tavolo. Senza qualcuno che
            controlli per conto tuo, l&apos;unica versione dei fatti che ti arriva è quella di chi sta
            eseguendo. La direzione lavori serve a questo: coordinare, controllare e mettere per iscritto,
            perché a fine opera tu sappia cosa hai pagato e l&apos;impresa sappia cosa ha consegnato.
          </p>
        </div>
      </section>

      {/* Quattro momenti, non un elenco unico di diciassette righe: così si
          capisce quando serve cosa invece di leggere una filastrocca. */}
      <section className="px-6 pb-8 md:px-12">
        <div className="mx-auto max-w-3xl">
          {MOMENTI.map((momento) => (
            <div key={momento.titolo} className="border-t border-nebbia py-10">
              <h2 className="text-2xl font-black text-grafite">{momento.titolo}</h2>
              <p className="mt-2 text-pietra">{momento.quando}</p>
              <ul className="mt-6 space-y-3">
                {momento.compiti.map((compito) => (
                  <li key={compito} className="border-l-2 border-muschio pl-4 text-grafite">
                    {compito}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {esempi.length > 0 && (
        <section className="bg-nebbia px-6 py-16 md:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-black text-grafite">Dove l&apos;abbiamo fatto</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {esempi.map((progetto) => (
                <ProjectCard key={progetto.slug} project={progetto} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-pietra">
            La direzione lavori è una delle quattro fasi che seguiamo.{" "}
            <Link href="/servizi" className="inline-block py-2 text-muschio underline">
              Guarda come lavoriamo sulle altre tre
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Hai un cantiere da far partire?" cta="Contattaci" href="/#contatti" tone="dark" />
    </>
  );
}
