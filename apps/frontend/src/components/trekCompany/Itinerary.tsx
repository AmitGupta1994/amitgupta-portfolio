import type { ItineraryDay } from "@/types/trekCompany";

/** Day-by-day plan; each day opens to its description (native <details>, no JS). */
export default function Itinerary({ days }: { days: ItineraryDay[] }) {
  return (
    <ol className="flex flex-col border-t border-foreground/10">
      {days.map((day, index) => (
        <li key={`${day.day}-${index}`} className="border-b border-foreground/10">
          <details className="group" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center gap-5 py-5 [&::-webkit-details-marker]:hidden">
              <span className="w-16 shrink-0 text-xs font-bold uppercase tracking-widest text-brand">Day {day.day}</span>
              <span className="flex-1 text-base font-bold text-foreground md:text-lg">{day.title}</span>
              {day.description && (
                <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full border border-foreground/15 text-muted transition-transform group-open:rotate-45">
                  +
                </span>
              )}
            </summary>
            {day.description && <p className="pb-6 pl-[5.25rem] pr-12 text-sm leading-relaxed text-muted">{day.description}</p>}
          </details>
        </li>
      ))}
    </ol>
  );
}
