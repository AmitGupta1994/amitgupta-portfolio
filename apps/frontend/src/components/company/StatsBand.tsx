import ScrollReveal from "@/components/ScrollReveal";
import type { SiteContent } from "@/types/siteContent";

/** Headline figures in one oversized row. */
export default function StatsBand({ stats }: { stats: SiteContent["stats"] }) {
  return (
    <ScrollReveal stagger={0.1} className="grid grid-cols-2 gap-y-10 border-y border-foreground/10 py-12 md:grid-cols-4">
      {stats.map((stat) => (
        <dl key={stat.label} className="flex flex-col-reverse gap-2 px-2">
          <dt className="text-xs font-bold uppercase tracking-[0.2em] text-muted">{stat.label}</dt>
          <dd className="text-[clamp(2.5rem,5vw,4rem)] font-black leading-none text-brand">{stat.value}</dd>
        </dl>
      ))}
    </ScrollReveal>
  );
}
