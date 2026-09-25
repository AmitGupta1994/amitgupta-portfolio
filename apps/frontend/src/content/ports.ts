import type { Experience } from "@/types/experience";
import type { Expertise } from "@/types/expertise";
import type { NavLink } from "@/types/navigation";
import type { Photo } from "@/types/photo";
import type { Profile } from "@/types/profile";
import type { Project } from "@/types/project";
import type { Publication } from "@/types/publication";
import type { SitePage } from "@/types/site";
import type { SkillCategoryData } from "@/types/skill";
import type { Video } from "@/types/video";

/**
 * Which site is asking. "personal" is the main portfolio and uses each
 * collection's own order; the others are curated through CMS placements.
 */
export type SiteKey = "personal" | "research" | "trek";

/** Sites that have their own global (everything except the main portfolio). */
export type StandaloneSiteKey = Exclude<SiteKey, "personal">;

/**
 * Everything the sites need from a CMS, in their own types.
 * A different CMS means a new adapter that satisfies this interface — nothing
 * outside src/cms and src/content/index.ts should change.
 */
export interface ContentSource {
  getProfile(): Promise<Profile>;
  getNavLinks(): Promise<NavLink[]>;
  getSitePage(site: StandaloneSiteKey): Promise<SitePage>;
  getProjects(site?: SiteKey): Promise<Project[]>;
  getSkillCategories(site?: SiteKey): Promise<SkillCategoryData[]>;
  getExperiences(site?: SiteKey): Promise<Experience[]>;
  getPublications(site?: SiteKey): Promise<Publication[]>;
  getExpertise(site?: SiteKey): Promise<Expertise[]>;
  getPhotos(site: StandaloneSiteKey): Promise<Photo[]>;
  getVideos(site: StandaloneSiteKey): Promise<Video[]>;
}
