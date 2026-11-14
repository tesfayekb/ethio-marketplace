# The CI turn — fewer runs a turn, two workers, a shorter start-up — report

Base: 4dd6cad55 (the brief's `Base: dev 3e3a51a89` is pull request #39's head before its merge; the lane starts from its merge, as STEP 0 orders) · Final commit: 70dc4f626 · Brief: docs/governance/briefs/ci-time.md (sha256 602f4d1bf6c9dfd9ead7c847c51dc4d43048966e897d15d571ad786f27542ab7) · Ruling 1: docs/governance/briefs/ci-time-ruling-1.md (sha256 c8376ec1626eadceecf954c50237fad8dce4040eba53066cde842ee1b0962f9a)
Review: READY · 0 BLOCKER · 0 MAJOR · 1 MINOR · on 70dc4f6

CI on the base (dev 4dd6cad55, run 43498096790): SUCCESS. CI on the final commit 70dc4f626: run 43528965654, SUCCESS (the lane's ci-evidence `branches/cursor/ci-time/ci-status.md`: Commit `70dc4f626df2096fa60b00d0d006d5c38fd2713b`, Conclusion SUCCESS, Completed 2026-11-13T23:56:21Z); `gh pr checks 40`: 43 pass, 1 skipping (Promote to main).

## 1. Done / not done, by part and step

| Step / part | State | Commit |
| --- | --- | --- |
| STEP 0 — branch, brief saved, line 3, check-go | done | f5d9aef01 `ci-time: task saved` |
| STEP 1 — census and plan | done | `docs/governance/reports/ci-time.stop-1.md` |
| STEP 2 — Part A: the brief allowlist set aside; the self-review before the push | done | 33fd4c89f |
| STEP 3 — Part D: the JWT rule's end, the list law (CF-BRIEF-20), the stale comments | done | 278eddf40 |
| STEP 4 — checks, census commit, push, draft PR #40, stop | done | 5a969c237 |
| Ruling 1's first commit — the ruling saved bare, the first full run's numbers in the census | done | b83ffab71 |
| STEP 5 — Part B commit 1: B1–B5, CF-LANES-4, CF-BRIEF-19, the template's queued line | done | a28cf954d |
| STEP 5 — Part B commit 2: two workers on the split lanes | done | 70dc4f626 |
| STEP 6 — Part C | nothing built (ruling 1 item 4: no cut met the rule) | — |
| STEP 7 — the gate, then the self-review | done | — |
| STEP 8 — one push, `gh pr ready 40`, the checks watched | done | — |
| STEP 9 — this report | done | `ci-time: report` |

## 2. Files changed

`git diff --name-only 4dd6cad55..70dc4f626` (37):

```text
.cursor/rules/00-protocol.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
.github/workflows/ci.yml
.github/workflows/local-backend-proof.yml
AGENTS.md
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/e2e-harness.md
docs/governance/briefs/ci-time-ruling-1.md
docs/governance/briefs/ci-time.md
docs/governance/go-template.md
docs/governance/reports/ci-time.stop-1.md
e2e/admin-monetisation.spec.ts
e2e/i18n-bundle.spec.ts
e2e/legal-certify.spec.ts
e2e/legal-doors.spec.ts
e2e/name-check-queue.spec.ts
playwright.config.ts
roadmap.md
scripts/brief/go-laws.ts
scripts/ci/docs-only.test.ts
scripts/ci/docs-only.ts
scripts/ci/lane-plan.ts
scripts/ci/redact.test.ts
scripts/ci/redaction-rules.json
scripts/conformance/agents-lines-allowlist.txt
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/kit.ts
scripts/conformance/lanes.test.ts
scripts/conformance/rules.test.ts
scripts/conformance/shared-value-tables.txt
scripts/conformance/shared-values-allowlist.txt
scripts/conformance/shared-values.ts
scripts/conformance/wired.test.ts
```

New files, in `git ls-files`: `docs/governance/briefs/ci-time-ruling-1.md`, `docs/governance/briefs/ci-time.md`,
`docs/governance/reports/ci-time.stop-1.md`, `scripts/conformance/shared-value-tables.txt`,
`scripts/conformance/shared-values-allowlist.txt`, `scripts/conformance/shared-values.ts` (all six
listed). Every path is in the brief's SCOPE by area or the standing allowance; `roadmap.md` changes on
line 3 only. No `src/` or `supabase/` file.

## 3. Behaviour contract — before → after

No route, door, screen or app function is touched. What differs, each one the brief's or the ruling's:

| Thing | Before (4dd6cad55) | After (70dc4f626) |
| --- | --- | --- |
| `isRecord` (`scripts/ci/docs-only.ts`) | `docs/**` (not `docs/generated/**`), `.cursor/**`, root `*.md` | the same, plus `SET_ASIDE` = `scripts/conformance/briefs-allowlist.txt` (DEC-378 b) |
| the redaction's JWT rule (`scripts/ci/redaction-rules.json`) | ends `\b` | ends `(?![A-Za-z0-9_-])` (INC-1138); `redact.py` and `e2e-failure-report.ts` both read it |
| rule 00's order | push at once after the gate; the review while CI runs | the gate → the self-review → one push → the report while CI runs |
| `E2E_WORKERS` in `local-backend-proof.yml` | `"1"` for every lane | `2` on lanes 1–16; `1` on smoke, email, webkit, repeat |
| `LANE_WORKERS` (`scripts/ci/lane-plan.ts`) | 1 | 2, with `ONE_WORKER_LANES` = smoke, email, webkit, repeat |
| `seedProduct` (`e2e/admin-monetisation.spec.ts`) | `sort` defaulted or given (`MON-16/17`: `{ sort: 0 }`) | the top sort of its kind + 1 (0 when none) |
| LG-33's `rankTruth` (`e2e/legal-certify.spec.ts`) | the whole `level_ranks` table | the table without rows whose key matches `SCRATCH_KEY` (LG-33 makes no level) |
| IB-1, IB-2, LG-32, NCQ-E2E-3, MON-16, MON-17 | split lanes | `@global-state` → the serial lane (smoke, one worker), on every push |
| `visitTs` (`scripts/conformance/kit.ts`) | reads the file | reads the file, or the `text` passed in (an optional third parameter) |
| check-go | 18 laws | CF-BRIEF-19 and CF-BRIEF-20 added |

No assertion was loosened, no timeout raised, no retry added.

## 4. Censuses

STEP 1's census is `docs/governance/reports/ci-time.stop-1.md` (every item answered by its key word),
accepted whole by ruling 1. Run after the ruling:

- The worker count's readers: `rg -n "LANE_WORKERS|one worker|1 worker|workers"` over `.github`,
  `scripts`, `playwright.config.ts`, `AGENTS.md` and `docs/features`; then, after commit 2,
  `rg -n "1 worker each|one worker a lane|every lane runs one|E2E_WORKERS: \"1\"|E2E_WORKERS=1"` over
  the tree outside briefs, reports, the changelog and the tracking folder. What it still finds is
  history (`docs/spec/spec-ledger.md:4320`, `:4354`, `:4393`; `docs/features/ci-local-backend.md:660`,
  `:664`; `docs/governance/handoffs/2026-10-23-bundle22-after-close-running-record.md:456`, `:462`,
  `:463`, `:466`), the AGENTS allowance's own history (`scripts/conformance/agents-lines-allowlist.txt:3`)
  and planted test text (`scripts/conformance/briefs.test.ts:219`, `:226`;
  `scripts/conformance/lanes.test.ts:344`).
  Two readers stay as written because they are still true: `lane-plan.ts` `laneLine`'s "s planned at
  one worker" (the weights are measured at one worker) and `local-backend-proof.yml:242` (the repeat
  budget is measured at one worker, and the repeat lane runs one).
