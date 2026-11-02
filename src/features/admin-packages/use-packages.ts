import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  endPrice,
  listPackagePrices,
  listPackages,
  savePackage,
  savePrice,
  type SavePackageInput,
  type SavePriceInput,
} from "./packages-service";

/**
 * P-1 — the packages console's cache namespace. It starts at AUTH_DERIVED_ROOT
 * so a sign-out drops both reads with one removeQueries() (U1g-3 purge law);
 * every write settles the whole namespace, so the prices follow a package edit.
 */
export const ADMIN_PACKAGES_KEY = [AUTH_DERIVED_ROOT, "admin", "packages"] as const;

/** ONE READ: the packages are few and the roster is rendered straight from it. */
export function usePackages() {
  return useQuery({
    queryKey: [...ADMIN_PACKAGES_KEY, "list"],
    queryFn: listPackages,
    staleTime: 15_000,
  });
}

/** The chosen package's price rows; nothing is read until a package is chosen. */
export function usePackagePrices(packageKey: string | null) {
  return useQuery({
    queryKey: [...ADMIN_PACKAGES_KEY, "prices", packageKey ?? ""],
    queryFn: () => listPackagePrices(packageKey ?? ""),
    staleTime: 15_000,
    enabled: packageKey !== null,
  });
}

function useSettledWrite<TInput>(write: (input: TInput) => Promise<void>) {
  const queryClient = useQueryClient();
  return useMutation({
    // INC-558's class — the editors are seeded from these reads (useSettling).
    mutationKey: ADMIN_PACKAGES_KEY,
    mutationFn: write,
    onSettled: async () => {
      await refreshAfterWrite(queryClient, { queryKey: ADMIN_PACKAGES_KEY });
    },
  });
}

export function useSavePackage() {
  return useSettledWrite((input: SavePackageInput) => savePackage(input));
}

export function useSavePrice() {
  return useSettledWrite((input: SavePriceInput) => savePrice(input));
}

export function useEndPrice() {
  return useSettledWrite((input: { id: string; validTo: string | null }) =>
    endPrice(input.id, input.validTo),
  );
}
