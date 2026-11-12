/** DEC-192 candidates, with INC-753's page-end exception. */
export function currentListingSection(
  items: readonly { target: string; shown: boolean; top: number; inBand: boolean }[],
  current: string,
  viewportHeight: number,
  atEnd: boolean,
): string {
  // INC-753 — at the end of the page the last section on screen is current: a section near the end can never reach the band.
  if (atEnd) {
    const last = items
      .filter((item) => item.shown && item.top >= 0 && item.top < viewportHeight)
      .at(-1);
    if (last) return last.target;
  }
  const visible = items.filter((item) => item.inBand);
  if (visible.length === 0) return current;
  const minTop = Math.min(...visible.map((item) => item.top));
  const candidates = visible.filter((item) => item.shown && item.top - minTop <= 8);
  if (candidates.some((item) => item.target === current)) return current;
  return candidates[0]?.target ?? current;
}
