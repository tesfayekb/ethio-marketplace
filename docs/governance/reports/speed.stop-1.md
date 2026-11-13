STOP — speed STEP 1 (the census): two workers per lane conflict with AGENTS.md :31 and DEC-230; Part B's tested-tree lookup needs a file part and two readers the scope does not name; the weights' source holds no project split
DONE: STEP 0 (brief saved, sha256 acc4df3d…816f9 equal; roadmap line 3; draft pull request #38); STEP 1 (the census below)
LEFT: parts A, B, C, D; steps 2–8
CI: dev's root ci-status.md (read 2026-11-13, before any code):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `50783a30ef18689b9b362d82397e1a3de4650b8c` (short `50783a3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T21:24:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43305919223
```

The root file still names 50783a30e; `gh run list --branch dev --limit 1` names run 43435542489 on
203907b3d (PR #37's merge, this branch's start) completed `success`. No red of an earlier turn.

FILES (`git diff --name-only 203907b3d`, the commit STEP 0 began from; the brief's `Base: dev
50783a30e` is dev before PR #37's merge, and the brief says to branch at the tip after it — the
anchors it quotes are from e61da5bfc, and `git diff --name-only e61da5bfc origin/dev` is
`docs/governance/reports/pictures.report.md` alone, so none is stale):

```
docs/governance/briefs/speed.md
docs/governance/reports/speed.stop-1.md
roadmap.md
```

## The questions

### Q1 — two workers per lane (Part C, DEC-375 c) against AGENTS.md :31 and DEC-230

- AGENTS.md :31 reads "CI: 16 lanes, 1 worker each; every job and every outside call carries a
  deadline …". The brief's flag is `agents-change (AGENTS.md's CI-evidence and pre-push lines
  only)`, so Part C's two workers would leave the constitution saying one, and the flag forbids the
  edit. Rule 00 (what binds you, 1–2): a task that conflicts with a rule is a STOP; AGENTS.md governs
  a code law.
- The premise "`E2E_WORKERS` unset in the lanes" is wrong: the lane job's env sets
  `E2E_WORKERS: "1"` for every lane (`.github/workflows/local-backend-proof.yml` :177), set by turn
  22 under DEC-230. The history the brief does not name: DEC-217 (2026-10-21) ran the lanes at two
  workers; DEC-230 (the operator, question card, "Keep two, fix message") kept two after CO-6's
  failure on run 1087, with the rule "after the fix [INC-813], the next cross-worker failure returns
  the lanes to 1 worker with no further exception"; run 1088's CO-6 failure (INC-814) fired it, and
  turn 22 set one worker (`docs/spec/spec-ledger.md` :4378, :4391;
  `docs/features/ci-local-backend.md` :658 → :664). `playwright.config.ts` :45 → :48 still carries
  DEC-024's revert rule ("any cross-worker interference class returns this knob to 1 BEFORE the
  class is diagnosed").
- Since then: INC-814's cause was fixed in turn 22 (the rail dialog reads roots fresh), INC-817's
  (scratch country codes under two workers) in turn 22c (`e2e/helpers/country-slot.ts`); the pool
  sizes itself by `E2E_WORKERS` (`e2e/global-setup.ts` :504), one identity per `parallelIndex`
  (`e2e/helpers/ui.ts` :765 → :785); worker-tagged scratch keys in `e2e/helpers/posting.ts` :25,
  `categories.ts` :45, `locations.ts` :32, `translations.ts` :143, `reach-rows.ts` :42,
  `countries.ts` :24 → :50. No fixture in `e2e/global-setup.ts` or `e2e/helpers/` assumes one worker
  per backend by its code; DEC-230's failures were of tests acting on a shared list, which no code
  read can rule out.
- Asked: (a) AGENTS.md :31 joins the scope, worded by the supervisor (for example "CI: 16 lanes by
  measured time, 2 workers each except the email lane and the serial paths (DEC-375)"), and DEC-375
  names that it replaces DEC-230's "no further exception" with its judge (c) and STEP 7's
  back-to-one rule; or (b) Part C lands the time-balanced plan at one worker and two workers wait
  for a later DEC.

### Q2 — Part B: how a dev push finds the pull request's tested tree

What the census found:

- A merge commit on dev (203907b3d: parents 50783a30e and 2810f0b88, the pull request's report
  commit) would reuse a `pull_request` run. That run's `head_sha` is the pull request's head
  (run 43426917119: e61da5bfc), and the commit it tested is GitHub's merge ref (db6596e44, "Merge
  e61da5bfc… into 50783a30e…", tree 5216ca21…, read by `gh api …/git/commits/db6596e44…`; the
  lanes' evidence names it as `- Commit:`, local-backend-proof.yml :855 and :1117). The run object
  does not carry the tested commit or its base: its `pull_requests` list is empty once the pull
  request merged (read on run 43426917119), and db6596e44 is not in a clone (`git cat-file -t`
  fails).
- The decider's run query filters by the pushed ref (`scripts/ci/docs-only.ts` :193,
  `branch=${ref}`), so a dev push never sees a `cursor/…` branch's runs.
- No Actions API answer says a run was flaky: CI retries once (`playwright.config.ts` :40 → :44), a
  test that passed on retry leaves its lane job `success`. Only the lanes' evidence counts it (the
  summary job's totals, local-backend-proof.yml :1118 → :1136). CF-DOCS-8's "flaky-only run" needs a
  signal that is not in the API.

The design I would build (DECIDE-AND-NAME), and what it needs beyond the brief's scope:

- A code tree id: sha256 of `git ls-tree -r` of the commit with every `isRecord` path set aside,
  one function in `scripts/ci/docs-only.ts`.
- The certificate: the lanes' summary job (local-backend-proof.yml `summary`, after "Write proof
  summary and notice"), when every lane's evidence was read, the proof job succeeded and the totals
  hold 0 failed and 0 flaky, uploads an empty artifact named `code-tree-<id>` for the commit it
  tested (`GITHUB_SHA`: the merge ref on a pull request, the pushed commit on dev).
- The lookup: the scope job computes its own push's id and reads
  `actions/artifacts?name=code-tree-<id>` (one read under `with-deadline.sh`; `actions: read` is
  already held); a candidate counts only when its run is this repository's
  (`head_repository_id == repository_id`), its path is `.github/workflows/ci.yml`, it completed
  `success`, a lane job `success` and the verdict `success` (`lanesGreen`, unchanged). The first
  such candidate within a bound reuses; a failed read, a missing commit or no candidate within the
  bound runs the lanes. One rule for merges, docs-only pushes and pull-request pushes; the
  first-parent walk (`WALK_BOUND`, :20) is retired, replaced by the bound on candidates;
  CF-DOCS-2, 3, 5 and 6 are rewritten to the new rule, CF-DOCS-1 and 4 stay.
- Scope this needs: the summary job of local-backend-proof.yml (the brief names that file's
  "lanes' Playwright steps, the repeat budget, the plan's summary line"). And the line's old words
  have two readers outside scope: `.github/workflows/ci-status-report.yml` :71
  (`startsWith('skipped — docs-only push;')` marks the skipped rows `skipped (docs-only)`) and
  `scripts/e2e-failure-report.ts` :1574 → :1590 (the headline "ran no lanes (docs-only push,
  DEC-365)", its self-test :2432). With the brief's form ("skipped — the code tree equals <sha>'s,
  proven by run <id>") the rows read plain `skipped` and the headline keeps saying "docs-only push"
  on a merge. For a pull-request run the line can name the run's head commit and event, not the
  merge ref (the API does not hold it).
- Asked: (a) the summary job's certificate step joins the scope, and the two readers either stay
  as they are (named in §13 for a later turn) or join the scope; or (b) another way to find the
  tested tree the supervisor prefers.

### Q3 — Part C's weights: the Timing section holds no project split

The DEC-087 Timing section (`local-backend-last-failure.md` of run 43305919223, ci-evidence commit
545625cae) lists 132 spec files with "Tests | Summed duration | Ran in", each summed over every
source, the smoke lane included (`shell.spec.ts` | 468 | 19.3 min | smoke, shard 8, shard 16), and
never per project. A weight per spec file and project, for lanes 1–16 only, needs the lanes'
`results.json` (the `e2e-results-<n>` artifacts, `retention-days: 7`, local-backend-proof.yml :981),
which the Timing section is computed from. Asked: the maker reads a green run's `results.json`
files (lanes 1–16, by `gh run download <run> -p 'e2e-results-*'`) and writes seconds per
(file, project) group; or the brief's source with a stated split.

## The census

CENSUS-ITEM consumers — the three greps of the brief, run on 203907b3d:

- Concern 1 (`rg -n "bun run checks|e2e:local|each whole|both projects|half an hour|tens of
  minutes" .cursor AGENTS.md docs/governance/go-template.md`): AGENTS.md :26, :30;
  `docs/governance/go-template.md` :89; `.cursor/rules/00-protocol.mdc` :113, :114, :118, :119,
  :131; `.cursor/rules/20-tests.mdc` :91, :105; `.cursor/rules/50-security.mdc` :103 (the checks
  runner's pinned downloads — unchanged by Part A).
- Concern 2 (`rg -n "docs_only|steps.decide|DEC-365|docs-only.ts" .github scripts`): ci.yml :43 →
  :47, :50, :57, :58, :76, :105, :386, :388, :575, :577, :695, :698, :746, :750, :781, :820, :824;
  ci-status-report.yml :45, :46, :64; local-backend-proof.yml :41 (a false hit: "decide the set");
  `scripts/conformance/wired.test.ts` :390, :391; `scripts/ci/turn-checks-allowlist.txt` :11;
  `scripts/ci/docs-only.test.ts` :15, :57, :76; `scripts/ci/docs-only.ts` :2, :6, :227, :230;
  `scripts/check-promote-needs.sh` :5 → :18, :69 → :95; `scripts/fixtures/ci-promote-needs-bad.yml`
  :3, :23; `scripts/e2e-failure-report.ts` :1512, :1534, :1574, :1581, :2413, :2432, :2437, :3278.
- Concern 3 (`rg -n "shard|E2E_WORKERS|--workers|REPEAT_BUDGET|REPEAT_SECONDS_PER_TEST" .github
  playwright.config.ts scripts e2e/global-setup.ts`, 111 lines): the workflow hits are
  local-backend-proof.yml :177 (`E2E_WORKERS: "1"`), :239, :240, :274, :299, :303, :312, :313,
  :796, :798; ci.yml :605 → :678 (the merged reporter's `shard-*` folders); flake-check.yml :117
  (`--workers ${{ inputs.workers }}`, operator-dispatched); nightly-e2e.yml :135, :168
  (`--workers=1`, the serial nightly); `playwright.config.ts` :34, :45 → :49, :97, :98;
  `e2e/global-setup.ts` :122, :140, :146, :147, :504, :515, :591, :602, :964;
  `scripts/conformance/repeat-lane.test.ts` :345; `scripts/e2e-failure-report.ts` (labels
  "shard N", the timing self-test, :3115 → :3116 the repeat values it fills into the workflow's own
  echo lines); fixtures under `scripts/fixtures/`.

CENSUS-ITEM definition — consumers by definition beyond the greps:

- Concern 1: `.cursor/rules/20-tests.mdc` :97 (the running-tests sentence: "Both projects …, 2
  workers, …; each touched spec file whole and alone"), which the grep's lower-case "both projects"
  misses; rule 60 :24 (§5 "the E2E count lines") and :48 (THE CHECKS' last line); rule 40 :13 → :17
  ("about half an hour"), which the grep's `.cursor` path finds only as rule 00's.
- Concern 2: every job that reads `scope`'s outputs is in the grep; the evidence writers that read
  the line are ci-status-report.yml and e2e-failure-report.ts (both outside scope, Q2);
  `docs/features/ci-guards.md` :1217 → :1244 and `docs/features/ci-status-reporter.md` :45 → :63
  describe the line's words.
- Concern 3: the lane plan has no consumer yet; Playwright's own `--shard` is the mechanism it
  replaces (local-backend-proof.yml :798); `scripts/e2e-select.ts` (`repeatPlan`, the repeat
  budget's arithmetic) is read by the selection step :274.

CENSUS-ITEM tests — each file the plan would change and its own tests:
`scripts/ci/docs-only.ts` → `scripts/ci/docs-only.test.ts` (CF-DOCS-1 → 6);
local-backend-proof.yml → `scripts/conformance/repeat-lane.test.ts` (RPL-1, RPL-2, RPL-3,
CF-CID-10), `scripts/conformance/ci-deadlines.test.ts` (CF-CID-1 → 9; CF-CID-7 reads the "Run proof
lane" step), `scripts/conformance/ci-images.test.ts` (CF-CI-IMG-1); ci.yml →
`scripts/check-promote-needs.sh` and its planted fixture (the build job's self-test), the
CF-CID family; the rules and AGENTS.md → none today (CF-RULES-1 would be the first);
`scripts/conformance/wired.test.ts` (CF-WIRED-1 → 4) for every new script.

CENSUS-ITEM lists — `scripts/conformance/wired.test.ts` (CF-WIRED-1's caller list, :211 → :418;
:390 names docs-only.ts); the new guards' allowlists (none exist: CF-LANES-3's single-worker lines
would be a new `scripts/conformance/lanes-allowlist.txt` through `kit.ts`); the register
(`docs/governance/mechanisms.md`, the records turn's); the rule files' cross-references (rule 00
step 7 → rule 20; rule 20 :97 → :105; rule 40 :13 → :17 → rule 00 step 10).

CENSUS-ITEM old-file-readers — `docs/features/e2e-harness.md` :388 ("THE FILE IS THE SHARD UNIT …
`--shard` distributes whole spec files"); `docs/features/ci-local-backend.md` :616, :658 → :664
(one worker, DEC-230, DEC-232); `docs/features/ci-guards.md` :285, :859, :1063, :1093 (the older
shard counts, history), :1217 → :1244 (the docs-only rule); `docs/features/ci-status-reporter.md`
:45 → :63; AGENTS.md :26 (the old gate), :31 (one worker); rule 00 :111 → :121, :131; rule 20 :97.

CENSUS-ITEM second-readers — ci-status-report.yml :45 → :75 (the scope job's log line, the
`skipped — docs-only push;` prefix); e2e-failure-report.ts :1512 → :1590 (`lanesLines`,
`renderLanesSkipped`), :3278 (no ledger line on a skipped push); ci.yml's Verdict step :746 → :773
(prints the line); `scripts/check-promote-needs.sh` (reads `needs.scope.outputs.docs_only` by
name). The lanes' step text is read by repeat-lane.test.ts and ci-deadlines.test.ts (above) and by
e2e-failure-report.ts's self-test (the repeat echo lines, :3108 → :3125, placeholders only).

CENSUS-ITEM chunk-graph: not applicable — no `src/` change.

CENSUS-ITEM environments:

- A dev push and the pull request's run: Q2. The scope job holds `contents: read` and
  `actions: read` (ci.yml :53 → :55); `actions/artifacts?name=…`, `actions/runs/{id}` and
  `actions/runs/{id}/jobs` are reads under `actions: read` (the artifacts read probed with `gh api`
  on `e2e-results-smoke`: each item carries `workflow_run.id`, `head_repository_id`,
  `repository_id`, `head_sha`, `head_branch`).
- The runner's cores and memory: not read — no lane step prints them (`rg -n "nproc|free -m"
  .github` finds none), and I did not download a lane's job log. DEC-217's measurement on the same
  runner class: lanes 449–771 s at two workers against 579–1,156 s at one
  (`docs/spec/spec-ledger.md` :4313).
- Fixtures or identities that assume one worker per backend: none by code (Q1's list).

CENSUS-ITEM mechanisms — `scripts/ci/docs-only.ts` read whole (232 lines: `isRecord`, the parsers,
`lanesGreen`, `decide` over a first-parent walk of at most ten commits from `before`, `liveProbe`
reading `ci.yml/runs?head_sha=…&branch=<ref>&status=completed` and the newest run's jobs). The
lanes' steps read whole (local-backend-proof.yml :132 → :1016, the summary :1017 → :1182): one
matrix of twenty lanes (smoke, email, webkit, 1 → 16, repeat), `E2E_WORKERS: "1"` job-wide, the
Run proof lane step :776 → :810 (smoke :787, repeat :791, webkit :794, email :796 `--workers=1`,
lanes 1–16 :798 `--shard="$PROOF_LANE/16"`), the repeat selection :234 → :314
(`REPEAT_BUDGET_SECONDS=720`, `REPEAT_SECONDS_PER_TEST=4.7`, `repeatPlan`), the evidence fragment
:823 → :954, the summary's totals :1093 → :1167. The Timing section's format: Q3 (a source table
with wall times, a 132-row spec file table summed over sources, the 15 slowest tests with project).
`e2e/global-setup.ts`'s worker-dependent parts: the identity pool :490 → :517 (one super admin per
`E2E_WORKERS` slot, default 2), the process id :140 → :148 (run × `E2E_SHARD`), the maintenance
owner :594 → :604 (`E2E_SHARD` "1" or `E2E_MAINTENANCE=1`; the lanes' `E2E_SHARD` is `local-<n>`, so
lane 1's mark decides; its log line still says "owner: shard 1").

CENSUS-ITEM first-download: not applicable — no `src/` change.

CENSUS-ITEM premises — what the census found different from the brief:

- `E2E_WORKERS` is set to "1" in the lanes, not unset (Q1).
- The way the brief expects a dev push to find the pull request's run (the second parent, its
  `pull_request` runs, "the tree each one tested") holds for the first two; the tested tree is in no
  API answer about the run (Q2).
- CF-DOCS-8's "flaky-only run" has no API shape (Q2).
- The weights' source holds no project split and counts the smoke lane (Q3).
- Line numbers: the smoke step is :787 (the brief :788); rule 20's "Running tests" heading is :85
  (the brief :84); rule 12 is `.cursor/rules/12-ui.mdc`. Every other anchor the brief quotes reads
  as quoted on 203907b3d (rule 00 :111, :117, :131; rule 20 :97; AGENTS.md :24 → :26; ci.yml :49;
  docs-only.ts :20; local-backend-proof.yml :239, :791, :794, :796, :798; playwright.config.ts
  :31, :49; go-template.md :89).
- The measured times the brief cites read as cited: run 43305919223's shards 4.4 → 18.6 min (its
  Timing section); the pictures report §5 "518 tests — 460 passed" (:264) and
  `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 485s` (:288).
- R1: rule 00 :111 → :112 says the checks runner's typecheck step reads Lovable's harness log;
  `scripts/ci/turn-checks.ts` :13 says it runs CI's own `bun run typecheck` (TCK-12) — as the brief
  says.
- R2: rule 12 :79 → :80 names `Field` and `focusFirstRefusal` in `src/features/posting/field.tsx`
  and `reportMissing` in `wizard.tsx`; today `Field` is at `field.tsx` :42, `focusFirstRefusal` at
  `src/features/posting/field-refusals.ts` :194, `reportMissing` at `wizard.tsx` :264 (a local
  callback, not an export).
- R3: AGENTS.md :24 → :25 and rule 40 :35 → :39 name only the root evidence files; ci-evidence
  holds `docs/tracking/branches/cursor/<stem>/…` for each lane (`git ls-tree origin/ci-evidence`).
- R5: rule 20 :20 reads "the shard-1 setup alone reaps residue"; `docs/features/e2e-harness.md`
  :627 holds J3 in the Knowledge's words.

CENSUS-ITEM findings (beyond the task):

- `e2e/global-setup.ts` :602 logs "maintenance skipped (owner: shard 1)" while the owner is lane 1's
  `E2E_MAINTENANCE` mark (DEC-369); outside scope.
- `scripts/ci/turn-checks-allowlist.txt` :11's reason names "the push's base" and CF-DOCS-1…6;
  it goes stale with Part B (outside the brief's `scripts/ci/` list).
- No security hole met.
