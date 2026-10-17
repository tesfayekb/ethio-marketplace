import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/listings/share")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { logRouteError, routeJson } = await import("@/server/supabase/user-client");
        try {
          const { countAdShare } = await import("@/server/ad-share");
          return await countAdShare(request);
        } catch (error) {
          logRouteError("/api/listings/share", error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
