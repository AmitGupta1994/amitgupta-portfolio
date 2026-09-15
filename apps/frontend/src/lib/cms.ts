// Thin client for the Payload CMS REST API (apps/admin). Server-only: responses are
// cached by Next under CMS_CACHE_TAG and refreshed by /api/revalidate on every save.

const CMS_URL = process.env.CMS_URL ?? "http://localhost:3001";

export const CMS_CACHE_TAG = "cms";

// Safety net in case a revalidation webhook is missed.
const REVALIDATE_SECONDS = 300;

export async function cmsFetch<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${CMS_URL}/api${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, tags: [CMS_CACHE_TAG] },
    });
  } catch (error) {
    // Network-level failure (CMS down, wrong CMS_URL) surfaces as a bare "fetch failed".
    throw new Error(
      `Could not reach the CMS at ${CMS_URL}. Is the admin app running? ` +
        "Start it with `npm run dev:admin`, or run both apps with `npm run dev:all`.",
      { cause: error }
    );
  }
  if (!res.ok) {
    throw new Error(`CMS request failed (${res.status} ${res.statusText}): ${path}`);
  }
  return (await res.json()) as T;
}

export async function cmsCollection<T>(slug: string, sort = "order"): Promise<T[]> {
  const { docs } = await cmsFetch<{ docs: T[] }>(`/${slug}?limit=100&depth=1&sort=${sort}`);
  return docs;
}

/** An upload field at depth >= 1 is the media doc; at depth 0 it's only an id. */
export type CmsMedia = { url?: string | null; alt?: string | null } | number | string | null | undefined;

/** Prefers an uploaded image, then the external URL field. */
export function resolveImageUrl(image: CmsMedia, fallback?: string | null): string {
  if (image && typeof image === "object" && image.url) {
    return image.url.startsWith("http") ? image.url : `${CMS_URL}${image.url}`;
  }
  return fallback ?? "";
}

/** Payload returns `null` for empty optional fields; the frontend types use `undefined`. */
export function orUndefined<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}
