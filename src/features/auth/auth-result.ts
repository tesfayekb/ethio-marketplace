import { isEmailNotConfirmed, toErrorKey, type AuthErrorLike } from "./auth-error-key";
import type { AuthResult } from "./types";

/**
 * DEC-348 (F1-1, ruling 5) — THE ANSWERS THE AUTH ACTIONS SHARE, as a leaf: the service
 * (sign-up, passwords, identities) and the shell's sign-out (sign-out.ts) both import these
 * two, and neither imports the other's module.
 */

/** The answer of an action whose client did not load (INC-915). */
export const CLIENT_FAILED: { ok: false; errorKey: "common.loadFailed" } = {
  ok: false,
  // INC-911 — the words every on-demand failure uses: the page needs a refresh (src/lib/on-demand-failure.ts).
  errorKey: "common.loadFailed",
};

export function failure(error: AuthErrorLike): AuthResult {
  return {
    ok: false,
    errorKey: toErrorKey(error),
    emailNotConfirmed: isEmailNotConfirmed(error.message ?? "", error.code),
  };
}
