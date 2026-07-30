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
