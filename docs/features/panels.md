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
- **Account** — Overview, Saved (→ `/account/saved`), My activity, Notifications, Addresses, Profile,
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

Allowed placements — exactly two (the feed empty state was retired by D215, 2026-10-18):

1. the logo (`src/components/brand/logo.tsx`),
2. the loading spinner (`src/components/brand/spinner.tsx`).

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

D214 (changing D107) — the different-place notice is one line in the place band on marketplace feeds, only when the saved own choice is at least 24 hours old and the detected place is unrelated within the same saved market. Switch picks through the ordinary picker path, saving the cookie, account place and current pick time. Keep hides that detected node until it changes again; `ethio.place.keep` holds only its validated UUID. The guess uses the loaded tree, with no extra request.

Band 3 is the cascading area picker. It is BUILT-VISIBLE and its filtering is
STUBBED — see `docs/features/location-scoping.md`.

## Rail collapse state (2026-08-05)

Bundle 21 turn 7: Home is not a menu row (the breadcrumb and the phone's bottom bar carry it). The favourite, when set, is the first row, then a line. The ☆ explains itself: a tooltip with a mouse from 768 px, a line of fine print otherwise. One favourite: the last one chosen wins. Turn 8: the ‹ Main Menu row starts where the rows start — the arrow on the icons, the words on the names — on every menu.

D207 — one ★ favourite category or subcategory lives on this device in `ethio.fav`, a validated category slug. The ☆ beside a category page's title sets or clears it; another category replaces it. Its category icon gains a gold ★ badge and it is first in every main list (after Home in the persistent rail), including the folded rail, strip and opened phone menu. It is absent at subcategory levels and before hydration; no request is added.

Subcategories open in place at every width (D98 with D213): the list follows the URL, with ‹ Main menu / ‹ <parent> moving it up without navigation. The phone menu opens at the main list, stays open on a category with subcategories, and folds into the strip on one without. The folded rail and strip show main categories with the current ancestor marked. Every category link preloads on intent. The peek opens once a visit on phones (sessionStorage `ethio.peek`), without taking focus; it is off under test unless forced.

Sub-items indent 16 px a level in the open rail and the opened phone menu; the folded rail and the phone strip keep one icon column (the operator, 2026-10-18 14:45 local).

D113 — rows are 32 px with a mouse and 44 px with touch; phone rows fit the strip at 32–40 px. Icons are 20 px in the rail and 24 px on phones. Home replaces All categories. The phone menu has a × and ends above the bottom bar. D205 — a tap on the strip opens the menu; the strip is aria-hidden and the ☰ is the accessible way in.

D204 — the menu is open by default at every width from 768 (224 px on tablets, 256 from 1024), folded to 64 px by ☰ and remembered in `ethio.rail`. The tablet overlay is gone; below 768 ☰ opens the phone menu.

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

The Marketplace rail's category tree is READ-ONLY reference data cached for the page
session (first read shared by all callers, failures never cached), with 44px skeleton rows
during the first read so the rail does not jump when the categories arrive.

## Panel-scoped chrome (2026-08-05)

- The location row (band 3) renders ONLY on the Marketplace panel — location
  scoping is a marketplace concept. Other panels show top bar → panel tabs →
  breadcrumbs → body (INC-052).
- The Marketplace rail is the live category tree and nothing else; Settings
  items belong to the Account panel and the My Listings "Manage" submenu
  (INC-053, verified, no config change).
- The rail-collapse toggle is md+ only; below md the hamburger/drawer is the
  single sidebar affordance (INC-054/INC-046).

## Panel tabs — fit, never scroll (INC-056)

Look B (D135): tabs are pills sized to their labels (`min-w-0 flex-none shrink`) that still shrink to fit, retaining their icon and CutText without horizontal scrolling.

Band 2 does not scroll horizontally. Tabs share the row (`min-w-0 flex-1`) and their
labels truncate, so the set fits at 360px and never paints a scrollbar. The Marketplace
rail stays the live category tree only: no Settings entry in the rail or the mobile
drawer (INC-053, asserted at both breakpoints).

## Panel selection vs the router (INC-058)

The active panel is DERIVED, not free-floating client state. A route that belongs to a
panel owns the panel while it is open (`/settings` -> `account`). Only `/` renders the
marketplace feed shell: on any other route the shell renders the route's own page rather
than the panel placeholder, and the location row (a marketplace concept) is absent.
Choosing a panel tab from a route-owned page returns to `/`.

Admin gating is unchanged: `panelsForUser` appends the Admin panel only when
`auth.isAdmin` is true, which is still stubbed `false` (law F3 — the server remains the
only authorization authority).

## Switching to My Listings from another panel's page (INC-501)

My Listings has no home page (the INC-071 grandfather), so `useSwitchPanel` sets it by state. The shell's setter goes to `/` first when the current page is not the feed (`src/components/app-shell.tsx`), where that state can own the panel. Tests cover the switch from `/account` and `/settings` at phone and desktop widths.

Later word (bundle 16 turn 2): My Listings has its home page, `/my-listings` (`homePath`; its "My listings" item links there), so it activates by navigation like Account and Admin, and the shell derives it from the path. The state path is left to Marketplace; the same tests still prove the switch from `/account` and `/settings`. See `docs/features/my-listings.md`.

## Bundle 18, turn 1 — the seller's and the account's own pages carry the admin's kind of trail (D198)

The operator's bundle-17 walk (2026-10-16): the Edit showed `Home › Seller Centre` with nothing to click ("breadcrumb in edit should show seller center, all listings etc; breadcrumb should also allow navigation when clicked"). The route-owned pages of the Seller Centre and the Account — `/my-listings`, the ad's page `/my-listings/<id>` and its Edit `/my-listings/<id>/edit`, `/post` and `/post/<id>`, `/settings` — now get a route-derived trail like the admin's (src/components/shell/breadcrumbs.tsx, the branch before the feed's): `Home › <panel> › <page> [› <ad> [› Edit]]`, every segment but the current one a real control.

