# Locations console

Landed at LOCATIONS ERA **L2a**. The admin surface over the geography tree:
`/admin/locations`, gated on `locations:view`, rendered inside `<StepUpGate>`
with the root test id `admin-section-locations`.

Two tabs today. **Countries** and **Coverage** arrive at L2b and are deliberately
absent rather than stubbed — C4 forbids a placeholder that replaces content.

| Tab      | Test id                 | What it is                                       |
| -------- | ----------------------- | ------------------------------------------------ |
| Tree     | `location-tab-tree`     | The per-country roster and every structural verb |
| Transfer | `location-tab-transfer` | Export the two files, import them back           |

## The Tree tab

The toolbar (`location-toolbar-find`) carries four filters and the page-size
control. Every one of them is a door argument, never a client-side sieve:

| Control                      | Test id                   | Door argument                                  |
| ---------------------------- | ------------------------- | ---------------------------------------------- |
| Country                      | `location-country-filter` | `p_country_code`                               |
| Search (name · slug · alias) | `location-search`         | `p_search`                                     |
| Level                        | `location-level-filter`   | `p_level`                                      |
| Active / retired             | `location-active-filter`  | `p_active`                                     |
| Rows per page                | `location-page-size`      | client only (`ethio.admin.locations.pageSize`) |

Open markets are listed first; a closed market is still listed — an operator has
to be able to curate a country before it opens — and carries the translated
`closed` badge. The default selection is the first open market.

The roster is one `DataTable<LocationRow>` with `cardUntil="lg"`, keyed by row
id, with the row test id `location-<key>` where the key is the **slash path** of
slugs (`ethiopia/oromia/adama`) with `/` written `__`. Slugs are unique per
parent, not globally, so the path is the only stable address. Column tiers:
name + level badge (primary), path (secondary), status (primary), the
listings · coverage · profile-default counts (detail), display order (detail),
alias count and ISO code (wide). No `minWidth` anywhere (C7).

Creation in this tab is always **create a child of a row**: a country anchor is
born by opening a market (L2b), so `location-create-open` is disabled with the
`admin.locations.create.rootHint` line until a row is selected as parent.

## The verbs and their doors

| Verb              | Row action            | Door                                  | Notes                                                                                                                                                                                                                  |
| ----------------- | --------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Create child      | `create-child`        | `admin_upsert_location` (`p_id` NULL) | Disabled on sub-city rows — depth 4 is the floor. The row is **born retired**; the dialog says so (`location-create-retired`).                                                                                         |
| Edit              | `edit`                | `admin_upsert_location`               | Never touches parent or activation — those are their own verbs; the door answers `useMoveDoor` otherwise. Round-trips every stored field (INC-188).                                                                    |
| Activate / retire | `activate` / `retire` | `admin_set_location_active`           | One state-dependent verb. `parentInactive` renders as "activate `<parent path>` first".                                                                                                                                |
| Move              | `move`                | `admin_move_location`                 | Step-up on the server. The picker lists only same-country rows at level − 1. The ancestry trigger carries the descendants.                                                                                             |
| Reorder           | `reorder`             | `admin_reorder_locations`             | The siblings of the row's parent, up/down. Disabled for country rows (`orderCountriesInProfile`).                                                                                                                      |
| Delete            | `delete`              | `admin_delete_location`               | Step-up on the server. The operator types the row's slug (`location-delete-confirm`). Disabled when children, listings, coverage or profile defaults exist — and the door still refuses by name when a count is stale. |

Other-language names are **not** edited here. The edit dialog links to
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

## The Transfer tab

`location-toolbar-transfer` holds three verbs and one error line:

- `location-export-countries` → `GET /api/admin/locations/export?file=countries`
- `location-export-locations` → `GET /api/admin/locations/export?file=locations`
- `location-import` → the two-file import dialog
- `location-export-error` — the failure, in words (F4)

Both exports carry the selected country as `scope=`, or no scope for "all", and
a bearer read from the session. Column order is the export contract of
`country_export_row` / `loc_export_row` (L1b), copied by name (E7).

The import dialog is the shared `ImportDialog` shell with the `locations`
family: two **optional** file slots (`countries`, `locations`) — one file alone
is a legal run, both empty is refused by the route — the counts
adds · changes · retires · reactivations · deletes · unchanged · refusals, and
the planner's whole refusal vocabulary under `admin.locations.import.reason.*`.
The scope posted is the country filter's value, `null` for "all".

A run is **whole or nothing**: a plan with any refusal is not committable
(`planHasRefusals`); the Transfer tab says so in one line. The preview's digest
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
| LT-1  | Gating — a plain user gets no console; an admin gets both tabs and the ET roster                                                       |
| LT-2  | Roster — the seeded tree renders, an alias narrows the search, the level filter scopes, nothing overflows                              |
| LT-3  | Create chain — region → city → sub-city, born retired, ancestry filled by the trigger; bottom-up activation refused, top-down succeeds |
| LT-4  | Path rule — retiring a region hides its still-active descendants from the public tree, and re-activating returns them                  |
| LT-5  | Delete guard — a parent with children is refused, then the chain deletes leaf-first with the typed address                             |
| LT-6  | Step-up — an unproven factor cannot move a row; once proven the move carries the descendants                                           |
| LT-7  | Import round trip — preview, commit, export echo, delete file, undo with the original ids (INC-201 through the route)                  |
| LT-7b | The edit dialog round-trips every stored field it does not show (INC-188)                                                              |

Scratch rows carry the `e2e-` slug prefix (J1) and are destroyed child-first in
`finally` (J3). `e2e/global-setup.ts` reaps stale scratch geography by **slug**
prefix, deepest-first, and clears the matching `location_import_revisions`
rows (DEC-062 delta, L2a).
