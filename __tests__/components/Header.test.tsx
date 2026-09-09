import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";

describe("Header", () => {
  it("renders all primary nav links", () => {
    render(<Header />);
    for (const label of ["Progetti", "Servizi", "Studio", "Impegno sociale", "Contatti"]) {
      expect(screen.getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("toggles the mobile menu when the hamburger button is pressed", async () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: /apri il menu/i });
    expect(screen.getByTestId("mobile-nav")).toHaveAttribute("data-open", "false");
    await userEvent.click(toggle);
    expect(screen.getByTestId("mobile-nav")).toHaveAttribute("data-open", "true");
  });
});
