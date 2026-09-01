import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import { bundleEtag } from "@/i18n/bundle";
import type { Database } from "@/integrations/supabase/types";

/**
 * U4i ④ — THE CACHEABLE UI BUNDLE.
 *
 *   GET /api/i18n/:lang → { bundle: { key: value, … } }
 *
 * WHY A ROUTE AND NOT THE RPC: a PostgREST `rpc()` POST can never be cached by
 * a browser or an edge. This endpoint is a GET with a strong validator, so the
 * SECOND page view of a language costs one conditional request — or nothing at
 * all inside the freshness window.
 *
 * THE VALIDATOR IS THE DATA'S OWN VERSION. `get_ui_bundle_version(lang)`
 * (migration 20260902090000) hashes `max(updated_at) + count` over exactly the
 * rows `get_ui_bundle` returns: approved, non-null, live. So APPROVING a row,
 * EDITING an approved row, SYNCING new keys or PUBLISHING a language all move
 * the ETag on their own — nothing has to remember to bust a cache.
 *
 * CACHE POLICY: `public, max-age=300, stale-while-revalidate=3600`. Public
 * because the payload is the anon bundle and carries no per-user data (the RPC
 * itself refuses an unpublished language with `{}`). The gate LIST stays
 * `no-store` in the provider (law I6) — only this endpoint is the cached path.
 *
 * SECURITY: anon publishable key, no service role, no caller token read. The
 * two RPCs are the same gated definers the browser already calls.
 *
 * INC-096b/c: every 5xx logs into the reporter-grepped [ssr-error] channel.
 */

const LANG_RE = /^[a-z]{2,8}(-[a-z0-9]{2,8})?$/;
const MAX_AGE = 300;

function logRouteError(error: unknown): void {
  const message =
    error instanceof Error
      ? `${error.message} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`
      : String(error);
  console.error("[ssr-error]", "/api/i18n", message);
}

function serverEnv(name: string): string {
  // Read INSIDE the handler: workerd injects bindings per request (F1).
  return process.env[name] ?? "";
}

function fail(error: string, status: number): Response {
  if (status >= 500) logRouteError(error);
  return new Response(JSON.stringify({ error }), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function handleGet(request: Request, lang: string): Promise<Response> {
  const code = lang.trim().toLowerCase();
  if (!LANG_RE.test(code)) return fail("invalid language code", 400);

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") return fail("supabase server env missing", 500);

  const supabase = createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: version, error: versionError } = await supabase.rpc("get_ui_bundle_version", {
    p_lang: code,
  });
  if (versionError) return fail(versionError.message, 502);

  const etag = bundleEtag(code, typeof version === "string" ? version : "");
  const cacheControl = `public, max-age=${MAX_AGE}, stale-while-revalidate=3600`;

  // A conditional hit never touches the bundle query at all.
  if (request.headers.get("If-None-Match") === etag) {
    return new Response(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": cacheControl },
    });
  }

  const { data, error } = await supabase.rpc("get_ui_bundle", { p_lang: code });
  if (error) return fail(error.message, 502);

  return new Response(JSON.stringify({ lang: code, bundle: data ?? {} }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": cacheControl,
      ETag: etag,
      Vary: "Accept-Encoding",
    },
  });
}

export const Route = createFileRoute("/api/i18n/$lang")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        try {
          return await handleGet(request, params.lang);
        } catch (error) {
          logRouteError(error);
          return fail(error instanceof Error ? error.message : "internal error", 500);
        }
      },
    },
  },
});
