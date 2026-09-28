/**
 * Purges the Cloudflare cache. Vercel's own cache is cleared by
 * `revalidatePath`, but when the domain is proxied through Cloudflare there is a
 * second copy of the HTML to drop, or edits stay hidden until its TTL expires.
 *
 * Skipped silently when the credentials aren't set, so local development and
 * DNS-only setups need no configuration.
 */
export async function purgeCdnCache(): Promise<{ purged: boolean; reason?: string }> {
  const zoneId = process.env.CLOUDFLARE_ZONE_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!zoneId || !token) return { purged: false, reason: "no Cloudflare credentials" };

  try {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // Free plans can't purge by hostname, and every site shares this zone, so
      // purge the lot: assets are immutable and re-cache on first request.
      body: JSON.stringify({ purge_everything: true }),
      cache: "no-store",
    });

    if (!res.ok) return { purged: false, reason: `Cloudflare responded ${res.status}` };
    return { purged: true };
  } catch (error) {
    return { purged: false, reason: error instanceof Error ? error.message : "request failed" };
  }
}
