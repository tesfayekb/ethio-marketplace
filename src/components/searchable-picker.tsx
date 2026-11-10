import { type ReactNode } from "react";

import { Check } from "lucide-react";

import {
  LIST_ROW,
  LIST_ROW_CURRENT,
  LIST_ROW_HIGHLIGHT,
  LIST_SCROLLER,
  LIST_TICK,
} from "@/components/shell/menu-row";

/**
 * Bundle 4 step 11 — ONE PICKER. The currency box and the phone-country box
 * share this: one keyboard behaviour (arrows move, Enter picks, Escape closes),
 * one opening rule (INC-280: the list opens below unless the room under the
 * box, above a sticky action bar, is short and the room above is larger) and
 * one search box behaviour (each keystroke filters and resets the highlight).
 * What a needle matches stays each list's own (a code or a name).
 */

/** D267 (F4a-2) — the part of a picker's panel that scrolls its rows: the mechanism's,
 *  never a consumer's own height. */
export { LIST_SCROLLER };

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
