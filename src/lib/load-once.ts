/**
 * D234 speed turn S1 — A MODULE A PAGE FETCHES ON DEMAND IS FETCHED ONCE PER VISIT.
 *
 * `loadOnce(() => import("./x").then(...))` gives `ready()`, the module's value once
 * it has arrived (null before), and `load()`, which starts the download or joins
 * the one in flight and resolves with the value. A failed download is forgotten,
 * so the next `load()` asks again — but for a module the browser answers from its
 * memory of the failure until the page reloads (INC-918, measured in Chromium), so
 * asking again cannot help. The caller answers the failure through
 * src/lib/on-demand-failure.ts (the shell's one notice, or LoadFailedHere in its own
 * place: the words and a Refresh, INC-911) — never a crashed page, which is what a
 * failed React.lazy chunk does through the route's error boundary, and never a
 * "Try again". The census scripts/conformance/on-demand-failure.test.ts names every
 * caller.
 */
export interface LoadOnce<T> {
  ready(): T | null;
  load(): Promise<T>;
}

export function loadOnce<T>(fetchModule: () => Promise<T>): LoadOnce<T> {
  let value: T | null = null;
  let inFlight: Promise<T> | null = null;
  return {
    ready: () => value,
    load: () => {
      inFlight ??= fetchModule().then(
        (next) => {
          value = next;
          return next;
        },
        (error: unknown) => {
          inFlight = null;
          throw error;
        },
      );
      return inFlight;
    },
  };
}
