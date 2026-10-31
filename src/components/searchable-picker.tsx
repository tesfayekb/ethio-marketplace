import { useEffect, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";

import { Check } from "lucide-react";

import { Z_POPOVER } from "@/components/layout/layers";
import { visibleArea, type VisibleArea } from "@/lib/visible-area";
import {
  LIST_ROW,
  LIST_ROW_CURRENT,
  LIST_ROW_HIGHLIGHT,
  LIST_SCROLLER,
  LIST_SURFACE,
  LIST_TICK,
  OPEN_CONTROL,
} from "@/components/shell/menu-row";

/**
 * Bundle 4 step 11 — ONE PICKER. The currency box and the phone-country box
 * share this: one keyboard behaviour (arrows move, Enter picks, Escape closes),
 * one opening rule (INC-280: the list opens below unless the room under the
 * box, above a sticky action bar, is short and the room above is larger) and
 * one search box behaviour (each keystroke filters and resets the highlight).
 * What a needle matches stays each list's own (a code or a name).
 */

export type PickerPlacement = "up" | "down";

/**
 * D267 (F4a) — where an open list goes, inside the visible area. Down when it fits;
 * when the room below is short and the page can scroll, scroll the control up to the
 * area's top and open down; only when the page cannot scroll far enough, the larger
 * side. The height is bounded by the room on the chosen side.
 */
export function placeList(
  rect: Pick<DOMRect, "top" | "bottom">,
  wanted: number,
  area: VisibleArea,
  scrollRoom: number,
): { side: PickerPlacement; maxHeight: number; scrollBy: number } {
  const below = area.bottom - rect.bottom;
  if (below >= wanted) return { side: "down", maxHeight: wanted, scrollBy: 0 };
  const scrollBy = Math.max(0, Math.min(rect.top - area.top, scrollRoom, wanted - below));
  const after = below + scrollBy;
  const above = rect.top - scrollBy - area.top;
  if (after >= wanted || after >= above) {
    return { side: "down", maxHeight: Math.max(0, Math.min(wanted, after)), scrollBy };
  }
  return { side: "up", maxHeight: Math.max(0, Math.min(wanted, above)), scrollBy };
}

/** D267 ruling 3 — scroll, then run `done` once the position has settled (scrollend or two
 *  still frames); instant under reduced motion. */
function scrollThenPlace(distance: number, done: () => void) {
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
  window.scrollBy({ top: distance, behavior: reduced ? "instant" : "smooth" });
  let last = window.scrollY;
  let still = 0;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    window.removeEventListener("scrollend", finish);
    done();
  };
  window.addEventListener("scrollend", finish, { once: true });
  const tick = () => {
    if (finished) return;
    still = window.scrollY === last ? still + 1 : 0;
    last = window.scrollY;
    if (still >= 2) finish();
    else requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/** INC-280 — where the list opens, re-judged on resize while open. */
export function usePickerPlacement(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  rowCount: number,
): PickerPlacement {
  const [placement, setPlacement] = useState<PickerPlacement>("down");
  useEffect(() => {
    if (!open) return;
    const anchor = anchorRef.current;
    if (anchor === null) return;
    const place = () => {
      const rect = anchor.getBoundingClientRect();
      // The existing anchor is the currency input or the whole phone field. The
      // picker owns both its list geometry and the control's open state (F3).
      const scope = anchor.matches("input") ? anchor.parentElement : anchor;
      const panel = scope?.querySelector<HTMLElement>("[data-placement]");
      const control = anchor.matches("input")
        ? anchor
        : anchor.querySelector<HTMLElement>('[aria-haspopup="listbox"]');
      if (control !== null) {
        control.classList.add(...OPEN_CONTROL.split(" "));
        control.dataset.state = "open";
      }
      if (panel !== null && panel !== undefined) {
        const rtl = window.getComputedStyle(anchor).direction === "rtl";
        const geometry = pickerGeometry(rect, panel.scrollWidth, window.innerWidth, rtl);
        panel.dataset.align = geometry.align;
        panel.style.setProperty("--picker-min-width", `${geometry.anchorWidth}px`);
        panel.style.setProperty("--picker-max-width", `${geometry.availableWidth}px`);
      }
      if (panel === null || panel === undefined) {
        setPlacement("down");
        return;
      }
      // D267 — measure the list's natural height (its own class caps), then place it
      // inside the visible area; a scroll first ends before it is measured again.
      panel.style.removeProperty("--picker-max-height");
      const wanted = panel.getBoundingClientRect().height || Math.min(256, 44 * rowCount + 2);
      const page = document.scrollingElement ?? document.documentElement;
      const scrollRoom = settled
        ? 0
        : Math.max(0, page.scrollHeight - window.innerHeight - window.scrollY);
      const plan = placeList(rect, wanted, visibleArea(), scrollRoom);
      delete panel.dataset.settled;
      if (plan.scrollBy > 0) {
        // Opacity, not visibility: a hidden list would drop its search box's focus and close.
        panel.style.opacity = "0";
        panel.style.pointerEvents = "none";
        scrollThenPlace(plan.scrollBy, () => {
          if (!alive) return;
          settled = true;
          place();
        });
        return;
      }
      panel.style.setProperty("--picker-max-height", `${plan.maxHeight}px`);
      panel.style.opacity = "";
      panel.style.pointerEvents = "";
      setPlacement((prev) => (prev === plan.side ? prev : plan.side));
      // F4b (LY-6) — the list is placed and the scroll has ended: a test measures after this.
      // Set after React draws the side, so the mark never precedes the final placement.
      const mark = (tries: number) => {
        if (!alive) return;
        if (panel.dataset.placement === plan.side) panel.dataset.settled = "true";
        else if (tries > 0) requestAnimationFrame(() => mark(tries - 1));
      };
      requestAnimationFrame(() => mark(10));
    };
    let settled = false;
    let alive = true;
    place();
    window.addEventListener("resize", place);
    return () => {
      alive = false;
      window.removeEventListener("resize", place);
      const control = anchor.matches("input")
        ? anchor
        : anchor.querySelector<HTMLElement>('[aria-haspopup="listbox"]');
      if (control !== null && control !== undefined) control.dataset.state = "closed";
    };
  }, [anchorRef, open, rowCount]);
  return placement;
}

/** The one keyboard behaviour of a search box driving a list of `count` rows. */
export function usePickerKeys({
  count,
  onPick,
  onEscape,
  onOpen,
}: {
  count: number;
  onPick: (index: number) => void;
  onEscape: () => void;
  /** Called on ArrowDown, for a box whose list may be closed. */
  onOpen?: () => void;
}) {
  const [highlight, setHighlight] = useState(0);
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      onOpen?.();
      setHighlight((index) => Math.min(index + 1, Math.max(count - 1, 0)));
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((index) => Math.max(index - 1, 0));
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (highlight < count) onPick(highlight);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      onEscape();
    }
  };
  return { highlight, setHighlight, onKeyDown };
}

