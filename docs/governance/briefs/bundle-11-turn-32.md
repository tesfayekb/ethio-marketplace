# Bundle 11 — turn C3: INC-170's class, the public category menu's one reader: brief, version 1 (saved unchanged, 2026-10-12)

```text
BUNDLE 11 — TURN C3 (2026-10-12). ONE TURN, NO MIGRATION. No new strings. No package change. No app code: e2e tests, a test helper, a check, the docs.
Base: dev 4e111104bfe5bd15ad6195c71abb819af429432b. This file is public: it is written as build instructions. Tier B: test infrastructure. Tier A untouched.

ANSWERS TO THE LAST TURN
- Turn C2: verified (dev 4e111104 holds the delivered tree and the brief as sent). Its CI run is read by the supervisor while you work; a fix it needs comes in the next turn.
- Turn C1: CI run 38209410930 on 0386cd69, SUCCESS; main promoted to 0386cd69. The operator's walk of G3d, G3e and L4d passed.

WHAT THIS TURN BUILDS — INC-170's class at its third occurrence (INC-170, INC-170b, INC-561), promoted to a guard (§11: two occurrences, a class rule; three, a CI guard)
- The class: other tests' scratch roots (slugs `e2e-…`, J1) sit in the public rail and drawer while a test reads them, and a reader that judged them as the catalogue went red (INC-561: the Amharic coverage check read PW-171's scratch category, named by its slug's last three letters, as an English label).
- e2e/helpers/category-menu.ts (NEW) — the one reader of the menu's rows: `catalogueRows(scope, element?)` (the catalogue's own rows, never a scratch root), `anyMenuRows(scope)` (every row: for an absence, or a test's own scratch roots), `ANY_MENU_ROW` (the selector, for code that runs in the page), `slugOfRow(testid)`, `isScratchSlug(slug)`. An exact row is still read by its own testid (`rail-category-<slug>`, `rail-category-all`).
- scripts/e2e-menu-readers.ts (NEW) — the check: in any .ts file under e2e/ but the helper, a hand-built prefix selector on `rail-category-`, a pattern that strips it, or a replace of it, is refused (comments are not read). scripts/e2e-menu-readers.test.ts (NEW) runs it with the unit tests.
- The sixteen readers the check refuses on the base move to the helper, each with its meaning kept:
  - e2e/shell.spec.ts — the menu's geometry anchor and its navigation subject (catalogue rows; `slugOfRow` for the slug), the Marketplace panel's first row twice (catalogue rows), the account panel's absence of rows (every row), the fitted row height (catalogue rows);
  - e2e/category-nav.spec.ts — `firstCategory` (catalogue rows inside `nav li > a`, the same selector as before) and C-5's order of its own two scratch roots (every row — they are its subject);
  - e2e/i18n-coverage.spec.ts — `assertAmharicCategories` (the selector passed into the page as `ANY_MENU_ROW`; the slug through `slugOfRow`; scratch slugs left out through `isScratchSlug`).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The guard is a check run with the unit tests, like the test-id and admin-table checks; no CI workflow changes.
- A test whose subject is its own scratch roots, or that checks that no row is shown, reads every row; any other reader reads the catalogue's own rows.

TESTS
- Unit, NEW: scripts/e2e-menu-readers.test.ts — CMR-1 (a hand-built selector, slug pattern or replace is refused; an exact testid and a comment are not), CMR-2 (the helper may build the selectors), CMR-3 (the tree: no hand-built reader; on the base it refused sixteen).
- e2e: the tests in shell.spec.ts, category-nav.spec.ts and i18n-coverage.spec.ts that read the menu's rows read them through the helper — the same rows, the same assertions; none added, none loosened.
- Not edited: every other test.

DOCS
- e2e-harness.md (the menu's one reader and its check), the changelog, the roadmap (line 3; the INC-170 line becomes the C3 line).

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, turn C2 applied)
- typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 688 unit tests (114 files), the usage maps (unchanged), the hardcoded-string scan, the import, listing-write, browse and marketplace guards, the root-route check, the selector self-test, the build and the bundle budget: all clean.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-11-turn-32.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines (expect commit 4e111104…; any conclusion). If it shows another commit, STOP and report; whatever its conclusion, go on (the supervisor reads that run, and a fix it needs comes in the next turn). You cannot git-fetch that branch;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the usage-map check, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- No migration this turn: nothing is written to either database.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the 9 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-11-turn-32.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 6 files → each equal to:
  ab1fb508ff022889da3d6c81f86cbebfb56406b38efee9922e627da96169ae26  docs/_changelog.md
  97503c9cea254014c8917e02a77ee98ebf0ef37e3801500284598235cfea5c06  docs/features/e2e-harness.md
  4bc2a544729a387895d4ae9fc3ec8a5d09e802bfb0d959fe90ec13c777777f22  e2e/category-nav.spec.ts
  f594b018254f15bfe096ded368b55c581ad489d6c25fb2a599403b875a2bfe57  e2e/i18n-coverage.spec.ts
  804c411d83cdb65d759eae2c1988e0001cffdbda17e07bd2943b414da47e01c4  e2e/shell.spec.ts
  3c5bbd490bbefe2447e9eb2323beaed0dd462dd27aa154c1e8d496d902885904  roadmap.md
- (c) `ls e2e/helpers/category-menu.ts scripts/e2e-menu-readers.test.ts scripts/e2e-menu-readers.ts` → "No such file or directory" for each.

THE CARRIER — C3-TURN-CARRIER-2026-10-12.md (12,679 bytes; sha256 ff865fb2dd70140a7f062f25ff4bf9944d467aa9ea24215d51df715c4da89253; 26 sections)
- Its first line starts "C3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`.
- Modes:
  - REPLACE: the whole file;
  - NEW: a file that must not exist yet;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE USAGE MAPS — run `bun run i18n:map-guard`: it must print "usage maps match the tree." the first time (this turn moves no key). If it rewrites a map instead, run it again and name the rewrite in the report.

