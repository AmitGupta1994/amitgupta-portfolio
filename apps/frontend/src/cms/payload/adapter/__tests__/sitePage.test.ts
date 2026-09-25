import { describe, it, expect } from 'vitest';
import { mapSitePage } from '../sitePage';

describe('mapSitePage', () => {
  it('maps a site global', () => {
    const page = mapSitePage(
      {
        title: 'Research',
        tagline: 'Gait analysis',
        about: 'I work where <strong>research</strong> meets engineering.',
        nav: [{ name: 'Home', href: '/#hero' }],
        seo: { title: 'Amit Gupta | Research', description: 'Published research' },
      },
      'research'
    );

    expect(page.title).toBe('Research');
    expect(page.tagline).toBe('Gait analysis');
    expect(page.about).toContain('<strong>research</strong>');
    expect(page.navLinks).toEqual([{ name: 'Home', href: '/#hero' }]);
    expect(page.seo.title).toBe('Amit Gupta | Research');
    expect(page.hero).toBeUndefined();
  });

  it('falls back to the site name when the global is empty', () => {
    expect(mapSitePage({}, 'trek').title).toBe('Trek');
    expect(mapSitePage({}, 'research').title).toBe('Research');
    expect(mapSitePage({}, 'trek').navLinks).toEqual([]);
  });

  it('returns a hero override only when something was written', () => {
    expect(mapSitePage({ hero: { title: null, description: null } }, 'trek').hero).toBeUndefined();
    expect(mapSitePage({ hero: { title: 'Walking the Himalaya' } }, 'trek').hero).toEqual({
      title: 'Walking the Himalaya',
      description: undefined,
    });
  });
});
