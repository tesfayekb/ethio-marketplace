/**
 * D234 speed turn S1 — A MODULE A PAGE FETCHES ON DEMAND IS FETCHED ONCE PER VISIT.
 *
 * `loadOnce(() => import("./x").then(...))` gives `ready()`, the module's value once
 * it has arrived (null before), and `load()`, which starts the download or joins
 * the one in flight and resolves with the value. A failed download is forgotten,
 * so the next `load()` tries again; the caller decides what the person sees
 * meanwhile (a skeleton, a held box, a "Try again") — never a crashed page, which
 * is what a failed React.lazy chunk does through the route's error boundary.
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
