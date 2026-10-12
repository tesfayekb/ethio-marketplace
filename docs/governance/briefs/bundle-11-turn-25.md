# Bundle 11 — group 3, turn G3c2: G3c's red (INC-560): brief, version 1 (saved unchanged, 2026-10-11)

```text
BUNDLE 11 — GROUP 3, TURN G3c2 (2026-10-11). ONE SHORT TURN, NO MIGRATION. No new strings. No package change.
Base: dev 33bba758. This file is public: it is written as build instructions. Tier B: one test and the docs.

ANSWERS TO TURN G3c
- Verified: dev 33bba758 holds the delivered tree and the brief as sent (37 paths and the brief, byte for byte).
- CI run 38183335583 on 33bba758: FAILURE — 1,737 passed, 5 gating failures, 10 flaky passes.
  - TR-16 (desktop-1280, shard 6 and the fast lane): the supervisor's new check, INC-560, fixed below. Not your defect.
  - CO-1, AU-5 and PW-12 (mobile-360; shards 1, 2 and 3): staging's sign-in gateway answered "504 upstream request timeout" during the run (a sign-in that never landed; a user create sent twice after a dropped call, as DEC-104 states; a draft poll that ran out of time). Eight of the ten flaky passes said the same. Transport, not code: no change; this turn's CI run is their re-run.
  - CT-44, AT-80, TR-24 and AL-16 passed in the matrix on both projects (CT-44 once timed out in the fast lane, contention).

WHAT THIS TURN BUILDS
- INC-560 — TR-16's new check (the box follows the restored text) read the strings table while the History drawer was open. The drawer is modal: while it is open the page is hidden from role-based locators, and on a computer the editor is found through its table, so the check found nothing. On a phone (the card list) it passed, so the box does follow.
  - e2e/admin-translations-console.spec.ts, TR-16 only: after the restore lands, press Escape, wait for the drawer to close, then check the box. Nothing else in the test changes; no assertion loosened.
  - The census of the class (a check through a role-based locator while a modal is open): no other test does so.
- DOCS: translations.md (INC-560), the changelog, the roadmap (line 3; the G3c2 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- CO-1, AU-5 and PW-12 get no change: their failures were staging's sign-in gateway, and this turn's CI run re-runs them.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn G3c applied)
- typecheck, format, lint (0 errors, 33 warnings), 671 unit tests (109 files), the usage maps, the hardcoded-string scan, the selector self-test, the root-route check, the build and the bundle budget: all clean.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-25.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 33bba758…, conclusion FAILURE (TR-16, CO-1, AU-5, PW-12)). If it shows another commit or another conclusion, STOP and report. You cannot git-fetch that branch;
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
- Scope — these files only: the 4 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-25.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 4 files → each equal to:
  455bb1fca53c4e16157270b3f1913025e91bcdb928d29b496ca64de7f460e145  docs/_changelog.md
  faa28e29cac511b5e030a8d6cff0678962c77ab03de4ca9a4961d1dd34fefe27  docs/features/translations.md
  e9e3d9cf4fe87977d9701e0dd368f4cf7dfc0c6b5382797d6cf619edad4e39aa  e2e/admin-translations-console.spec.ts
  55f863aa9d695139bc4a8920df1f25c1d63016079784307a35b842eada45d567  roadmap.md

THE CARRIER — G3C2-TURN-CARRIER-2026-10-11.md (2,314 bytes; sha256 339384318309adce8f4090ee96663c76a41eb02d20a6b1138693a24e4c606fda; 5 sections)
- Its first line starts "G3c2 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 4 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  97a15c87e89e8623712463b2d146bf57adfa66f60abc0cd5382cc7ee616ad4aa  docs/_changelog.md
  6c26157bbf8ee917836e60302a83b401dfdf737ce18c73fd9fdb9d7a96ffa73a  docs/features/translations.md
  1401ea780443ed9089f80929a375e5b7e35a67a2bedd5826f37f0bd850e3ec50  e2e/admin-translations-console.spec.ts
  47354873369233e1304bf208d42776d0eed0e721b16ae1da7be53e6cb132f223  roadmap.md

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
- The 4 sha256sum lines and the brief's.
- `git diff --name-only 33bba758` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 33bba758 HEAD` too. Expect the 4 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
