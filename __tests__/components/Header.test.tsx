import { render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";

let mockPathname = "/";
jest.mock("next/navigation", () => ({ usePathname: () => mockPathname }));

beforeEach(() => {
  mockPathname = "/";
});

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

    // Chiuso il pannello non esiste affatto, cosi' puo' avere un'uscita
    // animata e non resta un elemento nascosto nel documento.
    expect(screen.queryByTestId("mobile-nav")).not.toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);

    const panel = screen.getByTestId("mobile-nav");
    expect(panel.className).toMatch(/(?:^|\s)fixed(?:\s|$)/);
    expect(panel.className).toMatch(/right-0/);
    expect(toggle).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: /chiudi il menu/i }));
    await waitForElementToBeRemoved(() => screen.queryByTestId("mobile-nav"));
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("stops the page behind from scrolling while the panel is open", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(screen.getByRole("button", { name: /chiudi il menu/i }));
    await waitForElementToBeRemoved(() => screen.queryByTestId("mobile-nav"));
    expect(document.body.style.overflow).not.toBe("hidden");
  });

  it("offers Home in the panel but not twice in the desktop bar", async () => {
    const user = userEvent.setup();
    render(<Header />);

    // Sulla barra desktop alla home ci si arriva dal logo.
    const desktopNav = screen.getByRole("navigation", { name: "Principale" });
    expect(within(desktopNav).queryByRole("link", { name: "Home" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Menu" }));
    const panel = screen.getByTestId("mobile-nav");
    expect(within(panel).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  });

  it("closes itself when the visitor moves to another page", async () => {
    const user = userEvent.setup();
    const { rerender } = render(<Header />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    expect(screen.getByTestId("mobile-nav")).toBeInTheDocument();

    // Una navigazione qualsiasi, compreso il tasto indietro del browser,
    // cambia il percorso: il pannello non deve restare aperto sopra la
    // pagina nuova.
    mockPathname = "/progetti";
    rerender(<Header />);
    await waitForElementToBeRemoved(() => screen.queryByTestId("mobile-nav"));
  });

  it("closes on Escape and when a destination is chosen", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Menu" }));
    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByTestId("mobile-nav"));

    await user.click(screen.getByRole("button", { name: "Menu" }));
    const panel = screen.getByTestId("mobile-nav");
    await user.click(within(panel).getByRole("link", { name: "Servizi" }));
    await waitForElementToBeRemoved(() => screen.queryByTestId("mobile-nav"));
  });
});
