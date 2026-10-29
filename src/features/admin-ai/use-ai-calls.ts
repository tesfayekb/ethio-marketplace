import { useQuery } from "@tanstack/react-query";
import { fetchAiCalls, type AiCallsCursor } from "./ai-service";
import { ADMIN_AI_KEY } from "./use-ai-features";

export function useAiCalls(task: string, outcome: string, before: AiCallsCursor | null) {
  return useQuery({
    queryKey: [...ADMIN_AI_KEY, "calls", task, outcome, before],
    queryFn: () => fetchAiCalls(task, outcome, before),
    staleTime: 15_000,
  });
}