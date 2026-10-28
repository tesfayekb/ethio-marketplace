import { useSyncExternalStore } from "react";

import { errorText } from "@/lib/error-text";

/**
 * INC-911 (Foundations turn 34b-2) — A PIECE FETCHED ON DEMAND THAT FAILS TO DOWNLOAD TELLS
 * THE PERSON. The app fetches some of its code only when it is needed (a dialog's or a menu's
 * code, the map, the phone library, the sign-in code; src/lib/load-once.ts,
 * src/components/ui/overlay-loader.ts, src/lib/supabase-door.ts). A failed download first
 * reloads the tab once (src/lib/stale-chunk.ts, INC-640: a tab opened before a Publish asks
 * for old chunk names). A failure that remains is reported here: one `[client-error]` line,
 * and the shell's one notice (src/components/shell/on-demand-notice.tsx) tells the person and
 * offers to refresh the page — the only cure, because the browser keeps a failed module
 * download for the page's life (Chromium, measured 2026-10-26: a second import() of the same
 * address fails at once without asking the server; INC-918). A piece that already says so in
 * its own place (the sign-in form, the strings gate, the phone box, an on-demand component's
 * fallback) reports nothing here; the census (scripts/conformance/on-demand-failure.test.ts)
 * names every loader's caller and where it says so.
 */

type Listener = () => void;

const listeners = new Set<Listener>();
let failures = 0;

/**
 * The one `[client-error] <label> failed to load: <errorText>` line (turn C1-2's MINOR-3,
 * Foundations turn C2). A piece that says its failure in its own place (LoadFailedHere, a map's
 * own word) logs through this and raises nothing; ODC-7 names any other line of this form.
 */
export function logOnDemandFailure(label: string, error: unknown): void {
  console.error(`[client-error] ${label} failed to load: ${errorText(error)}`);
}

/** Logs the failure (logOnDemandFailure) and asks the shell's notice to show (again). */
export function reportOnDemandFailure(label: string, error: unknown): void {
  logOnDemandFailure(label, error);
  failures += 1;
  for (const listener of listeners) listener();
}

function subscribe(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** How many on-demand failures this page has reported (0 on the server and before any). */
export function useOnDemandFailures(): number {
  return useSyncExternalStore(
    subscribe,
    () => failures,
    () => 0,
  );
}

/** The cure the notice and every in-place "didn't load" message offer: the page, read afresh. */
export function refreshPage(): void {
  window.location.reload();
}
