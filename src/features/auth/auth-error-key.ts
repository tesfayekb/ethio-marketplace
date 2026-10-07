import type { MessageKey } from "@/i18n";

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

/** Map a Supabase auth error onto a translation key. Raw errors never reach the UI. */
export function toErrorKey(error: AuthErrorLike): MessageKey {
  const message = error.message ?? "";
  const code = error.code;

  if (isEmailNotConfirmed(message, code)) return "auth.errorEmailNotConfirmed";
  if (code === "invalid_credentials" || /invalid login credentials/i.test(message)) {
    return "auth.errorInvalidCredentials";
  }
  if (code === "user_already_exists" || /already registered/i.test(message)) {
    return "auth.errorEmailInUse";
  }
  if (code === "single_identity_not_deletable" || /at least 1 identity/i.test(message)) {
    return "auth.errorLastMethod";
  }
  if (code === "weak_password" || /password should be/i.test(message)) {
    return onlyLeaked(error) ? "auth.errorLeakedPassword" : "auth.errorWeakPassword";
  }

  if (code === "validation_failed" || /invalid email|email address/i.test(message)) {
    return "auth.errorInvalidEmail";
  }
  if (error.status === 429 || /rate limit/i.test(message)) return "auth.errorRateLimited";
  return "auth.errorGeneric";
}
