# Imports — the one security gate

Every operator-supplied file enters the platform through **one** door:
`src/server/imports/gate.ts`, driven by the family declarations in
`src/server/imports/registry.ts`. A route owns HTTP and the RPC contract; it
owns no judgement about a file.

## Order of judgement

A file never gets past a step it failed.

1. **Ingress** — the route reads raw bytes: a body over 4 MiB and any invalid
   UTF-8 are refused before JSON parsing.
2. **Bearer** — caller-context publishable client, never the service role.
   No bearer, no door (401).
3. **Family** — registry lookup: permission, step-up policy, scope kind, files,
   columns, column classes and caps.
4. **File identity** — the first header names the file. A header belonging to
   another registered family is `wrongFile`; a header belonging to nothing is
   `badHeader`.
5. **Shape** — exact declared column order, no duplicate and no unknown column,
   optional trailing `action` column, ≤ 1 MiB per file, ≤ 5 000 data rows.
6. **Hygiene, per cell** — NFC, strip control/bidi-override/zero-width, trim,
   refuse NUL (whole file), refuse raw formula-leading cells (`= + - @`) while
   letting the export's neutralising apostrophe round-trip.
7. **Format law, per column** — slug, bool, int, date, pipe list, option list
   and enum/action vocabularies, plus length caps.
8. **Duplicate identity** — judged at the gate, or deferred to the planner when
   the family's law is lifecycle- or inheritance-aware (declared per file).
9. **Rate limit** — one preview/commit in flight per operator, 30 previews a
   minute.
10. **Payload** — the planner RPC receives typed rows, never raw CSV text. The
    RPC remains the only authority on meaning and on permission (F3, E7).
11. **Audit** — one `import.preview` / `import.commit` / `import.undo` row per
    door through `import_gate_audit`; every failure logs `[ssr-error] <path>`.

A refused file is never stored anywhere. Preview writes nothing.

## Database library

Migration `20260909054432_…` ships `import_norm_text`, `import_norm_bool`,
`import_norm_date`, `import_norm_pipe`, `import_is_slug`, `import_sanitize` and
`import_gate_audit`, each with in-file `REVOKE ALL FROM PUBLIC, anon` ·
`GRANT EXECUTE TO authenticated` · `GRANT ALL TO service_role` and an ACL
read-back. NUL rejection lives in the gate because PostgreSQL text cannot hold
a NUL byte.

## Adding a family

1. Declare it in `registry.ts`: permission, step-up, scope kind, and for each
   file its identity header, ordered columns with a class per column
   (`identity` · `editable` · `read-only` · `action`), identity columns and the
   duplicate policy.
2. Call `openImportGate` from the route (`openExportGate` for the matching
   export) and hand `rows[fileId]` to the gated planner RPC. Release the slot in
   a `finally`, and call `audit(...)` on each door.
3. Add the family to `e2e/import-security.spec.ts`'s `FAMILIES` list — the
   hostile catalogue is parameterised, so a family gets no private test.
4. `scripts/check-import-gate.sh` fails the build if any import/export route
   authenticates by hand, builds its own client, or skips the gate, and if any
   registered column lacks a class.

## Families today

| Family       | Files                | Permission            | Step-up | Scope         |
| ------------ | -------------------- | --------------------- | ------- | ------------- |
| attributes   | definitions, links   | `categories:import`   | commit  | category slug |
| categories   | categories           | `categories:import`   | commit  | category slug |
| translations | strings              | `translations:manage` | write   | language code |
| locations    | countries, locations | `locations:import`    | commit  | country code  |

## The declared vocabulary

A column's `type` names the SHAPE the gate enforces, never the meaning:
`text`, `slug`, `key`, `bool`, `int`, `decimal`, `date`, `pipe`, `options`,
`enum`, `bound`, `preset`. `decimal` is a signed decimal degree — up to three
whole digits and eight decimal places — and refuses with `badNumber`, the same
word `int` speaks, so an operator meets one vocabulary.

