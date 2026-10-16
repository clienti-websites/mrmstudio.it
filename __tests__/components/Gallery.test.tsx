import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Gallery } from "@/components/Gallery";

const images = [
  { src: "/progetti/test/01.jpg", alt: "Prima immagine" },
  { src: "/progetti/test/02.jpg", alt: "Seconda immagine" },
];

describe("Gallery", () => {
  it("renders a thumbnail button per image with its alt text", () => {
    render(<Gallery images={images} />);
    expect(screen.getByRole("img", { name: "Prima immagine" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Seconda immagine" })).toBeInTheDocument();
  });

  it("opens the lightbox when a thumbnail is clicked", async () => {
    render(<Gallery images={images} />);
    await userEvent.click(screen.getAllByRole("button")[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  describe("with a side column", () => {
    const tre = [...images, { src: "/progetti/test/03.jpg", alt: "Terza immagine" }];

    it("puts the first image beside the text and the rest below, each shown once", () => {
      render(<Gallery images={tre} aside={<p>Scheda dell&apos;opera</p>} />);
      expect(screen.getByText("Scheda dell'opera")).toBeInTheDocument();
      expect(screen.getAllByRole("img")).toHaveLength(3);
      expect(screen.getAllByRole("button")).toHaveLength(3);
    });

    // La copertina esce dalla griglia ma non dall'elenco: se l'indice non
    // tenesse conto dello scarto, cliccare la seconda miniatura aprirebbe la
    // prima fotografia.
    it("opens the clicked photograph, not the one before it", async () => {
      render(<Gallery images={tre} aside={<p>Scheda</p>} />);
      const miniature = screen.getAllByRole("button", { name: /apri l'immagine/i });
      await userEvent.click(miniature[1]);
      const dialogo = screen.getByRole("dialog");
      expect(dialogo).toBeInTheDocument();
      expect(within(dialogo).getByRole("img", { name: "Seconda immagine" })).toBeInTheDocument();
    });
  });
});
