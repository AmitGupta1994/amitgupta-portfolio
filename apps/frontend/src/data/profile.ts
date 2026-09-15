import { cmsFetch, orUndefined, resolveImageUrl, type CmsMedia } from "@/lib/cms";
import { Profile } from "@/types/profile";

type Nullable<T> = { [K in keyof T]: T[K] | null };

/** `profile` global as returned by the CMS REST API. */
export interface CmsProfile {
  name: string;
  headline: string;
  summary: string;
  image?: CmsMedia;
  imageUrl?: string | null;
  contact: Nullable<Profile["contact"]>;
}

export function mapProfile(doc: CmsProfile): Profile {
  const { contact } = doc;
  return {
    name: doc.name,
    headline: doc.headline,
    summary: doc.summary,
    imageUrl: resolveImageUrl(doc.image, doc.imageUrl),
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
  };
}

export async function getProfile(): Promise<Profile> {
  return mapProfile(await cmsFetch<CmsProfile>("/globals/profile?depth=1"));
}
