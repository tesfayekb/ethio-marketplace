/**
 * Bundle 7 B2 — THE CURRENT CHOICE IS DRAWN FIRST while the list is open,
 * whether or not it matches the search; the matching rows follow and the chosen
 * row is not drawn twice. Keyboard order is the drawn order.
 */
export function chosenFirst<T>(
  rows: readonly T[],
  chosen: T | null,
  same: (a: T, b: T) => boolean,
): T[] {
  if (chosen === null) return [...rows];
  return [chosen, ...rows.filter((row) => !same(row, chosen))];
}
