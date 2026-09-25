export interface Photo {
  id: string;
  url: string;
  /** Doubles as alt text. */
  caption?: string;
  album?: string;
  location?: string;
  width?: number;
  height?: number;
}
