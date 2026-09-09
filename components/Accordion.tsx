export function Accordion({ summary, children }: { summary: string; children: React.ReactNode }) {
  return (
    <details className="border-t border-nebbia py-4">
      <summary className="cursor-pointer font-medium text-grafite">{summary}</summary>
      <div className="mt-3 text-pietra">{children}</div>
    </details>
  );
}
