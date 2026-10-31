```text
RULING — turn F4a: an open list stays in sight (D267). Base: dev 3caa699b (f25f6e9e plus the plan file). Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f4a.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f4a.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

CI FIRST: the run on f25f6e9e was cancelled at 10:13Z when the plan file was pushed, so it gave no verdict. Read the run on 3caa699b, the same tree plus the plan file (it may still be running; read it again before your push, S502). Any red that is not infrastructure is fixed first, from its failure body. A start that fails inside a migration with every image local is DEC-313's to count; name it under Limits with CF-CI-START-1's line.

YOUR F4 PLAN, RULED (G17, overridable; DEC-315). Approved:
- the census;
- visibleArea() in src/lib/visible-area.ts with the `data-chrome` markers and the scroll-padding fallback;
- placeList (down when it fits; scroll the control up and open down; open on the larger side only when the page cannot scroll; height bounded, with `--picker-max-height`);
- the per-side collisionPadding read on open;
- CF-AREA-1 with an empty allowlist and VA-1…3;
- LIST_LABEL, LIST_SEPARATOR, LIST_ICON and DropdownMenuIcon;
- CF-LIST-1 rules 8 and 9;
- the tests as planned;
- "Profile" opening /account (G17; the operator was told and may override).

Rulings:
1. Split now, as your plan offers, so each turn finishes with its checks (S500): F4a is Concern A with CL-E7…9, and F4b is Concern B with CL-E10, next.
2. First paint:
   - visible-area.ts is imported only by the facade's on-demand impl (dropdown-menu-impl.tsx) and by the picker, never by the header, the facade or any first-paint module;
   - the header and bands carry only the `data-chrome` attributes;
   - the growth on public pages is the attributes alone; DEC-296's form for any page that crosses.
3. The scroll-then-open waits for the scroll to end before it measures and opens (scrollend, or the position settled across two frames). It never opens mid-scroll, and the list is measured where it lands. Under reduced motion the scroll is instant.
4. Desktop with room below opens down at once, with no scroll. The scroll happens only when the room below is short.

TESTS (as planned):
- VA-U1…4 and PL-U1…5;
- CL-E7 (currency) and CL-E8 (phone code) at 360 coarse, from the centred field, near the top and near the bottom, light and dark;
- CL-E9, the facade menus near the top and the bottom at 360.
- The touched specs whole, both projects, retries 0. A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.

SCOPE (by area):
- src/lib/visible-area.ts (new) and its tests;
- src/components/searchable-picker.tsx and its tests;
- src/components/ui/dropdown-menu-impl.tsx;
- the files carrying `data-chrome` markers (the header, the bands, bottom-bar.tsx, form-section.tsx);
- scripts/conformance/ (CF-AREA-1; wired.test.ts);
- e2e/choice-lists.spec.ts;
- scripts/route-budgets.mjs;
- docs/features/design-foundation.md, docs/governance/mechanisms.md, docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- The laws step (scripts/ tests) first.
- Write the report, docs/governance/reports/foundations-turn-f4a.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI lines for f25f6e9e (cancelled) and 3caa699b;
  - the mechanism and the markers as built;
  - CF-AREA-1 and VA-1…3;
  - the tests' results;
  - growth;
  - the unit count;
  - K2;
  - git diff --name-only 3caa699b.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
