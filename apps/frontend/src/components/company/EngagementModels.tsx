import ArrowIcon from "@/components/ArrowIcon";
import ScrollReveal from "@/components/ScrollReveal";
import TiltCard from "@/components/TiltCard";
import { Icon } from "@/components/studio/icons";
import type { Package } from "@/types/studio";
import EngageButton from "./EngageButton";
import SectionHeader from "./SectionHeader";

/** The ways to hire the company: dedicated engineers, hours, or a whole project. */
export default function EngagementModels({ models }: { models: Package[] }) {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="How to work with us"
        title="Engagement models"
        description="Join forces the way that suits your roadmap and budget — and switch models as it changes."
      />

      <ScrollReveal stagger={0.12} className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
        {models.map((model) => (
          <TiltCard
            key={model.id}
            maxRotation={4}
            className={`h-full rounded-3xl border bg-background/60 backdrop-blur transition-shadow hover:shadow-xl ${
              model.popular ? "border-brand shadow-lg shadow-brand/10" : "border-foreground/10"
            }`}
          >
            <article className="flex h-full flex-col gap-6 p-7">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-xl font-black uppercase leading-tight tracking-tight text-foreground">{model.name}</h3>
                {model.popular && (
                  <span className="shrink-0 rounded-full bg-brand px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    Most chosen
                  </span>
                )}
              </div>
              <p className="text-sm text-muted">{model.description}</p>
              <p className="flex flex-wrap items-baseline gap-x-2">
                <span className="text-3xl font-black text-brand">{model.price}</span>
                {model.period && <span className="text-sm font-semibold uppercase tracking-wide text-muted">{model.period}</span>}
              </p>
              <ul className="flex flex-1 flex-col gap-3 border-t border-foreground/10 pt-6">
                {model.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <Icon name="check" size={16} className="mt-0.5 shrink-0 text-brand" />
                    {feature}
                  </li>
                ))}
              </ul>
              <EngageButton
                model={model.name}
                className={`group inline-flex items-center justify-between gap-3 rounded-full py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                  model.popular
                    ? "bg-brand-deep text-white hover:bg-brand"
                    : "border border-foreground/15 text-foreground hover:border-brand hover:text-brand"
                }`}
              >
                Discuss this model
                <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground/10 transition-transform duration-300 group-hover:rotate-45">
                  <ArrowIcon className="h-4 w-4" />
                </span>
              </EngageButton>
            </article>
          </TiltCard>
        ))}
      </ScrollReveal>
    </section>
  );
}
