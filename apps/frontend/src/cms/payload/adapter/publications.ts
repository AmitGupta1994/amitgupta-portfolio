import type { SiteKey } from "@/types/sites";
import { Publication } from "@/types/publication";
import { payloadClient } from "../client";

interface CmsPublication extends Omit<Publication, "id"> {
  id: number | string;
}

export async function getPublications(site: SiteKey): Promise<Publication[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: `${site}-publications`,
    limit: 100,
    depth: 0,
    sort: "order",
  });
  return (docs as unknown as CmsPublication[]).map(({ id, title, authors, date, publisher }) => ({
    id: String(id),
    title,
    authors,
    date,
    publisher,
  }));
}
