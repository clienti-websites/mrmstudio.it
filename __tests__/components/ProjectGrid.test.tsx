import { render, screen } from "@testing-library/react";
import { ProjectGrid } from "@/components/ProjectGrid";
import type { Project } from "@/lib/projects";

const project: Project = {
  slug: "test-project",
  title: "Progetto Test",
  location: "Pescara",
  year: "2024",
  category: "residenziale",
  budget: null,
  team: [],
  phases: ["progettazione"],
  coverImage: { src: "/progetti/test/cover.jpg", alt: "Vista del progetto test" },
  gallery: [{ src: "/progetti/test/cover.jpg", alt: "Vista del progetto test" }],
  outcome: "Consegnato.",
  excerpt: "Un progetto di prova.",
  content: "",
};

describe("ProjectGrid", () => {
  it("renders one card per project with name and location", () => {
    render(<ProjectGrid projects={[project]} />);
    expect(screen.getByText("Progetto Test")).toBeInTheDocument();
    expect(screen.getByText("Pescara")).toBeInTheDocument();
  });

  it("does not break with a single project (no fixed multi-cell layout assumption)", () => {
    render(<ProjectGrid projects={[project]} />);
    expect(screen.getAllByRole("link")).toHaveLength(1);
  });
});
