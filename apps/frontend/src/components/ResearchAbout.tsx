import ScrollReveal from "./ScrollReveal";

interface ResearchAboutProps {
  title: string;
  tagline?: string;
  /** HTML from the CMS, same contract as profile.summary. */
  about: string;
}

export default function ResearchAbout({ title, tagline, about }: ResearchAboutProps) {
  return (
    <ScrollReveal direction="up" distance={30} className="w-full scroll-mt-24">
      <section className="flex w-full flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h2 className="text-[clamp(2rem,4vw,3.25rem)] font-black uppercase leading-[0.95] tracking-tight text-foreground">
            {title}
          </h2>
          {tagline && (
            <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-widest text-brand">
              <span aria-hidden="true" className="h-px w-10 bg-brand" />
              {tagline}
            </p>
          )}
        </div>
        <div
          className="max-w-3xl whitespace-pre-line text-base leading-relaxed text-muted md:text-lg"
          dangerouslySetInnerHTML={{ __html: about }}
        />
      </section>
    </ScrollReveal>
  );
}
