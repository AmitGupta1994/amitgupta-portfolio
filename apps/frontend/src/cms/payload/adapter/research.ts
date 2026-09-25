import type { ResearchPage } from "@/types/research";
import { payloadClient } from "../client";

interface CmsResearch {
  title?: string | null;
  tagline?: string | null;
  about?: string | null;
  nav?: Array<{ name: string; href: string }> | null;
  seo?: { title?: string | null; description?: string | null } | null;
}

export function mapResearchPage(doc: CmsResearch): ResearchPage {
  return {
    title: doc.title ?? "Research",
    tagline: doc.tagline ?? undefined,
    about: doc.about ?? "",
    navLinks: (doc.nav ?? []).map(({ name, href }) => ({ name, href })),
    seo: {
      title: doc.seo?.title ?? undefined,
      description: doc.seo?.description ?? undefined,
    },
  };
}

export async function getResearchPage(): Promise<ResearchPage> {
  const payload = await payloadClient();
  const doc = (await payload.findGlobal({ slug: "research", depth: 0 })) as unknown as CmsResearch;
  return mapResearchPage(doc);
}
