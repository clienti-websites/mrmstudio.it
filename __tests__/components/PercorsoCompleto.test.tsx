import { render, screen, within } from "@testing-library/react";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";

describe("PercorsoCompleto", () => {
  it("renders the four phases in order as table rows", () => {
    render(<PercorsoCompleto />);
    const rowHeaders = screen.getAllByRole("rowheader").map((cell) => cell.textContent);
    expect(rowHeaders).toEqual(["Progettazione", "Appalto", "Direzione lavori", "Maestranze"]);
  });

  it("contrasts the usual arrangement with MRM's for every phase", () => {
    render(<PercorsoCompleto />);
    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: /gestione consueta/i })).toBeInTheDocument();
    expect(within(table).getByRole("columnheader", { name: /con mrm studio/i })).toBeInTheDocument();

    // Every phase row carries both a "usual" and an "MRM" cell, so no phase is
    // asserted on one side only.
    const bodyRows = within(within(table).getAllByRole("rowgroup")[1]).getAllByRole("row");
    expect(bodyRows).toHaveLength(4);
    for (const row of bodyRows) {
      expect(within(row).getAllByRole("cell")).toHaveLength(2);
    }
  });

  it("links each phase to its section on the services page", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByRole("link", { name: "Progettazione" })).toHaveAttribute("href", "/servizi#progettazione");
    expect(screen.getByRole("link", { name: "Maestranze" })).toHaveAttribute("href", "/servizi#maestranze");
  });

  it("states the single-point-of-contact conclusion", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByText(/un solo interlocutore per tutte e quattro le fasi/i)).toBeInTheDocument();
  });
});
