import type { MessageKey } from "@/i18n";

/**
 * Bundle 11 turn C4 (D143, the operator, 2026-10-12) — A NEW PASSWORD IS TYPED
 * TWICE: on sign-up, on the reset page and in Settings › Change password. The
 * two must match before anything is sent; the server stays the authority on
 * the password's rules.
 */
export function passwordPairProblem(password: string, again: string): MessageKey | null {
  return password === again ? null : "auth.errorPasswordMismatch";
}
