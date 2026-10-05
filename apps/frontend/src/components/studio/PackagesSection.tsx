import ScrollReveal from "@/components/ScrollReveal";
import type { Package } from "@/types/studio";
import type { Profile } from "@/types/profile";
import GetStartedButton from "./GetStartedButton";
import { Icon } from "./icons";
import SectionHeading from "./SectionHeading";
import type { VoiceCopy } from "./voice";

interface PackagesSectionProps {
  packages: Package[];
  contact: Profile["contact"];
  copy: VoiceCopy;
}

export default function PackagesSection({ packages, contact, copy }: PackagesSectionProps) {
  return (
    <section id="packages" className="scroll-mt-20 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading accent="Packages" description={copy.packagesDescription} />

        <ScrollReveal stagger={0.1} className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              className={`relative rounded-2xl border bg-surface p-8 transition-all duration-300 hover:border-brand ${
                pkg.popular ? "border-brand shadow-xl shadow-brand/20 lg:scale-105" : "border-line"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-4 py-1 text-xs font-bold tracking-wider text-white">
                  MOST POPULAR
                </span>
              )}

              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold">{pkg.name}</h3>
                <p className="mt-1 text-sm text-muted">{pkg.description}</p>
                <p className="mt-5">
                  <span className="text-3xl font-black text-brand">{pkg.price}</span>
                  {pkg.period && <span className="ml-1 text-sm text-muted">/ {pkg.period}</span>}
                </p>
              </div>

              <ul className="mb-8 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-brand" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <GetStartedButton
                contact={contact}
                packageName={pkg.name}
                prompt={copy.dialogPrompt}
                className={`w-full rounded-xl px-6 py-3 font-semibold transition-colors ${
                  pkg.popular ? "bg-brand text-white hover:bg-brand-deep" : "bg-line text-foreground hover:bg-brand hover:text-white"
                }`}
              >
                Get started
              </GetStartedButton>
            </article>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
}
