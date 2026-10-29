import { createFileRoute } from "@tanstack/react-router";

import { JobParams } from "@/lib/schemas/jobs";
import { defineRoute } from "@/server/route";
import { jobHandler, refused } from "@/server/jobs/route";

/**
 * N1b-1 (INC-977) — POST /api/public/jobs/$job: the database's scheduled call
 * (pg_cron → job_call → pg_net). No session, no body read; the signature is
 * checked first inside jobHandler (src/server/jobs/route.ts). An unknown job
 * name answers the same constant 401 as a bad signature.
 */
export const Route = createFileRoute("/api/public/jobs/$job")({
  server: {
    handlers: {
      POST: defineRoute({
        path: "/api/public/jobs/$job",
        auth: "none",
        params: JobParams,
        badShape: () => refused(),
        handler: jobHandler,
      }),
    },
  },
});
