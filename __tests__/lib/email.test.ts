import { sendContactEmail, contactFailureMessage } from "@/lib/email";
import { SITE } from "@/lib/site";
import nodemailer from "nodemailer";

jest.mock("nodemailer");

const inviaMock = jest.fn();
const chiudiMock = jest.fn();
const creaTransport = nodemailer.createTransport as unknown as jest.Mock;

const richiesta = {
  name: "Mario Rossi",
  contact: "mario@example.com",
  interventionType: "Ristrutturazione",
  message: "Vorrei una consulenza per ristrutturare casa.",
};

const CONFIGURAZIONE_COMPLETA = {
  SMTP_HOST: "smtps.aruba.it",
  SMTP_PORT: "465",
  SMTP_USER: "studio@mrmstudio.it",
  SMTP_PASS: "segreta",
  CONTACT_TO_EMAIL: "studio@mrmstudio.it",
  CONTACT_FROM_EMAIL: "no-reply@mrmstudio.it",
};

describe("sendContactEmail", () => {
  const ambienteOriginale = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...ambienteOriginale, ...CONFIGURAZIONE_COMPLETA };
    inviaMock.mockResolvedValue({ accepted: ["studio@mrmstudio.it"] });
    creaTransport.mockReturnValue({ sendMail: inviaMock, close: chiudiMock });
  });

  afterAll(() => {
    process.env = ambienteOriginale;
  });

  it.each(["SMTP_HOST", "SMTP_USER", "SMTP_PASS", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL"])(
    "non tenta nemmeno la connessione se manca %s",
    async (variabile) => {
      delete process.env[variabile];

      const esito = await sendContactEmail(richiesta);

      expect(esito).toBe(false);
      expect(creaTransport).not.toHaveBeenCalled();
    },
  );

  it("si connette in modo cifrato sulla 465 e non riusa le connessioni", async () => {
    await sendContactEmail(richiesta);

    expect(creaTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtps.aruba.it",
        port: 465,
        secure: true,
        pool: false,
        auth: { user: "studio@mrmstudio.it", pass: "segreta" },
      }),
    );
  });

  it("sulla 587 negozia la cifratura dopo il saluto invece di pretenderla subito", async () => {
    process.env.SMTP_PORT = "587";

    await sendContactEmail(richiesta);

    expect(creaTransport).toHaveBeenCalledWith(
      expect.objectContaining({ port: 587, secure: false, requireTLS: true }),
    );
  });

  it("dichiara tempi di attesa sotto il tetto della funzione", async () => {
    await sendContactEmail(richiesta);

    const opzioni = creaTransport.mock.calls[0][0];
    for (const chiave of ["connectionTimeout", "greetingTimeout", "socketTimeout"]) {
      expect(opzioni[chiave]).toBeGreaterThan(0);
      expect(opzioni[chiave]).toBeLessThanOrEqual(9000);
    }
  });

  it("spedisce dalla casella dello studio e risponde al visitatore", async () => {
    await sendContactEmail(richiesta);

    const messaggio = inviaMock.mock.calls[0][0];
    // Mettere l'indirizzo del visitatore come mittente farebbe fallire i
    // controlli del dominio: deve stare in "Rispondi a".
    expect(messaggio.from).toContain("no-reply@mrmstudio.it");
    expect(messaggio.from).not.toContain("mario@example.com");
    expect(messaggio.replyTo).toBe("mario@example.com");
    expect(messaggio.to).toBe("studio@mrmstudio.it");
  });

  it("non mette un numero di telefono in Rispondi a", async () => {
    await sendContactEmail({ ...richiesta, contact: "328 4006099" });

    expect(inviaMock.mock.calls[0][0].replyTo).toBeUndefined();
  });

  it("riporta nell'oggetto il tipo di intervento e l'opera di provenienza", async () => {
    await sendContactEmail({ ...richiesta, reference: "Harmonia" });

    expect(inviaMock.mock.calls[0][0].subject).toBe(
      "Nuova richiesta dal sito — Ristrutturazione (da Harmonia)",
    );
  });

  it("omette le voci non compilate invece di lasciarle vuote", async () => {
    await sendContactEmail({ ...richiesta, place: "Pescara" });

    const testo = inviaMock.mock.calls[0][0].text;
    expect(testo).toContain("Dove: Pescara");
    expect(testo).not.toContain("A che punto è:");
  });

  it("restituisce false se il server di posta rifiuta o non risponde", async () => {
    inviaMock.mockRejectedValue(new Error("connessione scaduta"));

    expect(await sendContactEmail(richiesta)).toBe(false);
  });

  it("chiude la connessione anche quando l'invio fallisce", async () => {
    inviaMock.mockRejectedValue(new Error("connessione scaduta"));

    await sendContactEmail(richiesta);

    expect(chiudiMock).toHaveBeenCalled();
  });
});

describe("contactFailureMessage", () => {
  it("porta i numeri di entrambe le sedi e l'email, così la richiesta non si perde", () => {
    const messaggio = contactFailureMessage();

    expect(messaggio).toContain(SITE.offices[0].phoneDisplay);
    expect(messaggio).toContain(SITE.offices[1].phoneDisplay);
    expect(messaggio).toContain(SITE.email);
  });
});
