STOP — housekeeping-3 STEP 1: the census (PLAN FIRST; nothing edited beyond STEP 0)
DONE: STEP 0 (commit 157f49f17 `housekeeping-3: task saved`), STEP 1 (this census)
LEFT: parts A, B, C, D, E, F; STEPS 2 → 10
CI: the lane head's run, read at the raw ci-evidence address before STEP 0's commit:
# CI Status (auto-generated — do not edit by hand)

- Commit: `e295dc131c6c65de0ee449894edbeee4701f6fb6` (short `e295dc1`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-11T18:26:29Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43074440038
FILES: this turn's, `git diff --name-only e295dc131` (the lane head this turn began from):
docs/governance/briefs/housekeeping-3.md
roadmap.md
docs/governance/reports/housekeeping-3.stop-1.md (this file)
(`git diff --name-only 2b11a9d29` prints 255 paths: the bundle's turns 1, 1b, lockfile and 2 on this
lane, plus the three above; `git merge-base origin/dev HEAD` = 2b11a9d29, so the base is exact.)

## STEP 0 — what was run and what it printed

- Lane: `git fetch origin && git switch cursor/housekeeping && git merge --ff-only
  origin/cursor/housekeeping` → "Already up to date"; head e295dc131c6c65de0ee449894edbeee4701f6fb6;
  `git status --short` empty. `origin/dev` = 2b11a9d29 = the brief's base (no drift).
- The brief: the folder's `housekeeping-3.md` sha256
  75f5d22e351739089e5eeb5acce71c2a0c9ab316de661b56e59861c754d8f33e = the stated value; the text
  between BEGIN BRIEF and END BRIEF in the chat's task file, extracted by `awk`, is byte-identical
  (`cmp`). Saved by script inside one four-backtick fence; the fenced text's sha256 re-measured equal.
- Roadmap line 3: written by script as dictated; `bunx prettier --check roadmap.md` → "All matched
  files use Prettier code style!".
- `scripts/conformance/briefs-allowlist.txt`: it holds no entry lines (three comment lines only), so
  nothing was removed.
- `bun scripts/brief/check-go.ts docs/governance/briefs/housekeeping-3.md` → exactly
  `[check-go] no finding` (exit 0). The brief expected lines naming this turn's two outputs and the
  ids it calls free; the checker printed none (premise P1 below).
- `bunx vitest run scripts/conformance/briefs.test.ts` → 10 passed.
- CI read (rule 40): `ci-status.md` names e295dc131 SUCCESS, run 43074440038 (the lane's head, as the
  brief expects). In the same run `e2e-last-failure.md` ("last E2E run 43074440038 passed") and
  `local-backend-proof.md` name commit 48b450def — the pull request's merge commit, the SHA the
  lanes test on a `pull_request` run. `guards-last-failure.md`: no failed job. No red to fix first.

## CENSUS-ITEM consumers

Concern 1 (an outside package fetch from apt):
- `.github/workflows/local-backend-proof.yml:741`, `flake-check.yml:89`, `guard-proof.yml:51`,
  `nightly-e2e.yml:109`, `nightly-e2e.yml:372` — `bash scripts/ci/with-deadline.sh 1500 1 -- bunx
  playwright install-deps chromium`, one try each (the brief's five; lines exact).
- `playwright install --with-deps`: none in any workflow (only in CF-CID-2's planted text).
- `apt-get`: `local-backend-proof.yml:366` (`apt-get update`, 2 tries) and `:367` (`apt-get install
  -y libnss3-tools`, 1 try), inside "Make the temporary backend's certificate", reached only when
  `command -v certutil` fails. In the last 40 lane-proof records on ci-evidence every one says
  `certutil: present`: the install branch never ran.

Concern 2 (the lanes' results, logs and step files):
- Writers (local-backend-proof.yml): `step-failures.mjs` via "Name failed steps" `:786`
  (`local-backend-failure.txt`, raw); "Write lane evidence" `:794` (the fragment
  `local-backend-proof-<lane>.md` with the redacted "- Step failure:" lines at `:851`; the redacted
  `<lane>.log`; `local-backend-start-failure.txt` and `local-backend-db-error.txt` on a failed start).
- Uploads: `local-proof-<lane>` `:935` (results.json, the fragment, the raw lane log, the anon
  functions tsv); `e2e-results-<lane>` `:950`; `e2e-log-<lane>` `:961` (`<lane>.log`,
  `local-backend-start-failure.txt`, `local-backend-db-error.txt`); `e2e-context-<lane>` `:975`.
  The raw `local-backend-failure.txt` is uploaded nowhere.
- Readers: ci.yml's verdict job `e2e` `:528` downloads `e2e-results-*` `:556`, `e2e-log-*` `:565`,
  `e2e-context-*` `:579` and runs the reporter `:642`/`:648`/`:656`; local-backend-proof.yml's
  `summary` job `:994` downloads `local-proof-*` `:1013`, `e2e-results-*` `:1026`, `e2e-log-*`
  `:1034`, `e2e-context-*` `:1042`, runs the reporter `:1044 → :1063` (out:
  `docs/tracking/local-backend-last-failure.md`) and merges the fragments `:1064 → :1154`.
- The reporter's source list: `E2E_EXPECTED_SOURCES: smoke,email,1,…,16,repeat?` at ci.yml `:628`
  and local-backend-proof.yml `:1050`; read at `scripts/e2e-failure-report.ts:2663`; each source's
  log `:2683` and INC-973's `local-backend-start-failure.txt` `:2686`.
- The status reporter reads no lane: `PLAYWRIGHT_SOURCES = /^E2E (email|lanes)/`
  (ci-status-report.yml `:81`) leaves them to the E2E reporter.

Concern 3 (every `publish-evidence.sh` call, and the ref each can read):
- `ci-status-report.yml:213` (ci-status.md, guards-last-failure.md) — `workflow_run`;
  `context.payload.workflow_run.head_branch`.
- `ci.yml:667` (e2e-last-failure.md, flake-ledger.md through `PUBLISH_EVIDENCE_PREPARE` `:666`) —
  `push`/`pull_request`; `github.head_ref || github.ref_name`.
- `local-backend-proof.yml:1166` (local-backend-proof.md, local-backend-last-failure.md) —
  `workflow_call` from ci.yml (the caller's `github` context) or `workflow_dispatch`.
- `flake-check.yml:189` (flake-check-status.md, flake-check-last-failure.md) — `workflow_dispatch`.
- `nightly-e2e.yml:287` (nightly-status.md, nightly-last-failure.md) — `schedule` (dev) or dispatch.
- `feed-bench.yml:67` (feed-bench-status.md) — `schedule` (dev) or dispatch.
- `guard-proof.yml` publishes nothing.

Concern 4 (jobs that need the lanes or the budget):
- `e2e` `needs: [e2e-lanes]`, `if: always()` (ci.yml `:533`/`:534`); `promote` `needs` sixteen jobs
  (`:699 → :717`) with `if: github.ref == 'refs/heads/dev' && success()` `:718`. No other job names
  `e2e-lanes` or `bundle-budget` (`bundle-budget` `:336` is needed by `promote` only).
- `github.event.before`: on `push` (dev, including the operator's merge commit) the previous head of
  dev, all zeros when a branch is created; on `pull_request` `synchronize` the pull request's
  previous head SHA; on `opened`/`reopened` absent (GitHub's webhook payloads — documented, not
  measured here). On `pull_request`, `github.sha` is the merge commit `refs/pull/N/merge`.
- ci.yml already passes `GITHUB_EVENT_BEFORE` to the deletions guard (`:58`).

Concern 5:
- `def redact`: two, `local-backend-proof.yml:806` and `:1070`, byte-identical (`diff`). By
  definition a third: the inline `re.sub` chain at `:446 → :451` (the status step's error: JWT, sb
  keys, e-mail, Access/Secret Key cells, long hex; no account id, no key values, no SHA exception,
  then a 300-character cut) — the roadmap's "three" counted it.
- `2.120.0` in the workflow: `:13` (the pin), `:65` and `:319` (`supabase/setup-cli` `version:`),
  `:835` (the evidence literal). Elsewhere: `scripts/db-proof.sh:67 → :70` (the checksum table's
  keys), `docs/features/ci-local-backend.md:5`, `docs/features/e2e-harness.md:574`,
  `scripts/ci/start-failure-excerpt.mjs:8` (a comment), `scripts/conformance/outbound-calls-allowlist.txt:3`
  (an `until` field).
- Rewrites of `local-backend-config.toml`: the images job's `:75 → :81` (TLS and the hook off) is the
  one rewrite; `:42` hashes the file for the cache key; `prepare-local-backend.sh:153` copies it
  unchanged; `db-proof.sh:30` names it for the same preparation.

## CENSUS-ITEM definition

- Concern 1 by definition (a step that fetches packages from an outside archive): the five
  `install-deps` lines and the certificate tools' `apt-get` (the GO's set). Outside fetches of other
  kinds already have their own mechanism and are not this concern: `bun install` (with-deadline, 2
  tries), `bunx playwright install chromium` (a download, 2 tries), `pip install` (ci.yml's semgrep
  job, via with-deadline), the setup-cli and setup-bun actions (step deadlines), the backend images
  (DEC-309, `pull-images.sh`). Difference: none beyond the GO.
- Concern 2 by definition (a reader of a lane's evidence): the GO named ci.yml's verdict job; the
  lanes' own `summary` job is a second reader (it runs the same reporter over the same artifacts and
  merges the fragments). Difference: one consumer more (the summary job).
- Concern 3 by definition (a writer to ci-evidence): the six calls (the GO's set) and, inside ci.yml's
  call, the `PUBLISH_EVIDENCE_PREPARE` hook, which writes the flake ledger straight into the evidence
  worktree (`$EVIDENCE_DIR/docs/tracking/flake-ledger.md`) — outside the copy step a per-ref mapping
  changes, so the ledger stays one file with no extra code. Difference: none in callers.
- Concern 4 by definition (a job whose run or result depends on the lanes or the budget): `e2e-lanes`,
  `bundle-budget`, `e2e`, `promote`, and the status reporter's job table (the GO's set). Difference:
  none.
- Concern 5 by definition: redactions — three (the GO's grep found two); pins — the three restated
  `2.120.0` in the workflow (the GO's set; the db-proof checksum keys are a table keyed by version,
  held to the pin by CF-DBP-2/4); config derivations — one (the GO's).

## CENSUS-ITEM tests

- `scripts/conformance/ci-deadlines.test.ts`: CF-CID-1 (six rules: a job's timeout; a step using an
  action declares a timeout; a step reaching outside declares a timeout; an install runs through
  with-deadline; a package install has one try; the backend starts after its ports are reserved),
  CF-CID-2 (a planted workflow, an exact list of eight findings asserted with `toBe`), CF-CID-3/4
  (ports). Its reader sees only the text of a `run:` line: a line that calls a script
  (`bash scripts/ci/install-browser-deps.sh`) matches neither `OUTSIDE` nor `INSTALL`, so nothing
  inside the script is seen, and today such a step would owe no step deadline.
- `scripts/conformance/ci-images.test.ts`: CF-CI-IMG-1 → 4 (the start needs backend-images, loads
  first, starts once).
- `scripts/conformance/workflow-reader.ts`: jobs and steps by indentation; a job's own `if:` text is
  not exposed (a promote-condition rule needs it).
- `scripts/ci/lane-failure-evidence.test.ts`: LFE-1 (asserts the heredoc text
  `'- Step failure:', *[redact(line) for line in failure_lines]`), LFE-2 (runs "Write proof summary
  and notice"'s heredoc with `python3 -c` from a temporary directory, env PATH/GITHUB_* only — an
  import of `scripts/ci/redact.py` needs a path the test sets).
- `scripts/ci/step-failures.test.ts`: SFE-1 (every lane step has a unique id and run steps use the
  keeping shell — any step this turn adds to the lane job owes an id), SFE-2, SFE-3.
- `scripts/ci/with-deadline.test.ts`: WDL-1 → 4. `scripts/ci/start-failure-excerpt.test.ts`: SXC-1 →
  6 (SXC-4: no workflow cuts a failure log inline). `scripts/ci/turn-checks.test.ts`: TCK-1 → 10,
  TC-E1 → E5 (TCK-3 is R3's NOT RUN case).
- The reporter's in-file self-test (`SELF_TEST=1`, ci.yml `:642` only): its checks are keyed by
  incident or decision — INC-429, INC-495, INC-589, INC-194, INC-973, DEC-028, DEC-030, DEC-059,
  DEC-078, DEC-083/084 (R1b), DEC-087 (T1 → T8), DEC-177, DEC-340 — not a numeric series. The new
  checks take `INC-1101` (free: no `INC-1101` and no `INFRA` anywhere in scripts, src, e2e or
  .github). Fixtures it reads: `scripts/fixtures/e2e-results-*.json`, `e2e-log-boot-crash.log.txt`,
  `e2e-context-*`, `local-backend-start-failure.dec340.txt`, `lane-smoke-step-failure.txt` (LFE-2's).
- `scripts/publish-evidence.selftest.sh` — the publisher's existing self-test (a temporary bare repo),
  run by `scripts/shell-guards.test.ts:78`.
- `scripts/conformance/db-proof.test.ts` — CF-DBP-1 → 7; CF-DBP-2/4 hold `SUPABASE_CLI_VERSION` to
  db-proof.sh's table.
- `scripts/check-promote-needs.sh` (DEC-137) with its planted `scripts/fixtures/ci-promote-needs-bad.yml`,
  run by ci.yml `:72`.
- `scripts/conformance/wired.test.ts` CF-WIRED-1.
- Free ids confirmed: `CF-INSTALL`, `CF-PUBLISH`, `CF-DOCS`, `CF-REDACT` — no hit in scripts, src, e2e,
  .github.

## CENSUS-ITEM lists

- CF-CID-2's exact `toBe` list: its "kept" planted step (`bunx playwright install-deps chromium` at
  the planted file's line 30) becomes a breach under the seventh rule — the list gains that line and
  the planted file gains the kept form `bash scripts/ci/install-browser-deps.sh`.
- `scripts/check-promote-needs.sh`: every ci.yml job must be in `promote.needs` — the new `scope` job
  joins it.
- `scripts/ci/turn-checks-allowlist.txt`: `bun run checks` runs every named ci.yml step; the `scope`
  job reads the event payload and the Actions API, so it takes `scope › * | <reason> | <until>`
  (`e2e › *` and `promote › *` are already there).
- `scripts/conformance/wired.test.ts`: a new `.sh` (the install script) must be named by a workflow,
  a package script or a test (the workflows name it); each new test file gets CF-WIRED-1's
  `toContain("<last id>")` line, as every guard turn has added.
- The reporter's sources: `E2E_EXPECTED_SOURCES` (ci.yml `:628`, local-backend-proof.yml `:1050`) —
  unchanged; the lane's step-id list for "before any test" is new (one list, Part B).
- The status reporter's job table is read from the API (no hand list).
- The register: seven rows in §14 (records turn).

## CENSUS-ITEM old-file-readers

Paths named by text (`docs/tracking/{ci-status,e2e-last-failure,guards-last-failure,
local-backend-proof,local-backend-last-failure,flake-ledger}.md`), file:count: ci.yml 9,
local-backend-proof.yml 6, ci-status-report.yml 6, `.cursor/rules/40-ci-evidence.mdc` 4,
`scripts/publish-evidence.selftest.sh` 13, `scripts/publish-evidence.sh` 4,
`scripts/e2e-failure-report.ts` 5, `scripts/ci/lane-failure-evidence.test.ts` 2,
`scripts/ci/step-failures.mjs` 1, `scripts/conformance/executor-hooks.test.ts` 2 (`:453`, `:631`,
exact command strings), `docs/features/ci-status-reporter.md` 9, `ci-guards.md` 6,
`ci-local-backend.md` 3, `e2e-harness.md` 2, `nightly-e2e.md` 1. By file name only: `AGENTS.md:24`,
`:25`; `.claude/` (hooks `header.ts`, `session-setup.ts`, `land.ts`; rules `00`, `40`, `60`; skills
`start-turn`, `turn-report`). Raw ci-evidence addresses: 294 files under `docs/governance/briefs/`
(records; never rewritten). The feature pages learn the per-ref path in this turn (rule 10's
allowance); AGENTS.md, `.cursor/rules/40-ci-evidence.mdc` and `.claude/` are named in §13, not
edited.

## CENSUS-ITEM second-readers: not applicable — no export moves (the turn adds modules; `rg` finds no dynamic import of any symbol the plan touches).

## CENSUS-ITEM chunk-graph: not applicable — no module under src/ moves; the plan's file list below holds no src/ file.

## CENSUS-ITEM environments

- push to dev (ci.yml): `github.ref_name` = dev, `github.head_ref` empty, `before` = dev's previous
  head (zeros on creation). `concurrency: ci-${{ github.ref }}`, queued, never cancelled in progress.
- pull_request on a lane (ci.yml): `github.ref` = `refs/pull/N/merge`, `ref_name` = `N/merge`,
  `head_ref` = the lane (`cursor/housekeeping`), `github.sha` = the merge commit, `before` on
  `synchronize` only.
- workflow_call (local-backend-proof.yml from ci.yml): the caller's `github` context — the same
  `head_ref`/`ref_name`/`sha`.
- workflow_dispatch (flake-check, guard-proof, nightly, feed-bench, local-backend-proof): `ref_name` =
  the chosen branch, no `head_ref`, no `before`.
- schedule (nightly, feed-bench): the default branch, which is **dev** (`gh repo view`), no `before`.
- workflow_run (ci-status-report.yml): runs the workflow file of the default branch (dev) and checks
  out `ref: dev`, so its scripts are dev's; the triggering run's ref is
  `workflow_run.head_branch` (`cursor/housekeeping` for this lane's pull request, `dev` for a push).
  Consequence in premise P8.

## CENSUS-ITEM mechanisms

- with-deadline.sh `scripts/ci/with-deadline.sh:1 → :49` (deadline, tries, `::warning title=ci-retry::`,
  `::error title=ci-deadline::`); CF-CID `ci-deadlines.test.ts:66 → :118` (the rules) over
  `workflow-reader.ts`.
- step-failures.mjs `scripts/ci/step-failures.mjs:19 → :40` (`Step <id>: outcome <o>` + 20 kept lines),
  the keeping shell `scripts/ci/step-shell.sh`; the reporter's silent sources
  `scripts/e2e-failure-report.ts:1352 → :1361` (classification), `:1396` (the head line),
  `:1502 → :1528` (the sections), INC-973's start-failure reader `:2686` and section
  (`startFailureSection`); the reporter's own `redact` `:116 → :122` (ANSI, JWT, storage key).
- publish-evidence.sh `scripts/publish-evidence.sh:40 → :48` (the docs/tracking/ refusal, a warning and
  exit 0), `:95 → :101` (the copy — where a mapping goes), `:90 → :93` (the prepare hook).
- The status reporter's job table `ci-status-report.yml:40 → :58`.
- prepare-local-backend.sh `scripts/ci/prepare-local-backend.sh:153` (the config copy).
- turn-checks.ts R3 `scripts/ci/turn-checks.ts:258 → :266` (`fetchFailure` — applies only to a step
  whose env names a `_SHA256`/`_VERSION` pin; `LAWS_SEMGREP` `:180` has `env: {}`, so R3 can never
  reach it, which is the brief's premise, confirmed).
- checks-cache.ts `scripts/ci/checks-cache.ts:9 → :10`; db-proof.sh `:99`.
- The promote guard `scripts/check-promote-needs.sh` (DEC-137) — not named by the brief; see Q11.

## CENSUS-ITEM first-download: not applicable — no src/ change (the budget step's last line is pasted once at the end, unchanged).

## CENSUS-ITEM premises (wrong or needing a ruling)

- P1 `check-go` printed only `[check-go] no finding`, not the "two outputs" and "free ids" lines the
  brief expected.
- P2 ci.yml line numbers: `e2e-lanes` is at `:519` (the brief: `:518`), the verdict job `e2e` at
  `:528` (its name line `:532`); `promote` needs **sixteen** jobs, not fifteen. Every other cited line
  matched.
- P3 The runner's apt has no host in its deb822 `URIs:` line. On ubuntu-24.04 runners
  (actions/runner-images `images/ubuntu/scripts/build/configure-apt-sources.sh`) `ubuntu.sources`
  reads `URIs: mirror+file:/etc/apt/apt-mirrors.txt`, and that list is
  `http://azure.archive.ubuntu.com/ubuntu/ priority:1`, `https://archive.ubuntu.com/ubuntu/
  priority:2`, `https://security.ubuntu.com/ubuntu/ priority:3`: apt already fails over to the public
  archive. The captured tails of all three lost runs (ci-evidence 612e89e9c — run 43033934604;
  7abed8a19/7355e32e5 — 43036501908; 6ea2ca931 — 43041366407) show that failover running and failing:
  `Ign:10 https://archive.ubuntu.com/ubuntu …`, then `Err:10 https://security.ubuntu.com/ubuntu …
  Temporary failure resolving 'azure.archive.ubuntu.com'`, then `E: Unable to fetch some archives`.
  apt carries the first host's error text onto the later hosts, so the evidence cannot tell whether
  archive/security resolved at that moment. → Q1.
- P4 "the step file is already redacted by the lane": the raw `local-backend-failure.txt` is not; only
  its copy in the fragment (`:851`) is, and only the fragment is uploaded. → Q5.
- P5 "the reporter quotes it through the same redaction": the reporter's redaction is a TypeScript
  function with other rules (`e2e-failure-report.ts:116 → :122`); the Python module cannot serve it.
  → Q5.
- P6 "the backend start, the E2E build" are not infrastructure as whole steps: step `backend` holds both
  the start (infrastructure when it writes "start failed before any migration ran (DEC-313 …)") and
  the migration apply (a code failure, INC-973's section); step `build` (`bun run build:e2e`) fails on
  code. The smoke-only guards before the tests (acceptance doors, security lints, door guard,
  seller names, outbound calls) are code findings too. → Q4.
- P7 `docs/features/local-backend-proof.md` does not exist — the page is `ci-local-backend.md`;
  `guard-proof.md` and `nightly-e2e.md` describe two more workflows this turn touches.
  `.cursor/rules/40-tests.mdc` does not exist — the CI rule is `40-ci-evidence.mdc`.
- P8 The status reporter runs dev's workflow file and dev's publisher (workflow_run on the default
  branch, `checkout ref: dev`). Until this turn merges, the lane's `ci-status.md` and
  `guards-last-failure.md` keep landing at the dev path, while ci.yml's and local-backend-proof.yml's
  files (run from the pull request's code) move to `docs/tracking/branches/cursor/housekeeping/` at
  the first lane run after Part C. STEP 9's `branches/cursor/housekeeping/ci-status.md` cannot appear
  from this lane's run; DEC-321's judge ("ci-status.md still names dev's head and the branch file
  names the side-branch SHA") is readable at the first side-branch run after the merge, and today's
  `ci-status.md` names a lane commit, not dev's head. The same holds for Part D's
  `skipped (docs-only)` words in the status file. → Q7, Q12.
- P9 On `pull_request`, `git diff <before> <github.sha>` compares the lane's previous head with the
  new merge commit, so it also holds every change dev gained since the lane's branch point unless the
  lane already holds dev's head. The error is on the safe side (the lanes run). → Q9.
- P10 A base run that was itself docs-only has a green E2E verdict with skipped lanes, so "whose
  lanes were green in run <id>" would name a run whose lanes did not run. → Q10.
- P11 GitHub skips a job whose needed job was skipped unless its `if:` holds a status function, so
  `promote`'s explicit condition must begin with `!cancelled()`; and `e2e-lanes`'s condition must be
  `!cancelled() && needs.scope.outputs.<docs-only> != 'true'` so a failed `scope` job runs the lanes
  (the brief's failure-mode lens) instead of skipping them.
- P12 Once `promote` leaves `success()`, DEC-137's guard (`check-promote-needs.sh`: every job is in
  `promote.needs`) no longer proves gating — a job in `needs` but absent from the explicit condition
  would not gate. That rule is DEC-137's concern, whose mechanism is outside SCOPE. → Q11.
- P13 `scripts/conformance/db-proof.test.ts` exists (CF-DBP-1 → 7) and already reads the pin; the
  brief's `scripts/db-proof.test.ts` (new) would be a second test of the same script (K1). The two
  cache-root spellings also differ on an empty value: shell `${ETHIO_CHECKS_CACHE:-…}` treats ""
  as unset, TypeScript `??` keeps "". → Q16.
- P14 `scripts/publish-evidence.selftest.sh` exists (run by `shell-guards.test.ts:78`); the brief's
  new `scripts/publish-evidence.test.ts` sits beside it and SCOPE does not name the self-test. → Q8.
- P15 The images job has no bun (it runs python3 and the CLI), so its config derivation is a Python
  program or shell; the images cache key (`:42`) hashes the toml, the excludes and the version — a
  derivation program must join that digest or a change to it never busts the cache. → Q13.
- P16 `${{ env.SUPABASE_CLI_VERSION }}` in a `uses:` step's `with:`: the `env` context is listed as
  available for `jobs.<job_id>.steps.with` in GitHub's context-availability table (documented, not
  run here). The premise holds.
- P17 `github.event.before` is set on `pull_request` `synchronize` (documented payload, not measured).
  The premise holds.

## Questions for the ruling (each with the form I recommend)

- Q1 (Part A — the swap's form, P3): (a) RECOMMENDED — the script resolves each host of
  `/etc/apt/apt-mirrors.txt` (`getent hosts`), drops the line of a host that does not resolve and
  announces it (`::warning title=ci-mirror::`); a runner whose sources carry a plain deb822 `URIs:`
  host (no mirror list) gets the host part of that URI swapped — the brief's form, kept as the
  second case; a fetch-stage failure (`Temporary failure resolving` or `E: Unable to fetch some
  archives` and no `Unpacking`/`Setting up` line) re-probes, edits, pauses and runs once more; no
  resolvable host → final, naming every host. (b) No edit: only the fetch-stage second run after a
  pause, since apt already fails over. (c) Replace the list wholesale with the public archive. DEC-366's
  text ("swaps a host … for the public archive") would read "drops it from the runner's mirror list"
  under (a): the record is yours to word.
- Q2 (Part A — the certificate tools' `apt-get install`, `:367`): LEFT, RECOMMENDED — reason: not
  reached in the last 40 lane runs (`certutil: present` in every record); the script's "another
  sources shape is a second case" growth clause covers it if it ever runs.
- Q3 (Part A — the deadline): the step's 27 minutes and the 1500 s stay; the second run gets what is
  left of the 1500 s (RECOMMENDED), so two runs never exceed the step's deadline.
- Q4 (Part B — the INFRA set, P6): RECOMMENDED — by step id as the lane stands: `checkout`,
  `setup-bun`, `cache-bun-install`, `install-dependencies`, `setup-cli`, `restore-backend-images`,
  `load-backend-images`, `make-the-temporary-backend-s-certificate`,
  `install-chromium-s-system-libraries`, `install-chromium`, `cache-playwright-browsers`, and
  `backend` only when the step file holds DEC-313's "start failed before any migration ran" line.
  `build`, the migration apply and the smoke guards stay code findings.
- Q5 (Part B — the carrier, P4/P5): RECOMMENDED — the brief's first form, INC-973's existing shape:
  "Write lane evidence" writes `local-backend-step-failure.txt` (the "- Step failure:" lines through
  the same `redact` as the fragment) and "Upload lane log" adds it to `e2e-log-<lane>`; the reporter
  reads it beside `local-backend-start-failure.txt` and applies its own TypeScript `redact` on top. No
  `local-proof-*` download in ci.yml.
- Q6 (Part B — the verdict's text): DEC-028 says `gating=` is the only field a verdict may read, so the
  reporter writes the class to its own small file, which the Verdict step reads for its `::error` text
  only (its exit stays `needs.e2e-lanes.result`); the INFRA text only when every red source is INFRA
  and no test failed, otherwise `E2E failed — see docs/tracking/e2e-last-failure.md` (RECOMMENDED).
- Q7 (Part C — the window, P8): accept it (RECOMMENDED): STEP 9 reads
  `docs/tracking/branches/cursor/housekeeping/e2e-last-failure.md` and `local-backend-proof.md` (new)
  and `docs/tracking/ci-status.md` as today; DEC-321's judge is read at the first side-branch run after
  the merge. The alternative — the status reporter checking out the run's own ref — would run a lane's
  code with `contents: write`; not proposed.
- Q8 (Part C — the publisher's test, P14): RECOMMENDED — SCOPE gains `scripts/publish-evidence.selftest.sh`
  (one end-to-end per-ref case against its bare repo) beside the new `scripts/publish-evidence.test.ts`
  (CF-PUBLISH-1 → 3 over a `--print-path <ref> <file>` mode); or the TS test alone if SCOPE stays.
- Q9 (Part D — the pull request's diff, P9): (a) RECOMMENDED — the brief's law as written (safe; it
  skips only while the lane holds dev's head, as this lane does today); (b) diff
  `before..pull_request.head.sha` and require the base run's `pull_requests[].base.sha` equal to this
  run's base.
- Q10 (Part D — a docs-only base, P10): (a) one hop — the base run must have run its lanes (the lane
  jobs `success`, not `skipped`); a second docs-only push in a row runs the lanes; (b) RECOMMENDED — a
  bounded walk (at most 10 first-parent commits, under with-deadline) to the newest commit on this ref
  whose run ran green lanes, with every path in `git diff <that commit> <sha>` a record; the evidence
  names that run. A turn's stop report, ruling saves and report are consecutive docs-only pushes.
- Q11 (Part D — where the promote rule lives, P12): RECOMMENDED — SCOPE gains `scripts/check-promote-needs.sh`
  and `scripts/fixtures/ci-promote-needs-bad.yml`: every job in `promote.needs` appears in
  `promote`'s `if:` as `needs.<job>.result == 'success'`, except `e2e-lanes` and `bundle-budget`,
  which may appear only with `|| (… == 'skipped' && needs.scope.outputs.<docs-only> == 'true')`;
  `success()` absent; `!cancelled()` present. CF-CID-1 keeps the install rule only. Or, SCOPE as
  written: the rule in CF-CID-1 with `workflow-reader.ts` exposing a job's `if:`.
- Q12 (Part D — the status file's words, P8): accept that the report push's status file reads the two
  jobs as plain `skipped` (dev's reporter) and names them so in §11 (RECOMMENDED).
- Q13 (Part E (c) — the form, P15): RECOMMENDED — `scripts/ci/backend-config.py` (new; one variant,
  `images`: TLS off, the hook off), called by the images job; `prepare-local-backend.sh` keeps its copy
  (the identity, not a derivation); the images key's digest at `:42` gains the program file; its test
  `scripts/ci/backend-config.test.ts` (new) proves the derived text equals the toml with only those
  two values changed.
- Q14 (Part E (a) — three copies): RECOMMENDED — all three import `scripts/ci/redact.py` (the inline
  one keeps its 300-character cut after the shared redaction, which adds the account-id, key-value and
  SHA rules it lacks); LFE-2 gains `PYTHONPATH` pointing at the repository's `scripts/ci`; the
  reporter's TypeScript `redact` is LEFT (another language and rule set; K2).
- Q15 (Part E (b) — the pin's test): RECOMMENDED — `ci-images.test.ts` CF-CI-IMG-5 (new): `2.120.0`
  appears once in local-backend-proof.yml, a planted second literal fails; db-proof.sh's checksum keys
  are LEFT (a table keyed by version, held to the pin by CF-DBP-2/4).
- Q16 (Part F (ii) — the cache root, P13): RECOMMENDED — db-proof.sh reads the TypeScript constant
  (`bun -e` printing `CHECKS_CACHE`; db:proof runs under bun), so one definition remains and the
  empty-value difference disappears; the agreement test is a new case CF-DBP-8 in
  `scripts/conformance/db-proof.test.ts` (SCOPE gains it) instead of a new `scripts/db-proof.test.ts`.
- Q17 (Part F (i) — which fetches): RECOMMENDED — `laws-changed.ts` exits 3 (db-proof's NOT RUN code)
  for the rules archive, mapped by the runner to `NOT RUN — the pinned Semgrep rules could not be
  fetched`; the pinned `pip install semgrep==<v>` failing is the same R3 case and takes the same code
  with its own reason (`… the pinned Semgrep could not be installed`) — or the archive alone, as written.

## The plan's files (on the recommended answers)

Part A: `scripts/ci/install-browser-deps.sh` (new), `scripts/ci/install-browser-deps.test.ts` (new,
CF-INSTALL-1 → 4), the five call sites in `local-backend-proof.yml`, `flake-check.yml`,
`guard-proof.yml`, `nightly-e2e.yml` (×2), `scripts/conformance/ci-deadlines.test.ts` (the seventh
rule, CF-CID-2's planted line and list), `scripts/conformance/wired.test.ts`.
Part B: `local-backend-proof.yml` ("Write lane evidence", "Upload lane log"), `ci.yml` (the verdict
job's class file and `::error` text), `scripts/e2e-failure-report.ts` (the INFRA class, its INC-1101
self-test checks), `scripts/fixtures/` (fixtures cut by script, sha256 before and after, from the
captured ci-evidence records named in P3 — INFRA, "Run proof lane", no step file),
`scripts/e2e-failure-report.test.ts` (new), `wired.test.ts`.
Part C: `scripts/publish-evidence.sh` (`EVIDENCE_REF`, the mapping, `--print-path`),
`scripts/publish-evidence.test.ts` (new, CF-PUBLISH-1 → 3), `scripts/publish-evidence.selftest.sh` (if
Q8), the six callers (`ci-status-report.yml`, `ci.yml`, `local-backend-proof.yml`, `flake-check.yml`,
`nightly-e2e.yml`, `feed-bench.yml`), the call-site census in `ci-deadlines.test.ts`, the ledger's ref
word in `e2e-failure-report.ts` (`ledgerLines` `:539`; its dedup pattern `:553` keeps matching),
`docs/tracking/branches/README.md` (new).
Part D: `scripts/ci/docs-only.ts` (new), `scripts/ci/docs-only.test.ts` (new, CF-DOCS-1 → 4), `ci.yml`
(the `scope` job with `actions: read`, the conditions of `e2e-lanes`, `bundle-budget`, `e2e`,
`promote`; `scope` in `promote.needs`), `ci-status-report.yml` (`skipped (docs-only)`),
`scripts/check-promote-needs.sh` + `scripts/fixtures/ci-promote-needs-bad.yml` (if Q11), else
`workflow-reader.ts` + `ci-deadlines.test.ts`, `scripts/ci/turn-checks-allowlist.txt` (`scope › *`).
Part E: `scripts/ci/redact.py` (new), `scripts/ci/redact.test.ts` (new, CF-REDACT-1 → 2),
`local-backend-proof.yml` (three redactions, the pin read three times, the images job's derivation and
key), `scripts/ci/lane-failure-evidence.test.ts` (LFE-2's env), `scripts/ci/backend-config.py` (new),
`scripts/ci/backend-config.test.ts` (new), `scripts/conformance/ci-images.test.ts` (CF-CI-IMG-5).
Part F: `scripts/ci/laws-changed.ts`, `scripts/ci/turn-checks.ts`, `scripts/ci/turn-checks.test.ts`,
`scripts/db-proof.sh`, `scripts/conformance/db-proof.test.ts` (if Q16).
Docs: `docs/features/ci-guards.md`, `ci-status-reporter.md`, `e2e-harness.md`, `ci-local-backend.md`,
`guard-proof.md`, `nightly-e2e.md`. Nothing under src/, e2e/, supabase/, package.json, bun.lock.

## CENSUS-ITEM findings (rule 60 §13; beyond the task)

- F1 The evidence-path readers outside this turn's reach: `AGENTS.md:24` and `:25` (the raw
  addresses, by file name), `.cursor/rules/40-ci-evidence.mdc` (four `git show
  origin/ci-evidence:docs/tracking/…` lines), `.claude/` (three hooks, three rules, two skills) and
  `scripts/conformance/executor-hooks.test.ts:453`, `:631` (exact command strings) — the per-ref path
  reaches them by the next rules turn.
- F2 A second redaction in another language: `scripts/e2e-failure-report.ts:116 → :122` (ANSI, JWT
  with `{5,}` parts, storage key; no e-mail, account id, sb keys or hex) — the lane evidence is
  redacted by the Python rules before it reaches the reporter; the reporter's own rules differ.
- F3 Redundant account-id passes beside `redact`, whose first rule is the same pattern:
  `local-backend-proof.yml:919 → :920` (`safe`) and `:1147`.
- F4 apt's error text masks which mirror failed (P3): a lane's evidence cannot tell an Azure-only
  outage from a runner-wide resolver failure; Part A's probe lines would be the first record of it.
- F5 Until Part C merges, `docs/tracking/ci-status.md` follows whichever ref ran last (today the lane's
  e295dc131), so the supervisor's read of dev stays DEC-321's interim history walk.
- No security hole was found.

The question: rulings on Q1 → Q17 (or `continue` on every recommended form), and SCOPE's additions
named in Q8, Q11 and Q16.
