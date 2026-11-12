STOP — pictures STEP 1: the census (the brief's planned stop, PLAN FIRST)
DONE: STEP 0 (brief saved, sha256 equal; roadmap line 3; briefs allowlist; check-go; draft PR #37), STEP 1 (the census below)
LEFT: parts A, B, C, D (STEPS 2–8)
CI: the base's evidence (origin/ci-evidence `docs/tracking/ci-status.md`, first six lines, read 2026-11-12 ~16:20 New York):
  # CI Status (auto-generated — do not edit by hand)
  - Commit: `6457836f3ed9d73fcb74a60866fb63de907be825` (short `6457836`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-12T19:06:45Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43282804733
  Two-step check: the evidence names 6457836f3; dev's tip 50783a30e (PR #36's merge) is STALE there (its run 43305919223 was queued when read). PR #37's run on 77cdacf62 (`pictures: task saved`): every guard job passed; the E2E lanes were pending when read.
FILES: (`git diff --name-only 50783a30e` plus the untracked evidence this stop commits)
  docs/governance/briefs/pictures.md
  roadmap.md
  scripts/conformance/briefs-allowlist.txt
  docs/governance/reports/pictures.stop-1.md
  docs/governance/reports/pictures/measurements-50783a30e-desktop-1280.json
  docs/governance/reports/pictures/measurements-50783a30e-webkit-1280.json
  docs/governance/reports/pictures/pictures-repro.spec.ts.txt
  docs/governance/reports/pictures/playwright.pictures-repro.config.ts.txt

## Base

The brief: `Base: dev 6457836f3 (… after PR #36 merges, its tip …)`. PR #36 merged at 2026-11-12T21:00:34Z as
50783a30e; the lane began there (`git switch -c cursor/pictures origin/dev` → 50783a30e). `git diff --name-only
6457836f3..50783a30e` is PR #36's investigation files plus `roadmap.md` and `scripts/conformance/briefs-allowlist.txt`;
the brief's STEP 0 edits both relative to the post-#36 state, so no anchor moved; no file under `src/`, `e2e/`,
`scripts/` (but the allowlist) or `.github/` changed. Every line number below is on 50783a30e (= 6457836f3 for code).
The briefs allowlist's one line (`docs/governance/briefs/investigation-photos.md:1 carries no STEP 1`) was REMOVED:
PR #36 has merged. `bun scripts/brief/check-go.ts docs/governance/briefs/pictures.md` → `[check-go] no finding`.

## CENSUS-ITEM environments — THE REPRODUCTION (red first)

Run: `REPRO_TAG=50783a30e bun run e2e:local -- --config=playwright.pictures-repro.config.ts e2e/pictures-repro.spec.ts
--project=webkit-1280 --project=desktop-1280 --retries=0` → `2 passed` (a measuring spec, no assertion). The spec and
its wrapper config were temporary, never committed; their text is kept beside this report
(`pictures/pictures-repro.spec.ts.txt`, `pictures/playwright.pictures-repro.config.ts.txt`; built from the
investigation's `investigation-photos.spec.ts.txt`). WebKit: Playwright 1.58.1's own `webkit-2248` (WebKit 26.0), fetched
by `bunx playwright install webkit`; `bun.lock` and `package.json` unchanged. One scratch seller, three ads: a portrait
photo (encoder shapes, card 360×480), a landscape photo (card 480×360), and no photo under a category whose picture is a
SQUARE 512×512 PNG. Full rows: `pictures/measurements-50783a30e-{webkit,desktop}-1280.json`.

| screen @ width | picture | natural | WebKit drawn / frame | Chromium drawn / frame |
| --- | --- | --- | --- | --- |
| My listings @1280 (table form) | category | 512×512 | **60×512** / 60×60 | 60×60 / 60×60 |
| My listings @1280 (table form) | portrait photo | 360×480 | **80×480** / 80×60 | 80×60 / 80×60 |
| My listings @1280 (table form) | landscape photo | 480×360 | **80×360** / 80×60 | 80×60 / 80×60 |
| My listings @1280 + the candidate form injected | all three | — | 60×60, 80×60, 80×60 — fit | fit |
| My listings @1024 (card form, `ul` grid) | all three | — | 60×60, 80×60, 80×60 — fit | fit |
| home feed @1280 (cards) | all three | — | fit (139.2×139.2, 185.6×139.2 ×2) | fit |
| ad page, portrait @1280 (`gallery-main`) | photo | 432×576 | 561.6×450 / 561.6×450 — fit | 561.6×451.8 — fit |
| ad page, no photo @1280 (`listing-detail-illustration`) | category | 512×512 | 320×240 / 320×240 — fit | fit |

INC-1121 is reproduced exactly in the operator's shape (frame's width × the image's NATURAL height; the frame itself is
correct: `frameWithinPicture: true` everywhere). Each failing image's ancestor chain (recorded) is
`div:block < div:flex < div:block < div:block < span:block < td:table-cell < tr:table-row < tbody < table`;
the fitting rows at 1024 run through `div:flex < li:list-item < ul:grid`.

**Premise corrected (G3).** The brief's cause — "a frame whose height comes only from `aspect-ratio` or from
`height: 100%` of an absolutely positioned flex item — a layout WebKit does not resolve the way Blink does" — is not what
the measurements show: the same ListingPicture structure fits in WebKit on the feed cards and the ad page, and the frames
resolve correctly even in the table. The defect needs a TABLE CELL among the ancestors: My listings draws a real
`<table>` at and above `cardUntil="xl"` (`src/features/my-listings/my-listings-page.tsx` :702; the picture cell :552,
`picture(row)` :238 → :253), which is why it showed "at large widths" only. The decisive line is
`src/components/marketplace/listing-picture.tsx` :222 — the in-flow `img` with `block h-full w-full`: its percentage
height (CSS 2.1 §10.5: a percentage height resolves against the containing block's height only when that height is
specified explicitly; otherwise it computes to `auto`) is resolved by WebKit's table-cell rule — under a cell whose
height is not yet fixed, a replaced element's percentage height falls back to its intrinsic height — while Blink resolves it
against the frame's definite height. :188 → :191 (`frameStyle`) is not at fault. The candidate form —
`position: absolute; inset: 0; width: 100%; height: 100%` on the img inside the `relative` frame (an absolutely positioned
box's percentage height resolves against its containing block's padding box, which is always definite, CSS 2.1 §10.5
and CSS Position 3 §4.1) — injected as a style on the base, fits all three in WebKit inside the table cell (table row 4).
Every other picture screen measured (feed, gallery, illustration) fits in WebKit today.

SSR: ListingPicture renders on the server for the feed's first page and the ad page; the Part A form changes classes only
(no measurement, no effect), so server and client markup stay equal; the `onError` branch is client-only state that
starts `false` on both.

## CENSUS-ITEM mechanisms

- `listing-picture.tsx` read whole (255 lines). The box (:194–200): `@container relative aspect-4/3 w-full`, capped
  `max-w-80` unless `fill`. The clip layer (:201): `absolute inset-0 flex items-center justify-center overflow-hidden`.
  The frame (:202–206): `@container relative overflow-hidden` with `frameStyle` (:188–191): `{ width: 100%, height: 100% }`
  for no source or a cropped photo, else `{ aspectRatio: ratio, width: min(100cqw, 75·ratio cqw) }`. The image (:208–223):
  in flow, `block h-full w-full object-cover|object-contain`, `onLoad` sets the ratio for a whole picture. No error
  branch: a failed load leaves an empty frame (the brief's lens, confirmed). The ribbon's caps (:240–249) reuse
  `frameStyle` on a copy of the frame.
- `e2e/helpers/photos.ts` `madeJpeg` (:54) makes any size in memory (jpeg-js); the category bucket refuses JPEG — the
  investigation used a PNG (pngjs), so the helper needs a PNG maker beside it for the square and 4:3 illustrations.
- The investigation's measuring spec: `docs/governance/reports/investigation-photos/investigation-photos.spec.ts.txt`
  (its `measure` is the helper's starting point; this census reused it).
- `scripts/ci/install-browser-deps.sh` :154 `bunx playwright install-deps chromium` (one place; DEC-366's probe wraps
  it). Lanes: `.github/workflows/local-backend-proof.yml` :718–724 the cache (`~/.cache/ms-playwright`, key
  `playwright-${{ runner.os }}-${{ steps.pw.outputs.version }}`), :730–734 the system libraries, :735–739
  `bunx playwright install chromium`; runner `ubuntu-24.04`. Lane commands: :759 smoke, :762 repeat
  (`--project=mobile-360 --project=desktop-1280`), :766 numbered (`--shard=N/16`); the repeat planner counts tests on
  `--project=mobile-360` only (:252, :256–262). A second consumer of the install script: `.github/workflows/flake-check.yml`
  :89 (outside scope).
- Playwright 1.58.1 (`package.json` :97; `node_modules/playwright-core/browsers.json` webkit revision 2248). The version
  stays.

## CENSUS-ITEM consumers

Raw `img` (14, count from `rg -n "<img\b" src --glob '!*.test.*' | grep -vc listing-picture.tsx` → 14; every line
equals the brief's):

| site | what | how it sizes itself |
| --- | --- | --- |
| `src/features/admin-screening/photo-changes.tsx` :135 | staff photo-change thumb | `h-12 w-16` box, img `h-full w-full object-cover` |
| `src/features/admin-screening/photo-reviews.tsx` :145 | staff photo-review thumb | same as above |
| `src/routes/settings.tsx` :731 | the two-step sign-in QR (`mfa-qr`, a data URL) | img `h-[200px] w-[200px]`, padded, bordered |
| `src/features/ad-page/share-ad.tsx` :196 | the ad's QR (`/l/<id>/qr.svg`) | attributes 192×192 only, no class |
| `src/features/admin-listings/listing-photos.tsx` :189 | staff photo grid tile | `relative aspect-[4/3]` box, img `h-full w-full object-cover` |
| `src/features/admin-listings/listing-photos.tsx` :323 | the Remove dialog's photo | img `max-h-48 w-auto max-w-full object-contain` |
| `src/features/posting/preview/photo-gallery.tsx` :155 | the gallery's main photo | button `flex aspect-[4/3] w-full` (fill: `@min-[32rem]:min-h-full`), img `h-full w-full object-contain @min-[32rem]:object-top`, `srcSet` :157 / `sizes` :158 |
| `src/features/posting/preview/photo-gallery.tsx` :321 | gallery thumbnails | button `h-12 w-16`, img `h-full w-full object-cover` |
| `src/features/posting/preview/photo-gallery.tsx` :395 | the full-screen viewer | flex item `min-h-0 flex-1`, img `max-h-full max-w-full object-contain`, zoom `scale-200` |
| `src/features/posting/step-photos.tsx` :636 | a photo added this visit | img `h-24 w-full object-cover` |
| `src/features/posting/step-photos.tsx` :718 | a stored photo | same as above |
| `src/features/admin-categories/category-image-dialog.tsx` :55 | category card asset | img `h-auto w-40` |
| `src/features/admin-categories/category-image-dialog.tsx` :69 | category thumb asset | img `h-auto w-16` |
| `src/features/admin-categories/category-image-dialog.tsx` :83 | category share asset | img `h-auto w-full max-w-xs` |

`backgroundImage`: ONE site — `src/features/posting/step-specifications.tsx` :1585, a colour option's two-ink swatch
(`linear-gradient(135deg, ink0 0 50%, ink1 50% 100%)`), NOT a raster picture (QUESTION 3). `<picture>`/`<source>` for
images: none (the hits are XLIFF `<source>` and test text). CSS `url(`: none in `src/styles.css`; `tier-flag.tsx` :85
`fill: url(#id)` is an SVG paint reference, not an image.

`ListingPicture` calls (5 files):
- `src/components/marketplace/listing-card.tsx` :126 — `boxTestId="listing-card-picture"`, `rounded-t-card`, `fill`,
  `crop`, `ribbon`, `palette`, `priority`, `photosSoon`.
- `src/features/my-listings/my-listings-page.tsx` :239 — in a `w-20` cell; `hasPhoto`, `rounded-md`, `fill`, `crop`; no
  test id of its own (the wrapper `my-listing-<id>-picture` :238).
- `src/features/posting/preview/listing-detail.tsx` :733 — no-photo ad: `photoUrl={null}`, `priority`, `ribbon`,
  `palette`, `rounded-row`, `corner`, `boxTestId` `listing-detail-illustration` | `listing-detail-nophoto`.
- `src/features/posting/listing-preview.tsx` :169 — `hasPhoto`, `boxTestId` `post-review-cover-box` |
  `post-review-nophoto`, `rounded-sm`, `crop`.
- `src/features/posting/step-photos.tsx` :876 — `photoUrl={null}`, `imgTestId="post-photos-illustration"`,
  `boxTestId="post-photos-illustration-box"`, `dimCategory`, `photosSoon`.

Specs that draw a picture screen (by test id; `rg` of the picture test ids across `e2e/`), and what each asserts today:
- `e2e/feed-screens.spec.ts` FS-7 (category picture's `src` attribute, at `https://example.invalid/e2e-feed-picture.jpg`
  :407 — never loads), FS-15 (the ribbon).
- `e2e/ad-page.spec.ts` AP-9, AP-30 (the QR's attributes), AP-36 (layout boxes), AP-48 (thumb arrows), AP-49, AP-50,
  AP-51 (the first photo's signed link, `loading`/`fetchpriority`), AP-52 (`example.invalid` :1561 — attributes only),
  AP-53.
- `e2e/admin-screening.spec.ts` SC-6 (`example.invalid` :323 — attributes only), SC-20, SC-21, SC-22, SC-24 (rows, not
  pixels).
- `e2e/my-listings-page.spec.ts` MLP-6 (the picture cell is present).
- `e2e/photo-pipeline.spec.ts` PP-10, PP-11, PP-12 (`naturalWidth` polled :609), PP-14 → PP-23 (PP-23 measures the
  gallery's object-position against the first thumb :1382–1400), PP-27, PP-28 (the editor canvas), PP-29, PP-30 (the
  background canvas), PP-33.
- `e2e/post-wizard-category.spec.ts` PW-3, PW-4, PW-54, PW-141 (the illustration box :495, `object-fit: contain` :506,
  the ribbon against the img :613–625; the category picture at `https://example.invalid/e2e-standin.jpg` :431/:489 (PW-3) —
  a fourth `example.invalid` picture the brief did not name).
- `e2e/admin-listings.spec.ts` AL-28 (the photos card and the Remove dialog).
- `e2e/admin-categories-images.spec.ts` CI-4 (the three asset previews visible).
- `e2e/dialogs.spec.ts` DLG-E8 (the photo viewer opens and closes).
- `e2e/sage-ad-page.spec.ts` (SAP-1 and the per-width describe; `img.complete && naturalWidth > 0` :129),
  `e2e/sage-cards.spec.ts` SCS-1, `e2e/sage-tiers.spec.ts` STG-1 (the card picture's tokens and ribbon).
- `e2e/mfa-stepup.spec.ts` (through `e2e/helpers/ui.ts` :714 — the QR visible).
None measures a drawn image against its frame.

## CENSUS-ITEM definition (anything that draws a raster image to a visitor) — the difference from the greps

1. `src/features/posting/photo-editor.tsx` :269 `<canvas data-testid="post-photo-editor-preview">` and
   `src/features/posting/background-dialog.tsx` :172 `<canvas data-testid="post-photo-background-preview">` draw a photo
   to the seller; each sizes itself by its own pixel size (`block h-auto max-h-[55vh] w-auto max-w-full`) — a drawing
   surface, not a picture in a frame; not in the brief's list (QUESTION 3).
2. `src/components/ui/avatar.tsx` :20–30 `AvatarImage` (Radix `AvatarPrimitive.Image`, which renders an `img` the JSX
   grep cannot see) — exported, NO caller (`app-header.tsx` :11 imports `Avatar`, `AvatarFallback` only) (QUESTION 3).
3. Nothing else: no `new Image(`, SVG `<image>`, `createElement("img")`, `<video>`, `<object>`, `<iframe>`, `bg-[url`;
   `dangerouslySetInnerHTML` only `app-shell.tsx` :934 (a script).

## CENSUS-ITEM tests (each consumer's own, by real name)

`src/components/marketplace/listing-picture.test.tsx` (the mechanism's; LP-*), `listing-card.test.tsx`;
`src/features/posting/preview/listing-detail.test.tsx` (+ `-map`, `-map-failed`, `-tier` siblings; also imports
share-ad), `preview-sheet.test.tsx`; `src/features/posting/step-photos.test.tsx`;
`src/features/posting/preview/photo-gallery.test.tsx`; `src/features/admin-screening/photo-changes.test.tsx`;
`src/features/admin-listings/listing-photos.test.tsx`; `src/features/ad-page/share-ad.test.tsx`;
`src/test/settings-messages.test.tsx` (settings). No own test: `my-listings-page.tsx`, `listing-preview.tsx`,
`photo-reviews.tsx` (only `use-photo-reviews.test.ts`), `category-image-dialog.tsx`. DEC-364: every spec Part C edits,
and the behaviour specs above, run locally in both engines at STEP 6 (once QUESTION 4 settles the WebKit projects).

## CENSUS-ITEM lists (every list a new name must join)

- `scripts/conformance/wired.test.ts` — `pictures.test.ts` is a vitest-discovered census: its caller line per the file's
  rule (read at Part B).
- `eslint.config.js` `RESTRICTED_SYNTAX` (:16–88): a new `picture` list joins the `src/**` block (:142–151) and the
  routes block (:167–190), not the tests block (:156–160); `lint-rules.test.ts` CF-LINT-1 → 5 used, the new case is
  CF-LINT-6 (CF-LINT-1…3 check every file against the owed table — the table gains the list).
- `scripts/conformance/pictures-allowlist.txt` — new, empty at birth (QUESTION 3 decides whether the swatch makes it
  non-empty).
- The helper's screen list — new in `e2e/helpers/pictures.ts`; CF-HELPERS-8 free (used: 1, 2, 3, 5, 6, 7).
- CF-PICTURE-1 → 3 free (`rg -n "CF-PICTURE-[0-9]" scripts src e2e` → none). `ci-deadlines.test.ts` holds CF-CID-1 → 7;
  the install-matches-projects rule would be CF-CID-8 there (it already owns the install-script rule).
- `scripts/route-budgets.mjs` — every page's ceiling (the table under first-download).
- Strings layers (CF-SL-1): no moved module carries a key of a layer it does not already sit in; the primitive uses no
  new key (`feed.noPhoto` is base and already ListingPicture's).
- The register: row 44 (priority pictures; names ListingPicture and the gallery's main image), row 60 ("the images' boxes
  are the Picture mechanism's (roadmap)"), row 90 (the ribbon in listing-picture.tsx).
- Playwright project names are read by: `.github/workflows/local-backend-proof.yml` (:252, :759, :762, :766),
  `flake-check.yml`, `guard-proof.yml`, `nightly-e2e.yml`, `scripts/e2e-failure-report.ts` (text only),
  `scripts/ci/repeat-cap.test.ts`, fixtures under `scripts/fixtures/`, and 42 spec files that branch on
  `testInfo.project.name` (QUESTION 4).

## CENSUS-ITEM old-file-readers

`docs/features/design-foundation.md` and `docs/features/posting.md` (ListingPicture's sizing, D220, INC-670) — updated
in Part A/B. Projects and browser install: `docs/features/e2e-harness.md`, `ci-local-backend.md`, `ci-guards.md`,
`guard-proof.md`, `nightly-e2e.md`, `auth-e2e-tests.md`, and six feature pages that only name a project — the first
three updated in Part D. Not edited, named for §13: `.cursor/rules/00-protocol.mdc` :118 and `.cursor/rules/20-tests.mdc`
:97, :105 name the two Blink projects and the Chromium install (the brief's "rule 40 at rules turn 4").

## CENSUS-ITEM second-readers

No dynamic import of any module Part A/B moves (`rg 'import\("…(listing-picture|photo-gallery|share-ad|step-photos|photo-changes|photo-reviews|listing-photos|category-image-dialog)"\)' src`
→ only two `typeof import(…)` mocks in tests, of other modules).

## CENSUS-ITEM chunk-graph and first-download (before)

Lock-exact: `bun install --frozen-lockfile` → `Checked 607 installs across 700 packages (no changes)`; `git status
--short bun.lock package.json` empty. `bun run build` → 0; `node scripts/check-bundle-size.mjs` → `Bundle budget OK.`
Entry JS 204.4 / 205 KiB; CSS 22.6 / 40 KiB. ListingPicture is its own chunk `listing-picture-DyOlGg7L.js` (2,569 B
gzip -9), named by `admin.screening`, `feed-page`, `listing-card`, `listing-detail`, `listing-photos`, `my-listings`,
`use-card-photos`, `use-photo-links`, `wizard` and the entry's preload map (not the entry's static closure). The raw
sites sit in `listing-detail` (gallery), `share-price-text` (share-ad), `wizard` (step-photos), `admin.screening`
(photo-changes, photo-reviews), `listing-photos`, `category-dialogs`, `settings`. Pages, size / ceiling (KiB):

/ 225.4/226 · /$name 223.4/224 · /account 266.6/268 · /account_/legal 207.0/208 · /account_/legal_/$versionId 207.6/209 ·
/account_/saved 223.6/225 · /admin 208.8/210 · /admin/ 209.6/211 · /admin/ai 321.2/322 · /admin/attributes 334.5/335 ·
/admin/audit 294.3/295 · /admin/categories 342.5/343 · /admin/countries 324.0/325 · /admin/images 209.4/210 ·
/admin/impersonation_/$sessionId 289.4/290 · /admin/legal 280.4/281 · /admin/legal_/$versionId 277.8/279 ·
/admin/legal_/edit 279.4/280 · /admin/listings 345.8/347 · /admin/listings_/$listingId 348.4/349 ·
/admin/listings_/$listingId_/edit 407.7/409 · /admin/locations 269.5/270 · /admin/monetisation 331.8/333 ·
/admin/places 325.6/327 · /admin/roles 291.1/292 · /admin/roles_/$roleId 272.1/273 · /admin/screening 367.2/368 ·
/admin/translations 301.9/303 · /admin/translations_/$lang 305.4/306 · /admin/users 291.2/292 ·
/admin/users_/$userId 286.5/287 · /auth 221.6/223 · /auth_/callback 208.5/209 · /auth_/reset 210.4/211 ·
/c/$slug 225.4/226 · /dev/primitives 225.3/226 · /dev/style 246.1/247 · /dev/tall 204.7/206 · /l/$slug 255.6/257 ·
/legal/$kind 209.1/210 · /legal/accept 216.0/217 · /legal/publishing 209.9/211 · /my-listings 313.1/314 ·
/my-listings_/$listingId 321.2/322 · /my-listings_/$listingId_/edit 399.8/401 · /post 399.8/401 ·
/post_/$listingId 399.8/401 · /privacy 209.1/210 · /settings 275.3/276 · /terms 209.1/210.

A new primitive file shared by ListingPicture and the raw sites may become its own small chunk (one more request on the
pages that draw pictures) or fold into listing-picture's; the build decides and Part B's table reports it chunk by chunk.

## CENSUS-ITEM premises (wrong or unverified)

1. The cause (above): a table cell, not `aspect-ratio`/flex — only My listings' table form fails today; the fix form the
   brief names is right and proven by injection.
2. The fourteen sites and their lines: correct. None of them is in a table; the gallery's main photo fits in WebKit at
   1280 (measured); the others were not measured in WebKit (QUESTION 5 puts them in the WebKit set).
3. The gallery's `srcset` correction cannot be done inside the scope: `GalleryPhoto` (`src/features/posting/photo-links.ts`
   :57–74, built by `galleryPhotos` :76–98) carries no size; `DraftPhotoRow` (`src/features/posting/posting-service.ts`
   :274–289) has none; the public document carries `width`/`height` (`src/features/ad-page/public-listing.ts` :72–78) and
   drops them at :159–164 (QUESTION 2).
4. The walk's line 5, "Settings — the profile picture": Settings draws no profile picture (`rg -i "avatar|profile.?(photo|picture|image)"` over
   `src/routes/settings.tsx` → none); its one image is the two-step sign-in QR (:731) (QUESTION 6).
5. `example.invalid` pictures: FS-7, AP-52 and SC-6 as named, plus `e2e/post-wizard-category.spec.ts` :431/:489 (PW-3)
   — a fourth.
6. WebKit on the lanes' runner (`ubuntu-24.04`) with DEC-366's probe: NOT VERIFIED — this computer is macOS arm64;
   `playwright install-deps webkit` installs a larger apt set than Chromium's (GStreamer and others), unmeasured; CI
   proves it at Part D.
7. The lane-time estimate (+4 → 8 min, band 2 → 12): depends on QUESTION 5 — by FILE the named picture specs hold 216
   tests (feed-screens 18, ad-page 39, admin-screening 27, my-listings-page 8, photo-pipeline 34, post-wizard-category
   24, admin-listings 38, admin-categories-images 1, dialogs 7, sage-ad-page 3, sage-cards 4, sage-tiers 5, mfa-stepup 3,
   layout 5; `rg -c` of top-level `test(`), ×2 WebKit projects; by TAG the picture tests are about 45. Locally the
   WebKit run of one measuring test took 18.9–30.3 s against Chromium's 17.3–19.7 s.
8. The investigation spec as the helper's base, the photo helper, the test-file names, CF-HELPERS-8 and CF-PICTURE-1 → 3
   free, Playwright's version staying: confirmed.

## CENSUS-ITEM findings (beyond the task)

- `.cursor/rules/00-protocol.mdc` :118, `.cursor/rules/20-tests.mdc` :97, :105 — "both projects (mobile-360,
  desktop-1280)" and the Chromium-only install: a rules turn names WebKit (the brief's rules turn 4).
- `scripts/e2e-browser-guard.ts` :22 resolves `chromium.executablePath()` only — `e2e:local` with a WebKit project would
  fail at launch, after the build (the class ACT-C3-2 closed for Chromium) (QUESTION 4).
- `.github/workflows/flake-check.yml` :89 — a second caller of the install script; with a browser-list argument that
  defaults to `chromium` it is unchanged, but a manual flake check of a WebKit spec would lack WebKit.
- 42 spec files branch on the project's NAME (e.g. `e2e/ad-page.spec.ts` :1573 `test.skip(testInfo.project.name !==
  "desktop-1280")` — AP-52 itself; `e2e/sage-*.spec.ts` pair widths with `"mobile-360"`); under `webkit-*` they skip or
  take the phone branch silently — a structural fork (QUESTION 4).
No security hole was met.

## QUESTIONS for ruling 1

1. **Part A form.** The img becomes `absolute inset-0 block h-full w-full object-cover|object-contain` inside the
   unchanged `relative` frame (:202–206), `frameStyle` (:188–191) unchanged; an `onError` sets a `failed` state that draws
   the existing `ImageOff` branch (:225–227) in the frame. The shared primitive `Picture` (`src/components/ui/picture.tsx`)
   owns the frame-and-image rule (`fit: "cover" | "contain"`, the frame's size by class, `onError` → the empty state,
   `loading`/`fetchPriority`/`srcSet`/`sizes` passed through) and ListingPicture composes it for its frame. Confirm, or
   name another form.
2. **The `srcset` correction** needs files outside the scope: `src/features/posting/photo-links.ts` (GalleryPhoto gains
   `width`/`height`), `src/features/posting/posting-service.ts` (DraftPhotoRow), `src/features/ad-page/public-listing.ts`
   :159 (stop dropping them), and every other reader that builds the gallery's rows (the seller's own ad, staff's preview
   — a census at Part B). Widen the scope to these, or move the `srcset` correction to a roadmap line?
3. **Three census hits the brief did not list.** (a) The swatch `backgroundImage` (`step-specifications.tsx` :1585,
   outside scope): CF-PICTURE refuses only a `backgroundImage` whose value holds `url(` (a raster picture), so the
   allowlist stays empty — or an allowlist line? (b) The two canvases: left outside the primitive (drawing surfaces sized
   by their pixels), their specs (PP-27, PP-28, PP-30) in the WebKit set — agree? (c) `AvatarImage` (no caller): delete it
   from `avatar.tsx` (declared deletion of an export, not a file), or CF-PICTURE-2 also refuses `AvatarImage` /
   `AvatarPrimitive.Image` outside the primitive?
4. **WebKit projects and project-name branches.** A shared helper (e.g. `e2e/helpers/project.ts` `projectWidth(testInfo)`
   → "phone" | "desktop" from the project's viewport, a new mechanism with its census) onto which the specs of the WebKit
   set move their `testInfo.project.name` branches — or the WebKit set runs only tests with no such branch (AP-52 would be
   out)? And add `scripts/e2e-browser-guard.ts` to the scope (it must resolve every browser a selected project names).
5. **The named set and the lanes.** By TAG (`@webkit` on the ~45 picture tests and the layout tests, the WebKit projects'
   `grep`) rather than by file (216 tests ×2); run in ONE dedicated `webkit` lane (one WebKit install) rather than inside
   the sixteen shards (sixteen installs); the repeat lane adds the WebKit projects for a changed spec of the set. Devices:
   `webkit-1280` (`devices["Desktop Safari"]`, 1280×800 — the operator's Safari width class) and `webkit-390`
   (`devices["iPhone 13"]`, 390×664, touch, the phones the walk uses). Confirm the three choices.
6. **The walk's line 5** becomes "Settings → two-step sign-in → set up: the QR code whole and square" — confirm, or name
   the profile picture the walk meant.
7. **New unit tests** for the moved sites without one (`photo-reviews.tsx`, `category-image-dialog.tsx`) — inside their
   folders' scope; add them (one case each: the site draws through the primitive), or leave the primitive's own test as
   the proof?