- The shared-value writes (CF-LANES-4, on the real tree): the manifest's three tables are written in
  e2e/ by tagged tests, sanctioned helpers and six allowlisted units (§7). Red check: with IB-1,
  IB-2, LG-32 and NCQ-E2E-3 untagged in memory (`/tmp/ethio-scratch/ci-time/sv-red.ts`), the census
  names those four, plus the six allowlisted units.
- The statement triggers: one authored pattern over `supabase/migrations/` with comments blanked finds
  eight tables — `listing_packages` (shared) and seven "read, not shared" lines: `categories`,
  `category_attribute_links`, `entity_translations`, `listings`, `listing_locations`,
  `category_tree_pointers`, `locations`. The growth rule's assertion is built (ruling 1 item 2).
- The "CI turn" queue (ruling 1 item 6): `rg -n "CI turn —" roadmap.md` → `:9`, `:10`, `:11` (§13).

## 5. Tests

Changed or added:

- CF-LANES-3 (`scripts/conformance/lanes.test.ts`): it now pins `LANE_WORKERS` = 2 on lanes 1–16 and
  1 on `ONE_WORKER_LANES`. 16 of the 20 lanes read 2. The planted cases changed shape: `E2E_WORKERS: "1"`
  job-wide → 16 findings (was: `"2"` → 18); `"2"` job-wide → exactly webkit and repeat (smoke and email
  keep their `--workers=1`); `--workers=1` on lanes 1–16 → 16.
