import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { PriceUnitLabels } from "./price-line";

/**
 * Bundle 4 step 10 — the unit words, loaded once per session and only when a
 * card on screen holds a unit (`enabled`). A failed read is logged and the
 * line falls back to the period (F4: the price still prints, never a token).
 */
export function usePriceUnitLabels(enabled: boolean): PriceUnitLabels | null {
  const query = useQuery({
    queryKey: ["price-unit-labels"],
    enabled,
    staleTime: Infinity,
    gcTime: Infinity,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("price_unit_labels");
      if (error) {
        console.error("[price-unit-labels] read failed", error.message);
        throw error;
      }
      return (data ?? {}) as PriceUnitLabels;
    },
  });
  return query.data ?? null;
}
