import { createFileRoute } from "@tanstack/react-router";

import {
  cacheGet,
  cachePut,
  fakeSearch,
  GEOCODE_PER_HOUR,
  isFakeGeocode,
  nominatim,
  type GeoPlace,
} from "@/server/geo/geocode";
import {
  consumeRate,
  logRouteError,
  refusal,
  refuseUserClient,
  routeJson,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * U6-C1-R3b-4 — THE FORWARD GEOCODER'S ROUTE.
 *
 *   GET /api/geo/search?q=<text>  →  { ok:true, results:[{ label, lat, lng }] }
 *
 * THE BROWSER NEVER TALKS TO NOMINATIM. Nominatim's usage policy requires an
 * identifying User-Agent and forbids heavy anonymous traffic; a browser cannot
 * set a User-Agent and a public proxy would be a free geocoder for the whole
 * internet. So the route owns four things, in this order:
 *
 *   1 the CALLER — a bearer and a real signed-in user, or 401 (never anonymous).
 *   2 the DIAL (DEC-071) — `consume_rate_limit('geocode', <user>, 60, '1 hour')`
 *     BEFORE any outbound call, so a flood costs one counter row and no upstream
 *     request. A spent dial is `rateLimited` in the door's own vocabulary (F4).
 *   3 the CACHE — 24 hours in process, keyed by the normalised query. A worker
 *     that recycles simply re-asks; the cache is a courtesy to the upstream, not
 *     a store of record, so nothing depends on it surviving.
 *   4 the SHAPE — label/lat/lng and nothing else. The upstream's payload never
 *     reaches the browser verbatim.
 *
 * `E2E_FAKE_GEOCODE=1` answers from a fixed table instead of the network, so the
 * suite proves the wiring without making the tests depend on an upstream service
 * (I1 — the fixture is the table, not a captured HTTP body).
 */

const PATH = "/api/geo/search";

async function handleGet(request: Request): Promise<Response> {
  const caller = await userClientFromRequest(request);
  const refused = refuseUserClient(PATH, caller);
  if (refused !== null) return refused;

  const rate = await consumeRate(
    caller.supabase!,
    "geocode",
    caller.userId!,
    GEOCODE_PER_HOUR,
    "1 hour",
  );
  if (!rate.allowed) return refusal("geocode", "rateLimited", rate.resetsAt ?? undefined);

  const query = (new URL(request.url).searchParams.get("q") ?? "").trim();
  if (query.length < 2) return routeJson({ ok: true, results: [] }, 200);
  if (query.length > 120) return refusal("geocode", "queryTooLong", String(query.length));

  const key = `search:${query.toLowerCase()}`;
  const cached = cacheGet(key);
  if (cached !== null) return routeJson({ ok: true, results: cached, cached: true }, 200);

  let results: GeoPlace[];
  if (isFakeGeocode()) {
    results = fakeSearch(query);
  } else {
    const payload = await nominatim("search", {
      q: query,
      format: "jsonv2",
      limit: "5",
      addressdetails: "0",
    });
    if (payload === null) return refusal("geocode", "geocoderUnavailable");
    results = (Array.isArray(payload) ? payload : [])
      .map((entry) => {
        const row = (entry ?? {}) as Record<string, unknown>;
        const lat = Number(row["lat"]);
        const lng = Number(row["lon"]);
        const label = typeof row["display_name"] === "string" ? row["display_name"] : "";
        return Number.isFinite(lat) && Number.isFinite(lng) && label !== ""
          ? { label, lat, lng }
          : null;
      })
      .filter((row): row is GeoPlace => row !== null);
  }

  cachePut(key, results);
  return routeJson({ ok: true, results }, 200);
}

export const Route = createFileRoute("/api/geo/search")({
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
