import { useQuery } from "@tanstack/react-query";

import { fetchMyPermissions } from "./service";

/** Shared cache key — one read per session, shared by every admin surface. */
export const MY_PERMISSIONS_KEY = ["my-permissions"] as const;

/**
 * The permission read. Cached hard on purpose (performance strategy): roles
 * change rarely, and a marketplace visitor must never pay for RBAC.
 *
 * `enabled` is the second half of that rule: signed-out visitors issue no
 * request at all.
 */
export function usePermissions({ enabled = true }: { enabled?: boolean } = {}) {
  const query = useQuery({
    queryKey: MY_PERMISSIONS_KEY,
    queryFn: fetchMyPermissions,
    staleTime: 5 * 60_000,
    gcTime: 10 * 60_000,
    retry: 1,
    enabled,
  });

  return {
    permissions: query.data ?? [],
    loading: query.isLoading,
    error: query.error,
    has: (slug: string) => (query.data ?? []).includes(slug),
  };
}
