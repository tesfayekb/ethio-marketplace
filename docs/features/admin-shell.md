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

## U0f — fixed panel header, scrollable item region

`src/components/shell/app-rail.tsx` renders three regions in both the md+ rail
and the mobile drawer, identically:

1. Fixed head — the logo cell (rail, grid row 1) / logo block (drawer) and the
   `PanelHeader` band. Never scrolls; heights unchanged from U0d/U0e, so the
   corner-block, one-band and tablet geometry invariants still hold.
2. Scroll region — `RailBody` inside `data-testid="rail-scroll"`
   (`min-h-0 flex-1 overflow-y-auto overscroll-contain`, touch momentum, no
   horizontal overflow at 360px).
3. Pinned foot — `RailFoot` (Sign out) below the scroll area, reachable without
   scrolling. Its `mt-auto` pinning is preserved; the flex parent now carries
   `min-h-0` so the scroll region, not the foot, absorbs the overflow.

### Viewport-bound rail (U0f root cause)

Scroll containment only works if the rail itself cannot grow. The md+ `<aside>`
therefore carries `md:sticky md:top-0 md:h-screen md:h-dvh md:max-h-dvh
md:overflow-hidden` (`h-screen` first as the fallback where `dvh` is
unsupported): it is pinned to the viewport and capped at its height, so the
inner `rail-scroll` is the ONLY scrolling region and a long category or admin
list never lengthens the page. The drawer is untouched — the sheet already
bounds itself. Grid rows/columns, the logo cell, the top bar, collapsed widths
and all tokens are unchanged.

### Desktop layout laws (U0g, revised by U0g-2)

Four laws govern the md+ shell; mobile (< md) is unchanged (drawer + stacked
layout). U0g-2 replaced sticky positioning with FIXED positioning everywhere in
the shell chrome: the rail must never move at any scroll offset, including the
page bottom, where sticky used to creep upward against the footer.

- **L1 — fixed top band.** The logo cell and the top bar live inside one
  wrapper (`data-testid="shell-band"`) that is `contents` on mobile — so the
  top bar stays grid row 1 exactly as before — and
  `md:fixed md:inset-x-0 md:top-0 md:z-30 md:flex md:h-16` from md up. Inside
  it the corner block is preserved by construction: the logo cell is
  `md:w-64 md:h-16 md:shrink-0` (`md:w-16` when `html[data-rail=collapsed]`)
  and the top bar is `md:flex-1`. Measured at 1280: logo 0/256×64, bar
  256/1024×64 — identical to the sticky band it replaced.
- **L2 — fixed rail beneath it.** The `<aside>` is
  `md:fixed md:start-0 md:top-16 md:z-20 md:w-64 md:h-[calc(100dvh-4rem)]
md:overflow-hidden` (with `100vh` first as the fallback, and `md:w-16` when
  collapsed). The inner `rail-scroll` remains the only rail scrolling region
  and `RailFoot` stays pinned at its bottom.
- **L3 — content column + full-width footer.** The content stack offsets
  itself with `md:pt-16 md:ms-64` (`md:ms-16` collapsed) so it starts under the
  band and beside the rail, and the page scrolls normally. The footer sits in
  normal flow after it, spanning the FULL viewport width from x=0. U0h REVERSED
  the painting order: the footer wrapper is `relative z-40 bg-card`, above the
  rail's `z-20`, so at the page bottom the FOOTER paints over the rail and the
  rail visually ENDS at the footer's top edge — it never runs beside or below
  the footer. The surface is opaque in BOTH themes (`bg-card` on the wrapper
  and on `<footer>`), so no rail pixel shows through. So the footer's own
  content stays readable, its wrapper applies
  `md:[&>footer>*]:ps-64` (`ps-16` collapsed) — the padding lands on the
  footer's inner blocks, so the background and border keep spanning the full
  width while the links and copyright are inset past the rail's column.
- **L4 — only content scrolls.** With a tall body, page scroll moves the
  content while the band's and the rail's on-screen rects stay byte-identical,
  at 600px and at the very bottom of the document.

