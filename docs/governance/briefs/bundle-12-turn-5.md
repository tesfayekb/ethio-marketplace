# Bundle 12 — the tidy-up round, turn T5: CT-20 stops moving the real top-level categories (INC-497), and the CI evidence files name errors outside any test and warning steps (DEC-180: INC-589, INC-492): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T5 (2026-10-13). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 4959bbc4 (turn T4's landing). The census below proves every file by content. This file is public: it is written as build instructions. Tier B: one E2E spec, the E2E failure reporter and its fixtures, two workflow files (closed surfaces, under DEC-180), docs. No door, no database change, no screen change.

ANSWERS TO THE LAST TURN
- Turns T2, T3 and T4 landed byte for byte: each tree equals the supervisor's own copy (T4's at 4959bbc4). CI on 4959bbc4 judges all three; the runs on T2's and T3's commits were cancelled by the newer pushes, which gives no verdict. If that run is red, its fix comes in the next turn.
- T2's measurement: ethio-staging's real top-level categories sit at places 0, 2, 3 … 16. That is the trace of INC-497, and this turn fixes it.
- T4's measurement: the photo bucket is private on both projects, and no media setting is set. How photos are served is the operator's decision (INC-588), so the photo fix is not in this turn.
- T4's "not foreseen" (your carrier script learned the REPLACE mode): noted; the result matched the table. This carrier has two NEW files and no REPLACE.

