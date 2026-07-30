import type { EmailOtpType } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import type { MessageKey } from "@/i18n";

import type { AuthResult, Credentials, VerificationResult } from "./types";

/** Where Supabase sends the user after they click the confirmation link. */
export function emailRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`;
}

function isEmailNotConfirmed(message: string, code?: string): boolean {
  return code === "email_not_confirmed" || /email not confirmed/i.test(message);
}

/** Map a Supabase auth error onto a translation key. Raw errors never reach the UI. */
function toErrorKey(error: { message: string; code?: string; status?: number }): MessageKey {
  const message = error.message ?? "";
  const code = error.code;

  if (isEmailNotConfirmed(message, code)) return "auth.errorEmailNotConfirmed";
  if (code === "invalid_credentials" || /invalid login credentials/i.test(message)) {
    return "auth.errorInvalidCredentials";
  }
  if (code === "user_already_exists" || /already registered/i.test(message)) {
    return "auth.errorEmailInUse";
  }
  if (code === "weak_password" || /password should be/i.test(message)) {
    return "auth.errorWeakPassword";
  }
  if (code === "validation_failed" || /invalid email|email address/i.test(message)) {
    return "auth.errorInvalidEmail";
  }
  if (error.status === 429 || /rate limit/i.test(message)) return "auth.errorRateLimited";
  return "auth.errorGeneric";
}

function failure(error: { message: string; code?: string; status?: number }): AuthResult {
  return {
    ok: false,
    errorKey: toErrorKey(error),
    emailNotConfirmed: isEmailNotConfirmed(error.message ?? "", error.code),
  };
}

export async function signUp({ email, password }: Credentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: emailRedirectUrl() },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function signInWithPassword({ email, password }: Credentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return failure(error);
  return { ok: true };
}

export async function resendConfirmation(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: emailRedirectUrl() },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function signOut(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut();
  if (error) return failure(error);
  return { ok: true };
}

/**
 * Finish an email-verification landing at /auth/callback.
 *
 * Supabase can hand the session back in three shapes, so we handle all of them
 * and only declare failure when no session exists afterwards (law F4, inverted:
 * a real success must never render as an error):
 *   - PKCE:     `?code=...`                         → exchangeCodeForSession
 *   - implicit: `#access_token=...&refresh_token=`  → setSession
 *   - OTP link: `?token_hash=...&type=...`          → verifyOtp
 * Errors arrive as `?error=`/`#error=` (with `error_code`/`error_description`).
 */
export async function completeEmailVerification(): Promise<VerificationResult> {
  const url = new URL(window.location.href);
  const hash = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : "");
  const hasErrorParam = Boolean(
    url.searchParams.get("error") ||
    url.searchParams.get("error_code") ||
    hash.get("error") ||
    hash.get("error_code"),
  );

  const code = url.searchParams.get("code");
  const accessToken = hash.get("access_token");
  const refreshToken = hash.get("refresh_token");
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") ?? hash.get("type");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  } else if (accessToken && refreshToken) {
    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
  } else if (tokenHash && type) {
    await supabase.auth.verifyOtp({ token_hash: tokenHash, type: type as EmailOtpType });
  }

  // Re-check before concluding anything: detectSessionInUrl may already have
  // established the session on its own.
  const { data } = await supabase.auth.getSession();
  if (data.session) return { ok: true };
  return { ok: false, hadError: hasErrorParam };
}
