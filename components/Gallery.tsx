"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryImage } from "@/lib/projects";

/**
 * Con un numero di immagini che non è multiplo delle colonne, l'ultima riga
 * restava spaiata: su una scheda da dieci immagini si vedevano tre file piene
 * e poi un riquadro solo con due terzi di riga vuoti.
 *
 * Qui l'ultima immagine si allarga fino a riempire lo spazio che avanza, e il
 * suo taglio diventa panoramico in proporzione, così l'altezza della riga
 * resta identica a quella delle altre invece di raddoppiare.
 */
function classiRiquadro(indice: number, totale: number): string {
  const ultimo = indice === totale - 1;
  if (!ultimo) return "aspect-[4/3]";

  const restoDue = totale % 2;
  const restoTre = totale % 3;

  // Le due larghezze vanno decise separatamente: sul telefono le colonne sono
  // due, da 768px in su diventano tre.
  const telefono = restoDue === 1 ? "col-span-2 aspect-[8/3]" : "aspect-[4/3]";
  const schermo =
    restoTre === 1
      ? "md:col-span-3 md:aspect-[4/1]"
      : restoTre === 2
        ? "md:col-span-2 md:aspect-[8/3]"
        : "md:col-span-1 md:aspect-[4/3]";

  return `${telefono} ${schermo}`;
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Apri l'immagine: ${image.alt}`}
            className={`relative overflow-hidden bg-nebbia ${classiRiquadro(i, images.length)}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 50vw" className="object-cover" />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({ src: image.src, alt: image.alt }))}
      />
    </>
  );
}
