import { cmsCollection } from "@/lib/cms";
import { Experience } from "@/types/experience";

interface CmsExperience extends Omit<Experience, "id"> {
  id: number | string;
}

export async function getExperiences(): Promise<Experience[]> {
  const docs = await cmsCollection<CmsExperience>("experiences");
  return docs.map(({ id, role, company, date, description }) => ({
    id: String(id),
    role,
    company,
    date,
    description,
  }));
}
