# Bundle 11 — turn C15: TR-29 judges the export by rows it owns (INC-580), and INC-579's measurement recorded: brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C15 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change. No app code: one e2e spec and the docs.
Base: dev 524ffedb, the commit that landed turn C14; the census below proves every file by content. This file is public: it is written as build instructions. Tier B: an e2e spec, docs. No door, no database change, nothing under src/.

ANSWERS TO THE LAST TURN
- Turn C14: verified. Dev 524ffedb equals the supervisor's build byte for byte, the brief as sent. Your M1 and M2 (a) are written into categories.md; M2 (b)'s refusal was right (no permission changed). Its CI run (38307275746) was red on TR-29 alone, on both attempts: INC-580, this turn. Every other test passed, with none passing only on retry.
- Turn C13: CI green (run 38266101610; main promoted to 74503dfd), no test passing only on retry.

WHY THIS TURN
- INC-580 (turn C14's red, run 38307275746). TR-29 (desktop, shard 5) failed on both attempts: "TR-29: the fence language held no stable row" (e2e/admin-translations-governance.spec.ts, the check turn C6 added for INC-568). That check requires the fence language to hold at least one non-scratch row both before the click and after the download. Those rows are not the test's own: each run's setup reaps fence rows older than an hour (e2e/global-setup.ts, the fence reaper). C14's run started more than five hours after the run before it, so the language held none. Class: a test that asserts a fact about shared rows it does not own (G27, G28).
- The check exists to prove that "nothing dropped" is not vacuous. The test already seeds its own key and finds it once in the file. With two more keys of its own, the proof no longer depends on what other tests or the reaper left behind.
- INC-579 (C12's red). Turn C14's measurements:
  - ethio-staging: 160 categories, 7 of them scratch and none older than a day; 161 tree pointers; 225 attribute links;
  - ethio-prod: 169 categories, 214 pointers, 1,321 links.
  The roster is small, so a catalogue grown by leftover scratch rows is ruled out. The query's own time on ethio-prod was not read: the executor's role may not execute `cat_primary_parent`, which the query calls. Turn C14's run had no miss, so no `[roster-dump]` line yet. The fix waits for that line (re-read still in flight, or landed without the row). Nothing is built for INC-579 in this turn; the measurement is written into categories.md.

WHAT THIS TURN BUILDS
- e2e/admin-translations-governance.spec.ts — TR-29:
  - two more keys of its own (`<key>-b`, `<key>-c`) are seeded in the fence beside `<key>`, and reaped in its `finally`;
  - the check "the fence language held no stable row" is removed, its cause named beside the code; the "nothing dropped" check keeps reading what the language held at both readings;
  - each of the three own keys must be in the file exactly once (the old check did this for `<key>` alone).
  No other line changes.
- Docs: translations.md (INC-580), categories.md (INC-579's measurement and the fix's wait), the changelog, the roadmap (line 3; the C15 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-580: the positive control is rows the test owns, not rows the reaper may have cleared. Removing the old check is not a loosened assertion: it asserted something about rows the test does not own (G27, G28), and its job is now done by the three own keys.
- INC-579: no fix without its cause (G21); the `[roster-dump]` line decides.

TESTS
- E2E: TR-29 (changed as above).
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C14 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 721 unit tests (122 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.
- TR-29 is proven in CI only (INC-506).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-43.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn C14's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and its fix is in this turn (INC-580). Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened beyond the one this brief names, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 5 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-43.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  20aa470759d840921d9883bd4a02553534748851613ec57592498aac03f981f1  docs/_changelog.md
  dcd01ba165549d047ce7bc358bc2c8157e61742f5fda12b0542c9a18b199b7cf  docs/features/categories.md
  ee2177a9285ae1ee15b0aea52eb1ca2d2bf2d64ab448e893d9a6516f9ea88de8  docs/features/translations.md
  2bf9e91d9d88269181b3809ee2ba5409d48812958ba62466f4d71ca1c66fbebd  e2e/admin-translations-governance.spec.ts
  43e91fc5be9d195801146a95637c98c6df51857ba169268a9d1b0d84742bd67d  roadmap.md

THE CARRIER — C15-TURN-CARRIER-2026-10-12.md (4,351 bytes; sha256 abb2b76ef6b1070a2ea2f750d5f1c19c21ddf920023cbb69fbf4d81202fbd6d7; 10 sections)
- Its first line starts "C15 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  5a7650c986e2e824ae59264dcca2831caca4cd9406178a41fd8f2ff25caf5add  docs/_changelog.md
  4106b2b63e70334a34f363dbb73931a8cafcb39c0e57c288e47e93e3484606c5  docs/features/categories.md
  f1ba4afae7d37b3e4f6d32697edee901694882e00478dd52fe1c2b5880ac8a9b  docs/features/translations.md
  38568306b4a1d274533e48fe33b663a568b0e2c8286f5a034bfdcb18b90e2f31  e2e/admin-translations-governance.spec.ts
  d27efcd110e2021b917ae09c58bf86954a4a2d5a8ebb427efbcef76df0ce46c5  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 721 passed (122 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(b).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 5 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit (C14's posting routes changed).
```
