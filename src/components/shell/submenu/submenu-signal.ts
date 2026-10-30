import type { KeyboardEvent, MouseEvent, PointerEvent } from "react";

import { askOverlays } from "@/components/ui/overlay-facade";

/**
 * DEC-288 (turn R1b) — THE SUB-MENU MECHANISM'S FIRST-PAINT HALF. A rail row that
 * owns sub-items is a trigger: its pointer, press and arrow-key events are signals.
 * Everything else — the hover intent (150 ms open, 300 ms close, D98), the safe
 * triangle, the side panel, its keys and placement — is the on-demand half
 * (src/components/ui/submenu-impl.tsx), fetched through the overlay loader
 * (DEC-259) on the first signal or the idle warm-up. A signal sent before it has
 * arrived waits as the one pending signal; a person's press or key whose code
 * fails to arrive reaches the shell's one notice (INC-911). CF-SUB-1 judges.
 */
export type SubmenuSignal = {
  type: "enter" | "leave" | "click" | "key";
  key: string;
  el: HTMLElement;
  /** The pointer's kind: a click's own (a touch press opens the panel at once). */
  pointer?: string;
  x?: number;
  y?: number;
  keyName?: string;
};

type Handler = (signal: SubmenuSignal) => void;

let handler: Handler | null = null;
let pending: SubmenuSignal | null = null;
/** The on-demand layer takes the signals while it is mounted; the pending one first. */
function take(next: Handler | null): void {
  handler = next;
  if (next && pending) {
    const first = pending;
    pending = null;
    next(first);
  }
}

/**
 * D247 (INC-1009) — a menu list of this many items or fewer shares the height before it
 * scrolls; a longer one is marked `data-many` and keeps full-size rows (src/styles.css
 * `.menu-fit`). The one number: the rail reads it here, the panel through SUBMENU_SIGNALS.
 */
export const MENU_FIT_MAX = 16;

/** What the on-demand layer is handed (one stable object). */
export const SUBMENU_SIGNALS = { take, fitMax: MENU_FIT_MAX };

function signal(next: SubmenuSignal): void {
  if (handler) return handler(next);
  pending = next.type === "leave" ? null : next;
  if (next.type === "leave") return;
  askOverlays(next.type !== "enter", () => {
    if (pending === next) pending = null;
  });
}

/**
 * The trigger's attributes and signals. It is drawn closed; the layer writes
 * aria-expanded and aria-controls on the opener it opens, and back when it closes.
 */
export function submenuTriggerProps(key: string) {
  const at =
    (type: SubmenuSignal["type"]) => (event: PointerEvent<HTMLElement> | MouseEvent<HTMLElement>) =>
      signal({
        type,
        key,
        el: event.currentTarget,
        pointer: (event.nativeEvent as globalThis.PointerEvent).pointerType,
        x: event.clientX,
        y: event.clientY,
      });
  return {
    "aria-expanded": false,
    "data-submenu": key,
    onPointerEnter: at("enter"),
    onPointerLeave: at("leave"),
    onClick: at("click"),
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft")
        signal({ type: "key", key, el: event.currentTarget, keyName: event.key });
    },
  };
}
