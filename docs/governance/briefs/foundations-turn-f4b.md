```text
RULING — turn F4b: every list's parts from the one primitive (D268). Base: dev e1e736df. Tier B (the header on every page). No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f4b.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f4b.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

F4a-2 VERIFIED (dev e1e736df, fresh clone): step 0's sha256 f153dcc9… matches; AGENTS.md untouched; the picker's panel is bounded by `--picker-max-height` with LIST_SCROLLER, the consumers' `max-h-64` gone, CL-10; no `test.fixme` left, and CL-E 38 passed; TH-2 normalises a value's parentheses (TH-2b); the dark-card probe uses createElement (the supervisor's Semgrep on the turn's changed files: 0 ERROR); the popover reads collisionPaddingNow and CF-AREA-1 covers it; the three posting pages are at 401; the laws step runs the changed folders' tests and Semgrep. CLEAN pending CI on e1e736df. The docs F4a-2 owes (design-foundation.md, mechanisms.md, _changelog.md) land in this turn.

CI FIRST: two items from the run on e1dc86f4 (F4a), fixed first:
- LY-6 (e2e/post-wizard-pricing.spec.ts :931, "at 360 the open currency list is above the sticky action bar") failed then passed on retry, on mobile-360, in shard 6. Its path is F4a's placement, which now scrolls before it opens. Read its body in the flake evidence and fix the root: the test or the mechanism. For example, the picker marks its list settled (an attribute set after the scroll ends and the list is placed), and every test that measures an open list waits for that mark. Never a longer wait or a retry (G38). It is proven with CI's repeat lane.
- The laws step's base: scripts/ci/laws-changed.ts :46 defaults to HEAD~1. A turn makes many commits, so HEAD~1 covers only the last one and misses the turn's other files. With no TURN_BASE, the base is the `Base: dev <sha>` of the brief named on roadmap line 3; with neither, the step fails and says so, never a silent HEAD~1. TC-E5 planted.
Read the run on e1e736df at the start and AGAIN before your push (S502). Any other red that is not infrastructure is fixed first, from its failure body.

THE OPERATOR'S WORDS (2026-10-31 05:52 New York, walk line 7): "the dropdown LOOKS GOOD, THE ACCOUNT DROPDOWN AT RIGHT END DOENST LOOK THE SAME. I ASKED EVERY DIALOG AND DROPDOWN TO HAVE SAME LOOK AND FEEL, MAY BE HAVE TO COME FROM SAME PRIMITIVE"

As your F4 plan (Concern B), ruled in DEC-315:
1. menu-row.ts gains:
   - LIST_LABEL: a non-interactive header row on the row's padding, in the muted ink, semibold `text-sm`, cut by CutText;
   - LIST_SEPARATOR: one rule token, no new colour;
   - LIST_ICON: `size-4 shrink-0` in the list's icon ink, spaced by LIST_ROW's gap only.
   S6's dialog parts will reuse them.
2. The facade: DropdownMenuLabel and DropdownMenuSeparator take LIST_LABEL and LIST_SEPARATOR, and a DropdownMenuIcon (asChild slot) applies LIST_ICON, so no consumer writes icon classes.
3. The account menu (app-header.tsx :244–268) uses the facade parts only. "Profile" opens /account, as bottom-bar.tsx :132 does; "Settings" opens /settings.
4. Every other list moves its row icons onto DropdownMenuIcon: panel-header.tsx, location-selector.tsx, language-switcher.tsx and row-actions.tsx (its own separator too).
5. CF-LIST-1 gains rule 8 (a className on DropdownMenuLabel or DropdownMenuSeparator outside the facade) and rule 9 (a size, margin or colour class on an icon in a row, outside the facade). Planted cases CL-8 and CL-9.

TESTS
- CL-U7 for the facade's label, separator and icon classes.
- CL-E10 at 360 and 1440, light and dark:
  - the account menu's label, separator and icon boxes equal the panel switch's and the row-actions menu's (computed size, gap, colour);
  - "Profile" lands on /account and "Settings" on /settings.
- G38: the e2e census for `account-menu`, `nav.profile` and `/settings` near it (shell.spec.ts :1312–1320 among them), each named old and new.
- The touched specs whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.
- A page whose JS first download crosses the NEAR band follows DEC-296's form, with its cause.

SCOPE (by area):
- src/components/shell/menu-row.ts, src/components/ui/dropdown-menu-impl.tsx and dropdown-menu.tsx (the facade's exports), each with its tests;
- app-header.tsx, panel-header.tsx, location-selector.tsx, row-actions.tsx and src/components/language-switcher.tsx, each with its tests;
- scripts/conformance/ (CF-LIST-1);
- e2e/choice-lists.spec.ts and every spec the G38 census names;
- scripts/route-budgets.mjs;
- e2e/post-wizard-pricing.spec.ts (LY-6), src/components/searchable-picker.tsx (a settled mark only, if LY-6's root is there) and scripts/ci/ (laws-changed.ts and its test);
- docs/features/design-foundation.md, docs/governance/mechanisms.md (F4a's and this turn's rows), docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- The laws step first.
- Write the report, docs/governance/reports/foundations-turn-f4b.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI lines;
  - the parts as built;
  - CL-8, CL-9, CL-U7 and CL-E10;
  - G38;
  - growth;
  - the unit count;
  - K2;
  - git diff --name-only e1e736df.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
