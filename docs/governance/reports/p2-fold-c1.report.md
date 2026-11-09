# P-2 (c) — The fold, build turn c1 — report
Base: af50ca802 (dev; c1 began at cursor/p2-fold 159178a98, ruling 1) · Final commit: 30181fd86 · Brief: docs/governance/briefs/p2-fold.md (rulings 1–6; ruling 1 saved as docs/governance/briefs/p2-fold-ruling-1.md)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 30181fd

## 1. Done / not done, by part and step

c1 is the SQL side of the fold, plus the one src reader of the photo cap, in three steps (ruling 1 §1, §15).

- **Step 1, M-3a (stop 1): done.** Two files. The reach caps on `listing_packages`; `listing_photo_cap`; `register_listing_photo` on it; the schema's `plan` block from the baseline level and the default market's included reach; `listings.tier` defaulting to `baseline_level_key()`. Applied on ethio-staging by the supervisor; types patch (ruling 3) committed as 8c4240280.
- **Step 2, M-3b (stop 2): done.** Six parts:
  - the resolver `listing_effective_reach` (taking the market of the call, ruling 4);
  - the trim on the included reach;
  - `promote_options`' `reach` / `reaches`;
  - the judge reading the ad's reach (`p_listing_id`);
  - its six callers passing the ad.

  Plus the INC-1082 proof-text edits of 20261106051700 and 20261106051900 (DEC-345, ruling 4). Applied on ethio-staging by the supervisor. Types patch c1b (ruling 5, sha256 `20f4506e…a872be` matched) committed as d056b1d6a; the .patch file is not in the tree.
- **Step 3: done.**
  - `src/routes/api/upload/photo.ts` reads `listing_photo_cap(p_listing)` (UPH-6–9). This is the plan's `src/server/media/photo.ts` path, corrected (FINDINGS).
  - PP-7, PP-25 and PW-29 read their cap from a scratch category's override for the baseline level (`e2e/helpers/level-overrides.ts`).
  - PW-82 reads the reach row the schema reads (ruling 6 §1).
  - SWP-3 asserts the resolver's answer after the sweep (ruling 6 §2).
  - LDR-7 is the `promote_options` reach door test.
  - THE CHECKS, budgets, the self-review, this report.
