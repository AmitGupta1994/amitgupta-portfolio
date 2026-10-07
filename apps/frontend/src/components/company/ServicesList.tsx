import ScrollReveal from "@/components/ScrollReveal";
import { Icon } from "@/components/studio/icons";
import type { Service } from "@/types/studio";
import SectionHeader from "./SectionHeader";

/** Numbered service rows; each opens up to show its details on hover or focus. */
export default function ServicesList({ services }: { services: Service[] }) {
  return (
    <section className="flex flex-col gap-10">
      <SectionHeader
        eyebrow="What we do"
        title="Services"
        description="End-to-end engineering, from the first architecture sketch to the system running in production."
      />

      <ScrollReveal stagger={0.08} className="flex flex-col border-t border-foreground/10">
        {services.map((service, index) => (
          <article
            key={service.id}
            tabIndex={service.details ? 0 : undefined}
            className="group grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-b border-foreground/10 py-7 outline-none transition-colors md:grid-cols-[5rem_auto_1fr] md:items-start md:gap-x-8"
          >
            <span className="text-sm font-bold tabular-nums text-muted transition-colors group-hover:text-brand md:pt-2 md:text-base">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="row-span-2 hidden h-12 w-12 place-items-center rounded-full border border-foreground/15 text-brand transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white md:grid">
              <Icon name={service.icon} size={22} />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="text-2xl font-black uppercase tracking-tight text-foreground transition-colors group-hover:text-brand md:text-4xl">
                {service.title}
              </h3>
              <p className="max-w-2xl text-sm text-muted md:text-base">{service.description}</p>
              {service.details && (
                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-foreground/80 opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="block pt-2">{service.details}</span>
                  </p>
                </div>
              )}
            </div>
          </article>
        ))}
      </ScrollReveal>
    </section>
  );
}
