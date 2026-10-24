import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { cursor, encodeCursor } from "@/lib/schemas/cursor";
import { readFailed } from "@/lib/reader-failure";
import { clientError, ok, readFailure, serverError } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";

/**
 * Bundle 19 turn 16 (D201 §12) — THE SELLER PAGE'S READ DOOR.
 *
 *   GET /api/seller?key=<key>[&after=<base64url cursor>]
 *     → { seller, cards, next }
 *
 * One page of the seller's live ads from `seller_feed_page` (feed_page's card
 * shape and order). The key is the seller's alias lower-cased, never an id.
 * `next` is base64url of the function's cursor JSON — the same encoding the
 * feed's door uses, through the shared cursor codec.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session.
 * The anon publishable client is built INSIDE the handler because workerd
 * injects bindings per request (F1). No in-process cache.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const PATH = "/api/seller";
const SellerQuery = z.object({
  key: z.string().max(60),
  after: cursor(z.record(z.string(), z.unknown())).optional(),
});

/** INC-802 — every client refusal this route sends, as a closed set. */
type ClientCode = "badKey" | "badCursor" | "badSize" | "unknownSeller";

/** The database's error names mapped to this route's fixed codes. */
const BAD: Readonly<Record<string, ClientCode>> = {
  "seller_feed_page: badCursor": "badCursor",
  "seller_feed_page: badSize": "badSize",
};

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof SellerQuery>>,
): Promise<Response> {
  const { key, after } = ctx.query;
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("anonymous client missing");
  const started = Date.now();
  const { data, error, status } = await supabase.rpc("seller_feed_page", {
    p_seller_key: key,
    p_after: (after ?? undefined) as never,
    p_size: 20,
  } as never);
  const took = Date.now() - started;
  if (took > 5000) console.warn("[slow-rpc]", "seller_feed_page", took);

  if (error) {
    const message = error.message ?? "";
    if (message.includes("seller_feed_page: unknownSeller")) {
      return clientError("unknownSeller", 404);
    }
    for (const [name, code] of Object.entries(BAD)) {
      if (message.includes(name)) return clientError(code, 400);
    }
    return readFailure(PATH, "seller read", readFailed(error, status));
  }

  const page = data as {
    seller?: unknown;
    cards?: unknown;
    next?: unknown;
  } | null;
  // F4 — an answer without cards and without an error is a failure, never an
  // empty page.
  if (page === null || typeof page !== "object" || !Array.isArray(page.cards)) {
    return serverError(PATH, new Error("seller_feed_page returned no page"));
  }
  const body = {
    seller: page.seller ?? null,
    cards: page.cards,
    next: page.next === null || page.next === undefined ? null : encodeCursor(page.next),
  };
  return ok(body, {
    cache: "public, max-age=60, stale-while-revalidate=300",
    headers: { Vary: "Accept-Encoding" },
  });
}
export const Route = createFileRoute("/api/seller")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        query: SellerQuery,
        badShape: (issue) => clientError(issue.path === "after" ? "badCursor" : "badKey", 400),
        handler,
      }),
    },
  },
});
