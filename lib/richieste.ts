import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Rete di sicurezza per le richieste del modulo.
 *
 * La richiesta viene scritta su disco PRIMA di tentare l'invio, perché se la
 * consegna fallisce a metà, o il processo muore, quello che non è stato
 * scritto è perso e nessuno saprà mai che qualcuno aveva scritto.
 *
 * Se l'invio riesce, il file viene cancellato: la richiesta è già nella
 * casella dello studio, tenerne una seconda copia significherebbe conservare
 * dati personali senza uno scopo e riempire la cartella di roba che nessuno
 * guarderà. Nella cartella resta quindi soltanto quello che non è arrivato,
 * che è esattamente la lista da controllare.
 *
 * Un file per richiesta invece di un unico registro: due invii simultanei
 * scrivono file diversi e non possono pestarsi i piedi, e cancellarne uno
 * non tocca gli altri. Il nome comincia con la data, così l'elenco della
 * cartella è già in ordine cronologico.
 */
export interface DatiRichiesta {
  name: string;
  contact: string;
  interventionType: string;
  stage?: string;
  place?: string;
  message?: string;
  reference?: string;
  consent: boolean;
}

function cartellaArchivio(): string | null {
  const configurata = process.env.CONTACT_STORE_DIR?.trim();
  return configurata ? configurata : null;
}

function nomeFile(id: string): string {
  const quando = new Date().toISOString().replace(/[:.]/g, "-");
  return `${quando}-${id.slice(0, 8)}.json`;
}

/**
 * Scrive la richiesta e restituisce il percorso del file, oppure `null` se
 * la cartella non è configurata o non è scrivibile. Chi chiama deve trattare
 * `null` come "non è rimasta traccia".
 *
 * Restituisce il percorso invece dell'identificativo per non tenere uno
 * stato condiviso in memoria: chi ha scritto sa già cosa cancellare.
 */
export async function salvaRichiesta(dati: DatiRichiesta): Promise<string | null> {
  const cartella = cartellaArchivio();
  if (!cartella) return null;

  const id = randomUUID();
  const percorso = path.join(cartella, nomeFile(id));

  const record = {
    id,
    ricevutaIl: new Date().toISOString(),
    // Il consenso si conserva insieme ai dati: senza, non c'è modo di
    // dimostrare su quale base sono stati trattati.
    consenso: dati.consent,
    nome: dati.name,
    contatto: dati.contact,
    tipoIntervento: dati.interventionType,
    aChePunto: dati.stage ?? null,
    dove: dati.place ?? null,
    messaggio: dati.message ?? null,
    scheda: dati.reference ?? null,
  };

  try {
    await mkdir(cartella, { recursive: true });
    await writeFile(percorso, `${JSON.stringify(record, null, 2)}\n`, "utf8");
    return percorso;
  } catch {
    return null;
  }
}

/**
 * Chiamata quando la consegna è riuscita: la copia di sicurezza non serve
 * più e va tolta, perché la richiesta è già nella casella dello studio.
 */
export async function dimenticaRichiesta(percorso: string): Promise<void> {
  try {
    await unlink(percorso);
  } catch {
    // Se il file non c'è più va bene comunque: l'obiettivo era che non
    // restasse, e non deve far cadere la risposta a chi ha scritto.
  }
}

/** Serve alla route per sapere se può dire "ricevuta" in buona fede. */
export function archivioConfigurato(): boolean {
  return cartellaArchivio() !== null;
}
