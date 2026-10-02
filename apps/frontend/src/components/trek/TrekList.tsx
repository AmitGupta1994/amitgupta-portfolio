import type { Trek } from "@/types/trek";
import ScrollReveal from "../ScrollReveal";
import TrekCard from "./TrekCard";

interface TrekListProps {
  treks: Trek[];
  title?: string;
  description?: string;
}

export default function TrekList({ treks, title = "Treks", description }: TrekListProps) {
  if (treks.length === 0) return null;

  return (
    <ScrollReveal direction="up" distance={30} stagger={0.1} className="w-full scroll-mt-24">
      <section className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h2>
          {description && <p className="max-w-2xl text-sm text-muted md:text-base">{description}</p>}
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {treks.map((trek) => (
            <li key={trek.id}>
              <TrekCard trek={trek} />
            </li>
          ))}
        </ul>
      </section>
    </ScrollReveal>
  );
}
