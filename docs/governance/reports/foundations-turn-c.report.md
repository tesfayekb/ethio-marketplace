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

---

# Turn C report — C2 (the chosen item, the bottom bar's mark D271, the tap tick D272; DEC-317)

Base dev 3033041c. No migration, no new dependency. Three new strings (ruling 1), EN + AM by key, copied character for character.

## C2.1 CI
- Start: the last completed run was 57c72d3c (B2, FAILURE — C1 fixed its four reds). The run on 3033041c completed at 16:13:47Z: **FAILURE** — (a) first-paint per-page budget: 50 pages over their ceilings by 0.0–0.9 KiB (C1's root growth); (b) E2E lanes 7 and 15 and staging: SGB-5 (e2e/sage-bands.spec.ts :221) at 360/390/834/1440 — the chosen location segment read mid-fade (`oklab(…)` against the token's `oklch(…)`). HS-2 (axe on /dev/style, dark) is not among the reds of 3033041c (the evidence's accessibility section lists no failure).
- Roots: (a) C1's press listener and PRESSED grew every page; this turn grows them again (below), so every crossed ceiling is raised once, with its measure. (b) C1's PRESS_MOTION faded **every** change of look on a pressable, so a segment that became current (the location level after its choice) faded in. Fixed at the mechanism: press.ts marks the released element `data-released` for RELEASE_MS (160 ms) and PRESS_MOTION (and the plain-link rule in styles.css, and PRESSED.card) is keyed on that mark alone; a new press ends every earlier fade. Guarded: CF-PRESS-1 rule 2 now also refuses an own `data-[released]` look (planted in PRP-3); unit PR-U8.
- SGB-5 re-run locally: e2e/sage-bands.spec.ts whole, both projects, retries 0 — green (below).
- Before the push: re-read (see C2.9).

## C2.2 The D271 census — every place that marks a current item
| Place | Reads |
| --- | --- |
| src/components/shell/app-rail.tsx :593 (CategoryNav: Home and category rows :623, :642, panel rows :665) | the one rule — isCurrentAt on useMenuAt |
| src/components/shell/app-rail.tsx :809, :818 (panel items, anchored rule; marks at :302, :345, :356, :450, :481) | the one rule — isCurrentAt on useMenuAt |
| src/components/ui/submenu-impl.tsx :436 (side panel rows) | the one rule — `rules.isCurrent` handed in by app-rail.tsx (:818) |
| src/components/shell/bottom-bar.tsx :99 (marks :124, :137, :159, :170, :182) | the one rule — isCurrentAt on useMenuAt (BAR_PATHS); before C2 it read `activePanel` |
| src/components/shell/breadcrumbs.tsx :104, ui/breadcrumb.tsx :71 | something else — the frame (useShownPathname, INC-581, ruling 4) |
| src/components/shell/panel-tabs.tsx :56, panel-header.tsx :43/:75 | something else — the frame's panel (`activePanel`, INC-581, ruling 4) |
| src/components/app-shell.tsx :532, src/routes/admin.tsx :56, app-rail.tsx :1001 | something else — the frame (not a mark); app-rail :1001 carries `// frame: INC-581` |
| src/components/shell/data-table.tsx :362, ui/pagination.tsx :36 | something else — page numbers, local state (out of domain) |
| features/posting/wizard.tsx :987, :1070, mobile-step-strip.tsx :60, step-category.tsx :99, :449, preview/photo-gallery.tsx :284, preview/listing-detail.tsx :1051 | something else — local state, already instant (out of domain) |

## C2.3 Rulings
1. **The switch's place** — /settings, new section "This device" (`settings-this-device`), a Radix Switch (role switch, aria-checked) labelled by its `<label>` with the help as its description. Keys in en-member.ts / am-member.ts: `settings.thisDevice.title`, `settings.tapTick.label`, `settings.tapTick.help`, texts as ruled. The choice is `ethio.tapTick` in browser storage, read and written inside try/catch (a refused write keeps the choice for the page and is logged `[tap-tick]`). The server draws "on".
2. **Bottom bar and hand-built top-bar buttons** — PRESSED.bar (item ink) and PRESSED.barIcon (the icon box takes CURRENT_PILL's fill, lift and ink) in menu-row.ts; the ☰ and the search close button take PRESSED.button. Rule 1's census names bottom-bar.tsx.
3. **The iPhone path — STOP (not written).** What I found: the sandbox has no iPhone and no WebKit with haptics; Playwright's WebKit does not emulate the system haptic, so whether a script `click()` on a hidden `<input type="checkbox" switch>` ticks, and whether it may run from the press listener's click (capture on document), cannot be proven here. Public reports say iOS 18 Safari ticks for a label/switch click inside a user activation, but that is not evidence from this tree. Per the ruling the vibrate path (10 ms) went ahead; rule 4 already refuses a switch checkbox anywhere but press.ts, so the path has its one home when proven.
4. **INC-581 holds** — the frame (panel, bands, breadcrumbs) reads useShownPathname; only menu marks read useMenuAt (src/components/shell/use-shown-pathname.ts, over the pure `menuAtOf` in menu-current.ts). PS-2 asserts the old page's body is still shown while the mark has moved.
- Departure: useMenuAt lives in use-shown-pathname.ts, not menu-current.ts as the plan said: menu-current.ts is reached by the unit tests' setup before their router mocks apply (RFT-1…5 failed with the real `useRouterState`), so the pure rule stays router-free and the hook sits beside its frame twin.

## C2.4 CF-PRESS-1 rules 3 and 4 (scripts/conformance/press.test.ts; the allowlist stays empty)
- Rule 3: a file calling isCurrentAt is in MENU_FILES (app-rail.tsx, bottom-bar.tsx) and calls useMenuAt; no menu file calls useShownPathname/useRouterState (a frame read says `// frame: INC-581` on its line); no `aria-current`/`current` mark reads `activePanel`. Planted: PRP-4 (a bar mark from activePanel), PRP-5 (a menu reading the shown page; isCurrentAt off the census; a mark without useMenuAt).
- Rule 4: no `vibrate(` call and no switch checkbox (`<input … switch>`, `setAttribute("switch")`, `.switch =`) outside press.ts. Planted: PRP-6, PRP-7. A passing case covers press.ts's own call and a marked frame line.
- New ids PRP-4…7, MA-U1…3, PR-U7, PR-U8, PS-2, PS-3, PS-5, PS-6: free under TI-1 (searched in e2e/, src/, scripts/); no rename needed.

## C2.5 Tests
- Unit: menu-current.test.ts MA-U1…3; press.test.ts PR-U7 (tick once on a touch on a button, a data-tick row and a tab; never a plain link, `data-tick="off"`, a mouse, a key, or with the switch off; storage written and read) and PR-U8 (release fade). press.test.ts + menu-current.test.ts + scripts/conformance/press.test.ts: 26 passed. src/components/shell (all): 128 passed.
- Browser (bun run e2e:local, both projects, retries 0, each file whole):
  - e2e/press.spec.ts + e2e/sage-bands.spec.ts: **53 passed, 0 failed, 39 skipped** (6.8 m) — PS-5 skips at 1280 (the bar is the phone's); sage-bands' skips are its other widths per project.
  - e2e/category-nav.spec.ts + e2e/submenu.spec.ts (G38): 17 passed, 0 failed, 7 skipped.
  - e2e/shell.spec.ts `--grep "bottom bar"` (G38): 4 passed, 4 skipped — **not the whole file** (19.9 min in CI); CI judges the rest.
- Laws step: `bunx vitest run scripts` 397 passed, 1 skipped; changed folders' units 454 passed; Semgrep on changed files 0 findings.

## C2.6 G38
- Specs that assert a current mark: category-nav.spec.ts :92 (C-8, bottom-bar Home after the breadcrumb), shell.spec.ts :1025–1026 (the bar's pill), :1621–1630 (the bar, signed in), submenu.spec.ts :317–327 (ac-settings after a click), sage-bands.spec.ts SGB-5. None asserts the old (late) timing; all assert the settled mark, which is unchanged. No spec edited. The signed-out bar now marks Home on the feed and Sign in on /auth (D271) — no spec asserted their absence.

## C2.7 Measured change per page (local `bun run build` + check-bundle-size.mjs)
- Entry closure 210.9 KiB, over 211: 211 → 212 (DEC-296) — the tap tick and its switch store, the release fade, useMenuAt and the bottom bar's rule, all in the root.
- 50 page ceilings crossed (CI 3033041c's per-page red plus this turn): each raised by floor(size + 0.3) + 1, its line naming the cause. /settings 274.6 (CI) → 277.3 KiB: + the "This device" section and the Radix Switch on that page (+2.7 KiB); every other page +0.7–0.9 KiB against CI 3033041c (C1's and C2's shared root growth).

| Page | Local KiB | Ceiling |
| --- | --- | --- |
| `/` | 225.6 | 225 → 226 |
| `/$name` | 224.0 | 223 → 225 |
| `/account` | 271.7 | 271 → 273 |
| `/account_/legal` | 213.6 | 213 → 214 |
| `/account_/legal_/$versionId` | 214.3 | 214 → 215 |
| `/account_/saved` | 224.1 | 223 → 225 |
| `/admin` | 212.0 | 211 → 213 |
| `/admin/` | 212.8 | 212 → 214 |
| `/admin/ai` | 340.0 | 339 → 341 |
| `/admin/attributes` | 353.3 | 352 → 354 |
| `/admin/audit` | 313.1 | 312 → 314 |
| `/admin/categories` | 361.3 | 360 → 362 |
| `/admin/countries` | 342.8 | 342 → 344 |
| `/admin/coverage` | 335.6 | 335 → 336 |
| `/admin/images` | 212.6 | 212 → 213 |
| `/admin/impersonation_/$sessionId` | 313.9 | 313 → 315 |
| `/admin/legal` | 282.2 | 281 → 283 |
| `/admin/legal_/$versionId` | 281.5 | 281 → 282 |
| `/admin/legal_/edit` | 287.1 | 286 → 288 |
| `/admin/listings` | 359.4 | 359 → 360 |
| `/admin/listings_/$listingId` | 384.3 | 383 → 385 |
| `/admin/listings_/$listingId_/edit` | 407.4 | 407 → 408 |
| `/admin/locations` | 273.6 | 273 → 274 |
| `/admin/places` | 344.4 | 344 → 345 |
| `/admin/roles` | 310.7 | 310 → 312 |
| `/admin/roles_/$roleId` | 312.0 | 311 → 313 |
| `/admin/screening` | 384.9 | 384 → 386 |
| `/admin/translations` | 417.3 | 416 → 418 |
| `/admin/translations_/$lang` | 325.9 | 325 → 327 |
| `/admin/users` | 309.7 | 309 → 311 |
| `/admin/users_/$userId` | 289.7 | 289 → 291 |
| `/auth` | 223.8 | 223 → 225 |
| `/auth_/callback` | 212.0 | 211 → 213 |
| `/auth_/reset` | 214.1 | 213 → 215 |
| `/c/$slug` | 225.6 | 225 → 226 |
| `/dev/primitives` | 227.1 | 226 → 228 |
| `/dev/style` | 247.5 | 247 → 248 |
| `/dev/tall` | 211.3 | 211 → 212 |
| `/l/$slug` | 254.9 | 254 → 256 |
| `/legal/$kind` | 215.7 | 215 → 217 |
| `/legal/accept` | 222.7 | 222 → 224 |
| `/legal/publishing` | 216.4 | 216 → 217 |
| `/my-listings` | 333.0 | 332 → 334 |
| `/my-listings_/$listingId` | 321.8 | 321 → 323 |
| `/my-listings_/$listingId_/edit` | 401.8 | 401 → 403 |
| `/post` | 401.8 | 401 → 403 |
| `/post_/$listingId` | 401.8 | 401 → 403 |
| `/privacy` | 215.7 | 215 → 217 |
| `/settings` | 277.3 | 275 → 278 |
| `/terms` | 215.7 | 215 → 217 |

The final tree's NEAR band (from `bun run checks` and the re-measure after it) raised eight more:

| Page | Local KiB | Ceiling |
| --- | --- | --- |
| `/` | 225.7 | 226 → 227 (NEAR) |
| `/account_/legal` | 213.7 | 214 → 215 (NEAR) |
| `/admin/coverage` | 335.7 | 336 → 337 (NEAR) |
| `/admin/images` | 212.7 | 213 → 214 (NEAR) |
| `/admin/locations` | 273.7 | 274 → 275 (NEAR) |
| `/c/$slug` | 225.7 | 226 → 227 (NEAR) |
| `/admin/legal_/$versionId` | 281.6 | 282 → 283 (NEAR) |
| `/dev/style` | 247.6 | 248 → 249 (NEAR) |

## C2.8 K2
- panel-tabs.tsx :56 and panel-header.tsx :75 mark the current panel from `activePanel` (the frame). Under ruling 4 they stay; D270's "a chosen tab stays raised" therefore shows on the tab only once the page lands (its press look shows at once). A ruling is owed if the tab should move early too.
- The Radix Switch on /settings is 20 × 36 px; its label row is 44 px tall and the label toggles it, but the switch alone is under C2's 44 px.
- The iPhone tick (ruling 3) is not built.

## C2.9 Checks
- CI re-read before the push: the latest completed run is still 3033041c (FAILURE: the per-page budget and SGB-5 — both fixed at their roots above). No newer run.
- `bun run checks`, one run, whole: fast line `checks (fast): 28 PASS · 0 FAIL · 1315s`; last line `checks: 35 PASS · 2 FAIL · 21 NOT RUN · 1644s`. The 2 FAILs were the budget's NEAR band (six pages, +0.1 KiB after useMenuAt moved beside useShownPathname). Fixed (table above), then `node scripts/check-bundle-size.mjs` re-run alone until clean (two more NEAR pages, then exit 0: entry 211.1 / 212 KiB). The whole run was **not** repeated (27 min; the ruling names one run); CI judges.
- NOT RUN (21): the install steps (dependencies already installed), the dependency audit (advisory service unreachable), the staging preflight (no staging credentials in the script), the E2E merge and verdict (GitHub artefacts), promote (CI only), the SARIF upload and its warning (GitHub only).
- Unit count: component tests 2,474 passed (406 files); scripts/ 397 passed, 1 skipped.

## C2.10 Files (git diff --name-only 3033041c, plus this report)
docs/_changelog.md, docs/features/design-foundation.md, docs/generated/i18n-usage.json, docs/governance/mechanisms.md, e2e/press.spec.ts, public/i18n-usage.json, roadmap.md, scripts/check-bundle-size.mjs, scripts/conformance/press.test.ts, scripts/route-budgets.mjs, src/components/shell/app-header.tsx, src/components/shell/app-rail.tsx, src/components/shell/bottom-bar.tsx, src/components/shell/menu-current.test.ts, src/components/shell/menu-current.ts, src/components/shell/menu-row.ts, src/components/shell/use-shown-pathname.ts, src/components/ui/breadcrumb.tsx, src/components/ui/submenu-impl.tsx, src/i18n/locales/am-member.ts, src/i18n/locales/en-member.ts, src/lib/press.test.ts, src/lib/press.ts, src/routes/settings.tsx, src/styles.css, docs/governance/reports/foundations-turn-c.report.md.

## C2 Limits
- No iPhone path; no on-device haptic proof of any kind (the vibrate call is proven by a spy, not by a phone's motor).
- shell.spec.ts ran by grep, not whole; CI's full suite is the proof.

## C2 fix 1 (CI run 41224092916 on 554f0475)

- **Cause.** PW-15 (mobile-360): on /post the bottom bar's My Listings item had no aria-current. C2's ruling 4 ("Post on the posting pages") contradicted INC-359 (posting pages belong to My Listings); the record governs. The Post disc is an action, never current.
- **Mechanism (G0).** "Which section a path belongs to" had two versions: app-shell.tsx's routePanel and bottom-bar.tsx's BAR_PATHS. Now one pure `panelOf(pathname)` in src/components/shell/menu-current.ts, beside isCurrentAt. app-shell.tsx reads it for the frame; bottom-bar.tsx reads it for My Listings, Account and Admin, adding only Home (feedRouteOf) and Sign in (/auth). BAR_PATHS is removed. /post and /post/* mark My Listings.
- **CF-PRESS-1 rule 3** grows: bottom-bar.tsx must call panelOf; a menu file declaring a path list (`["/a", …]`) or `startsWith("/…")` fails. Planted: PRP-8 (3 findings). Free under TI-1.
- **Unit tests.** PO-U1, PO-U2 (panelOf), free under TI-1. press.test + menu-current.test: 20 passed. Laws step (scripts): 398 passed, 1 skipped.
- **Browser** (both projects, retries 0): post-wizard-category + press, run 1: 59 passed, 2 failed (PW-2 and PSP-1 light, mobile-360, the run's first tests: save-state and waitForURL timeouts on a cold dev server; PW-15 passed on both). Run 2 whole, same files: 61 passed, 0 failed, 3 skipped. shell.spec --grep "bottom bar": 4 passed, 4 skipped. PS-5 unchanged (it names no /post).
- **Files (git diff --name-only 554f0475):** src/components/app-shell.tsx, src/components/shell/bottom-bar.tsx, src/components/shell/menu-current.ts, src/components/shell/menu-current.test.ts, scripts/conformance/press.test.ts, docs/governance/reports/foundations-turn-c.report.md, docs/_changelog.md.
- **K2.** None new: no other file decides a path's section (rg routePanel/startsWith("/post") in src).
