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

/**
 * DEC-010 Turnstile SEAM — structure only, no CAPTCHA today.
 *
 * Cloudflare Turnstile is enabled at launch; staging will use Cloudflare's
 * always-pass test keys. Until then this returns undefined, which Supabase
 * treats as "no captcha token supplied". No widget, no dependency, no network
 * call is introduced by this helper.
 */
export function getCaptchaToken(): string | undefined {
  return undefined;
}

export async function signUp({ email, password }: Credentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { emailRedirectTo: emailRedirectUrl(), captchaToken: getCaptchaToken() },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function signInWithPassword({ email, password }: Credentials): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken: getCaptchaToken() },
  });
  if (error) return failure(error);
  return { ok: true };
}

/**
 * Google door (P1-d). Scopes are passed explicitly so the request is
 * self-documenting even though the provider is configured server-side; they
 * stay minimal (email, profile, openid) — nothing else is ever requested.
 * The redirect target reuses the email door's helper: one source of truth.
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: emailRedirectUrl(),
      scopes: "email profile openid",
    },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function resendConfirmation(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: emailRedirectUrl(), captchaToken: getCaptchaToken() },
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
 * True when a session exists for THIS browser, rehydrating from storage first
 * if the in-memory client is stale.
 *
 * iOS Safari suspends background tabs, so a tab sitting on the check-email view
 * misses the cross-tab storage event written by the confirmation tab; its
 * `getSession()` then keeps answering null from client memory even though
 * localStorage already holds a valid session. Reading the auth storage key
 * directly and calling `setSession` rehydrates this tab (INC-005 final).
 */
export async function hasSessionRehydrating(): Promise<boolean> {
  if (typeof window === "undefined") return false;

  const direct = (await supabase.auth.getSession()).data.session;
  if (direct) return true;

  const projectRef = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.match(
    /https?:\/\/([^.]+)\./,
  )?.[1];
  if (!projectRef) return false;

  let stored: unknown;
  try {
    const raw = window.localStorage.getItem(`sb-${projectRef}-auth-token`);
    if (!raw) return false;
    stored = JSON.parse(raw);
  } catch {
    return false;
  }

  const tokens = stored as { access_token?: string; refresh_token?: string } | null;
  if (!tokens?.access_token || !tokens?.refresh_token) return false;

  await supabase.auth.setSession({
    access_token: tokens.access_token,
    refresh_token: tokens.refresh_token,
  });
  return Boolean((await supabase.auth.getSession()).data.session);
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
