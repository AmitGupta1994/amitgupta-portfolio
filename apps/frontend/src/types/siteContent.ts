import type { NavLink } from "./navigation";
import type { ProcessStep } from "./company";
import type { CompanyInfo } from "./studio";
import type { HeroSlide } from "./trekCompany";
import type { Profile } from "./profile";
import type { SiteKey } from "./sites";

/** Everything a site's global holds: who it presents, and how it presents itself. */
export interface SiteContent {
  key: SiteKey;
  /** Site identity, e.g. "Research". */
  title: string;
  tagline?: string;
  profile: Profile;
  navLinks: NavLink[];
  /** Headline figures; only sites whose global has the field fill it. */
  stats: Array<{ value: string; label: string }>;
  /** Set only for company sites. */
  company?: CompanyInfo;
  /** How a project runs; only sites whose global has the field fill it. */
  process: ProcessStep[];
  /** Home page slider; only sites whose global has the field fill it. */
  slides: HeroSlide[];
  seo: { title?: string; description?: string };
}
