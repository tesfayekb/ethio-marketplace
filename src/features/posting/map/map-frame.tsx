import type { ReactNode } from "react";

import { useI18n } from "@/i18n";

import { STILL_MAP_BOX, stillMapCaptionKey } from "./still-map";

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
  precision: string | null;
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
