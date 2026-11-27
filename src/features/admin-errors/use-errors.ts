import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import type { ErrorKind } from "@/lib/error-clean";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  listErrorGroups,
  listErrorOccurrences,
  readErrorStats,
  type OccurrenceCursor,
} from "./errors-service";

/** Every key starts at AUTH_DERIVED_ROOT, so a sign-out removes the error reads with the session. */
export const ADMIN_ERRORS_KEY = [AUTH_DERIVED_ROOT, "admin", "errors"] as const;

/** A page of one group's reports. */
export const REPORTS_PAGE = 50;

export function useErrorStats(days: number) {
  return useQuery({
    queryKey: [...ADMIN_ERRORS_KEY, "stats", days],
    queryFn: () => readErrorStats(days),
    staleTime: 30_000,
  });
}

export function useErrorGroups(days: number, kind: ErrorKind | null) {
  return useQuery({
    queryKey: [...ADMIN_ERRORS_KEY, "groups", days, kind],
    queryFn: () => listErrorGroups({ days, kind }),
    staleTime: 30_000,
  });
}

/**
 * One group's reports, a keyset page at a time. The cursor stack is the positions of the pages
 * before this one: Next pushes the answer's `next`, Previous pops.
 */
export function useErrorOccurrences(group: string) {
  const [stack, setStack] = useState<OccurrenceCursor[]>([]);
  const after = stack.at(-1) ?? null;
  const query = useQuery({
    queryKey: [...ADMIN_ERRORS_KEY, "reports", group, after],
    queryFn: () => listErrorOccurrences({ group, after, limit: REPORTS_PAGE }),
    staleTime: 30_000,
  });
  const next = query.data?.next ?? null;
  return {
    query,
    hasPrevious: stack.length > 0,
    hasNext: next !== null,
    onNext: () => {
      if (next !== null) setStack((current) => [...current, next]);
    },
    onPrevious: () => setStack((current) => current.slice(0, -1)),
    onFirst: () => setStack([]),
  };
}
