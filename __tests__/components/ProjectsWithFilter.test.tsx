import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProjectsWithFilter } from "@/components/ProjectsWithFilter";
import type { Project } from "@/lib/projects";

const residenziale: Project = {
  slug: "progetto-residenziale",
  title: "Progetto Residenziale",
  location: "Pescara",
  year: "2024",
  category: "residenziale",
  budget: null,
  phases: ["progettazione"],
  coverImage: { src: "/x.jpg", alt: "Vista del progetto residenziale" },
  gallery: [{ src: "/x.jpg", alt: "Vista del progetto residenziale" }],
  outcome: "Consegnato.",
  excerpt: "Un progetto residenziale.",
  content: "",
};

const commerciale: Project = {
  ...residenziale,
  slug: "progetto-commerciale",
  title: "Progetto Commerciale",
  category: "direzionale-e-commerciale",
  coverImage: { src: "/y.jpg", alt: "Vista del progetto commerciale" },
  gallery: [{ src: "/y.jpg", alt: "Vista del progetto commerciale" }],
};

describe("ProjectsWithFilter", () => {
  it("shows every project under 'Tutti' by default", () => {
    render(<ProjectsWithFilter projects={[residenziale, commerciale]} categories={["residenziale", "direzionale-e-commerciale"]} />);
    expect(screen.getByText("Progetto Residenziale")).toBeInTheDocument();
    expect(screen.getByText("Progetto Commerciale")).toBeInTheDocument();
  });

  it("filters to only the selected category", async () => {
    render(<ProjectsWithFilter projects={[residenziale, commerciale]} categories={["residenziale", "direzionale-e-commerciale"]} />);
    await userEvent.click(screen.getByRole("button", { name: "Residenziale" }));
    expect(screen.getByText("Progetto Residenziale")).toBeInTheDocument();
    expect(screen.queryByText("Progetto Commerciale")).not.toBeInTheDocument();
  });

  it("hides the filter bar entirely when only one category has projects", () => {
    render(<ProjectsWithFilter projects={[residenziale]} categories={["residenziale", "direzionale-e-commerciale"]} />);
    expect(screen.queryByRole("group", { name: /filtra per tipologia/i })).not.toBeInTheDocument();
  });
});
