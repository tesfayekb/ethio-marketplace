import type { KeyboardEvent, PointerEvent } from "react";

import { loadOverlays } from "@/components/ui/overlay-loader";
import { reportOnDemandFailure } from "@/lib/on-demand-failure";

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
  type: "enter" | "leave" | "down" | "click" | "key";
  key: string;
  el: HTMLElement;
  pointer?: string;
  x?: number;
  y?: number;
  keyName?: string;
};

type Handler = (signal: SubmenuSignal) => void;

let handler: Handler | null = null;
let pending: SubmenuSignal | null = null;
let openKey: string | null = null;
const listeners = new Set<() => void>();

/** The on-demand layer takes the signals while it is mounted; the pending one first. */
export function takeSubmenuSignals(next: Handler | null): void {
  handler = next;
  if (next && pending) {
    const first = pending;
    pending = null;
    next(first);
  }
}

/** The open trigger's key, written by the layer only; read for aria-expanded. */
export function setSubmenuOpen(key: string | null): void {
  if (key === openKey) return;
  openKey = key;
  for (const listener of listeners) listener();
}
export const submenuOpen = {
  get: (): string | null => openKey,
  server: (): string | null => null,
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

function signal(next: SubmenuSignal): void {
  if (handler) return handler(next);
  if (next.type === "leave") {
    pending = null;
    return;
  }
  pending = next;
  const asked = next.type !== "enter";
  loadOverlays().catch((error: unknown) => {
    if (pending === next) pending = null;
    if (asked) reportOnDemandFailure("a menu's code", error);
  });
}

/** The trigger's attributes and signals; `open` comes from `submenuOpen`. */
export function submenuTriggerProps(key: string, open: boolean) {
  const at = (type: SubmenuSignal["type"]) => (event: PointerEvent<HTMLElement>) =>
    signal({
      type,
      key,
      el: event.currentTarget,
      pointer: event.pointerType,
      x: event.clientX,
      y: event.clientY,
    });
  return {
    "aria-expanded": open,
    "aria-controls": open ? `submenu-${key}` : undefined,
    "data-submenu": key,
    onPointerEnter: at("enter"),
    onPointerLeave: at("leave"),
    onPointerDown: at("down"),
    onClick: (event: { currentTarget: HTMLElement }) =>
      signal({ type: "click", key, el: event.currentTarget }),
    onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft")
        signal({ type: "key", key, el: event.currentTarget, keyName: event.key });
    },
  };
}
