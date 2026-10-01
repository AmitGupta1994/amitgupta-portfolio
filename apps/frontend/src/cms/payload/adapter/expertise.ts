import type { SiteKey } from "@/types/sites";
import { Expertise } from "@/types/expertise";
import { orUndefined, payloadClient } from "../client";

interface CmsExpertise {
  domain: string;
  years?: string | null;
  description: string;
}

export async function getExpertise(site: SiteKey): Promise<Expertise[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-expertise`,
    limit: 100,
    depth: 0,
    sort: "order",
  });
  return (docs as unknown as CmsExpertise[]).map(({ domain, years, description }) => ({
    domain,
    years: orUndefined(years),
    description,
  }));
}
