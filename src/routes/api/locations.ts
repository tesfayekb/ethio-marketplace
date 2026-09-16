import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * LOCATIONS ERA L4b — THE PUBLIC OPEN-MARKETS LIST.
 *
 *   GET /api/locations → { countries: [{ code, name_en, unit_system,
 *                          currency_code, display_order, anchor_slug }] }
 *
 * Structurally the per-country tree route (`api/locations.$country.ts`): an
 * in-process cache, a strong validator, a 304 on a conditional request, and the
 * anon publishable client built INSIDE the handler because workerd injects
 * bindings per request (F1).
 *
 * The read is `get_open_countries()` (migration efbee3c4): every visibility
 * decision was settled there — only a market a visitor may browse comes back.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session, no
 * `has_permission`.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const MAX_AGE = 300;
/** Same freshness window as the tree and bundle routes, deliberately. */
const CACHE_TTL_MS = 15_000;

interface OpenCountry {
  code: string;
  name_en: string | null;
  unit_system: string | null;
  currency_code: string | null;
  display_order: number | null;
  anchor_slug: string | null;
}

interface CacheEntry {
  etag: string;
  body: string;
  checkedAt: number;
}

let cached: CacheEntry | null = null;

function logRouteError(error: unknown): void {
  const message =
    error instanceof Error
      ? `${error.message} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`
      : String(error);
  console.error("[ssr-error]", "/api/locations", message);
}

/**
 * The validator is a HASH OF THE PAYLOAD (FNV-1a, 32-bit): opening or closing a
 * market changes the body and therefore the tag, with nothing to remember to
 * bust. A weak tag is deliberate — the body is semantically, not byte, stable.
 */
function payloadEtag(body: string): string {
  let hash = 0x811c9dc5;
  for (let i = 0; i < body.length; i += 1) {
    hash ^= body.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `"open-markets-${hash.toString(16)}"`;
}

function serverEnv(name: string): string {
  // Read INSIDE the handler: workerd injects bindings per request (F1).
  return process.env[name] ?? "";
}

function fail(error: string, status: number): Response {
  if (status >= 500) logRouteError(error);
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function cacheControlHeader(): string {
  return `public, max-age=${MAX_AGE}, stale-while-revalidate=3600`;
}

function respond(request: Request, entry: CacheEntry): Response {
  const cacheControl = cacheControlHeader();
  if (request.headers.get("If-None-Match") === entry.etag) {
    return new Response(null, {
      status: 304,
      headers: { ETag: entry.etag, "Cache-Control": cacheControl },
    });
  }
  return new Response(entry.body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": cacheControl,
      ETag: entry.etag,
      Vary: "Accept-Encoding",
    },
  });
}

/** The six published fields and nothing else — no private column travels. */
function shapeCountry(row: OpenCountry): OpenCountry {
  return {
    code: (row.code ?? "").trim(),
    name_en: row.name_en,
    unit_system: row.unit_system,
    currency_code: row.currency_code,
    display_order: row.display_order,
    anchor_slug: row.anchor_slug,
  };
}

async function handleGet(request: Request): Promise<Response> {
  const now = Date.now();
  if (cached && now - cached.checkedAt < CACHE_TTL_MS) return respond(request, cached);

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") return fail("supabase server env missing", 500);

  const supabase = createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.rpc("get_open_countries");
  if (error) return fail(error.message, 502);

  const rows = Array.isArray(data) ? (data as OpenCountry[]) : [];
  const body = JSON.stringify({ countries: rows.map(shapeCountry) });
  const entry: CacheEntry = { etag: payloadEtag(body), body, checkedAt: now };
  cached = entry;
  return respond(request, entry);
}

export const Route = createFileRoute("/api/locations")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await handleGet(request);
        } catch (error) {
          logRouteError(error);
          return fail(error instanceof Error ? error.message : "internal error", 500);
        }
      },
    },
  },
});
