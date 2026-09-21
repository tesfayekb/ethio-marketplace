/**
 * U6-C1-R3b-4 — THE GEOCODER SEAM (B2: one helper, no second copy).
 *
 * Both geocoding routes — forward (`/api/geo/search`) and reverse
 * (`/api/geo/reverse`) — need the same four things: the dial's ceiling, the
 * 24-hour in-process cache, the identified outbound call, and the E2E table that
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

export interface GeoPlace {
  label: string;
  lat: number;
  lng: number;
}

/** DEC-071's dial for geocoding: sixty lookups an hour per signed-in seller. */
export const GEOCODE_PER_HOUR = 60;

const CACHE_MS = 24 * 60 * 60 * 1000;
const UPSTREAM_MS = 6000;
const UPSTREAM = "https://nominatim.openstreetmap.org";
const USER_AGENT = "ethio.com classifieds (+https://ethio.com; listings map pin)";

interface CacheEntry {
  at: number;
  value: GeoPlace[];
}

const cache = new Map<string, CacheEntry>();

export function cacheGet(key: string): GeoPlace[] | null {
  const found = cache.get(key);
  if (found === undefined) return null;
  if (Date.now() - found.at > CACHE_MS) {
    cache.delete(key);
    return null;
  }
  return found.value;
}

export function cachePut(key: string, value: GeoPlace[]): void {
  // A bound, so a worker that lives a long day cannot grow without end.
  if (cache.size > 500) cache.clear();
  cache.set(key, { at: Date.now(), value });
}

export function isFakeGeocode(): boolean {
  return process.env["E2E_FAKE_GEOCODE"] === "1";
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
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), UPSTREAM_MS);
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT, Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) {
      console.error("[ssr-error]", `/api/geo/${endpoint}`, `upstream ${response.status}`);
      return null;
    }
    return (await response.json()) as unknown;
  } catch (error) {
    console.error(
      "[ssr-error]",
      `/api/geo/${endpoint}`,
      error instanceof Error ? error.message : String(error),
    );
    return null;
  } finally {
    clearTimeout(timer);
  }
}
