import { cache } from 'react';

import { getPackages, getProducts, getProjects, getReviews, getServices, getSite, getSkillCategories } from '@/content';

export const SITE = 'techcompany';

/**
 * Everything the company page shows, plus the navigation trimmed to the sections
 * that have content — so neither the side nav (page) nor the full-screen menu
 * (layout) links to a hidden section. Cached per render, so both share one fetch.
 */
export const loadTechCompany = cache(async () => {
  const [site, services, models, products, projects, skills, reviews] = await Promise.all([
    getSite(SITE),
    getServices(SITE),
    getPackages(SITE),
    getProducts(SITE),
    getProjects(SITE),
    getSkillCategories(SITE),
    getReviews(SITE),
  ]);

  const visible: Record<string, boolean> = {
    hero: true,
    about: Boolean(site.profile.summary),
    stats: site.stats.length > 0,
    services: services.length > 0,
    engagement: models.length > 0,
    products: products.length > 0,
    projects: projects.length > 0,
    process: site.process.length > 0,
    skills: skills.some((category) => category.show),
    reviews: reviews.length > 0,
    contact: true,
  };

  const navLinks = site.navLinks.filter((link) => {
    const id = link.href.split('#')[1];
    return !id || visible[id] !== false;
  });

  return { site, services, models, products, projects, skills, reviews, visible, navLinks };
});
