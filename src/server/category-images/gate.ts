/**
 * C5a — the route gate, conformed VERBATIM to the U4c translations MT route
 * (`src/routes/api/translate.ts`): bearer header -> caller-context Supabase
 * client built from SUPABASE_URL + SUPABASE_PUBLISHABLE_KEY -> auth.getUser()
 * -> `has_permission` RPC. The only difference is the resource/action pair,
 * which here is `categories:assets`.
 *
 * F3 — the server is the only authority; there is NO service-role client on the
 * gate path, so this route cannot read or write past RLS while deciding.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";

export function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Every 5xx — thrown or deliberate — is logged before it leaves (I4). */
export function fail5xx(path: string, message: string, status = 500): Response {
  console.error(`[ssr-error] ${path} ${message}`);
  return json({ error: "server error" }, status);
}

export interface GateOk {
  ok: true;
  supabase: SupabaseClient<Database>;
  uid: string;
}
export interface GateDenied {
  ok: false;
  response: Response;
}

export async function gateCategoriesAssets(
  request: Request,
  path: string,
): Promise<GateOk | GateDenied> {
  const authorization = request.headers.get("Authorization") ?? "";
  if (!authorization.toLowerCase().startsWith("bearer ")) {
    return { ok: false, response: json({ error: "missing bearer token" }, 401) };
  }

  const url = process.env["SUPABASE_URL"] ?? "";
  const publishable = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
  if (url === "" || publishable === "") {
    return { ok: false, response: fail5xx(path, "supabase server env missing") };
  }

  const supabase = createClient<Database>(url, publishable, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const uid = userData?.user?.id;
  if (userError || !uid) {
    return { ok: false, response: json({ error: "not signed in" }, 401) };
  }

  const { data: mayAssets, error: permError } = await supabase.rpc("has_permission", {
    p_user_id: uid,
    p_resource: "categories",
    p_action: "assets",
  });
  if (permError) return { ok: false, response: fail5xx(path, permError.message) };
  if (mayAssets !== true) {
    return { ok: false, response: json({ error: "permission denied" }, 403) };
  }

  return { ok: true, supabase, uid };
}
