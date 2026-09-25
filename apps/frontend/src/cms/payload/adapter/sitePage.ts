import type { StandaloneSiteKey } from "@/content/ports";
import type { SitePage } from "@/types/site";
import { orUndefined, payloadClient } from "../client";

interface CmsSitePage {
  title?: string | null;
  tagline?: string | null;
  about?: string | null;
  hero?: { title?: string | null; description?: string | null } | null;
  nav?: Array<{ name: string; href: string }> | null;
  seo?: { title?: string | null; description?: string | null } | null;
}

const FALLBACK_TITLE: Record<StandaloneSiteKey, string> = {
  research: "Research",
  trek: "Trek",
};

export function mapSitePage(doc: CmsSitePage, site: StandaloneSiteKey): SitePage {
  const heroTitle = orUndefined(doc.hero?.title);
  const heroDescription = orUndefined(doc.hero?.description);

  return {
    title: doc.title ?? FALLBACK_TITLE[site],
    tagline: orUndefined(doc.tagline),
    about: doc.about ?? "",
    // Only an override when something was actually written.
    hero: heroTitle || heroDescription ? { title: heroTitle, description: heroDescription } : undefined,
    navLinks: (doc.nav ?? []).map(({ name, href }) => ({ name, href })),
    seo: {
      title: orUndefined(doc.seo?.title),
      description: orUndefined(doc.seo?.description),
    },
  };
}

export async function getSitePage(site: StandaloneSiteKey): Promise<SitePage> {
  const payload = await payloadClient();
  const doc = (await payload.findGlobal({ slug: site, depth: 0 })) as unknown as CmsSitePage;
  return mapSitePage(doc, site);
}
