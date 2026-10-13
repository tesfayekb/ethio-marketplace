# Bundle 12 — the tidy-up round, turn T12: a logo passes the photo screen like a business card (D153): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 12 — THE TIDY-UP ROUND (D145) — TURN T12 (2026-10-13). ONE TURN, NO MIGRATION. No new strings. No package change.
Base: dev d7e8f917 (turn T11's landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the photo screen's instruction (the policy pass every stored photo goes through). Also: one unit test, the media doc, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- Turn T11 landed byte for byte (d7e8f917): the two docs paths equal the supervisor's copy, and the brief equals the upload. The supervisor reads your two reads from your report; nothing in them is needed for this turn.
- CI on d7e8f917 may still be running; T11 changed docs only, and T10's code (961160c8) is green. This turn's own run judges everything.

WHY THIS TURN
- D153 (the operator, 2026-10-13): a logo, or another graphic a business designed for itself, passes the photo screen with everything on it, like a business card (D148).
- Today the instruction names "a drawing" under not_a_photo. A logo file is a drawing, so the screen refuses it.
- Peers do not recognise logos or keep a list of banned ones. A mark used without the right to it is removed on report: Terms 3 (the seller's rights in what they post), Terms 4 (counterfeit goods banned) and Terms 15 (the trademark notice).

WHAT THIS TURN BUILDS
- src/server/media/policy.ts — `PHOTO_POLICY_INSTRUCTION` gains one sentence, right after the business-card sentence:
  "A logo, or another graphic a business designed for itself, is allowed with everything on it, like a business card: never refuse one as not_a_photo or contact_in_image."
  The comment above it names D153. Nothing else in the file changes.
- src/server/media/policy.test.ts — PPOL-4 (NEW): the instruction contains that sentence.
- docs/features/media-pipeline.md (D153's paragraph under D148's), the changelog, the roadmap (line 3 and the T12 line).

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The sentence follows the business-card sentence's shape, so the model reads the two together.
- A photographed shop sign or flyer stays as it is: a photograph, its print judged by the other codes (PPOL-3).
- No E2E test: the screen runs in fake mode in CI (E2E_FAKE_PHOTO_POLICY), and PPOL-4 proves the instruction.
- The new id is PPOL-4.

TESTS
- Unit: PPOL-4 (NEW). Red first: the supervisor ran PPOL-4 against the base's policy.ts, where it fails ("1 failed | 3 passed").
- Not edited: every other test.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev d7e8f917 with this turn's files)
- Clean: typecheck (it covers e2e/), format, lint (0 errors, 33 warnings), 740 unit tests (125 files), the usage maps (they match: no key moved).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-12-turn-12.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name turn T11's commit or T10's, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
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
- Scope — these files only: the 5 carrier paths and the brief. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-12-turn-12.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 5 files → each equal to:
  b1cff9bf1ee9ab726bb6df8eea2ac7b80dcbab3afa7c85ad67f9ca2a4e6d0805  docs/_changelog.md
  4171807dad2e58a181c26c6f6dc56165fe86e8400ef693250179b5987cc2e1bd  docs/features/media-pipeline.md
  01a47e50a99cc789f0ac7f9f4fadd08f8e0d12a0c5f629a2f6d2944b38395cb4  roadmap.md
  658750c678efad641308ae4eeca601f2b6a40700c6af0225f523211f2a536ef8  src/server/media/policy.test.ts
  dc5de6920c6603c11c2f5598dd2eebf75cac7e2f43846bb88ce067d1b221de66  src/server/media/policy.ts

THE CARRIER — T12-TURN-CARRIER-2026-10-13.md (2,229 bytes; sha256 b8e5dc909664ceefd790ce1c6b2db199594d15ce27ca91aab8eaeda4c2e2f87a; 7 sections)
- Its first line starts "T12 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed.

THE HASHES — `sha256sum` each of the 5 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  9d8f1ac11a1a8188f223337883c43c4c726494f7483f3456246d8078cd89d988  docs/_changelog.md
  f3a96cbfd0f508ee43592fa806e06ed91b4053593f3098ebd0254fd57a5c86b2  docs/features/media-pipeline.md
  5d0afbeb80f2850e1c959976256a96caa3d44cfead99b00b3b84ffd283e8b009  roadmap.md
  0c5f78b69af632a071f65c4eac34585a8fd4b7178bd211a748e5a2e51a0e9b79  src/server/media/policy.test.ts
  e878302d4f1195fca91afb493c1ffe795efd1de3b1a71a42a59506ae96545403  src/server/media/policy.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-t12.log` — 740 passed (125 files). Keep the whole output; if any test fails, paste its name and its first error line from that file, and keep each run's file if you run it again;
- `bun run i18n:map-guard` "usage maps match the tree.";
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: no screen changes, and the screen runs in fake mode in CI.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a) and (b).
- The 5 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 5 paths and the brief.
- The checks.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only).

AFTER THIS TURN (for the operator): Publish once CI is green on the final commit. The screen runs on the server, so the Publish is what puts D153 live. Then one walk line: upload a logo image on the photo step (a new draft on a test listing), and it is added, not refused.
```
