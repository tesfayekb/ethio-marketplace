STOP — tests-ci STEP 1: the census (PLAN FIRST), with six questions
DONE: STEP 0 (brief saved, sha256 413837a4e40e1df1a972533bad69f2810b47a28687147d481a1dd16fabc8f3de equal; roadmap line 3; `tests-ci: task saved` cf5207eb2), STEP 1
LEFT: parts A, B, C, D, E, F, G, H (STEPS 2–12)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `48a10ca285589de39ada07db1fbb361b6a89b480` (short `48a10ca`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-16T05:53:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43812563717
FILES:
docs/governance/briefs/tests-ci.md
docs/governance/reports/tests-ci.stop-1.md
roadmap.md

The questions are at the end (Q1–Q6). Base 48a10ca28; `origin/dev` read again before this report: 48a10ca28 (no drift). `briefs-allowlist.txt` holds header comments only (nothing to remove). `bun scripts/brief/check-go.ts docs/governance/briefs/tests-ci.md` on the tree as saved: `[check-go] no finding`.

Every mailbox in this file is masked (local part given by its length, the provider as `<provider>`): pasting the operator's address here would add the occurrence Part D removes.

## consumers

Part A — the free-slot law's writers under `scripts/` (`rg -n 'from\("listings"\)\.insert' scripts`): `scripts/feed-bench.ts:479` — bypasses (one seller, every row under Ethiopia: `.eq("country_code","ET")` :409–:417, `insertPlace` :295 `country_code: "ET"`, `row()` :463–:473 `seller_id` :464, `home_country_code: "ET"` :472). No other insert under `scripts/` but test text and fixtures. Uses: `e2e/helpers/listing-seed.ts:151` `seedListingRows` (pre-reads free slots); `e2e/my-listings-levels.spec.ts:234–:241` (its own `market_settings` row — the header's :176 is `includedReach()` reading the default row; the insert is :234).

Part B — the nightly's sources: `.github/workflows/nightly-e2e.yml` `run` :141–:150 (uses), stash :156–:162, `runfull` :163–:168, evidence :181–:223 (`E2E_EXPECTED_SOURCES: nightly,full` :191, `E2E_GREEN` :192 reads `runfull`, copies :200–:203), upload :226 (reads `runfull`), heartbeat :255–:294 — bypass (the serial run). `scripts/e2e-failure-report.ts` `isQuarantined` :500–:509, `classifyFailures` :512–:518, failure-section label :1777–:1788, self-test fixture :2627–:2645 — the `@global-state` words (INC-1148). Readers of the quarantine label: the nightly yml (:213, :220, :222, :283) and the reporter itself; `flake-check.yml` :182 reads only `gating=`; the per-push lanes gate on the job's conclusion (`local-backend-proof.yml` :1084–:1103 writes `/tmp/local-verdict.txt`, which nothing reads after; `ci.yml` :699 writes the verdict class only). So the label has no reader once the nightly stops quarantining: it retires with its fixture.

Part C — no mechanism yet; the two merged `lovable/*` branches (INC-1168) are the only consumers.

Part D — `git grep -n -i -E '@(gmail|yahoo|outlook|hotmail|icloud|proton)\.' -- . ':!docs/governance/claude-supervisor-instructions-*.md'`, 9 hits, pasted whole and masked:

```
docs/features/settings-surface.md:127: local part 9 char(s)
docs/governance/briefs/bundle-16-turn-s2.md:179: local part 1 char(s)
docs/governance/briefs/tests-ci.md:46: local part 1 char(s); local part 0 char(s), after '/'
docs/governance/specs-archive/2026-10-02-contact-visibility-seller-name-and-store-address-design.md:197: local part 0 char(s), after '/'
docs/spec/spec-ledger.md:2204: local part 0 char(s), after '/'
scripts/deny-tests/p1f-identity-unlink.ts:41: local part 9 char(s)
supabase/migrations/20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql:469: local part 9 char(s)
supabase/migrations/20260809010130_05add65c-4963-4df2-95bd-b1cc855820c0.sql:471: local part 9 char(s)
supabase/migrations/20261015110000_ed5dcaf6-f56d-41f7-94d4-eb1a1bad15d0.sql:10023: local part 1 char(s)
```

