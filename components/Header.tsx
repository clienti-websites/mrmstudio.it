"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const LINKS = [
  { href: "/progetti", label: "Progetti" },
  { href: "/servizi", label: "Servizi" },
  { href: "/studio", label: "Studio" },
  { href: "/impegno-sociale", label: "Impegno sociale" },
  { href: "/#contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  // Sotto i 1024px il menu è un pannello laterale sovrapposto: mentre è
  // aperto la pagina dietro non deve scorrere, Esc lo chiude, e il fuoco
  // entra nel pannello e torna al pulsante quando si richiude.
  useEffect(() => {
    if (!open) return;

    const toggle = toggleRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      toggle?.focus();
    };
  }, [open]);

  // A movimento ridotto il pannello compare e sparisce senza scorrere: la
  // durata a zero toglie l'animazione, non la funzione.
  const slide = {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: reduceMotion ? 0 : 0.3, ease: [0.32, 0.72, 0, 1] as const },
  };

  return (
    <header className="sticky top-0 z-50 bg-carta/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-black tracking-tight text-grafite">
          MRM Studio
        </Link>

        <nav aria-label="Principale" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-grafite hover:text-muschio">
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="lg:hidden"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-grafite" />
          <span className="mt-1.5 block h-0.5 w-6 bg-grafite" />
          <span className="mt-1.5 block h-0.5 w-6 bg-grafite" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            {/* Velo che scurisce la pagina dietro al pannello. Cliccandolo si
                chiude, come ci si aspetta da un pannello laterale. */}
            <motion.div
              key="velo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
              className="fixed inset-0 z-40 bg-grafite/50 lg:hidden"
            />

            <motion.nav
              key="pannello"
              ref={panelRef}
              tabIndex={-1}
              aria-label="Mobile"
              data-testid="mobile-nav"
              {...slide}
              className="fixed right-0 top-0 z-50 flex h-dvh w-[min(20rem,80vw)] flex-col bg-carta px-6 py-5 shadow-xl outline-none lg:hidden"
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="text-lg font-black tracking-tight text-grafite">MRM Studio</span>
                <button
                  type="button"
                  aria-label="Chiudi il menu"
                  onClick={() => setOpen(false)}
                  className="text-2xl leading-none text-grafite"
                >
                  ×
                </button>
              </div>

              {LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="border-b border-nebbia py-4 text-base font-medium text-grafite"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

    </header>
  );
}
