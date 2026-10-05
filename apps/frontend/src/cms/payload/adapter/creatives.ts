import type { Package, Review, Service, ServiceIcon } from "@/types/creatives";
import type { SiteKey } from "@/types/sites";
import { orUndefined, payloadClient } from "../client";

interface CmsService {
  id: number | string;
  title: string;
  icon?: string | null;
  description: string;
  details?: string | null;
}

interface CmsPackage {
  id: number | string;
  name: string;
  price: string;
  period?: string | null;
  description: string;
  features?: Array<{ text: string }> | null;
  popular?: boolean | null;
}

interface CmsReview {
  id: number | string;
  name: string;
  role?: string | null;
  company?: string | null;
  text: string;
  rating?: number | null;
  avatarUrl?: string | null;
  link?: string | null;
}

export function mapService(doc: CmsService): Service {
  return {
    id: String(doc.id),
    title: doc.title,
    icon: (doc.icon ?? "megaphone") as ServiceIcon,
    description: doc.description,
    details: orUndefined(doc.details),
  };
}

export function mapPackage(doc: CmsPackage): Package {
  return {
    id: String(doc.id),
    name: doc.name,
    price: doc.price,
    period: orUndefined(doc.period),
    description: doc.description,
    features: (doc.features ?? []).map((feature) => feature.text),
    popular: Boolean(doc.popular),
  };
}

export function mapReview(doc: CmsReview): Review {
  return {
    id: String(doc.id),
    name: doc.name,
    role: orUndefined(doc.role),
    company: orUndefined(doc.company),
    text: doc.text,
    // Clamped so a bad value can't render zero or dozens of stars.
    rating: Math.min(5, Math.max(1, Math.round(doc.rating ?? 5))),
    avatarUrl: orUndefined(doc.avatarUrl),
    link: orUndefined(doc.link),
  };
}

export async function getServices(site: SiteKey): Promise<Service[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-services` as "creatives-services",
    limit: 50,
    depth: 0,
    sort: "order",
  });
  return (docs as unknown as CmsService[]).map(mapService);
}

export async function getPackages(site: SiteKey): Promise<Package[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-packages` as "creatives-packages",
    limit: 20,
    depth: 0,
    sort: "order",
  });
  return (docs as unknown as CmsPackage[]).map(mapPackage);
}

export async function getReviews(site: SiteKey): Promise<Review[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-reviews` as "creatives-reviews",
    limit: 100,
    depth: 0,
    sort: "order",
  });
  return (docs as unknown as CmsReview[]).map(mapReview);
}
