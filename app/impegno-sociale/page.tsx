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

      {/* Cosa serve per completare questa pagina: di cosa si tratta, il ruolo
          di MRM, quando, con quale esito, e le fotografie. Il riferimento dato
          dal cliente e' "Elena Aiello". Finche' non arriva, meglio una riga
          asciutta che un paragrafo che spiega il vuoto. */}
      <div className="border-t border-nebbia py-12">
        <p className="text-pietra">In attesa di materiale.</p>
      </div>

      <CtaBand title="Vuoi saperne di più?" cta="Contattaci" href="/contatti" />
    </div>
  );
}
