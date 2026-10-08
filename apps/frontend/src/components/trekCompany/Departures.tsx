"use client";

import type { Departure } from "@/types/trekCompany";
import { BOOK_EVENT } from "./bookingState";
import { departureLabel } from "./format";

const STATUS = {
  available: { label: "Available", className: "text-emerald-600 dark:text-emerald-400" },
  limited: { label: "Few seats left", className: "text-amber-600 dark:text-amber-400" },
  full: { label: "Full", className: "text-muted" },
} as const;

/** Upcoming fixed departures; "Book" preselects the date in the booking form. */
export default function Departures({ departures, priceFrom }: { departures: Departure[]; priceFrom?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-foreground/10">
      <table className="w-full text-left text-sm">
        <thead className="bg-foreground/5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted">
          <tr>
            <th scope="col" className="px-5 py-3">Dates</th>
            <th scope="col" className="hidden px-5 py-3 sm:table-cell">Price</th>
            <th scope="col" className="px-5 py-3">Status</th>
            <th scope="col" className="px-5 py-3"><span className="sr-only">Book</span></th>
          </tr>
        </thead>
        <tbody>
          {departures.map((departure) => {
            const label = departureLabel(departure);
            const status = STATUS[departure.status];
            return (
              <tr key={departure.startDate} className="border-t border-foreground/10">
                <td className="px-5 py-4 font-semibold text-foreground">{label}</td>
                <td className="hidden px-5 py-4 text-foreground/80 sm:table-cell">{departure.price ?? priceFrom ?? "On request"}</td>
                <td className={`px-5 py-4 font-semibold ${status.className}`}>{status.label}</td>
                <td className="px-5 py-4 text-right">
                  {departure.status !== "full" && (
                    <a
                      href="#book"
                      onClick={() => window.dispatchEvent(new CustomEvent(BOOK_EVENT, { detail: label }))}
                      className="inline-block rounded-full bg-brand-deep px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand"
                    >
                      Book
                    </a>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
