import type { ContentSource } from "@/content/ports";
import { getExperiences } from "./experience";
import { getExpertise } from "./expertise";
import { getNavLinks } from "./navigation";
import { getPhotos } from "./photos";
import { getProfile } from "./profile";
import { getProjects } from "./projects";
import { getPublications } from "./publications";
import { getSitePage } from "./sitePage";
import { getSkillCategories } from "./skills";
import { getVideos } from "./videos";

/** Payload implementation of the sites' content port. */
export const payloadContentSource: ContentSource = {
  getProfile,
  getNavLinks,
  getSitePage,
  getProjects,
  getSkillCategories,
  getExperiences,
  getPublications,
  getExpertise,
  getPhotos,
  getVideos,
};
