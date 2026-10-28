import { lazy, type ComponentType, type LazyExoticComponent } from "react";

import { logOnDemandFailure, reportOnDemandFailure } from "@/lib/on-demand-failure";

/**
 * D234 speed turn S3 (INC-897) — A COMPONENT FETCHED ON DEMAND NEVER BREAKS THE PAGE.
 *
 * React.lazy throws a failed chunk download to the route's error boundary, so on a
 * flaky phone network one late map or crumb turned a whole page into "This page
 * didn't load". `resilientLazy(fetch, label, fallback)` is React.lazy whose failed
 * download resolves to `fallback` — what the piece shows in place of itself (a
 * crumb's "—", the map's own word). The server render and the hydration stay
 * React.lazy's own (Suspense streams the piece, the browser hydrates it), so nothing
 * changes when the download succeeds. The tab's one reload for a stale chunk
 * (src/lib/stale-chunk.ts, INC-640) runs first; a failure that remains keeps the
 * fallback for the page's life, since browsers keep a failed module fetch until the
 * page reloads (INC-918). INC-911 — the failure is reported to the shell's one notice
 * (src/lib/on-demand-failure.ts: `[client-error] <label> failed to load: …`, and an
 * offer to refresh the page), unless `inPlace` says the fallback itself says so
 * (LoadFailedHere, src/components/shell/on-demand-notice.tsx) — then it is logged only.
 */
export function resilientLazy<P extends object>(
  fetchComponent: () => Promise<ComponentType<P>>,
  label: string,
  fallback: ComponentType<P>,
  options: { inPlace?: boolean } = {},
): LazyExoticComponent<ComponentType<P>> {
  return lazy(() =>
    fetchComponent().then(
      (component) => ({ default: component }),
      (error: unknown) => {
        if (options.inPlace === true) logOnDemandFailure(label, error);
        else reportOnDemandFailure(label, error);
        return { default: fallback };
      },
    ),
  );
}