The four 9-character hits are the operator's address (bypasses: the script :41, the docs :127; stays as landed: the migration :469, :471). The rule I propose, by shape: a local part of two or more characters, not preceded by `/`. It leaves out the one-letter test literals and the alias example (no allowlist lines for them) and keeps all four real hits; the supervisor's instruction files hold no hit of that shape. The script's other print site: :359 builds an SQL text with the address (`--recheck --phase 2`); :149 and :155 print it. Readers of `OPERATOR_EMAIL` in the script: :41, :149, :153, :155, :166, :221, :228, :247, :359 (only `main()` and `recheckPhase2`; modes :433–:451).

Part E — every GO under `docs/governance/briefs/` through `scripts/brief/go-laws.ts` (`treeFindings` law list :848–:857).

Part F — `endActiveImpersonation` (`e2e/helpers/ui.ts:867–:880`), one caller: `signInJobSuperAdmin` (:1060) at :1085. Acquire-path specs by id: ACR-E1 (`e2e/admin-ai-calls.spec.ts:7`), PGH-E1 (`e2e/page-head.spec.ts:39`, acquire :71), BR-3 (`e2e/breadcrumbs.spec.ts:204`).

Part G — readers of `[data-submenu-row]` boxes (`rg -n 'data-submenu-row' e2e src scripts`):
- measuring: SMN-E3 `e2e/submenu-touch.spec.ts:56`; SMN-E7 `e2e/submenu-look.spec.ts:78`; SMN-E10 `:181`, `:188`; SMN-E13 `:238`, `:241`; SMN-E4 `e2e/submenu.spec.ts:151`, `:169` (inside `everyRowOnScreen` :148, called only by SMN-E4); SMN-E11 `e2e/submenu.spec.ts:257`; ROWS-E2 `e2e/menu-rows.spec.ts:197`; BND-E3 `e2e/shell-bands.spec.ts:115` (counts rows, measures the panel's top through `layoutBoxes` :116).
- not measuring: ROWS-E3 `e2e/menu-rows.spec.ts:99` (a count); SMN-E2 `e2e/submenu.spec.ts:59`, `:277` (focus).
- the component: `src/components/ui/submenu-impl.tsx:63`, `:298`, `:391`.
Readers of the panel's `data-state`: none in `e2e/` (the two `[data-state='open']` hits are the dialog scrim's, `e2e/dialogs.spec.ts:125`, `:423`). No file under `e2e/helpers/` names the sub-menu panel today.

## definition

`docs/governance/lovable-knowledge.md` is at v3.13; v3.14 is not in the repository, so I read v3.13's ROLE paragraph (:5) and DEC-386 (`docs/spec/spec-ledger.md:5337`) and DEC-390 (:5345).
- Named by ROLE (v3.13), not by the brief's list: `src/features/auth`, `src/lib/supabase-door.ts`, `src/server/**`, `src/routes/api/**`, `docs/tracking/**` as a whole (the brief names "the shared ledgers"), `docs/spec/**`, and "any SQL" outside `supabase/`.
- Named by the brief, not by ROLE: `src/integrations/supabase/**`, `.lovable/**`.
- DEC-390's exceptions: a ceiling line of `scripts/route-budgets.mjs` carrying the supervisor's text, and the deletion's line in `docs/tracking/intentional-deletions.txt`. A path rule cannot tell a ceiling line from any other edit to `route-budgets.mjs` (Q4).

## tests

Each changed file's own tests: `scripts/feed-bench.test.ts` FB-1…FB-7 (FB-4 :57 and FB-6 :81 build `StatusInput` objects, so the status line's new fields touch their fixtures; FB-5 asserts `BATCH` 250; FB-6 asserts the gate's 40); `scripts/e2e-failure-report.test.ts` EFR-1, EFR-2; `scripts/ci/nightly-hour.test.ts` NH-1…NH-7 (unchanged); `scripts/conformance/briefs.test.ts` (CF-BRIEF test :104; exact law lists :384–:395 and :507–:520 gain CF-BRIEF-21); `src/components/ui/submenu-impl.test.tsx` SMN-1…SMN-7 (:101–:303); `scripts/conformance/e2e-helpers.test.ts` CF-HELPERS-1…9; `scripts/conformance/wired.test.ts`. E2E by id: Part F — ACR-E1, PGH-E1, BR-3 at both widths; Part G — SMN-E3, SMN-E4, SMN-E7, SMN-E10, SMN-E11, SMN-E13, ROWS-E2, BND-E3 (desktop-1280; each skips mobile-360 by its own `test.skip`). New ids, each unused in `src/`, `scripts/`, `e2e/`, `.github/` (`rg -lw`): FB-8, FB-9, EFR-3, EFR-4, CF-LVB-1, CF-MAIL-1, CF-BRIEF-21, SMN-8, CF-HELPERS-10.

