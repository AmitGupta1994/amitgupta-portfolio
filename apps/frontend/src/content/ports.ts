import type { Experience } from "@/types/experience";
import type { Expertise } from "@/types/expertise";
import type { Photo } from "@/types/photo";
import type { Project } from "@/types/project";
import type { Publication } from "@/types/publication";
import type { SiteContent } from "@/types/siteContent";
import type { SiteKey } from "@/types/sites";
import type { SkillCategoryData } from "@/types/skill";
import type { Trek } from "@/types/trek";
import type { Video } from "@/types/video";

/**
 * Everything the sites need from a CMS, in their own types. Every call names a
 * site: each site owns its tables, so nothing is shared or filtered.
 *
 * A different CMS means a new adapter that satisfies this interface — nothing
 * outside src/cms and src/content/index.ts should change.
 */
export interface ContentSource {
  getSite(site: SiteKey): Promise<SiteContent>;
  getProjects(site: SiteKey): Promise<Project[]>;
  getSkillCategories(site: SiteKey): Promise<SkillCategoryData[]>;
  getExperiences(site: SiteKey): Promise<Experience[]>;
  getPublications(site: SiteKey): Promise<Publication[]>;
  getExpertise(site: SiteKey): Promise<Expertise[]>;
  getPhotos(site: SiteKey): Promise<Photo[]>;
  getVideos(site: SiteKey): Promise<Video[]>;
  getTreks(site: SiteKey): Promise<Trek[]>;
  getTrek(site: SiteKey, slug: string): Promise<Trek | null>;
}

export type { SiteKey } from "@/types/sites";
