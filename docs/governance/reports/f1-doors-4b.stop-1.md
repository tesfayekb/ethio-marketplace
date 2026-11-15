MIGRATION — f1-doors-4b STEP 2: the locations and countries family's doors on door_context and the shell
DONE: STEP 0 (task saved), STEP 1 (census, `docs/governance/reports/f1-doors-4b.census.md`), STEP 2 (the migration, 9 files)
LEFT: STEPS 3 to 7 (the client, the tests, the gate, the self-review, the report), after the supervisor's ruling
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `6418cdd76f4d18210d50690c384fce2bea401a11` (short `6418cdd`)
- Conclusion: **FAILURE**
- Completed (UTC): 2026-11-15T13:02:11Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43715579662
(the lane's `branches/cursor/f1-doors-4b/ci-status.md`, read from `origin/ci-evidence` for the lane's first push, the
migration commit before its grants correction; its two reds are classified under "Reds" below. Dev at the base:
`51a99915d4e15fe038c57c19676c01e810d80f33`, **SUCCESS**, completed 2026-11-15T11:13:21Z, run 43707417337;
`origin/dev` is still `51a99915d`, the base.)
FILES:
docs/governance/briefs/f1-doors-4b.md
docs/governance/reports/f1-doors-4b.census.md
docs/governance/reports/f1-doors-4b.stop-1.md
roadmap.md
scripts/conformance/migration-reader.test.ts
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261115122700_e01def73-55a8-46af-8005-8e23cca46cb4.sql
supabase/migrations/20261115122800_89eaa5c9-b607-4e75-b716-63446701b640.sql
supabase/migrations/20261115122900_069b543e-ce16-488e-b552-d0913cdec3c9.sql
supabase/migrations/20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql
supabase/migrations/20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql
supabase/migrations/20261115123200_e0edb9a7-3e2d-4e53-b772-c5380267e940.sql
supabase/migrations/20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql
supabase/migrations/20261115123400_33896921-d11c-46f8-95c3-205aa5a3af9c.sql
supabase/migrations/20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql

The migration landed on the branch in two commits. `6418cdd76` (`f1-doors-4b: the migration — the family's doors on
the shell`, 12:45 UTC, pushed, marks `…140000`–`…140800`). Reading the dropped functions' grants for this report
showed that its eight DROP + CREATE doors had restated only `authenticated`, while every last declaration also
granted the service role. `aee3fcca0` (`f1-doors-4b: the migration — the service role's grants restated`, committed
2026-11-15 13:30 UTC) restates each one as its last declaration had it and asserts it in each catalog proof. No file
had been applied anywhere but the local proof stack. Because that commit falls in the 13:00 hour, the marks follow
rule 30's value for it: 13:00 rounded up is 14:00, plus one hour gives `20261115150000`, then `+100` per part to
`20261115150800`. Every file stamp (`20261115122700`–`20261115123500`) is below its mark, and file-name order equals
mark order. Draft pull request: https://github.com/tesfayekb/ethio-marketplace/pull/46.

## The apply pairing lines (in this order)

apply e01def73 → expect mark 20261115150000
apply 89eaa5c9 → expect mark 20261115150100
apply 069b543e → expect mark 20261115150200
apply de287d18 → expect mark 20261115150300
apply c9452c23 → expect mark 20261115150400
apply e0edb9a7 → expect mark 20261115150500
apply 1b7d8f93 → expect mark 20261115150600
apply 33896921 → expect mark 20261115150700
apply 08f47ace → expect mark 20261115150800

Each file's pre-check refuses unless three things hold: the previous part's mark is present (part 1 needs the
ledger's newest, `20261115041800`, F1-4a's last part `c4b183c2`); every door mechanism function exists
(`door_context`, `door_refused`, `door_refuse`, `language_code`); and the live md5 of every body it redeclares
matches. The files apply one by one, in order; a file applied out of order refuses at its pre-check and changes
nothing.

The proofs' first run on a shared database is the staging apply: until then they have run only on `bun run db:proof`'s
throwaway local stack (below) and on CI's temporary backends from this lane's pushes.

## The order of the files, and why no caller meets a returned refusal

The order is the place doors, then the country doors, then the readers, then each import door in a file of its own:

1. the place editor
2. move and delete
3. order and activation
4. the country editor
5. opening and root order
6. the two lists
7. preview and export
8. the import's commit
9. its undo

No SQL caller exists (census `consumers`, "SQL callers": no function, policy, view or scheduled job calls a door or
reader of this family), so no core is needed. No body anywhere receives the shell's `{ok:false, …}` as a value it
could mistake for success.

