import type { MessageKey } from "@/i18n/types";
import { supabase } from "@/integrations/supabase/client";

/**
 * The Roles & Permissions section's client seam (Phase U2).
 *
 * Every read and write is a definer RPC that re-checks
 * has_permission(auth.uid(), 'roles', …) and — for mutations —
 * require_step_up_if_needed('roles', …) server-side. The browser never writes
 * to public.roles or public.role_permissions directly.
 *
 * Law F3 — what these return decides what the UI RENDERS; the server is the
 * sole authorization authority.
 * Law F4 — no phantom success: every error is thrown, never swallowed.
 */

export interface RoleSummary {
  id: string;
  name: string;
  displayName: string | null;
  description: string | null;
  isSystem: boolean;
  memberCount: number;
  permissionCount: number;
}

export interface RolePermissionRow {
  permissionId: string;
  resource: string;
  action: string;
  requiresStepUp: boolean;
  granted: boolean;
  isCore: boolean;
}

export interface RoleDetail {
  id: string;
  name: string;
  displayName: string | null;
  description: string | null;
  isSystem: boolean;
  memberCount: number;
  permissions: RolePermissionRow[];
}

export async function listRolesDetailed(): Promise<RoleSummary[]> {
  const { data, error } = await supabase.rpc("admin_list_roles_detailed");
  if (error) throw error;
  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    displayName: row.display_name ?? null,
    description: row.description ?? null,
    isSystem: row.is_system,
    memberCount: Number(row.member_count),
    permissionCount: Number(row.permission_count),
  }));
}

export async function getRole(roleId: string): Promise<RoleDetail | null> {
  const { data, error } = await supabase.rpc("admin_get_role", { p_role_id: roleId });
  if (error) throw error;
  const rows = data ?? [];
  const first = rows[0];
  if (!first) return null;
  return {
    id: first.role_id,
    name: first.name,
    displayName: first.display_name ?? null,
    description: first.description ?? null,
    isSystem: first.is_system,
    memberCount: Number(first.member_count),
    permissions: rows.map((row) => ({
      permissionId: row.permission_id,
      resource: row.resource,
      action: row.action,
      requiresStepUp: row.requires_step_up,
      granted: row.granted,
      isCore: row.is_core,
    })),
  };
}

export interface CreateRoleInput {
  name: string;
  displayName: string;
  description: string;
}

export async function createRole(input: CreateRoleInput): Promise<string> {
  const { data, error } = await supabase.rpc("admin_create_role", {
    p_name: input.name,
    p_display_name: input.displayName,
    p_description: input.description,
  });
  if (error) throw error;
  return data as unknown as string;
}

export async function updateRole(input: {
  roleId: string;
  displayName: string;
  description: string;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_update_role", {
    p_role_id: input.roleId,
    p_display_name: input.displayName,
    p_description: input.description,
  });
  if (error) throw error;
}

export async function deleteRole(roleId: string): Promise<void> {
  const { error } = await supabase.rpc("admin_delete_role", { p_role_id: roleId });
  if (error) throw error;
}

export async function setRolePermission(input: {
  roleId: string;
  permissionId: string;
  granted: boolean;
}): Promise<void> {
  const { error } = await supabase.rpc("admin_set_role_permission", {
    p_role_id: input.roleId,
    p_permission_id: input.permissionId,
    p_granted: input.granted,
  });
  if (error) throw error;
}

/**
 * Maps every refusal the RPCs (and the R1 triggers behind them) can raise onto
 * a translation key. Law F4 — an unmapped failure still surfaces, through the
 * generic key, never through silence.
 */
export function roleErrorKey(error: unknown, fallback: MessageKey): MessageKey {
  const message = (error as { message?: string } | null)?.message ?? "";
  if (/step-up required/i.test(message)) return "admin.roles.error.stepUp";
  if (/permission denied/i.test(message)) return "admin.roles.error.permission";
  if (/system role/i.test(message)) return "admin.roles.error.systemLocked";
  if (/core permission locked|core role permission/i.test(message)) {
    return "admin.roles.error.coreLocked";
  }
  if (/role has members/i.test(message)) return "admin.roles.error.hasMembers";
  if (/already taken|duplicate key/i.test(message)) return "admin.roles.error.nameTaken";
  if (/role name is required/i.test(message)) return "admin.roles.error.nameRequired";
  if (/role name must be/i.test(message)) return "admin.roles.error.nameFormat";
  return fallback;
}

/** `resource:action` — the same slug shape get_my_permissions() returns. */
export function permissionSlug(row: RolePermissionRow): string {
  return `${row.resource}:${row.action}`;
}
