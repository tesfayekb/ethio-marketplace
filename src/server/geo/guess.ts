/**
 * LOCATIONS ERA L4b-2 — THE SHARED GEO JUDGE (B2: one utility per concern).
 *
 * The judge that used to live inline in `src/routes/api/geo.ts` (L4a spike)
 * lives here, so the route AND the root's SSR context read the SAME judgement —
 * there is no second copy to drift.
 *
 * THE JUDGE (DEC-063, amended 2026-09-16 — the guess is as deep as the edge's
 * facts allow, geometry first. This order, pre-committed, and nothing else):
 *   1. the Cloudflare `cf` object, when it carries a `country` → "cf-object"
 *      (now also `latitude`/`longitude` when the object carries them);
 *   2. else the VISITOR-LOCATION headers — `cf-iplatitude` AND `cf-iplongitude`
 *      both parsing as finite decimals within ±90 / ±180 → "cf-visitor", with
 *      `cf-ipcity`, `cf-region-code` and `cf-ipcountry` alongside;
 *   3. else the `cf-ipcountry` header, exactly two letters → "cf-header"
 *      (country only — what the edge answers today);
 *   4. else all fields null → "none".
 *
 * EVERY FIELD IS VALIDATED ON ITS OWN. A malformed value drops THAT FIELD and
 * never the answer, so a mangled city can not cost the visitor their country.
 *
 * No other fallback, no third-party IP service, no `x-forwarded-*` parsing, no
 * default market, and nothing is persisted — the guess is a read of the request
 * and nothing more (law 10: the guess is NEVER written to the saved-area
 * cookie).
 *
 * CUTOVER NOTE: until ethio.com is served through the operator's Cloudflare zone
 * with "Add visitor location headers" enabled, production answers branch 3
 * (country only). The node E2E proves every branch by injected headers.
 *
 * F4 / I4 — the guess must never take a page down: a throw logs
 * `[ssr-error] geo-guess <message>` and returns the "none" answer. Text values
 * are trimmed to 64 characters and are never rendered as HTML.
 */

export type GeoSource = "cf-object" | "cf-visitor" | "cf-header" | "none";

export interface GeoAnswer {
  country: string | null;
  regionCode: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  source: GeoSource;
}

export const GEO_NONE: GeoAnswer = {
  country: null,
  regionCode: null,
  city: null,
  lat: null,
  lng: null,
  source: "none",
};

const COUNTRY_RE = /^[A-Za-z]{2}$/;
/** A city name: letters (any script), spaces, hyphens and apostrophes only. */
const CITY_RE = /^[\p{L}\p{M} '’-]+$/u;
const REGION_RE = /^[A-Za-z0-9-]+$/;

/** Echoed as a string, trimmed to 64 chars; anything else becomes null. */
function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, 64);
  return trimmed === "" ? null : trimmed;
}

function country(value: unknown): string | null {
  const raw = text(value);
  return raw !== null && COUNTRY_RE.test(raw) ? raw.toUpperCase() : null;
}

function city(value: unknown): string | null {
  const raw = text(value);
  return raw !== null && raw.length <= 64 && CITY_RE.test(raw) ? raw : null;
}

function regionCode(value: unknown): string | null {
  const raw = text(value);
  return raw !== null && raw.length <= 8 && REGION_RE.test(raw) ? raw : null;
}

/** A finite decimal inside `limit`; anything else drops the coordinate. */
function coordinate(value: unknown, limit: number): number | null {
  const raw = text(value);
  if (raw === null) return null;
  if (!/^[+-]?\d+(\.\d+)?$/.test(raw)) return null;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || Math.abs(parsed) > limit) return null;
  return parsed;
}

interface CloudflareProperties {
  country?: unknown;
  regionCode?: unknown;
  city?: unknown;
  latitude?: unknown;
  longitude?: unknown;
}

/**
 * A7 CENSUS RULING (L4a): no export of `@tanstack/react-start/server` hands out
 * the nitro request event, so the only seam is the non-standard `cf` property
 * workerd hangs on the incoming `Request` itself. In the node runtime the
 * property is absent and the judge falls through to branch 2, 3 or 4.
 */
function cloudflareObject(request: Request): CloudflareProperties | null {
  const cf = (request as Request & { cf?: unknown }).cf;
  return cf !== null && typeof cf === "object" ? (cf as CloudflareProperties) : null;
}

export function geoGuess(request: Request): GeoAnswer {
  try {
    // (1) the cf object
    const cf = cloudflareObject(request);
    const cfCountry = country(cf?.country);
    if (cfCountry !== null) {
      return {
        country: cfCountry,
        regionCode: regionCode(cf?.regionCode),
        city: city(cf?.city),
        lat: coordinate(cf?.latitude, 90),
        lng: coordinate(cf?.longitude, 180),
        source: "cf-object",
      };
    }

    // (2) the visitor-location headers — coordinates are the deepest fact the
    // edge offers, so they outrank the bare country header. A coordinate header
    // that is PRESENT but malformed discredits the whole visitor-location set
    // (the answer falls to the country header, GE-5); coordinate headers that
    // are ABSENT leave the city and region code standing on their own.
    const headers = request.headers;
    const rawLat = text(headers.get("cf-iplatitude"));
    const rawLng = text(headers.get("cf-iplongitude"));
    const lat = coordinate(rawLat, 90);
    const lng = coordinate(rawLng, 180);
    const coordinatesOffered = rawLat !== null || rawLng !== null;
    const coordinatesGood = lat !== null && lng !== null;
    if (coordinatesGood || !coordinatesOffered) {
      const visitorCity = city(headers.get("cf-ipcity"));
      const visitorRegion = regionCode(headers.get("cf-region-code"));
      if (coordinatesGood || visitorCity !== null || visitorRegion !== null) {
        return {
          country: country(headers.get("cf-ipcountry")),
          regionCode: visitorRegion,
          city: visitorCity,
          lat,
          lng,
          source: "cf-visitor",
        };
      }
    }

    // (3) the cf-ipcountry header — two letters, country only
    const header = country(headers.get("cf-ipcountry"));
    if (header !== null) {
      return {
        country: header,
        regionCode: null,
        city: null,
        lat: null,
        lng: null,
        source: "cf-header",
      };
    }

    // (4) no guess
    return GEO_NONE;
  } catch (error) {
    console.error(
      "[ssr-error]",
      "geo-guess",
      error instanceof Error ? error.message : String(error),
    );
    return GEO_NONE;
  }
}
