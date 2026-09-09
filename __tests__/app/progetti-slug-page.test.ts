jest.mock("@/lib/projects", () => ({
  getProjectBySlug: jest.fn(),
  getProjectSlugs: jest.fn(() => []),
}));

// next-mdx-remote/rsc is ESM-only and not covered by this project's Jest
// transform config; stub it out so importing the page module under test
// doesn't require touching shared Jest/Next config just for this test.
jest.mock("next-mdx-remote/rsc", () => ({
  MDXRemote: () => null,
}));

import { getProjectBySlug } from "@/lib/projects";
import ProgettoPage, { generateMetadata } from "@/app/progetti/[slug]/page";

const mockedGetProjectBySlug = getProjectBySlug as jest.Mock;

function enoent(): never {
  const error = new Error("ENOENT: no such file or directory") as NodeJS.ErrnoException;
  error.code = "ENOENT";
  throw error;
}

describe("/progetti/[slug] page — error handling", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("still 404s for a slug that genuinely doesn't exist (ENOENT)", async () => {
    mockedGetProjectBySlug.mockImplementation(enoent);

    await expect(ProgettoPage({ params: Promise.resolve({ slug: "does-not-exist" }) })).rejects.toThrow(/404/);
  });

  it("returns empty metadata (not a throw) for a genuinely unknown slug", async () => {
    mockedGetProjectBySlug.mockImplementation(enoent);

    await expect(
      generateMetadata({ params: Promise.resolve({ slug: "does-not-exist" }) })
    ).resolves.toEqual({});
  });

  it("does NOT mask a real content bug (e.g. malformed frontmatter) as a 404", async () => {
    const parseError = new Error("Invalid frontmatter: missing required field 'category'");
    mockedGetProjectBySlug.mockImplementation(() => {
      throw parseError;
    });

    await expect(ProgettoPage({ params: Promise.resolve({ slug: "broken-project" }) })).rejects.toBe(parseError);
  });

  it("propagates a real content bug from generateMetadata too", async () => {
    const parseError = new Error("Invalid frontmatter: missing required field 'category'");
    mockedGetProjectBySlug.mockImplementation(() => {
      throw parseError;
    });

    await expect(generateMetadata({ params: Promise.resolve({ slug: "broken-project" }) })).rejects.toBe(parseError);
  });
});
