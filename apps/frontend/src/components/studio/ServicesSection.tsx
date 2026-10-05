import ScrollReveal from "@/components/ScrollReveal";
import type { Service } from "@/types/studio";
import { Icon } from "./icons";
import type { VoiceCopy } from "./voice";

interface ServicesSectionProps {
  services: Service[];
  about: string;
  copy: VoiceCopy;
}

/** Service cards; each reveals its details on hover or keyboard focus. */
export default function ServicesSection({ services, about, copy }: ServicesSectionProps) {
  return (
    <section id="services" className="scroll-mt-20 bg-surface py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
            {copy.servicesLead} <span className="text-brand">do</span>
          </h2>
          {/* About copy is HTML from the CMS. */}
          <p className="mt-4 text-lg text-muted [&_strong]:text-foreground" dangerouslySetInnerHTML={{ __html: about }} />
        </div>

        <ScrollReveal stagger={0.08} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.id}
              tabIndex={service.details ? 0 : undefined}
              className="group relative overflow-hidden rounded-2xl border border-line bg-background p-7 outline-none transition-all duration-500 hover:border-brand hover:shadow-lg hover:shadow-brand/20 focus-visible:border-brand"
            >
              <div className="mb-5 text-brand transition-transform duration-300 group-hover:scale-110 origin-left">
                <Icon name={service.icon} size={44} />
              </div>
              <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-brand">{service.title}</h3>
              <p className="text-sm text-muted">{service.description}</p>
              {service.details && (
                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-in-out group-hover:grid-rows-[1fr] group-focus-visible:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm text-muted opacity-0 transition-opacity delay-100 duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="mt-4 block border-t border-line pt-4">{service.details}</span>
                  </p>
                </div>
              )}
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}

