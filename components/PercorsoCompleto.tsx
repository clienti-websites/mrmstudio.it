import Link from "next/link";
import { FaseIcon } from "./FaseIcon";

const FASI = [
  { id: "progettazione", label: "Progettazione", gloss: "La facciamo tutta qui dentro" },
  { id: "appalto", label: "Appalto", gloss: "Ce ne occupiamo per tuo conto" },
  { id: "direzione-lavori", label: "Direzione lavori", gloss: "In cantiere ci stiamo noi" },
  { id: "maestranze", label: "Maestranze", gloss: "Le imprese le scegliamo noi" },
] as const;

export function PercorsoCompleto() {
  return (
    <section aria-labelledby="percorso-titolo" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2
          id="percorso-titolo"
          className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-grafite md:text-4xl"
        >
          Seguiamo tutto noi, dal primo disegno alle chiavi in mano.
        </h2>

        {/* La graffa che racchiude le quattro fasi è l'argomento della
            sezione: non sono quattro riquadri affiancati, sono quattro
            momenti dentro un unico incarico. */}
        <div className="mt-16">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-grafite" />
            <span className="text-sm font-medium tracking-wide text-grafite">Un unico incarico</span>
            <span className="h-px flex-1 bg-grafite" />
          </div>

          <ol className="mt-10 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {FASI.map((fase) => (
              <li key={fase.id} className="text-center">
                <Link href={`/servizi#${fase.id}`} className="group block">
                  <FaseIcon phase={fase.id} className="mx-auto h-10 w-10 text-muschio" />
                  <span className="mt-4 block font-medium text-grafite group-hover:text-muschio group-hover:underline">
                    {fase.label}
                  </span>
                </Link>
                <span className="mx-auto mt-1 block max-w-[22ch] text-sm text-pietra">{fase.gloss}</span>
              </li>
            ))}
          </ol>

          <div className="mt-10 h-px bg-grafite" />
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-lg text-grafite">
          Non devi cercare nessun altro, e non devi far parlare tra loro professionisti diversi. Qualunque sia la
          fase, chiami noi.
        </p>
      </div>
    </section>
  );
}
