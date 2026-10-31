QUESTION — sage-s6-1-dialog-look part J (growth): the dialog look rides every page's first download; the entry's ceiling and the spec selector's area map are outside the scope
DONE: parts A–H; I (unit DG-U1–U4, e2e/dialogs.spec.ts); J's docs (register rows 87–89, design-foundation "Dialogs (turn S6-1)", the changelog and roadmap lines); THE BROWSER CHECK (below)
LEFT: J's growth ceilings; THE CHECKS; THE SELF-REVIEW; THE REPORT; the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `04fee7576e6146644bfc2a1059a063aefae5a41a` (short `04fee75`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-31T18:57:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41230127440
FILES:
.cursor/rules/00-protocol.mdc
.cursor/rules/10-code-laws.mdc
.cursor/rules/12-ui.mdc
.cursor/rules/20-tests.mdc
.cursor/rules/30-migrations.mdc
.cursor/rules/40-ci-evidence.mdc
.cursor/rules/50-security.mdc
.cursor/rules/60-report.mdc
.cursor/rules/80-review.mdc
docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s6-1-dialog-look.md
docs/governance/briefs/sage-s6-1-dialog-look.ruling-1.md
docs/governance/briefs/sage-s6-1-dialog-look.ruling-2.md
docs/governance/mechanisms.md
docs/governance/reports/sage-s6-1-dialog-look.stop-1.md
docs/governance/reports/sage-s6-1-dialog-look.stop-2.md
docs/tracking/intentional-deletions.txt
e2e/dialogs.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
scripts/conformance/look-values-allowlist.txt
scripts/conformance/notice-outlet.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/press.test.ts
scripts/conformance/wired.test.ts
src/components/layout/layers.ts
src/components/shell/app-header.tsx
src/components/shell/menu-row.ts
src/components/ui/alert-dialog.tsx
src/components/ui/command.tsx
src/components/ui/context-menu.tsx
src/components/ui/dialog-look.test.tsx
src/components/ui/dialog-look.ts
src/components/ui/dialog.tsx
src/components/ui/drawer.tsx
src/components/ui/hover-card.tsx
src/components/ui/input.tsx
src/components/ui/menubar.tsx
src/components/ui/native-select.tsx
src/components/ui/navigation-menu.tsx
src/components/ui/select.tsx
src/components/ui/sheet.tsx
src/components/ui/sidebar.tsx
src/components/ui/textarea.tsx
src/features/ad-page/report-ad.tsx
src/features/ad-page/share-ad.tsx
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-listings/listing-photos.tsx
src/features/admin-listings/listing-settings.tsx
src/features/admin-listings/move-dialog.tsx
src/features/admin-listings/undo-dialog.tsx
src/features/admin-locations/location-dialogs.tsx
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/screening-page.tsx
src/features/admin/import-dialog.tsx
src/features/admin/legal/legal-editor-form.tsx
src/features/admin/legal/legal-page.tsx
src/features/admin/legal/legal-publish-dialog.tsx
src/features/admin/translations/delete-language-dialog.tsx
src/features/admin/translations/history-drawer.tsx
src/features/admin/translations/pseudo-bar.tsx
src/features/auth/mfa/step-up-gate.tsx
src/features/legal/certify-confirm.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/background-dialog.tsx
src/features/posting/category-move-dialog.tsx
src/features/posting/photo-editor.tsx
src/features/posting/preview/listing-detail.tsx
src/lib/schemas/theme.ts
src/lib/themes.ts
src/routes/admin.listings_.$listingId_.edit.tsx
src/routes/dev.style.tsx
src/styles.css

Rule 10 (Speed): "Code every page carries … moves EVERY page: run the check on the base and on your tree, report each page's change, and raise now every page your change leaves inside the 0.3 KiB band." The entry's ceiling lives in scripts/check-bundle-size.mjs, which S6-1's scope does not name (it names scripts/route-budgets.mjs only); rule 00: "A file you need that your scope does not cover is a STOP naming the file and why."

