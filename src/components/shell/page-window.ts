/**
 * BUNDLE 9 B3 — the page run: every page when count ≤ 7; otherwise the first,
 * the last, the current and one neighbour on each side, with ONE "gap"
 * wherever pages are left out. `current` is zero-based; pages are one-based.
 */
export function pageWindow(current: number, count: number): Array<number | "gap"> {
  if (count <= 0) return [];
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1);
  const page = current + 1;
  const keep = new Set([1, count, page - 1, page, page + 1].filter((n) => n >= 1 && n <= count));
  const out: Array<number | "gap"> = [];
  let last = 0;
  for (const n of [...keep].sort((a, b) => a - b)) {
    if (n - last > 1) out.push("gap");
    out.push(n);
    last = n;
  }
  return out;
}
