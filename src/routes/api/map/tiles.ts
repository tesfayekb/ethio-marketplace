import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import { DIALS } from "@/lib/dials";
import { spend } from "@/server/dials";
import { ok } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";

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

const REASON = /^[a-z0-9_-]{1,24}$/;
const PATH = "/api/map/tiles";
const FallbackBody = z.object({ reason: z.string() }).partial();

export const Route = createFileRoute("/api/map/tiles")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "none",
        handler: async () => {
          try {
            const key = process.env["ESRI_API_KEY"] ?? "";
            const plan = key === "" ? osmPlan() : esriPlan(key);
            return ok(plan, { cache: "private, max-age=3600" });
          } catch (error) {
            logRouteError(PATH, error);
            return ok(osmPlan(), { cache: "no-store" });
          }
        },
      }),
      // CHANGE (4): an unreadable or non-JSON body is ok:false — no dial, no line.
      POST: defineRoute({
        path: PATH,
        auth: "none",
        body: FallbackBody,
        badShape: () => ok({ ok: false }, { cache: "no-store" }),
        handler: async (ctx: RouteContext<z.infer<typeof FallbackBody>>) => {
          const raw = ctx.body.reason ?? "";
          const reason = REASON.test(raw) ? raw : "unknown";
          // INC-446 — an unsigned caller may write at most 60 lines an hour per
          // address; past that the answer is ok:false and no line is written.
          const rate = await spend(DIALS.mapFallback, hashAddress(clientAddress(ctx.request)));
          if (!rate.allowed) return ok({ ok: false }, { cache: "no-store" });
          // DEC-091 (next) counts these lines; the reason is a bounded token only.
          console.warn(`[map] fallback provider=osm reason=${reason}`);
          return ok({ ok: true }, { cache: "no-store" });
        },
      }),
    },
  },
});