WHY THIS TURN
- INC-497 (CT-18 read "15 changed" on a round trip of the real catalogue: six retried passes in seven days).
  - The import's order pass (admin_commit_category_import, migration 20261005165621, the INC-187 pass) renumbers every sibling of a row whose place the file states, from 0. It ranks the stated row by the file's value and every other row by its current place.
  - CT-20 (e2e/admin-categories-lifecycle.spec.ts) seeds a scratch top-level category at place 2,000,000. Its retire and reactivate rows stated display_order "0". The planner counts a place that differs from the stored one as a change (the plan's :399–403), and the commit collects it (:831–835). So the pass put the scratch category right after the first real top-level category and moved every real one after it by one.
  - Every undo of a scratch top-level row renumbers them back (the undo pass, migration 20261007063049).
  - CT-18 exports the whole roster and previews it. When CT-20 ran in between, in the other project, the preview read "15 changed": 16 real top-level categories, all but the first moved.
  - Turn T2's measurement read the real places on ethio-staging as 0, 2, 3 … 16. That is exactly this trace.
  - A test rewrote real rows (G27). The test is the defect, not CT-18 and not the import.
- INC-589. In run 38339977292, T1's fast lane exited 1 with every test green. docs/tracking/e2e-last-failure.md named no cause.
  - When an error happens outside any test (global setup or teardown, a worker's own fixture), Playwright fails a run whose every test passed. Its JSON reporter lists such errors under the top-level `errors`, and the list reporter ends with "1 error was not a part of any test, see above for details".
  - The reporter read neither channel.
  - The supervisor reproduced the shape with Playwright 1.58.1: two projects, both tests passed, the global teardown threw, the exit code was 1. That real capture is this turn's fixture (G20).
- INC-492. On 2026-10-07, during GitHub's incident, the Semgrep job's "Upload SARIF" step failed and turned the job red, though the scan itself had passed. Publishing a scan's evidence is not the scan.

WHAT THIS TURN BUILDS
- e2e/admin-categories-lifecycle.spec.ts, CT-20 only:
  - the retire and reactivate rows state no display_order, so the row keeps its stored place and no order pass runs;
  - a control, `assertAfterEveryRealRoot`, reads the top level through the service client after the seed and after each commit. The scratch category must sort after every real one. A "real" row is one whose slug does not start with `e2e-`.
- scripts/e2e-failure-report.ts:
  - `PwJson` gains the top-level `errors`; `Source` gains `outsideSummary`, the count in the log's summary line;
  - `outsideSummaryCount`, `outsideErrors`, `outsideHeadline` and `outsideErrorsSection` are new;
  - both forms (green and red) carry the headline `- Errors outside any test (INC-589): …` and the section `## Errors outside any test (INC-589)`. With none anywhere, the section says how many results files and logs were read;
  - the self-test gains checks O1–O10 on the real capture. The final "Self-test OK" sentence names it;
  - the verdict file is unchanged.
- scripts/fixtures/e2e-outside-error/results.json and changed.log.txt (NEW; the capture, byte for byte). .prettierignore lists the directory beside the other captured reporter fixtures (INC-083: reformatting evidence edits it).
- .github/workflows/ci.yml, the Semgrep job only: "Upload SARIF" gains `id: sarif` and `continue-on-error: true`; a new step "Warn: the SARIF upload failed" runs only when that upload failed and prints a warning. The scan's own steps still decide the job.
- .github/workflows/ci-status-report.yml: guards-last-failure.md opens with `## Warnings (non-gating steps that ran, INC-492)`, listing every step whose name starts with `Warn: ` and that ran (read from the jobs' own step list), or "No warning step ran in this run."
- Docs: e2e-harness.md (INC-497's cause, fix, rule and judge), ci-guards.md (DEC-180 with its judge), ci-status-reporter.md (the Warnings section), the changelog, the roadmap (line 3; the T5 line; INC-497 leaves the "Next turns" line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-497 is fixed in the test, not in the import. A file that states a place gets that place; that is the import's designed behaviour (INC-187).
- INC-497's judge: it closes after seven days with no CT-18 line reading "changed", counted from the first completed run on this turn's commit. One line is allowed: the first undo of a scratch top-level row renumbers the real places from 0, 2–16 to 0–15 once. Nothing is written to ethio-staging by hand to settle them (INC-405).
- DEC-180 (G22, judge frozen first): INC-589 and INC-492 together. The judge is in ci-guards.md.
- The new ids are O1–O10 (reporter self-test checks). CT-20 keeps its id.

TESTS
- E2E: CT-20 (edited, as above). Its control fails on the base, by the planner's rule cited above and T2's measurement: the scratch category landed at place 1, before the real ones at 2–16. Nobody can run it red here (your browser does not start, INC-506; the supervisor holds no staging access), so CI on the final commit is its proof.
- Reporter self-test: O1–O10 (NEW). Mutation-checked by the supervisor: with the green form's section and the log's count both removed, six of the ten fail.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn T4 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 731 unit tests (123 files), the reporter's self-test, actionlint on both workflow files, the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard.
- The warning-step filter, run on run 38339977292's real job list: nothing listed. With a planted "Warn:" step that ran and one that was skipped: only the first.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-5.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T4's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- Scope — these files only: the 12 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-5.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  0ff109b1c4518db9edefdc69276a42f6ec1ed89a7423aedc668aedb22c2e47d6  .github/workflows/ci-status-report.yml
  58320692ffcc688acc1a7d591cbd5ca504010aa7f18af2c86104e2d940366a6e  .github/workflows/ci.yml
  f2ebcf0a567fdfa099f795161c19fcb3d2234afbc9fdc424281cb2d0ec5bc8a3  .prettierignore
  bdc502e15b0ee61017e0fdeb36a9e8765080ac3d88173cdd16ce49ff5e6a2653  docs/_changelog.md
  807f42ad217a2f50c2a0dc4bd8710254230a635611fbf55c90275c6be5234aa6  docs/features/ci-guards.md
  fda1f93fe2fd185611ee00a02e516cce02d86986e2b7360a545a523c9c1d823e  docs/features/ci-status-reporter.md
  ed37b2f898ac6b7cd632e0e4ddc41c7a8975594c56f7ec51437213b157ded362  docs/features/e2e-harness.md
  e62d30da6769b03b9ae2560610a977bc19ded612d224cdb9d83fda0a4845c23e  e2e/admin-categories-lifecycle.spec.ts
  e3b714a10ad2dc25a9365ee623306f55015275e1460ed82decd584a4472b9169  roadmap.md
  c27a9187995969edd10222bcdf31bc665433ff3459b5f5003525586cfff64d5f  scripts/e2e-failure-report.ts
- (c) `ls scripts/fixtures/e2e-outside-error` → "No such file or directory".

THE CARRIER — T5-TURN-CARRIER-2026-10-13.md (28,249 bytes; sha256 0639cb95b662e3d90b7fa287752886bd3106102e5776545ec7b1a2e1c01b78be; 29 sections)
- Its first line starts "T5 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet (create its directory);
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 12 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  8c4a03aceb263e09012dcde969dc7cb3f470bed6a946af32e9e84591f67b58c0  .github/workflows/ci-status-report.yml
  556b93e1bc2a670db0eaa2a7b5c634bd85344069dbd5b290af06de7084c809e0  .github/workflows/ci.yml
  55fab1b449217ebfcd7d1af5d77da76ee6561ed5e5a1879387e9d3838bd18dff  .prettierignore
  7ad262c943c712001fb0f195e4d68866b2c74049f4f3fc4fdfc055679dba867d  docs/_changelog.md
  2ef01406ed3e0a1215419302e53aad7b835a42f17c9d8192f1f5dfa2e5dda41d  docs/features/ci-guards.md
  0b8333146d77ef5738229e95555e9370a374c4fced57c0f555b136f7ccc980a7  docs/features/ci-status-reporter.md
  c5f4774fae817043fbb4102b18d0f325960e2e0b90c8603b8cf4fd016e2da956  docs/features/e2e-harness.md
  f431a488e4d0643e4f2218b2bf72e5d7074f58a662a06627573fc544b5814a17  e2e/admin-categories-lifecycle.spec.ts
  3e19da42a67f21733ecbc8b4a4f4b4d482b54f87734e3b92ccec4614a8c7e0db  roadmap.md
  0fe20cfaf4dfd4175b4276d21472e26b5830248c7bf298800a9867914abdf201  scripts/e2e-failure-report.ts
  3c5a120ee9ec2afe2b7c2a796112ae7ca001470f876df71e97f63fe7ac86e78d  scripts/fixtures/e2e-outside-error/changed.log.txt
  838ab0cb093fe5e9e3621efd3fc8abbc8592787dfa7e8b909ad42f0e8ca83fdd  scripts/fixtures/e2e-outside-error/results.json

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 731 passed (123 files);
- `SELF_TEST=1 bun scripts/e2e-failure-report.ts` "Self-test OK: …", its sentence ending with the INC-589 clause;
- `bun run i18n:map-guard` "usage maps match the tree.";
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bash scripts/check-identity-tags.sh` (the OK line and the three named deferrals, as before this turn);
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."), and actionlint. CI's jobs judge them; the supervisor ran the typecheck and actionlint on its own copy.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 12 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 12 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply, nothing to walk (a test, the CI evidence files and two workflow files). Publish once CI is green on the final commit.
```
