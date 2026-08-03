# Google door (P1-d)

Status: CLOSED 2026-08-03 — built, E2E-guarded, and REQ-015 linking behaviour proven by
operator deny tests D-8 and D-10. D-9 is deferred-named to the Additional-auth-doors phase.

## Scopes

The authorization request asks for exactly three scopes: `email`, `profile`, `openid`.

- `email` — the identity key the marketplace uses; without it no account can be matched or created.
- `profile` — display name only, for the profile row the signup trigger creates.
- `openid` — required for the OIDC ID token Supabase validates.

Nothing else is requested: no Drive, contacts, calendar, or offline access. The scopes are passed
explicitly from `signInWithGoogle()` in `src/features/auth/auth-service.ts` even though the
provider is configured server-side, so the request is self-documenting, and E2E **G-1** asserts the
authorization URL carries these three and no others — a standing guard against silent scope creep.

## Redirect URIs

Registered on both Supabase projects (Authentication → Providers → Google):

- `https://zwmvxvzzvjvtdcfcwiuf.supabase.co/auth/v1/callback` (ethio-prod)
- `https://jatpuhfdjfzctjipklmk.supabase.co/auth/v1/callback` (ethio-staging)

The app-side return target reuses the email door's `emailRedirectUrl()` helper — `/auth/callback`,
one source of truth. That route already handles a session arriving in the URL hash (the implicit
flow shape the email door uses), so it required no change for OAuth.

## REQ-015 linking rule — OBSERVED BEHAVIOUR (2026-08-03)

Operator-executed on **ethio-prod** against the published app, with SQL read-back and live
sign-in probes.

- **D-8 — unconfirmed local account, then Google sign-in: PASS.** GoTrue **replaces** the
  unconfirmed email identity with the Google identity on the **same user id**, **destroys the
  never-used password** (`has_password=false`; live probe: the old password is rejected at the
  email door), and auto-confirms the account. The consequence is security-positive: an attacker
  who plants an unconfirmed signup on someone else's address loses that credential the moment
  the real owner arrives via Google. The takeover path is self-defusing.
- **D-10 — confirmed local account, then Google sign-in: PASS.** Clean link — one user id, both
  identities present, password intact (`has_password=true`; live probe: email-door sign-in still
  works).
- **D-9 — provider reports `email_verified=false`: DEFERRED-NAMED** to the Additional-auth-doors
  phase. Not runnable with the available accounts (Gmail always reports verified). The
  `auth.linkRefused*` i18n keys are **RESERVED** for this case — they are not orphan debt.

**Caveat:** this is observed behaviour of **GoTrue**, a dependency Supabase upgrades server-side.
It cannot be covered by CI (no real Google round-trip is available to the harness). The control is
procedural: manual re-run of D-8 and D-10 at the launch gate and after any Supabase Auth/GoTrue
version change — see `docs/governance/launch-gate.md`.

## Enumeration-safe refusal copy

`auth.linkRefusedTitle` / `auth.linkRefusedBody` tell the user the address must be confirmed by
email before it can be used with Google, and point at the email door. The copy is identical for the
"no account" and "unconfirmed account" cases and reveals neither — the same discipline E2E **B-3**
enforces for sign-in errors.

## DEC-010 Turnstile seam

`getCaptchaToken()` in `auth-service.ts` returns `undefined` today and is threaded as
`options.captchaToken` on every auth call that supports it (sign-up, sign-in, resend). Cloudflare
Turnstile is enabled at launch; staging will use Cloudflare's always-pass test keys. No widget, no
dependency, no network call exists yet. `signInWithOAuth` takes no `captchaToken` option, so the
Google call carries none.

## Tests

- **G-1** — intercepts the **first hop**, `**/auth/v1/authorize*`: the request our own code
  constructs. It is **fulfilled** with a 204 (never aborted, so the click's navigation resolves
  cleanly), and the captured URL is asserted to be on `*.supabase.co/auth/v1/authorize` with
  `provider=google`, exactly the three scopes `email`, `openid`, `profile`, and a `redirect_to`
  pointing at our own `/auth/callback`.

  Rationale: Playwright route handlers fire on the request as initiated, not on server-redirect
  hops, so the Supabase→`accounts.google.com` hop can never be intercepted; and that URL is built
  server-side by Supabase, so it cannot regress through our commits. The first hop is the only
  layer a scope-creep guard can meaningfully watch. The real Supabase→Google round trip stays a
  manual pre-launch check (Q-2 ruling).

- **G-2** — the button is present with the `auth.continueWithGoogle` accessible name in both
  sign-in and sign-up modes.

Both run per push on `mobile-360` only, consistent with the other logic specs. Google is never
loaded.
