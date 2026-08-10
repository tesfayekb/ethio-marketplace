# Admin shell & navigation (Phase U0)

The admin epoch's frame: a permission-gated layout route, a section register that
is the single source of truth for nav/breadcrumbs/deep-link guarding, and one
i18n'd empty-state page per section. No section functionality ships in U0.

## Routes

| Route              | File                             | Purpose                                    |
| ------------------ | -------------------------------- | ------------------------------------------ |
| `/admin`           | `src/routes/admin.tsx`           | Layout: gate, sidebar (md+), `<Outlet />`   |
| `/admin`           | `src/routes/admin.index.tsx`     | Landing: permitted-section cards or empty   |
| `/admin/users`     | `src/routes/admin.users.tsx`     | Section empty state (U2)                    |
| `/admin/roles`     | `src/routes/admin.roles.tsx`     | Section empty state (U2)                    |
| `/admin/audit`     | `src/routes/admin.audit.tsx`     | Section empty state (U3)                    |
| `/admin/locations` | `src/routes/admin.locations.tsx` | Section empty state (U4)                    |
| `/admin/categories`| `src/routes/admin.categories.tsx`| Section empty state (U5)                    |
| `/admin/attributes`| `src/routes/admin.attributes.tsx`| Section empty state (U6)                    |
| `/admin/images`    | `src/routes/admin.images.tsx`    | Section empty state (U8)                    |

## Section → permission map

Source of truth: `src/features/admin/sections.ts` (`ADMIN_SECTIONS`).

| Section id   | Path                | Permission         |
| ------------ | ------------------- | ------------------ |
| `users`      | `/admin/users`      | `profiles:view`    |
| `roles`      | `/admin/roles`      | `roles:view`       |
| `audit`      | `/admin/audit`      | `audit_logs:view`  |
| `locations`  | `/admin/locations`  | `locations:manage` |
| `categories` | `/admin/categories` | `categories:manage`|
| `attributes` | `/admin/attributes` | `categories:manage`|
| `images`     | `/admin/images`     | `categories:manage`|

TAGS (REQ-041) is intentionally absent: it gets its own resource and permission
in U7 and must never be gated on a borrowed permission.

### `roles:view` posture

The seeded `admin` role does **not** hold `roles:view`; only the superadmin
short-circuit reaches the Roles section today. This is a deliberate default-deny,
not a seed bug — role administration is the privilege-escalation surface. It is
grantable later through the U2 role console itself. Consequence: an `admin`
fixture sees six of the seven sections.

## Gating behaviour

- Entry gate: `/admin` requires `admin_panel:access`. Missing → **redirect** to
  `/`, never a dead-end denied page.
- Deep-link guard: a section route resolves only if the user holds that
  section's permission; otherwise the layout redirects to `/admin` and the
  landing renders a translated refusal notice (`admin-access-notice`), cleared
  as soon as a permitted section is opened.
- While auth/permissions settle, the layout renders a polite loading status —
  no flash of sections.
- Law F3: all of the above governs what the UI **renders**. RLS and
  `has_permission()` on the server remain the only authorization authority.

## Layout

- 360px: landing renders full-width tappable cards (`min-h-16`, ≥44px targets);
  inside a section, a `Back` affordance replaces nav (`md:hidden`).
- md+: a 56-unit sidebar renders the same section list with active styling; the
  section body sits in the flexible column.
- All spacing/colour via design tokens; logical properties only (`text-start`,
  `ms-*`/`me-*`); every string comes from `src/i18n/locales` (EN + AM).

## Testid inventory

| Testid                          | Rendered by             |
| ------------------------------- | ----------------------- |
| `admin-panel-root`              | `admin.tsx` layout      |
| `admin-nav-cards`               | `admin-nav.tsx` (cards; absent when zero sections) |
| `admin-nav-sidebar`             | `admin-nav.tsx` (sidebar; absent when zero sections) |
| `admin-section-link-<id>`       | `admin-nav.tsx` cards   |
| `admin-nav-link-<id>`           | `admin-nav.tsx` sidebar |
| `admin-breadcrumb`              | `admin-breadcrumb.tsx`  |
| `admin-landing`                 | `admin.index.tsx`       |
| `admin-no-sections`             | `admin.index.tsx`       |
| `admin-access-notice`           | `admin.index.tsx`       |
| `admin-section-<id>`            | `section-page.tsx`      |
| `admin-section-back`            | `section-page.tsx`      |
| `panel-tab-admin`               | `shell/panel-tabs.tsx` (`panel-tab-${panel.id}`) |

## E2E coverage (`e2e/admin-shell.spec.ts`)

- **A-1 admin fixture** — expected sections are derived from the live seed
  (`roles → role_permissions → permissions`), so seed drift fails loudly rather
  than silently changing what the test proves. Asserts card count, each link,
  section page + breadcrumb, a deep link into a second permitted section, and a
  refusal (redirect + notice) for a section the role lacks.
- **A-2 moderator fixture** — asserts the seed grants zero sections, the Admin
  tab still shows (`admin_panel:access`), the landing shows `admin-no-sections`
  with both nav containers absent, and `/admin/users` is refused.
- **A-3 regular user** — `/admin` redirects home; no admin tab logged out.

Fixtures are minted per test via the service role; `grantRole` uses a plain
INSERT (matching `e2e/rbac.spec.ts`) because the `user_roles` UNIQUE is
`(user_id, role_id, scope_type, scope_country)` and each fixture user is fresh.
