```text
RULING — turn F3: the dropdowns' last gaps, and a local size check as strict as CI's (INC-1029). Base: dev d7a47425. Tier B. No migration, no new dependency, no new string. Lovable. Saved as docs/governance/briefs/foundations-turn-f3.md; roadmap line 3 names it.

STEP 0
- Save this ruling (the text between the message's BEGIN and END lines) byte for byte as docs/governance/briefs/foundations-turn-f3.md, in one fenced block, and prove its sha256 equals the value after END.
- Roadmap line 3 names it. Check roadmap.md with prettier before you commit (INC-1019).

F2 VERIFIED (dev d7a47425, fresh clone):
- step 0's sha256 42ac6ea9… matches; AGENTS.md untouched;
- LIST_ROW draws the current look from `data-[state=checked]`; LIST_ROW_CURRENT is used only by menu-row.ts and the picker; CL-6 is in place;
- the location list and the panel switch are radio groups; the 14 locators moved to "menuitemradio" under G38;
- BX-1 is on layoutBoxes and PPF-1's stray lines are gone;
- the seven ceilings CI named on fc918fbb are set to CI's values (214, 325, 211, 400, 400, 400, 275), and /my-listings to 332;
- checks: fast line 25 PASS · 0 FAIL, last line 33 PASS · 1 FAIL (the /my-listings band, then fixed); unit 2,409.
CLEAN pending CI on d7a47425, except stop 1, ruled below.

CI FIRST: the run on d7a47425 may still be running when this arrives. Read it at the start, and read it AGAIN before your push (S502: two turns missed reds that landed after they began). Any red that is not infrastructure is fixed first, from its failure body. A lane whose backend failed inside a migration with every image local is INC-1028's; name it under Limits.

1. STOP 1, ruled: the phone-code list crosses the right gutter at 360 (it ends at x = 357; the limit is 344).
   - The cause is a width the consumer sets: phone-number-field.tsx :276 gives the list `start-0 w-72` from the field's start.
   - Fixed at the mechanism, not in the field. The searchable picker owns its list's width and side for every picker:
     - the list is at least its control's width and at most the viewport less the 16 px gutter each side;
     - it opens from the control's start edge, and from its end edge when the start would cross the gutter;
     - this is measured as the vertical placement already is (pickerPopClass and the placement hook beside it).
   - The consumer's own width class goes. CF-LIST-1 refuses a width or side class on a picker list. Planted case CL-7.
   - CL-E6's `test.fixme` is removed. CL-E5 and CL-E6 run at 360 and 1440, light and dark, against DEC-312's tolerances, the gutter included.
2. K2 from F2, the open state: the row-actions "more" button and the two posting pickers' controls show OPEN_CONTROL while their list is open. For the picker, the mechanism sets it on the control it owns; for row actions, its trigger reads OPEN_CONTROL. CL-E4…6 then assert the open state like CL-E1…3.
3. INC-1029, the local size check:
   - Today scripts/budget-band.mjs nearFindings judges a local size as if CI had measured it. CI measures about 0.1 KiB more, so `bun run checks` passed trees that CI then failed: seven pages on fc918fbb, and /my-listings in your own run.
   - Off CI (no CI environment variable), the check adds LOCAL_ALLOWANCE_KIB to each size before it judges the ceiling and the band, so the local check is never laxer than CI's. On CI it judges the size as measured.
   - The finding names the ceiling by ceilingForLocal off CI and by ceilingFor on CI.
   - Planted cases in scripts/conformance/budget-band.test.ts:
     - a local 398.7 under 399 is in the band;
     - the same size under CI is not;
     - a local size 0.05 over its ceiling fails the ceiling check.
   - Raise any page the stricter local check then finds, in DEC-296's form, each with its cause.
4. docs/features/design-foundation.md: the current row's look comes from the checked state (F2), not from a class.

TESTS
- CL-7 and the three budget-band cases planted.
- e2e/choice-lists.spec.ts whole, both projects, retries 0.
- A red is a STOP only when its failure or server log touches a path this turn changed; otherwise name it under Limits, and CI judges.

SCOPE (by area):
- src/components/searchable-picker.tsx and its tests;
- src/features/posting/phone-number-field.tsx and step-pricing.tsx (the width class only) with their tests;
- src/components/shell/row-actions.tsx with its tests;
- scripts/conformance/ (choice-lists.test.ts and its allowlist; budget-band.test.ts);
- scripts/budget-band.mjs, scripts/check-bundle-size.mjs and scripts/route-budgets.mjs;
- e2e/choice-lists.spec.ts;
- docs/features/design-foundation.md, docs/governance/mechanisms.md (the register rows' guards), docs/_changelog.md, roadmap.md, the brief and the report.
- AGENTS.md is not in scope.

HOW TO WORK: K1–K6.
- Write the report, docs/governance/reports/foundations-turn-f3.report.md, BEFORE `bun run checks`. It covers:
  - step 0's sha256;
  - the CI line for d7a47425, read at the start and before the push;
  - items 1–4 as built;
  - CL-7 and the budget-band cases;
  - CL-E's results;
  - any ceiling raised, with its cause;
  - the unit count;
  - K2;
  - git diff --name-only d7a47425.
- Then `bun run checks` once on the final tree, run whole. Add its fast line and, if it finishes, its last line. If a step fails, fix it at its root and say so. If the turn's time runs out first, push with "slow steps: not finished — CI judges". A turn never ends without its report.

Push, and END THE TURN.
```
