import { createMiddleware } from "@tanstack/react-start";

import { currentSession } from "@/lib/supabase-door";

/**
 * DEC-261 (Foundations turn 34) — THE SESSION'S BEARER ON EVERY SERVER FUNCTION CALL,
 * through the client's door. The platform's generated attacher
 * (src/integrations/supabase/auth-attacher.ts) imports the client itself, which put the
 * whole client on every page's first download; this middleware does what it did —
 * attach `Authorization: Bearer <access token>` when the browser holds a session, and
 * nothing otherwise — without fetching the client for a signed-out visitor. Registered
 * in src/start.ts in its place; the weight guard (scripts/check-marketplace-imports.mjs,
 * FORBIDDEN_FILES) keeps the attacher off the first-paint walk.
 */
export const attachSessionBearer = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { session } = await currentSession();
    const token = session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
