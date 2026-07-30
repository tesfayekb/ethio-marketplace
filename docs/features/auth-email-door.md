# Auth — email sign-in door (P1-c)

The first door into the app: email + password sign-up, email verification, sign-in, sign-out.
Google (P1-d) and Telegram (P1-e) doors land on the same screen later.

## Files

- `src/routes/auth.tsx` — combined sign-in / create-account screen at `/auth`.
- `src/routes/auth_.callback.tsx` — post-verification landing at `/auth/callback`.
- `src/features/auth/auth-service.ts` — Supabase calls + error→translation-key mapping.
- `src/features/auth/use-auth.ts` — session hook (`user`, `loading`, actions).
- `src/features/auth/types.ts` — `AuthMode`, `Credentials`, `AuthResult`, `AuthUser`.
- `src/components/app-header.tsx` — session-aware header actions.

### Route filename note

The callback file is `auth_.callback.tsx`, not `auth.callback.tsx`. With flat routing,
`auth.callback.tsx` nests under `auth.tsx`, which is a leaf screen with no `<Outlet />` — the
result is that `/auth/callback` renders the sign-in form. The trailing underscore opts the
callback out of that nesting. Verified in the preview: `/auth/callback` now renders the callback
screen.

## Flow

1. **Sign up** — `supabase.auth.signUp({ email, password, options.emailRedirectTo })` where
   `emailRedirectTo` is `${window.location.origin}/auth/callback`, computed at call time so
   preview, published, and custom-domain origins all work. The screen then shows the
   "check your email" state with a resend button.
2. **Confirm** — the emailed link returns to `/auth/callback`, which calls
   `completeEmailVerification()` (in `auth-service.ts`). Supabase can return the session in three
   shapes, and all three are handled:
   - PKCE — `?code=...` → `exchangeCodeForSession(code)`
   - implicit — `#access_token=...&refresh_token=...&type=...` → `setSession(...)`
   - OTP link — `?token_hash=...&type=...` → `verifyOtp(...)`

   Failures arrive as `?error=`/`#error=` (with `error_code` / `error_description`).

   After processing, the callback **always re-reads `getSession()`**: if a session exists the page
   shows "Email confirmed / You're signed in" with a Continue action to `/`, regardless of which
   format the link used. The invalid/expired state (with the email field and resend action) renders
   only when no session can be established. This ordering is the INC-004 fix — previously a
   successful verification could render as "invalid or has expired" (success shown as failure).

3. **Sign in** — `signInWithPassword`; success navigates to `/`. Failures render a translated
   message. `email_not_confirmed` additionally reveals a resend button inline.
4. **Sign out** — header button calls `signOut()` then navigates to `/`.

No profile rows are created from client code — the `handle_new_user` trigger owns
`user_directory` + `profiles` (see `identity-schema.md`).

## Browser client configuration

`src/integrations/supabase/client.ts` configures the browser Supabase client with PKCE
explicitly enabled:

```ts
auth: {
  flowType: "pkce",
  detectSessionInUrl: true,
  storage: typeof window !== "undefined" ? localStorage : undefined,
  persistSession: true,
  autoRefreshToken: true,
},
```

`flowType: "pkce"` plus `detectSessionInUrl: true` means a `?code=...` confirmation link is
auto-detected and exchangeable, and the callback's `completeEmailVerification()` can safely
re-check `getSession()` to confirm success. This is the INC-004 follow-up that makes the
email-link session exchange reliable across preview, published, and custom-domain origins.

## Session exposure

`useAuth` subscribes to `supabase.auth.onAuthStateChange` and seeds from `getSession()`, so no
React provider was added to `__root.tsx`; the header and the auth screens each call the hook.
`display_name` is read from `profiles` under the owner-read RLS policy.

## Redirect-URL dependency (operator action)

Supabase Auth must list every origin the app runs on:

- **Site URL** — the published origin.
- **Redirect URLs** — `<origin>/auth/callback` for the preview origin, the published origin, and
  any custom domain.

If an origin is missing, the emailed link bounces to the Site URL instead of the callback, and the
callback shows the invalid-link state. This is configuration, not a code bug.

## Verification-required behavior

Email confirmation is required. Until the link is clicked, `signInWithPassword` fails with
`email_not_confirmed`, which maps to `auth.errorEmailNotConfirmed` and surfaces the resend action.
Resend is rate-limited by Supabase; a 429 maps to `auth.errorRateLimited` and is always shown —
never swallowed (law F4).

## Error handling

`auth-service.ts` is the only place that reads Supabase error objects. It returns
`{ ok: false, errorKey }` with a `MessageKey`; components render `t(errorKey)`. Raw messages,
codes, and status numbers never reach the DOM.

## Seams for the next doors

`/auth` renders a bordered "Or continue with" section holding two **disabled placeholder buttons**
(`auth.googleSlot`, `auth.telegramSlot`). P1-d replaces the Google slot with the Lovable OAuth
broker call; P1-e replaces the Telegram slot. Nothing else on the screen needs to move: both doors
reuse `useAuth` for the resulting session and the same `/auth/callback` landing.

