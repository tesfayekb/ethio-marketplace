MIGRATION — p2-fold c1 step 1: M-3a — the reach caps on listing_packages, the ad's level photo cap, `plan` from the baseline level and the included reach, the tier column's default (two files, one stop)
DONE: c1 step 1 (M-3a): both files written, their proofs, the guards, db:proof PASS (and a planted-red control)
LEFT: after "continue" with the types patch — c1 step 2 (M-3b: listing_effective_reach, validate_listing_draft with p_listing_id and its six callers, set_listing_reach, listing_places_trim, promote_options' reach answer), then step 3 (photo.ts onto listing_photo_cap, PP-7, PW-29 / PW-82, SWP-3, the promote_options door test, THE CHECKS, budgets, the self-review, the report, the pull request's CI and the c1 comment)
CI: # CI Status (auto-generated — do not edit by hand)
    (blank)
    - Commit: `159178a9894a9ab8be4c80c6c5d5a697ecb49a61` (short `159178a`)
    - Conclusion: **SUCCESS**
    - Completed (UTC): 2026-11-07T11:18:04Z
    - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42365284174
    (159178a is this branch's stop-1 commit, the last completed run. The run on 0b1151438, ruling 1
    saved, was still running when read: 30 pass, 9 pending. origin/dev is still af50ca802 — no
    drift. The run on this push is read after the push and written below in its own commit.)
FILES: docs/governance/briefs/p2-fold-ruling-1.md
       docs/governance/briefs/p2-fold-strings.json
       docs/governance/briefs/p2-fold.md
       docs/governance/reports/p2-fold.stop-1.md
       roadmap.md
       supabase/migrations/20261107111340_503c2e70-c216-4707-b862-0c1fa5210376.sql
       supabase/migrations/20261107111341_76d13245-a10b-406d-adaa-568460f6c1a2.sql
       (and this file)

M-3a is two files, split by concern under rule 30's ~25 KB a file: written as one, it measured
35.5 KB. Apply them in order; part 2's pre-check refuses to run before part 1's mark.

## Part 1 — a new ad's caps and level

- Name: `supabase/migrations/20261107111340_503c2e70-c216-4707-b862-0c1fa5210376.sql` (20 526 bytes)
- sha256: `d83e90b46c5486598c8307d7d4e13cf8b9f4538636307b04a3155cbfc0f7825c`
- Mark: `20261107120000` (above the ledger's top `20261107001000`, later than the file's stamp)
- Pre-check: the mark `20261107001000` (P-2 (b) M-2a, promote_options) — the ledger.
- Creates:
  - `listing_packages.max_cities`, `max_regions`, `max_countries`: `integer NULL`, each
    `CHECK (x IS NULL OR x >= 1)`, commented. NULL on a reach row = no limit (ruling 1 §5).
  - `listing_packages_caps_by_kind_check`: a level row holds no cap.
  - Seeds: city 1 / 1 / 1, nationwide NULL / NULL / 1, worldwide NULL / NULL / NULL. A `$seed$`
    block raises first unless all three reach rows exist, so a missing row stops the apply instead
    of seeding nothing. No `allow_everywhere` (ruling 1 §6).
  - `ALTER TABLE public.listings ALTER COLUMN tier SET DEFAULT public.baseline_level_key()`
    (ruling 1 §9). Every writer of `listings` is a definer door or the service role, so the
    service-only function's grant covers the default.
- Redeclares: `public.get_posting_schema(uuid)` whole, from its last declaration
  (20261017091410). Header, argument and grants are unchanged; the `plan` line is the one changed
  fragment. Its grants (no PUBLIC or anon; authenticated; service_role) are restated after the body
  and again as the closers.
- The browser roles' column grant on `listing_packages` is not widened: the caps are read through
  doors (born closed).

### `plan`, as built

```
'plan': {
  plan:          <the included reach's key: market_settings_for(NULL).included_reach>,
  max_photos:    level_perks_for(baseline_level_key(), p_category_id, NULL)->'max_photos',
  max_cities:    <that reach row's max_cities  | null = no limit>,
  max_regions:   <that reach row's max_regions | null = no limit>,
  max_countries: <that reach row's max_countries | null = no limit>
}
```

