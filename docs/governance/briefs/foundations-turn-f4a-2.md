```text
RULING — turn F4a-2: stop 1 answered at its root, B1's two leftover reds, and the laws step widened. Base: dev e1dc86f4. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f4a-2.md; roadmap line 3 names it beside foundations-turn-f4a.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f4a-2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

SEEN AT e1dc86f4 (fresh clone):
- step 0's sha256 8f20dac3… matches;
- visible-area.ts (areaFrom, visibleArea, collisionPaddingNow), the `data-chrome` markers, placeList with scroll-then-open, per-side collision padding in the impl, CF-AREA-1 with VA-1…3;
- the stop report.

CI FIRST: two reds from B1 (run 41190843148 on b2bbc9f3) are still in the tree at e1dc86f4. Fix them first:
- TH-2 (src/lib/themes.test.ts :42).
  - Prettier wrapped two `.dark` lines in src/styles.css (:482–484 `--tier-premium` and :491–493 `--tier-featured`) onto three lines, because of their trailing comments.
  - The test's block() collapses whitespace, so it reads `oklch( 0.305 0.032 78 )`, not themes.ts's `oklch(0.305 0.032 78)`.
  - Fix at the root: block() normalises whitespace inside a value's parentheses (the same CSS value), with a planted wrapped value in the test.
- Semgrep ERROR ×2: e2e/dark-cards.spec.ts :99, insecure-innerhtml and insecure-document-method (`host.innerHTML = \`<div ${attrs} …>\``). The supervisor reproduced them with semgrep 1.179.0 and the pinned rules a84ff9cc.
  - Build the probe with createElement and setAttribute; no innerHTML.
- Then read the run on e1dc86f4 again before your push. The F4a turn did not read 3caa699b's run again before its push (S502). Any other red that is not infrastructure is fixed first, from its failure body.

1. STOP 1, ruled. Both failures have one root: the list's height is not the mechanism's.
   - placeList sets `--picker-max-height` on the panel, but each consumer's scroller keeps its own `max-h-64`:
     - step-pricing.tsx :527, on the currency list;
     - phone-number-field.tsx :300, on the list under the code search.
     So the box grows past the room: down for CL-E7 (bottom 659 against 591), and up for CL-E8 (top 62 against 91).
   - The picker owns the panel's height and its scroller:
     - the panel is a column bounded by `--picker-max-height`;
     - its scroller takes a constant from the mechanism (LIST_SCROLLER: `min-h-0 flex-1 overflow-y-auto`), so a search box above it keeps its place and the rows scroll inside the room;
     - the consumers' `max-h-64` goes.
   - CF-LIST-1 refuses a height class on a picker's panel or scroller. Planted case CL-10. The facade menus keep Radix's available-height bound; location-selector's height cap keeps its line.
   - Remove both `test.fixme` holds. CL-E7 and CL-E8 pass at every starting position, light and dark. A held test is never the end state of a turn.
   - If they still fail after this, read where the list's box and the visible area stand at the moment of opening, and STOP with those numbers.
2. K2, the popover: popover.tsx takes its collision padding from collisionPaddingNow as the menu facade does, and toolbar-panel.tsx :110's `collisionPadding={16}` goes. CF-AREA-1's rule covers the popover. listing-detail.tsx :524 reads the sticky sub-band itself: a roadmap line for the ad-page turn (S5), not this turn.
3. INC-1030 widened. B1's TH-2 (in src/) and Semgrep (a slow step) still fell outside the laws step. The laws step now also runs:
   - the unit tests in the same folders as the files the turn changed (git diff against the turn's base);
   - Semgrep at ERROR on the changed files, with the pinned version and rules CI uses.
   Its failures show in the fast line. TC-E4 planted.

TESTS
- The TH-2 planted case, CL-10, TC-E4.
- e2e/choice-lists.spec.ts whole and e2e/dark-cards.spec.ts whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.

SCOPE (by area):
- src/components/searchable-picker.tsx and menu-row.ts (LIST_SCROLLER), each with its tests;
- src/features/posting/step-pricing.tsx and phone-number-field.tsx (the height classes only);
- src/components/ui/popover.tsx and src/components/shell/toolbar-panel.tsx;
- src/lib/themes.test.ts;
- e2e/dark-cards.spec.ts and e2e/choice-lists.spec.ts;
- scripts/ci/ (turn-checks.ts and its test);
- scripts/conformance/ (CF-LIST-1, CF-AREA-1);
- scripts/route-budgets.mjs;
- docs/features/design-foundation.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- The laws step first.
- Write the report, docs/governance/reports/foundations-turn-f4a.report.md, BEFORE `bun run checks`. It covers F4a and this turn:
  - both step-0 sha256s;
  - the CI lines;
  - the mechanism as built;
  - stop 1 and its fix;
  - the tests' results;
  - growth;
  - the unit count;
  - K2;
  - git diff --name-only 3caa699b.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
