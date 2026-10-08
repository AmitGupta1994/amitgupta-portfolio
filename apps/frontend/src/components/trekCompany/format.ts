import type { Departure, Difficulty } from "@/types/trekCompany";

export const DIFFICULTY: Record<Difficulty, { label: string; className: string }> = {
  easy: { label: "Easy", className: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" },
  moderate: { label: "Moderate", className: "bg-sky-500/15 text-sky-600 dark:text-sky-400" },
  challenging: { label: "Challenging", className: "bg-amber-500/15 text-amber-600 dark:text-amber-400" },
  strenuous: { label: "Strenuous", className: "bg-rose-500/15 text-rose-600 dark:text-rose-400" },
};

const dateFormat = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** "12 Oct 2026" or "12 Oct 2026 – 24 Oct 2026". */
export function departureLabel(departure: Pick<Departure, "startDate" | "endDate">): string {
  const start = dateFormat.format(new Date(departure.startDate));
  return departure.endDate ? `${start} – ${dateFormat.format(new Date(departure.endDate))}` : start;
}

/** The URL of a trek's page; works on the company's subdomain and on the main domain. */
export const trekHref = (slug: string) => `/mokshyatrails/treks/${slug}`;
export const TREKS_HREF = "/mokshyatrails/treks";
