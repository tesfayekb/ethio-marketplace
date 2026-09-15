import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  deleteLocation,
  listAllCountries,
  listLocations,
  moveLocation,
  reorderLocations,
  setLocationActive,
  upsertLocation,
  type UpsertLocationInput,
} from "./locations-service";

/**
 * LOCATIONS ERA L2a — the console's cache namespace. It starts at
 * AUTH_DERIVED_ROOT so a sign-out drops every locations read with one
 * removeQueries() (U1g-3 purge law).
 */
export const ADMIN_LOCATIONS_KEY = [AUTH_DERIVED_ROOT, "admin", "locations"] as const;

/**
 * L2a-R — ONE READ PER COUNTRY. The key carries the country and NOTHING else:
 * search, level and status are client-side sieves over this one roster, so a
 * keystroke costs no request and switching the market is the only fetch.
 */
export function useAdminLocations(countryCode: string) {
  return useQuery({
    queryKey: [...ADMIN_LOCATIONS_KEY, "list", countryCode === "" ? "none" : countryCode],
    queryFn: () => listLocations(countryCode),
    enabled: countryCode !== "",
    staleTime: 15_000,
  });
}

/** Every market, open or closed — the filter curates before a country opens. */
export function useAllCountries() {
  return useQuery({
    queryKey: [...ADMIN_LOCATIONS_KEY, "countries"],
    queryFn: listAllCountries,
    staleTime: 60_000,
  });
}

function useInvalidateLocations() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: ADMIN_LOCATIONS_KEY });
}

export function useUpsertLocation() {
  const invalidate = useInvalidateLocations();
  return useMutation({
    mutationFn: (input: UpsertLocationInput) => upsertLocation(input),
    onSettled: invalidate,
  });
}

export function useSetLocationActive() {
  const invalidate = useInvalidateLocations();
  return useMutation({
    mutationFn: (input: { id: string; active: boolean }) => setLocationActive(input),
    onSettled: invalidate,
  });
}

export function useMoveLocation() {
  const invalidate = useInvalidateLocations();
  return useMutation({
    mutationFn: (input: { id: string; newParentId: string }) => moveLocation(input),
    onSettled: invalidate,
  });
}

export function useReorderLocations() {
  const invalidate = useInvalidateLocations();
  return useMutation({
    mutationFn: (input: { parentId: string; ids: string[] }) => reorderLocations(input),
    onSettled: invalidate,
  });
}

export function useDeleteLocation() {
  const invalidate = useInvalidateLocations();
  return useMutation({
    mutationFn: (input: { id: string; slug: string }) => deleteLocation(input),
    onSettled: invalidate,
  });
}
