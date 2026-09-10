export function StatsSection({
  stats,
  title,
  intro,
}: {
  stats: Array<{ label: string; value: string | null }>;
  title?: string;
  intro?: string;
}) {
  return (
    <section
      aria-labelledby={title ? "numeri-titolo" : undefined}
      aria-label={title ? undefined : "Numeri di MRM Studio"}
      className="border-y border-nebbia px-6 py-20 md:px-12"
    >
      {title && (
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <h2 id="numeri-titolo" className="text-2xl font-black text-grafite md:text-3xl">
            {title}
          </h2>
          {intro && <p className="mx-auto mt-3 text-center text-pietra">{intro}</p>}
        </div>
      )}
      {/* Le colonne seguono il numero di dati, così non resta una cella vuota
          quando se ne mostrano tre invece di quattro. Con tre il gruppo sta
          più stretto, altrimenti le celle si allontanano tanto da non
          leggersi più come un blocco unico. */}
      <div
        className={`mx-auto grid gap-10 text-center ${
          stats.length === 3 ? "max-w-3xl grid-cols-1 sm:grid-cols-3" : "max-w-6xl grid-cols-2 md:grid-cols-4"
        }`}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <p className="text-4xl font-black tabular-nums text-grafite md:text-5xl">
              {stat.value ?? <span className="text-xl font-medium text-pietra">Dato in arrivo</span>}
            </p>
            <p className="mt-2 max-w-[18ch] text-sm text-pietra">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
