MIGRATION — f1-doors-5a STEP 2: the family's doors on the shell (part 1, DEC-392's restore, and parts 2 to 15)
DONE: STEP 0 (`c128271de`), STEP 1 (the census, `f056957b5`), ruling 1 saved (`020523f44`), ruling 2 saved bare (`7de93c67d`), part 1 — ruling 2 (2)'s restore file (`488950fae`), Part A (`e3e15b0f8`), Part B (`a56b14589`), the migration (`588c1d6df`)
LEFT: STEPS 3 to 7 (the second chat, after the supervisor's ruling on this stop — DEC-387)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `b0416eeb19bd97abd6d35325e92257d880e1051b` (short `b0416ee`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-15T20:27:16Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43757705646
(the lane's `branches/cursor/f1-doors-5a/ci-status.md` on `origin/ci-evidence`, the last pushed commit, stop 2's.
Dev: `bdb2fc555`, **SUCCESS**, run 43753052995; `origin/dev` is still `bdb2fc555`, the base, so no file of this lane
changed on dev.)
FILES:
docs/features/doors.md
docs/features/locations-console.md
docs/governance/briefs/f1-doors-5a-ruling-1.md
docs/governance/briefs/f1-doors-5a-ruling-2.md
docs/governance/briefs/f1-doors-5a.md
docs/governance/reports/f1-doors-5a.census.md
docs/governance/reports/f1-doors-5a.stop-1.md
docs/governance/reports/f1-doors-5a.stop-2.md
docs/governance/reports/f1-doors-5a.stop-3.md
roadmap.md
scripts/conformance/listing-designation.test.ts
scripts/conformance/listing-designation.ts
scripts/conformance/migration-reader.test.ts
scripts/doors/catalogue.ts
scripts/doors/check-doors.test.ts
scripts/doors/check-doors.ts
scripts/doors/judge.ts
scripts/doors/manifest.txt
scripts/doors/rows.ts
scripts/route-budgets.mjs
src/features/admin-attributes/attributes-service.ts
src/features/admin-categories/categories-service.test.ts
src/features/admin-categories/categories-service.ts
src/features/admin-locations/locations-service.ts
src/lib/answered-id.test.ts
src/lib/answered-id.ts
supabase/migrations/20261115203000_986fbe0b-2896-4dc1-8c8f-3673b90130f4.sql
supabase/migrations/20261115203100_7603ae36-8661-444c-ab52-4d57c960ed42.sql
supabase/migrations/20261115203200_097f9087-016b-4872-b29a-9b88fe076acb.sql
supabase/migrations/20261115203300_8ab7c960-9744-4017-a6e9-208155eccc58.sql
supabase/migrations/20261115203400_c0d42dfb-628a-468a-9e0a-5da6d5de30c6.sql
supabase/migrations/20261115203500_61e4e66b-b39b-4644-b25a-179284db7406.sql
supabase/migrations/20261115203600_538bb297-4aee-455b-b147-34a6188e261d.sql
supabase/migrations/20261115203700_3e9620aa-fd11-40d9-9b50-7f766c838db9.sql
supabase/migrations/20261115203800_c57c863c-b032-4ed8-a6a6-fd3e6ebab4c7.sql
supabase/migrations/20261115203900_cf5771ed-622d-47a3-a7b4-cbc76afa1bd6.sql
supabase/migrations/20261115204000_5cf2054f-b6e7-4140-a187-6d0ec7a419dd.sql
supabase/migrations/20261115204100_67fc3a41-23b6-4508-b4f5-5eb41cd35ff9.sql
supabase/migrations/20261115204200_236752a6-ebc4-47b4-9886-6b6e8ac78c26.sql
supabase/migrations/20261115204300_5f6de283-a975-4d85-9318-1b8ae1d7a897.sql
supabase/migrations/20261115204400_8c921ada-9ab3-4ea8-827f-3b2a9e1a485a.sql

## How this stop was reached

The first chat was cut off by a provider outage after its `db:proof --fresh` PASS, with the migration not yet
committed. This chat read the tree as the operator's message ordered (`git status --short`: the fourteen migration
files untracked and four modified list files; `git stash list`: empty; nine lane commits above `origin/dev`), read the
brief, both rulings (ruling 2's sha256 `5950556388d9769456bbf513339d8ec31ec7c866cc3f00ecfb9d897dec33a14e` equal to the
operator's value), the census and stops 1 and 2. Ruling 2 was already saved bare in `7de93c67d`, so no commit saves it
again.

The marks the first chat had set (from `20261116010000`) were computed for a commit before 00:00 UTC; the outage
overtook them before any commit carried them. The marks were computed again for this commit's hour: the commit landed
at 01:46 UTC (`588c1d6df`), so the first mark is 02:00 + one hour = `20261116030000`, +100 per further part, the last
`20261116031300` — every one above part 1's `20261115220000` and above the ledger's newest. Every check below ran on the
files as committed, with these marks.

## The checks, on the committed files

- `bun run db:proof --fresh`: `db:proof PASS — applied 499/499, CLI 2.120.0, cold, 54 s`
- `bash scripts/check-migrations.sh`, run whole (exit 0), its guard lines:
  `Born-closed guard OK (floor 20261007143529).` · `Definer guard OK.` · `Self-marking guard OK (floor 20260817054246).` ·
  `Public-surface guard OK (floor 20261003215043).` · `Real-row proof guard OK (floor 20261007000000).` ·
  `Spanning-literal guard OK (floor 20261109000000).` · `Migration guard OK.`
- `bun scripts/doors/check-doors.ts` (static, ci.yml:142): `check-doors self-test OK: 9 finding kinds fired on their
  planted fixtures, the clean pair fired nothing` / `check-doors static OK: 260 manifest lines reconcile with the
  migrations' catalogue` — zero findings; `rg grant-dropped scripts/doors/*allowlist*` finds no line.
- `SELF_TEST=1 bun scripts/doors/check-doors.ts`: `check-doors self-test OK: 9 finding kinds fired on their planted
  fixtures, the clean pair fired nothing`
- `bun run typecheck`: exit 0. `bun run lint`: exit 0 (its one finding on the first run, Prettier's line join in
  `scripts/conformance/migration-reader.test.ts` once `edit_my_listing` left the list, was fixed before the commit).
- `bunx vitest run scripts --maxWorkers=2`: `Test Files 120 passed (120)`, `Tests 622 passed | 1 skipped (623)`.
- pre-stop scan: 7 of 7, 986fbe0b 7603ae36 097f9087 8ab7c960 c0d42dfb 61e4e66b 538bb297 3e9620aa c57c863c cf5771ed
  5cf2054f 67fc3a41 236752a6 5f6de283 8c921ada — (1) every file applies in order on a fresh stack (db:proof); (2) every
  scratch row a proof writes passed its column's CHECK on that apply (the users `e2e-mig-…@…`, the country `XZ`, the
  places and categories `e2e-mig-…`); (3) every literal passed to a declared parameter has its type (`1::smallint` into
  `submit_listing`'s step, numerics into `set_listing_pin`); (4) no expectation is a real row's value — every proof
  builds its own market `XZ`, anchor, region, city, category, attribute, reach package, users and ads, and the one
  reference value it needs (the legal acceptance's language) is `public.language_code('base')`, written as an input,
  never compared; (5) each proof draws ONCE (`v_hex`, from `gen_random_uuid()`) and derives every scratch
  key from it (`v_tag := 'e2e-mig-f15a<n>-' || substr(v_hex, 1, 10)`, the package `'e2e_mig_r0_' || substr(v_hex, 11,
  8)`); the other draws are row ids; the market code is the fixed scratch `XZ`, refused if it exists; (6) every file's pre-check reads the previous part's mark and the live md5
  of every body it redeclares; (7) every md5 is read from `replace(prosrc, chr(13), '')` against a one-line literal, and
  the spanning-literal guard is OK.

## The order of the files, and why no caller meets a returned refusal

Part 1 (DEC-392, ruling 2 (2)) first: two service-role grants, no body. Then THE LAWS' order (ruling 1 §3, G74 (6)):

1. Part 2 — the core `transition_listing_core(uuid,text)`: new, service-only, today's state machine whole, its
   refusals by `door_refuse` (P0D01, RAISED — the core has no shell). Nobody calls it yet.
2. Part 3 — the SQL callers onto the core: `admin_move_listing_core` (with `rate_gate('revise')` where the transition
   spent it, ruling 1 §4) and `designation_sweep_core` (the expiry cron, no caller).
3. Parts 4 to 14 — the doors onto `door_context` and the shell, by concern; `resume_listing` (part 8) and
   `set_listing_level` (part 11) call the core, not `transition_listing`.
4. Part 15 — `transition_listing` last: DROP + CREATE `RETURNS jsonb`, `door_context('owner', NULL, NULL, 'revise')`,
   the core, the shell.

No caller meets a returned refusal: the only function of this family that another function calls is the status
machine, and by part 15 every SQL caller calls the core, which RAISES; the shell (which returns) is only ever the
outermost frame — a door the browser or a route calls. No other family body calls another family door (the census's
call-form reader and the live word scan, `consumers` §SQL callers). Between parts, every caller of a function still
meets the form that function had before: until part 15, `transition_listing` is today's body.

## The files (each with its pairing line)

### Part 1 — `20261115203000_986fbe0b-2896-4dc1-8c8f-3673b90130f4.sql`

- sha256: `446b6792fd5a95d4946a679c13b3b9607d37d543c90261a6f9e50682180212f6`
- size: 2328 bytes; `-- e2e-areas: admin-translations`
- pre-check: the previous mark `20261115150800`
- objects: none (grants only)
- closers: 2 REVOKE / GRANT lines, then the mark `20261115220000`
- proofs: `admin_list_translations` and `admin_upsert_language` read `has_function_privilege('service_role', …, 'EXECUTE')` true, `authenticated` true, `anon` false

```
apply 986fbe0b → expect mark 20261115220000
```

### Part 2 — `20261115203100_7603ae36-8661-444c-ab52-4d57c960ed42.sql`

- sha256: `2f1ff3a6492adcdd2014ab351151303643758b9506f009273be646d4a6252816`
- size: 29768 bytes; `-- e2e-areas: my-listings, admin-listings, ad-page`
- pre-check: the previous mark `20261115220000`; the live md5 of 1 body
- objects: `new transition_listing_core`
- closers: 2 REVOKE / GRANT lines, then the mark `20261116030000`
- proofs: (b) the service path: no caller.; (c) the owner path: DEC-391, then each rule with every earlier check cleared.; (d) the owner closes his live ad; the service pauses one; each writes its revision.; (e) the core spends no dial.

```
apply 7603ae36 → expect mark 20261116030000
```

### Part 3 — `20261115203200_097f9087-016b-4872-b29a-9b88fe076acb.sql`

- sha256: `8839d6ee89cd86a45ded162ffb014b560d5d7113c0da596efef9c15fb4bd3a49`
- size: 23548 bytes; `-- e2e-areas: admin-listings, my-listings`
- pre-check: the previous mark `20261116030000`; the live md5 of 2 bodies
- objects: `admin_move_listing_core`, `designation_sweep_core`
- closers: 3 REVOKE / GRANT lines, then the mark `20261116030100`
- proofs: (b) the sweep expires a due ad through the core, with no caller.; (c) a staff member with listings:enforce and a fresh second factor removes another seller's ad.; (d) ruling 1 §4: the staff move spent revise once; the sweep spent nothing.

```
apply 097f9087 → expect mark 20261116030100
```

### Part 4 — `20261115203300_8ab7c960-9744-4017-a6e9-208155eccc58.sql`

- sha256: `f075733faaf78e854819d901526ec06aa97ef516680286763c1336ffb3258b03`
- size: 28952 bytes; `-- e2e-areas: posting, my-listings, door-refusals`
- pre-check: the previous mark `20261116030100`; the live md5 of 3 bodies
- objects: `move_listing_photo`, `remove_listing_photo`, `set_cover_photo`
- closers: 6 REVOKE / GRANT lines, then the mark `20261116030200`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 8ab7c960 → expect mark 20261116030200
```

### Part 5 — `20261115203400_c0d42dfb-628a-468a-9e0a-5da6d5de30c6.sql`

- sha256: `8b680684407f8f2c70318eb72a65408cc66179d5c78df3d09fdc94b7332a32eb`
- size: 27219 bytes; `-- e2e-areas: posting, account, door-refusals`
- pre-check: the previous mark `20261116030200`; the live md5 of 4 bodies
- objects: `save_seller_place`, `clear_seller_place`, `check_seller_alias`, `suggest_seller_aliases`
- closers: 8 REVOKE / GRANT lines, then the mark `20261116030300`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply c0d42dfb → expect mark 20261116030300
```

### Part 6 — `20261115203500_61e4e66b-b39b-4644-b25a-179284db7406.sql`

- sha256: `7feabb27503cbfee4ea701b727bd55b328cf14eb24f8339cfcdf43191d9229e1`
- size: 26107 bytes; `-- e2e-areas: posting, door-refusals`
- pre-check: the previous mark `20261116030300`; the live md5 of 2 bodies
- objects: `get_posting_schema`, `get_attribute_options`
- closers: 4 REVOKE / GRANT lines, then the mark `20261116030400`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 61e4e66b → expect mark 20261116030400
```

### Part 7 — `20261115203600_538bb297-4aee-455b-b147-34a6188e261d.sql`

- sha256: `51dab6d92aae2c02cd8770e712d7429ded81f40473f995d762ed9ed3a4cbab69`
- size: 23247 bytes; `-- e2e-areas: my-listings, ad-page, door-refusals`
- pre-check: the previous mark `20261116030400`; the live md5 of 2 bodies
- objects: `mark_sold`, `set_listing_reserved`
- closers: 4 REVOKE / GRANT lines, then the mark `20261116030500`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 538bb297 → expect mark 20261116030500
```

### Part 8 — `20261115203700_3e9620aa-fd11-40d9-9b50-7f766c838db9.sql`

- sha256: `10d26765ab2410ce77e4c3fb8b5bc0f94cef1da7e628f61d416d292bc026dd39`
- size: 24156 bytes; `-- e2e-areas: my-listings, ad-page, door-refusals`
- pre-check: the previous mark `20261116030500`; the live md5 of 2 bodies
- objects: `renew_listing`, `resume_listing`
- closers: 4 REVOKE / GRANT lines, then the mark `20261116030600`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 3e9620aa → expect mark 20261116030600
```

### Part 9 — `20261115203800_c57c863c-b032-4ed8-a6a6-fd3e6ebab4c7.sql`

- sha256: `3403fb66718eb6dfd82c0b423a5a23b729ce7ef0551b71ffaee43062743ba8bd`
- size: 26352 bytes; `-- e2e-areas: posting, my-listings, door-refusals`
- pre-check: the previous mark `20261116030600`; the live md5 of 2 bodies
- objects: `set_listing_photos_soon`, `copy_my_listing`
- closers: 4 REVOKE / GRANT lines, then the mark `20261116030700`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply c57c863c → expect mark 20261116030700
```

### Part 10 — `20261115203900_cf5771ed-622d-47a3-a7b4-cbc76afa1bd6.sql`

- sha256: `621f62df4a6103432410ae361e48d3c3045364da81f9d098f670ddb1e5418817`
- size: 30992 bytes; `-- e2e-areas: posting, my-listings, door-refusals`
- pre-check: the previous mark `20261116030700`; the live md5 of 2 bodies
- objects: `set_listing_pin`, `publish_listing`
- closers: 4 REVOKE / GRANT lines, then the mark `20261116030800`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply cf5771ed → expect mark 20261116030800
```

### Part 11 — `20261115204000_5cf2054f-b6e7-4140-a187-6d0ec7a419dd.sql`

- sha256: `d1b04c24f1d2b0d8c2ff8f99a7ba911f80abd2e0a5c7f31950b847e684e45f38`
- size: 28071 bytes; `-- e2e-areas: my-listings, admin-monetisation, door-refusals`
- pre-check: the previous mark `20261116030800`; the live md5 of 2 bodies
- objects: `set_listing_level`, `set_listing_reach`
- closers: 4 REVOKE / GRANT lines, then the mark `20261116030900`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 5cf2054f → expect mark 20261116030900
```

### Part 12 — `20261115204100_67fc3a41-23b6-4508-b4f5-5eb41cd35ff9.sql`

- sha256: `16926d3bb0393bd1e0ce30df2346e7b687f932eb16505ed9201c9cb49463c73d`
- size: 34641 bytes; `-- e2e-areas: my-listings, posting, door-refusals`
- pre-check: the previous mark `20261116030900`; the live md5 of 1 body
- objects: `edit_my_listing`
- closers: 2 REVOKE / GRANT lines, then the mark `20261116031000`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 67fc3a41 → expect mark 20261116031000
```

### Part 13 — `20261115204200_236752a6-ebc4-47b4-9886-6b6e8ac78c26.sql`

- sha256: `7f6e2913cb8a32aca5761aee49e684add04c8b562ac7f163ff8ef2da7ca5ffc0`
- size: 23541 bytes; `-- e2e-areas: posting, door-refusals`
- pre-check: the previous mark `20261116031000`; the live md5 of 1 body
- objects: `submit_listing`
- closers: 2 REVOKE / GRANT lines, then the mark `20261116031100`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 236752a6 → expect mark 20261116031100
```

### Part 14 — `20261115204300_5f6de283-a975-4d85-9318-1b8ae1d7a897.sql`

- sha256: `dc142471b98da92e00b10419e8543bf7de0b0f57f208db235a3427d653dc5ef7`
- size: 20516 bytes; `-- e2e-areas: posting, account, auth-caller-gates, door-refusals`
- pre-check: the previous mark `20261116031100`; the live md5 of 1 body
- objects: `save_posting_identity`
- closers: 2 REVOKE / GRANT lines, then the mark `20261116031200`
- proofs: the four gates per door, the facts, the codes, the snapshot, the tallies (below)

```
apply 5f6de283 → expect mark 20261116031200
```

### Part 15 — `20261115204400_8c921ada-9ab3-4ea8-827f-3b2a9e1a485a.sql`

- sha256: `ee5edf38ace98f9f2a8f76566879a4ff2cba125c98d4fea6b52c908458fec3bf`
- size: 17894 bytes; `-- e2e-areas: my-listings, ad-page, admin-listings, door-refusals`
- pre-check: the previous mark `20261116031200`; the live md5 of 1 body
- objects: `DROP transition_listing`, `new transition_listing`
- closers: 2 REVOKE / GRANT lines, then the mark `20261116031300`
- proofs: (c) the service role passes the gate, spends nothing, and pauses an ad (the service path).

```
apply 8c921ada → expect mark 20261116031300
```

## The proofs, part by part

Every part from 4 to 15 proves, for EACH door it redeclares, the four gate refusals with their exact message, reason,
`ok` and HTTP status, each driven past every earlier refusal (law 14): no caller → `notSignedIn` (401); a deactivated
scratch seller → `accountDeactivated` (403); seller B on seller A's scratch ad → `notYourListing`; seller A on an id no
row holds → `notYourListing` (DEC-391). Then (a) the catalogue facts of every body it declares — SECURITY DEFINER or
not, VOLATILE, `search_path=public`, the return type, no PUBLIC or anon EXECUTE, the authenticated and service-role
EXECUTE by kind, and the new md5; then the door's own codes; then a snapshot of every table a refused call could touch
(listings, revisions, photos, photo changes, the scratch storage objects, seller places, profiles, audit lines, seller
notices) compared before and after the refused calls — unchanged; then the success path where the part names one;
then the dial tally (one compare of `rate_limits` per scratch caller and dial against the count the calls must
spend: a refused call after the gate counts its dial once, INC-844; a gate refusal for no caller or a deactivated
caller counts nothing); then `door_refusals` meters the part's refusals, by the count each proof states. Every proof ends with its sentinel
`RAISE EXCEPTION 'f1-5a-part-<n>-proof-ok'` caught inside the block, so every scratch row is rolled back.

The door-specific checks (each proof's own failure lines, read from the files):

- Part 2: an unknown status did not refuse; an unknown status refused; the service path on an id no row holds did not refuse; the service path on an id no row holds refused; a draft sold did not refuse; a draft sold refused; an owner on an id no row holds did not refuse; an owner on an id no row holds refused; an owner on another seller's ad did not refuse; an owner on another seller's ad refused; an owner approving his own ad did not refuse; an owner approving his own ad refused; an owner pausing did not refuse; an owner pausing refused; an owner restoring a removed ad did not refuse; an owner restoring a removed ad refused; an owner restoring his deleted ad did not refuse; an owner restoring his deleted ad refused; a draft closed did not refuse; a draft closed refused; a refusal of the core left a trace; the owner's close did not answer ok; the service's pause did not answer ok; the close did not keep the ad's time and status; the pause did not keep the ad's status; a transition's revision is missing; the core spent a dial.
- Part 3: the sweep did not expire the due ad; the due ad did not expire; the expiry's revision is missing; listings:enforce is not declared; the staff move did not answer ok; the staff move did not remove the ad; the staff move's revision, audit line or notice is missing; the dials are not as the move and the sweep spend them.
- Part 4: a move of another ad's photo; a removal of another ad's photo; another ad's photo as the cover; a move to a negative place; a refused photo call wrote a row, moved a photo or left a photo object changed; the move to the front; the move did not reorder the photos; the cover choice; the cover choice did not put the photo first; the removal of the cover; the removal did not take the photo, move the cover and list the change; the dials counted; door_refusals did not meter the 16 refusals.
- Part 5: a refused place or schema call wrote a row; the place saved; the place was not saved; the place cleared; the place was not cleared; an alias checked; the suggestions; the dials counted; door_refusals did not meter the 10 refusals.
- Part 6: the schema of no category; the schema of an inactive category; the schema of a category that takes no ads; the options of no attribute; a refused place or schema call wrote a row; the schema; the options; the dials counted; door_refusals did not meter the 8 refusals.
- Part 7: a draft sold; a reserve with no value; a draft reserved; a refused state call wrote a row; the ad sold; the ad is not sold; the ad reserved; the ad is not reserved; the dials counted; door_refusals did not meter the 11 refusals.
- Part 8: a live ad resumed; a live ad renewed; a refused state call wrote a row; the paused ad resumed; the resume did not return the ad with its time, or wrote no revision; the dials counted; door_refusals did not meter the 9 refusals.
- Part 9: photos soon on a removed ad; a copy of the caller's deleted ad; a copy of a draft; a copy of a removed ad; a copy with no residency fact; a refused draft-side call wrote a row; photos soon set; photos soon was not set; the copy; the copy is not the seller's new draft; the dials counted; door_refusals did not meter the 13 refusals.
- Part 10: a pin on a removed ad; a street line too long; a directions line too long; a latitude out of range; a longitude out of range; a pin with no precision; a pin with an unknown precision; a pin with a zoom out of range; a live ad published; a refused draft-side call wrote a row; the pin; the pin was not stored; the dials counted; door_refusals did not meter the 17 refusals.
- Part 11: a draft's level; an unknown level; the level it has; a draft's reach; an unknown reach; the market's included reach; a refused level or reach call wrote a row; the dials counted; door_refusals did not meter the 14 refusals.
- Part 12: an empty change; a change of the category; another seller's category change (the shape first); an edit of the caller's deleted ad; an edit of a draft; an edit of an ad in review; an edit of an expired ad; an edit of a removed ad; a coverage that is not a list; a coverage of no ids; a contact that is not an object; a street line too long; a directions line too long; a refused edit wrote a row; the dials counted; door_refusals did not meter the 17 refusals.
- Part 13: a step out of range; a live ad saved as a draft; a new draft with no residency fact; a refused submit wrote a row; the dials counted; door_refusals did not meter the 6 refusals.
- Part 14: an unknown seller type; a refused identity call wrote a row; a first name saved; the dials counted; door_refusals did not meter the 2 refusals.
- Part 15: an unknown status; an owner pausing; a refused transition wrote a row; the owner's close; the owner's delete; the owner's close or delete did not land; the service's pause did not answer ok; the dials counted; door_refusals did not meter the 6 refusals.

## Every redeclared body, its previous and new md5

Read from each file's pre-check (the live body, CR-stripped) and its proof (a). The previous md5s are the census's
live readings on the local proof stack (`#MD5`).

| Part | Function | Previous md5 | New md5 |
|---|---|---|---|
| 2 | `transition_listing_core(uuid,text)` | — (new) | 8281cf2fe98b3e674015f4c089db6f39 |
| 3 | `admin_move_listing_core(uuid,text,text,text)` | 59c64012ffe2501ad34dd2570669cefb | 403c8acf9fa61ebe3dd3a87676ddba53 |
| 3 | `designation_sweep_core(uuid[])` | 1d10d4f569f2cf8f6bfe5483ece5f022 | df68f448b67d7bba8dbb6d23328fd118 |
| 4 | `move_listing_photo(uuid,uuid,integer)` | 6b6405681888846fb00dee3ee5a45a07 | c002a8db3f0f2d7385becaf3b01e7e8b |
| 4 | `remove_listing_photo(uuid,uuid)` | 1a7ac7eb852358fe63d4ecb3b77efdf8 | 4f7c41822c373315bcaba9edf5ec0312 |
| 4 | `set_cover_photo(uuid,uuid)` | efa88b38de5af98b6d09e10deaf79fac | 1935398e6d36b878da0a9d4cceafdb90 |
| 5 | `save_seller_place(uuid)` | e80d68439d1c0e0e6cd5524a2da94f0c | 29afcb4b74fd106ffad2dbbfb8ba81a6 |
| 5 | `clear_seller_place()` | d84236e868e0dfc7499499306eb76dad | 46b0cccb973ce64f70bedcdaf37c9e6a |
| 5 | `check_seller_alias(text)` | 2074df98927a2b46651f5420b9c081af | 29894db712b28d729e69484311f7aafa |
| 5 | `suggest_seller_aliases(text,text,text,uuid)` | 4a3b149eac1d2dc430e7ba18d96e896c | 00b413dd1fc9b5a969bc9d71fc4d8c84 |
| 6 | `get_posting_schema(uuid)` | a1bb0e2a63ce2d61525794c6e403305c | 3035c8fc2cc6a84dc5771cea230d7afd |
| 6 | `get_attribute_options(uuid)` | d2d32fec25ac42b8ab8233bcaecc618c | c3c84437d7273a9b73bffbe5c0d40eba |
| 7 | `mark_sold(uuid)` | b48bcfcfacfc144842eca514ee438521 | 5868a9b698756139709c251f8a3117ce |
| 7 | `set_listing_reserved(uuid,boolean)` | cb753d8ec611ab543e5e50416d80290b | 742fded2f212cfa4b2021fc3ba7cb1ed |
| 8 | `renew_listing(uuid,uuid[],text)` | 93815d85ea2c3989fd2ebc0a23d5ba2c | 0b7f8f27d53d235df4f80cd9ae0329a7 |
| 8 | `resume_listing(uuid)` | 858701a05407750f0d68bfcbd584e43d | 7f06ce40150d74b9e0b7aa8eff90bd97 |
| 9 | `set_listing_photos_soon(uuid,boolean)` | c5d2c31b7448076f78448f0cf7e22b1b | b21b91134258df76aba40a5bc60cd1da |
| 9 | `copy_my_listing(uuid)` | c639fa133b2d16458bc8e60992f4ea1a | ce59eea9750497cf900ed2fbec14edc8 |
| 10 | `set_listing_pin(uuid,numeric,numeric,text,text,smallint,text)` | 34c6bdd95f57c63dae9003dbc2cb9b7a | 3ed3aa2a32a01f557db05fa677b38050 |
| 10 | `publish_listing(uuid,uuid[],text)` | 2a455cfb87b99a51389f08a72fe5665c | 84bd1f64f00f96a9e9f3149c5837c3ad |
| 11 | `set_listing_level(uuid,text)` | 91b6da31335bfb3fa4798cff3b7d6b66 | 6bf9af3d6a3103aa69b1047c30b6ada4 |
| 11 | `set_listing_reach(uuid,text)` | 00492e7bc78a52ba2374c408e9457c44 | ee3e01f89b2ca6f6ae10b6ba9221c432 |
| 12 | `edit_my_listing(uuid,jsonb,uuid[],text)` | 77def52b1ce62164e8f2ee1a84af6715 | 4acef9fce78323a237d2edabc3fcfeb1 |
| 13 | `submit_listing(uuid,smallint,uuid,text,text,text,jsonb,text,numeric,character,text,timestamp with time zone,uuid[],jsonb,integer,boolean)` | e39338a4d8ac361c55c1d39e7bc5ee41 | 5987bdc89cf5f57c112e51b9dc2cc1eb |
| 14 | `save_posting_identity(text,text,text,text,text,jsonb,character)` | 59a766e6afe1a623f33121f585a55aca | f2d222259edcabd27a378ab6c621f589 |
| 15 | `transition_listing(uuid,text)` | bddd751f0404d011f2279b818c2245dd | 162b76e76b15eb016f0cbb5d0a2629da |

## Every dropped and re-created function, with its grants

One function is dropped and re-created this turn: `transition_listing(uuid,text)` (part 15, `void` → `jsonb`).

- Its grants before the drop (the live ACL, census `#MD5`:
  `acl={postgres=X/postgres,authenticated=X/postgres,service_role=X/postgres}`; its last declaration,
  `20261015012743_a5300c28…sql:742–744`: `REVOKE ALL … FROM PUBLIC, anon;` · `GRANT EXECUTE … TO authenticated;` ·
  `GRANT ALL … TO service_role;`): `postgres` (the owner), `authenticated`, `service_role`.
- The lines that restate them, in part 15, after the CREATE:
  `REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon;`
  `GRANT EXECUTE ON FUNCTION public.transition_listing(uuid, text) TO authenticated, service_role;`
  (the owner is the creator again). Part 15's proof (a) reads `authenticated` true, `service_role` true, `anon` false,
  PUBLIC none.
- Every DROP + CREATE of this turn passes judge (b) of `grant-dropped` (ruling 2 (1)): the file stamped
  `20261115204400`, above the floor `20261115000000`, restates in that file every role the function held before the
  drop. Judge (a), the result over the whole history, is clean: `check-doors` static reports zero findings with no
  allowlist line, part 1 having restored the two lost service-role grants (`admin_list_translations`,
  `admin_upsert_language`) — its proof reads `has_function_privilege('service_role', …, 'EXECUTE')` true for both,
  `authenticated` true and `anon` false unchanged.
- The new core `transition_listing_core(uuid,text)` (part 2) is born closed: `REVOKE ALL … FROM PUBLIC, anon,
  authenticated;` · `GRANT EXECUTE … TO service_role;` (ruling 1 §3). It is service-only, so it needs no public-surface
  line. Part 3's two redeclarations restate their grants as they stand (the move's only its owner's; the sweep's the
  service role's).

## The cells

The class cell (ruling 1 §3), `scripts/doors/manifest.txt`:

| Line | Before | After |
|---|---|---|
| `transition_listing(uuid,text)` | `staff \| authenticated \| listings:review \| row \| revise \| - \| global \| guarded \| - \| census F1-1: …` | `owner \| authenticated \| - \| - \| revise \| - \| - \| guarded \| - \| the status door (F1-5a, ruling 1 §3): door_context's owner form (signed in, active, revise); the core transition_listing_core keeps the owner, listings:review (step-up) and listings:enforce (step-up) paths and their codes` |

`cell-meaning` for it: the body is an owner-or-staff door. Its owner path (pause, close, reopen, delete) needs only the
row's seller. Its staff paths need `listings:review` with step-up, or `listings:enforce` with step-up on a severe
restore, byte for byte inside the core. Who may call the door does not change.

The dial cells (ruling 1 §8). No line's dial changes; four bodies now spend the dial their line already named:

| Door | Line's dial | Before | Now | `cell-meaning` |
|---|---|---|---|---|
| `move_listing_photo` | `revise` 120/h | spent none | one `revise` per call | a seller reorders a few photos per ad, tens an hour at most |
| `set_cover_photo` | `revise` 120/h | spent none | one `revise` per call | a cover chosen a few times per ad |
| `resume_listing` | `revise` 120/h | its one count came from inside `transition_listing` | one `revise` from the door's gate; the core spends none | one resume per paused ad |
| `clear_seller_place` | `draft` 600/h | spent none | one `draft` per call | the reusable place cleared once in a while; a wizard save |

The other effects the census named, now built: a door's own refusal after the gate counts its dial once (the shell,
INC-844; before, the raise rolled the count back). A paused ad's `set_listing_level` counts `promote` only; before, it
also counted `revise` inside the transition. `admin_move_listing` keeps its one `revise` through `rate_gate` (ruling 1
§4). The sweep spends none. The codes cells now hold each door's own `door_refuse` codes (19 lines). Only
`transition_listing`'s stays `-`: its body has no `door_refuse`, and the core's codes are named in its reason.

## New strings

None in this half. No SQL body carries a user-visible sentence: every refusal is a code. Every code a screen of this
family reads already has words. `actionErrorKey` (`src/features/my-listings/my-listing.ts:253–278`) maps each
sentence it reads to a key that exists, and STEP 3 maps the code to the same key: `nothingChanged` →
`myListings.editBox.nothing`; `inReview` → `myListings.ad.waiting`; `notYourListing` / `listingNotFound` →
`myListings.error.notYours`; `illegalTransition`, `notLive`, `ownerOnly`, `notPaused` → `myListings.error.changed`;
`severeRemove` → `myListings.error.severe`. The posting family's words (`DRAFT_REASONS`, `PHOTO_REASONS`) already hold
`notYourListing`, `photoGone`, `badValue` and `badShape`. A new code no screen reads (`notCopied`, `notADraft`,
`notEditable`, `draftNotEdited`, `renewFirst`, `listingNotEditable`, `reviewerOnly`, `enforcementOnly`,
`serviceOnly`, `ownerDeleted`, `severeRestore`) draws the screen's generic line, as its sentence does today. If STEP 3
finds a screen that must draw one of them, its English goes to the supervisor before any key is written.

## Decisions for the supervisor to rule on

1. THE SPLIT. Fourteen files by concern, never inside a body. Eight are above about 25 KB: part 2 (29,768 B), part 4
   (28,952), part 5 (27,219), part 6 (26,107), part 9 (26,352), part 10 (30,992), part 11 (28,071) and part 12
   (34,641). Most of each file is its proof: the scratch world, four gates per door, the codes, the snapshot, the
   tallies and the facts. Splitting a pair further would repeat the scratch world for each door. Part 12 is
   `edit_my_listing` alone, as THE LAWS require; its body is 11.7 KB and its proof covers its 12 codes.
2. `edit_my_listing` WRITTEN WHOLE. The live body (the census rebuilt it from 20261019115951 and its three computed
   fragments, md5 `77def52b…`) is written out whole by script and guarded by md5, as the brief's PREVENTION (7)
   (DEC-383, "at any size") and the census say. Rule 30's sentence "a body over about 10 KB is redeclared by computed
   insertion" says otherwise. The brief's law was followed, and the name left
   `scripts/conformance/migration-reader.test.ts`'s computed-declaration list in the migration's commit, as THE LAWS
   say.
3. THE SCHEMA AND OPTIONS READS NOW CHECK THEIR CALLER. `get_posting_schema` and `get_attribute_options` had no
   caller check (`rate_gate` let a NULL uid through). On `door_context`'s owner form, a call with no claims answers
   `notSignedIn` (401), and part 6 proves it. Their ACL never granted anon, and both callers are signed in
   (`posting-service.ts`, the options route with `auth: "user"`), so no real caller changes.
4. SUCCESS PATHS LEFT TO THE SPECS. `renew_listing`, `publish_listing`, `set_listing_level`, `set_listing_reach`,
   `edit_my_listing` and `submit_listing` are proven at their four gates, their codes and their no-trace snapshot, not
   on a success. Below the gate their bodies keep today's text apart from the folds, and their success is the e2e
   specs' (PW-*, ML-*, LDR-*, FSL-*). The ad-level free-slot, credits and season rules would need a market of real
   shape to drive a success inside a rolled-back block.
5. THE PROOFS' SCRATCH FILTERS. The real-row guard (INC-445) refused the first draft's statements that read
   `locations`, `profiles` and `user_directory` keyed only on scratch ids. Each such statement now carries the
   scratch namespace in its own text (`name_en LIKE 'e2e-mig-%'`, or `EXISTS (… auth.users … email LIKE
   'e2e-mig-%')`). The one reference value, the acceptance language, is `public.language_code('base')`, as F1-3's
   proof `20261114114300` has it, not an `ORDER BY … LIMIT 1` pick (INC-1040). No allowlist line was added.
6. `admin_move_listing` MEETS THE CORE'S CODES RAISED. It is not on the shell (F1-6). A transition refusal now reaches
   it as a raised P0D01 whose message is a code (`ownerDeleted`, …) instead of today's sentence. `moveErrorKey`
   (`src/features/admin-listings/move-reasons.ts:56–68`, outside SCOPE) reads both as `common.error`, so it holds.
   Its `rateLimited` from `rate_gate('revise')` is unchanged (ruling 1 §4). This replaces the census's line
   "`admin_move_listing` no longer counts the staff member's `revise`", which ruling 1 §4 overruled.
7. `listingNotFound` UNDER DEC-391. The new bodies answer `notYourListing` for another seller's row and for an id no
   row holds. `listingNotFound` stays in four places only: the caller's own deleted ad (`copy_my_listing`,
   `edit_my_listing`), a `submit_listing` save that lost the race to a delete (INC-324), and the core's service path
   (no caller) on an id no row holds. The doors that change from `listingNotFound` to `notYourListing` for a row not
   the caller's (the census's per-door readings): `mark_sold`, `set_listing_reserved`, `renew_listing`,
   `resume_listing`, `publish_listing`, `remove_listing_photo`, `set_listing_level`, `set_listing_reach`,
   `save_seller_place`, `set_listing_photos_soon`, and the core's owner path. `set_listing_pin`, `move_listing_photo`
   and `set_cover_photo` already gave the one answer.
