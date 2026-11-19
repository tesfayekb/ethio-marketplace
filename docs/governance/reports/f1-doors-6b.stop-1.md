MIGRATION — f1-doors-6b parts 1–7: the monetisation and services doors on the shell; the price resolvers closed to the browser
DONE: steps 0, 1, 2 (the brief saved 71ec71124; the census 6ad213a6b; the migration 3432acdce)
LEFT: steps 3 and 4 (the clients onto `readRefusal`, the e2e assertions, AL-8 / INC-1197, the feature docs, the report)
CI: the first six lines of dev's `ci-status.md` (ci-evidence, read 2026-11-19 03:17 UTC; `origin/dev` still `45db563`):
```
# CI Status (auto-generated — do not edit by hand)

- Commit: `45db563460c200e331f894d71aff0d8b971c0e25` (short `45db563`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-18T23:33:48Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44421006250
```
FILES:
```
docs/governance/briefs/f1-doors-6b.md
docs/governance/reports/f1-doors-6b.census.md
docs/governance/reports/f1-doors-6b.stop-1.md
roadmap.md
scripts/doors/check-doors-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261119030500_302ae04a-edb0-4e52-95fd-98f8f7184799.sql
supabase/migrations/20261119030600_5cdaa8d4-b7f3-44b4-983f-e621b954d059.sql
supabase/migrations/20261119030700_eacb4fad-dd6e-41ad-908a-6412ceca2a87.sql
supabase/migrations/20261119030800_cccdea6a-654a-4df4-8ec9-a595a9aff987.sql
supabase/migrations/20261119030900_3c8a0147-71d2-4acb-9337-8a1f7285ea91.sql
supabase/migrations/20261119031000_857229c6-49d4-404b-8d84-df0671d55333.sql
supabase/migrations/20261119031100_ec3bd191-d4ad-4aac-8a7d-233618b93a86.sql
```

## The apply pairing, in order

Each file's `$pre$` checks the previous file's mark, so they apply only in this order.

```
apply 302ae04a → expect mark 20261119050000
apply 5cdaa8d4 → expect mark 20261119050100
apply eacb4fad → expect mark 20261119050200
apply cccdea6a → expect mark 20261119050300
apply 3c8a0147 → expect mark 20261119050400
apply 857229c6 → expect mark 20261119050500
apply ec3bd191 → expect mark 20261119050600
```

The marks: the commit 3432acdce was made at 03:16 UTC on 2026-11-19. Its hour rounded up is 04:00, plus one
hour is 05:00, then +100 for each further part. Every mark is above the ledger's newest (20261118110000, which
part 1's pre-check requires) and above its file's stamp. File-name order equals mark order.

`bun run db:proof --fresh` on the committed tree:

```
db:proof PASS — applied 522/522, CLI 2.120.0, cold, 55 s
```

The proofs fail when they should. Before the final run, one expectation in the readers' file was planted wrong
(`badValue:dayz` for `admin_ai_spend_days(93)`). The run failed there with `F1-6b part 5 proof (b):
admin_ai_spend_days(93) as s answered badValue:days (P0D01), not badValue:dayz (P0D01)`, after parts 1–4 had
applied. The file was then restored from its copy (the readers were part 5 at that time; they are part 6 now).

pre-stop scan: 7 of 7, 302ae04a, 5cdaa8d4, eacb4fad, cccdea6a, 3c8a0147, 857229c6, ec3bd191

1. Order: each statement runs in an order the schema allows; db:proof applied all seven cold.
2. Scratch keys match their CHECKs: products `e2e_mig_lv_…`, `e2e_mig_rc_…`, `e2e_mig_nl_…` and `e2e_mig_nr_…`
   are letters after the prefix, matching `^[a-z][a-z0-9_]{1,31}$`; the feature `e2e-mig-<letters>` matches
   `^e2e-[a-z0-9-]{1,40}$`; the job pause uses the only job and reason the CHECKs admit.
