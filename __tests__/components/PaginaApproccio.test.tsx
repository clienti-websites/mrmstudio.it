import { render, screen, within } from "@testing-library/react";
import { PaginaApproccio } from "@/components/PaginaApproccio";
import { APPROCCI, esempiRegistro, getApproccio } from "@/lib/approcci";

describe("PaginaApproccio", () => {
  it("covers exactly the three approaches, in order", () => {
    expect(APPROCCI.map((a) => a.slug)).toEqual(["progettazione", "appalto", "sviluppo-immobiliare"]);
  });

  // Le righe di esempio non sono ricopiate: si cercano per prefisso
  // nell'elenco lavori dichiarato. Se una voce viene rinominata la build si
  // deve fermare, non pubblicare una pagina senza esempi.
  it("resolves every example against the declared register", () => {
    for (const approccio of APPROCCI) {
      const righe = esempiRegistro(approccio);
      expect(righe).toHaveLength(approccio.registro.length);
      for (const riga of righe) expect(riga.prestazioni).toBeTruthy();
    }
  });

  it("stops the build when a chosen work no longer exists", () => {
    expect(() =>
      esempiRegistro({ ...getApproccio("appalto"), registro: [{ cerca: "Non esiste", nota: "x" }] }),
    ).toThrow(/Non esiste/);
  });

  it("names the approach, the risk and what we do about it", () => {
    const approccio = getApproccio("appalto");
    render(<PaginaApproccio approccio={approccio} />);
    expect(screen.getByRole("heading", { level: 1, name: approccio.titolo })).toBeInTheDocument();
    expect(screen.getByText(approccio.rischio)).toBeInTheDocument();
    expect(screen.getByText(approccio.come)).toBeInTheDocument();
  });

  // "Prima e dopo" e' il modo di far capire che gli approcci sono tre strade
  // e non tre tappe obbligate: il primo non ha un prima, il terzo non ha un
  // dopo, e nessuna pagina rimanda a se stessa.
  it("points to the approach before and the one after, and never to itself", () => {
    const { unmount } = render(<PaginaApproccio approccio={getApproccio("appalto")} />);
    const vicini = screen.getByRole("region", { name: /prima e dopo/i });
    expect(within(vicini).getByRole("link", { name: /progettazione/i })).toHaveAttribute(
      "href",
      "/progettazione",
    );
    expect(within(vicini).getByRole("link", { name: /sviluppo immobiliare/i })).toHaveAttribute(
      "href",
      "/sviluppo-immobiliare",
    );
    expect(within(vicini).queryByRole("link", { name: /^appalto$/i })).not.toBeInTheDocument();
    unmount();

    render(<PaginaApproccio approccio={getApproccio("progettazione")} />);
    const soloDopo = screen.getByRole("region", { name: /prima e dopo/i });
    expect(within(soloDopo).getAllByRole("link")).toHaveLength(1);
  });

  // Ogni approccio ha le sue opere dichiarate: nessuna delle tre pagine
  // deve cavarsela col solo registro.
  it("shows the works that declare that approach, on all three pages", () => {
    for (const slug of ["progettazione", "appalto", "sviluppo-immobiliare"]) {
      const { unmount } = render(<PaginaApproccio approccio={getApproccio(slug)} />);
      const esempi = screen.getByRole("region", { name: /dove l'abbiamo fatto/i });
      expect(within(esempi).getAllByRole("link").length).toBeGreaterThan(0);
      unmount();
    }
  });
});