8. THE MARKS were computed again at this commit, as told above. The outage overtook the first chat's values before
   any commit carried them, so no file was edited after a commit.

## Departures (named for ruling)

- Part 1, DEC-392 (ruling 2 (2)): two service-role grants outside this family, written as the ruling words them.
- A standing guard's demand (THE LAWS (6)): `scripts/conformance/listing-designation.ts`'s `ADMITTED_WRITERS` names
  `transition_listing_core` (the state machine now writes the status there), and its comment and
  `listing-designation.test.ts:21`'s say so. `scripts/conformance/migration-reader.test.ts` loses
  `edit_my_listing` from its computed list.
- Ruling 1 §6 / INC-1170: `save_posting_identity`'s `rateLimited` no longer carries `resets_at`.
  `src/routes/api/listings/identity.ts:202`'s comment is STEP 3's.

## The reds expected on this push (until STEPS 3 and 4)

CI's temporary backend applies every migration, so the specs below meet the new bodies with today's expectations.
Each is the census's `tests` table row, with its new expectation:

- `my-listings-doors.spec.ts`: ML-1 (`notLive`, `illegalTransition:closed-reduced`), ML-2 (`notYourListing` ×3,
  `illegalTransition:screening-closed`, `inReview`, `notLive`, `ownerOnly:closed-active` ×2), ML-3 (`notLive`), ML-6
  (`renewFirst`), ML-12 (`nothingChanged` ×2, `notEditable:category_id`, `notEditable:poster_expires_at`,
  `badShape:coverage`, `badShape:contact_pref`, `draftNotEdited`, `inReview`, `renewFirst`, `listingNotEditable:sold`,
  `listingNotFound` for the caller's own deleted ad, `notYourListing`), ML-13 (`notCopied:draft`, `notCopied:removed`,
  `notCopied:rejected`, `notYourListing`).
