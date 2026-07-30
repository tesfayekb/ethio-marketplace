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
