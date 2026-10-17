import { render, screen } from "@testing-library/react";
import { Modello3D } from "@/components/Modello3D";

// Il visualizzatore pesa un megabyte e il modello quattro e mezzo: la prova
// che conta è che non partano finché non li si chiede.
jest.mock("@google/model-viewer", () => {
  throw new Error("il visualizzatore non va caricato prima del click");
});

const copertina = { src: "/progetti/vista-mare/01.jpg", alt: "La villa vista dal giardino" };

describe("Modello3D", () => {
  it("shows the cover and a button, and loads nothing until it is pressed", () => {
    render(<Modello3D src="/modelli/vista-mare.glb" poster={copertina} peso="4,6 MB" />);

    const bottone = screen.getByRole("button", { name: /gira il modello/i });
    expect(bottone).toBeInTheDocument();
    expect(screen.queryByText("model-viewer")).not.toBeInTheDocument();
  });

  it("says how heavy the download is before the visitor commits to it", () => {
    render(<Modello3D src="/modelli/vista-mare.glb" poster={copertina} peso="4,6 MB" />);

    expect(screen.getByRole("button", { name: /4,6 MB/ })).toBeInTheDocument();
  });

  it("leaves the cover out of the accessibility tree: the button already names it", () => {
    render(<Modello3D src="/modelli/vista-mare.glb" poster={copertina} peso="4,6 MB" />);

    expect(screen.queryByAltText(copertina.alt)).not.toBeInTheDocument();
  });
});
