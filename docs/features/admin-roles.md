# Feature: Roles & Permissions console (Phase U2)

The staff surface over the RBAC core built in Phase R. Nothing here is an
authorization decision: every read and write is a definer RPC that re-checks
`has_permission(auth.uid(), 'roles', …)` and, for mutations,
`require_step_up_if_needed('roles', …)` (INC-081's two-condition law).

## Migration

`supabase/migrations/20260822050500_29f67c37-19c5-4d52-a69e-a0fdfd6ef608.sql`
(self-marking, version `20260822050500`).

**Seeds**

- `roles:view` → `admin` (the U1 handed-forward item).
- `requires_step_up = true` on `roles:create` (assign/update/delete already true).
- DEC-016 registration, granted to NO role: `profiles:create`, `profiles:delete`,
  and the new resource `impersonation` with action `use` — all three
  `requires_step_up = true`. Flows ship at Ops/U3; the super-admin short-circuit
  applies.

**RPCs** (all `SECURITY DEFINER`, `REVOKE ALL FROM PUBLIC, anon`,
`GRANT EXECUTE TO authenticated`)

| Function                       | Gate                     | Audit                    |
| ------------------------------ | ------------------------ | ------------------------ |
| `admin_list_roles_detailed()`  | `roles:view`             | —                        |
| `admin_get_role(id)`           | `roles:view`             | —                        |
| `admin_create_role(…)`         | `roles:create` + step-up | `role.create`            |
| `admin_update_role(…)`         | `roles:update` + step-up | `role.update` (old→new)  |
| `admin_delete_role(id)`        | `roles:delete` + step-up | `role.delete`            |
| `admin_set_role_permission(…)` | `roles:update` + step-up | `role.permission_change` |

The RPCs raise clean, matchable messages (`system roles are immutable`,
`role has members`, `core permission locked`) BEFORE the R1 triggers
(`roles_system_lock`, `role_permissions_core_lock`) would raise their own. The
triggers remain the authority — the RPC messages never weaken them.

**Proofs P1–P8** ran inside the migration with dynamically looked-up principals
(INC-064) and a scratch role that is cleaned up: base user denied; admin lists;
create at aal1 refused; create at simulated aal2 succeeds + audits; system role
update refused; system role permission change refused; delete-with-members
refused then delete-after-revoke succeeds; the three DEC-016 permissions exist
with `requires_step_up = true` and zero role grants.

## Client

| File                                             | Role                                                |
| ------------------------------------------------ | --------------------------------------------------- |
| `src/features/admin/roles/roles-service.ts`      | RPC seam + `roleErrorKey()` refusal→translation map |
| `src/features/admin/roles/use-admin-roles.ts`    | Query/mutation hooks under `AUTH_DERIVED_ROOT`      |
| `src/features/admin/roles/roles-list.tsx`        | DataTable list + create-role FormSection            |
| `src/features/admin/roles/role-detail.tsx`       | Meta, members, danger zone                          |
| `src/features/admin/roles/permission-matrix.tsx` | Matrix grouped by resource with the locks           |
| `src/routes/admin.roles.tsx`                     | Section index                                       |
| `src/routes/admin.roles_.$roleId.tsx`            | Detail route (flat `_` convention)                  |
| `src/components/shell/breadcrumbs.tsx`           | `Roles & Permissions > <display name>` 4th segment  |

Locks in the UI mirror the server: a system role replaces every control with a
locked state; a granted `is_core` row is locked individually. Deletion is
double-guarded — disabled while `member_count > 0`, and otherwise armed only by
typing the role key (a destructive structural action; the U0k one-click ruling
covered non-destructive sign-out).

Mutation principals today: only `super_admin` holds `roles:create/update/delete`
(the U2 seed granted `admin` `roles:view` alone), so an `admin` sees a read-only
console until an operator grants more.

## E2E

`e2e/admin-roles.spec.ts` — RP-1 gating (moderator refused, admin reads,
signed-out deep link redirects); RP-2 create through step-up; RP-3 grant/revoke
persisted across reload; RP-4 system lock in UI and RPC; RP-5 delete guards +
typed confirm; RP-6 revocation path (factor unenrolled → the RPC refuses);
RP-7 DEC-016 rows render as grantable; RP-8 Amharic sweep + no horizontal
overflow at every viewport.

## Known deviation (recorded)

The Members card links to `/admin/users` WITHOUT a preselected role filter: the
users list holds its filter in component state, not in the URL, and
`src/routes/admin.users.tsx` / `users-list.tsx` are outside this task's scope.
Making the filter a URL search param is the follow-up.
