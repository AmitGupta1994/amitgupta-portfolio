import { afterEach, describe, it, expect, vi } from 'vitest';
import { getNavLinks } from '../navigation';

const findGlobal = vi.fn();

vi.mock('@/lib/payload', () => ({
  payloadClient: async () => ({ findGlobal }),
}));

afterEach(() => {
  findGlobal.mockReset();
});

describe('getNavLinks', () => {
  it('returns the navigation links from the CMS', async () => {
    findGlobal.mockResolvedValue({
      links: [
        { id: 'a', name: 'Home', href: '/#hero' },
        { id: 'b', name: 'Contact', href: '/#contact' },
      ],
    });

    await expect(getNavLinks()).resolves.toEqual([
      { name: 'Home', href: '/#hero' },
      { name: 'Contact', href: '/#contact' },
    ]);
    expect(findGlobal).toHaveBeenCalledWith({ slug: 'navigation', depth: 0 });
  });

  it('returns an empty list when no links are configured', async () => {
    findGlobal.mockResolvedValue({ links: null });

    await expect(getNavLinks()).resolves.toEqual([]);
  });
});
