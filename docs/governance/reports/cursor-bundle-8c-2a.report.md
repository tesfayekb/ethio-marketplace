# CURSOR BUNDLE 8c-2a — one enrolment body, the repeat lane in measured seconds, one legal scratch helper — report

Base: dev 3c9086dc0 · Final commit: bb4fbb36c · Brief: docs/governance/briefs/cursor-bundle-8c-2a.md (sha256 7c6e76ef2a019e0cdfda92f10b74cb6a80f064aa2244e808d3f0e8133cc40d8f)
Review: READY · 0 BLOCKER · 0 MAJOR · 0 MINOR · on bb4fbb3

CI (opening line, rule 60 and AGENTS.md): dev's last completed run is `3c9086dc06f388418a2da20552eb18837e3951cf` — SUCCESS (run 46084947152, completed 2026-11-28T00:04:39Z), the base this lane builds on; the two-step SHA check holds (the reported commit equals the base).

## 1. Done / not done, by part and step

- STEP 0 done: lane `cursor/bundle-8c-2a` from `origin/dev` at 3c9086dc0 (dev had not moved: `git rev-parse origin/dev` = 3c9086dc0 when read just before the push); the brief saved by scripted copy, sha256 equal to the carrier's; roadmap line 3 written; `scripts/conformance/briefs-allowlist.txt` held no line (nothing keyed to another brief to remove); `check-go` run (output in §4); commit `27e946e8a`.
- STEP 1 done: every census premise checked on the tree (§2).
- PART A done (`62446b9ab`): `enrolTotpFactor` beside `authFetch` in `e2e/global-setup.ts`; the pool's mint and `e2e/helpers/staff-factor.ts` call it; the three comments say what DEC-488 recorded; CF-HELPERS-13.
- PART B done (`f825f95a1`): the repeat plan in measured seconds (`scripts/e2e-select.ts`: `--repeat-plan`, `planRepeat`, `repeatUnits`, `repeatGrep`, `repeatEvidence`, `repeatSummaryLine`; `scripts/ci/lane-plan.ts`: the shared cost reads), the select step calls it, no literal seconds remain; CF-LANES-8, RPL-4, RPL-3 re-pointed.
- PART C done (`ba64b5435`): `e2e/helpers/legal-scratch.ts` (new); nine e2e files on it; two new sweeps in the shard-1 setup (stale scratch legal documents; stale error reports by tag); the two comments; CF-HELPERS-14; the seeded-table census in §13.
- STEP 5 done (`bb4fbb36c`): `docs/features/e2e-harness.md` (the enrolment body, the legal helper, the two sweeps, the repeat plan's cost; the `afterTotpStep` sentence corrected, with DEC-488's judge as the reason it stays) and `docs/features/ci-guards.md` (the four guards).
- STEP 6 done except the local-backend browser runs (§12): `bun run checks` whole, typecheck, lint, each changed test file alone, `check-go --at`, the browser runs by id on ethio-staging.
- Self-review done on `git diff 3c9086dc0..HEAD` (above).
- STEP 7: one push, pull request #121 opened (not a draft); CI in §11.
- Left: INC-1325's removal of `afterTotpStep` (DEC-488's judge; 8c-2b at the earliest), as the brief says.

## 2. Files changed

`git diff --name-only 3c9086dc0` (the report file joins this list in its own commit):

```
.github/workflows/local-backend-proof.yml
docs/features/ci-guards.md
docs/features/e2e-harness.md
docs/governance/briefs/cursor-bundle-8c-2a.md
e2e/admin-errors.spec.ts
e2e/auth-caller-gates.spec.ts
e2e/auth-signup.spec.ts
e2e/error-reports.spec.ts
e2e/global-setup.ts
e2e/helpers/crawl-fixtures.ts
e2e/helpers/legal-scratch.ts
e2e/helpers/scratch.ts
e2e/helpers/staff-factor.ts
e2e/helpers/totp.ts
e2e/legal-accept.spec.ts
e2e/legal-admin.spec.ts
e2e/legal-certify.spec.ts
e2e/legal-doors.spec.ts
e2e/legal-history.spec.ts
e2e/legal-pages.spec.ts
e2e/mfa-stepup.spec.ts
e2e/staff-gate.spec.ts
roadmap.md
scripts/ci/lane-plan.ts
scripts/ci/lane-weights.test.ts
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/lanes.test.ts
scripts/conformance/repeat-lane.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-failure-report.ts
scripts/e2e-select.test.ts
scripts/e2e-select.ts
scripts/fixtures/e2e-helpers/legal-accept-3c9086dc0.ts.txt
scripts/fixtures/e2e-helpers/staff-factor-3c9086dc0.ts.txt
scripts/fixtures/repeat-lane/changed-lines.3c9086dc0.diff
scripts/fixtures/repeat-lane/lane-weights.46081846257.json
scripts/fixtures/repeat-lane/list.3c9086dc0.json
scripts/fixtures/repeat-lane/ranks.3c9086dc0.txt
scripts/fixtures/repeat-lane/serial-list.3c9086dc0.json
scripts/test-ids.test.ts
scripts/test-ids.ts
```

