/**
 * Bundle 3 Part D (INC-401) — PLACE LISTS FROM A TO Z.
 *
 * Every list of regions, cities and sub-cities a person picks from is ordered
 * by the name shown, in the reader's language (Intl.Collator of the UI
 * language). The database order (display_order, then English name) is not
 * consulted. Countries keep their own order and do not pass through here.
 *
 * Ties keep their incoming order (Array.prototype.sort is stable).
 */
const collators = new Map<string, Intl.Collator>();

function collatorFor(language: string): Intl.Collator {
  let found = collators.get(language);
  if (found === undefined) {
    found = new Intl.Collator(language, { sensitivity: "base", numeric: true });
    collators.set(language, found);
  }
  return found;
}

export function sortPlacesByName<T>(
  rows: readonly T[],
  nameOf: (row: T) => string,
  language: string,
): T[] {
  const collator = collatorFor(language);
  return rows
    .map((row) => ({ row, name: nameOf(row) }))
    .sort((a, b) => collator.compare(a.name, b.name))
    .map((entry) => entry.row);
}
