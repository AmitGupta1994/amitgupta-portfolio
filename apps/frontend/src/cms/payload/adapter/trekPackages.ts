import type { SiteKey } from "@/types/sites";
import type { BookingRequest, DepartureStatus, Difficulty, TrekPackage } from "@/types/trekCompany";
import { orUndefined, payloadClient } from "../client";
import { mapTrek } from "./treks";

type CmsTrek = Parameters<typeof mapTrek>[0];

interface CmsTrekPackage extends CmsTrek {
  heroImageUrl?: string | null;
  difficulty?: string | null;
  priceFrom?: string | null;
  groupSize?: string | null;
  featured?: boolean | null;
  itinerary?: Array<{ day: string; title: string; description?: string | null }> | null;
  includes?: Array<{ text: string }> | null;
  excludes?: Array<{ text: string }> | null;
  departures?: Array<{ startDate: string; endDate?: string | null; price?: string | null; status?: string | null }> | null;
}

export function mapTrekPackage(doc: CmsTrekPackage): TrekPackage {
  const trek = mapTrek(doc);
  return {
    ...trek,
    // An uploaded hero wins; otherwise the external URL.
    heroImageUrl: trek.heroImageUrl || orUndefined(doc.heroImageUrl) || undefined,
    difficulty: (doc.difficulty ?? "moderate") as Difficulty,
    priceFrom: orUndefined(doc.priceFrom) || undefined,
    groupSize: orUndefined(doc.groupSize) || undefined,
    featured: Boolean(doc.featured),
    itinerary: (doc.itinerary ?? []).map(({ day, title, description }) => ({
      day,
      title,
      description: orUndefined(description) || undefined,
    })),
    includes: (doc.includes ?? []).map((item) => item.text),
    excludes: (doc.excludes ?? []).map((item) => item.text),
    departures: (doc.departures ?? [])
      .map(({ startDate, endDate, price, status }) => ({
        startDate,
        endDate: orUndefined(endDate) || undefined,
        price: orUndefined(price) || undefined,
        status: (status ?? "available") as DepartureStatus,
      }))
      .sort((a, b) => a.startDate.localeCompare(b.startDate)),
  };
}

/** Departures that haven't started yet; past dates drop off the page on their own. */
export function upcomingDepartures(trek: TrekPackage, today = new Date()): TrekPackage["departures"] {
  const cutoff = today.toISOString().slice(0, 10);
  return trek.departures.filter((departure) => departure.startDate.slice(0, 10) >= cutoff);
}

export async function getTrekPackages(site: SiteKey): Promise<TrekPackage[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-treks` as "mokshyatrails-treks",
    limit: 100,
    depth: 1,
    sort: "order",
  });
  return (docs as unknown as CmsTrekPackage[]).map(mapTrekPackage);
}

export async function getTrekPackage(site: SiteKey, slug: string): Promise<TrekPackage | null> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-treks` as "mokshyatrails-treks",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
  });
  const [doc] = docs as unknown as CmsTrekPackage[];
  return doc ? mapTrekPackage(doc) : null;
}

/**
 * Saves a booking request for the admins. The trek is looked up by slug, so the
 * stored title always matches a real trek; no slug means "help me choose".
 */
export async function requestBooking(site: SiteKey, request: BookingRequest): Promise<{ trekTitle: string }> {
  const payload = await payloadClient();
  let trek: { id: number | string; title: string } | undefined;
  if (request.trekSlug) {
    const { docs } = await payload.find({
      collection: `${site}-treks` as "mokshyatrails-treks",
      where: { slug: { equals: request.trekSlug } },
      limit: 1,
      depth: 0,
    });
    trek = docs[0];
    if (!trek) throw new Error("Unknown trek");
  }

  const trekTitle = trek?.title ?? "Not decided — wants advice";
  await payload.create({
    collection: `${site}-bookings` as "mokshyatrails-bookings",
    data: {
      status: "new",
      trek: trek?.id as number | undefined,
      trekTitle,
      departure: request.departure,
      travellers: request.travellers,
      name: request.name,
      email: request.email,
      phone: request.phone,
      country: request.country,
      message: request.message,
    },
  });
  return { trekTitle };
}
