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
      expect.stringContaining("Maestranze"),
    ]);
  });

  it("links each phase to its section on the services page", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByRole("link", { name: /progettazione/i })).toHaveAttribute("href", "/servizi#progettazione");
    expect(screen.getByRole("link", { name: /maestranze/i })).toHaveAttribute("href", "/servizi#maestranze");
  });

  it("frames the four phases as one engagement rather than four separate offers", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByText(/un unico incarico/i)).toBeInTheDocument();
    expect(screen.getByText(/un solo interlocutore per tutte e quattro le fasi/i)).toBeInTheDocument();
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
