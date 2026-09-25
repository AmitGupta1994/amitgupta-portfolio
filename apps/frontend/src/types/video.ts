export interface Video {
  id: string;
  title: string;
  description?: string;
  /** The original YouTube URL. */
  url: string;
  /** Extracted id, used for the embed and thumbnail. */
  youtubeId: string;
  thumbnailUrl: string;
  album?: string;
}
