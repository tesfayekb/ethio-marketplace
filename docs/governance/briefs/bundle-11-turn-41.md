# Bundle 11 — turn C13: "Details reset" only when an answer the form held was taken (INC-576), and the e2e fixture answers the category finder (DEC-178, INC-577): brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C13 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev 7d44c150, the commit that landed turn C12; the census below proves every file by content. This file is public: it is written as build instructions. Tier B: the posting form's specifications step (its Undo offer), the e2e fixture (under its own DEC — G22), two e2e specs, a unit test, docs. No door, no database change.

ANSWERS TO THE LAST TURN
- Turn C12: verified. Dev 7d44c150 equals the supervisor's build byte for byte, the brief as sent. Its CI was running when this brief was written; the supervisor reads it, and a fix it needs comes in the next turn.
- Turn C11: its CI run was red on SETM-1 alone (INC-575, fixed in C12); every E2E job passed, with one test passed on retry.

WHY THIS TURN
- INC-576. PW-74 ("a step-3 round trip keeps every answer") passed on retry in three runs in seven days, the DEC-030 threshold. One of its failed attempts (run 37757408597) says "PW-74 before: a reset fired": the "Details reset for …" notice (`post-specs-reset`) was on screen through the whole 10 s wait of the test's first check.
- Read in the code (src/features/posting/reset-scope.ts, `resetAfterMove`; step-specifications.tsx, the reconciliation): when a parent answer moves, every detail that depends on it is re-derived, and when that changed any answer the step offers "Details reset for <the new option>" with Undo for ten seconds. A FIRST choice whose option carries facts — PW-74's model fills the doors and seats; its kind fills the power source — changes only empty details. The step still says "Details reset", and its Undo has nothing to take back.
- That is against two written rules: DEC-139, "no Undo offer appears unless something changed", and PW-163, "a first answer offered a reset" must never happen.
- The same reading explains why PW-74 usually passes: its "no reset" check waits up to 10 s, and the offer lives 10 s, so the check passes when the offer expires inside the wait. Why the offer stayed for the whole wait on run 37757408597 is not read yet (a HYPOTHESIS: an option list that arrives late makes an earlier answer count as a move); with no offer on a first choice, there is nothing left to wait out. PW-60's last check is the same class: after a system change (which rightly offers Undo), it waits 10 s for "no offer" after an identity change, and passes by waiting the system change's offer out.
- INC-577 / DEC-178. In CI every browser test reaches `/api/catalog/find` from one address (no edge header), so the route's E2E dial — two an hour on that one key (src/server/catalog-find.server.ts) — refused nearly every search and let a few through. A search that got through was answered from the finder's index, which holds no scratch leaf made since its last rebuild, so the test's own leaf could drop out of step 1's list: PW-157 (run 38218977877) failed on "post-category-hit … element(s) not found". The refusals were also printed beside the posting doors' own: PW-59's client errors (DEC-177) name `/api/catalog/find` for their 429.

