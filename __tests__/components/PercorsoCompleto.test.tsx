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
    expect(screen.getByText(/un immobile da rilevare/i)).toBeInTheDocument();
    expect(screen.getByText(/il terreno lo troviamo noi/i)).toBeInTheDocument();
  });

  // Tre lacune diverse, tre risposte: e' cosi' che la sezione dice che si
  // puo' prendere un tratto solo, senza una frase che lo spieghi.
  it("fills whichever stretch the client is missing, shown by three examples", () => {
    render(<PercorsoCompleto />);
    const chiusura = screen.getByText(/hai già l'impresa/i);
    expect(chiusura).toHaveTextContent(/progetto e direzione lavori li facciamo noi/i);
    expect(chiusura).toHaveTextContent(/hai già il progetto\?.*appalto e il cantiere/i);
    expect(chiusura).toHaveTextContent(/hai solo il terreno\?.*prima del progetto/i);
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
