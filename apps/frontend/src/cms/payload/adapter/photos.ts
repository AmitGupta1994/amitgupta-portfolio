import type { StandaloneSiteKey } from "@/content/ports";
import type { Photo } from "@/types/photo";
import { orUndefined, payloadClient } from "../client";

interface CmsPhoto {
  id: number | string;
  url?: string | null;
  caption?: string | null;
  album?: string | null;
  location?: string | null;
  width?: number | null;
  height?: number | null;
}

export function mapPhoto(doc: CmsPhoto): Photo {
  return {
    id: String(doc.id),
    url: doc.url ?? "",
    caption: orUndefined(doc.caption),
    album: orUndefined(doc.album),
    location: orUndefined(doc.location),
    width: orUndefined(doc.width),
    height: orUndefined(doc.height),
  };
}

export async function getPhotos(site: StandaloneSiteKey): Promise<Photo[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "photos",
    where: { site: { equals: site } },
    limit: 200,
    depth: 0,
    sort: "order",
  });
  // A photo with no file can't be rendered by next/image.
  return (docs as unknown as CmsPhoto[]).map(mapPhoto).filter((photo) => photo.url);
}
