import type { ReactNode } from "react";

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { useI18n } from "@/i18n";

import { STILL_MAP_BOX, stillMapCaptionKey } from "./still-map";
import type { PinPrecision } from "./pin";

/**
 * INC-956 (Foundations turns C1, C1-2) — A MAP THAT CANNOT DOWNLOAD SAYS SO WHERE THE MAP IS:
 * the failure and its one cure, Refresh (LoadFailedHere), once — for the map's own chunk (the
 * resilientLazy fallbacks) and for what the map fetches when it draws (Leaflet and the tile plan,
 * map-preview.tsx and map-large.tsx). One pair of test ids for every still map, one for the large
 * map. The loading word ("Map pin") stays the loading place's alone.
 */
export function MapFailedHere({ large = false }: { large?: boolean }) {
  return large ? (
    <LoadFailedHere testid="map-large-failed" refreshTestid="map-large-refresh" />
  ) : (
    <LoadFailedHere testid="map-failed" refreshTestid="map-refresh" />
  );
}

/**
 * INC-940 — the still map's place while it loads or when it cannot download (the reserver of
 * scripts/conformance/holds-its-box.test.ts): the still map's box and caption from still-map.ts,
 * the module the map itself draws them from.
 */
export function MapFrame({
  precision,
  audience = "seller",
  children,
}: {
  precision: PinPrecision;
  audience?: "seller" | "buyer";
  children?: ReactNode;
}) {
  const { t } = useI18n();
  const caption = stillMapCaptionKey(audience, precision === "approx");
  return (
    <div className="space-y-1" data-testid="map-frame">
      <div className="relative">
        <div className={`${STILL_MAP_BOX} flex items-center justify-center bg-muted p-2`}>
          {children}
        </div>
      </div>
      {caption !== null && <p className="text-xs text-muted-foreground">{t(caption)}</p>}
    </div>
  );
}
