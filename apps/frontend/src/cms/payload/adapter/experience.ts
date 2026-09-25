import type { SiteKey } from "@/content/ports";
import { Experience } from "@/types/experience";
import { payloadClient } from "../client";
import { forSite, type WithPlacements } from "./site";

interface CmsExperience extends Omit<Experience, "id">, WithPlacements {
  id: number | string;
}

export async function getExperiences(site: SiteKey = "personal"): Promise<Experience[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({ collection: "experiences", limit: 100, depth: 0, sort: "order" });
  return forSite(docs as unknown as CmsExperience[], site).map(
    ({ id, role, company, date, description }) => ({
      id: String(id),
      role,
      company,
      date,
      description,
    })
  );
}
