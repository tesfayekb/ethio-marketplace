import { cn } from "@/lib/utils";

/**
 * D258 (Foundations turn R1d-c) — ONE HEIGHT FOR EVERY BAND ROW. The panel tabs row, the
 * breadcrumb row, the location row and the menu's band are each one band row: 40 px, the
 * rule line included (border-box). Every band row carries `data-band-row` and reads this
 * class; nothing else writes their height (CF-BAND-1, scripts/conformance/shell-bands.test.ts).
 */
export const BAND_ROW = "h-10 min-h-10 max-h-10 shrink-0";

/** D260 / D266 — content bands share their look; the rail header has its own surface. */
export const BAND_LOOK = {
  row: "bg-band text-band-label shadow-groove",
  stack: "bg-band band-drop",
  heading: "text-xs font-bold uppercase tracking-[1.2px] text-band-label",
} as const;

/** D265 — the current-item pill belongs only to the phone bottom bar. */
export const CURRENT_PILL = "rounded-full bg-nav-pill shadow-pill text-nav-ink";

/** D265 — the three content rows share the location track and segment geometry. */
export const BAND_TRACK = "flex h-8.5 items-center rounded-track bg-track p-0.75 shadow-track";
export const BAND_SEGMENT =
  "inline-flex h-7 shrink items-center rounded-segment px-1.25 md:px-2.5 text-xs md:text-[13px] whitespace-nowrap";
export const BAND_SEGMENT_IDLE = "bg-transparent font-medium text-foreground";
export const BAND_SEGMENT_CURRENT = "bg-card shadow-segment font-semibold text-nav-ink";
/** Trail-specific flex allocation preserves five graphemes without wrapping separators. */
export const BAND_CRUMB_TRACK = `${BAND_TRACK} min-w-0 gap-0 sm:gap-0 [&_li]:min-w-min [&_li]:shrink [&_li[aria-hidden]]:shrink-0`;
export const BAND_CRUMB = `${BAND_SEGMENT} min-w-min max-w-full font-medium text-foreground`;
export const BAND_CRUMB_CURRENT = cn(BAND_CRUMB, BAND_SEGMENT_CURRENT);
/** D266 — the menu's header is rail surface, one bottom groove, still BAND_ROW tall. */
export const RAIL_HEADER = "bg-sidebar text-band-label shadow-groove";
