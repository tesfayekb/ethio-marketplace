MIGRATION — f1-doors-7b STEP 2: the queued door corrections
DONE: STEP 0 (brief saved, sha256 93cd589e… matched), STEP 1 (the census, 13b5ca353), STEP 2 (the migration, 4b4ca6ff5)
LEFT: STEPS 3–7 (the clients, the family's tests, the gate, the self-review and push, the report) — in a new chat (DEC-387)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `cea51009a7363a7d00443abcd6b63afb0b11f085` (short `cea5100`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-20T03:31:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44667679585
FILES:
docs/features/admin-audit-security.md
docs/features/admin-roles.md
docs/features/attributes.md
docs/features/ci-guards.md
docs/features/countries-console.md
docs/features/doors.md
docs/features/imports.md
docs/features/locations-console.md
docs/governance/briefs/f1-doors-7b.md
docs/governance/reports/f1-doors-7b.census.md
docs/governance/reports/f1-doors-7b.stop-1.md
roadmap.md
scripts/conformance/migration-reader.test.ts
scripts/conformance/migration-reader.ts
scripts/doors/manifest.txt
supabase/migrations/20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql
supabase/migrations/20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql
supabase/migrations/20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql
supabase/migrations/20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql
supabase/migrations/20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql
supabase/migrations/20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql
supabase/migrations/20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql
supabase/migrations/20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql

## Base and dev

Base: dev cca37d0cd. `origin/dev` moved during the turn to `cea51009a` (the merge of pull request #78,
`lovable/table-widths-2`, Lovable's L18; CI SUCCESS above). Its 18 changed files are all under `src/` (the ten
tables and `data-table.tsx`) and none is a file of this lane (`comm` of the two `git diff --name-only` lists: empty);
it adds no migration. No merge of dev is needed for this pull request, so no STOP under the brief's SIDE BY SIDE
clause; I did not merge or rebase (rule 00).

## The files, in apply order

The eight files follow PREVENTION (7)'s order — the trigger and the cores, then their SQL callers (the planners), then
the doors, then the undo, then the read rules — and each pre-check reads the previous file's mark and the live md5 of
every body it redeclares. Part 5 of the planned seven (the six doors, 26 KB) was split by concern into parts 5 and 6
(rule 30: about 25 KB or more is split), so the undo is part 7 and the read rules part 8.

1. `20261120030000_74954b0b-69a8-477c-b386-22a02c7f9e96.sql` — sha256
   `c8cccd76560c9652b5c2b23abfaaf1061e36fd030b8d870ef9ff5bf633109588`; mark `20261120050000` (previous: the ledger's
   `20261119170900`). Redeclares `locations_ancestry_guard()` written out (VOLATILE DEFINER), its REVOKE from PUBLIC,
   anon, authenticated restated. Proofs: (a) body md5, header, no browser EXECUTE, the trigger stands; (b) each of
   the eight codes from a direct INSERT and a direct UPDATE as P0D01 with the code as the whole message, the edges
   −90/90 and −180/180 pass; (c) through a door's shell, `admin_upsert_location` at latitude 95 and
   `admin_set_location_active` under a retired region answer `{ok:false}` at 400, nothing written, both metered in
   `door_refusals`; (d) the median of 50 single-row updates under 5 ms.
   `apply 74954b0b → expect mark 20261120050000`
2. `20261120030100_e6a3d930-2cda-4e6e-a225-f2ed40682e86.sql` — sha256
   `532716848ae0c99d35be4a287c2c3fc13af5ad83dfd47283e2261abdd5545154`; mark `20261120050100`. Redeclares
   `admin_save_entity_translation_core` (INVOKER) and `impersonation_target` (STABLE DEFINER) written out, grants as
   live; creates `country_row_right(text, boolean, boolean, boolean)` (STABLE DEFINER, search_path public, REVOKE
   from PUBLIC, anon, authenticated; GRANT ALL to service_role; COMMENT). Proofs: (a) bodies, headers, grants;
   (b) the core refuses `permissionDenied:translations` to a caller without `translations:update`, and a holder
   passes that step (next refusal `badValue:field`); (c) `impersonation_target` and both impersonation readers answer
   `noActiveSession` for an unknown or expired session, and the target for an open one; (d) eleven
   `country_row_right` cases (service role, no caller, scoped holder, places-only holder, global holder).
   `apply e6a3d930 → expect mark 20261120050100`
3. `20261120030200_888c0aec-7982-478b-bafb-cfac71707068.sql` — sha256
   `6ce355af16479d29ac85113d6b5efe8729f0188984e964c24e05dc9c8d653d0f`; mark `20261120050200`. Redeclares
   `cat_import_plan` and `attr_import_plan` by computed insertion (DEC-383; old and new md5 checked in the block,
   header, ACL and defaults asserted after) and `attr_export_payload` written out; each one's REVOKE from PUBLIC,
   anon, authenticated and GRANT ALL to service_role restated. Proofs: (a) bodies, headers, service-role-only
   grants; (b) each called with a scope no category holds raises `unknownCategory`, with no scope answers its
   document; (c) both previews and `admin_export_attributes` raise `unknownCategory`, both commits answer
   `{ok:false}` with it at 400, nothing written.
   `apply 888c0aec → expect mark 20261120050200`
4. `20261120030300_6e8a509c-22c6-4ab5-b2a4-eb4fa6bf6f9e.sql` — sha256
   `27ce2d89cbe35ecacd1b3b6f11d0c69bd21f534f65fb9349e5cff00f6ac94876`; mark `20261120050300`. Redeclares
   `loc_import_plan` by computed insertion, grants restated as live. Proofs: (a) body, header, grants; (b) an unknown
   scope of two or three letters `unknownCountry` (never 22001), a three-letter countries-file code the row reason
   `badCountryCode`, places at latitude 91, longitude −181 and latitude NaN the row reason `badCoordinates`, 90/−180
   planned; (c) INC-1164 through the preview and the commit with three scratch holders (places rights scoped to XZ;
   places and country rights scoped to XZ; both global): refusals, `planHasRefusals`, `permissionDenied:translations`
   at 403, nothing written by a refused commit, and the allowed imports.
   `apply 6e8a509c → expect mark 20261120050300`
5. `20261120030400_b2c15e1f-1190-4407-af35-f3f5b8aef264.sql` — sha256
   `2e69a00eaf895d33e3cbaec613b8ce7e32cba78c7997ab4119e63e32a13841a3`; mark `20261120050400`. Redeclares
   `admin_export_categories` and `admin_export_locations` written out. Proofs: (a) bodies, headers, grants (EXECUTE
   for authenticated, never anon or PUBLIC); (b) an unknown category scope `unknownCategory`, an unknown country scope
   of two or three letters `unknownCountry`, no scope answers the document.
   `apply b2c15e1f → expect mark 20261120050400`
6. `20261120030500_2c3654f9-40d8-42cb-8755-c5490b52cddf.sql` — sha256
   `dc8907f1b58fe8a069a56130fbe197bdc6f2760187468723faf809652961f53b`; mark `20261120050500`. Redeclares
   `assign_role` (COMMENT restated with its new codes), `admin_upsert_country`, `admin_set_country_active` and
   `admin_set_country_root_order`, written out, grants restated as live. Proofs: (a) bodies, headers, grants;
   (b) `assign_role`: `unknownUser` and `badCountryCode` at 400 with no role and no audit line written,
   `roleReserved:super_admin`, a known person assigned; (c) each country door's three-letter code `badCountryCode`
   at 400, nothing written; a two-letter code created, opened and ordered.
   `apply 2c3654f9 → expect mark 20261120050500`
7. `20261120030600_002796c4-63a2-4cd4-bc6f-490a2eae9207.sql` — sha256
   `34d9924dbf887d941ec5663e997d946cf90038f0e58f0ef74e6d119d728730b0`; mark `20261120050600`. Redeclares
   `admin_undo_location_import` written out, grants restated as live. Proofs: (a) body, header, grants; (b) two
   batches through the commit door; (c) the places-only holder's undo of an opening `permissionDenied` at 403, a
   holder whose country right is another country's `permissionDenied:scope` at 403, neither restoring anything; the
   places holder undoes his own batch; the holder of both undoes the opening (XZ closed, its place gone).
   `apply 002796c4 → expect mark 20261120050600`
8. `20261120030700_cbdfbd69-9dc9-4041-b73b-e03f5dc22172.sql` — sha256
   `88994d002bf3b7fe933233e18475adf146c0fbcbf6726a8193bcaefff90e4f29`; mark `20261120050700`. Drops three read rules
   and revokes `category_attributes`' browser SELECT. Pre-check: the three rules stand with `USING (true)` for anon
   and authenticated, and the grants are as the census read them. Proofs: (a) the rules are gone, row security
   stays on all three tables, the six deny rules stand; (b) neither browser role may SELECT any of the three tables
   by the table or any column, nor write `category_attributes`; the service role keeps SELECT.
   `apply cbdfbd69 → expect mark 20261120050700`

`bun run db:proof --fresh` on the committed tree (4b4ca6ff5):

    db:proof PASS — applied 540/540, CLI 2.120.0, cold, 57 s

Guard lines (`bash scripts/check-migrations.sh`, exit 0):

    Born-closed guard OK (floor 20261007143529).
    Definer guard OK.
    Self-marking guard OK (floor 20260817054246).
    Public-surface guard OK (floor 20261003215043).
    Real-row proof guard OK (floor 20261007000000).
    Spanning-literal guard OK (floor 20261109000000).
    Random-text guard OK (floor 20261118160000).
    Migration guard OK.

`bun scripts/doors/check-doors.ts` (static):

    check-doors self-test OK: 12 finding kinds fired on their planted fixtures, the clean pair fired nothing
    check-doors static OK: 220 manifest lines reconcile with the migrations' catalogue

Also run on the committed tree: `bun run typecheck` 0, `bun run lint` 0, `bunx vitest run scripts --maxWorkers=2`
124 files passed, 668 tests passed, 1 skipped. `bun run checks` is STEP 5's (not run here).

pre-stop scan: 7 of 7, 74954b0b e6a3d930 888c0aec 6e8a509c b2c15e1f 2c3654f9 002796c4 cbdfbd69 — (1) the
order applies cold on db:proof; (2) every scratch key matches its column's CHECK (slugs, role names, reasons of 5+
characters, two-letter country codes); (3) every literal passed to a typed parameter is cast (`95.0::double
precision`, `'{}'::uuid[]`, `NULL` into nullable arguments); (4) no expectation reads a real row: scratch countries
XZ/XY with an existence check first, every read of `locations`, `categories` and `user_roles` names its `e2e-mig-`
key literally (the real-row guard); (5) one random draw per proof (`v_hex`), every other key derived or a fresh uuid
for a scratch row; (6) every pre-check reads the previous mark and each redeclared body's live md5 (file 8 redeclares
none and reads the policies and grants instead); (7) every compared body is `replace(…, chr(13), '')`-stripped and
every computed pair is a one-line `E''` literal (the spanning-literal guard OK).

