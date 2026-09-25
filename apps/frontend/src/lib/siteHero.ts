import type { HeroCopy } from "@/types/profile";
import type { SitePage } from "@/types/site";

/**
 * A standalone site can override the hero copy; when it hasn't, it reuses the
 * main portfolio's. The CTA always comes from the profile.
 */
export function heroForSite(profileHero: HeroCopy, override: SitePage["hero"]): HeroCopy {
  if (!override?.title && !override?.description) return profileHero;

  return {
    title: override.title ?? profileHero.title,
    description: override.description
      ? [{ text: override.description }]
      : profileHero.description,
    cta: profileHero.cta,
  };
}
