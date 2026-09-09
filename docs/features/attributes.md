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

## C3-INH (DEC-044) — inherited rows in the console + subtree-scoped export

A category's **effective** attribute set is its own links plus every link
reachable through its ancestor pointers; the nearest link wins. The one reader
is `admin_list_effective_category_links(p_category_id)` (gated on
`categories:view`, E7): each row carries `inherited` and `origin_id` /
`origin_slug` / `origin_name_en`.

- **Console** — with `?category=<slug>` active the library renders the
  effective set. Inherited rows carry an "Inherited from &lt;origin&gt;" badge
  (`attribute-inherited-<key>`, same badge in the card twin) and are read-only:
  their ⋯ menu offers only "Open origin category"
  (`attribute-open-origin-<key>`). The UI hiding is convenience — the write
  RPCs refuse a write addressed through the inheriting category (totality on
  `admin_set_attribute_link_order`, link-not-found on
  `admin_set_card_attributes`), which is what AT-19 proves.
- **Category editor** — the Attributes tab lists own links as before and the
  inherited ones below them, read-only, under
  `category-attributes-inherited`.
- **Roster flag** — `admin_list_categories.card_attribute_count` is now the
  EFFECTIVE count, so a child inheriting two card attributes no longer carries
  the amber two-must-display flag. `attribute_count` stays the direct count.
- **Export** — `GET /api/admin/attributes/export?file=…&scope=<slug>` narrows
  both files to that category and all its descendants (inherited rows
  included, with `origin`); the subtree is resolved server-side by
  `admin_export_attributes(p_scope_slug)`, and the 0-arg door delegates to it
  with `NULL`. The column laws are unchanged; a scoped download's filename
  carries the slug (`ethio-attributes-<slug>-links-<date>.csv`). An unknown
  slug answers 404 after an `[ssr-error]` line.

Keys: `admin.attributes.inherited.badge`, `admin.attributes.inherited.openOrigin`
(EN + AM). E2E: AT-17 (inherited row + cleared roster flag), AT-18 (scoped
export contents and filename), AT-19 (no write verb, server refusal).

## The import (IE-2)

The mirror of IE-1: the two exported files go back in through
`Import attributes` (beside Export), which is gated on its OWN permission,
`categories:import` — registered step-up-required and granted to `super_admin`
only. Export stays on `categories:view`.

