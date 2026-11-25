"use client";

import { useRef } from "react";

type HeroVideo = { src: string; poster: string };

const QUERY_MOVIMENTO = "(prefers-reduced-motion: reduce)";

export function Hero({ title, video }: { title: string; video: HeroVideo }) {
  const sezione = useRef<HTMLElement>(null);

  // L'apertura mostrava il video solo dopo l'idratazione, e solo a chi non
  // aveva ne' movimento ridotto ne' risparmio dati: sotto stava la fotografia
  // di un altro progetto, quindi la home cambiava faccia da un dispositivo
  // all'altro e per un istante anche sullo stesso. Adesso il filmato parte
  // sempre, anche per chi ha chiesto meno movimento: e' una scelta di MRM,
  // l'apertura del sito deve essere una sola. Il prezzo e' che un visitatore
  // che ha chiesto meno movimento se lo trova comunque in moto; se si vuole
  // tornare indietro, basta rimettere una pausa su prefers-reduced-motion.

  // La freccia scorre fino al blocco che viene dopo l'apertura, qualunque
  // sia: niente id da tenere allineato con la home.
  function scendi() {
    const dopo = sezione.current?.nextElementSibling;
    const ridotto = window.matchMedia(QUERY_MOVIMENTO).matches;
    const comportamento = ridotto ? ("auto" as const) : ("smooth" as const);
    if (dopo) dopo.scrollIntoView({ behavior: comportamento, block: "start" });
    else window.scrollBy({ top: window.innerHeight * 0.85, behavior: comportamento });
  }

  return (
    <section ref={sezione} className="relative flex h-[85dvh] min-h-[560px] w-full items-center justify-center overflow-hidden bg-grafite">
      {/* shortcut: tre megabytes partono anche sotto rete mobile, perche'
          l'apertura deve essere la stessa per tutti. Se diventa un problema,
          un secondo file verticale piu' leggero con
          <source media="(max-width: 767px)">.

          Il poster e' il primo fotogramma del filmato: finche' il video non
          ha dati, e anche se non arrivasse mai, quello che si vede e'
          comunque l'inquadratura giusta e non un'altra fotografia. */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={video.src}
        poster={video.poster}
        preload="auto"
        width={1592}
        height={890}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

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
