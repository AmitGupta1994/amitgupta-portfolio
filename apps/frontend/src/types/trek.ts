import type { Photo } from "./photo";

/** A trekking route with its own page. */
export interface Trek {
  id: string;
  slug: string;
  title: string;
  region?: string;
  season?: string;
  days?: number;
  maxAltitudeM?: number;
  distanceKm?: number;
  summary: string;
  /** HTML; optional longer account. */
  body?: string;
  heroImageUrl?: string;
  gallery: Photo[];
}
