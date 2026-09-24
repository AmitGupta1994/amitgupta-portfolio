import type { Experience } from "@/types/experience";
import type { Expertise } from "@/types/expertise";
import type { NavLink } from "@/types/navigation";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Publication } from "@/types/publication";
import type { SkillCategoryData } from "@/types/skill";

/**
 * Everything the site needs from a CMS, in the site's own types.
 * A different CMS means a new adapter that satisfies this interface — nothing
 * outside src/cms and src/content/index.ts should change.
 */
export interface ContentSource {
  getProfile(): Promise<Profile>;
  getNavLinks(): Promise<NavLink[]>;
  getProjects(): Promise<Project[]>;
  getSkillCategories(): Promise<SkillCategoryData[]>;
  getExperiences(): Promise<Experience[]>;
  getPublications(): Promise<Publication[]>;
  getExpertise(): Promise<Expertise[]>;
}
