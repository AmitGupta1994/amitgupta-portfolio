/** Every site in this deployment. Each has its own tables and its own global. */
export const SITES = ["tech", "research", "trek"] as const;

export type SiteKey = (typeof SITES)[number];

export const SITE_LABELS: Record<SiteKey, string> = {
  tech: "Tech portfolio",
  research: "Research",
  trek: "Trek",
};
