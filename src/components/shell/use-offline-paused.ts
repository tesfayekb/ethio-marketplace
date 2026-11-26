import { onlineManager, QueryClientContext } from "@tanstack/react-query";
import { useContext, useSyncExternalStore } from "react";

/**
 * INC-1286 — TRUE WHILE THE DEVICE IS OFFLINE AND A READ WAITS FOR IT. TanStack pauses a read
 * offline (`networkMode: "online"`) and resumes it by itself on the browser's `online` event; the
 * shell says so once (offline-line.tsx) instead of every screen's loading state saying nothing.
 * No polling: it follows the browser's `online` / `offline` events and the query cache's own
 * changes. Read through the context, never `useQueryClient`, so a shell drawn without a client
 * (a unit test) still draws; the server render and a first paint say false.
 */
export function useOfflinePaused(): boolean {
  const client = useContext(QueryClientContext);
  return useSyncExternalStore(
    (notify) => {
      const stopOnline = onlineManager.subscribe(notify);
      const stopCache = client?.getQueryCache().subscribe(notify);
      return () => {
        stopOnline();
        stopCache?.();
      };
    },
    () =>
      !onlineManager.isOnline() &&
      (client?.getQueryCache().findAll({ fetchStatus: "paused" }).length ?? 0) > 0,
    () => false,
  );
}
