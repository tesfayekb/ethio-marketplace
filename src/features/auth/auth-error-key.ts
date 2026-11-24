import type { MessageKey } from "@/i18n";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";

import type { AuthResult } from "./types";

/**
 * The provider's error as the mapper reads it. `reasons` is the auth client's
 * `AuthWeakPasswordError.reasons` (values "length", "characters", "pwned");
 * other errors carry none.
 */
export type AuthErrorLike = {
  message: string;
  code?: string;
  status?: number;
  reasons?: readonly string[];
};

export function isEmailNotConfirmed(message: string, code?: string): boolean {
  return code === "email_not_confirmed" || /email not confirmed/i.test(message);
}

/** A weak-password refusal whose only reason is the leaked-password check. */
function onlyLeaked(error: AuthErrorLike): boolean {
  const reasons = error.reasons ?? [];
  return (
    error.code === "weak_password" && reasons.length > 0 && reasons.every((r) => r === "pwned")
  );
}

/**
 * Bundle 22 turn 32 (INC-822) — the auth server's own words for a mail it could not send, quoted verbatim
 * from supabase/auth internal/api/mail.go (:346/:350/:354 confirmation, :424/:429/:433 recovery,
 * :509/:513/:517 magic link); no wildcard broader than those messages.
 */
const MAIL_SEND_FAILED = /^Error sending (confirmation email|recovery email|magic link email)$/i;

/** The word the reader is handed for a leaked-password refusal (`reasons` all `pwned`). */
const LEAKED_PASSWORD = "leakedPassword";
const MAIL_NOT_AUTHORIZED = "email_address_not_authorized";
/**
 * Bundle 16 turn S2 (D185) — the sign-up hook's refusal of a throwaway mail domain
 * (`hook_before_user_created`) names itself in its message; the provider's code beside it (the
 * generic `validation_failed` among them) is not its own. Read as its own word first, so that a code
 * the family names (INC-1275) never hides it.
 */
const DISPOSABLE_EMAIL = "disposableEmail";
const RATE_LIMITED = "over_request_rate_limit";

/**
 * DEC-339 wave 2 (INC-1147) — THE AUTH PROVIDER'S WORDS, read by the one reader (src/lib/refusal.ts,
 * dialect 7: the provider's own error `code`, by the family's words). The `sentences` are the
 * provider's English for the errors that carry no code, in the order the mapper always read them
 * (the first match wins). Raw errors never reach the UI.
 */
export const AUTH_REFUSALS: RefusalFamily = {
  words: {
    email_not_confirmed: "auth.errorEmailNotConfirmed",
    invalid_credentials: "auth.errorInvalidCredentials",
    user_already_exists: "auth.errorEmailInUse",
    single_identity_not_deletable: "auth.errorLastMethod",
    weak_password: "auth.errorWeakPassword",
    [LEAKED_PASSWORD]: "auth.errorLeakedPassword",
    [MAIL_NOT_AUTHORIZED]: "auth.errorMailSend",
    [DISPOSABLE_EMAIL]: "auth.errorDisposableEmail",
    validation_failed: "auth.errorInvalidEmail",
    [RATE_LIMITED]: "auth.errorRateLimited",
    over_email_send_rate_limit: "auth.errorRateLimited",
    // INC-1267 / DEC-435 — the server's own refusals of a password change, each with its word:
    // the current password it asks for (missing or wrong), the same password again, and a session
    // older than the hosted "Secure password change" window. `manual_linking_disabled` has no word:
    // no caller reaches it once no screen links or unlinks a sign-in method.
    current_password_invalid: "auth.errorWrongCurrentPassword",
    current_password_required: "auth.errorWrongCurrentPassword",
    same_password: "auth.errorSamePassword",
    reauthentication_needed: "auth.errorReauthNeeded",
  },
  sentences: [
    [/email not confirmed/i, "auth.errorEmailNotConfirmed"],
    [/invalid login credentials/i, "auth.errorInvalidCredentials"],
    [/already registered/i, "auth.errorEmailInUse"],
    [/at least 1 identity/i, "auth.errorLastMethod"],
    [/password should be/i, "auth.errorWeakPassword"],
    [/invalid email|email address/i, "auth.errorInvalidEmail"],
    [/rate limit/i, "auth.errorRateLimited"],
  ],
  generic: "auth.errorGeneric",
};

/**
 * What the reader is handed: the reads a family's table cannot say come first — the leaked
 * reason, the throwaway mail domain's own refusal, and (INC-822, read before the generic e-mail check: the refused address's message names
 * "Email address") the mail the server could not send or the address it refuses — then the code
 * the table names, else the error itself (its message by the sentences, then its code).
 */
function heardOf(error: AuthErrorLike): unknown {
  if (onlyLeaked(error)) return LEAKED_PASSWORD;
  if ((error.message ?? "").includes(DISPOSABLE_EMAIL)) return DISPOSABLE_EMAIL;
  if (
    error.code === MAIL_NOT_AUTHORIZED ||
    (error.status === 500 && MAIL_SEND_FAILED.test(error.message ?? ""))
  )
    return MAIL_NOT_AUTHORIZED;
  return error;
}

/** Map a Supabase auth error onto a translation key, through the one reader. */
export function toErrorKey(error: AuthErrorLike): MessageKey {
  const read = readRefusal(heardOf(error), AUTH_REFUSALS);
  // A 429 whose words nothing above names is still a rate refusal.
  if (read.branch === "generic" && error.status === 429) return "auth.errorRateLimited";
  return read.key;
}

/** An auth action's failure as the answer every action shares (the service's own import). */
export function failure(error: AuthErrorLike): Extract<AuthResult, { ok: false }> {
  return {
    ok: false,
    errorKey: toErrorKey(error),
    emailNotConfirmed: isEmailNotConfirmed(error.message ?? "", error.code),
  };
}
