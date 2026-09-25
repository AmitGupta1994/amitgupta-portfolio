import { describe, it, expect } from 'vitest';
import { mapResearchPage } from '../research';

describe('mapResearchPage', () => {
  it('maps the research global', () => {
    const page = mapResearchPage({
      title: 'Research',
      tagline: 'Gait analysis',
      about: 'I work where <strong>research</strong> meets engineering.',
      nav: [{ name: 'Home', href: '/#hero' }],
      seo: { title: 'Amit Gupta | Research', description: 'Published research' },
    });

    expect(page.title).toBe('Research');
    expect(page.tagline).toBe('Gait analysis');
    expect(page.about).toContain('<strong>research</strong>');
    expect(page.navLinks).toEqual([{ name: 'Home', href: '/#hero' }]);
    expect(page.seo.title).toBe('Amit Gupta | Research');
  });

  it('falls back to sane defaults when the global is empty', () => {
    const page = mapResearchPage({});

    expect(page.title).toBe('Research');
    expect(page.tagline).toBeUndefined();
    expect(page.about).toBe('');
    expect(page.navLinks).toEqual([]);
    expect(page.seo).toEqual({ title: undefined, description: undefined });
  });
});
