# Bundle 11 — turn C10: a flaky test's body carries its own attempt's client errors (DEC-177), and PR-33 counts in one clock hour (INC-572): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C10 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change. No app code: the failure reporter, two e2e specs, one captured fixture and the docs.
Base: dev 93b4cbe1, the commit that landed turn C9; the census below proves every file by content. This file is public: it is written as build instructions. Tier B: CI evidence (the failure reporter, under its own DEC — G22), e2e specs, docs. No door, no database change, nothing under src/.

ANSWERS TO THE LAST TURN
- Turn C9: verified. Dev 93b4cbe1 equals the supervisor's build byte for byte, the brief as sent. Its CI was running when this brief was written; the supervisor reads it, and a fix it needs comes in the next turn.
- Turn C8: CI green (run 38241194130; main promoted to a2bf1847), with twelve tests flaky (passed on retry). This turn's DEC-177 is built from that run.

WHY THIS TURN
- DEC-177. DEC-175 (turn C8) made the e2e fixture print a failed test's refusals as `[client-error]` lines: 4xx answers and posting doors' `ok: false`. The failure report quotes those lines only in its shard-wide "Client errors" section, and it writes that section only for a source with a hard failure. The posting class (INC-449, INC-533, INC-562) shows mostly as flaky tests — failed, then passed on retry — so their refusals were printed and never read. Run 38241194130 (turn C8): twelve flaky tests, no client-error line in the report. Playwright's results.json keeps each attempt's stdout, so the report can read the failed attempt's own lines.
- First reading of the new evidence, in the same run. PW-57's body: "[INC-562] step 5 did not come after Next. Saves (draft, identity): draft 200 after 682 ms, ok=true | draft 200 after 1328 ms, ok=true. Refusal lines shown: none.", with "Test timeout of 60000ms exceeded" first. Both saves answered and agreed, and the test's 60 s budget ran out. PW-112 and PW-13 failed waiting for a step in `reachStep7` (post-wizard-place.spec.ts), which waits without `nextToStep`, so their saves were not named.
- INC-572. PR-33 ("the map fallback report is capped at 60 an hour per address") reached three retried passes in seven days, each "Test timeout of 60000ms exceeded" (the DEC-030 threshold): it sends 61 reports one after another, and on a slow staging 61 round trips pass 60 s. The door counts with one atomic `INSERT … ON CONFLICT DO UPDATE … RETURNING` (`consume_rate_limit`), so the reports need not go one at a time. Its windows are clock hours (the time floored to the hour), so 61 reports that straddle an hour split their count.

WHAT THIS TURN BUILDS
- scripts/e2e-failure-report.ts:
  - `attemptClientErrors(result)` reads one attempt's stdout from results.json (`text`, or `buffer` in base64) and keeps the lines that start with `[client-error]`, redacted, at most 24 (`ATTEMPT_CLIENT_LINES`).
  - A flaky test's body ends with those lines of its first failed attempt, under "--- client errors of this attempt (DEC-177) ---". There is no block when there are no lines. The flake ledger's line (the first message line) is unchanged.
  - The self-test reads a new real capture and checks that the body carries exactly its two `[client-error]` lines and no other stdout line, and that the older capture (no stdout) carries no block.
- scripts/fixtures/e2e-results-flaky-stdout.json (NEW): a real results.json from Playwright 1.58.1. One test printed two `[client-error]` lines and one other line on its first attempt, failed, then passed on retry. Not formatted: scripts/fixtures is outside the format check's globs.
- e2e/post-wizard-place.spec.ts — `reachStep7`: its three Next waits (steps 5, 6 and 7) go through `nextToStep`, which waits exactly as the expect it replaces and names the saves when the step does not come. No other line changes.
- e2e/posting-routes-dials.spec.ts — PR-33:
  - within the last 30 s of a clock hour, it polls the clock until the next hour has begun (`expect.poll`);
  - the first sixty reports go ten at a time;
  - the 61st goes after all sixty have answered.
  Every assertion is kept, plus "PR-33: not 61 answers".
