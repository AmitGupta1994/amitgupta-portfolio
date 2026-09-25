import type { StandaloneSiteKey } from "@/content/ports";
import type { Video } from "@/types/video";
import { orUndefined, payloadClient } from "../client";

interface CmsVideo {
  id: number | string;
  title: string;
  url: string;
  description?: string | null;
  album?: string | null;
}

/** Handles watch?v=…, youtu.be/…, /embed/… and /shorts/… links. */
export function youtubeIdFrom(url: string): string {
  const patterns = [
    /[?&]v=([\w-]{11})/,
    /youtu\.be\/([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return "";
}

export function mapVideo(doc: CmsVideo): Video {
  const youtubeId = youtubeIdFrom(doc.url);
  return {
    id: String(doc.id),
    title: doc.title,
    description: orUndefined(doc.description),
    url: doc.url,
    youtubeId,
    thumbnailUrl: youtubeId ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` : "",
  };
}

export async function getVideos(site: StandaloneSiteKey): Promise<Video[]> {
  const payload = await payloadClient();
  const { docs } = await payload.find({
    collection: "videos",
    where: { site: { equals: site } },
    limit: 200,
    depth: 0,
    sort: "order",
  });
  // Without a parsable id there is nothing to embed.
  return (docs as unknown as CmsVideo[]).map(mapVideo).filter((video) => video.youtubeId);
}
