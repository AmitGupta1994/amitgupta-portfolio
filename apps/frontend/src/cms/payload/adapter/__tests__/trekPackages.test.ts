import { describe, expect, it } from 'vitest';
import { mapTrekPackage, upcomingDepartures } from '../trekPackages';

const doc = {
  id: 1,
  slug: 'everest-base-camp',
  title: 'Everest Base Camp',
  summary: 'The classic Khumbu route.',
  heroImage: null,
  heroImageUrl: 'https://images.unsplash.com/photo.jpg',
  difficulty: null,
  priceFrom: '',
  featured: null,
  itinerary: [{ day: '1', title: 'Fly to Lukla', description: null }],
  includes: [{ text: 'Guide' }],
  excludes: null,
  departures: [
    { startDate: '2026-11-02T00:00:00.000Z', status: 'limited' },
    { startDate: '2026-10-01T00:00:00.000Z', endDate: null, price: 'USD 1,400', status: null },
  ],
};

describe('mapTrekPackage', () => {
  it('falls back to the external hero, defaults difficulty and treats an empty price as unset', () => {
    const trek = mapTrekPackage(doc);
    expect(trek.heroImageUrl).toBe('https://images.unsplash.com/photo.jpg');
    expect(trek.difficulty).toBe('moderate');
    expect(trek.priceFrom).toBeUndefined();
    expect(trek.featured).toBe(false);
    expect(trek.itinerary).toEqual([{ day: '1', title: 'Fly to Lukla', description: undefined }]);
    expect(trek.includes).toEqual(['Guide']);
    expect(trek.excludes).toEqual([]);
  });

  it('sorts departures by date and defaults their status', () => {
    const { departures } = mapTrekPackage(doc);
    expect(departures.map((d) => d.startDate.slice(0, 10))).toEqual(['2026-10-01', '2026-11-02']);
    expect(departures[0]).toMatchObject({ price: 'USD 1,400', status: 'available' });
  });

  it('keeps only departures that have not started', () => {
    const trek = mapTrekPackage(doc);
    expect(upcomingDepartures(trek, new Date('2026-10-15')).map((d) => d.status)).toEqual(['limited']);
  });
});
