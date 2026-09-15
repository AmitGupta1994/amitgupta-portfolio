import { cmsCollection } from "@/lib/cms";
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
  return (await cmsCollection<CmsSkillCategory>("skill-categories", "priority")).map(mapSkillCategory);
}
