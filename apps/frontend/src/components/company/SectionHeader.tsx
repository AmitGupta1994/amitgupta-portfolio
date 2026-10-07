interface SectionHeaderProps {
  /** Small label above the title, e.g. "What we do". */
  eyebrow: string;
  title: string;
  description?: string;
}

/** The company site's section opener: eyebrow, oversized uppercase title, one line of context. */
export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-4">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-brand">
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        {eyebrow}
      </p>
      <h2 className="text-[clamp(2rem,5vw,3.75rem)] font-black uppercase leading-[0.95] tracking-tight text-foreground">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-base text-muted md:text-lg">{description}</p>}
    </header>
  );
}
