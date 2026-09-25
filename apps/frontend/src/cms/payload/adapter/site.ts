import type { SiteKey } from "@/content/ports";

export interface CmsPlacement {
  site: string;
  order: number;
}

export interface WithPlacements {
  placements?: CmsPlacement[] | null;
}

/**
 * Narrows and reorders documents for a site other than the main portfolio.
 * Falls back to the default order when nothing has been curated yet, so a new
 * site renders sensibly before any placement is set in the admin.
 */
export function forSite<T extends WithPlacements>(docs: T[], site: SiteKey): T[] {
  if (site === "personal") return docs;

  const curated = docs
    .map((doc) => ({ doc, order: doc.placements?.find((p) => p.site === site)?.order }))
    .filter((entry): entry is { doc: T; order: number } => typeof entry.order === "number");

  if (curated.length === 0) return docs;

  return curated.sort((a, b) => a.order - b.order).map((entry) => entry.doc);
}
