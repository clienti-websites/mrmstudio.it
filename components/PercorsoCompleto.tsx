"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const FASI = [
  {
    id: "progettazione",
    label: "Progettazione",
    detail: "Tutto interno: architettonica, strutturale, energetica, impiantistica, rendering.",
  },
  {
    id: "appalto",
    label: "Appalto",
    detail: "Gestione contrattuale e amministrativa dell'affidamento lavori.",
  },
  {
    id: "direzione-lavori",
    label: "Direzione lavori",
    detail: "Controllo dell'esecuzione, contabilità, sicurezza, collaudo, agibilità.",
  },
  {
    id: "maestranze",
    label: "Maestranze",
    detail: "Selezione e coordinamento di imprese, impiantisti, operai e fornitori.",
  },
] as const;

const ALTRI = ["Progettista", "Impresa", "Direttore lavori", "Operai"];

export function PercorsoCompleto() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} aria-labelledby="percorso-titolo" className="px-6 py-24 md:px-12">
      <h2 id="percorso-titolo" className="mb-16 max-w-3xl text-3xl font-black tracking-tight text-grafite md:text-5xl">
        Un solo studio segue l&apos;opera dall&apos;idea alla consegna delle chiavi.
      </h2>

      <div aria-hidden="true" className="mb-3 max-w-4xl opacity-40">
        <svg viewBox="0 0 800 40" className="h-10 w-full overflow-visible" role="presentation">
          <line x1="20" y1="20" x2="780" y2="20" stroke="#6E6D65" strokeWidth="2" strokeDasharray="4 16" />
          {ALTRI.map((chi, i) => (
            <circle
              key={chi}
              cx={20 + i * (760 / 3)}
              cy={20 + (i % 2 === 0 ? 0 : 10)}
              r="6"
              fill="none"
              stroke="#6E6D65"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          ))}
        </svg>
        <div className="mt-2 flex justify-between">
          {ALTRI.map((chi) => (
            <span key={chi} className="text-xs text-pietra">
              {chi}
            </span>
          ))}
        </div>
      </div>
      <p className="mb-16 text-xs text-pietra">Così lavorano gli altri — nessuna connessione</p>

      <div className="relative max-w-4xl">
        <svg viewBox="0 0 800 40" className="h-10 w-full overflow-visible" role="presentation">
          <line x1="20" y1="20" x2="780" y2="20" stroke="#EAEAE5" strokeWidth="2" />
          <motion.line
            data-testid="percorso-line"
            x1="20"
            y1="20"
            x2="780"
            y2="20"
            stroke="#2E4034"
            strokeWidth="2"
            style={{ pathLength: reduceMotion ? 1 : pathLength }}
          />
          {FASI.map((fase, i) => (
            <circle key={fase.id} cx={20 + i * (760 / 3)} cy="20" r="7" fill="#2E4034" />
          ))}
        </svg>

        <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-4">
          {FASI.map((fase) => (
            <div key={fase.id}>
              <h3 className="mb-1 font-medium text-grafite">
                <Link href={`/servizi#${fase.id}`} className="hover:text-muschio hover:underline">
                  {fase.label}
                </Link>
              </h3>
              <p className="text-sm text-pietra">{fase.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-16 max-w-2xl text-xl font-medium text-grafite md:text-2xl">
        Chiami una persona sola. Quella persona risponde di tutto.
      </p>
    </section>
  );
}
