"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/projects";

// shortcut: queste misure sono il lotto di Vista Mare, in metri del suo sistema
// di coordinate. Al secondo modello vanno nel frontmatter.
//
// L'inquadratura automatica abbraccia la sfera di tutta la scena, che qui e'
// larga centosessanta metri di terreno: le quattro ville restano un francobollo
// in mezzo al nulla. La mira va sul gruppo delle ville, non sul centro del lotto.
const MIRA = "-10m 1m -42m";
const INQUADRATURA = "-55deg 70deg 100m";

type Visualizzatore = HTMLElement & { cameraOrbit: string; cameraTarget: string };

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
  const [avanzamento, setAvanzamento] = useState(0);
  const [pronto, setPronto] = useState(false);
  const [fallito, setFallito] = useState(false);
  const telaio = useRef<HTMLDivElement>(null);
  const vista = useRef<Visualizzatore | null>(null);

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
      try {
        await import("@google/model-viewer");
      } catch {
        if (vivo) setFallito(true);
        return;
      }
      if (!vivo || !telaio.current) return;

      const v = document.createElement("model-viewer") as Visualizzatore;
      v.setAttribute("src", src);
      v.setAttribute("alt", poster.alt);
      v.setAttribute("camera-controls", "");
      // Di suo aspetta di entrare nel campo visivo prima di scaricare: qui
      // l'ha gia' chiesto qualcuno premendo il pulsante, quindi si parte.
      v.setAttribute("loading", "eager");
      // Con "pan-y" il dito che trascina in verticale scorre la pagina e il
      // modello si puo' solo far girare in tondo, mai alzare o abbassare lo
      // sguardo: sul telefono diventa inservibile. Qui il visualizzatore si
      // apre solo se qualcuno lo chiede, quindi il gesto dentro la cornice e'
      // suo; la pagina si scorre sopra e sotto.
      v.setAttribute("touch-action", "none");
      v.setAttribute("environment-image", "neutral");
      // Lo spostamento laterale della mira porta l'edificio fuori campo: resta
      // acceso, ma il bottone qui sotto rimette tutto dov'era.
      v.setAttribute("camera-target", MIRA);
      v.setAttribute("camera-orbit", INQUADRATURA);
      // Senza questi si scende sotto il piano di campagna a guardare il
      // modello da sotto, e si vola indietro di duecentottanta metri finche'
      // l'edificio e' un punto. Il minimo tiene fuori dai muri.
      v.setAttribute("min-camera-orbit", "auto 10deg 45m");
      v.setAttribute("max-camera-orbit", "auto 88deg 180m");
      v.setAttribute("shadow-intensity", "0.6");
      v.className = "h-full w-full";

      v.addEventListener("progress", (e) => {
        setAvanzamento((e as unknown as CustomEvent<{ totalProgress: number }>).detail.totalProgress);
      });
      v.addEventListener("load", () => setPronto(true));
      v.addEventListener("error", () => setFallito(true));

      vista.current = v;
      telaio.current.replaceChildren(v);
    })();

    return () => {
      vivo = false;
      vista.current = null;
    };
  }, [attivo, src, poster.alt]);

  // Rimettere la stessa stringa conta come cambiamento (hasChanged e' sempre
  // vero in model-viewer), quindi la camera torna indietro scivolando.
  const rimetti = useCallback(() => {
    if (!vista.current) return;
    vista.current.cameraTarget = MIRA;
    vista.current.cameraOrbit = INQUADRATURA;
  }, []);

  return (
    <div className="relative aspect-square w-full overflow-hidden bg-nebbia sm:aspect-video">
      {attivo && <div ref={telaio} className="h-full w-full" />}

      {/* La copertina resta davanti finché il modello non è in piedi: sotto c'è
          una tela grigia, e dieci secondi di grigio sembrano un guasto. */}
      {(!attivo || !pronto) && (
        <>
          <Image
            src={poster.src}
            alt=""
            fill
            sizes="(min-width: 768px) 72vw, 100vw"
            className="object-cover"
          />
          {attivo ? (
            <div className="absolute inset-0 flex items-end justify-start bg-grafite/30 p-6">
              <span className="bg-carta px-5 py-3 font-medium text-grafite">
                {fallito ? "Il modello non si è caricato" : "Sto aprendo il modello"}
                {!fallito && (
                  <span className="ml-2 font-normal text-pietra" aria-hidden="true">
                    {Math.round(avanzamento * 100)}%
                  </span>
                )}
              </span>
            </div>
          ) : (
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
          )}
          {attivo && !fallito && (
            <div
              role="progressbar"
              aria-label="Caricamento del modello"
              aria-valuenow={Math.round(avanzamento * 100)}
              className="absolute inset-x-0 bottom-0 h-1 bg-carta/30"
            >
              <div
                className="h-full bg-carta transition-[width] duration-200"
                style={{ width: `${avanzamento * 100}%` }}
              />
            </div>
          )}
        </>
      )}

      {pronto && (
        <button
          type="button"
          onClick={rimetti}
          className="absolute bottom-4 right-4 bg-carta px-4 py-2 text-sm font-medium text-grafite transition-colors hover:bg-nebbia focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grafite"
        >
          Rimetti a fuoco
        </button>
      )}
    </div>
  );
}
