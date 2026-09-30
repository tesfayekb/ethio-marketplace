import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type * as Leaflet from "leaflet";

import { Z_SHEET } from "@/components/layout/layers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { fill } from "../refusal-text";
import { readOutline, reverseStreet, searchPlaces, type GeoPlace, type GeoReason } from "./geocode";
import {
  addTileLayers,
  loadLeaflet,
  loadTilePlan,
  OSM_PLAN,
  pinIcon,
  reportFallback,
  watchTiles,
  type TileKind,
  type TilePlan,
  tokenColor,
} from "./leaflet";
import { DETAILS_MAX } from "./location-details";
import { insideOutline } from "./outline";

/**
 * W6b-2 C3/C4 — THE PIN DROPPER, APEX-STYLE, IN A SHEET.
 *
 * OPENING: the map centres on the ticked place — its outline (from our own
 * `/api/geo/outline`, never Nominatim from the browser) fitted at maxZoom 14
 * for a city and 16 for a sub-city, else a circle around its centre; a saved
 * pin opens centred on the pin at 16.
 *
 * THE PIN: a tap drops it and it is draggable; search and "My location" move
 * it; the street line comes from our reverse geocoder and prefills the
 * location details when they are empty. A soft, non-blocking notice says so
 * when the pin falls outside the ticked place's outline.
 *
 * THE FRAME: a full-screen sheet at ≤ 640 px, a dialog above that, with a
 * STICKY footer so "Save location" is always on screen (C5's finding: at 360 px
 * the save button sat below the fold, under the wizard's own action bar).
 * Cancel restores the saved pin and closes. The door stays the authority:
 * `onSave` resolves true only after `set_listing_pin` said so (F4).
 *
 * THE TILES: our route's provider; repeated errors switch this session to
 * OpenStreetMap with a small "backup map" note (C2).
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

/** The ticked place the map opens on. */
export interface PinPlace {
  lat: number | null;
  lng: number | null;
  level: "city" | "sub_city" | null;
  /** "Bole, Addis Ababa, Ethiopia" — the outline route's query; null = no outline. */
  query: string | null;
}

