# Report — turn SAGE-S1 (redesign Part 2: the shell in the Sage look), with its continuation S1-2

## 1. CI

- Last completed run: 41125880091 on `4ec6935c`, FAILURE. The S1-2 ruling expected this red: S1's unchecked edits had landed. Failing jobs: first-paint budget, build/lint, component tests, and E2E lanes 3, 7, 8, 11, 13, 15, smoke and staging. These are the faults fixed below (the budget, the selector guard, CMR-3/BX-1/RFT-2, SGS shadows, RM-4, TB-1, the menu-in-place test, the touch targets, B21SC-1). I did not read the lanes' failure bodies on the evidence branch, so CI on this push is the judge.
- INC-1021 (run 41121234139 on `2a953151`): the only failing job was the first-paint budget, 208.0 / 208 KiB. It is answered in §7.

## 2. Rulings saved

- `docs/governance/briefs/foundations-turn-sage-s1.md`: sha256 `2b6ceec476a31f845f3f008b7b66d3a8c33ccf0679077e30aee829d47de8fba4`, which matches.
- `docs/governance/briefs/foundations-turn-sage-s1-2.md`: sha256 `d2817f2b5d35428f68a56e22e64f8aa71fec212617ffe1dfd309f83b4fd87393`, which matches.
- Roadmap line 3 names both files, and prettier passes on it.

## 3. What was built

- **Tokens:** five new tokens in `:root`, `.dark`, `@theme inline`, `THEMES` and `MODED_TOKENS`:
  - `--nav-ink`: #17503A / #7FC9A6
  - `--logo-gold`: #E0B05A / #E0A94A
  - `--nav-pill`: #E3F1EA / #1C2B24
  - `--lift-pill`
  - `--lift-disc`, whose 4 px ring is `var(--card)`. The theme shape now accepts a `var(--token)` as a shadow colour.
- **Layout token:** `--bar-rise` (14 px; 0 from 48rem). It is layout, so it stays out of the theme (themes.test `NOT_THEME`).
- **Ruling A:** the light `--background` is #EEF3EF. The photo backdrop stays #F3F5F8.
  - PBG-1 (G38) old: "the backdrop is the stylesheet's `--background`". New: "#F3F5F8 under D155, and the Sage page tone #EEF3EF is a different value".
  - The comment in `photo-background.ts` is corrected (S1-2 ruling 5). The allowlist line's reason is updated.
- **One tile (`ITEM_TILE` / `ITEM_TILE_ON`, menu-row.ts):** used by the rail, the strip, the phone menu, the side panels, D259 Home, D255 back and sign-out. CF-ROWS-1 refuses a menu without it, shown by a planted bypass. The selected row takes card, `--lift-row-on` and `--nav-ink`.
- **The chosen filter pill** takes `shadow-tile-on` (P-S5).
- **The phone menu's end corner** is `rounded-e-bar` (P-S6).
- **The top bar:** one `CONTROL_LOOK` for language, theme, account and search. The search field is the pill. Sign in takes `shadow-button`.
- **The logo:** filled diamond with a `--logo-gold` centre.
- **The footer:** the sidebar surface, `shadow-footer` and the groove.
- **The bottom bar:** 18 px top corners, the current pill, and the 40 px disc raised by `--bar-rise`.
- **Ruling C:** the pre-Sage palette section of `design-foundation.md` is marked superseded.
- **Docs:** a new section, "The shell in the Sage look". Register row 81 is extended and one changelog line is added.

## 4. Contrast (WCAG, computed from the hex values)

