"use client";

/**
 * Ultima rete: entra in gioco quando a rompersi è l'impianto della pagina,
 * quindi deve portarsi dietro il proprio <html> e non può contare né sul
 * foglio di stile del sito né sui componenti condivisi. Per questo i colori
 * e i recapiti sono scritti qui dentro invece che presi da lib/site.ts: se
 * il modulo che li contiene fosse la causa del guasto, importarlo
 * farebbe fallire anche questa pagina.
 */
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="it">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          background: "#f4f4f1",
          color: "#1c1e1b",
          fontFamily: "system-ui, -apple-system, Segoe UI, sans-serif",
          lineHeight: 1.6,
        }}
      >
        <main style={{ maxWidth: "42rem", margin: "0 auto", padding: "6rem 1.5rem" }}>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#6e6d65" }}>Errore</p>
          <h1 style={{ margin: "0.5rem 0 1rem", fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.02em" }}>
            Il sito non è raggiungibile in questo momento
          </h1>
          <p style={{ margin: "0 0 2rem", color: "#6e6d65" }}>
            Stiamo avendo un problema tecnico. Puoi riprovare fra poco, oppure contattarci direttamente.
          </p>

          <button
            type="button"
            onClick={reset}
            style={{
              background: "#2e4034",
              color: "#f4f4f1",
              border: 0,
              padding: "0.75rem 1.5rem",
              fontSize: "1rem",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Riprova
          </button>

          <p style={{ marginTop: "2.5rem", color: "#6e6d65" }}>
            Pescara{" "}
            <a href="tel:+390852059552" style={{ color: "#2e4034" }}>
              085 2059552
            </a>
            , Castel di Sangro{" "}
            <a href="tel:+390864845252" style={{ color: "#2e4034" }}>
              0864 845252
            </a>
            , oppure{" "}
            <a href="mailto:info@mrmstudio.it" style={{ color: "#2e4034" }}>
              info@mrmstudio.it
            </a>
            .
          </p>
        </main>
      </body>
    </html>
  );
}
