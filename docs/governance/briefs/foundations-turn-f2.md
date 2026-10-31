# Foundations turn F2 (the ruling)

```text
RULING — turn F2: the last lists in CL-E, and a current choice a screen reader hears (INC-1027). Base: dev fc918fbb. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f2.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f2.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

F-FINISH VERIFIED (dev fc918fbb, fresh clone): step 0's sha256 a8f75576… matches; AGENTS.md untouched; the radio and checkbox rows both draw LIST_TICK (CL-U6); the spec polls on the animations, finds its controls by test id, and CL-E3 asserts the account list at both widths; the spec joined scripts/e2e-select.ts's shell area (departure accepted: the selector's self-test requires it); twelve ceilings raised in DEC-296's form, and CI's own sizes on 603e3d18 (/account_/legal 212.0, /admin/images 211.0, /admin/locations 272.1, /auth 222.0) agree with them. CLEAN pending CI on fc918fbb, except the two reds below.

CI FIRST — the run on 603e3d18 (06:35Z) failed lint, the budget and three unit guards. The finish fixed lint, the budget and the selector. Two remain at fc918fbb and will fail CI's component tests again. Fix them first:
- BX-1 (scripts/conformance/layout-reads.test.ts, INC-940): e2e/choice-lists.spec.ts reads boxes by itself at judge :90, :91 and :122 (`boundingBox()`). It compares them through layoutBoxes (e2e/helpers/ui.ts), which reads a layout whole once it has stopped moving. A missing box is a failure, never `?? 0`.
- PPF-1 (scripts/conformance/planted-proofs.test.ts, S431): scripts/conformance/choice-lists.test.ts, in "an owner that stops reading the constants fails" (:222), makes a temp directory and writes a file that nothing reads or removes. Drop both lines, or remove the directory in an afterEach.

Then read the run on fc918fbb. Any other red that is not infrastructure is fixed first, from its failure body.

THE SYSTEM (G0)
- CONCERN: an open list's current choice. It is heard as well as seen.
- MECHANISM: the dropdown menu's radio items (DropdownMenuRadioGroup / RadioItem in dropdown-menu-impl.tsx), with the current look and tick keyed to their checked state, read from menu-row.ts (DEC-312). The language list already works this way.
- CONSUMERS that set the current look by class: on plain items (INC-1027), location-selector.tsx :110/:118 (the location list) and panel-header.tsx :79 (the panel switch); and on radio items, language-switcher.tsx :98, which already carries aria-checked but should take its look from the checked state. Your census by definition: every use of LIST_ROW_CURRENT outside the mechanism. The searchable picker's options are role="option" with aria-selected, which is already heard; it keeps its class.
- CONFORMANCE: CF-LIST-1 gains a rule. LIST_ROW_CURRENT outside menu-row.ts, the impl and the picker fails; a current row comes from the checked state. Planted case CL-6.

1. The location list and the panel switch become radio groups: menuitemradio with aria-checked, with the tick at the end.
   - LIST_ROW's checked state (`data-[state=checked]`) carries LIST_ROW_CURRENT's look, so no consumer sets it by class.
   - Keyboard, Escape and the onSelect behaviour stay as they are.
2. G38 census before any edit (S392): every e2e locator for role "menuitem". The supervisor's grep at 603e3d18 finds 19, not yet sorted by which list each one opens:
   - shell.spec.ts :377, :380, :2659, :2705, :2733, :3278, :3319, :3432, :3460;
   - sage-bands.spec.ts :204, :342;
   - viewing-place.spec.ts :255, :323;
   - choice-lists.spec.ts :139, :152, :157.
   Read each in place. Those aimed at the location list or the panel switch move to "menuitemradio", named under G38 with old and new. Others (admin-attributes-library :558 and :1272, house-style :102, the account menu) stay. If one shared helper opens these lists, it changes once, and its callers follow.
3. CL-E gains:
   - CL-E4: the row-actions menu;
   - CL-E5: the currency picker on the posting price step;
   - CL-E6: the phone-code picker on the posting contact step;
   - each at 360 coarse and 1440 fine, light and dark, against DEC-312's tolerances;
   - and in CL-E2 and CL-E3, the current row's aria-checked and its tick.

TESTS
- CL-6 planted. The touched spec files whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download crosses the NEAR band follows DEC-296's form, with its cause.

SCOPE (by area):
- src/components/shell/location-selector.tsx, panel-header.tsx and src/components/language-switcher.tsx with their tests;
- src/components/shell/menu-row.ts (LIST_ROW's checked state) and src/components/ui/dropdown-menu-impl.tsx;
- scripts/conformance/choice-lists.test.ts and its allowlist;
- e2e/choice-lists.spec.ts, every spec item 2 names, and the shared helper if one opens these lists;
- scripts/conformance/choice-lists.test.ts (PPF-1);
- scripts/route-budgets.mjs and scripts/check-bundle-size.mjs for named ceilings;
- docs/governance/mechanisms.md (the register row's guard), docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-f2.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI line for fc918fbb;
  - the census (each consumer and each locator, before and after);
  - CF-LIST-1's new rule and CL-6;
  - CL-E4…6;
  - G38;
  - growth with causes;
  - the unit count;
  - K2;
  - git diff --name-only fc918fbb.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
