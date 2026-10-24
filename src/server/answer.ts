import {
  doorAnswer,
  logRouteError,
  routeJson,
  upstreamFailed,
  upstreamUnavailable,
} from "@/server/supabase/user-client";

/**
 * Foundations turn 2 (DEC-237) — THE TWO ENVELOPES (B2). A route on
 * `defineRoute` answers with one of these and nothing else: never raw
 * Postgres or provider text in a body (INC-447's class, closed structurally).
 * The door-answer helpers stay implemented in user-client.ts and are
 * re-exported here so a route imports its answers from one module.
 */

/** Success: JSON out, never cached unless the route declares a cache. */
export function ok(body: unknown, init?: { status?: number; cache?: string }): Response {
  const response = routeJson(body, init?.status ?? 200);
  if (init?.cache !== undefined) response.headers.set("Cache-Control", init.cache);
  return response;
}

/** A refusal the client renders: the door's or the schema's own vocabulary. */
export type Refusal = { field: string; reason: string; detail?: string };

/** The posting contract: refusals at 200, `ok: false`. */
export function verdict(refusals: Refusal[], status = 200): Response {
  return routeJson({ ok: false, refusals }, status);
}

/** The readers' contract: a machine code and its status, never a sentence. */
export function clientError(
  code: string,
  status: 400 | 401 | 403 | 404 | 413 | 415 | 429,
  extra?: Record<string, string | number>,
): Response {
  return routeJson({ error: code, ...extra }, status);
}

/**
 * A throw the route did not declare: the client gets a generic line and an
 * incident id; the log gets the full stack under the SAME id — never the
 * error's message in the body.
 */
export function serverError(path: string, error: unknown): Response {
  const incident = crypto.randomUUID();
  // eslint-disable-next-line no-restricted-syntax -- INC-815: the stack is wanted when it exists; a plain object falls through to String.
  logRouteError(path, `[incident ${incident}] ${error instanceof Error ? error.stack : error}`);
  return routeJson({ error: "server error", incident }, 500);
}

export { doorAnswer, upstreamFailed, upstreamUnavailable };
