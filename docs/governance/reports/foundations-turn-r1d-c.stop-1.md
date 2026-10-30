# Foundations turn R1d-c — stop 1 (page growth over 0.5 KiB)

- Step 0: ruling saved as docs/governance/briefs/foundations-turn-r1d-c.md; sha256 `a51d551ac9bfde6cc587dce7b1ab4a99d1f49df2d7dca36c2d351ce88ffc6f5e` (matches). Roadmap line 3 names it; the POSTPONED (D255) line is under redesign Part 1, word for word.

## Why this stops
The ruling: "a page that grows by more than 0.5 KiB … is a STOP", and "the size budget passes without raising a ceiling". Measured (clean builds of fa5c333f and of this tree, `scripts/check-bundle-size.mjs`, gzip, 0.1 KiB): **every page grows +0.9 to +1.0 KiB** (30 pages +1.0, 20 pages +0.9). Seven pages go over their ceiling (`/account_/legal_/$versionId`, `/admin/impersonation_/$sessionId`, `/admin/legal`, `/dev/tall`, `/post`, `/post_/$listingId`, `/settings`), and the NEAR band names 25 pages. All of it is in the shared entry chunk (`index-*.js` 122.7 → 123.6 KiB). Nothing else in the first download changed.

Cause, by file (each file minified and gzipped on its own; the bundle shares more, so these add to more than 0.9):
| File | fa5c333f | now | Δ bytes | What |
| --- | ---: | ---: | ---: | --- |
| src/components/shell/app-rail.tsx | 6,025 | 6,647 | +622 | D259 Home row; D255 strip level + back item; D240 MenuNav side panels (panel rows, first-page click, URL marking) |
| src/components/shell/menu-current.ts | — | 257 | +257 | one current-item rule for every menu (replaces two inline rules) |
| src/components/shell/menu-level.ts | — | 238 | +238 | the one level state the phone menu and strip share |
| src/router.tsx + src/routes/__root.tsx | 3,285 | 3,520 | +235 | INC-1013's "router settled" mark |
| src/components/app-shell.tsx | 5,266 | 5,321 | +55 | D258 band row; D256 one bar gap |

I could not get the growth under 0.5 KiB without dropping part of what the ruling asks for, so no ceiling was raised and nothing was cut. Options for your ruling:
1. Accept about +1.0 KiB a page, with the cause above (a DEC-296 line), and raise the seven ceilings and the NEAR pages by 1 KiB.
2. Cut it down: (a) put the INC-1013 mark in the router only (no event, no listener in __root; about −0.15 KiB); (b) build MenuNav's panel rows on demand inside the panel code (submenu-impl, which already loads when a panel opens; about −0.2 KiB). My estimate is still about +0.5 to +0.6 KiB a page after both, so this may need option 1 as well.

## CI
- fa5c333f, run 41051458551: **FAILURE**. 2,333 passed, 3 failed (gating), all of them SMN-E13 (`e2e/submenu-look.spec.ts`; shard 16 and the repeat lane): "the panel scrolls" got overflow 0. Cause: the seeded category is itself a row of the main menu. When the menu had room for one more row, it showed holds + 1 rows, so a panel of holds + 1 fitted and did not scroll. Fix (in this tree): the seed counts that row (`holds + 2` when the menu has room for it, otherwise `holds + 1`). This fixes the cause and adds no retry or wait. The rest of the run was green.
- INC-1013 ("the bar and the band stay while the page scrolls"): the cause is the router's scroll restoration (`scrollRestoration: true`). It runs on the router's first `onRendered`, which can come after React's hydration effect has already set `data-app-ready`, and resets the scroll to 0. The peek was not open (it is off unless an E2E switch forces it). Fix: src/router.tsx marks `data-router-settled` after the first `onRendered` and one task; __root sets `data-app-ready` only after that mark (src/lib/router-settled.ts names the event). Repeat run (`--repeat-each 12`, retries 0): 12 passed on mobile-360. The test is phone-only, so desktop-1280 skipped all 12 by design.
- INC-1014: across the last ten `e2e-last-failure.md` snapshots, the line `ssr language gate timed out after 1500ms` appears only in the ffb3ee6f snapshot (3 log lines from that one run) and in none of the other nine, fa5c333f included. So it is 1 run in 10. Its cause was not found, so I added no allowlist line.

