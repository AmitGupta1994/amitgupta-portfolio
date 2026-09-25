import type { NavLink } from "./navigation";

export interface ResearchPage {
  title: string;
  tagline?: string;
  /** HTML, rendered with dangerouslySetInnerHTML like profile.summary. */
  about: string;
  navLinks: NavLink[];
  seo: { title?: string; description?: string };
}
