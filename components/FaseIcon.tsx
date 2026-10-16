import type { Phase } from "@/lib/projects";

// Icone disegnate a mano, stesso tratto e stessa griglia 24×24, per non
// introdurre una libreria e per restare coerenti col resto del sito.
// Stanno qui perché le usano sia la home sia la pagina servizi.
const PATHS: Record<Phase, React.ReactNode> = {
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
  // Una poltrona: schienale, braccioli che scendono nella seduta, gambe.
  // A 24px la sagoma si legge per la silhouette, non per i dettagli.
  "interior-design": (
    <>
      <path d="M5.5 11V8a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v3" />
      <path d="M5.5 11A1.75 1.75 0 0 0 3.75 12.75V17h16.5v-4.25A1.75 1.75 0 0 0 18.5 11" />
      <path d="M3.75 14.5h16.5" />
      <path d="M6.5 17v2M17.5 17v2" />
    </>
  ),
};

export function FaseIcon({ phase, className }: { phase: Phase; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[phase]}
    </svg>
  );
}
