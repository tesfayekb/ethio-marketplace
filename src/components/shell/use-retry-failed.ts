import { QueryClientContext } from "@tanstack/react-query";
import { useCallback, useContext } from "react";

/**
 * DEC-464 — the failure notice's Retry for a screen whose failed read reaches it only as an
 * error (a child handed `error`, or several reads behind one state): it reads again every
 * mounted read that failed, and nothing that answered. Read through the context, never
 * `useQueryClient`, so a screen drawn without a client (a unit test of its form) still draws.
 */
export function useRetryFailed(): () => void {
  const client = useContext(QueryClientContext);
  return useCallback(() => {
    void client?.refetchQueries({ type: "active", predicate: (q) => q.state.status === "error" });
  }, [client]);
}