3. Typed literals: every smallint is typed (`4::smallint`, `6::smallint`, `31::smallint`).
4. No expectation is a real row's value. The one real singleton row, the job's pause, is parked by a DELETE
   inside the rolled-back block, and the proof writes and judges its own. The readers' answers are judged by
   their shape, never by real rows. `rate_dials` is read only to place the capped caller's seed rows in the
   window the gate reads, and no verdict depends on its value. `door_refusals` is judged as a delta from the
   proof's own baseline.
5. Each proof draws its random stem once (`v_stem`) and derives every scratch text from it. Every id is a
   `gen_random_uuid()`.
6. Every file's `$pre$` reads the previous mark and the live md5 of each body it redeclares. Part 7 reads the
   resolvers' md5s; it does not redeclare them.
7. Carrier law: every md5 is taken on `replace(prosrc, chr(13), '')`, and no compared literal spans a line
   break (the spanning-literal guard is OK).

`bash scripts/check-migrations.sh` (exit 0), its guard lines:

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Spanning-literal guard OK (floor 20261109000000).
Random-text guard OK (floor 20261118160000).
Migration guard OK.
```

The other checks on the committed tree:

```
check-doors self-test OK: 10 finding kinds fired on their planted fixtures, the clean pair fired nothing
check-doors static OK: 258 manifest lines reconcile with the migrations' catalogue
bun run typecheck — exit 0
bun run lint (eslint . --max-warnings 0) — exit 0
bunx vitest run scripts --maxWorkers=2 — Test Files 124 passed (124); Tests 665 passed | 1 skipped (666)
```

## The files

Every redeclared body is written WHOLE from its live definition, by a script that applies only the named,
counted edits. The live definitions are the local stack's `pg_get_functiondef`; every md5 matches the
supervisor's staging read (census appendix A). Every header attribute is kept. Each body is followed in-file by
`REVOKE ALL … FROM PUBLIC, anon; GRANT EXECUTE … TO authenticated, service_role;`, then the proofs, then the
mark. There is no DROP and no new function.

Each door proof runs as follows:

- **(a)** For each body: SECURITY DEFINER, its volatility, `search_path=public`, returns jsonb, no PUBLIC
  entry in its ACL, not executable by anon, executable by authenticated and service_role, and its md5 equals
  this file's body.
- **(b)** A table of refusals, each compared with its exact message and status:
  - The five gates on every door, each before any validation:
    - no caller → `notSignedIn` 401;
    - no permission → `permissionDenied` 403;
    - a deactivated holder → `accountDeactivated` 403;
    - a holder without a second factor → P0009 `step-up required: no verified factor`;
    - a holder at its dial's ceiling → `rateLimited` 429.
  - The country scope: a holder for XZ only, refused `permissionDenied:scope` 403.
  - Each door's own codes, in the order the body checks them, as a global holder.
- **(c)** A refused call wrote no row and no audit line.
- **(d)** The successes, with their exact answers, rows and audit lines.
- **(e)** The tallies:
  - `staff_config` counted exactly once per call that passed the gate;
  - nothing counted for a caller the gate refused;
  - no other dial counted;
  - `door_refusals` grew by exactly the table's 4xx refusals for each door.

Every scratch caller has its own `rate_overrides` ceiling (1000; the capped holder 1), so no verdict rests on
the live dial. The capped holder's count is not asserted, because `door_refused` re-counts on `rateLimited`
(INC-1196, left to F1-7).

| part | file | sha256 | mark | objects | (b) rows: gates / scope / own |
|---|---|---|---|---|---|
| 1 | `20261119030500_302ae04a-edb0-4e52-95fd-98f8f7184799.sql` | `cbe933b5dc881b0db04e298bbedd7d01d88a19f109edc134c9ac0f4fcf853ff4` | 20261119050000 | `admin_save_package_price` | 5 / 2 / 8 |
| 2 | `20261119030600_5cdaa8d4-b7f3-44b4-983f-e621b954d059.sql` | `cc7ac7f1aa4fac3296f2ccb0e52ba9c56d8ab86d780f9daf4002a2a58605c676` | 20261119050100 | `admin_edit_package_price`, `admin_end_package_price` | 10 / 6 / 14 |
| 3 | `20261119030700_eacb4fad-dd6e-41ad-908a-6412ceca2a87.sql` | `70403957017c9c731ec66b24639f797d31a233e66d0707801a1168aea89117c5` | 20261119050200 | `admin_save_level_override`, `admin_clear_level_override` | 10 / 5 / 9 |
| 4 | `20261119030800_cccdea6a-654a-4df4-8ec9-a595a9aff987.sql` | `0151b86a105c96afcda71eab92d4ae74c9289120e606bd54e561d3803564ccaf` | 20261119050300 | `admin_save_listing_package`, `admin_save_market_settings` | 10 / 3 / 20 |
| 5 | `20261119030900_3c8a0147-71d2-4acb-9337-8a1f7285ea91.sql` | `b5380fc109f1cfafecf1b2a88015a3b4944db3b4d96ca2d74c5589184cd3ac56` | 20261119050400 | `admin_set_ai_feature`, `admin_job_resume` | 10 / 2 / 6 |
| 6 | `20261119031000_857229c6-49d4-404b-8d84-df0671d55333.sql` | `3cf8c06bc10e1cc1e392af23f3243fb5634d698e92f192d58952a0ec21e7015a` | 20261119050500 | `admin_list_monetisation`, `admin_ai_features`, `admin_ai_spend_days`, `admin_list_ai_calls`, `admin_job_health` | 15 / 5 / 7 |
| 7 | `20261119031100_ec3bd191-d4ad-4aac-8a7d-233618b93a86.sql` | `1c986dbeb3b18eac71db664e74f042c8469a1a5d22b7a4d22b5b70275fd96e24` | 20261119050600 | REVOKE EXECUTE on `package_price_for(uuid, text)` and `product_price_for(text, uuid, character)` FROM anon, authenticated, PUBLIC | — |

The successes (d), by part:

- **Part 1.** The XZ holder saves a category's price in XZ; the global holder saves one in XY.
- **Part 2.** The XZ holder edits a live XZ price (`{ok, id}`), then ends it.
- **Part 3.**
  - The XZ holder creates the main category's override in XZ (`created: true`).
  - The global holder rewrites XZ's override (`{ok, id, created: false}`; its days and photos are written).
  - The XZ holder clears XZ's override (`{ok, id}`; the row is gone).
- **Part 4.** The global holder creates a level and a reach with caps. The XZ holder saves XZ's settings with
  the launch bundle.
- **Part 5.**
  - The global holder switches the scratch feature off with a budget: the exact answer `{ok, feature, on:false,
    off_reason:'staff', monthly_budget_cents:500, unit_cost_microusd:3, alert_level:0}`.
  - It resumes a job that is not paused: `{ok:false, reason:'notPaused'}`, no write.
  - It resumes a paused job: `{ok:true}`, the pause is gone, one `job.resumed` audit line.

Each success spends one unit of `staff_config` for its caller, and the tallies in (e) count them.

Part 6 (the readers) has no shell. Each refusal is raised with SQLSTATE P0D01 and compared by its message:

- the gate on all five readers (no caller, no permission, deactivated, the XZ-only holder → `permissionDenied:scope`);
- then `badValue:days` (0 and 93);
- `badValue:limit`, `badValue:feature`, `badValue:outcome` and `badValue:cursor`;
- `admin_job_health('bogus')` → `badValue:job` with P0001, the core's plain raise, unchanged.

The global holder's answers are checked by shape:

- `admin_list_monetisation` keys `{markets, overrides, prices, products}`;
- `admin_ai_features` and `admin_ai_spend_days` are arrays;
- `admin_list_ai_calls` keys `{next, rows}`;
- `admin_job_health` keys `{dispatched_unclaimed, job, last, paused}`.

Then (e): no reader counted any dial, and `door_refusals` did not change.

Part 7's proof:

- **(a)** Both resolvers are executable by neither anon nor authenticated, have no PUBLIC ACL entry, are still
  executable by service_role, and have unchanged bodies.
- **(b)** A scratch market XZ in currency XTS has a self-serve scratch level priced 42.50 XTS, and a scratch
  seller has an ad there. Running `SET LOCAL ROLE authenticated` with the seller's claims:
  - `promote_options(ad)` (a definer) still answers the level with amount 42.50 and currency XTS;
  - the seller's direct calls of `product_price_for` and `package_price_for` are both refused with
    `insufficient_privilege`.

The readers' cost, measured by a temporary probe migration on the local stack (20 calls each, a scratch global
staff caller; the probe was moved out of the tree, never committed):

| reader | before | after |
|---|---|---|
| `admin_list_monetisation()` | 0.21 ms | 0.28 ms |
| `admin_job_health('name-check-catchup')` | 0.18 ms | 0.14 ms |

## The order of the files, and why no caller meets a returned refusal

The order follows THE LAWS: cores, then SQL callers, then doors and readers, then the resolvers' grants.

- **Cores:** none changes (census decision 8; `job_health_core`'s `badValue:job` is unchanged).
- **SQL callers:** none. The census probe found no function, policy, view or cron job that calls any door or
  reader of the family.
- **Doors and readers:** parts 1–6, one concern per file.
- **The resolvers' grants:** last (part 7), because nothing above depends on them.

No SQL caller exists, so no caller can meet a returned refusal envelope. The readers raise and take no shell.
The resolvers keep their bodies. Their SQL callers (`promote_options`, `set_listing_level`,
`set_listing_reach`) are SECURITY DEFINER and run them as their owner, so the revoke reaches none of them; part
7 proves it through `promote_options`. The browser clients read `error.message`, which carries `code[:detail]`
for both a raise and the shell's envelope. Their sentence mappers are what STEP 3 moves onto `readRefusal`.

## Every redeclared body: previous md5 → new md5

(md5 of `replace(prosrc, chr(13), '')`; each previous value is checked by its file's `$pre$`, and each new
value by its proof's (a).)

| function | previous | new |
|---|---|---|
| `admin_save_package_price` | `aff779cf3d659dae0aeddc57e8b782ca` | `9e3c1499fbf492e1fcfaab8bb2de7be5` |
| `admin_edit_package_price` | `17b4f48616e93109f6602d1ac81986e5` | `4f19e847b2bf84d1c74ea21eee289ae9` |
| `admin_end_package_price` | `4e2cfdd4d137f0f724ec1c1899e0a5ab` | `405da859e79cc550f35b936cfe09f0a5` |
| `admin_save_level_override` | `3e9f4bbf42a4962c7697d90d70ab79b1` | `a2fffdc32f917e8cf761570129821f9b` |
| `admin_clear_level_override` | `b36a2428334919371725ffe3d28df066` | `7c44eb7a9d43d05391fc3ecb762cdedb` |
| `admin_save_listing_package` | `61aa36df2245ba685201bb0dc33e28ca` | `21d53ab14f2622e084c722a6ac5525c6` |
| `admin_save_market_settings` | `099dd961a52251a050eb2aafa2521bcd` | `9d7a6d5a3def8e5ed80a8e1394ce153b` |
| `admin_set_ai_feature` | `91bdeb81c03d4a00d7d07362324f175e` | `58b3392f1baedd1473225f1fa9805480` |
| `admin_job_resume` | `53ae69f7bb64a21ce0b73a9972b2b1fe` | `8fe5e060904ceff71a67d3bd754254c3` |
| `admin_list_monetisation` | `6af21e1705a12f7dd9f23e5f7abc87fc` | `cf98d052dd78670623c02587a38efa46` |
| `admin_ai_features` | `fe97165ba126161e6ec01d124724ee9f` | `7461cc089d2978b6f0c4e26accd5f956` |
| `admin_ai_spend_days` | `a8b2161a8b86fecb9e62942cb07d842d` | `6b39878dde86a016a0379d78cb5f56c1` |
| `admin_list_ai_calls` | `1f18e0da99886c6d81f7c07171bd7007` | `dd2ed5cc4271ef93395cbe7818f50ba0` |
| `admin_job_health` | `0093fdc7f97b8e264b99055012d2cdd2` | `3f7e49670afef5f2ef9b93cceecf58aa` |

The new md5s were read back from the local stack after the apply (the probe's `## FN` lines); each equals the
file's. Unchanged and not redeclared: `package_price_for` `68a7d7e26e100bbb55eacbde14c3c04e`,
`product_price_for` `4b6f682fd38679c23091ad077e0bba43`, `admin_list_ai_calls_core`, `job_health_core`,
`job_pause_clear`.

