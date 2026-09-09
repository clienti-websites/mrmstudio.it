"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { GalleryImage } from "@/lib/projects";

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
            className="relative aspect-[4/3] overflow-hidden bg-nebbia"
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