A family's `scope` names the KIND of subset a run may be confined to:
`category-slug` (a subtree), `language` (required — a string file always names
its language), `country-code` (two letters, upper-cased by the RPC, and `null`
meaning every country) or `none`. A malformed scope is refused with `badScope`
at both gates; existence remains the RPC's verdict (404).

## The UI-string door (Part C)

`POST /api/admin/translations/import` is the only way a translation file
reaches the database. The browser no longer parses anything: the console reads
the file as text, posts it with the target language, and renders the counts the
server returns.

- **Two dialects, one law.** CSV (`key,source,translation` with `context`
  optional) and XLIFF 1.2 arrive at the same route; the reader is chosen by
  content, and XLIFF units become the family's own columns before a single
  refusal is spoken. A unit with no id or no target yields an EMPTY row rather
  than being dropped, so an operator's row numbers stay the file's own.
- **Keys are identities.** A key must match `[A-Za-z0-9][A-Za-z0-9._:-]*` and
  200 characters; a value is capped at 4000. Duplicate keys in one file are
  refused by name.
- **Formulas.** A `=`/`+`/`-`/`@` cell is a live formula in a spreadsheet, so
  the EXPORT neutralises it with a leading apostrophe and the gate
  un-neutralises on the way in — `+ Add` survives a round trip, while a raw
  formula in a hand-made file is refused in the key column.
  **INC-208 — a number is not a formula.** Every `int` and `decimal` column
  declares `formula: "allow"`, because the column's own shape check already
  proves the cell is a number: a plain negative (`-33.9`, a southern latitude)
  imports as written. The export still neutralises, and `unneutralize` still
  strips the apostrophe, so both spellings round-trip.
- **One step, so the WRITE is metered.** This family has no preview door and no
  digest: the commit itself carries the one-in-flight and per-minute budget.
  `undo` takes the same route, so a taken-back run is audited like the run it
  undoes.
- **Meaning still belongs to the writer.** `admin_import_translations` keeps
  EXECUTE for `authenticated` and remains the sole authority on permission,
  step-up, unknown keys, placeholder validation and revision capture; the gate
  only decides what is allowed to reach it. `scripts/check-import-gate.sh`
  fails the build if a console calls that RPC (or a category/attribute import
  RPC) directly.

## C3-UX-8 — an optional file slot

A file field may be declared `optional: true` (`ImportFileField`). Its picker
carries a caption saying so, and Preview no longer waits for it: the button
enables once at least one file is held, and every REQUIRED slot is filled. The
attributes import declares its links file optional, because
`/api/admin/attributes/import` has always accepted a definitions-only run and
refuses only when both files are absent — so the dialog now reaches the same
verdicts the route does. Nothing else changes: the body still carries only the
fields that hold text, and the route remains the authority (F3). Proofs: AT-40
(the optional caption renders, one file opens Preview), AT-54 (a
definitions-only run previews and discards, writing nothing).

## INC-215 — an action row applies its field edits too

A countries-file row may carry `open` or `close` AND edited cells at the same
time. The planner emits the compound op `open+update` / `close+update` and counts
BOTH halves, so the preview of such a row reads "1 reactivated · 1 changed"
instead of hiding the cells behind the state change. The commit applies the state
and the fields in ONE statement each (name, unit system, currency, display
order, root order) and writes both an `open`/`close` and an `update` revision, so
Undo reverts both halves. Proof P1: a closed scratch market with `open` plus a
new currency previews as 1 reactivated + 1 changed, commits to active with the
new currency, and undoes to closed with the old one.

## The categories file — three more cells (DEC-052 / DEC-067)

`capabilities` (pipe-separated, allowlist `bookable|map_pin`),
`default_price_period` (`once|hour|day|week|month|year`) and
`price_period_locked` (`true|false`) are ordinary editable cells: planned as
field diffs on creates and updates alike, applied on commit, captured in the
revision rows and restored by Undo. An absent cell is SILENCE, never a deletion.
An unknown value is refused BY NAME — `badCapability:<value>`, `badPeriod` with
the offending value as its detail — and the row lands nothing. C2b registered the
three cells in the file spec itself, directly after `price_enabled` and before
`expiry_days`, so a file round-trips through preview, commit, Undo and export in
one header order (the header is exact: a file missing them is `badHeader`).

