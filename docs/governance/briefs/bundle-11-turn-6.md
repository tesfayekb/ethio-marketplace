# Bundle 11 — turn B1 fix: the row's three-dots menu is not modal (INC-539): brief, version 1 (saved unchanged, 2026-10-10)

```text
BUNDLE 11 — TURN B1 FIX (2026-10-10). ONE SHORT TURN. No migration, no database change, no package change, no new string.
Base: dev 5958c368. This file is public: it is written as build instructions. Tier B (a shared admin block).

ANSWERS TO TURN B1
- Verified by diff of 0160270f..5958c368: the 26 carrier and map paths and the brief, each byte-identical to the supervisor's copy.
- CI on 5958c368 (run 38089961758) is RED: 19 failed, in two groups.
  - CO-9, everywhere it ran (both widths, both attempts, the fast lane too) — INC-539, fixed by this turn.
    - CO-9 opens Rail order from the row's three-dots menu and closes the dialog with Escape. The next click on the page then timed out: "<html> intercepts pointer events".
    - The page's pointer lock outlived the dialog. A modal menu and the modal dialog it opens both lock the page; when the dialog opens while the menu is still closing, the lock can stay after both have closed.
    - The fix, at the shared block: the menu is no longer modal, so the dialog alone locks the page.
  - Fifteen tests in shards 2 and 3 (mobile-360; posting, settings and shell tests that sign in) — INC-540, NOT fixed here.
    - Staging Auth answered the password sign-in with 429 "over_request_rate_limit", and two sign-ins timed out.
    - It is the first time in the flake ledger, and none of these tests is touched by B1.
    - This turn's own CI run is the re-run. Fix nothing for it.
  - Every other B1 test passed: CO-1, CO-2, CO-7, CV-2, LT-1, LT-2, LT-5, LT-9a, LT-11, LT-13 and LT-16.

WHAT THIS TURN BUILDS (INC-539)
- src/components/shell/row-actions.tsx — `<DropdownMenu modal={false}>`, with the reason in the file's header comment. The menu still closes on a choice, on Escape and on a click outside, and gives focus back to the three-dots (HS-3).
- src/components/shell/row-actions.test.tsx — one new test: an open menu leaves `document.body.style.pointerEvents` alone. It fails on the modal menu (the supervisor ran it red, then green).
- src/features/admin-attributes/attributes-page.tsx — the same one prop on that page's own row menu, whose entries open dialogs (edit, assign, remove, delete). That menu moves onto RowActions in turn B3.
- The other menus in the app open no dialog and are not changed: the language switcher, the account menu, the panel switcher, the location selector, and the attributes origin menu.
- Docs: display-primitives.md (a section), the changelog, the roadmap (line 3).
- No e2e spec changes: CO-9 is the test that found the fault and is unchanged.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-6.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect 5958c36 FAILURE: the reds named above; fix only INC-539). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier;
  5. the hashes;
  6. the checks;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the carrier's paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-6.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 6 files → each equal to:
  9bfbb1235bb372f7bb9a0e43112c664d753112af16eb6df70cbacb15b72be400  docs/_changelog.md
  92bd81a4305def9c75ae57964e2f9b11433c0917a62359b73ee2a3e51a4f453f  docs/features/display-primitives.md
  051e69976cbacac57e3e69da709e29980f1b778ed174f3dbd94bf2d5a69c433a  roadmap.md
  8b34792030aa3fcd4bab04f218b274c065cf6a5b2648bd0d9c7222c9eea1364d  src/components/shell/row-actions.test.tsx
  f4943abbfdd9dc724638862f240b8096e1cb359fd156c8a4488a0cb5322518c1  src/components/shell/row-actions.tsx
  49705861908adfefcb34f24de85e3ad3e03fd20aca417bf90670e3949a706842  src/features/admin-attributes/attributes-page.tsx

THE CARRIER — B1F-TURN-CARRIER-2026-10-10.md (66,296 bytes; sha256 73e25d98879a1bed5d69208613d2e30f271019a8e8b6ad99017851283216a0f4; 6 sections)
- Its first line starts "B1F TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes: REPLACE (the whole file); APPEND (added at the end of the file).
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 6 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  a6cea408af485235efd170669ad006f2706e8fe3db9259947cfda24764472839  docs/_changelog.md
  9ae603a0dfc9d658db8fdbc30e7c06fdad652f82bcc53cbefa6a6b8ae4291491  docs/features/display-primitives.md
  f6ea6e13e108acbc6bf96754b742b6ccf30a6e254cf8fe2717dec9a458b1a091  roadmap.md
  77231f08a9f10c9721ba0d42e39397b2633edc2481891bed878fda4dc6f297a3  src/components/shell/row-actions.test.tsx
  f39d0d599c3cc871beec35b032d6a124fe3df8f7a03b3bd26492aa59f41fb8a1  src/components/shell/row-actions.tsx
  b1051354f359556a66374adf624070cdbb7a606a54a9890d7b25d301242d42fa  src/features/admin-attributes/attributes-page.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 614 passed (95 files);
- `bun run i18n:map-guard` "usage maps match the tree." on the first run;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run build` clean.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(b).
- The 6 sha256sum lines and the brief's.
- `git diff --name-only 5958c368` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 5958c368 HEAD` too. Expect 7 paths: the hashed paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): send the executor nothing for about 25 minutes while CI runs; then Publish; then the supervisor's walk lines for Countries, Coverage and Places.
```