## DROP + CREATE

None. No return type or argument list changes.

## The resolvers' grants, before and after (local stack, `has_function_privilege`)

| resolver | before (census probe) | after (this migration) |
|---|---|---|
| `package_price_for(uuid,text)` | anon t · authenticated t · service_role t · PUBLIC f | anon f · authenticated f · service_role t · PUBLIC f |
| `product_price_for(text,uuid,character)` | anon t · authenticated t · service_role t · PUBLIC f | anon f · authenticated f · service_role t · PUBLIC f |

## New or changed string keys

None. Census decision 11: every code maps to a key the line draws today.

## Changed manifest cells, with `cell-meaning`'s sentence

- **The codes cell, on all fourteen lines.** Each cell is the sorted set of `door_refuse('X'` codes in its
  new body, which the judge also computes:
  - `admin_save_package_price`: `badAmount, badCreditCost, badWindow, overlappingWindow, unknownCategory,
    unknownCountry, unknownCurrency, unknownPackage`.
  - `admin_edit_package_price`: `badAmount, badCreditCost, badWindow, overlappingWindow, permissionDenied,
    priceEnded, priceInUse, priceNotFound, unknownCategory, unknownCountry, unknownCurrency`.
  - `admin_end_package_price`: `badWindow, overlappingWindow, permissionDenied, priceEnded, priceNotFound`.
  - `admin_save_level_override`: `badDays, badPhotos, emptyOverride, notMainCategory, unknownCountry,
    unknownLevel, unknownPlacement`.
  - `admin_clear_level_override`: `overrideNotFound`.
  - `admin_save_listing_package`: `badCaps, badDays, badKey, badName, badPhotos, capsOnLevel, kindChange,
    perksOnReach, unknownKind, unknownPlacement`.
  - `admin_save_market_settings`: `badFreeAds, badLaunch, launchRequired, unknownCountry, unknownReach`.
  - `admin_set_ai_feature`: `badValue, overBudget, unknownFeature`.
  - `admin_job_resume`, `admin_ai_spend_days`, `admin_list_ai_calls`: `badValue`.
  - `admin_list_monetisation`, `admin_ai_features`, `admin_job_health`: `-`.
