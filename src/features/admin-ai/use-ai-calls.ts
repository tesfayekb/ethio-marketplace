import { useQuery } from "@tanstack/react-query";
import { fetchAiCalls, type AiCallsCursor } from "./ai-service";
import { ADMIN_AI_KEY } from "./use-ai-features";

export function useAiCalls(
  feature: string,
  outcome: string,
  before: AiCallsCursor | null,
  ready = true,
) {
  return useQuery({
    enabled: ready,
    queryKey: [...ADMIN_AI_KEY, "calls", feature, outcome, before],
    queryFn: () => fetchAiCalls(feature, outcome, before),
    staleTime: 15_000,
  });
}