The only calls these bodies make into other functions go to non-doors: `location_slug_candidate`, `loc_import_plan`,
`admin_save_entity_translation_core`, `rate_gate` and `log_audit`. Each either raises or answers a value.

A refusal from the translation core is SQLSTATE P0D01. The commit's (and undo's) own shell catches it, so the whole
file's work rolls back and the door answers the refusal; part 8's proof (c) shows this. Every other raise passes the
shell unchanged, as an error, exactly as before: the ancestry trigger's `parentInactive` (P0001, part 3 proof (c)),
step-up's P0009 sentence, and a `char(2)` overflow.

Every browser and route caller reaches these doors through the Data API. There `door_refused` sets
`response.status` (401, 403, 428 or 429, else 400), so a refusal arrives as the client's error, never as `data`. The
import relay's `codedRefusal` (`src/server/imports/route.ts:120`, F1-3) already reads a P0D01 envelope by its code.
The four readers keep their return types and raise (no shell), as F1-2's reader form does.

## The proof and the guards

- `bun run db:proof --fresh` on the final tree (`aee3fcca0`): `db:proof PASS — applied 484/484, CLI 2.120.0, cold, 54 s`
- `bash scripts/check-migrations.sh` (exit 0):
  - `Born-closed guard OK (floor 20261007143529).`
  - `Definer guard OK.`
  - `Self-marking guard OK (floor 20260817054246).`
  - `Public-surface guard OK (floor 20261003215043).`
  - `Real-row proof guard OK (floor 20261007000000).`
  - `Spanning-literal guard OK (floor 20261109000000).`
  - `Migration guard OK.`
- `bun scripts/doors/check-doors.ts`:
  - `check-doors self-test OK: 8 finding kinds fired on their planted fixtures, the clean pair fired nothing`
  - `check-doors static OK: 260 manifest lines reconcile with the migrations' catalogue`