The name and the four keys the app reads are kept (`src/features/posting/schema-shape.ts:90–104`
reads `max_photos`, `max_cities`, `max_regions`, `max_countries`; `PlanCaps.plan` is typed but has
no reader). Four notes, for the supervisor's reading:
1. `plan` now holds the reach key (`city` on the default market) where it held the plan's name
   (`free`). Nothing in `src/` or `e2e/` reads it (`rg` for `plan.plan` / `plan?.plan`: none).
2. `allow_everywhere` has left the block with the column it read (ruling 1 §6). Its only readers
   in `src/` and `e2e/` are the `coverage_plans` staff screen and its spec, which read the table,
   not this block; they stay until the plan seam retires (M-3c).
3. A NULL cap is a JSON `null`. The shaper already answers `null` for it (`int()`,
   `schema-shape.ts:17–20`), and the wizard passes each cap on as `planCaps?.<cap> ?? null`
   (`wizard.tsx:1537`, `1650–1652`, `1688`). Step 3 checks that the places and photos steps read
   `null` as "no limit".
4. A new ad's `plan` is the default market's (country NULL). An ad being edited reads its own caps
   from the edit reader (ruling 1 §3, M-3b).

### Proofs (one DO block, sentinel rollback `p2c-m3a1-proof-ok`)

Scratch rows only: currency XTS, market XZ, a seller, a leaf category, a scratch reach row and a
scratch level, all `e2e_mig_` keys or `e2e-mig-` text. The real default market row is parked on XZ
and the baseline flag moved, both inside the rolled-back block. The only real rows read are the
catalogue's levels and reach rows.
- (a) `get_posting_schema`'s header and grants.
- (b) md5: its body with the fragment put back is `94fc6a18126d8582fd7ef6260eed7b3e`, the body of
  20261017091410 (both sides without chr(13), INC-1056, law 13). The fragment occurs once.
- (c) the caps, both ways: the three seeds are as written; no level row holds a cap; a level row
  with `max_cities = 1` is refused; a reach row with `max_cities = 0` is refused; a reach row with
  caps and NULLs is taken.
- (d) `plan` for the scratch category is exactly `{plan: <scratch reach>, max_photos: 1,
  max_cities: 2, max_regions: null, max_countries: 3}`: the baseline level's category override
  (1) and a scratch default market whose included reach is the scratch row (2, no limit, 3).
- (e) the default: a draft inserted without a tier takes `baseline_level_key()`; with
  `is_baseline` moved to a scratch level, the next insert takes that level.

## Part 2 — an ad's photo cap

- Name: `supabase/migrations/20261107111341_76d13245-a10b-406d-adaa-568460f6c1a2.sql` (18 638 bytes; 18 698
  before ruling 2)
- sha256: `a8dc7f3e8d65a474f229d11ff3ff9f64716a6d225249b39ccb2e38c5f39b73e3` (before ruling 2:
  `92b9e9c729bf037904a2d24a9829a27de17de94ef424156588621ee49879524b`)
- Mark: `20261107120100` (above part 1's, later than the file's stamp)
- Pre-check: the mark `20261107120000` (part 1).
- Creates: `public.listing_photo_cap(p_listing uuid) RETURNS integer`: sql, STABLE, INVOKER,
  `SET search_path TO 'public'`. `REVOKE ALL … FROM PUBLIC, anon, authenticated`; `GRANT ALL … TO
  service_role` (service-only). It answers
  `(level_perks_for(l.tier, l.category_id, loc.country_code)->>'max_photos')::integer`, where `loc`
  is the ad's `location_id`'s location: the level door's country rule. An ad with no place reads
  the category and global rows (country NULL). An unknown ad, or one whose level is switched off or
  absent, answers NULL.
- Redeclares: `public.register_listing_photo(uuid, uuid, jsonb, integer, integer, integer, boolean,
  text[], jsonb, uuid[], text)` whole from its last declaration (20261019140533), with the same
  header (plpgsql, volatile, SECURITY DEFINER, `search_path=public`) and grants restated. The one
  fragment:
  ```
    -- D22, D311 (P-2 (c) M-3a) — the ad's level's photo cap is the authority; the route's cap is a mirror.
    -- A level with no perks (switched off, or no level row) is refused, never an unlimited cap.
    v_cap := public.listing_photo_cap(p_listing_id);
    IF v_cap IS NULL THEN
      RAISE EXCEPTION 'levelNotAvailable';
    END IF;
  ```
  in place of `v_cap := public.plan_photo_cap(public.seller_plan(v_seller));`. An ad already over
  its new cap keeps its photos and adds none (ruling 1 §2): the existing `tooManyPhotos:<cap>`
  check is unchanged.

