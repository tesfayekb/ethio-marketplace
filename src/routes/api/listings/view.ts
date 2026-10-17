import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/listings/view")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { logRouteError, routeJson } = await import("@/server/supabase/user-client");
        try {
          const { countAdView } = await import("@/server/ad-view");
          return await countAdView(request);
        } catch (error) {
          logRouteError("/api/listings/view", error);
          return routeJson({ error: "server error" }, 500);
        }
      },
    },
  },
});
