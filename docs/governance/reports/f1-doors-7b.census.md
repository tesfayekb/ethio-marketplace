# f1-doors-7b — the census (STEP 1)

Base: dev cca37d0cd (the lane `cursor/f1-doors-7b` from origin/dev at cca37d0cd, which holds the merge of pull request
#75). Every live fact below comes from two read-only probes run on the local proof stack (`bun run db:proof --fresh`,
DEC-343): a scratch migration that raised its readings and was moved out of the tree after each run (`git status
--short` empty after each). The probes' text and output are kept under `/tmp/ethio-scratch/f1-doors-7b/` (probe1.sql,
probe2.sql and their `.out`), the operator's to remove. Static facts come from the last declarations in
`supabase/migrations/` (read through `scripts/conformance/migration-reader.ts`'s `lastDeclarations` where a file reader
is named) and from `rg` over `src/`, `e2e/`, `scripts/`. The newest migration mark on the stack: 20261119170900.
md5 is always `md5(replace(prosrc, chr(13), ''))`; no body below holds a CR on the local stack.

## consumers

One row per function this turn redeclares (14), from its LIVE body. "Manifest" is its line in
`scripts/doors/manifest.txt` (or `-` for a helper, trigger or core that is not browser-callable).

| # | function | last change (file:line) | live md5 | manifest | callers (client) | SQL callers |
|---|---|---|---|---|---|---|
| 1 | `locations_ancestry_guard()` trigger, VOLATILE DEFINER | `20260916215832_7fcdddce-9296-4db6-b4c3-535bcb0794df.sql:21` | `b48ccd384604f2f5e27270a75afc7eec` | - (trigger; EXECUTE PUBLIC/anon/authenticated revoked) | every writer of `locations` (definition) | fires on every INSERT/UPDATE of `locations` |
| 2 | `admin_save_entity_translation_core(text,uuid,text,text,text)` INVOKER | `20261114113600_c0e4a4ff-376e-4a62-ab9a-25d6f2a8a0fb.sql:36` | `2a931fe0328dc630c657d52ab3b99d5e` | - (core; no browser grant) | via its callers | `admin_save_entity_translation`, `admin_commit_attribute_import`, `admin_commit_category_import`, `admin_commit_location_import`, `admin_undo_category_import` |
| 3 | `impersonation_target(uuid)` STABLE DEFINER | `20260822073000_d748b282-1618-4d54-8c58-88f9e194130c.sql:219` | `a50583be2e3d2768b10b9cefd04a06d3` | - (closed to the browser since F1-7a part 9) | via its callers | `impersonated_get_profile`, `impersonated_list_listings` (both `door_context('reader')`, no shell) |
| 4 | `loc_import_plan(jsonb,jsonb,text)` STABLE DEFINER | `20260917205429_b76587b4-ed9b-4ec7-bc08-42da95caf653.sql:18` | `f8dffb8064d4537411b98f77f14329e4` | - (service_role only) | via its callers | `admin_preview_location_import` (staff-reader, no shell), `admin_commit_location_import` (shell) |
| 5 | `cat_import_plan(jsonb,text)` VOLATILE DEFINER | `20261015012743_a5300c28-14fb-4318-8450-bd900cf5c527.sql:36` | `c668f8b04c903f60f0117051107cf800` | - (service_role only) | via its callers | `admin_preview_category_import` (staff-reader), `admin_commit_category_import` (shell) |
| 6 | `attr_import_plan(jsonb,jsonb,text)` STABLE DEFINER | built at run time: `COMPUTED_BY_HAND` since 20261017093039 (chunks of `migration_text_parts` run by `EXECUTE`); the reader's last event `20261017092635_bcf828e1-cb0c-4716-a57f-c0a1d0486437.sql:52` (computed) | `7a2cb3062a843c2d16ce1b5be5be90ef` (66,916 bytes, read whole from the catalogue by probe 2, decoded md5 equal) | - (service_role only) | via its callers | `admin_preview_attribute_import` (staff-reader), `admin_commit_attribute_import` (shell) |
| 7 | `attr_export_payload(text)` STABLE INVOKER | `20261017091554_d45cdd2f-c946-4bb9-9f4d-007229e5865d.sql:265` | `5cec4c6a3f3b2fdf68a739722bba05be` | - (closed to the browser since F1-7a part 10) | via its callers | `admin_export_attributes(text)` (staff-reader, no shell); `import_readonly_ignored` (word match: a comment) |
| 8 | `admin_export_categories(text)` STABLE DEFINER | `20261115023100_4bce8e61-e960-4725-986f-89a38ccf3c97.sql:219` | `e0b47db317c37a67d62ddb02b929cdeb` | line 43 (staff-reader, categories:view, global) | `src/routes/api/admin/categories/export.ts:35` | - |
| 9 | `admin_export_locations(text)` STABLE DEFINER | `20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql:51` | `3754109e0273d14cdb0425a57296eef5` | line 45 (staff-reader, locations:view, arg:scope) | `src/routes/api/admin/locations/export.ts:41-42` | - |
| 10 | `assign_role(uuid,text,character)` VOLATILE DEFINER | `20261114070400_7102c888-3b97-4325-b985-2b978069b94e.sql:40` | `1546e9c54840be08feb2f509b1e18958` | line 152 (staff, roles:assign, staff_config, arg:scope_country; codes roleReserved,unknownRole) | `src/features/admin/users/admin-users-service.ts:168` (`assignRole`, never sends `p_scope_country`), drawn by `user-detail.tsx:361` as the one line `admin.users.roles.failed` | - |
| 11 | `admin_upsert_country(text,text,text,text,integer)` VOLATILE DEFINER | `20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql:36` | `d897481fbdaca05de73d6f6d2b8979ba` | line 147 (staff, countries:update, global) | `src/features/admin-countries/countries-service.ts:74` | - |
| 12 | `admin_set_country_active(text,boolean,boolean)` | `20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql:38` | `ee6abf5b62714bb22868ab96d646f3fb` | line 118 (staff, countries:activate, row:countries.code) | `countries-service.ts:95` | - (`admin_upsert_country` names it in a comment only) |
| 13 | `admin_set_country_root_order(text,uuid[])` | `20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql:100` | `539563ee560f0cfab603e045e4023f9f` | line 120 (staff, countries:update, row:countries.code) | `countries-service.ts:108` | - |
| 14 | `admin_undo_location_import(uuid)` VOLATILE DEFINER | `20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql:38` | `03bdb90b19982f9b4e17f1b6212eb8a3` | line 140 (staff, locations:import, import_undo, row:locations.country_code; codes batchAlreadyUndone,undoBlocked,unknownBatch) | `src/routes/api/admin/locations/import.ts:19` through `src/server/imports/route.ts` | - |

