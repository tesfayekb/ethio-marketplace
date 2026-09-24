import { createFileRoute } from "@tanstack/react-router";

import {
  catalogFind,
  consumeCatalogFindRate,
  CATALOG_FIND_TTL_MS,
} from "@/server/catalog-find.server";
import { logRouteError, routeJson } from "@/server/supabase/user-client";

const PATH = "/api/catalog/find";
const LANG = /^[a-z]{2,3}$/;

async function handleGet(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").trim();
  const lang = (url.searchParams.get("lang") ?? "en").trim().toLowerCase();
  if (query.length < 2) return routeJson({ error: "bad query" }, 400);
  if (query.length > 64 || !LANG.test(lang)) return routeJson({ error: "bad query" }, 400);
  if (!(await consumeCatalogFindRate(request))) return routeJson({ error: "rateLimited" }, 429);

  const results = await catalogFind(query, lang);
  return new Response(JSON.stringify({ ok: true, results }), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": `public, max-age=${CATALOG_FIND_TTL_MS / 1000}`,
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
