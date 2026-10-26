import type { EmailOtpType, UserIdentity } from "@supabase/supabase-js";

import type { Database } from "@/integrations/supabase/types";
import { clearSessionClocks } from "@/features/session/session-policy";
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";
import { safeReturnPath } from "@/lib/return-path";
import {
  currentSession,
  forgetStoredSession,
  getSupabase,
  storedSessionKey,
} from "@/lib/supabase-door";

import { isEmailNotConfirmed, toErrorKey, type AuthErrorLike } from "./auth-error-key";

import type {
  AuthResult,
  Credentials,
  IdentitiesResult,
  PasswordStateResult,
  VerificationResult,
} from "./types";

/** DEC-261 — supabase-js itself, for the current-password verifier only; fetched once on demand. */
const supabaseJs = loadOnce(() => import("@supabase/supabase-js"));

type Client = Awaited<ReturnType<typeof getSupabase>>;

/** The answer of an action whose client did not load (INC-915). */
const CLIENT_FAILED: { ok: false; errorKey: "auth.errorGeneric" } = {
  ok: false,
  errorKey: "auth.errorGeneric",
};

/**
 * INC-915 (Foundations turn 34, ruling 2) — THE ONE PLACE THIS FILE ASKS THE DOOR FOR THE
 * CLIENT. A failed download is a failed action: logged here, answered as null, and each
 * action returns its own failure answer — never a rejection that leaves a screen busy.
 */
async function authClient(): Promise<Client | null> {
  try {
    return await getSupabase();
  } catch (error) {
    console.error("[client-error] the sign-in code did not load:", errorText(error));
    return null;
  }
}

/** Where Supabase sends the user after they click the confirmation link. */
export function emailRedirectUrl(): string {
  return `${window.location.origin}/auth/callback`;
}

/**
 * INC-224 — WHERE THE GOOGLE DOOR COMES BACK TO, AND HOW THE RETURN TRAVELS.
 *
 * The return path rides in the OAuth `redirectTo` URL's own query string — NOT
 * in a cookie: `redirectTo` is the one value the provider hands back untouched,
 * it is validated against Supabase's allow-list as an origin, and a cookie would
 * have to survive a cross-site POST back to the callback (SameSite=Lax drops
 * exactly that). The callback re-validates the parameter with the SAME shared
 * rule before it navigates, so a tampered `return` is still only ever `/`.
 */
export function oauthRedirectUrl(returnPath?: string): string {
  const base = emailRedirectUrl();
  const safe = safeReturnPath(returnPath);
  return safe === "/" ? base : `${base}?return=${encodeURIComponent(safe)}`;
}

function failure(error: AuthErrorLike): AuthResult {
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

/**
 * Bundle 22 turn 32 (D230) — `legalAccept`: the sign-up form's tick, sent as metadata in the signup
 * trigger's shape (M21); the trigger records only versions in force of the gate's kinds.
 */
export async function signUp(
  { email, password }: Credentials,
  legalAccept?: { versionIds: string[]; language: string },
): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: emailRedirectUrl(),
      captchaToken: getCaptchaToken(),
      ...(legalAccept
        ? {
            data: {
              legal_accept: {
                version_ids: legalAccept.versionIds,
                language: legalAccept.language,
                adult: true,
                data_consent: false,
              },
            },
          }
        : {}),
    },
  });
  if (error) return failure(error);
  return { ok: true };
}

/**
 * INC-266 / DEC-076 — THE EXPIRED PRIOR SESSION, AND THE COMMIT BEFORE THE
 * REDIRECT.
 *
 * REPRODUCTION: a tab idle ~12 h, then Sign in with correct credentials →
 * the marketplace with NO session and NO error; a second identical sign-in
 * works.
 *
 * CAUSE (the two decisive lines).
 *   1 `src/routes/auth.tsx` mount effect → `hasSessionRehydrating()`: the
 *     12-h-old persisted token is handed to `setSession`, which starts a
 *     refresh of an access token that is already expired and whose refresh
 *     token GoTrue may have retired. That request is IN FLIGHT while the
 *     operator types their password.
 *   2 `src/routes/auth.tsx` sign-in handler → `void navigate({ to: afterSignIn })`
 *     the instant the password grant resolves, with nothing establishing that
 *     the new session has been written to storage.
 *   When the stale refresh loses the race it does not merely fail: auth-js
 *   answers a retired refresh token by REMOVING the persisted session — the
 *   session it removes is the brand-new one the password grant had just
 *   written. No error is raised, because nothing failed from the form's point
 *   of view. The second attempt succeeds because the stale token is gone.
 *   The same removal, arriving on a live tab whose hourly refresh hit a
 *   retired token, is the earlier "signed out mid-session while active".
 *
 * THE RULE (DEC-076): an expired prior session is EVICTED before the
 * credentials are sent — a deliberate sign-in supersedes it, so there is no
 * stale refresh left to race — and the door reports success only once the new
 * session is COMMITTED to storage and readable. A live (unexpired) session is
 * never touched: a failed sign-in must not sign anybody out.
 */

