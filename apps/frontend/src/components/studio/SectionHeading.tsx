interface SectionHeadingProps {
  lead?: string;
  accent: string;
  description?: string;
}

/** "Our <Works>": a plain lead word and an accented one, centred over a section. */
export default function SectionHeading({ lead, accent, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
        {lead && <>{lead} </>}
        <span className="text-brand">{accent}</span>
      </h2>
      {description && <p className="mt-4 text-lg text-muted">{description}</p>}
    </div>
  );
}
