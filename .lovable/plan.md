# Turn R1c plan — D244–D247 (INC-1008, INC-1009), then the folded rail

Base dev a4bfd7c7. Tier B. No migration, no new dependency. Plan only; nothing changed. Request sha256 f1b6d8ac…d7 (as given).

## CI first

The last completed run is on `36c4a083`, run 41000289665: **SUCCESS**, E2E passed, 0 flaky (raw ci-evidence, read 05:1xZ). No run on a4bfd7c7 has completed yet, so there is nothing to fix first. The build turn reads CI again before it pushes.

## Evidence gathered for this plan (dev server, Chromium, scrollbars hidden unless noted)

| Probe | Result |
| --- | --- |
| Level 2 from the last root, 1280×600 and 1024×600 | Fits: top 206, height 386, bottom 592 (inside 600) |
| Level 2 that is tall (the only root with a third level, index 4 of 15), 1280×600 | Panel content is 576 px. It is clamped to 536 px with top 56 (under the top bar's bottom, 56), so it scrolls **inside** itself: its last rows sit below the panel's visible area |
| Same panel, then the window is made 150 px shorter | Not placed again: it keeps 536 px and its bottom (592) is **below the 450 px screen** |
| Level 3 | maxHeight 592 = the whole viewport, because `minTop` is 0 for depth ≥ 1, so it is allowed under the top bar |
| Rail, 1280×600, fine pointer | Its scroll area is 568 / 488: **it scrolls** (15 roots × 36 px + 14 × 2 px gaps) |
| Phone menu, 360×740, touch, coarse pointer | 688 / 628: **it scrolls** (15 × 44 px + gaps); rows measure 44 px |
| Phone menu, 360×640, coarse | 688 / 528: it scrolls |

**INC-1008, cause named but not yet confirmed (G21).** I reproduced two ways a panel's rows end up off screen:
1. **No placement on resize** (`submenu-impl.tsx:176–191`, `useLayoutEffect` keyed on the opening only). A panel opened in a taller window stays tall after the window shrinks. The preview frame resizes when the editor's panes move.
2. **A tall panel scrolls inside itself, without a visible scrollbar in a headless browser.** Its bottom rows read as "below the screen".

I have not reproduced a panel whose own box crosses the bottom edge in a fixed window: the shift at `submenu-geometry.ts:42–44` works. The build's first step reproduces in the preview's own frame, at the operator's window size (to be read from his screenshot or asked), before any fix. If neither cause matches, that is a STOP with the measurement.

## Item 1 — D244 / INC-1008: every panel wholly on screen

- **Mechanism:** `placePanel` (`src/components/ui/submenu-geometry.ts:29–46`) and the `Panel` layout effect (`submenu-impl.tsx:176–191`).
- **Change:**
  - `minTop` becomes the top bar's bottom at every depth. It is read once per placement from the shell's header box, handed in like `edgeOf`, never 0.
  - The panel is placed again on `resize` while open: one listener in the on-demand layer, rAF-throttled, removed on close. A child panel re-places after its parent (I3: nothing is observed; it just reads on the event).
  - The rule stays: level with the opener when it fits, raised just enough when it doesn't, never under the top bar. A panel still too tall follows item 4.
- **Consumers:** CategoryNav's rail and folded rail use it (`app-rail.tsx:692`). MenuNav, the admin groups and the phone strip bypass it until R1d (CF-SUB-1 allowlist, count 3).
- **Guard:** CF-SUB-1 gains a census line: no caller may pass a literal `minTop`, and the layer must register a resize re-placement. Planted proof: `minTop: 0` restored.
- **Tests** (ids grep-checked free at build time):
  - Unit SMG-1…4: low opener, third level from a low row, top-bar floor at depth 2, re-placement on resize.
  - E2E SMN-E4, 1280×600 and 1024×600: open the last root's panel and a third level from its lowest row with sub-items; every row `toBeInViewport()`; resize to 450 px and check again.
- **Growth:** 0 KiB on the first paint (all in the on-demand chunk). ESTIMATE.

## Item 2 — D245: how a panel appears (read from the current ethio.com)

The sandbox reached the site (`https://ethio.com/`, theme `wp-content/themes/ethiopian/`). I read the computed style of `.leftmenu .dropdown-submenu` before and after hover, in Chromium at 1440×900.

| Aspect | The current ethio.com | Source |
| --- | --- | --- |
| Surface | `background-color: #fff; border: 1px solid #ccc; border-radius: 0; box-shadow: none; min-width: 200px` | style.css:5030–5046 (`.nav ul ul`) |
| Placement | `left: 100% !important; top: 0 !important`: flush against the menu, first row level with its item, no gap. Its own 1 px border overlaps the menu's (panel x 351.5 vs menu right 352.5) | custom.css:281–285; style.css:31744–31750 |
| Motion, open | `transition: top .3s ease, opacity .3s`, from `opacity: 0; transform: scaleX(0); z-index: -1` to `opacity: 1; transform: scaleX(1); z-index: 999` (style.css:5065–5070). The transform is not transitioned, so it snaps; `top` is pinned by `!important`, so nothing slides. **What you see: a 300 ms opacity fade (ease), with no movement** (measured: opacity 0.35 at 60 ms) | style.css:5031, 5065–5070 |
| Third level | `.nav ul ul ul { transition: left .3s ease, opacity .3s; left: 110% }`, but custom.css's `left: 100% !important` pins it, so it also only fades | style.css:5048–5055; custom.css:282 |
| Close | On hover-out the same 300 ms opacity fade back to 0 | style.css:5030–5046 |
| Rows | `padding: 8px 2rem` (sub-rows `5px 2rem`), `border-bottom: 1px solid #ccc` (none on the last row), hover `background: #e9ecef` with `transition: .5s ease-in-out` | custom.css:268–280, 286–288 |
| No script | `js/custom.js` has no sub-menu code (no `dropdown-submenu`, `leftmenu` or `hasmenu`) | custom.js |

**Plan to match it in tokens (C3):**
- Surface: `bg-popover` (white in light mode), `border border-border`, `rounded-none`, no shadow. This replaces `bg-sidebar rounded-md shadow-lg`, so the panel no longer reads as the rail itself.
- Placement: flush, its border overlapping the rail's edge by 1 px.
- Motion: opacity 0→1 over 300 ms `ease` on open, and 1→0 over 300 ms on close. The layer keeps a closing panel mounted 300 ms (`data-state="closed"`, non-interactive, `aria-hidden`) after D98's 300 ms close delay.
- Every level the same. `prefers-reduced-motion`: no animation either way.
- Row separators 1 px `border-border` and the hover tint `hover:bg-muted`.
- **For a ruling:** the old rows' 0.5 s hover transition and their 2rem padding. I propose keeping our row padding and no hover transition (snappier on low-end Android). If you want the old site's look for those too, say so.
- The token colours are the closest design tokens, not the literal #fff/#ccc/#e9ecef. The build reports the token values beside them.
- **Tests:** unit SMN-7 (closed panel kept mounted 300 ms, then removed; none under reduced motion). E2E SMN-E5 (computed opacity transition 0.3 s, border 1 px, radius 0, no shadow; `emulateMedia({ reducedMotion: "reduce" })` gives no animation).
- **Growth:** about 0.02–0.05 KiB of CSS on the first paint (new utility classes). The JS is on demand. ESTIMATE.

## Item 3 — D246: every menu shows where the person is

- **Mechanism:** the level computed from the URL, `fromUrl` (`app-rail.tsx:530–534`). Today the "menu" variant overrides it with `id: null` on every opening (`:535–540`, comment "Each phone opening starts over the strip's main rows").
- **Change:**
  - Every phone opening uses `fromUrl`: the open category's children, or a leaf's siblings under its parent. The current row keeps `aria-current="page"` and is scrolled into view (`block: "nearest"`, no smooth scroll) once per opening.
  - ‹ Main menu / ‹ <parent> still moves up without navigating; the breadcrumb navigates.
  - The D243 peek uses the same opening path, so it shows the same level; its timing and focus rules are untouched.
  - `docs/features/panels.md:112`'s clause "The phone menu opens at the main list" is rewritten to D246.
- **Large screens:** panel rows already carry `active` / `ancestorActive` (`app-rail.tsx:565–566, 590–591`) and draw `ACTIVE` (`submenu-impl.tsx:146`). The plan adds the rail's ancestor highlight to `ancestorActive` panel rows and proves it. No panel opens by itself for the current page.
- **Under R1d's split:** the same `fromUrl` level heads the sub-panel. Recorded for R1d.
- **Consumers:** CategoryNav "menu" variant uses it (changed here), "rail" variant uses it, the strip uses it (marks only), MenuNav bypasses it (route menus mark by `isCurrent`, `:752`; unchanged).
- **Guard:** CF-SUB-1 census: the "menu" variant may not seed its level with a literal `null` / `undefined` on opening. Planted proof: `id: variant === "menu" ? null : …` restored.
- **Tests:**
  - **Changed (G38, replaced by D246, not loosened):** B21SC-1 SC-1 (`e2e/shell.spec.ts:3710`). Its reopen block (`:3746–3753`) asserted "no back row, the main list" after a leaf; it now asserts the leaf's level, the leaf marked and in view, and back without a navigation. The census at build time names any other test asserting "opens at the main list" (grep found only this one).
  - **New:** SC-6 (mobile-360): Clothing & Shoes → a leaf; reopen shows the leaf's level marked and in view; ‹ Main menu returns with the URL unchanged; a reload with `ethio.peek=force` peeks at the same level. SC-7 (desktop-1280 and 768): on the leaf's page, the opened panel marks the leaf (`aria-current="page"`) and its ancestor row.
- **Growth:** about 0 to +0.05 KiB JS (the override goes, a `scrollIntoView` arrives). ESTIMATE.

## Item 4 — D247 / INC-1009: a list fits before it scrolls

- **Measured:** the phone at 360×740 coarse overflows by 60 px (688 vs 628). The rail at 1280×600 fine overflows by 80 px (568 vs 488). Part of each overflow is 14 × 2 px of row gaps.
- **Rule** (one CSS mechanism, `src/styles.css`'s row bounds, today `.rail-row` / `.rail-spread`):
  - **16 items or fewer:** the list is a flex column filling its region with no gaps (spacing inside the rows). Each row is `flex: 1 1 0` with `min-height: 2rem` (32 px floor, ESTIMATE) and `max-height: 3rem` (48 px), on every pointer and width.
  - **More than 16:** marked by `data-many` from the count. Rows sit at full size (44 px coarse, 36–48 fine) and the region scrolls with its scrollbar visible: `scrollbar-none` is removed from the phone list, and the rail already shows one.
  - **Too short even at 32 px:** the region scrolls (scrollbar visible). With 15 roots + the favourite (16) × 32 = 512 px of rows, that happens below **about 624 px of viewport** on phones (52 top + 60 bottom bar) and **about 624 px** for the rail (112 px of chrome measured at 600). ESTIMATE; the build measures it.
  - Consequence: at 1280×600 the rail still scrolls with 16 rows (488 < 512); 15 rows fit (480). The test uses the real tree (15 roots, no favourite). Ruling needed if the favourite case at 600 must also fit (the floor would have to drop to 30 px).
  - This replaces R1b-2's "≥ 44 px with a coarse pointer at any width" for menu rows (S493). The C2 exception is recorded as below.
- **Consumers:**
  - Uses: the rail (`app-rail.tsx:600–603`), the phone menu's list and the strip rows (`COMPACT_ROW` / `COMPACT_HEAD`, `:112–113`).
  - Panels: the panel's list (`submenu-impl.tsx` `ROW`) has a fixed min-h-11 / min-h-9 today. It moves to the same rule: a panel of ≤ 16 rows shrinks to fit the space between the top bar and the bottom, down to the floor, before it scrolls. This also closes the "tall panel scrolls inside" cause of INC-1008.
  - Bypasses until R1d: the admin groups, the account and seller menus.
- **Guard:** a new census, CF-ROWS-1: every menu list's row class comes from the one rule (no `min-h-11` / `pointer-coarse:` / `min-h-9` literal on a menu row outside `src/styles.css`), and `scrollbar-none` is refused on a menu region. Planted proofs: a literal `min-h-11` on a panel row; `scrollbar-none` on the phone list.
- **Tests:**
  - ROWS-E1, phone coarse with hasTouch, 360×640: the main list and a 15-item list have scrollHeight equal to clientHeight, every row ≥ 32 px.
  - ROWS-E2: the admin menu (> 16 items) scrolls and its scrollbar has width > 0. This runs without `--hide-scrollbars`, as OVS does.
  - ROWS-E3, 1280×600 fine: the rail does not scroll.
  - C1 (`shell.spec.ts`, 36–48 px) changes to 32–48 px under D247 (G38); SMN-E3's ≥ 44 px row check changes likewise.
- **Growth:** CSS only, about ±0.1 KiB; JS about 0 (`data-many` is one attribute). ESTIMATE.

## Item 5 — the folded rail (64 px) on the mechanism

- **Already done in R1b-2:**
  - A hover on a folded icon opens its side panel headed by the category's name (`showHeader={collapsed}`, `app-rail.tsx:692`; asserted at `shell.spec.ts:844–846`).
  - The rail and folded rail no longer drill in place.
  - A coarse tap opens the page and the panel (the `click` signal's `pointerType`).
- **Left:**
  - A tap test on the folded rail at 1024 with hasTouch (SMN-E6).
  - The folded header picks up item 2's surface.
  - The "category-nav changes" in `category-nav.spec.ts`: its assertions are re-read against items 3–4, and each changed one is named with why.
- **Growth:** 0 KiB.

## Files by item

- 1: `src/components/ui/submenu-geometry.ts`, `submenu-impl.tsx`, `app-rail.tsx` (pass the top bar's box), `submenu-impl.test.tsx`, `e2e/submenu.spec.ts`, `scripts/conformance/submenu.test.ts`.
- 2: `submenu-impl.tsx`, `submenu-impl.test.tsx`, `e2e/submenu.spec.ts`.
- 3: `app-rail.tsx`, `e2e/shell.spec.ts`, `docs/features/panels.md`, `submenu.test.ts`.
- 4: `src/styles.css`, `app-rail.tsx`, `submenu-impl.tsx`, `scripts/conformance/menu-rows.test.ts` (new) and its allowlist, `e2e/menu-rows.spec.ts` (new), `e2e/shell.spec.ts`, `e2e/submenu-touch.spec.ts`, `scripts/e2e-select.ts`.
- 5: `e2e/submenu-touch.spec.ts`, `e2e/category-nav.spec.ts`.
- Records: `docs/features/panels.md`, `docs/_changelog.md`, `docs/governance/mechanisms.md` (row 79 amended; a row for CF-ROWS-1), `scripts/route-budgets.mjs` only if growth appears, the report.

## Conflicts

- **Knowledge C2 (≥ 44 px touch targets) against D247's 32 px floor.** No automated C2 check exists in `scripts/conformance/` (grep), so "where the C2 check lives" is the rule text itself. The exception goes in `docs/conventions.md` (the shared constitution) and in panels.md. Neither is a file the request names: **ruling needed** on where it is written. Knowledge v3.12 itself is the operator's text.
- **C3 tokens against the old site's literal colours** (item 2): matched by tokens, with the values reported.
- **DEC-288's "36–48 px fine / ≥ 44 px coarse" text** is superseded by D247 in panels.md and register row 79.
- **Playwright hides scrollbars:** "scrollbar visible" tests launch without `--hide-scrollbars` (precedent: OVS).
- **Platform:** none. The preview frame's size is the operator's to report.

## K2

- MenuNav (account, seller), the admin groups and the phone strip still draw sub-items in place (CF-SUB-1, count 3, until 2026-11-30).
- MenuNav's rows keep their own heights until they move onto D247's rule.
- The phone list's `scrollbar-none` until item 4.

## Build order (ESTIMATES)

| Part | Work | Estimate |
| --- | --- | --- |
| 0 | Step 0, CI read; reproduce INC-1008 in the preview frame and name the cause | S |
| 1 | D244 placement + resize; SMG-1…4, SMN-E4; guard line | S–M |
| 2 | D247 rows rule, panel rows, CF-ROWS-1, ROWS-E1…3, C1/SMN-E3 changes | M |
| 3 | D246 phone level; SC-1 changed, SC-6/SC-7; guard line; panels.md | S–M |
| 4 | D245 surface + 300 ms fade in/out, reduced motion; SMN-7, SMN-E5 | S |
| 5 | Folded rail tap SMN-E6; category-nav re-read | S |
| 6 | Measurement (≤ 0.5 KiB per page, else STOP), docs, checks once, report | S |

Overall about 1–2 turns. The split point is after Part 2 with the checks green.
