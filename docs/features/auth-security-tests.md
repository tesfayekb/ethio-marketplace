# Auth security tests — adversarial pass (P1-c capstone)

**Date:** 2026-07-30
**Target:** live published app `https://ethio-market-dawn.lovable.app` (+ committed auth
code: `src/features/auth/auth-service.ts`, `src/routes/auth.tsx`,
`src/routes/auth_.callback.tsx`)
**Methods:** headless Chromium (Playwright) against the live site; direct GoTrue REST
probes with the publishable key from the page context; code inspection where a case is
not observable from outside.

## Result: NOT ALL PASS — 2 defects found (see INC-010). The door is NOT declared secure.

## Results table

| # | Attack | Expected secure behavior | Actual observed behavior | Verdict | Method |
| --- | --- | --- | --- | --- | --- |
| 1 | Wrong password on a valid email | Generic "invalid credentials"; identical to the no-such-user case; no lockout/internal state leak | Existing account + wrong password renders exactly `That email and password don't match.` Non-existent address + any password renders the **byte-identical** string. No lockout or state wording. Mapping is `auth.errorInvalidCredentials` in `auth-service.ts` for both `invalid_credentials` and unknown-user responses. | **PASS** | Live UI (two sign-in attempts) + code inspection |
| 2 | Sign-in with an unconfirmed account | Clear "confirm your email first" state with resend option; no session | **BLOCKED — could not be exercised live.** Sign-up now fails at the provider: `POST /auth/v1/signup` returns `500 unexpected_failure` / `Error sending confirmation email` for every address tried, so no fresh unconfirmed account could be created; the UI surfaced the honest generic failure (`Something went wrong. Please try again.`) and created no session. By code inspection the intended path is correct: `isEmailNotConfirmed()` maps `email_not_confirmed` to `auth.errorEmailNotConfirmed`, sets `emailNotConfirmed`, and `auth.tsx` sets `canResend`, rendering the throttled resend button; no session is stored on a failed sign-in (`localStorage` auth-token keys observed: 0). | **BLOCKED (defect INC-010b)** | Live UI + REST probe + code inspection |
| 3 | Confirmation link older than the 3600 s OTP expiry | Callback shows invalid/expired state (never a false "confirmed"), offers a resend path | Landing with the expired-link shape GoTrue emits (`#error=access_denied&error_code=otp_expired`) renders `This link is invalid or has expired` + `Request a new confirmation email and try again.` + a resend control. No false success. Logic: `completeEmailVerification()` reports `failed` only when an `error`/`error_code` param is present **and** no session exists. | **PASS** | Live UI (error-param landing) + code inspection |
| 4 | Replaying an already-used confirmation link | Second use must not mint a second session; safely rejected | Not reproducible end-to-end (no confirmation email can currently be sent — see 2). Reasoned from the mechanism: GoTrue OTP hashes are single-use and deleted on redemption, so a replay returns the same `otp_expired`/`access_denied` shape tested in case 3, which the callback renders as invalid/expired. A forged/reused `token_hash` was tested directly (`/auth/callback?token_hash=invalidjunk&type=signup`): `verifyOtp` failed, **zero** auth-token keys were written to storage, and the UI showed the honest "opened on another device" state, not a confirmed one. | **PASS (by mechanism + forged-token probe)** | Live UI (forged token) + reasoning |
| 5 | Resend spam on the check-email screen | 60 s client cooldown + max 3 per visit; Supabase server rate limit as backstop | Check-email view: click 1 sends, then the button is **disabled** and counts down `Resend available in 59s … 55s`; the neutral status line appears once. Cooldown and the 3-per-visit cap are enforced in `handleResend`. **However** the `/auth/callback` invalid-link view has its own resend button with **no cooldown, no per-visit cap, and a free-text email field**: 4 consecutive clicks all fired, each returning HTTP 200. Only Supabase's own hourly limit backstops it. | **FAIL on `/auth/callback` (INC-010a)**; PASS on `/auth?view=check-email` | Live UI, repeated clicks on both views |
| 6 | Email enumeration via resend | Responses for "unconfirmed account exists" vs "no account" indistinguishable | GoTrue `POST /auth/v1/resend`: existing-address `200 {}` in 353 ms; unknown-address `200 {}` in 307 ms — same status, same empty body, no meaningful timing signal. UI shows the same neutral `If your email isn't confirmed yet, a new link is on its way.` in both cases; no "no such user" wording anywhere. | **PASS** | REST probe (both addresses) + live UI |
| 7 | Session-smart bypass ("Already confirmed? Sign in" / sign-in mount) | No path may fabricate a session | `hasSessionRehydrating()` only ever (a) returns an existing `getSession()` session, or (b) reads the `sb-<ref>-auth-token` key already in this browser's `localStorage` and replays **both** tokens through `supabase.auth.setSession()`, returning the result of a re-read. It never sets a flag, never trusts a URL, and returns `false` on any missing/short/malformed token. A forged callback wrote no storage key and produced no session. | **PASS** | Code inspection (`auth-service.ts:89-117`) + live forged-token probe |

## Summary

5 PASS (1, 3, 4, 6, 7), 1 PASS-with-a-failing-sibling-surface (5), 1 BLOCKED (2).
Two defects are recorded as INC-010 and are **not** papered over:

- **INC-010a — unthrottled resend with an operator-supplied address on
  `/auth/callback`.** The D-004 ruling (remove the editable resend-to input; throttle
  the resend) was applied to `/auth?view=check-email` only; the callback's
  invalid-link branch still ships the free-text `#resend-email` field and an
  unthrottled button. This is the same abuse vector D-004 closed, on a second surface.
- **INC-010b — sign-up is broken in production.** GoTrue returns
  `500 unexpected_failure / "Error sending confirmation email"` for every sign-up,
  so no account can be created and the email door is effectively closed. The app's
  handling is honest (generic error, no phantom success, no session), but the door
  does not work. This also blocked live verification of cases 2 and 4.

No claim of a secure door is made until both are fixed and this pass is re-run.
