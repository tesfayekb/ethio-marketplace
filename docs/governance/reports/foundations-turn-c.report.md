# Turn C report — C1 (the raised press look, D263/D270, DEC-317)

## 1. Step 0
The brief is saved in docs/governance/briefs/foundations-turn-c.md. The fenced block's sha256 is aac51f30a81eedd7a59ac6159bd6bafe350873a27a516e438acaf9a9fdca3154, which matches the value after END. Roadmap line 3 names the brief, and prettier --check passes on roadmap.md. AGENTS.md is untouched.

## 2. CI
- At the start, the evidence still named 9155df66 (run 41202111497): FAILURE, with the first-paint budget as the only red.
- Before the push, the evidence named 57c72d3c (B2; run 41206745977, 14:00Z): FAILURE. Each red was fixed from its failure body:
  - **format:check.** src/styles.css and e2e/sage-cards.spec.ts were not formatted, and both are now. Prettier had split dark `--card: oklch(…)` across lines, because its trailing comment made the line too long. That also broke TH-2, so the comment now sits on the line above.
  - **Component tests: TI-1.** B2's SC-1/SC-2 and OL-1/OL-2 clashed with older IDs. They are renamed SCS-1/SCS-2 and OLH-1/OLH-2.
  - **Component tests: styles.tokens.** Dark destructive on card C measured 4.48 : 1. Its lightness moves from 0.704 to 0.715, giving 4.58 : 1; styles.css .dark and themes.ts are changed together.
  - **E2E lanes 4 and 12 (HS-2 axe color-contrast on /dev/style dark).** The cause is the same token on card C. The fix is the destructive change above. HS-2 was not re-run locally; CI judges it.
  - **First-paint budget.** `/` and `/c/$slug` measured 223.9 / 224 KiB. Both ceilings go from 224 to 225 (DEC-296).

## 3. Mechanisms as built
- **src/lib/press.ts (`installPress`).** One delegated listener on the document, mounted once in src/routes/__root.tsx. It marks `data-pressed` on pointerdown (primary button), or on Enter/Space keydown.
  - It clears the mark on pointerup, pointercancel, keyup, a scroll, dragstart and window blur. A pointer move past PRESS_SLOP (10 px) also clears it.
  - Focus leaving the pressed element clears it. Focus leaving another element does not: the press itself moves focus off the previously focused element.
  - It never marks an element that is `disabled`, or that has `aria-disabled="true"` or `data-disabled` on it or above it.
  - **Departure:** it marks the nearest `PRESSABLE`, not only `[data-pressable]`. PRESSABLE is `[data-pressable]` plus links, buttons, summary, and the tab, option, menuitem*, button and link roles. The row looks are class constants that screens spread onto their own elements, so a pure attribute opt-in would mean every screen writing `data-pressable`, which the ruling forbids. Only the primitives draw a look for the mark.
