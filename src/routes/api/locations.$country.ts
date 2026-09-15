import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import { bundleEtag } from "@/i18n/bundle";
import type { Database } from "@/integrations/supabase/types";

/**
 * L1c-C — THE PUBLIC PER-COUNTRY LOCATION TREE.
 *
 *   GET /api/locations/:country → { country, version, nodes: [...] }
 *
 * Structurally the translation bundle route (`api/i18n.$lang.ts`): the data's
 * OWN version is the cache validator, an in-process map keeps one entry per
 * country, and a conditional request costs a 304. Every visibility decision was
 * settled in the database read (`get_location_tree`, migration efbee3c4): an
 * open market, an active anchor, and a row only when every ancestor is active.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session, no
 * `has_permission`. The anon publishable client is built INSIDE the handler
 * because workerd injects bindings per request (F1).
 *
 * A CLOSED OR UNKNOWN MARKET IS A 404, NEVER AN EMPTY 200, and never cached —
 * opening a market must be visible on the next request.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const COUNTRY_RE = /^[A-Za-z]{2}$/;
const MAX_AGE = 300;
/** Same freshness window as the translation bundle route, deliberately. */
const VERSION_TTL_MS = 15_000;

interface TreeNode {
  id: string;
  parent_id: string | null;
  level: string;
  slug: string;
  iso_3166_2: string | null;
  region_id: string | null;
  city_id: string | null;
  display_order: number | null;
  center_lat: number | null;
  center_lng: number | null;
  name_en: string | null;
}

interface CacheEntry {
  version: string;
  etag: string;
  body: string;
  checkedAt: number;
}

const treeCache = new Map<string, CacheEntry>();

function logRouteError(error: unknown): void {
  const message =
    error instanceof Error
      ? `${error.message} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`
      : String(error);
  console.error("[ssr-error]", "/api/locations", message);
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

/**
 * Law 5 — the payload carries the ELEVEN read columns and nothing else; a
 * translated name is never served from this route (names come from the entity
 * overlay, keyed by id).
 */
function shapeNode(row: TreeNode): TreeNode {
  return {
    id: row.id,
    parent_id: row.parent_id,
    level: row.level,
    slug: row.slug,
    iso_3166_2: row.iso_3166_2,
    region_id: row.region_id,
    city_id: row.city_id,
    display_order: row.display_order,
    center_lat: row.center_lat,
    center_lng: row.center_lng,
    name_en: row.name_en,
  };
}

async function handleGet(request: Request, rawCountry: string): Promise<Response> {
  if (!COUNTRY_RE.test(rawCountry.trim())) return fail("badCountry", 400);
  const country = rawCountry.trim().toUpperCase();

  const now = Date.now();
  const cached = treeCache.get(country);
  if (cached && now - cached.checkedAt < VERSION_TTL_MS) return respond(request, cached);

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") return fail("supabase server env missing", 500);

  const supabase = createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: version, error: versionError } = await supabase.rpc("get_location_tree_version", {
    p_country_code: country,
  });
  if (versionError) return fail(versionError.message, 502);

  const resolved = typeof version === "string" ? version : "";
  const etag = bundleEtag(`loc-${country}`, resolved);

  // Version unchanged → the cached body is still byte-correct; no tree query.
  if (cached && cached.version === resolved) {
    cached.checkedAt = now;
    return respond(request, cached);
  }

  // A conditional hit on a fresh version never touches the tree query either.
  if (request.headers.get("If-None-Match") === etag) {
    return new Response(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": cacheControlHeader() },
    });
  }

  const { data, error } = await supabase.rpc("get_location_tree", { p_country_code: country });
  if (error) return fail(error.message, 502);

  const rows = Array.isArray(data) ? (data as TreeNode[]) : [];
  // Zero rows is the read's own answer for a closed or unknown market.
  if (rows.length === 0) {
    treeCache.delete(country);
    return fail("closedOrUnknownMarket", 404);
  }

  const entry: CacheEntry = {
    version: resolved,
    etag,
    body: JSON.stringify({ country, version: resolved, nodes: rows.map(shapeNode) }),
    checkedAt: now,
  };
  treeCache.set(country, entry);
  return respond(request, entry);
}

export const Route = createFileRoute("/api/locations/$country")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          return await handleGet(request, params.country);
        } catch (error) {
          logRouteError(error);
          return fail(error instanceof Error ? error.message : "internal error", 500);
        }
      },
    },
  },
});
