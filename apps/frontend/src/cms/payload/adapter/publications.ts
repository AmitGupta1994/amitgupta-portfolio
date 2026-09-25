import type { SiteKey } from "@/content/ports";
import { Publication } from "@/types/publication";
import { payloadClient } from "../client";
import { forSite, type WithPlacements } from "./site";

interface CmsPublication extends Omit<Publication, "id">, WithPlacements {
  id: number | string;
}

export async function getPublications(site: SiteKey = "personal"): Promise<Publication[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({ collection: "publications", limit: 100, depth: 0, sort: "order" });
  return forSite(docs as unknown as CmsPublication[], site).map(
    ({ id, title, authors, date, publisher }) => ({
      id: String(id),
      title,
      authors,
      date,
      publisher,
    })
  );
}
