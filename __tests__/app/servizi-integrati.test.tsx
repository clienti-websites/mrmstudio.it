import { render, screen, within } from "@testing-library/react";
import ServiziIntegratiPage from "@/app/servizi-integrati/page";

describe("Servizi integrati", () => {
  it("walks the five real stops, in order", () => {
    render(<ServiziIntegratiPage />);
    const tappe = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(tappe.map((t) => t.querySelector("h3")?.textContent)).toEqual([
      "L'idea",
      "Analisi",
      "Pratiche e permessi",
      "Interni su misura",
      "Consegna",
    ]);
  });

  // Tempi e costi non sono tappe: se qualcuno li rimette in fila, il
  // percorso torna a dire che a un certo punto passano e poi non valgono piu'.
  it("keeps the two guarantees out of the path and over the whole of it", () => {
    render(<ServiziIntegratiPage />);
    const tappe = within(screen.getByRole("list")).getAllByRole("listitem");
    for (const tappa of tappe) {
      expect(tappa).not.toHaveTextContent(/budget|tempistiche|date concordate/i);
    }
    expect(screen.getByText(/per tutto il percorso/i)).toHaveTextContent(/budget quello approvato/i);
  });

  // I pallini sono posati in percentuale sullo stesso riquadro del disegno.
  // Se la cella torna a essere un riferimento per il posizionamento, quelle
  // percentuali diventano frazioni di cella e la linea passa lontano.
  it("leaves the dots measured against the grid, not against their cell", () => {
    render(<ServiziIntegratiPage />);
    const tappe = within(screen.getByRole("list")).getAllByRole("listitem");
    for (const tappa of tappe) {
      expect(tappa).toHaveClass("md:static");
    }
  });

  it("sends whoever only needs the design to the other side of the fork", () => {
    render(<ServiziIntegratiPage />);
    expect(screen.getByRole("link", { name: /come progettiamo/i })).toHaveAttribute("href", "/progettazione");
  });
});
