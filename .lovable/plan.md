# Turn R1 plan — the left menu redesign (DEC-288, D240, D241, D243, INC-988), with INC-1005 first

Base: dev f66ca04c. Plan only; nothing changed. Request sha256 1d9e5091…080b (as given).

## CI first

- The last completed run is **b2940a61, FAILURE** (run 40974739742). The run on f66ca04c had not completed when I read it.
- Reds on b2940a61:
  - i18n used-on map and Component tests (ERRT-6): both fixed in the J-1 continue.
  - One gating E2E failure: PW-30 on mobile-360, "no place was chosen" (post-wizard-place.spec.ts).
  - Two flakes: PW-30, and PGH-E2 on desktop-1280 (a timeout). PGH-E2 ran before the switchLanguage fix.
- What the build does first:
  - If the f66ca04c run, or its repeat lane, shows PGH-E2 red, INC-715's rule ("a test never switches the language back") applies. PGH-E2 is reshaped into one switch per test.
  - PW-30 is classified first (app defect or test) and fixed at its root, ahead of Part 0.

## Part 0 — INC-1005: opening a menu moves the page

**Read so far (sandbox Chromium, /, 1280 px):**
- When the language menu opens, `body` changes from `overflow: clip visible` to `hidden`, with no padding or margin added to make up for it. That is Radix's modal scroll lock (dropdown-menu-impl.tsx :9 uses the default modal=true).
- The sandbox's scrollbar width was 0 there, because the page did not scroll. So the column did not move, and the hypothesis is **not yet proven**.
- Build step 1: the same measurement on a scrolling page in a browser whose scrollbar takes width (Chromium with classic scrollbars). It records the column's box before, during and after. If the column moves by half the scrollbar's width, the hypothesis holds. If not, STOP and report what the measurement shows.

**Consumers (by definition, every overlay that locks scroll):**

| Overlay | Today |
| --- | --- |
| DropdownMenu (language, account, panel header, every menu but row actions) | moves the page |
| RowActions (modal={false}) | does not |
| Dialog, Sheet, AlertDialog (Radix modal) | moves the page |
| Select, Popover (Radix) | moves the page where modal; verified per instance in the build |
| Tooltip | does not lock |
| Part 1's side panel | must not lock |

**Mechanism (one, at the document):**
- `html { scrollbar-gutter: stable; }` in src/styles.css. The standard is CSS Overflow Module Level 3, `scrollbar-gutter`.
- The gutter is always reserved, so hiding the scrollbar never changes the layout width.
- Each overlay keeps its own scroll behaviour:
  - modal dialogs, sheets and alert dialogs still lock the page behind them;
  - dropdown menus keep their lock as well. Only the shift is removed; their modality is not changed in this turn.
- Where the lock library also adds a compensating margin, that margin would double the gutter. The build checks for this and neutralises it in the overlay facade (overlay-facade.tsx), not per consumer.

**Guard:** CF-SHIFT-1, a census.
- It fails if styles.css loses the gutter rule.
- It fails if any overlay code adds its own scrollbar compensation, such as `padding-right` or `margin-right` from a lock.
- It is proven on a planted copy of the stylesheet without the rule.

**E2E:** OVS-1/OVS-2 (ids free), both projects.
- They measure `main`'s box with the language menu and a dialog open and closed.
- On mobile, the box must equal its closed value too; phones use overlay scrollbars, so this proves nothing regressed.

## Part 1 — one sub-menu mechanism

**What exists:** D98's side-panel code is **not in the tree**. No hover-intent, safe-triangle or flyout code exists in src/. Bundle 21 turn 5 (2026-10-18) replaced it with sub-items in place (panels.md :112).
- It exists only in git history, before that commit. The build reads it by line range and reuses its timings and logic where they still fit. It is not restored wholesale.
- The build first confirms the commit holds it; I have not read that commit yet.

**Components (src/components/shell/submenu/):**
- `SubmenuProvider` holds the open path (level 1, 2, 3), hover intent (150 ms to open, 300 ms to close) and the safe triangle.
- `SubmenuTrigger` wraps a RailRow. It owns `aria-expanded`, `aria-controls`, the pointer and touch handlers, and the keys.
- `SubmenuPanel`: a positioned panel beside its trigger at ≥ 768. On phones it is the split's right column.
- `useSubmenuItems(node)` reads children from the seeded tree, or from the panel definitions, only.
- API: `<SubmenuTrigger node href>` and `<SubmenuPanel level>`. CategoryNav and MenuNav both render through these, and RailRow stops building child lists.

**Desktop (≥ 768, fine pointer):**
- Hover opens after 150 ms and closes 300 ms after the pointer leaves the row and panel.
- The safe triangle runs from the pointer to the panel's near corners. While the pointer stays inside it, the close is delayed, so a diagonal move does not switch rows. It is computed from rects cached when the panel opens, with no reads in pointermove.
- A click opens the page.
- Alignment: the panel's first row is level with the trigger's top. The third level opens beside the second, aligned the same way.
- Edge flip: if the panel would overflow at the inline end, it opens on the other side. If it is taller than the viewport, it is clamped and scrolls inside, with its scrollbar visible. It never clips.
- RTL: sides are logical (start/end).
- Keyboard (WAI-ARIA disclosure navigation): Enter or Space opens; Arrow Up/Down move within a level; Arrow Right (inline end) enters the panel, and Arrow Left returns; Escape closes the level and focus returns to its opener. Tab order follows the DOM.

**Touch at ≥ 768 (coarse pointer):** a tap navigates and opens the panel; a tap outside closes it. Nothing relies on hover (C2).

