import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

import {
  beginImpersonation,
  endImpersonation,
  getActiveImpersonation,
  getImpersonatedProfile,
  listImpersonatedListings,
} from "./impersonation-service";

export const IMPERSONATION_KEY = [AUTH_DERIVED_ROOT, "impersonation"] as const;

/**
 * The active-session probe behind the global banner: polled every 30s AND
 * re-read on every route change, so the banner clears on expiry without a
 * reload (IMP-4).
 */
export function useActiveImpersonation(enabled: boolean) {
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  const query = useQuery({
    queryKey: [...IMPERSONATION_KEY, "active"],
    queryFn: getActiveImpersonation,
    enabled,
    refetchInterval: 30_000,
    staleTime: 10_000,
  });

  useEffect(() => {
    if (!enabled) return;
    void queryClient.invalidateQueries({ queryKey: [...IMPERSONATION_KEY, "active"] });
  }, [pathname, enabled, queryClient]);

  return query;
}

export function useBeginImpersonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: { targetId: string; reason: string }) => beginImpersonation(input),
    onSettled: () => queryClient.invalidateQueries({ queryKey: IMPERSONATION_KEY }),
  });
}

export function useEndImpersonation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sessionId: string) => endImpersonation(sessionId),
    onSettled: () => queryClient.invalidateQueries({ queryKey: IMPERSONATION_KEY }),
  });
}

export function useImpersonatedProfile(sessionId: string) {
  return useQuery({
    queryKey: [...IMPERSONATION_KEY, "profile", sessionId],
    queryFn: () => getImpersonatedProfile(sessionId),
    retry: false,
  });
}

export function useImpersonatedListings(sessionId: string) {
  return useQuery({
    queryKey: [...IMPERSONATION_KEY, "listings", sessionId],
    queryFn: () => listImpersonatedListings(sessionId),
    retry: false,
  });
}

/** mm:ss remaining until `expiresAt`, or null once the box has closed. */
export function useCountdown(expiresAt: string | null | undefined): string | null {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!expiresAt) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [expiresAt]);

  if (!expiresAt) return null;
  const left = Math.floor((new Date(expiresAt).getTime() - now) / 1000);
  if (left <= 0) return null;
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}
