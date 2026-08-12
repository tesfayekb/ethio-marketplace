# Admin shell & navigation (Phase U0)

The admin epoch's frame: a permission-gated layout route, a section register that
is the single source of truth for nav/breadcrumbs/deep-link guarding, and one
i18n'd empty-state page per section. No section functionality ships in U0.

## Routes

| Route               | File                              | Purpose                                   |
| ------------------- | --------------------------------- | ----------------------------------------- |
| `/admin`            | `src/routes/admin.tsx`            | Layout: gate, sidebar (md+), `<Outlet />` |
| `/admin`            | `src/routes/admin.index.tsx`      | Landing: permitted-section cards or empty |
| `/admin/users`      | `src/routes/admin.users.tsx`      | Section empty state (U2)                  |
| `/admin/roles`      | `src/routes/admin.roles.tsx`      | Section empty state (U2)                  |
| `/admin/audit`      | `src/routes/admin.audit.tsx`      | Section empty state (U3)                  |
| `/admin/locations`  | `src/routes/admin.locations.tsx`  | Section empty state (U4)                  |
| `/admin/categories` | `src/routes/admin.categories.tsx` | Section empty state (U5)                  |
| `/admin/attributes` | `src/routes/admin.attributes.tsx` | Section empty state (U6)                  |
| `/admin/images`     | `src/routes/admin.images.tsx`     | Section empty state (U8)                  |

## Section → permission map

Source of truth: `src/features/admin/sections.ts` (`ADMIN_SECTIONS`).

| Section id   | Path                | Permission          |
| ------------ | ------------------- | ------------------- |
| `users`      | `/admin/users`      | `profiles:view`     |
| `roles`      | `/admin/roles`      | `roles:view`        |
| `audit`      | `/admin/audit`      | `audit_logs:view`   |
| `locations`  | `/admin/locations`  | `locations:manage`  |
| `categories` | `/admin/categories` | `categories:manage` |
| `attributes` | `/admin/attributes` | `categories:manage` |
| `images`     | `/admin/images`     | `categories:manage` |

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

## Layout (U0b, INC-069)

Section navigation lives in the SHELL, exactly like Account and My Listings:
`src/features/admin/rail-items.ts` derives `ADMIN_NAV_ITEMS` from
`ADMIN_SECTIONS` (icons only are added) and `src/config/panels.ts` spreads them
into the `admin` panel's `items`. The rail's existing `visibleItems()` filter
uses the permissions the shell has ALREADY fetched — no new read. Zero
permitted sections → the panel simply shows no items.

- 360px: the drawer lists the permitted sections; the landing still renders
  full-width tappable cards (`min-h-16`, ≥44px targets) as its index content;
  inside a section, a `Back` affordance remains (`md:hidden`).
- md+: the shell rail lists the sections with active styling on the current
  one. The page-internal sidebar is REMOVED (`admin-nav-sidebar` no longer
  exists); `/admin` renders only the section body.
- All spacing/colour via design tokens; logical properties only (`text-start`,
  `ms-*`/`me-*`); every string comes from `src/i18n/locales` (EN + AM).

## Testid inventory

| Testid                     | Rendered by                                        |
| -------------------------- | -------------------------------------------------- |
| `admin-panel-root`         | `admin.tsx` layout                                 |
| `admin-nav-cards`          | `admin-nav.tsx` (cards; absent when zero sections) |
| `admin-section-link-<id>`  | `admin-nav.tsx` cards                              |
| `rail-item-ad-<id>`        | `shell/app-rail.tsx` (rail + drawer section items) |
| `breadcrumbs`              | `shell/breadcrumbs.tsx` (the ONLY breadcrumb nav)  |
| `breadcrumb-admin`         | `shell/breadcrumbs.tsx` (Admin segment)            |
| `breadcrumb-admin-section` | `shell/breadcrumbs.tsx` (current section)          |
| `drawer-panel-switcher`    | `shell/panel-switcher.tsx` (mobile drawer header)  |
| `admin-landing`            | `admin.index.tsx`                                  |
| `admin-no-sections`        | `admin.index.tsx`                                  |
| `admin-access-notice`      | `admin.index.tsx`                                  |
| `admin-section-<id>`       | `section-page.tsx`                                 |
| `panel-tab-admin`          | `shell/panel-tabs.tsx` (`panel-tab-${panel.id}`)   |

## E2E coverage (`e2e/admin-shell.spec.ts`)