/** The persisted token for THIS project, or null. Synchronous, no API call. */
function storedSession(): {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
} | null {
  if (typeof window === "undefined") return null;
  const key = storedSessionKey();
  if (key === null) return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      access_token?: unknown;
      refresh_token?: unknown;
      expires_at?: unknown;
    } | null;
    if (typeof parsed?.access_token !== "string" || typeof parsed.refresh_token !== "string") {
      return null;
    }
    return {
      access_token: parsed.access_token,
      refresh_token: parsed.refresh_token,
      expires_at: typeof parsed.expires_at === "number" ? parsed.expires_at : undefined,
    };
  } catch {
    return null;
  }
}

/** Expired = the access token's own `expires_at` is in the past (10s of skew). */
function storedSessionIsExpired(): boolean {
  const stored = storedSession();
  if (stored === null) return false;
  if (stored.expires_at === undefined) return true;
  return stored.expires_at * 1000 <= Date.now() + 10_000;
}

/**
 * DEC-076 step 1 — drop an expired prior session locally, so no refresh of it
 * can land after the new one. `scope: "local"` only: this browser's stale
 * token is the problem, the user's other devices are not. DEC-268 (Foundations
 * turn 34b-1): when the library answers an error or throws, this device drops
 * the stored session itself (the door's forgetStoredSession), as signOut does.
 */
async function evictExpiredSession(supabase: Client): Promise<void> {
  if (!storedSessionIsExpired()) return;
  try {
    const { error } = await supabase.auth.signOut({ scope: "local" });
    if (error) forgetStoredSession();
  } catch {
    forgetStoredSession();
  }
  clearSessionClocks();
}

/**
 * DEC-076 step 2 — the session is committed when `getSession()` answers with
 * the access token the grant just issued. Bounded (≈3 s) and polled, because
 * the write goes through auth-js's storage lock.
 */
async function awaitSessionCommit(
  supabase: Client,
  accessToken: string | undefined,
): Promise<boolean> {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const session = (await supabase.auth.getSession()).data.session;
    if (session && (accessToken === undefined || session.access_token === accessToken)) return true;
    await new Promise((resolve) => window.setTimeout(resolve, 50));
  }
  return false;
}

export async function signInWithPassword({ email, password }: Credentials): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  await evictExpiredSession(supabase);
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken: getCaptchaToken() },
  });
  if (error) return failure(error);
  // F4 — a sign-in that cannot be shown to hold a session is NOT a success.
  if (!(await awaitSessionCommit(supabase, data.session?.access_token))) {
    console.error("[ssr-error] /auth sign-in granted but no session committed");
    return { ok: false, errorKey: "auth.errorGeneric", emailNotConfirmed: false };
  }
  return { ok: true };
}

/**
 * Google door (P1-d). Scopes are passed explicitly so the request is
 * self-documenting even though the provider is configured server-side; they
 * stay minimal (email, profile, openid) — nothing else is ever requested.
 * The redirect target reuses the email door's helper: one source of truth.
 *
 * INC-224 — a `returnPath` the sign-in screen was given travels with it, so a
 * seller sent to sign in from the wizard lands back on the wizard.
 */
export async function signInWithGoogle(returnPath?: string): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: oauthRedirectUrl(returnPath),
      scopes: "email profile openid",
    },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function resendConfirmation(email: string): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: emailRedirectUrl(), captchaToken: getCaptchaToken() },
  });
  if (error) return failure(error);
  return { ok: true };
}

export async function signOut(): Promise<AuthResult> {
  const supabase = await authClient();
  // DEC-268 (Foundations turn 34b-1) — the session ends on this device whatever the answer: a
  // sign-out that could not reach the server, or whose client did not load, removes the stored
  // session itself, and answers its failure so the shell reloads to read that.
  if (supabase === null) {
    forgetStoredSession();
    return CLIENT_FAILED;
  }
  const { error } = await supabase.auth.signOut();
  if (error) {
    forgetStoredSession();
    return failure(error);
  }
  return { ok: true };
}

/**
 * Ends every OTHER session for this user; this browser stays signed in.
 * Server-side revocation — the only authority (law F3).
 */
export async function signOutOtherDevices(): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const { error } = await supabase.auth.signOut({ scope: "others" });
  if (error) return failure(error);
  return { ok: true };
}

/** Linked sign-in methods, flattened. Read-only. */
export async function getIdentities(): Promise<IdentitiesResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
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
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
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
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
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
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const verified = await verifyCurrentPassword(supabase, currentPassword);
  if (!verified.ok) return verified;

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
 * The signed-in person's current password, checked on a THROWAWAY client that
 * persists nothing (see `changePassword`): a wrong password answers
 * `auth.errorWrongCurrentPassword` and nothing else runs. Bundle 11 turn C4
 * (D143): Remove password asks for it too.
 */
async function verifyCurrentPassword(
  supabase: Client,
  currentPassword: string,
): Promise<AuthResult> {
  const proof = await currentPasswordProof(supabase, currentPassword);
  if (!proof.ok) return proof;
  const { error } = await proof.release();
  if (error) console.warn("[auth] password verifier release failed", error.message);
  return { ok: true };
}

