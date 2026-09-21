import { createFileRoute } from "@tanstack/react-router";

import {
  cacheGet,
  cachePut,
  fakeReverse,
  GEOCODE_PER_HOUR,
  isFakeGeocode,
  nominatim,
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
 */

const PATH = "/api/geo/reverse";

function coord(value: string | null, limit: number): number | null {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < -limit || parsed > limit) return null;
  return parsed;
}

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

  const params = new URL(request.url).searchParams;
  const lat = coord(params.get("lat"), 90);
  const lng = coord(params.get("lng"), 180);
  if (lat === null || lng === null) return refusal("geocode", "badCoordinates");

  const key = `reverse:${lat.toFixed(4)},${lng.toFixed(4)}`;
  const cached = cacheGet(key);
  if (cached !== null) {
    return routeJson({ ok: true, street: cached[0]?.label ?? null, cached: true }, 200);
  }

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
    if (payload === null) return refusal("geocode", "geocoderUnavailable");
    const row = (payload ?? {}) as Record<string, unknown>;
    const label = typeof row["display_name"] === "string" ? row["display_name"] : "";
    street = label === "" ? null : label;
  }

  // The door caps a street line at 200 characters; a long upstream label is
  // trimmed here rather than refused there.
  const trimmed = street === null ? null : street.slice(0, 200);
  cachePut(key, trimmed === null ? [] : [{ label: trimmed, lat, lng }]);
  return routeJson({ ok: true, street: trimmed }, 200);
}

export const Route = createFileRoute("/api/geo/reverse")({
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