- Docs: e2e-harness.md (DEC-177 and its judge; PR-33), the changelog, the roadmap (line 3; the C10 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- DEC-177, with its JUDGE frozen before the numbers: evidence only. It is kept unless, over the next five completed runs, it crashes the reporter or puts e2e-last-failure.md past its publish limit; either reverts it.
- INC-572: ten reports at a time, and a 30 s guard before a clock hour ends.

TESTS
- The reporter's self-test (CI runs it before the report): the DEC-177 check is new.
- E2E: PR-33 (changed as above); PW-112, PW-13 and every other test that uses `reachStep7` wait as before.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C9 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 712 unit tests (121 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard, the build and the bundle budget (unchanged).
- `SELF_TEST=1 bun scripts/e2e-failure-report.ts`: "Self-test OK". With the body change taken out and the new check kept, it fails: "SELF-TEST FAILED — DEC-177 a flaky attempt's client errors not carried exactly."
- The fixture was captured from a real Playwright 1.58.1 run (the repository's pinned version): stdout entries are `{ "text": "…\n" }`, kept on each attempt's result.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-38.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn C9's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- Scope — these files only: the 7 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-38.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 6 files → each equal to:
  729c9647e40b7a79bf26984dc3ab7c12306bfdd03a32f0266e132fdc03f7ed48  docs/_changelog.md
  c89f96270a63dded58a1866d46402cd4ba9aa9597af72b843d56407e83bd8677  docs/features/e2e-harness.md
  b24b7177e7f32ffde3be6f60efe0e54aba9e92e34b99545b05a519d113bcf1f6  e2e/post-wizard-place.spec.ts
  f2a29aefa3178a461d4c46388dff6b47400964fa0842bd304f8f32c12e4b14b1  e2e/posting-routes-dials.spec.ts
  122a715ce2c714198ac45bed62beb4e4b99656e3bf6451cacb2abc98f9497d21  roadmap.md
  d2385e01ac38bada4d7d2896da3daeb52db7a4ba019e2f985bcf36ba6c2fcf0d  scripts/e2e-failure-report.ts
- (c) `ls scripts/fixtures/e2e-results-flaky-stdout.json` → "No such file or directory".

THE CARRIER — C10-TURN-CARRIER-2026-10-12.md (15,899 bytes; sha256 788e78c1c29075802927dee5f94033539278519e5ff631bafbbdb02ec529071a; 17 sections)
- Its first line starts "C10 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 7 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  58aec3f8f7fd8af94a53ede666cb5a854f1f9bc07b44393b4518f0dc24ff9131  docs/_changelog.md
  3388371eedab74c24eafa7b43f6382e6e45f7b9383e8f00c74d16dc1da12ea31  docs/features/e2e-harness.md
  6bf49448d0ed0ace396cd53425c8e731b69790ab2b9caf09e5762771bb6864bb  e2e/post-wizard-place.spec.ts
  fc09f7870a95b1546dbb38836eb094f28faebb01f311fa7331fc37ad16da16f3  e2e/posting-routes-dials.spec.ts
  a3e211da7ec72f8249b322d340848bb6029bac31b8d82cf049a01af9e780944f  roadmap.md
  a2275fd13b614b919ee9715c8c4cd08344a11501a3c61ce1204f1848ec079390  scripts/e2e-failure-report.ts
  c68eb451b1f286e2becc3ab17e0dca776ec899ad5bd2cf5b07efb05c84861e9a  scripts/fixtures/e2e-results-flaky-stdout.json

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 712 passed (121 files);
- `SELF_TEST=1 bun scripts/e2e-failure-report.ts` "Self-test OK: …" (it renders into a temporary file and writes nothing in the repository);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran all three on its own copy (WHAT THE SUPERVISOR RAN).

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 7 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 7 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply and nothing to Publish (no app code changed).
```
