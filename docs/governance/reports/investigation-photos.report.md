# Investigation — photos and category images at large widths — report

Base: 6457836f3 · Final commit: e2471c2d3 · Brief: docs/governance/briefs/investigation-photos.md (sha256 4338996298576073a4f6db607239a35f38634f53703876a41b73f3676935f6de) · Ruling 1: docs/governance/briefs/investigation-photos-ruling-1.md (sha256 dbaee4be44ed13df49b18552022e9f19b1a03f677d543d7a096a641d16a8baa1)
Review: READY · 0 BLOCKER · 2 MAJOR · 1 MINOR · on e2471c2d3

THE ANSWER IN ONE PARAGRAPH. The defect is not in the repository's code from `2b11a9d29` to
`6457836f3`, drawn on fresh data. At all three commits, built as the lanes build (the E2E build
against ethio-staging), every picture on My listings, a My-listing page, three ad pages and the home
feed loaded (status 200) and fitted its frame exactly, at 1280, 1024 and 360. The cause is therefore
one of two classes the executor cannot read: **what the published build serves** (Lovable's build of
the same commit, its stylesheet — the lead is the `@container` rule `ListingPicture`'s frame width
depends on) or **what production stores** (the photo rows' variants, the categories' `image_url`).
First bad commit: **none in range — it predates `2b11a9d29` or is outside the code**. The decisive
evidence is the operator's Console snippet on the published site (ruling 1, path (a)) and a
read-only connector read of ethio-prod. The guard the lanes lack is named in Findings Q4; the build
turn's outline is in Findings, "The build turn".

## 1. Done / not done, by part and step

- Orient: done. `origin/dev` = `6457836f3` = the base (read again at the report: `git rev-parse
  --short=9 origin/dev` → `6457836f3`), so no stale anchors.
- Record: done. The brief was saved by script; its fenced text hashes to the stated sha256
  (commit `8cfcf80dd`). Roadmap line 3 names it.
