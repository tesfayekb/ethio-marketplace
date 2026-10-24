import { createFileRoute } from "@tanstack/react-router";

import { ok } from "@/server/answer";
import { GEO_NONE, geoGuess } from "@/server/geo/guess";
import { defineRoute } from "@/server/route";
import { logRouteError } from "@/server/supabase/user-client";

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

export const Route = createFileRoute("/api/geo")({
  server: {
    handlers: {
      GET: defineRoute({
        path: "/api/geo",
        auth: "none",
        handler: async ({ request }) => {
          try {
            return ok(geoGuess(request), { cache: "no-store" });
          } catch (error) {
            logRouteError("/api/geo", error);
            return ok(GEO_NONE, { cache: "no-store" });
          }
        },
      }),
    },
  },
});
