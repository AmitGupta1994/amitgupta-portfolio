import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CMS_CACHE_TAG } from "@/lib/cms";

function isAuthorized(provided: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !provided) return false;

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

// Called by the CMS (apps/admin hooks/revalidateFrontend.ts) after content changes.
export async function POST(request: Request) {
  if (!isAuthorized(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  // Expire immediately so the next visitor gets fresh content, not a stale copy.
  revalidateTag(CMS_CACHE_TAG, { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
