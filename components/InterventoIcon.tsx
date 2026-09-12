import type { InterventionType } from "@/lib/validation";

/**
 * Icone per le sei risposte alla domanda "di cosa si tratta".
 *
 * Stesso tratto, stessa griglia 24x24 e stesso spessore delle icone delle
 * quattro fasi (components/FaseIcon.tsx): sono l'unico repertorio grafico del
 * sito e non ne serve un secondo. Nessuna libreria.
 *
 * Servono a far riconoscere l'opzione prima di leggerla, non a sostituire il
 * testo: l'etichetta scritta resta sempre accanto.
 */
const PATHS: Record<InterventionType, React.ReactNode> = {
  "Ristrutturazione di un immobile": (
    <>
      <path d="M2.8 11 12 4l9.2 7" />
      <path d="M5.4 10V20h13.2V10" />
      {/* La parete tratteggiata è quella che si sposta. */}
      <path d="M12 20v-7.5" strokeDasharray="2.2 2.2" />
    </>
  ),
  "Nuova costruzione": (
    <>
      <path d="M3 20h18" />
      <path d="M7 20V4.5" />
      <path d="M4 4.5h13" />
      <path d="M5.6 7.6h2.8" />
      <path d="M14 4.5v4.2" />
      <path d="M12.7 8.7h2.6" />
    </>
  ),
  "Demolizione e ricostruzione": (
    <>
      {/* Palla da demolizione e muro: la frattura da sola sembrava un
          simbolo elettrico. */}
      <path d="M3 20h18" />
      <path d="M13.5 20V8h6v12" />
      <path d="M7 11.4V4.5h9" />
      <circle cx="7" cy="14.4" r="3" />
    </>
  ),
  "Cambio di destinazione d'uso": (
    <>
      {/* Una casa piccola dentro una freccia circolare: due frecce affiancate
          a questa misura diventavano un ghirigoro. */}
      <path d="M8.6 15.2v-3.1L12 9.4l3.4 2.7v3.1z" />
      <path d="M20 12a8 8 0 0 0-13.7-5.6" />
      <path d="M4 12a8 8 0 0 0 13.7 5.6" />
      <path d="M6.3 3.2v3.4h3.4" />
      <path d="M17.7 20.8v-3.4h-3.4" />
    </>
  ),
  "Recupero o riqualificazione": (
    <>
      {/* Edificio con il ponteggio accanto. L'arco con la traversa sembrava
          una grata. */}
      <path d="M3 20h18" />
      <path d="M4.5 20V8.5a3.5 3.5 0 0 1 7 0V20" />
      <path d="M14.5 20V5.5" />
      <path d="M19 20V5.5" />
      <path d="M13.6 5.5h6.3" />
      <path d="M14.5 10.3h4.5" />
      <path d="M14.5 15.1h4.5" />
    </>
  ),
  "Non lo so ancora": (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.7 9.7a2.4 2.4 0 0 1 4.7.6c0 1.6-2.3 1.9-2.3 3.3" />
      <path d="M12 17.1h.01" />
    </>
  ),
};

export function InterventoIcon({
  type,
  className,
}: {
  type: InterventionType;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {PATHS[type]}
    </svg>
  );
}
