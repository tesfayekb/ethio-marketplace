# Feature: panels — the navigation architecture

## Model

A **panel** is a top-level surface. The **rail** always renders the _active_
panel's items. The **panel switcher** moves between the panels this user may
see.

- `src/config/panels.types.ts` — `PanelId`, `NavItem`, `Panel`, `PanelAuthContext`
- `src/config/panels.ts` — `PANELS`, `panelsForUser(auth)`, `visibleItems(items, auth)`

Panel sets:

| User                 | Panels                                   |
| -------------------- | ---------------------------------------- |
| logged out           | Marketplace                              |
| logged in, non-admin | Marketplace, My Listings, Account        |
| admin                | Marketplace, My Listings, Account, Admin |

Marketplace is always first and always present.

The active panel is **client state** (shell context), not a route segment: the
non-Marketplace panels have no routes of their own yet, so a route segment would
be dead weight. Selecting a non-Marketplace panel renders the
"coming in its own feature" placeholder body.

## Panel contents

- **Marketplace** — the LIVE category tree, read from `public.categories`
  (top level = not the child of any `category_tree_pointers` row). Selecting a
  category narrows the feed.
- **My Listings** — Dashboard, Post a listing, My listings, Messages, Featured,
  Settings (→ `/settings`).
- **Account** — Overview, Saved, My activity, Notifications, Addresses, Profile,
  Sign-in and security (→ existing `/settings`, P1-f), Settings (→ `/settings`),
  Help.
- **Admin** — sectioned: MENU (Dashboard), IDENTITY (Users, Verification),
  ACCESS CONTROL (Roles, Permissions), MODERATION (Reports, Screening queue),
  MARKETPLACE (All listings, Categories, Locations), CONTENT (Pages,
  Translations), SUPPORT (Support tickets), SYSTEM (Organisation, System
  settings). Every admin item carries a `requiredPermission`.

Items whose page is a later feature have no `path` and render as inert rows.

## Permission gating

`visibleItems()` drops any item whose `requiredPermission` the user does not
hold. **Law F3 still governs:** this is UI convenience only. The server (RLS /
`has_permission`) is the sole authorization authority; hiding a nav item is
never an access-control decision.

`isAdmin` and `permissions` are currently **stubbed** (`false` / `[]`) — the
roles/permissions tables are a later feature. TODO(rbac) in
`src/components/app-shell.tsx`.

## HARD RULE — motif neutrality

The tibeb woven-diamond motif is **religiously neutral geometry only**. It must
never contain a cross or any faith iconography of any tradition, ever. This is a
standing design rule, not a per-feature preference.

Allowed placements — exactly three:

1. the logo (`src/components/brand/logo.tsx`),
2. the loading spinner (`src/components/brand/spinner.tsx`),
3. the feed empty state.

Never on browse, feed, listing, or category surfaces. Never as a footer band.

## Trademark

The current mark is a **working logo**. It has not been through professional
trademark clearance. Clearance before commercial use is a launch-gate item.

## Panel switching (revised 2026-08-04)

The top-bar dropdown is retired. Panel switching now happens in two places:

- **Panel tabs** (`src/components/shell/panel-tabs.tsx`) — band 2 of the shell
  stack, a horizontal tab row of `panelsForUser(auth)`. It renders ONLY when the
  user is signed in AND holds more than one panel; a logged-out visitor has
  Marketplace alone, so the band is absent entirely rather than showing a
  single, choiceless tab.
- **Drawer list** (`src/components/shell/panel-switcher.tsx`) — the same set as
  a vertical list inside the mobile drawer. This is now the file's only variant.

Selecting a tab sets `activePanel` through `useShell`, which swaps both the rail
and the body. Permission gating is unchanged and law F3 still governs: the
server is the sole authorization authority.

## Breadcrumbs

Band 4 renders `Home › <panel> › <category path>` with every segment a control:
clicking a category segment sets the feed's `categoryId` to that node (and the
rail's selection with it), and Home clears the category. This is real
navigation and works today. The path is one level deep while `useCategories`
returns top-level categories only; it renders the full chain unchanged once
category children land.

## Location row

Band 3 is the cascading area picker. It is BUILT-VISIBLE and its filtering is
STUBBED — see `docs/features/location-scoping.md`.

## Rail collapse state (2026-08-05)

The desktop rail's collapsed/expanded choice lives in ONE place: the `data-rail`
attribute on `<html>`, persisted to `localStorage` and applied pre-paint. Every
consumer reads it through `useRailCollapsed` (`src/providers/rail-state.ts`),
which subscribes via `MutationObserver`, so the rail, its foot and the drawer can
never disagree (INC-036). The rail-bottom sign-out is ADDITIONAL to the account
menu's; both call the same sign-out path and both are absent when logged out.

## Breadcrumb root (2026-08-05, INC-043)

Home IS the marketplace feed, so on the marketplace panel the chain is
`Home › <category path>` — the "Marketplace" segment is gone. Every other panel
keeps its name as a real segment (`Home › Account › …`). Home still clears the
category filter and returns the active panel to marketplace.
