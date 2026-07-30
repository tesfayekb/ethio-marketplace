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
 * Two facts are kept apart on purpose:
 *   - verification succeeded (the account is now confirmed)
 *   - a session was established in THIS browser
 * The first can be true while the second is false (link opened elsewhere).
 * We only report failure when the URL carries a genuine error param and no
 * session can be obtained. "No session yet" alone is never treated as a bad
 * link (law F4, inverted: a real success must never render as an error).
 *
 * Shapes handled:
 *   - implicit: `#access_token=...&refresh_token=`  → detectSessionInUrl / setSession
 *   - OTP link: `?token_hash=...&type=...`          → verifyOtp
 *   - legacy PKCE: `?code=...`                      → exchangeCodeForSession (best effort)
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

  // 1. detectSessionInUrl may already have consumed the hash tokens.
  let session = (await supabase.auth.getSession()).data.session;
  if (session) return { ok: true };

  // 2. Explicit hash-token handling when the SDK did not pick them up.
  if (!session && accessToken && refreshToken) {
    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    session = (await supabase.auth.getSession()).data.session;
    if (session) return { ok: true };
  }

  // 3. OTP link fallback: a clean verifyOtp IS verification success, even if
  //    the session read below were to lag behind.
  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: type as EmailOtpType,
    });
    if (!error) return { ok: true };
  }

  // 4. Legacy PKCE links (best effort; fails without a local code_verifier).
  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  session = (await supabase.auth.getSession()).data.session;
  if (session) return { ok: true };

  return { ok: false, hadError: hasErrorParam };
}
