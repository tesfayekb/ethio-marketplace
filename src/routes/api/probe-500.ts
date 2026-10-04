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
        const url = new URL(request.url);
        const s = Number(url.searchParams.get("s") ?? "500");
        if (!statuses.includes(s)) return new Response("bad", { status: 400 });
        // Variant flags mirroring the real import route's shape:
        // read=1 consumes the request body; wait=ms delays the answer;
        // big=1 pads the JSON body to ~2KB.
        if (url.searchParams.get("read") === "1") await request.arrayBuffer();
        const wait = Number(url.searchParams.get("wait") ?? "0");
        if (wait > 0) await new Promise((r) => setTimeout(r, wait));
        const pad = url.searchParams.get("big") === "1" ? "x".repeat(2048) : "";
        return Response.json({ probe: true, status: s, pad }, { status: s });
      },
    },
  },
});
