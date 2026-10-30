# Foundations turn R1d-a — report

1. **Step 0.** `docs/governance/briefs/foundations-turn-r1d-a.md` saved; the fenced text's sha256 is `937d5b13b1d4a4e5cf307dc562e6bf7df3f271f705ce3377293002f1f577efe4`, equal to the ruling's value. Roadmap line 3 names it; the D250 sentence is appended, exactly, to redesign Part 2's entry (DEC-289).

2. **CI.** Run 41026396254 on `cbedb82e`: **SUCCESS** (completed 2026-10-30T08:45:24Z). No red to classify; PHR-1 passed there. The final tree of this turn has no CI yet.

3. **Part A — D248.**
   - **The system (G0).** New `src/components/shell/menu-row.ts` holds ITEM_CORE, ITEM_IDLE, ITEM_ACTIVE; `app-rail.tsx` and `submenu-impl.tsx` import them. The panel's ROW/IDLE/ACTIVE are gone. CF-ROWS-1 refuses a menu file that defines its own row classes or does not import `menu-row.ts`. A planted copy proves it in the self-test: the panel's own `const ROW`, and a rail without the import. The old "a panel row sets its own height" line is replaced by this one.
   - **Item 1, look.** The panel takes `bg-sidebar`, `shadow-side`, `rounded-lg`, no border, no separators, and `px-2` like the rail. Its rows take ITEM_CORE with ITEM_IDLE / ITEM_ACTIVE, so `bg-muted` is gone (INC-042). Each row shows its category's glyph: `itemsOf` uses the rail's `glyphOf` / `categoryIcon` lookup. D245's 300 ms opacity fade, the closing panel and reduced motion are unchanged. `PANEL_INSET` and `PANEL_OVERLAP` go to 0, since there is no border now. "Rounded like the rail's surfaces": the rail itself is square, so I chose `rounded-lg`; the operator may name another radius. Tests: SMN-E5 (G38: its surface half is now D248's), SMN-E6 (G38: the folded panel is rounded with no border), and SMN-E7 at 1280×800 and 1280×600 (no border, rounded, no separators, the shared classes, an icon on each row).
   - **Item 2, size and alignment.** The rule is `snapToGrid` in `submenu-geometry.ts`. The first row sits on the opener's row, at the rail's row height. A panel that would end too low moves up by whole rows until its last row meets the menu's last row. A panel taller than the menu takes the menu's height; its rows shrink, down to 32 px, and then it scrolls. Here the menu is the visible span of the opener's own list inside its `data-menu-region`, which is the rail's scroll area or the parent panel. Panel rows take their height from `--menu-row-h` (`.menu-snap` in `src/styles.css`). Tests:
     - unit SNP-1 (the first row on the opener), SNP-2 (moved up by whole rows), SNP-3 (the menu's height, then the 32 px floor, then a scroll);
     - E2E SMN-E7 (row height and tops within 1 px of the rail's) and SMN-E9 (a panel from the last root ends at the rail's last row).
   - **Item 3, scrolling from 768 px.** A new `@media (min-width: 768px)` rule makes `.menu-fit[data-many]` lists fit like any other list. From 768 px there is no item limit; below 768 px the 16-item rule is unchanged. D247's sentence is rewritten, exactly, in `panels.md` and register row 80 (Concern and Notes); the C2 exception is unchanged. G38 changes, each named:
     - ROWS-E3: its main-list judge drops the ">16 keeps full-size rows" branch, and `data-many` now only marks the count. Its seeded panel is now bounded by the rail's height: 12 rows fit, or they hold 32 px and scroll with a visible scrollbar.
     - SMN-E4 (`everyRowOnScreen`): the panel is wholly on screen and never below the rail's last row; its rows fit, or they hold 32 px and it scrolls.
     - SMN-E3: "a panel row is at least 44 px" becomes "at most the rail's row, at least 32 px".
     - Test for the new behaviour: SMN-E10. A 20-row panel fits at 1280×1000; at 1280×600 its rows reach 32 px and it scrolls, scrollbar width > 0.
   - **Item 4, one line.** Panel rows (and the folded panel's header) use `CutText`, the rail's own truncation rule, with `aria-label` and `title` set to the full name. Test: SMN-E8 seeds a 60-character name (removed in afterEach). It asserts scrollWidth > clientWidth, `text-overflow: ellipsis`, `nowrap`, one line high, and the title and aria-label equal to the full name.
   - **Item 5, test runs.** All ids were checked free by grep. The touched files — `submenu-look.spec.ts` (new), `submenu.spec.ts`, `submenu-touch.spec.ts`, `menu-rows.spec.ts` — ran whole, both projects, retries 0: 16 passed, 16 skipped (the other project's skips), 0 failed. The first run had 3 failures: ROWS-E3 and SMN-E4 at 1280 and 1024, all assuming a panel could be as tall as the window. They were changed under G38 as listed and passed on the rerun. Unchanged files that the change reaches — `shell.spec.ts`, `category-nav.spec.ts`, `overlay-shift.spec.ts` — also ran whole: 172 passed, 66 skipped, 0 failed. No helper changed (G37: no by-id runs owed). `scripts/e2e-select.ts` maps `submenu-look.spec.ts` and `menu-row.ts` to the sub-menu area.

4. **Growth (per-page first download, gzipped, against cbedb82e's measured sizes at the budget's 0.1 KiB precision).**

   | Growth | Pages |
   | --- | --- |
   | +0.0 KiB | 30 |
   | +0.1 KiB | 20 |

   - **Cause:** the panel rows' glyph lookup in the rail's code on the first paint (the row classes only moved into one module), plus the from-768 and `.menu-snap` rules in the shared stylesheet (styles 20.6→20.8 KiB on the report's rounding).
   - **Ceilings raised by DEC-296** (the NEAR band asked): `/my-listings` 329→330 (328.7 KiB), `/my-listings_/$listingId_/edit` 397→398 (396.7 KiB).

5. **Units.** 2,285 / 2,285.

6. **Checks.** The first whole run failed twice: the e2e selector self-test (the new spec was not mapped to an area) and the NEAR band (the two pages above). Both were fixed. The second whole run, last line: `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 1201s`.

7. **K2.**
   - INC-1011 meets D248: on a short page the rail ends at the footer (302 px at 1280×600 in the test state). A panel now takes at most the rail's height, so a 12-row panel there scrolls at 32 px. Whether the menu keeps its height is the operator's ruling.
   - `panels.md` keeps D245's surface sentence as history, followed by D248's withdrawal; the register rows name the new mechanism.
   - Seen in the census: MenuNav's groups and the phone strip still draw sub-items in place (CF-SUB-1 count 3, allowlisted); they move in R1d.
   - Tooling `localeCompare` sites and the E2E Segmenter oracle (L-2), unchanged.

8. **git diff --name-only cbedb82e.**
   - .lovable/plan.md
   - docs/_changelog.md
   - docs/features/panels.md
   - docs/generated/i18n-usage.json (regenerated by the map guard; a new file was scanned)
   - docs/governance/briefs/foundations-turn-r1d-a.md
   - docs/governance/mechanisms.md
   - docs/governance/reports/foundations-turn-r1d-a.report.md
   - e2e/menu-rows.spec.ts
   - e2e/submenu-look.spec.ts
   - e2e/submenu-touch.spec.ts
   - e2e/submenu.spec.ts
   - public/i18n-usage.json (regenerated, as above)
   - roadmap.md
   - scripts/conformance/menu-rows.test.ts
   - scripts/e2e-select.ts
   - scripts/route-budgets.mjs
   - src/components/shell/app-rail.tsx
   - src/components/shell/menu-row.ts
   - src/components/ui/submenu-geometry.ts
   - src/components/ui/submenu-impl.test.tsx
   - src/components/ui/submenu-impl.tsx
   - src/styles.css

9. **R1d plan.** `.lovable/plan.md`, "Turn R1d plan (revised in R1d-a)". It covers D248 on phones, D249's third level, the one "← <name>" header row, D251's moves (250 ms, `cubic-bezier(0.2, 0, 0, 1)`, transform and opacity only, mirrored in RTL, none under reduced motion), and the column state machine in `src/components/shell/menu-columns.ts`. It also lists the tests MCL-1–3 and SPL-E1–E8, the growth, the conflicts and four ordered parts with ESTIMATEs. No R1d code was written.
