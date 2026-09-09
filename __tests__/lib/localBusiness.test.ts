import { buildLocalBusinessJsonLd } from "@/lib/localBusiness";
import { SITE } from "@/lib/site";

describe("buildLocalBusinessJsonLd", () => {
  it("builds distinct structured data for each office", () => {
    const [pescara, castelDiSangro] = SITE.offices.map(buildLocalBusinessJsonLd);
    expect(pescara.name).toBe("MRM Studio — Pescara");
    expect(pescara.telephone).toBe("+390852059552");
    expect(castelDiSangro.name).toBe("MRM Studio — Castel di Sangro");
    expect(castelDiSangro.address.streetAddress).toBe("Piazza Teofilo Patini 1");
  });
});
