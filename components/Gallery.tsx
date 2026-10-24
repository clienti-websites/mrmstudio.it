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

/**
 * Con `aside` la galleria si apre in due colonne: la prima immagine diventa
 * la copertina a sinistra, il testo della scheda le sta a destra, e le altre
 * immagini scendono sotto a tutta larghezza.
 *
 * La copertina tiene la sua proporzione e da 768px si incolla in alto: con
 * un testo lungo allungarla voleva dire un ritratto 2:3 di una fotografia
 * nata 4:3, cioè un'immagine alta due schermi. Incollata invece accompagna
 * chi legge, e il vuoto sotto non si vede perché non resta mai fermo lì.
 *
 * La copertina resta dentro `images` invece di arrivare per conto suo: la
 * lightbox è una sola e deve poterla sfogliare insieme alle altre, quindi
 * l'indice che apre ogni riquadro dev'essere quello vero dell'elenco. Chi
 * chiama passa la copertina in testa.
 */
export function Gallery({ images, aside }: { images: GalleryImage[]; aside?: React.ReactNode }) {
  const [index, setIndex] = useState(-1);

  const copertina = aside ? images[0] : null;
  const riquadri = copertina ? images.slice(1) : images;
  const scarto = copertina ? 1 : 0;

  return (
    <>
      {copertina && (
        <div className="mb-2 grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
          <button
            type="button"
            onClick={() => setIndex(0)}
            aria-label={`Apri l'immagine: ${copertina.alt}`}
            className="relative block aspect-[4/3] w-full overflow-hidden bg-nebbia md:sticky md:top-24 md:self-start"
          >
            <Image
              src={copertina.src}
              alt={copertina.alt}
              fill
              priority
              sizes="(min-width: 768px) 56vw, 100vw"
              className="object-cover"
            />
          </button>

          <div>{aside}</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
        {riquadri.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i + scarto)}
            aria-label={`Apri l'immagine: ${image.alt}`}
            className={`relative overflow-hidden bg-nebbia ${classiRiquadro(i, riquadri.length)}`}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 336px, (min-width: 768px) 33vw, 50vw" className="object-cover" />
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
