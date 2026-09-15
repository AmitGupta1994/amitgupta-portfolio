import { describe, it, expect } from 'vitest';
import { mapProfile, type CmsProfile } from '../profile';

const doc: CmsProfile = {
  name: 'Amit Gupta',
  headline: 'Lead Engineer | Full Stack Engineer (Backend-Focused)',
  summary: 'As a Tech Lead with <strong>7+ years</strong> of experience.',
  image: null,
  imageUrl: 'https://github.com/amitgupta1994.png',
  contact: {
    email: 'jamitgupta1994@gmail.com',
    phone: '(+977) 9843944663',
    whatsapp: null,
    location: 'Kathmandu (Nepal)',
    freelancer: null,
    linkedin: 'https://www.linkedin.com/in/iamamitgupta1994/',
    github: 'https://github.com/amitgupta1994',
    googleScholar: null,
  },
};

describe('mapProfile', () => {
  it('maps basic profile details and falls back to the external image URL', () => {
    const profile = mapProfile(doc);

    expect(profile.name).toBe('Amit Gupta');
    expect(profile.headline).toContain('Lead Engineer');
    expect(profile.summary).toContain('<strong>7+ years</strong>');
    expect(profile.imageUrl).toBe('https://github.com/amitgupta1994.png');
  });

  it('turns empty CMS contact fields into undefined', () => {
    const { contact } = mapProfile(doc);

    expect(contact.email).toContain('@');
    expect(contact.linkedin).toContain('linkedin.com');
    expect(contact.whatsapp).toBeUndefined();
    expect(contact.googleScholar).toBeUndefined();
  });

  it('prefers an uploaded image over the external URL', () => {
    const profile = mapProfile({ ...doc, image: { url: 'https://cms.example/api/media/file/me.png' } });

    expect(profile.imageUrl).toBe('https://cms.example/api/media/file/me.png');
  });
});
