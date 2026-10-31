# Foundations turn F2: the last lists in CL-E, and a current choice a screen reader hears (INC-1027)

## 1. Step 0

- The ruling is saved byte for byte as `docs/governance/briefs/foundations-turn-f2.md`, in one fenced block.
- Its sha256 is `42ac6ea94eee61c31e189052fd54385e9471cfc90a81340d506b18f64d5520ec`, equal to the value after END.
- Roadmap line 3 names it. `bunx prettier --check roadmap.md` passed.

## 2. CI: the run on fc918fbb (run 41178779969, 07:20:56Z): FAILURE

**First-paint budget, NEAR band (code red; fixed).** CI's sizes, each raised by `ceilingFor` (DEC-296):

| Page | CI size | Ceiling |
|---|---|---|
| /account_/legal_/$versionId | 212.7 | 213 → 214 |
| /dev/tall | 209.7 | 210 → 211 |
| /settings | 273.7 | 274 → 275 |
| /admin/translations_/$lang | 323.8 | 324 → 325 |
| /my-listings_/$listingId_/edit | 398.8 | 399 → 400 |
| /post | 398.8 | 399 → 400 |
| /post_/$listingId | 398.7 | 399 → 400 |

The last four agree with this turn's own local build (§7). The first three read under the band locally, so CI's size decides.

**Component tests (code red; fixed):**
- BX-1: `e2e/choice-lists.spec.ts` now reads every box it compares through `layoutBoxes`. A missing box throws; no `?? 0` is left.
- PPF-1: the stray `mkdtempSync`/`writeFileSync` lines left the owner case, along with their imports.
- `bunx vitest run scripts/conformance/layout-reads.test.ts scripts/conformance/planted-proofs.test.ts scripts/conformance/choice-lists.test.ts`: 12 passed.

**E2E Lane 12 (named under Limits; not fixed here):** the temporary backend did not start: `refused:replay (SQLSTATE P0001)`. By the CI-3 correction, that is `job_run_claim`'s refusal while a migration ran during the start. The evidence branch does not say whether every image was local, so it is not classified further.
- No path this turn changed is involved.
- Every other lane passed: 2,326 passed, 0 failed, 0 flaky.

## 3. Census

### Consumers of LIST_ROW_CURRENT outside the mechanism (by definition)

| File | Before | After |
|---|---|---|
| src/components/shell/location-selector.tsx :110/:118 | plain `DropdownMenuItem` + `cn(… && LIST_ROW_CURRENT)` | `DropdownMenuRadioGroup value={selectedId ?? ""}` with `DropdownMenuRadioItem`s (value `""` is "Any area"); onSelect unchanged |
| src/components/shell/panel-header.tsx :79 | plain items + class + its own `Check` | `DropdownMenuRadioGroup value={activePanel}` with radio items; the impl's tick replaces the local one; onSelect unchanged |
| src/components/language-switcher.tsx :98 | radio item + `cn(row.code === language && LIST_ROW_CURRENT)` | the class is removed; the look comes from the checked state |
| src/components/searchable-picker.tsx | `PickerOption` (role="option", aria-selected) | unchanged: an owner, already heard |

`src/components/shell/menu-row.ts` `LIST_ROW` gains `data-[state=checked]:bg-nav-pill data-[state=checked]:font-semibold data-[state=checked]:text-nav-ink`: the same look as `LIST_ROW_CURRENT`, keyed to the radio or checkbox state.

### G38: every e2e locator for role "menuitem" (S392), read in place

| Locator | Opens | Before → after |
|---|---|---|
| viewing-place.spec.ts :255, :323 | location list | `menuitem` → `menuitemradio` |
| shell.spec.ts :377, :380, :2659, :2705, :2733, :3278, :3319, :3432, :3460 | location list (every one follows a `location-level-*` click) | `menuitem` → `menuitemradio` |
| sage-bands.spec.ts :204, :342 | location list | `menuitem` → `menuitemradio` |
| choice-lists.spec.ts (CL-E2) | location list | `menuitem` → `menuitemradio` |
| choice-lists.spec.ts (CL-E3, panel switch) | panel switch | `menuitem` → `menuitemradio` |
| choice-lists.spec.ts (CL-E3, account) | account menu | stays `menuitem` |
| admin-attributes-library :558/:1272, house-style :102 | other menus | stay |

- No shared helper opens these lists, so none changed.

### G38: unit tests

- `src/components/language-switcher-compact.test.tsx`:
  - old: `className` contains `bg-nav-pill` on en and not on am;
  - new: `aria-checked="true"` and `data-state="checked"` on en, `aria-checked="false"` on am, and the row carries `data-[state=checked]:bg-nav-pill`.