- `bunx vitest run scripts --maxWorkers=2` on `aee3fcca0`'s tree: 120 files, 619 passed, 1 skipped. `bun run
  typecheck` and `bun run lint` exit 0 (on `6418cdd76`, whose code tree outside the migrations is this one).
- pre-stop scan: 7 of 7, e01def73 89eaa5c9 069b543e de287d18 c9452c23 e0edb9a7 1b7d8f93 33896921 08f47ace.
  1. Statement order: each file runs pre-check, then each DROP before its CREATE, its REVOKE / GRANT, the proof, the
     mark. There is no seed row.
  2. Scratch keys and CHECKs: the scratch countries are `XZ` / `XY` / `XQ`, each checked absent first. Slugs, role
     names and e-mails are `e2e-mig-f14bN-<10 hex>…`. Every constraint holds, as the local apply proves.
  3. Literal types: every literal has its parameter's type (`::double precision`, `::text` for a `char(2)` scope
     passed to a `text` argument, typed NULLs).
  4. No real row's value is an expectation. Every proof read of `locations` carries `slug LIKE 'e2e-mig-%'` (the
     real-row guard's form, as F1-4a's files do), and every reader expectation counts only the tag's rows or the
     scratch countries'.
  5. One random draw per proof (`v_hex`), every key derived from it; unknown ids are `gen_random_uuid()`.
  6. Every pre-check reads the live md5s and the previous mark.
  7. Both sides of every md5 comparison are `replace(…, chr(13), '')`-stripped, and no compared literal spans a
     line break.
- Before and after on the local stack, the largest file the gate admits (5,000 place rows in one scratch country,
  a global holder): preview 6,470 → 6,169 ms; commit 8,898 → 8,074 ms.
  - `admin_list_locations`'s plan is unchanged by the new `v_ctx.countries` test: an incremental sort over an index
    scan on `locations_country_idx`, with the same index-backed subplans.
  - `admin_list_countries`' and the export's queries are unchanged.
  - The probe ran as a scratch file on the local stack and was then removed; it is not in the tree.

## The files

### Part 1 — `20261115122700_e01def73-55a8-46af-8005-8e23cca46cb4.sql`

- sha256sum: `a56d6d159cca660e3f4c9beb0df4da85006b8876cd3795ffac20377808bd8ee9`
- bytes: 29133
- declared mark: `20261115150000`; pre-check requires `20261115041800` (F1-4a part 19, c4b183c2)
- subject: the place editor's door onto door_context and the shell
- objects: `admin_upsert_location` (whole from 20261029015903 :219; uuid → jsonb `{ok:true, id}`, DROP + CREATE).
  The create branch's gate is `door_context('staff','locations','create','staff_config', <country>, 'match')`, where
  the country is the parent's `country_code` (or, for a country anchor, the `countries` row `upper(p_slug)` names).
  The edit branch's gate is `door_context(…,'update',…)` with the edited place's `country_code`. Every sentence
  becomes a code, and the shell answers a refusal.
- proofs: (a) catalog facts: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
  role, never anon or PUBLIC; the body this file's (md5). (b) the gates: accountDeactivated, permissionDenied (403),
  notSignedIn (401); a country holder refused permissionDenied:scope (403) for another country's place, for a parent
  or place that does not exist and for another country's anchor; none writes, audits or spends staff_config. (c) each
  code with every earlier check cleared, its exact message and a 400, nothing written. (d) the country holder creates
  and edits in his own country, the global holder in another: `{ok:true, id}`. (e) staff_config counted once per call
  past the gate; one audit line per success; every refusal metered.
- apply e01def73 → expect mark 20261115150000

### Part 2 — `20261115122800_89eaa5c9-b607-4e75-b716-63446701b640.sql`

- sha256sum: `b05e5199c87c0b4cc7c9c37efca85224cffa2dbbc67c6c990440f56dad021645`
- bytes: 24897
- declared mark: `20261115150100`; pre-check requires `20261115150000`
- subject: the place tree's move and delete onto door_context and the shell
- objects: `admin_move_location` (whole from 20260915162505 :397) and `admin_delete_location` (whole from
  20260915162505 :470). Each moves from void to jsonb `{ok:true}` by DROP + CREATE, gated by
  `door_context('staff','locations','restructure','staff_config', <the place's country>, 'match')`. The delete
  guards become `door_refuse('retireInstead', 'hasChildren'|'hasListings'|'hasCoverage'|'hasProfileDefaults')`.
- proofs: (a) catalog facts, as part 1, for both doors. (b) the gates, for each door; a country holder refused
  permissionDenied:scope for another country's place and for a place that does not exist. (c) each code with every
  earlier check cleared (`retireInstead:hasChildren` driven; the other three details need a listing, coverage or a
  profile default on a scratch place and are not driven). (d) the country holder moves and deletes in his own
  country; the global holder moves in another. (e) the tallies.
- apply 89eaa5c9 → expect mark 20261115150100

### Part 3 — `20261115122900_069b543e-ce16-488e-b552-d0913cdec3c9.sql`

- sha256sum: `573c92a5c3756e5782d6125029319523c8ddfc0def29467d72d2a53db6f46382`
- bytes: 24922
- declared mark: `20261115150200`; pre-check requires `20261115150100`
- subject: the place tree's order and activation onto door_context and the shell
- objects: `admin_reorder_locations` (whole from 20260915162505 :434; the parent's country) and
  `admin_set_location_active` (whole from 20260915162505 :366; the place's country; its no-change early return
  answers `{ok:true}`, after the gate). Each moves from void to jsonb `{ok:true}` by DROP + CREATE, gated by
  `door_context('staff','locations','update','staff_config', …, 'match')`.
- proofs: (a) catalog facts for both doors. (b) the gates. A country holder is refused permissionDenied:scope for
  another country's place, for a place that does not exist, and for the markets' own order (`p_parent_id` NULL).
  (c) each code. The ancestry trigger's `parentInactive` passes the shell as its own raise (P0001), unmetered and
  uncounted. (d) the country holder orders and activates in his own country, twice (the second time a no-op); the
  global holder activates in another. (e) staff_config is counted once per call past the gate, the no-op too.
- apply 069b543e → expect mark 20261115150200

### Part 4 — `20261115123000_de287d18-3f2f-4480-967a-25e26911e76f.sql`

- sha256sum: `03e672d46cc176b8cb9b42fab77cad3781d98fe032b7d58039bd2ed04617eefd`
- bytes: 19205
- declared mark: `20261115150300`; pre-check requires `20261115150200`
- subject: the country editor onto door_context and the shell
- objects: `admin_upsert_country` (whole from 20261029015903 :117; void → jsonb `{ok:true}`, DROP + CREATE), gated by
  `door_context('staff','countries','update','staff_config', NULL, 'global')`.
- proofs: (a) catalog facts. (b) the gates; a country holder is refused permissionDenied:scope even for his own
  country (global). (c) each code: badCountryCode, badUnitSystem, badCurrency, nameRequired. (d) the global holder
  edits a country and creates one. (e) the tallies.
- apply de287d18 → expect mark 20261115150300

### Part 5 — `20261115123100_c9452c23-ae90-4b60-9d85-1241b957ed58.sql`

- sha256sum: `648fb7ca7b1a529a7ea029f733724f7bcddc6d25e31a187612295fe1d03f58c7`
- bytes: 25865
- declared mark: `20261115150400`; pre-check requires `20261115150300`
- subject: the country opening and root order onto door_context and the shell
- objects:
  - `admin_set_country_active` (whole from 20261029015441 :84; `countries:activate`).
  - `admin_set_country_root_order` (whole from 20261029015441 :144; `countries:update`).
  - Each moves from void to jsonb `{ok:true}` by DROP + CREATE, gated by door_context with the `countries` row's
    `code` in match mode.
- proofs: (a) catalog facts for both doors. (b) the gates; a country holder is refused permissionDenied:scope for
  another country and for a code no country holds. (c) each code: badCountryCode, unknownCountry, scopedRolesExist,
  duplicateCategory, notARoot (scratch root categories). (d) the country holder opens and orders his own country;
  the global holder opens another. (e) the tallies.
- apply c9452c23 → expect mark 20261115150400

### Part 6 — `20261115123200_e0edb9a7-3e2d-4e53-b772-c5380267e940.sql`

- sha256sum: `39d2be24040b973d9b821543b6a9544551b50e598aed6bfeb6ebc83577495715`
- bytes: 20125
- declared mark: `20261115150500`; pre-check requires `20261115150400`
- subject: the family's two lists onto door_context
- objects:
  - `admin_list_locations` (whole from 20260915232928 :43; CREATE OR REPLACE): `door_context('staff-reader',
    'locations','view',NULL,NULL,'filter')`, narrowed by `v_ctx.countries IS NULL OR l.country_code = ANY
    (v_ctx.countries)`.
  - `admin_list_countries` (whole from 20260915232928 :174; CREATE OR REPLACE): `door_context('staff-reader',
    'countries','view',NULL,NULL,'global')`.
- proofs: (a) catalog facts: STABLE SECURITY DEFINER, EXECUTE for authenticated, never anon or PUBLIC; the bodies
  this file's. (b) each reader raises permissionDenied (P0D01) to a caller without its permission, plus
  accountDeactivated and notSignedIn; a country holder is raised permissionDenied:scope by the country list.
  (c) the place list narrows to the country holder's countries (asking for another country answers no rows) and
  answers every country to the global holder. (d) no reader spends a dial, writes an audit line or meters a refusal.
- apply e0edb9a7 → expect mark 20261115150500

### Part 7 — `20261115123300_1b7d8f93-1641-4db8-9dff-a6b7ee8f9090.sql`

- sha256sum: `4694788417cf63f82ea56d6589b8abc2418631828e81186157ede55c7e939e46`
- bytes: 21007
- declared mark: `20261115150600`; pre-check requires `20261115150500`
- subject: the places import's preview and export onto door_context
- objects:
  - `admin_preview_location_import` (whole from 20260915170752 :677; `locations:import`).
  - `admin_export_locations` (whole from 20260915170752 :640; `locations:view`; its 'unknown country scope' block
    kept, F1-7).
  - Both are CREATE OR REPLACE, gated by `door_context('staff-reader', …, NULL, <the countries row p_scope names>,
    'match')`.
- proofs: (a) catalog facts. (b) the gates; a country holder is raised permissionDenied:scope for no country, another
  country and a code no country holds. (c) the preview and the export answer for the holder's own country (a row of
  another country stays the planner's outOfScope); the global holder's answers for another. (d) no dial, audit or
  metering.
- apply 1b7d8f93 → expect mark 20261115150600

### Part 8 — `20261115123400_33896921-d11c-46f8-95c3-205aa5a3af9c.sql`

- sha256sum: `aa838e5fef6efb99bdfe214b69a0d98d460aa7aefe878f9af24919953312a557`
- bytes: 33447
- declared mark: `20261115150700`; pre-check requires `20261115150600`
- subject: the places import's commit onto door_context and the shell
- objects: `admin_commit_location_import`, redeclared whole from live: the literal 20261028235443 :461 with its
  computed gate. It stays CREATE OR REPLACE with a jsonb answer.
  - The gate is `door_context('staff','locations','import','import_commit', <the countries row p_scope names>,
    'match')`.
  - `importRunning` and `planHasRefusals` become codes.
  - Its four `'am'` literals become `public.language_code('pair')`.
  - The shell answers a refusal.
- proofs: (a) catalog facts (EXECUTE for authenticated and the service role). (b) the gates; a country holder refused
  permissionDenied:scope for a file scoped to another country, to none and to a code no country holds. (c)
  planHasRefusals for a row of another country under the holder's own scope; the translation core's permissionDenied
  (403) for a pair-language name from a holder without `translations:update` passes the shell and the place the file
  had applied is undone. (d) the holder's file of his own country applies its one row (the pair-language name under
  `language_code('pair')`) and nothing of another; the global holder's file of another country applies. (e)
  import_commit counted once per call past the gate; the audit lines (the commit's and the core's own); every refusal
  metered. `importRunning` needs a second session: not driven.
- apply 33896921 → expect mark 20261115150700

### Part 9 — `20261115123500_08f47ace-1f62-4009-97ba-6de04cfbdb6e.sql`

- sha256sum: `b6fae49d698716e56432f845920b3011e724b3e92611f40c8059482c11607fb0`
- bytes: 32233
- declared mark: `20261115150800`; pre-check requires `20261115150700`
- subject: the places import's undo onto door_context and the shell
- objects: `admin_undo_location_import`, redeclared whole from live: the literal 20260916013820 :36 with its computed
  gate. It stays CREATE OR REPLACE with a jsonb answer.
  - The gate is `door_context('staff','locations','import','import_undo', <the batch's one country>, 'match')`.
    The batch's country is taken from its revisions (a country revision's key, a place revision's `country_code`
    after or before) only when every revision names one and they agree, and is read back from its `countries` row.
    Otherwise it is NULL, which only a global holder passes.
  - `unknownBatch`, `batchAlreadyUndone` and `door_refuse('undoBlocked','hasRows')` are the codes.
  - Its two `'am'` literals become `language_code('pair')`.
  - The shell answers a refusal, undoing every row the call had restored.
