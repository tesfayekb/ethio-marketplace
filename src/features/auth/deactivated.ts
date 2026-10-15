/**
 * Bundle 16 turn S3 (D189) — A DEACTIVATED ACCOUNT IS SIGNED OUT. Staff
 * deactivate an account with `admin_set_account_status`; every door refuses it
 * (`rate_gate`, `has_permission`, the routes' caller check). This is the
 * session's side: the signed-in session reads its own `account_status` at every
 * auth event (`useAuth`), signs out when it is deactivated, and the shell sends
 * the person to the sign-in page with the reason (`/auth?reason=deactivated`).
 * The hand-off from the sign-out to the shell's navigation goes through this
 * one-shot mark, so the shell's signed-out guard — which otherwise lands on the
 * marketplace — knows why the session ended. Best-effort storage: a browser
 * that refuses it still signs the person out, only without the reason.
 */

export const DEACTIVATED_MARK = "ethio.auth.deactivated";

/** Set right before the sign-out of a deactivated account. */
export function markDeactivatedSignOut(): void {
  try {
    window.sessionStorage.setItem(DEACTIVATED_MARK, "1");
  } catch {
    // Storage refused: the sign-out still happens; the reason is not carried.
  }
}

/** True once, for the sign-out the mark was set for; the mark is cleared. */
export function takeDeactivatedSignOut(): boolean {
  try {
    const held = window.sessionStorage.getItem(DEACTIVATED_MARK) !== null;
    if (held) window.sessionStorage.removeItem(DEACTIVATED_MARK);
    return held;
  } catch {
    return false;
  }
}

/** The door's own sentence for a deactivated caller (rate_gate, the staff doors, the routes). */
export function isDeactivatedRefusal(message: string | null | undefined): boolean {
  return typeof message === "string" && message.includes("account is deactivated");
}
