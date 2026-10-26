# Foundations — turn K2: completion report

Brief: `docs/governance/briefs/foundations-turn-k2.md`, sha256 `42a20c4cf0a3dfc38496637aac5478d7faa12a9be32ec60a58169658ccd45205`, 53079 bytes (matches the carrying message).

## 1. Done by part

- Part A: done. `git rev-parse HEAD` = `83badbbaa0fb59ee1485ccfcc173d61a162907ed` = BASE (<START>).
- STEP 0: done.
- Part B: done (BLOCK 1 and BLOCK 2 written by script from the saved brief); red first as specified.
- Part C: done (16 lib.ts and 2 land.ts EDITs, copied by script).
- Part D: done (D1 roadmap line 3; D2 AGENTS.md, register row 56, changelog, roadmap lines).
- THE CHECKS and the reviewer: done.

## 2. Files (`git diff --name-only <START>`)

.claude/hooks/land.ts, .claude/hooks/lib.ts, AGENTS.md, docs/_changelog.md, docs/governance/briefs/foundations-turn-k2.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-k2.report.md, roadmap.md, scripts/conformance/non-null-allowlist.txt, scripts/conformance/non-null.test.ts.

## 3. CI (A1)

ci-status.md, first six lines:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `cd3e00ddcdcfc4868008b4f4de11c1bae04b42e8` (short `cd3e00d`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T20:45:49Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40392505916
```

e2e-last-failure.md: `last E2E run 40392505916 passed`; guards-last-failure.md names the same run. Run 40400996498 on BASE had not reached the evidence branch yet (queued, as the brief expected). No red to fix.

## 4. Red first (B2, on BASE's kit)

```
× CF-NN-1 every file holds no more non-null assertions than its allowlist line, and the kit none 2646ms
✓ CF-NN-2 the census names planted assertions and passes a guard, optional chaining and an environment read 4ms
AssertionError: expected '.claude/hooks/land.ts:219 uses a non-…' to be '' // Object.is equality
Tests  1 failed | 1 passed (2)
```

## 5. THE CHECKS

- Hash list `sha256sum -c`: all 7 OK.
- `git diff <START> --stat -- src e2e supabase`: empty.
- build-errors.log: `build OK`.
- `bun run lint`: `✖ 39 problems (0 errors, 39 warnings)`.
- C2 `bunx vitest run scripts/conformance`: `Tests 2 failed | 108 passed (110)`. The two failures are `× AAN-1 … 6521ms` and `× CF-SL-1 … 8448ms`, both known limits (timeouts). CF-NN-1/2 and EXH-1…24 passed.
- `bun run test:unit`: `Test Files 1 failed | 323 passed (324)`, `Tests 1 failed | 1985 passed | 1 skipped (1987)`. The one failure is `× CF-SL-1 … 5792ms`, a known limit. Run alone, strings-layers, auth-answers and executor-hooks gave `Test Files 3 passed (3)`, `Tests 32 passed (32)`. The supervisor counted 1987 tests all passing; this run has one skipped test, the same skip as earlier turns.
- `bun run format:check`: run last, clean.

## 6. K2

Forms the census does not see: definite-assignment assertions (`let x!: T`), which are not NonNullExpression nodes. Examples: e2e/post-wizard-bundle2.spec.ts:1751, :1753; src/lib/refresh-after-write.test.ts:21; src/features/posting/use-draft.test.tsx:124, :125, :180, :192, :211, :219, :241 (the grep output above was cut at ten, so more may exist). Plain `.js`/`.mjs` files under scripts/ are not read either; a grep found none with the mark. These are listed, not changed. No count in the allowlist looked wrong: the census's keys matched every line (no stale-line failure).

## 7. Migrations, strings, product code

None, none, none.

## 8. Reviewer

Verdict: READY. Each kit change keeps its behaviour. `charAt` gives "" past the end, the same as the old reads, which were bounds-checked already. `wordAt` reads within `w < words.length`. Every `?? ""` / `?? null` fallback sits behind a match that has already succeeded. In land.ts, `reportFile` narrows through `fail` (`never`). EXH-1…24 are green. MINOR: the definite-assignment form in section 6 is a gap in the rule's coverage. I recommend a later turn decide it.

## 9. Departures

None.

## 10. Limits

The harness runs builds and typechecks. The known unit timeouts (AAN-1, CF-SL-1) pass alone. No browser run was owed. CI on the final commit is the full proof.
