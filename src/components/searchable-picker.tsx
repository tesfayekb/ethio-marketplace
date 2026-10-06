import { useEffect, useState, type KeyboardEvent, type ReactNode, type RefObject } from "react";

import { Check } from "lucide-react";

import { Z_POPOVER } from "@/components/layout/layers";

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
      const bar = document.querySelector<HTMLElement>('[data-testid="form-layout-actions"]');
      const barTop =
        bar !== null && window.getComputedStyle(bar).position === "sticky"
          ? bar.getBoundingClientRect().top
          : window.innerHeight;
      const roomBelow = Math.min(barTop, window.innerHeight) - rect.bottom - 4;
      const roomAbove = rect.top - 4;
      const listHeight = Math.min(256, 44 * rowCount + 2);
      const next = roomBelow >= listHeight ? "down" : roomAbove > roomBelow ? "up" : "down";
      setPlacement((prev) => (prev === next ? prev : next));
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
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

/** The class a picker's list box opens with, for its placement. */
export function pickerPopClass(placement: PickerPlacement): string {
  return `absolute ${Z_POPOVER} ${placement === "up" ? "bottom-full mb-1" : "top-full mt-1"}`;
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
      className={`flex min-h-11 w-full items-center px-3 text-start text-sm text-foreground ${
        highlighted ? "bg-accent" : ""
      } ${className}`}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onPick}
    >
      {children}
      {selected && (
        <Check
          aria-hidden="true"
          data-testid={`${testId}-check`}
          className="ms-auto h-4 w-4 shrink-0 text-primary"
        />
      )}
    </button>
  );
}
