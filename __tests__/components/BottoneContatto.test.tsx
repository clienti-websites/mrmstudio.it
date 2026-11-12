import { render, screen } from "@testing-library/react";
import { BottoneContatto } from "@/components/BottoneContatto";

describe("BottoneContatto", () => {
  // Sta nel layout, quindi compare anche su pagine senza modulo: l'indirizzo
  // dev'essere la pagina contatti, non l'ancora che esiste solo in home.
  it("points at the contact page so it works from every page", () => {
    render(<BottoneContatto />);
    expect(screen.getByRole("link", { name: "Contattaci" })).toHaveAttribute("href", "/contatti");
  });

  // Il volto invita a premere ma non deve entrare nel nome del collegamento:
  // chi lo sente leggere deve sentire "Contattaci", non anche un ritratto.
  it("keeps the face out of the accessible name", () => {
    const { container } = render(<BottoneContatto />);
    const foto = container.querySelector("img");
    expect(foto).toBeInTheDocument();
    expect(foto).toHaveAttribute("alt", "");
  });
});
