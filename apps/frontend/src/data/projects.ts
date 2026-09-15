import { cmsCollection, resolveImageUrl, type CmsMedia } from "@/lib/cms";
import { Project } from "@/types/project";

export interface CmsProject {
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

export async function getProjects(): Promise<Project[]> {
  return (await cmsCollection<CmsProject>("projects")).map(mapProject);
}