## Census (files and tests per part; mechanisms found)
- R1d-b Part 4 (D240): app-rail.tsx MenuNav. The mechanism already existed: the sub-menu layer (submenu-impl.tsx via overlay-loader), menu-row.ts, MENU_FIT_MAX. New: menu-current.ts (one current-item rule). Tests: SMN-E11 and SMN-E12 (submenu.spec.ts), ROWS-E2 (menu-rows.spec.ts); A-5, A-6, A-7 and IN-1 (admin-shell.spec.ts) changed under G38, each named in the file. CF-SUB-1 phone line reason is now "phones keep today's menu (D255, 2026-10-30)".
- Part 1 (D259): app-rail.tsx CategoryNav, using the key nav.home (no new string) and the House icon (already in the first download through the bottom bar). Tests: HM-1, HM-2 and HM-3 (shell.spec.ts) replace HR-1 under G38. FV-3 changed under G38: the favourite is now second, under Home. The ROWS-E* and SMN-E* counts read the list at run time, so they include Home.
- Part 2 (D255): menu-level.ts (one level state); app-rail.tsx strip and StripBack. CF-SUB-1 refuses a second level state, proven on a planted copy. CF-ROWS-1: the strip's hidden-scrollbar line was removed, because a sub-level can be taller than the strip, so it now scrolls with a visible bar.
- Part 3 (D258): band-row.ts (BAND_ROW), read by panel-tabs, the breadcrumb row (app-shell), location-selector and panel-header. CF-BAND-1 (shell-bands.test.ts) is proven on a planted copy. Tests: BND-E1 (1280×800 and 1024×768, fine and coarse pointer, signed out and in, open and folded), BND-E2 (360) and BND-E3 (Services' panel), all in e2e/shell-bands.spec.ts. The L4b location test changed under G38 (32 → 40 px).
- Part 4 (D256): bar-spacing.ts (BAR_GAP, BAR_INSET, BAR_HEADER_INSET). CF-BAR-1 is proven on a planted copy. Test: BAR-E1. TB-1 changed under G38 (the logo sits one gap after the toggle; the search is centred in the free space before the controls' gap).
- Part 5 (D257): app-footer.tsx is now `md:flex md:justify-evenly` on content-sized blocks. Test: FTE-E1 (five gaps equal within 2 px, at 1280 and 1024, open and folded). Phones keep three grid columns of equal width; their visible gaps are not equal, because each column's text is a different length.
- Also fixed: the router's Link set `aria-current="page"` by its own matching, which marked "Sign-in and security" on /settings along with Settings (found by SMN-E12). Every menu Link now takes `MENU_LINK_ACTIVE` (menu-current.ts), so the router's mark always agrees with our rule.

## Tests
- E2E, final tree: shell.spec, shell-bands.spec, submenu.spec, submenu-look.spec, menu-rows.spec and admin-shell.spec, each file whole, both projects, retries 0: **201 passed, 93 skipped, 0 failed (14.4 min)**. An earlier run's only red was an SMN-E4 cleanup that got a 502 from the staging gateway (`[e2e:reap] branch pointers (parent)`). It passed when the file was run again whole (submenu.spec and submenu-look.spec: 13 passed, 13 skipped).
- `bun run checks` (once, before the last fixes): `checks: 25 PASS · 4 FAIL · 26 NOT RUN · 1155s`. The four FAILs:
  - format: fixed with prettier;
  - unit: BX-1 (the new box reads now use layoutBoxes) and e2e-select (shell-bands.spec added to the shell area), both fixed; the two guard files, run again, pass (34 of 34 in the five guard files);
  - budget and NEAR: **the stop**.
  The checks were not run again, because the budget would still fail. NOT RUN: the 26 the harness names (backend and browser lanes).
- Unit count for the whole suite: NOT RUN in a clean run since the fixes (the run inside the checks failed only on the two guards above).
- R1d-b growth table (fa5c333f against 60287c03): every page shrank, 34 pages by −0.5 KiB and 16 by −0.4 KiB, because the footer-inset code was removed (D252).

## Growth table (KiB, gzip): 60287c03 → fa5c333f → this tree, ceiling
| Page | 60287c03 | fa5c333f | R1d-b Δ | now | R1d-c Δ | ceiling |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| `/` | 221.5 | 221.0 | -0.5 | 222.0 | +1.0 | 222 |
| `/$name` | 220.1 | 219.7 | -0.4 | 220.6 | +0.9 | 221 |
| `/account` | 268.0 | 267.5 | -0.5 | 268.5 | +1.0 | 269 |
| `/account_/legal` | 209.9 | 209.5 | -0.4 | 210.4 | +0.9 | 211 |
| `/account_/legal_/$versionId` | 210.6 | 210.2 | -0.4 | 211.1 | +0.9 | 211 |
| `/account_/saved` | 220.2 | 219.8 | -0.4 | 220.7 | +0.9 | 221 |
| `/admin` | 208.3 | 207.8 | -0.5 | 208.8 | +1.0 | 209 |
| `/admin/` | 209.1 | 208.7 | -0.4 | 209.6 | +0.9 | 210 |
| `/admin/ai` | 335.8 | 335.3 | -0.5 | 336.3 | +1.0 | 337 |
| `/admin/attributes` | 349.0 | 348.5 | -0.5 | 349.5 | +1.0 | 350 |
| `/admin/audit` | 308.9 | 308.4 | -0.5 | 309.4 | +1.0 | 310 |
| `/admin/categories` | 357.3 | 356.8 | -0.5 | 357.8 | +1.0 | 358 |
| `/admin/countries` | 338.8 | 338.3 | -0.5 | 339.3 | +1.0 | 340 |
| `/admin/coverage` | 331.4 | 330.9 | -0.5 | 331.8 | +0.9 | 332 |
| `/admin/images` | 208.9 | 208.5 | -0.4 | 209.4 | +0.9 | 210 |
| `/admin/impersonation_/$sessionId` | 309.5 | 309.0 | -0.5 | 310.0 | +1.0 | 310 |
| `/admin/legal` | 278.5 | 278.1 | -0.4 | 279.0 | +0.9 | 279 |
| `/admin/legal_/$versionId` | 277.8 | 277.4 | -0.4 | 278.3 | +0.9 | 279 |
| `/admin/legal_/edit` | 283.4 | 282.9 | -0.5 | 283.9 | +1.0 | 284 |
| `/admin/listings` | 355.2 | 354.7 | -0.5 | 355.7 | +1.0 | 356 |
| `/admin/listings_/$listingId` | 380.2 | 379.8 | -0.4 | 380.7 | +0.9 | 381 |
| `/admin/listings_/$listingId_/edit` | 402.2 | 401.7 | -0.5 | 402.7 | +1.0 | 403 |
| `/admin/locations` | 269.9 | 269.5 | -0.4 | 270.4 | +0.9 | 271 |
| `/admin/places` | 340.1 | 339.6 | -0.5 | 340.6 | +1.0 | 341 |
| `/admin/roles` | 306.5 | 306.0 | -0.5 | 307.0 | +1.0 | 307 |
| `/admin/roles_/$roleId` | 308.2 | 307.8 | -0.4 | 308.7 | +0.9 | 309 |
| `/admin/screening` | 380.5 | 380.0 | -0.5 | 381.0 | +1.0 | 381 |
| `/admin/translations` | 412.9 | 412.4 | -0.5 | 413.4 | +1.0 | 414 |
| `/admin/translations_/$lang` | 321.7 | 321.2 | -0.5 | 322.2 | +1.0 | 323 |
| `/admin/users` | 305.5 | 305.0 | -0.5 | 306.0 | +1.0 | 306 |
| `/admin/users_/$userId` | 285.8 | 285.3 | -0.5 | 286.3 | +1.0 | 287 |
| `/auth` | 220.0 | 219.5 | -0.5 | 220.5 | +1.0 | 221 |
| `/auth_/callback` | 208.3 | 207.9 | -0.4 | 208.8 | +0.9 | 209 |
| `/auth_/reset` | 210.4 | 209.9 | -0.5 | 210.9 | +1.0 | 211 |
| `/c/$slug` | 221.5 | 221.0 | -0.5 | 222.0 | +1.0 | 222 |
| `/dev/primitives` | 223.2 | 222.8 | -0.4 | 223.7 | +0.9 | 224 |
| `/dev/style` | 242.3 | 241.8 | -0.5 | 242.8 | +1.0 | 243 |
| `/dev/tall` | 207.6 | 207.2 | -0.4 | 208.1 | +0.9 | 208 |
| `/l/$slug` | 251.0 | 250.6 | -0.4 | 251.5 | +0.9 | 252 |
| `/legal/$kind` | 212.0 | 211.5 | -0.5 | 212.5 | +1.0 | 213 |
| `/legal/accept` | 218.9 | 218.4 | -0.5 | 219.4 | +1.0 | 220 |
| `/legal/publishing` | 212.8 | 212.3 | -0.5 | 213.2 | +0.9 | 214 |
| `/my-listings` | 328.7 | 328.2 | -0.5 | 329.1 | +0.9 | 330 |
| `/my-listings_/$listingId` | 317.8 | 317.4 | -0.4 | 318.3 | +0.9 | 319 |
| `/my-listings_/$listingId_/edit` | 396.7 | 396.2 | -0.5 | 397.1 | +0.9 | 398 |
| `/post` | 396.6 | 396.1 | -0.5 | 397.1 | +1.0 | 397 |
| `/post_/$listingId` | 396.6 | 396.1 | -0.5 | 397.1 | +1.0 | 397 |
| `/privacy` | 212.0 | 211.5 | -0.5 | 212.5 | +1.0 | 213 |
| `/settings` | 271.6 | 271.1 | -0.5 | 272.1 | +1.0 | 272 |
| `/terms` | 212.0 | 211.5 | -0.5 | 212.5 | +1.0 | 213 |

## K2
- Phone footer: three columns of equal width, so the visible gaps differ with the length of each column's text. D257 is for 768 px and wider, so phones were left as they are.
- The strip's back item: its accessible name is the parent's name, or "Main Menu" at the top level. The ruling asks for "Back to <name>", but there is no such key in EN/AM, and the rules forbid writing Amharic of my own, so this needs a brief string.
- RTL is checked by setting `dir="rtl"` on the page, because no right-to-left language is in the catalogue yet.
- K2 from R1d-b still stands: location-form-fields.tsx:160 `md:w-56` (a form width).

## Files (git diff --name-only fa5c333f)
docs/generated/i18n-usage.json, docs/governance/briefs/foundations-turn-r1d-c.md, docs/governance/reports/foundations-turn-r1d-c.stop-1.md, e2e/admin-shell.spec.ts, e2e/menu-rows.spec.ts, e2e/shell-bands.spec.ts, e2e/shell.spec.ts, e2e/submenu-look.spec.ts, e2e/submenu.spec.ts, public/i18n-usage.json, roadmap.md, scripts/conformance/layout-reads-allowlist.txt, scripts/conformance/menu-rows-allowlist.txt, scripts/conformance/shell-bands.test.ts, scripts/conformance/submenu-allowlist.txt, scripts/conformance/submenu.test.ts, scripts/e2e-select.ts, src/components/app-shell.tsx, src/components/shell/app-footer.tsx, src/components/shell/app-header.tsx, src/components/shell/app-rail.tsx, src/components/shell/band-row.ts, src/components/shell/bar-spacing.ts, src/components/shell/location-selector.tsx, src/components/shell/menu-current.test.ts, src/components/shell/menu-current.ts, src/components/shell/menu-level.ts, src/components/shell/panel-header.tsx, src/components/shell/panel-tabs.tsx, src/components/shell/rail-first-paint.test.tsx, src/components/ui/submenu-impl.tsx, src/lib/router-settled.ts, src/router.tsx, src/routes/__root.tsx
