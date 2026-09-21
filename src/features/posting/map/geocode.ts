import { supabase } from "@/integrations/supabase/client";

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

async function bearer(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

async function ask(path: string): Promise<{ payload: Record<string, unknown>; reason: GeoReason }> {
  const token = await bearer();
  if (token === null) return { payload: {}, reason: "signedOut" };
  try {
    const response = await fetch(path, {
      headers: { Authorization: `Bearer ${token}`, accept: "application/json" },
    });
    if (response.status === 401) return { payload: {}, reason: "signedOut" };
    if (!response.ok) return { payload: {}, reason: "unavailable" };
    const payload = (await response.json()) as Record<string, unknown>;
    if (payload["ok"] !== true) {
      const refusals = Array.isArray(payload["refusals"]) ? payload["refusals"] : [];
      const first = (refusals[0] ?? {}) as Record<string, unknown>;
      return { payload, reason: first["reason"] === "rateLimited" ? "rateLimited" : "unavailable" };
    }
    return { payload, reason: null };
  } catch {
    return { payload: {}, reason: "unavailable" };
  }
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

/** The approximate circle's radius, in metres — the privacy promise, in one place. */
export const APPROX_RADIUS_M = 500;
