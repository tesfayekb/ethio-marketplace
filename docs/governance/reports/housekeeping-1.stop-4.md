QUESTION — housekeeping-1 part B: the i18n split costs every page 0.8 → 1.4 KiB; six pages over
DONE: STEP 0, STEP 1, parts A + D, C, B (2b5f7dc6f, f1bbb43d1); rulings 1, 2, 3 saved
LEFT: the first-download table's verdict (below), STEP 6 (bun run checks), STEP 7, STEP 8
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `5c989b9466b0ea5b2b988582403345b4ff290457` (short `5c989b9`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-10T09:56:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42792144721
FILES:
docs/features/posting.md
docs/generated/i18n-usage.json
docs/governance/briefs/housekeeping-1-ruling-1.md
docs/governance/briefs/housekeeping-1-ruling-2.md
docs/governance/briefs/housekeeping-1-ruling-3.md
docs/governance/briefs/housekeeping-1.md
docs/governance/reports/housekeeping-1.stop-1.md
docs/governance/reports/housekeeping-1.stop-2.md
docs/governance/reports/housekeeping-1.stop-3.md
docs/governance/reports/housekeeping-1.stop-4.md
e2e/i18n-sign-in-language.spec.ts
package.json
public/i18n-usage.json
roadmap.md
scripts/ci/laws-changed.ts
scripts/ci/nightly-hour.sh
scripts/ci/nightly-hour.test.ts
scripts/ci/turn-checks.test.ts
scripts/ci/turn-checks.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/choice-lists.test.ts
scripts/conformance/overlays.test.ts
scripts/conformance/press.test.ts
scripts/conformance/visible-area.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
src/components/marketplace/feed.tsx
src/components/picker-popup.ts
src/components/searchable-picker.test.tsx
src/components/searchable-picker.tsx
src/components/shell/app-rail.tsx
src/components/shell/block-guide.tsx
src/components/shell/data-table.tsx
src/components/shell/favourite-category.ts
src/components/shell/rail-first-paint.test.tsx
src/components/shell/rail-variant.ts
src/components/shell/submenu/submenu-signal.ts
src/components/shell/theme-toggle.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/badge.tsx
src/components/ui/button-variants.ts
src/components/ui/button.tsx
src/components/ui/calendar.tsx
src/components/ui/choice-list-look.test.tsx
src/components/ui/dialog-look.test.tsx
src/components/ui/form.tsx
src/components/ui/keep-in-strip.ts
src/components/ui/one-line-slot.test.tsx
src/components/ui/one-line-slot.tsx
src/components/ui/overlay-ask.ts
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/pagination.tsx
src/components/ui/section-notice-state.ts
src/components/ui/section-notice.tsx
src/components/ui/slot-split.ts
src/components/ui/strip-arrows.tsx
src/components/ui/submenu-impl.tsx
src/components/ui/submenu-levels.ts
src/components/ui/toggle-group.tsx
src/components/ui/toggle-variants.ts
src/components/ui/toggle.tsx
src/features/ad-page/share-ad.tsx
src/features/ad-page/share-price-text.ts
src/features/admin-attributes/attribute-dialogs.tsx
src/features/admin-attributes/attribute-error.ts
src/features/admin-attributes/category-attributes-dialog.tsx
src/features/admin-categories/categories-page.tsx
src/features/admin-categories/category-dialogs.test.tsx
src/features/admin-categories/category-dialogs.tsx
src/features/admin-categories/category-form-fields.tsx
src/features/admin-categories/category-form-values.ts
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-categories/category-submit-error.ts
src/features/admin-countries/country-dialog-state.ts
src/features/admin-countries/country-dialogs.test.tsx
src/features/admin-countries/country-dialogs.tsx
src/features/admin-countries/country-editor.tsx
src/features/admin-countries/country-verb-dialogs.tsx
src/features/admin-listings/edit-listing.ts
src/features/admin-locations/location-dialog-state.ts
src/features/admin-locations/location-dialogs.tsx
src/features/admin-locations/location-editor.tsx
src/features/admin-locations/location-form-fields.tsx
src/features/admin-locations/location-form-values.ts
src/features/admin-locations/location-verb-dialogs.tsx
src/features/admin-locations/locations-service.test.ts
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/admin/admin-context.tsx
src/features/admin/admin-shell-provider.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listings-page.tsx
src/features/posting/amount-scale.ts
src/features/posting/edit-step-changes.ts
src/features/posting/field-refusals.ts
src/features/posting/field.test.ts
src/features/posting/field.tsx
src/features/posting/map/map-large.tsx
src/features/posting/map/map-preview.tsx
src/features/posting/map/map-snap.ts
src/features/posting/map/outline.test.ts
src/features/posting/phone-number-field.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/listing-section.ts
src/features/posting/preview/photo-gallery.tsx
src/features/posting/same-channels.test.ts
src/features/posting/same-channels.ts
src/features/posting/spec-sentences.ts
src/features/posting/step-details.tsx
src/features/posting/step-photos.tsx
src/features/posting/step-pricing.tsx
src/features/posting/step-review.tsx
src/features/posting/step-specifications.test.ts
src/features/posting/step-specifications.tsx
src/features/posting/step-who.test.tsx
src/features/posting/step-who.tsx
src/features/posting/wizard.tsx
src/i18n/i18n-context.ts
src/i18n/index.ts
src/i18n/provider-d239.test.tsx
src/i18n/provider-layers.test.tsx
src/i18n/provider.test.tsx
src/i18n/provider.tsx
src/providers/theme-context.ts
src/providers/theme-provider.tsx
src/routes/admin.tsx
src/routes/l.$slug.tsx
src/test/own-key-sites.test.ts

Base: dev 2b11a9d29 (`git fetch origin dev`, then `git rev-parse origin/dev`: 2b11a9d29…, dev did
not move). Ruling 3 is saved (1a4cb619c, sha256 21cc5954…dd9e equal to the carrier's).

## What is done (to ruling 3)

- Part B committed: 2b5f7dc6f `housekeeping-1: part B — the lint set comes clean (exports to
  modules)` (the moves, the guards, the selector and `snap` in one commit, ruling 3 point 6), then
  f1bbb43d1 `housekeeping-1: part B — the lint step fails on any warning` (package.json's `lint` is
  `eslint . --max-warnings 0`; planted bypass: an exported function appended to
  src/providers/theme-provider.tsx made `bun run lint` print `ESLint found too many warnings
  (maximum: 0).` and exit 1; the file restored, sha256 equal; clean `bun run lint` exit 0).
- `snap` (point 3, (a)): `src/features/posting/map/map-snap.ts`; map-preview.tsx and map-large.tsx
  import it; listing-detail.tsx imports it statically (the links effect no longer waits for
  `MAP_PREVIEW`, which keeps the component only; :79's comment lost "the pin snap share the one
  download"); the mock's `snap` entry left listing-detail-map.test.tsx.
- The three guards (point 1), each proven its own way:
  - press.test.ts :40 → two entries. Old entry on the tree: red (`button.tsx:1 the primitive lacks
    ${PRESSED.button}`); moved: green; planted removal of `${PRESSED.button}` from
    button-variants.ts: red (`button-variants.ts:1 the primitive lacks ${PRESSED.button}`),
    restored sha256 equal. Its planted fixture PRP-1 (:200) named button.tsx for the cva line; it
    now names button-variants.ts (the fixture follows the needle).
  - choice-lists.test.ts :53 → two owners. A finding beyond the stop-3 proposal, fixed inside the
    file the ruling gave: CF-LIST-1 read only `.tsx` twice (the tree walk's `ext: ["tsx"]` :224
    and `listFindings`' `if (!name.endsWith(".tsx")) continue;` :93), so the approved
    `"src/components/picker-popup.ts": /\bLIST_SURFACE\b/` line was never read — the planted
    removal of LIST_SURFACE from picker-popup.ts PASSED (shown twice, with the walk at `tsx` and
    with the walk widened). Fix: the walk reads `ts` and `tsx`, and the owner check runs before
    the `.tsx` filter (it read only the file's text; a `.tsx` owner is judged exactly as before,
    and every non-owner `.ts` file is still skipped, so the walk's JSX laws are unchanged: the
    widened tree has no new finding). Then: green; the same planted removal: red
    (`picker-popup.ts:1 owner: does not read menu-row.ts's list constants`), restored sha256 equal.
  - visible-area.test.ts :26 → picker-popup.ts. This guard has no needle in a file; its law is
    "only the readers import the module", so the plant is the import back in the OLD file:
    `import { visibleArea } from "@/lib/visible-area";` in searchable-picker.tsx: red
    (`searchable-picker.tsx:4 imports visible-area.ts outside its on-demand readers`), restored
    sha256 equal. Its fixture VA-3 (:118) named searchable-picker.tsx as a clean reader; it now
    names picker-popup.ts.
- The selector (point 2): the four lines; `bun scripts/e2e-select.ts --self-test`: `e2e-select
  self-test OK: every spec is reachable; every area glob matches.`
- docs/features/posting.md :1152 and :1125 (`CONTROL_LESS_FIELDS` in `field.tsx`, the same stale
  cell) name field-refusals.ts. `bun run i18n:usage`: `1864 keys across 708 files`; both maps
  changed by removals only (post.who.* and post.refusal.* left /admin/listings/$listingId and
  /admin/screening — edit-listing.ts no longer imports step-who.tsx; "/" and "/c/$slug" left five
  keys already marked "(every page)").
- On the tree at f1bbb43d1: `bun run typecheck` exit 0; `bun run lint` exit 0 (0 warnings);
  `bunx vitest run scripts --maxWorkers=2`: `Test Files 100 passed (100)`, `Tests 510 passed |
  1 skipped (511)`; `bunx vitest run src --maxWorkers=4`: `Test Files 359 passed (359)`, `Tests
  2361 passed (2361)`.

## The question — the first-download table (ruling 3 point 6, DEC-355)

`bun run build && node scripts/check-bundle-size.mjs` at f1bbb43d1 exits 1: six pages over their
ceiling and seven inside the NEAR band, every page up 0.8 → 1.4 KiB. The cause is one move, proven
by experiment: the i18n split (ruling 1's `i18n-context.ts`).

The entry closure every page carries, chunk by chunk (gzipped KiB; chunk names without hashes):

| chunk | base | head (Part B) | Part B without the i18n split |
|---|---|---|---|
| index.js (the entry) | 127.6 | 129.9 | 127.9 |
| provider.js | 16.3 | — | 16.3 |
| i18n-context.js | — | 12.8 | — |
| auth-result.js | — | 1.8 | — |
| on-demand-failure.js | — | 0.3 | — |
| entity.js | — | 0.2 | — |
| load-once.js | — | 0.1 | — |
| supabase-door.js | 1.9 | 1.8 | 1.9 |
| on-demand-notice.js | 0.9 | 1.0 | 0.9 |
| menu-current.js | 0.4 | — | — |
| JS total (the entry's budget line) | 211.9 / 215 | 212.8 / 215 | 211.8 / 215 |

Why: at the base every page's lazy chunks reached `src/i18n/provider.tsx` (for `useI18n`), so the
provider and its imports shared one chunk (`provider.js`, 16.3). After the split, the lazy chunks
reach only `i18n-context.ts`; the provider component is reached by the root alone and folds into the
entry, and the modules the provider shares with lazy pages (auth-result, on-demand-failure, entity,
load-once) become four chunks of their own. The bytes are the same code; the cost is the chunks'
own glue and their separate compression: +0.8 KiB on the closure (147.1 → 147.9), more on the posting
pages whose lazy chunks also re-link. The bundler's name `i18n-context.js` is the old `provider.js`
content (it opens with the first-paint English catalogue).

The experiment (x1): src/i18n/provider.tsx and src/i18n/index.ts written from `git show
2b11a9d29:<path>` (every other Part B change kept), built, measured, and both written back from
`git show HEAD:<path>` (`git status --short` empty after). Result: every page holds or falls
(−0.1 → −0.3 KiB), `/post` +0.1 (408.0 / 409), no page NEAR or over. menu-current.js (0.4) leaves the
closure in both trees (its module now reaches the entry through index.js, +0.3): the app-rail split.
The `/l/$slug` line holds the `snap` bytes (point 3): −0.1 KiB without the i18n split (the static
three-line function replaces the links' download branch), +1.1 with it.

One more thing x1 shows: `/admin/legal_/edit` falls to 283.9 / 292, which trips the ratchet
(`8 KiB or more under its ceiling of 292 KiB (ratchet: lower the ceiling to 287)`); at the base it
sat 7.9 under (284.1 / 292).

Page by page (gzipped KiB; base = my base build at 2b11a9d29; head = f1bbb43d1; x1 = head without
the i18n split; the ceiling as it stands):

| page | base | head | head − base | without the i18n split | − base | ceiling |
|---|---|---|---|---|---|---|
| / | 233.5 | 234.5 | +1.0 | 233.3 | -0.2 | 235 |
| /$name | 231.4 | 232.4 | +1.0 | 231.3 | -0.1 | 233 |
| /account | 274.6 | 275.6 | +1.0 | 274.4 | -0.2 | 277 |
| /account_/legal | 214.6 | 215.5 | +0.9 | 214.5 | -0.1 | 217 |
| /account_/legal_/$versionId | 215.2 | 216.1 | +0.9 | 215.1 | -0.1 | 218 |
| /account_/saved | 231.6 | 232.6 | +1.0 | 231.5 | -0.1 | 233 |
| /admin | 212.9 | 213.8 | +0.9 | 212.7 | -0.2 | 216 |
| /admin/ | 213.7 | 214.6 | +0.9 | 213.6 | -0.1 | 216 |
| /admin/ai | 326.5 | 327.5 | +1.0 | 326.3 | -0.2 | 329 |
| /admin/attributes | 339.8 | 340.8 | +1.0 | 339.6 | -0.2 | 342 |
| /admin/audit | 299.5 | 300.5 | +1.0 | 299.3 | -0.2 | 302 |
| /admin/categories | 347.9 | 348.8 | +0.9 | 347.6 | -0.3 | 350 |
| /admin/countries | 329.3 | 330.3 | +1.0 | 329.1 | -0.2 | 332 |
| /admin/images | 213.5 | 214.4 | +0.9 | 213.4 | -0.1 | 216 |
| /admin/impersonation_/$sessionId | 294.2 | 295.1 | +0.9 | 294.0 | -0.2 | 298 |
| /admin/legal | 285.1 | 286.0 | +0.9 | 284.9 | -0.2 | 288 |
| /admin/legal_/$versionId | 282.4 | 283.4 | +1.0 | 282.2 | -0.2 | 285 |
| /admin/legal_/edit | 284.1 | 285.0 | +0.9 | 283.9 | -0.2 | 292 |
| /admin/listings | 351.6 | 352.7 | +1.1 | 351.4 | -0.2 | 353 |
| /admin/listings_/$listingId | 353.2 | 354.2 | +1.0 | 353.0 | -0.2 | 354 |
| /admin/listings_/$listingId_/edit | 413.4 | 414.8 | +1.4 | 413.4 | 0.0 | 414 |
| /admin/locations | 273.7 | 274.5 | +0.8 | 273.5 | -0.2 | 276 |
| /admin/monetisation | 337.5 | 338.6 | +1.1 | 337.3 | -0.2 | 341 |
| /admin/places | 330.8 | 331.8 | +1.0 | 330.6 | -0.2 | 333 |
| /admin/roles | 296.2 | 297.2 | +1.0 | 296.0 | -0.2 | 299 |
| /admin/roles_/$roleId | 276.6 | 277.5 | +0.9 | 276.4 | -0.2 | 279 |
| /admin/screening | 372.6 | 373.7 | +1.1 | 372.4 | -0.2 | 374 |
| /admin/translations | 307.1 | 308.1 | +1.0 | 306.9 | -0.2 | 310 |
| /admin/translations_/$lang | 310.7 | 311.7 | +1.0 | 310.5 | -0.2 | 313 |
| /admin/users | 296.0 | 296.9 | +0.9 | 295.8 | -0.2 | 299 |
| /admin/users_/$userId | 291.3 | 292.2 | +0.9 | 291.1 | -0.2 | 294 |
| /auth | 229.6 | 230.6 | +1.0 | 229.5 | -0.1 | 231 |
| /auth_/callback | 216.1 | 217.0 | +0.9 | 215.9 | -0.2 | 217 |
| /auth_/reset | 218.0 | 219.0 | +1.0 | 217.9 | -0.1 | 219 |
| /c/$slug | 233.5 | 234.5 | +1.0 | 233.3 | -0.2 | 235 |
| /dev/primitives | 233.5 | 234.5 | +1.0 | 233.3 | -0.2 | 236 |
| /dev/style | 254.4 | 255.4 | +1.0 | 254.3 | -0.1 | 256 |
| /dev/tall | 212.2 | 213.2 | +1.0 | 212.1 | -0.1 | 215 |
| /l/$slug | 263.7 | 264.8 | +1.1 | 263.6 | -0.1 | 265 |
| /legal/$kind | 216.6 | 217.6 | +1.0 | 216.5 | -0.1 | 219 |
| /legal/accept | 223.6 | 224.6 | +1.0 | 223.5 | -0.1 | 226 |
| /legal/publishing | 217.4 | 218.3 | +0.9 | 217.3 | -0.1 | 220 |
| /my-listings | 321.8 | 322.9 | +1.1 | 321.7 | -0.1 | 323 |
| /my-listings_/$listingId | 329.8 | 330.9 | +1.1 | 329.7 | -0.1 | 331 |
| /my-listings_/$listingId_/edit | 408.0 | 409.3 | +1.3 | 408.0 | 0.0 | 409 |
| /post | 407.9 | 409.3 | +1.4 | 408.0 | +0.1 | 409 |
| /post_/$listingId | 407.9 | 409.3 | +1.4 | 407.9 | 0.0 | 409 |
| /privacy | 216.6 | 217.6 | +1.0 | 216.5 | -0.1 | 219 |
| /settings | 283.2 | 284.2 | +1.0 | 283.1 | -0.1 | 284 |
| /terms | 216.6 | 217.6 | +1.0 | 216.5 | -0.1 | 219 |

The pages the head build puts over or inside the band (budget-band.mjs's own rule, local allowance
0.1): OVER `/admin/listings_/$listingId` 354.2 / 354, `/admin/listings_/$listingId_/edit` 414.8 /
414, `/my-listings_/$listingId_/edit` 409.3 / 409, `/post` 409.3 / 409, `/post_/$listingId` 409.3 /
409, `/settings` 284.2 / 284; NEAR `/admin/listings` 352.7 / 353, `/admin/screening` 373.7 / 374,
`/auth_/callback` 217.0 / 217, `/auth_/reset` 219.0 / 219, `/l/$slug` 264.8 / 265, `/my-listings`
322.9 / 323, `/my-listings_/$listingId` 330.9 / 331. Base and x1: none.

Why this is a STOP: the growth has a named cause, but closing it is not mine to choose. Moving the
thirteen lines means `scripts/route-budgets.mjs`, outside this lane's SCOPE, and DEC-361 (this
turn's own record) moves a ceiling "only after CI has measured it". Undoing the split changes a ruled
module (ruling 1 Q9's list, `i18n-context.ts`). A bundler chunk rule is `vite.config.ts`, outside
scope too.

Options:

- (a) Recommended. Keep the visitor's kilobytes: the i18n split leaves this turn. provider.tsx and
  index.ts return to the base; `i18n-context.ts` is not created; provider.tsx's three exports
  (`readDeviceStar` :82, `useI18n` :801, `useStringsLayers` :815) keep their
  `react-refresh/only-export-components` warnings as the one site that resisted (the brief's
  TOLERANCES: "or it STOPS and says which site resisted and why"). The lint script then cannot be
  `--max-warnings 0` this turn unless the ruling records those sites in a form the lint accepts: one
  `eslint-disable-next-line react-refresh/only-export-components -- <the measured cost>` per export
  (against Q14's "no disable left"), or `--max-warnings 3` with the three named (a number that only
  falls). `/admin/legal_/edit`'s ceiling then wants the ratchet's 287 (route-budgets.mjs, a saving
  lowers it) — in this lane by ruling, or CI judges first.
- (b) Keep the split and pay it: the thirteen lines move by DEC-296's form after CI measures this
  pull request (DEC-361), in this lane by a ruling that widens the scope to route-budgets.mjs, or in
  a records/budget turn; the cause on each line: "housekeeping-1 part B: the i18n hooks leave
  provider.tsx; the provider's shared imports split into four chunks". Every visitor pays
  0.8 → 1.4 KiB on every page.
- (c) Keep the split and give the bundler a chunk rule that keeps the provider with its shared
  imports (`vite.config.ts`, a build-config change: its own turn); this lane takes (a) or (b) until
  then.
- Refused, named only: an import of `./provider` from `i18n-context.ts` to drag the lazy pages back
  onto the provider (a cycle kept for the bundler's sake).

The tree is committed and green-shaped (typecheck, lint, both unit suites); the budget check is the
one red, and only locally measured. The base and head budget captures are
/tmp/ethio-scratch/housekeeping-1/budget-base.txt, budget-head.txt and budget-x1.txt (with the build
logs build-head.txt and build-x1.txt beside them).
