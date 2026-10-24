import { z } from "zod";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import { clientError, serverError, upstreamUnavailable, verdict } from "@/server/answer";
import type { Dial } from "@/lib/dials";
import { spend as spendDial } from "@/server/dials";
import {
  anonymousClient,
  refuseUserClient,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * Foundations turn 2 (DEC-237) — THE ONE ROUTE BOUNDARY (B4). Every server
 * endpoint crosses this boundary, in this order, and nowhere else
 * (Foundations turn 3, INC-865: the caller before the read):
 *
 *   1  the outer catch      → serverError (a generic body, the stack in the log)
 *   2  the byte ceiling     → 413 by Content-Length alone; nothing is read
 *   3  the caller           → anon / optional / user / staff (has_permission
 *                             AS THE CALLER — the door's own check)
 *   3b the beforeParse dials → the denial-of-service choice, spent before
 *                             any byte of the body is read
 *   4  the content type     → 415 before the body is read
 *   4b the bounded read     → the counting reader, only when a body or form
 *                             is declared; over the ceiling → 413
 *   5  the shape            → params, query, body through their schemas;
 *                             a failure is the route's declared badShape answer
 *   6  the afterParse dials → consumeRate after the parse (the default)
 *   7  the handler          → typed ctx in, an answer.ts Response out
 *
 * No byte of a body is buffered for a caller the route has not accepted
 * (ASVS V13.1). A spent dial answers the 429 clientError, or — with
 * `refuseAs` — the posting contract's 200 verdict.
 *
 * OWASP ASVS 5.0 V5/V13/V7; the API Top 10 API1/API4/API8. The primitives
 * (user-client.ts, answer.ts, upstream.ts, catalog-find.server.ts's address
 * reader) stay the one implementation of their concerns — composed, not
 * copied.
 */

export type RouteAuth =
  | "none"
  | "anon"
  | "optional"
  | "user"
  | { staff: { resource: string; action: string } };

export type RateSpec = {
  /** Foundations turn 8 — a registry dial (src/lib/dials.ts): action, limit, window. */
  dial: Dial;
  key: "user" | "address";
  /** afterParse (the default) or beforeParse — the denial-of-service choice. */
  when?: "afterParse" | "beforeParse";
  /**
   * Foundations turn 3 — a spent dial answers the posting verdict at 200
   * (`{field, reason: reason ?? "rateLimited", detail: resetsAt}`) instead of
   * the 429 clientError.
   */
  refuseAs?: { verdict: { field: string; reason?: string } };
};

export type RouteContext<B = unknown, P = unknown, Q = unknown> = {
  request: Request;
  path: string;
  params: P;
  query: Q;
  body: B;
  form: FormData | null;
  userId: string | null;
  /** The caller's client (RLS as the caller); null for an anonymous route. */
  supabase: SupabaseClient<Database> | null;
  /** The service client, loaded lazily — only after the caller is verified. */
  service: () => Promise<SupabaseClient<Database>>;
  /** The request's incident id. */
  incident: string;
};

export type RouteSpec<B = unknown, P = unknown, Q = unknown> = {
  path: string;
  auth: RouteAuth;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
  /** The body's shape; the handler's `body` is this schema's output type. */
  body?: z.ZodType<B>;
  form?: { maxBytes: number };
  limits?: { bodyBytes?: number };
  /** verdict (the posting contract, default) or clientError (the readers'). */
  badShape?:
    | "verdict"
    | "clientError"
    | ((issue: { part: "params" | "query" | "body"; path: string; code: string }) => Response);
  rate?: RateSpec[];
  handler: (ctx: RouteContext<B, P, Q>) => Promise<Response>;
};

const DEFAULT_BODY_BYTES = 65_536;

/** Step 2 — the byte ceiling by header alone: true when Content-Length is over. */
function overByHeader(request: Request, ceiling: number): boolean {
  const declared = request.headers.get("content-length");
  return declared !== null && Number(declared) > ceiling;
}

/** Step 4b — the counting read. Returns the body's bytes, or null when over. */
async function readBounded(request: Request, ceiling: number): Promise<Uint8Array | null> {
  if (request.body === null) return new Uint8Array(0);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > ceiling) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

/** A query string as an object; repeated keys are arrays only for array fields. */
function queryObject(url: URL, schema: z.ZodTypeAny): Record<string, unknown> {
  const shape =
    schema instanceof z.ZodObject
      ? (schema.shape as Record<string, z.ZodTypeAny>)
      : ({} as Record<string, z.ZodTypeAny>);
  const out: Record<string, unknown> = {};
  for (const key of new Set(url.searchParams.keys())) {
    const field = shape[key];
    const isArray =
      field !== undefined &&
      (field instanceof z.ZodArray ||
        (field instanceof z.ZodOptional && field.unwrap() instanceof z.ZodArray));
    out[key] = isArray ? url.searchParams.getAll(key) : url.searchParams.get(key);
  }
  return out;
}

function badShapeAnswer(
  mode: NonNullable<RouteSpec["badShape"]>,
  issues: readonly z.core.$ZodIssue[],
  part: "params" | "query" | "body",
): Response {
  const first = issues[0];
  if (typeof mode === "function") {
    return mode({ part, path: first?.path.join(".") ?? "", code: first?.code ?? "badShape" });
  }
  if (mode === "clientError") return clientError("bad request", 400);
  return verdict([
    {
      field: first !== undefined ? first.path.join(".") : "",
      reason: "badShape",
      detail: first?.code,
    },
  ]);
}

/** A body that is not JSON at all: the same badShape answer, no schema issue. */
function malformedJsonAnswer(mode: NonNullable<RouteSpec["badShape"]>): Response {
  if (typeof mode === "function") return mode({ part: "body", path: "", code: "invalid_json" });
  if (mode === "clientError") return clientError("bad request", 400);
  return verdict([{ field: "", reason: "badShape", detail: "invalid_json" }]);
}

export function defineRoute<B = unknown, P = unknown, Q = unknown>(
  spec: RouteSpec<B, P, Q>,
): (args: { request: Request; params: unknown }) => Promise<Response> {
  const ceiling = spec.form?.maxBytes ?? spec.limits?.bodyBytes ?? DEFAULT_BODY_BYTES;
  const badShape = spec.badShape ?? "verdict";

  return async ({ request, params: rawParams }) => {
    const incident = crypto.randomUUID();
    try {
      // (2) the byte ceiling by header — nothing is read.
      const needsBody = spec.body !== undefined || spec.form !== undefined;
      if (needsBody && overByHeader(request, ceiling)) {
        return clientError("payloadTooLarge", 413);
      }

      // (3) the caller.
      let userId: string | null = null;
      let supabase: SupabaseClient<Database> | null = null;
      const staff = typeof spec.auth === "object" ? spec.auth.staff : null;
      const mode = staff !== null ? "user" : spec.auth;
      if (mode === "none") {
        // No identity, environment check or Authorization read; service stays lazy.
      } else if (mode === "anon") {
        supabase = anonymousClient();
        if (supabase === null) {
          const refused = refuseUserClient(spec.path, {
            supabase: null,
            userId: null,
            reason: "serverEnv",
            message: "supabase server env missing",
          });
          if (refused !== null) return refused;
        }
      } else if (mode === "user" || (mode === "optional" && request.headers.has("Authorization"))) {
        const caller = await userClientFromRequest(request);
        const refused = refuseUserClient(spec.path, caller);
        if (refused !== null) return refused;
        userId = caller.userId;
        supabase = caller.supabase;
      } else {
        supabase = anonymousClient();
      }
      if (staff !== null && supabase !== null && userId !== null) {
        const { data: allowed, error: permissionError } = await supabase.rpc("has_permission", {
          p_user_id: userId,
          p_resource: staff.resource,
          p_action: staff.action,
        });
        if (permissionError) throw permissionError;
        if (allowed !== true) return clientError("forbidden", 403);
      }

      // (3b) the dials a route declares before the parse (the denial-of-service choice).
      const spend = async (entry: RateSpec): Promise<Response | null> => {
        const key =
          entry.key === "user" ? (userId ?? "anonymous") : hashAddress(clientAddress(request));
        try {
          const spent = await spendDial(entry.dial, key);
          if (!spent.allowed) {
            if (entry.refuseAs !== undefined) {
              return verdict([
                {
                  field: entry.refuseAs.verdict.field,
                  reason: entry.refuseAs.verdict.reason ?? "rateLimited",
                  detail: spent.resetsAt ?? undefined,
                },
              ]);
            }
            return clientError(
              "rateLimited",
              429,
              spent.resetsAt !== null ? { resetsAt: spent.resetsAt } : undefined,
            );
          }
          return null;
        } catch {
          return upstreamUnavailable(spec.path, `rate limit ${entry.dial.action}`, 0);
        }
      };
      for (const entry of spec.rate ?? []) {
        if ((entry.when ?? "afterParse") === "beforeParse") {
          const refused = await spend(entry);
          if (refused !== null) return refused;
        }
      }

      // (4) the content type — before the body is read.
      const contentType = request.headers.get("content-type") ?? "";
      if (spec.body !== undefined && !contentType.toLowerCase().startsWith("application/json")) {
        return clientError("unsupportedMediaType", 415);
      }
      if (spec.form !== undefined && !contentType.toLowerCase().startsWith("multipart/form-data")) {
        return clientError("unsupportedMediaType", 415);
      }

      // (4b) the bounded read — only now, for an accepted caller.
      let bytes: Uint8Array | null = null;
      if (needsBody) {
        bytes = await readBounded(request, ceiling);
        if (bytes === null) return clientError("payloadTooLarge", 413);
      }

      // (5) the shape.
      let params: P = undefined as P;
      if (spec.params !== undefined) {
        const parsed = spec.params.safeParse(rawParams ?? {});
        if (!parsed.success) return badShapeAnswer(badShape, parsed.error.issues, "params");
        params = parsed.data as P;
      }
      let query: Q = undefined as Q;
      if (spec.query !== undefined) {
        const parsed = spec.query.safeParse(queryObject(new URL(request.url), spec.query));
        if (!parsed.success) return badShapeAnswer(badShape, parsed.error.issues, "query");
        query = parsed.data as Q;
      }
      let body: B = undefined as B;
      if (spec.body !== undefined) {
        let raw: unknown;
        try {
          raw = JSON.parse(new TextDecoder().decode(bytes ?? new Uint8Array(0)));
        } catch {
          return malformedJsonAnswer(badShape);
        }
        const parsed = spec.body.safeParse(raw);
        if (!parsed.success) return badShapeAnswer(badShape, parsed.error.issues, "body");
        body = parsed.data as B;
      }
      let form: FormData | null = null;
      if (spec.form !== undefined) {
        // The counting reader already consumed the stream; parse the bytes.
        // An ArrayBuffer copy, not a Blob: every runtime's Request reads it whole.
        const owned = new Uint8Array(bytes?.byteLength ?? 0);
        if (bytes !== null) owned.set(bytes);
        const rebuilt = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: owned.buffer,
        });
        try {
          form = await rebuilt.formData();
        } catch {
          // Foundations turn 4 — an unreadable multipart body is the route's
          // badShape answer (`{field:"body"}`, the upload's contract), not a 500.
          if (typeof badShape === "function") {
            return badShape({ part: "body", path: "body", code: "badShape" });
          }
          if (badShape === "clientError") return clientError("bad request", 400);
          return verdict([{ field: "body", reason: "badShape" }]);
        }
      }

      // (6) the afterParse dials — the default.
      for (const entry of spec.rate ?? []) {
        if ((entry.when ?? "afterParse") === "afterParse") {
          const refused = await spend(entry);
          if (refused !== null) return refused;
        }
      }

      // (7) the handler.
      return await spec.handler({
        request,
        path: spec.path,
        params,
        query,
        body,
        form,
        userId,
        supabase,
        service: async () => {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          return supabaseAdmin;
        },
        incident,
      });
    } catch (error) {
      // (1) the outer catch.
      return serverError(spec.path, error);
    }
  };
}