**Folded rail (64 px, ≥ 768):** today an icon is a link to its category; I did not find a hover behaviour in the code.
- Under DEC-288: hovering an icon opens the same side panel, its header being the item's name. A click or tap opens the page and the panel.
- This is the reading the request expects. The build confirms it against app-rail.tsx's folded branch before any change.

**Phones (< 768):**
- The open menu stays 256 px wide. When a parent opens, the main column narrows to 64 px and shows icons only, each with its accessible name. The open icon is highlighted.
- The sub-items take 192 px, headed by the opened item's name (D241). Names wrap and are never cut.
- The transition moves only transform and opacity. Under `prefers-reduced-motion` it is instant.
- A column with more than 16 items scrolls with its scrollbar visible: `scrollbar-none` is removed at :955 and :1023 for those lists only. Rows stay full size, at least 44 px.
- The peek (D243; :838–:905) is not touched. It opens the main list as today, and a test asserts its timings are unchanged.

**Row heights (INC-988):**
- At ≥ 768 the rail's list is a flex column. Rows use `flex: 1 1 0` with a minimum of 36 px and a maximum of 48 px (ESTIMATE, per DEC-288). They spread to fill the height and, when they cannot fit, the list scrolls with its scrollbar visible.
- `min-h-8 max-h-10` and the compact squeeze go everywhere they occur: lines :279, :292, :316, :322, :364, :391, :429, :468, :498, :589, :634.
- On phones rows stay at least 44 px.

**First paint (DEC-295):** the rail's rows still draw from the seed. The panels draw only on intent, from the same tree, with no new request.

## Consumers and tests

| Consumer | Verdict |
| --- | --- |
| Marketplace tree (15 roots, depth 3, ≤ 21 children) | changes: through the mechanism |
| Admin groups | changes: panel instead of indentation (D240) |
| Account and seller panels | changes where they have sub-items; otherwise unchanged |
| Folded 64 px rail | changes: hover/tap panel |
| Phone strip | unchanged (no sub-items; links only) |
| Favourite row (D207) | unchanged, stays above the list |
| ‹ Main menu row | removed where the panel replaces in-place drilling. A STOP for a ruling if any panel still needs it. |
| Peek (D243) | unchanged |
| First-paint seed | unchanged, proven by rail-first-paint |

| Test | Verdict and why |
| --- | --- |
| e2e/category-nav.spec.ts | changes: the in-place assertions become panel and split assertions; same rows, same links |
| e2e/helpers/category-menu.ts | changes: opening a level means hover or tap through the trigger |
| shell.spec.ts | changes: rail-level and ‹ Main menu tests; others unchanged |
| admin-shell.spec.ts | changes: groups open in a panel |
| phone-frame.spec.ts | changes: the 64/192 split widths |
| rail-first-paint.spec.ts | unchanged; must stay green |
| overlays.spec.ts | unchanged, plus the OVS cases |
| helpers/ui.ts | changes only if a rail helper drills in place |

No assertion is loosened (G38). Each replaced assertion names the rule it now proves.

**New tests (ids grep-checked free at build time; proposed SMN-*, SMN-E*, OVS-*, CF-SUB-1):**
- Unit: hover intent timings; the safe triangle keeping a row open; keyboard order and Escape focus return; the edge flip and clamp; reduced motion.
- E2E, both projects:
  - the side panel's first row level with its trigger (within 1 px);
  - the third level;
  - the touch tap opening page and panel;
  - the phone split, with icons only and their names;
  - a visible scroll over 16 items;
  - the peek unchanged;
  - admin groups through the same mechanism.
- Guard CF-SUB-1: a census that fails when a panel renders a nested child `<ul>` under a RailRow (an in-place indented list) instead of SubmenuPanel. It is proven on a planted copy of today's RailRow shape.

## First-download cost

- The mechanism adds about 2–3 KiB gzip of code on every page (ESTIMATE, band ±50%), plus the gutter rule (bytes).
- To stay inside the G60 tolerance:
  - the safe triangle, the panel and the phone split load on demand through `loadOnce` on first intent;
  - only the triggers' attributes are on the first paint.
- The build measures every page against the base and STOPs if any page grows more than 0.5 KiB.

## Conflicts

- **C2 (nothing relies on hover):** met. Click, tap and keys open every level; hover is an extra.
- **C1 (360 first):** the split is designed at 360 first.
- **C5 (RTL):** logical sides and flip.
- **Knowledge (docs/features/panels.md :112, D213):** "in place at every width" is superseded by DEC-288. The doc and changelog are updated in the turn.
- **AGENTS.md "one ☰ per width":** kept.
- **The safe triangle's pointermove:** within I3, since it reads rects cached once and never what it mutates.
- **The platform:** no conflict found.

## K2

- `scrollbar-none` on other lists: styles.css :29–:34 names its users. The ones that are not menus are reported, not changed.
- Per-instance `modal` choices on Select and Popover.
- Hard-coded row heights outside app-rail.tsx, which the build lists by grep.

## Sizing (ordered turns)

| Turn | Scope | Estimate |
| --- | --- | --- |
| R1a | CI reds, Part 0 (gutter, guard, OVS) | S, 1 turn |
| R1b | Mechanism, unit tests, CF-SUB-1, row heights, measurement | L, 1–2 turns |
| R1c | Marketplace tree and folded rail on it; category-nav changes | M, 1 turn |
| R1d | Admin groups, account and seller panels, phone split and visible scroll; remaining tests | M–L, 1–2 turns |

Total: 4–6 turns (band ±1).
