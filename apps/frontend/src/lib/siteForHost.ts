/** Subdomain (or subdomain label) → the route that serves that site. */
export const SITE_BY_SUBDOMAIN: Record<string, string> = {
  research: "/research",
  trek: "/trek",
  creatives: "/creatives",
  // Also matches the company's own domain (voxelate.<tld>), whose first label is the name.
  voxelate: "/voxelate",
  techcompany: "/techcompany",
};

/**
 * Labels that wrap a site's host without identifying it: the www prefix and the
 * environment prefixes used by staging deployments. They are skipped while
 * looking for the label that names the site.
 */
const SKIPPED_LABELS = new Set(["www", "staging", "preview", "dev"]);

/**
 * Finds which site a hostname belongs to, tolerating www and staging hosts.
 * All of these resolve to /research:
 *   research.example.com
 *   www.research.example.com          (www prefix)
 *   staging.research.example.com      (env prefix)
 *   www.staging.research.example.com  (both)
 *   research-staging.example.com      (env suffixed on the site label)
 * Returns undefined for the main portfolio (example.com, www.example.com,
 * tech.example.com) and for unknown hosts.
 */
export function siteForHost(host: string | null | undefined): string | undefined {
  if (!host) return undefined;

  const labels = host.split(":")[0].split(".");

  for (const label of labels) {
    if (SKIPPED_LABELS.has(label)) continue;

    const direct = SITE_BY_SUBDOMAIN[label];
    if (direct) return direct;

    // research-staging / staging-research
    for (const part of label.split("-")) {
      if (SKIPPED_LABELS.has(part)) continue;
      const fromPart = SITE_BY_SUBDOMAIN[part];
      if (fromPart) return fromPart;
    }

    // The first meaningful label wasn't a site, so this is the main portfolio
    // (www.example.com, tech.example.com, example.com, a *.vercel.app preview).
    return undefined;
  }

  return undefined;
}