New files, proven tracked by `git ls-files --error-unmatch` for each path from `git diff --diff-filter=A --name-only 3c9086dc0`: the brief, `e2e/helpers/legal-scratch.ts`, the two `scripts/fixtures/e2e-helpers/*-3c9086dc0.ts.txt` fixtures and the five `scripts/fixtures/repeat-lane/` files. Nothing under `src/`, `supabase/`, `.claude/`, the locale files, or Lovable's two user-facing lists changed; no file is deleted.

The captured fixtures (rule: captured, never authored):
- `lane-weights.46081846257.json` — copied by script from the evidence branch; sha256 `539169ec7171a7d794a675ce4501c5cbfe89f84622bb121eae19601339db8212`, equal to the value the brief names (RPL-4 asserts it). Its source: `{"run": 46081846257, "date": "2026-11-27", "lanes": "1-16"}`.
- `list.3c9086dc0.json` (`7d0402da372366269ef337a1b7fab7d71efaf581a7df7d838c3fcc7b311d0e4b`) and `serial-list.3c9086dc0.json` (`8090be807d1fbf8d0e37e3ed2ee7d67e7b44381c79740d6a3abd4fc9dc5cfe8a`): `playwright test --list --reporter=json` at 3c9086dc0, for the two lists the select step builds.
- `ranks.3c9086dc0.txt` (`644dd1b7e36c4f520a686d0d6c197b85b70bd598cec0d1e242ee1546cf0f1abc`) and `changed-lines.3c9086dc0.diff` (`f7aa505e96e7f917f2f7780e86bf3ca8c85e1757325c240114fd51545fee642a`): the 8c-1 merge's selector ranks and its `git diff -U0`.

The census facts STEP 1 named, each checked on the tree at 3c9086dc0 (the base copy under `/tmp/ethio-scratch/cursor-bundle-8c-2a/base/`):
- `"/factors"` in `e2e`: `e2e/helpers/staff-factor.ts:80` and `e2e/global-setup.ts:343` — two bodies, the second with a cast on `totp`, as the brief says. On the final tree: `e2e/global-setup.ts:276` only (inside `enrolTotpFactor`, line 271); called at `e2e/global-setup.ts:376` and from `e2e/helpers/staff-factor.ts`.
- `REPEAT_SECONDS_PER_TEST` at `.github/workflows/local-backend-proof.yml:265` (4.7), `repeatPlan` called at line 311, `- Not repeated:` written at line 332 — as the brief says. On the final tree the workflow holds none of them (CF-LANES-8 reads the select step; its planted test names the old line 265).
- COUNT 9 (the legal files) reproduced on the base copy by the brief's command: 9. On the final tree the same command returns 1 (`e2e/helpers/legal-scratch.ts`, the helper). COUNT 34 (seeded tables) reproduced on the final tree: 34.
- Error reports: `e2e/admin-errors.spec.ts` and `e2e/error-reports.spec.ts` seeded `error_reports` rows and no sweep removed them (their comments said so); the sweep now exists.
- Every premise held; no STOP.
- The measured cost of the crawl tests (weights of run 46081846257, seconds · tests, mobile-360 | desktop-1280): `failure-crawl-admin-catalog` 422.3 · 9 | 0.6 · 9; `-admin-content` 606.2 · 11 | 0.7 · 11; `-admin-people` 407.2 · 7 | 0.5 · 7; `-member-account` 98.5 · 8 | 0.5 · 8; `-member-listings` 433.2 · 5 | 0.3 · 5; `-member-public` 130.3 · 7 | 0.6 · 7; `-public` 166 · 13 | 1.3 · 13. The crawl files measure on mobile-360 only; against the base's flat 4.7 s a test on both projects.

## 3. Behaviour contract — answer tables before → after

No route, door, screen or function under `src/` changed. The harness and the CI plan changed as follows (everything else is today's):

| thing | before (3c9086dc0) | after |
|---|---|---|
| the pool's staff factor enrolment (`mintPooledSuperAdmin`) | its own body at `e2e/global-setup.ts:343`, a cast on `totp`, error text without the caller's label | `enrolTotpFactor` (`e2e/global-setup.ts:271`): same request (`/factors`, `factor_type: "totp"`, friendly name `e2e-pool-<processId>`), the answer narrowed with no cast; the error carries the caller's label (`pooled slot <n>`) |
| the staff helper's enrolment (`e2e/helpers/staff-factor.ts`) | its own body (line 80) | `enrolTotpFactor(grant.access_token, "staff-test-factor", "staff factor")`; same request, same friendly name |
| the repeat lane's plan | every selected test costed at a literal 4.7 s on both projects; `repeatPlan(tests, budget, 4.7)` in a `bun -e` call; a spec too large was skipped whole (`- Not repeated:`) | each test costed in the run's measured seconds (its file's seconds in a project over its tests there; WebKit tests by their file's mobile-360 measure; a missing file or project at the weights' median per test, named on the line); the plan fits its tests, at `each` repetitions, within the budget on that cost; a spec too large for what is left repeats the tests whose ids stand on the lines the push changed, by `--grep`, and the rest is a `- Not repeated:` line |
| the repeat lane's lines | `- Repeat: each …`, `- Not repeated: …`, the WebKit and serial lines | the same grammar (`REPEAT_SUMMARY` reads the captured fixture unchanged); the summary's "at <x> s a test" carries the plan's measured mean cost; two new kinds of line, `- Repeat by id:` and `- Repeat cost:`, each with its own prefix; the readers of the evidence file (the base's workflow lines 1076 and 1296) copy it whole and enumerate no prefix, and `repeatLines` reads only `- Repeat: ` and `- Not repeated (time cap): ` lines, so no reader needed to learn them |
| the select step's lists | text `--list` (python3 parser) | JSON `--list` (the plan reads each test's projects); the python parser is gone |
| the nine legal e2e files | each seeded and destroyed its own chain | the same kinds, versions, fields and assertions, through `seedLegalDocument`, `seedLegalVersion`, `destroyLegalChain` (acceptances, then notices, then versions, then documents; every delete throws with its phase; a kind without the scratch prefix is refused). `auth-caller-gates` now also removes the notices of its versions (it did not before; the keys are RESTRICT) |
| the shard-1 setup's sweeps | none for `legal_documents` or `error_reports` | stale (older than three hours) scratch legal documents through the helper's destroy; stale `error_reports` rows by the two tags (`e2e-erb`, `e2e-erep`) in `message` and `created_at`, never `seen_at` |

