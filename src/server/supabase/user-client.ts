import {
  createClient,
  isAuthRetryableFetchError,
  type SupabaseClient,
} from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { errorText, errorWithStack, HTML_PAGE } from "@/lib/error-text";

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

/**
 * INC-574 — `upstream`: the auth server did not answer for itself (no answer, a
 * gateway status, an error page), so the bearer was never judged. It is not
 * "not signed in": the route answers 503 and the client tries again.
 */
export type UserClientRefusal =
  | "missingBearer"
  | "serverEnv"
  | "notSignedIn"
  | "upstream"
  /** Bundle 16 turn S3 (D189) — the bearer is a deactivated account: refused at every route. */
  | "deactivated";

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

/** INC-606 — the anonymous role's client: the publishable key and no session. */
export function anonymousClient(): SupabaseClient<Database> | null {
  const url = process.env["SUPABASE_URL"] ?? "";
  const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  if (url === "" || publishable === "") return null;
  return createClient<Database>(url, publishable, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
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
  if (error && isAuthRetryableFetchError(error)) {
    return {
      supabase,
      userId: null,
      reason: "upstream",
      message: `auth upstream unavailable (${error.status})`,
    };
  }
  if (error || !data?.user?.id) {
    return {
      supabase,
      userId: null,
      reason: "notSignedIn",
      message: error?.message ?? "no user for this bearer",
    };
  }

  /**
   * Bundle 16 turn S3 (D189) — A DEACTIVATED ACCOUNT IS REFUSED AT EVERY ROUTE.
   * The caller's own profile row is read as the caller (its owner policy): a
   * deactivated status is a refusal before any route work; a read that fails is
   * `upstream` (the route never opens on a status it could not read — F4).
   */
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("account_status")
    .eq("user_id", data.user.id)
    .maybeSingle();
  if (profileError) {
    return {
      supabase,
      userId: null,
      reason: "upstream",
      message: `account status unavailable (${profileError.message})`,
    };
  }
  if (profile?.account_status === "deactivated") {
    return { supabase, userId: null, reason: "deactivated", message: "" };
  }

  return { supabase, userId: data.user.id, reason: null, message: "" };
}

/**
 * Foundations turn 11 (DEC-237) — THE ONE STAFF CHECK. `has_permission` is the
 * function every gated RPC calls; it is asked AS THE CALLER, so a route checks
 * exactly what its door checks — no stricter, no weaker. A permission is
 * "resource:action"; any other form throws (a coding error, never a pass). An
 * rpc error throws: the caller's boundary answers it, never as a refusal (F4).
 */
export async function callerHasPermission(
  supabase: SupabaseClient<Database>,
  userId: string,
  permission: string,
): Promise<boolean> {
  const parts = permission.split(":");
  if (parts.length !== 2 || parts[0] === "" || parts[1] === "") {
    throw new Error(`malformed permission ${permission}`);
  }
  const [resource, action] = parts;
  const { data, error } = await supabase.rpc("has_permission", {
    p_user_id: userId,
    p_resource: resource,
    p_action: action,
  });
  if (error) throw error;
  return data === true;
}

/* ------------------------- the route's shared shapes ---------------------- */

/** JSON out, never cached, never HTML (I4 companion). */
export function routeJson(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

/**
 * I4 — one `[ssr-error]` line for every throw and every deliberate 5xx.
 * INC-328 / INC-574 / INC-625 — an upstream HTML error page is named, never
 * dumped into the log (what came before it is kept), and an error with no
 * message says so: the one rule, src/lib/error-text.ts.
 */
export function logRouteError(path: string, error: unknown): void {
  console.error("[ssr-error]", path, errorWithStack(error));
}

/** INC-574 — gateway statuses: a gateway answered in the door's place. */
const GATEWAY_STATUSES = new Set([
  502, 503, 504, 520, 521, 522, 523, 524, 525, 526, 527, 528, 529, 530,
]);

/**
 * INC-574 — AN UPSTREAM FAILURE IS NOT A VERDICT. A door call that came back
 * with no answer (status 0: the fetch failed), a gateway status, or an HTML
 * page where the door's JSON should be never reached the door's judgement.
 * Run 38250004537: the draft door's call answered an HTML error page, the route
 * sent it as `ok:false` / `doorError`, and the wizard showed a refusal nobody
 * made. A status-500 answer with the database's own JSON stays a door error.
 */
export function upstreamFailed(error: { message?: string } | null, status: number): boolean {
  if (error === null) return false;
  if (status === 0 || GATEWAY_STATUSES.has(status)) return true;
  return HTML_PAGE.test(error.message ?? "");
}

/**
 * INC-574 — the answer for an upstream failure: 503, which the clients read as
 * "not reached" and try again (INC-228), never as a refusal.
 */
export function upstreamUnavailable(path: string, what: string, status: number): Response {
  console.error("[ssr-error]", path, `${what}: upstream unavailable (${status})`);
  return routeJson({ error: "upstream unavailable" }, 503);
}

/** A refusal is the door's own vocabulary: status 200, `ok:false` (F4). */
export function refusal(field: string, reason: string, detail?: string): Response {
  return routeJson(
    { ok: false, refusals: [detail === undefined ? { field, reason } : { field, reason, detail }] },
    200,
  );
}

/**
 * The 401/500/503 answers every authenticated posting route shares, so the
 * wording of "not signed in" is written once.
 */
export function refuseUserClient(path: string, answer: UserClientAnswer): Response | null {
  if (answer.reason === null) return null;
  if (answer.reason === "serverEnv") {
    logRouteError(path, answer.message);
    return routeJson({ error: "server error" }, 500);
  }
  if (answer.reason === "upstream") {
    console.error("[ssr-error]", path, errorText(answer.message));
    return routeJson({ error: "upstream unavailable" }, 503);
  }
  // Turn S3 — a deactivated account: refused, not "not signed in"; nothing is logged (no incident, no secret).
  if (answer.reason === "deactivated") return routeJson({ error: "account is deactivated" }, 403);
  if (answer.reason === "notSignedIn" && answer.message !== "") {
    console.error(`[ssr-error] ${path} not signed in ${errorText(answer.message)}`);
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
  /** INC-299 — the RPC's own count left after this call; null when absent. */
  remaining: number | null;
}

/**
 * DEC-071 / INC-396 — the rate-limit primitive, consumed BEFORE any work: the dial
 * and the window belong to the route, the counting belongs to the database.
 * `consume_rate_limit` is closed to the browser roles (M1), so the count runs
 * through the server-only client. Call it only after the caller is verified.
 */
export async function consumeRate(
  action: string,
  key: string,
  limit: number,
  window: string,
): Promise<RateVerdict> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("consume_rate_limit", {
    p_action: action,
    p_key: key,
    p_limit: limit,
    p_window: window,
  });
  if (error) throw new Error(`rate limit ${action}: ${error.message}`);
  const verdict = (data ?? {}) as { allowed?: unknown; resets_at?: unknown; remaining?: unknown };
  return {
    allowed: verdict.allowed === true,
    resetsAt: typeof verdict.resets_at === "string" ? verdict.resets_at : null,
    remaining:
      typeof verdict.remaining === "number" && Number.isFinite(verdict.remaining)
        ? verdict.remaining
        : null,
  };
}

/**
 * INC-669 — THE SAME COUNT, READ WITHOUT SPENDING. `peek_rate_limit` answers
 * what is left of the CURRENT window for an action and key — the window
 * `consume_rate_limit` counts in, proven equal by the function's own migration —
 * and inserts nothing, so a screen can say the true remaining before any try.
 * Closed to the browser roles like its sibling; call it only after the caller
 * and the key's ownership are verified.
 */
export async function peekRate(
  action: string,
  key: string,
  limit: number,
  window: string,
): Promise<Pick<RateVerdict, "remaining" | "resetsAt">> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("peek_rate_limit", {
    p_action: action,
    p_key: key,
    p_limit: limit,
    p_window: window,
  });
  if (error) throw new Error(`rate peek ${action}: ${error.message}`);
  const verdict = (data ?? {}) as { resets_at?: unknown; remaining?: unknown };
  return {
    resetsAt: typeof verdict.resets_at === "string" ? verdict.resets_at : null,
    remaining:
      typeof verdict.remaining === "number" && Number.isFinite(verdict.remaining)
        ? verdict.remaining
        : null,
  };
}

/**
 * INC-396 — the doors count for themselves (`rate_gate`) and name the reset as
 * `resets_at`; the client has always read a route refusal's `detail`. This keeps
 * what the client receives unchanged.
 */
export function doorAnswer(data: unknown): unknown {
  if (data === null || typeof data !== "object") return data;
  const refusals = (data as { refusals?: unknown }).refusals;
  if (!Array.isArray(refusals)) return data;
  return {
    ...(data as Record<string, unknown>),
    refusals: refusals.map((entry: unknown) => {
      if (entry === null || typeof entry !== "object") return entry;
      const { resets_at: resetsAt, ...rest } = entry as Record<string, unknown>;
      if (rest["reason"] !== "rateLimited") return entry;
      return typeof resetsAt === "string" ? { ...rest, detail: resetsAt } : rest;
    }),
  };
}
