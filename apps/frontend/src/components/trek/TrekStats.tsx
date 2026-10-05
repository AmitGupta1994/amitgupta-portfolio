import type { Trek } from "@/types/trek";

/** The numbers that describe a route: region, season, days, altitude, distance. */
export default function TrekStats({ trek, className = "" }: { trek: Trek; className?: string }) {
  const stats = [
    trek.region && { label: "Region", value: trek.region },
    trek.season && { label: "Season", value: trek.season },
    trek.days && { label: "Days", value: `${trek.days}` },
    trek.maxAltitudeM && { label: "Max altitude", value: `${trek.maxAltitudeM.toLocaleString()} m` },
    trek.distanceKm && { label: "Distance", value: `≈${trek.distanceKm} km` },
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  if (stats.length === 0) return null;

  return (
    <dl className={`flex flex-wrap gap-x-6 gap-y-3 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <dt className="text-xs font-semibold uppercase tracking-widest text-brand">{stat.label}</dt>
          <dd className="text-sm font-medium text-foreground">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
