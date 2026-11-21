STOP — tests-ci-2 step 7: the repeat lane cannot run SMN-E13 once it is `@global-state`
DONE: steps 0 to 6; ruling 2 items 1 (all but its repeat-lane proof), 2, 3; step 7's report drafted, not committed
LEFT: step 7 — the repeat-lane proof of SMN-E13, the report's CI section, the Feed bench's numbers
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `0b811d99fb52f821678d848a31a1218388a21ae4` (short `0b811d9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T09:52:43Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44890392019

FILES:
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/lovable-branch-guard.yml
docs/features/attributes.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/e2e-harness.md
docs/features/feed-engine.md
docs/features/performance-strategy.md
docs/governance/briefs/tests-ci-2-ruling-1.md
docs/governance/briefs/tests-ci-2-ruling-2.md
docs/governance/briefs/tests-ci-2.md
docs/governance/reports/tests-ci-2.census.md
docs/governance/reports/tests-ci-2.stop-1.md
docs/governance/reports/tests-ci-2.stop-2.md
e2e/helpers/posting.ts
e2e/menu-rows.spec.ts
e2e/shell-bands.spec.ts
e2e/submenu-look.spec.ts
e2e/submenu-touch.spec.ts
e2e/submenu.spec.ts
roadmap.md
scripts/bundle-closure.mjs
scripts/bundle-closure.test.ts
scripts/check-bundle-size.mjs
scripts/check-datatable-minwidth.sh
scripts/check-migrations.sh
scripts/ci/lovable-branch-guard.sh
scripts/ci/lovable-branch-guard.test.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/import-cycles-allowlist.txt
scripts/conformance/import-cycles.test.ts
scripts/conformance/import-cycles.ts
scripts/conformance/lanes.test.ts
scripts/conformance/migration-guards.test.ts
scripts/conformance/migration-guards.ts
scripts/conformance/migration-reader.ts
scripts/conformance/shared-value-tables.txt
scripts/conformance/shared-values.ts
scripts/conformance/wired.test.ts
scripts/datatable-minwidth.ts
scripts/feed-bench-market.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
scripts/fixtures/bad-datatable-minwidth-class-example.tsx.txt
scripts/route-budgets.mjs
scripts/shell-guards.test.ts

## The conflict

Ruling 2, item 1 orders two things that cannot both hold on the workflow as it stands:
"SMN-E13 is tagged `@global-state`" and "The repeat lane proves SMN-E13."

The repeat lane leaves out every `@global-state` test.
`.github/workflows/local-backend-proof.yml:798` runs
`bunx playwright test … --grep-invert "@global-state|@a11y" --repeat-each "$REPEAT_EACH" …`, and its
planner lists the tests with the same filter (`:260`). The one place a `@global-state` test runs is
the smoke lane, once, at one worker (`:794`–`:795`, INC-1135). The brief's item 7 made the same
promise ("The repeat lane proves each"), and so does the INC-1015 record the ruling dictates.

## What run 44890392019 (`0b811d9`, SUCCESS) shows

Read from the run's `e2e-results-smoke` and `e2e-results-repeat` artifacts and the repeat lane's
`local-backend-repeat.txt`:

- The repeat lane selected all five changed reader spec files ("directly changed: 5 of 5
  repeated") and ran 102 tests (34 skipped), each twice. None of the nine readers was among them,
  SMN-E13 included.
- The smoke lane ran each reader once, serially. All nine passed on `desktop-1280`; their
  `mobile-360` runs skip by design. SMN-E13 took 2.0 s. The readers' eleven runs took 19.8 s in all.
  The smoke lane passed 38 tests and skipped 16, in 4.5 minutes.
- So the tag also took the other eight readers out of the repeat lane. They were repeatable there
  before this turn, when they ran in the parallel lanes.

## The choices (the supervisor's)

- A. The repeat lane gains a serial pass: after its parallel repeat, it runs the selected specs'
  `@global-state` tests with `--grep "@global-state" --workers=1 --repeat-each "$REPEAT_EACH"`,
  charged to the same budget. The cost is about 40 s here (the readers' 19.8 s, twice). It touches
  `.github/workflows/local-backend-proof.yml` (inside the brief's `.github/workflows/` scope), the
  planner's count if the budget must include them (`scripts/ci/lane-plan.ts`), and a shape test.
  Every later `@global-state` change would then be repeated as well. This changes CI's behaviour
  beyond the turn's numbered items, which is why I have not built it.
- B. Run 44890392019's single serial pass in the smoke lane is the proof. INC-1015's record then
  names that run rather than "the repeat lane's run".
- C. INC-1015 stays OPEN, with the tags and the guard landed, until a later turn builds A.

## Also open at this stop

- The Feed bench has not been dispatched on `cursor/tests-ci-2`. `gh run list --workflow
  feed-bench.yml` lists only `dev` runs, the latest 43872334867 on 2026-11-16. The dispatch is the
  operator's (ruling 2, item 4).
- "Lovable branch guard (DEC-413)" did not run on this pull request, as expected:
  `pull_request_target` takes its workflow from the base (`dev`), which does not have it yet. Its
  first run will be on the first pull request after the merge.
- The completion report, `docs/governance/reports/tests-ci-2.report.md`, is drafted and stays
  uncommitted until this is ruled, because its CI section and its INC-1015 record depend on the
  answer.