The proofs' first run on a shared database is the staging apply.

## Why no caller meets a changed refusal before its parser does

The files apply in the order every caller is reached: the trigger and the cores raise P0D01 before any door is
redeclared, and every caller that runs them inside a shell (each places door, each import commit) already turns a
P0D01 into its `{ok:false}` answer; the planners' callers are the previews (staff readers, no shell: the raise
reaches the import route's relay, whose `codedRefusal` already reads a P0D01 by its code) and the commits (shell). The
client parsers (census §consumers, PREVENTION (1)) already read every changed code safely: the places mapper reads
the message head whatever the SQLSTATE, so the seven trigger words read as before. Three answers fall to a generic
line between the staging apply and STEP 3, and never to a raw text: the places words have no `badCoordinates` yet
(the console's generic line); the exports' `exportRefusal` matches neither scope sentence, so an unknown scope
answers `readFailure` 500 (it was 404); `isExpiredSessionError` does not yet read `noActiveSession`, so an expired
impersonation draws the server line (and the reader's P0D01 is HTTP 500 until F1-7c, INC-1213). STEP 3 reads each.
No e2e spec reaches any of the three (census §tests).

## Every redeclared body, old and new md5

| function | how | old md5 | new md5 |
|---|---|---|---|
| `locations_ancestry_guard()` | written | `b48ccd384604f2f5e27270a75afc7eec` | `43e35d1f96cd1628eb1b169b5d3b610f` |
| `admin_save_entity_translation_core(text,uuid,text,text,text)` | written | `2a931fe0328dc630c657d52ab3b99d5e` | `3db0a060f737adea54a00b34b7da3bee` |
| `impersonation_target(uuid)` | written | `a50583be2e3d2768b10b9cefd04a06d3` | `247e6d7ed630def625479b3414a771f4` |
| `cat_import_plan(jsonb,text)` | computed | `c668f8b04c903f60f0117051107cf800` | `e3d3f9e586a9b2a809a1ee3aa2c1cd47` |
| `attr_import_plan(jsonb,jsonb,text)` | computed | `7a2cb3062a843c2d16ce1b5be5be90ef` | `b8a140b73f535e16bf7997af3b74c994` |
| `attr_export_payload(text)` | written | `5cec4c6a3f3b2fdf68a739722bba05be` | `d77732ed7c37a4363b0a969577b74d38` |
| `loc_import_plan(jsonb,jsonb,text)` | computed | `f8dffb8064d4537411b98f77f14329e4` | `9d5650e56c2e476328f9540337eeed90` |
| `admin_export_categories(text)` | written | `e0b47db317c37a67d62ddb02b929cdeb` | `4e06837141b4d95722f4db029a647376` |
| `admin_export_locations(text)` | written | `3754109e0273d14cdb0425a57296eef5` | `55bd5d3040fe5419c650fc1ed8182af6` |
| `assign_role(uuid,text,character)` | written | `1546e9c54840be08feb2f509b1e18958` | `28ba9888b3e7973c692d0c84fa805efb` |
| `admin_upsert_country(text,text,text,text,integer)` | written | `d897481fbdaca05de73d6f6d2b8979ba` | `7209bdfc35f85997db188d2dcb6e6475` |
| `admin_set_country_active(text,boolean,boolean)` | written | `ee6abf5b62714bb22868ab96d646f3fb` | `e04c4eb5be72bd2b5a794150a2269de0` |
| `admin_set_country_root_order(text,uuid[])` | written | `539563ee560f0cfab603e045e4023f9f` | `17138fe248c76d25009e109306b8d785` |
| `admin_undo_location_import(uuid)` | written | `03bdb90b19982f9b4e17f1b6212eb8a3` | `bd3d06449cb60518cdaaba275c27b0ca` |

md5 is `md5(replace(prosrc, chr(13), ''))`; each old value was read live on the proof stack (census probe 3) and is
the file's pre-check. New function: `country_row_right(text,boolean,boolean,boolean)`.

## Grants and policies that left

| object | before | after | what it stops |
|---|---|---|---|
| `attributes.attributes_public_read` | SELECT policy, anon and authenticated, `USING (true)` (no SELECT grant to either role) | dropped | the day a SELECT grant reached `attributes`, the whole table opening to every visitor |
| `category_attribute_links.cal_public_read` | as above | dropped | the same for `category_attribute_links` |
| `category_attributes.category_attributes_public_read` | SELECT policy, anon and authenticated, `USING (true)` | dropped | with the grants below: a visitor or member reading the legacy per-category attribute rows straight from the data API, which no screen does |
| `category_attributes` SELECT | anon and authenticated: table SELECT and column SELECT on all 18 columns | none (service_role keeps every privilege) | as above |

Row security stays on all three tables; the six `*_no_client_*` deny rules on `attributes` and
`category_attribute_links` stand. No grant was added; the redeclared functions keep their live grants (the planners
and `attr_export_payload`: service role only; `admin_export_categories`: authenticated, its grant not restated —
`CREATE OR REPLACE` keeps it, proof (a) of file 5 asserts it).

## Every new code and the sentence it replaces

| function | before | after |
|---|---|---|
| `locations_ancestry_guard` | `RAISE EXCEPTION` (P0001) `rootMustBeCountry`, `badSlug`, `missingCoordinates`, `parentMissing`, `levelMismatch`, `crossCountry`, `parentInactive` | the same seven through `door_refuse` (P0D01), plus `badCoordinates` (a latitude beyond ±90 or a longitude beyond ±180, NaN and ±Infinity included) |
| `admin_save_entity_translation_core` | `permissionDenied` (no detail) | `permissionDenied:translations` |
| `impersonation_target` | `impersonation session expired` | `noActiveSession` |
| `cat_import_plan`, `attr_import_plan`, `attr_export_payload`, `admin_export_categories` | `unknown category scope` | `unknownCategory` |
| `loc_import_plan`, `admin_export_locations` | `unknown country scope` (and 22001 for a scope longer than two letters) | `unknownCountry` |
| `loc_import_plan` (row reasons) | a long countries-file code raised 22001; no range rule; no country right read | `badCountryCode` (existing reason), `badCoordinates` (no detail), `permissionDenied` with detail `activate` or `update` |
| `assign_role` | 23503 for an unknown person; 22001 for a long scope | `unknownUser`; `badCountryCode` |
| `admin_upsert_country`, `admin_set_country_active`, `admin_set_country_root_order` | 22001 for a code longer than two letters | `badCountryCode` (existing code) |
| `admin_undo_location_import` | restored a country row under `locations:import` alone | `permissionDenied[:scope]` before anything is restored |

## New string keys (English only; STEP 3 writes them, the Amharic from the supervisor's file)

- `admin.locations.error.badCoordinates` — "Latitude must lie between -90 and 90, and longitude between -180 and 180."
- `admin.locations.import.reason.badCoordinates` — "This row's latitude or longitude is out of range."
- `admin.locations.import.reason.permissionDenied` — "You do not have permission to change this market's own record."

No key changes in this commit (`src/i18n/locales/` untouched).

## Manifest cells changed (`scripts/doors/manifest.txt`)

- `admin_export_categories(text)` codes `-` → `unknownCategory`: the reader now refuses an unknown scope by a code.
- `admin_export_locations(text)` codes `-` → `unknownCountry`: the same for a country scope.
- `admin_undo_location_import(uuid)` codes `batchAlreadyUndone,undoBlocked,unknownBatch` →
  `batchAlreadyUndone,permissionDenied,undoBlocked,unknownBatch`: a country row the caller holds no right over.
- `assign_role(uuid,text,character)` codes `roleReserved,unknownRole` →
  `badCountryCode,roleReserved,unknownRole,unknownUser`.

Correction to the census (§lists): it named two cells; `check-doors` static (DOORS-4, DOORS-6) also asks the two
exports' cells, since each body now holds a `door_refuse` literal. No class, permission, country or dial cell
changed.

## Decisions for the supervisor

1. The codes: `unknownCategory`, `unknownCountry`, `noActiveSession` (the code `end_impersonation` already answers),
   `badCoordinates` (the brief's proposal), `unknownUser`, and `badCountryCode` reused; the translation step's detail
   is `translations` (one lowercase word, as the gate's `scope` and the core's `language`).
2. `assign_role`'s `unknownUser` reads `auth.users`, the table its foreign key reads, so no account the key accepts
   today is refused; its `badCountryCode` check comes after the gate and the role checks.
3. The country row's right lives in one closed helper, `country_row_right` (STABLE DEFINER, service role only), over
   `has_permission_scoped` — the country doors' own rule: open or close `countries:activate` (match), fields
   `countries:update` (global), root order `countries:update` (match); the service role passes. The planner and the
   undo both read it (K1); its register row goes to the report's §14.
4. The planner's reasons: `permissionDenied` with the action as detail (`activate` or `update`), so the preview names
   the missing right and the commit refuses `planHasRefusals`; `badCoordinates` with no detail. A created country
   needs the field right (global), as `admin_upsert_country` does.
5. The undo checks every unrestored country revision before it restores anything: `open`/`close` → activate,
   `create`/`update` → fields, `update` → root order too (its restore rewrites the root order).
6. The files: eight, by concern, in PREVENTION (7)'s order; the doors' file split in two by rule 30's size line.
7. `category_attributes` loses its browser SELECT grants and its read rule (no browser reader: census §premises).
8. The three planners are redeclared by computed insertion (bodies of 24–67 KB), so the reader reads each as a
   `format()` template: `attr_import_plan` leaves `COMPUTED_BY_HAND` (now empty), and MGR-7's list of computed names
   gains `cat_import_plan` and `loc_import_plan` (`scripts/conformance/migration-reader.ts` and its test;
   `docs/features/ci-guards.md` follows).
9. `admin_export_categories`' grant is not restated (no public-surface allowlist line exists for it and adding one
   is outside SCOPE); `CREATE OR REPLACE` keeps it, and the proof asserts it.
10. The proofs name their scratch key literally in every statement that reads `locations`, `categories` or
    `user_roles` (`slug LIKE 'e2e-mig-%'`, a role named `e2e-mig-…`), as the real-row proof guard reads it.
11. The scratch country codes `XZ`, `XY` and the three-letter `XZQ` are literals, as earlier proofs' `XZ` (K4's
    recorded exception, named in each file), each checked absent first.
12. The English of the three new keys above.

## Expected reds on this push until STEPS 3 and 4

By test id: none that I know of. The laws run green on this tree (MGR-6, which the census expected red, and MGR-7 are
green in this commit with the reader's lists; DOORS-4 and DOORS-6 with the manifest's cells). The unit tests the census names (CSV-7, the impersonation service's
expired-session test, LRF-1, LRF-2, IMD-6) mock the database and read the client code, which this commit does not
change, so they stay green until STEP 3 changes them; no e2e spec reads a changed answer (census §tests). The
preflight job reports STAGING BEHIND until ethio-staging holds mark `20261120050700`: expected.

## Findings

- `assign_role` stores `p_scope_country` as given, with no case fold; a lowercase two-letter scope passes the new
  `upper()` check and is stored lowercase, and `has_permission_scoped` compares upper-case, so such a role never
  matches a country. The console never sends a scope. For the roles family.
- `has_permission_scoped` casts its country argument to `character(2)`, so a longer argument is judged by its
  first two letters; every `arg:` door either compares the full text first or (after this turn) refuses the shape.
- About 60 deny-all read rules (`USING (false)`) sit on tables no browser role can read: harmless; INC-1166's census
  guard stays on the before-launch list.
- The country anchor's state (`locations` level `country`) is changed under the places rights, both by the console
  (`admin_set_location_active`, `locations:update`) and by the places import; only the `countries` row now needs the
  country right.
- `admin_set_location_active`'s comment says the ancestry trigger's `parentInactive` "passes unchanged"; since this
  turn it is a metered refusal of the door's shell. The comment is stale (a later redeclaration may restate it).
- `admin_export_categories` holds no service-role grant, unlike `admin_export_locations` (live ACL: postgres and
  authenticated); unchanged here.
- The landed F1-4b undo proof (`20261115123500`) had a global `locations:import` holder without country rights create
  a country through the import; that is now refused. The landed proof ran before these files, so it is unaffected;
  production should be read for any custom role holding `locations:import` without the country rights before the
  apply, since such a holder loses the country row (INC-1164's intended change).
- The impersonation readers' `noActiveSession` arrives as P0D01, which PostgREST answers at HTTP 500 rather than the
  sentence's 400, until F1-7c gives a reader's refusal its own status (INC-1213).

Scratch (the operator's to remove): `/tmp/ethio-scratch/f1-doors-7b/` holds the probes, `changes.ts`, `gen.ts` (the
generator of the eight files from the live bodies), the templates `tpl/1…8-*.sql`, `split.ts`, `scratchkey.ts`, and
the db:proof, guard and laws outputs.