- CF-LANES-4 (new, the same file): the real tree is clean; planted SVP-1…7 and SVU-1 give exactly
  SVP-1 (`listing_packages`), SVP-3 (through a helper) and SVP-5 (a door, `job_pauses`). A tagged test,
  a tagged describe, a sanctioned helper, a same-named function in another file and a file's own
  same-named function pass. A planted stale allowlist line throws. A planted statement trigger is
  found and a commented-out one is not. Stale "read, not shared" lines are reported, and a malformed
  manifest throws.
- CF-BRIEF-19 (new, `scripts/brief/go-laws.ts`; self-test in `scripts/conformance/briefs.test.ts`):
  the planted brief gives two findings; the clean brief (a SCOPE grant and a "not in SCOPE" line) and
  a ruling give none. The in-force test runs it on this brief and its ruling: no finding.
- CF-BRIEF-20, CF-DOCS-11, CF-RULES-1 (extended), CF-REDACT-1 (planted tokens ending `-` and `_`):
  Parts A and D, before the stop.
- e2e: MON-16 and MON-17 (`seedProduct(key)`, `@global-state`, an INC-1136 annotation); LG-33
  (`rankTruth` keyed); IB-1, IB-2, LG-32 and NCQ-E2E-3 (`@global-state`, each with an INC-1136
  annotation). Their assertions are unchanged.

Red-first and controls:

- G38's positive control for B2 (ruling 1 item 1), run once locally and restored. Inside LG-33's
  window, a scratch level (`e2e_g38_<ts>`, kind `level`, disabled, sort −1) was inserted, `rankTruth`
  read, and the row removed in a `finally`. Through `level_ranks_rebuild()` this moved every real
  level's rank (0 → 1, 1 → 2, 2 → 3), and LG-33 failed (desktop-1280, two workers, 0 retries). The
  file was restored from `/tmp/ethio-scratch/ci-time/legal-certify.spec.ts.keep`; `cmp` reports it
  identical. Why a scratch row and not a real level edited by hand is in §10.
- CF-LANES-4's red over the real specs: above (§4).

The gate (STEP 7, on 70dc4f626):

- `bun run typecheck`: green (`tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`).
- `bun run lint`: green (`eslint . --max-warnings 0`).
- `bunx vitest run scripts --maxWorkers=2`: Test Files 118 passed (118); Tests 609 passed | 1
  skipped (610). Touched files alone: `lanes.test.ts` 4 passed; `agents-lines.test.ts` 3 passed.
- `bun run checks`, fast line: `checks (fast): 26 PASS · 0 FAIL · 403s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`.
  Last line: `checks: 35 PASS · 0 FAIL · 25 NOT RUN · 464s`.
  The NOT RUNs are named in the runner's own words:
  - scope › Decide whether the lanes run, and Index the code tree the lanes prove: they exist only
    in a GitHub run; CF-DOCS-1…11 are their local proof.
  - build-and-check › Workflow lint (actionlint, pinned), and secrets-scan › Secrets scan (gitleaks,
    pinned): linux/x64 binaries on darwin/arm64.
  - The install steps of build-and-check, component-tests and bundle-budget: the dependencies are
    already installed.
  - dependency-audit › Install, Audit: the advisory service is not reachable.
  - e2e-preflight's four steps: they need the staging credentials.
  - e2e's six merge steps: GitHub artifacts.
  - promote's four steps: only CI promotes.
  - semgrep › Upload SARIF, and its warning: GitHub only.
