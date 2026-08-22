import { supabase } from "@/integrations/supabase/client";

/**
 * U3 — the Audit & Security section's client seam.
 *
 * Every read is a definer RPC that re-checks
 * has_permission(auth.uid(), 'audit_logs', 'view') server-side; the browser
 * never selects public.audit_log directly (its RLS denies client reads).
 *
 * Law F3 — these results decide what RENDERS; the server is the authority.
 * Law F4 — errors are thrown, never swallowed.
 */

export interface AuditRow {
  id: string;
  actorId: string | null;
  actorName: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  meta: Record<string, unknown>;
  createdAt: string;
}

export interface AuditPage {
  rows: AuditRow[];
  totalCount: number;
}

export interface AuditFilters {
  search?: string;
  action?: string;
  entityType?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export async function listAudit({
  search = "",
  action = "all",
  entityType = "all",
  from,
  to,
  limit = 25,
  offset = 0,
}: AuditFilters): Promise<AuditPage> {
  const { data, error } = await supabase.rpc("admin_list_audit", {
    p_search: search,
    p_action: action,
    p_entity_type: entityType,
    p_from: from && from !== "" ? new Date(from).toISOString() : undefined,
    p_to: to && to !== "" ? new Date(`${to}T23:59:59`).toISOString() : undefined,
    p_limit: limit,
    p_offset: offset,
  });
  if (error) throw error;
  const rows = data ?? [];
  return {
    rows: rows.map((row) => ({
      id: row.id,
      actorId: row.actor_id ?? null,
      actorName: row.actor_name ?? null,
      action: row.action,
      entityType: row.entity_type,
      entityId: row.entity_id ?? null,
      meta: asRecord(row.meta),
      createdAt: row.created_at,
    })),
    totalCount: rows.length > 0 ? Number(rows[0]!.total_count) : 0,
  };
}

export interface AuditFacets {
  actions: string[];
  entityTypes: string[];
}

export async function listAuditFacets(): Promise<AuditFacets> {
  const { data, error } = await supabase.rpc("admin_audit_facets");
  if (error) throw error;
  const rows = data ?? [];
  return {
    actions: rows.filter((row) => row.kind === "action").map((row) => row.value),
    entityTypes: rows.filter((row) => row.kind === "entity_type").map((row) => row.value),
  };
}

export interface AuditStats {
  days: { day: string; count: number }[];
  topActions: { action: string; count: number }[];
  count24h: number;
  count7d: number;
  activeImpersonations: number;
}

export async function getAuditStats(days = 14): Promise<AuditStats> {
  const { data, error } = await supabase.rpc("admin_audit_stats", { p_days: days });
  if (error) throw error;
  const row = (data ?? [])[0];
  if (!row) return { days: [], topActions: [], count24h: 0, count7d: 0, activeImpersonations: 0 };
  const dayRows = Array.isArray(row.days) ? row.days : [];
  const topRows = Array.isArray(row.top_actions) ? row.top_actions : [];
  return {
    days: dayRows.map((entry) => {
      const record = asRecord(entry);
      return { day: String(record.day ?? ""), count: Number(record.count ?? 0) };
    }),
    topActions: topRows.map((entry) => {
      const record = asRecord(entry);
      return { action: String(record.action ?? ""), count: Number(record.count ?? 0) };
    }),
    count24h: Number(row.count_24h),
    count7d: Number(row.count_7d),
    activeImpersonations: Number(row.active_impersonations),
  };
}
