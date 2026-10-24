/**
 * U6-C1-R3b-4 — THE GEOCODER SEAM (B2: one helper, no second copy).
 *
 * Both geocoding routes — forward (`/api/geo/search`) and reverse
 * (`/api/geo/reverse`) — need the same four things: the dial's ceiling, the
 * 24-hour in-process cache (one versionCache), the identified outbound call, and the E2E table that
 * stands in for the network. They live here once so the two routes cannot drift.
 *
 * THE CACHE IS A COURTESY, NOT A STORE OF RECORD. A worker that recycles loses
 * it and simply re-asks; nothing reads it as truth and nothing persists through
 * it. Its only job is to keep a seller who types six characters from costing
 * OpenStreetMap six lookups.
 *
 * THE USER-AGENT IS REQUIRED. Nominatim's usage policy refuses anonymous
 * traffic, so every outbound call identifies this application and carries a
 * bounded timeout: an upstream that hangs must become a translated
 * "unavailable", never a request the seller waits on forever (F4).
 */

import { upstream } from "@/server/upstream";
import { logRouteError } from "@/server/supabase/user-client";
import { versionCache } from "@/server/version-cache";
import { aiFakeMode } from "@/server/ai/meter";

export interface GeoPlace {
  label: string;
  lat: number;
  lng: number;
}

const CACHE_MS = 24 * 60 * 60 * 1000;
const UPSTREAM_MS = 6000;
const UPSTREAM = "https://nominatim.openstreetmap.org";
const USER_AGENT = "ethio.com classifieds (+https://ethio.com; listings map pin)";

/**
 * Foundations turn 9 — THE ONE GEOCODE CACHE (search, reverse and outline). The
 * TTL is 24 hours from insertion; the version is the 24-hour UTC bucket, read
 * only once the TTL has passed — by then the bucket has moved, so the entry
 * rebuilds. A constant version would never let an entry expire. The bound is 800
 * entries with least-recent eviction.
 */
const GEO_CACHE = versionCache<string, { value: unknown }>({ ttlMs: CACHE_MS, max: 800 });

/** A cached build: a build that throws is never cached. */
export async function geoCached<T>(
  key: string,
  build: () => Promise<T>,
): Promise<{ value: T; cached: boolean }> {
  let built = false;
  const held = await GEO_CACHE.get(
    key,
    async () => String(Math.floor(Date.now() / CACHE_MS)),
    async () => {
      built = true;
      return { value: await build() };
    },
  );
  if (held === null) throw new Error("geocode cache answered nothing");
  return { value: held.value.value as T, cached: !built };
}

/** A build's typed sentinel: nominatim answered null, so nothing is cached. */
export class GeocoderUnavailable extends Error {
  constructor() {
    super("geocoder unavailable");
    this.name = "GeocoderUnavailable";
  }
}

export function isFakeGeocode(): boolean {
  return aiFakeMode("E2E_FAKE_GEOCODE");
}

/**
 * THE E2E TABLE. One known place, answered for the query the suite types, plus a
 * deliberate empty answer for anything else — so a test can prove both the hit
 * and the miss without an upstream service in the loop.
 */
const FAKE_BOLE: GeoPlace = {
  label: "Bole, Addis Ababa, Ethiopia",
  lat: 8.98,
  lng: 38.79,
};

export function fakeSearch(query: string): GeoPlace[] {
  return query.toLowerCase().includes("bole") ? [FAKE_BOLE] : [];
}

export function fakeReverse(): GeoPlace {
  return FAKE_BOLE;
}

/**
 * ONE identified, bounded call to the upstream. `null` means "the geocoder could
 * not be reached or refused" — the caller turns that into a named refusal rather
 * than a 500, because the seller's own answers are not at fault.
 */
export async function nominatim(
  endpoint: "search" | "reverse",
  params: Record<string, string>,
): Promise<unknown | null> {
  const url = new URL(`${UPSTREAM}/${endpoint}`);
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, value);
  try {
    const response = await upstream(
      url.toString(),
      { headers: { "User-Agent": USER_AGENT, Accept: "application/json" } },
      { timeoutMs: UPSTREAM_MS, label: `nominatim:${endpoint}` },
    );
    if (!response.ok) {
      logRouteError(`/api/geo/${endpoint}`, `upstream ${response.status}`);
      return null;
    }
    return (await response.json()) as unknown;
  } catch (error) {
    logRouteError(`/api/geo/${endpoint}`, error);
    return null;
  }
}
