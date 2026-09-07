# Attributes (C3)

The shared attribute model: one definition per fact a listing can carry, linked
to the categories that ask for it.

## The model

| Table                             | Holds                                                                                           |
| --------------------------------- | ----------------------------------------------------------------------------------------------- |
| `public.attributes`               | the definition: `attr_key`, `name_en`, `attr_type`, `options`, help text                        |
| `public.category_attribute_links` | one row per (category, attribute): `is_required`, `is_filterable`, `display_order`, `card_rank` |

`public.category_attributes` (the C3a denormalized import) stays in place as the
C3c fallback and is not read by this console.

Both tables refuse direct client access; every read and write below is a gated
`SECURITY DEFINER` RPC (law E7).

## Doors

| RPC                                   | Gate                                          |
| ------------------------------------- | --------------------------------------------- |
| `admin_list_attributes`               | `categories:view`                             |
| `admin_list_attribute_categories`     | `categories:view`                             |
| `admin_list_category_attribute_links` | `categories:view`                             |
| `admin_upsert_attribute`              | `categories:update` + step-up                 |
| `admin_link_attribute`                | `categories:update` + step-up                 |
| `admin_unlink_attribute`              | `categories:update` + step-up                 |
| `admin_set_card_attributes`           | `categories:update` + step-up                 |
| `admin_set_attribute_link_order`      | `categories:update` + step-up                 |
| `admin_delete_attribute`              | `categories:restructure` + step-up, typed key |
| `admin_merge_attributes`              | `categories:restructure` + step-up            |

Every write is audited old → new; a refused attempt writes nothing (F5).

## The console

`/admin/attributes` — the LIBRARY. The C7 DataTable primitive with its defaults
(cards below md): attribute · type · option count · used-by count, searchable
by name or key.

- **Create / Edit** a definition. Option lists are authored one per line and
  only exist for the choice types.
- **Delete** refuses while the definition is linked and the copy names how many
  categories still hold it; the operator types the key to confirm.
- **Merge** is the curation door: tick the duplicates, pick the survivor, and
  the confirmation states how many links move and how many definitions go, in
  advance. Sibling links inside one category fold together, keeping the
  stricter `is_required` / `is_filterable`.

Category editor → **Attributes** — the per-category LINK MANAGER. Linked list
with required / filterable toggles, Move up / Move down, Unlink, and a
searchable picker over the library.

## The two-must-display law

A listing card shows at most three attributes (`card_rank` 1..3). An **active**
category that **accepts listings** with fewer than two ranked attributes renders
bare cards, so both the link manager and the roster flag it in amber
("Needs card attributes"). The manager's caption always states what a card will
actually show.

## The parent cell

The roster's Parent column reads the primary parent with a "Primary" chip and,
below it, "Also in: …" for every other active branch the category hangs under —
the flipped service nodes (auto services, realtor services, fitness centres) sit
under Services first and keep their second home visible.

## The library surface (C3-UX-1)

The library renders ONLY through the C7 DataTable primitive at `cardUntil="lg"`
(cards through the tablet band, table from 1024) — no per-page width hacks.
Columns: Name · Type · Options (count; the full list expands under the row) ·
Used by (category chips) · Actions.

### Tiers, not min-widths (C3-UX-1d, C7 amendment)

A column declares a TIER plus a proportional width; it never declares a
`minWidth`. Min-widths are floors — four of them add up and the sum pushes the
last column off the scroller between 1024 and 1279.

| Column    | Tier      | Width       |
| --------- | --------- | ----------- |
| Attribute | primary   | `w-[32%]`   |
| Type      | secondary | `w-[14%]`   |
| Options   | wide      | `w-16`      |
| Used by   | secondary | (remainder) |

`wide` renders from `xl` only, so 1024–1279 shows Attribute · Type · Used by ·
⋯ with nothing clipped and no sideways scroll, and 1280+ adds Options; the row
expansion carries the option list at every width.

`scripts/check-datatable-minwidth.sh` enforces this for every consumer: a
`minWidth` fails the run unless the SAME line carries a `// C7-dense: <reason>`
justification. `scripts/fixtures/bad-datatable-minwidth-example.tsx.txt` is its
self-test (the guard must flag it); `data-table.tsx` itself and the
`dev.primitives` showcase are exempt by name (E5).

A **category filter** sits in the toolbar and lives in the URL as
`?category=<slug>`, so a filtered library is shareable and reloadable; it reads
`admin_list_category_attribute_links` for that category and narrows the rows to
the attributes linked to it. One control clears it, and an empty result is a
caption beside the controls (C4), never a replacement for them.

**Assign to category** is a row action: the link manager pre-scoped to that one
attribute. It writes through the same gated `admin_link_attribute` door (a
duplicate link is refused server-side with its own translated line), and the
row's Used by count re-reads from the mutation's invalidation.

## The row menu and the used-by chips (C3-UX-1c)

The actions column carries ONE `⋯` trigger (`attribute-actions-<key>`); every
verb lives in its menu — Edit · Assign to category · Remove from category ·
Delete — so the column stays narrow and the card twin keeps a single 44px
target. The menu renders in a portal and is addressed as
`attribute-actions-menu`.

