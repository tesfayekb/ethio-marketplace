/**
 * DEC-372 (INC-1116) — WHO RUNS THE ACTIVE-IMPERSONATION CHECK. Only a super admin can hold a
 * view-as session, so only staff (the admin-panel permission, which the shell reads — the RBAC seam
 * stays in app-shell.tsx, scripts/check-browse-imports.sh) load and run the check and its banner. A
 * member's page makes no call to the active-session door and downloads none of its code.
 *
 * Off while the permission read is loading; on when it settles for staff; on when it FAILED — a
 * read that failed is treated as staff, so a session is never hidden by an outage (fail toward
 * showing). Off for a signed-out visitor and from the moment a sign-out starts.
 */
export type ImpersonationGateState = {
  signedIn: boolean;
  signingOut: boolean;
  /** The permission read is in flight: nothing is decided yet. */
  loading: boolean;
  /** The permission read failed. */
  failed: boolean;
  /** The settled permissions hold the admin-panel permission. */
  staff: boolean;
};

export function impersonationCheckOn(state: ImpersonationGateState): boolean {
  if (!state.signedIn || state.signingOut || state.loading) return false;
  return state.failed || state.staff;
}
