# Locations console

Landed at LOCATIONS ERA **L2a**, corrected at **L2c**. The admin surface over the geography tree:
`/admin/places`, gated on `locations:view`, rendered inside `<StepUpGate>`
with the root test id `admin-section-locations`.

There are no tabs. One roster holds the location tree and its toolbar holds both
the find and transfer controls.

**L2c** — the section is called **Places** and sits inside the clickable
**Locations** rail group at `/admin/locations`, together with **Countries**
(`docs/features/countries-console.md`) and **Coverage**, whose roster and editor
arrive at L2b-C2; its route renders the section register's own body line until
then. The group page is an overview of market, place and plan totals, with links
filtered by the operator's permissions. The markets file and its picker LEFT
this toolbar for the Countries section: places transfer alone here.

## The roster toolbar

L2d — the toolbar takes the CATEGORIES SHAPE. Its groups are DIRECT children of
the primitive's own toolbar row: the find group (`location-toolbar-find`) first,
the transfer group (`location-toolbar-transfer`) last, then the market-state line
and the legend wrapping beneath on every width. No control carries a visible
label element: the search shows the translated hint as its placeholder, each
select names itself through `aria-label` and through a first option that carries
its field ("Level: all levels"), so 360px reads as one wrapping row rather than a
stack of labelled boxes.

A renamed UI string gets a NEW key from L2d on: an approved `ui_translations` row
for the old key would otherwise shadow the file forever (D3). That is why the
option labels live on `admin.locations.filter.*Option` keys and the section
title/body moved to `admin.section.places.*`.

The find group carries four filters and the page-size
control. **One read per country** (L2a-R): `admin_list_locations` is called with
`p_country_code` alone, and search, level and status sieve that roster in the
browser. Switching the country is the only control that fetches — a keystroke
costs no request on an expensive-data device.

| Control                      | Test id                   | Effect                                         |
| ---------------------------- | ------------------------- | ---------------------------------------------- |
| Country                      | `location-country-filter` | `p_country_code` — the one door argument       |
| Search (name · slug · alias) | `location-search`         | client sieve, deferred while typing            |
| Level                        | `location-level-filter`   | client sieve                                   |
| Active / retired             | `location-active-filter`  | client sieve                                   |
| Rows per page                | `location-page-size`      | client only (`ethio.admin.locations.pageSize`) |

The picker's FIRST option is **All countries** (value `""`) and it is the
DEFAULT: the door reads every market on a NULL scope (L2b-M), so the roster opens
on the whole world with exactly one read, grouped by country, each row's path
carrying its country name. Then come the open markets A–Z, then the closed ones
A–Z. A closed option carries the translated suffix (`Canada · closed`) because a
native select cannot render a badge.

Country anchors are ancestry and creation-parent records, not places an operator
edits. They never appear in this roster and no Places verb can open, move,
retire or delete one. With one market selected, `location-market-state` says
whether it is open or closed; opening and closing a market belongs only to
Countries. The create dialog keeps that hidden anchor as its first parent,
labelled `<Country> — whole country`, so regions can still be created.

With **All countries** selected, the transfer group carries NO scope: the export
URL omits `scope`, the caption reads "For all countries" and the import dialog is
titled "Import into all countries". The create dialog's parent picker then offers
every market's anchor — closed ones suffixed — so a place can be prepared before
its market opens.

The same DataTable toolbar row then carries `location-toolbar-transfer` as its
last group, with Download places and **Import places**. Its inline
`location-transfer-scope` caption reads `For <country> ·` BEFORE the buttons it
governs, so the target is never ambiguous. The groups wrap; there is no
horizontal width override.

The roster is one `DataTable<LocationRow>` with `cardUntil="lg"`, keyed by row
id, with the row test id `location-<key>` where the key is the **slash path** of
slugs (`ethiopia/oromia/adama`) with `/` written `__`. Slugs are unique per
parent, not globally, so the path is the only stable address. Column tiers:
name + level badge (primary), path (secondary), status (primary), the
listings · coverage · profile-default counts (detail), display order (detail),
alias count and ISO code (wide). No `minWidth` anywhere (C7).

