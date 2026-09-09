import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Impegno Sociale — MRM Studio, Pescara e Abruzzo",
  description: "L'impegno sociale di MRM Studio, società di architettura e ingegneria di Pescara e Abruzzo.",
};

export default function ImpegnoSocialePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-12">
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Impegno Sociale</h1>

      <div className="border-t border-nebbia py-12">
        <p className="text-pietra">
          Questa pagina è in attesa del materiale da parte di MRM Studio. Il riferimento indicato è
          &quot;Elena Aiello&quot;; mancano ancora: di cosa si tratta, quale è stato il ruolo di MRM, quando,
          con quale esito, e il materiale fotografico. Nessun contenuto è stato inventato per riempire questo
          spazio.
        </p>
      </div>

      <CtaBand title="Vuoi saperne di più?" cta="Contattaci" href="/contatti" />
    </div>
  );
}
