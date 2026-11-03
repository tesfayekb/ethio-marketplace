import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Spinner } from "@/components/brand/spinner";
import { isStringsLayer, useI18n, useStringsLayers, type StringsLayer } from "@/i18n";

import { LoadFailedHere } from "./on-demand-notice";
import { declaredLayers } from "./strings-layers";

/**
 * DEC-258 (DEC-231's admin gate, generalised) — THE ONE GATE FOR THE STRINGS
 * LAYERS. It wraps the routes' outlet in the shell: when the matched routes
 * declare layers (staticData.strings), it asks for them and draws the route
 * only once they are in — a waiting line meanwhile, an error line with Try
 * again if a load fails (F4: its own lines ride in the first paint, so it is
 * never blank). A page that declares none draws at once, unchanged. INC-911 —
 * the layers are code fetched on demand, and the browser keeps a failed download
 * for the page's life, so the error line offers to refresh the page (the one
 * cure, src/lib/on-demand-failure.ts) in the words the shell's notice uses.
 *
 * P-1c (D313) — `layers`: a piece that shows a layer no route declares (the
 * Guide sheet, the `guide` layer) names the layers itself, and the route's
 * declaration is not consulted for it. The route's matches are read through
 * `useRouterState` (what `useMatches` is made of), so this module — which
 * every page carries — shares no chunk with `useMatches`' module when a
 * page-level piece imports it (1.5 KiB on every page otherwise, measured).
 */
export function StringsLayerGate({
  children,
  layers: own,
}: {
  children: ReactNode;
  layers?: readonly StringsLayer[];
}) {
  // One string for the declared layers, so a new match list of the same layers re-renders nothing.
  const declared = useRouterState({
    select: (state) => declaredLayers(state.matches.map((match) => match.staticData)).join(","),
  });
  const layers: readonly StringsLayer[] = own ?? declared.split(",").filter(isStringsLayer);
  const { t } = useI18n();
  const strings = useStringsLayers(layers);
  if (strings.state === "failed") {
    return (
      <LoadFailedHere
        testid="strings-layer-failed"
        refreshTestid="strings-layer-refresh"
        className="min-h-40 justify-center gap-3"
      />
    );
  }
  if (strings.state !== "ready") {
    return (
      <div data-testid="strings-layer-waiting" className="flex justify-center py-12">
        <Spinner label={t("common.loading")} />
      </div>
    );
  }
  return <>{children}</>;
}
