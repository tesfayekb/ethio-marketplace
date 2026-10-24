import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { publicId } from "@/lib/schemas/primitives";
import { bytes, plain } from "@/server/answer";
import { qrSvg } from "@/server/qr";
import { defineRoute, type RouteContext } from "@/server/route";

/**
 * D201 §2 — the short address `/l/<id>` is what the QR carries. No database,
 * auth or rate dial. Foundations turn 10 (INC-862): on `defineRoute`; the id is
 * `publicId`-shaped first; the SVG is immutable.
 */

const Params = z.object({ id: publicId });

export const Route = createFileRoute("/l/$id/qr.svg")({
  server: {
    handlers: {
      GET: defineRoute({
        path: "/l/$id/qr.svg",
        auth: "none",
        params: Params,
        badShape: () => plain("not found", 404),
        handler: async (ctx: RouteContext<unknown, z.infer<typeof Params>>) =>
          bytes(
            new TextEncoder().encode(
              qrSvg(`${new URL(ctx.request.url).origin}/l/${ctx.params.id}`),
            ),
            "image/svg+xml; charset=utf-8",
            {
              headers: {
                "Cache-Control": "public, max-age=31536000, immutable",
                "X-Content-Type-Options": "nosniff",
              },
            },
          ),
      }),
    },
  },
});