- proofs: (a) catalog facts. (b) the gates; a country holder refused permissionDenied:scope for a batch of another
  country, over two countries, of a country he does not hold and for no batch. (c) unknownBatch; undoBlocked:hasRows
  for a created country that now holds a role, nothing restored. (d) the holder undoes his own country's batch
  (`{restored:1}`) and is then told batchAlreadyUndone; the global holder undoes the batch over two countries
  (`{restored:2}`). (e) the tallies (import_undo, and import_commit for the batches made).
- apply 08f47ace → expect mark 20261115150800

## Every redeclared body, previous and new md5

Both md5s are CR-stripped. The previous one is the live last declaration, which each pre-check verifies.

| Function | Previous md5 | New md5 |
|---|---|---|
| `admin_upsert_location(uuid,uuid,text,text,text,text,text[],integer,double precision,double precision)` | `5e34ea13998c57e8d182c13b2c669597` | `0accd0e416c4624af33600e86db5f77f` |
| `admin_move_location(uuid,uuid)` | `b30e294a745485f5d5fb34ee325845e6` | `ea29696c67c4a4f9113efd9f544ce0aa` |
| `admin_delete_location(uuid,text)` | `226315156df940fab30d5f4a3c7e2da9` | `02c0eae5ee26a25d279ad3a4c55ac8b8` |
| `admin_reorder_locations(uuid,uuid[])` | `20debae4abc3bb7df39bf876853fe672` | `f3d48e81b788c42ae2de8f261644aaf4` |
| `admin_set_location_active(uuid,boolean)` | `a3745632a8652791f7b3ebbea415a931` | `80e42fb16ab528da01e3178ec495f666` |
| `admin_upsert_country(text,text,text,text,integer)` | `c758ed59da93c3f4739a1a862239047d` | `d897481fbdaca05de73d6f6d2b8979ba` |
| `admin_set_country_active(text,boolean,boolean)` | `2b5e63633c558226538386b9708b02b0` | `ee6abf5b62714bb22868ab96d646f3fb` |
| `admin_set_country_root_order(text,uuid[])` | `469796970d43dd930d182f6d02784c9c` | `539563ee560f0cfab603e045e4023f9f` |
| `admin_list_locations(text,text,text,boolean)` | `7fb54bdec47ee5610eb3ac28a1f13392` | `61bce55bd1c482aec95991d015bfa5f8` |
| `admin_list_countries()` | `f9a13855b567a85a203d3185a9c3620f` | `af9beabbeba376e12a299f46c498ec8c` |
| `admin_preview_location_import(jsonb,jsonb,text)` | `2e6fee80118bdf0fbe5ce06fd9d4089a` | `b9810c9ba544a70f8840bd3a8484215c` |
| `admin_export_locations(text)` | `31f729670c3e8a1b90c693d1d8dd8b11` | `3754109e0273d14cdb0425a57296eef5` |
| `admin_commit_location_import(jsonb,jsonb,text,text)` | `01365b40f7c61055d5389d267da9a09f` | `7be1affca9d9acd6e62e4d7d0644d7e2` |
| `admin_undo_location_import(uuid)` | `c4168e1ff2402a72509cb643441f97dc` | `03bdb90b19982f9b4e17f1b6212eb8a3` |

