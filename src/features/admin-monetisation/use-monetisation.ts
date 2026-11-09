import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  clearOverride,
  editPrice,
  endPrice,
  listMonetisation,
  saveMarket,
  saveOverride,
  savePrice,
  saveProduct,
  type SaveMarketInput,
  type SaveOverrideInput,
  type SavePriceInput,
  type SaveProductInput,
} from "./monetisation-service";

/**
 * P-1b — the monetisation console's cache namespace. It starts at
 * AUTH_DERIVED_ROOT so a sign-out drops both reads with one removeQueries()
 * (U1g-3 purge law); every write settles the whole namespace, so every section
 * follows a save (a market names a reach product; a price names a product).
 */
export const ADMIN_MONETISATION_KEY = [AUTH_DERIVED_ROOT, "admin", "monetisation"] as const;

/** ONE READ: the four tables arrive together and every section draws from it. */
export function useMonetisation() {
  return useQuery({
    queryKey: [...ADMIN_MONETISATION_KEY, "console"],
    queryFn: listMonetisation,
    staleTime: 15_000,
  });
}

function useSettledWrite<TInput>(write: (input: TInput) => Promise<void>) {
  const queryClient = useQueryClient();
  return useMutation({
    // INC-558's class — the editors are seeded from these reads (useSettling).
    mutationKey: ADMIN_MONETISATION_KEY,
    mutationFn: write,
    onSettled: async () => {
      await refreshAfterWrite(queryClient, { queryKey: ADMIN_MONETISATION_KEY });
    },
  });
}

export function useSaveProduct() {
  return useSettledWrite((input: SaveProductInput) => saveProduct(input));
}

export function useSaveOverride() {
  return useSettledWrite((input: SaveOverrideInput) => saveOverride(input));
}

export function useClearOverride() {
  return useSettledWrite((input: { id: string }) => clearOverride(input.id));
}

export function useSavePrice() {
  return useSettledWrite((input: SavePriceInput) => savePrice(input));
}

export function useEditPrice() {
  return useSettledWrite((input: { id: string; price: SavePriceInput }) =>
    editPrice(input.id, input.price),
  );
}

export function useEndPrice() {
  return useSettledWrite((input: { id: string; validTo: string | null }) =>
    endPrice(input.id, input.validTo),
  );
}

export function useSaveMarket() {
  return useSettledWrite((input: SaveMarketInput) => saveMarket(input));
}
