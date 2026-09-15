import { afterEach, describe, it, expect, vi } from 'vitest';
import { getNavLinks } from '../navigation';

function stubCmsResponse(body: unknown) {
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: async () => body }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getNavLinks', () => {
  it('returns the navigation links from the CMS', async () => {
    stubCmsResponse({
      links: [
        { id: 'a', name: 'Home', href: '/#hero' },
        { id: 'b', name: 'Contact', href: '/#contact' },
      ],
    });

    await expect(getNavLinks()).resolves.toEqual([
      { name: 'Home', href: '/#hero' },
      { name: 'Contact', href: '/#contact' },
    ]);
  });

  it('returns an empty list when no links are configured', async () => {
    stubCmsResponse({ links: null });

    await expect(getNavLinks()).resolves.toEqual([]);
  });
});
