import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { bundleEtag } from "@/i18n/bundle";
import { readFailed } from "@/lib/reader-failure";
import { langCodeLoose } from "@/lib/schemas/primitives";
import {
  clientError,
  conditional,
  notModified,
  readFailure,
} from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { versionCache } from "@/server/version-cache";

/**
 * U4i ④ — THE CACHEABLE UI BUNDLE.
 *
 *   GET /api/i18n/:lang → { lang, bundle: { key: value, … } }
 *
 * WHY A ROUTE AND NOT THE RPC: a PostgREST `rpc()` POST can never be cached by
 * a browser or an edge; this GET carries a strong validator.
 *
 * THE VALIDATOR IS THE DATA'S OWN VERSION: `get_ui_bundle_version(lang)` moves
 * whenever an approved row, a sync or a publication changes the bundle.
 *
 * Foundations turn 6 (INC-862 T2): on `defineRoute` with `auth: "anon"` (anon
 * publishable key, no caller token read), the one `versionCache` (STAB-I18N
 * INC-164's per-language hold, now bounded to 32 languages) and the one
 * `conditional()` responder. The gate LIST stays `no-store` (law I6).
 */

const PATH = "/api/i18n/$lang";
const CACHE = "public, max-age=300, stale-while-revalidate=3600";

const params = z.object({ lang: langCodeLoose }).strict();

const BUNDLES = versionCache<string, { body: unknown }>({ ttlMs: 15_000, max: 32 });

async function handler(ctx: RouteContext<unknown, z.infer<typeof params>>): Promise<Response> {
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("anonymous client missing");
  const code = ctx.params.lang;
  let seen: string | null = null;
  try {
    const held = await BUNDLES.get(
      code,
      async () => {
        const { data, error, status } = await supabase.rpc("get_ui_bundle_version", {
          p_lang: code,
        });
        if (error) throw readFailed(error, status);
        seen = typeof data === "string" ? data : "";
        return seen;
      },
      async (version) => {
        // A cold conditional hit: the bundle is not read and nothing is held.
        if (ctx.request.headers.get("If-None-Match") === bundleEtag(code, version)) return null;
        const { data, error, status } = await supabase.rpc("get_ui_bundle", { p_lang: code });
        if (error) throw readFailed(error, status);
        return { body: { lang: code, bundle: data ?? {} } };
      },
    );
    // build answers null only for the cold conditional hit (ruled, turn 6).
    if (held === null) return notModified(bundleEtag(code, seen ?? ""), CACHE);
    return conditional(ctx.request, {
      etag: bundleEtag(code, held.version),
      body: held.value.body,
      cache: CACHE,
    });
  } catch (error) {
    return readFailure(PATH, "ui bundle read", error);
  }
}

export const Route = createFileRoute("/api/i18n/$lang")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        params,
        badShape: () => clientError("invalid language code", 400),
        handler,
      }),
    },
  },
});
