import { useMatches } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { Spinner } from "@/components/brand/spinner";
import { Button } from "@/components/ui/button";
import { isStringsLayer, useI18n, useStringsLayers, type StringsLayer } from "@/i18n";

import { declaredLayers } from "./strings-layers";

/**
 * DEC-258 (DEC-231's admin gate, generalised) — THE ONE GATE FOR THE STRINGS
 * LAYERS. It wraps the routes' outlet in the shell: when the matched routes
 * declare layers (staticData.strings), it asks for them and draws the route
 * only once they are in — a waiting line meanwhile, an error line with Try
 * again if a load fails (F4: its own lines ride in the first paint, so it is
 * never blank). A page that declares none draws at once, unchanged.
 */
export function StringsLayerGate({ children }: { children: ReactNode }) {
  const { t } = useI18n();
  // One string for the declared layers, so a new match list of the same layers re-renders nothing.
  const declared = useMatches({
    select: (matches) => declaredLayers(matches.map((match) => match.staticData)).join(","),
  });
  const layers: StringsLayer[] = declared.split(",").filter(isStringsLayer);
  const strings = useStringsLayers(layers);
  if (strings.state === "failed") {
    return (
      <div
        role="alert"
        data-testid="strings-layer-failed"
        className="flex min-h-40 flex-col items-center justify-center gap-3 text-sm text-muted-foreground"
      >
        {t("auth.errorGeneric")}
        <Button data-testid="strings-layer-retry" onClick={strings.retry}>
          {t("common.tryAgain")}
        </Button>
      </div>
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
