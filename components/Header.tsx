"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "/progetti", label: "Progetti" },
  { href: "/servizi", label: "Servizi" },
  { href: "/studio", label: "Studio" },
  { href: "/impegno-sociale", label: "Impegno sociale" },
  { href: "/contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);

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
          type="button"
          className="lg:hidden"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block h-0.5 w-6 bg-grafite" />
          <span className="mt-1.5 block h-0.5 w-6 bg-grafite" />
          <span className="mt-1.5 block h-0.5 w-6 bg-grafite" />
        </button>
      </div>

      <nav
        aria-label="Mobile"
        data-testid="mobile-nav"
        data-open={open}
        aria-hidden={!open}
        className={`lg:hidden ${open ? "block" : "hidden"} border-t border-nebbia bg-carta px-6 pb-6`}
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block py-3 text-base font-medium text-grafite"
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
