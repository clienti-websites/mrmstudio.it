import { render, screen } from "@testing-library/react";
import { PercorsoCompleto } from "@/components/PercorsoCompleto";

const mockUseReducedMotion = jest.fn();
const mockUseTransform = jest.fn();

jest.mock("framer-motion", () => {
  const actual = jest.requireActual("framer-motion");
  return {
    ...actual,
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: (...args: unknown[]) => mockUseTransform(...args),
    useReducedMotion: () => mockUseReducedMotion(),
  };
});

describe("PercorsoCompleto", () => {
  beforeEach(() => {
    mockUseReducedMotion.mockReturnValue(true);
    mockUseTransform.mockReturnValue(0);
  });

  it("renders the four phases in order with their descriptions", () => {
    render(<PercorsoCompleto />);
    const headings = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(headings).toEqual(["Progettazione", "Appalto", "Direzione lavori", "Maestranze"]);
  });

  it("renders the closing statement", () => {
    render(<PercorsoCompleto />);
    expect(screen.getByText(/chiami una persona sola/i)).toBeInTheDocument();
  });

  it("draws the line fully when the user prefers reduced motion", () => {
    mockUseReducedMotion.mockReturnValue(true);
    mockUseTransform.mockReturnValue(0.3); // should be ignored in favor of the hardcoded 1
    render(<PercorsoCompleto />);
    const line = screen.getByTestId("percorso-line");
    expect(line.style.pathLength).toBe("1px");
  });

  it("drives the line from scroll progress when motion is not reduced", () => {
    mockUseReducedMotion.mockReturnValue(false);
    mockUseTransform.mockReturnValue(0.5);
    render(<PercorsoCompleto />);
    const line = screen.getByTestId("percorso-line");
    expect(line.style.pathLength).toBe("0.5px");
    expect(line.style.pathLength).not.toBe("1px");
  });
});
