import { createFileRoute } from "@tanstack/react-router";

import { conditional, notModified, serverError, upstreamUnavailable } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { versionCache } from "@/server/version-cache";
import { upstreamFailed } from "@/server/supabase/user-client";
import { errorText } from "@/lib/error-text";
import { readAllPages } from "@/lib/read-all-pages";
import { ReaderError } from "@/lib/reader-failure";

/**
 * INC-263 — THE PUBLIC CATEGORY TREE, VERSION-KEYED.
 *
 *   GET /api/categories/tree → { version, nodes: [...], pointers: [...] }
 *
 * Foundations turn 6 (INC-862 T2): on `defineRoute` with `auth: "anon"` (the
 * anon publishable client, RLS as anon — DEC-013 §10: no bearer, no session),
 * the one `versionCache` and the one `conditional()` responder.
 *
 * INC-265 — THE HOLD IS THE BODY, NEVER THE VERSION: ttl 0, so the version is
 * asked on EVERY request and the held body is reused only while that stamp is
 * unmoved; the browser holds the body sixty seconds and pays a 304.
 *
 * INC-246 — EVERY SURFACING IS SERVED: the pointers come back whole.
 */

const PATH = "/api/categories/tree";
const CACHE = "public, max-age=60, stale-while-revalidate=300";

/** The held value is the parsed body; conditional() serializes it. */
const TREE = versionCache<"tree", { body: unknown } | { matched: true }>({ ttlMs: 0, max: 1 });

/** The ten columns the two readers need — a translated name is never served. */
const NODE_COLUMNS =
  "id,name_en,name_am,slug,icon,display_order,allow_listings,is_catchall,image_url,image_thumb_url";

/** A door read that failed, typed with the status the mapping reads. */
function readFailed(error: unknown, status: number): ReaderError {
  return new ReaderError({ class: "server", status, message: errorText(error) });
}

async function handler(ctx: RouteContext): Promise<Response> {
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("anonymous client missing");
  const etagOf = (version: string) => `"cat-tree-${version}"`;
  try {
    const held = await TREE.get(
      "tree",
      async () => {
        const { data, error, status } = await supabase.rpc("get_category_tree_version");
        if (error) throw readFailed(error, status);
        const resolved = typeof data === "string" ? data : "";
        if (resolved === "") throw new Error("no category tree version");
        return resolved;
      },
      async (version) => {
        // A cold conditional hit: nothing is read and nothing is held.
        if (ctx.request.headers.get("If-None-Match") === etagOf(version)) return null;
        // INC-459 — both tables read page by page after the last id.
        const [nodes, pointers] = await Promise.all([
          readAllPages(
            (after, limit) => {
              const query = supabase
                .from("categories")
                .select(NODE_COLUMNS)
                .eq("is_active", true)
                .order("id")
                .limit(limit);
              return after === null ? query : query.gt("id", after);
            },
            (row) => row.id,
          ),
          // D33 — the pointer order is cat_primary_pointer's: display_order, then created_at.
          readAllPages(
            (after, limit) => {
              const query = supabase
                .from("category_tree_pointers")
                .select("id,child_id,parent_id,display_order,is_primary,created_at")
                .order("id")
                .limit(limit);
              return after === null ? query : query.gt("id", after);
            },
            (row) => row.id,
          ),
        ]);
        return {
          body: {
            version,
            nodes: [...nodes].sort(
              (a, b) => a.display_order - b.display_order || a.id.localeCompare(b.id),
            ),
            pointers: [...pointers]
              .sort(
                (a, b) =>
                  a.display_order - b.display_order ||
                  a.created_at.localeCompare(b.created_at) ||
                  a.id.localeCompare(b.id),
              )
              .map(({ child_id, parent_id, display_order, is_primary }) => ({
                child_id,
                parent_id,
                display_order,
                is_primary,
              })),
          },
        };
      },
    );
    if (held === null) {
      // build returned null only for the cold conditional hit.
      const version = await lastVersion(supabase);
      return notModified(etagOf(version), CACHE);
    }
    if (!("body" in held.value)) return notModified(etagOf(held.version), CACHE);
    return conditional(ctx.request, {
      etag: etagOf(held.version),
      body: held.value.body,
      cache: CACHE,
    });
  } catch (error) {
    const status = error instanceof ReaderError ? (error.failure.status ?? 500) : 500;
    if (error instanceof ReaderError && upstreamFailed({ message: error.message }, status)) {
      return upstreamUnavailable(PATH, "category tree read", status);
    }
    return serverError(PATH, error);
  }
}

export const Route = createFileRoute("/api/categories/tree")({
  server: { handlers: { GET: defineRoute({ path: PATH, auth: "anon", handler }) } },
});
