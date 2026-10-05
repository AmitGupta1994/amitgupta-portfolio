import { describe, expect, it } from 'vitest';
import { mapTrek } from '../treks';

describe('mapTrek', () => {
  it('maps a trek with its hero image and gallery', () => {
    const trek = mapTrek({
      id: 3,
      slug: 'everest-base-camp',
      title: 'Everest Base Camp',
      region: 'Khumbu, Nepal',
      season: 'Mar–May, Sep–Nov',
      days: 13,
      maxAltitudeM: 5545,
      distanceKm: 130,
      summary: 'The classic Khumbu route.',
      body: null,
      heroImage: { id: 1, url: '/api/trek-photos/file/ebc.jpg', caption: 'Kala Patthar' },
      gallery: [
        { id: 2, url: '/api/trek-photos/file/namche.jpg', caption: 'Namche' },
        { id: 3, url: null, caption: 'missing file' },
      ],
    });

    expect(trek.id).toBe('3');
    expect(trek.heroImageUrl).toBe('/api/trek-photos/file/ebc.jpg');
    expect(trek.body).toBeUndefined();
    // the photo with no file can't be rendered, so it is dropped
    expect(trek.gallery.map((photo) => photo.caption)).toEqual(['Namche']);
  });

  it('handles unresolved relationships and no gallery', () => {
    const trek = mapTrek({
      id: 4,
      slug: 'annapurna-base-camp',
      title: 'Annapurna Base Camp',
      summary: 'Into the Sanctuary.',
      heroImage: 7,
      gallery: null,
    });

    expect(trek.heroImageUrl).toBeUndefined();
    expect(trek.gallery).toEqual([]);
    expect(trek.region).toBeUndefined();
  });
});
