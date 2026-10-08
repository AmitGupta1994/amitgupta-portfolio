import type { SiteContent } from "@/types/siteContent";
import type { SiteKey } from "@/types/sites";
import { orUndefined, payloadClient, resolveImageUrl, type CmsMedia } from "../client";

type Nullable<T> = { [K in keyof T]: T[K] | null };

/** A site global as stored by Payload. */
export interface CmsSite {
  title?: string | null;
  tagline?: string | null;
  name?: string | null;
  headline?: string | null;
  image?: CmsMedia;
  imageUrl?: string | null;
  mainSiteUrl?: string | null;
  contact?: Partial<Nullable<SiteContent["profile"]["contact"]>> | null;
  summary?: string | null;
  hero?: {
    title?: string | null;
    description?: Array<{ text: string; highlight?: boolean | null }> | null;
    cta?: { label?: string | null; href?: string | null } | null;
  } | null;
  nav?: Array<{ name: string; href: string }> | null;
  stats?: Array<{ value: string; label: string }> | null;
  company?: { legalName?: string | null; founded?: string | null } | null;
  process?: Array<{ title: string; description: string }> | null;
  slides?: Array<{
    image?: CmsMedia;
    imageUrl?: string | null;
    eyebrow?: string | null;
    title: string;
    description?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
  }> | null;
  seo?: { title?: string | null; description?: string | null } | null;
}

/** Tolerates an empty global so a fresh deploy still builds. */
export function mapSite(doc: CmsSite, site: SiteKey): SiteContent {
  const contact = doc.contact ?? {};
  const hero = doc.hero;

  return {
    key: site,
    title: doc.title ?? site,
    tagline: orUndefined(doc.tagline),
    navLinks: (doc.nav ?? []).map(({ name, href }) => ({ name, href })),
    stats: (doc.stats ?? []).map(({ value, label }) => ({ value, label })),
    process: (doc.process ?? []).map(({ title, description }) => ({ title, description })),
    slides: (doc.slides ?? [])
      .map((slide) => ({
        imageUrl: resolveImageUrl(slide.image, slide.imageUrl),
        eyebrow: orUndefined(slide.eyebrow) || undefined,
        title: slide.title,
        description: orUndefined(slide.description) || undefined,
        cta: slide.ctaLabel && slide.ctaHref ? { label: slide.ctaLabel, href: slide.ctaHref } : undefined,
      }))
      // A slide without a picture can't be shown.
      .filter((slide) => slide.imageUrl),
    company: doc.company
      ? { legalName: orUndefined(doc.company.legalName), founded: orUndefined(doc.company.founded) }
      : undefined,
    seo: {
      title: orUndefined(doc.seo?.title),
      description: orUndefined(doc.seo?.description),
    },
    profile: {
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
        instagram: orUndefined(contact.instagram),
        youtube: orUndefined(contact.youtube),
        facebook: orUndefined(contact.facebook),
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
    },
  };
}

export async function getSite(site: SiteKey): Promise<SiteContent> {
  const payload = await payloadClient();
  const doc = (await payload.findGlobal({ slug: site, depth: 1 })) as unknown as CmsSite;
  return mapSite(doc, site);
}
