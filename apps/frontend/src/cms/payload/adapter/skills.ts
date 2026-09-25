import type { SiteKey } from "@/content/ports";
import { payloadClient } from "../client";
import { forSite, type WithPlacements } from "./site";
import { SkillCategoryData } from "@/types/skill";

export interface CmsSkillCategory extends WithPlacements {
  id: number | string;
  key: string;
  title: string;
  show?: boolean | null;
  priority: number;
  items?: Array<{ name: string; rating: number }> | null;
}

export function mapSkillCategory(doc: CmsSkillCategory): SkillCategoryData {
  return {
    id: doc.key,
    title: doc.title,
    show: doc.show ?? true,
    priority: doc.priority,
    items: (doc.items ?? []).map(({ name, rating }) => ({ name, rating })),
  };
}

export async function getSkillCategories(site: SiteKey = "personal"): Promise<SkillCategoryData[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "skill-categories",
    limit: 100,
    depth: 0,
    sort: "priority",
  });
  return forSite(docs as unknown as CmsSkillCategory[], site).map(mapSkillCategory);
}
