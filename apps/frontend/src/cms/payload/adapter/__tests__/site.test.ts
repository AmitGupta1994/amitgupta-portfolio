import { describe, it, expect } from 'vitest';
import { forSite } from '../site';

const docs = [
  { id: 1, name: 'coding role', placements: null },
  { id: 2, name: 'research role', placements: [{ site: 'research', order: 0 }] },
  { id: 3, name: 'other research role', placements: [{ site: 'research', order: 1 }] },
  { id: 4, name: 'trek role', placements: [{ site: 'trek', order: 0 }] },
];

describe('forSite', () => {
  it('leaves the main portfolio order untouched', () => {
    expect(forSite(docs, 'personal')).toEqual(docs);
  });

  it('keeps only the items placed on that site, in their placement order', () => {
    expect(forSite(docs, 'research').map((d) => d.name)).toEqual(['research role', 'other research role']);
  });

  it('falls back to every item when nothing is curated yet', () => {
    const untagged = [
      { id: 1, name: 'a', placements: null },
      { id: 2, name: 'b', placements: [] },
    ];
    expect(forSite(untagged, 'research')).toEqual(untagged);
  });
});
