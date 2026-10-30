# Foundations turn R1b-2 — report (the sub-menu mechanism; the marketplace tree on it)

## 1. Step 0
`docs/governance/briefs/foundations-turn-r1b-2.md` saved in one fenced block; sha256 of the text between BEGIN and END = `92a227aa636526cd8e1d14aacba9a0321920dac5b8250d6237db2bd230c7331f` (equals the ruling's value). Roadmap line 3 names it beside foundations-turn-r1b.md.

## 2. CI line
Last completed run read at the raw ci-evidence address: `0786626d` · run 40996490714 · **FAILURE** (9 gating). The run is on R1b's base before the INC-1007 fix (`36c4a083` had not completed), so the ruling's condition (a red on `36c4a083`) does not apply. Locally on this tree, FT-1, SR-1, L1/L2, L3, PW-99 and OVS-1/2 pass (shell.spec.ts, post-wizard-where.spec.ts from R1b-1, overlay-shift.spec.ts).

## 3. Items 5–11

**5. D98's code, read from `a40e1247^` — done.** `git show a40e1247^:src/components/shell/app-rail.tsx` (752 lines), read by range: no hover intent, safe triangle or side panel exists there (no timer, pointer handler or flyout; only the Radix tooltip at `TooltipProvider delayDuration={150}`, :629, and the phone drill's Back/"All" rows). `git grep` over `a40e1247^:src` finds no `D98`, safe-triangle or hover-intent code. D98's timings (150 ms open, 300 ms close, safe triangle) come from its ruling text in docs/spec/spec-ledger.md :2862, and are built anew in `submenu-geometry.ts` (`SUBMENU_OPEN_MS`, `SUBMENU_CLOSE_MS`). Nothing was restored.

**6. On-demand code through the overlay loader — done.** The panel, the safe triangle and the keys live in `src/components/ui/submenu-impl.tsx` (+ `submenu-geometry.ts`), re-exported by `overlays-impl.ts` and reached only through `overlay-loader.ts` (CF-OV-1 extended to watch `submenu-impl`). The first-paint half, `src/components/shell/submenu/submenu-signal.ts`, sends the triggers' pointer, click and arrow-key signals; it asks for the module through `askOverlays` in `overlay-facade.tsx` (the same `loadOverlays`, the same `reportOnDemandFailure("a menu's code", …)` for a press or key — INC-911; a hover's failure is logged only, as the warm-up's is). The idle warm-up (DEC-259) applies unchanged. The panel is placed from rects read once per opening (no observer, I3) and locks nothing.

**7. Rows — done.** From 768 px with a fine pointer every rail row is 36–48 px (`md:pointer-fine:min-h-9 md:pointer-fine:max-h-12` on the row; the marketplace list spreads its rows by `rail-spread` in src/styles.css); with a coarse pointer every row is ≥ 44 px at any width (`min-h-11` from 768; `rail-row` in src/styles.css lifts the phone rows' 32–40 px bounds under `(pointer: coarse)`). The rail's own scroll region keeps its visible scrollbar (`rail-scroll` has no `scrollbar-none`). The phone menu's hidden scrollbar (`scrollbar-none`, app-rail.tsx) is R1d's split.

**8. Touch tests — done.** `e2e/submenu-touch.spec.ts` (SMN-E3) runs at 1024×768 with `hasTouch` and Chromium's blink-settings replaced by a coarse pointer without hover; it asserts `(pointer: coarse)` first, so it cannot pass by default.

**9. The ‹ Main menu row — done for the rail.** From 768 px the marketplace tree no longer drills in place (`level` is the phone menu's alone), so the rail has no ‹ Main Menu row (SC-2 asserts its absence). It stays on phones, where in-place drilling remains until R1d's split; no panel needs it — no STOP.

**10. First download — done, within 0.5 KiB.** Every page grows +0.4863 … +0.4951 KiB (the per-page table below), one cause on every page: the sub-menu mechanism's first-paint half (the trigger signals in submenu-signal.ts, the rail's panel wiring in app-rail.tsx, `askOverlays` in overlay-facade.tsx); the panel itself is on demand. The entry closure: JS 206.6865 → 207.1758 KiB, CSS 20.5410 → 20.6455 KiB. Ceilings follow DEC-296's rule, floor(local size + 0.1 + 0.3) + 1: 24 of 50 pages raised by 1 KiB with the cause in their line (scripts/route-budgets.mjs), the entry's JS ceiling 207 → 208 (scripts/check-bundle-size.mjs). Measured with the checks' own script at four decimals on a clean build of `36c4a083` and of this tree. Two earlier shapes measured +1.4 and +0.6 KiB (a shared chunk split off by the panel's import of the first-paint half); both were reshaped before landing.

