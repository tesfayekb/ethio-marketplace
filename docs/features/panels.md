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
