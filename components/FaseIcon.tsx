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
  maestranze: (
    <>
      <circle cx="8" cy="8" r="2.5" />
      <circle cx="16" cy="8" r="2.5" />
      <path d="M3.5 19c0-2.8 2-4.5 4.5-4.5s4.5 1.7 4.5 4.5" />
      <path d="M12.5 19c0-2.8 1.5-4.5 3.5-4.5s4.5 1.7 4.5 4.5" />
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
