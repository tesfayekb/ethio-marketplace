import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { publicId } from "@/lib/schemas/primitives";
import { defineRoute } from "@/server/route";

/**
 * D201 rule 10 — POST /api/listings/share { publicId, channel } → { counted }.
 * Foundations turn 3: on defineRoute. The counting is src/server/ad-share.ts,
 * loaded on demand; its dials stay in the handler (the spent answer is
 * {counted:false}, not an envelope — INC-859).
 */
export const ShareBody = z
  .object({
    publicId,
    channel: z.enum(["telegram", "whatsapp", "facebook", "copy", "qr"]),
  })
  .strict();

export const Route = createFileRoute("/api/listings/share")({
  server: {
    handlers: {
      POST: defineRoute({
        path: "/api/listings/share",
        auth: "optional",
        body: ShareBody,
        badShape: "clientError",
        handler: async ({ body, userId, request }) => {
          const { countAdShare } = await import("@/server/ad-share");
          return countAdShare({ body, userId, request });
        },
      }),
    },
  },
});
