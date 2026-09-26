/**
 * Pulls a display year out of the free-text dates the CMS stores
 * ("2024, September", "08/08/2023 - 08/12/2024"). Returns undefined when there
 * is no 4-digit year to find, so callers can group those separately.
 */
export function yearFrom(value: string): number | undefined {
  const years = value.match(/\b(19|20)\d{2}\b/g);
  if (!years) return undefined;
  // Ranges read best under the year they started.
  return Number(years[0]);
}

/** Groups items by year, newest first, keeping the given order inside a year. */
export function groupByYear<T>(items: T[], dateOf: (item: T) => string): Array<{ year?: number; items: T[] }> {
  const groups = new Map<number | undefined, T[]>();
  for (const item of items) {
    const year = yearFrom(dateOf(item));
    const bucket = groups.get(year);
    if (bucket) bucket.push(item);
    else groups.set(year, [item]);
  }
  return [...groups.entries()]
    .map(([year, group]) => ({ year, items: group }))
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}
