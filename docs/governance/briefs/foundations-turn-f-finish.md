# Foundations turn F — finish (the ruling)

```text
RULING — turn F, finish: the lint fix, one current marker, the report, then the checks. Base: dev 603e3d18. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f-finish.md; roadmap line 3 names it beside foundations-turn-f.md.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f-finish.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

SEEN AT 603e3d18 (fresh clone):
- step 0's sha256 59a77273… matches; AGENTS.md untouched; 25 files.
- menu-row.ts holds LIST_ROW, LIST_ROW_CURRENT, LIST_ROW_HIGHLIGHT, LIST_TICK, LIST_SURFACE, LIST_MOTION, LIST_PANEL and OPEN_CONTROL.
- the impl reads them with sideOffset 0, align start, collisionPadding 16 and the trigger-width minimum; no zoom.
- the picker reads them; the popover takes the surface.
- `--radius-menu`, `--radius-list-row` and `--lift-menu` exist in both themes.
- CF-LIST-1 and CL-1…5 are in place, with the allowlist.

Your two departures, ruled (G17):
- themes.ts and schemas/theme.ts: accepted. They are the theme data TH-2 ties to the stylesheet, so a new shadow token belongs there.
- The panel switch's minimum width: removal accepted, since the trigger width now decides.

CI FIRST: the run on 603e3d18 will be red on lint, from your four errors. That is fixed first (item 1). Read the run anyway; any other red that is not infrastructure is fixed first, from its failure body.

1. e2e/choice-lists.spec.ts, by the authoring laws (docs/features/e2e-harness.md, J5 and J7):
   - :60 `waitForTimeout(450)` → poll on truth: wait until the panel's `getAnimations()` list is empty (or its animation has finished), then read the sampled transforms.
   - :133, :150, :156 `:visible` + `.first()` → the viewport-aware twin helpers.
   - CL-E3's `if ((await account.count()) > 0)` lets a test pass while asserting nothing. Each width asserts the control it has: name, per width, where the account list opens, and assert it there.
2. One current marker. Sage §14 puts a tick at the end of the current row. The radio item still draws a dot (dropdown-menu-impl.tsx, the RadioItem's `Circle`). It takes LIST_TICK as the checkbox item does, so every list marks its current row the same way.
3. The report, docs/governance/reports/foundations-turn-f.report.md, completed BEFORE the checks:
   - both rulings' step 0 sha256;
   - the CI line for 603e3d18, with its red classified;
   - item 1's three changes and item 2;
   - the growth table, measured by your own build (JS per page and the stylesheet), with causes;
   - every ceiling raised in DEC-296's form;
   - K2;
   - git diff --name-only b3681f69.
4. Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line and the unit count. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

F2 stays the next turn, as your roadmap line says: the row-actions menu and the two posting pickers in CL-E. It gains one item, as a K2 line now: the location list and the panel switch mark their current row by look only. Their rows become radio items (menuitemradio with aria-checked), as the language list's are, so a screen reader hears which one is current. F2's census of e2e/ for role "menuitem" on those two lists comes first (S392).

SCOPE (by area):
- e2e/choice-lists.spec.ts;
- src/components/ui/dropdown-menu-impl.tsx (the radio indicator only) and its tests;
- scripts/route-budgets.mjs and scripts/check-bundle-size.mjs for named ceilings;
- the report, roadmap.md and the brief.
- AGENTS.md is not in scope.

Push, and END THE TURN.
```
