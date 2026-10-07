import type { ContentSource } from "@/content/ports";
import { getClients, getPackages, getReviews, getServices, getTeam } from "./studio";
import { getExperiences } from "./experience";
import { getExpertise } from "./expertise";
import { getPhotos } from "./photos";
import { getProducts } from "./products";
import { getProjects } from "./projects";
import { getPublications } from "./publications";
import { getSite } from "./sites";
import { getSkillCategories } from "./skills";
import { getTrek, getTreks } from "./treks";
import { getVideos } from "./videos";

/** Payload implementation of the sites' content port. */
export const payloadContentSource: ContentSource = {
  getSite,
  getProjects,
  getSkillCategories,
  getExperiences,
  getPublications,
  getExpertise,
  getPhotos,
  getVideos,
  getTreks,
  getTrek,
  getServices,
  getPackages,
  getReviews,
  getTeam,
  getClients,
  getProducts,
};
