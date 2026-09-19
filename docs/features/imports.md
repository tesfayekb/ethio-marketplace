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

An option record may carry `facts`: an object of attribute keys (`^[a-z0-9_]{2,64}$`)
to a scalar or a list of strings, at most 20 entries. It is validated by the same
option shape function as every other key (refusal `badFacts:<detail>`); the
definitions planner and commit are unchanged, because the options column passes
through them whole. Facts are a PREFILL for the posting form, never a rule — the
listing validator does not read them.

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
trips silently. M-MAINT-2 **Part B**, proof P1b. The registry/console cells ride
C1-R3.

