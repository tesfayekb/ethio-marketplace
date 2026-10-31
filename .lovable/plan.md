# Turn F — every list of choices that opens from a control (D264, Sage §14)

Base dev d48a3cb3 (confirmed as HEAD). CI first: the build turn reads the run on d48a3cb3 and fixes any red that is not infrastructure before anything else.

## Premises the census corrects
1. **The posting lists are not drawn by hand row by row.** step-pricing.tsx and phone-number-field.tsx both use `src/components/searchable-picker.tsx`. Its `PickerOption` (:126, `role="option"`, `min-h-11 px-3 text-sm`, `bg-accent` when highlighted, a tick at the end) is a **second row mechanism**, not two bypasses. The fix is to put it on the same row constants, not to rewrite the two steps. Because of that, one turn is enough.
2. **No menu surface tokens exist.** `--popover` holds the right colours (white, dark #1D2621 at styles.css :421), but there is no menu radius or menu shadow token. Turn F adds `--radius-menu` (14 px) and `--shadow-menu` to src/styles.css, in both themes.
3. **The popover is a sibling surface.** `ui/popover.tsx` :19 (`rounded-md border p-4 shadow-md`, zoom-in-95, `sideOffset 4`) is used only by toolbar-panel.tsx :108. That panel holds filter controls, not a list of choices. It takes the attached surface but not the row sizing.
4. **Native `<select>` is outside this concern.** The phone's own picker draws the open list. The closed control already sits under the field primitive. Recorded as LEFT, with the reason.

## Census (by definition: the facade's content parts, `role="listbox"|"menu"|"option"` in src)
| Consumer | Today | Decision |
|---|---|---|
| language-switcher.tsx :74 | facade; `w-40 p-1` overrides | MOVE: drop the width and padding overrides; the panel gets at least the trigger's width |
| app-header.tsx :242 (account) | facade, no overrides | uses the mechanism |
| panel-header.tsx :69 | facade; `w-56` | MOVE: `w-56` becomes a minimum, not a fixed width |
| location-selector.tsx :106 | facade; `max-h-72 overflow-y-auto` | keeps its own height cap (allowed: a height, not row or panel classes) |
| row-actions.tsx :124 | facade | uses the mechanism (rows get the new sizing) |
| dev.style.tsx :272 | facade | uses the mechanism |
| searchable-picker.tsx :126 (PickerOption) + its listbox | own row classes | MOVE onto the shared row and panel constants |
| step-pricing.tsx :484/:525, phone-number-field.tsx :211/:281/:300 | through SearchablePicker | follow the picker; the search field stays |
| toolbar-panel.tsx :108 (Popover) | own panel | MOVE onto the attached surface only (not a list) |
| step-where.tsx :1796 | map pin dialog | out: not a list |
| native-select.tsx | phone's own picker | LEFT (premise 4) |

## Mechanism
- **`src/components/shell/menu-row.ts`** gains three things beside ITEM_CORE:
  - `LIST_ROW`: `min-h-11` below md and on coarse pointers; `md:pointer-fine:min-h-10` (40 px); `rounded-[10px]` through a token; `px-3 text-sm`; D105 truncation.
  - `LIST_ROW_CURRENT`: the selected look, with a tick slot at the end.
  - `LIST_PANEL`: `bg-popover rounded-menu p-1.5 shadow-menu`, with no border ring and no zoom; a 120 ms fade plus a 2 px slide from the trigger's side.
  - It also gains `OPEN_CONTROL`: one class keyed to `data-[state=open]` / `aria-expanded=true`, which shows the open control's look.
- **dropdown-menu-impl.tsx** :49/:67/:85/:101/:124 reads these constants. Its defaults become `sideOffset = 0`, `align = "start"` and `min-w-(--radix-dropdown-menu-trigger-width)`. The facade and loader do not change (DEC-259). The trigger's open state applies through `OPEN_CONTROL` on each consumer's asChild trigger.
- **searchable-picker.tsx** reads LIST_ROW, LIST_ROW_CURRENT and LIST_PANEL. Its listbox is attached to the field's bottom edge with no gap.
- **popover.tsx** takes LIST_PANEL's surface classes and `sideOffset = 0`. Its padding stays because it is not a list.

## Guard — CF-LIST-1 (scripts/conformance/choice-lists.test.ts, wired in wired.test.ts)
- **What it enumerates:** every `DropdownMenuContent`, `PopoverContent`, `role="listbox"|"menu"|"option"` in src.
- **What fails:**
  - a content part or option that carries its own row classes (`py-`, `min-h-`, `h-`, `rounded-` on items) or its own panel classes (`border`, `shadow-`, `rounded-`, `p-`, `bg-`, `zoom-`);
  - a `sideOffset` greater than 0;
  - a listbox or option that does not read LIST_ROW or LIST_PANEL.
- **Allowlist:** `file | reason | until`; stale or expired lines fail. Expected lines: native-select (phone picker), location-selector's height cap.
- **Planted cases:** CL-1 (a planted option with `py-1.5` fails); CL-2 (a planted panel with `border shadow-lg` fails); CL-3 (`sideOffset={4}` fails); CL-4 (a clean consumer passes); CL-5 (a stale allowlist line fails).

## Tests
- **Unit:** the PickerOption classes come from LIST_ROW; dropdown-menu-impl's defaults.
- **e2e `e2e/choice-lists.spec.ts` (CL-E1…):** checked per consumer (language, account, panel switch, location, row actions, currency picker, phone code picker). Each runs at 360 coarse and 1440 fine, light and dark.
  - Row height: at least 44 px on coarse; exactly 40 px on fine.
  - Panel top edge equals the control's bottom edge, within 1 px (or the side it opens from).
  - Panel width is at least the control's width.
  - Computed transform has no scale during opening.
  - The control is in its open state while the list is open.
  - The panel's background, radius (14 px), padding (6 px) and shadow match the tokens.
- **G38, with old → new values** (exact names come from the build's grep for `py-1.5`, `rounded-md border`, `sideOffset`, `w-40` in e2e/ and src/**/*.test.*):
  - searchable-picker.test.tsx (row class `min-h-11 px-3` → LIST_ROW);
  - any language-switcher or account-menu spec that reads the panel width or offset;
  - SGB cases that open the location menu.
- **Runs:** touched specs run whole, both projects, retries 0, via `bun run e2e:local`.

## First-download effect
The facade's Radix code still loads on intent, so it adds nothing to first paint. The new constants (a few hundred bytes) move into the entry with menu-row.ts. They are expected inside the NEAR band for the entry and for the posting pages (searchable-picker). Any ceiling they cross is raised in DEC-296's form, with its cause, from CI's size.

## Turns
One turn, F. The posting lists come along because they share one picker. If the e2e matrix does not fit S500, F2 carries only the CL-E specs for the two posting pickers, after the mechanism and its guard have landed.

## Build rules
- **Report:** written before `bun run checks`. If time runs out, push with "checks: not finished — CI judges".
- **AGENTS.md:** untouched.
- **Register:** one row in docs/governance/mechanisms.md, plus one _changelog.md line.
- **Limits:** no migration, no new dependency, no new string.
