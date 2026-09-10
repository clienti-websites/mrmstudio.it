"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type HeroVideo = { src: string; poster: string };

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
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      element.pause();
      element.currentTime = 0;
    }
  }, []);

  return (
    <section className="relative flex h-[85dvh] min-h-[560px] w-full items-center justify-center overflow-hidden">
      {video ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={image.alt}
        />
      ) : (
        <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className="object-cover" />
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
        <Link
          href={ctaHref}
          className="mt-7 inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90"
        >
          Contattaci
        </Link>
      </div>
    </section>
  );
}
