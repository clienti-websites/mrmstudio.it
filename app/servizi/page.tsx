import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { CtaBand } from "@/components/CtaBand";
import { getProjectsByPhase } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Servizi — Progettazione e Direzione Lavori a Pescara e in Abruzzo",
  description: "Come lavora MRM Studio a Pescara e in Abruzzo: dalla progettazione interna alla consegna delle chiavi.",
};

const SEZIONI = [
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
    come: "Scegliamo noi le imprese e le teniamo insieme, e per tutta la durata dei lavori continui a parlare solo con noi.",
  },
] as const;

export default function ServiziPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Servizi</h1>
      <p className="mb-16 max-w-2xl text-pietra">
        Un intervento edilizio passa per quattro fasi. Le seguiamo tutte noi, a Pescara e in tutto l&apos;Abruzzo,
        così non devi tenere insieme professionisti diversi.
      </p>

      {SEZIONI.map((sezione) => {
        const caseProject = getProjectsByPhase(sezione.id)[0];
        return (
          <section key={sezione.id} id={sezione.id} className="scroll-mt-24 border-t border-nebbia py-12 first:border-t-0">
            <h2 className="mb-4 text-2xl font-black text-grafite">{sezione.title}</h2>
            <p className="mb-4 text-pietra">
              <strong className="text-grafite">Cosa rischi senza:</strong> {sezione.rischio}
            </p>
            <p className="mb-6 text-pietra">
              <strong className="text-grafite">Come lavora MRM:</strong> {sezione.come}
            </p>
            {caseProject ? (
              <Link href={`/progetti/${caseProject.slug}`} className="text-muschio underline">
                Un caso reale: {caseProject.location}
              </Link>
            ) : (
              <p className="text-sm italic text-pietra">Caso reale in arrivo.</p>
            )}
          </section>
        );
      })}

      <Accordion summary="Dettaglio tecnico: adempimenti del direttore lavori">
        <p>
          Elenco dettagliato in arrivo da MRM Studio (es. i diciassette adempimenti previsti per la direzione
          lavori).
        </p>
      </Accordion>

      <CtaBand title="Parliamo del tuo progetto." cta="Contattaci" href="/contatti" />
    </div>
  );
}