| Pair                                      | Ratio  |
| ----------------------------------------- | ------ |
| `--nav-ink` on `--card`, light (#17503A / #FFFFFF) | 9.35:1 |
| `--nav-ink` on `--nav-pill`, light (#17503A / #E3F1EA) | 8.03:1 |
| `--nav-ink` on `--card`, dark (#7FC9A6 / #1A221E) | 8.37:1 |
| `--nav-ink` on `--nav-pill`, dark (#7FC9A6 / #1C2B24) | 7.61:1 |

All four pairs are in `styles.tokens.test.ts`, per theme and mode (≥ 4.5).

## 5. The Post disc (R6) — census and proof

Measured at 390 px: 40 px wide, raised 14 px above the bar's top edge. At the end of the page nothing sits under it.

| Pinned surface | Before | Now |
| --- | --- | --- |
| `form-section.tsx` :95, the phone action bar | `sticky bottom-[var(--bottom-bar)]`, `py-3` | `pb` is 0.75rem + `--bar-rise`; its surface still meets the bar |
| `form-layout.tsx` :23, the action bar | `pb-2` | `pb` is 0.5rem + `--bar-rise` |
| `page-header.tsx` :33, the phone actions | `pb` max(0.5rem, safe area) | `pb` max(0.5rem + `--bar-rise`, safe area) |
| `app-shell.tsx` :918 / :939, fixed notices | bar + 0.5rem (the disc overlapped them by 6 px) | bar + `--bar-rise` + 0.5rem |
| `on-demand-notice.tsx` :67 | `bottom-16` (64 px < 74 px) | bar + `--bar-rise` + 0.5rem (`md:bottom-6` unchanged) |
| `app-shell.tsx` :961, the page's bottom padding | bar | bar + `--bar-rise` |
| `styles.css` `html` | — | `scroll-padding-bottom` is bar + `--bar-rise` (WCAG 2.2 SC 2.4.11) |
| `app-rail.tsx`, phone strip (z 38), menu (z 40), scrim (z 35) | — | above the bar (z 30) in z-order: they cover the disc, nothing sits under it |
| `drawer.tsx`, `toolbar-panel.tsx` | — | z 50 sheets over the bar: they cover the disc |
| `action-message.tsx` :60 | — | scroll margin is bar + 1rem (16 ≥ 14 px): clear; unchanged |

SGS-7 checks this at 390 px, light and dark, on `/` and on `/dev/primitives` (where FormSection's action bar is stuck). It asserts that the action bar meets the bottom bar, and that no control inside a fixed or sticky surface intersects the disc's box.

## 6. Tests

**The shadow probe (S1-2 ruling 2):** the probe removes exactly the leading `rgba(0, 0, 0, 0) 0px 0px 0px 0px` layers Tailwind adds, and nothing else. It applies to every shadow read in the spec, the language control's included.

**The five existing tests, each with its cause and fix:**
- **RM-4.** Cause: the spec moved the icon into its tile and set its sizes (§2/§3). Fix, under G38:
  - selector old `li > a > svg:first-child`, new the tile's svg;
  - sizes old 20 px rail / 24 px phone, new 16 px / 15 px.
- **TB-1.** Cause: the 30 px tile started at the row's padding, so its centre sat 5 px right of the old 20 px icon column. In the folded rail it was 2.5 px off. Fix in code: the tile starts 1.25 rem before the padding (`-ms-1.25`), and sits on the padding in the folded rail (`rail-icons:in-[[data-testid=app-rail]]:ms-0`). The expectation is unchanged.
- **"The menu opens in place" and B21SC-1.** Cause: with the icon inside its tile, `svg:nth-of-type(1)` matched both the tile's icon and the branch chevron. Fix: the locator names the tile's icon (`:scope > span:first-child > svg`). The geometry assertions are unchanged.
- **Touch targets at least 44 px.** Cause: `CONTROL_LOOK` used `pointer-fine:min-h-9`, so the language control drew 36 px on a phone. Fix in code: `md:pointer-fine:min-h-9`, so phones keep 44 px. The test is unchanged.

**Other G38 changes:**
- LB-1: the corner, 16 → 18 px.
- SMN-E7: `rounded-md` → `rounded-row`, and `hover:bg-sidebar-accent/60` → `hover:bg-card/70`.
- RFT-2: old "the pending box is the glyph's size, h-5 w-5". New "the pending box is the tile, and the settled glyph draws inside the same tile".

**Guards:**
- `sage-shell.spec.ts` joins the shell area in `scripts/e2e-select.ts`.
- It reads menu rows through `ANY_MENU_ROW` (CMR-3) and boxes through `layoutBoxes` (BX-1).

**Browser runs (whole files, both projects, retries 0):**

| Files | Passed | Skipped | Failed |
| --- | --- | --- | --- |
| `sage-shell` + `submenu-look` | 40 | 52 | 0 |
| `shell` | 165 | 69 | 0 |

No shared helper was changed, so there was no by-ID run.

## 7. Growth and ceilings (DEC-296, DEC-305)

- **Entry:** 207.9 KiB (S0, local) → 208.2 KiB local (+0.3, the Sage shell classes). The ceiling goes 208 → 209 = floor(CI's 208.0 + 0.3 + 0.3) + 1.
- **NEAR pages:** 17 pages grew +0.2 to +0.3 KiB each, from the same shell classes. Each was raised +1 with that cause in `route-budgets.mjs`: /account, /account\_/legal, /admin/attributes, /admin/audit, /admin/images, /admin/legal\_/$versionId, /admin/locations, /admin/translations, /admin/users\_/$userId, /auth, /dev/style, /l/$slug, /legal/$kind, /legal/accept, /my-listings\_/$listingId, /privacy, /terms. No page grew by more than 1 KiB.
- **Stylesheet:** 21.8 → 22.3 KiB of 40 (+0.5 KiB: the tile, control, pill and disc utilities, plus `--bar-rise`).

## 8. Checks

- Unit: 2,348 / 2,348.
- The last full run: `checks: 34 PASS · 0 FAIL · 21 NOT RUN · 1377s`.
- The 21 NOT RUN steps, with the script's reasons:
  - the installs: the sandbox's dependencies are already installed;
  - the dependency audit: the advisory service is unreachable from the sandbox;
  - the staging preflight: it needs staging credentials the script never holds;
  - the E2E merge: GitHub artifacts;
  - the SARIF upload: GitHub only;
  - promote: only CI promotes.
- Earlier full runs this turn failed. Each failure was fixed, and the run above is whole.

## 9. K2

- The brand green repeated in `brand-mark.ts` and `server/ai/tasks.ts` is the supervisor's records turn (ruling C).
- `action-message.tsx` :60 clears the bar by its own 1rem, not by `--bar-rise`. It is clear today; reported, not touched.

## 10. Limits

- Other specs that draw the pinned action bars (admin forms, settings) were not run here. The padding grew by `--bar-rise`, below md only. CI judges them.
- Files changed beyond the first scope:
  - by S1-2: the pinned surfaces and the comment in `photo-background.ts`;
  - by guards on the new spec: `scripts/e2e-select.ts` and `rail-first-paint.test.tsx` (G38).

## 11. Files: `git diff --name-only b1bbeebe`

docs/\_changelog.md, docs/features/design-foundation.md, docs/governance/briefs/foundations-turn-sage-s1-2.md, docs/governance/briefs/foundations-turn-sage-s1.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-sage-s1.report.md, e2e/sage-shell.spec.ts, e2e/shell.spec.ts, e2e/submenu-look.spec.ts, roadmap.md, scripts/check-bundle-size.mjs, scripts/conformance/look-values-allowlist.txt, scripts/conformance/menu-rows.test.ts, scripts/e2e-select.ts, scripts/route-budgets.mjs, src/components/app-shell.tsx, src/components/brand/logo.tsx, src/components/language-switcher.tsx, src/components/layout/form-layout.tsx, src/components/layout/page-header.tsx, src/components/shell/app-footer.tsx, src/components/shell/app-header.tsx, src/components/shell/app-rail.tsx, src/components/shell/bottom-bar.tsx, src/components/shell/filter-choices.tsx, src/components/shell/form-section.tsx, src/components/shell/menu-row.ts, src/components/shell/on-demand-notice.tsx, src/components/shell/rail-first-paint.test.tsx, src/components/shell/theme-toggle.tsx, src/components/ui/submenu-impl.tsx, src/features/posting/photo-background.test.ts, src/features/posting/photo-background.ts, src/lib/schemas/theme.ts, src/lib/themes.test.ts, src/lib/themes.ts, src/styles.css, src/styles.tokens.test.ts

## 12. Next

S2: the band rows and the location track (D260), in its own turn.
