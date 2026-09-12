import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { ProjectCard } from "@/components/ProjectCard";
import { getProjectsByCategory } from "@/lib/projects";

/**
 * Stesso indirizzo della pagina omonima sul sito attuale, per non perdere il
 * posizionamento già costruito. I passaggi elencati sono quelli dichiarati da
 * MRM; qui sono una sequenza numerata perché lo sono davvero, uno dopo
 * l'altro dal primo sopralluogo alla chiusura.
 */
export const metadata: Metadata = {
  title: "Ristrutturazioni chiavi in mano a Pescara",
  description:
    "Ristrutturare con un solo interlocutore: progetto, pratiche, imprese, direzione lavori e detrazioni fiscali seguiti da MRM Studio a Pescara e in Abruzzo.",
};

const PASSAGGI: Array<{ titolo: string; testo: string }> = [
  {
    titolo: "L'idea di progetto",
    testo:
      "Si parte da cosa vuoi ottenere e da cosa l'immobile permette davvero. Alla fine di questo passaggio hai un progetto, non un'ipotesi.",
  },
  {
    titolo: "Le pratiche amministrative",
    testo:
      "Presentiamo noi quello che va presentato in Comune e agli altri enti. È la parte che blocca più spesso i lavori, e non è materia tua.",
  },
  {
    titolo: "Il computo delle opere",
    testo:
      "Ogni lavorazione viene misurata e quantificata prima di cominciare. È così che un preventivo diventa un numero verificabile invece di una cifra a occhio.",
  },
  {
    titolo: "La scelta delle imprese",
    testo:
      "Le maestranze le individuiamo noi, fra quelle con cui lavoriamo. Tu non devi cercare l'idraulico, il piastrellista e l'elettricista, né farli parlare fra loro.",
  },
  {
    titolo: "Il cronoprogramma",
    testo:
      "Le lavorazioni vengono messe in fila secondo le tue esigenze, non secondo la comodità di chi esegue. Se devi rientrare entro una data, si parte da quella.",
  },
  {
    titolo: "I materiali",
    testo:
      "Ti accompagniamo nella scelta, con i campioni davanti e i prezzi già dentro al computo, così una preferenza non diventa una sorpresa in fattura.",
  },
  {
    titolo: "La direzione dei lavori",
    testo:
      "Durante il cantiere il controllo è nostro e risponde a te. È la stessa direzione lavori che facciamo sulle opere pubbliche, applicata a casa tua.",
  },
  {
    titolo: "Le detrazioni fiscali",
    testo:
      "Ti assistiamo nella richiesta delle detrazioni previste, con la documentazione tecnica che serve a ottenerle.",
  },
];

export default function RistrutturazioniPage() {
  const esempi = getProjectsByCategory("ristrutturazione-e-recupero").slice(0, 2);

  return (
    <>
      <section className="bg-grafite px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-3xl font-black text-carta md:text-5xl">Ristrutturazioni chiavi in mano</h1>
          <p className="mt-6 max-w-2xl text-lg text-carta/85">
            Ristrutturare significa mettere d&apos;accordo un progettista, un&apos;impresa, tre o quattro
            artigiani e un commercialista, e di solito tocca a chi paga tenerli insieme. Qui no. Parli con noi,
            e il resto lo coordiniamo noi, a Pescara e in Abruzzo.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:px-12">
        <div className="mx-auto max-w-3xl">
          <p className="text-lg text-grafite">
            Ce ne occupiamo da anni, e lo facciamo con imprese e installatori con cui abbiamo già lavorato.
            Dopo aver capito cosa ti serve ti proponiamo una soluzione con tempi e costi definiti prima di
            cominciare, e da lì in poi gestiamo ogni passaggio.
          </p>
        </div>
      </section>

      {/* Numerati perché sono una sequenza vera: ogni passaggio dipende da
          quello prima, e l'ordine è un'informazione utile a chi legge. */}
      <section className="px-6 pb-8 md:px-12">
        <div className="mx-auto max-w-3xl">
          <ol className="list-none">
            {PASSAGGI.map((passaggio, i) => (
              <li key={passaggio.titolo} className="grid gap-2 border-t border-nebbia py-7 md:grid-cols-[4rem_1fr]">
                <span className="text-sm tabular-nums text-pietra">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="font-medium text-grafite">{passaggio.titolo}</h2>
                  <p className="mt-2 text-grafite">{passaggio.testo}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {esempi.length > 0 && (
        <section className="bg-nebbia px-6 py-16 md:px-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-8 text-2xl font-black text-grafite">Ristrutturazioni e recuperi che abbiamo seguito</h2>
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
            Se l&apos;intervento è più grande di una ristrutturazione,{" "}
            <Link href="/servizi" className="inline-block py-2 text-muschio underline">
              qui c&apos;è come seguiamo le quattro fasi
            </Link>
          </p>
        </div>
      </section>

      <CtaBand title="Raccontaci cosa vuoi ristrutturare." cta="Contattaci" href="/#contatti" tone="dark" />
    </>
  );
}