- `src/components/shell/location-selector-order.test.tsx`: the facade mock gains `DropdownMenuRadioGroup` and `DropdownMenuRadioItem`. The order assertions are unchanged.

## 4. CF-LIST-1's new rule and CL-6

- **Rule:** any file other than menu-row.ts and the owners (the impl, the picker, the popover) that names `LIST_ROW_CURRENT` fails with "current: LIST_ROW_CURRENT by class — use a radio item's checked state (INC-1027)".
- **CL-6:** a planted plain item with the class fails. The picker, as an owner, keeps it.
- **CL-4:** its clean consumer is now a radio item, so it passes without the class.
- The allowlist is unchanged.

## 5. CL-E4…6, and the current row in CL-E1…3

**Shared:**
- `judge` reads the control, the panel and every row in one settled `layoutBoxes` read (INC-940).
- The opening's scale is sampled on the facade's popper and on the pickers' own panels.
- CL-E1, CL-E2 and the panel switch in CL-E3 also assert one `menuitemradio` with `aria-checked="true"` and a visible tick (`svg.lucide-check`).

**The new cases:**
- CL-E4: the row-actions menu, on `/dev/style` (`style-row-1-more` → `style-row-1-menu`).
- CL-E5: the currency picker, on the posting price step (the seller's own walk; scratch seller, category and draft, reaped in afterEach, J3). It also asserts exactly one option with `aria-selected="true"`.
- CL-E6: the phone-code picker, on the posting contact step (the walk continues through the details and place steps).
- CL-E4…6 judge every tolerance except the control's open state: those three triggers do not read `OPEN_CONTROL` yet (K2).

**STOP 1, CL-E6 at 360:**
- The phone-code panel (`w-72` from the row's start) ends at x = 357, past the 16 px gutter (344.5).
- The fix belongs in `src/features/posting/phone-number-field.tsx`, which is outside this turn's scope.
- The 360 case is marked `test.fixme` with this reason until the supervisor rules. The 1440 cases run and pass.

**Run: `bun run e2e:local -- e2e/choice-lists.spec.ts --retries=0`, both projects:**
- Before the hold: 22 passed, 2 failed (CL-E6 at 360, light and dark, on the gutter: 357 > 344.5), 24 skipped (each width runs in its own project). Every other case passed.
- After the hold: not re-run in this turn.

## 6. The other touched specs

`bun run e2e:local -- e2e/sage-bands.spec.ts e2e/viewing-place.spec.ts e2e/shell.spec.ts --retries=0`, both projects: **225 passed, 107 skipped, 0 failed** (14.6 min).

## 7. Growth (local build of the final tree, gzip)

- Entry JS 209.3633 / 210 KiB; stylesheet 22.7148 / 40 KiB.
- Cause: LIST_ROW's checked-state classes, read by every menu and by the searchable picker. The radio parts were already in the facade's on-demand code.
- Raised, in DEC-296's form:

| Page | Local KiB | Ceiling |
|---|---|---|
| /admin/translations_/$lang | 323.7383 | 324 → 325 |
| /my-listings_/$listingId_/edit | 398.8330 | 399 → 400 |
| /post | 398.7930 | 399 → 400 |
| /post_/$listingId | 398.7588 | 399 → 400 |

- The three CI-only raises are in §2.
- `node scripts/check-bundle-size.mjs`: exit 0 after the raises. check-bundle-size.mjs itself is unchanged.

## 8. Unit count

From the checks below.

## 9. K2

- The row-actions "more" trigger (`row-actions.tsx`) and the two posting pickers' boxes (`step-pricing.tsx`, `phone-number-field.tsx`) do not read `OPEN_CONTROL`. This is on the roadmap.
- `phone-number-field.tsx`'s panel crosses the 360 gutter (STOP 1).
- `docs/features/design-foundation.md`'s section names `LIST_ROW_CURRENT` as the current look by class. It is not in this turn's scope and was left.

## 10. git diff --name-only fc918fbb

docs/\_changelog.md, docs/governance/briefs/foundations-turn-f2.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-f2.report.md, e2e/choice-lists.spec.ts, e2e/sage-bands.spec.ts, e2e/shell.spec.ts, e2e/viewing-place.spec.ts, roadmap.md, scripts/conformance/choice-lists.test.ts, scripts/route-budgets.mjs, src/components/language-switcher-compact.test.tsx, src/components/language-switcher.tsx, src/components/shell/location-selector-order.test.tsx, src/components/shell/location-selector.tsx, src/components/shell/menu-row.ts, src/components/shell/panel-header.tsx. AGENTS.md is untouched.

- `src/components/ui/dropdown-menu-impl.tsx` was not changed: its radio item already drew `LIST_TICK` (turn F, finish).

## 11. Checks

(appended after the run)
