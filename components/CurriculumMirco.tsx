"use client";

import { useRef } from "react";
import { AGGIORNATO, COMPETENZE, FORMAZIONE, SOFTWARE, VOCI } from "@/lib/cvMirco";

/**
 * Il curriculum di Mirco, dentro un riquadro che si apre sopra la pagina.
 *
 * E' un <dialog> del browser e non un pannello costruito a mano: lo sfondo
 * diventa inerte, Esc chiude, il fuoco resta dentro e il lettore di schermo
 * annuncia una finestra. Scritto a mano sarebbero cento righe di gestione
 * del fuoco per ottenere lo stesso risultato peggio.
 *
 * Non e' una pagina a se' perche' chi apre un curriculum vuole tornare dove
 * stava: una pagina nuova lo porterebbe via dai profili e lo costringerebbe
 * a tornare indietro col pulsante del browser.
 *
 * Le cinquantasei voci stanno tutte nel documento servito, non caricate
 * dopo: sono testo, e cosi' le trova anche chi cerca in pagina con Ctrl+F.
 * Le prestazioni di ogni incarico, trecentotrentaquattro in tutto, stanno
 * chiuse in un <details>: aperte, l'elenco diventava un muro in cui non si
 * distingueva piu' un lavoro dall'altro.
 */
