import { render, screen } from "@testing-library/react";
import { FaseChecklist } from "@/components/FaseChecklist";

describe("FaseChecklist", () => {
  it("renders all four phases and marks only the ones passed in as done", () => {
    render(<FaseChecklist phases={["progettazione", "direzione-lavori"]} />);

    const list = screen.getByRole("list", { name: /quattro fasi/i });
    expect(list).toBeInTheDocument();

    expect(screen.getByText("Progettazione")).toHaveAttribute("data-done", "true");
    expect(screen.getByText("Direzione lavori")).toHaveAttribute("data-done", "true");
    expect(screen.getByText("Appalto")).toHaveAttribute("data-done", "false");
    expect(screen.getByText("Maestranze")).toHaveAttribute("data-done", "false");
  });

  it("tells screen-reader users which phases were and weren't followed, not just done vs. not by colour", () => {
    render(<FaseChecklist phases={["progettazione", "direzione-lavori"]} />);

    expect(screen.getAllByText("seguita")).toHaveLength(2);
    expect(screen.getAllByText("non seguita")).toHaveLength(2);
  });
});
