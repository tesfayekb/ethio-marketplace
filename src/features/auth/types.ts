import type { MessageKey } from "@/i18n";

/** Which form the combined auth screen is currently showing. */
export type AuthMode = "signIn" | "signUp";

/** Credentials shared by sign-in and sign-up. */
export type Credentials = {
  email: string;
  password: string;
};

/**
 * Every auth call resolves to this shape. Failures carry a translation key —
 * never a raw Supabase error object (law F4: no phantom success, no raw errors).
 */
export type AuthResult =
  | { ok: true }
  | { ok: false; errorKey: MessageKey; emailNotConfirmed?: boolean };

/** Session view used by the UI layer. */
export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

/**
 * Outcome of processing an email-verification landing URL.
 * `hadError` marks a genuine `error`/`error_code` param, as opposed to
 * simply arriving with no recoverable link data.
 */
export type VerificationResult = { ok: true } | { ok: false; hadError: boolean };

/**
 * One linked sign-in method, flattened for the settings surface.
 * `lastUsedAt` is GoTrue's `identities[].last_sign_in_at` (may be absent).
 */
export type IdentitySummary = {
  identityId: string;
  provider: string;
  lastUsedAt: string | null;
};

/** Result of a read that returns data, with the same never-raw-error contract. */
export type IdentitiesResult =
  | { ok: true; identities: IdentitySummary[] }
  | { ok: false; errorKey: MessageKey };

/**
 * P1-g truth model (R2): whether the current account can be entered with a
 * password, answered by the server (`public.has_password()`), independently of
 * whether an 'email' identity row exists.
 */
export type PasswordStateResult =
  | { ok: true; hasPassword: boolean }
  | { ok: false; errorKey: MessageKey };
