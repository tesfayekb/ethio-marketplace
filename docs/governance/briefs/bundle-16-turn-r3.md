# Bundle 16 — turn R3: the toolbar panels bounded by the window on a computer: brief, version 1 (saved unchanged, 2026-10-15)

```text
BUNDLE 16 — TURN R3 (2026-10-15). ONE SHORT TURN: THE FIX FOR TURN R1'S RED. No migration, no strings, no test edits, no package change.
Base: dev eb87015b (turn R2). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: the shared toolbar panel (src/components/shell/toolbar-panel.tsx). Tier C: the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn R2 is verified on dev eb87015b: the 23 carrier paths equal the supervisor's copy byte for byte; the brief (1b629925…), your four test files and the migration (the brief's text, mark 20261015230000) are as written. AL-30's two holders carrying admin_panel:access, as AL-11's do, is right.
- The four test diffs you did not paste were read by the supervisor from dev.
- CI on 92b359aa (turn R1): its fast lane failed MLP-6 on desktop-1280. The cause is in the shared toolbar panel, not in your test: this turn fixes it (INC-633, below). The full run on 92b359aa and the run on eb87015b were still running when this brief was written; MLP-6 on desktop-1280 is expected red on both until this turn's commit.

WHY THIS TURN — INC-633
- CI on 92b359aa (turn R1), its fast lane: MLP-6 failed on desktop-1280 on both attempts. The failure body: the click on `my-listings-filter-mark-reserved` inside `my-listings-filters-panel` waited 60 s with "element is outside of the viewport". On mobile-360 the same test passed.
- The cause, read in src/components/shell/toolbar-panel.tsx: from md the panel is a Radix popover with no height bound and no scrolling of its own. A popover is fixed to the window, so scrolling the page does not move it. My listings' Filters lists every top category before the marks, which pushes the marks below the window's bottom on a 1280 × 720 window, where nothing can reach them. The phone's form is a bottom sheet with `max-h-[85dvh]` and its own scroll, which is why mobile-360 passed.
- The class: a floating panel without a height bound. The census: `grep -rn "<PopoverContent" src --include=*.tsx` outside src/components/ui finds this one panel only; the dropdown menu, the select and the context menu are already bounded by their own available height. So this one fix covers every Filters and Columns panel on every page.

WHAT THIS TURN BUILDS (the carrier)
- src/components/shell/toolbar-panel.tsx, the popover form only:
  - `collisionPadding={16}`;
  - the content is a column bounded by the window: `flex max-h-(--radix-popover-content-available-height) w-80 max-w-[calc(100vw-2rem)] flex-col p-0`;
  - the choices scroll inside it (`min-h-0 flex-1 overflow-y-auto p-4`), and the footer stays in view (`shrink-0`);
  - the comment names INC-633.
- The docs (display-primitives, "The panels"), the roadmap (R3 done; turn 4 next) and the changelog.
- The proof is MLP-6 on desktop-1280: red on 92b359aa, it must be green on this turn's commit. Every other Filters and Columns test reaches this panel too, and CI runs them all.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev eb87015b with this turn's carrier files)
- Clean: typecheck, format, lint (0 errors, 33 warnings), 883 unit tests (153 files), the usage maps (unchanged; they match), the build and the bundle budget.
- Not run by the supervisor: the browser tests (its sandbox cannot reach ethio-staging). CI on the final commit runs them.

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-16-turn-r3.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. Whatever it shows, go on: the CI read is the supervisor's. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else. One exception, known in advance: if the platform has regenerated src/routeTree.gen.ts since turn R2, name the difference and go on;
  4. the carrier, then the hashes;
  5. the checks;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The carrier's sections end with a newline each, blank lines included: write every section's bytes exactly as they stand between its header line and the next header. Check each written file's sha256 against the table before you go on.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Scope — these files only: the 4 paths of the hash table and the brief. No database work: no migration, and no query is needed this turn. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-16-turn-r3.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 4 files → each equal to:
  0f7cbd55d7c8c4cc13dd508bbc47e3196439cfee12602195f7ce5e57941e1bc0  docs/_changelog.md
  70705c4620257727ae25cc99c287d5aa45931032caed464c7f8b59b539cd84f2  docs/features/display-primitives.md
  b37f7270c18c07c662d71b312660fe5d8835609b53c324ac0319011d5a51c63a  roadmap.md
  c7dff0011a26b878f7aa3ebbd604a69eb9371602d016d559ef410a98e0b80509  src/components/shell/toolbar-panel.tsx
- (c) `ls supabase/migrations | tail -1` → 20261015081040_5d969342-dc7d-4eb6-8bc6-4ba2a48747e9.sql (turn R2's; no migration since).

THE CARRIER — B16R3-TURN-CARRIER-2026-10-15.md (2,617 bytes; sha256 db80fbc649fa6919f99d9a56a0d27a608df518e3891d85330b9b3a265c438832; 9 sections)
- Its first line starts "B16R3 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file;
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 4 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  ac2623c840bc9fc73f4ec04b026fe6a0d305d2cff6883dad59bd24c45f83d95f  docs/_changelog.md
  8466385e1d97f05abd14d6ceb1a9d2e2b61bc892109d6c9df0825b00f2315602  docs/features/display-primitives.md
  48670433a76acd006233ede0a0e2e8ff42442fd6f25b215e6044f575018d8ef3  roadmap.md
  37b73ae48fa64f04bc8d04e7cf3602f9dbd5c46db06a6a4436e8781d17fb3cb2  src/components/shell/toolbar-panel.tsx

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b16r3.log` — 883 passed (153 files);
- `bun run i18n:map-guard` "usage maps match the tree.";
- Not run by you: the typecheck, the build, the bundle budget and the browser tests. CI judges them.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(c).
- The 4 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 4 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator), in this order:
1. No staging step this turn: there is no migration.
2. Bring the supervisor Lovable's report. The next prompt comes back at once: send it to Lovable as soon as you have it. Do not wait for CI (DEC-181).
3. Publish only when the supervisor says the newest commit is green and Lovable is idle. Then press "Sync keys" in Admin › Translations (turn R2's words).
```