- `my-listings-ad.spec.ts`: MLA-8 (`ownerDeleted`).
- `posting-routes.spec.ts`: PR-21 (the body contains `notYourListing`).
- `my-listings-levels.spec.ts`: LDR-2 (`{ reason: "notYourListing", id: theirs }`, ruling 1 §2).
- Ruling 1 §1's four, outside the family's files: AL-8 (`enforcementOnly:removed-screening`), AL-29
  (`{ error: "notEditable:category_id" }`), AU-5 (`toContain("accountDeactivated")`), CG-1 (`set_cover_photo` →
  `"accountDeactivated"`; `unsave_listing` and `accept_legal` unchanged).
- The staging preflight: `STAGING BEHIND` until ethio-staging holds `20261116031300` (rule 30).

Also possible: a wizard or my-listings spec whose screen draws a refusal through a mapper that reads a sentence. For
example, `actionErrorKey` reads `account is deactivated`, which the gate now answers as `accountDeactivated`, so such a
screen draws the generic line until STEP 3. The census found no such assertion, but any red of that kind is STEP 3's.

The proofs' first run on a shared database is the staging apply.

## Apply order (one message of links, in this order)

```
apply 986fbe0b → expect mark 20261115220000
apply 7603ae36 → expect mark 20261116030000
apply 097f9087 → expect mark 20261116030100
apply 8ab7c960 → expect mark 20261116030200
apply c0d42dfb → expect mark 20261116030300
apply 61e4e66b → expect mark 20261116030400
apply 538bb297 → expect mark 20261116030500
apply 3e9620aa → expect mark 20261116030600
apply c57c863c → expect mark 20261116030700
apply cf5771ed → expect mark 20261116030800
apply 5cf2054f → expect mark 20261116030900
apply 67fc3a41 → expect mark 20261116031000
apply 236752a6 → expect mark 20261116031100
apply 5f6de283 → expect mark 20261116031200
apply 8c921ada → expect mark 20261116031300
```

