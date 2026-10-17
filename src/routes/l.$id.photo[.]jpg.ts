import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/l/$id/photo.jpg")({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const { logRouteError } = await import("@/server/supabase/user-client");
        try {
          const { adPhotoResponse } = await import("@/server/ad-photo");
          return await adPhotoResponse(request, params.id);
        } catch (error) {
          logRouteError(`/l/${params.id}/photo.jpg`, error);
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
