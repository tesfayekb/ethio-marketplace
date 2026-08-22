import { useQuery } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import { getAuditStats, listAudit, listAuditFacets, type AuditFilters } from "./audit-service";

/**
 * U1g-3 purge law: every key starts at AUTH_DERIVED_ROOT so a sign-out
 * removes the audit reads with the rest of the session-derived cache.
 */
export const ADMIN_AUDIT_KEY = [AUTH_DERIVED_ROOT, "admin", "audit"] as const;

export function useAuditList(filters: AuditFilters) {
  return useQuery({
    queryKey: [...ADMIN_AUDIT_KEY, "list", filters],
    queryFn: () => listAudit(filters),
    staleTime: 15_000,
  });
}

export function useAuditFacets() {
  return useQuery({
    queryKey: [...ADMIN_AUDIT_KEY, "facets"],
    queryFn: listAuditFacets,
    staleTime: 60_000,
  });
}

export function useAuditStats(days = 14) {
  return useQuery({
    queryKey: [...ADMIN_AUDIT_KEY, "stats", days],
    queryFn: () => getAuditStats(days),
    staleTime: 30_000,
  });
}
