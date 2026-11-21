QUESTION — tests-ci-2 STEP 1: the census stop (INC-1186's substance and the plan's rulings)
DONE: STEP 0, STEP 1 (the census: docs/governance/reports/tests-ci-2.census.md)
LEFT: STEPs 2, 3, 4, 5, 6, 7
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `96b53abfecb1ec414f02c24da533b4b8aa0c297d` (short `96b53ab`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T05:14:11Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44869352644
FILES:
docs/governance/briefs/tests-ci-2.md
docs/governance/reports/tests-ci-2.census.md
docs/governance/reports/tests-ci-2.stop-1.md
roadmap.md
scripts/conformance/briefs-allowlist.txt

This stop always happens (the brief, STEP 1). `origin/dev` equals the base (96b53abfe).
`bun scripts/brief/check-go.ts docs/governance/briefs/tests-ci-2.md`: `[check-go] no finding`.

The census proves three of the brief's premises wrong (item 3, item 4 and item 8's scope), and
two items meet a rule. The questions, in item order:

1. Item 2 (INC-1186, INC-1168 (c)): INC-1186's substance, in the chat only (G51). INC-1168 (c)
   still asks for a carry step that rebuilds a Lovable pull request from `dev` plus exactly the
   approved files.

2. Item 1 (INC-1181, INC-1182), the seed and the schedule:
   - Proposed: `SELLERS = 2048` in `scripts/feed-bench-market.ts:29`.
   - Proposed: the seed logs seller creation's seconds apart from the listings' seconds.
   - Proposed: the cron becomes `"10 13 * * 0"`, 2 h 20 min before the earlier nightly cron
     (`"30 15 * * *"`).
   - Premise: INC-1181 blames the free-slot guard by estimate. A per-row index refresh
     (`feed_index_refresh`, made heavier in `20261104153313` and `20261108070500`) is a second
     cost that does not depend on the seller count. The dispatched run tells them apart.
   - Rule 50 forbids `gh workflow`, which STEP 6 names for the dispatch. Shall the operator
     dispatch the bench on `cursor/tests-ci-2` (the brief's own fallback)?
   - `timeout-minutes` is set from that run. That needs one code commit after the push (the
     TOLERANCES' "at most one further code commit"). Is that the intended order?

3. Item 3 (INC-1190, INC-1198), the budget:
   - Premise wrong: the `dev` push d7c242641 skipped the budget because run 44061994764 had judged
     the identical code tree (`Bundle budget OK.`, 290.7 / 291 KiB at `/admin/users_/$userId`). No
     record file reaches the build. Does the skip change still stand? If it does, the rule would be
     "a `dev` push whose diff from its first parent touches `src/` runs the budget even on a proven
     tree", with CF-DOCS-12 proving both sides and `check-promote-needs.sh` changed to match.
   - The ratchet: every ceiling to `ceilingForLocal(size)` (DEC-296, `scripts/budget-band.mjs`).
     The census table has 49 of 50 pages changing, −120 KiB in total.
   - Do entry JS (201.7 / 205) and CSS (22.5 / 40) ratchet too?
   - Does `RATCHET_SLACK_KIB` (8, `route-budgets.mjs:81`) come down?
   - Does `bundle-closure.mjs:189`'s suggestion (`Math.ceil(kib + 3)`) become `ceilingForLocal`?

4. Item 4 (INC-1193), the cycle:
   - Premise wrong: `src/` has no import cycle at the base (743 files, 0 cycles, dynamic edges
     included) or at L10's merge `385003bd1` (0 cycles). The dev server's stack is needed to find
     the cause.
   - Option A: I run `bun run dev` with every Supabase address name pointed at a closed
     127.0.0.1 port, and read the error's stack through the browser tool.
   - Option B: the operator reproduces it in Lovable's preview and pastes the stack.
   - Option C: the guard alone (a cycle census over `src/i18n/` and its importers, CF-CYCLE-1, with
     a planted cycle) lands here, and INC-1193 stays open.

5. Item 5 (INC-1205, INC-1207): no question. The plan:
   - the three perl readers (`check-migrations.sh:52`, `:696`, `:722`, with `real_row_split`) move
     into a sibling of `migration-reader.ts`, with CLI modes in `migration-reader.ts`;
   - every caller checks its reader's exit;
   - each guard gets a planted reader failure, and MGR-9 onward;
   - the real-row allowlist's keys stay byte-equal.

6. Item 6 (INC-1206): no question. The plan: an in-test ceilings fixture for CF-LVB-13 and
   CF-LVB-14, landing before item 3's ratchet.

7. Item 7 (INC-1210, INC-1015), the two retried tests:
   - SMN-E13's cause is another worker's root category joining the rail between the spec's read
     at `e2e/submenu-look.spec.ts:218`–`:220` and its open at `:231`. The rail's rows flex, so one
     more root means one more row held, and the panel fits. The lane-mates
     `posting-routes.spec.ts:663` and `admin-attributes-library.spec.ts:1088` and `:1358` insert
     roots.
   - That meets `scripts/ci/lane-plan.ts:37`–`:39` ("… returns this to one in the next commit,
     with its INC"), and corrects `scripts/conformance/shared-value-tables.txt:13`
     (`category_tree_pointers` "read, not shared").
   - Option A (the rule as written): `LANE_WORKERS` 2 → 1.
   - Option B: SMN-E13 tagged `@global-state` (the serial lane, one worker), its premise read
     after its own root is in place, and `shared-value-tables.txt:13` corrected. CF-LANES-4 would
     then judge every writer of root pointers: 15 spec files seed categories, some through
     sanctioned helpers.
   - CL-E10's cause, by reading: the ⋮ trigger (`src/components/shell/row-actions.tsx:109`–`:122`)
     is both a menu trigger and a tooltip trigger. When the overlays code arrives after the click,
     both replay together (`src/components/ui/overlay-facade.tsx:279`–`:290`). The tooltip then
     opens above the open menu, and Escape closes the tooltip, not the menu.
   - The fix lives in `overlay-facade.tsx`, outside SCOPE. It is a behaviour change on every row's
     ⋮ menu, and it moves every page's first download. Is the file added to SCOPE, with a red-first
     test (the overlays chunk held until after the click)? Or does CL-E10 leave this turn?

8. Item 8 (ACT-023): L18 already removed free widths from the column type. The one free width
   string left is `minWidth`. Proposed check T11 in `scripts/admin-tables.ts`: refuse a `minWidth`
   that is not exactly one `min-w-<token>` class, read from the syntax tree, with a planted
   `w-fit max-w-40` case. Is that the check?

Findings beyond the task (census §findings):
- `src/i18n/provider.tsx:50` `as unknown as` (TypeScript law).
- The scratch-table guard fails open (`check-migrations.sh:48`–`:99`).
- `bundle-closure.mjs:189`'s suggestion does not agree with DEC-296.
- `shared-value-tables.txt:13`.

No security hole found in the census.
