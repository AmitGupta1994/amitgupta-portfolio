import { payloadClient } from "@/lib/payload";
import { SkillCategoryData } from "@/types/skill";

export interface CmsSkillCategory {
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

export async function getSkillCategories(): Promise<SkillCategoryData[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "skill-categories",
    limit: 100,
    depth: 0,
    sort: "priority",
  });
  return (docs as unknown as CmsSkillCategory[]).map(mapSkillCategory);
}
