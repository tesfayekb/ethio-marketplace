# Bundle 11 — group 3, turn G3d2: G3d's red (INC-561): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — GROUP 3, TURN G3d2 (2026-10-12). ONE SHORT TURN, NO MIGRATION. No new strings. No package change.
Base: dev 6148f2ef. This file is public: it is written as build instructions. Tier B: one test and the docs.

ANSWERS TO TURN G3d
- Verified: dev 6148f2ef holds the delivered tree and the brief as sent (10 paths and the brief, byte for byte).
- CI run 38195005620 on 6148f2ef: FAILURE — 1,611 passed, 1 gating failure, 7 flaky passes. TR-20, TR-20m, TR-31 and TR-38 (this turn's tests) did not fail, nor did TR-2, TR-6 and TR-24, which read the roster's testids.
  - The red: i18n-coverage.spec.ts "the mobile drawer renders no English fallback" (mobile-360, shard 3) — `e2e-post-4-0-9zwipg => "ipg"`. That is PW-171's scratch category (post-wizard-recent.spec.ts :59 renames it to its slug's last three letters), in the public menu while the check read it. INC-561, fixed below. Not your defect, and not the roster's.
  - The flaky passes were staging's (statement timeouts, a reaper error, a slow tree) and TR-7b once in the fast lane: no change.

WHAT THIS TURN BUILDS
- INC-561 — the Amharic coverage test (e2e/i18n-coverage.spec.ts, `assertAmharicCategories`, used by "the marketplace shell" and "the mobile drawer" checks) reads every row of the public category menu. Other tests' scratch categories (`e2e-…` slugs, J1) sit in that menu while they run; PW-171 renames one to its slug's last three letters ("ipg"), which reads as an English label. Every other menu reader already leaves scratch rows out (`:not([data-testid^="rail-category-e2e-"])`: category-nav.spec.ts, shell.spec.ts; INC-170, INC-170b); this one did not.
  - The fix: the check judges the catalogue's own rows only — rows whose slug starts with `e2e-` are left out before the count and the English check. No assertion loosened: every real category is judged as before, and at least one must render.
  - The class's third occurrence (INC-170, INC-170b, INC-561): its guard — one shared reader of the menu's catalogue rows and a check that refuses a menu selector outside it — is queued on the roadmap as its own turn.
- DOCS: the changelog; the roadmap (line 3; the G3d2 line; the Listings console's Undo, turn L4d, D141; the class's guard).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The reader is fixed, not the writer: PW-171's scratch category must stay postable for its own test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3d applied)
- typecheck, format, lint (0 errors, 33 warnings), 671 unit tests (109 files), the usage maps, the hardcoded-string scan, the selector self-test, the root-route check: all clean (the source is unchanged since G3d's build, which was clean).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-27.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 6148f2ef…, conclusion FAILURE (i18n-coverage, the mobile drawer)). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- Scope — these files only: the 3 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-27.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 3 files → each equal to:
  83904a7c075d6ac5ed3509bcb7e88f1cdeb0f300e995752d98b74954a12f2608  docs/_changelog.md
  3ecfab75eb6f5db4ff621075e9096b5333282d94acc7b03ab26fa820ef5fa461  e2e/i18n-coverage.spec.ts
  6e5cf8e850195fe2ccb80a528e4417e404da230ffe732a4ba079c0af5819eea1  roadmap.md

THE CARRIER — G3D2-TURN-CARRIER-2026-10-12.md (3,051 bytes; sha256 307d9527674ef3d3cc8bac1c7348a3d4ff70899569d2eff72efaae9a42fb8c08; 6 sections)
- Its first line starts "G3d2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 3 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  423162dbabb75de982cab2db3693be5a173ec5429486219cdec1c04604bf44f7  docs/_changelog.md
  f594b018254f15bfe096ded368b55c581ad489d6c25fb2a599403b875a2bfe57  e2e/i18n-coverage.spec.ts
  d8866f7072c868c978bd68132a1a00d3c2af344606f9771740f386a900f613da  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 671 passed (109 files);
- `bun run i18n:map-guard` "usage maps match the tree." (first run: no source string moved);
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(b).
- The 3 sha256sum lines and the brief's.
- `git diff --name-only 6148f2ef` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 6148f2ef HEAD` too. Expect the 3 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