THE HASHES — `sha256sum` each of the 9 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  158e072a5330169f1fc89551defa074a95763375543284b344988920e5d37e1f  docs/_changelog.md
  ef03ddfafe776bb9d8c74a40eb888ca39bf1afb2d06290eff02158e207a382c6  docs/features/e2e-harness.md
  5bf388e025e2f14c7a24fb056fd46479bbe7d12e3aee5c33e0aac0011b4d90d1  e2e/category-nav.spec.ts
  ef387caf8784b8bdda882f7bce6352475f1484557f60bb496387f400b015ac69  e2e/helpers/category-menu.ts
  745f9fef5fe5f5d93c66c4f54e7dde59f061d5749e62c9458605a74e7a7bdc85  e2e/i18n-coverage.spec.ts
  7a8c803be83c4f9ea9e7deeccc2162d9f7f32bd80ae123053e9f4b4217b88375  e2e/shell.spec.ts
  ceaec87ea1e261841ae31599a0288add1c795edcfce85a10cbc85b44db169909  roadmap.md
  dcf0c0cf9a33dc9e3ed0de95b40987d8548314ba26345ac7c7a7e5767286f6d2  scripts/e2e-menu-readers.test.ts
  3ca859a7085ade69e7c327b4526cdc4fa65521bc1f838fb3b3019ffe95e043d6  scripts/e2e-menu-readers.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run typecheck` clean;
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit` 688 passed (114 files);
- `bun run i18n:map-guard` as above;
- `bun run scripts/e2e-select.ts --self-test` OK;
- `bun run scripts/check-root-routes.ts` "every root segment is safe";
- `bash scripts/check-hardcoded-strings.sh` findings: 0;
- `bun run build` clean.

THE BROWSER RUN — not this turn (the local browser does not start, INC-506); CI on the final commit is the proof.

THE REPORT
- Done or not done, by step.
- The six ci-status lines.
- The census results (a)–(c).
- The 9 sha256sum lines and the brief's.
- `git diff --name-only 4e111104bfe5bd15ad6195c71abb819af429432b` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only 4e111104bfe5bd15ad6195c71abb819af429432b HEAD` too. Expect the 9 carrier paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): nothing to apply. Send the executor nothing until the supervisor reads CI on the final commit; then Publish and walk.
```
