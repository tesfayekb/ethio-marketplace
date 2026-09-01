import { createClient, type EmailOtpType, type UserIdentity } from "@supabase/supabase-js";

import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";
import type { MessageKey } from "@/i18n";

import type {
  AuthResult,
  Credentials,
  IdentitiesResult,
  PasswordStateResult,
  VerificationResult,
} from "./types";

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
  if (code === "single_identity_not_deletable" || /at least 1 identity/i.test(message)) {
    return "auth.errorLastMethod";
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
 * Ends every OTHER session for this user; this browser stays signed in.
 * Server-side revocation — the only authority (law F3).
 */
export async function signOutOtherDevices(): Promise<AuthResult> {
  const { error } = await supabase.auth.signOut({ scope: "others" });
  if (error) return failure(error);
  return { ok: true };
}

/** Linked sign-in methods, flattened. Read-only. */
export async function getIdentities(): Promise<IdentitiesResult> {
  const { data, error } = await supabase.auth.getUserIdentities();
  if (error || !data) return { ok: false, errorKey: toErrorKey(error ?? { message: "" }) };
  return {
    ok: true,
    identities: data.identities.map((identity) => ({
      identityId: identity.identity_id,
      provider: identity.provider,
      lastUsedAt: identity.last_sign_in_at ?? null,
    })),
  };
}

/**
 * Adds Google as a second sign-in method for the CURRENT user. Same minimal
 * scopes and same return target as the sign-in door — one source of truth.
 */
export async function linkGoogleIdentity(): Promise<AuthResult> {
  const { error } = await supabase.auth.linkIdentity({
    provider: "google",
    options: { redirectTo: emailRedirectUrl(), scopes: "email profile openid" },
  });
  if (error) return failure(error);
  return { ok: true };
}

/**
 * Removes a sign-in method. GoTrue refuses to delete the last identity
 * (`single_identity_not_deletable`); that server refusal is the real guard and
 * is surfaced through `auth.errorLastMethod`.
 */
export async function unlinkProviderIdentity(identityId: string): Promise<AuthResult> {
  const { data, error: readError } = await supabase.auth.getUserIdentities();
  if (readError || !data) return failure(readError ?? { message: "" });

  const identity = data.identities.find((item) => item.identity_id === identityId);
  if (!identity) return { ok: false, errorKey: "auth.errorGeneric" };

  const { error } = await supabase.auth.unlinkIdentity(identity as UserIdentity);
  if (error) return failure(error);
  return { ok: true };
}

/**
 * Current-password verification mechanism.
 *
 * "Secure password change" (enabled in P1-c) makes GoTrue require a
 * reauthentication NONCE only when the session is older than 24h — it never
 * accepts a current password. We therefore verify the current password
 * ourselves, on a THROWAWAY client that persists nothing: a wrong password
 * fails there and `updateUser` is never reached, so nothing changes. The
 * throwaway client cannot disturb the signed-in session in this browser.
 */
export async function changePassword(
  currentPassword: string,
  newPassword: string,
): Promise<AuthResult> {
  const { data: userData } = await supabase.auth.getUser();
  const email = userData.user?.email;
  if (!email) return { ok: false, errorKey: "auth.errorGeneric" };

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  if (!url || !key) return { ok: false, errorKey: "auth.errorGeneric" };

  const verifier = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { error: verifyError } = await verifier.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  await verifier.auth.signOut({ scope: "local" });
  if (verifyError) return { ok: false, errorKey: "auth.errorWrongCurrentPassword" };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return failure(error);
  // U0k session hardening (c): a credential change invalidates every OTHER
  // device's session. Best-effort — the password IS already changed, so a
  // failure here is reported to the console, never surfaced as a failed change.
  const { error: othersError } = await supabase.auth.signOut({ scope: "others" });
  if (othersError) console.warn("[auth] sign-out of other devices failed", othersError.message);
  return { ok: true };
}

/**
 * Starts an email change. GoTrue's double confirmation is server-enforced:
 * links go to BOTH the old and the new address, and neither address changes
 * until both are opened.
 */
export async function changeEmail(newEmail: string): Promise<AuthResult> {
  const { error } = await supabase.auth.updateUser(
    { email: newEmail },
    { emailRedirectTo: emailRedirectUrl() },
  );
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

/* ==================================================================
 * P1-g — password as a first-class sign-in method (truth model, R2).
 *
 * INC-024 established that a password and an 'email' identity row can drift
 * apart. Rather than hide the drift, the surface RENDERS it: `hasPassword()`
 * answers "can this account be entered with a password?" independently of the
 * identity list, and `removeOwnPassword()` gives the owner the second remove
 * direction (the AFTER DELETE trigger covers the identity-unlink direction).
 * Both are SECURITY DEFINER functions scoped to auth.uid() — the server is the
 * authority (law F3); the disabled controls in the UI are honesty only.
 * ================================================================== */

/** Does the CURRENT user have a usable password? Server-answered. */
export async function hasPassword(): Promise<PasswordStateResult> {
  const { data, error } = await supabase.rpc("has_password");
  if (error) return { ok: false, errorKey: toErrorKey(error) };
  return { ok: true, hasPassword: Boolean(data) };
}

/**
 * Removes the CURRENT user's password. The server refuses when no non-email
 * identity remains; that refusal is surfaced as `auth.errorLastMethod`.
 */
export async function removeOwnPassword(): Promise<AuthResult> {
  const { error } = await supabase.rpc("remove_own_password");
  if (!error) return { ok: true };
  if (/last sign-in method/i.test(error.message ?? "")) {
    return { ok: false, errorKey: "auth.errorLastMethod" };
  }
  return failure(error);
}

/** Where Supabase sends the user after they click a password-reset link. */
export function resetRedirectUrl(): string {
  return `${window.location.origin}/auth/reset`;
}

/**
 * Requests a password-reset email.
 *
 * NEUTRAL-ALWAYS (ruling R4, B-3 enumeration guard): the caller learns nothing
 * about whether the address exists, so this resolves `ok` whatever GoTrue
 * answers. This is not a phantom success (law F4): the promise made to the user
 * is the neutral one — "if an account exists, a link is on its way" — and that
 * statement is true in every branch. Real failures are still logged for
 * operators; only the enumeration signal is withheld.
 */
export async function requestPasswordReset(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: resetRedirectUrl(),
    captchaToken: getCaptchaToken(),
  });
  if (error) {
    console.warn("[auth] password reset request did not send", error.code ?? error.message);
  }
  return { ok: true };
}

/**
 * Finishes a reset: sets the new password on the RECOVERY session that the
 * link established. Without such a session GoTrue refuses, and that refusal is
 * surfaced — never swallowed.
 */
export async function completePasswordReset(newPassword: string): Promise<AuthResult> {
  const session = (await supabase.auth.getSession()).data.session;
  if (!session) return { ok: false, errorKey: "auth.errorResetLinkInvalid" };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return failure(error);
  // U0k session hardening (c): finishing a recovery also ends every other
  // device's session (the recovery may itself be an account takeover recovery).
  const { error: othersError } = await supabase.auth.signOut({ scope: "others" });
  if (othersError) console.warn("[auth] sign-out of other devices failed", othersError.message);
  return { ok: true };
}
