import type { SessionTier } from "@/features/session/session-policy";

/**
 * U0k, INC-1358 — WHICH SESSION LIMITS A SESSION TAKES. Fail-safe tiering: the STRICT (staff)
 * limits apply until the permission read has proven the person is not staff, never the lenient
 * ones. That holds while the read is loading and when it FAILED with no grant held: a failed read
 * proves nothing, so it is treated as staff. A read that failed while grants are held keeps its
 * answer (the held grants decide), and a settled read decides by the admin-panel permission.
 *
 * Plain booleans on purpose: the RBAC seam stays in app-shell.tsx (scripts/check-browse-imports.sh).
 */
export type SessionTierState = {
  /** The permission read is in flight: nothing is decided yet. */
  loading: boolean;
  /** The permission read failed. */
  failed: boolean;
  /** The read holds at least one grant. */
  held: boolean;
  /** The held permissions include the admin-panel permission. */
  staff: boolean;
};

export function sessionTierFor(state: SessionTierState): SessionTier {
  if (state.loading || state.staff) return "staff";
  return state.failed && !state.held ? "staff" : "regular";
}