- **`admin_edit_package_price` · country `arg:country_code` → `row:package_prices.country_code`.** The door
  edits an existing row found by its id, and the argument is a NEW value for that row's country. So the gate
  judges the row's current country, read before `door_context` (6a's match form). The new value, and the
  locked row's own country should it have moved, are judged inside the body by the same scoped permission. A
  price is neither edited nor moved outside the caller's countries.
- **`admin_clear_level_override` · country `global` → `row:level_overrides.country_code`, its reason cell →
  `-`.** The door deletes one row that carries a country, and a row's country never changes. So the row read
  before the gate is the row deleted. An unknown id reads a NULL country, which a country-only grant never
  passes. The reason cell's old text ("no country argument or country-bearing target row … global is the
  stricter reading") no longer describes the line, so it is `-`, as on every other `row:` line.
- **`admin_job_resume` · dial `staff_config`** (the line already named it; the body now spends it through
  `door_context`, INC-1038): it resumes the name re-check after a pause, once or twice a day at most, so 600 an
  hour holds.
- **Unchanged and holding** (census `cell-meaning`):
  - every step-up cell (`row` for the doors, `-` for the readers);
  - the `arg:country_code` cells of the three save doors;
  - `admin_end_package_price`'s `row:` cell (the queued F1-3 item);
  - every `global` cell.