`POST /api/admin/attributes/import` with `mode=preview|commit|undo` is the door.
The browser uploads the files as TEXT and parses nothing: the route reads the
bearer token, builds a caller-context publishable client (never the service
role) and does every byte-level check server-side — 1 MB and 5 000 rows per
file, UTF-8/BOM, RFC-4180, and headers exactly equal to the export's plus an
optional trailing `action` column. A RAW `=`, `+`, `-` or `@` cell is refused
per row; the export's `'`-neutralised cell round-trips unchanged. Failures log
`[ssr-error] /api/admin/attributes/import …` before answering (I4, F4).

| Door                             | Gate                                 |
| -------------------------------- | ------------------------------------ |
| `admin_preview_attribute_import` | `categories:import` (writes nothing) |
| `admin_commit_attribute_import`  | `categories:import` + step-up        |
| `admin_undo_attribute_import`    | `categories:import` + step-up        |
| `attr_import_plan`               | internal — no client EXECUTE         |

**Actions, never absence.** `action` is `upsert` (default), `unlink` or
`delete`; a row missing from the file changes nothing. A delete still obeys the
blast-radius law.

**Refusals are per row**, each with a reason the console translates:
`missingKey`, `duplicateKey`, `badAction`, `unknownType`, `malformedOptions`,
`badParent`, `blastRadius`, `unknownCategory`, `unknownAttribute`,
`outOfScope`, `inheritedRow` (edit at the origin), `badCardRank`, `formula`.

**Preview → Confirm.** The preview writes nothing and returns the diff, the
refusals and a SHA-256 digest of both files; the commit carries that digest and
is refused (`fileChanged`) if the bytes moved. The commit follows the F5 writer
order — permission → step-up → a per-user advisory lock (one commit in flight)
→ capture old→new into `attribute_import_revisions`, batch-tagged → mutate — and
is idempotent: an unchanged row writes nothing, so a round trip of the export is
a no-op. `Undo last import` restores the batch's still-untouched rows and is
audited; rows a later edit has moved on from are counted as conflicted, never
overwritten.

**DEC-045 — option parents.** An option entry may carry `parent`, valid only
when the option list also declares `depends_on: <attribute_key>`; the parent
value must exist on that definition's list, otherwise the row is refused
(`badParent`).

With a category filter active the scope travels with the import and any row
outside that subtree is refused in the preview.

LIMITATIONS: the import reads `attribute_key`, `label_en`, `label_am`, `type`
and `options` from `definitions.csv` — `is_per_variant` (no such column) and
`direct_link_count` (derived) are informational and ignored. Undo covers the
last batch's captured rows only.

E2E: AT-20 round-trip no-op · AT-21 change → commit → undo against DB truth ·
AT-22 bad header, raw formula and unknown slug with nothing written · AT-23 no
control and 403 for a `categories:view`-only operator (401 with no bearer) ·
AT-24 edited bytes refused against the preview digest · AT-25 invalid option
`parent`.

## IE-3 — column classes (attributes)

Every export header states its class. Identity and editable columns are written
bare; derived or foreign columns carry the ` (read-only)` suffix:

| File          | Read-only columns                     |
| ------------- | ------------------------------------- |
| `definitions` | `is_per_variant`, `direct_link_count` |
| `links`       | `category_path`, `origin`             |

## IE-4b — `label_am` through the translation door

`label_am` LEFT the read-only list. A non-empty cell is written through
`admin_save_entity_translation('attribute', id, 'label', 'am', …)`, so it lands
as a HUMAN row awaiting review (`status='edited'`, `machine=false`) — the import
never auto-approves. An identical value writes nothing. An EMPTY cell is
SILENCE: a blank spreadsheet cell never deletes a translation.

Commit captures the prior am state (none, or value + status + machine) beside
the exported row; Undo restores that tuple exactly — an approved row comes back
approved — or removes the pending row the batch itself created. A delete drops
the attribute's am rows with it and the capture brings them back.

A blast-radius refusal now NAMES the categories holding the definition down
(`detail` = comma list, `categories` = array) instead of only counting them.

E2E: AT-29 (definition + link created with an Amharic label → the pending row
asserted through the service client, a blank cell writes nothing, undo removes
both the definition and the row it created) · AT-30 (an unlinked delete applies
and undo restores its APPROVED am row unchanged, while a linked delete is
refused naming the category).

The importer accepts a header **with or without** the suffix, so the round-trip
invariant (AT-20) is unchanged in meaning. A read-only cell is **never**
applied: the preview lists it under "Ignored (read-only)" with its row and
column, and the row's editable changes still apply (AT-27).

**File identity.** The dialog and the route both read the headers before any
row is parsed. A categories file offered to the attributes import is refused
with "This is the categories file — import it from Categories" (AT-28), and the
migration proves the attributes plan can only reach attribute doors — it never
writes a category table or calls a lifecycle door.

**Guided refusals.** An inherited row now names the fix: add a direct row for
this category, or edit it at the origin. A formula cell reads "Cells may not
start with = + - @". Every refusal keeps its row number.

## Dependent options (DEC-045a)

**The law.** A definition may depend on exactly ONE other definition whose type
is `single_select`. `attributes.depends_on` is a nullable self-reference; each
option of a dependent definition carries `parent`, one of the parent
definition's option values. The doors refuse: an unknown key, a parent that is
not `single_select`, a self-reference, a cycle (`attr_dep_cycle`), a `parent`
value outside the parent's list, and a `parent` value with no dependency
declared.

**Blast radius.** Deleting or unlinking a definition that others depend on is
refused NAMING the dependents, and a merge that would cross a dependency is
refused the same way. The console renders the refusal as one translated line.

**The console.** The editor carries a "Depends on" picker (visible only with
the write permission — the RPC refuses regardless, F3), one options editor per
parent value, and a cascade preview: choosing a parent value lists exactly its
children, switching switches them, clearing empties them. The per-category link
manager previews the same cascade for every dependent link whose parent is in
the category's effective set.

**Export.** `definitions.csv` gains a `depends_on` column, emitted READ-ONLY in
045a: the file states the dependency, the importer never applies it. Making it
importable (with parent-before-dependent ordering inside one file) is 045b.

**Proofs.** AT-31 authors the cascade in the editor and asserts the stored
`parent` on every option; AT-33 addresses the RPCs directly with the operator's
bearer and asserts the stray-parent, text-parent, cycle and named-dependents
refusals, with nothing written; AT-34 proves a `categories:view`-only operator
sees no control and is refused by the door.

## Importable dependencies and option labels (DEC-045b)

**`depends_on` is an editable column.** The definitions file carries
`depends_on` (an attribute key, or empty) between `options` and the derived
columns, and its header no longer declares "(read-only)": the importer APPLIES
it. Within one file the planner resolves a parent declared in the SAME file,
orders creates parent-before-dependent, and refuses `unknownParent` (neither in
the library nor in the file), `dependsNotSelect`, `dependsSelf`, `dependsCycle`
and `badParent` (an option `parent` outside the parent's value list — AT-25's
law). Commit resolves the key to the parent's id; Undo breaks the dependency
edges the batch created before deleting, and restores the prior edge on rows it
only changed.

**Options read as labels.** The library's Options expansion renders each
option's `label_en` (the stored value as fallback). A dependent definition is
grouped by the parent value it hangs under —
`byd: Seagull · Dolphin — toyota: Corolla · Vitz`. The Options COUNT in the row
and card twins is unchanged.

**Cascade preview.** In the per-category link manager the preview reads
"<Parent label>: choose a value to preview <Child label>'s options"; the
dropdown is labelled with the parent's name and the result list is captioned
with the child's. Both labels come through the entity-translation overlay, so
an Amharic console speaks Amharic.

**Proofs.** AT-32 (parent + dependent created by one file, the dependent row
written first; round-trip invariant zero; Undo removes both) and AT-35 (the
Options expansion for a plain and for a dependent definition).

## INH-1 — inheritance follows the PRIMARY lineage only (DEC-044 amendment)

A link applies to its own category and to every descendant along the **primary**
lineage. A category that carries another only as a **secondary (browse) pointer**
confers nothing on it: no inherited console row, no export row, no effective
card attribute.

The primary edge is the one the roster's Parent cell already names: the child's
first pointer under `(parent_id IS NOT NULL, display_order, created_at)` whose
parent is active. `public.cat_primary_parent(uuid)` is now the ONE reader for it,
and every effective-set walk goes through it:

- `admin_list_effective_category_links` — the console's inherited rows and the
  read-only inherited block in the per-category link manager;
- `attr_export_payload` — the export, including the `?scope=<slug>` subtree
  (the subtree itself now descends primary edges only) and the `origin` cell;
- `attr_import_plan` — the scope subtree behind `outOfScope`, so the importer
  judges the same set the export wrote, and the `inheritedRow` refusal names an
  origin that is a real primary ancestor;
- `admin_list_categories` — the EFFECTIVE `card_attribute_count`, i.e. the amber
  two-must-display flag.

A child that used to clear its amber flag through a browse pointer alone now
carries it again — correctly: its listing cards never showed those attributes.

Migration `20260908...` (mark `20260908140000`) re-declares the four readers,
restates each definer's `REVOKE`/`GRANT` closers with an in-file ACL read-back,
and carries a behavioural proof: a scratch child under a secondary-only pointer
exports zero inherited rows, and the same child under a primary edge exports
exactly one.

**Proof.** AT-36 — scratch A links two card attributes; scratch B is a root that
carries A only as a secondary parent: B shows no inherited row, is absent from
A's scoped export, and keeps the amber flag. Dropping B's own root pointer makes
A primary and flips all three. AT-20's round-trip invariant is unchanged.

## IE-5 — a delete is judged against the links that survive the same file

An import used to refuse `action=delete` for any definition that still carried a
link, even when the SAME file removed that link. One file is one pass, so the
plan now orders the work:

1. definition upserts (parent before dependent, DEC-045b),
2. link upserts,
3. link unlinks,
4. definition deletes.

The `blastRadius` refusal reads the links that SURVIVE step 3: the planner takes
a pre-pass over the links file, collects every in-scope `unlink` row as
`<category slug>|<attribute key>`, and excludes those pairs from the verdict.
The refusal still NAMES the categories it judged (IE-4b); a link the file leaves
in place still holds the definition down. Preview and commit read the same plan,
so the preview verdict is the commit verdict.

Undo reverses the order: this batch's definition DELETES are restored first (so
a restored link has an attribute to point at), then the links, then the batch's
own definition creations are removed last.

Migration sequence (INC-179): `20260909034642` (mark `20260909040000`) applied
on prod, was refused on staging (its text anchor did not match staging's
planner body), and was superseded by `20260909035515` (mark `20260909041000`)

- `20260909035656` (mark `20260909042000`), which heal its mark — staging
  carries `20260909040000` via the corrective, so parity holds without executing
  the original. The original file is restored byte-identical and stays in the
  tree as applied history. The superseding pair declares `attr_import_plan` in
  full with the IE-5 survivor rule, re-declares `admin_commit_attribute_import`
  in four phases and `admin_undo_attribute_import` with the reversed ordering,
  and restates each definer's `REVOKE`/`GRANT` closers with an in-file ACL
  read-back.

**Migration-file law (E2, amended):** a migration file is never deleted or
edited after it has been applied anywhere; a migration that failed elsewhere
is superseded by a corrective that heals its mark.

**Proof.** AT-37 — a scratch definition with one link: the delete alone previews
0 deleted · 1 refused with the category named; the same delete with the file's
own `unlink` row previews 1 unlinked · 1 deleted · 0 refused, commits (both gone
from the database), and Undo restores the definition and the link with zero
conflicts.

## IE-6 — direct rows over inherited echoes; empty read-only cells are silence

Migration mark `20260909050000` (applied file `20260909045217`) declares
`attr_import_plan` and `import_readonly_ignored` IN FULL (text-independent, so
it applies on every copy), each restating `REVOKE`/`GRANT` closers with an
in-file ACL read-back and a behavioural proof built and removed inside the file.

**(a) INC-180 — nearest wins.** The links file's duplicate-key check considers
only DIRECT rows (`origin` empty or equal to the row's own category slug).
Directness is read BEFORE the duplicate set: an inherited ECHO row (a
descendant's export line whose `origin` names an ancestor) is read-only — it
never enters the seen set and never collides — so a DIRECT row for the same
category and key in the same file is accepted and becomes the NEAREST link.
Unlinking THROUGH an echo is still refused (`inheritedRow`): a category cannot
unlink what it does not hold.

**(b) INC-181 — silence.** An EMPTY read-only cell means "not provided" and is
never reported as an edit. Only a NON-EMPTY read-only cell that differs from
live truth appears in the Ignored panel. Read-only columns are unchanged:
definitions `is_per_variant`, `direct_link_count`; links `category_path`,
`origin`; categories `category_path`, `is_catchall`, `listing_count`.

**Proof.** AT-38 — a links file carrying the inherited echo plus a new direct
row for the same key at the child previews 1 added · 0 refused, commits, the
child holds a direct link with the file's values, and the console shows no
inherited badge. AT-39 — definitions and links rows that leave every derived
column blank, against rows that exist live, produce an empty Ignored panel and
zero refusals. The AT-20 round-trip invariant is unchanged.

## IE-7 — the import dialog's three states

The shared shell (`src/features/admin/import-dialog.tsx`) shows ONE state at a
time.

- **Ready** — every declared file has its own picker: a real touch-sized
  secondary button ("Choose … file…") over a visually hidden native input, with
  the chosen filename beside it. Preview stays disabled until EVERY required
  file is chosen, so a half-chosen pair never reaches the door.
- **Previewed** — the counts, the refusals and the Ignored panel, with exactly
  Discard (tooltip: close without writing anything) and Confirm (step-up).
- **Applied** — a success banner, "Import applied — N changes written", where N
  counts the writes alone (never `unchanged`, never `refusals`); the counts stay
  on screen and the footer holds exactly Undo last import + Close. Confirm and
  Discard are not rendered. After Undo, the take-back line replaces the banner's
  door and Close remains.

Spec: AT-40 (attributes) and CT-28 (categories) drive a scratch file all the way
to Applied and assert DB truth after Undo.

## FIX-SCAN-1 — the link flags are ONE write

`admin_update_attribute_link(p_link_id, p_is_required, p_is_filterable)`
(migration mark `20260909150000`, applied file `20260909142634`; the earlier
`20260909140408` carries the same declaration and is healed in the mark
allowlist) updates the flags in place. The manager used to toggle them as
unlink + relink: two writes, so a failure between them LOST the link and the
relink inserted a fresh row, wiping `card_rank`. The RPC gates on
`categories:update` + `require_step_up_if_needed('categories','update')` — the
same authority the pair it replaces carried, deliberately NOT `categories:manage`,
which would change who may edit a link — then captures the old row, updates, and
audits `attribute.link_update`. `card_rank` and `display_order` are untouched.
Unlink and the picker's link path are unchanged. Proof: AT-42.
