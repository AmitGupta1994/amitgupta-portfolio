/** Subdomain (or subdomain label) → the route that serves that site. */
export const SITE_BY_SUBDOMAIN: Record<string, string> = {
  research: "/research",
  trek: "/trek",
};

/** Environment labels that may wrap a site's host on staging deployments. */
const ENV_LABELS = new Set(["staging", "preview", "dev"]);

/**
 * Finds which site a hostname belongs to, tolerating staging hosts.
 * All of these resolve to /research:
 *   research.example.com
 *   staging.research.example.com   (env label in front)
 *   research-staging.example.com   (env label suffixed on the site label)
 * Returns undefined for the main portfolio and for unknown hosts.
 */
export function siteForHost(host: string | null | undefined): string | undefined {
  if (!host) return undefined;

  const labels = host.split(":")[0].split(".");

  for (const label of labels) {
    if (ENV_LABELS.has(label)) continue;

    const direct = SITE_BY_SUBDOMAIN[label];
    if (direct) return direct;

    // research-staging / staging-research
    for (const part of label.split("-")) {
      if (ENV_LABELS.has(part)) continue;
      const fromPart = SITE_BY_SUBDOMAIN[part];
      if (fromPart) return fromPart;
    }

    // The first meaningful label wasn't a site, so this is the main portfolio
    // (www.example.com, tech.example.com, example.com, a *.vercel.app preview).
    return undefined;
  }

  return undefined;
}
