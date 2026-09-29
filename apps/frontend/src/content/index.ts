import { payloadContentSource } from "@/cms/payload/adapter";
import type { ContentSource, SiteKey } from "./ports";

/**
 * The single place the CMS is chosen. Swapping to another CMS is one edit here
 * plus a new adapter; the pages below never learn which CMS is in use.
 * Server components only — adapters talk to the database.
 */
const source: ContentSource = payloadContentSource;

export const getSite = (site: SiteKey) => source.getSite(site);
export const getProjects = (site: SiteKey) => source.getProjects(site);
export const getSkillCategories = (site: SiteKey) => source.getSkillCategories(site);
export const getExperiences = (site: SiteKey) => source.getExperiences(site);
export const getPublications = (site: SiteKey) => source.getPublications(site);
export const getExpertise = (site: SiteKey) => source.getExpertise(site);
export const getPhotos = (site: SiteKey) => source.getPhotos(site);
export const getVideos = (site: SiteKey) => source.getVideos(site);

export type { ContentSource, SiteKey } from "./ports";
