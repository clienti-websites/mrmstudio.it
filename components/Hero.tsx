"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type HeroVideo = { src: string; poster: string };

export function Hero({
  image,
  title,
  video,
}: {
  image: { src: string; alt: string };
  title: string;
  video?: HeroVideo;
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

      <div aria-hidden="true" className="absolute inset-0 bg-grafite/40" />

      <div className="relative mx-6 max-w-3xl bg-grafite/85 px-8 py-10 text-center md:px-14 md:py-14">
        <h1 className="text-3xl font-black leading-tight text-carta md:text-5xl">{title}</h1>
        <p className="mx-auto mt-5 text-carta/90">
          Progettiamo, gestiamo l&apos;appalto, dirigiamo il cantiere e coordiniamo le maestranze. Un solo studio, un
          solo interlocutore.
        </p>
        <Link
          href="/contatti"
          className="mt-7 inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90"
        >
          Contattaci
        </Link>
      </div>
    </section>
  );
}
