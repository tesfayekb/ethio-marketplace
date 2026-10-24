import { z } from "zod";

import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { clientAddress, hashAddress } from "@/server/catalog-find.server";
import { clientError, serverError, upstreamUnavailable, verdict } from "@/server/answer";
import {
  anonymousClient,
  consumeRate,
  envDial,
  refuseUserClient,
  userClientFromRequest,
} from "@/server/supabase/user-client";

/**
 * Foundations turn 2 (DEC-237) — THE ONE ROUTE BOUNDARY (B4). Every server
 * endpoint crosses this boundary, in this order, and nowhere else:
 *
 *   1 the outer catch      → serverError (a generic body, the stack in the log)
 *   2 the byte ceiling     → 413 before any read (Content-Length, or a
 *                            counting reader when the header is absent)
 *   3 the caller           → anon / optional / user / staff (has_permission
 *                            AS THE CALLER — the door's own check)
 *   4 the content type     → 415 before the body is read
 *   5 the shape            → params, query, body through their schemas;
 *                            a failure is the route's declared badShape answer
 *   6 the dials            → consumeRate after the parse (or before it, for a
 *                            route that declares the denial-of-service choice)
 *   7 the handler          → typed ctx in, an answer.ts Response out
 *
 * OWASP ASVS 5.0 V5/V13/V7; the API Top 10 API1/API4/API8. The primitives
 * (user-client.ts, answer.ts, upstream.ts, catalog-find.server.ts's address
 * reader) stay the one implementation of their concerns — composed, not
 * copied.
 */

export type RouteAuth =
  | "anon"
  | "optional"
  | "user"
  | { staff: { resource: string; action: string } };

export type RateSpec = {
  action: string;
  key: "user" | "address";
  limit: number | { env: string; fallback: number };
  windowSeconds: number;
  /** afterParse (the default) or beforeParse — the denial-of-service choice. */
  when?: "afterParse" | "beforeParse";
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
  body?: z.ZodTypeAny;
  form?: { maxBytes: number };
  limits?: { bodyBytes?: number };
  /** verdict (the posting contract, default) or clientError (the readers'). */
  badShape?: "verdict" | "clientError";
  rate?: RateSpec[];
  handler: (ctx: RouteContext<B, P, Q>) => Promise<Response>;
};

const DEFAULT_BODY_BYTES = 65_536;

/** Step 2 — the byte ceiling. Returns the body's bytes, or null when over. */
async function readBounded(request: Request, ceiling: number): Promise<Uint8Array | null> {
  const declared = request.headers.get("content-length");
  if (declared !== null && Number(declared) > ceiling) return null;
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
  mode: "verdict" | "clientError",
  issues: readonly z.core.$ZodIssue[],
): Response {
  if (mode === "clientError") return clientError("bad request", 400);
  const first = issues[0];
  return verdict([
    {
      field: first !== undefined ? first.path.join(".") : "",
      reason: "badShape",
      detail: first?.code,
    },
  ]);
}

export function defineRoute<B = unknown, P = unknown, Q = unknown>(
  spec: RouteSpec<B, P, Q>,
): (args: { request: Request; params: unknown }) => Promise<Response> {
  const ceiling = spec.form?.maxBytes ?? spec.limits?.bodyBytes ?? DEFAULT_BODY_BYTES;
  const badShape = spec.badShape ?? "verdict";

  return async ({ request, params: rawParams }) => {
    const incident = crypto.randomUUID();
    try {
      // (2) the byte ceiling — before any read.
      const needsBody = spec.body !== undefined || spec.form !== undefined;
      let bytes: Uint8Array | null = null;
      if (needsBody) {
        bytes = await readBounded(request, ceiling);
        if (bytes === null) return clientError("payloadTooLarge", 413);
      }

      // (3) the caller.
      let userId: string | null = null;
      let supabase: SupabaseClient<Database> | null = null;
      const staff = typeof spec.auth === "object" ? spec.auth.staff : null;
      const mode = staff !== null ? "user" : spec.auth;
      if (mode === "anon") {
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

      // The dials a route declares before the parse (the denial-of-service choice).
      const spend = async (entry: RateSpec): Promise<Response | null> => {
        const limit =
          typeof entry.limit === "number"
            ? entry.limit
            : envDial(entry.limit.env, entry.limit.fallback);
        const key =
          entry.key === "user" ? (userId ?? "anonymous") : hashAddress(clientAddress(request));
        try {
          const spent = await consumeRate(
            entry.action,
            key,
            limit,
            `${entry.windowSeconds} seconds`,
          );
          if (!spent.allowed) {
            return clientError(
              "rateLimited",
              429,
              spent.resetsAt !== null ? { resetsAt: spent.resetsAt } : undefined,
            );
          }
          return null;
        } catch {
          return upstreamUnavailable(spec.path, `rate limit ${entry.action}`, 0);
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

      // (5) the shape.
      let params: P = undefined as P;
      if (spec.params !== undefined) {
        const parsed = spec.params.safeParse(rawParams ?? {});
        if (!parsed.success) return badShapeAnswer(badShape, parsed.error.issues);
        params = parsed.data as P;
      }
      let query: Q = undefined as Q;
      if (spec.query !== undefined) {
        const parsed = spec.query.safeParse(queryObject(new URL(request.url), spec.query));
        if (!parsed.success) return badShapeAnswer(badShape, parsed.error.issues);
        query = parsed.data as Q;
      }
      let body: B = undefined as B;
      if (spec.body !== undefined) {
        let raw: unknown;
        try {
          raw = JSON.parse(new TextDecoder().decode(bytes ?? new Uint8Array(0)));
        } catch {
          return badShapeAnswer(badShape, [
            { code: "invalid_type", path: [], message: "malformed JSON" } as z.core.$ZodIssue,
          ]);
        }
        const parsed = spec.body.safeParse(raw);
        if (!parsed.success) return badShapeAnswer(badShape, parsed.error.issues);
        body = parsed.data as B;
      }
      let form: FormData | null = null;
      if (spec.form !== undefined) {
        // The counting reader already consumed the stream; parse the bytes.
        const rebuilt = new Request(request.url, {
          method: request.method,
          headers: request.headers,
          body: bytes,
        });
        form = await rebuilt.formData();
      }

      // (6) the dials — after the parse by default.
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
