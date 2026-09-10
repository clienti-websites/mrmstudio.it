import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Informativa privacy",
  description:
    "Come MRM Studio tratta i dati personali raccolti tramite il sito, ai sensi del Regolamento UE 2016/679.",
};

/**
 * Informativa redatta sul funzionamento reale del sito: i dati elencati sono
 * esattamente quelli che il modulo raccoglie (vedi lib/validation.ts) e i
 * destinatari sono i servizi effettivamente usati, Vercel per l'hosting e
 * Resend per l'invio delle email (vedi lib/email.ts).
 *
 * Due punti restano da confermare a MRM prima della pubblicazione:
 * 1. il periodo di conservazione, qui descritto in termini di finalità
 *    invece che con un numero di mesi, che nessuno ha ancora deciso;
 * 2. l'eventuale presenza di un responsabile della protezione dei dati.
 * Il testo va comunque fatto verificare da un legale.
 */
const AGGIORNAMENTO = "settembre 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-12">
      <h1 className="text-3xl font-black text-grafite md:text-4xl">Informativa privacy</h1>
      <p className="mt-4 text-pietra">
        Questa informativa spiega come trattiamo i dati personali di chi visita questo sito e di chi ci
        scrive attraverso il modulo dei contatti, ai sensi del Regolamento UE 2016/679 (GDPR). Ultimo
        aggiornamento: {AGGIORNAMENTO}.
      </p>

      <section className="mt-12 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Chi tratta i tuoi dati</h2>
        <p className="mt-3 text-grafite">
          Il titolare del trattamento è {SITE.legalName}, con sedi in {SITE.offices[0].streetAddress},{" "}
          {SITE.offices[0].city}, e in {SITE.offices[1].streetAddress}, {SITE.offices[1].city}. Partita IVA{" "}
          {SITE.vatNumber}, REA {SITE.rea}.
        </p>
        <p className="mt-3 text-grafite">
          Per qualsiasi questione riguardante i tuoi dati puoi scrivere a{" "}
          <a href={`mailto:${SITE.email}`} className="text-muschio underline">
            {SITE.email}
          </a>{" "}
          o telefonare a una delle due sedi.
        </p>
      </section>

      <section className="mt-10 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Quali dati raccogliamo</h2>
        <p className="mt-3 text-grafite">
          Se compili il modulo dei contatti ci arrivano il tuo nome, il recapito che ci lasci (telefono o
          email) e il tipo di intervento che hai scelto. Sono facoltativi il punto a cui si trova il lavoro,
          il comune o la zona, e il messaggio libero. Se scrivi dalla scheda di un progetto, la richiesta
          riporta anche quale progetto stavi guardando, e puoi togliere questo riferimento prima di inviarla.
        </p>
        <p className="mt-3 text-grafite">
          Il tuo indirizzo IP viene usato per pochi istanti al momento dell&apos;invio, per limitare le
          richieste automatiche ravvicinate. Non viene salvato in un archivio. Il fornitore che ospita il
          sito registra inoltre gli accessi nei propri log tecnici, come avviene per qualunque sito.
        </p>
        <p className="mt-3 text-grafite">
          Il sito non usa cookie di profilazione, non impiega strumenti di statistica o di tracciamento e non
          ti profila in alcun modo.
        </p>
      </section>

      <section className="mt-10 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Perché li trattiamo</h2>
        <p className="mt-3 text-grafite">
          Usiamo questi dati solo per leggere la tua richiesta e risponderti. La base giuridica è il consenso
          che presti spuntando la casella nel modulo, ai sensi dell&apos;articolo 6, paragrafo 1, lettera a)
          del Regolamento. La casella non è mai già spuntata e senza il tuo consenso il modulo non può essere
          inviato. Puoi revocare il consenso in qualsiasi momento scrivendoci, senza che questo pregiudichi
          la liceità del trattamento svolto prima della revoca.
        </p>
      </section>

      <section className="mt-10 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Per quanto tempo li conserviamo</h2>
        <p className="mt-3 text-grafite">
          Conserviamo la tua richiesta per il tempo necessario a darti riscontro. Se dalla richiesta nasce un
          incarico professionale, i dati vengono conservati per la durata del rapporto e per i termini
          previsti dalla legge in materia contabile, fiscale e di responsabilità professionale. Se invece non
          se ne fa nulla, la richiesta viene eliminata quando non serve più.
        </p>
      </section>

      <section className="mt-10 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Chi altro vede i tuoi dati</h2>
        <p className="mt-3 text-grafite">
          I dati sono trattati dai professionisti e dai collaboratori dello studio autorizzati a farlo. Per
          far funzionare il sito ci appoggiamo inoltre a due fornitori, che agiscono come responsabili del
          trattamento: Vercel Inc., che ospita il sito, e Resend, che consegna alla nostra casella le email
          generate dal modulo.
        </p>
        <p className="mt-3 text-grafite">
          Entrambi hanno sede negli Stati Uniti, quindi i dati possono essere trattati fuori dall&apos;Unione
          Europea. Il trasferimento avviene sulla base delle clausole contrattuali standard approvate dalla
          Commissione Europea. Non vendiamo né cediamo i tuoi dati a nessun altro, e non li usiamo per
          finalità commerciali diverse dalla risposta alla tua richiesta.
        </p>
      </section>

      <section className="mt-10 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Che diritti hai</h2>
        <p className="mt-3 text-grafite">
          Puoi chiederci in qualsiasi momento di sapere quali dati abbiamo su di te, di correggerli, di
          cancellarli, di limitarne il trattamento, di ricevere in formato leggibile quelli che ci hai
          fornito, e di opporti al trattamento. Sono i diritti previsti dagli articoli da 15 a 22 del
          Regolamento. Per esercitarli basta scrivere a{" "}
          <a href={`mailto:${SITE.email}`} className="text-muschio underline">
            {SITE.email}
          </a>
          .
        </p>
        <p className="mt-3 text-grafite">
          Se ritieni che i tuoi dati siano trattati in modo scorretto puoi rivolgerti al Garante per la
          protezione dei dati personali, all&apos;indirizzo{" "}
          <a href="https://www.garanteprivacy.it" className="text-muschio underline">
            garanteprivacy.it
          </a>
          .
        </p>
      </section>

      <section className="mt-10 border-t border-nebbia pt-10">
        <h2 className="text-xl font-black text-grafite">Decisioni automatiche</h2>
        <p className="mt-3 text-grafite">
          Non prendiamo decisioni sul tuo conto in modo automatizzato e non facciamo profilazione. Le
          richieste che arrivano dal modulo le legge una persona.
        </p>
      </section>

      <p className="mt-12 border-t border-nebbia pt-10 text-pietra">
        Torna alla <Link href="/" className="text-muschio underline">home</Link> o vai ai{" "}
        <Link href="/#contatti" className="text-muschio underline">contatti</Link>.
      </p>
    </div>
  );
}
