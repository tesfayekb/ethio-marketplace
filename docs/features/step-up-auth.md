# Step-up authentication (TOTP MFA + AAL2) — U1f

Sensitive admin mutations require a session that has been **stepped up** to
AAL2 with a time-based one-time code (TOTP), on top of the RBAC permission the
account already holds.

## The rule

A permission row carries `requires_step_up`. Seeded true (migration
`20260817052646_…`) for:

- `profiles:update`
- `roles:assign`
- `roles:update`
- `roles:delete`

`audit_logs` permissions are untouched — reading is not a step-up action.

## Server gate (the authority)

`public.require_step_up_if_needed(p_resource, p_action)` (SECURITY DEFINER)
raises `step-up required` with SQLSTATE **P0009** when the permission requires
step-up and `auth.jwt() ->> 'aal'` is distinct from `aal2`. It is called at the
TOP of every sensitive mutation RPC, after the permission check:

- `admin_set_account_status`
- `assign_role`
- `revoke_role`

**RULE for future work:** every new mutation RPC whose permission may be marked
`requires_step_up` calls `require_step_up_if_needed` immediately after its
`has_permission` check. Permission first, step-up second — a caller without the
permission must still see `permission denied`, never a hint that a code would
help.

**Super admin is NOT exempt.** Step-up is a property of the SESSION, not of the
role; the most privileged session is exactly the one worth re-verifying.

Migration proofs (impersonated `request.jwt.claims`):

- P1 super_admin, `aal:'aal1'` → `admin_set_account_status` RAISES step-up required
- P2 same call with `aal:'aal2'` → succeeds (scratch user, restored)
- P3 `assign_role` at `aal1` → RAISES
- P4 `admin_list_users` (read) at `aal1` → unaffected

## Client

- `src/features/auth/mfa/mfa-service.ts` — thin wrappers over
  `supabase.auth.mfa.*` (`enroll`, `challenge`, `verify`, `unenroll`,
  `listFactors`) plus `getAal()` / `isSteppedUp()` and
  `isStepUpRequiredError()` (matches P0009 / the message).
- `use-mfa.ts` — the settings surface: enroll (QR + secret → verify), list
  factors, remove (re-verify first, MF-5).
- `use-step-up.ts` / `step-up-gate.tsx` — `StepUpGate` is a render-prop wrapper
  handing children a `guard(action)`:
  1. session already AAL2 → the action runs;
  2. AAL1 with a factor → modal asks for the code, verify raises the session to
     AAL2, then the action runs;
  3. no factor → modal explains and links to Settings → 2FA; the action never
     runs and **no RPC is sent**.
- Defence in depth: a `step-up required` error coming back from ANY RPC re-opens
  the same modal and retries after verification, so a caller that forgot the
  gate still behaves correctly.

Surfaces gated today: the four actions on the admin user detail page
(deactivate, activate, assign role, revoke role).

## AAL lifetime

Observed GoTrue behaviour: once a factor is verified, the refreshed session
carries `aal2` for its lifetime, so later sensitive actions in the same session
do not re-prompt. **A fresh sign-in always starts at `aal1`** — the first
sensitive action after signing in asks for a code again.

`src/features/session/session-policy.ts` stores only a client-side hint
(`sb-<ref>-stepped-up-at`, never authoritative) and `clearSessionClocks()`
removes it, so the staff idle timeout — which signs the session out — also drops
the cached "recently stepped up" state.

## i18n

All copy under the `mfa.*` keys, EN + AM, 360-first, ≥44px targets, logical
spacing only.

## E2E

`e2e/mfa-stepup.spec.ts`, codes generated in-test by `e2e/helpers/totp.ts`
(30-line RFC 6238 implementation — no new dependency):

- MF-1 enroll → QR + secret → generated code → factor listed
- MF-2 fresh session (aal1) → deactivate → modal → wrong code refused → correct
  code → action proceeds → audit row present
- MF-3 staff without a factor → modal explains + links to settings; no
  `user.status_change` audit row
- MF-4 server: base user at aal1 → `permission denied`; staff at aal1 →
  `step-up required`
- MF-5 unenroll requires a fresh verification

## Operator items

1. Supabase Dashboard → Authentication → Multi-Factor → enable **TOTP** on
   `ethio-prod` AND `ethio-staging`.
2. Apply migration `20260817052646_196f64f5-d959-4852-b7ab-550b77fbfb7e.sql` to
   staging BEFORE the E2E run (the parity preflight names it on failure).

## Reading the AAL from a test (U1g-2)

`supabase.auth.mfa.getAuthenticatorAssuranceLevel()` resolves to
`{ data: { currentLevel, nextLevel }, error }` — the level lives under `data`.
`e2e/helpers/ui.ts` exposes `readAal(page)` (the raw read) and
`expectAal2(page)`, which polls it for up to 5s because the client flips its
AAL asynchronously after a factor is verified. `stepUpIfPrompted` now ends on
that achieved state, not on the submit click.

## Purge root (INC-078 addendum)

Every auth-derived query key starts with `AUTH_DERIVED_ROOT`
(`src/features/permissions/usePermissions.ts`): permissions
`["auth-derived","my-permissions"]`, admin users
`["auth-derived","admin","users",...]`, admin countries
`["auth-derived","admin","countries"]`. The sign-out hard reset cancels then
removes that single root, so nothing auth-derived — including the cached
step-up hint's neighbours — survives into a signed-out shell.

