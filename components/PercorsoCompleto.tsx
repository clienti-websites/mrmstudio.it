import Link from "next/link";

// Icone disegnate a mano, stesso tratto e stessa griglia 24×24, per non
// introdurre una libreria e per restare coerenti col resto del sito.
const ICONS = {
  progettazione: (
    <>
      <path d="M4 3h11l5 5v13H4z" />
      <path d="M15 3v5h5" />
      <path d="M8 12h8M8 16h5" />
    </>
  ),
  appalto: (
    <>
      <path d="M3 7h7l2 2h9v10H3z" />
      <path d="M7 13h10" />
    </>
  ),
  "direzione-lavori": (
    <>
      <path d="M4 20h16" />
      <path d="M6 20V8l12-3v15" />
      <path d="M6 12l12-3" />
    </>
  ),
  maestranze: (
    <>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5" />
      <path d="M12.5 19c0-2.8 1.5-4.5 3.5-4.5s4.5 1.7 4.5 4.5" />
    </>
  ),
} as const;

const FASI = [
  { id: "progettazione", label: "Progettazione", gloss: "Tutte le discipline, in casa" },
  { id: "appalto", label: "Appalto", gloss: "Contratti e affidamento lavori" },
  { id: "direzione-lavori", label: "Direzione lavori", gloss: "Cantiere, collaudo, agibilità" },
  { id: "maestranze", label: "Maestranze", gloss: "Imprese e fornitori coordinati" },
] as const;

export function PercorsoCompleto() {
  return (
    <section aria-labelledby="percorso-titolo" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2
          id="percorso-titolo"
          className="mx-auto max-w-3xl text-center text-3xl font-black tracking-tight text-grafite md:text-4xl"
        >
          Un solo studio segue l&apos;opera dall&apos;idea alla consegna delle chiavi.
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
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="mx-auto h-10 w-10 text-muschio"
                  >
                    {ICONS[fase.id]}
                  </svg>
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
          Il committente non deve cercare né coordinare nessun altro: un solo interlocutore per tutte e quattro le
          fasi.
        </p>
      </div>
    </section>
  );
}
