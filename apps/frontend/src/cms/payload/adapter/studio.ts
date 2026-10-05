import type { Client, Package, Review, Service, ServiceIcon, TeamMember } from "@/types/studio";
import type { SiteKey } from "@/types/sites";
import { orUndefined, payloadClient } from "../client";
import type { CmsPhoto } from "./photos";

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

interface CmsTeamMember {
  id: number | string;
  name: string;
  role: string;
  bio?: string | null;
  photo?: CmsPhoto | number | string | null;
  photoUrl?: string | null;
  linkedin?: string | null;
}

interface CmsClient {
  id: number | string;
  name: string;
  website?: string | null;
  logo?: CmsPhoto | number | string | null;
  logoUrl?: string | null;
}

/** An uploaded photo (depth 1) wins over the external URL field. */
const uploadOr = (upload: CmsPhoto | number | string | null | undefined, fallback?: string | null) =>
  (upload && typeof upload === "object" && upload.url) || orUndefined(fallback) || undefined;

export function mapTeamMember(doc: CmsTeamMember): TeamMember {
  return {
    id: String(doc.id),
    name: doc.name,
    role: doc.role,
    bio: orUndefined(doc.bio),
    photoUrl: uploadOr(doc.photo, doc.photoUrl),
    linkedin: orUndefined(doc.linkedin),
  };
}

export function mapClient(doc: CmsClient): Client {
  return {
    id: String(doc.id),
    name: doc.name,
    logoUrl: uploadOr(doc.logo, doc.logoUrl),
    website: orUndefined(doc.website),
  };
}

export async function getTeam(site: SiteKey): Promise<TeamMember[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-team` as "voxelate-team",
    limit: 50,
    depth: 1,
    sort: "order",
  });
  return (docs as unknown as CmsTeamMember[]).map(mapTeamMember);
}

export async function getClients(site: SiteKey): Promise<Client[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-clients` as "voxelate-clients",
    limit: 100,
    depth: 1,
    sort: "order",
  });
  return (docs as unknown as CmsClient[]).map(mapClient);
}
