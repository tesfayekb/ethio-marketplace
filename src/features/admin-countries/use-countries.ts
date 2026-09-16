import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { listCategories, toRoster } from "@/features/admin-categories/categories-service";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  listCountries,
  setCountryActive,
  setCountryRootOrder,
  upsertCountry,
  type UpsertCountryInput,
} from "./countries-service";

/**
 * LOCATIONS ERA L2b-C1 — the countries console's cache namespace. It starts at
 * AUTH_DERIVED_ROOT so a sign-out drops every read with one removeQueries()
 * (U1g-3 purge law).
 */
export const ADMIN_COUNTRIES_KEY = [AUTH_DERIVED_ROOT, "admin", "countries"] as const;

/** ONE READ: search and status are client-side sieves over this roster. */
export function useAdminCountries() {
  return useQuery({
    queryKey: [...ADMIN_COUNTRIES_KEY, "list"],
    queryFn: listCountries,
    staleTime: 15_000,
  });
}

/**
 * The ACTIVE ROOT categories, in the global order — the universe the rail-order
 * dialog reorders. Read through the categories console's own seam (B1/B3), so
 * there is exactly one client definition of what a root is.
 */
export function useRootCategories() {
  return useQuery({
    queryKey: [AUTH_DERIVED_ROOT, "admin", "categories", "roots"],
    queryFn: async () => {
      const roster = toRoster(await listCategories());
      return roster
        .filter((row) => row.depth === 0 && row.isActive)
        .map((row) => ({ id: row.id, slug: row.slug, nameEn: row.nameEn }));
    },
    staleTime: 60_000,
  });
}

function useInvalidateCountries() {
  const queryClient = useQueryClient();
  return async () => {
    await queryClient.invalidateQueries({ queryKey: ADMIN_COUNTRIES_KEY });
    // A market's anchor and its open state are also places: the roster next
    // door must not keep a stale market in its picker (F4 — no stale truth).
    await queryClient.invalidateQueries({
      queryKey: [AUTH_DERIVED_ROOT, "admin", "locations"],
    });
  };
}

export function useUpsertCountry() {
  const invalidate = useInvalidateCountries();
  return useMutation({
    mutationFn: (input: UpsertCountryInput) => upsertCountry(input),
    onSettled: invalidate,
  });
}

export function useSetCountryActive() {
  const invalidate = useInvalidateCountries();
  return useMutation({
    mutationFn: (input: { code: string; active: boolean; forceHide?: boolean }) =>
      setCountryActive(input),
    onSettled: invalidate,
  });
}

export function useSetCountryRootOrder() {
  const invalidate = useInvalidateCountries();
  return useMutation({
    mutationFn: (input: { code: string; categoryIds: string[] }) => setCountryRootOrder(input),
    onSettled: invalidate,
  });
}
