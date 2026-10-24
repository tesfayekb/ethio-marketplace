import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DIALS } from "@/lib/dials";
import { ok, verdict } from "@/server/answer";
import { spend } from "@/server/dials";
import { geoCached, GeocoderUnavailable, isFakeGeocode, nominatim } from "@/server/geo/geocode";
import { defineRoute, type RouteContext } from "@/server/route";

/**
 * W6b-2 C3 — A PLACE'S OUTLINE, THROUGH OUR GEOCODER PATTERN.
 *
 *   GET /api/geo/outline?q=<place, country>  →  { ok:true, outline: GeoJSON|null }
 *
 * The browser never calls Nominatim (C3): this route does, identified by the
 * shared helper, behind the caller check and the per-seller dial, with a
 * simplified `polygon_geojson` so a city's boundary stays a few kilobytes. The
 * answer is cached in-process for a day (geoCached; the dial is spent on a miss
 * only — a cached outline costs the seller nothing) and sent with long cache headers — an
 * outline changes on the scale of years. With no outline (a point-only place,
 * the fake geocoder, an upstream refusal) the client draws a circle instead.
 */

const PATH = "/api/geo/outline";
const OutlineQuery = z.object({ q: z.string().trim().min(2).max(160) });

/** The dial was spent on a miss and refused: nothing is cached. */
class OutlineRateLimited extends Error {
  constructor(readonly resetsAt: string | null) {
    super("outline rate limited");
  }
}

function polygonOf(payload: unknown): unknown {
  const rows = Array.isArray(payload) ? payload : [];
  for (const entry of rows) {
    const geo = ((entry ?? {}) as Record<string, unknown>)["geojson"];
    const type = ((geo ?? {}) as Record<string, unknown>)["type"];
    if (type === "Polygon" || type === "MultiPolygon") return geo;
  }
  return null;
}

async function lookup(q: string, userId: string): Promise<unknown> {
  const rate = await spend(DIALS.geocode, userId);
  if (!rate.allowed) throw new OutlineRateLimited(rate.resetsAt ?? null);
  if (isFakeGeocode()) return null;
  const payload = await nominatim("search", {
    q,
    format: "jsonv2",
    polygon_geojson: "1",
    polygon_threshold: "0.002",
    limit: "3",
  });
  if (payload === null) throw new GeocoderUnavailable();
  return polygonOf(payload);
}

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof OutlineQuery>>,
): Promise<Response> {
  const { q } = ctx.query;
  const userId = ctx.userId;
  if (userId === null) throw new Error("signed-in caller missing");
  try {
    const { value: outline, cached } = await geoCached(`outline:${q.toLowerCase()}`, () =>
      lookup(q, userId),
    );
    return ok(
      { ok: true, outline, ...(cached ? { cached: true } : {}) },
      { cache: "private, max-age=604800" },
    );
  } catch (error) {
    if (error instanceof OutlineRateLimited) {
      return verdict([
        { field: "geocode", reason: "rateLimited", detail: error.resetsAt ?? undefined },
      ]);
    }
    if (error instanceof GeocoderUnavailable) {
      return verdict([{ field: "geocode", reason: "geocoderUnavailable" }]);
    }
    throw error;
  }
}

export const Route = createFileRoute("/api/geo/outline")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "user",
        query: OutlineQuery,
        badShape: () => verdict([{ field: "geocode", reason: "badQuery" }]),
        handler,
      }),
    },
  },
});
