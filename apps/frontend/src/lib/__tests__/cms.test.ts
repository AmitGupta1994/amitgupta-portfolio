import { afterEach, describe, expect, it, vi } from 'vitest';
import { cmsCollection, cmsFetch, resolveImageUrl } from '../cms';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('cmsFetch', () => {
  it('requests the CMS REST API with the cache tag', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ name: 'Amit' }) });
    vi.stubGlobal('fetch', fetchMock);

    await expect(cmsFetch('/globals/profile')).resolves.toEqual({ name: 'Amit' });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toMatch(/\/api\/globals\/profile$/);
    expect(init.next.tags).toContain('cms');
  });

  it('throws when the CMS responds with an error', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 500, statusText: 'Server Error' }));

    await expect(cmsFetch('/projects')).rejects.toThrow(/500/);
  });

  it('explains how to start the CMS when it is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('fetch failed')));

    await expect(cmsFetch('/globals/navigation')).rejects.toThrow(/npm run dev:admin/);
  });

  it('unwraps collection docs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => ({ docs: [{ id: 1 }] }) }));

    await expect(cmsCollection('projects')).resolves.toEqual([{ id: 1 }]);
  });
});

describe('resolveImageUrl', () => {
  it('prefers an uploaded image', () => {
    expect(resolveImageUrl({ url: 'https://cms.example/api/media/file/a.png' }, 'https://x/y.png')).toBe(
      'https://cms.example/api/media/file/a.png'
    );
  });

  it('makes relative upload URLs absolute', () => {
    expect(resolveImageUrl({ url: '/api/media/file/a.png' })).toMatch(/^https?:\/\/.+\/api\/media\/file\/a\.png$/);
  });

  it('falls back to the external URL, then an empty string', () => {
    expect(resolveImageUrl(null, 'https://x/y.png')).toBe('https://x/y.png');
    expect(resolveImageUrl(3, null)).toBe('');
  });
});
