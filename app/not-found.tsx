import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-6 py-24 md:px-12">
      <p className="mb-2 text-sm font-medium text-pietra">Errore 404</p>
      <h1 className="mb-4 text-3xl font-black text-grafite md:text-4xl">Pagina non trovata</h1>
      <p className="mb-8 text-pietra">
        La pagina che cerchi non esiste o è stata spostata. Prova a ripartire da uno di questi punti.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link href="/progetti" className="inline-block bg-muschio px-6 py-3 font-medium text-carta hover:bg-muschio/90">
          Vai ai progetti
        </Link>
        <Link
          href="/contatti"
          className="inline-block border border-grafite px-6 py-3 font-medium text-grafite hover:bg-nebbia"
        >
          Contattaci
        </Link>
      </div>
    </div>
  );
}
