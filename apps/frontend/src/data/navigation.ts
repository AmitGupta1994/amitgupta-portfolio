import { payloadClient } from "@/lib/payload";
import { NavLink } from "@/types/navigation";

interface CmsNavigation {
  links?: NavLink[] | null;
}

/** Hrefs must match the section anchor ids in src/app/(frontend)/page.tsx (`/#about`, …). */
export async function getNavLinks(): Promise<NavLink[]> {
  const payload = await payloadClient();
  const doc = (await payload.findGlobal({ slug: "navigation", depth: 0 })) as unknown as CmsNavigation;
  return (doc.links ?? []).map(({ name, href }) => ({ name, href }));
}
