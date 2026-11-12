import { render, screen } from "@testing-library/react";
import { OperePubbliche } from "@/components/OperePubbliche";
import { LAVORI } from "@/lib/lavori";

describe("OperePubbliche", () => {
  // Il titolo e' piano di proposito: a convincere sono le quattro righe di
  // registro sotto, con le sigle, non l'annuncio.
  it("announces the public work plainly and leaves the proof to the register", () => {
    render(<OperePubbliche />);
    expect(screen.getByRole("heading", { name: /opere pubbliche/i })).toBeInTheDocument();
    expect(screen.getByText(/Piano Regolatore Generale/)).toBeInTheDocument();
  });

  // Le sigle sono il punto: VAS, VINCA e la Classe IV dicono a un RUP che lo
  // studio ha i requisiti, e a un privato che taglia di studio sta guardando.
  it("shows the certifications rather than claiming competence", () => {
    render(<OperePubbliche />);
    expect(screen.getByText(/VAS e VINCA/)).toBeInTheDocument();
    expect(screen.getByText(/opera strategica di Classe IV/)).toBeInTheDocument();
  });

  // Una colonna di importi in euro in home faceva il portfolio di
  // un'impresa: le cifre restano nell'elenco completo, qui no.
  it("keeps the contract values out of the home page", () => {
    render(<OperePubbliche />);
    expect(screen.queryByText(/€/)).not.toBeInTheDocument();
  });

  it("takes its wording from the declared register instead of a second copy", () => {
    render(<OperePubbliche />);
    const regolatore = LAVORI.find((l) => l.intervento.startsWith("Piano Regolatore Generale"));
    expect(regolatore).toBeDefined();
    expect(screen.getByText(regolatore!.intervento)).toBeInTheDocument();
  });

  it("sends anyone who wants the figures to the full register", () => {
    render(<OperePubbliche />);
    expect(screen.getByRole("link", { name: /elenco completo dei lavori/i })).toHaveAttribute(
      "href",
      "/progetti#lavori-titolo",
    );
  });
});
