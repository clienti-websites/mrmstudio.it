"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

/**
 * Il modello tridimensionale di un'opera, da girare col dito o col mouse.
 *
 * Non si carica da sé: sono quattro megabyte e mezzo di geometria, più un
 * megabyte di visualizzatore, e chi arriva sulla scheda da una ricerca non li
 * ha chiesti. Si vede la copertina, e il modello parte quando lo si chiede —
 * col peso scritto sul pulsante, così la scelta è informata.
 */
export function Modello3D({ src, poster, peso }: { src: string; poster: GalleryImage; peso: string }) {
  const [attivo, setAttivo] = useState(false);
  const telaio = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!attivo) return;
    let vivo = true;

    void (async () => {
      // Il decodificatore Draco va cercato in casa: quello predefinito sta su
      // un CDN di Google e la CSP lo blocca. model-viewer legge la posizione
      // dal globale quando costruisce l'elemento, non dalla classe importata
      // (lib/features/loading.js), quindi va scritta qui e prima.
      (window as unknown as { ModelViewerElement?: { dracoDecoderLocation: string } }).ModelViewerElement = {
        dracoDecoderLocation: "/draco/",
      };
      await import("@google/model-viewer");
      if (!vivo || !telaio.current) return;

      const vista = document.createElement("model-viewer");
      vista.setAttribute("src", src);
      vista.setAttribute("alt", poster.alt);
      vista.setAttribute("camera-controls", "");
      // Di suo aspetta di entrare nel campo visivo prima di scaricare: qui
      // l'ha gia' chiesto qualcuno premendo il pulsante, quindi si parte.
      vista.setAttribute("loading", "eager");
      // Sul telefono il trascinamento verticale scorre la pagina: senza
      // questo il modello se lo mangia e la scheda resta bloccata.
      vista.setAttribute("touch-action", "pan-y");
      vista.setAttribute("environment-image", "neutral");
      // L'inquadratura automatica tiene dentro tutto il lotto e l'edificio
      // resta un francobollo: tre quarti dall'alto, piu' vicina.
      vista.setAttribute("camera-orbit", "-30deg 65deg 30%");
      vista.setAttribute("shadow-intensity", "0.6");
      vista.className = "h-full w-full";
      telaio.current.replaceChildren(vista);
    })();

    return () => {
      vivo = false;
    };
  }, [attivo, src, poster.alt]);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-nebbia">
      {attivo ? (
        <div ref={telaio} className="h-full w-full" />
      ) : (
        <>
          <Image
            src={poster.src}
            alt=""
            fill
            sizes="(min-width: 768px) 72vw, 100vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={() => setAttivo(true)}
            className="absolute inset-0 flex items-end justify-start bg-grafite/30 p-6 text-left transition-colors hover:bg-grafite/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-carta"
          >
            <span className="bg-carta px-5 py-3 font-medium text-grafite">
              Gira il modello
              <span className="ml-2 font-normal text-pietra">{peso}</span>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
