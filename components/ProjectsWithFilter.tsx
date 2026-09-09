"use client";

import { useMemo, useState } from "react";
import type { Category, Project } from "@/lib/projects";
import { ProjectGrid } from "./ProjectGrid";

const CATEGORY_LABELS: Record<Category, string> = {
  residenziale: "Residenziale",
  "ristrutturazione-e-recupero": "Ristrutturazione e recupero",
  "direzionale-e-commerciale": "Direzionale e commerciale",
  "ricettivo-e-turistico": "Ricettivo e turistico",
};

export function ProjectsWithFilter({ projects, categories }: { projects: Project[]; categories: Category[] }) {
  const [active, setActive] = useState<Category | "tutti">("tutti");

  const availableCategories = categories.filter((category) => projects.some((p) => p.category === category));

  const filtered = useMemo(
    () => (active === "tutti" ? projects : projects.filter((p) => p.category === active)),
    [projects, active]
  );

  return (
    <div>
      {availableCategories.length > 1 && (
        <div role="group" aria-label="Filtra per tipologia" className="mb-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setActive("tutti")}
            aria-pressed={active === "tutti"}
            className={`px-4 py-2 text-sm ${active === "tutti" ? "bg-grafite text-carta" : "bg-nebbia text-grafite"}`}
          >
            Tutti
          </button>
          {availableCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={active === category}
              className={`px-4 py-2 text-sm ${active === category ? "bg-grafite text-carta" : "bg-nebbia text-grafite"}`}
            >
              {CATEGORY_LABELS[category]}
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
