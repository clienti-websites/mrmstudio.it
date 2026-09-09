import { render, screen } from "@testing-library/react";
import { Hero } from "@/components/Hero";

describe("Hero", () => {
  it("renders the headline and a primary CTA link to /contatti", () => {
    render(
      <Hero
        image={{ src: "/progetti/via-fedra-3/01-vista-aerea.jpg", alt: "Vista aerea del progetto" }}
        title="Dall'idea alla consegna delle chiavi."
      />
    );
    expect(screen.getByRole("heading", { level: 1, name: /dall'idea alla consegna delle chiavi/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contattaci/i })).toHaveAttribute("href", "/contatti");
  });
});
