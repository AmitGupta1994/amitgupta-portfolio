import type { ContentSource } from "@/content/ports";
import { getExperiences } from "./experience";
import { getExpertise } from "./expertise";
import { getNavLinks } from "./navigation";
import { getProfile } from "./profile";
import { getProjects } from "./projects";
import { getPublications } from "./publications";
import { getResearchPage } from "./research";
import { getSkillCategories } from "./skills";

/** Payload implementation of the sites' content port. */
export const payloadContentSource: ContentSource = {
  getProfile,
  getNavLinks,
  getResearchPage,
  getProjects,
  getSkillCategories,
  getExperiences,
  getPublications,
  getExpertise,
};
