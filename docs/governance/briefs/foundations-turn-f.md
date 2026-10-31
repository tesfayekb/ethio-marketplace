```text
RULING — turn F: every list of choices that opens from a control (D264, Sage §14). Base: dev b3681f69 (d48a3cb3 plus the plan file). Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

CI: d48a3cb3 is SUCCESS (run 41172524158, 05:47Z), and main moved up to it. CI-3a and CI-3b are closed. DEC-309: run 2 of 10, 0 registry refusals.

YOUR PLAN, RULED (G17, overridable; DEC-312):
- Approved: the four premises; the census and every decision in its table; one turn; the mechanism in menu-row.ts; the defaults in dropdown-menu-impl.tsx; the picker on the shared constants; the popover on the surface only; CF-LIST-1 and CL-1…5; CL-E per consumer; the first-download handling.
1. The selected look is the shell's one selected look. LIST_ROW_CURRENT and OPEN_CONTROL read the existing `--nav-pill` and `--nav-ink` tokens, with the tick in `--nav-ink`. No new colour token. A row under keyboard focus takes the same surface; the tick shows which row is current; the focus ring stays visible for the keyboard.
2. The menu's ring is part of `--shadow-menu`, written as the spec writes it: a 1 px spread layer (#DCE6DF light, #2F3B34 dark), then the two drop layers. There is no CSS border. `--radius-menu` is 14 px; LIST_ROW's radius is 10 px through a token.
3. Width: the panel is at least the control's width and at most the viewport minus the 16 px gutter on each side. Inside that, the content decides. One line per row, truncated with D105's rule.
4. The native `<select>` LEFT line and location-selector's height-cap line each carry a reason and an until. The select's until is the Sage S6 overlays turn; the height cap's is "permanent: a height is not a row or panel class", stated as its reason.
5. Tolerances (the tests' numbers):
   - row height: at least 44 px on coarse; 40 px ± 0.5 on fine;
   - the panel's edge against the control's edge: at most 1 px apart;
   - the panel's width: at least the control's minus 0.5 px;
   - no scale in the computed transform at any sampled frame of the opening;
   - the radius, padding and shadow equal the tokens' computed values.
6. If the e2e matrix will not fit the turn with its report (S500), split as your plan says: F2 carries only the two posting pickers' CL-E cases, after the mechanism and CF-LIST-1 have landed.
7. The walk subject at the close: the language, account and location lists and the currency and phone-code pickers, at 360 and 1440, light and dark. The supervisor writes it after CI is green and the operator has Published.

TESTS
- Unit: PickerOption's and the impl's classes come from the constants; the impl's defaults (sideOffset 0, align start, the trigger-width minimum).
- e2e/choice-lists.spec.ts, CL-E per consumer, at 360 coarse and 1440 fine, light and dark, against the tolerances above.
- G38: every test the grep finds asserting `py-1.5`, `rounded-md border`, the offset, `w-40` or `w-56`, named with old and new.
- The touched spec files whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download crosses the NEAR band follows DEC-296's form, with its cause.

SCOPE (by area):
- src/components/shell/menu-row.ts and its census tests;
- src/components/ui/dropdown-menu-impl.tsx, popover.tsx and their tests (the facade and the loader unchanged);
- src/components/searchable-picker.tsx and its tests;
- each consumer in the census table with its tests (language-switcher, app-header, panel-header, location-selector, row-actions, dev.style, toolbar-panel, step-pricing and phone-number-field only where the picker's API needs it);
- src/styles.css (the two tokens, both themes) and the token tests;
- scripts/conformance/ (choice-lists.test.ts, wired.test.ts);
- e2e/choice-lists.spec.ts and every spec the G38 grep names;
- scripts/route-budgets.mjs and scripts/check-bundle-size.mjs for named ceilings;
- docs/governance/mechanisms.md (the register row), docs/features/ (the shell or design-foundation doc), docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-f.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI line for d48a3cb3;
  - the census as built, each consumer before and after;
  - the constants and the two tokens with their values;
  - CF-LIST-1's definition, its allowlist lines and CL-1…5;
  - CL-E's cases;
  - every G38 change with old and new;
  - the growth table with causes;
  - the unit count;
  - K2;
  - git diff --name-only b3681f69.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
