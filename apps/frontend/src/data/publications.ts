import { cmsCollection } from "@/lib/cms";
import { Publication } from "@/types/publication";

interface CmsPublication extends Omit<Publication, "id"> {
  id: number | string;
}

export async function getPublications(): Promise<Publication[]> {
  const docs = await cmsCollection<CmsPublication>("publications");
  return docs.map(({ id, title, authors, date, publisher }) => ({
    id: String(id),
    title,
    authors,
    date,
    publisher,
  }));
}