async function currentPasswordProof(supabase: Client, currentPassword: string) {
  const { data: userData } = await supabase.auth.getUser();
  const email = userData.user?.email;
  if (!email) return { ok: false as const, errorKey: "auth.errorGeneric" as const };

  const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined;
  if (!url || !key) return { ok: false as const, errorKey: "auth.errorGeneric" as const };

  // DEC-261 — the second client's code arrives with the first, never on a first download.
  const { createClient } = await supabaseJs.load();
  const verifier = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { error: verifyError } = await verifier.auth.signInWithPassword({
    email,
    password: currentPassword,
  });
  if (verifyError)
    return { ok: false as const, errorKey: "auth.errorWrongCurrentPassword" as const };
  return { ok: true as const, release: () => verifier.auth.signOut({ scope: "local" }) };
}

/**
 * Starts an email change. GoTrue's double confirmation is server-enforced:
 * links go to BOTH the old and the new address, and neither address changes
 * until both are opened.
 */
export async function changeEmail(newEmail: string): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
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
  const supabase = await authClient();
  if (supabase === null) return false;

  const direct = (await supabase.auth.getSession()).data.session;
  if (direct) return true;

  // DEC-261 — the stored token is read under the door's key (storedSession above).
  const tokens = storedSession();
  if (tokens === null || tokens.access_token === "" || tokens.refresh_token === "") return false;

  /**
   * INC-266 / DEC-076 — AN EXPIRED TOKEN IS REFRESHED HERE, NOT HANDED TO
   * `setSession` AND LEFT TO A BACKGROUND REFRESH. `setSession` on an expired
   * access token returns before its refresh resolves, so the failure (and the
   * session REMOVAL auth-js performs on a retired refresh token) lands later —
   * on top of whatever session exists by then. The refresh is awaited instead,
   * and a stale token set is dropped here rather than allowed to race.
   */
  if (storedSessionIsExpired()) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: tokens.refresh_token,
    });
    if (error || !data.session) {
      await evictExpiredSession(supabase);
      return false;
    }
    return true;
  }

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
  const supabase = await authClient();
  if (supabase === null) return { ok: false, hadError: true };
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
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  const { data, error } = await supabase.rpc("has_password");
  if (error) return { ok: false, errorKey: toErrorKey(error) };
  return { ok: true, hasPassword: Boolean(data) };
}

/**
 * Removes the CURRENT user's password. The server refuses when no non-email
 * identity remains; that refusal is surfaced as `auth.errorLastMethod`.
 */
export async function removeOwnPassword(currentPassword: string): Promise<AuthResult> {
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
  // DEC-242: keep GoTrue's password-proof session alive until the door answers.
  const verified = await currentPasswordProof(supabase, currentPassword);
  if (!verified.ok) return verified;
  let removed = false;
  try {
    const { error } = await supabase.rpc("remove_own_password");
    if (!error) {
      removed = true;
      const { error: othersError } = await supabase.auth.signOut({ scope: "others" });
      if (othersError) console.warn("[auth] sign-out of other devices failed", othersError.message);
      return { ok: true };
    }
    if (/last sign-in method/i.test(error.message ?? ""))
      return { ok: false, errorKey: "auth.errorLastMethod" };
    return failure(error);
  } finally {
    if (!removed) {
      const { error } = await verified.release();
      if (error) console.warn("[auth] password verifier release failed", error.message);
    }
  }
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
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
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
  const supabase = await authClient();
  if (supabase === null) return CLIENT_FAILED;
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

/**
 * U4h — THE ACCOUNT-SYNC SEAM (secondary to the device ★).
 *
 * The account's `preferred_language` is a CARRY, not the authority: it fills a
 * device that has never expressed a star. The provider owns the precedence;
 * these two calls are the only DB seam it uses.
 *
 * Law F4 — never a silent swallow: both return a discriminated result and the
 * caller logs one named line.
 */
export async function fetchPreferredLanguage(): Promise<
  { code: string | null; reason: null } | { code: null; reason: string }
> {
  // DEC-261 — the session through the door: a signed-out device fetches no client.
  const { session } = await currentSession();
  const userId = session?.user?.id;
  if (!userId) return { code: null, reason: "no session" };
  const supabase = await authClient();
  if (supabase === null) return { code: null, reason: "the client did not load" };

  const { data, error } = await supabase
    .from("profiles")
    .select("preferred_language")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) return { code: null, reason: error.message };
  return { code: data?.preferred_language ?? null, reason: null };
}

/**
 * Pushes the device ★ up to the account. Own-row only and publication-gated in
 * the database (`user_set_preferred_language`); the client never decides.
 */
export async function savePreferredLanguage(
  code: string | null,
): Promise<{ ok: true } | { ok: false; reason: string }> {
  // DEC-261 — a signed-out device's star is the ordinary case: no client is fetched for it.
  const { session } = await currentSession();
  if (!session) return { ok: false, reason: "no session" };
  const supabase = await authClient();
  if (supabase === null) return { ok: false, reason: "the client did not load" };

  const { error } = await supabase.rpc("user_set_preferred_language", { p_code: code as string });
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}
