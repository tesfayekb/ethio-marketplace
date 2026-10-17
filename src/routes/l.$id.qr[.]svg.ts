import { createFileRoute } from "@tanstack/react-router";

import { errorText } from "@/lib/error-text";
import { isPublicId, qrSvg } from "@/server/qr";

/**
 * D201 §2 — the short address `/l/<id>` is what the QR carries; the page
 * itself arrives in a later turn of this bundle. No database, auth or rate dial.
 */
function logRouteError(id: string, error: unknown): void {
  console.error("[ssr-error]", `/l/${id}/qr.svg`, errorText(error));
}

export const Route = createFileRoute("/l/$id/qr.svg")({
  server: {
    handlers: {
      GET: ({ request, params }) => {
        const id = params.id;
        try {
          if (!isPublicId(id)) {
            return new Response("not found", {
              status: 404,
              headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "Cache-Control": "no-store",
              },
            });
          }
          return new Response(qrSvg(`${new URL(request.url).origin}/l/${id}`), {
            status: 200,
            headers: {
              "Content-Type": "image/svg+xml; charset=utf-8",
              "Cache-Control": "public, max-age=31536000, immutable",
              "X-Content-Type-Options": "nosniff",
            },
          });
        } catch (error) {
          logRouteError(id, error);
          return new Response("internal error", {
            status: 500,
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "no-store",
            },
          });
        }
      },
    },
  },
});
