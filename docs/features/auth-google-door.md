# Google door (P1-d)

Status: BUILT — **not closed.** REQ-015 linking behaviour is specified below but **not yet
verified**; operator deny tests D-8/D-9/D-10 gate step closure.

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

## REQ-015 linking rule — SPECIFIED, NOT YET VERIFIED

Specified behaviour: a Google sign-in auto-links to an existing local account **only when** the
local account is already confirmed **and** Google reports `email_verified` for that address.
Otherwise the link is refused and the user is sent to the email door to confirm first.

**Not yet verified:** Supabase's actual handling of the unconfirmed-account path has not been
observed. Operator deny tests D-8/D-9/D-10 exercise it and gate closure of this step. Until they
run, no claim is made about what Supabase does with an unconfirmed local account.

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
