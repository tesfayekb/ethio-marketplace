import { lazy, type ComponentType, type LazyExoticComponent } from "react";

/**
 * D234 speed turn S3 (INC-897) — A COMPONENT FETCHED ON DEMAND NEVER BREAKS THE PAGE.
 *
 * React.lazy throws a failed chunk download to the route's error boundary, so on a
 * flaky phone network one late map or crumb turned a whole page into "This page
 * didn't load". `resilientLazy(fetch, label, fallback)` is React.lazy whose failed
 * download resolves to `fallback` — what the piece shows in place of itself (a
 * crumb's "—", the map's own word) — logged once as `[client-error] <label> failed
 * to load`. The server render and the hydration stay React.lazy's own (Suspense
 * streams the piece, the browser hydrates it), so nothing changes when the download
 * succeeds. The tab's one reload for a stale chunk (src/lib/stale-chunk.ts, INC-640)
 * runs first; a failure that remains keeps the fallback for the page's life, since
 * browsers keep a failed module fetch until the page reloads.
 */
export function resilientLazy<P extends object>(
  fetchComponent: () => Promise<ComponentType<P>>,
  label: string,
  fallback: ComponentType<P>,
): LazyExoticComponent<ComponentType<P>> {
  return lazy(() =>
    fetchComponent().then(
      (component) => ({ default: component }),
      (error: unknown) => {
        console.error(`[client-error] ${label} failed to load`, error);
        return { default: fallback };
      },
    ),
  );
}
