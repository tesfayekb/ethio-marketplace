import { createFileRoute } from "@tanstack/react-router";

/**
 * W6b-2 C1/C2 — THE MAP'S TILE TEMPLATES.
 *
 *   GET  /api/map/tiles     → { ok:true, provider:"esri"|"osm", street, satellite }
 *   POST /api/map/tiles     ← { reason } — one "[map] fallback" line per session
 *
 * The Esri key is read HERE, inside the handler, from the server's env and is
 * never in the repo (F1). Tile URLs must carry it, because the browser fetches
 * the tiles itself; the key is referrer-restricted by Esri to ethio.com and the
 * published domain, so a copy on any other origin is refused upstream and the
 * map falls back to OpenStreetMap (C2). With no key configured the answer is
 * the OSM templates outright.
 *
 * Every layer carries the attribution its provider requires. The OSM standard
 * tiles are asked for without prefetch (the client sets `keepBuffer` to 0), and
 * the application identifies itself in the attribution line.
 */

const ESRI_STATIC =
  "https://static-map-tiles-api.arcgis.com/arcgis/rest/services/static-basemap-tiles-service/v1";
const ESRI_IMAGERY =
  "https://ibasemaps-api.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const OSM = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION = "&copy; OpenStreetMap contributors · ethio.com";
const ESRI_ATTRIBUTION = "Powered by Esri · Esri, TomTom, Garmin, FAO, NOAA, USGS, © OpenStreetMap";

export interface TileLayerSpec {
  url: string;
  attribution: string;
  tileSize: number;
  zoomOffset: number;
  maxZoom: number;
}

export interface TilePlan {
  ok: true;
  provider: "esri" | "osm";
  street: TileLayerSpec[];
  satellite: TileLayerSpec[];
}

function osmPlan(): TilePlan {
  const layer: TileLayerSpec = {
    url: OSM,
    attribution: OSM_ATTRIBUTION,
    tileSize: 256,
    zoomOffset: 0,
    maxZoom: 19,
  };
  // OSM has no imagery: the satellite choice is the street map on the backup.
  return { ok: true, provider: "osm", street: [layer], satellite: [layer] };
}

function esriPlan(key: string): TilePlan {
  const token = `?token=${encodeURIComponent(key)}`;
  const staticLayer = (style: string): TileLayerSpec => ({
    url: `${ESRI_STATIC}/${style}/static/tile/{z}/{y}/{x}${token}`,
    attribution: ESRI_ATTRIBUTION,
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 19,
  });
  return {
    ok: true,
    provider: "esri",
    street: [staticLayer("arcgis/streets")],
    satellite: [
      {
        url: `${ESRI_IMAGERY}${token}`,
        attribution: ESRI_ATTRIBUTION,
        tileSize: 256,
        zoomOffset: 0,
        maxZoom: 19,
      },
      staticLayer("arcgis/imagery/labels"),
    ],
  };
}

function json(payload: unknown, status: number, cache: string): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": cache },
  });
}

const REASON = /^[a-z0-9_-]{1,24}$/;

export const Route = createFileRoute("/api/map/tiles")({
  server: {
    handlers: {
      GET: () => {
        try {
          const key = process.env["ESRI_API_KEY"] ?? "";
          const plan = key === "" ? osmPlan() : esriPlan(key);
          return json(plan, 200, "private, max-age=3600");
        } catch (error) {
          console.error(
            "[ssr-error]",
            "/api/map/tiles",
            error instanceof Error ? error.message : String(error),
          );
          return json(osmPlan(), 200, "no-store");
        }
      },
      POST: async ({ request }) => {
        try {
          const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
          const raw = typeof body["reason"] === "string" ? body["reason"] : "";
          const reason = REASON.test(raw) ? raw : "unknown";
          // DEC-091 (next) counts these lines; the reason is a bounded token only.
          console.warn(`[map] fallback provider=osm reason=${reason}`);
          return json({ ok: true }, 200, "no-store");
        } catch (error) {
          console.error(
            "[ssr-error]",
            "/api/map/tiles",
            error instanceof Error ? error.message : String(error),
          );
          return json({ ok: false }, 500, "no-store");
        }
      },
    },
  },
});
