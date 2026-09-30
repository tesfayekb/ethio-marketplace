import { useEffect, useRef } from "react";
import type * as Leaflet from "leaflet";

import { useI18n } from "@/i18n";

import { APPROX_RADIUS_M } from "./geocode";
import {
  addTileLayers,
  loadLeaflet,
  loadTilePlan,
  OSM_PLAN,
  pinIcon,
  reportFallback,
  watchTiles,
} from "./leaflet";

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

/** ~0.005° ≈ 550 m: the circle's centre can no longer name the point inside it. */
const SNAP = 0.005;

function snap(value: number): number {
  return Math.round(value / SNAP) * SNAP;
}

export function MapPreview({
  lat,
  lng,
  precision,
}: {
  lat: number;
  lng: number;
  precision: string | null;
}) {
  const { t } = useI18n();
  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const approx = precision === "approx";

  useEffect(() => {
    const box = boxRef.current;
    if (box === null) return;
    let cancelled = false;

    void Promise.all([loadLeaflet(), loadTilePlan()])
      .then(([L, { plan }]) => {
        if (cancelled || mapRef.current !== null) return;
        const centre: [number, number] = approx ? [snap(lat), snap(lng)] : [lat, lng];
        const map = L.map(box, {
          center: centre,
          zoom: approx ? 13 : 16,
          dragging: false,
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          touchZoom: false,
          boxZoom: false,
          keyboard: false,
          attributionControl: true,
        });
        mapRef.current = map;
        // W6b-2 C2 — the same provider and the same backup as the seller's map.
        const layers = addTileLayers(L, map, plan, "street");
        watchTiles(layers, (reason) => {
          reportFallback(reason);
          for (const layer of layers) layer.remove();
          addTileLayers(L, map, OSM_PLAN, "street");
        });
        if (approx) {
          L.circle(centre, { radius: APPROX_RADIUS_M, weight: 2 }).addTo(map);
        } else {
          L.marker(centre, { icon: pinIcon(L), keyboard: false }).addTo(map);
        }
      })
      .catch(() => {
        // A map that cannot load leaves the caption below it standing; the page
        // never blanks over a picture (C4).
      });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [lat, lng, approx]);

  return (
    <div className="space-y-1">
      <div
        ref={boxRef}
        className="h-48 w-full overflow-hidden rounded-md border border-border"
        data-testid={approx ? "listing-map-circle" : "listing-map-pin"}
        data-precision={approx ? "approx" : "exact"}
        aria-label={t(approx ? "post.pin.previewApprox" : "post.pin.previewExact")}
      />
      <p className="text-xs text-muted-foreground" data-testid="listing-map-caption">
        {t(approx ? "post.pin.previewApprox" : "post.pin.previewExact")}
      </p>
    </div>
  );
}

export default MapPreview;