- Census: done (stop 1, `docs/governance/reports/investigation-photos.stop-1.md`, commit `c9ba6b874`).
- Question 1 (reproduce on the published site): **NOT DONE by the executor.** The stop explains
  why: the published site is ethio-prod, which rule 50 closes. Ruling 1 sends it to the operator
  (path (a), the stop report's Console snippet). Its output had not reached this chat when the
  report was written; the ruling says the executor does not wait.
- Ruling 1 saved by script, sha256 equal to the stated value (commit `83264473a`).
- Ruling 1 item 1 (path (c), the measuring spec): done. It was written, run at `2b11a9d29`,
  `db13e13b7` and `6457836f3` on desktop-1280 (1280 and 1024 inside the spec) and mobile-360. Its
  evidence is committed (commit `e2471c2d3`), but its copy lives in the reports folder, not
  `e2e/` (Departures 1).
- Ruling 1 item 3 (the container-unit lead, read verbatim): done (Findings Q3).
- Questions 2 → 5: done as far as staging and the repository can answer (Findings).
- The checks, the self-review and this report: done.

## 2. Files changed

`git diff --name-only 6457836f3` on the last code commit `e2471c2d3`, verbatim:

```
docs/governance/briefs/investigation-photos-ruling-1.md
docs/governance/briefs/investigation-photos.md
docs/governance/reports/investigation-photos.stop-1.md
docs/governance/reports/investigation-photos/6457836f3-ad-no-photo-1024.png
docs/governance/reports/investigation-photos/6457836f3-ad-no-photo-1280.png
docs/governance/reports/investigation-photos/6457836f3-ad-no-photo-360.png
docs/governance/reports/investigation-photos/6457836f3-ad-portrait-1024.png
docs/governance/reports/investigation-photos/6457836f3-ad-portrait-1280.png
docs/governance/reports/investigation-photos/6457836f3-ad-portrait-360.png
docs/governance/reports/investigation-photos/6457836f3-home-feed-1024.png
docs/governance/reports/investigation-photos/6457836f3-home-feed-1280.png
docs/governance/reports/investigation-photos/6457836f3-home-feed-360.png
docs/governance/reports/investigation-photos/6457836f3-my-listings-1024.png
docs/governance/reports/investigation-photos/6457836f3-my-listings-1280.png
docs/governance/reports/investigation-photos/6457836f3-my-listings-360.png
docs/governance/reports/investigation-photos/investigation-photos.spec.ts.txt
docs/governance/reports/investigation-photos/measurements-2b11a9d29-desktop-1280.json
docs/governance/reports/investigation-photos/measurements-2b11a9d29-mobile-360.json
docs/governance/reports/investigation-photos/measurements-6457836f3-desktop-1280.json
docs/governance/reports/investigation-photos/measurements-6457836f3-mobile-360.json
docs/governance/reports/investigation-photos/measurements-db13e13b7-desktop-1280.json
docs/governance/reports/investigation-photos/measurements-db13e13b7-mobile-360.json
roadmap.md
scripts/conformance/briefs-allowlist.txt
```

Plus this report, in its own commit. Every path except `roadmap.md` and the allowlist is new (`git
diff --stat 6457836f3..e2471c2d3`: 24 files changed, 7976 insertions, 1 deletion — the one
deletion is line 3 of `roadmap.md`). Every path is in the brief, the ruling or the standing
allowance:

- the brief and the report: by the brief;
- roadmap line 3 and the stop report: by the standing allowance;
- the ruling: by rule 00 (rulings are saved under briefs/);
- the evidence folder: by the brief's question 1 ("Save the screenshots under
  `docs/governance/reports/investigation-photos/`") and ruling 1 item 1;
- the allowlist line: by the standing allowance, but beyond the brief's list (Departures 2).

The measurement JSONs replace the staging project's address with `https://<ethio-staging>`. The
screenshots show only the scratch seller's scratch ads, staging categories and no personal data.

## 3. Behaviour contract — answer tables before → after

None. No route, door, screen or function is touched: `git diff --name-only 6457836f3` names no
path under `src/`, `e2e/` or `supabase/`, and under `scripts/` only one allowlist line.

## 4. Censuses

Who draws an ad photo or a category picture, read at the base:

- **The category picture's one door** is `nearestCategoryPicture`
  (`src/features/categories/category-tree.ts:531`), read only from the tree's `imageUrl`
  (`:353`, from the row's `image_url`). Its consumers:
  - `listing-card.tsx:128` (feed cards);
  - `my-listings-page.tsx:245` (My listings rows);
  - `my-listing-page.tsx:710`;
  - `wizard.tsx:745` (the wizard's chosen category);
  - `screening-page.tsx:847`;
  - `admin-listings/listing-page.tsx:587`.
- **Every category picture is drawn by `ListingPicture`**
  (`src/components/marketplace/listing-picture.tsx`). Its `<ListingPicture` callers:
  `listing-card.tsx:126`, `my-listings-page.tsx:239`, `listing-detail.tsx:733`,
  `listing-preview.tsx:169`, `step-photos.tsx:876`. The other `image_url` readers are the admin
  image dialog and service (`category-image-dialog.tsx`, `category-images-service.ts`), which only
  write and preview it.
- **The rail draws glyphs, not pictures** (`use-category-glyphs.ts`, `app-rail.tsx`). So "category
  images" on the published site are the `ListingPicture` fallback, not a separate image system.
- **The server's first-rail seed strips the picture links.**
  `src/server/first-screen.ts:146` sets
  `.map((node) => ({ ...node, image_url: null, image_thumb_url: null }))`, and `useCategoryTree`
  draws `cache?.tree ?? seeded ?? EMPTY_TREE` (`category-tree.ts:489`). So until the browser's own
  tree read lands, every category fallback is null and the card draws the no-photo placeholder.
  On staging the read landed every time (Findings Q2).
- **Photo URLs.** `photoUrl` with `CARD_THEN_THUMB = ["card", "thumb", "cover"]`
  (`photo-links.ts:18`) is used on My listings (`my-listings-page.tsx:43`), on feed cards
  (`use-card-photos.ts:68`) and in the wizard (`step-photos.tsx:707`). `CARD_FIRST =
  ["card", "cover", "thumb"]` (`:17`) is used for the gallery's main photo (`:85`) and the preview
  (`listing-preview.tsx:112`).
- **Gallery source sets**: `srcSetOf` (`photo-gallery.tsx:271–273`) and the encoder's long edges,
  `EDGES = { cover: 1600, mid: 960, card: 480, thumb: 160 }` (`photo-encode.ts:36`).
- **`onError` on any picture**: `rg -n 'onError' listing-picture.tsx photo-gallery.tsx` found
  none.
- **Tests that draw these pictures**: Findings Q4 (the grep of `example.invalid` across `e2e/` and
  the test ids it names).

## 5. Tests

No test is added to the suite. The measuring spec (ruling 1 item 1, test IPH-1) asserts nothing
and was run, not committed under `e2e/` (Departures 1).

- **Its runs**, each through `bun run e2e:local -- e2e/investigation-photos.spec.ts` against
  ethio-staging, both projects, 0 retries. The spec's sha256 was `5702471b33aa91d3…` in every tree.
  - `6457836f3`: `2 passed (43.7s)`.
  - `db13e13b7`: `2 passed (45.3s)`.
  - `2b11a9d29`: `2 passed (28.7s)`.
  - `[ssr-error]` lines: 0 in each log (`rg -c` found no match).
- **The harness's rows**: one scratch seller (`scratchSeller({ served: true })`) and three active
  ads. Photos were uploaded with `madeJpeg`, each variant at the encoder's long edges: portrait
  1200×1600 / 720×960 / 360×480 / 120×160, landscape the reverse. One no-photo ad's parent category
  got a 640×480 PNG in `category-assets` (the bucket refuses JPEG; the first run said so). The ads,
  the photo keys and the category key were removed in `afterEach`, which throws on a failed
  removal.
- **Laws** (`bunx vitest run scripts --maxWorkers=2`) on `e2471c2d3`:
  `Test Files  112 passed (112)`, `Tests  577 passed | 1 skipped (578)`.
- **`bun run typecheck`** on `e2471c2d3`: exit 0
  (`tsc --noEmit && tsc --noEmit -p tsconfig.scripts.json`).
- **THE CHECKS** on `e2471c2d3`:
  - fast line: `checks (fast): 26 PASS · 0 FAIL · 348s`;
  - last line: `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 404s`.
  - The 24 NOT RUN, each with its reason as printed:
    - scope › Decide whether the lanes run: GitHub-only (DEC-365).
    - Workflow lint (actionlint) and Secrets scan (gitleaks): the pinned binaries are linux/x64;
      this machine is darwin/arm64.
    - Install dependencies ×3 (build-and-check, component-tests, bundle-budget): already
      installed.
    - dependency-audit ×2: the advisory service is not reachable.
    - e2e-preflight ×4: they need the staging credentials, which the script never holds.
    - e2e merge ×6: GitHub artifacts.
    - promote ×4: CI only (DEC-020).
    - semgrep SARIF upload ×2: GitHub only.
- **The J-audit**: not applicable, since `e2e/**` is unchanged.

## 6. K2 — siblings that bypass the mechanism

The concern is "a drawn listing picture". The greps were `<ListingPicture`,
`nearestCategoryPicture`, `image_url|imageUrl`, `srcSet|srcset|sizes=` and `onError` over `src/`
(results in section 4).

- No caller draws an ad photo or a category picture with its own `<img>` beside the two mechanisms
  (`ListingPicture` for cards, rows and fallbacks; `PhotoGallery` for the ad page's photos).
- Inside the mechanisms there are two gaps, which the build turn would close (Findings, "The build
  turn"):
  - neither handles a failed image (`listing-picture.tsx:207–223`; `photo-gallery.tsx:157`);
  - the gallery's `w` descriptors are not widths (`photo-gallery.tsx:271–273`).

## 7. Allowlists and guards

`scripts/conformance/briefs-allowlist.txt`: 0 → 1 line. The new line:

`docs/governance/briefs/investigation-photos.md:1 carries no STEP 1 | the investigation brief (read-only, charter-and-execute) was sent with no STEP 1 census and the GO checker did not refuse it; reported in the report (Findings, Records) for the supervisor | 2026-11-30`

CF-BRIEF-15 judged it in the laws run above (green). No guard was added or self-tested; this is an
investigation.

## 8. Strings

None. The brief's flag is no-new-string; no `t(` key was touched.

## 9. Migrations

None. The brief's flag is no-migration.

## 10. Departures

1. **The measuring spec is committed as evidence text, not as `e2e/investigation-photos.spec.ts`.**
   Ruling 1 item 1 says "on this lane it is committed once, as the report's evidence". With the
   spec under `e2e/`, the laws failed: `scripts/e2e-select.test.ts` requires every
   `e2e/*.spec.ts` to be reachable from an AREA in `scripts/e2e-select.ts`, a file the ruling's
   scope does not name. To keep the commit green without touching a file outside scope, the spec
   was moved byte for byte (sha256 `5702471b33aa91d32b937465b080dca5beeeea12d38baa29b51b4f414c770eff`
   before and after) to
   `docs/governance/reports/investigation-photos/investigation-photos.spec.ts.txt`. To run it
   again, copy it to `e2e/investigation-photos.spec.ts`, as was done at each commit. If the
   supervisor wants it under `e2e/`, the ruling must add `scripts/e2e-select.ts` (its AREA) to
   the scope.
2. **The allowlist line** in section 7 is not in the brief's list of files ("the only files written
   are this brief, the report and roadmap line 3"). It sits in the standing allowance. Without it,
   the brief itself fails CF-BRIEF-15.
3. **Three commits were red on the laws.** CF-BRIEF-15 failed from `8cfcf80dd` (task saved) through
   `c9ba6b874` (stop 1, pushed) and `83264473a` (ruling 1 saved), because the laws were not run
   after the brief was saved. Rule 00 step 4 asks for that run when a part touches a guard; this
   was missed at the record step. It was found at the evidence commit and cleared by the allowlist
   line in `e2471c2d3`. History is not rewritten (rule 00 §Git); recorded as a slip (Records).
4. **Question 1 was not run by the executor.** Stop 1 → ruling 1 sent it to the operator (path (a)).
5. **The stops and rulings of this turn**: stop 1 (`investigation-photos.stop-1.md`) and ruling 1
   (`investigation-photos-ruling-1.md`), both above.

## 11. CI

The base's CI, from `git show origin/ci-evidence:docs/tracking/ci-status.md`, first six lines:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `6457836f3ed9d73fcb74a60866fb63de907be825` (short `6457836`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T19:06:45Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43282804733
```

Two-step check: the conclusion is SUCCESS, and the reported commit equals the base `6457836f3`,
which is `origin/dev`. There was no red of an earlier turn to fix. This lane has no pull-request run
of its own (see the end of this section).

**A pull request is needed for the record**, and this report says so as the brief requires. The
brief, ruling, stop report, report and evidence are the project record the records turn and the
build turn cite, and roadmap line 3 names this brief. The allowlist line must merge together with
the brief, or CF-BRIEF-15 turns `dev` red. So the lane is opened as one pull request after this
report's push.

## 12. Limits

- **The published site was not measured.** Rule 50 closes ethio-prod and the published site to
  the executor in every form (ruling 1: "Rule 50 stays as it is"). The operator's snippet (path (a))
  is the published measurement. Its output was not in this chat when the report was written, so
  the cause stays a class, not a line.
- **Production's data was not read** (rule 50): neither `categories.image_url` shapes nor
  `listing_photos.paths` variant counts.
- **All measurements are on ethio-staging**, with fresh scratch photos at the encoder's own sizes
  and a fresh category picture. A production row with fewer variants, an older URL shape or a
  picture that no longer exists is outside what the harness makes.
- **Screenshots were saved at the base `6457836f3` only.** The other two commits have measurements
  (JSON), not screenshots.
- **The post wizard's category step was not measured.** Its pictures are the same `ListingPicture`
  fallback, measured on the feed and the ad page.
- The 1024 width ran inside the desktop-1280 project (`setViewportSize`), as the ruling says.
- **The base screenshot `6457836f3-ad-no-photo-1280.png` was taken mid-load** (no account chip yet).
  Its measurement (status 200, frame = box 320×240) was taken after the page settled.
- **Scratch trees** for the two earlier commits and the base build:
  `/tmp/ethio-scratch/investigation-photos/` (tree-2b11a9d29, tree-db13e13b7, results-6457836f3,
  logs). The operator removes them; this tool refuses `rm`.

## 13. Findings

### Q1 — reproduce

Not reproduced by the executor (rule 50; ruling 1). Stop 1 holds the Console snippet for the
operator. It prints `{ width, css_files, has_container_rule }` and a table with these columns:
test_id, src without query, natural, drawn, object_fit, frame_style, frame_px, box_px,
box_container, status and bytes.

The repository's base build names its stylesheet `styles-AbgqDMlm.css`. A different name in
`css_files` means the published site serves a different build from the same commit.

### Q2 — bisect: the defect does not appear at any of the three commits; it predates `2b11a9d29` or is outside the code

Every commit was built as the lanes build: `bun run e2e:local`, the E2E production build served
locally against ethio-staging. Each built from a tree written by `git show` under
`/tmp/ethio-scratch/`, with the same spec. Tally of every shown image in the six measurement files
(`tally.ts` over the committed JSONs):

```
measurements-2b11a9d29-desktop-1280.json: shown=23 not_loaded=0 pictured=17 {"category":7,"photo":10} frame_not_box=0
measurements-2b11a9d29-mobile-360.json: shown=13 not_loaded=0 pictured=10 {"category":4,"photo":6} frame_not_box=0
measurements-6457836f3-desktop-1280.json: shown=20 not_loaded=0 pictured=14 {"category":6,"photo":8} frame_not_box=0
measurements-6457836f3-mobile-360.json: shown=10 not_loaded=0 pictured=7 {"category":3,"photo":4} frame_not_box=0
measurements-db13e13b7-desktop-1280.json: shown=20 not_loaded=0 pictured=14 {"category":6,"photo":8} frame_not_box=0
measurements-db13e13b7-mobile-360.json: shown=11 not_loaded=0 pictured=8 {"category":3,"photo":5} frame_not_box=0
```

The counts differ between runs because the home feed also carries other staging listings. The
column meanings:

- `not_loaded`: the image was not complete, had naturalWidth 0, or its answer was not 200.
- `frame_not_box`: the `ListingPicture` frame differs from its `[data-picture]` box by more than
  1 px.

At the base, per screen (from the 1280, 1024 and 360 rows):

| Screen        | Frame = box (1280 · 1024 · 360) | Fit                                      | Answer         |
| ------------- | ------------------------------- | ---------------------------------------- | -------------- |
| My listings   | 80×60 at every width            | photos cover, category contain           | 200 jpeg / png |
| Feed cards    | 185.6 · 134.4 · 93.3 wide       | photos cover, category contain           | 200            |
| No-photo ad   | 320×240 · 320×240 · 280×210     | contain, drawn whole                     | 200 png        |
| Ad galleries  | 561.6×451.8 · 408×306 · 280×210 | contain                                  | 200 jpeg       |

The `/api/media/photo-links` answer was 200, with all four variants for each photo. Gallery heights
at 1280 differ (the portrait My-listing page is 532.8×399.6) because DEC-197 fills the gallery to
the card's height.

The screens' files last changed before `2b11a9d29` (2026-11-09) as follows (`git log -4
6457836f3 -- <file>`):

- `listing-picture.tsx`: `45686917b` 2026-11-01 (sage-s5-ad-page part E).
- `photo-gallery.tsx`: `2b5f7dc6f` 2026-11-10 (housekeeping-1 part B, exports to modules — after
  `2b11a9d29`), and before that `84d55859b` 2026-11-01.
- `photo-links.ts`: `0cffc3c56` 2026-10-15.
- `my-listings-page.tsx`: `2b5f7dc6f` 2026-11-10, and before that `febbd07ba` 2026-11-09.

None of these draws differently on fresh data in the measured range. **First bad commit: none in
range.**

### Q3 — the cause, as a class (the decisive line awaits the published measurement)

**Class: what the published site serves (its build or production's data), not the repository's
code on fresh data.** Two leads remain, each with its decisive line read verbatim (G3).

**Lead A — the frame's width depends on a container rule** (ruling 1 item 3).
`src/components/marketplace/listing-picture.tsx:187–191`:

```
  const [ratio, setRatio] = useState(4 / 3);
  const frameStyle =
    source === null || cropPhoto
      ? { width: "100%", height: "100%" }
      : { aspectRatio: String(ratio), width: `min(100cqw, ${75 * ratio}cqw)` };
```

The container is declared by the box at `:195`, `className={`@container relative aspect-4/3 w-full
...`}`, and by the frame at `:203`. `cqw` resolves against the nearest ANCESTOR container. Measured
ancestors at the base (the JSON's `containers` chain, nearest first):

- **My listings**, at 1280, 1024 and 360: `div` (the `[data-picture]` box) inline-size 80, then
  `div` inline-size 80.
- **Feed cards**: `listing-card-picture` inline-size, then `listing-card` inline-size (185.6 at
  1280, 134.4 at 1024, 93.3 at 360).
- **The no-photo ad**: the box, then `listing-detail-illustration` inline-size (320 / 320 / 280),
  then `listing-detail` inline-size (992 / 736 / 296).
- **The galleries**: not `ListingPicture`. Their chain is `listing-detail-gallery`, then
  `listing-detail`.

So in every repository build `100cqw` is the box's own width, and the frame equals the box. **If a
stylesheet lacks the `@container` rule** (`container-type: inline-size`), `cqw` falls back to the
viewport. At 1280 that makes the category frame `min(1280px, 1280px)` wide and 960 px tall inside
an 80-px, `overflow-hidden` box. Only the picture's white centre would show — a blank tile, worse
the wider the screen. Photos with `crop` (My listings, cards) use 100% and do not depend on it.
Uncropped photos (the preview, the wizard) would draw oversized.

The snippet's `has_container_rule` and `frame_px` answer this lead in one run.

**Lead B — production data.**

- **A category picture whose URL does not load draws blank.** `ListingPicture`'s `<img>`
  (`listing-picture.tsx:207–223`) has an `onLoad` and no `onError`. The `ImageOff` placeholder
  shows only when `source === null`. A 404 or refused `image_url` leaves the frame's
  `bg-photo-empty` showing: "blank".
- **A photo row without its `card` (and `mid`) variants falls back to the 160-px thumb.**
  `CARD_THEN_THUMB` goes card → thumb → cover (`photo-links.ts:18`). In the gallery, `CARD_FIRST`
  becomes `main` and is declared `480w` (`photo-gallery.tsx:272–273`). At large widths that
  upscales a 160-px image: "malformed".
- **The first-rail seed's null `image_url`** (`first-screen.ts:146`) keeps every card on the
  placeholder if the browser's tree read never lands on the published site.

What decides lead B (supervisor's read-only connector on ethio-prod):

- `categories.image_url` — its host and path shape, and whether each answers 200;
- `listing_photos.paths` — how many rows lack `card`, `mid` or `cover`;
- the snippet's `status` column.

### Q4 — why green, and the assertion that would have failed

What each spec asserts about an image on these screens (read at the base):

- **`my-listings-page.spec.ts` MLP-6** (`:692–696`): only that the row's picture exists below
  768 px (`toHaveCount(1)`). Nothing at 1024 or 1280; nothing on load, size or fit.
- **`my-listings-ad.spec.ts`** (MLA-1 … MLA-3): nothing about pictures.
- **`feed-screens.spec.ts` FS-7** (`:404–432`): the category picture is
  `https://example.invalid/e2e-feed-picture.jpg`. It asserts `data-picture="category"` and the
  `src` attribute only. A category picture that never loads passes.
- **`feed-screens.spec.ts` FS-15** (`:735–798`): card photos are complete, `naturalWidth > 0`,
  `object-fit: cover`, box = img within 1 px. That is the right shape, but only for photos.
- **`ad-page.spec.ts` AP-52** (`:1554–1570`): `https://example.invalid/e2e-ad-picture.jpg`, then
  `data-picture`, `loading=eager` and `fetchpriority=high` only.
- **`ad-page.spec.ts` AP-50** (`:1572`): the gallery's photo loaded and lies within its media.
- **`admin-screening.spec.ts` SC-6** (`:323–335`): `example.invalid`, then `data-picture` and
  `src` only.
- **`photo-pipeline.spec.ts` PP-23** (`:1325`): the middle size is offered, and the top edge of a
  WIDE photo. No portrait, so the `w` descriptor defect (Q5) cannot show.
- **`post-wizard-category.spec.ts`** (`:506`): `object-fit: contain` on the illustration only.
- **The sage specs**: the gallery photo loaded; nothing on the category picture.

So no spec in the repository proves that a category picture LOADS. Every one that draws one points
it at `example.invalid`, which never loads by design. No spec measures any picture at 1024 or 1280
on My listings.

**The assertion that becomes the guard** (one shared e2e helper, by name `pictureDrawn`): for every
`[data-picture] img` on the screen,

- `img.complete && img.naturalWidth > 0`;
- the `ListingPicture` frame's box lies within its `[data-picture]` box (±1 px);
- for `object-fit: contain`, the drawn content's ratio equals `naturalWidth / naturalHeight`
  (±1%).

Where it runs:

- FS-7 and AP-52, with a REAL loadable category picture (a PNG uploaded to `category-assets`, as
  the measuring spec does) in place of `example.invalid`;
- My listings (MLP-6) at 1280, 1024 and 360.

Had it existed, it would fail on a stylesheet without the container rule (frame 1280 wide in an
80-px box) and on a category picture that does not load. Against the published build it is the
test of record; against the lanes' build it guards the code.

### Q5 — other items on those screens

1. **The gallery's `w` descriptors are long edges, not widths** (`photo-gallery.tsx:271–273`):
   `` `${photo.main} 480w, ${photo.middle} 960w` `` and `` `… ${photo.large} 1600w` ``. The encoder
   sizes by long edge (`photo-encode.ts:36`), so a portrait's card is 360 wide, its middle 720 and
   its cover 1200. Measured: the portrait gallery's `naturalWidth` reads 432×576 at 1280 (the
   720-wide middle divided by 960/576) and 270×360 at 360. The browser therefore believes a
   portrait has a third more pixels than it has, and picks a smaller file than the slot needs.
   That makes portraits softer at large widths, not misshapen.
2. **No failed-image path** in `ListingPicture` (`listing-picture.tsx:207–223`) or the gallery
   (`photo-gallery.tsx:157`): a failed URL draws an empty frame, never the placeholder or a notice.
   This contradicts the "no silent blank" intent of INC-911 (which covers on-demand code, not
   images).
3. **The tests' `example.invalid` category pictures** (Q4): `feed-screens.spec.ts:407`,
   `ad-page.spec.ts:1561`, `admin-screening.spec.ts:323`.
4. **The 360 footer's © line sits under the raised Post disc** in
   `6457836f3-home-feed-360.png`. The shell pads by `pb-[calc(var(--bottom-bar)+var(--bar-rise))]`
   (`app-shell.tsx:993`), while the disc rises a further 1 px (`bottom-bar.tsx:52`,
   `-translate-y-[calc(var(--bar-rise)+1px)]`). Not proven at full scroll; a screen walk confirms
   or clears it.
5. **The no-photo ad page's category picture stops at 320 px** (`max-w-80`,
   `listing-picture.tsx:195`). At 1280 it sits at the top of a 992-wide media card with empty
   space under it (`6457836f3-ad-no-photo-1280.png`). This is design-dependent; it is reported, not
   judged.
6. **Staging residue in the rail**: scratch categories (`e2e-post-nightly-6…`) are visible in the
   1280 screenshots. That is a staging-hygiene item for the nightly reaper (DEC-369), not app code.
7. **Two identical gear icons in the 360 Seller Centre rail** (`6457836f3-my-listings-360.png`).
   The cause was not read; it is reported for the screen walk.

### The build turn (outline for the supervisor's ruling)

- **Concern**: a drawn listing picture loads and fits its frame at its own ratio, or says it could
  not — never a blank or a misshapen tile. This covers ad photos, category fallbacks and the
  gallery.
- **Mechanism**: `ListingPicture` (`src/components/marketplace/listing-picture.tsx`), `PhotoGallery`
  (`src/features/posting/preview/photo-gallery.tsx`) and `photoUrl` / `galleryPhotos`
  (`src/features/posting/photo-links.ts`). Extend them; no new component. The changes, ordered by
  what path (a) shows:
  1. the frame's width from the box itself, `min(100%, ${75 * ratio}%)` of the absolutely placed
     parent (the box's width), so it no longer depends on a container rule reaching the published
     stylesheet (lead A);
  2. an `onError` on the picture: a failed photo falls to the category picture, a failed category
     picture to the existing placeholder (`feed.noPhoto`, no new string), each failure logged once
     (lead B);
  3. `srcSetOf` takes each variant's real width from the row's stored width and height (Q5 item 1).
- **Consumers**: the callers in section 4 — `listing-card.tsx:126`, `my-listings-page.tsx:239`,
  `my-listing-page.tsx:710`, `listing-detail.tsx:733`, `listing-preview.tsx:169`,
  `step-photos.tsx:876`, `wizard.tsx:745`, `screening-page.tsx:847`,
  `admin-listings/listing-page.tsx:587`; the gallery's caller in `listing-detail.tsx`.
- **The guard**:
  - the `pictureDrawn` helper (Q4) in FS-7, AP-52 and MLP-6 at 1280 / 1024 / 360, with real
    category pictures;
  - PP-23 gains a portrait (its chosen `currentSrc` natural width equals the stored width);
  - a unit test of `srcSetOf` over a portrait row;
  - if the frame keeps `cqw`, a build check that the built stylesheet carries the `@container`
    rule.
- **Data (if lead B is confirmed)**: a production read decides whether rows need a backfill. That
  would be its own migration turn.

## 14. Records

- INC — On the published site at large widths, My listings drew ad photos malformed and category
  images blank (the operator's walk of 2026-11-12). It is not reproduced in the repository's code
  at `2b11a9d29`, `db13e13b7` or `6457836f3` on fresh data: every picture loaded and fitted at 1280
  / 1024 / 360 against ethio-staging (`docs/governance/reports/investigation-photos.report.md`,
  Q2). The cause is the published build (the `@container` rule `ListingPicture`'s frame width
  needs, `listing-picture.tsx:191`) or production's data (`categories.image_url`,
  `listing_photos.paths` variants). Open until the operator's snippet and a read-only production
  read decide; the build turn's outline is in the report.
- INC — No e2e spec proves that a category picture loads. FS-7 (`feed-screens.spec.ts:407`), AP-52
  (`ad-page.spec.ts:1561`) and SC-6 (`admin-screening.spec.ts:323`) point it at `example.invalid`
  and assert attributes only. No spec measures a picture on My listings at 1024 or 1280. The guard
  proposed: the `pictureDrawn` assertion (loaded, frame within box, contained ratio = natural
  ratio) with a real uploaded picture.
- INC — The ad gallery's `srcset` declares long edges as widths (`photo-gallery.tsx:271–273`:
  480w / 960w / 1600w). A portrait's variants are 360 / 720 / 1200 wide, so the browser picks a
  smaller file than the slot needs. PP-23 tests only a wide photo.
- INC — `ListingPicture` and `PhotoGallery` have no failed-image path (`listing-picture.tsx:207–223`,
  `photo-gallery.tsx:157`): a picture whose URL fails draws an empty frame.
- INC — The investigation's GO asked the executor to sign in on the published site (ethio-prod),
  which rule 50 forbids (stop 1). Ruling 1's prevention: CF-BRIEF-16 gains "the published site",
  "ethio-prod" and "sign in to production" among its refusals. The GO template's premises line
  gains "the executor reads only its local stack, its temporary backends and ethio-staging;
  anything on ethio-prod or the published site is measured by the operator or the supervisor's
  read-only connector". Instructions v1.18: G34's "performable" sentence names environments.
- INC — The investigation's GO carried no STEP 1 census, and the GO checker did not refuse it.
  CF-BRIEF-15 failed only once the brief was saved in the repository, so the lane allowlisted it
  (`briefs-allowlist.txt`, until 2026-11-30).
- INC — A measuring spec that a ruling places under `e2e/` cannot be committed unless
  `scripts/e2e-select.ts` gives it an AREA (`scripts/e2e-select.test.ts`). Ruling 1's scope named
  only the spec, so it was committed as evidence text under the reports folder. A ruling that
  commits a spec names its AREA's file too.
- slip — The executor saved the brief (`8cfcf80dd`) without running the laws. CF-BRIEF-15 was red
  on `8cfcf80dd`, `c9ba6b874` (pushed) and `83264473a` until the allowlist line in `e2471c2d3`.
  Rule 00 step 4's laws run belongs after the record step too whenever a brief is saved.
- changelog — none (no structural change).
- register row — none (no mechanism added).
- roadmap — none dictated by the brief (line 3 only).
