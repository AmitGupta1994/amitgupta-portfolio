import Link from "next/link";

import ArrowIcon from "@/components/ArrowIcon";
import ScrollReveal from "@/components/ScrollReveal";
import SectionHeader from "@/components/company/SectionHeader";
import type { TrekPackage } from "@/types/trekCompany";
import { TREKS_HREF } from "./format";
import TrekPackageCard from "./TrekPackageCard";

/** The home page's pick of treks, with a way through to the full list. */
export default function FeaturedTreks({ treks, total }: { treks: TrekPackage[]; total: number }) {
  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader eyebrow="Where we walk" title="Featured treks" description="Our most-loved routes, each led by a licensed local guide." />
        <Link
          href={TREKS_HREF}
          className="group inline-flex items-center gap-3 rounded-full border border-foreground/15 py-2 pl-6 pr-2 text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:border-brand hover:text-brand"
        >
          All {total} treks
          <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground/10 transition-transform duration-300 group-hover:rotate-45">
            <ArrowIcon />
          </span>
        </Link>
      </div>
      <ScrollReveal stagger={0.1} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {treks.map((trek) => (
          <TrekPackageCard key={trek.id} trek={trek} />
        ))}
      </ScrollReveal>
    </section>
  );
}
