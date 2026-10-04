import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/probe-500")({
  server: {
    handlers: {
      GET: async () =>
        new Response(JSON.stringify({ error: "server error", message: "probe" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }),
    },
  },
});
