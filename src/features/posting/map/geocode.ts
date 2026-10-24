import { callRoute, type RoutePath } from "@/lib/route-client";

/**
 * U6-C1-R3b-4 — THE MAP'S ONLY WAY TO A GEOCODER.
 *
 * THE BROWSER NEVER CALLS NOMINATIM. Both lookups go through our own routes
 * (`/api/geo/search`, `/api/geo/reverse`), which identify themselves upstream,
 * cache for a day and spend a per-seller dial. This module is the thin client
 * for them: a bearer, a shape, and a REASON when the answer is not a result —
 * never a silent empty list, because "no such place" and "the geocoder is down"
 * must not look the same to the seller (F4).
 */

export interface GeoPlace {
  label: string;
  lat: number;
  lng: number;
}

export type GeoReason = "rateLimited" | "unavailable" | "signedOut" | null;

export interface SearchAnswer {
  results: GeoPlace[];
  reason: GeoReason;
}

export interface ReverseAnswer {
  street: string | null;
  reason: GeoReason;
}

async function ask(path: RoutePath): Promise<{ payload: Record<string, unknown>; reason: GeoReason }> {
  const answer = await callRoute(path);
  if (answer.kind === "signedOut") return { payload: {}, reason: "signedOut" };
  if (answer.kind === "unreachable") return { payload: {}, reason: "unavailable" };
  if (answer.status === 401) return { payload: {}, reason: "signedOut" };
  if (!answer.ok) return { payload: {}, reason: "unavailable" };
  const payload = answer.payload ?? {};
  if (payload["ok"] !== true) {
    const refusals = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
    const first = (refusals[0] ?? {}) as Record<string, unknown>;
    return { payload, reason: first["reason"] === "rateLimited" ? "rateLimited" : "unavailable" };
  }
  return { payload, reason: null };
}

export async function searchPlaces(query: string): Promise<SearchAnswer> {
  const { payload, reason } = await ask(`/api/geo/search?q=${encodeURIComponent(query)}`);
  if (reason !== null) return { results: [], reason };
  const rows = Array.isArray(payload["results"]) ? payload["results"] : [];
  return {
    results: rows
      .map((entry) => {
        const row = (entry ?? {}) as Record<string, unknown>;
        const lat = Number(row["lat"]);
        const lng = Number(row["lng"]);
        const label = typeof row["label"] === "string" ? row["label"] : "";
        return Number.isFinite(lat) && Number.isFinite(lng) && label !== ""
          ? { label, lat, lng }
          : null;
      })
      .filter((row): row is GeoPlace => row !== null),
    reason: null,
  };
}

export async function reverseStreet(lat: number, lng: number): Promise<ReverseAnswer> {
  const { payload, reason } = await ask(`/api/geo/reverse?lat=${lat}&lng=${lng}`);
  if (reason !== null) return { street: null, reason };
  return {
    street:
      typeof payload["street"] === "string" && payload["street"] !== "" ? payload["street"] : null,
    reason: null,
  };
}

/**
 * The approximate circle's radius, in metres — the privacy promise, in one place.
 * INC-389: an approx pin is shown at two decimals, which moves a point by up to
 * 0.005° on each axis — about 786 m on the diagonal at the equator, less
 * further north. 800 m keeps the real pin inside the drawn area for every pin.
 */
export const APPROX_RADIUS_M = 800;

/**
 * W6b-2 C3 — a place's outline through OUR route (never Nominatim from here).
 * `null` for no outline or any refusal: the map then draws a circle instead.
 */
export async function readOutline(query: string): Promise<unknown> {
  const { payload, reason } = await ask(`/api/geo/outline?q=${encodeURIComponent(query)}`);
  if (reason !== null) return null;
  const outline = payload["outline"];
  return outline !== null && typeof outline === "object" ? outline : null;
}
