"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Link verso una sezione della pagina corrente, del tipo "#contatti" o
 * "/#contatti".
 *
 * Con il solo next/link il secondo click non faceva niente: l'indirizzo era
 * gia' quello, il router considerava la navigazione conclusa e nessuno
 * scorreva la pagina. Qui lo scorrimento lo facciamo noi a ogni click, e
 * l'indirizzo lo riscriviamo con replaceState conservando lo stato del
 * router, cosi' la cronologia resta quella che Next si aspetta e il link
 * successivo (una scheda progetto, per dire) parte pulito.
 *
 * Quando la sezione sta su un'altra pagina non c'e' niente da intercettare:
 * ci pensa next/link come sempre.
 */
export function AnchorLink({
  href,
  className,
  children,
  onNavigate,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const taglio = href.indexOf("#");
  const percorso = taglio === -1 ? href : href.slice(0, taglio);
  const id = taglio === -1 ? "" : href.slice(taglio + 1);
  const stessaPagina = id !== "" && (percorso === "" || percorso === pathname);

  function alClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (!stessaPagina || event.defaultPrevented) return;
    // Ctrl-click, cmd-click e simili devono continuare ad aprire una scheda.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const sezione = document.getElementById(id);
    if (!sezione) return;

    event.preventDefault();

    const ridotto =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sezione.scrollIntoView({ behavior: ridotto ? "auto" : "smooth", block: "start" });

    // Il salto con l'ancora sposta anche il fuoco: chi naviga da tastiera
    // deve ritrovarsi dentro la sezione, non a inizio pagina.
    if (!sezione.hasAttribute("tabindex")) sezione.setAttribute("tabindex", "-1");
    sezione.focus({ preventScroll: true });

    window.history.replaceState(window.history.state, "", `#${id}`);
  }

  return (
    <Link href={href} className={className} onClick={alClick}>
      {children}
    </Link>
  );
}
