import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  deleteLocation,
  listAllCountries,
  listLocations,
  listLocationAncestry,
  moveLocation,
  reorderLocations,
  setLocationActive,
  upsertLocation,
  type ListLocationsInput,
  type UpsertLocationInput,
} from "./locations-service";

/**
 * LOCATIONS ERA L2a — the console's cache namespace. It starts at
 * AUTH_DERIVED_ROOT so a sign-out drops every locations read with one
 * removeQueries() (U1g-3 purge law).
 */
export const ADMIN_LOCATIONS_KEY = [AUTH_DERIVED_ROOT, "admin", "locations"] as const;

/** The country skeleton behind every absolute row key (see `toRoster`). */
export function useLocationAncestry(countryCode: string) {
  return useQuery({
    queryKey: [...ADMIN_LOCATIONS_KEY, "ancestry", countryCode === "" ? "none" : countryCode],
    queryFn: () => listLocationAncestry(countryCode),
    enabled: countryCode !== "",
    staleTime: 15_000,
  });
}

export function useAdminLocations(input: ListLocationsInput | null) {
  return useQuery({
    queryKey: [
      ...ADMIN_LOCATIONS_KEY,
      "list",
      input?.countryCode ?? "none",
      input?.search ?? "",
      input?.level ?? "all",
      input?.active === null || input?.active === undefined ? "all" : String(input.active),
    ],
    queryFn: () => listLocations(input as ListLocationsInput),
    enabled: input !== null && input.countryCode !== "",
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
