import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { publicId } from "@/lib/schemas/primitives";
import { plain } from "@/server/answer";
import { defineRoute, type RouteContext } from "@/server/route";

/**
 * GET /l/<id>/photo.jpg → 302 to the cover's signed link (`private, max-age=1800`),
 * or a plain-text refusal. Foundations turn 10 (INC-862): on `defineRoute`; the id
 * is `publicId`-shaped before anything else. The reader loads on demand.
 */

const Params = z.object({ id: publicId });

export const Route = createFileRoute("/l/$id/photo.jpg")({
  server: {
    handlers: {
      GET: defineRoute({
        path: "/l/$id/photo.jpg",
        auth: "none",
        params: Params,
        badShape: () => plain("not found", 404),
        handler: async (ctx: RouteContext<unknown, z.infer<typeof Params>>) => {
          const { adPhotoResponse } = await import("@/server/ad-photo");
          return adPhotoResponse(ctx.request, ctx.params.id);
        },
      }),
    },
  },
});
