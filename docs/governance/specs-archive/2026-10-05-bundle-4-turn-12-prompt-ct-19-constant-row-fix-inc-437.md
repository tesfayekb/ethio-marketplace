Source: supervisor thread, after turn 1376 (not in the raw turn files; text taken from the supervisor's scratch file turn12-prompt.txt), Mon 2026-10-05 01:26 New York.
Status at 2026-10-05: issued to the executor; origin/dev HEAD 48d3c53b "Fixed CT-19 constant row refs" (2026-10-05 05:42Z) appears to be its landing — not yet verified by the supervisor and its CI result is not recorded; the class rule (a file row for an existing row carries the row's current stored cells read at build time, never a constant; assert the test's own rows' planned actions, not totals) is to be recorded with INC-437.
Related: INC-437, INC-383 class, CT-19, e2e/admin-categories-lifecycle.spec.ts, G27, G28.

TURN 12: the red on 70e16ea5. Tier B. Tests only.

0. Read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/e2e-last-failure.md for 70e16ea5 (run 37264070069): one gating failure, CT-19 mobile-360 shard 1 — the preview planned {adds 1, changes 2}, the test expected changes 1. Everything else passed.

1. Cause (INC-437, the INC-383 class, CT-19's third ledger line): the file row for the scratch root carries the constant display_order "2000000" (e2e/admin-categories-lifecycle.spec.ts, CT-19 and the same literal at :876 and :953). Another test's import ran its ordering pass in parallel and renumbered the root, so the planner saw a second change. Fix all three places: build the row from the root's CURRENT stored cells, read through the service client right before the file is built; and assert the test's own rows' planned actions (the renamed child is a change, the new slug an add) rather than the file's totals, where the plan payload names rows — keep the totals only where it does not. Class rule in the file header: a file row for a row that already exists carries that row's stored cells read at build time, never a constant; a test asserts its own rows, not a shared roster's totals.

2. Run admin-categories-lifecycle alone, both projects, 2 workers, 0 retries, three times; all green. Typecheck, lint, format check. One changelog line; roadmap tick. Report; then end the turn so CI runs, and make no further push.
