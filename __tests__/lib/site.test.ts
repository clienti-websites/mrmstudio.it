import { SITE } from "@/lib/site";

describe("SITE", () => {
  it("has exactly two offices, Pescara and Castel di Sangro", () => {
    expect(SITE.offices).toHaveLength(2);
    expect(SITE.offices.map((o) => o.id)).toEqual(["pescara", "castel-di-sangro"]);
  });

  it("has no fax field on any office", () => {
    for (const office of SITE.offices) {
      expect(office).not.toHaveProperty("fax");
    }
  });
});
