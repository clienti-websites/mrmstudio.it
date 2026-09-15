import { render, screen, within } from "@testing-library/react";
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
  team: [],
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
    await userEvent.click(screen.getByRole("radio", { name: "Residenziale" }));
    expect(screen.getByText("Progetto Residenziale")).toBeInTheDocument();
    expect(screen.queryByText("Progetto Commerciale")).not.toBeInTheDocument();
  });

  it("hides the filter bar entirely when only one category has projects", () => {
    render(<ProjectsWithFilter projects={[residenziale]} categories={["residenziale", "direzionale-e-commerciale"]} />);
    expect(screen.queryByRole("radiogroup", { name: /filtra per tipologia/i })).not.toBeInTheDocument();
  });

  it("si presenta come un gruppo di scelte, non come tasti indipendenti", () => {
    render(
      <ProjectsWithFilter
        projects={[residenziale, commerciale]}
        categories={["residenziale", "direzionale-e-commerciale"]}
      />,
    );

    const gruppo = screen.getByRole("radiogroup", { name: /filtra per tipologia/i });
    const scelte = within(gruppo).getAllByRole("radio");
    expect(scelte).toHaveLength(3);
    expect(scelte[0]).toBeChecked();
    // Solo la scelta attiva resta nel giro della tabulazione.
    expect(scelte.filter((s) => s.getAttribute("tabindex") === "0")).toHaveLength(1);
  });

  it("con la freccia destra si passa alla scelta successiva", async () => {
    render(
      <ProjectsWithFilter
        projects={[residenziale, commerciale]}
        categories={["residenziale", "direzionale-e-commerciale"]}
      />,
    );

    const scelte = screen.getAllByRole("radio");
    scelte[0].focus();
    await userEvent.keyboard("{ArrowRight}");

    expect(screen.getByRole("radio", { name: "Residenziale" })).toBeChecked();
    expect(screen.queryByText("Progetto Commerciale")).not.toBeInTheDocument();
  });
});
