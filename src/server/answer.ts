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
/** `retry` (Foundations turn 4): the upload screen's provider refusals carry it. */
export type Refusal = { field: string; reason: string; detail?: string; retry?: boolean };

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

/**
 * Foundations turn 3 — THE ONE BINARY ANSWER: the bytes, their content type,
 * never cached unless a Cache-Control is given. No route builds its own
 * `new Response` for bytes.
 */
export function bytes(
  body: Uint8Array | ArrayBuffer,
  contentType: string,
  init?: { status?: number; headers?: Record<string, string> },
): Response {
  // A fresh ArrayBuffer-backed copy: the answer owns its bytes.
  const source = body instanceof ArrayBuffer ? new Uint8Array(body) : body;
  const copy = new Uint8Array(source.byteLength);
  copy.set(source);
  const headers = new Headers(init?.headers ?? {});
  headers.set("Content-Type", contentType);
  if (!headers.has("Cache-Control")) headers.set("Cache-Control", "no-store");
  return new Response(copy, { status: init?.status ?? 200, headers });
}

export { doorAnswer, upstreamFailed, upstreamUnavailable };
