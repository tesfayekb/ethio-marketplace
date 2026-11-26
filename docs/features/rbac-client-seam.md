# Feature: RBAC client seam (Phase R3)

The client half of the RBAC core built in R1/R1a/R2/R2b.

## Files

| File                                         | Role                                                                                                                                              |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/features/permissions/service.ts`        | `fetchMyPermissions()` → `get_my_permissions()` RPC; `resource:action` slugs. Throws on error (law F4 — a failed read is never "no permissions"). |
| `src/features/permissions/usePermissions.ts` | TanStack Query wrapper. Key `['my-permissions']`, `staleTime` 5 min, `gcTime` 10 min, `retry` 1, `enabled` opt-out.                               |
| `src/features/permissions/use-may-call.ts`   | `useMayCall`: whether the person may call a named door or route, from the generated permissions (INC-1281, below).                                |
| `src/routes/admin.tsx`                       | `/admin` landing. Gate = REDIRECT to `/`, never a dead-end denial page. `noindex`.                                                                |
| `scripts/check-browse-imports.sh`            | CI guard: the seam may not be imported outside the allowlist.                                                                                     |
| `e2e/rbac.spec.ts`                           | R-6 logged out, R-7 regular user, R-8 staff user.                                                                                                 |

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

## A control shows what its door allows (cursor-bundle-7c Part 3, INC-1281)

A control that calls a door or a route asks `useMayCall`
(`src/features/permissions/use-may-call.ts`), never a copy of the permission's slug:
`mayCall({ door })` reads the door's permission from the manifest, and
`mayCall({ route, method })` reads the route's own declaration (its
`auth: { staff: { resource, action } }`, or its import family's `permission` in
`src/server/imports/registry.ts`). A route that declares none is OPEN and answers yes. While
the permissions load, or when their read failed, nothing permissioned is allowed, and `error`
is passed on as `usePermissions` gives it.

- The data is generated: `bun scripts/doors/door-types.ts` writes
  `src/features/permissions/door-permissions.generated.ts` (`DOOR_PERMISSIONS`, each door's
  permission and step-up cell; `ROUTE_PERMISSIONS`, each API route's permission by method,
  `null` for OPEN) from `scripts/doors/manifest.txt` and `src/routes/api/**`. A handler the
  reader cannot read, a `staff` block it cannot read or an import family the registry lacks
  stops the generator; DW-1 fails on drift.
- A door the manifest lacks, a door that asks no permission, a route that is not one, or a
  method the route lacks does not type (DPM-3).
- The module rides admin chunks only: `MUST_STAY_LAZY_MODULES` (BC-17) names it.
- Every other permission comparison in browser code (a slug or a `*_PERMISSION` constant
  handed to `.includes` / `.has` / `has`, a manifest permission compared by `===` / `!==`, a
  `permission:` property) carries a line of `scripts/conformance/door-permissions-allowlist.txt`
  (DPM-1, keyed `<file> <slug>`, `#2` … for repeats). Control comparisons and reads' switches
  are `until INC-1281` (Lovable 10b part 2 moves them onto the hook); page, section and link
  gates (`sections.ts`, `ADMIN_PANEL_PERMISSION`, a link to another page) read the page's own
  permission, not a door's, and are `permanent`.
- The browse-path guard (`scripts/check-browse-imports.sh`) admits the seam in itself,
  `src/routes/admin.tsx` and `app-shell.tsx`, and, from a module of `src/features/admin/` or of a
  `src/features/admin-<name>/` folder, an import of the hook alone (cursor-bundle-7c ruling 2):
  any other import of the seam from there, and the hook from anywhere else, fails.
  `scripts/check-browse-imports.test.ts` (BPG-1…4) runs it on the fixtures under
  `scripts/fixtures/browse-imports/`.

## Function-matrix proof migration

A schema-free migration of `DO`-block assertions that fails the deploy on any
RBAC regression: super-admin sees every permission; a base user sees no
`admin_panel:access`; a base user cannot assign roles; `super_admin` is not
assignable through `assign_role`; `log_audit`/`is_super_admin` stay
non-executable by `anon`/`authenticated` while `get_my_permissions` stays
reachable; `audit_log` refuses UPDATE. Principals are looked up dynamically
(INC-064 portability rule).