export function CurriculumMirco({ nome }: { nome: string }) {
  const riquadro = useRef<HTMLDialogElement>(null);

  const collaborazioni = VOCI.filter((voce) => voce.periodo === "collaborazione");
  const professione = VOCI.filter((voce) => voce.periodo === "professione");

  return (
    <>
      <button
        type="button"
        onClick={() => riquadro.current?.showModal()}
        className="mt-3 border border-grafite/25 px-4 py-2 text-sm font-medium text-grafite transition-colors hover:border-grafite/60 hover:bg-nebbia motion-reduce:transition-none"
      >
        Curriculum
      </button>

      <dialog
        ref={riquadro}
        aria-labelledby="cv-titolo"
        // Il click sullo sfondo chiude: il bersaglio e' il <dialog> stesso
        // solo quando si preme fuori dal contenuto.
        onClick={(evento) => {
          if (evento.target === riquadro.current) riquadro.current?.close();
        }}
        // m-auto perche' Tailwind azzera i margini di ogni elemento e con
        // essi il `margin: auto` con cui il browser centra un dialog modale.
        className="m-auto max-h-[88vh] w-[min(52rem,calc(100vw-2rem))] overflow-y-auto bg-carta p-0 text-grafite backdrop:bg-grafite/75"
      >
        <div className="sticky top-0 flex items-start justify-between gap-6 border-b border-grafite/15 bg-carta px-6 py-5 md:px-10">
          <div>
            <h2 id="cv-titolo" className="text-xl font-bold md:text-2xl">
              {nome}
            </h2>
            <p className="mt-1 text-sm text-pietra">Curriculum aggiornato al {AGGIORNATO}</p>
          </div>
          <button
            type="button"
            onClick={() => riquadro.current?.close()}
            className="shrink-0 border border-grafite/25 px-3 py-1.5 text-sm font-medium transition-colors hover:border-grafite/60 hover:bg-nebbia motion-reduce:transition-none"
          >
            Chiudi
          </button>
        </div>

        <div className="px-6 py-8 md:px-10">
          {/* In sintesi, per chi non scorrera' cinquantasei incarichi. I
              numeri sono contati sulle voci qui sotto, non scritti a mano:
              se il curriculum cresce, crescono anche loro. */}
          <section aria-labelledby="cv-sintesi" className="bg-nebbia p-6">
            <h3 id="cv-sintesi" className="text-sm font-medium text-pietra">
              In sintesi
            </h3>
            <p className="mt-3 max-w-none text-grafite">
              Architetto, iscritto all&apos;Ordine dell&apos;Aquila dal 2013 col numero 776. Ha fondato MRM
              Studio nello stesso anno e la società nel 2021. Progetta architettura e strutture, si occupa di
              urbanistica per comuni e privati, e segue i cantieri come direttore dei lavori.
            </p>
            <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-pietra">Incarichi nel curriculum</dt>
                <dd className="mt-0.5 font-medium">
                  {VOCI.length}, dal 2004: {collaborazioni.length} come collaboratore di due studi
                  dell&apos;Alto Sangro, {professione.length} in proprio dal 2013
                </dd>
              </div>
              <div>
                <dt className="text-pietra">Committenza</dt>
                <dd className="mt-0.5 font-medium">
                  {VOCI.filter((voce) => voce.committenza !== "Privata").length} incarichi pubblici o su
                  finanziamento pubblico, {VOCI.filter((voce) => voce.committenza === "Privata").length}{" "}
                  privati
                </dd>
              </div>
              <div>
                <dt className="text-pietra">Lavori in corso</dt>
                <dd className="mt-0.5 font-medium">{VOCI.filter((voce) => voce.inCorso).length}</dd>
              </div>
              <div>
                <dt className="text-pietra">Opere private progettate e dirette</dt>
                <dd className="mt-0.5 font-medium">Volume medio dichiarato di € 1.800.000 all&apos;anno</dd>
              </div>
            </dl>
          </section>

          <section aria-labelledby="cv-formazione" className="mt-12">
            <h3 id="cv-formazione" className="text-lg font-bold">
              Formazione
            </h3>
            <ul className="mt-4 space-y-3">
              {FORMAZIONE.map((riga) => (
                <li key={riga} className="border-t border-grafite/15 pt-3 text-grafite">
                  {riga}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="cv-competenze" className="mt-12">
            <h3 id="cv-competenze" className="text-lg font-bold">
              Competenze professionali
            </h3>
            <div className="mt-4 space-y-5">
              {COMPETENZE.map((ambito) => (
                <div key={ambito.titolo} className="border-t border-grafite/15 pt-4">
                  <h4 className="font-medium text-grafite">{ambito.titolo}</h4>
                  <p className="mt-1 text-grafite">{ambito.testo}</p>
                </div>
              ))}
            </div>
            <h4 className="mt-8 font-medium text-grafite">Strumenti</h4>
            <ul className="mt-2 space-y-1 text-sm text-pietra">
              {SOFTWARE.map((riga) => (
                <li key={riga}>{riga}</li>
              ))}
            </ul>
          </section>

          <ElencoVoci
            id="cv-professione"
            titolo="Incarichi in proprio, dal 2013"
            intro="Le esperienze che il curriculum riporta come più significative."
            voci={professione}
          />

          <ElencoVoci
            id="cv-collaborazioni"
            titolo="Collaborazioni, dal 2004 al 2012"
            intro="Durante diploma e laurea, per due studi di architettura e ingegneria dell'Alto Sangro."
            voci={collaborazioni}
          />
        </div>
      </dialog>
    </>
  );
}

function ElencoVoci({
  id,
  titolo,
  intro,
  voci,
}: {
  id: string;
  titolo: string;
  intro: string;
  voci: typeof VOCI;
}) {
  return (
    <section aria-labelledby={id} className="mt-12">
      <h3 id={id} className="text-lg font-bold">
        {titolo}
      </h3>
      <p className="mt-1 text-sm text-pietra">{intro}</p>

      {/* L'anno a sinistra come colonna sua, non come etichetta dentro al
          testo: cinquantasei voci lette una dopo l'altra hanno bisogno di
          un punto fermo su cui scorrere l'occhio. */}
      <ol className="mt-6">
        {voci.map((voce, i) => (
          <li
            key={`${voce.anno}-${i}`}
            className="grid gap-x-8 gap-y-2 border-t border-grafite/15 py-6 md:grid-cols-[8rem_1fr]"
          >
            <div className="text-sm">
              <p className="font-medium tabular-nums text-grafite">
                {voce.anno}
                {voce.inCorso && <span className="font-normal text-pietra">, in corso</span>}
              </p>
              <p className="mt-0.5 text-pietra">Committenza {voce.committenza.toLowerCase()}</p>
            </div>

            <div>
              <p className="text-grafite">{voce.descrizione}</p>
              {voce.importo && <p className="mt-2 font-medium text-grafite">{voce.importo}</p>}
              <p className="mt-1 text-sm text-pietra">{voce.esito}.</p>

              <details className="mt-3">
                <summary className="inline-block cursor-pointer py-1 text-sm text-muschio underline">
                  Prestazioni svolte ({voce.prestazioni.length})
                </summary>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-grafite">
                  {voce.prestazioni.map((prestazione) => (
                    <li key={prestazione}>{prestazione}</li>
                  ))}
                </ul>
              </details>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
