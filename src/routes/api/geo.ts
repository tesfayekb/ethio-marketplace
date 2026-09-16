import { createFileRoute } from "@tanstack/react-router";

import { GEO_NONE, geoGuess, type GeoAnswer } from "@/server/geo/guess";

/**
 * LOCATIONS ERA L4b-2 — THE GEO-GUESS ROUTE.
 *
 *   GET /api/geo → { country, regionCode, city, lat, lng, source }
 *
 * The judge itself is the shared server helper `src/server/geo/guess.ts` (L4b,
 * B2): the root's SSR context reads the same judgement, so there is no second
 * copy to drift. The route ECHOES the whole answer — L4b-2 adds `lat`/`lng` and
 * the `cf-visitor` source. Everything else is unchanged: the four sources in the
 * DEC-063 order, `Cache-Control: no-store`, no database, no client, no
 * persistence, and never a throw through the handler (GE-1..5).
 */

function answer(payload: GeoAnswer): Response {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const Route = createFileRoute("/api/geo")({
  server: {
    handlers: {
      GET: ({ request }) => {
        try {
          return answer(geoGuess(request));
        } catch (error) {
          console.error(
            "[ssr-error]",
            "/api/geo",
            error instanceof Error ? error.message : String(error),
          );
          return answer(GEO_NONE);
        }
      },
    },
  },
});