export function MapPinDropper({
  saved,
  place,
  note,
  onNote,
  onSave,
  onClose,
}: {
  saved: PinValue | null;
  place: PinPlace;
  /** The location details (B3) — one value, also shown in the step's own box. */
  note: string;
  onNote: (note: string) => void;
  onSave: (value: { lat: number; lng: number; precision: string }) => Promise<boolean>;
  onClose: () => void;
}) {
  const { t } = useI18n();

  const boxRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Leaflet.Map | null>(null);
  const markerRef = useRef<Leaflet.Marker | null>(null);
  const layersRef = useRef<Leaflet.TileLayer[]>([]);
  const leafletRef = useRef<Awaited<ReturnType<typeof loadLeaflet>> | null>(null);
  const planRef = useRef<TilePlan>(OSM_PLAN);
  const outlineRef = useRef<unknown>(null);
  const noteRef = useRef(note);
  noteRef.current = note;

  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    saved === null ? null : { lat: saved.lat, lng: saved.lng },
  );
  const [precision, setPrecision] = useState<string>(saved?.precision ?? "exact");
  const [tile, setTile] = useState<TileKind>("street");
  const [backup, setBackup] = useState(false);
  const [outside, setOutside] = useState(false);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoPlace[]>([]);
  const [searching, setSearching] = useState(false);
  const [notice, setNotice] = useState<MessageKey | null>(null);
  const [state, setState] = useState<"idle" | "busy" | "failed">("idle");

  function judgeOutside(lat: number, lng: number) {
    const outline = outlineRef.current;
    if (outline !== null) {
      setOutside(!insideOutline(outline, lat, lng));
      return;
    }
    const L = leafletRef.current;
    if (L !== null && place.lat !== null && place.lng !== null) {
      const metres = L.latLng(lat, lng).distanceTo(L.latLng(place.lat, place.lng));
      setOutside(metres > circleRadius(place.level));
    }
  }

  // The single writer of the marker: tap, drag, search and "My location" (I3).
  function put(lat: number, lng: number, ask: boolean) {
    setPosition({ lat, lng });
    setState("idle");
    judgeOutside(lat, lng);
    const L = leafletRef.current;
    const map = mapRef.current;
    if (L !== null && map !== null) {
      if (markerRef.current === null) {
        const marker = L.marker([lat, lng], { icon: pinIcon(L), draggable: true }).addTo(map);
        marker.on("dragend", () => {
          const next = marker.getLatLng();
          put(next.lat, next.lng, true);
        });
        markerRef.current = marker;
      } else {
        markerRef.current.setLatLng([lat, lng]);
      }
    }
    if (ask) {
      void reverseStreet(lat, lng).then((answer) => {
        if (answer.street !== null && noteRef.current.trim() === "") onNote(answer.street);
      });
    }
  }

  function drawTiles(kind: TileKind) {
    const L = leafletRef.current;
    const map = mapRef.current;
    if (L === null || map === null) return;
    for (const layer of layersRef.current) layer.remove();
    layersRef.current = addTileLayers(L, map, planRef.current, kind);
    if (planRef.current.provider === "osm") return;
    watchTiles(layersRef.current, (reason) => {
      reportFallback(reason);
      planRef.current = OSM_PLAN;
      setBackup(true);
      drawTiles(kind);
    });
  }

  useEffect(() => {
    const box = boxRef.current;
    if (box === null) return;
    let cancelled = false;

    void Promise.all([loadLeaflet(), loadTilePlan()])
      .then(([L, answer]) => {
        if (cancelled || mapRef.current !== null) return;
        leafletRef.current = L;
        planRef.current = answer.plan;
        if (answer.reason !== null) setBackup(true);
        const fallbackCentre: [number, number] = [place.lat ?? 9.03, place.lng ?? 38.74];
        const map = L.map(box, {
          center: saved === null ? fallbackCentre : [saved.lat, saved.lng],
          zoom: saved === null ? (place.level === "sub_city" ? 16 : 14) : 16,
        });
        mapRef.current = map;
        drawTiles("street");
        map.on("click", (event: Leaflet.LeafletMouseEvent) => {
          put(event.latlng.lat, event.latlng.lng, true);
        });
        // INC-281 — the box reports ready only once a tap can land.
        box.setAttribute("data-ready", "1");
        if (saved !== null) put(saved.lat, saved.lng, false);

        // C3 — the ticked place's outline, else a circle round its centre.
        const drawCircle = () => {
          if (place.lat === null || place.lng === null) return;
          L.circle([place.lat, place.lng], {
            radius: circleRadius(place.level),
            weight: 1,
            color: tokenColor("primary"),
            fillOpacity: 0.06,
            interactive: false,
          }).addTo(map);
        };
        if (place.query === null) {
          drawCircle();
          return;
        }
        void readOutline(place.query).then((outline) => {
          if (cancelled || mapRef.current === null) return;
          if (outline === null) {
            drawCircle();
            return;
          }
          outlineRef.current = outline;
          const shape = L.geoJSON(outline as never, {
            style: {
              weight: 1.5,
              color: tokenColor("primary"),
              fillOpacity: 0.06,
            },
            interactive: false,
          }).addTo(map);
          box.setAttribute("data-outline", "1");
          if (saved === null) {
            map.fitBounds(shape.getBounds(), { maxZoom: place.level === "sub_city" ? 16 : 14 });
          }
        });
      })
      .catch(() => {
        setNotice("post.pin.geocodeUnavailable");
      });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      layersRef.current = [];
    };
    // The map is created once for the life of the sheet (I3).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    drawTiles(tile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tile]);

  // Escape closes like Cancel.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

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
        put(found.coords.latitude, found.coords.longitude, true);
        mapRef.current?.setView([found.coords.latitude, found.coords.longitude], 16);
      },
      () => setNotice("post.pin.locateRefused"),
      { timeout: 10000 },
    );
  }

  async function save() {
    if (position === null) return;
    setState("busy");
    const ok = await onSave({ lat: position.lat, lng: position.lng, precision });
    setState(ok ? "idle" : "failed");
  }

  const sheet = (
    <div
      className={`fixed inset-0 ${Z_SHEET} flex items-stretch justify-center bg-background/80 sm:items-center sm:p-6`}
      data-testid="post-pin-sheet"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-pin-title"
        className="flex h-full w-full flex-col bg-background sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-lg sm:border sm:border-border sm:shadow-lg"
      >
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto p-4" data-testid="post-pin">
          <h2 id="post-pin-title" className="text-base font-semibold text-foreground">
            {t("post.pin.title")}
          </h2>
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
                        onNote(result.label);
                        put(result.lat, result.lng, false);
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
            className="h-72 w-full overflow-hidden rounded-md border border-border sm:h-80"
            data-testid="post-pin-map"
            data-ready="0"
            data-outline="0"
            data-provider={backup ? "osm" : planRef.current.provider}
          />
          <p className="text-xs text-muted-foreground">{t("post.pin.tapHint")}</p>
          {backup && (
            <p className="text-xs text-muted-foreground" data-testid="post-pin-fallback">
              {t("post.pin.backupMap")}
            </p>
          )}
          {outside && position !== null && (
            <p className="text-xs text-muted-foreground" data-testid="post-pin-outside">
              {t("post.pin.outsidePlace")}
            </p>
          )}
          {notice !== null && (
            <p className="text-xs text-muted-foreground" data-testid="post-pin-notice">
              {t(notice)}
            </p>
          )}

          <p
            className="text-sm text-foreground"
            data-testid="post-pin-position"
            data-lat={position === null ? "" : position.lat.toFixed(5)}
            data-lng={position === null ? "" : position.lng.toFixed(5)}
          >
            {position === null
              ? t("post.pin.none")
              : fill(t("post.pin.at"), {
                  lat: position.lat.toFixed(5),
                  lng: position.lng.toFixed(5),
                })}
          </p>

          <div className="space-y-1">
            <Label htmlFor="post-pin-street">{t("post.where.detailsLabel")}</Label>
            <Input
              id="post-pin-street"
              className="min-h-11"
              value={note}
              maxLength={DETAILS_MAX}
              onChange={(event) => {
                onNote(event.target.value);
                setState("idle");
              }}
              data-testid="post-pin-street"
            />
            <p className="text-xs text-muted-foreground">{t("post.where.detailsHelp")}</p>
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
              <label
                key={value}
                className="flex min-h-11 items-center gap-2 text-sm text-foreground"
              >
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
          {state === "failed" && (
            <p className="text-sm text-destructive" data-testid="post-pin-error">
              {t("post.pin.saveFailed")}
            </p>
          )}
        </div>

        {/* C4 — the verbs stay on screen: a sticky footer, never below the fold. */}
        <div
          className="flex gap-2 border-t border-border bg-background p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]"
          data-testid="post-pin-actions"
        >
          <Button
            type="button"
            className="min-h-11 flex-1"
            disabled={position === null || state === "busy"}
            onClick={() => void save()}
            data-testid="post-pin-save"
          >
            {state === "busy" ? t("post.pin.saving") : t("post.pin.saveLocation")}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="min-h-11 flex-1"
            disabled={state === "busy"}
            onClick={onClose}
            data-testid="post-pin-cancel"
          >
            {t("post.pin.cancel")}
          </Button>
        </div>
      </div>
    </div>
  );

  return typeof document === "undefined" ? null : createPortal(sheet, document.body);
}

/** The circle drawn when a place has no outline, in metres. */
function circleRadius(level: PinPlace["level"]): number {
  return level === "sub_city" ? 1500 : 5000;
}

export default MapPinDropper;
