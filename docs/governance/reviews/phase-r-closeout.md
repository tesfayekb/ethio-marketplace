# Phase R (RBAC core) — G19 close-out review · 2026-08-09

## Security

Deny-by-default from birth on all six RBAC tables. Five trigger laws proven behaviorally on prod and staging: system-lock, core-lock, last-superadmin, cascade-aware base-role, append-only audit. Privilege escalation refused live (base user cannot assign; super_admin unassignable via RPC even by a superadmin). Audit trail unforgeable both directions: no direct client writes (INC-062 closed; definer-grant CI guard, proven-to-fail) and no rewrites (append-only, superadmin included). Two vulnerabilities found and closed inside the phase (INC-062 executor-found, INC-063 supervisor spec error). Residual, tracked: requires_step_up dormant until 2FA; audit retention design deferred to Ops with default-deny standing.

## Functionality

Complete function matrix behaviorally proven, nothing asserted-only: has_permission both outcomes through RLS and UI; get_my_permissions exact-set assertions; assign_role/revoke_role success + deny paths with censused audit-row shapes; promote path gated; super_admin/user unassignable through the RPC; signup auto-assign + full backfill; fail-loudly bootstrap witnessed on staging. Role CRUD per ruling: system roles immutable to all, staff roles editable, roles-as-data extensible. E2E R-1/2/3 on every push.

## Performance

Anonymous path provably untouched: zero expression changes on any public-read policy (census-diffed); E2E R-1 asserts zero RBAC network calls for visitors; browse-path import guard makes regression a CI failure. Signed-in users: one cached RPC per session (5-min TTL). Admin UI code-splits behind /admin. Bundle ceiling green throughout.

## Usability

Admin discovery = a tab that appears with permission; denial = redirect, never a dead end; EN+AM strings, hardcoded-string scan enforcing. Operator ergonomics: fail-loudly bootstrap, skip-loudly env-agnostic probes, one-line verdicts on every staging step.

## Handed forward (named)

Per-command RBAC policies' first non-superadmin consumer = C4 console. Realtime cache invalidation deferred (TTL acceptable until the console). Admin panel body = Phase C. requires_step_up enforcement = 2FA at launch-gate. Audit retention = Ops. Staging proof-migration runs = final gate item.
