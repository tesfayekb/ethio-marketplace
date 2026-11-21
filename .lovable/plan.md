# Lovable bundle 2 — one panel anatomy (INC-1146, DEC-418/419/420) — PLAN

Branch `lovable/next`, base `63d6bee0d` (the sandbox head equals the base; no change since). Read-only census at the base. No build was run: plan mode forbids it, so the first-download numbers come in build turn 0 (see d, f).

## (a) Census — 65 panels in 50 files

**Count at the base:** 13 `DialogContent`, 12 `AlertDialogContent`, 3 `SheetContent` and **37** `CategoryModal` = 65. The brief's 24 for `CategoryModal` does not add up to 65 (see f). Tests, the four primitives and `dev.style` are left out of the count.

**Columns:** desc / foot / scr = whether the panel has a description part, a footer part, and its own scroller (from a read of the panel's lines; I check each one again before its edit).
- Size: N = narrow, D = default, W = wide, S = screen. Every panel is D today unless marked.
- **Target** is the size it takes in Part C.
- **Hint** = a hint paragraph sits in the body today; it moves into the description slot with its key kept.
- "Bypasses" lists which of the Part A parts the panel lacks today. All 65 USE the house frame (scrim, panel, close, title). None uses the subject, the body scroller, the scroll cue, steps, action rows or the closed primary, because those parts do not exist yet.

| # | file:line | kind | today, then target | desc/foot/scr | subject the opener already holds | bypasses |
|---|---|---|---|---|---|---|
| 1 | components/shell/guide-sheet.tsx:79 | viewer (sheet end) | end | -/-/- | none | description (exception: the guide's text is the content) |
| 2 | components/shell/toolbar-panel.tsx:80 | table panel (sheet bottom) | bottom | -/-/- | none | description, footer, filter parts |
| 3 | ad-page/report-ad-dialog.tsx:62 | form | D | y/y/- | the ad (title, cover) | subject |
| 4 | ad-page/share-ad.tsx:117 | action list | D, phone sheet | -/-/- | the ad (title, cover, price) | description, subject, action rows |
| 5 | admin-ai/ai-editor.tsx:59 | form (CM) | D | -/-/- | the task name | description, footer |
| 6 | admin-attributes/attribute-dialogs.tsx:327 | form (CM) | D | -/-/- | the attribute (edit) | description, footer |
| 7 | :658 delete | warning (CM) | D then N | hint/-/- | the attribute | description slot, footer, tone |
| 8 | :760 merge | form (CM) | D | hint/-/own | two attributes | description slot, footer, own scroller |
| 9 | :926 assign | form (CM) | D | hint/-/- | the attribute | description slot, footer |
| 10 | :1037 remove | question (CM) | D then N | hint/-/- | the attribute | footer, tone |
| 11 | admin-attributes/category-attributes-dialog.tsx:227 | form (CM) | D then W | -/-/- | the category | description, footer |
| 12 | admin-categories/category-dialogs.tsx:273 edit/create | form (CM) | D | -/-/- | the category (edit) | description, footer (the operator's "Edit category after create") |
| 13 | :482 window | form (CM) | D | hint/-/- | the category | description slot, footer |
| 14 | :574 exclusions | form (CM) | D | hint/-/own | the category | description slot, footer, own scroller |
| 15 | :669 retire | warning (CM) | N | hint/-/- | the category | footer, tone |
| 16 | :763 pointer | form (CM) | D | hint/-/- | the category | description slot, footer |
| 17 | :863 paths | form (CM) | D | hint/-/- | the category | description slot, footer |
| 18 | :1070 delete | warning (CM) | N | hint/-/- | the category | footer, tone |
| 19 | admin-categories/category-image-dialog.tsx:324 | form (CM) | D | -/-/- | the category, its current picture | description, footer, subject |
| 20 | admin-countries/country-editor.tsx:84 | form (CM) | D | -/-/- | the country | description, footer |
| 21 | admin-countries/country-verb-dialogs.tsx:64 open/close | question (CM) | N | hint/-/- | the country | description slot, footer, tone |
| 22 | :177 rail | form (CM) | D | hint/y/- | the country | description slot |
| 23 | admin-listings/listing-page.tsx:931 view as | question (CM) | N | -/-/- | the ad's title | description, footer, subject |
| 24 | admin-listings/listing-photos.tsx:314 photo remove | warning (CM) | N | hint/y/- | the photo | description slot, tone, subject |
| 25 | admin-listings/listing-settings.tsx:129 | form (CM) | D | body/-/- | the ad | description slot, footer |
| 26 | admin-listings/listings-page.tsx:911 view as | question (CM) | N | -/-/- | the row's title | description, footer, subject |
| 27 | admin-listings/move-dialog.tsx:64 | form (CM) | D | -/y/- | count and the first three titles | description, subject |
| 28 | admin-listings/tier-dialog.tsx:60 | form (CM) | D | hint/-/- | the ad(s) | description slot, footer |
| 29 | admin-listings/undo-dialog.tsx:35 | question (CM) | N | hint/y/- | the batch | description slot, tone |
| 30 | admin-locations/location-dialogs.tsx:162 create | form (CM) | D | -/-/- | the parent place | description, footer |
| 31 | admin-locations/location-editor.tsx:96 | form (CM) | D | -/-/- | the place | description, footer |
| 32 | admin-locations/location-verb-dialogs.tsx:67 active | question (CM) | N | -/-/- | the place | description, footer, tone |
| 33 | :147 move | form (CM) | D | -/-/- | the place | description, footer |
| 34 | :264 reorder | form (CM) | D | hint/-/- | the parent place | description slot, footer |
| 35 | :358 delete | warning (CM) | N | hint/-/- | the place | footer, tone |
| 36 | admin-monetisation/market-dialog.tsx:102 | form (CM) | D | -/-/- | the market (edit) | description, footer |
| 37 | admin-monetisation/override-dialog.tsx:132 | form (CM) | D | -/-/- | the level | description, footer |
| 38 | admin-monetisation/price-dialog.tsx:121 | form (CM) | D | -/-/- | the product | description, footer |
| 39 | admin-monetisation/price-end-dialog.tsx:56 | question (CM) | N | body/-/- | the price | description slot, footer, tone |
| 40 | admin-monetisation/product-editor.tsx:173 | form (CM) | D | -/-/- | the product (edit) | description, footer |
| 41 | admin-screening/name-checks.tsx:300 | question (alert) | N | y/y/- | the seller name (text) | tone, subject |
| 42 | admin-screening/screening-page.tsx:729 | question (alert) | N | -/y/- | row(s): title, price, place; pictures only for the previewed row (see f) | description, tone, subject (operator named) |
| 43 | admin/import-dialog.tsx:440 | steps (CM) | D then W | -/-/- | the console's name | description, footer, steps |
| 44 | admin/legal/legal-editor-form.tsx:393 discard | warning (alert) | N | y/y/- | the version | tone |
| 45 | admin/legal/legal-page.tsx:415 review | viewer (dialog) | W | y/y/- | the version | none |
| 46 | admin/legal/legal-publish-dialog.tsx:56 | question (dialog) | N | y/-/- | the version | footer, tone |
| 47 | admin/translations/ai-bulk-bar.tsx:347 | question (alert) | N | y/y/- | the count of keys | tone |
| 48 | admin/translations/approve-bar.tsx:145 | question (alert) | N | y/y/- | the count | tone |
| 49 | admin/translations/delete-language-dialog.tsx:95 | warning (alert) | N | y/y/- | the language | tone, subject |
| 50 | admin/translations/history-drawer.tsx:127 | viewer (sheet end) | end | y/-/- | the key | none (no footer by kind) |
| 51 | admin/translations/pseudo-bar.tsx:112 | question (alert) | N | y/y/- | none | tone |
| 52 | auth/mfa/step-up-dialog.tsx:69 | form (dialog, top layer) | N | y/y/- | none | REPORT ONLY (Cursor's) |
| 53 | legal/certify-confirm.tsx:67 | question (alert) | N | y/y/own | the ad | tone, own scroller |
| 54 | my-listings/my-listing-page.tsx:811 | question/warning (alert) | N | y/y/- | the ad | tone, subject |
| 55 | my-listings/my-listings-page.tsx:884 | question/warning (alert) | N | y/y/- | the ad / count | tone, subject |
| 56 | my-listings/promote-sheet.tsx:99 | form (dialog, phone sheet) | D | y/-/- | the ad | footer, subject |
| 57 | posting/background-dialog.tsx:158 | form (dialog) | D | y/y/- | the cover photo | subject |
| 58 | posting/category-move-dialog.tsx:38 | question (alert) | N | y/y/- | the two categories | tone |
| 59 | posting/map/map-pin-dropper.tsx:117 | viewer/form (full on phone) | W | -/-/- | the place | description (exception: the map fills it; its title says what to do) |
| 60 | posting/photo-editor.tsx:240 | form (dialog) | W | y/-/- | the photo | footer |
| 61 | posting/preview/listing-detail.tsx:1301 map | viewer | W | -/-/- | the place | description (exception: viewer) |
| 62 | :1372 open in maps | action list | N | -/y/- | the place name | description, action rows |
| 63 | posting/preview/photo-gallery.tsx:373 | viewer (screen) | S | -/-/- | the photos | description (exception: viewer) |
| 64 | posting/preview/preview-sheet.tsx:46 | viewer (screen) | S | -/-/- | the ad | description (exception: the preview is the content) |
| 65 | routes/admin.listings_.$listingId_.edit.tsx:129 | question (alert) | N | -/y/- | the ad's title, price, place | description, tone, subject |

CM = through `CategoryModal`, which has no description, no footer part and one size. Panels with their own scroller at the base: 8, 14, 53, plus the scrollers that live in the primitive itself (`DIALOG_FIT.bounded`, the three `SHEET_SIDE` values, `SCREEN_PANEL`). Each row's scroller is checked again before its edit; the brief's count of 6 is confirmed or corrected then.

## (b) The words (English only; the supervisor sends the Amharic)

**Kept and moved into the description slot, key and value unchanged:**
- Attributes: `admin.attributes.{delete,merge,assign}.hint`
- Categories: `admin.categories.{window,exclusions,retire,pointer,paths,delete}.hint`
- Countries: `admin.countries.close.scopedHint`, `admin.countries.rail.hintDialog`
- Listings: `admin.listings.photos.hint`, `admin.listings.settings.body`, `admin.listings.level.hint`, `admin.listings.undo.hint`
- Locations: `admin.locations.{reorder,delete}.hint`
- Packages: `admin.packages.prices.end.body`

**New, base layer:**
- `dialog.moreBelow` "More below"
- `adPage.share.description` "Send this ad's link in an app, or copy it."
- `adPage.map.openDescription` "Open this place in a maps app."

**New, admin layer:**
- `admin.ai.edit.description` "Change how this task calls the model. Save applies it to every later call."
- `admin.attributes.edit.description` "Name the attribute and choose its kind. Save keeps it for every category that uses it."
- `admin.categories.attributes.description` "Choose the attributes this category asks for. Save keeps the list."
- `admin.categories.edit.description` "Name the category and choose its place in the tree. Save keeps it."
- `admin.categories.image.description` "Choose this category's picture. Save shows it wherever the category appears."
- `admin.countries.edit.description` "Change this country's names and settings. Save keeps them."
- `admin.listings.viewAs.description` "See this ad as its seller sees it. Nothing changes."
- `admin.listings.move.description` "Choose the category these ads move to. Move changes them all."
- `admin.locations.create.description` "Name the place and choose where it sits. Add puts it in the list."
- `admin.locations.edit.description` "Change this place's names. Save keeps them."
- `admin.locations.active.descriptionRetire` "Retire keeps this place out of new ads."
- `admin.locations.active.descriptionActivate` "Open makes this place available for new ads."
- `admin.locations.move.description` "Choose the place this one moves under. Move changes its path."
- `admin.monetisation.market.description` "Set this market's prices and currency. Save keeps them."
- `admin.monetisation.override.description` "Set this level's own terms. Save keeps them."
- `admin.monetisation.price.description` "Set this product's price. Save keeps it."
- `admin.packages.product.description` "Name the product and set its terms. Save keeps it."
- `admin.import.description` "Choose a file and check it. Nothing changes until you confirm the import."
- `admin.screening.confirm.descriptionApprove` "The seller sees the ad as live."
- `admin.screening.confirm.descriptionReject` "The seller sees why the ad stays off the site."
- Two more admin keys, the Filters and Columns descriptions; see the table-panel words below.

**Dialogs left without a description, each with its reason (in a code comment and in the census):** the guide sheet, the pin map, the ad's map viewer, the photo viewer and the preview screen.

**Board-only words** go in the `dev.style` route's own layer. That layer's location is confirmed in turn 0, and each board key is listed for Amharic then.

**Filter parts:** I reuse existing words wherever they exist (search, from, to, all). Any word missing is listed for Amharic in turn 0.

**Table panels:**
- The Filters panel's description: `admin.table.filters.description` "Narrow the list. It changes as you choose."
- The Columns panel's description: `admin.table.columns.description` "Choose the columns this table shows."
- Their layer is admin if only staff tables draw them. The strings-layer census decides this in turn 0.

**Key census:** every changed file keeps every key it draws, except the moves listed above. No key is retired.

## (c) Tests

**Made false (each assertion's new value is pasted at the turn that changes it):**
- `e2e/dialogs.spec.ts` `expectPanel`, around lines 113-126:
  - padding `22px 24px` becomes the band and body paddings;
  - the surface `--popover` becomes `--background` for the body and `--card` for the bands;
  - the shadow stays `--lift-dialog`.
- `expectFooterRule`, around :146: the footer's `--lift-rule-top` becomes the band shadow token.
- `expectHeading`, around :133-140: the description is now required on every panel except the named exceptions.
- DLG-E3: the sheet's own scroller moves to the body.
- DLG-E7: Share, with its subject and action rows.
- `src/components/ui/dialog-look.test.tsx` DG-U1 and DG-U5: the panel classes; `overflow-y-auto` moves off the panel and onto the body.
- `e2e/overlays.spec.ts`: OVE-4 reads `data-dialog-panel` and keeps it (true as is).
- `e2e/house-style.spec.ts`: its ring helper reads controls, not panels (expected unchanged; confirmed in turn A).
- Consumer unit tests that read class names (HS-16, PSH-1/2, GAL-1/4, PMD-1) are re-read at their turn.

**New unit tests, ids from the supervisor:**
- header band (tone, icon, description, the grabber inside the band);
- subject (draws text only; markup typed into a title appears as text);
- body as the only scroller;
- scroll cue (shown while there is more below, gone at the end, a 44 px button, the press scrolls about one screen, no other button changes);
- closed primary (never `disabled`; a press marks the missing field and scrolls to it);
- step track;
- action row;
- size classes;
- `CategoryModal` with size, description, tone, subject and footer;
- filter row, filter select (searchable, opens inside `visibleArea()`), filter text, filter dates;
- focus: a red primary never takes the focus when its dialog opens.

No test id is renamed or removed. A spec outside the three named specs is edited only at a line the ruling names.

## (d) First download

The look module (`dialog-look.ts`) is already on every page that draws a field, through `DIALOG_FIELD` in `input.tsx`, `textarea.tsx` and `native-select.tsx`. Any bytes added there land on `/l/$slug`, which bundle 1 measured at 248.8 KiB against its 250 ceiling.

So:
- Only class-name constants are added to `dialog-look.ts`, as few as possible.
- The parts' components (header band, subject, body with its cue, steps, action row, closed primary) live in one new module, `src/components/ui/dialog-parts.tsx`. It is imported only by the primitives' content parts, which arrive on demand through the overlay loader, and by on-demand consumers.
- The filter parts are four new files under `src/components/shell/` (filter-row, filter-select, filter-text, filter-dates), imported only by `dev.style` in this bundle.
- Turn 0 runs `bun run build`, `dist/.chunk-modules.json` and `check-bundle-size`, and pastes every page's number before and after, with the chunk of each new module. A change to the imports of the `index` or `shared-shell` chunk is a STOP.

## (e) Outside my reach (for Cursor or the supervisor)

- **CF-DIALOG-1 laws for the new parts** (the body is the only scroller; a description or a stated reason; a red primary not taking focus; `CategoryModal` parts through the primitive), in `scripts/conformance/dialogs.test.ts`. K3 wants this guard in the same landing (see f).
- **Register rows 88 and 89** in `docs/governance/mechanisms.md`: a ledger, the supervisor's.
- **`e2e/helpers/shadows.ts`**, only if the band shadow needs a new layer parser.
- **`src/features/auth/mfa/step-up-dialog.tsx`:** it takes the frame through the primitive; its differences are reported after Part A.
- **`scripts/route-budgets.mjs`** ceiling lines and stale `dialogs-allowlist.txt` lines: at the end, supplied by the supervisor.
- **The filter parts' wiring** to pages, and the doors and specs behind it: Cursor's bundle.

## (f) Conflicts and things found wrong at the base

1. `CategoryModal` is used 37 times at the base, not 24. With 13 + 12 + 3 + 37 = 65 the brief's total is right; its breakdown is not.
2. **Screening subject:** the queue row holds title, price and place, but no pictures. Pictures are read only for the previewed row (`useScreeningPhotos(previewRow?.id)`, `screening-page.tsx:177`). Under "no new read", the subject shows the first pictures only when the decision is on the previewed row. Otherwise it shows title, price and place, with the category picture (`nearestCategoryPicture`, already loaded) as the tile. A ruling is needed.
3. **K3 against the scope:** a new part's guard lives in `scripts/**`, which is Cursor's. I land the unit tests; the guard law is named in (e) for Cursor's bundle.
4. **The closed primary:** the posting wizard's closed Next is a local mechanism (`src/features/posting/wizard.tsx:224`, `:266`, `:1343`). A shared `ClosedPrimary` makes two until the wizard moves onto it. Reported under K2; the wizard is unchanged in this bundle unless the ruling says otherwise.
5. **First-download numbers:** plan mode does not allow a build, so the numbers come in turn 0 before any edit.
6. **"Edit category" after a create:** its style is fixed with every other `CategoryModal`. The second sign-in dialog from bundle 1 (`isStepUpFresh`) stays with Cursor.
7. **`dev.style`:** bundle 1 kept it as "report only"; this brief names it for the board, and I take this brief as the authority.

## (g) Build order

0. **Census turn:** the base build and first-download table, the strings-layer location for the board words and the filter words, and a re-read of each panel's scroller. No code.
1. **Part A:** the class constants in `dialog-look.ts`; `dialog-parts.tsx`; the three primitives and `CategoryModal` (new props, optional, so all 65 consumers stay as they are); the four filter parts. Leaves green: unit tests, the DG-U tests updated, typecheck, lint on the touched files.
2. **Part B:** the board on `/dev/style`, light and dark, every archetype. Then STOP for the operator's look at 360, 768 and 1280.
3. **Part C, in three turns:**
   - (i) the ad page and posting: rows 3, 4, 53-65;
   - (ii) the staff consoles' `CategoryModal` rows 5-40;
   - (iii) screening, legal, translations and listings: rows 41-51.
   - Each turn leaves its consumers' tests green.
4. **Part D:** the three specs, assertion by assertion; then the end checks, the i18n maps, the write-back from `63d6bee0d`, and `git diff --name-only 63d6bee0d`.
