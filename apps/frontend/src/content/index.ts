import { payloadContentSource } from "@/cms/payload/adapter";
import type { ContentSource } from "./ports";

/**
 * The single place the CMS is chosen. Swapping to another CMS is one edit here
 * plus a new adapter; the pages below never learn which CMS is in use.
 * Server components only — adapters talk to the database.
 */
const source: ContentSource = payloadContentSource;

export const getProfile = () => source.getProfile();
export const getNavLinks = () => source.getNavLinks();
export const getProjects = () => source.getProjects();
export const getSkillCategories = () => source.getSkillCategories();
export const getExperiences = () => source.getExperiences();
export const getPublications = () => source.getPublications();
export const getExpertise = () => source.getExpertise();

export type { ContentSource } from "./ports";
