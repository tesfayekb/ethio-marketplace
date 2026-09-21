import { useEffect, useRef, useState } from "react";
import type * as Leaflet from "leaflet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { fill } from "../refusal-text";
import { reverseStreet, searchPlaces, type GeoPlace, type GeoReason } from "./geocode";
import { loadLeaflet, pinIcon, TILES, type TileKind } from "./leaflet";

/**
 * U6-C1-R3b-4 STEP 2 — THE PIN DROPPER.
 *
 * OPTIONAL FOR EVERY CATEGORY, and it says so: a seller who never opens this
 * section publishes exactly as before. Nothing here is a required field and
 * nothing here blocks Next.
 *
 * THE DOOR IS THE AUTHORITY. Saving calls `set_listing_pin` — owner-gated,
 * SECURITY DEFINER — through the caller's own session; this component holds no
 * privilege and writes no table. A refusal becomes a translated caption, never a
 * silent success (F4): the caption only reads "saved" after the door said so.
 *
 * THE MAP IS A LAZY CHUNK. Leaflet and its stylesheet are imported dynamically
 * from inside the click that opens this section, so the marketplace's first paint
 * never carries them (the weight and budget guards prove it).
 *
 * 44-PIXEL CONTROLS, AND THE MAP INSIDE THE CARD AT 360: the search field, the
 * two layer buttons, the two privacy choices and the three verbs are all
 * touch-sized, and the map box is a fixed-height block inside the step's card so
 * it never escapes a narrow screen (C2, C3).
 */

const SEARCH_DEBOUNCE_MS = 400;

const GEO_REASON_KEYS: Record<Exclude<GeoReason, null>, MessageKey> = {
  rateLimited: "post.pin.geocodeRateLimited",
  unavailable: "post.pin.geocodeUnavailable",
  signedOut: "post.pin.geocodeSignedOut",
};

export interface PinValue {
  lat: number;
  lng: number;
  precision: string;
  street: string | null;
}

