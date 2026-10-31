# Foundations turn F — every list of choices that opens from a control (D264, Sage §14)

## 1. Step 0

- Turn F: `docs/governance/briefs/foundations-turn-f.md`, sha256 `59a77273933be5b685a688aba42be5e7d48fd129a0c09b32a51840889e7e040f`, equal to the value after END.
- Turn F, finish: `docs/governance/briefs/foundations-turn-f-finish.md`, sha256 `a8f75576f965c6073b4b82bc561828c196db7e0f39cb015762a6ea667ddc70b4`, equal to the value after END (computed on the fenced text as saved).
- Roadmap line 3 names both briefs; `bunx prettier --check roadmap.md` passed.

## 2. CI

- d48a3cb3: SUCCESS (run 41172524158).
- The last completed run on the evidence branch is b3681f69: SUCCESS (run 41173416396, 06:08:23Z). The run on 603e3d18 had not completed when read, so its lint red (the four e2e/choice-lists.spec.ts errors, a code red, not infrastructure) is classified from the ruling and the local lint; it is fixed below (F-1). No other red was seen.

## 2a. The finish (ruling of 06:22 UTC)

- F-1a: `:60 waitForTimeout(450)` → `expect.poll` until every animation on the panel reads `playState === "finished"`, then the sampled transforms are read (J7).
- F-1b: `:133`, `:150`, `:156` `:visible` + `.first()` → `getByTestId` on the one control the header or rail draws (the language switcher and the account menu are single elements at every width; the panel switch is the rail's).
- F-1c: CL-E3 no longer passes on an absent control. The account menu sits in the header at every width (app-header.tsx, `data-testid="account-menu"`); it is asserted visible and judged at 360 and 1440. The panel switch is judged from md (`isMobile`, the shared viewport helper); below md the bottom bar replaces it.
- F-2: the radio item draws `<Check className={LIST_TICK} />` in place of the `Circle` dot; `Circle` left the import. CL-U6 proves both indicator parts draw the tick and no `Circle` remains.
- Lint on the two files: 0 errors. CL-E1…3, both projects, retries 0: **12 passed, 12 skipped** (each width runs in its own project). Unit: choice-list-look and CF-LIST-1, 13 passed.

## 3. Census as built

| Consumer | Before | After |
|---|---|---|
| dropdown-menu-impl.tsx (the owner) | `rounded-md border bg-popover p-1 shadow-md`, zoom-in-95, `sideOffset = 4`; rows `rounded-sm px-2 py-1.5` | Content and sub-content read `LIST_PANEL`. Defaults: `sideOffset = 0`, `align = "start"`, `collisionPadding = 16`, `min-w-[var(--radix-dropdown-menu-trigger-width)]`. The item, sub-trigger, checkbox and radio rows read `LIST_ROW`. The indicator sits at the end, in `LIST_TICK` |
| language-switcher.tsx :74 | `w-40 p-1`; rows `py-0.5 pe-1 ps-2 leading-none`, current row `bg-accent` | No panel override. The current row reads `LIST_ROW_CURRENT`. The trigger reads `OPEN_CONTROL` |
| app-header.tsx :242 (account) | facade, no override | Unchanged panel. The trigger reads `OPEN_CONTROL` |
| panel-header.tsx :69 | `w-56`; rows `min-h-11 gap-2`; own tick | The width comes from the trigger (CL-E3 found `min-w-56` narrower than the 240 px control and it was removed). The current row reads `LIST_ROW_CURRENT`, the tick `LIST_TICK`, the trigger `OPEN_CONTROL` |
| location-selector.tsx :106 | `max-h-72 overflow-y-auto`; no current mark | The height cap stays (allowlist, permanent). The current option reads `LIST_ROW_CURRENT`. The trigger reads `OPEN_CONTROL` |
| row-actions.tsx :70/:124 | rows `min-h-11` | The row height is removed and comes from `LIST_ROW` |
| dev.style.tsx :272 | facade | Unchanged; it uses the mechanism |
| popover.tsx (the owner, surface only) | `rounded-md border p-4 shadow-md`, zoom, `sideOffset = 4` | `LIST_SURFACE` and `LIST_MOTION`, `p-4` kept, `sideOffset = 0` |
| toolbar-panel.tsx :108 | `p-0` on the popover | Unchanged (allowlist: not a list, until SAGE-S6) |
| searchable-picker.tsx (the owner) | `PickerOption` with `min-h-11 px-3`, `bg-accent`, tick `text-primary`; pop with `mt-1`/`mb-1` | `PickerOption` reads `LIST_ROW` plus `LIST_ROW_CURRENT` or `LIST_ROW_HIGHLIGHT`, and `LIST_TICK`. `pickerPopClass` sits against the box's edge (no gap) on `LIST_SURFACE` |
| step-pricing.tsx :525 | `rounded-md border border-border bg-background shadow-md` | Only the picker's pop class plus `max-h-64 w-full overflow-y-auto` |
| phone-number-field.tsx :276/:290 | `rounded-md border border-border bg-background shadow-md`; search `rounded-t-md bg-background` | The picker's pop class plus `start-0 w-72 max-w-[calc(100vw-2rem)]`. The search reads `rounded-list-row bg-popover mb-1` |
| native `<select>` (22 files) | the device's list | LEFT: one allowlist line per file, until SAGE-S6 |

## 4. Constants and tokens

- `LIST_ROW`: `min-h-11 md:pointer-fine:min-h-10 md:pointer-fine:h-10 rounded-list-row px-3 text-sm whitespace-nowrap [&>span]:truncate`. Keyboard focus and highlight take `bg-nav-pill text-nav-ink`. The ring stays visible with `focus-visible:ring-2`.
- `LIST_ROW_CURRENT`: `bg-nav-pill font-semibold text-nav-ink`.
- `LIST_TICK`: `text-nav-ink`.
- `LIST_SURFACE`: `bg-popover rounded-menu p-1.5 shadow-menu`.
- `LIST_MOTION`: a fade plus a 2 px slide from the trigger's side. No zoom.
- `LIST_PANEL`: `LIST_SURFACE`, `LIST_MOTION` and `max-w-[calc(100vw-2rem)]`.
- `OPEN_CONTROL`: the `data-[state=open]` and `aria-expanded` nav pill and nav ink.
- `--radius-menu` = 0.875rem (14 px). `--radius-list-row` = 0.625rem (10 px).
- `--lift-menu`, mapped through `--shadow-menu`:
  - light: `0 0 0 1px oklch(0.915 0.014 155.6)` (#DCE6DF), `0 4px 12px oklch(0.337 0.055 163.4 / 0.12)`, `0 16px 32px -12px oklch(0.337 0.055 163.4 / 0.2)`;
  - dark: `0 0 0 1px oklch(0.339 0.02 159.5)` (#2F3B34), `0 4px 12px oklch(0 0 0 / 0.4)`, `0 16px 32px -12px oklch(0 0 0 / 0.55)`.
  - The ring colours are written in oklch, because src/styles.tokens.test.ts refuses hex.
  - `lift-menu` is added to `THEMES` (src/lib/themes.ts) and to the theme schema's key list (src/lib/schemas/theme.ts), so TH-2 (data equals the stylesheet) holds. These two files are the tokens' data mirror. They are not named one by one in SCOPE; this is noted as a departure for the supervisor's ruling.

## 5. CF-LIST-1

- **File:** `scripts/conformance/choice-lists.test.ts`.
- **Domain:** every DropdownMenuContent, DropdownMenuSubContent, DropdownMenuItem, RadioItem, CheckboxItem and SubTrigger; every PopoverContent; every element with `role="listbox"`, `"menu"` or `"option"`; every `<select>` in src (tsx, not tests).
- **It refuses:**
  - a row with its own row classes;
  - a panel with its own panel classes;
  - a facade panel with its own `max-h-*`;
  - a sideOffset above 0;
  - an option not reading `LIST_ROW`;
  - an owner (impl, picker, popover) not reading the constants.
- **Allowlist:** `choice-lists-allowlist.txt`, 23 lines in the form `file#part | reason | until`:
  - 21 native-select files, until "SAGE-S6 overlays turn";
  - the location list's height cap, `permanent:` with its reason;
  - toolbar-panel's `p-0`, until SAGE-S6.
  - Its own parser accepts a date (an expired date fails), INC/DEC, SAGE-Sn, or `permanent` (the reason must start "permanent:"). A stale line fails.
- **Planted cases:**
  - CL-1: an option with `py-1.5` fails;
  - CL-2: a panel with `border shadow-lg` fails;
  - CL-3: `sideOffset={4}` fails;
  - CL-4: a clean consumer passes;
  - CL-5: a stale line, an expired line and a reasonless permanent line each fail;
  - plus an owner case.
- **Wiring:** the census is a `.test.ts` file, so the unit suite runs it. wired.test.ts's domain excludes test files, so wired.test.ts is unchanged.

## 6. Tests

- **Unit, `src/components/ui/choice-list-look.test.tsx`:**
  - CL-U1 (row);
  - CL-U2 (selected look);
  - CL-U3 (surface, no border or zoom);
  - CL-U4 (impl defaults and its classes, read from source, because DEC-259 lets only overlays-impl import the impl by value);
  - CL-U5 (the picker's rows and pop class).
- **e2e, `e2e/choice-lists.spec.ts`**, at 360 (mobile-360) and 1440 (desktop-1280), light and dark:
  - CL-E1: the language list;
  - CL-E2: the location list;
  - CL-E3: the account list and the panel switch.
- **What each CL-E case judges:**
  - no scale at any frame sampled over 400 ms;
  - the control's `data-state=open` and nav-pill background;
  - the edge gap is at most 1 px;
  - the width is at least the control's minus 0.5;
  - the panel stays inside the 16 px gutters;
  - radius 14 px, padding 6 px, border 0, the shadow equal to `--lift-menu`, the background equal to `--popover`;
  - rows at least 44 px below md, and 40 ± 0.5 px on a fine pointer.
- **Runs:** `bun run e2e:local -- e2e/choice-lists.spec.ts --retries=0` on both projects: **12 passed, 12 skipped** (each width skips the other project).
  - The local Playwright browser path had to be given (`E2E_CHROMIUM_PATH`, the sandbox's chromium-1194).
  - The first runs failed on the spec's own shadow probe and on panel-header's `min-w-56`. Both were fixed at their root.

## 7. G38

- `src/components/language-switcher-compact.test.tsx`:
  - row: `toContain("py-0.5")` and `toContain("leading-none")` → `toContain("min-h-11")`, `toContain("md:pointer-fine:h-10")`, `toContain("whitespace-nowrap")`, `not.toContain("py-0.5")`;
  - current row: `bg-accent` → `bg-nav-pill`.
- The grep for `py-1.5`, `rounded-md border`, `sideOffset`, `w-40` and `w-56` in e2e/ and the unit tests found no other assertion. data-table.test's `min-w-40` is a column width, not a list.

## 8. Growth (local build of the final tree, gzip)

- Entry JS 209.3604 / 210 KiB; stylesheet 22.6846 / 40 KiB: both outside the NEAR band.
- Cause, on every page: the list constants in menu-row.ts (already in the shell), `OPEN_CONTROL` on the header and rail triggers, and the new utilities (`rounded-menu`, `rounded-list-row`, `shadow-menu`, the nav-pill states) in the stylesheet. The facade's code still loads on intent; nothing new downloads on first paint.
- The base was not rebuilt locally, so the per-page delta is not measured; the sizes below are this tree's own.
- Ceilings raised in DEC-296's form (`ceilingForLocal(size)`), each line in scripts/route-budgets.mjs naming turn F and its cause:

| Page | Local KiB | Ceiling |
|---|---|---|
| /account_/legal | 211.9619 | 212 → 213 |
| /admin/ai | 337.7002 | 338 → 339 |
| /admin/audit | 310.7998 | 311 → 312 |
| /admin/images | 210.9580 | 211 → 212 |
| /admin/legal_/$versionId | 279.8516 | 280 → 281 |
| /admin/locations | 271.9395 | 272 → 273 |
| /admin/translations | 414.8350 | 415 → 416 |
| /admin/users_/$userId | 287.8457 | 288 → 289 |
| /auth | 222.0078 (over) | 222 → 223 |
| /legal/accept | 220.9307 | 221 → 222 |
| /legal/publishing | 214.7793 | 215 → 216 |
| /my-listings_/$listingId | 319.8408 | 320 → 321 |

- `node scripts/check-bundle-size.mjs` after the raise: exit 0. check-bundle-size.mjs itself is unchanged.

## 9. Unit count

From the checks below.

## 10. K2

- F2 (roadmap line 8): the location list and the panel switch mark their current row by look only; their rows become radio items (menuitemradio, aria-checked) after F2's census of e2e/ for role "menuitem" on those two lists (S392).

- 21 files draw a raw `<select>` instead of `src/components/ui/native-select.tsx`. They are LEFT under the allowlist, until SAGE-S6.
- The checkbox and radio rows of other dropdowns now share `LIST_ROW`. No other bypass was found.
- **Not judged:**
  - a coarse pointer at 1440 (Playwright's projects are fine-pointer; the 360 width is judged by the below-md rule);
  - the row-actions menu and the two posting pickers in the browser (F2, ruling 6).

## 10a. Departure

- `scripts/e2e-select.ts` (not named in SCOPE): the checks' e2e selector self-test failed with "spec not reachable from any area: e2e/choice-lists.spec.ts". Fixed at its root: the spec joins the shell area's list, as sage-bands.spec.ts does.

## 11. git diff --name-only b3681f69

docs/\_changelog.md, docs/features/design-foundation.md, docs/governance/briefs/foundations-turn-f-finish.md, docs/governance/briefs/foundations-turn-f.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-f.report.md, e2e/choice-lists.spec.ts, roadmap.md, scripts/conformance/choice-lists-allowlist.txt, scripts/conformance/choice-lists.test.ts, scripts/route-budgets.mjs, src/components/language-switcher-compact.test.tsx, src/components/language-switcher.tsx, src/components/searchable-picker.tsx, src/components/shell/app-header.tsx, src/components/shell/location-selector.tsx, src/components/shell/menu-row.ts, src/components/shell/panel-header.tsx, src/components/shell/row-actions.tsx, src/components/ui/choice-list-look.test.tsx, src/components/ui/dropdown-menu-impl.tsx, src/components/ui/popover.tsx, src/features/posting/phone-number-field.tsx, src/features/posting/step-pricing.tsx, src/lib/schemas/theme.ts, src/lib/themes.ts, src/styles.css, scripts/e2e-select.ts (28 files; AGENTS.md untouched)

## 12. Checks

(appended below after the run)
