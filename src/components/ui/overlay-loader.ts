import { useSyncExternalStore } from "react";

import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";

/**
 * DEC-259 (Foundations turn 31; D234 speed S8) — THE OVERLAY PRIMITIVES, FETCHED
 * ON DEMAND. The tooltip and the dropdown menu carry Radix, floating-ui and
 * their focus and scroll layers: about 23 KiB of every page's first download.
 * Their facades (tooltip.tsx, dropdown-menu.tsx) draw the trigger at once and
 * ask for this module on the first hover, focus or press — or once the page has
 * loaded and the browser is idle, so that first press does not wait.
 *
 * `useOverlays()` is the module once it has arrived (null before; null on the
 * server and in the hydration render, so the server's HTML and the first
 * client render agree). A failed download is logged once per try; the caller
 * (overlay-facade.tsx) reports it to the shell's one notice, which offers to refresh
 * the page — the browser keeps a failed module download for the page's life, so the
 * next ask fails at once (INC-911, INC-918).
 */
export type OverlaysImpl = typeof import("./overlays-impl");

const overlays = loadOnce(() => import("./overlays-impl"));
const listeners = new Set<() => void>();

/** Starts the download (or joins the one in flight); the subscribers hear of its arrival. */
export function loadOverlays(): Promise<OverlaysImpl> {
  const known = overlays.ready() !== null;
  return overlays.load().then(
    (impl) => {
      if (!known) for (const listener of listeners) listener();
      return impl;
    },
    (error: unknown) => {
      console.warn(`[overlays] loading the overlay primitives failed: ${errorText(error)}`);
      throw error;
    },
  );
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

const serverSnapshot = (): OverlaysImpl | null => null;

/** The overlay module once it has arrived; null before, on the server and while hydrating. */
export function useOverlays(): OverlaysImpl | null {
  return useSyncExternalStore(subscribe, overlays.ready, serverSnapshot);
}

let warmScheduled = false;

/**
 * Asks for the module once the page has loaded and the browser is idle, so a
 * person's first press finds it ready; scheduled once per visit, never on the
 * server. A failure here is logged only: the person asked for nothing, and the
 * press that does ask reports it (INC-911).
 */
export function warmOverlaysWhenIdle(): void {
  if (warmScheduled || typeof window === "undefined") return;
  warmScheduled = true;
  const ask = () => {
    loadOverlays().catch(() => undefined);
  };
  const whenIdle = () => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(ask, { timeout: 4000 });
    } else {
      window.setTimeout(ask, 1);
    }
  };
  if (document.readyState === "complete") whenIdle();
  else window.addEventListener("load", whenIdle, { once: true });
}
