import { payloadContentSource } from "@/cms/payload/adapter";
import type { ContentSource, SiteKey, StandaloneSiteKey } from "./ports";

/**
 * The single place the CMS is chosen. Swapping to another CMS is one edit here
 * plus a new adapter; the pages below never learn which CMS is in use.
 * Server components only — adapters talk to the database.
 */
const source: ContentSource = payloadContentSource;

export const getProfile = () => source.getProfile();
export const getNavLinks = () => source.getNavLinks();
export const getSitePage = (site: StandaloneSiteKey) => source.getSitePage(site);
export const getProjects = (site?: SiteKey) => source.getProjects(site);
export const getSkillCategories = (site?: SiteKey) => source.getSkillCategories(site);
export const getExperiences = (site?: SiteKey) => source.getExperiences(site);
export const getPublications = (site?: SiteKey) => source.getPublications(site);
export const getExpertise = (site?: SiteKey) => source.getExpertise(site);
export const getPhotos = (site: StandaloneSiteKey) => source.getPhotos(site);
export const getVideos = (site: StandaloneSiteKey) => source.getVideos(site);

export type { ContentSource, SiteKey, StandaloneSiteKey } from "./ports";
