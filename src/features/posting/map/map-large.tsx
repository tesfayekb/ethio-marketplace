import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";
import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { useI18n } from "@/i18n";
import { logOnDemandFailure } from "@/lib/on-demand-failure";
import { APPROX_RADIUS_M } from "./geocode";
import { snap } from "./map-preview";
import { MAP_FAILED_IDS } from "./still-map";
import {
  addTileLayers,
  creditOf,
  loadLeaflet,
  loadTilePlan,
  OSM_PLAN,
  pinIcon,
  reportFallback,
  watchTiles,
} from "./leaflet";
import type { PinPrecision } from "./pin";

/** D201 §5 — the movable map exists only while its dialog is open. */
export function MapLarge({
  lat,
  lng,
  precision,
  zoom = null,
  audience = "seller",
}: {
  lat: number;
  lng: number;
  precision: PinPrecision;
  zoom?: number | null;
  /** Turn 21 (D201) — "buyer" swaps the seller's preview words for the buyer's own. */
  audience?: "seller" | "buyer";
}) {
  const { t } = useI18n();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [credit, setCredit] = useState("");
  // INC-956 — Leaflet or the tile plan could not download: the place says so, once, in place.
  const [failed, setFailed] = useState(false);
  const approx = precision === "approx";
  useEffect(() => {
    const box = boxRef.current;
    if (box === null) return;
    let cancelled = false;
    let map: Leaflet.Map | null = null;
    void Promise.all([loadLeaflet(), loadTilePlan()])
      .then(([L, { plan }]) => {
        if (cancelled) return;
        const centre: [number, number] = approx ? [snap(lat), snap(lng)] : [lat, lng];
        const large = L.map(box, {
          center: centre,
          zoom: approx ? 13 : Math.min(18, Math.max(3, zoom ?? 16)),
          minZoom: 3,
          maxZoom: approx ? 15 : 18,
          dragging: true,
          zoomControl: true,
          scrollWheelZoom: true,
          touchZoom: true,
          attributionControl: false,
        });
        map = large;
        const recordZoom = () => box.setAttribute("data-zoom", String(large.getZoom()));
        recordZoom();
        large.on("zoomend", recordZoom);
        const layers = addTileLayers(L, large, plan, "street");
        setCredit(creditOf(plan, "street"));
        watchTiles(layers, (reason) => {
          if (cancelled) return;
          reportFallback(reason);
          for (const layer of layers) layer.remove();
          addTileLayers(L, large, OSM_PLAN, "street");
          setCredit(creditOf(OSM_PLAN, "street"));
        });
        if (approx) L.circle(centre, { radius: APPROX_RADIUS_M, weight: 2 }).addTo(large);
        else L.marker(centre, { icon: pinIcon(L), keyboard: false }).addTo(large);
        large.invalidateSize();
      })
      .catch((error: unknown) => {
        // INC-956 (Foundations turn C1-2) — the large map's place says so, inside its dialog.
        logOnDemandFailure("the large map", error);
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [lat, lng, approx, zoom]);
  return (
    <div className="relative flex min-h-0 flex-1 flex-col gap-2">
      {failed && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-muted p-2">
          <LoadFailedHere {...MAP_FAILED_IDS.large} />
        </div>
      )}
      <div
        ref={boxRef}
        data-testid="listing-map-large"
        data-precision={approx ? "approx" : "exact"}
        className="isolate min-h-48 w-full flex-1 touch-none overflow-hidden rounded-md border border-border"
        aria-label={t(
          audience === "buyer"
            ? approx
              ? "adPage.map.approx"
              : "adPage.map.label"
            : approx
              ? "post.pin.previewApprox"
              : "post.pin.previewExact",
        )}
      />
      <p className="text-end text-xs text-muted-foreground">{credit}</p>
      {audience === "buyer" ? (
        approx ? (
          <p className="text-xs text-muted-foreground">{t("adPage.map.approx")}</p>
        ) : null
      ) : (
        <p className="text-xs text-muted-foreground">
          {t(approx ? "post.pin.previewApprox" : "post.pin.previewExact")}
        </p>
      )}
    </div>
  );
}
