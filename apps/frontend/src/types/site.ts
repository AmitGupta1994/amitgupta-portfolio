import type { NavLink } from "./navigation";

/** A standalone site's own writing (research, trek, creatives…). */
export interface SitePage {
  title: string;
  tagline?: string;
  /** HTML, rendered with dangerouslySetInnerHTML like profile.summary. */
  about: string;
  /** Optional hero override; falls back to the main portfolio hero when empty. */
  hero?: { title?: string; description?: string };
  navLinks: NavLink[];
  seo: { title?: string; description?: string };
}
