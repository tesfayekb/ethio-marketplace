import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/api/probe-500")({
  server: { handlers: { GET: async () => Response.json({ error: "probe", message: "probe-body" }, { status: 500 }) } },
});