**11. Docs — done.** docs/features/panels.md (DEC-288 supersedes D213 from 768 px), docs/_changelog.md (one line), docs/governance/mechanisms.md row 79 (the sub-menu mechanism). The overlay-shift row (77) was updated in R1b-1.

**The panel opens without moving the page** — OVS-3 (overlay-shift.spec.ts): the main column's box equals its closed value with the panel open and after it closes, with a drawn scrollbar.

**CF-SUB-1** (scripts/conformance/submenu.test.ts + submenu-allowlist.txt): refuses a rail row that draws sub-items in place beyond the file's falling count (app-rail.tsx (3) — the strip, the admin groups and MenuNav's collapsible, until 2026-11-30 / R1c–R1d), the marketplace rail drilling in place, and a hover intent or placement outside the mechanism; planted proof refuses all three.

## 4. Per-page growth table
| Page | Base (KiB) | Now (KiB) | Growth | Ceiling was | Ceiling now |
| --- | --- | --- | --- | --- | --- |
| `/` | 220.8203 | 221.3105 | +0.4902 | 222 | 222 |
| `/$name` | 219.4941 | 219.9814 | +0.4873 | 220 | 221 |
| `/account` | 267.3320 | 267.8203 | +0.4883 | 268 | 269 |
| `/account_/legal` | 209.2881 | 209.7764 | +0.4883 | 210 | 211 |
| `/account_/legal_/$versionId` | 209.9678 | 210.4570 | +0.4892 | 211 | 211 |
| `/account_/saved` | 219.5801 | 220.0684 | +0.4883 | 221 | 221 |
| `/admin` | 207.6387 | 208.1289 | +0.4902 | 209 | 209 |
| `/admin/` | 208.4795 | 208.9697 | +0.4902 | 209 | 210 |
| `/admin/ai` | 335.1270 | 335.6191 | +0.4921 | 336 | 337 |
| `/admin/attributes` | 348.3672 | 348.8584 | +0.4912 | 349 | 350 |
| `/admin/audit` | 308.2461 | 308.7344 | +0.4883 | 309 | 310 |
| `/admin/categories` | 356.6240 | 357.1162 | +0.4922 | 358 | 358 |
| `/admin/countries` | 338.1348 | 338.6221 | +0.4873 | 339 | 340 |
| `/admin/coverage` | 330.7168 | 331.2090 | +0.4922 | 332 | 332 |
| `/admin/images` | 208.2861 | 208.7773 | +0.4912 | 209 | 210 |
| `/admin/impersonation_/$sessionId` | 308.8711 | 309.3623 | +0.4912 | 310 | 310 |
| `/admin/legal` | 277.8887 | 278.3838 | +0.4951 | 279 | 279 |
| `/admin/legal_/$versionId` | 277.1846 | 277.6777 | +0.4931 | 278 | 279 |
| `/admin/legal_/edit` | 282.7373 | 283.2305 | +0.4932 | 284 | 284 |
| `/admin/listings` | 354.5439 | 355.0342 | +0.4903 | 355 | 356 |
| `/admin/listings_/$listingId` | 379.5947 | 380.0898 | +0.4951 | 380 | 381 |
| `/admin/listings_/$listingId_/edit` | 401.5254 | 402.0146 | +0.4892 | 403 | 403 |
| `/admin/locations` | 269.2676 | 269.7578 | +0.4902 | 270 | 271 |
| `/admin/places` | 339.4678 | 339.9561 | +0.4883 | 340 | 341 |
| `/admin/roles` | 305.8350 | 306.3262 | +0.4912 | 307 | 307 |
| `/admin/roles_/$roleId` | 307.5850 | 308.0781 | +0.4931 | 308 | 309 |
| `/admin/screening` | 379.8438 | 380.3379 | +0.4941 | 381 | 381 |
| `/admin/translations` | 412.2646 | 412.7578 | +0.4932 | 413 | 414 |
| `/admin/translations_/$lang` | 321.0664 | 321.5547 | +0.4883 | 322 | 322 |
| `/admin/users` | 304.8350 | 305.3223 | +0.4873 | 306 | 306 |
| `/admin/users_/$userId` | 285.1572 | 285.6514 | +0.4942 | 286 | 287 |
| `/auth` | 219.3359 | 219.8252 | +0.4893 | 220 | 221 |
| `/auth_/callback` | 207.6777 | 208.1670 | +0.4893 | 209 | 209 |
| `/auth_/reset` | 209.7451 | 210.2354 | +0.4903 | 211 | 211 |
| `/c/$slug` | 220.8203 | 221.3105 | +0.4902 | 222 | 222 |
| `/dev/primitives` | 222.5752 | 223.0635 | +0.4883 | 224 | 224 |
| `/dev/style` | 241.6670 | 242.1543 | +0.4873 | 243 | 243 |
| `/dev/tall` | 206.9990 | 207.4883 | +0.4893 | 208 | 208 |
| `/l/$slug` | 250.3906 | 250.8799 | +0.4893 | 251 | 252 |
| `/legal/$kind` | 211.3408 | 211.8330 | +0.4922 | 212 | 213 |
| `/legal/accept` | 218.2559 | 218.7480 | +0.4921 | 219 | 220 |
| `/legal/publishing` | 212.1016 | 212.5898 | +0.4882 | 213 | 213 |
| `/my-listings` | 328.0156 | 328.5049 | +0.4893 | 329 | 329 |
| `/my-listings_/$listingId` | 317.1797 | 317.6670 | +0.4873 | 318 | 319 |
| `/my-listings_/$listingId_/edit` | 396.0166 | 396.5029 | +0.4863 | 397 | 397 |
| `/post` | 395.9775 | 396.4639 | +0.4864 | 397 | 397 |
| `/post_/$listingId` | 395.9424 | 396.4307 | +0.4883 | 397 | 397 |
| `/privacy` | 211.3359 | 211.8242 | +0.4883 | 212 | 213 |
| `/settings` | 270.9541 | 271.4434 | +0.4893 | 272 | 272 |
| `/terms` | 211.3320 | 211.8213 | +0.4893 | 212 | 213 |