## Records (unnumbered where new; word for word into the report's §14)

From ruling 1: DEC-391 — status line: BUILT in F1-5a — every owner door answers `notYourListing` for a row the caller
does not own, whether or not it exists [`mark_sold`, `set_listing_reserved`, `renew_listing`, `resume_listing`,
`publish_listing`, `remove_listing_photo`, `set_listing_level`, `set_listing_reach`, `save_seller_place`,
`set_listing_photos_soon`, the core's owner path]; proven [each part's "on another seller's ad" and "on an id no row holds"
checks, parts 2 and 4–15]. INC-1170 — status line: open; the identity route's `resets_at` dropped with the gate's
detail-less `rateLimited` (F1-5a, ruling 1 §6); owner F1-7. The three roadmap lines of ruling 1, word for word.

From ruling 2: INC-1171 and DEC-392 — status line: BUILT in F1-5a — the two lost service-role grants restored
[`20261115203000_986fbe0b-2896-4dc1-8c8f-3673b90130f4.sql`, mark `20261115220000`]; `grant-dropped` judges the result
and the file [DOORS-10's fixtures]; and the register row, word for word as ruling 2 gives them.

The task file's DEC-333, INC-942, INC-1158, register, changelog and roadmap lines are written at the final report
(STEP 7). INC-1158's bracket for this half: "`transition_listing`: class `staff` → `owner` (ruling 1 §3); dial cells
unchanged; four bodies gain the dial their line names (ruling 1 §8)".

Nothing was applied anywhere but the local proof stack. No staging or production connection was made.
