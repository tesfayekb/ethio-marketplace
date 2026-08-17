import type { MessageKey } from "@/i18n/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * The Users section's client seam (Phase U1).
 *
 * EVERY read and write here is an RPC. There is deliberately no direct table
 * read across users: `profiles` RLS lets a user read only their own row, and
 * emails live in auth.users which the browser can never touch. The staff path
 * is the definer RPC set added by the U1 migration, each of which first checks
 * has_permission(auth.uid(), 'profiles', ...) server-side.
 *
 * Law F3 — what these return decides what the UI RENDERS; the server remains
 * the sole authorization authority.
 * Law F4 — no phantom success: every error is thrown, never swallowed.
 */

export type AccountStatus = "active" | "deactivated";

export interface AdminUserRow {
  userId: string;
  displayName: string;
  email: string;
  homeCountryCode: string | null;
  accountStatus: AccountStatus;
  createdAt: string;
  roles: string[];
}

export interface AdminUserPage {
  users: AdminUserRow[];
  totalCount: number;
}

export interface AdminUserDetail extends AdminUserRow {
  sellerAlias: string | null;
  showPhone: boolean;
  showTelegram: boolean;
  contactWhatsapp: boolean;
  statusReason: string | null;
  statusChangedAt: string | null;
  lastSignInAt: string | null;
}

export interface AdminActivityRow {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  meta: unknown;
  createdAt: string;
}

export interface AdminRoleRow {
  name: string;
  displayName: string | null;
  isSystem: boolean;
  priority: number;
}

/** Roles that are never offered in the assignment select (server refuses them too). */
export const UNASSIGNABLE_ROLES = ["super_admin", "user"] as const;

export interface ListUsersInput {
  search?: string;
  status?: string;
  role?: string;
  limit?: number;
  offset?: number;
}

export async function listUsers({
  search = "",
  status = "all",
  role = "all",
  limit = 25,
  offset = 0,
}: ListUsersInput): Promise<AdminUserPage> {
  const { data, error } = await supabase.rpc("admin_list_users", {
    p_search: search,
    p_status: status,
    p_role: role,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw error;
  const rows = data ?? [];
  return {
    users: rows.map((row) => ({
      userId: row.user_id,
      displayName: row.display_name,
      email: row.email,
      homeCountryCode: row.home_country_code ?? null,
      accountStatus: row.account_status as AccountStatus,
      createdAt: row.created_at,
      roles: row.roles ?? [],
    })),
    totalCount: rows.length > 0 ? Number(rows[0]!.total_count) : 0,
  };
}

export async function getUser(userId: string): Promise<AdminUserDetail | null> {
  const { data, error } = await supabase.rpc("admin_get_user", { p_user_id: userId });
  if (error) throw error;
  const row = (data ?? [])[0];
  if (!row) return null;
  return {
    userId: row.user_id,
    displayName: row.display_name,
    email: row.email,
    homeCountryCode: row.home_country_code ?? null,
    accountStatus: row.account_status as AccountStatus,
    createdAt: row.created_at,
    roles: row.roles ?? [],
    sellerAlias: row.seller_alias ?? null,
    showPhone: row.show_phone,
    showTelegram: row.show_telegram,
    contactWhatsapp: row.contact_whatsapp,
    statusReason: row.status_reason ?? null,
    statusChangedAt: row.status_changed_at ?? null,
    lastSignInAt: row.last_sign_in_at ?? null,
  };
}

export async function setAccountStatus(input: {
  userId: string;
  status: AccountStatus;
  reason?: string;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_account_status", {
    p_user_id: input.userId,
    p_status: input.status,
    p_reason: input.reason ?? "",
  });
  if (error) throw error;
}

export async function listUserActivity(userId: string, limit = 50): Promise<AdminActivityRow[]> {
  const { data, error } = await supabase.rpc("admin_user_activity", {
    p_user_id: userId,
    p_limit: limit,
  });
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    actorId: row.actor_id ?? null,
    action: row.action,
    entityType: row.entity_type,
    entityId: row.entity_id ?? null,
    meta: row.meta,
    createdAt: row.created_at,
  }));
}

export async function listRoles(): Promise<AdminRoleRow[]> {
  const { data, error } = await supabase.rpc("admin_list_roles");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    name: row.name,
    displayName: row.display_name ?? null,
    isSystem: row.is_system,
    priority: row.priority,
  }));
}

export async function assignRole(userId: string, roleName: string): Promise<void> {
  const { error } = await supabase.rpc("assign_role", {
    p_target_user: userId,
    p_role_name: roleName,
  });
  if (error) throw error;
}

export async function revokeRole(userId: string, roleName: string): Promise<void> {
  const { error } = await supabase.rpc("revoke_role", {
    p_target_user: userId,
    p_role_name: roleName,
  });
  if (error) throw error;
}

/* ---------------------------------------------------------------------------
 * U1g — EDIT USER.
 *
 * The write is the definer RPC `admin_update_profile`, which checks
 * profiles:update AND require_step_up_if_needed('profiles','update') before it
 * touches a row. The browser never writes to profiles across users.
 * ------------------------------------------------------------------------ */

export interface CountryOption {
  code: string;
  nameEn: string;
}

/** Countries are public reference data (policy `countries_public_read`). */
export async function listCountries(): Promise<CountryOption[]> {
  const { data, error } = await supabase
    .from("countries")
    .select("code, name_en")
    .eq("is_active", true)
    .order("name_en");
  if (error) throw error;
  return (data ?? []).map((row) => ({ code: row.code, nameEn: row.name_en }));
}

export interface UpdateProfileInput {
  userId: string;
  displayName: string;
  sellerAlias: string | null;
  homeCountryCode: string | null;
}

export async function updateProfile(input: UpdateProfileInput): Promise<void> {
  const { error } = await supabase.rpc("admin_update_profile", {
    p_user_id: input.userId,
    p_display_name: input.displayName,
    // The generated signature models the DEFAULT NULL params as optional:
    // "not sent" and "sent as null" are the same thing to the function.
    p_seller_alias: input.sellerAlias ?? undefined,
    p_home_country_code: input.homeCountryCode ?? undefined,
  });
  if (error) throw error;
}

/**
 * Maps the RPC's (and the table constraints') refusals onto translation keys.
 * Law F4 — an unmapped failure is still a failure: it falls back to the
 * generic key, never to silence.
 */
export function profileEditErrorKey(error: unknown): MessageKey {
  const message = (error as { message?: string } | null)?.message ?? "";
  if (/alias already taken|profiles_seller_alias_unique|duplicate key/i.test(message)) {
    return "admin.users.edit.errorAliasTaken";
  }
  if (/display name is required/i.test(message)) return "admin.users.edit.errorNameRequired";
  if (/seller_alias|alias/i.test(message)) return "admin.users.edit.errorAliasFormat";
  if (/unknown country|home_country_code/i.test(message)) return "admin.users.edit.errorCountry";
  if (/step-up required/i.test(message)) return "admin.users.edit.errorStepUp";
  if (/permission denied/i.test(message)) return "admin.users.edit.errorPermission";
  return "admin.users.edit.failed";
}
