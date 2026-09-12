import { NextResponse, type NextRequest } from "next/server";

/**
 * Le pagine iniettate nel sito attuale non vanno rimandate da nessuna parte:
 * vanno dichiarate sparite. Un 410 dice al motore di ricerca che quella
 * pagina non tornerà, e la fa togliere dall'indice più in fretta di un 404,
 * che invece lascia aperta l'ipotesi di un errore temporaneo.
 *
 * Riguarda due forme di indirizzo, entrambe create dall'attacco: gli articoli
 * datati (/2026/02/09/...) e le categorie inventate (/category/...). Il
 * matcher qui sotto limita l'esecuzione a quelle due, così il resto del sito
 * non paga niente.
 */
const SPARITE = [/^\/\d{4}\/\d{2}\/\d{2}\//, /^\/category\//, /^\/author\//];

export function middleware(request: NextRequest) {
  const percorso = request.nextUrl.pathname;
  if (SPARITE.some((schema) => schema.test(percorso))) {
    return new NextResponse(null, { status: 410 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:anno(\\d{4})/:mese/:giorno/:resto*", "/category/:resto*", "/author/:resto*"],
};
