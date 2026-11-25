import { render, screen, within } from "@testing-library/react";
import { TabellaLavori } from "@/components/TabellaLavori";
import { LAVORI } from "@/lib/lavori";

describe("TabellaLavori", () => {
  it("renders one row per declared work", () => {
    render(<TabellaLavori />);
    const table = screen.getByRole("table");
    const body = within(table).getAllByRole("rowgroup")[1];
    expect(within(body).getAllByRole("row")).toHaveLength(LAVORI.length);
  });

  it("says a figure is undisclosed rather than showing an invented one", () => {
    render(<TabellaLavori />);
    const undisclosed = LAVORI.filter((lavoro) => lavoro.importo === null).length;
    expect(undisclosed).toBeGreaterThan(0);
    expect(screen.getAllByText("Non divulgato")).toHaveLength(undisclosed);
  });

  // Il rimando e' un pulsante sotto la riga, non il titolo sottolineato: in
  // una tabella di interventi lunghi non si vedeva quale fosse cliccabile.
  it("gives a work with a page its own button, and no other work one", () => {
    render(<TabellaLavori />);
    const withPages = LAVORI.filter((lavoro) => lavoro.slug);
    expect(screen.getAllByRole("link")).toHaveLength(withPages.length);
    for (const lavoro of withPages) {
      const pulsante = screen.getByRole("link", { name: `Vedi la scheda: ${lavoro.intervento}` });
      expect(pulsante).toHaveTextContent("Vedi la scheda");
      expect(pulsante).toHaveAttribute("href", `/progetti/${lavoro.slug}`);
    }
  });

  it("covers work well past 2016, which the old site never showed", () => {
    render(<TabellaLavori />);
    expect(screen.getAllByText(/2022/).length).toBeGreaterThan(0);
  });
});
