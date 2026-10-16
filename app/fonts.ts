import { Archivo, Poppins } from "next/font/google";

export const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

/**
 * Il carattere dei titoli è quello del marchio: la "studio" sotto la "mrm"
 * è un geometrico, e Archivo — che è un grottesco — accanto al logo stonava.
 *
 * Poppins su Google Fonts non è variabile, quindi ogni peso è un file a sé e
 * va chiesto a mano. Ne servono due: 700 per i titoli, 600 per le etichette
 * del percorso in home. Il corpo del testo resta Archivo, che a paragrafo
 * lungo e nella tabella dei lavori si legge meglio: Poppins ha lettere larghe
 * e tonde, allunga le righe e stanca.
 */
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