The repeat plan on this push's own run (run 46097467153, the lane `repeat`; read from `docs/tracking/branches/cursor/bundle-8c-2a/local-backend-proof.md` and `e2e-last-failure.md` on `ci-evidence`), against the base's literal 4.7 s:
- `- Repeat: each 2 on both projects; 1511 tests selected, 90 repeated; budget 829 s at 4.6 s a test; directly changed: 10 of 11 repeated; importers of a changed helper: 2 of 114` — the measured mean is 4.6 s a repeated test (414.3 s a repetition at one worker; 414.3 × 2 = 828.6 s ≤ 829 s), against 4.7 s flat.
- `- Repeat cost: weights from run 46081846257 (2026-11-27), docs/tracking/branches/cursor/bundle-8c-1/lane-weights.json at evidence 09598ad61 (run 46081846257; 0 of 2 files unread); mean 4.6 s a repeated test, 414.3 s a repetition at one worker; WebKit tests costed by their file's mobile-360 measure; 0 test-project measures at the weights' median 2.7 s`.
- `- Repeat by id: e2e/mfa-stepup.spec.ts — MF-3, MF-6, MF-7c (3 of 13 tests, the ids on lines this push changed)`; the other specs that did not fit are `- Not repeated: <spec> (<n> tests)` lines.
- `- Repeat in WebKit (DEC-371): 0 of the repeated tests`; `- Repeat serially (DEC-415): 1 of the repeated tests, @global-state, each 2 on mobile-360 and desktop-1280 at one worker after the parallel pass`.
- No `- Not repeated (time cap)` line: the lane was not capped by Playwright's global timeout (the evidence's lane table holds `repeat | 960 | 64 | applied 565/565 | 354 | 0 | 0 | 2 | 356`: 354 passed, 0 failed, 0 flaky, 2 skipped; the lane's own check is `success`). The lane's 960 s is its whole job (install and start included), not the test run's budget.

