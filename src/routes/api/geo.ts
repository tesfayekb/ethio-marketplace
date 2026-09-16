import { createFileRoute } from "@tanstack/react-router";

import { GEO_NONE, geoGuess, type GeoAnswer } from "@/server/geo/guess";

/**
 * LOCATIONS ERA L4a — THE GEO-GUESS ROUTE.
 *
 *   GET /api/geo → { country, regionCode, city, source }
 *
 * The judge itself is the shared server helper `src/server/geo/guess.ts` (L4b,
 * B2): the root's SSR context reads the same judgement, so there is no second
 * copy to drift. This route's contract is unchanged — the three sources in the
 * DEC-063 order, `Cache-Control: no-store`, no database, no client, no
 * persistence, and never a throw through the handler (GE-1..3).
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