WHAT THIS TURN BUILDS
- src/features/posting/reset-scope.ts — `resetAfterMove` also returns `replacedHeld`: true when the pass replaced or removed an answer the form held (the seller's own or a prefill). Filling an empty detail sets `changed` and not `replacedHeld`.
- src/features/posting/step-specifications.tsx — the Undo offer ("Details reset for …") is set only when `changed` and `replacedHeld`. The link defaults are re-opened after any change (INC-245), as before. Nothing else in the step changes.
- src/features/posting/reset-scope.test.ts — (xi) a first choice that fills empty details: `changed` true, `replacedHeld` false; (xii) a new fact over a held prefill, and a hidden held answer: `replacedHeld` true; (xiii) a move that changes nothing: both false.
- e2e/post-wizard-specs.spec.ts — PW-74: once the first kind's fill shows, and once the first model's doors show, it reads the offer once: none. No other line changes.
- e2e/post-wizard-resets.spec.ts — PW-60:
  - after the system change, the offer is shown and names the new system (its positive control);
  - its last check reads once, after the identity change is saved, that no offer names the new identity. The 10 s wait it replaces is removed.
  No other line changes.
- e2e/fixtures.ts — `finderStub` (auto) — DEC-178:
  - every fixture page answers `**/api/catalog/find**` with the route's own spent-dial answer, 429 `{ "error": "rateLimited" }`, marked `x-e2e-finder-stub: 1`;
  - a test that routes the finder itself is unchanged — its route is registered later and runs first (PW-85, PW-86, PW-105);
  - DEC-175's refusal capture skips the marked answers, and the client-error capture skips the browser's "Failed to load resource" line whose location is a stubbed request.
- Docs: posting.md (INC-576), e2e-harness.md (DEC-178), the changelog, the roadmap (line 3; the C13 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- INC-576 reads DEC-139 as written: a first choice that only fills empty details is not a reset, so no notice and no Undo. A change that replaces or removes a held answer keeps its notice and Undo (PW-32, PW-164, PW-167 unchanged).
- DEC-178, with its JUDGE frozen before the numbers: kept unless, over the next ten completed runs, a failure body shows a test that needed the finder's real answer and got the stub, or PW-85, PW-86 or PW-105 fails because of it; either reverts it.
- INC-576's decision rule: PW-74 closes when it has no matrix-lane line in the flake ledger in the seven days after this turn lands; one line reopens it with the cause read again.

TESTS
- Unit: reset-scope (xi)–(xiii) (NEW cases).
- E2E: PW-74 and PW-60 (changed as above). Every other test that searches step 1 now always gets the name-only list, as nearly all did before. The finder specs (PW-85, PW-86, PW-105) route the finder themselves.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C12 applied)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 719 unit tests (122 files), the usage maps (they match), the hardcoded-string scan, the root-route check, the selector self-test, the identity-tag guard, the build and the bundle budget ("JS: 309.6 KiB / 320 KiB").
- Red first: (xi)–(xiii) fail on the base, which has no `replacedHeld`; (xi) is the rule. PW-74's model read fails on the base by construction: the test waits for the model's list before choosing, so the choice is a move, and the base sets the offer in the same pass that fills the doors. Proven in CI only (INC-506).
- The stub's evidence path, in a local Chromium: a fulfilled 429 keeps its `x-e2e-finder-stub` header on the response, and the browser's "Failed to load resource … 429" console line has the request's address as its location.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-41.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn C12's commit or an earlier one, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- Scope — these files only: the 10 paths in the hashes table and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-41.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 10 files → each equal to:
  99a28a30e53e17c99f0e330fe2946aa35f0f67f46f6b1755c0527a2e8cc12095  docs/_changelog.md
  3388371eedab74c24eafa7b43f6382e6e45f7b9383e8f00c74d16dc1da12ea31  docs/features/e2e-harness.md
  f48e3daea7cc57310650bbc6fd86c22e1c54f224aa9d5f54098f651d6a937779  docs/features/posting.md
  483711a7efa22ffa358b340aa35709007d4c6a5001847443690263c20772070d  e2e/fixtures.ts
  ce8e709af46196ba0f239ae5d5fbeb6be72ff89b6a02dbd4277badd5f12a5795  e2e/post-wizard-resets.spec.ts
  6f87a2542451f16df7cb9edda65cf5ce09be9c7e80a25eb27a07d98dff26017f  e2e/post-wizard-specs.spec.ts
  b6bd2b9392b0ea7b117c2a9cc3f98b6c90226b0edbac472c63c7d3f145e3d6a5  roadmap.md
  0fce21e75ca39ce930f40e0e42c62de5946a03a56a60a64b2396aadfa24af2f3  src/features/posting/reset-scope.test.ts
  d8e86e153d2b10ba5370b20de5203f53630a853ff2284adeb4cbd61b01a50722  src/features/posting/reset-scope.ts
  73fd50cfe84f982656f7cb7877a7125891dd36acc6ff2c8221cab11375609d9b  src/features/posting/step-specifications.tsx

THE CARRIER — C13-TURN-CARRIER-2026-10-12.md (13,576 bytes; sha256 b3d8f173bf673ea922a38a19e9a741a87392d9e842acd1ff60b7d66d9c3d875f; 22 sections)
- Its first line starts "C13 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 10 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  aed074c7d5cd4dd013333aeb9e18d85fcf76832f7365fdaec6c7b5161ce8469b  docs/_changelog.md
  82f9e4fda84561a9ad5449b06e07b3b341a271f6da2e2eeb07e9114fdaf2affb  docs/features/e2e-harness.md
  deb2abe7c5410d3a0bf4a1d289ed53064cfca0e9809e0e550a382c1cc178d7d6  docs/features/posting.md
  5fa272dbacc3279ece124b7d689af43f1647c659ddce6f785e91dcef11319ebd  e2e/fixtures.ts
  bd040c95c603245b42fb69e0ac4d489ff18471f80357ac8ddcb7c871418e7057  e2e/post-wizard-resets.spec.ts
  8690d666f538c61f29a29abd062d8f696da8f5bbf0321ad8aa173332762a02b0  e2e/post-wizard-specs.spec.ts
  8850a0e4f4106db5ce5f6210d4ea61c42a3280f660cc017c95adfe04faf5b2b9  roadmap.md
  4794eeadaeaf7556abc7391c9af94e198ab4990da8fd26f00322b4c706c2c670  src/features/posting/reset-scope.test.ts
  dc78f6183352f1232be5265f99040625077f3e803d556c58ba76de0b1bed7b01  src/features/posting/reset-scope.ts
  7f4083c56743d5270f96292f461e0b860ac6812f888414ab2464e0b41fbf0186  src/features/posting/step-specifications.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 719 passed (122 files);
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
- The census results (a)–(b).
- The 10 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 10 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Publish once CI is green on the final commit (the specifications step changed).
```
