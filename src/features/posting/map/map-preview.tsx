import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { useI18n } from "@/i18n";
import { logOnDemandFailure } from "@/lib/on-demand-failure";
import { useNearViewport } from "@/lib/use-near-viewport";

import { APPROX_RADIUS_M } from "./geocode";
import { MAP_FAILED_IDS, STILL_MAP_BOX, STILL_MAP_CREDIT, stillMapCaptionKey } from "./still-map";
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

/**
 * U6-C1-R3b-4 STEP 3 — THE PIN AS A BUYER SEES IT.
 *
 * A STILL MAP, not a toy: dragging, zooming, scrolling and the keyboard are all
 * off, so a buyer scrolling a listing on a phone never gets trapped panning a map
 * they did not mean to touch. The picture is the point.
 *
 * AN APPROXIMATE PIN IS NEVER DRAWN AS A POINT. The exact coordinates do reach
 * this component — the seller's own preview must render from the saved row — but
 * for `approx` the marker is not drawn at all and the circle's CENTRE IS SNAPPED
 * to a coarse grid before it is handed to Leaflet, so the 500-metre promise
 * cannot be undone by reading the circle's middle. A seller who chose to hide
 * their door has hidden it here and everywhere this component is mounted (U7).
 */

/**
 * INC-389 — the same grid the door writes to `pin_show_*` for an approx pin
 * (two decimals, 0.01° ≈ 1.1 km), so the seller sees what a buyer will see.
 */
const SNAP = 0.01;

export function snap(value: number): number {
  return Math.round(value / SNAP) * SNAP;
}

export function MapPreview({
  lat,
  lng,
  precision,
  zoom = null,
  audience = "seller",
}: {
  lat: number;
  lng: number;
  precision: PinPrecision;
  /** Part L — the saved zoom for an exact pin; an approximate pin keeps 13 (privacy). */
  zoom?: number | null;
  /** Turn 21 (D201) — "buyer" swaps the seller's preview words for the buyer's own. */
  audience?: "seller" | "buyer";
}) {
  const { t } = useI18n();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const approx = precision === "approx";
  const caption = stillMapCaptionKey(audience, approx);
  // Part H2 — the plan in force's credit, drawn as text (never Leaflet's markup control).
  const [credit, setCredit] = useState("");
  // INC-956 (Foundations turn C1-2) — Leaflet or the tile plan could not download: the map's
  // place says so (LoadFailedHere with the still map's ids), once, where the map is — never the shell's notice besides.
  const [failed, setFailed] = useState(false);
  // D234 S1 — on the buyer's ad page the map's library, tile plan and tiles wait until
  // the box nears the screen; the seller's preview in the wizard draws at once.
  const near = useNearViewport(boxRef, { enabled: audience === "buyer" });

  useEffect(() => {
    const box = boxRef.current;
    if (box === null || !near) return;
    let cancelled = false;

    void Promise.all([loadLeaflet(), loadTilePlan()])
      .then(([L, { plan }]) => {
        if (cancelled || mapRef.current !== null) return;
        const centre: [number, number] = approx ? [snap(lat), snap(lng)] : [lat, lng];
        const map = L.map(box, {
          center: centre,
          zoom: approx ? 13 : (zoom ?? 16),
          dragging: false,
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          attributionControl: false,
        });
        mapRef.current = map;
        // Part L — the zoom the preview opened at, readable for PW-96.
        box.setAttribute("data-zoom", String(map.getZoom()));
        // W6b-2 C2 — the same provider and the same backup as the seller's map.
        const layers = addTileLayers(L, map, plan, "street");
        setCredit(creditOf(plan, "street"));
        watchTiles(layers, (reason) => {
          reportFallback(reason);
          for (const layer of layers) layer.remove();
          addTileLayers(L, map, OSM_PLAN, "street");
          if (!cancelled) setCredit(creditOf(OSM_PLAN, "street"));
        });
        if (approx) {
          L.circle(centre, { radius: APPROX_RADIUS_M, weight: 2 }).addTo(map);
        } else {
          L.marker(centre, { icon: pinIcon(L), keyboard: false }).addTo(map);
        }
      })
      .catch((error: unknown) => {
        // A map that cannot load leaves the caption below it standing; the page
        // never blanks over a picture (C4). INC-956 — its place says so, in place.
        logOnDemandFailure("the map", error);
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, approx, zoom, near]);

  return (
    <div className="space-y-1">
      {/* INC-940 — the credit lies on the box at its foot, so its length never moves the page. */}
      <div className="relative">
        <div
          ref={boxRef}
          className={STILL_MAP_BOX}
          data-testid={approx ? "listing-map-circle" : "listing-map-pin"}
          data-precision={approx ? "approx" : "exact"}
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
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted p-2">
            <LoadFailedHere {...MAP_FAILED_IDS.still} />
          </div>
        )}
        {credit !== "" && (
          <p className={STILL_MAP_CREDIT} data-testid="listing-map-credit">
            {credit}
          </p>
        )}
      </div>
      {caption !== null && (
        <p className="text-xs text-muted-foreground" data-testid="listing-map-caption">
          {t(caption)}
        </p>
      )}
    </div>
  );
}

export default MapPreview;
