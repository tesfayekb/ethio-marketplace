/**
 * DEC-288 (turn R1b) — the side panel's pure geometry: where a panel opens beside
 * its trigger, and the safe triangle that keeps a row open while the pointer
 * travels to its panel. Reads nothing from the page; the caller passes rects.
 */
export type Box = { left: number; top: number; right: number; bottom: number };
export type Point = { x: number; y: number };

/** The hover intent's timings (D98): open after 150 ms at rest, close 300 ms after leaving. */
export const SUBMENU_OPEN_MS = 150;
export const SUBMENU_CLOSE_MS = 300;
/** The panel's own inset above its first row: the row, not the panel, is level with the trigger. */
export const PANEL_INSET = 4;
const MARGIN = 8;

export type Placement = { left: number; top: number; maxHeight: number; flipped: boolean };

/**
 * Opens at the inline end of `edge` (the rail or the parent panel), its first row level
 * with `anchor`. Flips to the inline start when it would overflow; a panel taller than the
 * room is clamped and scrolls inside. Never clipped.
 */
export function placePanel(input: {
  anchor: Box;
  edge: Box;
  size: { width: number; height: number };
  viewport: { width: number; height: number };
  rtl: boolean;
  minTop: number;
}): Placement {
  const { anchor, edge, size, viewport, rtl, minTop } = input;
  const atEnd = rtl ? edge.left - size.width : edge.right;
  const atStart = rtl ? edge.right : edge.left - size.width;
  const fitsEnd = rtl ? atEnd >= MARGIN : atEnd + size.width <= viewport.width - MARGIN;
  const fitsStart = rtl
    ? atStart + size.width <= viewport.width - MARGIN
    : atStart >= MARGIN;
  const flipped = !fitsEnd && fitsStart;
  const raw = flipped ? atStart : atEnd;
  const left = Math.max(MARGIN, Math.min(raw, viewport.width - MARGIN - size.width));
  const room = viewport.height - MARGIN - minTop;
  const maxHeight = Math.max(0, room);
  const height = Math.min(size.height, maxHeight);
  let top = anchor.top - PANEL_INSET;
  if (top + height > viewport.height - MARGIN) top = viewport.height - MARGIN - height;
  top = Math.max(minTop, top);
  return { left, top, maxHeight, flipped };
}

function side(p: Point, a: Point, b: Point): number {
  return (p.x - b.x) * (a.y - b.y) - (a.x - b.x) * (p.y - b.y);
}

/** True when `p` lies inside the triangle a-b-c (edges included). */
export function inTriangle(p: Point, a: Point, b: Point, c: Point): boolean {
  const d1 = side(p, a, b);
  const d2 = side(p, b, c);
  const d3 = side(p, c, a);
  const negative = d1 < 0 || d2 < 0 || d3 < 0;
  const positive = d1 > 0 || d2 > 0 || d3 > 0;
  return !(negative && positive);
}

/** The safe triangle: from where the pointer left the row to the panel's near corners. */
export function inSafeTriangle(p: Point, apex: Point, panel: Box, rtl: boolean): boolean {
  const near = rtl ? panel.right : panel.left;
  return inTriangle(p, apex, { x: near, y: panel.top }, { x: near, y: panel.bottom });
}