- The browser check, `bun run e2e:local -- e2e/admin-monetisation.spec.ts e2e/legal-certify.spec.ts e2e/i18n-bundle.spec.ts e2e/legal-doors.spec.ts e2e/name-check-queue.spec.ts --grep "MON-1[67]\b|LG-3[23]\b|IB-[12]\b|NCQ-E2E-3\b" --project mobile-360 --project desktop-1280 --retries 0`
  at E2E_WORKERS=2, against ethio-staging: `Running 14 tests using 2 workers` · `13 passed (1.2m)` ·
  `1 skipped`. The skip is NCQ-E2E-3 on mobile-360, by its own `test.skip` (J6: the job's one pause
  row). `[ssr-error]` lines: 0. No spec file ran whole.
- `actionlint -shellcheck= -pyflakes=`: NOT RUN — not on this machine's PATH, and the checks
  runner's pinned binary is linux/x64. CI's Workflow lint is the proof.
- `bun scripts/brief/check-go.ts docs/governance/briefs/ci-time.md --at 4dd6cad55`, its output:

```text
[check-go] at 4dd6cad551e1909184ada5b6e3afe99279881f9a (--at 4dd6cad55): the tree laws and every other COUNT read its snapshot /var/folders/xb/_xhx_v4j7gl2v3y34657ymq00000gn/T/check-go-at-rjSIEK; a COUNT that is a git read runs in /Users/tesfayemackbookpro/ethio-marketplace; the allowlist and the template are read from /Users/tesfayemackbookpro/ethio-marketplace
CF-BRIEF-20 docs/governance/briefs/ci-time.md:17 cites scripts/conformance/briefs-allowlist.txt; no test it cites reads it by name (the tree's: scripts/conformance/briefs.test.ts)
[check-go] 1 finding(s)
```