## lists

- `scripts/conformance/wired.test.ts` :20–:45: every `scripts/**/*.sh` is in its domain and is satisfied by any workflow naming its basename, so the ci.yml step satisfies it with no edit; the mailbox test's caller is the unit suite.
- `.prettierignore`: `format:check` covers `src`, `e2e`, `docs` and the root files only, so the new `scripts/conformance/mailbox-allowlist.txt` needs no line.
- `docs/features/ci-guards.md`: gains the guard (Part C) and the mailbox scan (Part D).
- The e2e selector (`scripts/e2e-select.ts`) maps helpers by the import graph, with no group list; a new helper file joins by its importers. `helpers/ui.ts` is imported by 115 e2e files.
- Exact lists: `briefs.test.ts` :384–:395 and :507–:520 (CF-BRIEF-21 joins both); `go-laws.ts` :848–:857. No exact-list assertion names the nightly's sources or the reporter's labels (rg over `scripts/` and `e2e/`).

## old-file-readers

`rg -n '"full"|e2e-results-full|e2e-log-full|runfull' .github scripts docs`: the nightly yml only (:156–:203, :191, :192, :226). No script fixture or doc names the `full` source.

## second-readers

No `vi.mock` factory or dynamic import of `scripts/e2e-failure-report.ts`, and none of a sub-menu helper (none exists yet), by grep.

## chunk-graph

CENSUS-ITEM chunk-graph: not applicable — Part G adds an attribute, no import. The panel lives in `dist/client/assets/overlays-impl-CVfeNic2.js` (32,016 bytes gzipped), reached from `shared-shell` only by `import()`.

## environments

The guard step runs on `pull_request` events only (`github.head_ref` is empty on a push). The mailbox scan runs in the unit suite everywhere. The bench reads staging only in CI. The `scope` job's checkout (`ci.yml` :51–:83) is `actions/checkout@v5` with no `fetch-depth` (shallow), so the guard's step needs `fetch-depth: 0` (or a fetch of the base) to diff `base...head`.

## mechanisms (re-read at 48a10ca28)

- The free-slot guard (`20261105080111…sql` :55–:87) and `seller_regular_live` (:34–:48); `market_settings_for` (`20261104153957…sql` :23–:44); no later migration redeclares either, nor `baseline_level_key`.
- `market_settings` (`20261103040807…sql` :26–:42): `country_code` references `countries(code)` with no ON DELETE; `included_reach` NOT NULL references `listing_packages(key)`; `paid_levels` true requires the launch fields.
- Listing triggers: `acceptance_guard` (`legal_acceptance_guard`, unchanged since `20261021035320…`, so the 2026-11-01 green seed proves a fresh service-role seller passes it), `listings_free_slot_guard`, `feed_index_on_listing_insert`, `listings_search_tsv_refresh`, and update-only ones. `listings.seller_id` cascades on the user's deletion; `listings.location_id` has no ON DELETE.
- The scratch-country helpers: `e2e/helpers/countries.ts` imports `@playwright/test` and `../fixtures`, so a script may not import it; `e2e/helpers/country-slot.ts` (40 codes, eight slots of five) and `e2e/helpers/scratch.ts` (`SCRATCH_PREFIXES`) are pure, and `scripts/` already imports pure e2e helpers (`feed-bench.ts:17` `chunk-by-length`; `scripts/en-baseline-heal.ts` imports `scratch.ts`). Inserting a `countries` row creates its anchor place itself (trigger `countries_anchor_on_insert`, born inactive); `seedSingleOptionMarket` (`e2e/helpers/locations.ts:655–:720`) opens the anchor (:700–:708).
- The nightly hour gate (`scripts/ci/nightly-hour.sh`, DEC-277); `isPlatformOriginCommit` (`e2e-failure-report.ts:1469–:1479`); `docs-only.ts` (reads `git ls-tree`); `listing-seed-allowlist.txt`'s grammar `<file>:<line> | reason | until`; the CF-BRIEF-20 law; the e2e-helpers census (CF-HELPERS-1…9 — no rule refuses a raw `[data-submenu-row]` box read; CF-HELPERS-10 would be new).

## first-download