- **Lines removed:**
  - `package_price_for(uuid,text)` and `product_price_for(text,uuid,character)` leave the manifest, since
    neither is browser-callable any more;
  - `grant-without-caller package_price_for(uuid,text)` leaves `scripts/doors/check-doors-allowlist.txt`.

## Decisions for the supervisor (numbered; built as proposed unless ruled otherwise)

1. **Seven files, not the census's six.** The census's prices file came to 37 KB with its proofs, above rule
   30's "about 25 KB" and above every file F1-6a landed (the largest is 32 KB). It is split by concern:
   - part 1, the save door, which creates a row in its argument's market;
   - part 2, the edit and end doors, which act on an existing row's market.

   Every other file is as the census proposed. The largest file is now part 4, at 31.9 KB.
2. **The public-surface lines of the two resolvers stay, restated as RETIRED; they do not leave.**
   - Why the brief's step fails: the brief says "their public-surface lines leave". Removing them turns the
     migration guard red. Its Public-surface guard (`scripts/check-migrations.sh` through
     `scripts/public-surface.ts`) still reads the old grants in 20261102081600 and 20261103040806, and it treats
     only a later DROP, not a later REVOKE, as closing a grant.
   - Why the guard is not changed here: `scripts/public-surface.ts` is outside SCOPE.
   - The precedent: DEC-335/DEC-347. `edit_listing`, `relist_listing` and `set_listing_price` keep their lines
     as `RETIRED (…): browser EXECUTE revoked … the line stays because the migration guard still reads the
     grant … until F1-7 (DEC-347: the guards learn a retirement there)`.
   - What was built: the two lines are rewritten in that form, citing DEC-407 and F1-6b part 7.
   - The live lint: its stale-line rule (`scripts/security-lints.ts`) judges whether an object exists, not its
     grants, so the lines stay valid after the apply.
   - The record: DEC-407's text "Their … public-surface lines … leave" needs the supervisor's wording.
