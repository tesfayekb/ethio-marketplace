import { createFileRoute } from "@tanstack/react-router";

/**
 * LOCATIONS ERA L4a — THE GEO-GUESS SPIKE (A7 first-of-kind).
 *
 *   GET /api/geo → { country, regionCode, city, source }
 *
 * THE JUDGE (DEC-063, pre-committed — this order and nothing else):
 *   1. the Cloudflare `cf` object, if it is reachable and carries `country`
 *      → source "cf-object";
 *   2. else the `cf-ipcountry` request header, when it is exactly two letters
 *      → source "cf-header" (country only);
 *   3. else all three null → source "none".
 *
 * There is NO other fallback, no default country, no `x-forwarded-*` parsing,
 * and NOTHING is persisted — no cookie, no storage, no database row. The guess
 * is a read of the request and nothing more.
 *
 * A7 CENSUS RULING: no export of `@tanstack/react-start/server` hands out the
 * nitro request event or a `cf` accessor — the surface is
 * `node_modules/@tanstack/start-server-core/dist/esm/request-response.d.ts:8`
 * `getRequest(): Request`. On the Cloudflare preset (vite.config.ts:26,
 * `cloudflare-module`) workerd hangs its non-standard `cf` property on that
 * very incoming Request, so branch 1 reads `request.cf` off the handler's own
 * request. In the node runtime the property is absent and the judge falls
 * through — which is exactly what GE-1 asserts.
 *
 * F4 / I4 — the guess must never take a page down: every throw logs
 * `[ssr-error] /api/geo <message>` and still answers `{ source: "none" }` with
 * nulls. Values are echoed as strings trimmed to 64 characters and are never
 * rendered as HTML.
 */

type GeoSource = "cf-object" | "cf-header" | "none";

interface GeoAnswer {
  country: string | null;
  regionCode: string | null;
  city: string | null;
  source: GeoSource;
}

const NONE: GeoAnswer = { country: null, regionCode: null, city: null, source: "none" };

const COUNTRY_RE = /^[A-Za-z]{2}$/;

function logRouteError(error: unknown): void {
  const message =
    error instanceof Error
      ? `${error.message} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`
      : String(error);
  console.error("[ssr-error]", "/api/geo", message);
}

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

function cloudflareObject(request: Request): CloudflareProperties | null {
  const cf = (request as Request & { cf?: unknown }).cf;
  return cf !== null && typeof cf === "object" ? (cf as CloudflareProperties) : null;
}

function judge(request: Request): GeoAnswer {
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
    return {
      country: header.toUpperCase(),
      regionCode: null,
      city: null,
      source: "cf-header",
    };
  }

  // (3) no guess
  return NONE;
}

function answer(payload: GeoAnswer): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/geo")({
  server: {
    handlers: {
      GET: ({ request }) => {
        try {
          return answer(judge(request));
        } catch (error) {
          logRouteError(error);
          return answer(NONE);
        }
      },
    },
  },
});
