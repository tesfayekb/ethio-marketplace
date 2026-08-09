# Feature: RBAC client seam (Phase R3)

The client half of the RBAC core built in R1/R1a/R2/R2b.

## Files

| File                                      | Role                                                               |
| ----------------------------------------- | ------------------------------------------------------------------ |
| `src/features/permissions/service.ts`     | `fetchMyPermissions()` → `get_my_permissions()` RPC; `resource:action` slugs. Throws on error (law F4 — a failed read is never "no permissions"). |
| `src/features/permissions/usePermissions.ts` | TanStack Query wrapper. Key `['my-permissions']`, `staleTime` 5 min, `gcTime` 10 min, `retry` 1, `enabled` opt-out. |
| `src/routes/admin.tsx`                    | `/admin` landing. Gate = REDIRECT to `/`, never a dead-end denial page. `noindex`. |
| `scripts/check-browse-imports.sh`         | CI guard: the seam may not be imported outside the allowlist.       |
| `e2e/rbac.spec.ts`                        | R-1 logged out, R-2 regular user, R-3 staff user.                   |

## Gating

`app-shell.tsx` computes `auth.isAdmin` from `admin_panel:access`; `panelsForUser`
then appends the Admin panel and `panel-tabs` renders the tab. `visibleItems`
continues to drop items whose `requiredPermission` is absent.

**Law F3 still governs.** Everything here decides what the UI RENDERS. The
server (RLS / `has_permission`) is the sole authorization authority, re-proved
per deploy by the Phase R3 function-matrix migration.

## Request budget

- Signed-out visitor: **zero** RBAC requests (`enabled: false`).
- Signed-in user: **one** cached RPC per session, shared by shell and `/admin`.

### Allowlist deviation (recorded)

The build plan scoped the guard allowlist to the seam plus the admin chunk. The
Admin TAB cannot be revealed without knowing the permission, so
`src/components/app-shell.tsx` is a third, explicit allowlist entry, and a
signed-in regular user therefore makes one RBAC read. The zero-cost guarantee
holds absolutely for anonymous marketplace traffic, which is the first-paint
path the performance strategy protects.

## Function-matrix proof migration

A schema-free migration of `DO`-block assertions that fails the deploy on any
RBAC regression: super-admin sees every permission; a base user sees no
`admin_panel:access`; a base user cannot assign roles; `super_admin` is not
assignable through `assign_role`; `log_audit`/`is_super_admin` stay
non-executable by `anon`/`authenticated` while `get_my_permissions` stays
reachable; `audit_log` refuses UPDATE. Principals are looked up dynamically
(INC-064 portability rule).