Tones come from the shared `TipBadge` primitive: active = `secondary`,
retired = `destructive`, level = `outline`, each carrying `data-tone` so a test
asserts the meaning and never a colour (J5). Their title text and the
`location-legend` explain the vocabulary: active places are offered in pickers
and feeds; retired places are hidden but retained because listings may still
point at them.

## The editor is the row's one surface

L2a-R returned the roster to the categories convention (CT-8). A row carries a
**single 44px pencil**, `location-edit-<key>`, and the row itself opens the same
editor on click or on Enter/Space. Six buttons in a table cell were what clipped
the end column and pushed the page sideways at 1280.

The editor (`location-editor`) shows the path with the level and status badges,
the fields, `location-editor-save`, and then the **verb bar**
(`location-verb-bar`):

| Verb              | Test id                                           | Notes                                                          |
| ----------------- | ------------------------------------------------- | -------------------------------------------------------------- |
| Create child      | `location-verb-create-child`                      | Absent on sub-city rows — depth 4 is the floor                 |
| Activate / retire | `location-verb-activate` / `location-verb-retire` | One state-dependent verb                                       |
| Move              | `location-verb-move`                              | A country anchor never enters this editor                      |
| Reorder           | `location-verb-reorder`                           | Country anchors are absent from the roster                     |
| Delete            | `location-verb-delete`                            | Destructive; disabled with the reason in `location-verb-error` |

A blocked verb says why beside the bar in words (`location-verb-error`, F4) —
never only in a tooltip and never in a toast alone.

Adding a place has two entrances, one surface: the section header's
`location-create-open` opens the create dialog with a **parent picker**
(`location-create-parent`, every row that can still hold a child, the country
anchor preselected), and the editor's create-child verb hands the parent in
fixed as a read-only path.

## The verbs and their doors

| Verb              | Door                                  | Notes                                                                                                                                                                                                                  |
| ----------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create child      | `admin_upsert_location` (`p_id` NULL) | The row is **born retired**; the dialog says so (`location-create-retired`).                                                                                                                                           |
| Edit              | `admin_upsert_location`               | Never touches parent or activation — those are their own verbs; the door answers `useMoveDoor` otherwise. Round-trips every stored field (INC-188).                                                                    |
| Activate / retire | `admin_set_location_active`           | `parentInactive` renders as "activate `<parent path>` first".                                                                                                                                                          |
| Move              | `admin_move_location`                 | Step-up on the server. The picker lists only same-country rows at level − 1. The ancestry trigger carries the descendants.                                                                                             |
| Reorder           | `admin_reorder_locations`             | The siblings of the row's parent, up/down.                                                                                                                                                                             |
| Delete            | `admin_delete_location`               | Step-up on the server. The operator types the row's slug (`location-delete-confirm`). Disabled when children, listings, coverage or profile defaults exist — and the door still refuses by name when a count is stale. |

Other-language names are **not** edited here. The editor links to
Translations → Data (`location-edit-translations`): one writer per string (D3).

## How a refusal reads

`locationErrorKey(message)` maps every refusal id the six doors speak to a key
under `admin.locations.error.*`: `denied`, `stepUp`, `locationMissing`,
`parentMissing`, `parentInactive`, `levelMismatch`, `crossCountry`, `badSlug`,
`missingCoordinates`, `rootMustBeCountry`, `badLevel`, `isoOnRegionsOnly`,
`nameRequired`, `unknownCountry`, `useMoveDoor`, `cannotMoveCountry`,
`orderCountriesInProfile`, `notAChild`, `slugMismatch` and `retireInstead` with
`hasChildren | hasListings | hasCoverage | hasProfileDefaults` rendered beside
it. Anything the console does not recognise renders as
`admin.locations.error.unknown` **with the server's raw message beneath it**
(`location-dialog-error-reason`) — a failure is always shown, never swallowed
and never mistaken for "no permission" (F4).

No dialog closes on a failure. Every write runs inside `guard(async () => …)`,
so a server step-up demand surfaces as the same modal everywhere.

## Scoped transfer controls

`location-toolbar-transfer` holds three verbs and one error line:

- `location-export-countries` → `GET /api/admin/locations/export?file=countries`
- `location-export-locations` → `GET /api/admin/locations/export?file=locations`
- `location-import` → the two-file import dialog
- `location-export-error` — the failure, in words (F4)

