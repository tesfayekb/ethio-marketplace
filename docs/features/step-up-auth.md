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
session beside the pool in the state file. `signInJobSuperAdmin` injects that
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

## Bundle 14 turn 2 — the window instrument is E2E only; the stale-client helper (INC-621, INC-620)

- **INC-621.** `stepUpWindowMs()` (src/features/auth/mfa/mfa-service.ts) read `window.__ethioStepUp` in every build. It now reads it only when `isE2E` (DEC-018), so a production build drops it, as it drops the other window instruments. The server's window was never affected (law F3: `public.require_step_up_if_needed` decides). HOOK-1 (src/lib/env-flags.test.ts) is the census of every window instrument the app code names; each file that holds one takes the flag.
- **INC-620.** The E2E helper `clearStepUpFreshness` wrote the local stamp retired by INC-167 and did nothing; it is removed, with its two calls in MF-2 and MF-7b (their fresh sign-ins are aal1, so their modal never depended on it). A test that needs the modal over an injected session calls `staleStepUpOnClient(page)` (the client window, 1 ms, for the current document; the server's window untouched) and, before typing the code, `afterTotpStep(spentStep)`, with `spentStep = totpStep()` read as `signInJobSuperAdmin` returns: a factor accepts each code once, and the injected session's own verification spent the current step's code. Both live in e2e/helpers/ui.ts; `totpStep` in e2e/helpers/totp.ts.

## Cursor bundle 4 — a setup that survives a reload (INC-1147, second class)

The provider gives a TOTP setup's secret once, so a reload (or a second tab) in the middle of a setup left a pending factor that the page could neither show again nor finish, and the next start answered "a factor with this name exists". Now:

- **`listFactors`** (`mfa-service.ts`) returns the verified factors as `factors` and the provider's unverified TOTP factors as `pending`; a failed read is a failure, never an empty list.
- **`clearPendingFactors`** unenrols exactly the `pending` factors of that same read (a verified factor is never touched, and removing one still asks the second factor). **`enrollTotp`** calls it first and makes no enrolment when the clear or the read failed (`mfa.errorClearFailed`, family word `clearFailed`).
- **`MFA_ENROLL_REFUSALS`** is the confirmation's own family: `mfa_factor_not_found` (the setup a newer start replaced) says `mfa.errorSetupReplaced`; a step-up or a removal meeting a missing factor keeps the generic line.
- **Settings card** (`use-mfa.ts`, `settings.tsx`): `unfinished` (the provider holds a setup this screen does not) shows `mfa.setupInProgress` and the Start again button (`mfa-start-again`) in place of Enable; a failed list is `readFailed` with no factors, an error on the card, never "off".

Proofs: MSV-6..MSV-9 (`mfa-service.test.ts`), MFH-1..MFH-4 (`use-mfa.test.ts`), MF-10 (reload mid-setup, Start again confirms), MF-11 (a replaced setup says so; the newer one confirms).

## The staff second-factor gate (cursor bundle 6; DEC-434, DEC-451, DEC-461, DEC-465)

A staff screen opens only for a staff account with a verified second factor, in a session that used it (assurance level aal2). `src/features/auth/mfa/staff-factor.ts` (`readStaffFactor`: failed, setupNeeded, codeNeeded or ready; a missing, failed or unverified factor never reads as ready) and `staff-factor-gate.tsx` (the setup panel, the code panel, the failure) are mounted in the admin layout (`src/routes/admin.tsx`) through `staff-factor-gate-lazy.tsx` (`resilientLazy`, in place, so no member page and no first download carries the gate): the layout draws its body through the gate once the permission read says the person is staff, and nothing of a staff screen is drawn before the gate says ready. Proofs: AG-U1..AG-U5 (unit), STAFF-E1 and STAFF-E2 (`e2e/staff-gate.spec.ts`).

The server is the authority. A non-member permission self-check is true only at aal2 with a verified TOTP factor (`has_permission_core`, `staff_session_holds`, DEC-461); `door_context`'s staff classes refuse an aal1 session with P0009. The routes ask `my_permission_answer(resource, action)` through `callerHasPermission` (src/server/supabase/user-client.ts) — `denied`, `allowed`, `stepUp` or `stepUpNoFactor` — and answer 403 for `denied` and 428 (`stepUpRequired`, with `noFactor` for the setup case) for the step-up words (src/server/route.ts, DEC-465). Proof: STAFF-E3 (`e2e/category-image-routes.spec.ts`): an aal1 staff session reads 428 on a staff route and nothing is written.

What a staff session at aal1 sees outside the gate: the admin menu's alert read (`useNavAlerts`) is not asked until the session is aal2, and the shell's admin crumbs (`admin-detail-crumbs.tsx`) read only what the page's own query filled (`cacheOnly`), so neither makes a staff read nor draws a failure. Proofs: NAV-ALERT-1, ADC-1, ADC-2.

Policies that ask `has_permission` wrap it as `(SELECT public.has_permission(…))`, so it runs once per query, not once per row; CF-RLS-1 (`scripts/conformance/rls-initplan.test.ts`) reads the standing policies and fails one that does not. Since cursor-bundle-7a (Part 3, INC-1283) the same holds for the four calls the Supabase performance advisor's `auth_rls_initplan` lint names — `auth.uid()`, `auth.jwt()`, `auth.role()` and `current_setting(` — wrapped as `(SELECT auth.uid())`; a call inside the arguments of a wrapped permission call is wrapped with it, a call inside any other subquery is bare. The nine owner-read policies that called `auth.uid()` bare are changed by `ALTER POLICY` (migration C of the bundle) and the policy reader (`scripts/doors/policies.ts`) reads `ALTER POLICY`.

## Cursor bundle 7a — a failed factor read is a failure, not "no factor" (INC-1299)

`useStepUp.open` now tells two cases apart. A read that ANSWERED with no factor (the factor is gone)
keeps the `no-factor` mode: the dialog explains and links to Settings, and the guarded action is
released as `StepUpUnavailable`. A read that FAILED opens the `read-failed` mode: the dialog says
`mfa.errorGeneric` with a Retry (`common.retry`, test id `step-up-retry`), the action stays parked, a
Retry (`useStepUp().retry`) reads the factors again, and Cancel settles the action as
`StepUpCancelled`. No new string. Tests: `use-step-up.test.ts` SUH-1 → 3 (the hook), the dialog's
SUD-3 and SUD-4 (`step-up-dialog.test.tsx`).

## Cursor bundle 7b — the gate reads the session's level, not the client (INC-1291)

The staff gate and the menu's alert read no longer load the database client to learn the session's level. `src/features/auth/mfa/session-level.ts` reads the level from the token's own `aal` claim (`readSessionLevel`) and the verified factors from one GET of the auth server's user record (`readVerifiedFactors`); `mfa-service.ts` keeps the enrol, challenge and verify calls and arrives on demand, only when a code is typed (`stepUpWithCode` through `loadOnce`). A read that fails is a typed failure (`readFailed`, from the reader that arrives on demand), never "no factor": `readStaffFactor` answers `{ phase: "failed", error }`, and the gate draws the one failure notice (`admin-factor-read-failed`) with Retry. The admin pages' first download shrank by about 53 KiB where the client was carried only by the gate (/admin, /admin/, /admin/images, /admin/impersonation\_/$sessionId; their ceilings fall, scripts/route-budgets.mjs). Proofs: `session-level.test.ts`, AG-U\* (`staff-factor-gate.test.tsx`), `nav-alerts.test.tsx`.