### Proofs (one DO block, sentinel rollback `p2c-m3a2-proof-ok`)

- (a) both functions' headers and grants.
- (b) md5: `register_listing_photo`'s body with the fragment put back is
  `dc559d337ee82106dcd6d86fb1a206b7`, the body of 20261019140533. The fragment occurs once.
- (c) the cap, on a scratch level (3 photos) with an XZ override (2):
  - an ad at that level with no place: 3 (the level row);
  - one placed in an XZ city: 2 (the override);
  - an ad inserted without a tier: the baseline, which equals `level_perks_for` and the baseline
    row's `max_photos` (D311; the real row's number is not named, ruling 2);
  - an unknown ad: NULL;
  - the scratch level switched off: NULL.
- (d) the door, as the photo route calls it (no caller): three photos are taken under a cap of 3;
  the fourth is refused `tooManyPhotos:3`; the ad whose level is switched off is refused
  `levelNotAvailable`; neither refusal writes anything (the photo count, both ads' cover and
  `updated_at`, compared before and after).

## Guard lines

- `bash scripts/check-migrations.sh`:
  - "Born-closed guard OK (floor 20261007143529)."
  - "Definer guard OK."
  - "Self-marking guard OK (floor 20260817054246)."
  - "Public-surface guard OK (floor 20261003215043)."
  - "Real-row proof guard OK (floor 20261007000000)."
  - "Migration guard OK."
- `bun scripts/doors/check-doors.ts`:
  - "check-doors self-test OK: 7 finding kinds fired on their planted fixtures, the clean pair fired
    nothing"
  - "check-doors static OK: 266 manifest lines reconcile with the migrations' catalogue" (no
    manifest line changes: `listing_photo_cap` is service-only, and both redeclared doors keep
    their grants).
- The md5 reverts were also checked outside the database: a script on each file put the fragment
  back and hashed the body. Each fragment occurs once, and both answered MD5 OK.
- `bun run db:proof --fresh` (last line, final tree): `db:proof PASS — applied 418/418, CLI
  2.120.0, cold, 50 s` (after ruling 2; the run before it, 53 s, was on the earlier text).
- A positive control (not committed), before ruling 2: with part 2's literal expectation changed
  to 5, `db:proof --fresh` failed in that proof, which showed the block runs. Ruling 2 removed
  that clause.
- `bunx vitest run scripts --maxWorkers=2`: 491 passed, 1 failed — NH-6
  (`scripts/ci/nightly-hour.test.ts`), the known macOS limit (BSD `date` ignores `TZDIR`; p2-level-
  reach ruling 2 §6). It reads none of this turn's files; CI's Linux runners pass it.

## Decisions taken inside ruling 1, for the supervisor's reading

1. The photo cap's country is the ad's `location_id`'s country (the level door's rule, as
   `promote_options` and `set_listing_level` read it), never the home-country fallback. An unplaced
   ad reads the category and global rows.
2. A NULL cap is refused `levelNotAvailable`, a machine code the door already uses for a level
   with no perks, so no new string is needed. Without the refusal, a NULL cap in the comparison
   would let any number of photos through. The photo route passes it through `doorCall` as today.
3. `allow_everywhere` leaves the `plan` block (above).
4. Staff-created reach rows take NULL caps (no limit) until staff set them; the caps editor is not
   in c1.

## Expected reds on this push (until step 3)

Once these files run on CI's temporary backend, the photo cap and the `plan` block read the
baseline level (4 photos, D311) instead of `coverage_plans`' free plan (10). Each test below moves
in step 3, after the types patch:
- PP-7 (`e2e/photo-pipeline.spec.ts:290`, "the eleventh photo is refused tooManyPhotos") uploads
  ten photos.
- PP-25 (`e2e/photo-pipeline.spec.ts:1431`, "at the cap it is still taken") fills the plan's cap.
  The GO does not name PP-25; it is a census hit for step 3, and is asked about here.
- PW-29 (`e2e/post-wizard-category.spec.ts:1274`) reads `coverage_plans.max_photos` for `free` as
  its expectation. The GO moves it onto a scratch reach row in step 3, but its photo expectation is
  the baseline level's, not a reach row's.
