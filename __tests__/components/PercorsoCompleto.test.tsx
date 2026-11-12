import { render, screen, within } from "@testing-library/react";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";

describe("PercorsoCompleto", () => {
  it("lists the three stops in order", () => {
    render(<PercorsoCompleto />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(items.map((item) => item.textContent)).toEqual([
      expect.stringContaining("Progettazione"),
      expect.stringContaining("Appalto"),
      expect.stringContaining("Sviluppo immobiliare"),
    ]);
  });

  // Senza il nome dell'agenzia "l'occasione la portiamo noi" resta un vanto
  // che nessuno puo' verificare: e' il contenuto della riga, non un dettaglio.
  it("opens by naming where the opportunities come from", () => {
    render(<PercorsoCompleto />);
    const apertura = screen.getByText(/un immobile da rilevare/i);
    expect(apertura).toHaveTextContent(/l'occasione la portiamo noi/i);
    expect(apertura).toHaveTextContent(/collaboriamo con IconaCasa Abruzzo/i);
  });

  it("gives every stop its own page", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByRole("link", { name: /progettazione/i })).toHaveAttribute("href", "/progettazione");
    expect(screen.getByRole("link", { name: /appalto/i })).toHaveAttribute("href", "/appalto");
    expect(screen.getByRole("link", { name: /sviluppo immobiliare/i })).toHaveAttribute(
      "href",
      "/sviluppo-immobiliare",
    );
  });

  // La biforcazione del punto 11: le tre fermate sono la competenza
  // progettuale, i servizi integrati quella esecutiva. Deve restare una riga
  // sola, non una quarta fermata.
  it("forks to the executive side without adding a fourth stop", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByRole("link", { name: /servizi integrati/i })).toHaveAttribute(
      "href",
      "/servizi-integrati",
    );
    expect(within(screen.getByRole("list")).getAllByRole("listitem")).toHaveLength(3);
  });

  // La voce "Progetti" della barra porta qui: senza l'id il salto non
  // arriverebbe da nessuna parte.
  it("is the anchor the nav sends visitors to", () => {
    const { container } = render(<PercorsoCompleto />);
    expect(container.querySelector("#approcci")).toBeInTheDocument();
  });

  // La chiusura deve dire tre cose: che si prende un tratto solo, che si puo'
  // prendere tutto, e che a capire quale non ci pensa il cliente. Se qualcuno
  // la riscrive perdendone una, il test cade.
  it("offers whichever stretch is missing, up to all of it, without making the client diagnose it", () => {
    render(<PercorsoCompleto />);
    const chiusura = screen.getByText(/il tratto che ti manca/i);
    expect(chiusura).toHaveTextContent(/anche tutto, se ti manca tutto/i);
    expect(chiusura).toHaveTextContent(/lo vediamo insieme/i);
  });

  it("surfaces public work and town planning without giving them a stop of their own", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByText(/urbanistica/i)).toBeInTheDocument();
    expect(screen.getByText(/lavori pubblici/i)).toBeInTheDocument();
  });

  it("keeps the icons out of the accessibility tree so labels carry the meaning", () => {
    const { container } = render(<PercorsoCompleto />);
    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(3);
    for (const icon of icons) {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    }
  });
});
