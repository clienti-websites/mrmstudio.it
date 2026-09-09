export function StatsSection({ stats }: { stats: Array<{ label: string; value: string | null }> }) {
  return (
    <section aria-label="Numeri di MRM Studio" className="border-y border-nebbia px-6 py-16 md:px-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <p className="text-4xl font-black tabular-nums text-grafite md:text-5xl">
              {stat.value ?? <span className="text-xl font-medium text-pietra">Dato in arrivo</span>}
            </p>
            <p className="mt-2 text-sm text-pietra">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
