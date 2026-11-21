import type { EmailOtpType } from "@supabase/supabase-js";

import { currentSession } from "@/lib/supabase-door";

import { authClient } from "./auth-client";

import type { VerificationResult } from "./types";

/**
 * INC-1153 (cursor bundle 1, ruling 1 answer 2) — THE EMAIL-VERIFICATION LANDING IS A LEAF, as
 * sign-out.ts is (DEC-348): /auth/callback draws it and nothing else of the service, so the page
 * does not download the sign-up, password and identity code, nor the reader their failure mapper
 * stands on. auth-service.ts re-exports it for its neighbours; the body moved byte for byte.
 */

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
  // INC-914 — the client did not load: unknown, never "the link is dead".
  if (supabase === null) return { ok: false, unavailable: true };
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

  // 1. detectSessionInUrl may already have consumed the hash tokens. Turn 34c-5 (INC-933) —
  //    every session read here goes through the door: a read that failed is unknown, never a
  //    bad link (the screen says the page did not load).
  const first = await currentSession();
  if (first.failed) return { ok: false, unavailable: true };
  if (first.session) return { ok: true };

  // 2. Explicit hash-token handling when the SDK did not pick them up.
  if (accessToken && refreshToken) {
    await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    const set = await currentSession();
    if (set.failed) return { ok: false, unavailable: true };
    if (set.session) return { ok: true };
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

  const last = await currentSession();
  if (last.failed) return { ok: false, unavailable: true };
  if (last.session) return { ok: true };

  return { ok: false, hadError: hasErrorParam };
}