3. **The end door's post-lock check, and the edit door's check of the row's own moved country, are reached by
   no proof.** Both need a second session to move the row between the gate's read and the lock. The edit
   door's check of the NEW market is proven: the XZ holder moving an XZ price to XY, or to every market, is
   refused `permissionDenied:scope` in the body. Its dial is not spent (`permissionDenied` is a gate code
   `door_refused` does not re-count), and the row is unchanged. The end door's codes cell carries
   `permissionDenied` because its body can answer it. The census decision 3 named the check for both doors.
4. **`admin_job_resume` spends the dial on a `notPaused` answer.** The gate counts before the body reads the
   pause, and the returned `{ok:false, reason:'notPaused'}` is not a refusal, so the count stays (part 5 proves
   it). It is as census decision 7 built it; named so the ruling sees it.
5. **The census decisions 1–16 stand as built**, decision 1 as amended by decision 1 above. Decisions 12
   (STEP 3's AI `badValue` tails), 13 (finding: `public-surface-allowlist.txt:63`'s stale reason, not touched
   here) and 14 (DEC-407's record wording) still wait on their rulings.

## The reds expected on this push until STEPS 3 and 4

The pull request's CI builds its backends from every migration, so the browser lanes meet the new answers
before STEP 3's clients and STEP 4's assertions exist. By test id (census `tests`):

- **MON-2** (`e2e/admin-monetisation.spec.ts:555`): :590 and :629 expect `"permission denied"`, and :591
  expects `"denied"`. All three now answer `permissionDenied`.
- **MON-5** (`:767`): :815 expects `"perks on reach"`; the answer is now `perksOnReach`.
- **MON-10** (`:1119`, through the UI): :1147. The console draws `admin.packages.error.unknown` with the raw
  code until STEP 3 maps `priceInUse`.
- **MON-12** (`:1217`): :1250 expects `"launch bundle required"`; the answer is now `launchRequired`.
- **MON-13** (`:1308`): :1390–1391. The signed-in seller's `permissionDenied` does not match the case-sensitive
  `/denied/`.
- **SV-1** (`e2e/admin-services.spec.ts:117`): :125, :128 and :136 expect `"permission denied"`; the answer is
  now `permissionDenied`.
- **The monetisation and AI consoles' unit tests:** they mock their doors' sentences, so they stay green; their
  change is STEP 3's.
- **The preflight job:** it reports "STAGING BEHIND" until ethio-staging holds mark 20261119050600.

The proofs' first run on a shared database is the staging apply.
