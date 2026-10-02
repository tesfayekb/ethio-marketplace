import { createFileRoute } from "@tanstack/react-router";

import { catalogSearch, CATALOG_FIND_TTL_MS } from "@/server/catalog-find.server";
import { logRouteError, routeJson } from "@/server/supabase/user-client";

const PATH = "/api/catalog/find";
const LANG = /^[a-z]{2,3}$/;

async function handleGet(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim();
  const lang = (url.searchParams.get("lang") ?? "en").trim().toLowerCase();
  if (query.length < 2) return routeJson({ error: "bad query" }, 400);
  if (query.length > 64 || !LANG.test(lang)) return routeJson({ error: "bad query" }, 400);
  const answer = await catalogSearch(request, query, lang);
  if (answer === null) return routeJson({ error: "rateLimited" }, 429);
  // One call carries rate + version + rows, so one stage is timed; rebuild is
  // always 0 because a search never rebuilds (INC-273).
  const timing = [`search;dur=${answer.timing.find.toFixed(1)}`, `rebuild;dur=0.0`].join(", ");
  return new Response(JSON.stringify({ ok: true, results: answer.rows }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${CATALOG_FIND_TTL_MS / 1000}`,
      "Server-Timing": timing,
    },
  });
}

export const Route = createFileRoute("/api/catalog/find")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          return await handleGet(request);
        } catch (error) {
          logRouteError(PATH, error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
