# Admin — Users (Phase U1)

The staff surface for people: who exists, what state their account is in, what
roles they hold, and what they have done.

## Resource decision

`profiles` **is** the users resource in v1. No `users` resource row was created;
every gate in this feature reads `profiles:view` (reads) or `profiles:update`
(status writes), and role changes ride the existing `roles:assign` permission.

## Database (migration `phase_u1_users`)

Rider on `public.profiles`:

- `account_status text NOT NULL DEFAULT 'active'` — CHECK `('active','deactivated')`
- `status_changed_at timestamptz`
- `status_reason text`

Trigger `profiles_status_guard` (BEFORE UPDATE OF `account_status`):

1. a super admin can never be deactivated;
2. nobody may deactivate themselves (self-deletion is a later, different flow);
3. `status_changed_at` is stamped on every status write.

Seam enforcement — the write seams refuse a deactivated caller with
`account is deactivated`:

- `public.submit_listing(...)` (the single listing write path)
- `public.transition_listing(...)` (the state machine)

No other user-write RPC exists today; `confirm_home_country` and the profile
self-update path are identity, not content, and are intentionally untouched.

Staff RPCs (all `SECURITY DEFINER`, `REVOKE ALL … FROM PUBLIC, anon` +
`GRANT EXECUTE … TO authenticated`, each with its own `has_permission` gate):

| Function                                          | Gate                            | Purpose                                          |
| ------------------------------------------------- | ------------------------------- | ------------------------------------------------ |
| `admin_list_users(search,status,role,limit,off)`  | `profiles:view`                 | paged list + `total_count`, email from auth      |
| `admin_get_user(user_id)`                         | `profiles:view`                 | one user + contact flags + last sign-in          |
| `admin_set_account_status(user_id,status,reason)` | `profiles:update`               | status write + `log_audit('user.status_change')` |
| `admin_user_activity(user_id,limit)`              | `profiles:view`                 | per-user audit rows                              |
| `admin_list_roles()`                              | `profiles:view` OR `roles:view` | role options for filter/assignment               |
| `admin_update_profile(user_id,name,alias,cc)`     | `profiles:update` + step-up     | edit + `log_audit('user.profile_edit')`          |

`admin_list_users` / `admin_get_user` are the ONLY path that exposes an email
address to staff, and only behind `profiles:view`.

The global audit viewer (U3) keeps `audit_logs:view`; a per-user activity strip
inside the user's own record rides `profiles:view` on purpose.

### In-migration proofs

P1 base user → `permission denied` · P2 super admin → rows + `total_count` ·
P3 status change applied + audit row · P4 super admin cannot be deactivated ·
P5 self-deactivation refused · P6 `submit_listing` refuses a deactivated
account. Read-backs assert `anon` cannot execute any new RPC, `authenticated`
can, and the guard function is executable by neither.

## UI

- `src/features/admin/users/admin-users-service.ts` — RPC-only client seam.
  No cross-user table read exists anywhere in the browser.
- `src/features/admin/users/use-admin-users.ts` — query/mutation hooks +
  300 ms search debounce.
- `src/features/admin/users/users-list.tsx` — search, status and role filters,
  stacked cards at 360px, a table from `md`, pagination (25/page), i18n
  loading/empty/error states.
- `src/features/admin/users/user-detail.tsx` — identity, status (reason field
  required to deactivate), roles (assign/remove via the audited RPCs, system
  roles shown locked), activity.
- Routes: `src/routes/admin.users.tsx` (list) and
  `src/routes/admin.users_.$userId.tsx` (detail, flat non-nested convention).

Defence in depth: every action button is hidden without the permission AND
refused server-side by the RPC gate.

## E2E

`e2e/admin-users.spec.ts` — AU-1 permission, AU-2 search/filter, AU-3 status
with required reason + audit, AU-4 role assign/remove, AU-5 the write seam from
the deactivated account's own browser session, AU-6 base user refused by
`admin_set_account_status`.

## Known gap

The detail breadcrumb reads `Home › Admin › Users`; adding the user's name as a
fourth segment requires an edit to the shell breadcrumb component, which was
out of this task's scope. The self-serve "your account is deactivated" banner in
Settings is likewise deferred — `src/routes/settings.tsx` was outside scope.

## U1g — Edit user

Migration `20260817061418_a3ef929c-0881-42a5-b6ed-bb68855d5ce2.sql` adds
`public.admin_update_profile(p_user_id, p_display_name, p_seller_alias,
p_home_country_code)`. It checks `has_permission(auth.uid(),'profiles','update')`
FIRST, then `require_step_up_if_needed('profiles','update')` (U1f law), writes
only those three columns, and audits `user.profile_edit` with the changed
fields as `old → new`. Validation is the profile's own constraints (alias
format + case-insensitive uniqueness) plus "the country exists and is active";
the duplicate alias is surfaced as the matchable message
`seller alias already taken` (SQLSTATE 23505) and mapped to a translated inline
error by `profileEditErrorKey`.

In-migration proofs: P1 base user → `permission denied` · P2 staff at `aal1` →
`step-up required` · P3 staff at `aal2` → applied + audit row (scratch user,
restored) · P4 duplicate alias refused, including case-insensitively.

UI: an "Edit profile" `FormSection` (2 columns from `md`) on the detail page —
display name, seller alias, home country. It is hidden without
`profiles:update`, and hidden on your OWN record (same rule as the status
controls: staff edit themselves in Settings). Save runs through the same
`StepUpGate` guard as the other sensitive actions.

E2E additions: AU-9 edit applies and is audited, AU-10 duplicate alias → inline
error with no change, AU-11 own row shows no form. AU-3/AU-4/AU-5 were
re-anchored to the step-up world with the shared `enrollAndStepUp` /
`stepUpIfPrompted` / `expectAal2` helpers in `e2e/helpers/ui.ts`.

## Parity register (Apex vs ethio v1)

| Capability              | State                                          |
| ----------------------- | ---------------------------------------------- |
| List / detail           | built (U1)                                     |
| Deactivate / reactivate | built (U1, step-up gated)                      |
| Roles assign / revoke   | built (U1, step-up gated, audited)             |
| Per-user activity       | built (U1)                                     |
| Edit profile            | built (U1g, step-up gated, audited)            |
| Invite / create user    | registered later — Ops + a U2 permission       |
| Delete user             | registered later — GDPR flow + a U2 permission |
| Impersonation           | registered later — U3, with guardrails         |
| Bulk actions            | registered later — on need                     |