What each raises today and what it answers after the turn:

| # | today | after |
|---|---|---|
| 1 | `RAISE EXCEPTION` (P0001) `rootMustBeCountry`, `badSlug`, `missingCoordinates`, `parentMissing`, `levelMismatch`, `crossCountry`, `parentInactive`; no range rule | the same seven words through `door_refuse` (P0D01, same message text), plus `badCoordinates` for a latitude outside −90…90 or a longitude outside −180…180 (NaN and ±Infinity included: they compare outside) |
| 2 | `permissionDenied` (no detail) when the caller lacks `translations:update`; `permissionDenied:language`; `badValue:field`; `baseLocked`; `unknownEntity`; step-up P0009 | `permissionDenied:translations` for the missing right (decision: the gate's form is one lowercase word after the colon — `scope` from `has_permission_scoped`; the core already says `language`); the rest unchanged |
| 3 | `impersonation session expired` (P0001) | `noActiveSession` (P0D01) — the code `end_impersonation` already answers for the same state (`20261114070700_e30e4335…:112`) |
| 4 | `unknown country scope` (P0001); a scope or a countries-file code longer than two letters raises 22001 at `v_scope char(2) :=` / `v_code char(2) :=` (both before their checks); no range rule; a countries row is planned with no country right named | `unknownCountry` (P0D01) for the scope; the two typed assignments read the text first (a long countries-file code is the row's existing `badCountryCode` reason); a row whose `center_lat`/`center_lng` is out of range is the row's reason `badCoordinates`; INC-1164 (by number, G51): every planned countries row needs the right the country doors require for that change, else its row reason `permissionDenied` with the right's action as detail (`update` or `activate`), the service role passing |
| 5 | `unknown category scope` (P0001) | `unknownCategory` (P0D01) |
| 6 | `unknown category scope` (P0001) | `unknownCategory` (P0D01) |
| 7 | `unknown category scope` (P0001) | `unknownCategory` (P0D01) |
| 8 | `unknown category scope` (P0001), after its gate | `unknownCategory` (P0D01) |
| 9 | `unknown country scope` (P0001); a long `p_scope` raises 22001 at `v_scope := upper(btrim(p_scope))` (char(2)) first | `unknownCountry` (P0D01), the text read before any typed assignment |
| 10 | no target check: an unknown `p_target_user` reaches `user_roles_user_id_fkey` (23503); a `p_scope_country` longer than two letters reaches `user_roles.scope_country char(2)` (22001) | `unknownUser` before the insert (read where the foreign key reads: `auth.users`); `badCountryCode` when `p_scope_country` is given and `upper(p_scope_country) !~ '^[A-Z]{2}$'` (the country doors' own check) |
| 11–13 | `v_code char(2) := upper(coalesce(p_code,''))` before `IF v_code !~ '^[A-Z]{2}$'` — a long code raises 22001 there (INC-1163) | the check reads `upper(coalesce(p_code,''))` as text before the assignment; a long code answers `badCountryCode` |
| 14 | writes a country's row back from its revision under `locations:import` alone | INC-1164 (by number): each country revision is undone only under the right its forward change needed (the same table as #4), else `permissionDenied[:scope]` (the gate's form, from `has_permission_scoped`), the service role passing |

The parsers of refusals that read any of the above (PREVENTION (1)), with their rules, read whole at the base:

| parser | rule | what it hears after the turn |
|---|---|---|
| `readRefusal` / `splitRefusal` (`src/lib/refusal.ts:86,221`) | code first: the head before the first colon is looked up in the family's `words` (`ownValue`), then a known DOOR_KEY, then any door code → the family's generic, then the family's `sentences` (regex); the detail is everything after the first colon (any characters) | the places mapper reads the seven unchanged and `badCoordinates` (no words yet → the family's generic `admin.locations.error.unknown` until STEP 3 adds its line); `permissionDenied:translations` → the family's `permissionDenied` words with its tail |
| `doorRefusal` (`src/lib/door-error.ts:41`) | code and detail through `splitRefusal`; a bare `code[:token]` kept whole | unchanged rule; no route of this turn's families calls it |
| `readerFailure` (`src/lib/reader-failure.ts:29`) | the gate code first (`notSignedIn`/`accountDeactivated` → auth; four reader codes → refused), then status (401/403 → auth; ≥500 → server), then P0001 or a gate-code head → refused | the impersonation readers' `noActiveSession` arrives as P0D01 at HTTP 500 (INC-1213, F1-7c) → class `server`; the impersonation view asks `isExpiredSessionError` first (`impersonation-view.tsx:66-67`), so STEP 3 changes only that function |
| `IMPORT_REFUSALS` + `relay` (`src/server/imports/route.ts:57,128`) | `codedRefusal` first (SQLSTATE P0D01: the envelope's first refusal or the raise's `code[:detail]`; status `CODE_STATUS` else 400; detail kept when it matches `^[A-Za-z0-9_.:+ -]{1,64}$`), then an exact whole-message match (`step-up required` → 428; the two scope sentences → 404), then a DOOR_KEY → 409, else 500 | a planner's `unknownCategory`/`unknownCountry` raise from a preview, or the commit's envelope, is answered by `codedRefusal` as 400 with its code (it was 404 with the sentence); the two scope rows of the table answer nothing any more (STEP 3 removes them, with IMD-6's vocabulary); the trigger's codes inside a commit's shell become a coded 400 (they were P0001 → 500); `permissionDenied:translations` → 403 with detail `translations` |
| `exportRefusal` (`src/server/imports/csv.ts:64`) | `doorCode(error).code === "permissionDenied"` → `forbidden`; else `message.includes(<sentence>)` → the sentence; else null → `readFailure` 500 | a reader's `unknownCategory`/`unknownCountry` raise matches neither → 500 until STEP 3 reads the code (`doorCode(error).code`) and the three export routes answer it |
| `isExpiredSessionError` (`src/features/admin/impersonation/impersonation-service.ts:136`) | `errorText(error).includes("impersonation session expired")` | false for `noActiveSession` until STEP 3 reads `doorCode(error).code === "noActiveSession"` |
| `LOCATION_REFUSALS` + `useLocationRefusal` (`src/features/admin-locations/location-refusals.ts:19,63`) | through `readRefusal`: an error's or envelope's `message` head looked up in `words`, whatever the SQLSTATE (the code comment says P0001; the reader never tests it) | the seven read exactly as before (same message text, now through the shell's envelope); `badCoordinates` → the generic line until STEP 3 adds `admin.locations.error.badCoordinates` |

Other parsers the census found reading any of these codes (the `rg` of every sentence and code across `src/`):
`src/features/admin-locations/location-import-dialog.tsx:25` `REASON_KEYS` (a Set of the planner's row reasons; a
reason not in it draws `admin.locations.import.reason.unknown`; `badCoordinates` and `permissionDenied` join it in
STEP 3); `src/features/admin-categories/category-import-dialog.tsx:42` and
`src/features/admin-attributes/import-dialog.tsx:37` hold `unknownCountry` / `unknownCategory` as row reasons already
(row reasons, not the scope raise); `src/features/admin-countries/country-refusals.ts:23` (`badCountryCode` and
`unknownCountry` words, unchanged — the country doors answer the same codes, now for every value);
`src/features/admin/users/user-detail.tsx:361` (one generic line for any role refusal — `unknownUser` and
`badCountryCode` draw it, no change).

## definition

Each set by its definition, from the live catalogue (probe 1: every public function whose name is in the turn's list
OR whose `prosrc` matches `unknown [a-z]+ scope`, `impersonation session expired`, a `raise exception '<one of the
seven>'`, `(insert into|update|delete from) (public.)?locations\M` or `…countries\M`, or a call of an entity
translation core), cross-checked against the files (`lastDeclarations` over `supabase/migrations/`, the same three
write patterns plus `country_root_order`).

- Writers of `locations` (catalogue and files agree, 10): `admin_commit_location_import`, `admin_delete_location`,
 `admin_move_location`, `admin_reorder_locations`, `admin_set_country_active`, `admin_set_location_active`,
 `admin_undo_location_import`, `admin_upsert_location`, `countries_anchor_on_insert` (trigger on `countries`),
 `locations_ancestry_cascade` (trigger on `locations`: it updates the descendants, so the guard fires on each). The
 brief's list names the console doors, the import commit, move and reorder; the census adds the delete door (it fires
 no INSERT/UPDATE trigger), the undo, `admin_set_country_active` (the anchor row), the two triggers.
- Writers of `countries` (4): `admin_upsert_country`, `admin_set_country_active`, `admin_commit_location_import`,
 `admin_undo_location_import`; of `country_root_order` (3): `admin_set_country_root_order`,
 `admin_commit_location_import`, `admin_undo_location_import`. Difference from the brief: `admin_undo_location_import`
 (the brief's "any other writer of countries the census finds") — it restores a country's fields, root order and
 open state from a revision, and deletes a country its batch created.
- Planners or exports raising an `unknown … scope` sentence (6): `unknown category scope` in `admin_export_categories`,
 `attr_export_payload`, `attr_import_plan`, `cat_import_plan`; `unknown country scope` in `admin_export_locations`,
 `loc_import_plan`. No other `unknown <word> scope` (probe tag `otherScope`: none). Difference from the brief: the
 brief names `admin_preview_location_import` as raising it; the raise is in `loc_import_plan`, which the preview and
 the commit both call.
- Functions raising a plain sentence or a raw error a door could foresee, of the GO's classes: the 14 rows above. The
 class "a typed variable's length" has three instances beyond the brief's three country doors: `loc_import_plan`'s
 `v_scope` and `v_code` (char(2), both assigned before their checks), `admin_export_locations`' `v_scope`, and
 `assign_role`'s `p_scope_country` into `user_roles.scope_country char(2)`. The other doors whose country cell is an
 argument (`admin_save_legal_draft`, `admin_save_level_override`, `admin_save_market_settings`,
 `admin_save_package_price`, manifest `arg:` cells) compare the argument to `countries.code` and refuse by their own
 code before any write (`20261114114200_0165890e…:60`, `20261119030700_eacb4fad…:61`, `20261119030800_cccdea6a…:189`,
 `20261119030500_302ae04a…:63`): not instances.
- Read policies on a table the browser roles cannot read (probe 1, `DEADREADPOLICIES`: SELECT or ALL policies on a
 table where neither anon nor authenticated holds SELECT): two permissive `USING (true)` rules —
 `attributes.attributes_public_read` and `category_attribute_links.cal_public_read` — and 60 deny rules
 (`USING (false)`, e.g. `rate_dials_no_client`, `door_refusals_no_select`). A deny rule admits nothing with or
 without a grant: dropping one stops nothing (PREVENTION (3)), so none is touched. `category_attributes` is the third
 table the GO names: anon and authenticated DO hold SELECT (table-level, and column grants on all 18 columns) and
 `category_attributes_public_read` (`USING (true)`) serves it.

## tests

e2e: no spec reads a sentence, raise or code this turn changes. The `rg` over `e2e/` for the two scope sentences,
`impersonation session expired`, the seven trigger words in an assertion, `unknownUser`, `badCountryCode`,
`permissionDenied:language`, `admin.locations.error.*` and `admin.locations.import.reason.*` finds only comments
(`e2e/helpers/locations.ts:352`, `e2e/admin-translations-data.spec.ts:138`) and the import-security family table's
`badSlug`/`tooLong` identity reasons of OTHER families. The e2e staff pool holds `super_admin` (`e2e/global-setup.ts:322`),
so INC-1164's rule leaves every import spec as it is (`IG-1`…`IG-6` locations-countries/locations-locations previews,
`CO-3` the countries file). The trigger's eight codes: every e2e seed writes in-range coordinates (lat 8–10, lng
38–39). CT-41 (`e2e/admin-categories-home.spec.ts:259`) sends POST/PATCH/DELETE to `category_attributes` with a super
admin's token and expects 42501: still 42501 after the SELECT grants leave (no INSERT/UPDATE/DELETE grant before or
after). The specs that read `attributes` / `category_attribute_links` read them with the service client
(`adminClient()` / the setup's service `supabase`): unchanged.

Unit tests that read a changed answer, with the exact new expectation (STEP 3/4):

| test | today | after |
|---|---|---|
| `src/server/imports/csv.test.ts` CSV-7 (`exportRefusal`) | the sentence in, the sentence out | `exportRefusal({ message: "unknownCategory", code: "P0D01" })` → the code (the form STEP 3 picks); the sentence lines leave |
| `src/routes/api/admin/exports.test.ts` EXR-1…6 | mocks; none sends a scope refusal | a new EXR-7: an unknown scope answers the code at the route's status |
| `src/server/imports/route.test.ts` IMR-1…15 | no test of the two table rows | a new IMR-16: a preview's `unknownCountry` raise → 400 `unknownCountry` (or the status STEP 3 keeps) |
| `scripts/conformance/import-doors.test.ts` IMD-6 | the table's words include the two sentences | the words without them |
| `src/features/admin/impersonation/impersonation-service.test.ts` ("reads an expired-session database refusal object", no id) | `{ message: "impersonation session expired", code: "P0001" }` → true | `{ message: "noActiveSession", code: "P0D01" }` → true; the sentence → false |
| `src/features/admin-locations/location-refusals.test.tsx` LRF-1 (exact `Object.keys(words)` list), LRF-2 (the seven as raised P0001) | 7 trigger ids | LRF-1's list gains `badCoordinates`; LRF-2 reads the eight as the shell's envelope (P0D01) and as a raise; a new LRF-6 for `badCoordinates` |
| `src/features/admin-countries/country-refusals.test.tsx` | `badCountryCode` words | unchanged |
| `scripts/conformance/migration-reader.test.ts` MGR-6 (`staleComputedByHand`) | `attr_import_plan` computed | `attr_import_plan` leaves `COMPUTED_BY_HAND` (its last event becomes this turn's literal declaration; the line would be stale) |
| `scripts/doors/check-doors.test.ts` | planted lines only | unchanged; `check-doors` static judges the two changed manifest lines |

Every code a function of this turn can answer after it, and the proof that reaches it (STEP 2's proofs on scratch
rows): the trigger's eight from a scratch insert and update, through a door's shell as `{ok:false}` and through a
direct write as the raise; `unknownUser`, `badCountryCode` (assign_role, a 3-letter scope); `badCountryCode` from each
of the three country doors for a 3-letter code; `noActiveSession` from both impersonation readers; `unknownCategory`
from the six category planners/exports' callers; `unknownCountry` from the places export and preview; the planner's
`badCoordinates` and `permissionDenied` row reasons; `permissionDenied:translations` from a commit whose caller lacks
`translations:update`; the undo's `permissionDenied` for a scratch holder of `locations:import` alone.

The next id of each family the turn adds to: LRF-6, CSV-8, EXR-7, IMR-16, MGR-9, IMD-8, LT-17, CO-10, IG-7, AU-15.

## lists

- The manifest (`scripts/doors/manifest.txt`): `assign_role` line 152 codes cell `roleReserved,unknownRole` →
 `badCountryCode,roleReserved,unknownRole,unknownUser`; `admin_undo_location_import` line 140 codes cell
 `batchAlreadyUndone,undoBlocked,unknownBatch` → `batchAlreadyUndone,permissionDenied,undoBlocked,unknownBatch`
 (`judge.ts:172` compares the cell with every `door_refuse('<code>'` literal in the body; `admin_end_package_price`
 line 39 is the precedent for `permissionDenied` in the cell). No other line changes: the trigger's codes are not in
 any door's body; the three country doors keep `badCountryCode`; the exports and previews are readers.
- The door check's allowlist (`scripts/doors/check-doors-allowlist.txt`, 5 lines): none names a function of this turn.
- The public-surface allowlist (`scripts/public-surface-allowlist.txt`): no line names `attributes`,
 `category_attribute_links` or `category_attributes` (their grants are older than the guard's floor); a REVOKE needs no
 line. `attr_export_payload`'s RETIRED line stays as it stands.
- The security lints (`scripts/security-lints.ts`, `security_lints()`, baseline
 `scripts/security-lints-baseline.json`): five counts, none over policies; a table with row security and no policy
 counts in none. No change.
- The migration reader's computed-declaration list (`COMPUTED_BY_HAND`, `scripts/conformance/migration-reader.ts:39`):
 `attr_import_plan` leaves (MGR-6 would call the line stale once a literal declaration follows its `since`).
- The acceptance-doors allowlist (`scripts/acceptance-doors-allowlist.txt:74`, the undo; `:84`, `assign_role`): their
 reasons stay true (each still "rejects callers lacking … before its mutations"); no change.
- The route table of `src/server/imports/route.ts:57`: the two sentence rows leave in STEP 3 (the 4b ruling's law: a
 row leaves only when no function the route calls still raises it — after this migration none does: the probe's
 `unknown [a-z]+ scope` set becomes empty).
- The register (`docs/governance/mechanisms.md`): the doors' row gains the brief's sentence — through §14, not edited
 here (DEC-346).

## old-file-readers

`rg -n "supabase/migrations" src e2e scripts --glob '*.test.*' --glob '*.spec.*'` — 52 hits. Each answered:
`scripts/conformance/import-doors.test.ts:138` (IMD-7: finds `import_gate_audit` by its declaration — not redeclared);
`perm-vocabulary.test.ts`, `briefs.test.ts`, `lanes.test.ts:442,456`, `migration-reader.test.ts`,
`check-doors.test.ts`, `e2e-select.test.ts`, `ci/lovable-branch-guard.test.ts`, `ci/docs-only.test.ts` (planted trees or
path strings); `lanes.test.ts:385` (every file's statement-level triggers — this turn creates none);
`migration-proof-keys.test.ts:10` (judges the proofs' scratch keys — this turn's proofs obey it);
`src/features/admin-listings/tier-reasons.test.ts:30,32`, `move-reasons.test.ts:12`, `posting/alias-rules.test.ts:40`,
`admin-listings/history.test.ts:18`, `legal/legal-kinds.test.ts:18`, `admin-monetisation/monetisation-service.test.ts:40-51`
(named files of other families; none reads a function this turn redeclares).
`rg -n "FUNCTION public\\." src --glob '*.test.*'` — 4 hits: `monetisation-service.test.ts:370`,
`tier-reasons.test.ts:36-37`, `legal-kinds.test.ts:20`: none names a function of this turn.

`rg -F` of each sentence this turn turns into a code, across `src/`, `e2e/`, `scripts/` (locales and generated types
aside):

```
unknown category scope: src/routes/api/admin/categories/export.ts:40, src/routes/api/admin/attributes/export.ts:43,
  src/server/imports/route.ts:51,59, src/server/imports/csv.ts:66, src/server/imports/csv.test.ts:61,67
unknown country scope: src/routes/api/admin/locations/export.ts:44, src/server/imports/route.ts:51,60,
  src/server/imports/csv.ts:66, src/server/imports/csv.test.ts:63,66,68,69
impersonation session expired: src/features/admin/impersonation/impersonation-service.ts:138,
  src/features/admin/impersonation/impersonation-service.test.ts:6
the seven trigger words: src/features/admin-locations/location-refusals.ts:12-30 (comment and words),
  location-refusals.test.tsx:25-52,83-84, location-import-dialog.tsx:29-33 (row reasons),
  location-form-fields.tsx:24, location-verb-dialogs.tsx:102 (comments), e2e/helpers/locations.ts:352 (comment),
  e2e/admin-translations-data.spec.ts:138 (comment); `badSlug`/`parentInactive` elsewhere are other families' codes
```

## second-readers

`rg "(vi\.mock|import\(|loadOnce\(|resilientLazy\()…"` over `src/`, `e2e/`, `scripts/` for the client modules STEP 3
may change: `src/components/shell/impersonation-notice.tsx:13` loads `impersonation-service` through `loadOnce`, and
`impersonation-notice.test.tsx:12` mocks it (`vi.mock`, a whole-module factory: a new export there needs no mock line
unless the notice calls it); `src/i18n/compiled-catalog.ts:44-45` loads `en-admin`/`am-admin` on demand;
`country-verb-dialogs.test.tsx:34` mocks `countries-service` (unchanged); `alias-reason.test.ts:7` imports
`admin-users-service` (unchanged). `location-refusals.ts`, `location-import-dialog.tsx`, `csv.ts` and `route.ts` have
no dynamic importer and no mock.

## chunk-graph

Before, from the lock-exact build at the base (`bun install --frozen-lockfile && bun run build`, then
`/tmp/ethio-scratch/f1-doors-7b/closures.mjs` over `scripts/bundle-closure.mjs`'s `staticClosure(routePreloads(…))`, gzip
bytes per chunk; full table: `/tmp/ethio-scratch/f1-doors-7b/closures-base.txt`, 588 lines). The chunks that carry a
module this turn's clients change, and the page totals:

| page | total gzip B | the changing chunk in its closure |
|---|---|---|
| `/admin/places` | 310,667 (303.4 KiB, 72 chunks) | `admin.places-zFsotWL_.js` 8,418 B (holds `location-refusals.ts` and the import dialog's reasons) |
| `/admin/locations` | 272,792 (266.4 KiB, 38 chunks) | `admin.locations-CNHlGgPD.js` 1,209 B (no changing module) |
| `/admin/countries` | 310,152 (302.9 KiB, 73 chunks) | `admin.countries-M_3U1KKH.js` 5,757 B (unchanged module) |
| `/admin/users_/$userId` | 295,617 (288.7 KiB, 56 chunks) | `admin.users_._userId-CXMPBN5K.js` 4,716 B; `impersonation-service-C4G6Q2Vn.js` 883 B |
| `/admin/impersonation_/$sessionId` | 295,508 (288.6 KiB, 63 chunks) | `impersonation-service-C4G6Q2Vn.js` 883 B |
| `/admin/users` | 295,728 (288.8 KiB, 59 chunks) | none |
| `/admin/roles` | 298,436 (291.4 KiB, 62 chunks) | none |
| `/admin/categories` | 352,508 (344.2 KiB, 85 chunks) | none (the scope reason is the server's) |
| `/admin/attributes` | 321,094 (313.6 KiB, 71 chunks) | none |

`en-admin-DjBok8aT.js` (28,893 B) and `am-admin-CZEf7N7x.js` (35,550 B) are in no page's first download (loaded on
demand by `compiled-catalog.ts`). After: STEP 5's build, chunk by chunk, in the report.

## environments

The migration reaches: the local proof stack (`bun run db:proof --fresh`, me, every file in order); ethio-staging (the
operator's paste from the supervisor's message of links, or the supervisor's connector for one or two files without
a DROP — DEC-384; this turn's files hold DROP POLICY, so the paste); ethio-prod (after the merge, the same pairing
lines). The proofs' first run on a shared database is the staging apply.

Every path that fires `locations_ancestry_guard`, and what each sees after the change:

| path | today | after |
|---|---|---|
| a console door on the shell (`admin_upsert_location`, `admin_move_location`, `admin_reorder_locations`, `admin_set_location_active`, `admin_set_country_active`'s anchor write) | a trigger word raises P0001 THROUGH the shell: the call fails as an error whose message is the word | the shell catches P0D01: `{ok:false, code:'P0D01', message:'<word>', refusals:[…]}` at 400; `door_refused` meters a `door_refusals` row and re-counts the door's dial (as for any door's own code); the client's mapper reads the same message |
| `admin_upsert_country` (its insert fires `countries_anchor_on_insert`, whose insert fires the guard) | as above | as above, through `admin_upsert_country`'s shell |
| the import commit and undo (`admin_commit_location_import`, `admin_undo_location_import`, shells) | P0001 → the route's relay: no code, no table row → 500 | P0D01 envelope → `codedRefusal` 400 with the code; the planner flags `badCoordinates` first, so a commit meets it only for a row the plan did not see |
| `locations_ancestry_cascade` (descendants' `region_id`/`city_id` on a move) | the guard re-judges each descendant | the same, the range rule included: a descendant with an out-of-range point would refuse its ancestor's move — none exists (0 of 280 locally; the brief's prod read: 0 of 730) |
| a migration's own write (seeds, proofs) | P0001 aborts the migration | P0D01 aborts it (same message); this turn's proofs read SQLSTATE P0D01 |
| a test's service-client seed (`e2e/helpers/locations.ts`, the specs' service inserts) | PostgREST error, code P0001, the word as message | code P0D01, same message; no spec reads the code; every seed is in range |

## mechanisms

Read whole at their last declarations: `door_refuse(text,text)` (`20261106051500_6d2f0f3e…:31`, INVOKER, md5
`55f9bf0a6c4c4b2cc57d304df779e7fc`): `code` must match `^[a-z][A-Za-z]*$`, raises P0D01 with `code[:detail]`.
`door_refused(text,text,text)` (`20261119150000_1b7e8a6b…:97`, md5 `990719366502e9e9f0e92a62692cb3f8`): meters the
refusal, re-counts the dial except for the gate codes and `rateLimited`, sets `response.status` (401 notSignedIn, 403
permissionDenied/accountDeactivated, 428, 429, else 400), returns the envelope. `door_context(…)`
(`20261119150000_1b7e8a6b…:32`, md5 `1136caf7f43e38e4ee9a1852635333f8`): the service role returns at once; caller class
→ deactivation → `has_permission_scoped` → `door_refuse('permissionDenied', v_detail)` — THE DETAIL FORM: NULL or
the one lowercase word `has_permission_scoped` gives (`scope`) → step-up (`require_step_up_if_needed`, skipped for a
staff reader) → dial (`rateLimited:<resets_at>`). `has_permission_scoped(uuid,text,text,character,text)`
(`20261106051500_6d2f0f3e…:60`, md5 `3825186312d23eb61175be8134b624f8`): NULL or deactivated uid → false; super admin
→ true; `none` → `has_permission`; `global` → a global grant, else detail `scope`; `match` → a global grant, or a
country grant whose country equals `nullif(upper(btrim(p_country)),'')::character(2)` (an explicit cast: a longer value
is cut to two letters), else detail `scope`. The trigger (above, row 1). The places planner's reasons: the set
`REASON_KEYS` (`location-import-dialog.tsx:25`), each drawn as `admin.locations.import.reason.<reason>`
(`en-admin.ts:1657-1713`, 39 keys, `unknown` the fallback); new this turn: `badCoordinates`, `permissionDenied`. The parsers of PREVENTION (1): above.

## callee-codes

| callee | refusals it can answer after the turn | what each caller does |
|---|---|---|
| `door_context` | `notSignedIn`, `accountDeactivated`, `permissionDenied[:scope]`, step-up P0009, `rateLimited:<instant>` | unchanged in every caller (doors: the shell; readers: the raise) |
| `has_permission_scoped` | answers a row (`allowed`, `countries`, `detail`), never raises for a valid mode | the planner (new) turns `allowed=false` into the row reason `permissionDenied` with the right's action as detail; the undo (new) into `door_refuse('permissionDenied', detail)` |
| `admin_save_entity_translation_core` | `permissionDenied:translations` (new detail), step-up P0009, `permissionDenied:language`, `badValue:field`, `baseLocked`, `unknownEntity` | the four commits and `admin_save_entity_translation`: their shells answer each as `{ok:false}` (the whole file undone, as today); `admin_save_entity_translation`'s own gate already demands `translations:update`, so the new detail is reached only through an import |
| `impersonation_target` | `noActiveSession` | the two readers raise it unchanged (no shell) |
| the trigger (through a write) | the eight codes | every door on the shell answers them `{ok:false}`; `countries_anchor_on_insert` and `locations_ancestry_cascade` pass them to their writer's shell |
| `loc_import_plan`, `cat_import_plan`, `attr_import_plan`, `attr_export_payload` | `unknownCountry` / `unknownCategory` | previews and exports (readers) raise them; commits answer `{ok:false}` |

## cell-meaning

The two manifest lines that change are codes cells only (above); their permission and country cells stay:
`assign_role` — `roles:assign`, country `arg:scope_country` (the role's scope; whose rows: `user_roles` of the target);
`admin_undo_location_import` — `locations:import`, country `row:locations.country_code` (the batch's one country, read
from its revisions; whose rows: the batch's places, and with this turn the batch's own country row under the country
rights below).

The right each field of a country's own row needs (the country doors' gates, read from their bodies):

| field / change | the door that writes it | its right and scope |
|---|---|---|
| a new row (`code`, with `name_en`, `unit_system`, `currency_code`, `display_order`) | `admin_upsert_country` | `countries:update`, global |
| `name_en`, `unit_system`, `currency_code`, `display_order` | `admin_upsert_country` | `countries:update`, global |
| the root order (`country_root_order` rows) | `admin_set_country_root_order` | `countries:update`, match on the row's code |
| `is_active` (open, close) and the anchor place's `is_active` | `admin_set_country_active` | `countries:activate`, match on the row's code |
| `created_at`, `updated_at` | the table's own default and trigger | none (no caller writes them) |

The places import after the turn: a planned `create` and any field edit → `countries:update` global; a root order →
`countries:update` match; `activate`/`open+update`/`close+update`/`retire` → `countries:activate` match (plus
`countries:update` global when the compound op carries field edits). The undo of a country revision: `update` →
`countries:update` global, and match when its root order differs; `open`/`close` → `countries:activate` match;
`create` (deletes the country) → `countries:update` global. Step-up: `countries:activate` requires it; the commit and
the undo already demand it through `locations:import` (also step-up), so no second prompt.

## first-download

Every page's first download and its ceiling, from my lock-exact build at the base (`node scripts/check-bundle-size.mjs`
→ "Bundle budget OK."): entry JS 200.8 / 205 KiB, CSS 22.5 / 40 KiB; per page (KiB):

```
221.7/227 /            219.7/225 /$name        264.1/268 /account      203.4/208 /account_/legal
204.1/209 /account_/legal_/$versionId           220.4/225 /account_/saved               205.2/210 /admin
206.0/211 /admin/      299.4/303 /admin/ai     313.6/318 /admin/attributes             290.7/295 /admin/audit
344.2/348 /admin/categories                    302.9/309 /admin/countries              205.8/210 /admin/images
288.6/293 /admin/impersonation_/$sessionId     281.1/285 /admin/legal  277.8/282 /admin/legal_/$versionId
279.9/284 /admin/legal_/edit                   324.9/329 /admin/listings               325.3/330 /admin/listings_/$listingId
406.4/412 /admin/listings_/$listingId_/edit    266.4/271 /admin/locations              310.1/313 /admin/monetisation
303.4/310 /admin/places                        291.4/295 /admin/roles  271.5/275 /admin/roles_/$roleId
341.5/348 /admin/screening                     302.8/307 /admin/translations           305.4/309 /admin/translations_/$lang
288.8/293 /admin/users 288.7/293 /admin/users_/$userId                 217.3/223 /auth         204.3/209 /auth_/callback
210.4/214 /auth_/reset 221.7/227 /c/$slug      224.5/228 /dev/primitives               244.0/248 /dev/style
201.1/206 /dev/tall    247.1/250 /l/$slug      205.5/210 /legal/$kind  211.8/217 /legal/accept
207.5/211 /legal/publishing                    307.9/315 /my-listings  317.8/323 /my-listings_/$listingId
398.6/404 /my-listings_/$listingId_/edit       398.6/404 /post         398.5/404 /post_/$listingId
205.5/210 /privacy     275.4/279 /settings     205.5/210 /terms
```

The tightest rooms: `/l/$slug` 2.9 KiB, `/admin/monetisation` 2.9 KiB, `/admin/ai` 3.6 KiB. The pages this turn's
clients touch: `/admin/places` 6.6 KiB, `/admin/users_/$userId` 4.3, `/admin/impersonation_/$sessionId` 4.4.

## premises

- The brief's "`admin_preview_location_import` raises `unknown country scope`": the raise is in `loc_import_plan`
 (`20260917205429_b76587b4…:18`, body line 26), called by the preview and the commit.
- INC-1163's class has three more instances (definition): `loc_import_plan`'s `v_scope` and countries-file `v_code`,
 `admin_export_locations`' `v_scope`; and `assign_role`'s scope into `user_roles.scope_country char(2)`. The route
 gate caps a countries-file code at two characters (`src/server/imports/registry.ts:438`, `maxLength: 2`), so only a
 direct call of the preview or commit reaches the planner's; a direct call of the export reaches its own.
- The places mapper's premise ("read from an error's `message`, code P0001"): the mapper never tests the SQLSTATE
 (`readRefusal` reads the message head), so the seven read the same after the change; only `badCoordinates` needs
 words.
- The writers of `countries` include `admin_undo_location_import`; the brief named the commit and the planner.
- The family's `unknownUser` checks read `public.profiles` (`20261114070700_e30e4335…:69`, `20261114114000_337ffc64…:181`);
 `assign_role`'s foreign key reads `auth.users` (`user_roles_user_id_fkey`): the check reads `auth.users`, so no
 account the key accepts today is refused (decision).
- Existing places rows against the range rule on the local stack: 280 places, 0 with a latitude outside −90…90 or a
 longitude outside −180…180 (probe 1, `LOCROWS total=280 outOfRange=0`). Roles held under a country scope on the
 local stack: 0.
- `category_attributes` has no reader through the browser roles: in `src/` none (`rg "category_attributes\b"` outside
 the generated types finds none; the types keep `category_attributes` and `get_category_attributes`); in `e2e/` the
 global setup deletes its rows with the service client (`e2e/global-setup.ts:1102`) and CT-41 asserts its writes are
 refused (unchanged); in `scripts/` the acceptance allowlist's reason text (`:19`) and the RETIRED surface line of
 `get_category_attributes` (`:153`); in SQL two readers, `admin_delete_category_core` (INVOKER, called only by
 `admin_delete_category`, DEFINER: runs as the owner) and `get_category_attributes` (DEFINER, browser EXECUTE revoked
 in F1-7a); no view, no other policy reads it. So its SELECT grants (table and the 18 column grants, anon and
 authenticated) and `category_attributes_public_read` leave; what that stops: a visitor or member reading the legacy
 per-category attribute rows straight from the data API, which no screen does (decision).
- The places mapper's words `missingCoordinates` exist; `badCoordinates` is new to the family (the route
 `src/routes/api/geo/reverse.ts:80` answers a refusal reason of the same name for the reverse geocoder).

## findings

- `assign_role` stores `p_scope_country` as given — no case fold and no check that a country holds the code
 (`20261114070400_7102c888…:40`, the insert) — and `has_permission_scoped` compares the upper-cased argument
 (`20261106051500_6d2f0f3e…:70`). Only a holder of `roles:assign` reaches it, and the console never sends a scope
 (`admin-users-service.ts:168`); a role so stored never matches a country. Beyond this turn's concern (Postgres raises
 nothing); for the roles family.
- `has_permission_scoped`'s `::character(2)` cast cuts a longer argument to two letters (`20261106051500_6d2f0f3e…:70`),
 so a door that passes an argument's text (the manifest's `arg:` cells) is judged on its first two letters; every such
 door either compares the full text to `countries.code` before writing (the four in `definition`), reads the scope
 from a row (DEC-388), or (after this turn) refuses the shape (`assign_role`). Class: a typed parameter's silent
 truncation; for the doors family's guard.
- 60 deny-all read rules (`USING (false)`) on tables no browser role can read (probe 1): harmless; INC-1166's census
 guard stays on the before-launch list.
- `scripts/conformance/import-doors.test.ts` IMD-6 reads the route table's literal words; once the two sentence rows
 leave (STEP 3), its vocabulary shrinks with them (no exact-list assertion; `words.has(...)` checks only).

## queued

`rg -n "F1-7b|F1-7\b" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance scripts/doors`
(234 hits outside this brief; read in the rulings, the roadmap and the scripts; the reports' hits repeat them):

| queued item | where | mark |
|---|---|---|
| INC-1156 `assign_role`'s unknown user | roadmap.md:12 | built here |
| INC-1163 the country doors' code check | roadmap.md:12,71; 4b ruling 1 :64-65 | built here |
| INC-1162 `assert_parent_not_catchall` leaves the browser roles | roadmap.md:12,68 | built (F1-7a; live EXECUTE anon/authenticated false) |
| INC-1164 a scope's own country row through the places import | roadmap.md:12 | built here |
| INC-1166 the two dead `USING (true)` rules | roadmap.md:12 (the census guard: :17) | built here (+ `category_attributes`); the guard left on the before-launch list |
| INC-1179 coordinates without a range check | roadmap.md:30 | built here |
| the trigger's seven sentences become codes (4b decision 8) | roadmap.md:72 | built here |
| `unknown country scope` becomes a code (4b) | roadmap.md:73 | built here |
| the import planners' `unknown category scope` (4a decision 4) | roadmap.md:67 | built here |
| a commit refused by its translation step names the right (4b decision 7) | roadmap.md:74 | built here |
| `impersonation_target`'s sentence (7a decision 6) | `docs/governance/briefs/f1-doors-7a-ruling-1.md:25,49` | built here |
| `translation_scope_ok` leaves the browser roles | roadmap.md:62 | built (F1-7a; live EXECUTE authenticated false) |
| INC-1170 `rateLimited` with its reset time; INC-1196 the re-count | roadmap.md:23,30,51 | built (F1-7a, `door_context` above: `rateLimited:<resets_at>`) |
| every door call's `Result` typed (INC-838), the readers folded (INC-1188), `isDeactivatedRefusal`, `door-args-allowlist.txt:5` | roadmap.md:30,43,60; `scripts/conformance/door-args-allowlist.txt:5` | left (F1-7c) |
| INC-1213 a reader's refusal at its own status; the reset-time words | the brief | left (F1-7c) |
| DEC-347 the guards learn a retirement; the retired bodies dropped | roadmap.md:8,28 | left (F1-7c) |
| INC-1191 Save offered to the ad's own seller | roadmap.md:30 | left (F1-7c, the readers) |
| ACT-022 the advertiser's name and e-mail column | roadmap.md:37 | left (after F1-7) |
| the cost bar | ruling 1 :29 (0.1 ms per `door_context` call); the brief's PREVENTION (4): F1-1 ruling 7 §1, 5 ms per call at the median | applied here to the trigger (timed in its proof) |

## stops

None of the five: (a) no change takes a right from a caller holding it today apart from INC-1164's country row (the
new refusals answer what failed with a raw error, or a malformed argument); (b) no return type changes; (c) every
file lies in SCOPE (`supabase/migrations/`, `scripts/doors/manifest.txt`, `scripts/conformance/migration-reader.ts`
and its test, the parsers and their tests, `src/i18n/locales/en-admin.ts` / `am-admin.ts`, `docs/features/`);
(d) `category_attributes` has no browser reader; (e) 14 bodies.
