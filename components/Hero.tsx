"use client";

import { useSyncExternalStore } from "react";
import Image from "next/image";
import { AnchorLink } from "./AnchorLink";

type HeroVideo = { src: string };

const QUERY_SCHERMO = "(min-width: 768px)";
const QUERY_MOVIMENTO = "(prefers-reduced-motion: reduce)";

function ascoltaPreferenze(alCambio: () => void) {
  const schermo = window.matchMedia(QUERY_SCHERMO);
  const movimento = window.matchMedia(QUERY_MOVIMENTO);
  schermo.addEventListener("change", alCambio);
  movimento.addEventListener("change", alCambio);
  return () => {
    schermo.removeEventListener("change", alCambio);
    movimento.removeEventListener("change", alCambio);
  };
}

function leggiPreferenze() {
  const risparmioDati =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return (
    window.matchMedia(QUERY_SCHERMO).matches &&
    !window.matchMedia(QUERY_MOVIMENTO).matches &&
    !risparmioDati
  );
}

export function Hero({
  image,
  title,
  video,
  ctaHref = "/contatti",
}: {
  image: { src: string; alt: string };
  title: string;
  video?: HeroVideo;
  ctaHref?: string;
}) {
  // Il video pesa qualche megabyte ed e' decorativo: non lo scarica chi apre
  // il sito dal telefono, chi ha chiesto meno movimento o chi ha il risparmio
  // dati attivo. Sotto resta sempre la fotografia, che next/image consegna
  // gia' ridimensionata per lo schermo.
  const vaBeneIlVideo = useSyncExternalStore(ascoltaPreferenze, leggiPreferenze, () => false);
  const mostraVideo = Boolean(video) && vaBeneIlVideo;

  return (
    <section className="relative flex h-[85dvh] min-h-[560px] w-full items-center justify-center overflow-hidden">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />

      {mostraVideo && video && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}

      {/*
        Niente riquadro dietro al testo: il bordo netto di un pannello in
        mezzo al video si vede e pesa. Al suo posto uno scurimento sfumato,
        piu' intenso dove sta il testo e quasi assente ai lati, che sfuma
        senza lasciare margini. Deve restare abbastanza carico da reggere il
        caso peggiore, cioe' un cielo bianco proprio dietro le parole: sotto
        una certa soglia il testo chiaro non sarebbe piu' leggibile.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 80% at 50% 45%, rgba(28,30,27,0.86) 0%, rgba(28,30,27,0.86) 65%, rgba(28,30,27,0.5) 100%)",
        }}
      />

      <div className="relative mx-6 max-w-3xl px-2 text-center [text-shadow:0_2px_14px_rgba(0,0,0,0.45)]">
        <h1 className="text-3xl font-black leading-tight text-carta md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 text-center text-carta/90">
          Progettiamo, gestiamo l&apos;appalto, dirigiamo il cantiere e scegliamo le imprese. Tu parli con noi e
          basta.
        </p>
        <AnchorLink
          href={ctaHref}
          className="mt-7 inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90"
        >
          Contattaci
        </AnchorLink>
      </div>
    </section>
  );
}
