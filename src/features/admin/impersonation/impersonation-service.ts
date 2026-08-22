import { supabase } from "@/integrations/supabase/client";

/**
 * U3 / DEC-016 — IMPERSONATION v1 client seam.
 *
 * SCOPE LAW: this is a READ-ONLY surface. There is deliberately no write path
 * that runs "as" the target — every function below either reads the target's
 * data through a definer RPC that re-verifies the 15-minute session box, or
 * opens/closes the session itself. Full auth-level act-as (a minted session
 * for the target) is DEFERRED to an edge-function design; see
 * docs/features/admin-audit-security.md.
 *
 * Law F3 — the server gates every call (super-admin, step-up, expiry).
 * Law F4 — no phantom success: errors are thrown.
 */

export interface ActiveImpersonation {
  id: string;
  targetId: string;
  targetName: string | null;
  expiresAt: string;
}

export interface ImpersonatedProfile {
  targetId: string;
  displayName: string;
  sellerAlias: string | null;
  homeCountryCode: string | null;
  accountStatus: string;
  createdAt: string;
}

export interface ImpersonatedListing {
  id: string;
  title: string;
  status: string;
  priceAmount: number | null;
  priceCurrency: string | null;
  createdAt: string;
}

export async function beginImpersonation(input: {
  targetId: string;
  reason: string;
}): Promise<{ sessionId: string; expiresAt: string }> {
  const { data, error } = await supabase.rpc("begin_impersonation", {
    p_target: input.targetId,
    p_reason: input.reason,
  });
  if (error) throw error;
  const row = (data ?? [])[0];
  if (!row) throw new Error("begin_impersonation returned no session");
  return { sessionId: row.session_id, expiresAt: row.expires_at };
}

export async function endImpersonation(sessionId: string): Promise<void> {
  const { error } = await supabase.rpc("end_impersonation", { p_session: sessionId });
  if (error) throw error;
}

export async function getActiveImpersonation(): Promise<ActiveImpersonation | null> {
  const { data, error } = await supabase.rpc("get_active_impersonation");
  if (error) throw error;
  const row = (data ?? [])[0];
  if (!row) return null;
  return {
    id: row.id,
    targetId: row.target_id,
    targetName: row.target_name ?? null,
    expiresAt: row.expires_at,
  };
}

export async function getImpersonatedProfile(sessionId: string): Promise<ImpersonatedProfile> {
  const { data, error } = await supabase.rpc("impersonated_get_profile", { p_session: sessionId });
  if (error) throw error;
  const row = (data ?? [])[0];
  if (!row) throw new Error("impersonated_get_profile returned no row");
  return {
    targetId: row.target_id,
    displayName: row.display_name,
    sellerAlias: row.seller_alias ?? null,
    homeCountryCode: row.home_country_code ?? null,
    accountStatus: row.account_status,
    createdAt: row.created_at,
  };
}

export async function listImpersonatedListings(
  sessionId: string,
  limit = 25,
  offset = 0,
): Promise<{ rows: ImpersonatedListing[]; totalCount: number }> {
  const { data, error } = await supabase.rpc("impersonated_list_listings", {
    p_session: sessionId,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw error;
  const rows = data ?? [];
  return {
    rows: rows.map((row) => ({
      id: row.id,
      title: row.title,
      status: row.status,
      priceAmount: row.price_amount === null ? null : Number(row.price_amount),
      priceCurrency: row.price_currency ?? null,
      createdAt: row.created_at,
    })),
    totalCount: rows.length > 0 ? Number(rows[0]!.total_count) : 0,
  };
}

/** True when the server refused because the 15-minute box has closed. */
export function isExpiredSessionError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return message.includes("impersonation session expired");
}