- **A-1 admin fixture** — expected sections are derived from the live seed
  (`roles → role_permissions → permissions`), so seed drift fails loudly rather
  than silently changing what the test proves. Asserts card count, each link,
  section page + breadcrumb, a deep link into a second permitted section, and a
  refusal (redirect + notice) for a section the role lacks. U0b adds: drawer
  items + tap-to-navigate (mobile), rail items + active highlight (desktop),
  and `admin-nav-sidebar` absent on both viewports.
- **A-2 moderator fixture** — asserts the seed grants zero sections, the Admin
  tab still shows (`admin_panel:access`), the landing shows `admin-no-sections`
  with the nav container absent, zero admin items in the rail/drawer, and
  `/admin/users` refused.
- **A-3 regular user** — `/admin` redirects home; no admin tab logged out.

Fixtures are minted per test via the service role; `grantRole` uses a plain
INSERT (matching `e2e/rbac.spec.ts`) because the `user_roles` UNIQUE is
`(user_id, role_id, scope_type, scope_country)` and each fixture user is fresh.

## U0c — operator render-walk refinements (2026-08-12)

- **One breadcrumb.** `src/features/admin/admin-breadcrumb.tsx` is DELETED.
  Admin routes feed the shell breadcrumb seam (`shell/breadcrumbs.tsx`), which
  derives its segments from the route (INC-058): `Home > Admin` on `/admin`,
  `Home > Admin > <Section>` inside a section. Home and Admin are links; the
  current segment is not a link and is emphasized (underline + heavier weight,
  `aria-current="page"`).
- **No Back button.** `admin-section-back` is gone at every width — the Admin
  breadcrumb segment is the way back.
- **Drawer.** The mobile drawer heads with the ACTIVE panel's name plus a
  panel-switcher dropdown (auth-filtered exactly like the top tabs, ≥44px
  target, `shell.switchPanel`). Below it: only the active panel's items
  (permission filtering unchanged). The stacked all-panels list is removed;
  sign out stays pinned at the bottom. A single-panel (logged-out) drawer shows
  the heading without a trigger.

## U0d — landing cards + panel-header band (2026-08-12, INC-070)

- **Landing cards (standing rule).** `/admin` presents its permitted sections
  as clickable cards in the body (`AdminNav`, `admin-nav-cards`), each carrying
  the section title and its "arrives in Un" description. A-1 now asserts both
  texts per card, derived from the live seed permissions.
- **Panel-header band.** `src/components/shell/panel-header.tsx` is the single
  panel-identity component: the active panel's name plus the switcher dropdown
  (`panelsForUser`, ≥44px targets, rail/drawer stays open, heading-only when a
  single panel is visible). Surface token: `bg-sidebar-accent/40` — the sidebar
  token family, never `bg-muted` (INC-042).
- **Placement.** Rendered as its own band directly BELOW the logo cell in the
  md+ rail and the mobile drawer identically. The logo cell's geometry,
  background and height are untouched, so the corner-block / one-band top-bar
  invariants hold unmodified. On the collapsed desktop rail the band is hidden.
- **Superseded.** `src/components/shell/panel-switcher.tsx` is DELETED — fully
  replaced by `PanelHeader`. Test hooks re-anchored: `drawer-panel-title` →
  `panel-header-title`, `drawer-panel-switcher` → `panel-header-switcher`,
  `drawer-panel-option-*` → `panel-header-option-*`.

## U0e — panel activation is navigation (INC-071)

Every panel in `src/config/panels.ts` carries a `homePath`: Marketplace `/`,
Account `/settings`, Admin `/admin`, My Listings `null` (no route until its own
build lands). Both activation surfaces — the top panel tabs
(`src/components/shell/panel-tabs.tsx`) and the rail/drawer panel header
(`src/components/shell/panel-header.tsx`) — call the single
`useSwitchPanel()` helper in `src/components/shell/use-switch-panel.ts`, which
navigates to `homePath`. Only a `null`-homePath panel still uses the legacy
`setActivePanel` state path, marked with an INC-071 grandfather comment.

Consequence: `/admin` is the ONLY admin rendering. The former state-path admin
body (the "coming in its own feature" placeholder) is deleted; the placeholder
now renders solely for My Listings on the feed route.

The mobile drawer stays OPEN through a panel switch: the Sheet closes only when
`navOpen` is set false, which navigation alone does not do. Its logo block
mirrors the top bar — same `h-14` height, same `border-b border-border`
divider.