## Dropped and re-created functions, with their restated grants

Each restates its last declaration's REVOKE and GRANTs. The service role's grant is in the same form the last
declaration used, and each catalog proof asserts EXECUTE for authenticated and the service role, never anon or
PUBLIC.

- `public.admin_upsert_location(uuid, uuid, text, text, text, text, text[], integer, double precision, double
  precision)` (part 1): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO authenticated, service_role;
- `public.admin_move_location(uuid, uuid)` (part 2): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO
  authenticated; GRANT ALL … TO service_role;
- `public.admin_delete_location(uuid, text)` (part 2): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO
  authenticated; GRANT ALL … TO service_role;
- `public.admin_reorder_locations(uuid, uuid[])` (part 3): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO
  authenticated; GRANT ALL … TO service_role;
- `public.admin_set_location_active(uuid, boolean)` (part 3): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO
  authenticated; GRANT ALL … TO service_role;
- `public.admin_upsert_country(text, text, text, text, integer)` (part 4): REVOKE ALL … FROM PUBLIC, anon; GRANT
  EXECUTE … TO authenticated, service_role;
- `public.admin_set_country_active(text, boolean, boolean)` (part 5): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE
  … TO authenticated, service_role;
- `public.admin_set_country_root_order(text, uuid[])` (part 5): REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO
  authenticated, service_role;

