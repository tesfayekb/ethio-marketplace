/**
 * D267 (turn F4a, DEC-315) — THE VISIBLE AREA. The one reader of the part of the screen an
 * open list may use: below every displayed `data-chrome="top"` element (the fixed top band,
 * the sticky sub-band) and above every displayed `data-chrome="bottom"` element (the phone
 * bottom bar, a sticky form action bar). With no marker drawn it falls back to the page's
 * own scroll-padding (styles.css), never to zero chrome. Read only on demand — by the
 * facade's impl and the searchable picker (CF-AREA-1), never on first paint.
 *
 * Sage S5 (ruling 1, answer 2) — the ad page's sticky section bar stands at the top chrome's
 * edge with no margin: `watchChromeTop` is the one observer of that edge, fetched on demand by
 * listing-detail.tsx (CF-AREA-1 names it), so no page measures the bands itself.
 */

export type VisibleArea = { top: number; bottom: number };

/** The margin an open list keeps inside each edge of the visible area. */
export const AREA_MARGIN = 8;

type Box = { top: number; bottom: number; shown: boolean };

/** Pure core: the area from the chrome boxes, the viewport height and the fallback padding. */
export function areaFrom(
  tops: Box[],
  bottoms: Box[],
  viewportHeight: number,
  fallback: { top: number; bottom: number },
  margin = AREA_MARGIN,
): VisibleArea {
  const shownTops = tops.filter((box) => box.shown);
  const shownBottoms = bottoms.filter((box) => box.shown);
  const top =
    shownTops.length > 0 ? Math.max(0, ...shownTops.map((box) => box.bottom)) : fallback.top;
  const bottom =
    shownBottoms.length > 0
      ? Math.min(viewportHeight, ...shownBottoms.map((box) => box.top))
      : viewportHeight - fallback.bottom;
  return { top: top + margin, bottom: Math.max(top, bottom) - margin };
}

function boxes(edge: "top" | "bottom"): Box[] {
  return Array.from(document.querySelectorAll<HTMLElement>(`[data-chrome="${edge}"]`)).map(
    (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      const placed = edge === "top" || style.position === "fixed" || style.position === "sticky";
      return {
        top: rect.top,
        bottom: rect.bottom,
        shown: placed && style.display !== "none" && rect.height > 0,
      };
    },
  );
}

function px(value: string): number {
  const number = Number.parseFloat(value);
  return Number.isFinite(number) ? number : 0;
}

/** The visible area now, in viewport pixels, `margin` inside each edge. */
export function visibleArea(margin = AREA_MARGIN): VisibleArea {
  const html = window.getComputedStyle(document.documentElement);
  return areaFrom(
    boxes("top"),
    boxes("bottom"),
    window.innerHeight,
    { top: px(html.scrollPaddingTop), bottom: px(html.scrollPaddingBottom) },
    margin,
  );
}

/**
 * The top chrome's lower edge (no margin), told now and again whenever a top marker changes
 * size or the window does; the answer stops the watch.
 */
export function watchChromeTop(onTop: (top: number) => void): () => void {
  const tell = () => onTop(visibleArea(0).top);
  tell();
  const resize = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(tell);
  for (const element of document.querySelectorAll<HTMLElement>('[data-chrome="top"]'))
    resize?.observe(element);
  window.addEventListener("resize", tell);
  return () => {
    resize?.disconnect();
    window.removeEventListener("resize", tell);
  };
}

/** The facade's per-side collision padding, from the visible area (D267). */
export function collisionPaddingNow(side = 16): {
  top: number;
  bottom: number;
  left: number;
  right: number;
} {
  const area = visibleArea();
  return {
    top: area.top,
    bottom: Math.max(0, window.innerHeight - area.bottom),
    left: side,
    right: side,
  };
}
