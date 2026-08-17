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