## The attributes file — the option `facts` cell (D18)

An option record may carry `facts`: an object of attribute keys (the
DEFINITION-KEY charset `^[a-z0-9_][a-z0-9_-]{1,63}$` since INC-236, hyphens
included, so a real key such as `fuel_type-vehicles` is accepted)
to a scalar or a list of strings, at most 20 entries. It is validated by the same
option shape function as every other key (refusal `badFacts:<detail>`). Facts are
a PREFILL for the posting form, never a rule — the listing validator does not
read them.

**`facts` is diffed, written and echoed** (M-FACTS, INC-239). The definition
verdict compares the option cell through `attr_option_norm` (value, labels,
parent) and `attr_option_norm_v2` (plus `active`, `bounds`, `aliases`,
`allowed`) — and `facts` was outside both, so a file whose ONLY change was
`facts` previewed as `unchanged` and landed nothing (phantom success, F4). The
v2 normalisation now carries `facts`: a change in facts alone plans as `changed`
with the diff naming `options`; an ABSENT or EMPTY facts object stays invisible,
so a file that never mentions facts is still silent. The commit writes the whole
options cell, the export echoes every stored option key, and Undo restores the
prior options cell whole — all three already did, which the file's proof
demonstrates end to end (export → add facts → plan → commit → options read →
export → undo). One caveat: the echo follows jsonb's own key order (keys sort by
length, then bytes), so `facts` appears BEFORE `bounds` in the cell, not after;
the round trip is unaffected.

**An UNCHANGED option cell is not re-validated** (M-SHAPE, INC-254). The strict
DEC-050 option shape runs only on an option cell whose parsed form DIFFERS from
the stored one. A cell identical to the stored options is the catalog's own
state — judged when it was written — so re-importing a byte-identical export can
never refuse; the row simply falls through to the ordinary diff and plans as
`unchanged`. Every altered cell, and every cell of a brand-new definition, is
judged in full exactly as before: one added key still refuses `badOption` with
`unknownOptionKey:<key>`. The file's proof walks EVERY live definition through a
byte-identical re-import and requires zero refusals.

## The attributes file — the option `swatch` cell (D28 / M-SWATCH)

An option record may carry `swatch`: one hex (`#RRGGBB`), two hexes separated by a
pipe (`#RRGGBB|#RRGGBB`, a two-tone) or `pattern:` plus one of `tabby`, `brindle`,
`calico`, `tricolour`, `multicolour`, `striped`. It is validated by the SAME option
shape function as every other key (`attr_option_shape`), which refuses anything
else by name: `badSwatch:red`, `badSwatch:#GGG`, `badSwatch:pattern:plaid`,
`badSwatch:empty`, `badSwatch:notString`.

It needs NO new column: the cell travels inside the existing `options` cell, and the
export emits each option record verbatim — so a swatch round-trips through export,
preview, commit and Undo the moment it is written.

It DID need a gate change, and the M-SWATCH landing was wrong to say otherwise
(INC-264). The importer's gate keeps its OWN copy of the option-key allowlist in
`src/server/imports/gate.ts` and refuses BEFORE the door is asked, so a definitions
file whose only edit was a colour came back "Option 'white' carries a field this
import does not know" (`badOption.unknownOptionKey`) even though
`attr_option_shape` allowed it — the same mistake `facts` made in INC-234. The gate
now spells the same ten keys the door spells, judges `swatch` as TEXT only
(`swatchNotString`) and treats a BLANK swatch as silence when normalising, leaving
every spelling verdict to the door. AT-63 previews an operator's swatch-only file as
1 change · 0 refusals, and still refuses an invented key by name and `badSwatch` for
an illegal spelling.

### The record boundary is `}|{`, never a bare pipe (INC-265)

A two-tone swatch separates its two hexes with a pipe, and the options cell
separates its RECORDS with a pipe — so every parser that split on a bare pipe cut a
two-tone record in half, the fragment was not valid JSON, and the import answered
`malformedOptions` ("The options could not be read") for a cell the door itself
allows. The same cut hit any label carrying a pipe.

