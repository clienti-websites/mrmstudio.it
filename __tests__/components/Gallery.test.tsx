import { render, screen } from "@testing-library/react";
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
});
