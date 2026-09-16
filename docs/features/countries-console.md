# Countries console (Admin → Locations → Countries)

The markets register: every country on record, whether it is open to shoppers,
what it measures and spends in, how its rail is ordered, and how many places and
scoped role grants hang off it. Landed by LOCATIONS ERA L2b-C1.

Route `/admin/countries` · section id `countries` · gate `countries:view`
(the `/admin` layout owns it) · root testid `admin-section-countries`.

## What it renders

ONE `DataTable` (`cardUntil="lg"`, row testid `country-<CODE>`) over
`admin_list_countries` — one read, sieved in the browser, so a keystroke costs no
request (G2).

| Column                | Priority  | Content                                                                    |
| --------------------- | --------- | -------------------------------------------------------------------------- |
| Country               | primary   | Name and its two-letter code                                               |
| Status                | primary   | `TipBadge` — open (`secondary`) or closed (`outline`)                      |
| Places active / total | secondary | `country-<CODE>-places`                                                    |
| Units · currency      | secondary | Metric or imperial, and the ISO 4217 code                                  |
| Rail order            | detail    | How many roots this market orders for itself; `0` follows the global order |
| Roles scoped          | detail    | Country-scoped role grants                                                 |
| Updated               | wide      | The row's own `updated_at` day                                             |

The toolbar carries the find group (`country-toolbar-find`: search, status,
rows per page) and the TRANSFER group inside the same toolbar
(`country-toolbar-transfer`): `country-export` downloads the markets file and
`country-import` opens the shared import dialog with the markets file alone. A
markets file names its own countries, so it is never scoped.

The UNDO of a markets file removes what that file made: a market the batch
created goes away together with the anchor place it was born with (INC-206,
L2b-C2) — the anchor is taken back first, and only when it carries nothing of
its own (no child place, no listing, no profile defaulting there). If anything
else hangs off the market, or a role is scoped to it, the undo still refuses with
`undoBlocked:hasRows`, rendered in words.

## Verbs

`country-create-open` adds a market (code, name, unit system, currency, order)
through `admin_upsert_country`; it is born CLOSED and its anchor place is born
with it, inactive (the `countries_anchor_on_insert` trigger, L2b-M).

One 44px pencil per row (`country-edit-<CODE>`) opens the EDITOR
(`country-editor`) — the row's one surface (CT-8). It holds the profile fields
and `country-editor-save`, a line naming the anchor's state
(`country-verb-anchor`), and the verb bar (`country-verb-bar`):

| Verb                                       | Door                           | Permission           |
| ------------------------------------------ | ------------------------------ | -------------------- |
| `country-verb-open` / `country-verb-close` | `admin_set_country_active`     | `countries:activate` |
| `country-verb-rail-order`                  | `admin_set_country_root_order` | `countries:update`   |
| the editor's save                          | `admin_upsert_country`         | `countries:update`   |

Each door re-checks the permission AND step-up server-side (F3); the gates in the
console are convenience only.

Closing a market with country-scoped role grants is REFUSED with
`scopedRolesExist`. The dialog then names the count and offers one explicit
second confirm, `country-close-force`, which passes `p_force_hide = true`: the
market is hidden and every grant is kept.

The rail-order dialog (`country-rail-dialog`) lists every ACTIVE ROOT category in
this market's order — or the global order, said in words
(`country-rail-global`) — with up/down per row, `country-rail-save`, and
`country-rail-reset`, which saves an EMPTY list and so removes every
`country_root_order` row for the market.

## Refusals (F4)

Rendered by name in `country-verb-error` / `country-dialog-error`, never as a
tooltip or a toast alone: `badCountryCode`, `badUnitSystem`, `badCurrency`,
`nameRequired`, `unknownCountry`, `scopedRolesExist`, `duplicateCategory`,
`notARoot`, permission denied, step-up required.

## Opening a country — the checklist

1. Add the country (or find its seeded row): it starts closed with an inactive
   anchor.
2. Curate its places in Admin → Locations → Places; a closed market's anchor is
   already a valid parent, so the tree can be prepared before anyone sees it.
3. Order its rail if it should differ from the global order.
4. Open it from the editor's verb bar (step-up). `GET /api/locations/<CODE>`
   answers 200 from that moment; closing it again returns 404.

## Tests

`e2e/admin-countries.spec.ts` — CO-1 gating · CO-2 roster, tone, search and the
status filter · CO-3 create (closed, inactive anchor) · CO-4 open → published
tree → close → 404 · CO-5 profile round trip · CO-6 rail order and reset ·
CO-7 the markets file round trip and undo inside this toolbar · CO-8 geometry
and verb reachability in both twins.

Fixtures use ISO 3166-1 USER-ASSIGNED codes (QM–QZ, XA–XZ) and the
`E2E-Scratch-` name prefix (J1), destroyed in `finally` (J3);
`e2e/global-setup.ts` reaps stale ones after their places and rail rows
(DEC-062 extension, L2b-C1). No real ISO code is user-assigned, so a real market
can never match.

## Related

- `docs/features/locations-console.md` — the Places roster in the same rail group.
- `docs/features/countries-reference.md` — the reference table behind it.
- `docs/features/imports.md` — the shared import shell and its laws.
