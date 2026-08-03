# Settings surface (P1-f)

Status: BUILT 2026-08-03. Trimmed per DEC-012.

Route: `src/routes/settings.tsx` (auth-required, 360px primary).
Service: `src/features/auth/auth-service.ts`.

## Scope and the two operator rulings

- **Sessions:** "Sign out other devices" only (`signOut({ scope: 'others' })`). A full
  device list is DEFERRED to the Additional-auth-doors phase.
- **Display-name editing:** EXCLUDED. The first free-text profile input waits for the
  REQ-021 screening gateway. The name renders read-only.

Three sections: identity (name, email, member-since — all read-only), sign-in methods
(one row per identity, last-used pill, link/unlink), security (password change, email
change, sign out other devices with a confirm step).

## Census — identity APIs (@supabase/auth-js 2.110.9)

- `getUserIdentities(): Promise<{ data: { identities: UserIdentity[] }, error: null } | { data: null, error: AuthError }>`
  — requires a signed-in user.
- `linkIdentity(credentials: SignInWithOAuthCredentials): Promise<OAuthResponse>` —
  requires **Enable Manual Linking** (enabled on both projects by the operator).
- `unlinkIdentity(identity: UserIdentity): Promise<{ data: {}, error: null } | { data: null, error: AuthError }>`
  — the SDK documents: "The user must have at least 2 identities in order to unlink an
  identity." The refusal is enforced by GoTrue, not the SDK: HTTP 422,
  `error_code: single_identity_not_deletable`, message "User must have at least 1
  identity after unlinking". Mapped to `auth.errorLastMethod` in `toErrorKey`.
- Last-used timestamp: `UserIdentity.last_sign_in_at?: string` (siblings: `created_at`,
  `updated_at`, `identity_id`, `provider`). Optional — absent renders
  `settings.lastUsedNever`.

## Census — password change with "Secure password change" ON

`updateUser({ password })` never accepts a current password. With the toggle ON, GoTrue
requires a **reauthentication nonce** only when the session was NOT created in the last
24 hours: `supabase.auth.reauthenticate()` emails a 6-digit OTP, which is then passed as
`updateUser({ password, nonce })`.

Mechanism chosen for current-password verification: a **throwaway Supabase client**
(`persistSession: false`, `storage: undefined`) calls `signInWithPassword` with the
supplied current password. A wrong password fails there and `updateUser` is never
reached — nothing changes, and the signed-in session in this browser is untouched
because the throwaway client shares no storage. Why not the nonce flow: it verifies
mailbox possession, not knowledge of the current password, and it depends on email
delivery, which is a launch-gate item.

Known limit, surfaced not hidden: if the session is older than 24 hours, GoTrue will
reject `updateUser({ password })` and demand a nonce. That failure is surfaced as a
translated error; no silent success is possible (law F4). A nonce step can be added
later without changing the verification mechanism.

## Last-method guard

- **Primary (real) guard:** the GoTrue server refusal above, surfaced verbatim-in-meaning
  through `auth.errorLastMethod`.
- **Secondary (honesty only):** with exactly one identity the Unlink control renders
  DISABLED, with `settings.lastMethodGuard` as both a `title` and a visible hint. This is
  UI convenience, never authorization (law F3).

## Operator deny tests (manual — not automatable in CI)

A linked Google identity cannot be minted headlessly, so these are operator-run:

- **U-1** — with email + Google linked, unlink Google: succeeds; email sign-in still works.
- **U-2** — with email + Google linked, unlink email: observe whether GoTrue permits it,
  and whether Google sign-in still resolves to the same user id.
- **U-3 (ghost password)** — the question being hunted: **after the email identity is
  unlinked, does the password survive server-side?** If a subsequent
  `signInWithPassword` with the old credentials succeeds, or the password hash is still
  present on the user row, that is a live credential with no visible sign-in method — a
  finding to report immediately, NOT to patch with a trigger.

## E2E coverage vs manual

Automated (mobile-360 only; desktop `testIgnore`):

- **S-1** — unauthenticated `/settings` lands on `/auth`.
- **S-2** — signed-in user sees all three sections, the email identity row, a DISABLED
  Unlink control and the `settings.lastMethodGuard` text.
- **S-3 (U-4 automated)** — wrong current password rejected with a visible alert and an
  intact session; correct current password succeeds; after sign-out the OLD password is
  rejected and the NEW one signs in.

Manual: U-1/U-2/U-3 (Google linking), and the email-change double-confirmation flow,
which needs two real mailboxes — blocked on the custom SMTP launch-gate item.

## Known follow-up

The relative "last used" formatter lives inside `settings.tsx` (Intl only, no new
dependency). Law B2 requires one date formatter in `/src/lib`; that move is due the
moment a second surface needs relative time, and `/src/lib` was outside this task's
scope.
