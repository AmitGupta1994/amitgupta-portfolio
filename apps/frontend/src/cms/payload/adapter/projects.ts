import type { SiteKey } from "@/content/ports";
import { payloadClient, resolveImageUrl, type CmsMedia } from "../client";
import { forSite, type WithPlacements } from "./site";
import { Project } from "@/types/project";

export interface CmsProject extends WithPlacements {
  id: number | string;
  title: string;
  description: string;
  techStack?: Array<{ name: string }> | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  image?: CmsMedia;
  imageUrl?: string | null;
}

export function mapProject(doc: CmsProject): Project {
  return {
    id: String(doc.id),
    title: doc.title,
    description: doc.description,
    techStack: (doc.techStack ?? []).map((tech) => tech.name),
    githubUrl: doc.githubUrl ?? "",
    liveUrl: doc.liveUrl ?? "",
    imageUrl: resolveImageUrl(doc.image, doc.imageUrl),
  };
}

export async function getProjects(site: SiteKey = "personal"): Promise<Project[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({ collection: "projects", limit: 100, depth: 1, sort: "order" });
  return forSite(docs as unknown as CmsProject[], site).map(mapProject);
}
