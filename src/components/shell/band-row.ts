/**
 * D258 (Foundations turn R1d-c) — ONE HEIGHT FOR EVERY BAND ROW. The panel tabs row, the
 * breadcrumb row, the location row and the menu's band are each one band row: 40 px, the
 * rule line included (border-box). Every band row carries `data-band-row` and reads this
 * class; nothing else writes their height (CF-BAND-1, scripts/conformance/shell-bands.test.ts).
 */
export const BAND_ROW = "h-10 min-h-10 max-h-10 shrink-0";

/** D260 / P-S7 — one theme-driven look for every band and its containing sub-band. */
export const BAND_LOOK = {
  row: "bg-band text-band-label shadow-groove",
  stack: "bg-band shadow-subband",
  heading: "text-xs font-bold uppercase tracking-[1.2px] text-band-label",
} as const;
