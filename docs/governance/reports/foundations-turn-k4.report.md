# Foundations turn K4 — STOP before STEP 0

## 1. Verdict

NOT DONE. Part A passed. A governing-rule conflict prevents STEP 0 and implementation; no brief, roadmap, workflow, selector, guard or records changes were made.

## 2. Starting point

`git rev-parse HEAD` returned `ebd91c10054b43e0820efabad2b9705af2831677`, exactly BASE. `git diff --name-only BASE` was empty before this report.

## 3. CI evidence

The first six lines read from the authorized ci-evidence URL were:

```text
# CI Status (auto-generated — do not edit by hand)

- Commit: `4658634311f0ee5b47c9d1102ab579513ced1c36` (short `4658634`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-28T11:52:23Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40680789056
```

This is BASE's code commit, not a completed run on this report's future landing.

## 4. Governing-rule conflict

Project Knowledge's architecture rule says exactly:

> pure utilities ONLY /src/lib

`docs/conventions.md:19` says exactly:

> - **Formatters and pure utilities** live ONLY in `/src/lib/`. Currency, date,
>   and location formatting each have exactly one implementation there.

Part D requires “a small pure function exported from scripts/e2e-select.ts (`repeatPlan(tests, budget, perTest)` → { each, take })”. That location is outside `/src/lib/`. Creating the function under `/src/lib/` instead is outside this brief's scope and contradicts its prescribed export location and no-product-code requirement.

The brief directs: “If any rule of yours conflicts with this text, STOP before saving and quote that rule's exact words in the report.” No implementation was attempted.

## 5. Part and step status

- Part A: complete; HEAD and authorized CI evidence checked.
- STEP 0: not started; brief not saved, roadmap unchanged.
- Parts B–E: not started.
- THE CHECKS: implementation checks not run because implementation is blocked.
- Independent reviewer: not run; no implementation to review.
- Completion report: this STOP report only.

## 6. File list

Only `docs/governance/reports/foundations-turn-k4.report.md` was created.

## 7. Red-first proofs

B2 and D were not run. No tests were added or changed.

## 8. Test totals and workflow lint

No unit or browser tests were run. Actionlint was not run because no workflow changed. No build or typecheck was run manually.

## 9. K1 and K2

The implementation census was not run: this is a governing-rule STOP before STEP 0, not an implementation or a completed K2 review. No claims are made about sibling counts or bypasses.

## 10. Scope and excluded work

Migrations: none. Strings: none. Product code: none. Browser tests: none. Packages: none. AGENTS changes: none. Stateful Git commands: none.

## 11. Departures and limits

The prescribed implementation, tests and review remain unperformed because the pure-function location conflicts with the governing rule. Exact-byte extraction and fingerprint verification remain unperformed because the brief requires STOP before saving on a rule conflict.

## 12. Required ruling

Supply a corrected brief or an explicit governing-rule exception allowing this CI-only pure function in `scripts/e2e-select.ts`. No work continues after this turn ends.