J-audit (e2e/** changed):
- J1: `seedProduct`'s keys keep the `e2e_` scratch form.
- J3: no real row is edited; B1 reads the top real sort and writes after it; the G38 control used a
  scratch row.
- J6: NCQ-E2E-3 stays desktop-1280 only.
- J8: six tests move to the serial lane.
- No `.first()`, no `waitForTimeout`, no `test.only` was added (grep over the added lines).

The run's times, before and after (DEC-378 a's judge, from the run's creation to its last job's end):

| Measure | Base: run 43463527584 (dev, one worker) | First run 43511822492 (5a969c237, one worker) | Judged run 43528965654 (70dc4f626, two workers) |
| --- | --- | --- | --- |
| push-to-result (creation → last job's end) | 1137 s (18.95 min) | 1044 s (17.4 min) | **895 s (14.9 min)**: within 957 |
| the slowest lane (job length, API) | lane 15, 927 s | lane 6, 882 s (ends at +1003) | lane 3, 702 s. Last to end: lane 9 at +856 (wait 212, length 620) |
| start-up before the first test (JOB − TEST), lanes 1–16 | 157–205 s, median 185 | 152–205 s, median 176 | 142–210 s, median 175 |
| the serial lane (smoke) | job 211 s | job 284 s; tests 125 s (20 tests) | job 489 s (JOB clock 468); tests 266 s (32 tests: 27 passed, 5 skipped) |
| Component tests | — | 417 s | 255 s |

One median lane's clocks, from the step times. Base: lane 12 of 43463527584 (stop-1). Judged run:
lane 10 of 43528965654, the median of lanes 1–16 by job length (545 s).

| Clock | Lane 12, 43463527584 (one worker) | Lane 10, 43528965654 (two workers) |
| --- | --- | --- |
| set-up, ports, checkout | 3 + 0 + 2 | 2 + 0 + 2 |
| install (bun, cache, install) | 7 | 4 |
| CLI | 7 | 6 |
| working copy, certificate | 0 + 1 | 0 + 0 |
| restore + load the images | 7 + 66 | 6 + 71 |
| start the backend and apply the migrations | 63 | 65 |
| build the E2E app | 9 | 10 |
| browser (cache, system libraries, Chromium) | 20 | 20 (4 + 15 + 1) |
| tests (Run proof lane) | 657 | 361 |
| evidence, uploads, dispose | ~13 | ~11 |
| job | 861 (API) / 840 (JOB clock) | 545 (JOB clock); start-up 184 |

Every job's wait for a runner (created → started):
- Base 43463527584: lanes 11, repeat, 15 and 16 waited 66, 112, 118 and 151 s; the others 3–16 s.
- First run 43511822492: smoke 340, lane 8 147, lane 6 90, email 76, repeat 55, lanes 15 and 16 21
  and 20; the rest 2–11 s.
- Judged run 43528965654: lane 9 212, lane 7 146, lane 12 72, lane 15 69, webkit 17, lane 16 17,
  lane 6 15, lane 14 12; every other job (the other lanes, Component tests, Semgrep, Build, the
  guards, Backend images, the summary, the E2E verdict) 2–4 s.

The waits still fall on the lanes that start last (the limit of twenty concurrent jobs, stop-1).
Lane 9 waited 212 s and ended last.

DEC-378 (a)'s judge over this run (1 of 5): every lane 0 failed and 0 flaky (2,674 passed, 360
skipped, 3,034 in total; the lane's `local-backend-proof.md`). No test failed, or passed only on a
retry, for any cause.

## 6. K2 — siblings that bypass the mechanism

- `scripts/e2e-failure-report.ts:503` (the `@global-state` specs "run in the serial nightly ONLY") and
  `:1726` (`Quarantined (@global-state, INC-117, non-gating)`): stale since the app-fixes turn moved
  `@global-state` into the gating serial lane. Outside SCOPE, so not touched (§13).
- The shared-value mechanism has no bypass: the CF-LANES-4 census over `e2e/` on the real tree gives
  no finding outside the six allowlisted units (§7).
- Grep for a second worker knob (`rg -n "workers" .github/workflows`): `nightly-e2e.yml` and
  `flake-check.yml` set their own counts for their own purposes (DEC-184, the nightly). They are not
  the lanes' knob and stay.

## 7. Allowlists and guards

| Allowlist | Before → after | New lines |
| --- | --- | --- |
| `scripts/conformance/briefs-allowlist.txt` | 0 → 2 | the ruling's two CF-BRIEF-20 lines (below) |
| `scripts/conformance/shared-values-allowlist.txt` (new) | 0 → 6 | below |
| `scripts/conformance/agents-lines-allowlist.txt` | 2 → 2 | `AGENTS.md (10853)` → `AGENTS.md (10888)`, its reason extended |
| `scripts/conformance/shared-value-tables.txt` (new manifest) | 0 → 3 shared + 7 "read, not shared" | `listing_packages`, `languages`, `job_pauses` |

`briefs-allowlist.txt`, both lines until DEC-378, reason "expected output of CF-BRIEF-20, a law this
turn adds: the ruling names the reader by its law (CF-LANES-4), not by its path":
- `docs/governance/briefs/ci-time-ruling-1.md:17 cites scripts/conformance/shared-value-tables.txt; …`
- `docs/governance/briefs/ci-time-ruling-1.md:17 cites scripts/conformance/shared-values-allowlist.txt; …`

`shared-values-allowlist.txt`, every line `| INC-1136` as its until, each with its reason in the file:
- `e2e/admin-translations-governance.spec.ts::TR-20m::languages`
- `e2e/admin-translations-governance.spec.ts::TR-31::languages`
- `e2e/legal-admin.spec.ts::LGA-22::languages`
- `e2e/legal-admin.spec.ts::afterEach::languages`
- `e2e/legal-doors.spec.ts::afterEach::languages`
- `e2e/my-listings-promote.spec.ts::LVP-5::listing_packages`

Each was read at its site in the census as no instance: fence or non-public languages, a scratch reach
kept above every real reach.

Guards and their self-tests run: CF-LANES-3 and CF-LANES-4 (planted, above), CF-BRIEF-19 and
CF-BRIEF-20, CF-DOCS-11, CF-RULES-1, CF-REDACT-1, AGL-2. `wired.test.ts` names CF-LANES-4 (its import
of `./shared-values` and both list paths) and CF-BRIEF-19 and CF-BRIEF-20 in `briefLaws`.

## 8. Strings

None (FLAGS: no-new-string; no file under `src/i18n/` changes).

## 9. Migrations

None (FLAGS: no-migration; no file under `supabase/` changes).

## 10. Departures

- The stop and the ruling: one planned stop (STEP 4, `docs/governance/reports/ci-time.stop-1.md`);
  ruling 1 was saved by scripted copy, bare, as `docs/governance/briefs/ci-time-ruling-1.md`, with sha256
  c8376ec1626eadceecf954c50237fad8dce4040eba53066cde842ee1b0962f9a, equal to the operator's line (b83ffab71).
- The lane's base: `4dd6cad55` (#39's merge), not the brief's `3e3a51a89` (stop-1, premises).
- Part C builds nothing (ruling 1 item 4). The table, as it stands (median split lane: lane 12, run
  43463527584, one worker):

| Cut | Saving (measured basis) | Verdict |
| --- | --- | --- |
| C1 build the E2E app once, hand `dist` to the lanes | 7–12 s a lane | refused (clause 2) |
| C2 load the images once | 64–66 s a lane, but each machine must load its own | refused (clause 2) |
| C3 browser libraries / Chromium once | 12–32 s a lane, per-machine | refused (clause 2) |
| C4 bun install / CLI install once | 5–8 s each, already cached | refused (clause 2) |
| C5 overlap the image load with the other start-up steps | 25–45 s a lane | refused (clause 1); a roadmap line |
| C6 Semgrep, Build, Component tests after the lanes | net negative in every form `ci.yml` allows (+4 to +7 min) | refused (clause 2) |
| C7 twelve split lanes instead of sixteen | removes the waits (66–151 s, 43463527584; up to 340 s, 43511822492) | refused (clause 1); a roadmap line |
| C8 Component tests split | ~3 min of every proven-tree run (408 s of vitest) | refused (clause 1); a roadmap line |

- A new instance (ruling 1 item 1's last line), handled by the brief's law without a stop: MON-16
  and MON-17 read the order strip, which names the first unpriced pair over every product and market
  switched on. Other tests' own rows (their scratch products and markets) change it, and that value
  is the thing under test. Both tests keep B1's placement fix and also carry `@global-state`, each
  with its INC-1136 annotation.
- G38's control (ruling 1 item 1, B2): the ruling says "a real level's rank moved by hand". Rule 50
  and J3 forbid writing a real row on ethio-staging, so the control moved every real level's rank by
  a scratch level placed before them (sort −1, disabled), which `level_ranks_rebuild()` ranks first.
  The effect is the one the ruling names (real ranks moved inside the window), and LG-33 failed on it
  (§5).
- Ruling 1 item 7 — allowlisting the `--at 4dd6cad55` CF-BRIEF-20 finding cannot be done as worded.
  `check-go` does not filter its output by the allowlist; the allowlist is applied only by the in-force
  test (`briefs.test.ts`), which judges the working tree. On that tree the finding does not occur
  (Part A's `scripts/ci/docs-only.test.ts`, which the brief cites, reads the allowlist by name), so a
  line keyed to it would be stale and fail. The finding is named in §11 and §5 instead. The two
  allowlist lines added are the same law's expected output on the ruling (item 7's form), on the
  working tree.
- CF-BRIEF-19 makes no finding against this brief or its ruling (the in-force test, green), so no
  allowlist line was needed for it (item 5).
- DECIDE-AND-NAME:
  - Root fix or serial tag: B1 and B2 root, B3–B5 tag, MON-16/17 both (above).
  - How a write is recognised (CF-LANES-4): a `.from("<t>")…insert|update|upsert|delete(` chain or an
    `.rpc("<door>"` call for a manifest table or door, read through the TypeScript AST (kit
    `visitTs`).
  - The unit is the enclosing test; else the nearest named function, followed into its callers in
    its own file and in the files that import it by relative path; else the hook. A site passes when
    its test or describe carries `@global-state` (in its options or its title), when it sits in a
    helper the table's manifest line sanctions, or when an allowlist line
    `<file>::<test id|function|hook>::<table>` names it.
  - The helper is the unit: yes.
  - The rule files' sentences: Part A (33fd4c89f).
  - The brief allowlist set aside: yes (DEC-378 b).
  - The JWT rule's end: `(?![A-Za-z0-9_-])` (both readers accept the lookahead).
  - The guide lines: `docs/features/e2e-harness.md` (the lanes paragraph, the INC-1136 paragraph, the
    INC-817 line) and `docs/features/ci-local-backend.md` (the speed turn's section ends with the
    return to two workers).
  - CF-BRIEF-19's recognition:
    - an id counts when a RECORDS-section line is headed by it (`INC-n`, `DEC-n`, `- DEC-n`), or it
      follows "fixes", "changes", "amends", "supersedes" or "revises";
    - SCOPE is the code spans of the SCOPE paragraph outside its "read only" and "never" sentences
      (a trailing `/` or a `*` grants a prefix);
    - "why not" is a line naming the path with "not in SCOPE", "outside SCOPE" or "out of scope";
    - a ruling with no SCOPE of its own is not judged.
- `scripts/conformance/kit.ts`: `visitTs` gained an optional `text` parameter, so CF-LANES-4 parses
  through the kit (CF-ADOPT-1) and is not a second parser.
- The ceilings: no file under `src/` changes, so no first-download ceiling moves (no ceilings commit).
- Scratch copies, the operator's to remove: `/tmp/ethio-scratch/ci-time/` (the runs' job tables, the
  red-check script, the kept spec, the checks, e2e and review logs).

## 11. CI

- The base: dev `4dd6cad55`, ci-evidence `docs/tracking/ci-status.md` at the start (two-step SHA check
  in stop-1): Commit `4dd6cad551e1909184ada5b6e3afe99279881f9a`, Conclusion SUCCESS, Completed
  2026-11-13T20:11:30Z, run 43498096790. No red of an earlier turn.
- This pull request's first run, 5a969c237 (run 43511822492), read again before the push (ruling 1
  item 9): the lane's ci-evidence `branches/cursor/ci-time/ci-status.md` reads Commit
  `5a969c237606eafb400edb8bee9ad7639e32ecda`, Conclusion SUCCESS, Completed 2026-11-13T21:51:24Z; `gh pr
  checks 40` showed 43 pass, 1 skipping. No red, so nothing to fix in Part B's first commit.
- The judged run, 70dc4f626: run 43528965654 on 70dc4f626 (its lanes ran on the merge ref `2f4600224`): SUCCESS, completed 2026-11-13T23:56:21Z, attempt 1. 43 checks pass and 1 is skipping (Promote to main, which a pull request never runs). Lanes: 2,674 passed, 0 failed, 0 flaky, 360 skipped. The repeat lane: "Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/name-check-queue.spec.ts (3 tests); Repeat: each 2 on both projects; 57 tests selected, 32 repeated; budget 643 s". No red, no re-run, and no further code commit (the TOLERANCES had nothing to handle).
- check-go's output against the brief (STEP 7): the one CF-BRIEF-20 finding `--at 4dd6cad55` (§5),
  the expected output of a law this turn adds (ruling 1 item 7). It is not allowlisted (§10). On the
  lane's own tree the two findings stop-1 named (CF-BRIEF-6, CF-BRIEF-7) come from Part A's edits;
  nothing is done for them (item 7).

## 12. Limits

- actionlint and gitleaks did not run locally (linux/x64 binaries; darwin/arm64 here). CI's Workflow
  lint and Secrets scan are the proof.
- dependency-audit and e2e-preflight did not run locally (no advisory service; no staging
  credentials in the runner). CI judges.
- The browser check ran only the changed ids (14 tests). CI's lanes and the repeat lane are the full
  proof.
- The account's concurrent-job limit is read from the jobs' times (stop-1, environments), not from the
  vendor's page.

## 13. Findings

- `scripts/e2e-failure-report.ts:501-508` and `:1726` still describe `@global-state` as "serial nightly
  ONLY" and as quarantined "non-gating". Since the app-fixes turn the serial lane runs them on every
  push and the lanes' result gates. The quarantine split only feeds the summary's verdict file.
  Outside SCOPE; for the e2e leftovers turn.
- The job name `Scope (docs-only push, DEC-365)` (`ci.yml:52`) is read by
  `.github/workflows/ci-status-report.yml:53` and the fixtures `scripts/fixtures/docs-only/jobs-*.json`.
  It now means a proven tree; a rename moves all three (stop-1).
- The roadmap's three open "CI turn —" lines (ruling 1 item 6), read at their files on 70dc4f626:
  - `roadmap.md:9`, one redaction module: DONE by housekeeping turn 3 (071dbfefc, "the lanes' three
    mechanisms once"). `local-backend-proof.yml` :456-461 and :846-855 import `redact` from
    `scripts/ci/redact.py`; no inline `redact()` is left.
  - `roadmap.md:10`, the CLI pin read once: DONE by housekeeping turn 3 (071dbfefc). Both
    `setup-cli` steps read `version: ${{ env.SUPABASE_CLI_VERSION }}` (:65, :332), and the evidence's
    line reads `env['SUPABASE_CLI_VERSION']` (:870).
  - `roadmap.md:11`, the backend-images job's derived config: DONE by housekeeping turn 3
    (071dbfefc). The derivation is one script, `scripts/ci/backend-config.py`, part of the images'
    key (:42).
  - All three lines stand unticked (a records-turn tick, §14).
- No security hole was met.

## 14. Records

DEC — DEC-378 (the supervisor's decision under G17 and G22, put to the operator in the reply that carried this brief; his paste approves it) — (a) the lanes the plan splits run two workers, after every test that moves a shared value was fixed at its root or moved to the serial lane (INC-1136). Frozen judge: over this turn's judged run and the next four full runs of ci.yml on any ref, a test that fails, or passes only on a retry, for a cause in another test's rows on the same backend returns `E2E_WORKERS` to one in the next commit, with its INC, and no further exception until a new decision; none in five → adopted. And the judged run, from the run's creation to its last job's end: 957 seconds or less against 1,137 (run 43463527584), or the knob returns to one as not worth its risk [the judged run 43528965654: 895 seconds (14.9 minutes), so the knob stays at two; every lane 0 failed and 0 flaky — run 1 of the 5]. (b) The brief allowlist is set aside in the proven-tree comparison [yes — its one CI reader runs in Component tests, which a proven tree still runs]. (c) A cut to a run's fixed time is built only by the four-clause rule of this brief and kept only when it saved at least half its plan [no cut met the rule; three are kept as roadmap lines with their measurements].

INC — INC-1136 — global state in lane tests (MON-16, MON-17 → every level's rank; ATR-1): [B1 MON-16, MON-17 — `listing_packages` (kind level) → `level_ranks` through `level_ranks_rebuild()` — every real level's rank +1 — root fix: `seedProduct` places the scratch level after every real level; met while building, the two read the order strip over every product and market on, the value under test, so they also carry `@global-state`. B2 LG-33 — `level_ranks` (the row set) — other tests' scratch levels added and removed in its window — root fix, keyed: the snapshot keeps every real level and leaves out other tests' scratch rows (LG-33 makes none); a scratch level ranked before the real ones in its window turns it red. B3 IB-1, IB-2 — `languages` (`enabled_public`) — the public language list — serial tag. B4 LG-32 — `languages` — the public language list — serial tag. B5 NCQ-E2E-3 — `job_pauses` — the name re-check job's one pause — serial tag]; the manifest and its guard; the CI turn; [FIXED a28cf954d].

INC — INC-1138 — the redaction's JWT rule ended in a word boundary and left a token's last `-` unmasked (CF-REDACT-1 red about once in sixty-four runs); fix: the rule ends where no token character follows; the CI turn; FIXED [278eddf40].

slip — The brief's PREVENTION (3) is corrected in the record: 226 seconds is the slowest lane's time before its first test, the median lane's is 185; the waits are 66 to 151 seconds on the last lanes; the cause is the limit of twenty concurrent jobs, read from the jobs' times.

DEC — S604's rule — the executor's self-review runs before the push; a ceiling's change lands with its cause or in one commit before the push; a task-saved commit is not pushed alone (rule 00, the GO template; CF-RULES-1).

register row — the docs-only row gains the brief allowlist; the pre-push gate's row gains the order.

register row — the lanes row gains "two workers on the split lanes (DEC-378)"; a new row — "a scratch row moves no shared value" → the manifest and the serial tag → the census → exceptions: its allowlist.

register row — the redaction row and the GO checker's row gain these lines.

changelog — 2026-11-1x the CI turn (Opus 5.5): a push that cannot change the verdict runs no browser lane; the self-review before the push; no scratch row moves a shared value, and the split lanes run two workers (DEC-378); the JWT rule's end; the GO checker's list law.

roadmap — (the before-launch list, tests and CI) The image load overlapped with the other start-up steps inside a lane (C5; a background `docker load` beside install, CLI, browser and build): 25–45 s a lane, measured on lanes 1, 2, 10, 11 and 12 of run 43463527584.

roadmap — (the before-launch list, tests and CI) Component tests split (C8): about 3 minutes of every proven-tree run (408 s of vitest, run 43498096790).

roadmap — (the decision "CI's cost once the repository is private", read after DEC-378 (a)'s five runs) Twelve split lanes instead of sixteen (C7): removes the waits for a runner — 66–151 s on the last lanes of run 43463527584, up to 340 s (the smoke lane) in run 43511822492.

roadmap — tick `roadmap.md:9`, `:10` and `:11` ("CI turn —" one redaction module, the CLI pin once, the backend-images job's derived config): done by housekeeping turn 3 (071dbfefc), read at their files in this report's §13.
