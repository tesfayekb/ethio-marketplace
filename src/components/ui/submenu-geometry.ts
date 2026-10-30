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
/** D248 — the panel has no border (D245's surface withdrawn): its first row is its top. */
export const PANEL_INSET = 0;
/** D248 — the panel sits flush against the rail's (or parent panel's) edge. */
export const PANEL_OVERLAP = 0;
/** D247/D248 — a menu row's floor; below it a list scrolls. */
export const ROW_FLOOR = 32;
/** D245 — the panel fades in and out over 300 ms; a closing panel stays mounted this long. */
export const PANEL_FADE_MS = 300;
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
  const atEnd = rtl ? edge.left - size.width + PANEL_OVERLAP : edge.right - PANEL_OVERLAP;
  const atStart = rtl ? edge.right - PANEL_OVERLAP : edge.left - size.width + PANEL_OVERLAP;
  const fitsEnd = rtl ? atEnd >= MARGIN : atEnd + size.width <= viewport.width - MARGIN;
  const fitsStart = rtl ? atStart + size.width <= viewport.width - MARGIN : atStart >= MARGIN;
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

export type Snap = { top: number; rowHeight: number; height: number; scrolls: boolean };

/**
 * D248 (Foundations turn R1d-a) — the panel snaps to the main menu's row grid. Its rows
 * take the menu's row height and its first row sits on the opener's row; a panel that
 * would end below the menu's last row moves up by whole rows until its last row is level
 * with it. D254 (Foundations turn R1d-b): a panel never compacts — its rows always keep
 * the menu's measured row height; a panel taller than the menu takes the menu's whole
 * height (the whole rows that fit, top of its first to bottom of its last) and scrolls.
 */
export function snapToGrid(input: {
  openerTop: number;
  rowHeight: number;
  menuTop: number;
  menuBottom: number;
  count: number;
}): Snap {
  const { openerTop, rowHeight, menuTop, menuBottom, count } = input;
  const room = Math.max(0, menuBottom - menuTop);
  const natural = count * rowHeight;
  if (natural <= room + 0.5) {
    const over = openerTop + natural - menuBottom;
    const steps = over > 0.5 ? Math.ceil(over / rowHeight - 0.01) : 0;
    const top = Math.max(menuTop, openerTop - steps * rowHeight);
    return { top, rowHeight, height: natural, scrolls: false };
  }
  const rows = rowHeight > 0 ? Math.max(1, Math.floor(room / rowHeight + 0.01)) : 0;
  return { top: menuTop, rowHeight, height: rows * rowHeight, scrolls: true };
}
