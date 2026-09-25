import type { Experience } from "@/types/experience";
import type { Expertise } from "@/types/expertise";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Publication } from "@/types/publication";
import type { ResearchPage } from "@/types/research";
import type { SkillCategoryData } from "@/types/skill";

/**
 * Which site is asking. "personal" is the main portfolio and uses each
 * collection's own order; other sites are curated through CMS placements.
 */
export type SiteKey = "personal" | "research";

/**
 * Everything the sites need from a CMS, in their own types.
 * A different CMS means a new adapter that satisfies this interface — nothing
 * outside src/cms and src/content/index.ts should change.
 */
export interface ContentSource {
  getProfile(): Promise<Profile>;
  getNavLinks(): Promise<NavLink[]>;
  getResearchPage(): Promise<ResearchPage>;
  getProjects(site?: SiteKey): Promise<Project[]>;
  getSkillCategories(site?: SiteKey): Promise<SkillCategoryData[]>;
  getExperiences(site?: SiteKey): Promise<Experience[]>;
  getPublications(site?: SiteKey): Promise<Publication[]>;
  getExpertise(site?: SiteKey): Promise<Expertise[]>;
}
