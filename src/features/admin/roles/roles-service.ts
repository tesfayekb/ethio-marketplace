import type { MessageKey } from "@/i18n/types";
import { supabase } from "@/integrations/supabase/client";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * The Roles & Permissions section's client seam (Phase U2).
 *
 * Every read and write is a definer RPC behind door_context (DEC-333): the
 * roles permission, and — for mutations — step-up and the dial, server-side;
 * a refusal is a code (`code[:detail]`). The browser never writes to
 * public.roles or public.role_permissions directly.
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
  /** DEC-017 — false = reserved for system roles; the server refuses grants. */
  assignable: boolean;
  /** True when the base `user` role already carries it (derived live). */
  userBaseline: boolean;
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
      assignable: row.assignable,
      userBaseline: row.user_baseline,
    })),
  };
}

export interface CreateRoleInput {
  name: string;
  displayName: string;
  description: string;
}

/** The door's success answer (DEC-333 shell): `{ ok: true, id }`. */
export function createdRoleId(data: unknown): string | null {
  if (data === null || typeof data !== "object" || Array.isArray(data)) return null;
  const answer = data as Record<string, unknown>;
  const id = answer["id"];
  return answer["ok"] === true && typeof id === "string" ? id : null;
}

export async function createRole(input: CreateRoleInput): Promise<string> {
  const { data, error } = await supabase.rpc("admin_create_role", {
    p_name: input.name,
    p_display_name: input.displayName,
    p_description: input.description,
  });
  if (error) throw error;
  const id = createdRoleId(data);
  if (id === null) throw new Error("admin_create_role returned no role");
  return id;
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
 * The role doors' own words for their codes (DEC-333, F1-2). A code without
 * words here (unknownRole, unknownPermission, roleReserved, rateLimited) reads
 * as the screen's generic.
 * Step-up stays P0009 on the wire, a sentence until the step-up gate answers a
 * code.
 */
export const ROLE_REFUSALS = {
  words: {
    permissionDenied: "admin.roles.error.permission",
    systemRole: "admin.roles.error.systemLocked",
    corePermission: "admin.roles.error.coreLocked",
    permissionReserved: "admin.roles.perm.notAssignable",
    hasDependents: "admin.roles.error.hasMembers",
    duplicateKey: "admin.roles.error.nameTaken",
    nameRequired: "admin.roles.error.nameRequired",
    badSlug: "admin.roles.error.nameFormat",
  },
  sentences: [[/step-up required/i, "admin.roles.error.stepUp"]],
} as const satisfies RefusalFamily;

/**
 * A role door's refusal as the key a screen draws, through the one reader;
 * null when the person cancelled the step-up (nothing ran, nothing is said).
 */
export function roleRefusalKey(error: unknown, fallback: MessageKey): MessageKey | null {
  const read = readRefusal(error, { ...ROLE_REFUSALS, generic: fallback });
  return read.silent ? null : read.key;
}

/** `resource:action` — the same slug shape get_my_permissions() returns. */
export function permissionSlug(row: RolePermissionRow): string {
  return `${row.resource}:${row.action}`;
}