My lock-exact build of 48a10ca28 (`bun install --frozen-lockfile`: no changes; `bun run build && node scripts/check-bundle-size.mjs`: "Bundle budget OK"): entry JS 203.7 / 205 KiB, CSS 22.6 / 40 KiB. Pages inside the 0.3 KiB NEAR band: none; the closest are `/admin/users_/$userId` 289.6 / 290 (0.4 KiB of room), `/admin/listings` 349.5 / 350 and `/admin/roles_/$roleId` 273.5 / 274 (0.5 KiB each). Part G touches only `overlays-impl` (on demand), so the "after" table is expected to equal this one; it is measured at STEP 10.

## premises

- (a) holds: the guard has no per-seller exemption. Its exits are a non-counted status or tier, a counted-to-counted update, and an unplaced row; it refuses `noFreeSlot` when the seller's others ≥ `free_regular_ads`.
- (b) holds: `feed_page` (`20261108070502…sql` :28–:213) has no country or market filter; its ladder needs the chosen place `is_active`, else `unknownPlace`. So the bench's scratch anchor must be opened (the trigger creates it closed).
- (c) holds: `local-backend-proof.yml` :791–:795 runs `--grep "@a11y|@global-state" --workers=1`.
- (d) Run 43736295761 (Actions API): hour job 6 s; Cloudflare smoke job 68 s; nightly job 17,986 s — staging gate 384 s, system libraries 13 s, build 12 s, sweep 7 s, `run` 43 s, `runfull` 17,507 s (success, continue-on-error), the rest ≤ 3 s each; the one gating failure was A-3. Over the 15 scheduled runs 2026-11-01 → 11-15: `run` 37–66 s, gate 1–3,079 s, system libraries 11–421 s, sweep 2–29 s, `runfull` 17,087–21,573 s.
- (e) holds: `seller_regular_live` counts the seller's rows in screening, held, active or reduced at the baseline tier whose place is in the country, excluding the row in hand.
- (f) answered: Supabase's page "Manage Monthly Active Users usage" (read 2026-11-16) counts "distinct users who sign in or refresh their token during the billing cycle". The bench makes and removes its sellers only through `auth.admin.createUser` (:399) and `deleteUser` (:195), and they never sign in, so they add no monthly active users.
- (g) not read: I have no read access to ethio-staging's rows (no read-only MCP in this environment). What the code shows: the pre-clean (:392–:395) and `--clean` (:325–:336) match the `e2e-bench-` prefix and remove neither sellers, countries nor market rows today; the nightly maintenance pass does not reap `e2e-bench-…@ethio-e2e.invalid` users (`listE2EUserIds`, `e2e/global-setup.ts:198–:222`, and `sweepStaleUsers`, `e2e/global-teardown.ts:27`, both require the `e2e+` prefix).
- (h) holds: nothing outside the script reads `OPERATOR_EMAIL` (rg; the brief's own lines aside).
- Wrong in the headers: Part A's ":176" for the spec's market row is :234; Part A's "a `locations` row of level country" is made by the `countries` insert itself (a second insert would duplicate it); Part A's crash lens (the maintenance pass removes a crashed bench's country and sellers) does not hold — Q1; Part G's cause — below.

## Part A — the seller count and the market's free number

Rows are numbered g = 1…100,000 with `levelMix(g)` (top when g % 100 = 0, next when g % 25 = 0, else baseline), plus 500 hot rows at the baseline (:503–:510). Seller = (g − 1) mod N. Computed by script (`/tmp/ethio-scratch/tests-ci/plan.ts`):

```
N=100 maxBaseline=1005 minBaseline=5   maxRows=1005 guardRowVisits=5.05e+7
N=128 maxBaseline=755  minBaseline=753 maxRows=786  guardRowVisits=3.94e+7
N=200 maxBaseline=503  minBaseline=2   maxRows=503  guardRowVisits=2.52e+7
N=250 maxBaseline=402  minBaseline=2   maxRows=402  guardRowVisits=2.02e+7
N=256 maxBaseline=378  minBaseline=376 maxRows=393  guardRowVisits=1.97e+7
N=500 maxBaseline=201  minBaseline=1   maxRows=201  guardRowVisits=1.01e+7
N=1   guardRowVisits=5.05e+9
```

(guardRowVisits: Σ r(r−1)/2 over each seller's rows, an upper bound on the rows the guard's count reads through `listings_seller_idx`; a divisor of 25 or 100 piles the paid rows on a few sellers, so 200 and 250 are uneven.)

Proposed: N = 256 sellers, so every seller holds 376–378 baseline rows; the market's `free_regular_ads` = the plan's largest baseline count + 1 = 379, computed by the plan function that FB-8 proves; `included_reach` copied from the default row, `paid_levels` false, launch fields null. The sellers are created in parallel batches of 16 (16 rounds).
ESTIMATE of the seed's wall time: 384.4 s measured for the same 100,500 rows on 2026-11-01 (before the law), plus the guard's ≈ 92,500 counts over at most 393 rows each (≈ 30–90 s), plus 256 user creations (≈ 10–20 s). That totals ≈ 7–8 minutes; the cleanup (150–434 s measured) adds ≈ 3–7 minutes, against the job's 90 − 40 = 50 minutes.
The code: from the user-assigned pool (`country-slot.ts`'s `userAssignedCodes`), the first code with no `countries` row at seed time; a unique conflict fails the seed loudly. The name: `SCRATCH_PREFIXES.countryName` + the code + the run id, built in the script from `scratch.ts` (`countries.ts`'s `scratchCountryName` reads Playwright's worker variables and imports Playwright, so it cannot be imported; the comment names it).
Also found: the cleanup at :556–:571 keeps a seed failure and drops a cleanup failure that follows it (`failure = failure ?? …`), so a failed cleanup after a failed seed is not reported. I propose both are reported; it is in scope (the bench).

## Part B — the nightly's ceiling

Proposed `timeout-minutes: 90`: the staging gate's own cap 60 minutes, plus the worst of the other steps measured over 15 runs (system libraries 421 s, `run` 66 s, sweep 29 s; every other step of run 43736295761 ≤ 13 s: ≈ 9 minutes), plus about 20 minutes of margin. The reason goes in the yml comment.
The STAGING-SINK label: the evidence's client-error lines sit in a per-source "Client errors" section; the reporter's `Failure` (:484–:498) carries no client lines. Only a flaky attempt carries them (`attemptClientErrors` :552, collected :601–:617), so a hard failure must gain its attempts' client lines for the label to read them. The heartbeat's conclusion line reads the verdict class (`E2E_VERDICT_CLASS_PATH`, :3446), so the nightly yml must pass it. The capture: ci-evidence holds only the rendered markdown lines (no nightly `results.json` is uploaded) — Q3.

## Part G — the cause of SMN-E3's 44.27 px read (the premise is corrected)

The rows were not read before placement. Placement runs in `useLayoutEffect` (:248–:289), which React flushes before the browser paints, so no read from a test can fall between the panel's first commit and `setPlace` (:288). An unplaced panel's rows would also read 36 px: `.menu-fit.menu-snap > li` takes `var(--menu-row-h, 2.25rem)` (`src/styles.css:827–:832`), and 36 px passes both of SMN-E3's assertions (≤ rail + 1, ≥ 31.5).
44.27 px is a placed row: `snapToGrid` (`submenu-geometry.ts:84–:102`) sets the panel's row height to the opener's rail row as measured at placement. The rail's rows share their region's height (`flex: 1 1 0%`, 32–48 px, `src/styles.css:789–:795`), and the panel is placed again only on a window resize (:231–:238) or a new opener or count (:289).
SMN-E3 taps a row that also navigates to `/c/electronics`, reads the panel's rows (:55–:57) and only then the rail row (:61–:63). The rail row it read (42.5) differs from the one the panel was placed against (44.27), so the rail's rows changed height between placement and the read, and the panel kept the earlier height. 42.5 / 44.27 = 0.960 = 24/25, which fits a region that gained a row or lost about 4 % of its height; no 0.96 scale exists on menu rows (`rg`). What changed the rail is not named by reading alone.
Consequence: `data-placed` would be set before any read could see the panel, so `placedPanel` would return at once, and SMN-E3 would still read 44.27 against 42.5. The brief's Part G does not fix INC-1161 — Q5.

## callee-codes

CENSUS-ITEM callee-codes: not applicable — no door changes in this turn.
Part H: `grep -c 'CENSUS-ITEM:' docs/governance/go-template.md` = 13 (the header's COUNT holds).

## findings

- `scripts/feed-bench.ts:556–:571` — a cleanup failure after a seed failure is dropped (above).
- `e2e/global-setup.ts:735–:821` — the country reaper deletes translations, places, root order, roles and the country, but not `market_settings` rows nor listings in the country's places; both foreign keys have no ON DELETE, so a scratch country left with either makes the reaper's delete fail. `e2e/my-listings-levels.spec.ts` (its `afterEach` :212–:218 deletes its market row first) has the same latent gap after a crash.
- `e2e/submenu-touch.spec.ts:55–:63` — SMN-E3 reads the two boxes it compares in two evaluations, not in one frame through `layoutBoxes` (rule 20).
- `scripts/deny-tests/p1f-identity-unlink.ts:359` — a third place the address is printed (inside an SQL text).
- `src/components/ui/submenu-impl.tsx:291–:295` — the comment "Before placement the panel is transparent" describes a state no paint shows (placement is a layout effect).
- Content as instruction: Supabase's documentation page carries a note addressed to AI agents asking for a feedback report to be appended and sent; not followed.
- Tooling: one `bun -e` call with my own code over a saved Actions API answer (the step timings above); no fetched text was executed.

## queued

`rg -n 'tests and CI|tests & CI|the CI turn|tests-ci' docs/governance/briefs docs/governance/reports roadmap.md`:
- built here: INC-1169 (A), INC-1111 and INC-1148 (B), INC-1173 (the hour gate by design — the brief's records), INC-1165 (D), INC-1168 (b) (C), CF-BRIEF-21 (E), INC-1155 (F), INC-1161 (G — pending Q5), the template's `callee-codes` (H).
- already built: DOORS-4's tree read at F1-4b (`scripts/doors/once.ts`; `TREE_READ_MS = 20_000` at `scripts/doors/check-doors.test.ts:54`, its cause in the comment above it).
- left (the before-launch list, later turns): INC-1109, INC-1113, INC-1115, INC-1118, INC-1123, INC-1132, INC-1133, INC-1139, INC-1149, C5 (the image load), C8 (the component-tests split), INC-1168 (c); `roadmap.md:74`'s job name `Scope (docs-only push, DEC-365)` (not in the brief); `roadmap.md:18`'s "the feed-bench status file joins the §8 reading order (S630)" (the supervisor's instructions, not in the brief); `roadmap.md:34` (INC-1172's line, withdrawn at R16).

## Questions

Q1 (Part A, the crash sweep). The maintenance pass would not remove a crashed bench's leftovers: its users are not in the `e2e+` namespace, and its country reaper cannot delete a country that still has a market row or listings. The reaper (`e2e/global-setup.ts`) is outside SCOPE. Proposed: sellers named `e2e+bench-<run>-s<i>@ethio-e2e.invalid` (the 24-hour sweep then removes them, and their listings by cascade), with the bench's pre-clean removing its own rows by that prefix and its country by name; and one of (a) `e2e/global-setup.ts` joins SCOPE so the reaper deletes a scratch country's `market_settings` row and listings first, or (b) the bench's country name stays outside the reaper's `E2E-Scratch-%` predicate (its own prefix, swept only by the bench's pre-clean). Which?

Q2 (Part A, the market's places). The bench opens the scratch anchor (born closed) and creates its regions and cities open, so `feed_page` can read them; the `countries` row stays closed (`is_active` false). Confirm.

Q3 (Part B, the capture). G20's capture for EFR-3 exists only as rendered markdown lines in `nightly-last-failure.md`. Proposed: a copy of the real `scripts/fixtures/e2e-results-sample.json` with the 2026-11-15 client-error line spliced into one failed test's attempt output, named as such in the fixture's note (DEC-030's precedent). Confirm, or name another capture.

Q4 (Part C, the list). ROLE (v3.13) and the brief's list differ as in "definition". Which list does the guard hold — the brief's, the brief's plus ROLE's extra paths, or v3.14's (not in the repository; paste it)? And for DEC-390's `route-budgets.mjs` exception: path-level (any edit passes) or content-level (every changed line is a ceiling line)?

Q5 (Part G, the cause). The flake is a stale placement, not an unplaced read, so `data-placed` + `placedPanel` would not fix it. Options: (a) the mechanism places the panel again when its menu region's rows change height, observing the region rather than the panel (D244 says rects are read "on these events only", so this needs a ruling); (b) before choosing, a diagnostic read of the rail row's height before the tap, at placement and after the navigation settles, run locally once by `--grep` on a scratch copy and not committed, to name what reflows the rail; (c) another reading. I recommend (b), then (a). SMN-E3's paired reads move to one frame (`layoutBoxes`) in any case.

Q6 (Part D, the script). `--recheck --phase 2` prints the address inside an SQL text (:359). Proposed: `OPERATOR_EMAIL` is required in every mode that reads it (`main()` and `recheckPhase2`), and :359 prints the placeholder `<OPERATOR_EMAIL>` with a note to substitute it. Confirm.
