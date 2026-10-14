import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import { listAiFeatures, setAiFeature, type SetAiFeatureInput } from "./ai-service";

/**
 * Bundle 13 turn 5 (D158) — the AI console's cache namespace. It starts at
 * AUTH_DERIVED_ROOT so a sign-out drops the read (U1g-3 purge law).
 */
export const ADMIN_AI_KEY = [AUTH_DERIVED_ROOT, "admin", "ai"] as const;

/** ONE READ: six rows; a spend moves with every paid call, so it is re-read often. */
export function useAiFeatures() {
  return useQuery({
    queryKey: [...ADMIN_AI_KEY, "list"],
    queryFn: listAiFeatures,
    staleTime: 15_000,
  });
}

export function useSetAiFeature() {
  const queryClient = useQueryClient();
  return useMutation({
    // INC-558's class — the editor is seeded from this read (useSettling).
    mutationKey: ADMIN_AI_KEY,
    mutationFn: (input: SetAiFeatureInput) => setAiFeature(input),
    onSettled: async () => {
      await refreshAfterWrite(queryClient, { queryKey: ADMIN_AI_KEY });
    },
  });
}
