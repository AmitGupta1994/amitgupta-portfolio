import { describe, expect, it } from 'vitest';
import { mapPackage, mapReview, mapService } from '../creatives';

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
