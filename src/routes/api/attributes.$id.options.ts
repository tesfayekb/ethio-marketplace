import { createFileRoute } from "@tanstack/react-router";

import { userClientFromRequest } from "@/server/supabase/user-client";

/**
 * U6-A2-C — THE LAZY OPTION LIST (DEC-053).
 *
 *   GET /api/attributes/<id>/options → { options: [...], version }
 *
 * A preset list can be thousands of rows (every make and model), so it is NEVER
 * shipped with the posting form: the form asks for one attribute's options when
 * the seller opens that control, and the answer is cached hard.
 *
 * Anon is allowed — an option label is public reference data, and both reads are
 * `SECURITY DEFINER` functions granted to `anon` (no bearer, no authority, F3).
 *
 * FRESHNESS, in three layers, the shape the locations and bundle routes use:
 *   1 `get_attribute_options_version` → an in-process cache good for 15 s
 *   2 the version IS the ETag, so a conditional request costs a 304
 *   3 `public, max-age=60, stale-while-revalidate=300` for the browser (INC-243)
 *
 * CENSUS NOTE: `attributes` carries no active flag of its own — an option row's
 * `active` field is what the door already filters — so 404 here means an id no
 * attribute has.
 */

/**
 * INC-243 — A CURATOR'S COMMIT MUST REACH AN OPEN FORM. The version already moves
 * on a file commit (`admin_commit_attribute_import` writes `attributes.updated_at`,
 * which `get_attribute_options_version` hashes), so the stale seam was the FIVE
 * MINUTES a browser was told to keep the body without asking. A minute of
 * freshness with five of stale-while-revalidate keeps the list free on a tap and
 * costs a 304 after a change.
 */
const MAX_AGE = 60;
const SWR = 300;
const CACHE_TTL_MS = 15_000;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface CacheEntry {
  etag: string;
  body: string;
  checkedAt: number;
}

const cache = new Map<string, CacheEntry>();
/** INC-298 — the cache is bounded; when full, the least recently checked entry leaves. */
const CACHE_MAX = 512;

function remember(id: string, entry: CacheEntry): void {
  cache.delete(id);
  if (cache.size >= CACHE_MAX) {
    let oldestId: string | null = null;
    let oldestAt = Number.POSITIVE_INFINITY;
    for (const [key, value] of cache) {
      if (value.checkedAt < oldestAt) {
        oldestAt = value.checkedAt;
        oldestId = key;
      }
    }
    if (oldestId !== null) cache.delete(oldestId);
  }
  cache.set(id, entry);
}

function logRouteError(id: string, error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error("[ssr-error]", `/api/attributes/${id}/options`, message);
}

function fail(id: string, error: string, status: number): Response {
  if (status >= 500) logRouteError(id, error);
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function respond(request: Request, entry: CacheEntry): Response {
  // INC-397 — signed-in callers only, so no shared cache may hold the answer.
  const cacheControl = `private, max-age=${MAX_AGE}, stale-while-revalidate=${SWR}`;
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

async function handleGet(request: Request, id: string): Promise<Response> {
  if (!UUID_RE.test(id)) return fail(id, "unknown attribute", 404);

  // INC-397 — the options are not handed out: the bearer is verified first, and
  // the reads run as the caller (anon no longer holds EXECUTE).
  const caller = await userClientFromRequest(request);
  if (caller.reason !== null || caller.supabase === null) {
    return fail(id, "not signed in", caller.reason === "serverEnv" ? 500 : 401);
  }
  const supabase = caller.supabase;

  const now = Date.now();
  const hit = cache.get(id);
  if (hit && now - hit.checkedAt < CACHE_TTL_MS) return respond(request, hit);

  const version = await supabase.rpc("get_attribute_options_version", { p_attribute_id: id });
  if (version.error) return fail(id, version.error.message, 502);
  const stamp = typeof version.data === "string" ? version.data : "";
  if (stamp === "") return fail(id, "unknown attribute", 404);

  // The version is unchanged: the body already held is still the answer, and no
  // second read is paid for.
  if (hit && hit.etag === `"attr-options-${stamp}"`) {
    const entry: CacheEntry = { ...hit, checkedAt: now };
    remember(id, entry);
    return respond(request, entry);
  }

  const { data, error } = await supabase.rpc("get_attribute_options", { p_attribute_id: id });
  if (error) {
    if (error.message.includes("attributeNotFound")) return fail(id, "unknown attribute", 404);
    return fail(id, error.message, 502);
  }

  const entry: CacheEntry = {
    etag: `"attr-options-${stamp}"`,
    body: JSON.stringify(data ?? { options: [], version: stamp }),
    checkedAt: now,
  };
  remember(id, entry);
  return respond(request, entry);
}

export const Route = createFileRoute("/api/attributes/$id/options")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const id = String(params.id ?? "");
        try {
          return await handleGet(request, id);
        } catch (error) {
          logRouteError(id, error);
          return fail(id, error instanceof Error ? error.message : "internal error", 500);
        }
      },
    },
  },
});
