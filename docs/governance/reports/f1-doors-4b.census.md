# f1-doors-4b — the census (STEP 1)

Base: dev 51a99915d (the merge of pull request #45); the lane began from `origin/dev` 51a99915d, so `<BASE>` and
`<HEAD>` are equal. Every reading below is of that tree.

How each reading was made (scratch tools under `/tmp/ethio-scratch/f1-doors-4b/`):

- **Bodies** — the last literal declaration of each function by a scratch reader over `scripts/doors/catalogue.ts`
  (`census.ts`, `mech.ts`); the two import doors' LIVE bodies rebuilt from their computed declarations (`m6c.ts`:
  the literal body plus the INC-951 3c dial lines of 20261029024515, inserted after the step-up line).
- **md5 on the local proof stack** — a scratch probe migration (never committed, removed after the run;
  `probe.ts`, output `probe-before.txt`) made `bun run db:proof --fresh` raise `md5(replace(prosrc, chr(13), ''))`,
  the length, the volatility, the security and the return type of every function of the family and of the helpers
  and triggers its bodies reach (21 functions). Each equals the md5 of the text between the dollar tags of the file
  this census names; the two computed import doors equal their rebuilt live text.
- **Callers** — every `rpc("<name>"` / quoted name under `src/`, `e2e/`, `scripts/` (`callers.txt`); SQL callers by
  the same probe on the stack: every function body (any schema but the catalogs), every policy, every view, every
  trigger on `locations`, `countries`, `country_root_order` and `location_import_revisions`, and every scheduled job
  (`cron.job`).

## consumers

