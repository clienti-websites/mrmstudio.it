import { render, screen } from "@testing-library/react";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => 0,
    useReducedMotion: () => true,
  };
});

describe("PercorsoCompleto", () => {
  it("renders the four phases in order with their descriptions", () => {
    render(<PercorsoCompleto />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(["Progettazione", "Appalto", "Direzione lavori", "Maestranze"]);
  });

  it("renders the closing statement", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByText(/chiami una persona sola/i)).toBeInTheDocument();
  });
});
