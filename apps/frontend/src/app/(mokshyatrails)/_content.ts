import { cache } from 'react';

import { getReviews, getSite, getTrekPackages } from '@/content';

export const SITE = 'mokshyatrails';

/**
 * The company site's shared data, plus its navigation trimmed to what exists —
 * so neither the full-screen menu (layout) nor the side nav (home) points at an
 * empty section. Cached per render, so the layout and the page share one fetch.
 */
export const loadMokshyaTrails = cache(async () => {
  const [site, treks, reviews] = await Promise.all([getSite(SITE), getTrekPackages(SITE), getReviews(SITE)]);

  const visible: Record<string, boolean> = {
    hero: true,
    about: Boolean(site.profile.summary),
    stats: site.stats.length > 0,
    treks: treks.length > 0,
    reviews: reviews.length > 0,
    contact: true,
  };

  const navLinks = site.navLinks.filter((link) => {
    const id = link.href.split('#')[1];
    return !id || visible[id] !== false;
  });

  // The home page shows the featured treks, or the first few if none are flagged.
  const featured = treks.some((trek) => trek.featured) ? treks.filter((trek) => trek.featured) : treks.slice(0, 6);

  return { site, treks, featured, reviews, visible, navLinks };
});
