"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
 * catalogo. Il cambio di categoria e' animato perche' altrimenti la griglia
 * si sostituisce di colpo e non si capisce che e' successo qualcosa; chi ha
 * chiesto meno movimento la vede cambiare e basta.
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
  const reduceMotion = useReducedMotion();

  const availableCategories = categories.filter((category) => projects.some((p) => p.category === category));

  const filtered = useMemo(() => {
    const byCategory = active === "tutti" ? projects : projects.filter((p) => p.category === active);
    return limit ? byCategory.slice(0, limit) : byCategory;
  }, [projects, active, limit]);

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
        <motion.div
          key={active}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <ProjectGrid projects={filtered} />
        </motion.div>
      ) : (
        <p className="text-pietra">Nessun progetto in questa categoria per ora.</p>
      )}
    </div>
  );
}