E2E (`desktop layout laws (U0g)` in `e2e/shell.spec.ts`) injects a tall
test-only spacer into the content column (`#main`) via `page.evaluate`, GROWING
it until `document.scrollingElement.scrollHeight - innerHeight` really reaches
the requested offset — a scroll assertion on a non-scrollable page would pass
vacuously. Geometry is read with `getBoundingClientRect()` rather than
`locator.boundingBox()` — the latter scrolls the element into view and would
move the very elements under test. L3 additionally asserts the footer rect is
x=0 / full viewport width while its first inner link starts at x >= 256, and
(U0h) reads the compositor at x=128 inside the rail column:
`elementFromPoint(128, footerTop + 8)` must resolve inside
`shell-footer-wrapper` and NOT inside `app-rail`, while
`elementFromPoint(128, footerTop - 8)` must still resolve inside the rail. The
same check is repeated after toggling the theme, proving the footer surface is
opaque in dark mode too.

### i18n chrome coverage guard (U0h)

`e2e/i18n-coverage.spec.ts` runs the shell in Amharic (the language is written
to `localStorage` in an init script, so no English frame is ever measured) on
`/`, on the mobile drawer and on `/admin` with an `admin`-role fixture. It walks
the text nodes of the chrome regions (`shell-topbar`, `panel-tabs`,
`panel-header`, `breadcrumbs`, `shell-footer-wrapper`, `app-rail`,
`admin-nav-cards`) and asserts (a) no rendered string equals the English value
of a key that HAS a distinct Amharic value — i.e. nothing fell back through
`messages[key] ?? en[key]` — and (b) no raw dot-notation key name rendered.
Keys whose Amharic value is intentionally identical (brand wordmark, language
endonyms/short codes, the sample email placeholder) are allow-listed in the
spec. DATA-DRIVEN CATEGORY ROWS ARE EXCLUDED: category names come from
`public.categories` (`name_en` / `name_am`), so their Amharic coverage is a
data/U5 launch-gate item, not a chrome-string concern.

Every rail row now carries `data-testid={node.testid}` — routed `Link` leaves,
`onSelect` buttons and path-less rows alike — so items whose page is a later
feature (for example `rail-item-ac-overview`) are addressable in tests. No
behaviour change beyond the attribute.

E2E: `e2e/shell.spec.ts` "rail scroll regions (U0f)" proves overflow, the fixed
header (`panel-header-title` y unchanged after scrolling), the last item coming
into view on scroll and the pinned Sign out — at 360×480 (drawer) and 1280×500
(rail); the md+ case also asserts the aside's box height equals the viewport
height (±1px) — the viewport-bound invariant. The drawer switcher test scopes `panel-header-switcher` to the drawer
locator (both surfaces render a band); the switcher's OPTIONS live in a portal
and stay page-scoped.

## U0j — sign-out is a hard reset (INC-072)

Every sign-out affordance (rail/drawer foot, header account menu) calls
`requestSignOut()` from the shell context, which opens the single
`SignOutDialog` (focus-trapped, Escape cancels, ≥44px targets). Only the
confirm action performs the reset, in order: `signOut()` awaited → the
`my-permissions` query is REMOVED from the cache → panel/category/location/
drawer state reset → `navigate({ to: "/", replace: true })`.

Gated routes (`/admin/**`, `/settings`) subscribe to live auth state rather
than checking on mount, so a sign-out in this tab, in another tab, or a token
expiry evacuates the surface immediately. `usePermissions` also reports an
empty set whenever the read is disabled, so a signed-out shell can never
derive a grant from a stale cache entry.

## Session policy (U0k)

Sign-out is ONE CLICK: every affordance (rail/drawer foot, account menu) calls
`requestSignOut`, which performs the U0j hard reset immediately — no
confirmation dialog exists (`sign-out-dialog.tsx` was deleted).

`src/features/session/session-policy.ts` is the single source of truth for the
client-side session limits: idle 30 min (staff) / 4 h (regular), absolute 12 h
(staff) / 7 d (regular), warning 60 s before idle expiry. Staff = permissions
include `admin_panel:access`; while permissions are unresolved the STRICT tier
applies (fail-safe). Clocks persist in `sb-<ref>-last-activity-at` and
`sb-<ref>-session-started-at`, which makes the policy survive reloads and apply
across tabs. Expiry runs the same hard reset and shows a translated notice.

This is UX enforcement only; the authoritative bound is the Supabase Auth
refresh-token / session configuration (operator item). Law F3 is unchanged.
