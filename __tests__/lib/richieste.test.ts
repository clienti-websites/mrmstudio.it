/**
 * @jest-environment node
 */
import { mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { archivioConfigurato, dimenticaRichiesta, salvaRichiesta } from "@/lib/richieste";

const richiesta = {
  name: "Mario Rossi",
  contact: "mario@example.com",
  interventionType: "Ristrutturazione di un immobile",
  place: "Pescara",
  consent: true,
};

describe("copia di sicurezza delle richieste", () => {
  const ambienteOriginale = process.env;
  let radice: string;
  let cartella: string;

  beforeEach(async () => {
    radice = await mkdtemp(path.join(tmpdir(), "mrm-"));
    // Volutamente una sottocartella che non esiste: deve crearla.
    cartella = path.join(radice, "richieste");
    process.env = { ...ambienteOriginale, CONTACT_STORE_DIR: cartella };
  });

  afterEach(async () => {
    process.env = ambienteOriginale;
    await rm(radice, { recursive: true, force: true });
  });

  it("scrive un file con i dati della richiesta e il consenso", async () => {
    const percorso = await salvaRichiesta(richiesta);

    expect(percorso).toEqual(expect.any(String));
    const record = JSON.parse(await readFile(percorso!, "utf8"));
    expect(record).toMatchObject({
      consenso: true,
      nome: "Mario Rossi",
      contatto: "mario@example.com",
      tipoIntervento: "Ristrutturazione di un immobile",
      dove: "Pescara",
    });
    expect(record.ricevutaIl).toEqual(expect.any(String));
  });

  it("mette a null le voci non compilate invece di ometterle", async () => {
    const percorso = await salvaRichiesta(richiesta);

    const record = JSON.parse(await readFile(percorso!, "utf8"));
    expect(record.aChePunto).toBeNull();
    expect(record.messaggio).toBeNull();
    expect(record.scheda).toBeNull();
  });

  it("il nome del file comincia con la data, così l'elenco è in ordine", async () => {
    await salvaRichiesta(richiesta);

    const [nome] = await readdir(cartella);
    expect(nome).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(nome).toMatch(/\.json$/);
  });

  it("cancella la copia quando la consegna è riuscita", async () => {
    const percorso = await salvaRichiesta(richiesta);
    expect(await readdir(cartella)).toHaveLength(1);

    await dimenticaRichiesta(percorso!);

    // Nella cartella deve restare soltanto quello che non è arrivato.
    expect(await readdir(cartella)).toHaveLength(0);
  });

  it("cancellare due volte non solleva", async () => {
    const percorso = await salvaRichiesta(richiesta);
    await dimenticaRichiesta(percorso!);

    await expect(dimenticaRichiesta(percorso!)).resolves.toBeUndefined();
  });

  it("due richieste simultanee finiscono in due file distinti", async () => {
    const percorsi = await Promise.all(
      Array.from({ length: 8 }, (_, i) => salvaRichiesta({ ...richiesta, name: `Persona ${i}` })),
    );

    expect(new Set(percorsi).size).toBe(8);
    expect(await readdir(cartella)).toHaveLength(8);
  });

  it("restituisce null se la cartella non è configurata", async () => {
    delete process.env.CONTACT_STORE_DIR;

    expect(archivioConfigurato()).toBe(false);
    expect(await salvaRichiesta(richiesta)).toBeNull();
  });

  it("restituisce null invece di sollevare se la cartella non è scrivibile", async () => {
    // Un file al posto della cartella: crearla è impossibile, e la scrittura
    // deve fallire in silenzio senza far cadere la richiesta.
    const ostacolo = path.join(radice, "ostacolo");
    await writeFile(ostacolo, "non sono una cartella", "utf8");
    process.env.CONTACT_STORE_DIR = ostacolo;

    expect(await salvaRichiesta(richiesta)).toBeNull();
  });
});
