import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { CtaBand } from "@/components/CtaBand";
import { FaseIcon } from "@/components/FaseIcon";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByPhase, type Phase } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Servizi — Progettazione e Direzione Lavori a Pescara e in Abruzzo",
  description: "Come lavora MRM Studio a Pescara e in Abruzzo, dalla progettazione interna alla consegna delle chiavi.",
};

const SEZIONI: Array<{ id: Phase; title: string; rischio: string; come: string }> = [
  {
    id: "progettazione",
    title: "Progettazione",
    rischio:
      "Se architetto, strutturista e impiantista lavorano ognuno per conto suo, ti ritrovi con versioni che non coincidono e senza nessuno che risponda dell'insieme.",
    come:
      "Sviluppiamo ogni disciplina qui dentro, dall'architettonico allo strutturale, dall'energetico agli impianti fino ai rendering. Il progetto ti arriva già coerente, senza passaggi tra studi diversi.",
  },
  {
    id: "appalto",
    title: "Appalto",
    rischio:
      "L'affidamento dei lavori è il punto dove rischi di più, perché si decide su contratti e clausole che nessuno ti ha mai spiegato.",
    come: "Ce ne occupiamo noi per tuo conto, dalla stesura alla verifica delle condizioni contrattuali.",
  },
  {
    id: "direzione-lavori",
    title: "Direzione lavori",
    rischio:
      "Senza qualcuno di indipendente che controlli il cantiere, non hai modo di sapere se quello che viene costruito segue il progetto, i tempi e le regole di sicurezza.",
    come:
      "Dirigiamo noi il cantiere e ci restiamo fino alla fine, dalla contabilità dei lavori alla sicurezza, fino al collaudo e all'agibilità.",
  },
  {
    id: "maestranze",
    title: "Maestranze",
    rischio:
      "Se non le coordina nessuno, finisci a cercare imprese e fornitori da solo e a fare da arbitro quando non vanno d'accordo.",
    come:
      "Scegliamo noi le imprese e le teniamo insieme, e per tutta la durata dei lavori continui a parlare solo con noi.",
  },
];

export default function ServiziPage() {
  return (
    <>
      <section className="bg-grafite px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-black text-carta md:text-5xl">Quattro fasi, un solo studio.</h1>
          <p className="mt-6 max-w-2xl text-lg text-carta/85">
            Un intervento edilizio passa per quattro fasi. Le seguiamo tutte noi, a Pescara e in tutto
            l&apos;Abruzzo, così non devi tenere insieme professionisti diversi.
          </p>
        </div>
      </section>

      {/* Le sezioni alternano fondo chiaro e fondo nebbia, e l'immagine passa
          da un lato all'altro: dà ritmo senza aggiungere decorazione, e
          soprattutto evita quattro blocchi identici in fila. Il testo resta
          in grafite anche su nebbia, dove il pietra non reggerebbe il
          contrasto AA. */}
      {SEZIONI.map((sezione, i) => {
        const caseProject = getProjectsByPhase(sezione.id)[0];
        const scuro = i % 2 === 1;

        return (
          <section
            key={sezione.id}
            id={sezione.id}
            aria-labelledby={`${sezione.id}-titolo`}
            className={`scroll-mt-20 px-6 py-20 md:px-12 ${scuro ? "bg-nebbia" : ""}`}
          >
            <div
              className={`mx-auto flex max-w-6xl flex-col gap-12 md:items-center ${
                scuro ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="md:w-1/2">
                <div className="flex items-center gap-4">
                  <FaseIcon phase={sezione.id} className="h-9 w-9 shrink-0 text-muschio" />
                  <span className="text-sm tracking-wider tabular-nums text-pietra">
                    {String(i + 1).padStart(2, "0")} / 04
                  </span>
                </div>

                <h2 id={`${sezione.id}-titolo`} className="mt-5 text-2xl font-black text-grafite md:text-3xl">
                  {sezione.title}
                </h2>

                <p className="mt-5 text-lg leading-relaxed text-grafite">{sezione.rischio}</p>

                <p className="mt-5 border-l-2 border-muschio pl-4 text-grafite">{sezione.come}</p>
              </div>

              <div className="md:w-1/2">
                {caseProject ? (
                  <div>
                    <p className="mb-3 text-sm text-pietra">Dove l&apos;abbiamo fatto</p>
                    <ProjectCard project={caseProject} />
                  </div>
                ) : (
                  <p className="border border-nebbia p-6 text-sm text-pietra">
                    Stiamo preparando la scheda di un lavoro che mostri questa fase.
                  </p>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl">
          <Accordion summary="Dettaglio tecnico: adempimenti del direttore lavori">
            <p>
              Elenco dettagliato in arrivo da MRM Studio (es. i diciassette adempimenti previsti per la direzione
              lavori).
            </p>
          </Accordion>

          <p className="mt-10 text-pietra">
            Vuoi vedere come si traduce su un lavoro vero?{" "}
            <Link href="/progetti" className="text-muschio underline">
              Guarda i progetti e l&apos;elenco dei lavori
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Parliamo del tuo intervento." cta="Contattaci" href="/#contatti" tone="dark" />
    </>
  );
}
