import { cmsCollection, orUndefined } from "@/lib/cms";
import { Expertise } from "@/types/expertise";

interface CmsExpertise {
  domain: string;
  years?: string | null;
  description: string;
}

export async function getExpertise(): Promise<Expertise[]> {
  const docs = await cmsCollection<CmsExpertise>("expertise");
  return docs.map(({ domain, years, description }) => ({
    domain,
    years: orUndefined(years),
    description,
  }));
}
