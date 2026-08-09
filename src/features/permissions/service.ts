import { supabase } from "@/integrations/supabase/client";

/**
 * The client seam onto the RBAC core (Phase R1/R2).
 *
 * `get_my_permissions()` is a SECURITY DEFINER function scoped to auth.uid();
 * it returns 'resource:action' slugs. Law F3 still governs: what comes back
 * here decides what the UI RENDERS, never what the user may DO — the server
 * (RLS / has_permission) remains the sole authorization authority.
 *
 * PERFORMANCE LAW: this module must only ever be reached from admin-gated
 * code. scripts/check-browse-imports.sh enforces that at CI time.
 */
export async function fetchMyPermissions(): Promise<string[]> {
  const { data, error } = await supabase.rpc("get_my_permissions");
  // Law F4 — no phantom success: a failed read is an error, not "no permissions".
  if (error) throw error;
  return (data ?? []).map((row: { permission: string }) => row.permission);
}

export const ADMIN_PANEL_PERMISSION = "admin_panel:access";
