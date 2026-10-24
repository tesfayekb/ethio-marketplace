import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DIALS } from "@/lib/dials";
import { coordinate } from "@/lib/schemas/primitives";
import { ok, verdict } from "@/server/answer";
import {
  fakeReverse,
  geoCached,
  GeocoderUnavailable,
  isFakeGeocode,
  nominatim,
} from "@/server/geo/geocode";
import { defineRoute, type RouteContext } from "@/server/route";

/**
 * U6-C1-R3b-4 — THE REVERSE GEOCODER'S ROUTE.
 *
 *   GET /api/geo/reverse?lat=<n>&lng=<n>  →  { ok:true, street: <text|null> }
 *
 * The same four owners as the forward route (`/api/geo/search`), in the same
 * order — caller, dial, cache, shape — from the one shared helper. What comes
 * back is a STREET LINE the seller may edit, never an address the app asserts:
 * a reverse geocode is a guess, and the seller's own words win.
 *
 * The coordinates are rounded to four decimals for the cache key — about eleven
 * metres, so nudging the marker inside one building is one lookup, not ten.
 * Foundations turn 9: a missing or empty lat/lng is badCoordinates (never 0,0).
 */

const PATH = "/api/geo/reverse";
const ReverseQuery = z.object({ lat: coordinate(90), lng: coordinate(180) });

async function lookup(lat: number, lng: number): Promise<string | null> {
  let street: string | null;
  if (isFakeGeocode()) {
    street = fakeReverse().label;
  } else {
    const payload = await nominatim("reverse", {
      lat: String(lat),
      lon: String(lng),
      format: "jsonv2",
      zoom: "18",
    });
    if (payload === null) throw new GeocoderUnavailable();
    const row = (payload ?? {}) as Record<string, unknown>;
    const label = typeof row["display_name"] === "string" ? row["display_name"] : "";
    street = label === "" ? null : label;
  }
  // The door caps a street line at 200 characters; a long upstream label is
  // trimmed here rather than refused there.
  return street === null ? null : street.slice(0, 200);
}

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof ReverseQuery>>,
): Promise<Response> {
  const { lat, lng } = ctx.query;
  try {
    const { value: street, cached } = await geoCached(
      `reverse:${lat.toFixed(4)},${lng.toFixed(4)}`,
      () => lookup(lat, lng),
    );
    return ok({ ok: true, street, ...(cached ? { cached: true } : {}) });
  } catch (error) {
    if (error instanceof GeocoderUnavailable) {
      return verdict([{ field: "geocode", reason: "geocoderUnavailable" }]);
    }
    throw error;
  }
}

export const Route = createFileRoute("/api/geo/reverse")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "user",
        query: ReverseQuery,
        badShape: () => verdict([{ field: "geocode", reason: "badCoordinates" }]),
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
