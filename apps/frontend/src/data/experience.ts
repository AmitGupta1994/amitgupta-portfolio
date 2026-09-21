import { payloadClient } from "@/lib/payload";
import { Experience } from "@/types/experience";

interface CmsExperience extends Omit<Experience, "id"> {
  id: number | string;
}

export async function getExperiences(): Promise<Experience[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({ collection: "experiences", limit: 100, depth: 0, sort: "order" });
  return (docs as unknown as CmsExperience[]).map(({ id, role, company, date, description }) => ({
    id: String(id),
    role,
    company,
    date,
    description,
  }));
}
