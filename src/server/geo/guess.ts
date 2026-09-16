/**
 * LOCATIONS ERA L4b — THE SHARED GEO JUDGE (B2: one utility per concern).
 *
 * The three-branch judge that used to live inline in `src/routes/api/geo.ts`
 * (L4a spike) now lives here, so the route AND the root's SSR context read the
 * SAME judgement — there is no second copy to drift.
 *
 * THE JUDGE (DEC-063, pre-committed — this order and nothing else):
 *   1. the Cloudflare `cf` object, when it carries a `country` → "cf-object";
 *   2. else the `cf-ipcountry` header, exactly two letters → "cf-header"
 *      (country only — the DEC-063 verdict of 2026-09-16: the edge gives the
 *      COUNTRY and nothing finer);
 *   3. else all three null → "none".
 *
 * No other fallback, no default market, no `x-forwarded-*` parsing, and nothing
 * is persisted — the guess is a read of the request and nothing more (law 10:
 * the guess is NEVER written to the saved-area cookie).
 *
 * F4 / I4 — the guess must never take a page down: a throw logs
 * `[ssr-error] geo-guess <message>` and returns the "none" answer. Values are
 * echoed as strings trimmed to 64 characters and are never rendered as HTML.
 */

export type GeoSource = "cf-object" | "cf-header" | "none";

export interface GeoAnswer {
  country: string | null;
  regionCode: string | null;
  city: string | null;
  source: GeoSource;
}

export const GEO_NONE: GeoAnswer = {
  country: null,
  regionCode: null,
  city: null,
  source: "none",
};

const COUNTRY_RE = /^[A-Za-z]{2}$/;

/** Echoed as a string, trimmed to 64 chars; anything else becomes null. */
function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim().slice(0, 64);
  return trimmed === "" ? null : trimmed;
}

interface CloudflareProperties {
  country?: unknown;
  regionCode?: unknown;
  city?: unknown;
}

/**
 * A7 CENSUS RULING (L4a): no export of `@tanstack/react-start/server` hands out
 * the nitro request event, so the only seam is the non-standard `cf` property
 * workerd hangs on the incoming `Request` itself. In the node runtime the
 * property is absent and the judge falls through to branch 2 or 3.
 */
function cloudflareObject(request: Request): CloudflareProperties | null {
  const cf = (request as Request & { cf?: unknown }).cf;
  return cf !== null && typeof cf === "object" ? (cf as CloudflareProperties) : null;
}

export function geoGuess(request: Request): GeoAnswer {
  try {
    // (1) the cf object
    const cf = cloudflareObject(request);
    const cfCountry = text(cf?.country);
    if (cfCountry !== null) {
      return {
        country: cfCountry.toUpperCase(),
        regionCode: text(cf?.regionCode),
        city: text(cf?.city),
        source: "cf-object",
      };
    }

    // (2) the cf-ipcountry header — two letters, country only
    const header = text(request.headers.get("cf-ipcountry"));
    if (header !== null && COUNTRY_RE.test(header)) {
      return { country: header.toUpperCase(), regionCode: null, city: null, source: "cf-header" };
    }

    // (3) no guess
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
