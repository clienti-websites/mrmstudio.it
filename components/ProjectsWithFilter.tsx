"use client";

import { useMemo, useState } from "react";
import type { Category, Project } from "@/lib/projects";
import { ProjectGrid } from "./ProjectGrid";

const CATEGORY_LABELS: Record<Category, string> = {
  residenziale: "Residenziale",
  "ristrutturazione-e-recupero": "Ristrutturazione e recupero",
  "direzionale-e-commerciale": "Direzionale e commerciale",
  "urbanistica-e-spazio-pubblico": "Urbanistica e spazio pubblico",
};

/**
 * `limit` serve alla home, dove si mostra un assaggio invece dell'intero
 * catalogo.
 *
 * Il cambio di categoria era un dissolvenza con scivolamento di framer-motion,
 * e aveva due difetti. Uno di sostanza: la dissolvenza-piu'-scivolamento su un
 * blocco intero e' il tic da sito generato, ed e' fra le cose che qui non si
 * fanno. Uno tecnico, che si vedeva in console: `initial` dipendeva da
 * useReducedMotion(), che sul server vale null, quindi il server scriveva
 * opacity 0 e translateY(8px) e il client subito dopo opacity 1 e transform
 * none - un disallineamento di idratazione su tutta la griglia delle opere.
 * Il cambio di categoria si capisce dal filtro che si accende, non serve
 * animare la griglia.
 */
export function ProjectsWithFilter({
  projects,
  categories,
  limit,
}: {
  projects: Project[];
  categories: Category[];
  limit?: number;
}) {
  const [active, setActive] = useState<Category | "tutti">("tutti");

  const availableCategories = categories.filter((category) => projects.some((p) => p.category === category));

  const scelte = [
    { valore: "tutti" as const, etichetta: "Tutti" },
    ...availableCategories.map((category) => ({ valore: category, etichetta: CATEGORY_LABELS[category] })),
  ];

  function spostaConLeFrecce(evento: React.KeyboardEvent<HTMLDivElement>) {
    const direzione =
      evento.key === "ArrowRight" || evento.key === "ArrowDown"
        ? 1
        : evento.key === "ArrowLeft" || evento.key === "ArrowUp"
          ? -1
          : 0;
    if (direzione === 0) return;

    evento.preventDefault();
    const corrente = scelte.findIndex((scelta) => scelta.valore === active);
    const prossima = (corrente + direzione + scelte.length) % scelte.length;
    setActive(scelte[prossima].valore);
    const gruppo = evento.currentTarget;
    gruppo.querySelector<HTMLButtonElement>(`[data-indice="${prossima}"]`)?.focus();
  }

  const filtered = useMemo(() => {
    const byCategory = active === "tutti" ? projects : projects.filter((p) => p.category === active);
    return limit ? byCategory.slice(0, limit) : byCategory;
  }, [projects, active, limit]);

  return (
    <div>
      {/*
        I filtri sono alternativi fra loro: se ne sceglie uno e gli altri si
        spengono. `aria-pressed` descriveva invece dei tasti indipendenti,
        ognuno acceso o spento per conto proprio. Qui è un gruppo di scelte,
        con `aria-checked` su ciascuna e la freccia che sposta la selezione
        come in un gruppo di radio.
      */}
      {availableCategories.length > 1 && (
        <div
          role="radiogroup"
          aria-label="Filtra per tipologia"
          className="mb-10 flex flex-wrap gap-3"
          onKeyDown={spostaConLeFrecce}
        >
          {scelte.map((scelta, i) => (
            <button
              key={scelta.valore}
              type="button"
              role="radio"
              aria-checked={active === scelta.valore}
              // In un gruppo di scelte solo quella attiva resta nel giro
              // della tabulazione: da lì ci si muove con le frecce.
              tabIndex={active === scelta.valore ? 0 : -1}
              data-indice={i}
              onClick={() => setActive(scelta.valore)}
              className={`px-4 py-3 text-sm ${
                active === scelta.valore ? "bg-grafite text-carta" : "bg-nebbia text-grafite"
              }`}
            >
              {scelta.etichetta}
            </button>
          ))}
        </div>
      )}

      {filtered.length > 0 ? (
        <ProjectGrid projects={filtered} />
      ) : (
        <p className="text-pietra">Nessun progetto in questa categoria per ora.</p>
      )}
    </div>
  );
}