## U1f-4 — a bearer `aal2` claim is not a step-up (INC-081)

Operator repro: after unenrolling the only TOTP factor, `deactivate` still
succeeded (the JWT kept claiming `aal2`), and the enrollment verify itself
elevated the session for its whole lifetime, so no later prompt fired.

**The two-condition law.** A sensitive action is stepped up only if BOTH hold,
checked server-side in `public.require_step_up_if_needed` (migration
`20260817100845_…`):

1. the caller CURRENTLY owns a verified TOTP factor
   (`auth.mfa_factors`, `status='verified'`, `factor_type='totp'`);
2. the JWT claims `aal2` AND `auth.mfa_amr_claims` shows a `totp` verification
   on the CURRENT session within the last **10 minutes**.

Failure modes are distinct: `step-up required: no verified factor`,
`step-up required`, `step-up required: verification expired` — all SQLSTATE
`P0009`, so the existing client detection is unchanged.

Migration proofs: P5 (aal2 claim, no factor → refused), P6 (factor + aal2 +
fresh amr → accepted), P7 (verification older than 10 minutes → refused),
P8 (read resources unaffected). Re-run after apply, all pass.

**Client mirror** (`mfa-service.ts` → `isStepUpFresh()`): factor present, aal2,
and `readSteppedUpAt()` inside `STEP_UP_WINDOW_MS` (10 min). `verifyFactor`
stamps the verification instant; `unenrollFactor` invalidates the stamp and
refreshes the session so nothing looks elevated after the last factor goes.
`use-step-up.ts` guards on freshness instead of the raw AAL. Settings shows
`mfa-off-warning` when no factor remains. DEV/E2E may shorten the CLIENT window
with `window.__ethioStepUp = { windowMs }`; the server window is fixed.

E2E: MF-6 (unenroll → the no-factor modal, no RPC) and MF-7 (expired window →
re-prompt, then the action proceeds).

## L5 — freshness is read from the TOKEN (DEC-040) and the guard completes (DEC-041)

**INC-166 (production).** "Sync keys" ran, the server did the work, and the
console reported nothing. Cause: `guard(action)` resolved as soon as the
step-up MODAL OPENED, so the caller's `.then()` read its result box before the
action had produced anything.

**The completion contract.** `guard(action)` now returns a promise that settles
on the ACTION: it resolves with the action's value (inline when the session is
fresh, or after `submitCode` has run the pending action) and rejects with the
action's error on both paths (law F4). A cancelled or no-factor gate leaves it
UNSETTLED — nothing ran, so neither success nor failure may be claimed.
`SyncKeysCard` reads the counts straight off the resolved value; the result box
is deleted.

**Client freshness = the token.** `isStepUpFresh()` no longer reads the
`sb-<ref>-stepped-up-at` hint (no write or read of it remains in the MFA
feature). It decodes the current access token and requires `aal === "aal2"` plus
a `totp` entry in `amr` whose timestamp is inside `STEP_UP_WINDOW_MS` (10
minutes) — mirroring `interval '10 minutes'` in
`public.require_step_up_if_needed` (migration `20260817100845_…`) — and still
requires a currently-owned verified factor. The server remains the authority.

**E2E (DEC-041).** Global setup signs the pooled super admin in and verifies its
TOTP factor in node, asserts the resulting token claims `aal2`, and writes the
session beside the pool in the state file. `useJobSuperAdmin` injects that
session before the first navigation, then asserts AAL2 and the signed-in header
from the client; a session inside 5 minutes of expiry is refreshed once in node
and the state file rewritten. No UI sign-in and no per-test verification for the
pool; `E2E_UI_LOGIN=1` keeps the real door plus in-browser elevation, and
private (`@private-identity`) mints are unchanged. **TR-7b** is the regression:
a private super admin at aal1 clicks Sync, answers the prompt, and
`translations-sync-done` renders with its counts.

## DEC-047 — the gate SETTLES on every path (FIX-SCAN-1 ISSUE 2)

DEC-040 made `guard(action)` settle on the ACTION, but deliberately left the
promise UNSETTLED when the operator cancelled the prompt or held no factor. The
consequence the scanner found: the caller's pending state never reset — buttons
stayed stuck and no explanation appeared.

`guard()` now rejects on those paths with typed errors from `mfa-service.ts`:

- `StepUpCancelled` — the operator closed or cancelled the prompt;
- `StepUpUnavailable` — no verified TOTP factor exists (the modal still explains
  and links to Settings, and no RPC is sent).

`stepUpAbortKey(error)` maps them for callers: `null` for a cancellation
(nothing ran, so nothing is claimed — law F4) and `mfa.stepUpUnavailableHint`
("set up an authenticator") for the no-factor case. Every `guard(` consumer —
users, roles, translations, categories, attributes, the shared import dialog and
impersonation — resets its pending state through that helper. Proofs: MF-7b
(cancel → Save re-enabled, no banner, DB unchanged) and MF-7c (no factor → Save
re-enabled with the hint, DB unchanged).