"Gates today" is the body; "line" is `scripts/doors/manifest.txt` (line number). Every door of the family today:
`has_permission(auth.uid(), <resource>, <action>)` (any scope) then `require_step_up_if_needed(...)`, codes by plain
`RAISE`; none calls `door_context`, none has the shell, every codes cell is `-`. "→ gate" means the sentence is
answered by `door_context` (`permissionDenied[:scope]`; step-up's P0009 kept; `rateLimited`). Every code below is
the word the body raises today and the consoles already have words for (`admin.locations.error.<id>`,
`admin.countries.error.<id>`); five are codes elsewhere already (`permissionDenied`, `nameRequired`,
`unknownCountry`, `importRunning`, `unknownBatch` — reused), the rest are new to the codes cells. Every code is a
literal `door_refuse('<code>'`, so the judge reads it.

### The location doors

| Door (live: file :line, md5) | Gates today → line | Returns | Sentence → code (detail) | Callers (what they read) |
|---|---|---|---|---|
| `admin_upsert_location(uuid,uuid,text,text,text,text,text[],integer,double precision,double precision)` 20261029015903 :219, 5e34ea13998c57e8d182c13b2c669597 | two branches: create = permission create + step-up + `rate_gate('staff_config')`; update = permission update + step-up + `rate_gate('staff_config')` → line 148: locations:create, staff_config, location.create, row:locations.country_code | uuid → **jsonb** `{ok:true, id}` | 'permission denied' → gate; badLevel, isoOnRegionsOnly, nameRequired, rootMustBeCountry, unknownCountry, parentMissing, locationMissing, useMoveDoor → the same names | `locations-service.ts:157` (`data as string`, the new id; casts on nullable args); the trigger `locations_ancestry_guard` on its INSERT/UPDATE |
| `admin_move_location(uuid,uuid)` 20260915162505 :397, b30e294a745485f5d5fb34ee325845e6 | permission restructure + step-up, **no dial** → line 87: locations:restructure, staff_config, row:locations.country_code | void → **jsonb** `{ok:true}` | gate; locationMissing, cannotMoveCountry, parentMissing, crossCountry | `locations-service.ts:182` (error) |
| `admin_delete_location(uuid,text)` 20260915162505 :470, 226315156df940fab30d5f4a3c7e2da9 | restructure + step-up, **no dial** → line 34: locations:restructure, staff_config, **global** | void → **jsonb** | gate; locationMissing, slugMismatch, `retireInstead:hasChildren` / `:hasListings` / `:hasCoverage` / `:hasProfileDefaults` → `door_refuse('retireInstead', '<x>')` (message unchanged) | `locations-service.ts:198` (error) |
| `admin_reorder_locations(uuid,uuid[])` 20260915162505 :434, 20debae4abc3bb7df39bf876853fe672 | update + step-up, **no dial** → line 99: locations:update, staff_config, **global** | void → **jsonb** | gate; orderCountriesInProfile, notAChild | `locations-service.ts:190`; `location-verb-dialogs.tsx:245` (`errorText(error).startsWith("notAChild")`) |
| `admin_set_location_active(uuid,boolean)` 20260915162505 :366, a3745632a8652791f7b3ebbea415a931 | update + step-up, **no dial**, an early `RETURN;` when nothing changes → line 128: locations:update, staff_config, audit `-`, **global** | void → **jsonb** (the early return becomes `{ok:true}`) | gate; locationMissing; the trigger's `parentInactive` (below) | `locations-service.ts:174` (error) |

### The country doors

| Door (live: file :line, md5) | Gates today → line | Returns | Sentence → code (detail) | Callers (what they read) |
|---|---|---|---|---|
| `admin_upsert_country(text,text,text,text,integer)` 20261029015903 :117, c758ed59da93c3f4739a1a862239047d | countries:update + step-up + `rate_gate('staff_config')` (raising `rateLimited`) → line 146: countries:update, staff_config, global | void → **jsonb** | gate (`rateLimited` too); badCountryCode, badUnitSystem, badCurrency, nameRequired | `countries-service.ts:69` (error; `currencyCode as string` cast of a nullable) |
| `admin_set_country_active(text,boolean,boolean)` 20261029015441 :84, 2b5e63633c558226538386b9708b02b0 | countries:activate + step-up + `rate_gate('staff_config')` → line 117: row:countries.code | void → **jsonb** | gate; badCountryCode, unknownCountry, scopedRolesExist | `countries-service.ts:90`; `country-verb-dialogs.tsx:54` (`startsWith("scopedRolesExist")`) |
| `admin_set_country_root_order(text,uuid[])` 20261029015441 :144, 469796970d43dd930d182f6d02784c9c | countries:update + step-up + `rate_gate('staff_config')` → line 119: row:countries.code | void → **jsonb** | gate; badCountryCode, unknownCountry, duplicateCategory, notARoot | `countries-service.ts:103`; `country-verb-dialogs.tsx:166` (`startsWith("notARoot")`) |

### The import doors (each in a file of its own)

| Door (live) | Gates today → line | Returns | Sentence → code (detail) | Callers |
|---|---|---|---|---|
| `admin_commit_location_import(jsonb,jsonb,text,text)` literal 20261028235443 :461, computed 20261029024515 :40; live md5 01365b40f7c61055d5389d267da9a09f (13,199 bytes) | permission import + step-up + `rate_gate('import_commit')` → line 28: locations:import, **staff_config**, row:locations.country_code | jsonb (kept, no DROP) | 'permission denied' → gate; 'import already running' → `importRunning`; `planHasRefusals` (same name); `'am'` → `language_code('pair')` (K4) | `src/routes/api/admin/locations/import.ts:18` through `defineImportRoute` (the relay reads its error; its 200 answer `{batch_id, counts, refusals}` unchanged) |
| `admin_undo_location_import(uuid)` literal 20260916013820 :36, computed 20261029024515 :81; live md5 c4168e1ff2402a72509cb643441f97dc (8,385 bytes) | permission import + step-up + `rate_gate('import_undo')` → line 139: **staff_config**, row:locations.country_code | jsonb (kept) | gate; 'unknown import batch' → `unknownBatch`; `batchAlreadyUndone`; `'undoBlocked' USING DETAIL = 'hasRows'` → `door_refuse('undoBlocked', 'hasRows')` (the message becomes `undoBlocked:hasRows`); `'am'` → `language_code('pair')` | `import.ts:19` (the relay) |

### The readers (staff-reader form: `door_context` first, a refusal is a P0D01 raise, no shell)

| Reader (live) | Gate today → line | Returns | Sentence → code | Callers |
|---|---|---|---|---|
| `admin_list_locations(text,text,text,boolean)` 20260915232928 :43, 7fb54bdec47ee5610eb3ac28a1f13392 | `has_permission` locations:view; the body does **not** narrow by the caller's countries → line 71: **filter** | TABLE (kept) | 'permission denied' → gate | `locations-service.ts:94` (keyset pages over `id`; casts :97 :99 :100, INC-942); `e2e/admin-locations.spec.ts:995` (OV-1, a route mock of `/rpc/admin_list_locations`) |
| `admin_list_countries()` 20260915232928 :174, f9a13855b567a85a203d3185a9c3620f | countries:view → line 66: global | TABLE (kept) | gate | `countries-service.ts:41`, read through `use-countries.ts` by `countries-page.tsx:78` and `src/features/admin-overview/locations-overview.tsx:35` (one generic error line, `admin.overview.error`) |
| `admin_export_locations(text DEFAULT NULL)` 20260915170752 :640, 31f729670c3e8a1b90c693d1d8dd8b11 | locations:view → line 45: **global** | jsonb (kept) | gate; 'unknown country scope' stays (F1-7) | `src/routes/api/admin/locations/export.ts:41-42` → `exportRefusal(error, "unknown country scope")` (`src/server/imports/csv.ts:64`) |
| `admin_preview_location_import(jsonb,jsonb,text)` 20260915170752 :677, 2e6fee80118bdf0fbe5ce06fd9d4089a | locations:import → line 94: **global** | jsonb (kept) | gate; its planner's 'unknown country scope' stays (F1-7) | `import.ts:17` (the relay) |

### The helper, the planner and the triggers the bodies reach

- `location_slug_candidate(text,uuid)` 20260915162505 :143, b18e9221331c48277753077d6298defd — line 221: helper,
  `authenticated`, `invoker-chain`; SECURITY DEFINER, STABLE, raises nothing. Called by `admin_upsert_location`,
  `admin_set_country_active`, `admin_commit_location_import` and the trigger `countries_anchor_on_insert`; no code
  under `src/`, `e2e/` or `scripts/` calls it (one comment, `locations-service.ts:350`). Not redeclared.
- `loc_import_plan(jsonb,jsonb,text)` 20260917205429 :18, f8dffb8064d4537411b98f77f14329e4 — service role only;
  called by the preview and the commit. With a scope it refuses every row of another country (`outOfScope`), and the
  commit refuses a plan with any refusal, so a scoped commit writes only that country's rows. Not redeclared.
- Triggers on `locations`: `locations_ancestry_guard` (20260916215832 :21, b48ccd384604f2f5e27270a75afc7eec; plain
  raises `rootMustBeCountry`, `badSlug`, `missingCoordinates`, `parentMissing`, `levelMismatch`, `crossCountry`,
  `parentInactive`), `locations_ancestry_cascade`, `feed_reindex_on_place_move`, `update_locations_updated_at`; on
  `countries`: `countries_anchor_on_insert` (36ebec8335647c90887d435e96e1a470), `update_countries_updated_at`. A
  trigger's plain raise is not SQLSTATE P0D01: it passes through the shell as an error, exactly as today.

### SQL callers, and the order of the files

The probe on the stack: **no function calls a door or reader of this family** (one textual hit,
`admin_upsert_country` → `admin_set_country_active`, is the comment "opening a market is admin_set_country_active",
not a call); no policy, no view, no scheduled job names one (the nine `cron.job` commands call sweeps and prunes
only). So no core is needed and no file changes a callee's refusal while a SQL caller still calls it: the files are
the doors onto the shell, by concern — the location doors, the country doors, the readers, then each import door in
a file of its own — in that order.

## cell-meaning

**Dials.**

- `staff_config` (600 an hour per person, `src/lib/dials.ts` staffConfig, the `rate_dials` row) rations one staff
  configuration save of any catalogue — one every six seconds for an hour. A person curating places by hand creates,
  edits, activates, moves, reorders or deletes a place a few times a minute at most; a bulk change is the import's
  work. It fits `admin_upsert_location`, `admin_move_location`, `admin_delete_location`, `admin_reorder_locations`,
  `admin_set_location_active`, `admin_upsert_country`, `admin_set_country_active` and
  `admin_set_country_root_order`. Four of these (move, delete, reorder, set active) spend nothing today and spend it
  from this turn (DEC-385: a delete or a deactivation is an edit). `admin_set_location_active` keeps its early answer
  when nothing changes, after the gate, so a no-change press now counts once like any other press.
- `import_commit` (120 an hour, the route's `importCommit` twin) rations one committed file; one person honestly
  commits a handful of files an hour. `admin_commit_location_import` spends it today; its cell says `staff_config`:
  **staff_config → import_commit**.
- `import_undo` (120 an hour, the twin `importUndo`) rations one undone batch: **staff_config → import_undo** for
  `admin_undo_location_import`, which spends it today.
- The four readers spend none (`-`), as today.

**Countries** (DEC-380: `arg:` names the row the door writes or creates; `row:` the row it changes; a cell holds
when its meaning describes what the door changes; where two hold, the stricter one).

- `admin_upsert_location` `row:locations.country_code` holds: an update changes the place `p_id`, whose country the
  body reads first; a create writes a place under `p_parent_id`, of the parent's country (a country anchor's own
  code, `upper(p_slug)`, for `level = 'country'`). Kept.
- `admin_move_location` `row:locations.country_code` holds: the moved place's country, read from `p_id` (the new
  parent must share it — `crossCountry`). Kept.
