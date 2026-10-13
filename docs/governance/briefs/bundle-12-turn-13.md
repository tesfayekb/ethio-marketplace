# Bundle 12 — the tidy-up round, turn T13: PW-187's red — the home page's body is the listings' container in every state (INC-593): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T13 (2026-10-13). ONE TURN, NO MIGRATION. No new strings. No package change. No app code.
Base: dev 5dd4f810 (turn T12's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier B: one E2E test (PW-187), the posting doc, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T12 landed byte for byte (5dd4f810): the five paths equal the supervisor's copy, and the brief equals the upload.
- CI on d7e8f917 (turn T11, docs only) failed on PW-187 alone. Its fix is this turn (WHY THIS TURN). CI on 5dd4f810 may still be running; a fix it needs comes in the next turn.

WHY THIS TURN — CI's red on d7e8f917 (run 38394886154), fixed first
- One test failed, on both attempts: PW-187 (e2e/post-wizard-category.spec.ts, phone width, shard 2): "PW-187: the home page's body … Timeout 20000ms exceeded". The same failure is in run 38357590372. Every other test passed.
- What the test waited for: one of `feed-section`, `feed-invite` or `feed-step-none`, within 20 s, before the tap.
- What the home page draws (src/components/marketplace/feed.tsx, lines 121–216 at the base): a spinner while the listings load; `feed-error` when the read fails; the invitation inside a `feed-section`; `feed-empty` when there is nothing; the cards' `feed-section`s, with `feed-step-none` above them when the chosen place itself has none. Every one of these sits inside `feed-container`, which the home page draws at once.
- So the test waited for the listings to arrive. In any other state — loading, a failed read, none — the home page was not counted. On a busy staging the listings can come late: in run 38339977292, which passed, PW-187 took 55.5 s, the slowest test of the run.
- Which state was on screen when it failed is not recorded: the run carried no context file for it (INC-429's gap).
- PW-187 proves that the frame and the body change together (INC-581). How fast the listings load is not what it proves.

WHAT THIS TURN BUILDS
- e2e/post-wizard-category.spec.ts — PW-187:
  - the home page's body is `[data-testid="feed-container"]`. The test waits for it to be attached, within 20 s as before, then for the band as before;
  - each recorded DOM state also names the listings' own state: `feed=` the first of feed-section, feed-step-none, feed-empty, feed-error that is on the page, else `-`;
  - the refusal is unchanged: no recorded state may read "home=true band=false";
  - the comment names INC-593.
- docs/features/posting.md (INC-593's paragraph after INC-581's), the changelog, the roadmap (line 3 and the T13 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The marker is `feed-container`. This is not a loosened proof:
  - the refusal now covers every state of the home page — loading, a failed read, none — and not only the states with listings;
  - the tap on Post still happens on the home page, with its band.
- No timeout is raised; no retry is added.
- The `feed=` part is evidence only: a later red names the state that was on screen.
- The new incident is INC-593. No new test id.

TESTS
- E2E: PW-187 (edited). Not run by you: your sandbox has no browser (INC-506). CI on this turn's commit runs it.
- Unit: none changed.
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 5dd4f810 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 740 unit tests (125 files), the usage maps (they match: no key moved).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-13.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T12's commit or T11's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-13.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 4 files → each equal to:
  9d8f1ac11a1a8188f223337883c43c4c726494f7483f3456246d8078cd89d988  docs/_changelog.md
  263761b527183017ae7c797d7e2c53043caf2bf5866268d7fc6f7b55cd0bc15e  docs/features/posting.md
  eee9ff0e4bca12912f01298c881650e093047300be6532a5d5680d6401472fa6  e2e/post-wizard-category.spec.ts
  5d0afbeb80f2850e1c959976256a96caa3d44cfead99b00b3b84ffd283e8b009  roadmap.md

THE CARRIER — T13-TURN-CARRIER-2026-10-13.md (2,973 bytes; sha256 682929d305978b478fe46e6c3a543d66dd2e01338e613d7e614697e363a36076; 7 sections)
- Its first line starts "T13 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 4 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  4a3c23151161a0b2dd5a6c1886b31e04cd0c9fbaf092d0c626aab53013b63a3d  docs/_changelog.md
  96b6e3268486ba2f00c8cbcad087a5a095a4496eb4e2fdaea3303aef6b2a6794  docs/features/posting.md
  5e1c25eafc31d76f8a433d512f65ea9d2b642050298cc38360a591c4e83a3292  e2e/post-wizard-category.spec.ts
  42e0a675e14b30d55d8b03dd2ac242cebe9dbe875db6e8357b63d9994f146e3f  roadmap.md

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-t13.log` — 740 passed (125 files). Keep the whole output; if any test fails, paste its name and its first error line from that file, and keep each run's file if you run it again;
- `bun run i18n:map-guard` "usage maps match the tree.";
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: your sandbox has no browser (INC-506). CI runs PW-187 on this turn's commit.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a) and (b).
- The 4 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 4 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): Publish once CI is green on this turn's commit — it carries turn T12's D153, which goes live only with a Publish. Then T12's walk line: close every tab of the site, open it fresh, and upload a logo image on the photo step of a new draft on a test listing; it is added, not refused.
```
