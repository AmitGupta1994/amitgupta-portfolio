import { cmsFetch } from "@/lib/cms";
import { NavLink } from "@/types/navigation";

interface CmsNavigation {
  links?: NavLink[] | null;
}

/** Hrefs must match the section anchor ids in src/app/page.tsx (`/#about`, …). */
export async function getNavLinks(): Promise<NavLink[]> {
  const doc = await cmsFetch<CmsNavigation>("/globals/navigation?depth=0");
  return (doc.links ?? []).map(({ name, href }) => ({ name, href }));
}
