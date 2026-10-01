import { describe, expect, it } from 'vitest';
import { mapSite } from '../sites';

const doc = {
  title: 'Research',
  tagline: 'Gait analysis',
  name: 'Amit Gupta',
  headline: 'Researcher',
  image: null,
  imageUrl: 'https://github.com/amitgupta1994.png',
  mainSiteUrl: 'https://guptaamit.com.np',
  contact: { email: 'a@example.com', phone: '1', linkedin: 'https://linkedin.com/in/x', whatsapp: null },
  summary: 'Where <strong>research</strong> meets engineering.',
  hero: {
    title: 'Measuring how people move',
    description: [{ text: 'Published work on ', highlight: null }, { text: 'gait analysis', highlight: true }],
    cta: { label: 'Get in touch', href: '/#contact' },
  },
  nav: [{ name: 'Home', href: '/#hero' }],
  seo: { title: 'Amit Gupta | Research', description: 'Published research' },
};

describe('mapSite', () => {
  it('maps a site global into site content and its profile', () => {
    const site = mapSite(doc, 'research');

    expect(site.key).toBe('research');
    expect(site.title).toBe('Research');
    expect(site.navLinks).toEqual([{ name: 'Home', href: '/#hero' }]);
    expect(site.profile.name).toBe('Amit Gupta');
    expect(site.profile.summary).toContain('<strong>research</strong>');
    expect(site.profile.mainSiteUrl).toBe('https://guptaamit.com.np');
    expect(site.profile.hero.title).toBe('Measuring how people move');
    expect(site.profile.hero.description).toEqual([
      { text: 'Published work on ', highlight: false },
      { text: 'gait analysis', highlight: true },
    ]);
  });

  it('turns empty optional contact fields into undefined', () => {
    const { contact } = mapSite(doc, 'research').profile;
    expect(contact.linkedin).toBe('https://linkedin.com/in/x');
    expect(contact.whatsapp).toBeUndefined();
    expect(contact.github).toBeUndefined();
  });

  it('tolerates an empty global so a fresh deploy still builds', () => {
    const site = mapSite({}, 'trek');
    expect(site.title).toBe('trek');
    expect(site.navLinks).toEqual([]);
    expect(site.profile.name).toBe('');
    expect(site.profile.hero.cta.href).toBe('/#contact');
  });
});
