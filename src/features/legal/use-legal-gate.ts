import { useQuery, type QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

export type GateNavigate = (options: {
  to: "/legal/accept";
  search: { next: string };
  replace: true;
}) => unknown;

/**
 * Bundle 22 turn 3 — the acceptance at sign-in as a hard stop. A signed-in person with a document of
 * the gate's kinds to accept is sent to /legal/accept from every page the gate does not exempt. A failed
 * read sends nobody anywhere: the doors stay the authority (turn 4's server check).
 * Turn 4 (INC-769): called only by LegalGate, which the shell mounts only while a person is signed in;
 * gcTime 0 — the entry evaporates the moment its last observer unmounts (SO-4).
 * Turn 4 (INC-770): `pathname` and `search` come from ONE location (LegalGate reads both from the
 * router's state.location), so `next` never folds an earlier redirect's search into itself.
 * Turn 12: an open app reads again when its window regains focus once the answer is five minutes old,
 * so a version that comes into force while the app is open brings the screen at the person's return.
 */
export function useLegalGate({
  userId,
  pathname,
  search,
  navigate,
}: {
  userId: string;
  pathname: string;
  search: string;
  navigate: GateNavigate;
}) {
  const kinds = currentGateKinds();
  const status = useQuery({
    queryKey: legalStatusKey(userId, kinds),
    queryFn: () => myLegalStatus(kinds),
    staleTime: 5 * 60 * 1000,
    gcTime: 0,
    refetchOnWindowFocus: true,
    retry: false,
  });
  const failed = status.isError;
  useEffect(() => {
    if (failed) console.error("[client-error] legal gate read failed");
  }, [failed]);
  const pending = (status.data?.length ?? 0) > 0;
  useEffect(() => {
    if (!pending || gateExempt(pathname)) return;
    void navigate({ to: "/legal/accept", search: { next: `${pathname}${search}` }, replace: true });
  }, [pending, pathname, search, navigate]);
}

/**
 * Bundle 22 turn 32 (INC-823) — THE LANDING AFTER A SIGN-IN. Before the page asked for is shown, the gate's
 * status is read (under the gate's own query key) against a deadline: an owed acceptance lands on
 * /legal/accept?next=<href>; nothing owed, a failed read or the deadline lands on `href` — the doors stay the
 * authority and the gate's effect remains the in-app safety net. Every sign-in door lands through here.
 */
export async function landAfterSignIn(input: {
  navigate: (options: { href: string; replace?: boolean }) => unknown;
  href: string;
  replace?: boolean;
  client: QueryClient;
  deadlineMs?: number;
}): Promise<void> {
  const { navigate, href, replace, client, deadlineMs = 5000 } = input;
  const land = (target: string) =>
    void navigate(replace === undefined ? { href: target } : { href: target, replace });
  const { data } = await supabase.auth.getSession();
  const userId = data.session?.user?.id;
  if (!userId) return land(href);
  const kinds = currentGateKinds();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<"deadline">((resolve) => {
    timer = setTimeout(() => resolve("deadline"), deadlineMs);
  });
  try {
    const answer = await Promise.race([
      client.fetchQuery({
        queryKey: legalStatusKey(userId, kinds),
        queryFn: () => myLegalStatus(kinds),
        staleTime: 5 * 60 * 1000,
      }),
      deadline,
    ]);
    if (answer !== "deadline" && answer.length > 0)
      return land(`/legal/accept?next=${encodeURIComponent(href)}`);
  } catch {
    console.error("[client-error] legal landing read failed");
  } finally {
    clearTimeout(timer);
  }
  land(href);
}