- The panel crumb (`breadcrumb-panel`) links to the panel's home (panels.ts `homePath`: `/my-listings`, `/account`) whenever the address is deeper than it; on the home itself it is a plain name, because the page crumb beside it is the current segment (INC-557's rule). Before, it linked to "/" or was the current segment.
- The page crumb (`breadcrumb-page`): "My listings" (`nav.myListings`), "Post listing" (`nav.postListing`) or "Settings" (`settings.navLabel`); a link to its page only under an ad; "Post listing" stays current on `/post/<id>`, the same screen resuming a draft.
- The ad's crumb (`breadcrumb-my-listing`, src/components/shell/seller-crumbs.tsx, a lazy module loaded only on those two pages like the admin detail crumbs of INC-554): the ad's title from the ad page's own cached query (`authKey("my-listing", id)`, so no second request on the ad's page; on the Edit it is the one read of the row); a link back to the ad's page on the Edit, the current segment on the ad's page; "—" while the title is not yet read; truncated at 16 rem with the full title as its tooltip.
- "Edit" (`breadcrumb-edit`, `myListings.edit`) is the current segment on the Edit.
- The admin's listing Edit (`/admin/listings/<id>/edit`) gets the same two levels: the listing crumb (`breadcrumb-admin-listing`) becomes a link back to the listing's page and "Edit" follows it (src/components/shell/admin-detail-crumbs.tsx, `link`).
- The feed and the category pages keep their trail (`Home › <category path>`; `Home › <panel>` with a panel chosen by state); `/account` keeps `Home › Account`; `/auth` keeps `Home › Sign in`. No new string: every crumb's words already exist.
- Tests (e2e/breadcrumbs.spec.ts, new; in the selector's `shell` and `feed` areas): BR-1 (the ad's page: four crumbs, the title current, Seller Centre and My listings both → /my-listings; its Edit: five, the title → the ad's page, Edit current), BR-2 (/my-listings: Seller Centre a plain name, My listings current; /post: Seller Centre → /my-listings, Post listing current; /settings: Account → /account, Settings current), BR-3 (the admin Edit's trail: the listing's title → its page, Edit current).