The four readers and the two import doors are CREATE OR REPLACE. They restate `REVOKE ALL … FROM PUBLIC, anon; GRANT
EXECUTE … TO authenticated` (the import doors also `GRANT ALL … TO service_role`), so their surface is unchanged.

## New or changed string keys

None. No `src/i18n/locales/` file is touched.

The place and country codes are the words the consoles already hold (`admin.locations.error.<code>`,
`admin.countries.error.<code>`). Five import codes have no console key: importRunning, planHasRefusals,
batchAlreadyUndone, undoBlocked and unknownBatch. They reach the screen through the relay and the import dialogs'
reason lists (`location-import-dialog.tsx:57–58`, `country-import-dialog.tsx:37–38`), which STEP 3 reads. If STEP 3
finds a code without words, its English is named there and its Amharic is the supervisor's.

## Dial cells changed (`scripts/doors/manifest.txt`), with cell-meaning's sentence

- `admin_commit_location_import(jsonb,jsonb,text,text)`: `staff_config` → `import_commit`. "`import_commit` (120 an
  hour, the route's `importCommit` twin) rations one committed file; one person honestly commits a handful of files
  an hour. `admin_commit_location_import` spends it today; its cell says `staff_config`: **staff_config →
  import_commit**."
- `admin_undo_location_import(uuid)`: `staff_config` → `import_undo`. "`import_undo` (120 an hour, the twin
  `importUndo`) rations one undone batch: **staff_config → import_undo** for `admin_undo_location_import`, which
  spends it today."
- Unchanged cells whose body now spends: move, delete, reorder and set active already say `staff_config` but spent
  nothing. From this turn they spend it: "Four of these (move, delete, reorder, set active) spend nothing today and
  spend it from this turn (DEC-385: a delete or a deactivation is an edit). `admin_set_location_active` keeps its
  early answer when nothing changes, after the gate, so a no-change press now counts once like any other press."

## Country cells changed, with cell-meaning's sentence

- `admin_delete_location(uuid,text)`: `global` → `row:locations.country_code`. "the door deletes one place of one
  country, read from `p_id`; it is not configuration across markets."
- `admin_reorder_locations(uuid,uuid[])`: `global` → `row:locations.country_code`. "it reorders the children of
  `p_parent_id`, all of one country (`notAChild` refuses any other id) … read from `p_parent_id` (NULL — the markets'
  own order — reaches `orderCountriesInProfile` only for a global holder)."
