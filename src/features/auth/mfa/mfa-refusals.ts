import type { RefusalFamily } from "@/lib/refusal";

/**
 * INC-1291 — the two-factor words own a small module with no client: the staff gate's code prompt
 * draws a refusal through them without carrying `mfa-service.ts` (and with it the database client).
 * `mfa-service.ts` re-exports it, so every other caller reads it as before.
 */
/**
 * DEC-339 wave 2 (INC-1147 class 1) — THE TWO-FACTOR PROVIDER'S WORDS, read by the one reader
 * (src/lib/refusal.ts): each refusal the callees of `mfa.enroll`, `mfa.challenge`, `mfa.verify`
 * and `mfa.unenroll` answer by its own `code` reads words of its own, and a code this table does
 * not name reads the generic line — never the words test the old mapper made on the message.
 * `invalidCode` and `noFactor` are this service's own reasons (a provider that worded a refusal
 * with no code; no factor to verify). The one sentence is the old words test, kept for the
 * providers that still answer a message only.
 */
export const MFA_REFUSALS: RefusalFamily = {
  words: {
    mfa_verification_failed: "mfa.errorInvalidCode",
    mfa_challenge_expired: "mfa.errorInvalidCode",
    invalidCode: "mfa.errorInvalidCode",
    noFactor: "mfa.errorNoFactor",
    over_request_rate_limit: "auth.errorRateLimited",
    mfa_factor_name_conflict: "mfa.errorSetupPending",
    too_many_enrolled_mfa_factors: "mfa.errorFactorExists",
    mfa_verified_factor_exists: "mfa.errorFactorExists",
    mfa_totp_enroll_not_enabled: "mfa.errorMethodOff",
    mfa_totp_verify_not_enabled: "mfa.errorMethodOff",
    // Cursor bundle 4 (INC-1147, class 2): the clear of an unfinished setup that did not go through.
    clearFailed: "mfa.errorClearFailed",
  },
  sentences: [[/invalid|expired|code/i, "mfa.errorInvalidCode"]],
  generic: "mfa.errorGeneric",
};