- **`posting-service.ts` / `schema-shape.ts`: not changed.** The `plan` block's shape is unchanged (`{plan, max_photos, max_cities, max_regions, max_countries}`, stop 1 §"`plan`, as built"). Its key `plan` now carries the included reach's key: a K2 line for c2.
- **Not in c1 (ruling 1 §15):**
  - M-3c-a/b (the retirements), the store and the fold, the strings, the edit reader's `caps` (ruling 1 §3): c2.
  - The housekeeping (INC-1037, INC-1040, INC-1083, #431, #432, the PR #11 site): c3.

## 2. Files changed  (verbatim `git diff --name-only af50ca802`)

```
docs/features/media-pipeline.md
docs/governance/briefs/p2-fold-ruling-1.md
docs/governance/briefs/p2-fold-strings.json
docs/governance/briefs/p2-fold.md
docs/governance/reports/p2-fold-c1.stop-1.md
docs/governance/reports/p2-fold-c1.stop-2.md
docs/governance/reports/p2-fold-c1.stop-3.md
docs/governance/reports/p2-fold.stop-1.md
e2e/helpers/level-overrides.ts
e2e/my-listings-levels.spec.ts
e2e/photo-pipeline.spec.ts
e2e/post-wizard-category.spec.ts
e2e/post-wizard-place.spec.ts
roadmap.md
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/non-null-allowlist.txt
src/integrations/supabase/types.ts
src/routes/api/upload/photo.test.ts
src/routes/api/upload/photo.ts
supabase/migrations/20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql
supabase/migrations/20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql
supabase/migrations/20261107111340_503c2e70-c216-4707-b862-0c1fa5210376.sql
supabase/migrations/20261107111341_76d13245-a10b-406d-adaa-568460f6c1a2.sql
supabase/migrations/20261107125356_a2a45734-ad08-4ad2-bc78-0337e079a07c.sql
supabase/migrations/20261107125357_cf82e13d-2735-4ecd-b6fd-23236994563c.sql
supabase/migrations/20261107125358_704f04ac-89c6-4b05-b247-5788ad7463e4.sql
supabase/migrations/20261107125359_ee072b49-3507-4f80-bab2-9328caa7212b.sql
supabase/migrations/20261107125400_19c38d6c-77ec-40e1-a8ea-e04838c46440.sql
supabase/migrations/20261107125401_0d1cd555-1031-44eb-8922-f6ba4413daf7.sql
```

(29 paths, plus this report.) The only new non-record, non-migration file is `e2e/helpers/level-overrides.ts`, tracked by `git ls-files e2e/helpers/level-overrides.ts` and accepted by ruling 6. Every other path is a migration or file the plan and rulings name, or is in the standing allowance. `src/integrations/supabase/types.ts` changed only by the two supervisor patches. No file was deleted.

## 3. Behaviour contract — answer tables before → after

**`POST /api/upload/photo`, step 4 (the cap)**, at af50ca802 → now:

| Case | Before | After |
| --- | --- | --- |
| photos ≥ cap | `tooManyPhotos`; cap = `min(MAX_PHOTOS_PER_LISTING dial, default 10, plan_photo_cap(seller_plan(uid)))` | `tooManyPhotos`; cap = `listing_photo_cap(listing)`, the ad's level's `max_photos` (D311: 4 / 8 / 12) |
| a level with no perks | n/a | `levelNotAvailable` (field `photos`), before the paid screen; the existing fallback text |
| the cap read fails | 500, `plan cap: …` logged | 500, `photo cap: …` logged; the client sees the one envelope |
| `replaces` (an edit) | not counted | not counted (unchanged) |

Everything else in the route is unchanged (steps 1–3 and 5 onward, the order, the answers).

**Doors (M-3a, M-3b)**: as stop 1 and stop 2 (with its addendum) state, part by part, each with its proofs. In short:
- `get_posting_schema`'s `plan` block: values from the baseline level (`max_photos`) and the default market's included reach (`max_cities` / `max_regions` / `max_countries`); same keys.
- `register_listing_photo`: refuses at `listing_photo_cap`.
- `validate_listing_draft(…, p_listing_id uuid DEFAULT NULL)`: judges places by the resolver's reach row (`unknownReach` for a key with no reach row). Its six callers pass the ad.
- `listing_places_trim`: trims to the market's included reach's caps.
- `promote_options`: answers `reach {key, until, source, included}` and `reaches […]` beside the unchanged `levels`.
- `listings.tier`: defaults to `baseline_level_key()`.

Refusal names are unchanged (`coverageExceedsPlan:<level>`). On today's seeds no seller's outcome changes: every market includes `city`, whose caps are the free plan's.

**Screens**: none changed.

## 4. Censuses

- **Plan census (§0b and the three concerns), at af50ca802:** `docs/governance/reports/p2-fold.stop-1.md` (a1–a3).
- **INC-1082, scratch identifiers drawn twice in one proof:** `rg -n "substr\(replace\(gen_random_uuid\(\)::text, '-', ''\), (1|9), [1-3]\)" supabase/migrations` gives seven hits.
  - Two pairs: 20261106051700 :129/:130 and 20261106051900 :212/:213. Both fixed.
  - Three singles: 051800 :125, part 2 :155, part 4 :181.

  Details in stop 2's addendum.
- **The step-6 caps' source:** `step-where.tsx:1350–1352, 1700–1706` reads `maxCities` / `maxRegions` / `maxCountries` from the schema's `plan` block. M-3a builds that block from `market_settings_for(NULL::character).included_reach` (20261107111340 :186).
- **Who calls `market_settings_for(NULL)`:** it returns the row with `country_code IS NULL` (20261104153957 :32–34, because `= NULL` matches nothing). PW-82 therefore reads that row directly; the generated type makes the argument a required string.
- **`coverage_plans` in e2e/ (ruling 6 §1):** `rg -n coverage_plans e2e` finds:
  - `e2e/admin-monetisation.spec.ts:290`, `:348`, `:531` (the caps-block console tests MON-1/2/15/16);
  - `e2e/helpers/pool-reset-map.ts:54`.

  PW-82 was its last *posting* reader. Correction to ruling 6's premise: the console's readers remain until c2 retires the caps block (Departures).
- **Reach rows counted or picked by position in specs (LDR-7's global rows):** `rg -n "reach" e2e/admin-monetisation.spec.ts | rg "toHaveCount|nth\(|first\(|length"` finds two `toHaveCount(0)` checks on field test ids (`:880–881`), and no row count.
  - The pickers sort by `sort`: `firstProduct` (`admin-monetisation.spec.ts:366`) takes the lowest; `above` (`legal-certify.spec.ts:370`) and `selfServeAbove` (`my-listings-levels.spec.ts:163`) take the first above a real row.
  - LDR-7's rows sort above every real row, so no picker reaches them.
- **Other `level_overrides` writers in e2e/:** `rg -n level_overrides e2e` finds only `admin-monetisation.spec.ts`'s reads and its removal of its own console-made products (:210, :328, :339, :1462). There is no other seeder.
- **`[ssr-error]` in the browser runs below:** 0 in each of the five logs.

## 5. Tests

**Unit**, `src/routes/api/upload/photo.test.ts`: 9/9. New tests:
- UPH-6: at the cap, `tooManyPhotos` before the screen; the call is `listing_photo_cap({p_listing})`.
- UPH-7: a cap of 12 with 10 photos passes the cap step.
- UPH-8: a null cap gives `levelNotAvailable`.
- UPH-9: a read error gives 500, with nothing screened or stored.

Planted control: `Math.min(10, cap)` turns UPH-7 red. Component tests (inside THE CHECKS): 2808 passed, 1 failed (NH-6).

**Laws** (`bunx vitest run scripts --maxWorkers=2`): 491 passed, 1 failed (NH-6, `scripts/ci/nightly-hour.test.ts:99`, this computer's known limit).

**Migration proofs:** each part's DO block, raising on failure, with a sentinel rollback. Planted controls (stops 1, 2 and the addendum):
- part 1 ignoring `p_country` → proof (c);
- no shift in 051700 → `languages_pkey (q31)`.

**E2E**: changed or new tests, with reasons:
- **PP-7** (re-titled "the photo past the ad's level cap is refused tooManyPhotos"; it was "the eleventh photo"). It counts to the cap of its scratch category's override for the baseline level, not 10. The cap is 3, or 2 when the baseline row says 3, so a reader that skips the override cannot pass.
- **PP-25**: the same cap. `full[9]!` and `last[9]!` become `.at(-1)` with a guard (two non-null assertions gone).
- **PW-29**: the caption's cap is the override's, seeded before `/post` (J7).
- **PW-82** (re-titled "step 6's caps are the default market's included reach's, as stored"). It reads the default market row's `included_reach`, then that `listing_packages` row's three caps, at test time, through the service client, and compares (ruling 6 §1). A NULL cap is checked as the screen draws it: no button, no count.
- **SWP-3**: one assertion added. After the sweep, `listing_effective_reach(ad)` answers the scratch market's own `included_reach`; the reach column was already asserted NULL.
- **LDR-7 (new)**: `promote_options` as the signed-in seller. The ad's `reach` is `{key: included, until: null, source: null, included}`. Its three scratch reach rows come in catalogue order:
  - the lower row: `lowerReach`, `below: true`;
  - the included row: `includedReach`, `current: true`;
  - the unpriced row: `notOffered`.

  Each row's full shape is compared: name, sort, days, amount and currency null. The ad's designation, revisions and audit rows are unchanged by the read. The rows are three self-serve scratch reach rows from one draw (INC-1082), keyed `e2e_lvl_r_<run>_<worker>_<project>_<draw>_{lo,in,up}` (J1). The test's scratch market names the middle row as its included reach. Removed in `afterEach` after the market, behind a prefix guard.

E2E runs, local, ethio-staging, each spec whole and alone, both projects, `--retries=0`, through `bun run e2e:local`:

| Spec | Result |
| --- | --- |
| `e2e/photo-pipeline.spec.ts` | 65 passed, 1 skipped, 2 failed: PP-8 on both projects (Limits) |
| `e2e/post-wizard-category.spec.ts` | 46 passed, 2 skipped |
| `e2e/post-wizard-place.spec.ts` | 38 passed |
| `e2e/my-listings-levels.spec.ts` | 28 passed (first run, and again on the final J1 keys) |

PP-7, PP-25, PW-29, PW-82, SWP-3 and LDR-7 each ran and passed on `mobile-360` and `desktop-1280`. CI on eceecefc1 ran the whole E2E suite green, PP-8 included (§11).

**J-audit** (e2e/** changed):
- J1: scratch keys namespaced.
- J3: no real row written; the overrides, reach rows and market are the tests' own, each removed by a throwing destroy in `afterEach`.
- J4: truth through the service client.
- J7: seed before navigate.
- G27: no real value used as an expectation; PW-82 reads the stored row and compares, per ruling 6.

**THE CHECKS** (whole, on 30181fd86):
- `bun run typecheck`: exit 0.
- `checks (fast): 17 PASS · 4 FAIL · 305s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, p…`
- `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 367s`

The four FAILs are this computer's:
- laws-first and component-tests: NH-6 only (491/492, 2808/2809);
- Workflow lint (actionlint) and Secrets scan (gitleaks): the pinned binaries are Linux ELF x86-64 (`file`) on an arm64 Mac ("actionlint self-test: the bad fixture failed for another reason"; gitleaks read "22 commits in af50ca802..HEAD", then exited).

The steps the actionlint FAIL skipped were run by hand on 30181fd86. Each passed:
- `bun run format:check`: "All matched files use Prettier code style!";
- `bun run lint`: 0 errors (46 warnings, none in a touched file);
- the e2e selector self-test;
- root routes, with its self-test;
- `bun run build`;
- `node scripts/check-bundle-size.mjs`: "Bundle budget OK."

The NOT RUN steps, by the runner's reasons:
- the installs: dependencies already installed;
- dependency-audit: the advisory service is unreachable here;
- e2e-preflight: needs the staging credentials;
- e2e merge and verdict: needs CI's artifacts;
- promote: CI only;
- the SARIF upload: GitHub only;
- the build job's steps after actionlint, and the changed-folders and changed-files Semgrep steps after laws-first: "an earlier step failed".

The whole-tree Semgrep (CI's pins) passed, counts only.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg -n "seller_plan|plan_caps|plan_photo_cap|admin_set_coverage_plan" src scripts`; `rg -n coverage_plans e2e src`; `rg -n "included_reach" supabase/migrations/20261104153959*`; and the stop-2 censuses.

- **`set_listing_reach`** (20261104153959:59–64) computes the ad's reach inline: `coalesce(v_row.reach, v_market.included_reach)` over its `location_id`'s country. This is a second resolver. M-3c-b (ruling 1 §4).
- **`listing_places_trim`** (part 1, `20261107125356_a2a45734-…` file line ~78) repeats the resolver's market subquery (the least country of the stored places). It cannot call the resolver: the trim runs before the bought reach is cleared (stop 2, decision 4).
- **`promote_options`** prices by the `location_id` country (unchanged), while its `reach` comes from the resolver (stop 2, decision 3).
- **The schema's `plan` key** carries the included reach's key (`city`) where it used to carry the plan name. Its consumers (`posting-service.ts` `PlanCaps.plan`, `schema-shape.ts`) are unchanged because the shape is. c2 (ruling 2).
- **`posting-service.ts:803–807`'s comment** says the caps come "through `seller_plan()`". Stale since M-3a. c2, with the fold of the wizard's caps.
- **Plan-seam readers left for M-3c-a:** `seller_plan`, `plan_caps`, `plan_photo_cap` and `admin_set_coverage_plan` remain in the database (guards `scripts/conformance/plan-seam.ts:27`, `plan-seam-allowlist.txt:4`). The judge no longer reads the seam (part 3), and the upload route no longer does (step 3).
- **Admin monetisation's caps block:**
  - `src/features/admin-monetisation/monetisation-service.ts:107` reads `coverage_plans`;
  - `e2e/admin-monetisation.spec.ts:290`, `:348`, `:531` read and remove `coverage_plans` rows;
  - `e2e/helpers/pool-reset-map.ts:54` names it.

  They go when c2 retires the caps block (ruling 1 §15).
- **The edit reader's `caps`** (ruling 1 §3: the ad's own level and reach caps when editing a live ad) is not built in c1. INC-1080's defect stands until c2: a live ad's edit shows the default market's and the baseline's caps.
- **PW-82** (ruling 6 §1): "PW-82 proves consistency with the stored default row only; when the schema read takes a market (a market whose included reach differs from the default's), PW-82 moves onto a scratch market and a scratch reach row, and asserts a cap the test chose".
- **Step 6 reads a NULL cap as "plan not known"** (`step-where.tsx:134–137, 1350–1352, 1700`). Ruling 1 §5 makes NULL "no limit" on reach rows. A default market whose included reach is `nationwide` or `worldwide` would show no add button and no count. Today's default is `city` (1/1/1), so nothing differs yet. c2, with the wizard's caps.

## 7. Allowlists and guards

- `scripts/conformance/listing-levels-allowlist.txt` (CF-LEVEL-1): 12 → 13 lines. New:
  `reader:e2e/helpers/level-overrides.ts | the one e2e seeder of a scratch category's override for the baseline level (P-2 (c), D311): reads the baseline row's max_photos only to pick a different scratch cap, writes and removes its own level_overrides row (PP-7, PP-25, PW-29; G27, J3) | DEC-351`.
  The guard fails a stale line, and it passes, so the line is used. c2 empties this allowlist (ruling 1), so this line goes with the others.
- `scripts/conformance/non-null-allowlist.txt` (CF-NN-1): `e2e/photo-pipeline.spec.ts (84)` → `(82)`. PP-25's `full[9]!` and `last[9]!` are gone. The guard named the stale count, and it passes after the change.
- Guard lines on the final tree (stop 2's addendum, the migrations unchanged since):
  - `bash scripts/check-migrations.sh` OK;
  - `bun scripts/doors/check-doors.ts`: "self-test OK … static OK: 266 manifest lines";
  - THE CHECKS' migration-lint, import-gate, listing-write-seam, browse-path-guard, marketplace-weight and the door guard: PASS.

## 8. Strings

None. The upload route's `levelNotAvailable` for photos uses the existing translated fallback (`post.photo.refusal.unknown`, `refusal-text.ts`). No key was added or changed, so the i18n maps are unchanged (i18n-usage-map "Assert no drift" PASS).

## 9. Migrations

| File | Bytes | sha256 | Mark |
| --- | --- | --- | --- |
| `20261107111340_503c2e70-c216-4707-b862-0c1fa5210376.sql` (M-3a part 1) | 20 526 | `d83e90b46c5486598c8307d7d4e13cf8b9f4538636307b04a3155cbfc0f7825c` | 20261107120000 |
| `20261107111341_76d13245-a10b-406d-adaa-568460f6c1a2.sql` (M-3a part 2) | 18 638 | `a8dc7f3e8d65a474f229d11ff3ff9f64716a6d225249b39ccb2e38c5f39b73e3` | 20261107120100 |
| `20261107125356_a2a45734-ad08-4ad2-bc78-0337e079a07c.sql` (M-3b part 1) | 22 239 | `8555ceb0ef08cab28f587598eab778b9a3c3550da78beb1527f96b19eecdaf9f` | 20261107140000 |
| `20261107125357_cf82e13d-2735-4ecd-b6fd-23236994563c.sql` (M-3b part 2) | 22 959 | `f3a16b7c50ef7b144163bc511fadd5310483c2ba8a3668bae538f1a1e6540fc0` | 20261107140100 |
| `20261107125358_704f04ac-89c6-4b05-b247-5788ad7463e4.sql` (M-3b part 3) | 18 948 | `8f7202cc6674bb8655c90cb9ab64968340e8c79613fe969f3dc84f5943e2546e` | 20261107140200 |
| `20261107125359_ee072b49-3507-4f80-bab2-9328caa7212b.sql` (M-3b part 4) | 21 748 | `ad8bd34495b165053af90bee990d35ac35871d570c098f0844337863715882c3` | 20261107140300 |
| `20261107125400_19c38d6c-77ec-40e1-a8ea-e04838c46440.sql` (M-3b part 5) | 19 122 | `1a61564f8a381f4e8e1bb54ee76a1ff879c82910e9670b4078168f51766075f2` | 20261107140400 |
| `20261107125401_0d1cd555-1031-44eb-8922-f6ba4413daf7.sql` (M-3b part 6) | 18 763 | `98064820ca8dfd9bd2d4497cf4d09a8b9517e8f4c82adbf9ca4e6010fb93fc26` | 20261107140500 |
| `20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql` (DEC-345 proof-text edit) | 16 681 | `fbe9a9f3c2d0a3ff3fe6d9ca14b51b592fb783630fed88c31e75477b4c697a0b` | landed earlier; not re-applied |
| `20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql` (DEC-345 proof-text edit) | 24 238 | `4f4d2ff08e9400723cc35483ef7b2eff70c9e3bded2bbd2fe37c8f4de0f7e0af` | landed earlier; not re-applied |

The pairing lines (all applied on ethio-staging by the supervisor, rulings 3 and 5):
```
apply 503c2e70 → expect mark 20261107120000
apply 76d13245 → expect mark 20261107120100
apply a2a45734 → expect mark 20261107140000
apply cf82e13d → expect mark 20261107140100
apply 704f04ac → expect mark 20261107140200
apply ee072b49 → expect mark 20261107140300
apply 19c38d6c → expect mark 20261107140400
apply 0d1cd555 → expect mark 20261107140500
```

`bun run db:proof --fresh` on the final tree, last line: `db:proof PASS — applied 424/424, CLI 2.120.0, cold, 51 s`

### Records (plain labels; the numbers are the supervisor's)

- **P2c-a — DEC-351**: the fold's decisions §1 and §3–§11 as written in ruling 1 (`docs/governance/briefs/p2-fold-ruling-1.md`), in one entry; G17, none reserved; D311 and DEC-117 stand.
  - **§4 continued (ruling 4):** "the resolver judges by the market of the call, else of the stored places, else the default row". `listing_effective_reach(p_listing uuid, p_country character DEFAULT NULL)`; the judge passes `v_market`, the least country of the sent places.
- **P2c-b — INC-1079** (plan E-9): `feed-page.ts:113` drops a card silently when its level key is not one of the three words. Fixed by the fold (c2).
- **P2c-c — INC-1080** (plan E-2): a live ad's edit shows the baseline's caps, not the ad's. Fixed by the edit reader's `caps` (ruling 1 §3, c2).
- **P2c-d — INC-1081** (plan E-5): the seed `allow_everywhere` meant nothing. No column (ruling 1 §6); "everywhere as a place kind" is a roadmap line for the operator.
- **P2c-e — INC-1082**: two scratch languages drawn independently inside one proof (20261106051700 :129–130, 20261106051900 :212–213) collided one time in 256 and stopped Lane 11's start on ffcadd393. Fixed by DEC-345 proof-text edits, schema text byte-identical (4027c48bd). The class rule as ruled: "scratch identifiers inside one proof come from ONE draw and are made distinct by construction (a suffix or a shift), never from independent draws". LDR-7's three reach keys follow it (one draw, suffixes).
- **P2c-f — INC-1083**: `scripts/conformance/seller-names.test.ts` `latestBodies` (:24–33) takes a computed insertion's `format('CREATE … FUNCTION <name>(%s) … $tag$%s$tag$')` template for the function's latest body. It does so for `edit_my_listing` since 20261105080108 and for the eight import doors of 20261029022748 / 024207 / 024340 / 024420 / 024515 / 024619, so a later computed insertion of a name reader would hide from SPA-10a. Housekeeping, c3.
- **P2c-g — the `unknownReach` phantom-success fix**: the judge's old read of a missing `coverage_plans` row left the caps NULL and refused nothing (a success-shaped answer for a missing row). The judge now raises `unknownReach` when the reach key has no reach row (part 3).
- **P2c-h — S551 and S552**: the supervisor's records (S551, ruling 2; S552, ruling 4 question 1: the usage counter on a refused edit, where the proof stands). Nothing for the executor.
- **P2c-i — register rows** (`docs/governance/mechanisms.md`, the supervisor's, DEC-346):
  - `listing_effective_reach` (§4, with §4 continued): the one reach resolver;
  - `listing_photo_cap`: the ad's photo cap, its level's `max_photos` for its category and its place's country, service-only, read by `register_listing_photo` and `POST /api/upload/photo`;
  - the reach caps on `listing_packages` (§5): nullable `max_cities` / `max_regions` / `max_countries`, NULL = no limit, CHECK by kind. §6's growth axis: when the schema read takes a country, a market whose included reach differs from the default's.
- **P2c-j — changelog line (c1)**: "P-2 (c) c1 — the fold's SQL side: reach caps on listing_packages, listing_photo_cap (the upload route and register_listing_photo read it), the schema's plan block from the baseline level and the default market's included reach, listings.tier defaulting to the baseline, one reach resolver (listing_effective_reach, the market of the call), the trim on the included reach, promote_options' reach answer, the judge reading the ad's reach through its six callers (DEC-351; INC-1082)."
- **P2c-k — PW-82's K2 line** (ruling 6 §1): in §6.
- **P2c-l — PP-8's Limits line** (ruling 6 §3): in §12.
- **P2c-m — OLS-1**: in §12.

## 10. Departures

- **The path correction** (FINDINGS; ruling 2): the plan's `src/server/media/photo.ts:131–146` is `src/routes/api/upload/photo.ts:131–146`.
- **`MAX_PHOTOS_PER_LISTING` removed.** The route keeps no ceiling of its own, since D311 lets a level pass 10. Its row in `docs/features/media-pipeline.md` is replaced by one sentence. Accepted, ruling 6.
- **`levelNotAvailable` for a null cap** (route): the door's own answer, made before the paid screen, with no new string. Accepted, ruling 6.
- **A new helper, `e2e/helpers/level-overrides.ts`**, with its CF-LEVEL-1 line. Accepted, ruling 6.
- **Titles:** PP-7's ("the photo past the ad's level cap", ids kept) accepted, ruling 6. PW-82's was dictated in substance by ruling 6 §1.
- **PW-82 reads the default market row from the table**, `market_settings` with `country_code IS NULL`, not through `market_settings_for(NULL)`. The function returns that very row (20261104153957 :32–34), and the generated type requires a string argument.
- **LDR-7's file:** it lives in `e2e/my-listings-levels.spec.ts`, beside the level doors and SWP-3, where the doors are called as the signed-in seller (`door()`).
- **LDR-7's scratch keys carry J1's axes** (30181fd86, after the self-review's MINOR). The spec ran whole again after that.
- **Correction to ruling 6 §1's premise:** "coverage_plans loses its last e2e reader here" holds for the posting specs only. `e2e/admin-monetisation.spec.ts` still reads it at :290, :348, :531 until c2 retires the caps block (§4, §6).
- **The brief's record rule** (DEC-346): `docs/_changelog.md`, `docs/governance/mechanisms.md` and `docs/tracking/incidental-findings.md` were not edited; the records are in §9's Records.
- **The self-review's standing MINORs** (outside c1's changes, or for c2):
  1. PW-82's NULL branch is not exercised by today's default reach (1/1/1). It encodes the screen's "NULL = not known" against ruling 1 §5's "NULL = no limit" (§6).
  2. LDR-7's three self-serve scratch reach rows appear in every seller's `promote_options` answer on the shared staging while the test runs. No screen reads `reaches` yet, and no spec counts reach rows (§4). When c2 draws the reach rows in the Promote sheet, its specs anchor by key.
  3. `posting-service.ts:803–807`'s stale comment (§6).
  4. Part 2's header (`20261107125357_cf82e13d-…` :2) still says "part 2 of 5". It is a comment line; schema-identical under DEC-345's comparison.

  The fifth MINOR, LDR-7's keys without J1's axes, was fixed in 30181fd86.
- **FINDINGS:**
  - the path correction above;
  - part 2's header;
  - INC-1083's guard-reader gap (P2c-f);
  - the step-6 NULL reading (§6);
  - the `coverage_plans` premise (above);
  - NH-6, this computer's known limit, already ruled.
- **STOPs and rulings in c1:**
  - stop 1 (M-3a) → rulings 2 and 3;
  - stop 2 (M-3b; Lane 11's red as a STOP) → ruling 4 → the stop-2 addendum → ruling 5;
  - stop 3 (PW-82 could not be served a scratch reach row without editing the default market row, J3; SWP-3's assertion unnamed) → ruling 6.

## 11. CI

The base's CI (`ci-status.md`; two-step check: the commit is af50ca8, the base):
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `af50ca802c2b44974d3abe4d7f3fb68340bc4eaa` (short `af50ca8`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-07T09:53:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42360042346
```
No red of an earlier turn. `origin/dev` was af50ca802 at every read, the last before this report included.

This pull request's runs:
- **d59139c30, ff0786cc0, 8a457e756 (stop 1):** preflight STAGING BEHIND, and PP-7, PP-25 and PW-29 on Lanes 5 and 13. All (c), expected, ruling 3.
- **ffcadd393 (stop 2):** the same expected reds, plus **Lane 11**: the backend failed to start, `languages_pkey (qc9)` in 20261106051700's proof. That is (e), this repository's proof defect; nothing was re-run; a STOP. Fixed by 4027c48bd (INC-1082, ruling 4).
- **91fe2eae0, 9fc7921cd, ec7366053:** the expected reds only. Lane 11 green; every lane applied 424/424.
- **eceecefc1 (stop 3; run 42442532732):** SUCCESS. `gh pr checks 30`: 41 pass, 1 skipping (Promote to main, which runs only on `dev`). PP-7, PP-25, PW-29 and PP-8 were green on ethio-staging after M-3b's apply.

No re-run was asked at any point. The run on this report's push is read through `gh pr checks --watch`, and its result is the pull request's comment.

## 12. Limits

- **PP-8, local only** (ruling 6 §3). In my local run against the shared ethio-staging (`bun run e2e:local -- e2e/photo-pipeline.spec.ts`, both projects, 0 retries), PP-8 failed on both projects at `e2e/photo-pipeline.spec.ts:371`:
  - "PP-8: default/4294859b-256b-4bcd-90bc-2bcbffaed1b9/a030f80a-e2b4-4296-9313-ea674690e594/423824e7-0082-459e-8c84-116aa36e726e/cover.webp must be gone from storage — Expected: false, Received: true" (desktop-1280);
  - the same for `default/ad59e2de-8878-48bf-9f3a-6202419e4784/a8537aec-4fc9-4453-a28a-8a268f506488/85dfb90c-c408-42c3-8250-f6202f251da9/cover.webp` (mobile-360).

  The DELETE had answered ok, and the run logged no `object delete` failure. Its path is not changed by this branch: `src/routes/api/listings/photos.$id.ts`, `storage.ts`'s awaited remove, and `remove_listing_photo`. Hypothesis, not a cause: a read after delete answered through a cached path. It was green in CI on ec7366053 and on eceecefc1. It was not retried locally. CI's run on the final push judges it.
- **OLS-1** (`one-line-slots.spec.ts`, mobile-360, "the switcher lists the public languages"): one flake-ledger line on ffcadd393's run (shard 5), passed on retry. One line in seven days, below rule 40's threshold; no incident.
- **THE CHECKS on this Mac:**
  - NH-6 cannot pass here (laws-first, component-tests);
  - actionlint and gitleaks are pinned Linux x86-64 binaries and cannot execute on arm64. CI's build-and-check and secrets-scan jobs judge them; the skipped build steps were run by hand (§5).
  - Dependency audit and the staging preflight are CI's.
- **The browser runs** used `PLAYWRIGHT_BROWSERS_PATH` set to the user cache (`~/Library/Caches/ms-playwright`, the pinned chromium-1208). The shell's own value named a sandbox cache with no browser. Nothing was installed.
- **Budgets:** no page's first download changed. `node scripts/check-bundle-size.mjs` on a clean `bun run build` of 30181fd86 printed all 50 pages identical, size and ceiling, to the base build of af50ca802 made by THE CHECKS (`diff` empty). "Bundle budget OK."; the NEAR band: "0 NEAR, none grew". No client code changed in c1: the route is server code, and `types.ts` holds types only.
- **Not proven by a planted red:** LDR-7, SWP-3's new assertion and PW-82. Their assertions are exact equalities on values the test wrote or read; none was shown red on purpose.
