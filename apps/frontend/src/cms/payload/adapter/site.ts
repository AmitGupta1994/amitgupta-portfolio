import type { SiteKey } from "@/content/ports";

export interface CmsPlacement {
  site: string;
  order: number;
}

export interface WithPlacements {
  placements?: CmsPlacement[] | null;
}

/**
 * Whether a site shows everything when nothing is curated yet. Research draws on
 * the same career as the main portfolio, so showing all of it is a sane default;
 * trek content is unrelated, so an untagged item must not leak onto it.
 */
const SHOW_ALL_WHEN_UNCURATED: Record<SiteKey, boolean> = {
  personal: true,
  research: true,
  trek: false,
};

/** Narrows and reorders documents for a site other than the main portfolio. */
export function forSite<T extends WithPlacements>(docs: T[], site: SiteKey): T[] {
  if (site === "personal") return docs;

  const curated = docs
    .map((doc) => ({ doc, order: doc.placements?.find((p) => p.site === site)?.order }))
    .filter((entry): entry is { doc: T; order: number } => typeof entry.order === "number");

  if (curated.length === 0) return SHOW_ALL_WHEN_UNCURATED[site] ? docs : [];

  return curated.sort((a, b) => a.order - b.order).map((entry) => entry.doc);
}