**Used by** is no longer a bare number. `admin_list_attribute_categories`
(`categories:view`, one read for the whole library) names every category a
definition is linked to; the column renders one chip per category
(`attribute-usedby-<key>-<slug>`) and the COUNT moves into the card twin's
caption (`attribute-usage-<key>`, cards only). Widths are tiered (C3-UX-1d
above), so the chips wrap inside the remainder column and nothing is clipped
between 1024 and 1366.

**Remove from category** picks one of the categories the attribute is currently
linked to, names it in the confirmation, and writes through the existing
`admin_unlink_attribute` door (`categories:restructure` + step-up). The chips
and the delete blast radius both re-read from the mutation's invalidation.

## Tests

`e2e/admin-attributes.spec.ts` — AT-1 gating · AT-2 definitions · AT-3
link/unlink · AT-4 card picker clears the amber flag · AT-5 delete refused then
accepted · AT-6 merge · AT-7 category filter (DB truth) · AT-8 assign from the
library · AT-9 twin rendering with no sideways scroll and no clipped last column at 1024/1194/1280/1366 ·
AT-10 the used-by chip names the assigned category (DB truth) · AT-11
remove-from-category unlinks and the chip disappears (DB truth). `e2e/admin-categories-console.spec.ts` CT-9a/9b assert the
parent cell in both twins against pointer truth.

## Amharic labels (C3-UX-2)

Attribute labels are ENTITY copy, not UI copy: they resolve through
`entity_translations` with `entity_type = 'attribute'`, `field = 'label'`,
under the same overlay law every entity name follows —
DB[lang] ▸ compiled ▸ the English definition name. One resolver,
`useAttributeLabel` (over `entityName`), serves every render site: the library,
the per-category link manager, the card picker, the category editor's
Attributes tab and the attribute dialogs.

Attributes are a first-class row in the translations console's **Data** scope
(`admin_list_entity_translations`, `admin_entity_translation_stats`,
`admin_save_entity_translation`, `admin_machine_entity_translation` all accept
the new type), so the existing machine-translate + approve flow covers them
with no new door.

LIMITATION (C3-UX-3): option VALUES stay English. Only the label is
translatable today.

## Deny behaviour

A `categories:view`-only operator reads the library and sees no write verbs —
no ⋯ menu, no Create. The server refuses independently:
`admin_upsert_attribute` and `admin_link_attribute` need `categories:update`,
`admin_delete_attribute` needs `categories:restructure`; each raises
`permission denied` and writes nothing (F5).

E2E: AT-12 (approved `am` label renders, EN fallback returns) · AT-13 (a
scratch definition is pending in the Data roster) · AT-14 (the three deny
proofs, live RPC).

## The export (IE-1)

One toolbar control, `attribute-export`, downloads TWO files — `definitions.csv`
and `links.csv`. Two downloads rather than one archive keeps the bundle free of
a new dependency (G2). The control is disabled ONLY while a download is in
flight: the export is the whole library, never the filtered view, so an empty
filter never greys it out.

`GET /api/admin/attributes/export?file=definitions|links` is the door. It reads
the bearer token off the request, builds a caller-context publishable client
(never the service role) and calls `admin_export_attributes()`, which re-checks
`categories:view` itself — the route surfaces that refusal as 403, a missing or
invalid token as 401, and logs `[ssr-error] /api/admin/attributes/export …`
before every failure answer (I4, F4).

| File              | Columns, in order                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `definitions.csv` | `attribute_key`, `label_en`, `label_am`, `type`, `options`, `is_per_variant`, `direct_link_count`        |
| `links.csv`       | `category_path`, `category_slug`, `attribute_key`, `is_required`, `is_filterable`, `card_rank`, `origin` |

Both files carry a UTF-8 BOM (Excel needs it to read Ge'ez), CRLF rows and
RFC-4180 escaping, and any cell opening with `=`, `+`, `-` or `@` is prefixed
with a single quote so no spreadsheet executes it. The filename is dated:
`ethio-attributes-<file>-<YYYY-MM-DD>.csv`.

`links.csv` is the EFFECTIVE set: a category's own links plus every link
inherited from its ancestors, the nearest link winning, with `origin` naming
the category the link actually lives on (its own slug for a direct link).
`options` is the option list joined by `|`; `label_am` is the APPROVED entity
translation, falling back to `attributes.name_am`.

LIMITATION: the normalized model carries no per-variant flag, so
`is_per_variant` is emitted as an EMPTY cell rather than asserting a `false`
the database never stated.

PARITY (INC-176): `admin_export_attributes()` reached the connected project
before its migration file existed. `20260907173330_5a9c6351` re-declares it
byte-identically with in-file ACL closers and a read-back, so history and
database agree again.

E2E: AT-15 (both downloads, verbatim headers, BOM, inherited `origin`, the
`'=`-prefixed label) · AT-16 (403 for a bearer without `categories:view`, 401
with no bearer, and no control rendered).
