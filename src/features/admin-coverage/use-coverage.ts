import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import { listCoveragePlans, setCoveragePlan, type SetCoveragePlanInput } from "./coverage-service";

/**
 * LOCATIONS ERA L2b-C2 — the coverage console's cache namespace. It starts at
 * AUTH_DERIVED_ROOT so a sign-out drops the read with one removeQueries()
 * (U1g-3 purge law).
 */
export const ADMIN_COVERAGE_KEY = [AUTH_DERIVED_ROOT, "admin", "coverage"] as const;

/** ONE READ: the plans are few and the roster is rendered straight from it. */
export function useCoveragePlans(options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: [...ADMIN_COVERAGE_KEY, "list"],
    queryFn: listCoveragePlans,
    staleTime: 15_000,
    enabled: options?.enabled ?? true,
  });
}

export function useSetCoveragePlan() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: SetCoveragePlanInput) => setCoveragePlan(input),
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ADMIN_COVERAGE_KEY });
    },
  });
}