Legal tests: no assertion changed; the tests are the same ids on the same lines of behaviour (the `Json` parameter type in `legal-doors.spec.ts`'s `snapshot` is a type, not an assertion).

## 4. Censuses

- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-2a.md --at 3c9086dc0` (the commit STEP 0 began from), its output:
  ```
  [check-go] at 3c9086dc06f388418a2da20552eb18837e3951cf (--at 3c9086dc0): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-3B2NRU; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
  [check-go] no finding
  ```
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-8c-2a.md --root .` on the final tree (run after the work, so the tree has moved from the brief's premises): two findings — `CF-BRIEF-7 …:49 calls RPL-4 new or free; the tree already uses it` (this lane built RPL-4) and `CF-BRIEF-10 …:60 COUNT 9 := … — prints 1` (the brief's COUNT 9 is the base's legal-file count; after Part C only the helper matches). Both are what the lane was to make true; `--at 3c9086dc0` (above) reads the base and finds none.
- Legal tables, final tree (`rg -l -U` over `from("legal_documents"|"legal_versions")` followed by `.insert`/`.delete`): `e2e/helpers/legal-scratch.ts` only; CF-HELPERS-14 judges it.
- `"/factors"` in `e2e`: `e2e/global-setup.ts:276` only; CF-HELPERS-13 judges it.
- Every `.insert`/`.upsert` into a table in `e2e` (COUNT 34): §13.
- The census of the shared names a new helper joins (the brief's lists): `COPIED_NAMES` (`scripts/conformance/e2e-helpers.test.ts`) took the helper's names; the selector's groups in `scripts/e2e-select.ts` select a changed helper's importers; `scripts/conformance/wired.test.ts` names CF-HELPERS-13, CF-HELPERS-14, CF-LANES-8, RPL-4; `docs/features/ci-guards.md` lists the four.

## 5. Tests

Ids added or re-pointed:
- CF-HELPERS-13 (`scripts/conformance/e2e-helpers.test.ts`, `enrolmentFindings`) and its planted test: feeds `scripts/fixtures/e2e-helpers/staff-factor-3c9086dc0.ts.txt` (the base text of `enrolFactor`) and expects the refusal; green on the tree. RED-FIRST: the planted test is the base text refused.
- CF-HELPERS-14 (same file, `legalChainFindings`) and its planted test: feeds `scripts/fixtures/e2e-helpers/legal-accept-3c9086dc0.ts.txt` (the base's seed and destroy in `e2e/legal-accept.spec.ts`) and expects the refusal; a second test holds the two error-report tags the sweep reads to the tags the four specs build. CF-HELPERS-6 (every scratch prefix swept) still passes, reading `errorReportStaff` and `errorReportSender` as swept kinds.
- CF-LANES-8 (`scripts/conformance/lanes.test.ts`, `literalSecondsFindings`), planted on the select step with `REPEAT_SECONDS_PER_TEST=4.7` added back before the call; CF-LANES-5 and CF-LANES-7 re-pointed to read the new select and run steps (the lists and the `--grep`).
- RPL-4 (`scripts/conformance/repeat-lane.test.ts`): on the captured list and the weights of run 46081846257, 62 tests selected; budget 841 s; the plan repeats `e2e/admin-errors.spec.ts`, `failure-crawl-member-account.spec.ts` and `failure-crawl-member-public.spec.ts` whole and `failure-crawl-admin-content.spec.ts` by `FCR-79` and `FCR-80` (2 of 11), 19 tests repeated of 62 selected, five specs left (named); `seconds × each` ≤ budget and `each` ≥ 2; the `--grep` takes `FCR-79`, not `FCR-78` nor `FCR-790`. RED-FIRST (control): at the base's cost, every selected test twice measures well over five budgets on the measured seconds (the test asserts `everyTestTwice > 5 × 841`), which is what run 46081846257 hit when Playwright's global timeout (961 s) cut it.
- RPL-3 re-pointed (`planFlat`): the count's bounds as the new plan computes them with every test at 4.7 s on each of the two projects (9.4 s a repetition), the figure the lane used to assume: `(1, 720) → each 6, take 1`; `(13, 720) → 5, 13`; `(39, 720) → 2, 38`; `(200, 720) → 2, 38`; `(0, 720) → 0, 0` (nothing selected plans nothing). The first four are the base's four figures, unchanged (read by `git show 3c9086dc0:scripts/conformance/repeat-lane.test.ts`, lines 346 to 349); the fifth is added.
- RPS-8 (`scripts/e2e-select.test.ts`): the ids of a push's changed lines — added lines only, a data row as well as a title, an untracked file whole. RPS-9 (same file): `--repeat-plan` appends the evidence lines and the lane's variables, prints its counts, and an unreadable list is an error. TI-7 (`scripts/test-ids.test.ts`): an id is read wherever it stands when asked (a data row, a comment) by the one grammar, and a listed title's leading ids come from the same reader. LWM-10 (`scripts/ci/lane-weights.test.ts`): a test costs its file's seconds in a project over its tests there; the weights' median costs what they hold no measure of. The `repeatLines` self-tests inside `scripts/e2e-failure-report.ts` (not a vitest file) now build their summary lines from the plan's own `repeatSummaryLine` instead of echoing the workflow's text.

Totals (run in this task):
- `bun run typecheck`: green (`tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`, no output). `bun run lint`: green (`eslint . --max-warnings 0`, no output).
- Each changed test file alone: `e2e-select.test.ts` 21 passed; `test-ids.test.ts` 7; `lane-weights.test.ts` 10; `e2e-helpers.test.ts` 11; `lanes.test.ts` 8; `repeat-lane.test.ts` 5; `wired.test.ts` 5 — each file 1 passed.
- `bun run checks`, its fast line: `checks (fast): 25 PASS · 0 FAIL · 565s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`; its last line: `checks: 36 PASS · 0 FAIL · 26 NOT RUN · 648s`. `bunx vitest run scripts --maxWorkers=2` ran as `laws-first › scripts/ tests first` (PASS, 135 s) inside it, and again file by file above. NOT RUN, each with the script's reason: `scope › Decide whether the lanes run` and `scope › Index the code tree the lanes prove` (the Actions API's artifacts); `build-and-check › Workflow lint (actionlint, pinned)` (linux/x64 binary on darwin/arm64); the `Install dependencies` steps of build-and-check, component-tests, i18n-usage-map, dependency-audit, e2e-preflight and bundle-budget (already installed; a package change is its own turn); `secrets-scan › Secrets scan (gitleaks, pinned)` (linux/x64 binary); `dependency-audit › Audit` (the advisory service is not reachable from the sandbox); `e2e-preflight` steps (they compare migrations with ethio-staging through credentials the script never holds); the `e2e` job's merge steps and the `promote` steps (CI only); the `semgrep` SARIF upload (GitHub only). `bundle-budget › Check the first-paint budget` PASS; no file under `src/` changed, so no page's first download moved.
- Browser runs, on ethio-staging (E2E values set; `E2E_LOCAL_BACKEND` unset: see §12), through `bun run e2e:local`, `--retries=0`, `--project=mobile-360 --project=desktop-1280`:
  - the nine converted files whole, i.e. `legal-accept`, `legal-admin`, `legal-certify`, `legal-doors`, `legal-history`, `legal-pages`, `auth-caller-gates`, `auth-signup` specs (the ninth file is the helper `crawl-fixtures.ts`, whose consumer rows are below): `157 passed (7.7m)`, `1 skipped` (LGC-4 on mobile-360, `test.skip(width < 768, …)` at `e2e/legal-certify.spec.ts:659`, unchanged from the base), 0 failed.
  - ERB-1, ERB-2, ER-1, ER-2 by `--grep`: `8 passed (26.5s)` (4 ids × 2 projects).
  - the crawl rows that read the helper's legal version, FCR-32 and FCR-75, by `--grep`: `2 passed`, `2 skipped` (the rows run on mobile-360 only, which is why the desktop-1280 counterparts report as skipped).
  - one run with `E2E_MAINTENANCE=1` (ERB-2 on mobile-360, `1 passed`) so the shard-1 maintenance code, including both new sweeps, ran against staging's real tables: the setup completed with no error (`reaped 8 stale scratch rows`). It found no stale rows of the two new kinds to remove: it proves the new sweeps' queries and the helper's destroy run against the real schema; it does not prove they remove a stale row (§12, the brief's CONTROL).
- `[ssr-error]` counts: not collected (the runs were local, not the merged `e2e` job's server-error census; CI's `e2e` job is the judge).
- J-audit line: no script of that name was found (`rg -n 'J-audit|J audit'` over `.cursor/rules` and `docs/features/e2e-harness.md`, and `rg -ln 'J-audit' scripts docs/features`, find only rule 60's own text); the J laws were read by hand on the diff (J1 and J3: the helper's kinds carry `e2e-`; every delete throws with its phase; the helper refuses a kind without the prefix; J9 untouched).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n '"/factors"' e2e`; `rg -n 'factors/\$\{.*\}/(challenge|verify)' e2e`; `rg -n 'aal2Session|challengeAndVerify' e2e`; the brief's two COUNT commands.
- The TOTP verify bodies are not an enrolment and were left as the brief says (INC-1336 is 8c-2b's): the proof's challenge and verify in `e2e/global-setup.ts:382` and `:393`; `aal2Session` at `e2e/helpers/ui.ts:953`; `challengeAndVerify` in `e2e/helpers/ui.ts` (the client's own call). Each is a separate body for the verify step.
- No other file enrols a TOTP factor (`"/factors"` is at `e2e/global-setup.ts:276` only).
- No other file seeds or destroys `legal_documents` or `legal_versions`; acceptances deleted by user (the pool reset in `e2e/helpers/users.ts`) are not the chain and stay.
- The seeded-table census (§13) lists every table with nothing that removes a dead run's rows: those are the K2 findings of Part C's class.

## 7. Allowlists and guards

- `scripts/conformance/e2e-helpers-allowlist.txt`, `lanes-allowlist.txt`, `briefs-allowlist.txt`: unchanged (no line added or removed); the new guards have no exception line. `docs/tracking/intentional-deletions.txt`: unchanged (no file deleted).
- New guards: CF-HELPERS-13, CF-HELPERS-14, CF-LANES-8, RPL-4 (and RPL-3 re-pointed), each proven red on a planted bypass (§5), each named in `scripts/conformance/wired.test.ts`.
- `scripts/conformance` laws (inside `bun run checks`): green.

## 8. Strings

None. FLAGS `no-new-string`: no key added or changed; no user-visible string in `src/` changed.

## 9. Migrations

None. FLAGS `no-migration`; no file under `supabase/` changed.

## 10. Departures

- The browser runs of STEP 6 ran on ethio-staging, not on a local temporary backend (`E2E_LOCAL_BACKEND=1`): this environment has no local backend values (the local proof stack's keys are never printed or read, rule 50, and `db:proof` is a database proof, not a browser target). The brief's wording is "Against the local temporary backend"; the staging run is the form rule 00 step 7 allows. CI's lanes run the same specs on the temporary backend and are the proof.
- The CONTROL for INC-1334 (the setup's reaped count on a local temporary backend after seeding one stale row of each kind) was NOT RUN, for the same reason, and because seeding a stale row on staging would be a database write that the browser tests did not make (rule 50).
- STEP 0 names `check-go --root .`; its output on the final tree is pasted in §4 (two findings, both consequences of the change the brief asks for, not of a defect); the `--at` form is the one STEP 6 names.
- Mechanical edits a standing guard demanded of this change, in scope: `e2e/helpers/scratch.ts` gains two `SCRATCH_PREFIXES` lines (`errorReportStaff: "e2e-erb"`, `errorReportSender: "e2e-erep"`) so the sweeps read the tags through CF-HELPERS-6's mechanism (the brief's "the new prefix, if a new line is born"); `legal-doors.spec.ts`'s `snapshot` parameter is typed `Json` (imported from `src/integrations/supabase/types`, a read) instead of a cast.
- WebKit tests are costed by their file's mobile-360 measure (the weights hold Chromium only), not by the median; the median covers a file or project the weights lack (the brief's DECIDE-AND-NAME).
- The plan lives in `scripts/e2e-select.ts` (`planRepeat`, `repeatUnits`, `repeatGrep`, `repeatEvidence`, `repeatSummaryLine`, `--repeat-plan`); `scripts/ci/lane-plan.ts` keeps the shared cost reads (the split is the brief's to name).
- No STOP and no ruling arrived in the turn.

## 11. CI

- Base: the first six lines of `docs/tracking/ci-status.md` on `ci-evidence` read at the start: commit `3c9086dc06f388418a2da20552eb18837e3951cf` (short `3c9086d`), conclusion SUCCESS, completed 2026-11-28T00:04:39Z, run https://github.com/tesfayekb/ethio-marketplace/actions/runs/46084947152 — the same commit as this lane's base (two-step check holds).
- Reds of an earlier turn fixed first: none (the base was green).
- This pull request's run on the last code commit `bb4fbb36c` (#121, https://github.com/tesfayekb/ethio-marketplace/pull/121; run https://github.com/tesfayekb/ethio-marketplace/actions/runs/46097467153, CI's merged head `f367a4eb836ca95e85ed59dec9e9277ba60b8c7c`; `ci-status.md` on `ci-evidence`: Conclusion FAILURE, completed 2026-11-28T02:39:07Z; `Lanes: ran — no proven code tree: no green ci.yml run of this repository holds code-tree-ad63c908a499… (0 read)`). `gh pr checks 121`: 41 pass, 2 fail, 2 skipping (the promote job and the Lovable branch guard, which do not run on a pull request).
- RED 1, `E2E lanes / Lane 12 on temporary Supabase`: one gating failure, `admin-translations-data.spec.ts › U4b translations console › TR-14 the Data scope edits and approves a location name`, `desktop-1280`, source `shard 12`, `e2e/admin-translations-data.spec.ts:199` (`entity-row-location-<id>-name` not found within 20 s after the Data scope's search filled the scratch location's name). Class (rule 40): (e), not infrastructure, and not re-run. What I read: the failure body (the page snapshot holds the footer only; no `[client-error]` line in the shard-12 log; no `[ssr-error]` beyond the quiet `definitions badHeader` / `definitions wrongFile` lines every run carries); shard 12's files (`admin-screening`, `admin-attributes-links`, `admin-translations-data`, `admin-attributes-import`, `post-wizard-details`, `category-image-routes`, `overlay-shift`): none is a file this lane changed, and the shard-1 setup (where the new sweeps run, only `E2E_SHARD=1`) does not run in shard 12; the flake ledger holds no TR-14 line (it holds TR-24 and TR-26 lines from 2026-09); TR-14 on ethio-staging, both Chromium projects, `--repeat-each=2`, 0 retries, run here after the red: `4 passed (41.0s)`. No path the failure or its logs name was changed by this lane (the failure's body line is `e2e/admin-translations-data.spec.ts:199`), so the brief's tolerance applies: named here, CI judges. I did not touch code for it. The supervisor's ruling in the chat: TR-14 is not this lane's — it changed no translations, locations or entity-row path, its setup sweeps run only on shard 1, and TR-14 got through the pool sign-in before it failed at the search (line 199); it is INC-1342, a test that sometimes fails after its search, four times since 2026-11-17, owner Cursor 8c-3.
- RED 2, `E2E (Playwright, ethio-staging)`: the merged verdict job of the same run (20 s); it fails because lane 12 did. Not a second cause.
- Every other check of the run is green, including the other fifteen numbered lanes, the smoke, e-mail and WebKit lanes, and the repeat lane (§3), `bundle-budget`, `component-tests` and the guards.
- Re-runs: none (rule 40: only an infrastructure red or a cancelled run may be re-run; this red is neither).
- Consequence, by the ruling: the code tree was never proven green, so the push of this report commit runs every lane, and its completed run is the judged one. `admin-translations-data.spec.ts` is not touched and nobody is asked for a re-run. If TR-14 is red again, nothing further is done before the supervisor's ruling. The result of that run is reported in the chat, not in this file (the report commit is not re-judged, rule 60).

## 12. Limits

- The local-backend browser runs and the INC-1334 CONTROL: NOT RUN (§10). The new sweeps ran against ethio-staging's real tables once with `E2E_MAINTENANCE=1` and found nothing stale to remove; CI's shard-1 setup is the first proof that they remove a stale row of each kind.
- WebKit (`webkit-1280`, `webkit-390`), the repeat lane's real time on this push, and the merged tree are CI's and the supervisor's.
- `actionlint` and `gitleaks` (linux/x64 binaries) did not run locally; `dependency-audit` did not run (no network to the advisory service); CI's verdicts are the judges.
- The `e2e` job's `[ssr-error]` census and the accessibility roster did not run locally.
- Logs read: the local `bun run checks` output, the local browser runs' output, `gh pr checks` for #121, and the branch's evidence files on `ci-evidence` (`ci-status.md`, `e2e-last-failure.md`, `local-backend-last-failure.md`, `local-backend-proof.md`, `guards-last-failure.md`, whose one failure is the merged E2E verdict job). `gh run view 46097467153 --log-failed` returned only the lane's script lines, no test output; the failing test's body is from `e2e-last-failure.md`. Not read: the raw job logs of the other lanes.
- CI is not green on the last code commit (§11, RED 1) at the time this report was written: the "done" condition of rule 00 is not met, and this report says so; the report's own push runs every lane and its result is reported in the chat.

## 13. Findings

The census of every table an e2e file inserts or upserts into (COUNT 34 reproduced on the final tree by the brief's command: 34). Reaper lines are in `e2e/global-setup.ts` unless named; "cascade" is an `ON DELETE CASCADE` key read in the migration named. A table with nothing that removes a dead run's rows is a FINDING, its number left to the supervisor (G71); none is built here.

| table | who seeds | what removes a dead run's rows |
|---|---|---|
| ai_features | admin-services.spec.ts | nothing (the spec's own dropScratch only) — FINDING |
| attributes | 17 files | sweep: the attribute plan, line 1229 |
| categories | 18 files | sweep: line 1176 |
| category_attribute_links | 16 files | sweep: line 1218 |
| category_country_exclusions | admin-categories-lifecycle.spec.ts | cascade from categories (`20260903025501:7`), so the category sweep |
| category_tree_pointers | 16 files | sweep: line 1159 |
| countries | helpers/countries.ts | sweep: line 843 (name prefix); `helpers/countries.ts:303` |
| entity_translations | 3 specs | sweep: lines 694, 743, 808, 1171, 1224 (fence, location, category) |
| error_reports | admin-errors.spec.ts, error-reports.spec.ts (the route's own post) | NEW sweep (this turn), by message tag and `created_at`; the table's 12-month prune |
| languages | helpers/translations.ts, i18n-bundle, admin-translations-governance, legal-doors | nothing — FINDING (the specs' afterEach only; no `languages` delete in the setup) |
| legal_acceptances | legal-accept.spec.ts | NEW legal sweep, by version; by user: cascade from profiles (`20261019063500:99`) |
| legal_documents | helpers/legal-scratch.ts | NEW legal sweep |
| legal_version_texts | legal-doors, legal-admin | cascade from legal_versions (`20261021222432:5`), so the legal sweep |
| legal_versions | helpers/legal-scratch.ts | NEW legal sweep |
| level_overrides | helpers/level-overrides.ts | nothing — FINDING (keys to categories, countries, listing_packages carry no ON DELETE: `20261103040805:95-97`) |
| listing_locations | 13 files | cascade from listings (`20260810073508:5`), so the listing sweep |
| listing_packages | helpers/reach-rows.ts, admin-monetisation | nothing — known (housekeeping-3b report §13); FINDING |
| listing_photo_warnings | admin-screening.spec.ts | cascade from listing_photos (`20261014084432:29`) |
| listing_photos | helpers/ad-page.ts, photos.ts, 4 specs | cascade from listings (`20260804174739:81`); storage objects by the photo sweep |
| listing_revisions | admin-listings.spec.ts | cascade from listings (`20260917000149:64`) |
| listings | helpers/listing-seed.ts, ad-page-doors | sweep: lines 962, 974, 1154 |
| locations | 9 files | sweep: lines 752, 817; `helpers/locations.ts:266` |
| market_settings | my-listings-promote, my-listings-levels, admin-monetisation | nothing — FINDING (keys to countries and listing_packages carry no ON DELETE: `20261103040807:28-30`) |
| package_prices | legal-certify, my-listings-promote, my-listings-levels, admin-monetisation | nothing — FINDING (keys to listing_packages, countries, categories carry no ON DELETE: `20261102081600:73-75`) |
| rate_limits | posting-routes, post-wizard-place, helpers/photos.ts | a pool account's keys: `helpers/users.ts:253`, `:258`; a scratch user's keys: nothing found (no prune of rate_limits by `rg -i 'cron.schedule|prune' supabase/migrations`) — FINDING |
| rate_overrides | 5 specs | cascade from users (`20261003215007:14`): the teardown deletes the run's users, the nightly sweep those older than 24 h; pool: `helpers/users.ts:260` |
| role_permissions | helpers/users.ts | sweep: line 921 |
| roles | helpers/users.ts | sweep: line 934 |
| saved_listings | sage-tiers.spec.ts | cascade from users (`20261017105713:24`); pool: `helpers/users.ts:265` |
| seller_notices | my-listings-page.spec.ts | cascade from listings (`20261011085637:28`) |
| seller_places | post-wizard-bundle2.spec.ts | cascade from users (`20261004144146:86`); pool: `helpers/users.ts:275` |
| ui_translation_revisions | admin-translations-console.spec.ts | sweep: lines 642, 670 |
| ui_translations | 4 files | sweep: lines 652, 680 |
| user_roles | helpers/users.ts, ui.ts, global-setup.ts, door-refusals | sweep: line 928 (scratch roles); users: cascade; pool: `helpers/users.ts:290` |

Findings from the table (nothing built; numbers are the supervisor's): seven tables have no reaper for a dead run's rows — `ai_features`, `languages`, `level_overrides`, `listing_packages`, `market_settings`, `package_prices`, and a scratch user's `rate_limits` keys. Three of them (`level_overrides`, `market_settings`, `package_prices`) hold foreign keys to `listing_packages`, `countries` or `categories` with no `ON DELETE` clause (migrations named in the table), so `listing_packages`' reaper must run after theirs: a design question, not a one-line sweep.

Other findings:
- INC-1342 (the supervisor's, by ruling): `e2e/admin-translations-data.spec.ts:199` (TR-14) sometimes fails after its search — four times since 2026-11-17; owner Cursor 8c-3. Seen on this lane's run 46097467153 (lane 12, desktop-1280); not this lane's (§11). Not touched here.
- This push's own evidence: `Measured lane spread (DEC-375 b): mean 449 s, largest 593 s (lane 1, +32 %); finding: over the 25 % limit — the lanes' measured times no longer match the plan's weights` (`e2e-last-failure.md` on the branch's evidence). The sixteen lanes' plan is not changed by this lane (`scripts/ci/lane-plan.ts` only gained two read functions, `costPerTest` and `medianCost`); the weights are the 8c-1 run's. For the supervisor.
- The `e2e/global-setup.ts` line numbers above were read on the final tree (lines 642 to 1229); the two new sweeps sit before line 897's `destroyLegalChain("setup", …)` call.
- INC-1325: `afterTotpStep` stays until DEC-488's judge (its comment now says what the pinned auth server does: only a challenge is single-use).
- The proof's TOTP verify and `aal2Session` / `challengeAndVerify` remain separate bodies (§6); the brief puts the twin locator in 8c-2b.
- Security: none found (`rg -n 'secret|token|password|apikey'` over the added lines read by hand: the only secret handled is the TOTP secret, held by the caller and never printed; no secret-shaped literal).

## 14. Records

DEC — DEC-499 (the supervisor's, G17; it amends DEC-494) — Cursor 8c-2 is two lanes.
- 8c-2a carries one enrolment body for the tests' staff factor (INC-1326), the repeat lane planned in measured seconds (INC-1333, INC-1311), and the scratch legal chain made and removed by one helper with the sweeps that miss error reports and legal documents (INC-1334). It touches no file under src/ and runs beside Lovable's UF-1.
- 8c-2b follows UF-1's merge, with the guards that judged wrong (INC-1338, INC-1339), the twin locator (INC-1336), INC-1313, INC-1320, WebKit (INC-1328, DEC-483), S830's law and DEC-498 in the list's document.
- INC-1325's removal of afterTotpStep waits for DEC-488's judge over ten dev runs.
- Why: a Cursor lane carries at most three fixes, and a lane beside an open Lovable lane keeps out of its folders.

INC — INC-1326: fixed. The pool's mint and the staff helper enrol a TOTP factor through one body, `enrolTotpFactor` in `e2e/global-setup.ts`, which narrows the auth server's answer with no cast and names its caller on failure; CF-HELPERS-13 refuses any other e2e file that posts the factor enrolment; the three comments that said a factor accepts each code once now say what DEC-488 recorded.

INC — INC-1333, INC-1311: fixed. The repeat lane plans in the run's measured seconds (`scripts/e2e-select.ts --repeat-plan`; each test costed by its file's seconds in a project over its tests there; WebKit tests by their file's mobile-360 measure; a missing file or project at the weights' median per test, named on the summary line); the plan fits its tests, at `each` repetitions, within the budget; a spec too large for what is left repeats the tests whose ids stand on the lines the push changed, by `--grep`, and names the rest as not repeated; no literal seconds remain in the workflow; CF-LANES-8 and RPL-4 judge it, RPL-3 re-pointed.

INC — INC-1334: fixed, widened (G41) to the scratch legal chain. `e2e/helpers/legal-scratch.ts` seeds and removes the chain (acceptances, notices, versions, documents) for the nine files that did it themselves, refuses a kind without the scratch prefix, and throws on every failed delete with its phase; the shard-1 setup sweeps scratch legal documents and error reports (by the tags `e2e-erb` and `e2e-erep`, by `created_at`, never `seen_at`) older than three hours; CF-HELPERS-14 refuses any other file's seed or destroy of the two legal tables. The census of the 34 tables an e2e file seeds is in §13 (seven with nothing that removes a dead run's rows, left for numbering).

register row — a scratch legal document in tests → `e2e/helpers/legal-scratch.ts` → CF-HELPERS-14 → exceptions: none.

register row — the e2e reaper's row, amended: the shard-1 setup's sweeps now also cover two tables, `legal_documents` (with its versions, acceptances and notices, through `legal-scratch.ts`) and `error_reports` (by message tag); guards CF-HELPERS-6 (every scratch prefix swept) and CF-HELPERS-14.

register row — the staff helper's row (`e2e/helpers/staff-factor.ts`), amended: it enrols through `enrolTotpFactor` in `e2e/global-setup.ts`; guard CF-HELPERS-13.

register row — the lane plan's row (DEC-375 b), amended: the repeat plan joins it — `scripts/e2e-select.ts --repeat-plan` costs each test in the run's measured seconds from the same weights as the sixteen lanes; guards CF-LANES-8 and RPL-4.

changelog — Cursor 8c-2a: the tests' staff factor is enrolled by one body; the repeat lane is planned in measured seconds and repeats a partly changed spec by its changed test ids; the scratch legal chain is made and removed by one helper and the setup sweeps scratch legal documents and error reports (INC-1326, INC-1333, INC-1311, INC-1334).

roadmap — tick Cursor 8c-2a (INC-1326, INC-1333, INC-1311, INC-1334); the INC-1325 removal of `afterTotpStep` and Cursor 8c-2b stay open.
