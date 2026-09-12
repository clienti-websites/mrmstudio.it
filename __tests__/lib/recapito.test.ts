import { isPlausibleContact, isPlausibleName } from "@/lib/validation";

/**
 * I casi accettati contano più di quelli rifiutati: un recapito valido
 * respinto è una richiesta persa, e chi scrive non riprova. Qui sotto ci sono
 * i modi in cui la gente scrive davvero un numero, spazi e punti compresi.
 */
describe("isPlausibleContact", () => {
  it.each([
    ["085 2059552", "fisso con prefisso e spazio"],
    ["0864845252", "fisso tutto attaccato"],
    ["328 4006099", "cellulare con spazio"],
    ["328 400 6099", "cellulare a gruppi"],
    ["+39 328 4006099", "cellulare con prefisso internazionale"],
    ["+393284006099", "prefisso internazionale attaccato"],
    ["328.400.6099", "scritto con i punti"],
    ["328-400-6099", "scritto con i trattini"],
    ["(+39) 328 4006099", "prefisso fra parentesi"],
    ["0049 30 12345678", "numero estero scritto con lo zero"],
    ["mario@rossi.it", "email semplice"],
    ["mario.rossi@studio-tecnico.co.uk", "email con punti e dominio di secondo livello"],
    ["m.rossi+cantiere@gmail.com", "email con il più"],
  ])("accetta %s (%s)", (valore) => {
    expect(isPlausibleContact(valore)).toBe(true);
  });

  it.each([
    ["ciao", "una parola qualunque"],
    ["34828688", "otto cifre, non chiamabile"],
    ["123456789", "nove cifre ma non comincia per zero, tre o più"],
    ["1234567890123456", "sedici cifre, oltre il massimo internazionale"],
    ["mario@rossi", "email senza estensione"],
    ["mario@rossi.i", "estensione di una lettera"],
    ["@rossi.it", "email senza nulla prima della chiocciola"],
    ["mario rossi@studio.it", "email con uno spazio dentro"],
    ["", "vuoto"],
    ["328", "troppo corto"],
    ["non lo so", "una frase"],
  ])("rifiuta %s (%s)", (valore) => {
    expect(isPlausibleContact(valore)).toBe(false);
  });
});

describe("isPlausibleName", () => {
  it.each([["Mario"], ["Di Menna"], ["Jo"], ["Maria Laura Di Franco"], ["Müller"]])(
    "accetta %s",
    (valore) => {
      expect(isPlausibleName(valore)).toBe(true);
    },
  );

  it.each([["M"], [""], ["   "], ["123"], ["..."], ["---"]])("rifiuta %s", (valore) => {
    expect(isPlausibleName(valore)).toBe(false);
  });
});
