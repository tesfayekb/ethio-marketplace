import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { isE2E } from "@/lib/env-flags";
import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";
import { gateExempt, gateKinds } from "./legal-kinds";
import { myLegalStatus } from "./legal-reader";

declare global {
  interface Window {
    __ethioLegalKinds?: unknown;
  }
}

/** The kinds the gate asks for: terms and privacy; the E2E build alone may add scratch kinds (DEC-018). */
export function currentGateKinds(): string[] {
  return gateKinds(isE2E && typeof window !== "undefined" ? window.__ethioLegalKinds : undefined);
}
export function legalStatusKey(userId: string, kinds: string[]) {
  return [AUTH_DERIVED_ROOT, "legal", "status", userId, kinds] as const;
}

type GateNavigate = (options: {
  to: "/legal/accept";
  search: { next: string };
  replace: true;
}) => unknown;

/**
 * Bundle 22 turn 3 — the acceptance at sign-in as a hard stop. A signed-in person with a document of
 * the gate's kinds to accept is sent to /legal/accept from every page the gate does not exempt. A failed
 * read sends nobody anywhere: the doors stay the authority (turn 4's server check).
 */
export function useLegalGate({
  user,
  signingOut,
  pathname,
  search,
  navigate,
}: {
  user: { id: string } | null;
  signingOut: boolean;
  pathname: string;
  search: string;
  navigate: GateNavigate;
}) {
  const active = user !== null && !signingOut;
  const kinds = currentGateKinds();
  const status = useQuery({
    queryKey: legalStatusKey(user?.id ?? "", kinds),
    queryFn: () => myLegalStatus(kinds),
    enabled: active,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: false,
  });
  const failed = status.isError;
  useEffect(() => {
    if (active && failed) console.error("[client-error] legal gate read failed");
  }, [active, failed]);
  const pending = active && (status.data?.length ?? 0) > 0;
  useEffect(() => {
    if (!pending || gateExempt(pathname)) return;
    void navigate({ to: "/legal/accept", search: { next: `${pathname}${search}` }, replace: true });
  }, [pending, pathname, search, navigate]);
}
