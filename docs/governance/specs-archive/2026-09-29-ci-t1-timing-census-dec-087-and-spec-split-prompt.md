Source: supervisor thread, turn 919, Tue 2026-09-29 01:26 New York.
Status at 2026-10-05: sent 2026-09-29 01:26; built (7c300b6e, run 36547403556 green; nine spec files; DEC-087 timing section); the DEC-087 judge (median push-to-report ≤ 19 minutes over three green runs) had its first run at 14.6 minutes (turn 931) and no closing tally is recorded; the repo holds DEC-087's description in docs/features/e2e-harness.md and the changelog, not this prompt.
Related: CI-T1, DEC-087, DEC-023, G22, INC-323, INC-324, INC-330, J3.

C2 is verified and clean: all 25 CI jobs passed on `24663baf` and main was promoted. The database change is exactly the two lines and the comment, nothing else. The migration version is later than the file's timestamp, which was the rule, and staging is up to date. The route now logs an upstream HTML error page by name instead of dumping it.

The server-error census, first read against the rules I set up front:
- **INC-324:** the `listing_revisions` null error is **0** this run. It needs three clean runs to close; this is the first.
- **INC-323:** "listing not found" dropped from **111 to 27**. The target is 5 or fewer per run. PR-15 causes two of them on purpose; the rest still need tracing to their tests.
- **PW-10 flaked twice**, on the same currency pre-fill as PW-17. It joins INC-330.

## Test speed

Two things point to the likely cause:
- **Test files are the unit that gets split across CI machines.** The CI test runs are divided into 6 groups ("shards"), and with our current setting (`playwright.config.ts:15`) Playwright never splits a single file between them.
- **Two files are huge:** `post-wizard.spec.ts` has 75 tests and `admin-attributes.spec.ts` has 64, on both screen sizes. Whichever group gets one of them probably finishes last, while the others sit idle.

That's a hypothesis until it's measured. The fix I'd make:
1. Add a timing section to every CI report: how long each group took, each file's total, and the 15 slowest tests.
2. Split those two files by area, without changing any test.

This adds no load on the staging database: the same 12 test runners, just better packed.

The rule, set before any numbers exist (**DEC-087**): the split counts as a win if the median push-to-report time over the next 3 green runs is **19 minutes or less** (80% of today's ~24). Other levers, like a bigger staging database or skipping browser tests on docs-only commits, wait until the timing section shows they're needed.

Paste this now; it runs before W4, because every later turn then gets faster:

---
```
CI-T1 — timing census (DEC-087) + split the two largest specs. Tier B. No migration, no app change, no test-logic change.

SCOPE — you may touch only: scripts/e2e-failure-report.ts (+ self-test); e2e/post-wizard.spec.ts, e2e/admin-attributes.spec.ts and new files e2e/post-wizard-*.spec.ts, e2e/admin-attributes-*.spec.ts, e2e/helpers/*.ts (moved helpers only); docs/features/e2e-harness.md; docs/_changelog.md. The workflow graph and playwright.config.ts are untouched (G22).

PART A — DEC-087 timing census (non-gating). In both the green and red report, add "## Timing (DEC-087, non-gating)": per source (smoke, shard n, email, changed) the wall time from results.json (stats.startTime/duration); per spec FILE the summed test duration and which shard ran it; the 15 slowest tests (title, project, duration). Coverage line as in DEC-083 (sources read / unavailable). Self-test from a real captured results.json.

PART B — the split. playwright.config.ts:15 sets fullyParallel: false, so a spec file is one sharding unit; post-wizard.spec.ts (75 tests) and admin-attributes.spec.ts (64) are the two largest. First measure: run the full suite locally with the JSON reporter as CI shards it (the six --shard values) and report each shard's wall time and which file dominates it (this is the before-picture; paste the table). Then split each file by area into 3–5 files of similar weight (e.g. post-wizard: category/specs, pricing, place/contact/review, resets/undo, currency/negotiable), moving shared helpers into e2e/helpers/ unchanged. Rules: every test keeps its exact title and body (test ids such as PW-61 stay searchable); afterEach/afterAll hooks travel with their tests (J3); no test is added, removed or edited; the tag-based smoke/global-state/a11y selection still selects the same tests (list before/after counts per tag). Then repeat the local six-shard run and paste the after table.

JUDGE (pre-committed, DEC-087): the split is kept as a win if the median push→report wall time over the next three green CI runs is ≤ 19 minutes (80 % of the current ~24-minute median); if not, the timing section names the new long pole and nothing else changes without a new DEC.
DOCS: e2e-harness.md — DEC-087 (the section, the judge verbatim, the file-is-the-shard-unit rule: no spec file above ~25 tests); changelog.
INVARIANTS: DEC-023 full local run (both projects) green before reporting; whole-tree format:check; total test count identical before/after (state both numbers); nothing outside scope; limitations before the end.
COMPLETION REPORT: the before and after six-shard tables; the new file list with test counts; the total test count before/after; the timing section from your local run.
```
---

Nothing to attach and no Publish. After it lands and CI is green: W4 (model required, and settled specs filled and hidden) goes next.
