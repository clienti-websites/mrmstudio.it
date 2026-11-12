"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";

type HeroVideo = { src: string; poster: string };

const QUERY_MOVIMENTO = "(prefers-reduced-motion: reduce)";

function ascoltaPreferenze(alCambio: () => void) {
  const movimento = window.matchMedia(QUERY_MOVIMENTO);
  movimento.addEventListener("change", alCambio);
  return () => movimento.removeEventListener("change", alCambio);
}

function leggiPreferenze() {
  const risparmioDati =
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
  return !window.matchMedia(QUERY_MOVIMENTO).matches && !risparmioDati;
}

export function Hero({
  image,
  title,
  video,
}: {
  image: { src: string; alt: string };
  title: string;
  video?: HeroVideo;
}) {
  // shortcut: tre megabytes partono anche sotto rete mobile, salvo risparmio
  // dati attivo. Se diventa un problema, un secondo file verticale con
  // <source media="(max-width: 767px)">.
  //
  // Il video e' decorativo: non lo scarica chi ha chiesto meno movimento o chi
  // ha il risparmio dati attivo. Sotto resta sempre la fotografia, che
  // next/image consegna gia' ridimensionata per lo schermo.
  //
  // L'elemento non viene proprio creato quando non serve: nasconderlo con un
  // foglio di stile lo farebbe scaricare lo stesso. Chi ha chiesto meno
  // movimento vede quindi l'immagine ferma, che e' il comportamento atteso.
  const sezione = useRef<HTMLElement>(null);
  const vaBeneIlVideo = useSyncExternalStore(ascoltaPreferenze, leggiPreferenze, () => false);

  // La freccia scorre fino al blocco che viene dopo l'apertura, qualunque
  // sia: niente id da tenere allineato con la home.
  function scendi() {
    const dopo = sezione.current?.nextElementSibling;
    const ridotto = window.matchMedia(QUERY_MOVIMENTO).matches;
    const comportamento = ridotto ? ("auto" as const) : ("smooth" as const);
    if (dopo) dopo.scrollIntoView({ behavior: comportamento, block: "start" });
    else window.scrollBy({ top: window.innerHeight * 0.85, behavior: comportamento });
  }
  const mostraVideo = Boolean(video) && vaBeneIlVideo;

  return (
    <section ref={sezione} className="relative flex h-[85dvh] min-h-[560px] w-full items-center justify-center overflow-hidden">
      <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />

      {mostraVideo && video && (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          // Del filmato si scarica prima la sola intestazione: il primo
          // fotogramma a schermo lo dà il poster, quindi non serve tirare
          // giù tutto per avere qualcosa da mostrare.
          preload="metadata"
          width={1592}
          height={890}
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
        <h1 className="text-3xl font-bold leading-tight text-carta md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 text-center text-carta/90">
          Architettura e ingegneria nello stesso studio, dal primo rilievo alla consegna. A Pescara e in
          Abruzzo.
        </p>
      </div>

      {/* Al posto della chiamata all'azione che stava qui: un invito a
          scendere, non un secondo pulsante. Il rimbalzo si ferma da se' per
          chi ha chiesto meno movimento, e il bersaglio tattile resta di 44px
          anche se il disegno ne occupa meno. */}
      <button
        type="button"
        onClick={scendi}
        aria-label="Scendi alla sezione successiva"
        className="absolute bottom-6 left-1/2 flex h-11 w-11 -translate-x-1/2 items-center justify-center text-carta/80 transition-colors hover:text-carta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-carta"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="h-7 w-7 animate-bounce motion-reduce:animate-none"
        >
          <path d="M12 4v15" />
          <path d="M5.5 13.5L12 20l6.5-6.5" />
        </svg>
      </button>
    </section>
  );
}
