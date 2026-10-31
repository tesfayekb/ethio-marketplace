import { useEffect, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";

import { Check } from "lucide-react";

import { Z_POPOVER } from "@/components/layout/layers";
import {
  LIST_ROW,
  LIST_ROW_CURRENT,
  LIST_ROW_HIGHLIGHT,
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

/** INC-280 — where the list opens, re-judged on resize while open. */
export function usePickerPlacement(
  anchorRef: RefObject<HTMLElement | null>,
  open: boolean,
  rowCount: number,
): PickerPlacement {
  const [placement, setPlacement] = useState<PickerPlacement>("down");
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const anchor = anchorRef.current;
      if (anchor === null) return;
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
        const controlRect = control?.getBoundingClientRect() ?? rect;
        const geometry = pickerGeometry(controlRect, panel.scrollWidth, window.innerWidth, rtl);
        panel.dataset.align = geometry.align;
        panel.style.setProperty("--picker-min-width", `${geometry.minWidth}px`);
        panel.style.setProperty("--picker-max-width", `${geometry.maxWidth}px`);
        panel.style.setProperty("--picker-start", `${rtl ? rect.right - controlRect.right : controlRect.left - rect.left}px`);
        panel.style.setProperty("--picker-end", `${rtl ? controlRect.left - rect.left : rect.right - controlRect.right}px`);
      }
      const bar = document.querySelector<HTMLElement>('[data-testid="form-layout-actions"]');
      const barTop =
        bar !== null && window.getComputedStyle(bar).position === "sticky"
          ? bar.getBoundingClientRect().top
          : window.innerHeight;
      // C2e — the phone bottom bar, when displayed, is a floor too.
      const bottomBar = document.querySelector<HTMLElement>('[data-testid="bottom-bar"]');
      const bottomBarTop =
        bottomBar !== null && window.getComputedStyle(bottomBar).display !== "none"
          ? bottomBar.getBoundingClientRect().top
          : window.innerHeight;
      const roomBelow = Math.min(barTop, bottomBarTop, window.innerHeight) - rect.bottom - 4;
      const roomAbove = rect.top - 4;
      const listHeight = Math.min(256, 44 * rowCount + 2);
      const next = roomBelow >= listHeight ? "down" : roomAbove > roomBelow ? "up" : "down";
      setPlacement((prev) => (prev === next ? prev : next));
    };
    place();
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("resize", place);
      const anchor = anchorRef.current;
      const control = anchor?.matches("input")
        ? anchor
        : anchor?.querySelector<HTMLElement>('[aria-haspopup="listbox"]');
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

/** The class a picker's list box opens with, for its placement: against the box's edge
 *  (no gap, D264), on the open list's one surface. */
export function pickerPopClass(placement: PickerPlacement): string {
  return `absolute ${Z_POPOVER} ${placement === "up" ? "bottom-full" : "top-full"} ${LIST_SURFACE} w-max min-w-[var(--picker-min-width,100%)] max-w-[var(--picker-max-width,calc(100vw-2rem))] data-[align=start]:start-[var(--picker-start,0px)] data-[align=end]:end-[var(--picker-end,0px)]`;
}

/** F3 — one horizontal rule, logical start first, end when start crosses the gutter. */
export function pickerGeometry(
  rect: Pick<DOMRect, "left" | "right" | "width">,
  contentWidth: number,
  viewportWidth: number,
  rtl = false,
): { align: "start" | "end"; minWidth: number; maxWidth: number } {
  const gutter = 16;
  const startRoom = rtl ? rect.right - gutter : viewportWidth - gutter - rect.left;
  const endRoom = rtl ? viewportWidth - gutter - rect.left : rect.right - gutter;
  const width = Math.min(Math.max(rect.width, contentWidth), viewportWidth - gutter * 2);
  const align = width <= startRoom ? "start" : "end";
  return {
    align,
    minWidth: rect.width,
    maxWidth: Math.min(viewportWidth - gutter * 2, align === "start" ? startRoom : endRoom),
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
