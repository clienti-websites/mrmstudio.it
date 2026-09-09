import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";

const image = { src: "/progetti/via-fedra-3/01-vista-aerea.jpg", alt: "Vista aerea del progetto" };

describe("Hero", () => {
  it("renders the headline and a primary CTA", () => {
    render(<Hero image={image} title="Dall'idea alla consegna delle chiavi." />);
    expect(
      screen.getByRole("heading", { level: 1, name: /dall'idea alla consegna delle chiavi/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contattaci/i })).toHaveAttribute("href", "/contatti");
  });

  it("can point its CTA at an on-page section instead of another route", () => {
    render(<Hero image={image} title="Dall'idea alla consegna delle chiavi." ctaHref="#contatti" />);
    expect(screen.getByRole("link", { name: /contattaci/i })).toHaveAttribute("href", "#contatti");
  });
});
