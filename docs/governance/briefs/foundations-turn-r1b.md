# Foundations turn R1b (ruling, saved byte for byte)

````text
RULING — Foundations turn R1b: INC-1007 first, then the sub-menu mechanism (foundations-turn-r1a.md items 5–11). Base: dev 0786626d. Tier B. No migration, no new dependency. Lovable. Saved as docs/governance/briefs/foundations-turn-r1b.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-r1b.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it.

R8 VERIFIED (dev 0786626d, fresh clone): the brief's sha256 6e6fe976… matches. All eight record files equal the EXPECTED sha256 values at HEAD. CF-E2E-WAIT-1 and CF-E2E-PLACE-1 are each proven on a planted copy. A3's census reads ad-page :1303 against listing-detail.tsx :449–:450 and map-preview.tsx :42–:45. Rows 77 and 78 are in the register.
- Your departure is accepted: docs/tracking/incidental-findings.md is named one by one in .prettierignore, in the verbatim-record class (INC-007), and its text was not edited.

CI FIRST — run 40992012460 on 8e7feb84 (R1a-2): FAILURE, nine gating failures, all from one cause: INC-1007, "the root's scrollbar gutter narrowed every page by the gutter's width". It is registered in my running record and lands with the next records turn; you do not write it into the ledger.
- The failures:
  - FT-1, the footer group 7.5 px off centre (shell.spec.ts :610);
  - SR-1, the search row 15 px short of the viewport's edge (:1462);
  - L1/L2 and L3, the footer 15 px narrower than the viewport (:2168, :2211);
  - PW-99, a place select 191 px wide at 360 (post-wizard-where.spec.ts :835).
- The cause: `html { scrollbar-gutter: stable; }` in src/styles.css :366–:368. CI's headless Chromium reserves the 15 px gutter even though Playwright hides the scrollbars, so every page is 15 px narrower. On a desktop browser whose scrollbars take width, it also leaves a 15 px strip on any page that does not scroll.
- Your own R1a-2 measurement showed the gutter is not needed. The root is the scroll container, so the menu's lock hides no scrollbar; the shift came only from the lock's margin on body. My R1a ruling named the gutter as the mechanism before that measurement existed. That is my slip (S491), not yours.
- The operator confirmed on the published site at 23:09 New York that the language menu no longer moves the page.

1. INC-1007 — the fix, first:
   - Remove the gutter rule from src/styles.css. `html body[data-scroll-locked] { margin-right: 0 !important; }` stays as the one mechanism. Rewrite the comment above it to say why the gutter is not used (INC-1007).
   - CF-SHIFT-1 (scripts/conformance/overlay-shift.test.ts) now requires the neutralisation and refuses `scrollbar-gutter` anywhere under src/, with the reason INC-1007. Its planted proofs change to match: a missing neutralisation, a gutter put back, and a second mechanism elsewhere are each refused.
   - The proofs, both projects, retries 0:
     - OVS-1 and OVS-2 stay green: the main column does not move with the language menu or a dialog open;
     - FT-1, SR-1, L1/L2, L3 and PW-99 pass with no change to their assertions;
     - shell.spec.ts, post-wizard-where.spec.ts and overlay-shift.spec.ts, each run whole.
   - Register row 77 says the mechanism is the neutralised margin alone, and names INC-1007.
2. Then R1b, as ruled in docs/governance/briefs/foundations-turn-r1a.md items 5–11. Read that file's Part 1 section by line range first; it governs.
   - Item 6's on-demand code goes through the overlay loader (src/components/ui/overlay-loader.ts), never a second on-demand path.
   - Item 7: rows 36–48 px with a fine pointer, at least 44 px with a coarse one.
   - Item 10: growth up to 0.5 KiB per page, with its cause, and the ceiling raised by DEC-296's rule.
   - The panel opens without moving the page, under the same mechanism. OVS gains a case for it once the panel exists.

SPLIT: if the platform's time limit nears, stop at a clean point with the checks green, after item 1 or inside R1b. Push, and report three lines (done, left, CI).

TESTS: each touched spec file whole, both projects, retries 0; by-id runs of every test that uses a changed helper (G37). The ids are grep-checked free.

HOW TO WORK (unchanged): K1–K6; never `git apply`; `bun run checks` once on the final tree before the push, with its last line pasted (no FAIL).

Push, and END THE TURN with the report, saved as docs/governance/reports/foundations-turn-r1b.report.md:
- step 0's sha256;
- the CI line;
- INC-1007: the CSS diff, CF-SHIFT-1's planted proofs, and the nine tests and OVS green;
- R1b, item by item (5–11), with the per-page growth table;
- the unit count;
- the checks' last line;
- K2;
- git diff --name-only 0786626d.
````
