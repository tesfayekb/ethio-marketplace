import { createFileRoute } from "@tanstack/react-router";

import { GEOCODE_PER_HOUR, isFakeGeocode, nominatim } from "@/server/geo/geocode";
import {
  consumeRate,
  logRouteError,
  refusal,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * W6b-2 C3 — A PLACE'S OUTLINE, THROUGH OUR GEOCODER PATTERN.
 *
 *   GET /api/geo/outline?q=<place, country>  →  { ok:true, outline: GeoJSON|null }
 *
 * The browser never calls Nominatim (C3): this route does, identified by the
 * shared helper, behind the caller check and the per-seller dial, with a
 * simplified `polygon_geojson` so a city's boundary stays a few kilobytes. The
 * answer is cached in-process for a day and sent with long cache headers — an
 * outline changes on the scale of years. With no outline (a point-only place,
 * the fake geocoder, an upstream refusal) the client draws a circle instead.
 */

const PATH = "/api/geo/outline";
const CACHE_MS = 24 * 60 * 60 * 1000;
const cache = new Map<string, { at: number; outline: unknown }>();

function polygonOf(payload: unknown): unknown {
  const rows = Array.isArray(payload) ? payload : [];
  for (const entry of rows) {
    const geo = ((entry ?? {}) as Record<string, unknown>)["geojson"];
    const type = ((geo ?? {}) as Record<string, unknown>)["type"];
    if (type === "Polygon" || type === "MultiPolygon") return geo;
  }
  return null;
}

async function handleGet(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;

  const q = (new URL(request.url).searchParams.get("q") ?? "").trim();
  if (q.length < 2 || q.length > 160) return refusal("geocode", "badQuery");
  const key = q.toLowerCase();

  const held = cache.get(key);
  if (held !== undefined && Date.now() - held.at < CACHE_MS) {
    return withCache(routeJson({ ok: true, outline: held.outline, cached: true }, 200));
  }

  const rate = await consumeRate("geocode", caller.userId!, GEOCODE_PER_HOUR, "1 hour");
  if (!rate.allowed) return refusal("geocode", "rateLimited", rate.resetsAt ?? undefined);

  let outline: unknown = null;
  if (!isFakeGeocode()) {
    const payload = await nominatim("search", {
      q,
      format: "jsonv2",
      polygon_geojson: "1",
      polygon_threshold: "0.002",
      limit: "3",
    });
    if (payload === null) return refusal("geocode", "geocoderUnavailable");
    outline = polygonOf(payload);
  }
  if (cache.size > 300) cache.clear();
  cache.set(key, { at: Date.now(), outline });
  return withCache(routeJson({ ok: true, outline }, 200));
}

function withCache(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "private, max-age=604800");
  return new Response(response.body, { status: response.status, headers });
}

export const Route = createFileRoute("/api/geo/outline")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await handleGet(request);
        } catch (error) {
          logRouteError(PATH, error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
