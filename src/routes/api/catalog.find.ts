import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { langCodeLoose } from "@/lib/schemas/primitives";
import { clientError, ok } from "@/server/answer";
import { catalogSearch, CATALOG_FIND_TTL_MS } from "@/server/catalog-find.server";
import { defineRoute, type RouteContext } from "@/server/route";

/**
 * GET /api/catalog/find?q=<2–64 characters>&lang=<2–3 letters> → { ok:true, results }
 *
 * Foundations turn 10 (INC-862): on `defineRoute` (`auth: "anon"`); the q and
 * lang rules as before (`langCodeLoose` capped at three characters is exactly
 * `^[a-z]{2,3}$`); a bad shape is 400 `bad query`, a spent dial 429 `rateLimited`.
 */

const PATH = "/api/catalog/find";
const FindQuery = z.object({
  q: z.string().trim().min(2).max(64),
  lang: langCodeLoose.pipe(z.string().max(3)).default("en"),
});

async function handler(
  ctx: RouteContext<unknown, unknown, z.infer<typeof FindQuery>>,
): Promise<Response> {
  const answer = await catalogSearch(ctx.request, ctx.query.q, ctx.query.lang);
  if (answer === null) return clientError("rateLimited", 429);
  // One call carries rate + version + rows, so one stage is timed; rebuild is
  // always 0 because a search never rebuilds (INC-273).
  const timing = [`search;dur=${answer.timing.find.toFixed(1)}`, `rebuild;dur=0.0`].join(", ");
  return ok(
    { ok: true, results: answer.rows },
    {
      cache: `public, max-age=${CATALOG_FIND_TTL_MS / 1000}`,
      headers: { "Server-Timing": timing },
    },
  );
}

export const Route = createFileRoute("/api/catalog/find")({
  server: {
    handlers: {
      GET: defineRoute({
        path: PATH,
        auth: "anon",
        query: FindQuery,
        badShape: () => clientError("bad query", 400),
        handler,
      }),
    },
  },
});
