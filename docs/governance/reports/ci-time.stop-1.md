STOP — ci-time step 4: the census and the plan (PLAN FIRST for Parts B and C)
DONE: STEP 0, STEP 1 (this file), Part A, Part D
LEFT: Part B, Part C, the gate, the self-review, the push, the report
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `4dd6cad551e1909184ada5b6e3afe99279881f9a` (short `4dd6cad`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-13T20:11:30Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43498096790
FILES: 21 (`git diff --name-only 4dd6cad55`):
.cursor/rules/00-protocol.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
.github/workflows/ci.yml
AGENTS.md
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/governance/briefs/ci-time.md
docs/governance/go-template.md
docs/governance/reports/ci-time.stop-1.md
roadmap.md
scripts/brief/go-laws.ts
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/redact.test.ts
scripts/ci/redaction-rules.json
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/rules.test.ts
scripts/conformance/wired.test.ts

The supervisor's ruling 1 is wanted on: Part B's instance table and its guard (the manifest's form, how a
write is recognised), and Part C's table — by the four-clause rule no cut is admitted; three refused
cuts carry a measured saving and are offered as roadmap lines or a new decision.

Start: `cursor/ci-time` from origin/dev `4dd6cad55` (the merge of pull request #39). The brief's
`Base: dev 3e3a51a89` is #39's head before its merge; check-go runs `--at 4dd6cad55` (premises below).

## CENSUS-ITEM consumers

Concern 1 — the brief allowlist's readers (grep 1: `rg -l "briefs-allowlist"` over `scripts/`,
`.github/`, `src/`, `e2e/`) and the jobs that run them (grep 2: each reader against `ci.yml` and
`local-backend-proof.yml`):

| Reader | Runs in | Proven-tree run still runs it |
| --- | --- | --- |
| `scripts/conformance/briefs.test.ts` (`ALLOWLIST`, :20) | Component tests (`bun run test:unit` = `vitest run`; `vitest.config` includes `scripts/**/*.test.ts`) | yes (run 43498096790: Component tests 416 s, success) |
| `scripts/brief/check-go.ts` :39 | no CI job (the executor's STEP 0 and the gate) | not a CI reader |

No lane, no `First-paint bundle budget` step and no `scripts/check-bundle-size.mjs` /
`scripts/route-budgets.mjs` reads it. DEC-378 (b): yes.

Concern 2 — the instances, by the definition (below, "definition"), each with its table, the value it
moves and the proposal. A lane has its own throwaway backend, so the race exists only between the two
workers of one split lane (and a file's mobile-360 and desktop-1280 copies, which may run at once with
`fullyParallel: false`); the lane plan regroups files by weight, so every writer/reader pair across
split-lane files counts.

| # | Writer (test, file:line) | Table | Value moved | Split-lane readers that see it | Proposal |
| --- | --- | --- | --- | --- | --- |
| B1 | MON-16 (`e2e/admin-monetisation.spec.ts:1432`), MON-17 (:1484): `seedProduct(key, { sort: 0 })` | `listing_packages` (kind `level`) → `level_ranks` via `level_ranks_rebuild()` (AFTER STATEMENT, `supabase/migrations/20261104153313_…sql:66-109`) and the live ads' feed ranks via the reindex queue | every real level's rank +1 (regular 0 → 1, …) | ATR-1 `e2e/admin-listings.spec.ts:2249` (`feedRanks` `[2]`); `e2e/feed-index.spec.ts:184`, `:290`, `:495` (tier_rank); LG-33 `rankTruth` `e2e/legal-certify.spec.ts:277-286` | root fix: the scratch level is placed after every real level — `seedProduct` reads the highest level sort and writes sort + 1 (the reach rows' form, `e2e/helpers/reach-rows.ts:32-45`); MON-16/17 drop `{ sort: 0 }`. The rank is not under test: MON-16 accepts any unpriced pair the rows hold (:1454-1463), MON-17 has its "another product is still unpriced" branch (:1524); commit 20c0b610b gives no reason for sort 0. |
| B2 | every scratch level of admin-monetisation (`seedProduct`, MON-1…17; MON-4 via the console at sort 77) — after B1 still appended and removed | `level_ranks` (a row added at the end, then removed) | the table's row set (not a real level's rank) | LG-33 `rankTruth` reads the WHOLE table before and after its refusals (`legal-certify.spec.ts:1060`, `:1075`, `:1111`) | root fix (keyed): LG-33's rank snapshot is keyed to the real levels — scratch keys (`SCRATCH_PREFIXES`) excluded — which are what a refused door could move. Put to the ruling: the alternative is `@global-state` on LG-33. |
| B3 | IB-1 (`e2e/i18n-bundle.spec.ts:76`), IB-2 (:108): `ensureLanguage(code, true)` (:39-48) | `languages` (`enabled_public: true`) | the public language list (switcher, hreflang gate) | TR-28 `e2e/shell.spec.ts:2508` (the gate against the page's alternates); OLH-1 `e2e/sage-cards.spec.ts:290` (reads the switcher, then clicks every listed language — a language deleted between the read and the click fails it); OLS-6…10 `e2e/one-line-slots-admin.spec.ts:30`, `:63` (reads once, walks every language) | serial tag: no placement avoids it — an unpublished language serves no rows (IB-2's own assertion, :121), and a real public language's bundle moves with other tests' `ui_translations` rows (TR-40 writes en/am keys, `admin-translations-console.spec.ts:1155`), so the published scratch language is the condition under test. |
| B4 | LG-32 (`e2e/legal-doors.spec.ts:1370`): inserts `${stem}-lang` with `enabled_public: true` (:1376) | `languages` | the public language list | as B3 | serial tag: `accept_legal` refuses a language that is not public (`20261028230748_…sql:26-27`), and en/am are the only public languages, so the published scratch language is the condition under test. |
| B5 | NCQ-E2E-3 (`e2e/name-check-queue.spec.ts:206`): `adminClient().rpc("job_pause_set", …)` (:211), desktop-1280 only (J6) | `job_pauses` (one row per job) | the name re-check job's pause, for every caller | the job runner (cron); no other spec reads `job_pauses` (`rg job_pauses e2e`: this file only) | serial tag: the pause is the thing under test and cannot be keyed (one row per job). |

Not instances (each read at its site): `ai_features` (scratch `e2e-sv-` features; SV-5 filters
`feature !~ '^e2e-'`); `market_settings`, `package_prices` (scratch markets only); scratch reaches
(`reach-rows.ts`: three rows 100 above the top real reach; the "next reach above city" pickers
`my-listings-levels.spec.ts:153-171` and `legal-certify.spec.ts:327-341` always land on the real
`nationwide` (110), `20261103040807_…sql:20-22`); `my-listings-promote.spec.ts:464-467` (moves its own
scratch reach row, still above every real one); the "next level above" pickers (base `regular` at 0 →
the real level at 10; a scratch level after B1 sorts after 20); fence languages
(`ensureFenceLanguage`, `e2e/helpers/translations.ts:202-210`: `enabled_public: false`), TR-20m (moves
its own fence row's sort), TR-31 (a non-public scratch language), LGA-22 (`legal-admin.spec.ts:1135`,
fences); `rate_limits` (`e2e/helpers/ui.ts:1027-1029`: the pool user's own key); the category menu
(`isScratchSlug`, `CATALOGUE_MENU_ROW`, its guard); legal documents and versions (scratch kinds);
the sweeps (cron runs them on every backend anyway; ML-8 `my-listings-doors.spec.ts:596` is
`p_only`-scoped, ML-10 :698 refusals only); PR-23 `posting-routes.spec.ts:1074-1096` (own rows).
No test asserts a count or a position over the level or reach choices (`rg` over `promote-*-choose`,
`product-row` with `toHaveCount`/`nth`/`first`: none).

Concern 3 — readers of a job name or a step name: see second-readers.

## CENSUS-ITEM definition

The grep: service-client writes in `e2e/**` (`.from("<t>")` chained to `insert|update|upsert|delete`),
per file, 48 tables (`/tmp/ethio-scratch/ci-time/e2e-writes.json`). The definition against it:

- In the definition, not in the grep: (a) door writes through the service client — `job_pause_set`
 (B5); (b) trigger-driven moves — `level_ranks` is never written by a test, `level_ranks_rebuild`
 rewrites it on any `listing_packages` statement (B1, B2); (c) console writes driven through the
 browser — MON-4's level (sort 77, after every real level: not an instance), TR-25's `sw` language
 and TR-22's published DB-only language (both already `@global-state`), the legal console's scratch
 versions (scratch kinds).
- In the grep, not in the definition: 43 of the 48 tables are written only on rows the test created or
 owns (users, listings, scratch categories, scratch locations, scratch markets, the pool user's meters,
 its own roles); `languages` and `listing_packages` writes are instances only for the sites in the
 table above (fence languages and scratch reaches are not).

## CENSUS-ITEM tests

| Changed file | Its tests (real names) | Next id |
| --- | --- | --- |
| `scripts/ci/docs-only.ts` | `scripts/ci/docs-only.test.ts` CF-DOCS-1…10 | CF-DOCS-11 |
| `.cursor/rules/00-protocol.mdc`, `20-tests.mdc`, `60-report.mdc`, `80-review.mdc`, `AGENTS.md` | `scripts/conformance/rules.test.ts` CF-RULES-1 (extended); `agents-lines.test.ts` (AGENTS.md); `wired.test.ts` | CF-RULES-1 (same id, extended) |
| `docs/governance/go-template.md` | `scripts/conformance/briefs.test.ts` (reads the template's CENSUS-ITEM keys), `scripts/brief/check-go.ts` | — |
| `scripts/ci/redaction-rules.json` | `scripts/ci/redact.test.ts` CF-REDACT-1…3; readers `scripts/ci/redact.py`, `scripts/e2e-failure-report.ts`; `pattern-sites.test.ts`, `wired.test.ts` | CF-REDACT-1 (planted tokens) |
| `scripts/brief/go-laws.ts` | `scripts/conformance/briefs.test.ts`; `wired.test.ts:353` (`briefLaws` toContain) | CF-BRIEF-20 (premises: 19 is reserved) |
| `.github/workflows/ci.yml` (comments) | `ci-deadlines.test.ts`, `wired.test.ts`, `turn-checks.test.ts` (read its jobs) | — |
| Part B: the five specs; `scripts/ci/lane-plan.ts`; `local-backend-proof.yml`; `playwright.config.ts`; `scripts/conformance/shared-value-tables.txt` (new) | each spec's own ids; `scripts/conformance/lanes.test.ts` CF-LANES-1…3 (CF-LANES-3 :316 pins `LANE_WORKERS` 1 and 20 lanes); `wired.test.ts` (the new guard's caller) | CF-LANES-4 |

## CENSUS-ITEM lists

- `scripts/conformance/wired.test.ts`: :353 `briefLaws` must gain CF-BRIEF-20; :432 names the
 "Run proof lane" step; the new CF-LANES-4 census needs its caller line.
- Allowlists and manifests under `scripts/conformance/` and their readers: every one has a reader —
 `briefs-allowlist.txt` → `briefs.test.ts`, `check-go.ts`; `lanes-allowlist.txt` → `lanes.test.ts`
 (header only); `ai-gateway-allowlist.txt` → `src/server/ai/gateway.census.test.ts`;
 `error-text-allowlist.txt` → `src/lib/error-text.test.ts`; every other one → the same-named
 `*.test.ts` (or `check-*.ts`) in `scripts/` (listed by `rg -l <basename> scripts`). New:
 `shared-value-tables.txt` (manifest) and `shared-values-allowlist.txt`, both read by the CF-LANES-4
 census in `lanes.test.ts`.
- The lane plan's weights: `scripts/ci/lane-weights.json` (run 43431755160, one worker, 115 files,
 10,255 s); `lane-plan.ts` plans at one worker (`laneLine` :187 "s planned at one worker", the repeat
 budget :178).
- The register: the docs-only row, the pre-push gate's row, the lanes row, the redaction row, the GO
 checker's row, and a new row (concern 2) — §14 only (DEC-346).

## CENSUS-ITEM old-file-readers

- Worker count: `AGENTS.md:31` ("1 worker each"); `playwright.config.ts:45-48`;
 `local-backend-proof.yml:177-179`, `:242`, `:793`; `scripts/ci/lane-plan.ts:178`, `:187`;
 `scripts/conformance/lanes.test.ts:38`, `:316-328`; `docs/features/e2e-harness.md:587`, `:598-605`,
 `:647` (stale today: "CI runs two workers a lane since DEC-376"); `docs/features/ci-local-backend.md:668`.
 Historical sections (`ci-local-backend.md:612-664`, `ci-guards.md:696-702`) describe their own turns
 and stay.
- The order of the self-review and the push: `.cursor/rules/00-protocol.mdc:96-97` (step 2's commit),
 `:117-124` (step 7 "push at once … steps 8 and 9 … while it runs"), `:125-130`, `:131-141` (step 10
 "right after step 7"); `.cursor/rules/60-report.mdc:9`; `.cursor/rules/80-review.mdc:2` ("before the
 report"); `AGENTS.md:25` (silent on the order); `docs/governance/go-template.md:61` (STEP 0 commit),
 `:89-91`; `.cursor/rules/20-tests.mdc:31` and `docs/features/e2e-harness.md:653` (J8 "serial-only in
 the nightly").
- "docs-only" for a proven tree: `.github/workflows/ci.yml:394`, `:583`, `:704`, `:754` (the four
 comments). `ci.yml:47` already reads "the code tree is proven (… a docs-only push)" — one case of a
 proven tree, correct; `ci.yml:52` is the job name `Scope (docs-only push, DEC-365)`, read by
 `.github/workflows/ci-status-report.yml:53` (`startsWith('Scope (docs-only push')`) and
 `docs/features/ci-status-reporter.md:47` — a name, not one of the four comments: unchanged.

## CENSUS-ITEM second-readers

No cut is proposed for building (Part C below), so no name changes. The readers a renamed lane job or
step would move: `.github/workflows/ci.yml` (lane summary, promote), `ci-status-report.yml`,
`flake-check.yml`, `guard-proof.yml`, `nightly-e2e.yml`; `scripts/ci/turn-checks.ts` and its test;
`scripts/conformance/lanes.test.ts:69-72` ("Run proof lane"), `ci-deadlines.test.ts:315`,
`wired.test.ts:432`; the captured fixtures `scripts/fixtures/docs-only/jobs-*.json` (job names);
`local-backend-proof.yml:1144-1173` (reads the fragments' "- Seconds — …" labels);
`docs/features/ci-guards.md`, `ci-local-backend.md`, `ci-status-reporter.md`.

## CENSUS-ITEM chunk-graph

Not applicable — no cut moves the E2E app's build.

## CENSUS-ITEM environments

- Runner: `ubuntu-24.04` for every job of `ci.yml` (:53 …) and `local-backend-proof.yml` (:23, :135,
 :1041).
- Concurrent jobs: read from the jobs' created and started times (the vendor's page was not read).
 Peak jobs of the run running at once: 20 (run 43463527584), 20 (43457682073), 19 (43491896215),
 14 (43498096790, a proven tree). Every lane that waited started when 18–19 jobs of the run were
 running, and in 11 of 13 cases within 15 s of another job's end (Build, Semgrep, the repeat, smoke or
 email lane); jobs of other workflows (not read) fill the rest. The evidence fits a limit of 20
 concurrent jobs.
- WebKit: the `webkit` lane only (projects `webkit-1280`, `webkit-390`).

## CENSUS-ITEM mechanisms

Each read whole: `scripts/ci/docs-only.ts` (`isRecord`, `codeTreeId` — sha256 over `git ls-tree -r -z`
without records); `scripts/ci/lane-plan.ts` (`SERIAL_TAGS` :27, `NIGHTLY_TAGS` empty, `LANE_WORKERS = 1`
:37, `repeatBudget`, `laneLine`); the images' cache (`local-backend-proof.yml:22-131`: the key, a
cache hit restores `images.tar.gz` saved by `docker save | gzip -1` :97; each lane restores it (:391)
and runs `gunzip -c | docker load` (:412), falling back to a pull); the lane's clocks (:197-824:
CHECKOUT, INSTALL, CLI, PREPARE, CERT, START, BUILD, BROWSER, TEST, JOB seconds, written by "Write
lane evidence" :870-872 as "- Seconds — …"; the image restore and load have no clock of their own).

## CENSUS-ITEM first-download

Not applicable — no file under `src/` changes.

## CENSUS-ITEM premises

- The base: the brief says `Base: dev 3e3a51a89`; the lane starts from `4dd6cad55` (#39's merge, as
 STEP 0 orders). check-go runs `--at 4dd6cad55`.
- `LANE_WORKERS` is defined at `scripts/ci/lane-plan.ts:37`; `scripts/conformance/lanes.test.ts:316` is
 CF-LANES-3, which pins it. The brief cites the test's line as the constant's.
- CF-BRIEF's next free id is 19, but app-fixes ruling 2 (`docs/governance/briefs/app-fixes-ruling-2.md:5`)
 reserved CF-BRIEF-19 for its own queued law (the INC/DEC-to-SCOPE law); the list law takes CF-BRIEF-20.
- The list law's first subject, this brief (after Part D): `bun scripts/brief/check-go.ts
 docs/governance/briefs/ci-time.md --at 4dd6cad55` →
 `CF-BRIEF-20 docs/governance/briefs/ci-time.md:17 cites scripts/conformance/briefs-allowlist.txt; no
 test it cites reads it by name (the tree's: scripts/conformance/briefs.test.ts)`, 1 finding. On this
 lane's tree the finding is gone: Part A's `scripts/ci/docs-only.test.ts`, which the brief cites, reads
 the allowlist by name (CF-DOCS-1, CF-DOCS-11). On the lane's tree check-go gives two findings, both
 this lane's own: CF-BRIEF-6 (Part A moved `isRecord` off `scripts/ci/docs-only.ts:43`) and CF-BRIEF-7
 (Part A wrote DEC-378 into the tree).
- PREVENTION (2), re-read: run 43463527584 lasted 18.95 minutes from creation to its last job
 (1137 s; the brief's 19.1 counts from the push); run 43457682073, 13.7 minutes (822 s; brief 13.8),
 red in lane 10 (ATR-1), Component tests, smoke and webkit.
- PREVENTION (3), re-read: "each lane spends 226 seconds before its first test" is the slowest lane's
 number, not each lane's — lane 15's job (927 s by the API) less its tests (701 s, ci-evidence's
 "planned/test seconds") is 226 s. The lanes' own clocks (JOB − TEST, ci-evidence
 `docs/tracking/branches/cursor/speed/local-backend-proof.md`) give 157–205 s, median 185 s; lane 12
 (the median by length): 183 s. "Image load 64" is lane 1's load step (lane 12: 66); "backend start
 75" is the START clock of lanes 14 and 15 (median 63). "The last lanes start about three minutes
 late": waits of 66–151 s in run 43463527584 (lanes 11, 15, 16, repeat), 40–141 s in 43457682073,
 44–340 s in 43491896215 (webkit 340, lane 15 254); the cause is the concurrency limit (environments).

## CENSUS-ITEM findings

- `docs/features/e2e-harness.md:647` states "CI runs two workers a lane since DEC-376" — false since
 DEC-376's revert; Part B rewrites it.
- `scripts/fixtures/docs-only/jobs-*.json` and `ci-status-report.yml:53` hold the job name `Scope
 (docs-only push, DEC-365)`; renaming the job would move both (not done; noted for a later turn).
- No security hole was met.

## THE PLAN — Part B

Commit 1 (`ci-time part B: no scratch row moves a shared value`):
- B1: `seedProduct` places a level after every real level (highest level sort + 1, read at the call);
 MON-16/17 lose `{ sort: 0 }`.
- B2: LG-33's `rankTruth` keyed to the real levels (scratch keys excluded) — or `@global-state` on LG-33
 if the ruling prefers.
- B3, B4, B5: IB-1, IB-2, LG-32, NCQ-E2E-3 carry `{ tag: "@global-state" }` with the INC annotation, the
 form TR-17 uses (`admin-translations-governance.spec.ts:54-58`).
- The guard CF-LANES-4 (in `scripts/conformance/lanes.test.ts`, through `kit.ts`): the manifest
 `scripts/conformance/shared-value-tables.txt`, the allowlist `scripts/conformance/shared-values-allowlist.txt`
 (`<spec>::<test id>::<table> | reason | until`), its caller in `wired.test.ts`, proven on a planted
 untagged writer.
 - Recognition: a write site is a service-client chain `.from("<table>")…insert|update|upsert|delete(`
 on a manifest table, or `.rpc("<door>"` for a door the manifest names, in `e2e/**/*.spec.ts`, or in an
 `e2e/helpers/*.ts` function — the helper is the unit: a spec's call to that exported function is a
 write site at the call. A site passes when its enclosing test (or describe) carries `@global-state`,
 or the helper is sanctioned on the table's manifest line, or an allowlist line names it.
 - The manifest's first lines:

```text
# CF-LANES-4 — the shared-value tables: a write changes a value rows the writer did not create carry.
# Key: `<table>` | why its rows are shared | doors that write it | helpers whose placement moves no shared value
listing_packages | level_ranks_rebuild() renumbers every level and requeues the live ads on any write | - | seedProduct (e2e/admin-monetisation.spec.ts: after every real level), seedScratchReaches (e2e/helpers/reach-rows.ts: above every real reach)
languages | the switcher, the hreflang gate and every bundle read the enabled_public rows | - | ensureFenceLanguage (e2e/helpers/translations.ts: never public)
job_pauses | one row per job: a pause stops that job for every caller | job_pause_set | -
```

 - The first allowlist line, expected: `e2e/my-listings-promote.spec.ts::LVP-5::listing_packages | moves
 its own scratch reach row, still above every real reach | <date>`.
Commit 2 (`ci-time part B: two workers on the split lanes (DEC-378)`): `E2E_WORKERS` two on lanes 1–16
only (smoke, email, webkit, repeat keep one), and every text in old-file-readers' worker list; CF-LANES-3
pins 2 on the split lanes and 1 elsewhere. The serial lane's time before: 211 s (run 43463527584),
334 s (43491896215); after: from the judged run. The repeat lane's budget stays the slowest planned
lane's seconds.

## THE PLAN — Part C

The measured table (median split lane: lane 12, run 43463527584, one worker; the proven-tree run:
43498096790 on dev 4dd6cad55):

| Work | Seconds | Source |
| --- | --- | --- |
| lane: job set-up, ports, checkout | 3 + 0 + 2 | step times |
| lane: install (bun cache + install) | 7 | INSTALL clock |
| lane: CLI install | 7 | CLI clock |
| lane: working copy + certificate | 0 + 1 | PREPARE, CERT |
| lane: restore + load the images | 7 + 66 | step times (no clock) |
| lane: start backend + migrations | 63 | START clock (step: 64) |
| lane: build the E2E app | 9 | BUILD clock |
| lane: browser (cache, system libraries, Chromium) | 20 (3 + 17 + 0) | BROWSER clock |
| lane: tests | 657 | TEST clock |
| lane: evidence, uploads, dispose | ~13 | step times |
| lane total | 861 (API) / 840 (JOB clock) | |
| full run: push-to-result | 1137 s (18.95 min) | run 43463527584 |
| full run: lanes created | +32 s (after scope 20 s and backend images 9 s) | jobs API |
| full run: lane waits for a runner | 66, 112, 118, 151 s (lanes 11, repeat, 15, 16); others 3–16 s | jobs API |
| proven-tree run: push-to-result | 434 s (7.2 min) | run 43498096790 |
| proven-tree run: last job | Component tests (created +1, wait 3, length 416 — vitest 408 s), then Promote 11 s | jobs API |

Every job's wait and length for runs 43463527584, 43457682073, 43491896215 and 43498096790 is in
`/tmp/ethio-scratch/ci-time/runs/` (the jobs API, read with `gh api`); this turn's own first full run
is added in the ruling's first commit.

Each candidate cut against the four clauses:

| Cut | Saving (measured basis) | Hand-over cost | Readers it moves | Verdict |
| --- | --- | --- | --- | --- |
| C1 build the E2E app once (backend-images job), hand `dist` to the lanes | 7–12 s a lane | an install (~7 s) + build (~10 s) on the path before every lane starts, + a download a lane | none (a new artifact) | refused by the rule (clause 2: under 30 s a lane; push-to-result unchanged or longer) |
| C2 load the images once | 64–66 s a lane | each job is a fresh machine: every lane's Docker needs its own load; the cache restore (7 s) is already the hand-over (DEC-309) | — | refused by the rule (clause 2: no net saving exists) |
| C3 browser system libraries / Chromium once | 12–32 s a lane | per-machine packages, same as C2 | — | refused by the rule (clause 2) |
| C4 bun install / CLI install once | 5–8 s each | already cached per lane | — | refused by the rule (clause 2) |
| C5 overlap the image load with install, CLI, browser and build inside a lane (background `docker load`) | 25–45 s a lane (browser 15–37 + build 7–12 + CLI 5–8, read from lanes 1, 2, 10, 11, 12) | none | the step names "Load the backend images" and "Build E2E app…" (second-readers) | refused by the rule (clause 1: neither identical work handed over nor a job moved) — offered as a roadmap line or a new decision |
| C6 Semgrep, Build and Component tests start after the lanes have their runners (the lane waits) | the waits cost 94 s (43463527584: lane 15 ended last after 118 s of waiting; the next lane ended at 983 s) and 176 s (43491896215) of push-to-result | `ci.yml` sees the lanes as one job (`uses:`), so the only form is `needs: e2e-lanes`, which starts Component tests (400 s) after the last lane: +4 to +7 minutes; a `needs: build` chain makes a proven-tree run ~560 s instead of 434 | `ci.yml` job graph, promote | refused by the rule (clause 2: net negative in every form `ci.yml` allows) |
| C7 fewer split lanes at two workers (16 → 12: 12 + smoke, email, webkit, repeat + the long jobs fit in 20 runners) | removes the waits (up to 2.5–5.7 min of a lane's start) | none | `lane-plan.ts`, CF-LANES-3 (20 lanes), `E2E_EXPECTED_SOURCES`, the summary | refused by the rule (clause 1: a lane-plan change, not a cut) — offered to the ruling with Part B |
| C8 shard Component tests (the proven-tree run's floor: 408 s of vitest) | ~3 min of every proven-tree run | a second job's install (~5 s) | the job name `Component tests` (fixtures, reporter, promote) | refused by the rule (clause 1) — offered as a roadmap line |

No cut meets the rule, so Part C builds nothing unless ruling 1 says otherwise; each refused cut gets its
roadmap line in §14.
