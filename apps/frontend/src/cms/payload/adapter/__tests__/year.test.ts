import { describe, it, expect } from 'vitest';
import { groupByYear, yearFrom } from '@/lib/year';

describe('yearFrom', () => {
  it('reads the year from the CMS date strings', () => {
    expect(yearFrom('2024, September')).toBe(2024);
    expect(yearFrom('08/08/2023 - 08/12/2024')).toBe(2023);
    expect(yearFrom('07/01/2024 - Current')).toBe(2024);
  });

  it('returns undefined when there is no year', () => {
    expect(yearFrom('Current')).toBeUndefined();
  });
});

describe('groupByYear', () => {
  it('groups newest first and keeps the given order inside a year', () => {
    const items = [
      { id: 'a', date: '2023, March' },
      { id: 'b', date: '2024, September' },
      { id: 'c', date: '2023, August' },
      { id: 'd', date: 'undated' },
    ];

    const groups = groupByYear(items, (item) => item.date);

    expect(groups.map((group) => group.year)).toEqual([2024, 2023, undefined]);
    expect(groups[1].items.map((item) => item.id)).toEqual(['a', 'c']);
  });
});
