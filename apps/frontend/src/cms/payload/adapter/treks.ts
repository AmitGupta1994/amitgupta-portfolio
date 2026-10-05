import type { SiteKey } from "@/types/sites";
import type { Trek } from "@/types/trek";
import { orUndefined, payloadClient } from "../client";
import { mapPhoto, type CmsPhoto } from "./photos";

interface CmsTrek {
  id: number | string;
  slug: string;
  title: string;
  region?: string | null;
  season?: string | null;
  days?: number | null;
  maxAltitudeM?: number | null;
  distanceKm?: number | null;
  summary: string;
  body?: string | null;
  heroImage?: CmsPhoto | number | string | null;
  gallery?: Array<CmsPhoto | number | string> | null;
}

export function mapTrek(doc: CmsTrek): Trek {
  const hero = doc.heroImage;
  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    region: orUndefined(doc.region),
    season: orUndefined(doc.season),
    days: orUndefined(doc.days),
    maxAltitudeM: orUndefined(doc.maxAltitudeM),
    distanceKm: orUndefined(doc.distanceKm),
    summary: doc.summary,
    body: orUndefined(doc.body),
    // Depth 1 gives the photo doc; an unresolved relationship is just an id.
    heroImageUrl: hero && typeof hero === "object" ? mapPhoto(hero).url : undefined,
    gallery: (doc.gallery ?? [])
      .filter((item): item is CmsPhoto => typeof item === "object" && item !== null)
      .map(mapPhoto)
      .filter((photo) => photo.url),
  };
}

export async function getTreks(site: SiteKey): Promise<Trek[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-treks` as "trek-treks",
    limit: 100,
    depth: 1,
    sort: "order",
  });
  return (docs as unknown as CmsTrek[]).map(mapTrek);
}

export async function getTrek(site: SiteKey, slug: string): Promise<Trek | null> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-treks` as "trek-treks",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const [doc] = docs as unknown as CmsTrek[];
  return doc ? mapTrek(doc) : null;
}