export function MapPinDropper({
  saved,
  centreLat,
  centreLng,
  onSave,
  onRemove,
}: {
  /** What the draft row already holds, so reopening shows the seller's own pin. */
  saved: PinValue | null;
  /** The chosen place's centre, else the market's — where the map opens. */
  centreLat: number | null;
  centreLng: number | null;
  onSave: (value: PinValue) => Promise<boolean>;
  onRemove: () => Promise<boolean>;
}) {
  const { t } = useI18n();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markerRef = useRef<Leaflet.Marker | null>(null);
  const layerRef = useRef<Leaflet.TileLayer | null>(null);
  const leafletRef = useRef<Awaited<ReturnType<typeof loadLeaflet>> | null>(null);

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    saved === null ? null : { lat: saved.lat, lng: saved.lng },
  );
  const [precision, setPrecision] = useState<string>(saved?.precision ?? "exact");
  const [street, setStreet] = useState<string>(saved?.street ?? "");
  const [tile, setTile] = useState<TileKind>("street");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoPlace[]>([]);
  const [searching, setSearching] = useState(false);
  const [notice, setNotice] = useState<MessageKey | null>(null);
  const [state, setState] = useState<"idle" | "busy" | "saved" | "removed" | "failed">("idle");

  /* ----------------------------- the map itself ---------------------------- */

  // `place` is the single writer of the marker, so a tap, a drag, a search result
  // and the browser's own guess all land the pin the same way (I3).
  function place(lat: number, lng: number, ask: boolean) {
    setPosition({ lat, lng });
    setState("idle");
    const L = leafletRef.current;
    const map = mapRef.current;
    if (L !== null && map !== null) {
      if (markerRef.current === null) {
        const marker = L.marker([lat, lng], { icon: pinIcon(L), draggable: true }).addTo(map);
        marker.on("dragend", () => {
          const next = marker.getLatLng();
          place(next.lat, next.lng, true);
        });
        markerRef.current = marker;
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }
    }
    if (ask) {
      void reverseStreet(lat, lng).then((answer) => {
        if (answer.street !== null) setStreet(answer.street);
      });
    }
  }

  useEffect(() => {
    const box = boxRef.current;
    if (box === null) return;
    let cancelled = false;

    void loadLeaflet()
      .then((L) => {
        if (cancelled || mapRef.current !== null) return;
        leafletRef.current = L;
        const centre: [number, number] = [
          position?.lat ?? centreLat ?? 9.03,
          position?.lng ?? centreLng ?? 38.74,
        ];
        const map = L.map(box, { center: centre, zoom: position === null ? 12 : 16 });
        mapRef.current = map;
        layerRef.current = L.tileLayer(TILES.street.url, {
          attribution: TILES.street.attribution,
          maxZoom: TILES.street.maxZoom,
        }).addTo(map);
        map.on("click", (event: Leaflet.LeafletMouseEvent) => {
          place(event.latlng.lat, event.latlng.lng, true);
        });
        if (position !== null) place(position.lat, position.lng, false);
      })
      .catch(() => {
        setNotice("post.pin.geocodeUnavailable");
      });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      layerRef.current = null;
    };
    // The map is created once for the life of the section; every later change is
    // applied to the live instance, never by rebuilding it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The layer switch swaps the tiles on the live map, keeping the attribution.
  useEffect(() => {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (L === null || map === null) return;
    layerRef.current?.remove();
    const chosen = TILES[tile];
    layerRef.current = L.tileLayer(chosen.url, {
      attribution: chosen.attribution,
      maxZoom: chosen.maxZoom,
    }).addTo(map);
  }, [tile]);

  /* ------------------------------- the search ------------------------------ */

  useEffect(() => {
    const text = query.trim();
    if (text.length < 3) {
      setResults([]);
      setSearching(false);
      return;
    }
    setSearching(true);
    const timer = setTimeout(() => {
      void searchPlaces(text).then((answer) => {
        setSearching(false);
        setResults(answer.results);
        setNotice(answer.reason === null ? null : GEO_REASON_KEYS[answer.reason]);
      });
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [query]);

  function locate() {
    if (typeof navigator === "undefined" || navigator.geolocation === undefined) {
      setNotice("post.pin.locateUnavailable");
      return;
    }
    setNotice("post.pin.locating");
    navigator.geolocation.getCurrentPosition(
      (found) => {
        setNotice(null);
        place(found.coords.latitude, found.coords.longitude, true);
        mapRef.current?.setView([found.coords.latitude, found.coords.longitude], 16);
      },
      () => setNotice("post.pin.locateRefused"),
      { timeout: 10000 },
    );
  }

  /* -------------------------------- the door ------------------------------- */

  async function save() {
    if (position === null) return;
    setState("busy");
    const ok = await onSave({
      lat: position.lat,
      lng: position.lng,
      precision,
      street: street.trim() === "" ? null : street.trim(),
    });
    setState(ok ? "saved" : "failed");
  }

  async function remove() {
    setState("busy");
    const ok = await onRemove();
    if (!ok) {
      setState("failed");
      return;
    }
    markerRef.current?.remove();
    markerRef.current = null;
    setPosition(null);
    setStreet("");
    setPrecision("exact");
    setState("removed");
  }

  return (
    <div className="space-y-3" data-testid="post-pin">
      <p className="text-xs text-muted-foreground">{t("post.pin.why")}</p>

      <div className="space-y-1">
        <Label htmlFor="post-pin-search">{t("post.pin.searchLabel")}</Label>
        <Input
          id="post-pin-search"
          className="min-h-11"
          value={query}
          placeholder={t("post.pin.searchPlaceholder")}
          onChange={(event) => setQuery(event.target.value)}
          data-testid="post-pin-search"
        />
        {searching && (
          <p className="text-xs text-muted-foreground" data-testid="post-pin-searching">
            {t("post.pin.searching")}
          </p>
        )}
        {results.length > 0 && (
          <ul className="divide-y divide-border rounded-md border border-border">
            {results.map((result) => (
              <li key={`${result.label}:${result.lat}:${result.lng}`}>
                <button
                  type="button"
                  className="min-h-11 w-full px-3 py-2 text-start text-sm text-foreground hover:bg-accent"
                  data-testid="post-pin-result"
                  onClick={() => {
                    setResults([]);
                    setQuery(result.label);
                    setStreet(result.label);
                    place(result.lat, result.lng, false);
                    mapRef.current?.setView([result.lat, result.lng], 16);
                  }}
                >
                  {result.label}
                </button>
              </li>
            ))}
          </ul>
        )}
        {!searching && results.length === 0 && query.trim().length >= 3 && notice === null && (
          <p className="text-xs text-muted-foreground" data-testid="post-pin-noresults">
            {t("post.pin.noResults")}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="outline" className="min-h-11" onClick={locate}>
          {t("post.pin.locate")}
        </Button>
        <Button
          type="button"
          variant={tile === "street" ? "default" : "outline"}
          className="min-h-11"
          onClick={() => setTile("street")}
          data-testid="post-pin-layer-street"
        >
          {t("post.pin.layerStreet")}
        </Button>
        <Button
          type="button"
          variant={tile === "satellite" ? "default" : "outline"}
          className="min-h-11"
          onClick={() => setTile("satellite")}
          data-testid="post-pin-layer-satellite"
        >
          {t("post.pin.layerSatellite")}
        </Button>
      </div>

      <div
        ref={boxRef}
        className="h-64 w-full overflow-hidden rounded-md border border-border"
        data-testid="post-pin-map"
      />
      <p className="text-xs text-muted-foreground">{t("post.pin.tapHint")}</p>

      {notice !== null && (
        <p className="text-xs text-muted-foreground" data-testid="post-pin-notice">
          {t(notice)}
        </p>
      )}

      <p className="text-sm text-foreground" data-testid="post-pin-position">
        {position === null
          ? t("post.pin.none")
          : fill(t("post.pin.at"), {
              lat: position.lat.toFixed(5),
              lng: position.lng.toFixed(5),
            })}
      </p>

      <div className="space-y-1">
        <Label htmlFor="post-pin-street">{t("post.pin.streetLabel")}</Label>
        <Input
          id="post-pin-street"
          className="min-h-11"
          value={street}
          maxLength={200}
          onChange={(event) => {
            setStreet(event.target.value);
            setState("idle");
          }}
          data-testid="post-pin-street"
        />
        <p className="text-xs text-muted-foreground">{t("post.pin.streetHint")}</p>
      </div>

      <fieldset className="space-y-1">
        <legend className="text-sm font-medium text-foreground">
          {t("post.pin.precisionLabel")}
        </legend>
        {(
          [
            ["exact", "post.pin.precisionExact"],
            ["approx", "post.pin.precisionApprox"],
          ] as const
        ).map(([value, key]) => (
          <label key={value} className="flex min-h-11 items-center gap-2 text-sm text-foreground">
            <input
              type="radio"
              name="post-pin-precision"
              value={value}
              checked={precision === value}
              onChange={() => {
                setPrecision(value);
                setState("idle");
              }}
              data-testid={`post-pin-precision-${value}`}
            />
            {t(key)}
          </label>
        ))}
      </fieldset>

      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          className="min-h-11"
          disabled={position === null || state === "busy"}
          onClick={() => void save()}
          data-testid="post-pin-save"
        >
          {state === "busy" ? t("post.pin.saving") : t("post.pin.save")}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          disabled={state === "busy"}
          onClick={() => void remove()}
          data-testid="post-pin-remove"
        >
          {t("post.pin.remove")}
        </Button>
      </div>

      {state === "saved" && (
        <p className="text-sm text-foreground" data-testid="post-pin-saved">
          {t("post.pin.saved")}
        </p>
      )}
      {state === "removed" && (
        <p className="text-sm text-foreground" data-testid="post-pin-removed">
          {t("post.pin.removed")}
        </p>
      )}
      {state === "failed" && (
        <p className="text-sm text-destructive" data-testid="post-pin-error">
          {t("post.pin.saveFailed")}
        </p>
      )}
    </div>
  );
}

export default MapPinDropper;
