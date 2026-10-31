# Turn F4 plan — the open list stays in sight (D267), one list primitive (D268)

Base dev f25f6e9e. Plan only; nothing changed.

## 0. CI first
- The evidence page still shows 060d4d60, completed 09:50:50Z, FAILURE. Only the component tests failed (TI-1, CF-ADOPT-1). Both are fixed in B1, and the DCC rename landed at f25f6e9e.
- No completed run on f25f6e9e yet (read at 10:1xZ). The build re-reads it first. If it is red, the fix comes first, at its root, and F4 follows.
- B2 (separate turn) carries the operator's pick: candidate C becomes the live `.dark` card in one token change. F4 does not touch the card tokens.

## 1. Census by definition (every list that opens from a control)
| Consumer | file:line | Placement today |
| --- | --- | --- |
| Currency picker | src/features/posting/step-pricing.tsx (SearchablePicker) | usePickerPlacement |
| Phone-code picker | src/features/posting/phone-number-field.tsx (SearchablePicker) | usePickerPlacement |
| Picker placement | src/components/searchable-picker.tsx :58-71 | top floor `rect.top - 4`; floors: form action bar, bottom bar, viewport; height fixed `min(256, 44*rows+2)` |
| Facade menus | src/components/ui/dropdown-menu-impl.tsx :54-60 | `collisionPadding = 16` on every side, no chrome |
| Location | src/components/shell/location-selector.tsx | facade |
| Language | src/components/language-switcher.tsx | facade |
| Account | src/components/shell/app-header.tsx :244-268 | facade + own label, 2 separators, `me-2 h-4 w-4` icons |
| Row actions | src/components/shell/row-actions.tsx :134 | facade + own separator |
| Panel switch | src/components/shell/panel-header.tsx :84 | facade; icons `h-4 w-4 shrink-0` |
| Dev grid | src/routes/dev.style.tsx | facade (showcase) |

Chrome today: `html { scroll-padding-top: 8.5rem }` (styles.css :638) and `scroll-padding-bottom: calc(var(--bottom-bar) + var(--bar-rise))` (:640). These are the same top and bottom chrome that the list placement ignores.

## 2. Concern A (D267): one reader of the visible area
**Mechanism:** `visibleArea()` in a new `src/lib/visible-area.ts`. It is pure apart from the DOM read.
- **Top:** the larger of 0 and the bottom edge of every displayed element marked `data-chrome="top"` (the header and the bands; markers added in their own files).
- **Bottom:** the smaller of `innerHeight` and the top edge of every displayed `data-chrome="bottom"` element (the bottom bar, including `--bar-rise`, and the form action bar while it is sticky).
- **Fallback:** when no marker is drawn, it falls back to the scroll-padding values read from `html`'s computed style. The chrome is never assumed to be zero.
- **Shape:** it returns `{ top, bottom }` with an 8 px margin inside each edge.

**Picker (searchable-picker.tsx):** the `place()` logic becomes `placeList(rect, wanted, area, canScroll)`, exported and pure:
1. Room below is enough → open down. The height is `min(wanted, room)`.
2. Short below and the page can scroll → scroll the control so its top sits at `area.top + 8`, then open down. The height is bounded by the new room. This uses `scrollBy`, instant under reduced motion and smooth otherwise.
3. The page cannot scroll further → open on the side with more room. The height is bounded by that room, so the box never crosses `area.top` or `area.bottom`.
- `max-height` is set from the result through `--picker-max-height`, so the first and last rows can always be reached by scrolling inside the list.
- The hand floors (`form-layout-actions`, `bottom-bar` queries) move into the reader. No second copy remains.

**Facade menus (dropdown-menu-impl.tsx):** `collisionPadding` becomes per side: `{ top: area.top, bottom: innerHeight - area.bottom, left: 16, right: 16 }`, read on open. Radix then flips or shifts inside the visible area, and `--radix-dropdown-menu-content-available-height` bounds the panel's `max-height`.

**Guard CF-AREA-1** (scripts/conformance, kit census): no file outside visible-area.ts reads `bottom-bar`, `form-layout-actions` or `data-chrome` for placement, and no `collisionPadding={number}` literal appears outside the facade. Allowlist: empty. Planted cases VA-1…3.

## 3. Concern B (D268): every list part from the one primitive
**menu-row.ts** gains:
- `LIST_LABEL`: a non-interactive header row on the row's padding, in the muted ink, semibold `text-sm`, not truncated past CutText.
- `LIST_SEPARATOR`: one rule token, `-mx-1.5 my-1 h-px bg-hairline`. A new `--hairline` reader takes no new colour.
- `LIST_ICON`: `size-4 shrink-0` plus the list's icon ink. Spacing comes from LIST_ROW's gap only.