There is now ONE boundary reader, in the gate (`splitOptionSegments`,
`src/server/imports/gate.ts`) and in SQL (`public.attr_split_option_cell`, read by
the whole re-declaration of `attr_import_plan`): walk the cell tracking JSON string
state (backslash escapes) and brace depth, and separate only at a pipe that sits
OUTSIDE every record. A legacy `value=label` segment still separates exactly as
before, because it sits at depth 0. The EXPORT is unchanged — it writes whole JSON
records joined with `|`, which is precisely what this reader separates — so a
two-tone swatch round-trips byte-identically.

`swatch` is DIFFED like `facts` (INC-239): `attr_option_norm_v2` carries it, so a
file whose only change is a swatch plans as `changed` with the diff naming
`options`, while an ABSENT or BLANK cell stays invisible and a file that never
mentions it is silent. `pattern:` values are matched case-insensitively and the cell
is trimmed; `#RRGGBB` is stored as written. The wizard shows the declared swatch and
falls back to the value's own colour word only when the cell is absent (INC-259).

## The links file — `allowed_options` and `default_value` (D-spec §12)

The two per-link cells travel in the links file, after the existing cells:

- `allowed_options` — pipe-separated subset of the DEFINITION's own option
  values (`piece|set`). An ABSENT cell changes nothing; a PRESENT and EMPTY cell
  clears the narrowing (`NULL` = every option). A value outside the definition's
  options refuses `badAllowedOption:<value>`; a non-select definition refuses
  `badAllowedOption:typeNotSelect`. The definition is read POST-PLAN, so a file
  that adds the definition and narrows the link in one pass is legal.
- `default_value` — value text judged against the definition's TYPE, and against
  the shortlist in force (this row's when it carries one, otherwise the stored
  one). A bad value refuses `badDefault:<detail>` —
  `notANumber:`, `notABoolean:`, `notADate:`, `notInOptions:`. A multi-select
  default is pipe-separated and stored as an array.

Both cells are PLANNED as field diffs (`change = change` when either differs),
APPLIED on commit only when the file carried them, CAPTURED in the batch
revisions (`prev`/`post`), RESTORED by Undo, and ECHOED by the export
(`piece|set`, the default as value text, `''` when `NULL`) — so an export round
trips silently. M-MAINT-2 **Part B**, proof P1b.

Since U6-C1-R3b-1 both cells are DECLARED IN THE REGISTRY too, so the file the
console exports carries them and the file an operator uploads may set them:
`allowed_options` is an editable `pipe` cell and `default_value` an editable text
cell (120 characters, a leading `-` is a NUMBER and not a formula, INC-208), both
after `card_rank` and before `origin`. The links header is therefore
`category_path (read-only),category_slug,attribute_key,is_required,is_filterable,card_rank,allowed_options,default_value,origin (read-only)`.
Shape only lives at the gate; every semantic verdict stays the planner's
(`badAllowedOption:` / `badDefault:`). AT-21 sets both from a file and reads the
export's echo. Since M-MAINT-3 both cells also have a DOOR
(`admin_link_attribute` / `admin_update_attribute_link`), so the console's own
per-row cells no longer wait on a migration.

## The links file — `visible_when` (D24, M-MAINT-3b)

The D24 condition is a links-file cell too, placed AFTER `default_value`, in the
text form `key=value1|value2` (for example `fuel_type-vehicles=electric|plugin_hybrid`):
the sibling definition key, `=`, then the pipe-separated values that reveal this
question.

- It is PLANNED as a field diff, APPLIED on commit through the SAME validation
  the link doors use, CAPTURED in the batch revision, RESTORED by Undo and
  ECHOED by the export after `default_value` — so an export round trips.
- THE BLANK RULE (the `name_am` rule): a BLANK cell CHANGES NOTHING, and a
  MISSING column is ignored. A condition set in the console therefore SURVIVES
  every import; there is deliberately no file syntax for clearing one (the
  console clears it).