Both exports always carry the toolbar's selected country as `scope=` and a
bearer read from the session. This page has no all-country transfer mode. Column order is the export contract of
`country_export_row` / `loc_export_row` (L1b), copied by name (E7).

The import dialog is the shared `ImportDialog` shell with the `locations`
family: two **optional** file slots (`countries`, `locations`) — one file alone
is a legal run, both empty is refused by the route — the counts
adds · changes · retires · reactivations · deletes · unchanged · refusals, and
the planner's whole refusal vocabulary under `admin.locations.import.reason.*`.
The scope posted is the country filter's value. The title names that scope —
`Import into <country>` — and the whole-or-nothing sentence sits directly under
the title. The two download hints are button titles rather than toolbar prose.

A run is **whole or nothing**: a plan with any refusal is not committable
(`planHasRefusals`); the import dialog says so in one line. The preview's digest
travels with the commit, so a file edited between the two clicks is refused
rather than half-applied. After a commit the dialog offers **Undo last import**
for that batch; a second undo of the same batch is refused
`batchAlreadyUndone`. Undo restores deleted rows **parents-first** (INC-201), so
a nested chain returns with its original ids.

The shared shell's `familyOf` sniff learns the family from the first line only:
`location_key` or `unit_system` → locations, before the categories test on
`parent_slug` / `allow_listings`. A file of the wrong family is refused with a
sentence that names where it belongs.

## Opening a country later (spec §9)

1. Curate the tree while the market is closed — the roster lists closed markets
   for exactly this reason.
2. Give the country anchor its slug, unit system, currency and display order
   (Countries tab, **L2b**).
3. Order the country's category roots (Countries tab, **L2b**).
4. Activate top-down: anchor → regions → cities → sub-cities. A child cannot
   activate before its parent (`parentInactive`), and the public tree hides any
   row with a retired ancestor whatever its own state.
5. Open the market. `GET /api/locations/<CC>` starts answering; a closed or
   unknown market is a 404, never an empty 200.

## Tests

`e2e/admin-locations.spec.ts` (helpers in `e2e/helpers/locations.ts`):

| Test  | What it proves                                                                                                                         |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------- |
| LT-1  | Gating — a plain user gets no console; an admin gets the roster and transfer group inside the DataTable toolbar                        |
| LT-2  | Roster — the seeded tree renders, an alias narrows the search, the level filter scopes, nothing overflows                              |
| LT-3  | Create chain — region → city → sub-city, born retired, ancestry filled by the trigger; bottom-up activation refused, top-down succeeds |
| LT-4  | Path rule — retiring a region hides its still-active descendants from the public tree, and re-activating returns them                  |
| LT-5  | Delete guard — a parent with children is refused, then the chain deletes leaf-first with the typed address                             |
| LT-6  | Step-up — an unproven factor cannot move a row; once proven the move carries the descendants                                           |
| LT-7  | Import round trip — preview, commit, export echo, delete file, undo with the original ids (INC-201 through the route)                  |
| LT-7b | The editor round-trips every stored field it does not show (INC-188)                                                                   |
| LT-8  | Every verb and the save button sit inside the viewport at 360 and 1280, with no horizontal scroll (CT-8 mirror)                        |
| LT-9a | The table twin: the pencil in the end column, 25-row pagination, no overflow                                                           |
| LT-9b | The card twin: the pencil in the card's own actions region beside the badges                                                           |
| LT-10 | Tones — retired = `destructive`, active = `secondary`, level = `outline`, asserted by `data-tone`                                      |
| LT-11 | One read: typing and the level/status filters cost zero requests; switching the country costs exactly one                              |
| LT-12 | Transfer scope — export URLs carry the selected country, closed options carry the locale suffix, and the import title names its scope  |
| LT-13 | All countries — the picker opens on it, regions span both open markets, anchors are absent, and transfer carries no scope              |
| LT-14 | Market state — Ethiopia reads open, Canada reads closed, and the first create parent is the whole-country anchor                       |
| OV-1  | Overview — three numeric summaries, permission-filtered links, and group/current breadcrumb behaviour                                  |

Scratch rows carry the `e2e-` slug prefix (J1) and are destroyed child-first in
`finally` (J3). `e2e/global-setup.ts` reaps stale scratch geography by **slug**
prefix, deepest-first, and clears the matching `location_import_revisions`
rows (DEC-062 delta, L2a).
