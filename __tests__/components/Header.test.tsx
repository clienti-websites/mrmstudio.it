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

  it("opens the mobile menu as a side panel and closes it again", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const toggle = screen.getByRole("button", { name: "Menu" });
    const mobileNav = screen.getByTestId("mobile-nav");

    expect(mobileNav).toHaveAttribute("data-open", "false");
    expect(mobileNav).toHaveAttribute("hidden");
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    expect(mobileNav).toHaveAttribute("data-open", "true");
    expect(mobileNav).not.toHaveAttribute("hidden");
    // Pannello laterale sovrapposto, non una tendina che spinge la pagina.
    expect(mobileNav.className).toMatch(/(?:^|\s)fixed(?:\s|$)/);
    expect(mobileNav.className).toMatch(/right-0/);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
  });

  it("stops the page behind from scrolling while the panel is open", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: /chiudi il menu/i }));
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("closes on Escape and when a destination is chosen", async () => {
    const user = userEvent.setup();
    render(<Header />);
    const mobileNav = screen.getByTestId("mobile-nav");

    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.keyboard("{Escape}");
    expect(mobileNav).toHaveAttribute("data-open", "false");

    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.click(within(mobileNav).getByRole("link", { name: "Servizi" }));
    expect(mobileNav).toHaveAttribute("data-open", "false");
  });
});