MEASURED (`bun run build && node scripts/check-bundle-size.mjs`, local, on the base's src and on the tree at 7f92fce23)
- Entry JS: 211.2 KiB on the base → 212.2 KiB on the tree (+1.0), over its ceiling of 212. Entry CSS: 23.6 → 21.5 KiB (−2.1; the retired primitives' classes left).
- Where: the entry chunk index.js +0.8, overlay-facade +0.1, and layers.ts now a chunk of its own (0.1). The entry chunk carries the whole of dialog-look.ts: the sheet's edges, the phone sheet, the grabber, the footer, the field look and the close size are all in it. The module is in the entry twice over: app-header.tsx reads CONTROL_LOOK and SEARCH_FIELD from it (ruling 4), and dialog.tsx reads it, and dialog.tsx was already in the entry at the base through the root's step-up gate. The bundler then keeps in that chunk every export any page uses. Ruling 3's reason ("The constants live in src/components/ui/dialog-look.ts, for the reason you give (menu-row.ts rides every page)") does not hold: dialog-look.ts rides every page too, and dialog-look.ts's own comment saying its strings stay off pages that draw no dialog is wrong.
- An experiment, not committed: SHEET_PANEL and SHEET_SIDE moved into sheet.tsx takes the entry to 212.0 KiB (−0.2). Still over 212.
- Every page, base → tree (the entry plus the page's chunks; "needs" by DEC-296 with the local allowance: over its ceiling, or inside the 0.3 KiB band; "new" = ceilingForLocal(tree)). 50 pages; 39 lines move. /dev/style's +8.1 KiB is its new specimens (ruling 13): the sheet, the alert dialog, the radio group and the text area, drawn statically.

| page | base KiB | tree KiB | change | ceiling | needs | new ceiling |
|---|---|---|---|---|---|---|
| `/` | 225.7 | 226.7 | +1.0 | 227 | band | 228 |
| `/$name` | 224.1 | 225.1 | +1.0 | 225 | over | 226 |
| `/account` | 271.9 | 272.8 | +0.9 | 273 | band | 274 |
| `/account_/legal` | 213.8 | 214.8 | +1.0 | 215 | band | 216 |
| `/account_/legal_/$versionId` | 214.4 | 215.5 | +1.1 | 215 | over | 216 |
| `/account_/saved` | 224.2 | 225.1 | +0.9 | 225 | over | 226 |
| `/admin` | 212.1 | 213.1 | +1.0 | 213 | over | 214 |
| `/admin/` | 213.0 | 214.0 | +1.0 | 214 | over | 215 |
| `/admin/ai` | 340.1 | 340.8 | +0.7 | 341 | band | 342 |
| `/admin/attributes` | 353.4 | 354.1 | +0.7 | 354 | over | 355 |
| `/admin/audit` | 313.3 | 314.4 | +1.1 | 314 | over | 315 |
| `/admin/categories` | 361.4 | 362.1 | +0.7 | 362 | over | 363 |
| `/admin/countries` | 342.9 | 343.6 | +0.7 | 344 | — |  |
| `/admin/coverage` | 335.7 | 336.3 | +0.6 | 337 | — |  |
| `/admin/images` | 212.8 | 213.8 | +1.0 | 214 | band | 215 |
| `/admin/impersonation_/$sessionId` | 314.1 | 315.1 | +1.0 | 315 | over | 316 |
| `/admin/legal` | 282.4 | 283.1 | +0.7 | 283 | over | 284 |
| `/admin/legal_/$versionId` | 281.7 | 282.1 | +0.4 | 283 | — |  |
| `/admin/legal_/edit` | 287.3 | 287.7 | +0.4 | 288 | band | 289 |
| `/admin/listings` | 359.5 | 360.1 | +0.6 | 360 | over | 361 |
| `/admin/listings_/$listingId` | 384.2 | 384.7 | +0.5 | 385 | band | 386 |
| `/admin/listings_/$listingId_/edit` | 407.6 | 408.0 | +0.4 | 408 | over | 409 |
| `/admin/locations` | 273.8 | 274.8 | +1.0 | 275 | band | 276 |
| `/admin/places` | 344.5 | 345.1 | +0.6 | 345 | over | 346 |
| `/admin/roles` | 310.9 | 311.6 | +0.7 | 312 | — |  |
| `/admin/roles_/$roleId` | 312.0 | 312.7 | +0.7 | 313 | band | 314 |
| `/admin/screening` | 385.0 | 385.4 | +0.4 | 386 | — |  |
| `/admin/translations` | 417.0 | 417.6 | +0.6 | 418 | — |  |
| `/admin/translations_/$lang` | 326.1 | 326.7 | +0.6 | 327 | band | 328 |
| `/admin/users` | 309.9 | 310.9 | +1.0 | 311 | band | 312 |
| `/admin/users_/$userId` | 289.9 | 290.5 | +0.6 | 291 | — |  |
| `/auth` | 223.9 | 224.9 | +1.0 | 225 | band | 226 |
| `/auth_/callback` | 212.2 | 213.2 | +1.0 | 213 | over | 214 |
| `/auth_/reset` | 214.2 | 215.2 | +1.0 | 215 | over | 216 |
| `/c/$slug` | 225.7 | 226.7 | +1.0 | 227 | band | 228 |
| `/dev/primitives` | 227.2 | 228.3 | +1.1 | 228 | over | 229 |
| `/dev/style` | 247.7 | 255.8 | +8.1 | 249 | over | 257 |
| `/dev/tall` | 211.5 | 212.5 | +1.0 | 212 | over | 213 |
| `/l/$slug` | 255.0 | 255.9 | +0.9 | 256 | band | 257 |
| `/legal/$kind` | 215.8 | 216.8 | +1.0 | 217 | band | 218 |
| `/legal/accept` | 222.8 | 223.9 | +1.1 | 224 | band | 225 |
| `/legal/publishing` | 216.6 | 217.6 | +1.0 | 217 | over | 219 |
| `/my-listings` | 333.2 | 333.8 | +0.6 | 334 | band | 335 |
| `/my-listings_/$listingId` | 322.0 | 322.5 | +0.5 | 323 | — |  |
| `/my-listings_/$listingId_/edit` | 402.1 | 402.6 | +0.5 | 403 | — |  |
| `/post` | 402.1 | 402.6 | +0.5 | 403 | — |  |
| `/post_/$listingId` | 402.0 | 402.6 | +0.6 | 403 | — |  |
| `/privacy` | 215.8 | 216.8 | +1.0 | 217 | band | 218 |
| `/settings` | 277.5 | 278.5 | +1.0 | 278 | over | 279 |
| `/terms` | 215.8 | 216.8 | +1.0 | 217 | band | 218 |


A RED I MUST NAME: commit ff2de8377 (e2e/dialogs.spec.ts) is red on scripts/e2e-select.test.ts's self-test: "spec not reachable from any area: e2e/dialogs.spec.ts". The laws run before this stop found it (`bunx vitest run scripts --maxWorkers=2`: 2 failed, 405 passed; the other is NH-6, the macOS time-zone case CI proves). The fix is one line in scripts/e2e-select.ts, which S6-1's scope does not name: the spec joins the house-style area, whose sources are src/styles.css, src/routes/dev.style.tsx and src/components/ui/**. Typecheck is green, and lint has 0 errors.

THE BROWSER CHECK (`bun run e2e:local -- <files> --retries=0`, ethio-staging, both projects)
- e2e/dialogs.spec.ts whole: 12 passed.
- The G38 set, the 33 specs that name the changed dialogs' test ids: 1223 passed, 20 failed, 147 skipped (1.4 h). [ssr-error] 9: /api/admin/attributes/import 4 and /api/admin/categories/import 4 (the specs' planted bad header and wrong file); /api/listings/view 1 (a view counted for a listing the test had already removed: listing_counters' foreign key).
- 14 of the 20 (AL-20, AL-23, AL-30, SC-25, SC-26, MLA-13 and MLP-6, both projects): the specs clear a field with Control+A, which on macOS Chromium moves the caret to the line's start instead of selecting. The typed text lands before the old value: MLA-13 reads 90100 for 90 over 100; the titles read new + old; AL-30's "0" before 30 saves a valid count; MLP-6's search keeps one letter. CI on Linux is their proof (green at the base).
- AT-12 (both projects), PP-8 (both) and HM-3 fail the same way with the base's src: I wrote each changed src file's base version into the tree (`git show 04fee757:<path>`), ran them, and restored every file from HEAD (`git status` clean after).
- HM-2 fails on the base 2 runs of 3. Its cause and HM-3's, a finding: the language provider (src/i18n/provider.tsx:732) re-applies `<html dir>` from the applied catalog about 0.6 s after load (612 and 625 ms on the base, 617 ms on the tree), undoing the spec's `setAttribute("dir", "rtl")`; the specs race it. Not touched.

QUESTION — which do you rule?
1. Growth: (recommended) (a) accept it as measured: scripts/check-bundle-size.mjs joins the scope for its `js` line (212 → 213 = ceilingForLocal(212.2)), and scripts/route-budgets.mjs moves the 39 lines above, each with its cause. This keeps one home for the look (rulings 3 and 4). Or (b): (a), plus the sheet's constants move to a module of their own that only sheet.tsx reads (−0.2 measured; the entry still crosses 212). Or (c): take the dialog look off the first paint. That needs the step-up gate's dialog on demand and the top bar's two looks in their own module, a change to the root's step-up path (INC-124) that I would plan, not guess; not measured.
2. May scripts/e2e-select.ts join the scope for the one line that puts e2e/dialogs.spec.ts in the house-style area?
