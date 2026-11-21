STOP — tests-ci-2 item 7: correcting `shared-value-tables.txt:13` is far larger than the plan said
DONE: STEP 2 (items 1, 3, 6), STEP 3 (items 4, 5, 8), STEP 4 item 2 (DEC-413)
LEFT: STEP 4 item 7 (SMN-E13), STEPs 5, 6, 7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `a9504b98a9411a64c3dc686a00457d16dacab572` (short `a9504b9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T07:43:36Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44881157073
FILES:
.github/workflows/ci.yml
.github/workflows/feed-bench.yml
.github/workflows/lovable-branch-guard.yml
docs/features/attributes.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/feed-engine.md
docs/features/performance-strategy.md
docs/governance/briefs/tests-ci-2-ruling-1.md
docs/governance/briefs/tests-ci-2.md
docs/governance/reports/tests-ci-2.census.md
docs/governance/reports/tests-ci-2.stop-1.md
docs/governance/reports/tests-ci-2.stop-2.md
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
scripts/conformance/migration-guards.test.ts
scripts/conformance/migration-guards.ts
scripts/conformance/migration-reader.ts
scripts/conformance/wired.test.ts
scripts/datatable-minwidth.ts
scripts/feed-bench-market.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
scripts/fixtures/bad-datatable-minwidth-class-example.tsx.txt
scripts/route-budgets.mjs
scripts/shell-guards.test.ts

Ruling 1, item 5 says: "correct `shared-value-tables.txt:13`: a root added to the rail IS shared
by every test that measures the rail." My stop 1 planned option B with this estimate: "CF-LANES-4
would then judge every writer of root pointers: 15 spec files seed categories, some through
sanctioned helpers." This turn's census proves that estimate wrong (a premise the census proves
wrong is a STOP, rule 00).

The census: `scripts/conformance/shared-value-tables.txt:13` read as a shared row
(`category_tree_pointers | <why> | - | -`), judged by the CF-LANES-4 census itself
(`sharedValueFindings` in `scripts/conformance/shared-values.ts`, through a scratch script at
`/tmp/ethio-scratch/tests-ci-2/ctp-census.ts`; the manifest on disk is unchanged). Result:
**330 write sites in 51 spec files**. The largest: `e2e/admin-listings.spec.ts` 38,
`e2e/admin-screening.spec.ts` 27, `e2e/admin-categories-lifecycle.spec.ts` 22,
`e2e/my-listings-ad.spec.ts` 20, `e2e/feed-screens.spec.ts` 18. 18 spec files write the table
inline, not through a helper, so the manifest's helpers column cannot absorb them. A helper is
sanctioned only when its placement moves no shared value, and a helper that adds a root does move
one.

Why the census is so much wider than the concern: CF-LANES-4 judges a whole table. The shared
value here is narrower: the ROOT rows on the rail. A child pointer under a scratch parent moves
no rail row, but the census cannot tell it apart. The manifest has two forms: a shared table,
whose writers are judged, and a read-not-shared table. Neither says "shared with the tests that
measure it". Making line 13 a shared row means 330 `@global-state` tags or allowlist lines, and
most of the browser suite moving into the one-worker serial lane. That is far past THE CUT (G37),
and it is a behaviour change to CI that the ruling does not name.

What is built and green so far:
- The SMN-E13 spec and the manifest are untouched.
- Items 1–6 and 8 are committed; the last code commit is `7d795e055` (DEC-413).
- `bun run typecheck` and `bun run lint` are green on it.
- `bunx vitest run scripts --maxWorkers=2` ran on it: 679 passed and 2 failed. The two failures
  were CF-LANES-4 and CFRR-3, both "Test timed out in 5000ms", in files this turn does not touch.
  The machine's load average was 18 during that run. Run alone, both pass, in 0.5 s and 1.1 s.
- `scripts/ci/lovable-branch-guard.test.ts` passes alone (14 tests). Its two planted-git tests,
  CF-LVB-13 and CF-LVB-14, take 4.6 s and 3.7 s alone, against vitest's default 5 s limit, so
  they now carry an explicit 30 s limit.
- The checks gate (STEP 5) has not run yet.

QUESTION — item 7, choose one:

A. (recommended) SMN-E13 is tagged `@global-state` and reads its setup after its own fixture, as
   ruled. Line 13 is corrected by a third manifest form:
   `category_tree_pointers | shared with its readers | a root added to the rail IS shared by every
   test that measures the rail | e2e/submenu-look.spec.ts::SMN-E13`.
   - CF-LANES-4 judges that every named reader carries `@global-state`. A planted reader without
     the tag is found.
   - Writers stay unjudged, because only the measurers are exposed.
   - Files: `e2e/submenu-look.spec.ts`, `scripts/conformance/shared-value-tables.txt`,
     `scripts/conformance/shared-values.ts`, `scripts/conformance/lanes.test.ts`, and the lanes
     guide in `docs/features/`. All are inside the brief's scope.
B. SMN-E13 is tagged and reads after its fixture, as ruled. Line 13 keeps the read-not-shared
   form, with its reason rewritten to say the rail's measurers are exposed and are serial. Nothing
   judges a future measurer.
C. Line 13 becomes a shared row as literally ruled. The 330 sites in 51 spec files are each tagged
   `@global-state` or allowlisted. This is past THE CUT; it needs its own turn.
D. Item 7 leaves this turn with its INC; SMN-E13 stays as it is.
