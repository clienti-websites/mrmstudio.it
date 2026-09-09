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
      "Senza un progetto interamente coordinato, ogni specialista (architetto, strutturista, impiantista) lavora per conto proprio: le versioni non coincidono, le responsabilità si diluiscono.",
    come:
      "MRM sviluppa internamente ogni disciplina — architettonica, strutturale, energetica, impiantistica, rendering e modellazione — così il progetto nasce già coerente, senza passaggi tra studi diversi.",
  },
  {
    id: "appalto",
    title: "Appalto",
    rischio:
      "La parte contrattuale e amministrativa dell'affidamento lavori è spesso il punto in cui un committente privo di competenze tecniche si trova più esposto.",
    come: "MRM segue la gestione dell'appalto per conto del committente, dalla stesura alla verifica delle condizioni contrattuali.",
  },
  {
    id: "direzione-lavori",
    title: "Direzione lavori",
    rischio:
      "Senza una direzione lavori indipendente e competente, controllare che il cantiere segua il progetto, i tempi e le norme di sicurezza diventa un'incognita.",
    come:
      "MRM dirige tecnicamente il cantiere: controllo dell'esecuzione, contabilità lavori, sicurezza, fino a collaudo e agibilità.",
  },
  {
    id: "maestranze",
    title: "Maestranze",
    rischio:
      "Cercare e coordinare imprese, impiantisti, operai e fornitori — e fare da arbitro tra loro — è il compito che più spesso ricade, non richiesto, sul committente.",
    come: "MRM seleziona e coordina le maestranze necessarie, restando l'unico interlocutore del committente per tutta la durata dei lavori.",
  },
] as const;

export default function ServiziPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Servizi</h1>
      <p className="mb-16 max-w-2xl text-pietra">
        Quattro fasi, un solo studio. MRM Studio segue l&apos;opera dall&apos;idea alla consegna delle chiavi a
        Pescara e in tutto l&apos;Abruzzo.
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
