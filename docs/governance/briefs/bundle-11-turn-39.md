# Bundle 11 — turn C11: DEC-172's verdict — six E2E shards again, unweighted; the location grid refuses a shard it has no row for (INC-573): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C11 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change. No app code: the CI workflow, one e2e spec and the docs.
Base: dev 45637132, the commit that landed turn C10; the census below proves every file by content. This file is public: it is written as build instructions. Tier B: CI infrastructure (the E2E matrix, under DEC-172's own rule — G22), one e2e spec, docs. No door, no database change, nothing under src/.

ANSWERS TO THE LAST TURN
- Turn C10: verified. Dev 45637132 equals the supervisor's build byte for byte, the brief as sent. Its CI was running when this brief was written; the supervisor reads it.
- Turn C9: CI green (run 38245598293; main promoted to 93b4cbe1); PW-186 passed. Seventeen tests passed on retry, mostly 60 s timeouts (see WHY).

WHY THIS TURN
- DEC-172's rule was frozen before the numbers (docs/features/ci-guards.md). Over the five green runs on dev after it landed, a median wall time of 30 minutes or less keeps eight weighted shards; above 30 minutes, the matrix returns to six shards and the weights are removed. The five green runs: f7638ec8 31.9, 88c6ed8c 31.8 (its second attempt), ea8c54d9 33.4, 3c94ec65 34.9 and 4913e366 32.8 minutes — median 32.8. The verdict was due at the fifth run (2026-10-12 03:38 UTC) and the supervisor read it late. Every green run since has also passed 30 minutes (30.1 to 37.9).
- Beside the time, the runs on eight shards had many tests that failed once and passed on retry: 10, 7, 7, 11, 12 and 17, mostly "Test timeout of 60000ms exceeded" across the admin and posting areas. Sixteen workers share ethio-staging instead of twelve. This is a hypothesis, to be read again over the next runs; it is not the rule's reason.
- INC-573 (found while building this turn). e2e/shell.spec.ts places each location-guess fixture on a grid with one row per job: smoke 0, shards 1–6, the fast lane 7, the email lane 8, and row 9 for anything else (`jobIndex`). Under eight shards, shards 7 and 8 both took row 9 and could share a fixture's place. LS-9 failed and passed on retry twice on shard 8 on 2026-10-12.

WHAT THIS TURN BUILDS
- .github/workflows/ci.yml:
  - the shard matrix is `[1, 2, 3, 4, 5, 6]`, the job named "E2E shard N/6", the run `--shard=N/6`;
  - the shard step's `PWTEST_SHARD_WEIGHTS` and its comment are removed, leaving one comment line;
  - `E2E_EXPECTED_SOURCES` names 1–6;
  - the tiers' header comment and the matrix comment state DEC-172's verdict.
  Nothing else in the workflow changes.
- e2e/shell.spec.ts — `jobIndex`: a numeric shard outside 1–6 throws "[e2e:guess] shard N has no row in the location grid (rows 1–6)". Every other job keeps its row (a missing or non-numeric shard still takes row 9).
- Docs: ci-guards.md (DEC-172's verdict; INC-573), the changelog, the roadmap (line 3; the C11 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- DEC-172's own rule decides the matrix (G6): nothing to approve but its reading — five green runs, each run's own start to its end; for 88c6ed8c the second attempt, after the staging apply.
- INC-573: refuse an unknown shard number rather than widen the grid (six shards fit it).

TESTS
- E2E: the LS tests that use the location grid run as before on shards 1–6.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C10 applied)
- Clean: typecheck (it covers e2e/), format (the workflow included), lint (0 errors, 33 warnings), 712 unit tests (121 files), the usage maps (they match), the hardcoded-string scan, the selector self-test, the identity-tag guard, the reporter's self-test ("Self-test OK"), and actionlint on the workflow (no finding).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-39.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn C10's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 5 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-39.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  18351e46ddadedc64c2ac74cb83a7ef4a1c908b8719c2e5a61f46868a03ca098  .github/workflows/ci.yml
  58aec3f8f7fd8af94a53ede666cb5a854f1f9bc07b44393b4518f0dc24ff9131  docs/_changelog.md
  befc27b354074c5fb5e29e940a17553c449cd194fe40617803f93addd8c1261c  docs/features/ci-guards.md
  4736bb030e0203800d04c8678d14b3dc3012e9f47255dffe638569a0fdc29736  e2e/shell.spec.ts
  a3e211da7ec72f8249b322d340848bb6029bac31b8d82cf049a01af9e780944f  roadmap.md

THE CARRIER — C11-TURN-CARRIER-2026-10-12.md (4,973 bytes; sha256 878620fafdb6ec73da6fc25befe6a6645cde7ed1b12590d62f276adf5a089334; 11 sections)
- Its first line starts "C11 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  58320692ffcc688acc1a7d591cbd5ca504010aa7f18af2c86104e2d940366a6e  .github/workflows/ci.yml
  684aedde14c925580f09d77fb2d05d255958a35ca1741962b3b429e70b18f660  docs/_changelog.md
  072a6911f116b1b24a215fd25d889fcb14f166fcfca8108d7f29305fffe078bf  docs/features/ci-guards.md
  0764476ce9d0406949ea95379870d5bc9348eceac76b03d97a2bd7dd8992f98c  e2e/shell.spec.ts
  c0ebeccd71e079cddc9d764d0898a8ee99af6e0c90d27f39553ce3af13918866  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 712 passed (121 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof — its first run on six shards.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(b).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 5 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply and nothing to Publish (no app code changed).
```
