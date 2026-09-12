import type { Metadata } from "next";
import { archivo } from "./fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "MRM Studio — Architettura e Ingegneria a Pescara e Abruzzo",
    template: "%s | MRM Studio",
  },
  description:
    "Progettazione, appalto, direzione lavori e coordinamento delle imprese. MRM Studio segue l'opera dall'idea alla consegna delle chiavi, a Pescara e in Abruzzo.",
  openGraph: {
    type: "website",
    locale: "it_IT",
    siteName: SITE.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={archivo.variable}>
      <body>
        <a href="#contenuto" className="skip-link">
          Vai al contenuto
        </a>
        <Header />
        <main id="contenuto" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
