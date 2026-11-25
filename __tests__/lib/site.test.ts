import { SITE, whatsappUrl } from "@/lib/site";

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

  // wa.me rifiuta il numero se arriva col piu' o con gli spazi, e scrivere
  // a un numero sbagliato non da' errore: apre una chat con nessuno.
  it("builds a WhatsApp address from the mobile already published", () => {
    expect(whatsappUrl(SITE.offices[0])).toMatch(/^https:\/\/wa\.me\/393284006099\?text=/);
    expect(whatsappUrl(SITE.offices[1])).toMatch(/^https:\/\/wa\.me\/393898769606\?text=/);
    for (const office of SITE.offices) {
      const numero = new URL(whatsappUrl(office)).pathname.slice(1);
      expect(numero).toBe(office.mobile.replace("+", ""));
      expect(numero).toMatch(/^39\d{9,10}$/);
    }
  });
});
