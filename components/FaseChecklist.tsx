import { PHASES, type Phase } from "@/lib/projects";

const LABELS: Record<Phase, string> = {
  progettazione: "Progettazione",
  appalto: "Appalto",
  "direzione-lavori": "Direzione lavori",
  maestranze: "Maestranze",
};

export function FaseChecklist({ phases }: { phases: Phase[] }) {
  return (
    <ul aria-label="Fasi seguite da MRM in questo progetto" className="flex flex-wrap gap-x-5 gap-y-2">
      {PHASES.map((phase) => {
        const done = phases.includes(phase);
        return (
          <li key={phase} className="flex items-center gap-1.5 text-sm">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${done ? "bg-muschio" : "bg-nebbia border border-pietra"}`}
            />
            <span data-done={done} className={done ? "text-grafite" : "text-pietra"}>
              {LABELS[phase]}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
