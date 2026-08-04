# Settings surface (P1-f)

Status: CLOSED 2026-08-03. Trimmed per DEC-012.

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

## Deny-test results — executed 2026-08-03 against ethio-prod

Executed by `scripts/deny-tests/p1f-identity-unlink.ts` (bun, service-role key from env
only — no secret is hardcoded, committed, or printed). The operator performed the
OAuth-consent steps CI cannot: unlink Google via the UI, then re-link via consent.

- **U-1 — PASS (guard bites server-side).** A throwaway single-identity user calling
  `DELETE /auth/v1/user/identities/{id}` on its sole identity is refused with HTTP 422,
  `{"code":422,"error_code":"single_identity_not_deletable","msg":"User must have at
least 1 identity after unlinking"}`. The throwaway user was deleted afterwards.
- **U-2 — PASS.** After the operator's UI unlink + OAuth re-link, `getUserById` shows
  both `email` and `google` identities on the same user id, and the password was alive.
- **U-3 — FIXED 2026-08-03 (was: GHOST DOOR CONFIRMED, INC-024).** The `email` identity
  was unlinked (HTTP 200) leaving `google` only. Read-back afterwards:
  `auth.identities → [google]` while `auth.users.encrypted_password IS NOT NULL` was
  still **true**, and the operator signed in live with that password — a working
  credential that no sign-in-methods list shows and no user can manage.
  Closed by migration `20260803100407_…` (see "Unlink semantics" below). Recheck
  evidence, `--recheck` phases 1 and 2 against ethio-prod:
  password signs in before the unlink → after the email identity is deleted with a
  second identity remaining, the same password returns `invalid_credentials`, and
  `has_password` reads **false**; operator-account read-back `has_password = false`.

## Unlink semantics (INC-024)

Removing the email identity **kills its password**. `public.handle_email_identity_unlink()`
(SECURITY DEFINER, `search_path = public`, EXECUTE revoked from PUBLIC/anon/authenticated)
runs AFTER DELETE ON `auth.identities` WHEN `OLD.provider = 'email'` and nulls
`auth.users.encrypted_password` **only when another identity remains** — a full account
deletion, which empties identities, is left alone. GoTrue already behaves this way in the
identity _replace_ path (D-8); the trigger extends the same semantics to _unlink_, so the
sign-in-methods list is the whole truth. A one-time correction in the same migration
nulled every password that had no email identity (the operator's account, proven live).

Operator ruling 2026-08-03: option A — unlink tells the truth.

### Password-presence mechanism (which field was used)

GoTrue's admin API returns **no** password field — `encrypted_password` is never
exposed on the admin user object. The sign-in error taxonomy cannot substitute for it:
GoTrue answers `invalid_credentials` / "Invalid login credentials" for both _wrong
password_ and _no password on this user_. The script therefore records the wrong-password
probe as evidence only and prints **OPERATOR PROBE REQUIRED**; the authoritative fact was
read outside the script with SQL on the connected project:
`select encrypted_password is not null from auth.users where email = …` → `true`.

### State warning

The operator's account (`tesfayekb@gmail.com`) is now **google-only**. Re-linking email
requires the operator to set a password via the reset flow or re-link through the
settings surface. No automatic restore was attempted — the admin API cannot recreate an
email identity without the password.

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

## Navigation and shared code

- Entry point: the app header renders a **Settings** link to `/settings` for signed-in
  users, immediately before Sign out (`settings.navLabel`, EN/AM). At 360px the display
  name truncates harder (`max-w-[6rem]`) and the header's existing flex-wrap row lets the
  two controls drop to a second line rather than shrink below their 44px targets.
- Relative "last used" formatting lives in `src/lib/relative-time.ts` — the single law-B2
  source of truth. Intl only, no date dependency.

## Locator note (S-3)

"Sign out other devices" collides with any unanchored `/sign out/i` probe. The spec and
the shared `expectSignedIn`/`expectSignedOut` helpers use the anchored `/^sign out$/i`;
keep new sign-out-adjacent labels in mind when writing session probes.

## Final semantics

The sign-in-methods list is the whole truth: unlinking the email identity deletes the
password (INC-024 trigger on `auth.identities`), the last method is unremovable
server-side (U-1, HTTP 422 `single_identity_not_deletable`), and the disabled Unlink
control is honesty only, never authorization. The P1-g polish sweep still owes the UI
copy warning before an email unlink (the password deletion is real and not recoverable
without re-linking or reset).

## Superseded by the P1-g truth model (2026-08-03)

The sign-in-methods list no longer derives the password from the `email` identity
row. The password is its own row, answered by `public.has_password()`, and it can
be removed directly via `public.remove_own_password()` when another door exists.
The INC-024 trigger above still stands — unlinking the email identity still kills
its password — but it is now one of two paths to a passwordless account rather
than the only one. See `docs/features/auth-password-recovery.md`.
