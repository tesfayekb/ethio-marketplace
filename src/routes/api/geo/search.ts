import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DIALS } from "@/lib/dials";
import { ok, verdict } from "@/server/answer";
import {
  fakeSearch,
  geoCached,
  GeocoderUnavailable,
  isFakeGeocode,
  nominatim,
  type GeoPlace,
} from "@/server/geo/geocode";
import { defineRoute, type RouteContext } from "@/server/route";

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
 *   1 the CALLER — defineRoute auth "user": a real signed-in user, or 401.
 *   2 the DIAL (DEC-071) — DIALS.geocode, declared beforeParse,
 *     so it is spent BEFORE any outbound call, so a flood costs one counter row and no upstream
 *     request. A spent dial is `rateLimited` in the door's own vocabulary (F4).
 *   3 the CACHE — geoCached (one versionCache), keyed by the normalised query. A worker
 *     that recycles simply re-asks; the cache is a courtesy to the upstream, not
 *     a store of record, so nothing depends on it surviving.
 *   4 the SHAPE — label/lat/lng and nothing else. The upstream's payload never
 *     reaches the browser verbatim.
 *
 * Only the E2E build's shared standInMode helper enables the fixed table, so the
 * suite proves the wiring without making the tests depend on an upstream service
 * (I1 — the fixture is the table, not a captured HTTP body).
 */

const PATH = "/api/geo/search";
const SearchQuery = z.object({ q: z.string().optional() });

async function lookup(query: string): Promise<GeoPlace[]> {
  if (isFakeGeocode()) return fakeSearch(query);
  const payload = await nominatim("search", {
    q: query,
    format: "jsonv2",
    limit: "5",
    addressdetails: "0",
  });
  if (payload === null) throw new GeocoderUnavailable();
  return (Array.isArray(payload) ? payload : [])
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

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof SearchQuery>>,
): Promise<Response> {
  const query = (ctx.query.q ?? "").trim();
  if (query.length < 2) return ok({ ok: true, results: [] });
  if (query.length > 120) {
    return verdict([{ field: "geocode", reason: "queryTooLong", detail: String(query.length) }]);
  }
  try {
    const { value: results, cached } = await geoCached(`search:${query.toLowerCase()}`, () =>
      lookup(query),
    );
    return ok({ ok: true, results, ...(cached ? { cached: true } : {}) });
  } catch (error) {
    if (error instanceof GeocoderUnavailable) {
      return verdict([{ field: "geocode", reason: "geocoderUnavailable" }]);
    }
    throw error;
  }
}

export const Route = createFileRoute("/api/geo/search")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "user",
        query: SearchQuery,
        rate: [
          {
            dial: DIALS.geocode,
            key: "user",
            when: "beforeParse",
            refuseAs: { verdict: { field: "geocode" } },
          },
        ],
        handler,
      }),
    },
  },
});
