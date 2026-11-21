/**
 * DEC-348 (F1-1, ruling 5) — THE ANSWER THE AUTH ACTIONS SHARE, as a leaf: the service
 * (sign-up, passwords, identities) and the shell's sign-out (sign-out.ts) both import it, and
 * neither imports the other's module. The failure mapper (`failure`, auth-error-key.ts) is
 * the service's own: the shell's sign-out reads only `ok` (DEC-268), so it never carries the
 * mapper or the reader it stands on (INC-1153).
 */

/** The answer of an action whose client did not load (INC-915). */
export const CLIENT_FAILED: { ok: false; errorKey: "common.loadFailed" } = {
  ok: false,
  // INC-911 — the words every on-demand failure uses: the page needs a refresh (src/lib/on-demand-failure.ts).
  errorKey: "common.loadFailed",
};
