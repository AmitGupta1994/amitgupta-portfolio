import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { purgeCdnCache } from '../cdn';

const ORIGINAL = { zone: process.env.CLOUDFLARE_ZONE_ID, token: process.env.CLOUDFLARE_API_TOKEN };

beforeEach(() => {
  process.env.CLOUDFLARE_ZONE_ID = 'zone123';
  process.env.CLOUDFLARE_API_TOKEN = 'token123';
});

afterEach(() => {
  vi.unstubAllGlobals();
  process.env.CLOUDFLARE_ZONE_ID = ORIGINAL.zone;
  process.env.CLOUDFLARE_API_TOKEN = ORIGINAL.token;
});

describe('purgeCdnCache', () => {
  it('purges the zone with the API token', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal('fetch', fetchMock);

    await expect(purgeCdnCache()).resolves.toEqual({ purged: true });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.cloudflare.com/client/v4/zones/zone123/purge_cache');
    expect(init.headers.Authorization).toBe('Bearer token123');
    expect(JSON.parse(init.body)).toEqual({ purge_everything: true });
  });

  it('skips when credentials are absent', async () => {
    delete process.env.CLOUDFLARE_ZONE_ID;
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(purgeCdnCache()).resolves.toEqual({
      purged: false,
      reason: 'no Cloudflare credentials',
    });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('never purges the shared zone from a staging deployment', async () => {
    process.env.VERCEL_ENV = 'preview';
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    await expect(purgeCdnCache()).resolves.toEqual({ purged: false, reason: 'skipped on preview' });
    expect(fetchMock).not.toHaveBeenCalled();
    delete process.env.VERCEL_ENV;
  });

  it('reports a failed purge instead of throwing', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 403 }));
    await expect(purgeCdnCache()).resolves.toEqual({
      purged: false,
      reason: 'Cloudflare responded 403',
    });

    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('network down')));
    await expect(purgeCdnCache()).resolves.toEqual({ purged: false, reason: 'network down' });
  });
});
