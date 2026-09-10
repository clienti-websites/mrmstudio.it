import type { Metadata } from "next";
import Link from "next/link";
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
      "Quando architettonico, strutture e impianti nascono in studi diversi, le incongruenze non vengono fuori sui disegni ma in cantiere, sotto forma di varianti, fermi e costi che nessuno aveva previsto. E quando succede, ognuno indica l'altro.",
    come:
      "Da noi le discipline stanno nella stessa stanza. Facciamo il rilievo, il progetto architettonico e il definitivo, l'esecutivo strutturale, il progetto energetico e degli impianti, i grafici esecutivi e il computo, fino alle viste fotorealistiche per vedere come verrà prima di cominciare. Se una scelta strutturale complica gli impianti ce ne accorgiamo mentre disegniamo, non quando arriva l'impresa.",
  },
  {
    id: "appalto",
    title: "Appalto",
    rischio:
      "L'affidamento dei lavori si decide sulla carta, tra voci di computo, tempi contrattuali, penali e riserve. Chi non ha gli strumenti per leggerli firma condizioni che si pagano più avanti, quando cambiarle non è più possibile.",
    come:
      "Prepariamo la documentazione tecnica per la gara o per la trattativa, confrontiamo le offerte sul merito e non solo sul ribasso, e verifichiamo le condizioni contrattuali prima che tu firmi. Restiamo dalla tua parte del tavolo.",
  },
  {
    id: "direzione-lavori",
    title: "Direzione lavori",
    rischio:
      "In cantiere il progetto incontra la realtà. Senza una direzione lavori che risponda a te e non all'impresa, non hai modo di sapere se quello che viene costruito corrisponde a quello che hai approvato, né se tempi e sicurezza vengono rispettati.",
    come:
      "Seguiamo l'esecuzione dall'apertura del cantiere alla consegna. Controlliamo che venga realizzato quello che è stato approvato, teniamo la contabilità dei lavori e gli stati di avanzamento, coordiniamo la sicurezza e chiudiamo con il collaudo e le pratiche per l'agibilità.",
  },
  {
    id: "maestranze",
    title: "Maestranze",
    rischio:
      "Trovare imprese e fornitori affidabili è già difficile. Farli lavorare insieme lo è di più, e quando qualcosa non torna finisci a fare da arbitro tra chi ha posato e chi doveva passare dopo.",
    come:
      "Le imprese le individuiamo e le coordiniamo noi, tenendo insieme tempi e lavorazioni. Tu continui a parlare con una persona sola per tutta la durata dei lavori, anche quando in cantiere ce ne sono dieci.",
  },
];

export default function ServiziPage() {
  return (
    <>
      <section className="bg-grafite px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-black text-carta md:text-5xl">Quattro fasi, un solo studio.</h1>
          <p className="mt-6 max-w-2xl text-lg text-carta/85">
            Costruire o ristrutturare vuol dire attraversare quattro fasi diverse, ognuna con le sue competenze e
            le sue responsabilità. Di solito ognuna ha il suo professionista, e tenere insieme il lavoro di tutti
            tocca a chi paga. Da noi le quattro fasi restano dentro lo stesso studio, a Pescara e in tutto
            l&apos;Abruzzo.
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
              className={`mx-auto flex flex-col gap-12 md:items-center ${
                caseProject ? "max-w-6xl" : "max-w-3xl"
              } ${scuro ? "md:flex-row-reverse" : "md:flex-row"}`}
            >
              <div className={caseProject ? "md:w-1/2" : "w-full"}>
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

              {caseProject && (
                <div className="md:w-1/2">
                  <p className="mb-3 text-sm text-pietra">Dove l&apos;abbiamo fatto</p>
                  <ProjectCard project={caseProject} />
                </div>
              )}
            </div>
          </section>
        );
      })}

      <section className="px-6 py-20 md:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="text-pietra">
            Vuoi vedere come si traduce su un cantiere vero?{" "}
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
