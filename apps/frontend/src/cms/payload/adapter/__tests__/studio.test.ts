import { describe, expect, it } from 'vitest';
import { mapClient, mapPackage, mapReview, mapService, mapTeamMember } from '../studio';

describe('mapService', () => {
  it('maps nulls to undefined and defaults the icon', () => {
    expect(
      mapService({ id: 1, title: 'Brand Identity', icon: null, description: 'Logos and voice.', details: null })
    ).toEqual({ id: '1', title: 'Brand Identity', icon: 'megaphone', description: 'Logos and voice.', details: undefined });
  });
});

describe('mapPackage', () => {
  it('flattens features and coerces the popular flag', () => {
    expect(
      mapPackage({
        id: 2,
        name: 'Growth',
        price: 'NPR 25,000',
        period: null,
        description: 'Monthly growth.',
        features: [{ text: 'Two platforms' }, { text: 'Meta ads' }],
        popular: null,
      })
    ).toEqual({
      id: '2',
      name: 'Growth',
      price: 'NPR 25,000',
      period: undefined,
      description: 'Monthly growth.',
      features: ['Two platforms', 'Meta ads'],
      popular: false,
    });
  });
});

describe('mapReview', () => {
  it('clamps the rating to 1–5 stars', () => {
    const review = { id: 3, name: 'Client', text: 'Great work.' };
    expect(mapReview({ ...review, rating: 9 }).rating).toBe(5);
    expect(mapReview({ ...review, rating: 0 }).rating).toBe(1);
    expect(mapReview({ ...review, rating: null }).rating).toBe(5);
  });
});

describe('mapTeamMember', () => {
  it('prefers an uploaded photo over the external URL', () => {
    const member = { id: 4, name: 'Sita Rai', role: 'Designer', photoUrl: 'https://example.com/a.jpg' };
    expect(mapTeamMember({ ...member, photo: { id: 9, url: '/api/voxelate-photos/file/sita.jpg' } }).photoUrl).toBe(
      '/api/voxelate-photos/file/sita.jpg'
    );
    expect(mapTeamMember({ ...member, photo: 9 }).photoUrl).toBe('https://example.com/a.jpg');
    expect(mapTeamMember({ ...member, photoUrl: null }).photoUrl).toBeUndefined();
  });
});

describe('mapClient', () => {
  it('falls back to no logo, so the name is shown instead', () => {
    expect(mapClient({ id: 5, name: 'Acme', logo: null, logoUrl: null, website: null })).toEqual({
      id: '5',
      name: 'Acme',
      logoUrl: undefined,
      website: undefined,
    });
  });
});
