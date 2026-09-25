import type { SiteKey } from "@/content/ports";
import { Expertise } from "@/types/expertise";
import { orUndefined, payloadClient } from "../client";
import { forSite, type WithPlacements } from "./site";

interface CmsExpertise extends WithPlacements {
  domain: string;
  years?: string | null;
  description: string;
}

export async function getExpertise(site: SiteKey = "personal"): Promise<Expertise[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({ collection: "expertise", limit: 100, depth: 0, sort: "order" });
  return forSite(docs as unknown as CmsExpertise[], site).map(({ domain, years, description }) => ({
    domain,
    years: orUndefined(years),
    description,
  }));
}
