import configPromise from "@payload-config";
import { getPayload } from "payload";

/**
 * Payload's local API: queries Postgres in-process, with no HTTP round trip.
 * Server components only — never import this from a client component.
 */
export async function payloadClient() {
  return getPayload({ config: configPromise });
}

/** An upload field at depth >= 1 is the media doc; at depth 0 it's only an id. */
export type CmsMedia = { url?: string | null; alt?: string | null } | number | string | null | undefined;

/** Prefers an uploaded image (same-origin path) over the external URL field. */
export function resolveImageUrl(image: CmsMedia, fallback?: string | null): string {
  if (image && typeof image === "object" && image.url) {
    return image.url;
  }
  return fallback ?? "";
}

/** Payload returns `null` for empty optional fields; the frontend types use `undefined`. */
export function orUndefined<T>(value: T | null | undefined): T | undefined {
  return value ?? undefined;
}
