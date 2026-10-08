import Image from "next/image";
import Link from "next/link";

import ArrowIcon from "@/components/ArrowIcon";
import TiltCard from "@/components/TiltCard";
import type { TrekPackage } from "@/types/trekCompany";
import { DIFFICULTY, trekHref } from "./format";

/** A bookable trek: picture, difficulty, the key numbers and the starting price. */
export default function TrekPackageCard({ trek }: { trek: TrekPackage }) {
  const difficulty = DIFFICULTY[trek.difficulty] ?? DIFFICULTY.moderate;
  const facts = [
    trek.days && `${trek.days} days`,
    trek.maxAltitudeM && `${trek.maxAltitudeM.toLocaleString()} m`,
    trek.region,
  ].filter(Boolean);

  return (
    <TiltCard maxRotation={4} className="h-full rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur transition-shadow hover:shadow-xl">
      <Link href={trekHref(trek.slug)} className="group flex h-full flex-col overflow-hidden rounded-3xl">
        <span className="relative block aspect-[4/3] overflow-hidden bg-foreground/5">
          {trek.heroImageUrl && (
            <Image
              src={trek.heroImageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur ${difficulty.className} bg-white/80 dark:bg-black/50`}>
            {difficulty.label}
          </span>
          <span className="absolute bottom-4 left-4 right-4 text-xs font-semibold uppercase tracking-widest text-white/90">
            {facts.join(" · ")}
          </span>
        </span>

        <span className="flex flex-1 flex-col gap-3 p-6">
          <span className="flex items-start justify-between gap-3">
            <span className="text-2xl font-black uppercase leading-tight tracking-tight text-foreground transition-colors group-hover:text-brand">
              {trek.title}
            </span>
            <span className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-300 group-hover:rotate-45">
              <ArrowIcon />
            </span>
          </span>
          <span className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{trek.summary}</span>
          <span className="flex items-baseline justify-between border-t border-foreground/10 pt-4">
            <span className="text-xs font-bold uppercase tracking-widest text-muted">From</span>
            <span className="text-lg font-black text-brand">{trek.priceFrom ?? "On request"}</span>
          </span>
        </span>
      </Link>
    </TiltCard>
  );
}
