import ScrollReveal from "@/components/ScrollReveal";
import type { ProcessStep } from "@/types/company";
import SectionHeader from "./SectionHeader";

/** How a project runs, as a numbered sequence joined by a rule. */
export default function ProcessSection({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader eyebrow="How we deliver" title="Process" description="The same five steps on every project, whichever way you engage us." />

      <ScrollReveal stagger={0.12} className="relative grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-5">
        {steps.map((step, index) => (
          <article key={step.title} className="relative flex flex-col gap-3 border-l border-foreground/10 pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-8">
            <span
              aria-hidden="true"
              className="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full border-2 border-brand bg-background md:-top-[7px] md:left-0"
            />
            <span className="text-5xl font-black leading-none text-foreground/10">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="text-lg font-black uppercase tracking-tight text-foreground">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{step.description}</p>
          </article>
        ))}
      </ScrollReveal>
    </section>
  );
}