These constants are exported for S6 dialog parts to reuse together with LIST_SURFACE.

**Facade:** DropdownMenuLabel and DropdownMenuSeparator take LIST_LABEL and LIST_SEPARATOR. A new `DropdownMenuIcon` wrapper (`asChild` slot over the lucide icon) applies LIST_ICON, so no consumer writes icon classes.

**Consumers:**
- app-header.tsx: the account menu uses the facade parts only. "Profile" opens `/account` (G17, same as bottom-bar.tsx :132), and "Settings" opens `/settings`.
- panel-header.tsx :84, location-selector.tsx, language-switcher.tsx and row-actions.tsx: their row icons move onto `DropdownMenuIcon`.

**CF-LIST-1 rules added:**
- (8) a className on DropdownMenuLabel or DropdownMenuSeparator outside the facade;
- (9) a size, margin or colour class on an icon inside a DropdownMenuItem or RadioItem outside the facade.

Planted cases CL-8, CL-9.

## 4. Tests
**Unit:**
- VA-U1…4 `visibleArea` (markers, hidden marker ignored, scroll-padding fallback, margin).
- PL-U1…5 `placeList`: room below; short below with scroll → scroll then down; cannot scroll → up and bounded; tiny viewport → bounded both ways; RTL unaffected.
- CL-U7 facade label, separator and icon classes.

**Browser** (e2e/choice-lists.spec.ts, by spec ID via `bun run e2e:local`, both projects, retries 0):
- CL-E7 currency and CL-E8 phone-code, at 360 coarse, each from three starting positions:
  - the field centred, as the refusal scroll leaves it;
  - near the top;
  - near the bottom.
- Each case is run light and dark. After open, it asserts:
  - the list box lies within `[chromeTop, chromeBottom]` (read from the chrome markers);
  - the first and last rows scroll into the list and are hit-testable (`elementFromPoint`);
  - the trigger shows `data-state="open"`.
- CL-E9 facade menus (location, language, account, row actions, panel switch), opened near the top and bottom at 360: the panel stays within the visible area.
- CL-E10 account menu:
  - its label, separator and icon boxes equal the panel switch's (computed size, gap, colour);
  - "Profile" lands on /account and "Settings" on /settings.

## 5. G38 list (existing specs whose expectations change)
- e2e/shell.spec.ts :1312-1320: the account menu shape. The identity label testid is kept, and the hrefs change if any assertion reads them. To be confirmed by grep at build.
- Any spec asserting "Profile" → /settings: grep for `nav.profile` and `/settings` near `account-menu` at build. The census is pasted in the report.
- No picker spec asserts "up" placement today; this is confirmed by grep at build.

## 6. Growth
- New lib module (~0.25 KiB gz) sits on every page through the facade and header.
- Facade and picker change by about ±0.1 KiB.
- Header shrinks slightly (fewer class strings).
- Estimate +0.3 KiB on the pages drawing the header. Any ceiling raised goes in DEC-296 form, with the measured number.

## 7. Turns
One turn, F4. If the browser lane runs long, split it in two:
- F4a: Concern A with CL-E7…9.
- F4b: Concern B with CL-E10.

B2 (candidate C + §5/§6) stays its own turn after F4. S6 dialogs reuse LIST_SURFACE, LIST_SEPARATOR and LIST_LABEL.

## Technical details / order at build
1. Laws step first.
2. CI read.
3. visible-area.ts with its unit tests.
4. Chrome markers.
5. Picker.
6. Facade padding.
7. CF-AREA-1.
8. List parts.
9. Consumers.
10. CF-LIST-1 rules (8) and (9).
11. Browser tests.
12. Docs: design-foundation.md, mechanisms.md (two rows), _changelog.md.
13. Report.
14. `bun run checks` whole.
15. CI read again before the push.

AGENTS.md is untouched unless the brief names it.

**Scope:**
- src/lib/visible-area.ts (new);
- src/components/searchable-picker.tsx, src/components/ui/dropdown-menu-impl.tsx and dropdown-menu.tsx (facade export);
- src/components/shell/menu-row.ts, app-header.tsx, panel-header.tsx, location-selector.tsx, row-actions.tsx, bottom-bar.tsx and form-section.tsx (markers);
- src/components/language-switcher.tsx;
- the band/header files that carry `data-chrome="top"`;
- scripts/conformance/;
- e2e/choice-lists.spec.ts and the G38 specs;
- scripts/route-budgets.mjs;
- docs.

**Open:** the operator is asked to confirm G17 ("Profile" opens /account).
