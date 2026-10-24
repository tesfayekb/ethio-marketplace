import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { publicId } from "@/lib/schemas/primitives";
import { defineRoute } from "@/server/route";

/**
 * D201 rule 10 — POST /api/listings/view { publicId, session? } → { counted }.
 * Foundations turn 3: on defineRoute. The counting is src/server/ad-view.ts,
 * loaded on demand; `session`'s shape is still checked there (a wrong shape is
 * ignored and the address path taken); its dials stay in the handler (the
 * spent answer is {counted:false}, not an envelope — INC-859).
 */
export const ViewBody = z
  .object({
    publicId,
    session: z.string().optional(),
  })
  .strict();

export const Route = createFileRoute("/api/listings/view")({
  server: {
    handlers: {
      POST: defineRoute({
        path: "/api/listings/view",
        auth: "optional",
        body: ViewBody,
        badShape: "clientError",
        handler: async ({ body, userId, request }) => {
          const { countAdView } = await import("@/server/ad-view");
          return countAdView({ body, userId, request });
        },
      }),
    },
  },
});
