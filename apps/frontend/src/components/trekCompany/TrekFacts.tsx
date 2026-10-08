import type { TrekPackage } from "@/types/trekCompany";
import { DIFFICULTY } from "./format";

/** The numbers a trekker weighs up, as a strip under the title. */
export default function TrekFacts({ trek }: { trek: TrekPackage }) {
  const facts = [
    trek.days && { label: "Duration", value: `${trek.days} days` },
    { label: "Difficulty", value: (DIFFICULTY[trek.difficulty] ?? DIFFICULTY.moderate).label },
    trek.maxAltitudeM && { label: "Max altitude", value: `${trek.maxAltitudeM.toLocaleString()} m` },
    trek.distanceKm && { label: "Distance", value: `≈${trek.distanceKm} km` },
    trek.groupSize && { label: "Group size", value: trek.groupSize },
    trek.season && { label: "Best season", value: trek.season },
    trek.region && { label: "Region", value: trek.region },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/10 sm:grid-cols-3 lg:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-1 bg-background/90 p-5 backdrop-blur">
          <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand">{fact.label}</dt>
          <dd className="text-base font-bold text-foreground">{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