/** D267 (F4a-2) — the part of a picker's panel that scrolls its rows: the mechanism's,
 *  never a consumer's own height. */
export { LIST_SCROLLER };

/** The class a picker's list box opens with, for its placement: against the box's edge
 *  (no gap, D264), on the open list's one surface. */
export function pickerPopClass(placement: PickerPlacement): string {
  return `absolute ${Z_POPOVER} ${placement === "up" ? "bottom-full" : "top-full"} ${LIST_SURFACE} flex flex-col max-h-[var(--picker-max-height,16rem)] w-max min-w-[var(--picker-min-width,100%)] max-w-[var(--picker-max-width,calc(100vw-2rem))] data-[align=start]:start-0 data-[align=end]:end-0`;
}

/** F3 — one horizontal rule, logical start first, end when start crosses the gutter. */
export function pickerGeometry(
  rect: Pick<DOMRect, "left" | "right" | "width">,
  contentWidth: number,
  viewportWidth: number,
  rtl = false,
): { align: "start" | "end"; anchorWidth: number; availableWidth: number } {
  const gutter = 16;
  const startRoom = rtl ? rect.right - gutter : viewportWidth - gutter - rect.left;
  const endRoom = rtl ? viewportWidth - gutter - rect.left : rect.right - gutter;
  const width = Math.min(Math.max(rect.width, contentWidth), viewportWidth - gutter * 2);
  const align = width <= startRoom ? "start" : "end";
  return {
    align,
    anchorWidth: rect.width,
    availableWidth: Math.min(viewportWidth - gutter * 2, align === "start" ? startRoom : endRoom),
  };
}

/** One option row: 44px tall, highlighted by the keyboard, never stealing focus. */
export function PickerOption({
  id,
  selected,
  highlighted,
  testId,
  data,
  onPick,
  className = "",
  children,
}: {
  id?: string;
  selected: boolean;
  highlighted: boolean;
  testId: string;
  data: Record<string, string>;
  onPick: () => void;
  className?: string;
  children: ReactNode;
}) {
  const dataAttrs = Object.fromEntries(
    Object.entries(data).map(([key, value]) => [`data-${key}`, value]),
  );
  return (
    <button
      type="button"
      id={id}
      role="option"
      aria-selected={selected}
      data-testid={testId}
      {...dataAttrs}
      className={`${LIST_ROW} ${selected ? LIST_ROW_CURRENT : highlighted ? LIST_ROW_HIGHLIGHT : ""} ${className}`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onPick}
    >
      {children}
      {selected && (
        <Check aria-hidden="true" data-testid={`${testId}-check`} className={LIST_TICK} />
      )}
    </button>
  );
}
