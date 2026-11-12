import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "@/components/Hero";

const image = { src: "/progetti/via-fedra-3/01-vista-aerea.jpg", alt: "Vista aerea del progetto" };

describe("Hero", () => {
  it("renders the headline", () => {
    render(<Hero image={image} title="Dall'idea alla consegna delle chiavi." />);
    expect(
      screen.getByRole("heading", { level: 1, name: /dall'idea alla consegna delle chiavi/i })
    ).toBeInTheDocument();
  });

  // Il contatto non sta piu' qui: e' il pulsante fisso del layout, cosi' resta
  // raggiungibile anche in fondo a una scheda progetto.
  it("leaves the call to action to the fixed button in the layout", () => {
    render(<Hero image={image} title="Dall'idea alla consegna delle chiavi." />);
    expect(screen.queryByRole("link", { name: /contattaci/i })).not.toBeInTheDocument();
  });

  // Al posto della chiamata all'azione togliata dall'apertura: la freccia
  // deve restare un comando raggiungibile e scorrere davvero.
  it("offers a single arrow that scrolls past the opening", async () => {
    const user = userEvent.setup();
    const scrollBy = jest.fn();
    const scrollIntoView = jest.fn();
    window.scrollBy = scrollBy;
    Element.prototype.scrollIntoView = scrollIntoView;

    render(
      <>
        <Hero image={image} title="Dall'idea alla consegna delle chiavi." />
        <section>Il blocco dopo</section>
      </>,
    );

    await user.click(screen.getByRole("button", { name: /scendi/i }));
    expect(scrollIntoView).toHaveBeenCalled();
    expect(scrollBy).not.toHaveBeenCalled();
  });
});