- `admin_set_location_active(uuid,boolean)`: `global` → `row:locations.country_code`. "one place of one country, read
  from `p_id`."
- `admin_commit_location_import(jsonb,jsonb,text,text)`: `row:locations.country_code` → `arg:scope`. "a file may hold
  several countries and the door takes the scope argument `p_scope`, whose rows alone it writes (the planner refuses
  every other country's row, the commit refuses a plan with a refusal)."
- `admin_preview_location_import(jsonb,jsonb,text)`: `global` → `arg:scope`. "as the commit (the commit needs the
  preview's digest for the same scope; a scoped holder previews its own country's file)."
- `admin_export_locations(text)`: `global` → `arg:scope`. "it takes the scope argument … (the stricter of the scoped
  readings: a scoped holder exports its own country by naming it, and 'every market' passes only a global holder)."

The census wrote these cells as `arg:p_scope`. The manifest names an argument without its `p_` (`arg:country_code`,
`arg:scope_country`), so they read `arg:scope`. For the five lines whose country cell changed, the reason cell's
"census F1-1: … global is the stricter reading" becomes `-`, as every `row:` and `arg:` line has it.

## Other manifest cells and lists changed

- Codes cells: each of the ten doors' cells is now the set of `door_refuse('<code>'` literals in its own body.
  The four readers' cells stay `-`. `check-doors static` reconciles all 260 lines.
- `scripts/public-surface-allowlist.txt`: nine "restated grant (not a new surface)" lines, in F1-4a's form, for the
  functions a file grants to `authenticated` that had no line (move, delete, reorder, set active, the two lists,
  preview, export, undo). The other five already had lines.
- `scripts/conformance/migration-reader.test.ts` (MGR-7): the repository's computed-declaration list loses
  `admin_commit_location_import` and `admin_undo_location_import`, which are now written out whole (census `lists`).

## Decisions for the supervisor's ruling (numbered)

1. **Nine files by concern, no cores.** No SQL caller exists, so no door needs a core. Six files are 19–26 KB.
   Three are 29–33 KB, each a single door with its own proof: the place editor (part 1; its body is 4.8 KB, its
   proofs drive eight codes and two branches) and the two import doors (parts 8 and 9; bodies 13.2 and 8.9 KB, each in
   a file of its own as the brief asks). The scratch world (two countries, four people, sessions, roles) is about
   10 KB per file. F1-4a landed single-concern files of 34–36 KB.
2. **Every scope is read from a row's `char(2)` column**: `countries.code` or `locations.country_code`, selected by
   the argument. The census proposed a shape guard on the argument (`^[A-Z]{2}$`) instead; the row read makes the
   guard unnecessary, because only a value some row holds ever reaches `has_permission_scoped`'s `::character(2)`
   cast. For an id or code no row holds, the scope is NULL. A country holder then reads `permissionDenied:scope`, and
   learns nothing about other countries' ids. A global holder passes on to the door's own code (`locationMissing`,
   `parentMissing`, `unknownCountry`, `badCountryCode`, `unknownBatch`).
3. **`admin_upsert_location` keeps two gates**, one per branch: `create` reads the parent's country (an anchor's, its
   `countries` row), and `update` reads the edited place's. The judge reads the first call, so the line keeps
   `locations:create`. A holder of only `locations:update` still edits, as today.
4. **Return types:**
   - `admin_upsert_location`: uuid → `{ok:true, id}`.
   - move, delete, reorder, set active, upsert country, set country active and root order: void → `{ok:true}`
     (DROP + CREATE, grants restated).
   - The readers and the two import doors keep their types (CREATE OR REPLACE).
5. **Dial cells**: commit → `import_commit`, undo → `import_undo` (the dials the bodies spend). Move, delete,
   reorder and set active spend `staff_config` from this turn, and a no-change activation counts.
