/**
 * INC-389 — the same grid the door writes to `pin_show_*` for an approx pin
 * (two decimals, 0.01° ≈ 1.1 km), so the seller sees what a buyer will see.
 */
const SNAP = 0.01;

export function snap(value: number): number {
  return Math.round(value / SNAP) * SNAP;
}
