interface YearSectionProps {
  title: string;
  groups: Array<{ year?: number; items: React.ReactNode[] }>;
}

/**
 * The reference layout: a right-aligned heading, then rows where the year sits
 * in a sticky left column and the entries run down the right.
 */
export default function YearSection({ title, groups }: YearSectionProps) {
  if (groups.length === 0) return null;

  return (
    <section className="mx-auto max-w-4xl px-6">
      <h2 className="mb-6 border-b border-foreground/10 pb-2 text-sm font-extrabold uppercase tracking-[0.2em] text-foreground md:text-right">
        {title}
      </h2>

      <div className="flex flex-col gap-10">
        {groups.map((group, index) => (
          <div key={group.year ?? `group-${index}`} className="grid gap-3 md:grid-cols-12 md:gap-6">
            <div className="md:col-span-4 md:text-right">
              <div className="sticky top-6 font-serif text-2xl text-muted md:text-3xl">
                {group.year ?? "—"}
              </div>
            </div>
            <div className="flex flex-col gap-8 md:col-span-8">{group.items}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