## 5. Tests
- E2E, both projects (mobile-360, desktop-1280), retries 0 (`bun run e2e:local`), each file whole: submenu.spec.ts (SMN-E1/E2), submenu-touch.spec.ts (SMN-E3), overlay-shift.spec.ts (OVS-1/2/3), shell.spec.ts (SC-2 rewritten, BK-1 desktop-skipped, C1's 36–48 px), category-nav.spec.ts — **173 passed, 67 skipped, 0 failed**. The users of the changed rail rows: admin-shell.spec.ts, overlays.spec.ts, phone-frame.spec.ts, rail-first-paint.spec.ts — **30 passed, 10 skipped, 0 failed**. Ids grep-checked free (SMN-, OVS-3, CF-SUB-1). No helper changed (G37: no by-id runs owed).
- Unit: SMN-1…6 (submenu-impl.test.tsx, reached through the loader as the app reaches it), CF-SUB-1, CF-OV-1, RFT-5 (rail-first-paint.test.tsx, seed checked apart from the drawn roots). **Unit total: 2,275 / 2,275** (383 files).

## 6. Checks
`checks: 34 PASS · 0 FAIL · 21 NOT RUN · 612s` — the 21 NOT RUN are the installs (dependencies already installed; a package change is its own turn) and the backend/browser lanes the checks never run.

## 7. Left (R1c / R1d)
The admin groups, the account and seller panels (MenuNav) and the phone 64/192 split are not on the mechanism yet; CF-SUB-1's allowlist line (app-rail.tsx, count 3, until 2026-11-30) names them. The phone menu keeps its in-place drill and ‹ Main Menu row until R1d.

## 8. K2
- app-rail.tsx: the phone strip's drill, the admin groups' collapsible and MenuNav's collapsible still draw sub-items in place (the allowlist's three).
- The phone menu list hides its scrollbar (`scrollbar-none`) — R1d's split replaces that list.
- The `localeCompare` tooling sites and the E2E Segmenter oracle (from L-2) are unchanged.

## 9. git diff --name-only 36c4a083
- docs/_changelog.md
- docs/features/panels.md
- docs/generated/i18n-usage.json
- docs/governance/briefs/foundations-turn-r1b-2.md
- docs/governance/mechanisms.md
- e2e/overlay-shift.spec.ts
- e2e/shell.spec.ts
- e2e/submenu-touch.spec.ts
- e2e/submenu.spec.ts
- public/i18n-usage.json
- roadmap.md
- scripts/check-bundle-size.mjs
- scripts/conformance/overlays.test.ts
- scripts/conformance/submenu-allowlist.txt
- scripts/conformance/submenu.test.ts
- scripts/e2e-select.ts
- scripts/route-budgets.mjs
- src/components/shell/app-rail.tsx
- src/components/shell/rail-first-paint.test.tsx
- src/components/shell/submenu/submenu-signal.ts
- src/components/ui/overlay-facade.tsx
- src/components/ui/overlays-impl.ts
- src/components/ui/submenu-geometry.ts
- src/components/ui/submenu-impl.test.tsx
- src/components/ui/submenu-impl.tsx
- src/styles.css
- docs/governance/reports/foundations-turn-r1b-2.report.md
