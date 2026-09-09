import { getAllProjects, getProjectBySlug, getProjectSlugs, frontmatterSchema } from "@/lib/projects";

describe("frontmatterSchema", () => {
  it("rejects a project missing required fields", () => {
    const result = frontmatterSchema.safeParse({ title: "Test" });
    expect(result.success).toBe(false);
  });

  it("accepts a fully valid project", () => {
    const result = frontmatterSchema.safeParse({
      title: "Test",
      location: "Pescara",
      year: "2020",
      category: "residenziale",
      budget: null,
      phases: ["progettazione"],
      coverImage: { src: "/x.jpg", alt: "Descrizione" },
      gallery: [{ src: "/x.jpg", alt: "Descrizione" }],
      outcome: "Consegnato.",
      excerpt: "Un progetto di test.",
    });
    expect(result.success).toBe(true);
  });
});

describe("getProjectSlugs", () => {
  it("includes the via-fedra-3 seed project", () => {
    expect(getProjectSlugs()).toContain("via-fedra-3");
  });
});

describe("getProjectBySlug", () => {
  it("loads via-fedra-3 with the facts from the brief", () => {
    const project = getProjectBySlug("via-fedra-3");
    expect(project.title).toBe("Via Fedra 3");
    expect(project.location).toBe("Via Fedra 3, Pescara");
    expect(project.year).toBe("2013–2016");
    expect(project.budget).toBe("€ 750.000 circa");
    expect(project.phases).toEqual(["progettazione", "direzione-lavori"]);
    expect(project.gallery).toHaveLength(7);
    expect(project.gallery[0].alt.length).toBeGreaterThan(10);
  });
});

describe("getAllProjects", () => {
  it("returns at least the seed project", () => {
    const projects = getAllProjects();
    expect(projects.length).toBeGreaterThan(0);
    expect(projects.map((p) => p.slug)).toContain("via-fedra-3");
  });
});
