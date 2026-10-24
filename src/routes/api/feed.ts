import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { uuid } from "@/lib/schemas/primitives";
import { cursor, encodeCursor } from "@/lib/schemas/cursor";
import { readFailed } from "@/lib/reader-failure";
import { clientError, ok, readFailure, serverError } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";
import { errorText } from "@/lib/error-text";
import { PHOTO_LINK_SECONDS, readAndSignPhotoLinks } from "@/server/media/links";

/**
 * Bundle 10 E2b — THE PUBLIC FEED'S READ DOOR.
 *
 *   GET /api/feed?category=<uuid>&place=<uuid>&size=<1..50>&after=<cursor>
 *     → { cards, ladder, steps, next }
 *
 * One page of cards from `feed_page` (D108 order, the widening ladder, paging
 * after the last card). `next` is base64url of the function's cursor JSON.
 *
 * DEC-013 §10 — THE PUBLIC PATH CARRIES NO AUTHORITY: no bearer, no session, no
 * `has_permission`. The anon publishable client is built INSIDE the handler
 * because workerd injects bindings per request (F1). No in-process cache: the
 * answer depends on fresh listings; the browser and edge hold it for a minute.
 *
 * I4 — every throw and every deliberate 5xx logs one `[ssr-error]` line.
 */

const PATH = "/api/feed";
const FeedQuery = z.object({
  category: uuid.optional(),
  place: uuid.optional(),
  size: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .pipe(z.number().int().min(1).max(50))
    .optional(),
  after: cursor(z.record(z.string(), z.unknown())).optional(),
});

/** INC-804 — every client refusal this route sends, as a closed set. */
type ClientCode =
  | "badCategory"
  | "badPlace"
  | "badSize"
  | "badCursor"
  | "unknownCategory"
  | "unknownPlace";

/** The database's error names mapped to this route's fixed codes. */
const NOT_FOUND: Readonly<Record<string, ClientCode>> = {
  "feed_page: unknownCategory": "unknownCategory",
  "feed_page: unknownPlace": "unknownPlace",
};
const BAD: Readonly<Record<string, ClientCode>> = {
  "feed_page: badCursor": "badCursor",
  "feed_page: badSize": "badSize",
};

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof FeedQuery>>,
): Promise<Response> {
  const { category, place, after, size = 20 } = ctx.query;
  const supabase = ctx.supabase;
  if (supabase === null) throw new Error("anonymous client missing");
  const started = Date.now();
  const { data, error, status } = await supabase.rpc("feed_page", {
    p_category_id: category ?? undefined,
    p_location_id: place ?? undefined,
    p_after: (after ?? undefined) as never,
    p_size: size,
  });
  const took = Date.now() - started;
  if (took > 5000) console.warn("[slow-rpc]", "feed_page", took);

  if (error) {
    const message = error.message ?? "";
    for (const [name, code] of Object.entries(NOT_FOUND)) {
      if (message.includes(name)) return clientError(code, 404);
    }
    for (const [name, code] of Object.entries(BAD)) {
      if (message.includes(name)) return clientError(code, 400);
    }
    return readFailure(PATH, "feed read", readFailed(error, status));
  }

  const page = data as {
    cards?: unknown;
    ladder?: unknown;
    steps?: unknown;
    next?: unknown;
  } | null;
  // E3a.6 / F4 — an answer without data and without an error is a failure,
  // never an empty page.
  if (
    page === null ||
    typeof page !== "object" ||
    !Array.isArray(page.cards) ||
    !Array.isArray(page.ladder) ||
    !Array.isArray(page.steps)
  ) {
    return serverError(PATH, new Error("feed_page returned no page"));
  }
  const body: Record<string, unknown> = {
    cards: page.cards,
    ladder: page.ladder,
    steps: page.steps,
    next: page.next === null || page.next === undefined ? null : encodeCursor(page.next),
  };
  // DEC-195 — the covers' card and thumb links ride INSIDE the answer, signed
  // for a visitor exactly as /api/media/photo-links signs them (one shared
  // reader-and-signer, the feed's own anonymous client), so the first page's
  // cards ask no second request. A failed or empty signing never fails the
  // feed: the cards answer without `coverLinks` (one [feed-links] line) and
  // the client falls back to the request.
  const coverIds = [
    ...new Set(
      (page.cards as { coverPhotoId?: unknown }[])
        .map((card) => card.coverPhotoId)
        .filter((id): id is string => typeof id === "string" && id !== ""),
    ),
  ];
  if (coverIds.length > 0) {
    try {
      const links = await readAndSignPhotoLinks(supabase, coverIds, ["card", "thumb"]);
      if (Object.keys(links).length > 0) {
        body.coverLinks = links;
        body.linksExpireIn = PHOTO_LINK_SECONDS;
      } else {
        console.error("[feed-links]", PATH, "signing answered no links");
      }
    } catch (linksError) {
      console.error("[feed-links]", PATH, errorText(linksError));
    }
  }
  return ok(body, {
    cache: "public, max-age=60, stale-while-revalidate=300",
    headers: { Vary: "Accept-Encoding" },
  });
}

export const Route = createFileRoute("/api/feed")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        query: FeedQuery,
        badShape: (issue) =>
          clientError(
            issue.path === "category"
              ? "badCategory"
              : issue.path === "place"
                ? "badPlace"
                : issue.path === "size"
                  ? "badSize"
                  : "badCursor",
            400,
          ),
        handler,
      }),
    },
  },
});
