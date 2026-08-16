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

  // U0j (INC-072): a disabled read reports NOTHING. Even if a cache entry
  // outlives the sign-out for a frame, a signed-out shell can never derive a
  // grant from it. The shell also removeQueries() this key on sign-out.
  const data = enabled ? (query.data ?? []) : [];

  return {
    permissions: data,
    loading: query.isLoading,
    error: query.error,
    has: (slug: string) => (query.data ?? []).includes(slug),
  };
}