- The route's pre-check (`src/routes/api/upload/photo.ts:131–146`, `planPhotoCap`, through
  `seller_plan` → `plan_photo_cap`) still mirrors the free plan's 10. The door's 4 is the authority
  and refuses first. Note that the plan named `src/server/media/photo.ts`; the reader is in
  `src/routes/api/upload/photo.ts`.
- The preflight job: "STAGING BEHIND" until ethio-staging holds `20261107120100`.

A suggestion: after M-3a's types patch, moving `photo.ts` and PP-7 / PP-25 / PW-29 before M-3b
would shorten the time these tests stay red.

## CI on the push (d59139c30, run 42368715222)

ci-evidence `ci-status.md`: commit `d59139c30d7684ad7485fbb09c71463fdafa7ab4`, **FAILURE**, completed
2026-11-07T12:00:36Z. Jobs: 32 success, 1 skipped, 4 failure. The four reds are exactly the ones
expected above. Their server record names `/api/upload/photo`, a route this turn has not changed;
their cause is this turn's part 2, as predicted, and the turn is already at this stop.
- E2E preflight (migration parity, staging): "STAGING BEHIND: apply
  20261107111341_76d13245-a10b-406d-adaa-568460f6c1a2.sql to ethio-staging before E2E can pass".
- Lane 5 and Lane 13 on temporary Supabase (the backend built from every migration, these two
  included); `e2e-last-failure.md`: Passed 2640, Skipped 402, Failed 6, all gating, 0 flaky:
  - PP-7, both projects: "upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}"
    (`e2e/photo-pipeline.spec.ts:298`);
  - PP-25, both projects: the same answer at upload 5 (`e2e/photo-pipeline.spec.ts:1486`);
  - PW-29, both projects: the caption read "0 of 4" where the test expects coverage_plans' free
    cap (`e2e/post-wizard-category.spec.ts:1295`).
  The server census's one line off the allowlist is the same: `tooManyPhotos:<n>` ×8 (shards 5
  and 13, `[ssr-error] /api/upload/photo tooManyPhotos:4`).
- E2E (Playwright, ethio-staging): the aggregate, "E2E failed — see docs/tracking/e2e-last-failure.md".

Every red shows the door answering D311's baseline cap of 4: the authority moved as built, and
the route and the three tests still expect the free plan's 10. They move in step 3. This section
is a commit of its own after the push, so its own push starts one more run, with the same reds
expected.

## Risk at the apply

Dissolved by ruling 2: part 2's proof no longer names the real baseline row's number (see the
addendum).

## Finding

- NH-6 (`scripts/ci/nightly-hour.test.ts:99`) cannot pass on macOS; pre-existing, outside scope,
  already ruled.

## Addendum — ruling 2 (part 2's proof (c), one clause out)

Part 2's proof (c) named a real row's value as an expectation (`OR public.listing_photo_cap(v_c)
IS DISTINCT FROM 4`), which G27 bans. That clause is removed. The two clauses above it remain: the
baseline ad's cap equals `level_perks_for(v_base, v_cat, NULL)` and the baseline row's
`max_photos`. The message now reads "a baseline ad's cap is not the baseline row's max_photos: %".
One comment in the proof's header, at line 131, also lost its "D311: 4" so that it describes what
the proof checks. Part 1 is unchanged.

The schema statements are byte-identical. The diff is empty, exit 0:

```
$ diff <(sed '/^DO \$proof\$/,/^\$proof\$;/d; /^--/d' /tmp/p2c1/part2.before.sql) \
       <(sed '/^DO \$proof\$/,/^\$proof\$;/d; /^--/d' supabase/migrations/20261107111341_76d13245-a10b-406d-adaa-568460f6c1a2.sql)
$ echo $?
0
```

(`/tmp/p2c1/part2.before.sql` is the file at ff0786cc0.) The whole-file diff is the comment line
(131) and the clause with its message (249–251 → 249–250). After the edit:
- the md5 revert still answers MD5 OK, and the fragment occurs once;
- `bash scripts/check-migrations.sh`: all six guard lines are OK, as above;
- `bun run db:proof --fresh`: `db:proof PASS — applied 418/418, CLI 2.120.0, cold, 50 s`.

The expected reds on the next run are unchanged: the preflight (STAGING BEHIND), and PP-7, PP-25
and PW-29 on both projects. Any other red is a STOP into the chat.

## The pairing lines (in order)

apply 503c2e70 → expect mark 20261107120000
apply 76d13245 → expect mark 20261107120100
