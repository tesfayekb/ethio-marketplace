import { useSyncExternalStore } from "react";

/**
 * INC-955 (Foundations turn C1) — A NOTICE IS SHOWN WHERE THE PERSON IS LOOKING.
 *
 * An open dialog, sheet, drawer or alert keeps the keyboard inside itself, blocks the pointer
 * outside it and paints over the page (every one at z-50 — the last to mount wins, INC-124), so
 * a notice drawn by the shell while one is open could be neither seen, reached nor tapped (the
 * operator's walk of 2026-10-27: the map's "didn't load" notice appeared only after the dialog
 * closed). Every overlay surface therefore renders one `NoticeOutlet` inside its content, and the
 * shell's notices (src/components/shell/on-demand-notice.tsx) are drawn into the TOPMOST open
 * outlet — inside the overlay's focus scope and pointer area — or in the shell's own place when
 * no overlay is open. The outlet sits over the foot of the overlay's content (absolute, so it
 * takes no room and adds no gap; every overlay content is a fixed box, its containing block),
 * passing the pointer through but for the notice itself. Each outlet is a polite live region
 * from its first paint (a live region
 * must exist before its words arrive), with no role (an empty status would answer a page's own
 * getByRole("status") — ODN-2). scripts/conformance/notice-outlet.test.ts names every overlay
 * content that lacks one.
 */

const outlets = new Set<HTMLElement>();
const listeners = new Set<() => void>();
let top: HTMLElement | null = null;

/** The outlet painted last on the page: the one in the overlay opened most recently. */
function topmost(): HTMLElement | null {
  let last: HTMLElement | null = null;
  for (const outlet of outlets) {
    if (!outlet.isConnected) continue;
    if (last === null || last.compareDocumentPosition(outlet) & Node.DOCUMENT_POSITION_FOLLOWING)
      last = outlet;
  }
  return last;
}

function changed(): void {
  const next = topmost();
  if (next === top) return;
  top = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * An overlay's outlet, as its element's ref: registered while the element is on the page; the
 * returned cleanup (React 19) unregisters it. React types a callback ref with `null` too.
 */
export function registerNoticeOutlet(element: HTMLElement | null): (() => void) | undefined {
  if (element === null) return undefined;
  outlets.add(element);
  changed();
  return () => {
    outlets.delete(element);
    changed();
  };
}

/** The topmost open overlay's outlet, or null when no overlay is open (and on the server). */
export function useTopNoticeOutlet(): HTMLElement | null {
  return useSyncExternalStore(
    subscribe,
    () => top,
    () => null,
  );
}
