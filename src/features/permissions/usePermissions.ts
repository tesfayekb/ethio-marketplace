import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import { fetchMyPermissions } from "./service";

/**
 * U1g-3 (A) — the purge root now lives in `src/lib/query-keys` (neutral, no
 * feature imports) so the shell and the admin hooks can honour the purge law
 * without importing the RBAC seam. Re-exported here for existing readers.
 */
export { AUTH_DERIVED_ROOT, authKey } from "@/lib/query-keys";

/** The ONE shared empty result (INC-090): a stable identity for every
 * render that has no permissions to report. */
const EMPTY_PERMISSIONS: string[] = [];

/** Shared cache key — one read per session, shared by every admin surface. */
export const MY_PERMISSIONS_KEY = [AUTH_DERIVED_ROOT, "my-permissions"] as const;

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
    // U1g-4 (A) — gcTime 0: the moment the last observer unmounts (sign-out
    // unmounts <PermissionsLoader/>), the entry must EVAPORATE. A lingering
    // unobserved grant is exactly what SO-4 forbids, and it costs nothing:
    // permissions are re-fetched once per session anyway. staleTime keeps the
    // in-session read cheap.
    gcTime: 0,
    retry: 1,
    enabled,
  });

  /**
   * U0j (INC-072): a disabled read reports NOTHING. Even if a cache entry
   * outlives the sign-out for a frame, a signed-out shell can never derive a
   * grant from it. The shell also removeQueries() this key on sign-out.
   *
   * INC-090 — IDENTITY IS PART OF THE CONTRACT. This used to be
   * `enabled ? (query.data ?? []) : []`, which mints a BRAND-NEW array on every
   * render while the read is loading, disabled or errored. <PermissionsLoader/>
   * lists `permissions` in an effect's dependency array, so a fresh array each
   * render meant: effect -> setState in the shell -> re-render -> fresh array
   * -> effect … an unbounded update loop that React aborts with #185, which the
   * root error boundary paints as "This page didn't load". The fallback is now
   * ONE frozen module-level constant and the result is memoised on the query
   * data, so identity only changes when the permissions themselves change.
   */
  const data = useMemo(
    () => (enabled ? (query.data ?? EMPTY_PERMISSIONS) : EMPTY_PERMISSIONS),
    [enabled, query.data],
  );

  return {
    permissions: data,
    loading: query.isLoading,
    error: query.error,
    has: (slug: string) => data.includes(slug),
  };
}
