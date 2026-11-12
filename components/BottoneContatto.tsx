import Link from "next/link";
import Image from "next/image";
import { TEAM } from "@/lib/team";

// Il volto e' quello del primo socio fondatore, preso dall'elenco e non
// scritto qui: se in lib/team.ts cambia la foto, cambia anche il pulsante.
const VOLTO = TEAM.find((persona) => persona.founder) ?? TEAM[0];

/**
 * Il contatto sempre a portata, in basso a destra, come la bolla di una
 * chat. Prima stava solo sotto al titolo della home: chi scorreva fino in
 * fondo a una scheda progetto se lo lasciava alle spalle.
 *
 * La faccia e' quello che lo fa premere: dice che dall'altra parte c'e' una
 * persona e non un modulo. Resta muta per chi usa un lettore di schermo —
 * il nome del collegamento e' gia' "Contattaci", e una didascalia in piu'
 * qui direbbe solo la stessa cosa due volte.
 *
 * Punta alla pagina contatti e non alla sezione in home: da una scheda
 * progetto "#contatti" non porterebbe da nessuna parte.
 */
export function BottoneContatto() {
  return (
    <Link
      href="/contatti"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-muschio py-1.5 pl-1.5 pr-5 font-medium text-carta shadow-lg shadow-grafite/30 transition-colors hover:bg-muschio/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-grafite motion-reduce:transition-none print:hidden md:bottom-8 md:right-8"
    >
      <span className="relative block h-11 w-11 shrink-0 overflow-hidden rounded-full bg-carta/20">
        <Image src={VOLTO.photo} alt="" fill sizes="44px" className="object-cover" />
      </span>
      Contattaci
    </Link>
  );
}
