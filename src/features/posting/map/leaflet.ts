import type * as Leaflet from "leaflet";

/**
 * U6-C1-R3b-4 — LOADING LEAFLET, ONCE, IN THE BROWSER ONLY (A7 first-of-kind).
 *
 * THE CENSUS (the installed package, not its documentation): leaflet@1.9.4 ships
 * `main: dist/leaflet-src.js` and NO `module` entry, so the specifier resolves to
 * the UMD bundle — which touches `window` at evaluation time. A static import
 * from any SSR-rendered module therefore breaks the server render, and every
 * import here is DYNAMIC and guarded by a browser check. The UMD interop puts the
 * `L` object on `default`, with the named exports beside it.
 *
 * THE CSS COMES FROM THE PACKAGE (`leaflet/dist/leaflet.css`), never a CDN.
 *
 * THE MARKER IS A `divIcon`, not Leaflet's default image pair.
 *
 * W6b-2 C1/C2 — THE TILES COME FROM OUR ROUTE. `/api/map/tiles` names the
 * provider (Esri with the server-held key, else OpenStreetMap) and its layers;
 * the unauthenticated imagery layer is gone. `watchTiles` turns repeated tile
 * errors — three in a row, or one 401/403/429 — into a switch to OpenStreetMap
 * for the rest of the session, a note on screen, and one server log line.
 */

export type LeafletModule = typeof Leaflet;

let loaded: Promise<LeafletModule> | null = null;

export function loadLeaflet(): Promise<LeafletModule> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("leaflet is browser-only"));
  }
  loaded ??= (async () => {
    await import("leaflet/dist/leaflet.css");
    const mod = (await import("leaflet")) as unknown as {
      default?: LeafletModule;
    } & LeafletModule;
    return mod.default ?? mod;
  })();
  return loaded;
}

export type TileKind = "street" | "satellite";

export interface TileLayerSpec {
  url: string;
  attribution: string;
  tileSize: number;
  zoomOffset: number;
  maxZoom: number;
}

export interface TilePlan {
  provider: "esri" | "osm";
  street: TileLayerSpec[];
  satellite: TileLayerSpec[];
}

/** The backup, known to the client so a failed plan read still draws a map. */
export const OSM_PLAN: TilePlan = (() => {
  const layer: TileLayerSpec = {
    url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: "&copy; OpenStreetMap contributors · ethio.com",
    tileSize: 256,
    zoomOffset: 0,
    maxZoom: 19,
  };
  return { provider: "osm", street: [layer], satellite: [layer] };
})();

/** Once this session fell back, every later map opens on the backup. */
let sessionFallback: string | null = null;
let planRead: Promise<{ plan: TilePlan; reason: string | null }> | null = null;

function shapeLayers(raw: unknown): TileLayerSpec[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((entry) => {
      const row = (entry ?? {}) as Record<string, unknown>;
      const url = typeof row["url"] === "string" ? row["url"] : "";
      if (!url.startsWith("https://")) return null;
      return {
        url,
        attribution: typeof row["attribution"] === "string" ? row["attribution"] : "",
        tileSize: Number(row["tileSize"]) === 512 ? 512 : 256,
        zoomOffset: Number(row["zoomOffset"]) === -1 ? -1 : 0,
        maxZoom: Number.isFinite(Number(row["maxZoom"])) ? Number(row["maxZoom"]) : 19,
      };
    })
    .filter((row): row is TileLayerSpec => row !== null);
}

/** The session's tile plan; a refused or broken read IS a fallback (C2). */
export function loadTilePlan(): Promise<{ plan: TilePlan; reason: string | null }> {
  if (sessionFallback !== null) {
    return Promise.resolve({ plan: OSM_PLAN, reason: sessionFallback });
  }
  planRead ??= (async () => {
    try {
      const response = await fetch("/api/map/tiles", { headers: { accept: "application/json" } });
      if (!response.ok) return { plan: OSM_PLAN, reason: String(response.status) };
      const payload = (await response.json()) as Record<string, unknown>;
      const street = shapeLayers(payload["street"]);
      const satellite = shapeLayers(payload["satellite"]);
      if (street.length === 0) return { plan: OSM_PLAN, reason: "empty" };
      return {
        plan: {
          provider: payload["provider"] === "esri" ? "esri" : "osm",
          street,
          satellite: satellite.length > 0 ? satellite : street,
        },
        reason: null,
      };
    } catch {
      return { plan: OSM_PLAN, reason: "network" };
    }
  })();
  return planRead;
}

/** Record the switch once per session and tell the server (one log line). */
export function reportFallback(reason: string): void {
  if (sessionFallback !== null) return;
  sessionFallback = reason;
  planRead = null;
  void fetch("/api/map/tiles", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ reason }),
    keepalive: true,
  }).catch(() => undefined);
}

/** Draws one tile kind's layers; no prefetch beyond the viewport (keepBuffer 0). */
export function addTileLayers(
  L: LeafletModule,
  map: Leaflet.Map,
  plan: TilePlan,
  kind: TileKind,
): Leaflet.TileLayer[] {
  return plan[kind].map((spec) =>
    L.tileLayer(spec.url, {
      attribution: spec.attribution,
      tileSize: spec.tileSize,
      zoomOffset: spec.zoomOffset,
      maxZoom: spec.maxZoom,
      keepBuffer: 0,
      crossOrigin: true,
    }).addTo(map),
  );
}

/**
 * C2 — three errors in a row, or one tile answering 401/403/429, calls
 * `onFallback` once with the reason. A successful tile resets the run.
 */
export function watchTiles(
  layers: Leaflet.TileLayer[],
  onFallback: (reason: string) => void,
): void {
  let run = 0;
  let done = false;
  let probed = false;
  const fire = (reason: string) => {
    if (done) return;
    done = true;
    onFallback(reason);
  };
  for (const layer of layers) {
    layer.on("tileload", () => {
      run = 0;
    });
    layer.on("tileerror", (event: Leaflet.TileErrorEvent) => {
      run += 1;
      if (run >= 3) fire("errors");
      if (probed) return;
      probed = true;
      const src = (event.tile as HTMLImageElement | undefined)?.src ?? "";
      if (src === "") return;
      void fetch(src, { mode: "cors" })
        .then((response) => {
          if ([401, 403, 429].includes(response.status)) fire(String(response.status));
        })
        .catch(() => undefined);
    });
  }
}

/**
 * INC-353 — a theme token as the concrete colour it is. The tokens are full
 * oklch colours (styles.css), so they are never wrapped in hsl(); SVG paths
 * that need a literal value read it from the computed style.
 */
export function tokenColor(name: string): string {
  if (typeof document === "undefined") return "currentColor";
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim();
  return value === "" ? "currentColor" : value;
}

/** The pin itself: a token-coloured drop that needs no image asset (apex-style). */
export function pinIcon(L: LeafletModule): Leaflet.DivIcon {
  return L.divIcon({
    className: "",
    html:
      '<span style="position:relative;display:block;width:28px;height:28px;' +
      "border-radius:50% 50% 50% 0;transform:rotate(-45deg);" +
      "border:3px solid var(--background);background:var(--primary);" +
      'box-shadow:0 2px 6px rgba(0,0,0,.35)"></span>',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}
