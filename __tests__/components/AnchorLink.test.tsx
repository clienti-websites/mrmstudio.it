import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AnchorLink } from "@/components/AnchorLink";

let mockPathname = "/";
jest.mock("next/navigation", () => ({ usePathname: () => mockPathname }));

function montaConSezione(href: string) {
  const sezione = document.createElement("section");
  sezione.id = "contatti";
  document.body.appendChild(sezione);
  const scrollIntoView = jest.fn();
  sezione.scrollIntoView = scrollIntoView;
  render(<AnchorLink href={href}>Contattaci</AnchorLink>);
  return { sezione, scrollIntoView };
}

beforeEach(() => {
  mockPathname = "/";
  document.body.innerHTML = "";
  window.history.replaceState(null, "", "/");
});

describe("AnchorLink", () => {
  it("scorre alla sezione anche quando l'indirizzo e' gia' quello", async () => {
    const user = userEvent.setup();
    const { scrollIntoView } = montaConSezione("/#contatti");

    await user.click(screen.getByRole("link", { name: "Contattaci" }));
    expect(scrollIntoView).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe("#contatti");

    // Questo e' il caso che si era rotto: il secondo click, con l'hash gia'
    // presente nell'indirizzo, non muoveva piu' la pagina.
    await user.click(screen.getByRole("link", { name: "Contattaci" }));
    expect(scrollIntoView).toHaveBeenCalledTimes(2);
  });

  it("tiene lo stato del router quando riscrive l'indirizzo", async () => {
    const user = userEvent.setup();
    const stato = { __NA: "next" };
    window.history.replaceState(stato, "", "/");
    montaConSezione("#contatti");

    await user.click(screen.getByRole("link", { name: "Contattaci" }));
    expect(window.history.state).toEqual(stato);
  });

  it("porta il fuoco dentro la sezione, come farebbe un'ancora vera", async () => {
    const user = userEvent.setup();
    const { sezione } = montaConSezione("#contatti");

    await user.click(screen.getByRole("link", { name: "Contattaci" }));
    expect(sezione).toHaveFocus();
  });

  it("non intercetta niente se la sezione sta su un'altra pagina", async () => {
    const user = userEvent.setup();
    mockPathname = "/servizi";
    const { scrollIntoView } = montaConSezione("/#contatti");

    await user.click(screen.getByRole("link", { name: "Contattaci" }));
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("lascia passare i link senza ancora", async () => {
    const user = userEvent.setup();
    render(<AnchorLink href="/progetti">Progetti</AnchorLink>);
    const link = screen.getByRole("link", { name: "Progetti" });
    expect(link).toHaveAttribute("href", "/progetti");

    // Nessun preventDefault: la navigazione resta di next/link.
    let prevenuto = false;
    link.addEventListener("click", (e) => {
      prevenuto = e.defaultPrevented;
    });
    await user.click(link);
    expect(prevenuto).toBe(false);
  });
});
