import { AUTH_DERIVED_ROOT } from "@/lib/query-keys";

/** Bundle 22 turn 4 — what the block reports to its screen (Parts C, D, E). */
export type CertifyState = {
  state: "loading" | "none" | "ready" | "error";
  versionIds: string[];
  ticked: boolean;
  acceptancePending: boolean;
};

/** Before the first answer: the action waits. */
export const CERTIFY_LOADING: CertifyState = {
  state: "loading",
  versionIds: [],
  ticked: false,
  acceptancePending: false,
};

/** The screen's action is allowed: nothing applies, or the statements are ticked. */
export function certifyAllows(value: CertifyState): boolean {
  return value.state === "none" || (value.state === "ready" && value.ticked);
}

/** The certification a door call carries: only when statements apply. */
export function certifyArgs(
  value: CertifyState,
  language: string,
): { certified: string[]; language: string } | undefined {
  return value.state === "ready" ? { certified: value.versionIds, language } : undefined;
}

export function certifyKey(listingId: string) {
  return [AUTH_DERIVED_ROOT, "legal", "certify", listingId] as const;
}

/** The mounted blocks; refreshCertify reaches each (a certificationRequired refusal). */
export const refreshers = new Set<() => void>();

/** Re-reads the statements and clears the tick, with the "statement changed" sentence under the block. */
export function refreshCertify(): void {
  for (const refresh of refreshers) refresh();
}

type AcceptNavigate = (options: {
  to: "/legal/accept";
  search: { next: string };
  replace: true;
}) => unknown;

/**
 * Bundle 22 turn 4 — a seller door's legal refusal. "acceptanceRequired" sends the seller to the acceptance
 * screen with next = the current path and search (both from one location); "certificationRequired" re-reads
 * the statements and clears the tick (the block says the statement changed). Returns false for any other
 * reason: the screen's own error handling takes it.
 */
export function certifyRefusal(
  reason: string,
  navigate: AcceptNavigate,
  location: { pathname: string; search: string } = window.location,
): boolean {
  if (reason === "acceptanceRequired") {
    void navigate({
      to: "/legal/accept",
      search: { next: `${location.pathname}${location.search}` },
      replace: true,
    });
    return true;
  }
  if (reason === "certificationRequired") {
    refreshCertify();
    return true;
  }
  return false;
}
