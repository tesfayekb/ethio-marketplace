import { createFileRoute } from "@tanstack/react-router";

const statuses = [200, 400, 409, 500, 502, 503];

export const Route = createFileRoute("/api/probe-500")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const s = Number(new URL(request.url).searchParams.get("s") ?? "500");
        if (!statuses.includes(s)) return new Response("bad", { status: 400 });
        return Response.json({ probe: true, status: s }, { status: s });
      },
      POST: async ({ request }) => {
        const s = Number(new URL(request.url).searchParams.get("s") ?? "500");
        if (!statuses.includes(s)) return new Response("bad", { status: 400 });
        return Response.json({ probe: true, status: s }, { status: s });
      },
    },
  },
});
