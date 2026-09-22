import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * INC-263 — THE PUBLIC CATEGORY TREE, VERSION-KEYED.
 *
 *   GET /api/categories/tree → { version, nodes: [...], pointers: [...] }
 *
 * CENSUS (why this route exists). The tree was the ONLY public reference read
 * with no version and no server seam: `features/categories/category-tree.ts`
 * queried `categories` + `category_tree_pointers` straight from the browser and
 * kept the first answer in a module-level cache for the whole page session, with
 * nothing that could ever expire it. A categories import therefore stayed
 * invisible — baby-food absent, food-beverages still under its old parent — for
 * as long as the tab lived, however long after the commit.
 *
 * The option lists solved exactly this in INC-243, so this route is deliberately
 * their shape, in three layers:
 *   1 `get_category_tree_version()` → an in-process cache good for 15 s
 *   2 the version IS the ETag, so a conditional request costs a 304
 *   3 `public, max-age=60, stale-while-revalidate=300` for the browser
 *
 * So an import is visible inside the same sixty-second window the option lists
 * already promise, and a rail or wizard mount in between pays a 304.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session, no
 * `has_permission`. The anon publishable client is built INSIDE the handler
 * because workerd injects bindings per request (F1).
 *
 * INC-246 — EVERY SURFACING IS SERVED. The pointers come back whole, both rows
 * of a category with a secondary parent included; which parent is "first" is the
 * reader's business, not this route's.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const MAX_AGE = 60;
const SWR = 300;

/**
 * INC-265 — THE HOLD IS THE BODY, NEVER THE VERSION.
 *
 * The first landing of this route also held the VERSION for fifteen seconds: a
 * request inside that window was answered from `cached` without asking the
 * database whether the tree had moved. On one process that serves many readers
 * — the built node serve the suite runs, and equally a warm worker — a category
 * created a moment ago was therefore absent from the tree for up to fifteen
 * seconds, and every reader asking in that window got the same stale answer.
 * That is the exact staleness INC-263 was opened about, one seam further in.
 *
 * So the version is asked on EVERY request (one short read-only stamp) and the
 * cached BODY is reused only while that stamp is unmoved — which is where the
 * real saving was anyway: the two tree queries. The browser still holds the body
 * for sixty seconds and pays a 304 to revalidate, so INC-263's promise stands
 * and a curator's import is visible on the next read, not fifteen seconds later.
 */
interface CacheEntry {
  version: string;
  etag: string;
  body: string;
}

let cached: CacheEntry | null = null;

function logRouteError(error: unknown): void {
  const message = error instanceof Error ? error.message : String(error);
  console.error("[ssr-error]", "/api/categories/tree", message);
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
  return `public, max-age=${MAX_AGE}, stale-while-revalidate=${SWR}`;
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

/** The ten columns the two readers need — a translated name is never served. */
const NODE_COLUMNS =
  "id,name_en,name_am,slug,icon,display_order,allow_listings,is_catchall,image_url,image_thumb_url";

async function handleGet(request: Request): Promise<Response> {
  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") return fail("supabase server env missing", 500);

  const supabase = createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // EVERY request asks the stamp (INC-265): the body may be held, the truth of
  // whether it is still the answer may not.
  const { data: version, error: versionError } = await supabase.rpc("get_category_tree_version");
  if (versionError) return fail(versionError.message, 502);
  const resolved = typeof version === "string" ? version : "";
  if (resolved === "") return fail("no category tree version", 502);
  const etag = `"cat-tree-${resolved}"`;

  // Version unchanged → the body already held is still the answer, and neither
  // the categories nor the pointers are read a second time.
  if (cached !== null && cached.version === resolved) return respond(request, cached);

  // A conditional hit on a fresh version never touches the tree queries either.
  if (request.headers.get("If-None-Match") === etag) {
    return new Response(null, {
      status: 304,
      headers: { ETag: etag, "Cache-Control": cacheControlHeader() },
    });
  }

  const [nodes, pointers] = await Promise.all([
    supabase
      .from("categories")
      .select(NODE_COLUMNS)
      .eq("is_active", true)
      .order("display_order", { ascending: true }),
    supabase
      .from("category_tree_pointers")
      .select("child_id,parent_id,display_order")
      .order("display_order", { ascending: true }),
  ]);
  // F4 — a failed read is a failure, never an empty tree that reads as "there
  // are no categories".
  if (nodes.error) return fail(nodes.error.message, 502);
  if (pointers.error) return fail(pointers.error.message, 502);

  const entry: CacheEntry = {
    version: resolved,
    etag,
    body: JSON.stringify({
      version: resolved,
      nodes: nodes.data ?? [],
      pointers: pointers.data ?? [],
    }),
  };
  cached = entry;
  return respond(request, entry);
}

export const Route = createFileRoute("/api/categories/tree")({
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
