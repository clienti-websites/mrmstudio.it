import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Hero } from "@/components/Hero";

const video = { src: "/video/hero.mp4", poster: "/video/hero-poster.jpg" };

describe("Hero", () => {
  it("renders the headline", () => {
    render(<Hero video={video} title="Dall'idea alla consegna delle chiavi." />);
    expect(
      screen.getByRole("heading", { level: 1, name: /dall'idea alla consegna delle chiavi/i })
    ).toBeInTheDocument();
  });

  // L'apertura mostrava il video solo dopo l'idratazione e solo a certi
  // dispositivi, con sotto la fotografia di un altro progetto: la home
  // cambiava faccia. Il filmato dev'esserci sempre, dal primo render.
  it("opens on the film and on nothing else", () => {
    const { container } = render(<Hero video={video} title="Dall'idea alla consegna delle chiavi." />);
    const filmato = container.querySelector("video");
    expect(filmato).toHaveAttribute("src", "/video/hero.mp4");
    expect(filmato).toHaveAttribute("poster", "/video/hero-poster.jpg");
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  // Il contatto non sta piu' qui: e' il pulsante fisso del layout, cosi' resta
  // raggiungibile anche in fondo a una scheda progetto.
  it("leaves the call to action to the fixed button in the layout", () => {
    render(<Hero video={video} title="Dall'idea alla consegna delle chiavi." />);
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
        <Hero video={video} title="Dall'idea alla consegna delle chiavi." />
        <section>Il blocco dopo</section>
      </>,
    );

    await user.click(screen.getByRole("button", { name: /scendi/i }));
    expect(scrollIntoView).toHaveBeenCalled();
    expect(scrollBy).not.toHaveBeenCalled();
  });
});
