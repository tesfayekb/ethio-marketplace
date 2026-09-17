import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

/**
 * U6-A2-C — THE ONE USER-SCOPED SERVER CLIENT (B2/B3).
 *
 * Every authenticated server route needs the same four steps, in the same order:
 *
 *   1 bearer → the request must carry `Authorization: Bearer …` at all
 *   2 env    → `SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY`, read INSIDE the
 *              handler because workerd injects bindings per request (F1)
 *   3 client → the PUBLISHABLE key with the caller's bearer attached, so every
 *              read and every door call runs as the signed-in user and RLS plus
 *              `has_permission` remain the only authority (F3)
 *   4 identity → `auth.getUser()`, because a bearer is a claim, not a fact
 *
 * The service role never appears here: a route that needs it loads
 * `client.server.ts` itself, after it has verified the caller.
 *
 * This construction used to be written out twice inside `src/server/imports/
 * gate.ts` (the import gate and the export gate). Both call this now, with the
 * refusal REASON returned rather than a response, so each caller keeps its own
 * wording and status (no behaviour change — the import-security suite is the
 * proof).
 */

export type UserClientRefusal = "missingBearer" | "serverEnv" | "notSignedIn";

export interface UserClientAnswer {
  /** The caller-context client, or null when a step before it refused. */
  supabase: SupabaseClient<Database> | null;
  /** The verified caller, or null when no signed-in user could be resolved. */
  userId: string | null;
  /** null when the client and the user are both real. */
  reason: UserClientRefusal | null;
  /** The provider's own message, for the `[ssr-error]` line — never a body. */
  message: string;
}

function serverEnv(name: string): string {
  return process.env[name] ?? "";
}

export async function userClientFromRequest(request: Request): Promise<UserClientAnswer> {
  const authorization = request.headers.get("Authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return { supabase: null, userId: null, reason: "missingBearer", message: "" };
  }

  const url = serverEnv("SUPABASE_URL");
  const publishable = serverEnv("SUPABASE_PUBLISHABLE_KEY");
  if (url === "" || publishable === "") {
    return {
      supabase: null,
      userId: null,
      reason: "serverEnv",
      message: "supabase server env missing",
    };
  }

  const supabase = createClient<Database>(url, publishable, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user?.id) {
    return {
      supabase,
      userId: null,
      reason: "notSignedIn",
      message: error?.message ?? "no user for this bearer",
    };
  }

  return { supabase, userId: data.user.id, reason: null, message: "" };
}

/* ------------------------- the route's shared shapes ---------------------- */

/** JSON out, never cached, never HTML (I4 companion). */
export function routeJson(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/** I4 — one `[ssr-error]` line for every throw and every deliberate 5xx. */
export function logRouteError(path: string, error: unknown): void {
  const message =
    error instanceof Error
      ? `${error.message} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`
      : String(error);
  console.error("[ssr-error]", path, message);
}

/** A refusal is the door's own vocabulary: status 200, `ok:false` (F4). */
export function refusal(field: string, reason: string, detail?: string): Response {
  return routeJson(
    { ok: false, refusals: [detail === undefined ? { field, reason } : { field, reason, detail }] },
    200,
  );
}

/**
 * The 401/500 answers every authenticated posting route shares, so the wording
 * of "not signed in" is written once.
 */
export function refuseUserClient(path: string, answer: UserClientAnswer): Response | null {
  if (answer.reason === null) return null;
  if (answer.reason === "serverEnv") {
    logRouteError(path, answer.message);
    return routeJson({ error: "server error" }, 500);
  }
  if (answer.reason === "notSignedIn" && answer.message !== "") {
    console.error(`[ssr-error] ${path} not signed in ${answer.message}`);
  }
  return routeJson(
    { error: answer.reason === "missingBearer" ? "missing bearer token" : "not signed in" },
    401,
  );
}

/** A POST body, parsed defensively: a malformed body is an empty record. */
export async function readJsonBody(request: Request): Promise<Record<string, unknown>> {
  try {
    const parsed: unknown = await request.json();
    return parsed !== null && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

/** An env dial with a floor of 1 — a misconfigured dial must never mean "off". */
export function envDial(name: string, fallback: number): number {
  const raw = Number(serverEnv(name));
  return Number.isFinite(raw) && raw >= 1 ? Math.floor(raw) : fallback;
}

export interface RateVerdict {
  allowed: boolean;
  resetsAt: string | null;
}

/**
 * DEC-071 — the rate-limit primitive, consumed BEFORE any work: the dial and the
 * window belong to the route, the counting belongs to the database.
 */
export async function consumeRate(
  supabase: SupabaseClient<Database>,
  action: string,
  key: string,
  limit: number,
  window: string,
): Promise<RateVerdict> {
  const { data, error } = await supabase.rpc("consume_rate_limit", {
    p_action: action,
    p_key: key,
    p_limit: limit,
    p_window: window,
  });
  if (error) throw new Error(`rate limit ${action}: ${error.message}`);
  const verdict = (data ?? {}) as { allowed?: unknown; resets_at?: unknown };
  return {
    allowed: verdict.allowed === true,
    resetsAt: typeof verdict.resets_at === "string" ? verdict.resets_at : null,
  };
}
