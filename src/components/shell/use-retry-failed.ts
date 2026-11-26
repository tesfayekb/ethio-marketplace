import { QueryClientContext } from "@tanstack/react-query";
import { useCallback, useContext } from "react";

import { failureKind, isRetryable } from "./failure-reason";

/**
 * DEC-464, INC-1288 — the failure notice's Retry for a screen whose failed read reaches it only
 * as an error (a child handed `error`, or several reads behind one state): it reads again every
 * mounted read that failed AND can succeed on a second ask — a network or server failure, or a
 * rate refusal once its named time has passed — and nothing that answered or that the server
 * refused (a refused read asked again is refused again, and a rate refusal asked early spends
 * the limit). Read through the context, never `useQueryClient`, so a screen drawn without a
 * client (a unit test of its form) still draws.
 */
export function useRetryFailed(): () => void {
  const client = useContext(QueryClientContext);
  return useCallback(() => {
    void client?.refetchQueries({
      type: "active",
      predicate: (query) => {
        if (query.state.status !== "error") return false;
        const reading = failureKind(query.state.error);
        if (isRetryable(reading.kind)) return true;
        if (reading.kind !== "rateLimited" || reading.until === undefined) return false;
        const at = Date.parse(reading.until.trim());
        return !Number.isNaN(at) && at <= Date.now();
      },
    });
  }, [client]);
}