- `admin_delete_location` `global` does not hold: the door deletes one place of one country, read from `p_id`; it is
  not configuration across markets. **global → row:locations.country_code**.
- `admin_reorder_locations` `global` does not hold: it reorders the children of `p_parent_id`, all of one country
  (`notAChild` refuses any other id). **global → row:locations.country_code**, read from `p_parent_id` (NULL — the
  markets' own order — reaches `orderCountriesInProfile` only for a global holder).
- `admin_set_location_active` `global` does not hold: one place of one country, read from `p_id`.
  **global → row:locations.country_code**.
- `admin_upsert_country` `global` holds: it creates a market or changes its name, units, currency and its
  `display_order` — the order of every market in the list — which is configuration across markets. `arg:p_code` also
  holds for the rest; the stricter is kept. **Kept global.**
- `admin_set_country_active` and `admin_set_country_root_order` `row:countries.code` hold: each changes one market
  (its open state and anchor; its rail order), read from `p_code`. Kept.
- `admin_commit_location_import` `row:locations.country_code` does not hold: a file may hold several countries and
  the door takes the scope argument `p_scope`, whose rows alone it writes (the planner refuses every other country's
  row, the commit refuses a plan with a refusal). **row:locations.country_code → arg:p_scope** (match: a scoped
  holder passes for the scope that is its own country; no scope — every market — passes only a global holder).
- `admin_preview_location_import` `global` → **arg:p_scope**, as the commit (the commit needs the preview's digest
  for the same scope; a scoped holder previews its own country's file).
- `admin_undo_location_import` `row:locations.country_code` holds when read as the batch's rows: the body reads the
  batch's one country from its revisions (a country revision's key; a place revision's `country_code` after or
  before), and passes it only when every revision carries one and they are all the same; otherwise NULL (only a
  global holder). Kept, with that reading in the body.
- `admin_list_locations` `filter` holds, but the body does not narrow today: it gains
  `v_ctx.countries IS NULL OR l.country_code = ANY (v_ctx.countries)`. Kept.
- `admin_export_locations` `global` and `filter` both describe a reader; it takes the scope argument, so
  **global → arg:p_scope** (the stricter of the scoped readings: a scoped holder exports its own country by naming
  it, and "every market" passes only a global holder).
- `admin_list_countries` `global` holds: the markets' roster, with each market's places, scoped roles and rail order,
  is configuration across markets. Kept.

Every country value passed to `door_context` is shape-guarded (`^[A-Z]{2}$` after `upper(btrim(…))`, else NULL):
`has_permission_scoped` casts it with `::character(2)`, which cuts a longer value silently.

## definition

- By the definition (a manifest line whose permission cell names `locations` or `countries`): fourteen lines — 28,
  34, 45, 66, 71, 87, 94, 99, 117, 119, 128, 139, 146, 148 — exactly this GO's fourteen names.
- Functions those bodies call that a browser role may execute: `location_slug_candidate` (helper line 221) and the
  shared `has_permission` (the mechanism's, every family's). Every other callee (`loc_import_plan`, `loc_id_of_key`,
  `loc_export_row`, `loc_key_of`, `loc_path_of`, `country_export_row`, `cat_text`, `cat_int`, `cat_bool`, `cat_pipe`,
  `loc_num`, `rate_gate`, `require_step_up_if_needed`, `admin_save_entity_translation_core`, `log_audit`) is closed
  to the browser roles.
- Against the plan's §5 row ("locations, countries, root order, location imports (`row`), coverage/markets (≈22)"):
  the manifest names no coverage or markets door under these resources (`admin_save_market_settings` is
  `packages:update`, F1-6); the family is fourteen, not about twenty-two.
- A door the list did not name: none. A door that no longer exists: none. A function of the list that only SQL
  calls: none.

## tests

The family's e2e ids by name: `e2e/admin-locations.spec.ts` LT-1, LT-2, LT-3, LT-4, LT-5, LT-6, LT-7, LT-7b, LT-8,
LT-9a, LT-9b, LT-10, LT-11, LT-12, LT-13, LT-14, LT-15, LT-16, OV-1; `e2e/admin-countries.spec.ts` CO-1…CO-9;
`e2e/locations-tree.spec.ts` LR-1…LR-4; `e2e/geo.spec.ts` GE-1…GE-5; `e2e/viewing-place.spec.ts` VP-1…VP-11;
`e2e/post-wizard-place.spec.ts` (PW); `e2e/import-security.spec.ts` IG-1, IG-2, IG-4, IG-5, IG-6;
`e2e/door-refusals.spec.ts` DRF-1…DRF-6 (the mechanism's, no door of this family).

What changes, from the bodies:

- **No e2e assertion reads a sentence this turn folds.** The specs reach the doors only through the screens; their
  refusal checks read visibility (`location-dialog-error`, `location-verb-error`) or a console key's words
  (`admin-countries.spec.ts:312`, `admin.countries.error.notARoot`, which the family's words keep). OV-1 mocks the
  list's rows (shape unchanged). `import-security.spec.ts:823` reads `fileChanged` at 409 — the route's own answer,
  unchanged. LR, GE, VP and PW read the public place readers (F1-5a, F1-5b, F1-7), not these doors.
- **Effects a door now has:** move, delete, reorder and set active spend `staff_config` on every call. No spec counts
  that dial; LT's leased staff make tens of saves an hour, far under 600. No e2e expectation changes; the by-id run
  covers LT-1…16, OV-1, CO-1…9 and IG-1…6.
- **Unit tests whose expectation changes** (STEPS 3–4):
  - `src/features/admin-locations/locations-service.test.ts` PL-3 — the mapper leaves; an unknown message draws the
    console's generic line (`admin.locations.error.unknown`) with no raw text.
  - `src/features/admin-countries/country-dialogs.test.tsx` "reads a database refusal object by its own message" —
    the same, for `admin.countries.error.unknown`.
  - `location-verb-dialogs.test.tsx` (notAChild) and `country-verb-dialogs.test.tsx` (notARoot, scopedRolesExist)
    mock a refusal object whose message is the code: unchanged in substance; their screens read through the reader.
  - `src/server/imports/route.test.ts` IMR-10 (drives the `import already running` sentence row, which leaves) →
    the coded `importRunning` envelope; IMR-8 (drives the `unknownParent: <slug>` key row through a category mock;
    no door answers it since F1-4a — decision 6 at the stop); IMR-14 gains the location commit's and undo's codes
    (`importRunning`, `planHasRefusals`, `unknownBatch`, `batchAlreadyUndone`, `undoBlocked:hasRows`, each at 400 with
    its detail); IMR-13 (locations' dial) unchanged.
  - `src/server/imports/csv.test.ts` CSV-7 — the `permission denied` sentence branch of `exportRefusal` leaves; the
    gate code (`permissionDenied`, with or without `:scope`) stays forbidden.
  - `src/test/list-pages.test.ts` (locations) — the call carries no cast; its rows and order unchanged.
  - `scripts/conformance/door-args.test.ts` DARGS-2 — its allowances (the locations console's two) leave; the planted
    casts gain the `unknown` cast of a door argument that is not a literal `null` (F1-4a's K2).
  - `scripts/conformance/migration-reader.test.ts` — the two import doors leave the computed-declaration list
    (written out whole).
  - New: the family's words — every code each family maps, and the generic fallback.
- Next ids: LT-17, CO-10, IMR-15, CSV-8, PL-4, DRF-7, DARGS-4.

## lists

- **Manifest** (`scripts/doors/manifest.txt`): lines 28, 34, 45, 66, 71, 87, 94, 99, 117, 119, 128, 139, 146, 148 —
  each line's codes cell gains its codes; the dial cells of 28 and 139 and the country cells of 28, 34, 45, 94, 99
  and 128 change (cell-meaning); 221 (the helper) unchanged.
- **Forms allowlist** (`scripts/conformance/forms-allowlist.txt`), the mappers' lines: CF-FORM-3
  `admin-countries/countries-service.ts`, `country-dialog-state.ts`, `country-dialogs.tsx` (:59–61);
  `admin-locations/location-dialog-state.ts`, `location-dialogs.tsx`, `locations-service.ts` (:68–70); CF-FORM-4
  `country-dialog-state.ts` (:81). The CF-FORM-1 lines (:17, :22–25) are wave 3's forms and stay.
- **Public surface** (`scripts/public-surface-allowlist.txt`): lines exist for the commit (:135),
  `admin_set_country_active`, `admin_set_country_root_order`, `admin_upsert_country`, `admin_upsert_location`
  (:140–143); every redeclared function granted to `authenticated` without a line gains a "restated grant (not a new
  surface)" line, as F1-4a's did: move, delete, reorder, set active, undo and the four readers.
- **Acceptance doors** (`scripts/acceptance-doors-allowlist.txt`): :15, 21, 34, 39, 52, 54, 63, 73, 80, 82 — kept
  (the doors still write the same tables after the same refusal).
- **Door check's allowlist** (`scripts/doors/check-doors-allowlist.txt`): no line of this family.
- **CF-DOOR-ARGS** (`scripts/conformance/door-args-allowlist.txt`): :4 (`locations-service.ts:99`, p_level) and :5
  (`:100`, p_active), both F1-4b — they leave.
- **Import registry and relay**: `src/server/imports/registry.ts` `locations` (permission `locations:import`,
  step-up on commit, scope `country-code`, `MAX_ROWS` 5,000 per file) unchanged. `IMPORT_REFUSALS`
  (`src/server/imports/route.ts:62–73`): after this turn no import door raises `permission denied`, `import already
  running`, `unknown import batch`, `batchAlreadyUndone`, `planHasRefusals` or `undoBlocked` (the category,
  attribute and translation doors answer codes since F1-3 and F1-4a, read by every body's last declaration) — those
  six rows leave; `step-up required` stays (the gate's P0009, every family); `unknown category scope` and `unknown
  country scope` stay (the planners, F1-7); `unknownParent` (key) is answered by no door (decision 6).
- **Computed-declaration list** (`scripts/conformance/migration-reader.test.ts:199–200`): both import doors leave.
- **Shared-value tables** (`scripts/conformance/shared-value-tables.txt`): `locations` "read, not shared" (:14); the
  family's tests write scratch places and countries only; no line changes.
- **`scripts/check-import-gate.sh:40`**: the list of import door names called directly — unchanged (no new direct
  call).
- **Register** (`docs/governance/mechanisms.md`, records turn only): the doors' row, the form kit's reader row, the
  row "a door's optional argument" (§14 of the report).

## old-file-readers

```
$ rg -n "permission denied" src e2e scripts --glob "!src/i18n/**" | rg -i "locat|countr|imports/|import-dialog"
scripts/deny-tests/phase1-identity.md:191:    "message": "permission denied for function confirm_home_country"
src/server/imports/route.ts:63:  { match: "permission denied", kind: "exact", status: 403, error: "forbidden" },
src/server/imports/csv.test.ts:63:    expect(exportRefusal({ message: "permission denied" }, "unknown country scope")).toBe(
src/server/imports/csv.ts:69:  if (error.message.includes("permission denied")) return "forbidden";
src/features/admin-locations/locations-service.ts:403:  if (/permission denied/i.test(raw)) {
src/features/admin-countries/countries-service.ts:131:  if (/permission denied/i.test(raw)) {

$ rg -n "import already running|unknown import batch|batchAlreadyUndone|planHasRefusals|undoBlocked|hasRows" src e2e scripts --glob "!src/i18n/**"
src/server/imports/route.ts:65:  { match: "import already running", kind: "exact", status: 409 },
src/server/imports/route.ts:68:  { match: "unknown import batch", kind: "exact", status: 404 },
src/server/imports/route.ts:69:  { match: "batchAlreadyUndone", kind: "exact", status: 409 },
src/server/imports/route.ts:70:  { match: "planHasRefusals", kind: "exact", status: 409 },
src/server/imports/route.ts:71:  { match: "undoBlocked", kind: "exact", status: 409, detail: "hasRows" },
src/server/imports/route.test.ts:408:      error: { message: "import already running" },
src/server/imports/route.test.ts:412:    expect(await refused.json()).toEqual({ error: "import already running" });
src/features/admin-countries/country-import-dialog.tsx:37:  "planHasRefusals",
src/features/admin-countries/country-import-dialog.tsx:38:  "batchAlreadyUndone",
src/features/admin/import-dialog.tsx:247:    if (named === "importRunning" || (status === 409 && named === "import already running"))
src/features/admin-locations/location-import-dialog.tsx:17: * law, `parentLaterInFile`, the delete guards, `planHasRefusals`) is the
src/features/admin-locations/location-import-dialog.tsx:57:  "planHasRefusals",
src/features/admin-locations/location-import-dialog.tsx:58:  "batchAlreadyUndone",
```

The step-up stem (`rg -n -i "step[ -]?up"` over the two console folders, the locations routes, `src/server/imports`
and the three specs, the guard plumbing filtered out) finds the two mappers' `/step[ -]?up/` branches
(`locations-service.ts:407`, `countries-service.ts:135`), the relay's `step-up required` row and its
`stepUpRequired` code (`route.ts:64`, `:126`) and comments; nothing else reads the sentence.

The door names (every changed door, `callers.txt`): the service calls listed under consumers; the routes
(`import.ts:17–19`, `export.ts:41–42`); `route.test.ts:120–122, 236–242, 501–502` (the location route's rpc names,
mocked); OV-1's route mock; the lists above; and the docs `docs/features/geography.md:145–158`,
`docs/features/locations-console.md:35, 121–126, 222`, `docs/features/countries-console.md:13, 45, 50, 62–64, 85`,
`docs/features/imports.md:457–461` (the relay's rows).

What each reads after this turn:

- the two mappers leave (STEP 3); `exportRefusal`'s sentence branch and the six relay rows leave, each with its test;
- the three `startsWith` code branches (`location-verb-dialogs.tsx:245`, `country-verb-dialogs.tsx:54`, `:166`) read
  a code that keeps its name, from the error a refused door answers (non-2xx, so the client's error carries the
  envelope's message) — unchanged;
- the import dialogs' reason lists (`location-import-dialog.tsx:57–58`, `country-import-dialog.tsx:37–38`) name
  per-row planner reasons and the relay's codes by the same names — unchanged;
- `src/features/admin/import-dialog.tsx:247` (outside SCOPE): its `status === 409 && named === "import already
  running"` half becomes dead once the row leaves; the `importRunning` half already answers it — reported (K2),
  not touched;
- the four docs are updated with the client (in scope, `docs/features/**`).

## second-readers

No dynamic `import()`, `loadOnce` or `resilientLazy` of `locations-service`, `countries-service`,
`location-dialog-state` or `country-dialog-state`. `vi.mock`: `location-verb-dialogs.test.tsx:29` (`./locations-service`,
keeping the original and stubbing `listLocations`, `reorderLocations`), `country-verb-dialogs.test.tsx:34`
(`./countries-service`, likewise); `locations-service.test.ts:6` mocks only `@/i18n`. A new export of either
service reaches both partial mocks through `importOriginal`.

## chunk-graph

CENSUS-ITEM chunk-graph: not applicable — no client module moves: the services stay in their folders, the mappers
leave them, and each family's words join its own console folder (as F1-4a's `category-refusals.ts`), which the
entry never reaches (BC-16, "Admin code in the entry's closure: 0 module(s)"). The first-download check at STEP 5
confirms it page by page.

## environments

- The local proof stack (`bun run db:proof --fresh`, 127.0.0.1 only): this executor applies every file of the turn
  there, and nowhere else.
- ethio-staging: the supervisor's side applies the files after the migration stop and reads the marks and bodies
  back; the local by-id browser run needs every mark there (the E2E values are set in this environment — names
  checked, not values).
- ethio-prod: the operator applies the same files after the merge, by the report's pairing lines.

## mechanisms

Read whole at their last declarations: `door_context` (20261106051600 :39; order: class → notSignedIn →
accountDeactivated → `has_permission_scoped` → `require_step_up_if_needed` for a staff door (P0009 sentence kept)
→ `rate_gate(dial)` → `rateLimited`; returns `door_ctx`), `has_permission_scoped` (20261106051500 :60; modes none /
match / global / filter; the country cast `::character(2)`), `door_refuse`, `door_refused` (re-counts the dial for a
non-gate code, meters `door_refusals`, sets `response.status`, returns the envelope), `door_audit`.
`readRefusal` (`src/lib/refusal.ts`) whole: a family's `words` by the code's head, then a door key the catalogue
holds, then a DEC-333 door code → the family's generic, then the family's retiring `sentences`, else the generic;
`ADMIN_REFUSALS` (`src/lib/refusal-tail.ts`) carries only `rateLimited`. The relay's `codedRefusal`
(`src/server/imports/route.ts:120`) whole: a P0D01 error's first refusal (or the raise's `code[:detail]`) answers
itself at the shell's status (401/403/429, else 400), a detail only when it matches `^[A-Za-z0-9_.:+ -]{1,64}$`,
`stepUpRequired` the one 428. Patterns: F1-2's scope proofs (20261114070400: fixed scratch codes `XZ`/`XY` checked
absent, a global and a country-scoped staff, `permissionDenied:scope` for the other country and for none) and its
`filter` reader (`admin_list_users`, `v_ctx.countries IS NULL OR … = ANY (v_ctx.countries)`); F1-4a's two families
(`src/features/admin-categories/category-refusals.ts` and the attributes console's), each a `RefusalFamily` in its
own folder with the console's generic.

## first-download

Base build (`bun run build && node scripts/check-bundle-size.mjs`, this tree, `bundle-base.log`): entry JS
203.6 / 205 KiB, CSS 22.6 / 40 KiB, admin code in the entry's closure 0. Every page (first download / ceiling, KiB):

```
224.9/227 /            222.9/225 /$name           265.8/268 /account          206.2/208 /account_/legal
206.9/209 /account_/legal_/$versionId             223.1/225 /account_/saved   208.0/210 /admin
208.8/211 /admin/      324.0/325 /admin/ai        337.6/338 /admin/attributes 294.0/295 /admin/audit
345.5/346 /admin/categories                       326.8/328 /admin/countries  208.7/210 /admin/images
291.6/293 /admin/impersonation_/$sessionId        282.0/283 /admin/legal      279.0/280 /admin/legal_/$versionId
281.0/282 /admin/legal_/edit                      348.4/349 /admin/listings   352.5/353 /admin/listings_/$listingId
410.5/411 /admin/listings_/$listingId_/edit       269.8/271 /admin/locations  333.4/334 /admin/monetisation
328.3/329 /admin/places                           292.9/294 /admin/roles      273.4/274 /admin/roles_/$roleId
369.4/370 /admin/screening                        304.1/305 /admin/translations
307.5/308 /admin/translations_/$lang              291.8/293 /admin/users      289.5/290 /admin/users_/$userId
219.5/223 /auth        207.1/209 /auth_/callback  209.1/211 /auth_/reset      224.9/227 /c/$slug
225.0/226 /dev/primitives                         246.1/248 /dev/style        203.9/206 /dev/tall
255.5/257 /l/$slug     208.3/210 /legal/$kind     214.5/217 /legal/accept     209.1/211 /legal/publishing
311.0/315 /my-listings 319.6/323 /my-listings_/$listingId                     402.6/404 /my-listings_/$listingId_/edit
402.6/404 /post        402.6/404 /post_/$listingId                            208.3/210 /privacy
274.2/277 /settings    208.3/210 /terms
```

This family's pages: `/admin/places` (the locations console, `src/routes/admin.places.tsx`) 328.3 / 329 — 0.7 KiB of
room; `/admin/countries` 326.8 / 328 — 1.2; `/admin/locations` (the overview, reading both lists through the
consoles' hooks) 269.8 / 271 — 1.2.

## premises

- The plan's §5 row counts the family at about twenty-two with "coverage/markets": by the definition it is fourteen
  (definition).
- The GO's consumers name "every other screen that reads `admin_list_countries`": there is one, the locations
  overview (`src/features/admin-overview/locations-overview.tsx:35`, through `useAdminCountries`); its reading (one
  generic line) does not change, so it is not edited. The users console reads the `countries` table, not the door
  (`src/features/admin/users/admin-users-service.ts:199`).
- The GO's e2e families (LT, OV, CO, LR, GE, VP) leave out IG-1…6, which drive the location import route.
- `admin_list_locations`'s line says `filter` while its body does not narrow by the caller's countries; this turn
  narrows it (cell-meaning).
- F1-4a's ruling ("the relay's rows that stay are the location imports' only") holds except for the `unknownParent`
  key row, which no import door raises since F1-4a (decision 6 at the stop).

## findings

- `admin_commit_location_import` takes `p_digest` and only writes it into its audit line; the file-changed check is
  the route's (`fileChanged`, 409, before the door). Recorded, not changed (the import's accepted file does not change
  here).
- `location_slug_candidate` keeps EXECUTE for `authenticated` (its manifest reason "invoker-chain") while every caller
  runs as its owner (three SECURITY DEFINER doors and a SECURITY DEFINER trigger) and no client code calls it — the
  class of INC-1162 (a helper's grant that outlived its callers). It answers a free slug among siblings; owner F1-7.
- `src/features/admin/import-dialog.tsx:247` keeps a branch for the sentence `import already running` at 409 that no
  route answers after this turn (K2; outside SCOPE).
- The locations console pages the list reader by `id` over the function's result (`readAllPages`), so the reader's
  whole query runs once per page of 1,000 rows (the plan below is per page) — recorded, no change.
- Before-measure on the local stack (`probe-before.txt`), the largest file the gate admits (5,000 location rows: 100
  regions, 4,900 cities, one scratch country): preview 6,470 ms, commit 8,898 ms. The readers' plans before:
  `admin_list_locations` — incremental sort over `locations_country_idx`, five index-backed subplans except
  `profiles` (a sequential scan per place for `default_post_location_id`); `admin_list_countries` — sort over a hash
  left join of `countries` and the anchors, four subplans (`user_roles` by a sequential scan); the export's places
  aggregate — a sequential scan and sort of `locations`. The after-measure and after-plans come from the same probe on
  the redeclared bodies (STEP 2).

No security hole found.

## queued

`rg -n "F1-4b" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance scripts/doors`:

- `scripts/conformance/door-args-allowlist.txt:4–5`, `door-args.test.ts:33`, F1-4a's report :213, :236, :432, :448,
  :455 and census :345, :372, :381, its ruling :42 — the locations casts onto `DoorArgs`, their allowlist lines gone,
  the widened rule — **built here** (STEP 3).
- F1-4a's ruling :7 — the order law for the location imports — **built here** (no SQL caller: doors only, in order).
- F1-4a's report :455 — the planners' `unknown category scope` sentence → **left** (F1-7), and this family's
  `unknown country scope` with it.
- The plan's §5 row (`f1-doors.stop-1.md:478`) — **built here**, by the definition.
- `roadmap.md:3` and the brief's own lines — this turn.
