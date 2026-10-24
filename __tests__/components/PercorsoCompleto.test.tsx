import { render, screen, within } from "@testing-library/react";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";

describe("PercorsoCompleto", () => {
  it("lists the four phases in order", () => {
    render(<PercorsoCompleto />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(4);
    expect(items.map((item) => item.textContent)).toEqual([
      expect.stringContaining("Progettazione"),
      expect.stringContaining("Appalto"),
      expect.stringContaining("Direzione lavori"),
      expect.stringContaining("Interior design"),
    ]);
  });

  it("links each phase to its section on the services page", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByRole("link", { name: /progettazione/i })).toHaveAttribute("href", "/servizi#progettazione");
    expect(screen.getByRole("link", { name: /interior design/i })).toHaveAttribute(
      "href",
      "/servizi#interior-design",
    );
  });

  // Queste due righe sono il senso della sezione, non decorazione: la prima
  // dice che il lavoro comincia prima del progetto, la seconda che del
  // percorso si puo' prendere un tratto solo. Se qualcuno le riscrive
  // togliendo il concetto, il test cade.
  it("shows the work starts before the drawings, with the studio sourcing opportunities", () => {
    render(<PercorsoCompleto />);
    const apertura = screen.getByText(/un immobile da rilevare/i);
    expect(apertura).toHaveTextContent(/l'occasione la portiamo noi/i);
    // Il nome dell'agenzia e il legame sono il contenuto della riga: senza,
    // resta un vanto che nessuno puo' verificare.
    expect(apertura).toHaveTextContent(/collaboriamo con IconaCasa Abruzzo/i);
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
    expect(screen.getByText(/gare pubbliche/i)).toBeInTheDocument();
  });

  it("keeps the icons out of the accessibility tree so labels carry the meaning", () => {
    const { container } = render(<PercorsoCompleto />);
    const icons = container.querySelectorAll("svg");
    expect(icons).toHaveLength(4);
    for (const icon of icons) {
      expect(icon).toHaveAttribute("aria-hidden", "true");
    }
  });
});
