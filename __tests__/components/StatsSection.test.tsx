import { render, screen } from "@testing-library/react";
import { StatsSection } from "@/components/StatsSection";

describe("StatsSection", () => {
  it("renders a real value when provided", () => {
    render(<StatsSection stats={[{ label: "Anni di attività", value: "30+" }]} />);
    expect(screen.getByText("30+")).toBeInTheDocument();
  });

  it("renders an explicit placeholder instead of inventing a number", () => {
    render(<StatsSection stats={[{ label: "Cantieri seguiti", value: null }]} />);
    expect(screen.getByText(/dato in arrivo/i)).toBeInTheDocument();
  });
});
