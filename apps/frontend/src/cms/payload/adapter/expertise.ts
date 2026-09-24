import { orUndefined, payloadClient } from "../client";
import { Expertise } from "@/types/expertise";

interface CmsExpertise {
  domain: string;
  years?: string | null;
  description: string;
}

export async function getExpertise(): Promise<Expertise[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({ collection: "expertise", limit: 100, depth: 0, sort: "order" });
  return (docs as unknown as CmsExpertise[]).map(({ domain, years, description }) => ({
    domain,
    years: orUndefined(years),
    description,
  }));
}
