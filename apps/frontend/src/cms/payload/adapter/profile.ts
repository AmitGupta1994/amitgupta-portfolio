import { orUndefined, payloadClient, resolveImageUrl, type CmsMedia } from "../client";
import { Profile } from "@/types/profile";

type Nullable<T> = { [K in keyof T]: T[K] | null };

/** The `profile` global as stored by Payload. */
export interface CmsProfile {
  name?: string | null;
  headline?: string | null;
  summary?: string | null;
  image?: CmsMedia;
  imageUrl?: string | null;
  mainSiteUrl?: string | null;
  contact?: Partial<Nullable<Profile["contact"]>> | null;
  hero?: {
    title?: string | null;
    description?: Array<{ text: string; highlight?: boolean | null }> | null;
    cta?: { label?: string | null; href?: string | null } | null;
  } | null;
}

// Tolerates an empty profile so a fresh deploy (empty database) still builds.
export function mapProfile(doc: CmsProfile): Profile {
  const contact = doc.contact ?? {};
  const { hero } = doc;
  return {
    name: doc.name ?? "",
    headline: doc.headline ?? "",
    summary: doc.summary ?? "",
    imageUrl: resolveImageUrl(doc.image, doc.imageUrl),
    mainSiteUrl: orUndefined(doc.mainSiteUrl),
    contact: {
      email: contact.email ?? "",
      phone: contact.phone ?? "",
      whatsapp: orUndefined(contact.whatsapp),
      location: orUndefined(contact.location),
      freelancer: orUndefined(contact.freelancer),
      linkedin: orUndefined(contact.linkedin),
      github: orUndefined(contact.github),
      googleScholar: orUndefined(contact.googleScholar),
    },
    hero: {
      title: hero?.title ?? "",
      description: (hero?.description ?? []).map(({ text, highlight }) => ({
        text,
        highlight: Boolean(highlight),
      })),
      cta: {
        label: hero?.cta?.label ?? "",
        href: hero?.cta?.href ?? "/#contact",
      },
    },
  };
}

export async function getProfile(): Promise<Profile> {
  const payload = await payloadClient();
  const doc = await payload.findGlobal({ slug: "profile", depth: 1 });
  return mapProfile(doc as unknown as CmsProfile);
}
