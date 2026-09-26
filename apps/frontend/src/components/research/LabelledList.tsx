interface LabelledListProps {
  title: string;
  rows: Array<{ label: string; detail?: string; body: string }>;
}

/** Skills and expertise in the same two-column rhythm: label left, detail right. */
export default function LabelledList({ title, rows }: LabelledListProps) {
  if (rows.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-6">
      <h2 className="mb-6 border-b border-foreground/10 pb-2 text-sm font-extrabold uppercase tracking-[0.2em] text-foreground md:text-right">
        {title}
      </h2>
      <dl className="flex flex-col gap-6">
        {rows.map((row) => (
          <div key={row.label} className="grid gap-1 md:grid-cols-12 md:gap-6">
            <dt className="md:col-span-4 md:text-right">
              <span className="font-bold text-foreground">{row.label}</span>
              {row.detail && <span className="block text-xs uppercase tracking-wide text-muted">{row.detail}</span>}
            </dt>
            <dd className="text-sm leading-relaxed text-muted md:col-span-8">{row.body}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
