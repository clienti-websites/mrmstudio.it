import Link from "next/link";

const FASI = [
  {
    id: "progettazione",
    label: "Progettazione",
    consueto: "Affidata a più studi separati, ognuno sulla propria disciplina.",
    mrm: "Interamente interna: architettonica, strutturale, energetica, impiantistica, rendering.",
  },
  {
    id: "appalto",
    label: "Appalto",
    consueto: "Parte contrattuale e amministrativa a carico del committente.",
    mrm: "Gestita dallo studio per conto del committente.",
  },
  {
    id: "direzione-lavori",
    label: "Direzione lavori",
    consueto: "Affidata a un professionista esterno al progetto.",
    mrm: "Seguita dallo studio: esecuzione, contabilità, sicurezza, collaudo, agibilità.",
  },
  {
    id: "maestranze",
    label: "Maestranze",
    consueto: "Imprese, impiantisti e fornitori li cerca e coordina il committente.",
    mrm: "Selezionate e coordinate dallo studio.",
  },
] as const;

export function PercorsoCompleto() {
  return (
    <section aria-labelledby="percorso-titolo" className="px-6 py-24 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h2 id="percorso-titolo" className="max-w-3xl text-3xl font-black tracking-tight text-grafite md:text-4xl">
          Un solo studio segue l&apos;opera dall&apos;idea alla consegna delle chiavi.
        </h2>
        <p className="mt-4 max-w-2xl text-pietra">
          Le quattro fasi di un intervento edilizio, e chi se ne occupa.
        </p>

        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[42rem] border-collapse text-left">
            <caption className="sr-only">
              Confronto tra la gestione consueta delle quattro fasi e la gestione seguita da MRM Studio
            </caption>
            <thead>
              <tr className="border-b border-grafite">
                <th scope="col" className="py-3 pr-6 text-sm font-medium text-grafite">
                  Fase
                </th>
                <th scope="col" className="py-3 pr-6 text-sm font-medium text-pietra">
                  Gestione consueta
                </th>
                <th scope="col" className="py-3 text-sm font-medium text-grafite">
                  Con MRM Studio
                </th>
              </tr>
            </thead>
            <tbody>
              {FASI.map((fase) => (
                <tr key={fase.id} className="border-b border-nebbia align-top">
                  <th scope="row" className="py-5 pr-6 font-medium text-grafite">
                    <Link href={`/servizi#${fase.id}`} className="hover:text-muschio hover:underline">
                      {fase.label}
                    </Link>
                  </th>
                  <td className="py-5 pr-6 text-sm text-pietra">{fase.consueto}</td>
                  <td className="py-5 text-sm text-grafite">{fase.mrm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-12 max-w-2xl text-lg text-grafite">
          Il committente ha un solo interlocutore per tutte e quattro le fasi, dalla prima ipotesi alla consegna
          delle chiavi.
        </p>
      </div>
    </section>
  );
}