- Refusals name the cause: `badVisibleWhen` with detail `badShape` (no `=`, no
  key or no values, or a shape the checker rejects), `self` (the row's own key),
  `unknownSibling:<key>` (not linked to that category, directly, by inheritance
  or by this same file) and `notInOptions:<value>` (a value the sibling does not
  offer; the sibling's option list is read POST-PLAN).

The sibling key must match the condition checker's charset
(`attr_visible_when_ok`), which since INC-238 is the DEFINITION-KEY charset
`^[a-z0-9_][a-z0-9_-]{1,63}$` — hyphens included, so a hyphenated sibling such as
`fuel_type-vehicles` is accepted. Anything outside it refuses
`badVisibleWhen:badShape`.

**The registry declares it (R-GATE, INC-241).** The planner has judged
`visible_when` since M-MAINT-3b and `attr_export_payload` has echoed it since the
same day, but the REGISTRY did not declare the column — so the gate, doing
exactly its job, refused an operator's own exported file with
`unknownColumn:visible_when`. The cell is declared now, in the database's order
(after `default_value`, before `display_order`), as an editable text cell capped
at 480 characters. The gate checks SHAPE only; every semantic rule above stays the
planner's verdict.

Proof: M-MAINT-3b P2 (planner diff, commit, schema read, export echo, blank
cell, missing column, refusals, Undo) and AT-62 (a scratch link with a condition
and an order exported through the real route and previewed back as unchanged).

## The links file — `display_order` (M-ORDER)

The order a category shows its questions in is a links-file cell too, as a plain
NON-NEGATIVE INTEGER (`0` included). It is the SAME column the console's Move up /
Move down writes, so the two paths never disagree.

**Where it sits.** The registry offers `display_order` as the last editable links
cell, AFTER `visible_when` — the same order the SQL export emits, so the four
trailing cells read `allowed_options`, `default_value`, `visible_when`,
`display_order` in both directions and the CSV export route now echoes all four
(R-GATE closed the round-trip gap named by U6-C1-R3b-3b).

## Unknown columns are refused BY NAME

The gate compares every header cell against the family's declared columns and
answers `unknownColumn` with the offending NAME in `detail`, before it judges
column ORDER and before any row is parsed. It never ignores a column it does not
know: a cell quietly dropped is a file that reads as applied and changed nothing
(F4). The two halves of that law are proved together — IG-5 asserts that a
made-up links column is refused by name AND that the four declared trailing cells
are admitted, so the door can be neither silent nor shut on a real file.

**Links-only runs.** A links file needs no definitions file: both slots in the
import dialog are optional and Preview opens with either one, while the route
still refuses a run with neither (AT-61). Reordering a category's questions is
therefore one small file, not a re-upload of the whole library.

- It is PLANNED as a field diff (a row whose ONLY difference is its order is a
  `change`, never `unchanged`), APPLIED on commit — an ADD takes the file's
  value and, with no cell, still appends last (`max + 1`) — CAPTURED in the
  batch revision (`prev`/`post` both carry `display_order`), RESTORED by Undo
  with the rest of the prior link row, and ECHOED by the export after
  `visible_when`, so an export round trips as unchanged.
- THE BLANK RULE (the `name_am` rule): a BLANK cell CHANGES NOTHING and a
  MISSING column is ignored, so a console reorder SURVIVES every import.
- A cell that is not a non-negative integer refuses `badDisplayOrder:<value>`
  (reason `badDisplayOrder`, with the offending text in both `detail` and
  `value`), and the refused row leaves NO link entry in the plan.
- TIES are untouched: the posting read (`get_posting_schema`) already orders by
  `display_order` with `attr_key` as the tie-break, so two links sharing an
  order stay alphabetical.

Proof: M-ORDER P1 (absent, blank, identical, changed, zero, and the three
refusals) and P2 (a scratch leaf with three links reordered by file → the plan
counts three changes → the commit writes them → the posting read lists the new
order → the export echoes it → an untouched re-export is silent → Undo restores
the prior order).
