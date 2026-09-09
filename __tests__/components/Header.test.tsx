import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";

describe("Header", () => {
  it("renders all primary nav links", () => {
    render(<Header />);
    const desktopNav = screen.getByRole("navigation", { name: "Principale" });
    for (const label of ["Progetti", "Servizi", "Studio", "Impegno sociale", "Contatti"]) {
      expect(within(desktopNav).getByRole("link", { name: label })).toBeInTheDocument();
    }
  });

  it("toggles the mobile menu when the hamburger button is pressed", async () => {
    render(<Header />);
    const toggle = screen.getByRole("button", { name: /apri il menu/i });
    const mobileNav = screen.getByTestId("mobile-nav");

    expect(mobileNav).toHaveAttribute("data-open", "false");
    expect(mobileNav.className).toMatch(/(?:^|\s)hidden(?:\s|$)/);
    expect(mobileNav.className).not.toMatch(/(?:^|\s)block(?:\s|$)/);
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(toggle);

    expect(mobileNav).toHaveAttribute("data-open", "true");
    expect(mobileNav.className).toMatch(/(?:^|\s)block(?:\s|$)/);
    expect(mobileNav.className).not.toMatch(/(?:^|\s)hidden(?:\s|$)/);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });
});
