import { render, screen, within } from "@testing-library/react";
import { CurriculumMirco } from "@/components/CurriculumMirco";
import { VOCI } from "@/lib/cvMirco";
import { TEAM } from "@/lib/team";

describe("CurriculumMirco", () => {
  // Le voci sono trascritte dal PDF con uno script, non a mano: se una
  // trascrizione perde un pezzo la pagina pubblicherebbe una riga vuota.
  it("carries all fifty-six entries, each one complete", () => {
    expect(VOCI).toHaveLength(56);
    for (const voce of VOCI) {
      expect(voce.anno).toMatch(/^\d{4}(-\d{4})?$/);
      expect(voce.descrizione.length).toBeGreaterThan(40);
      expect(voce.esito.length).toBeGreaterThan(5);
      expect(voce.prestazioni.length).toBeGreaterThan(0);
      for (const prestazione of voce.prestazioni) expect(prestazione.length).toBeGreaterThan(10);
    }
    expect(VOCI.filter((voce) => voce.periodo === "collaborazione")).toHaveLength(10);
    expect(VOCI.filter((voce) => voce.periodo === "professione")).toHaveLength(46);
  });

  // Il PDF e' pieno di trattini lunghi, il sito non ne usa nessuno nei testi.
  it("leaves no long dashes in the transcription", () => {
    const tutto = JSON.stringify(VOCI);
    expect(tutto).not.toMatch(/[–—]/);
  });

  // I dati personali della prima pagina del PDF non vanno su un sito aperto.
  it("keeps his home address, birth date and personal numbers out", () => {
    const tutto = JSON.stringify(VOCI);
    expect(tutto).not.toMatch(/03\/05\/1987/);
    expect(tutto).not.toMatch(/Viale G\. Marconi 109/);
    expect(tutto).not.toMatch(/345 ?0623204|328 ?4006099/);
    expect(tutto).not.toMatch(/01896050661/);
  });

  // jsdom 26 non implementa dialog.showModal(), quindi qui si verifica
  // quello che il documento serve: il pulsante che apre, e il contenuto del
  // riquadro, che e' testo nella pagina anche a riquadro chiuso. Da chiuso
  // il contenuto resta nascosto ai ruoli, da cui `hidden: true`.
  it("has an opening button, and the summary before the list", () => {
    render(<CurriculumMirco nome="Mirco Ciarlante" />);
    expect(screen.getByRole("button", { name: "Curriculum" })).toBeInTheDocument();

    const sintesi = screen.getByRole("region", { name: /in sintesi/i, hidden: true });
    expect(within(sintesi).getByText(/numero 776/)).toBeInTheDocument();
    expect(within(sintesi).getByText(/56, dal 2004/)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /incarichi in proprio, dal 2013/i, hidden: true }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Via Fedra n\. 3/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Chiudi", hidden: true })).toBeInTheDocument();
  });

  // Il pulsante compare per chi ha un curriculum trascritto, e per nessun
  // altro: senza questa bandierina tornerebbe un controllo sul nome.
  it("belongs to exactly one person", () => {
    expect(TEAM.filter((persona) => persona.curriculum).map((persona) => persona.name)).toEqual([
      "Mirco Ciarlante",
    ]);
  });
});