6. **Country cells** as above: delete, reorder, set active → `row:locations.country_code`; commit, preview, export
   → `arg:scope`; undo keeps `row:locations.country_code` (the batch's one country); `admin_upsert_country` and
   `admin_list_countries` stay `global`; `admin_list_locations` stays `filter` and now narrows.
7. **The translation core's refusal inside an import** (not named by the census; found by the proof). Since
   20261114113600, `admin_save_entity_translation_core` refuses `permissionDenied` (and `permissionDenied:language`,
   `badValue:field`) unless the caller holds `translations:update` and the language's scope.
   - Before this turn, a commit or undo carrying a pair-language name from a `locations:import` holder without that
     permission rolled back with a raw P0D01 error.
   - From this turn the shell answers it: `permissionDenied`, 403, metered, the dial not counted, nothing applied.
     This follows F1-4a's precedent ("the cores' and `admin_save_entity_translation_core`'s codes pass through the
     shell").
   - The alternative is to check `translations:update` before planning when a file carries a pair-language name.
     That would be a new refusal, so it is the supervisor's to rule.
8. **The trigger's `parentInactive`** (`locations_ancestry_guard`, a plain raise) passes every shell unchanged, as
   today: not a code, not metered, the dial not counted (proved in part 3). It stays with the trigger's owner (F1-7).
9. **The readers raise** P0D01 for a gate refusal and have no shell (F1-2's reader form). A country holder's export
   or preview without a scope is `permissionDenied:scope`.
10. **Details kept as a code's tail**: `retireInstead:<hasChildren|hasListings|hasCoverage|hasProfileDefaults>` and
    `undoBlocked:hasRows`. The other codes carry no detail.
11. **K4**: the import bodies' six `'am'` literals become `public.language_code('pair')`.
12. **The grants correction** (`aee3fcca0`) edited this lane's own files after their first push but before any
    apply. They had not landed, so rule 30's "a landed file is never edited" is not engaged. The marks were
    re-chosen for that commit's hour (`…150000`–`…150800`); the file names and stamps did not change. The first
    push's CI run (`6418cdd`) carried the earlier marks, so the preflight's "apply" line now names the new marks.
13. **Codes the proofs do not drive** (each a literal in its body, reconciled by `check-doors`):
    `retireInstead:hasListings`, `retireInstead:hasCoverage` and `retireInstead:hasProfileDefaults` (they need a
    listing, coverage or a profile default on a scratch place) and `importRunning` (a second session, F1-4a's
    precedent).
14. **The relay's `unknownParent` key row** (census decision 6): no import door raises it since F1-4a. STEP 3 removes
    it with the location rows unless the supervisor keeps it.
15. **DOORS-6's time** (below): fixed in STEP 4 by a timeout named for its cause, the tree census it walks once. The
    alternative is to make `staticRows` cheaper; the supervisor rules which.

## Reds expected on this push until STEPS 3 and 4

These were read on the lane's first run (`6418cdd`, run 43715579662), whose code tree outside the migration files is
this push's:

- **E2E preflight (migration parity, staging)**: `STAGING BEHIND: apply 20261115123500_08f47ace-…sql to ethio-staging`
  until ethio-staging holds `20261115150800`. Expected (rule 30, rule 40 (a)).
- **Component tests — DOORS-6** (`scripts/doors/check-doors.test.ts:112`, "the live mode judges the tree census
  too"): `Test timed out in 5000ms` on CI's runner. The test walks the whole migration tree's catalogue, and its
  run time grows with the tree; this turn's nine files (230,834 bytes) pushed it over its default five seconds. Its own
  comment records that "on CI's runner two passes took 5841 ms". Locally it passes inside the limit. This is the
  brief's named class ("the component tests among them when a guard's own run time grows with the tree"); STEP 4
  fixes it (decision 15).
- Every browser lane on the temporary backends passed on `6418cdd`, with the new answers meeting today's client:
  lanes 1–16, smoke, e-mail, webkit, repeat, and the merged E2E verdict. No browser red is expected on this push.
  At risk, not certain: a flow that chains `admin_upsert_location`'s answer as an id (`locations-service.ts:157`,
  `data as string`, now `{ok:true, id}`). STEP 3 narrows it with a shape guard.
- Unit tests whose expectation changes in STEP 3–4, green today because they mock the service:
  - `locations-service.test.ts` PL-3 and `country-dialogs.test.tsx` (the mappers leave).
  - `src/server/imports/route.test.ts` IMR-10 (the `import already running` row leaves) and IMR-14 (the location
    codes join).
  - `csv.test.ts` CSV-7 (the export's sentence branch leaves).
  - `door-args.test.ts` DARGS-2 (the locations allowances leave).

## Findings

- `admin_set_country_active` and `admin_set_country_root_order` declare `v_code char(2) := upper(p_code)`. A value
  longer than two characters raises 22001 (a value too long for `char(2)`) in the DECLARE, before the gate, so any
  signed-in caller sending one reads a raw error instead of a code. This is unchanged from the live bodies
  (byte-for-byte redeclaration); the proofs avoid it. It is recorded for the supervisor; changing it is a refusal's
  order, outside this migration's named change.
- No security hole found.