## Flow correction (INC-004 fix, 2026-07-30)

The browser client uses `flowType: "implicit"`, not PKCE. An email confirmation link is
frequently opened in a different browser or in-app webview than the one that signed up, where the
PKCE `code_verifier` does not exist — so `exchangeCodeForSession` could never succeed and a
genuine confirmation rendered as "invalid or expired". Implicit returns `#access_token=&refresh_token=`
hash tokens that any browser can consume.

`completeEmailVerification()` now keeps two facts apart:

- **verification succeeded** — the account is confirmed (a clean `verifyOtp` proves this).
- **session established** — a session exists _in this browser_.

Order: read `getSession()` (detectSessionInUrl may already have consumed the hash) → `setSession`
from hash tokens → `verifyOtp` for `?token_hash=&type=` → best-effort `exchangeCodeForSession` for
legacy `?code=` links → final `getSession()` re-check.

The callback renders three outcomes:

- **confirmed** — a session exists, or `verifyOtp` succeeded.
- **noSession** — no error param and no session: the link was likely opened elsewhere. Shows
  `auth.noSessionTitle`/`auth.noSessionBody` and a "Back to sign in" action. This is never labelled
  a bad link.
- **invalid** — only when the URL carries a genuine `error`/`error_code` param AND no session.

## Check-your-email screen (BUG 2 / BUG 2b, INC-005)

The view is **URL-driven**: `/auth?view=check-email` renders the check-email screen, plain `/auth`
always renders the sign-in form. `validateSearch` on the route accepts only `view=check-email`;
anything else normalises to the sign-in form. Sign-up navigates to `/auth?view=check-email`, so the
header "Sign in" link (a plain `/auth` navigation) is no longer a no-op, and a refresh keeps the
user on the screen they were on. The in-page "Back to sign in" button navigates to `/auth`.

### Resend hardening (INC-005)

- **Throttle** — after each successful resend the button is disabled for 60 seconds and shows a
  translated countdown (`auth.resendCooldown`, `{s}` substituted in the component). At most 3
  resends per check-email visit; after that the button stays disabled and `auth.resendLimitReached`
  is shown. Supabase's server-side rate limit remains the backstop and its 429 still surfaces as
  `auth.errorRateLimited`.
- **Neutral messaging** — a successful resend renders `auth.resendNeutral` ("If your email isn't
  confirmed yet, a new link is on its way"), which never reveals whether an account exists or is
  already confirmed (no enumeration leak). The old `auth.resendSent` wording is retired from the UI.
- **Auto-advance** — while the check-email view is open, the screen subscribes to
  `supabase.auth.onAuthStateChange`; if a session appears (the user confirmed in another tab of the
  same browser) it switches to the confirmed state with a Continue-to-home action.

The temporary DEBUG panel and its console logging on `/auth/callback` have been removed; BUG 1 was
verified live.

### Resend target and URL-driven mode (D-004, BUG 2c)

- **No editable resend address (D-004)** — the check-email view has no email input. The resend
  target is only the address captured when sign-up succeeded, stored in `sessionStorage` under
  `ethio.auth.pendingEmail` (never in the URL) and displayed read-only via `auth.checkEmailSentTo`.
  If the view loads with no stored email (cold refresh or direct link), only "Back to sign in" is
  offered — no resend button and no input — so nobody can trigger confirmation mail to an arbitrary
  address. In the sign-in form, the conditional resend (shown when Supabase reports an unconfirmed
  email) still targets the address the user just typed into that form.
- **Mode lives in the URL (BUG 2c)** — plain `/auth` always renders the sign-in form;
  create-account is `/auth?view=sign-up`; `/auth?view=check-email` is unchanged. The in-form toggle
  navigates between the two search params instead of holding local mode state, so the header
  "Sign in" link always lands on the sign-in form.
- Throttle, resend limit and auto-advance behaviour are unchanged.

### Live confirmation detection (INC-005 completion, 2026-07-30)

While `/auth?view=check-email` is shown, three **local** mechanisms look for a session:

1. `supabase.auth.onAuthStateChange` (in-tab),
2. a `focus` / `visibilitychange` handler that re-reads `getSession()` when the tab regains focus,
3. a 5-second poll that runs only while the document is visible.

All three are cleaned up on unmount or when the view changes. If any finds a session, the entire
check-email UI (resend button, countdown, limit message, read-only address) is replaced by
`auth.confirmedInline` ("✓ Your email is confirmed") plus a Continue action to `/`, and the
`ethio.auth.pendingEmail` entry is cleared from `sessionStorage`.

Cross-device confirmation cannot be detected locally, and no server-side "is this email confirmed"
lookup is added — that would be an enumeration oracle. Instead the view renders a permanent
`auth.alreadyConfirmedSignIn` ("Already confirmed? Sign in") action as the **secondary** action
when a pending sign-up email exists, and `auth.backToSignIn` only when the view was loaded with no
stored email (cold load). The two "Back to sign in" and "Already confirmed? Sign in" buttons are
never shown together.

Throttle (60s), max 3 resends per visit, and the neutral resend message are unchanged for the
not-yet-confirmed path.
