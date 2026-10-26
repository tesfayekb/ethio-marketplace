import { createMiddleware } from "@tanstack/react-start";

import { errorText } from "@/lib/error-text";
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
    const read = await currentSession();
    // INC-914 — a session that could not be read sends no bearer (as a signed-out call does), and
    // says so: the server function answers as for a visitor, and the page's own refusal shows.
    if (read.failed)
      console.warn(`[session-bearer] the session could not be read: ${errorText(read.error)}`);
    const token = read.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