- **PRESSED in menu-row.ts.** Each primitive takes its raised state from an existing token:
  - Menu row (ITEM_CORE): `bg-card` with `shadow-row-on` (`--lift-row-on`) and `text-nav-ink`, the same as ITEM_ACTIVE.
  - List row (LIST_ROW, sidebar.tsx's two buttons): `bg-nav-pill` with `text-nav-ink`, the same as LIST_ROW_CURRENT. sidebar.tsx's `active:` classes are gone.
  - Tab (tabs.tsx, with `data-pressable`) and band segment or crumb (BAND_SEGMENT, which reaches every crumb and the panel tabs): `bg-card` with `shadow-segment` (`--lift-segment`) and `text-nav-ink`, the same as BAND_SEGMENT_CURRENT. panel-tabs' own `transition-colors` was dropped, because it overrode the press timing.
  - Button and IconButton (button.tsx base, with `data-pressable`) and the top bar's controls (app-header CONTROL_LOOK): `shadow-row-on`, one step above `--lift-button` / `--lift-control`. The fill and ink stay.
  - Card: the card's surface takes `has-[[data-pressed]]:shadow-row-on`. The card link (`data-pressable`) takes no fill.
  - Plain link: the styles.css base-layer rule `a[data-pressed]` gives it the nav pill and nav ink behind its text, on `--radius-row`. Any primitive's own look wins over it.
- **Timing.** PRESS_MOTION transitions background, box-shadow and colour over 120 ms out, and 0 ms on the way in (`data-[pressed]:duration-0`). Under reduced motion, a base-layer rule sets every pressable's transition-duration to 0s, so hover fades go too. Nothing changes size or position.

## 4. CF-PRESS-1 (scripts/conformance/press.test.ts), rules 1–2; the allowlist starts empty
- Rule 1: each primitive (menu-row.ts, band-row.ts, button.tsx, tabs.tsx, listing-card.tsx, sidebar.tsx, app-header.tsx) carries its PRESSED look, plus `data-pressable` where named.
- Rule 2: no `active:` class, and no `data-[pressed]` / `[data-pressed]` look or mark, outside menu-row.ts, press.ts and styles.css.
- Planted cases, all of which fail as they should:
  - PRP-1: a Button without PRESSED.button.
  - PRP-2: a screen's `active:bg-muted`.
  - PRP-3: a screen's `data-[pressed]:bg-card`.
- These were renamed from PR-1…3 because those IDs clash with e2e/posting-routes (TI-1).
- Rules 3 and 4 come in C2.

## 5. Tests
- **Unit, src/lib/press.test.ts: 7 passed.**
  - PR-U1: pointerdown marks, pointerup clears.
  - PR-U2: Enter and Space.
  - PR-U3: cancel, scroll and focusout.
  - PR-U3b: focus leaving another element keeps the press.
  - PR-U4: one mark at a time; plain text gets none.
  - PR-U5: a move past the slop clears.
  - PR-U6: disabled and aria-disabled elements are never marked.
- **Laws step (`vitest run scripts`).** The first run had 2 failed and 390 passed: TI-1, the clashes above, and BX-1, where press.spec read its own box. Both were fixed (renames; `layoutBoxes`). The re-run of those files passed (13 tests). The colour tests passed (70).
- **Browser:** `bun run e2e:local -- e2e/press.spec.ts e2e/sage-cards.spec.ts`, both projects, retries 0: **20 passed, 0 failed, 16 skipped** (final tree).
  - PSP-1 (renamed from PS-1, a TI-1 clash with post-wizard-bundle2) ran at 360 coarse and 1440 fine, light and dark. A menu row, a band segment (the breadcrumb), a button (the theme control), a plain link (the footer), a card and a list row (a language option) are each marked at pointerdown and raised in the first frame. No box moves, and the pressed ink is at least 4.5 : 1 on its fill.
  - PS-4 (reduced motion): transition 0s, gone in the next frame.
  - OLH-1 now reads the public languages from the switcher (G0.6).
- **Not exercised in the browser:** the tab, because the panel tabs need a staff session with two panels. The Tabs primitive is covered by CF-PRESS-1 rule 1 only.

## 6. G38
No e2e spec reads `:active` or `data-pressed`. Specs that read transitions: submenu.spec.ts :97/:123 reads the panel's duration under reduced motion, and the new 0s rule can only make it shorter. post-wizard-specs :781 sets the motion mode. Neither spec was changed or re-run; CI judges them. INC-581's frame specs are untouched. aria-current timing is C2's.

## 7. Growth
- Entry (every page): 210.2 KiB measured locally, which crossed its 210 KiB ceiling (scripts/check-bundle-size.mjs). The cause is press.ts plus the PRESSED classes in the root. The ceiling moves 210 → 211 = floor(210.2 + 0.3) + 1 (DEC-296).
- Page budgets: no page is over or inside the NEAR band ("0 NEAR, none grew"). `/` and `/c/$slug` sit at 225, raised for B2's CI 223.9.
- The local check printed no per-page delta against 57c72d3c, so per-page growth is not stated. CI's budget lane gives the figures.

## 8. Unit count
Component tests: 2,464 passed (2,464).

## 9. Checks
`bun run checks`, run whole once on the final tree:
- Fast line: `checks (fast): 28 PASS · 0 FAIL · 1650s`.
- Last line: `checks: 36 PASS · 1 FAIL · 21 NOT RUN · 2101s`. The one FAIL was the first-paint entry budget (210.2 / 210 KiB). It was fixed at its root (§7), and `node scripts/check-bundle-size.mjs` then read `JS: 210.2 KiB / 211 KiB — ok`.
- The whole run was not repeated after that fix.
- The 21 NOT RUN steps are the sandbox's usual ones: installs, the dependency audit, the staging preflight, the e2e merge, promote, and the SARIF upload.

## 10. K2
- theme-toggle.tsx carries its own idle classes, and app-header passes ICON_BUTTON to it, so it is raised through CONTROL_LOOK.
- The language switcher's trigger opens its list on pointerdown, so its press gives way at once to OPEN_CONTROL's open look.
- The bottom bar's items and the hand-built header buttons outside CONTROL_LOOK get only the plain-link pill or no look. They come in C2 (the D271 census).

## 11. Files (git diff --name-only 57c72d3c, plus this report)
docs/_changelog.md, docs/features/design-foundation.md, docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-c.md, docs/governance/mechanisms.md, docs/governance/reports/foundations-turn-c.report.md, e2e/press.spec.ts, scripts/check-bundle-size.mjs, e2e/sage-cards.spec.ts, public/i18n-usage.json, roadmap.md, scripts/conformance/press.test.ts, scripts/e2e-select.ts, scripts/route-budgets.mjs, src/components/marketplace/listing-card.tsx, src/components/shell/app-header.tsx, src/components/shell/band-row.ts, src/components/shell/menu-row.ts, src/components/shell/panel-tabs.tsx, src/components/ui/button.tsx, src/components/ui/sidebar.tsx, src/components/ui/tabs.tsx, src/lib/press.test.ts, src/lib/press.ts, src/lib/themes.ts, src/routes/__root.tsx, src/styles.css.

## Limits
- The test-ID renames (PRP-*, PSP-1, SCS-*, OLH-*) depart from the ruling's names, forced by TI-1.
- HS-2 was not re-run locally.
- The tab press is not exercised in the browser.
