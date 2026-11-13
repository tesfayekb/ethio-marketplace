# pictures: every picture fills its frame in every engine — report
Base: 50783a30e (the brief's `Base: dev 6457836f3`, run with `--at 50783a30e`, the commit STEP 0 began from) · Final commit: e61da5bfc · Brief: docs/governance/briefs/pictures.md (sha256 a9d9ca50…, equal at STEP 0)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on e61da5b

CI on the last code commit: e61da5bfc — SUCCESS (run 43426917119; every check on the pull request green). dev's base: 50783a30e — SUCCESS (run 43305919223).

## 1. Done / not done, by part and step

| step / part | commit | state |
| --- | --- | --- |
| STEP 0 — the brief saved, line 3, briefs allowlist, draft pull request [#37](https://github.com/tesfayekb/ethio-marketplace/pull/37) | 77cdacf62 | done |
| STEP 1 — the census, INC-1121 reproduced in WebKit (stop 1) | c20a844dd | done; ruling 1 answered it |
| Part A — the picture mechanism fills its frame in WebKit | e06484d2b | done |
| Part B — every image through the one picture primitive | 02ddc3b77 | done, except the gallery's `srcset`, which ruling 1 (2) moved to INC-1122 |
| Part C — the geometry check on every picture screen | ba28a8c9b | done |
| Part D — the picture screens in WebKit (DEC-371) | 3613c7775 | done |
| Stop 2 — the merged report's lane list; three tests left out of the WebKit set | ea41af488 | done; ruling 2 answered it |
| E1 — rulings saved bare; CF-BRIEF-17 | b7ddbde62 | done |
| E2 — the merged report reads the webkit lane; CF-CID-10 (INC-1124) | 6aaf10822 | done |
| E3 — WebKit skips the temporary backend's certificate; EBG-6 (INC-1125) | e4c536539 | done |
| E4 — SCS-1 reads the edge colour as numbers | a14b46ed1 | done |
| E5 — a dialog opened by a press gives the focus back in Safari (INC-1126) | 7a1238685 | done |
| E6 — a download abandoned by leaving no longer reloads (INC-1127, probe confirmed) | 4268c6c09 | done |
| STEP 6 — the checks on the final tree | — | done (§5) |
| STEP 7 — one push (4268c6c09), the run read | — | run 43355488221 all green; ruling 2 (6)'s commit was not needed |
| STEP 8 — self-review | aa658b697 | one BLOCKER fixed: an `as unknown as` cast in the new `photo-reviews.test.tsx` |
| STEP 8 — the review re-run on the whole diff | e61da5bfc | one BLOCKER fixed: PP-35 raised its timeout to 150 s without a named cause (rule 20, "a timeout is never raised without a named cause"); the review run on after the fix: READY, 3 MINOR (§10) |
| STEP 8 — this report | (its own commit) | done |

## 2. Files changed

`git diff --name-only 50783a30e` (81 paths, this report included):

```
.github/workflows/ci.yml
.github/workflows/local-backend-proof.yml
docs/features/ci-guards.md
docs/features/ci-local-backend.md
docs/features/design-foundation.md
docs/features/e2e-harness.md
docs/features/my-listings.md
docs/generated/i18n-usage.json
docs/governance/briefs/pictures-ruling-1.md
docs/governance/briefs/pictures-ruling-2.md
docs/governance/briefs/pictures.md
docs/governance/reports/pictures.report.md
docs/governance/reports/pictures.stop-1.md
docs/governance/reports/pictures.stop-2.md
docs/governance/reports/pictures/bundle-part-b.txt
docs/governance/reports/pictures/measurements-50783a30e-desktop-1280.json
docs/governance/reports/pictures/measurements-50783a30e-webkit-1280.json
docs/governance/reports/pictures/measurements-part-a-desktop-1280.json
docs/governance/reports/pictures/measurements-part-a-webkit-1280.json
docs/governance/reports/pictures/pictures-repro.spec.ts.txt
docs/governance/reports/pictures/playwright.pictures-repro.config.ts.txt
docs/tracking/intentional-deletions.txt
e2e/ad-page.spec.ts
e2e/admin-categories-images.spec.ts
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/dialogs.spec.ts
e2e/feed-screens.spec.ts
e2e/helpers/colors.ts
e2e/helpers/layout.ts
e2e/helpers/photos.ts
e2e/helpers/pictures.ts
e2e/layout.spec.ts
e2e/mfa-stepup.spec.ts
e2e/my-listings-page.spec.ts
e2e/photo-pipeline.spec.ts
e2e/post-wizard-category.spec.ts
e2e/sage-ad-page.spec.ts
e2e/sage-cards.spec.ts
e2e/sage-tiers.spec.ts
eslint.config.js
playwright.config.ts
public/i18n-usage.json
roadmap.md
scripts/brief/go-laws.ts
scripts/ci/install-browser-deps.sh
scripts/ci/install-browser-deps.test.ts
scripts/conformance/briefs-allowlist.txt
scripts/conformance/briefs.test.ts
scripts/conformance/ci-deadlines.test.ts
scripts/conformance/e2e-helpers-allowlist.txt
scripts/conformance/e2e-helpers.test.ts
scripts/conformance/lint-rules.test.ts
scripts/conformance/non-null-allowlist.txt
scripts/conformance/pictures-allowlist.txt
scripts/conformance/pictures.test.ts
scripts/conformance/repeat-lane.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-browser-guard.test.ts
scripts/e2e-browser-guard.ts
scripts/route-budgets.mjs
src/components/marketplace/listing-picture.test.tsx
src/components/marketplace/listing-picture.tsx
src/components/ui/avatar.tsx
src/components/ui/dialog-opener.test.tsx
src/components/ui/dialog.tsx
src/components/ui/picture.test.tsx
src/components/ui/picture.tsx
src/features/ad-page/share-ad.tsx
src/features/admin-categories/category-image-dialog.test.tsx
src/features/admin-categories/category-image-dialog.tsx
src/features/admin-listings/listing-photos.tsx
src/features/admin-screening/photo-changes.tsx
src/features/admin-screening/photo-reviews.test.tsx
src/features/admin-screening/photo-reviews.tsx
src/features/posting/preview/photo-gallery.tsx
src/features/posting/step-photos.tsx
src/lib/stale-chunk.test.ts
src/lib/stale-chunk.ts
src/routes/settings.tsx
src/test/e2e-colors.test.ts
```

New files (`git ls-files` holds each): docs/governance/briefs/pictures.md, pictures-ruling-1.md, pictures-ruling-2.md;
docs/governance/reports/pictures.stop-1.md, pictures.stop-2.md, pictures.report.md and the eight files under
docs/governance/reports/pictures/; e2e/helpers/layout.ts, e2e/helpers/pictures.ts;
scripts/conformance/pictures-allowlist.txt, scripts/conformance/pictures.test.ts, scripts/e2e-browser-guard.test.ts;
src/components/ui/picture.tsx, picture.test.tsx, dialog-opener.test.tsx;
src/features/admin-categories/category-image-dialog.test.tsx; src/features/admin-screening/photo-reviews.test.tsx.
Deleted: no file. One export was removed, `AvatarImage` from src/components/ui/avatar.tsx (ruling 1 (3c)), with the
`[intentional-delete]` marker in 02ddc3b77 and its line in docs/tracking/intentional-deletions.txt.

Paths outside the brief's SCOPE, each by a ruling: `.github/workflows/ci.yml` (ruling 2 (1), the one token on :682);
`scripts/e2e-browser-guard.ts` and its test (ruling 1 (4)); `src/components/ui/dialog.tsx` and `dialog-opener.test.tsx`
(ruling 2 (4)); `src/lib/stale-chunk.ts` and its test (ruling 2 (5), the probe confirmed); `scripts/brief/go-laws.ts`
and `scripts/conformance/briefs.test.ts` (ruling 2 (7)); the two new unit tests of `photo-reviews.tsx` and
`category-image-dialog.tsx` (ruling 1 (7)). `scripts/conformance/repeat-lane.test.ts` and `src/test/e2e-colors.test.ts`
are §10 departures.

## 3. Behaviour contract — before → after

**The picture (`ListingPicture`, and the new `Picture` it builds on).**

| case | at 50783a30e | after |
| --- | --- | --- |
| an image in a frame, Chromium | the `img` in flow, `block h-full w-full` (`listing-picture.tsx` :222), fills the frame | the `img` absolutely placed over the frame (`absolute inset-0 block h-full w-full`, `object-fit` cover or contain), fills the frame |
| the same inside a table cell, WebKit (My listings at 1280 and up) | drawn at the frame's width and the image's NATURAL height: 360×480 → 80×480, 480×360 → 80×360, 512×512 → 60×512 | fits: 80×60, 80×60, 60×60 (`measurements-part-a-webkit-1280.json`) |
| the image fails to load | an empty frame (or the browser's broken-image mark) | the existing empty-photo state (`ImageOff`) in the frame |
| server markup | the `img` and the frame | the same elements, new classes; the error state starts false on server and client |

**The fourteen hand-sized images** now draw through `Picture`, each with the frame its box had: photo changes and photo
reviews (staff thumbs, cover), the two-step sign-in QR (`settings.tsx`, contain), the ad's share QR (`share-ad.tsx`,
contain), staff's photo grid and the Remove dialog's photo (`listing-photos.tsx`), the gallery's main photo, thumbs and
full-screen viewer (`photo-gallery.tsx`; contain, cover, contain), the photo step's two tile kinds (`step-photos.tsx`,
cover), and the three category assets (`category-image-dialog.tsx`, contain). What each shows is unchanged; what
changes is the WebKit table-cell case above and the error state. `srcSet`/`sizes` pass through as before (INC-1122
unchanged, ruling 1 (2)).

**The dialog's opener (`dialog.tsx`, screen-sized panels: `variant="screen"` or `phone="full"`).**

| how the panel opened | at 50783a30e | after |
| --- | --- | --- |
| keyboard (Enter or Space on the control) | the focus returns to the control | unchanged |
| a click in Chromium (the control is focused) | returns to the control | unchanged |
| a click in Safari (the focus stays on the page, or on a focusable box around the control) | returns to the page | returns to the control the press landed on (`pressTarget`, press.ts) |
| a press that opened nothing, then a later opening by key | — | the press is not used (a key ends the gesture; one opening takes the press and empties it) |

Panels that are not screen-sized are unchanged: Radix returns their focus to a trigger only (§13).

**The stale-chunk reload (`stale-chunk.ts`, `reloadOnStaleChunk`).**

| case | at 50783a30e | after |
| --- | --- | --- |
| the first failed chunk download of a page that is staying | one reload, the time marked | unchanged (INC-640, INC-922, DEC-271) |
| a download failed while offline | no reload | unchanged (STC-2) |
| a second failure within the window | no reload | unchanged |
| a download the page abandons while leaving (after `beforeunload` or `pagehide`) | one reload, over the navigation (WebKit) | no reload |
| a leave that did not happen (a later press or key), or a page restored from the back-forward cache | — | staying again: a stale chunk reloads once |

No `unload` listener is added (it would disable the back-forward cache).

**The tests' environment.** `playwright.config.ts` gains `webkit-1280` (Desktop Safari, 1280×800) and `webkit-390`
(iPhone 13, 390×664), each running the `@webkit`-tagged tests; `ignoreHTTPSErrors` is set on those two only when
`E2E_LOCAL_BACKEND=1`. `install-browser-deps.sh` takes a browser list (default `chromium`); `local-backend-proof.yml`
gains the `webkit` lane, and the repeat lane repeats a changed spec's tagged tests in WebKit; `ci.yml`'s merged report
reads the `webkit` lane. `e2e-browser-guard.ts` admits Chromium and WebKit and nothing else.

**The walk** (the operator, after Publish, in Safari and on an iPhone, 1280 first and then the phone), each line's
expected result from the code as landed:
1. My listings — at 1280 the table: every photo whole in its 80×60 box, cropped to fill it, never stretched or taller
   than the row; every no-photo row shows its category picture whole inside its box. On the phone the cards: the same.
2. The home feed's cards — each photo fills the card's 4:3 picture, cropped, never stretched; a no-photo card shows its
   category picture whole and centred.
3. An ad page with a portrait photo — the gallery shows the photo whole at its own shape inside the frame (no
   stretching, no overflow); thumbs fill their boxes; the full-screen viewer shows it whole; closing the viewer with a
   tap puts the focus back on the photo that opened it (INC-1126).
4. The post wizard's photo step, after adding a portrait and a square photo — each tile is filled, cropped, never
   stretched; the category picture (before any photo) whole inside its box.
5. Settings → two-step sign-in: the QR code is whole and square (ruling 1 (6)).
6. Admin screening's photo review — each thumb fills its box, cropped, never stretched; a photo that fails to load shows
   the empty-photo mark in its box.

## 4. Censuses

- STEP 1's whole census is `docs/governance/reports/pictures.stop-1.md` (consumers, definition, tests, lists,
  old-file-readers, second-readers, chunk graph, environments with the reproduction, mechanisms, first download,
  premises, findings).
- Raw images after Part B: `rg -n "<img\b" src --glob '!*.test.*'` → one hit, `src/components/ui/picture.tsx` (the
  primitive). CF-PICTURE-1 → 3 hold it (the allowlist is empty, §7).
- Project names in specs (CF-HELPERS-9): 23 files still name a project (the allowlist, §7); the specs of the WebKit set
  read `layoutOf(page)`.
- Focus-return census (ruling 2 (4), K2), `rg -n "activeElement|onCloseAutoFocus|returnFocus|restoreFocus|previouslyFocused" src --glob '!*.test.*'`:
  `dialog.tsx` :130, :159, :167 (the mechanism); `wizard.tsx` :1286; `overlay-facade.tsx` :229; `guide-sheet.tsx` :61,
  :84, :88; `app-rail.tsx` :1149; `page-guide.tsx` :94. Each is judged in §6.
- Stale-chunk readers: `rg -n "reloadOnStaleChunk|vite:preloadError|STALE_CHUNK_KEY" src` → `stale-chunk.ts` and its
  test, and the root's one installer. The router's own reload (`lazyRouteComponent`) is a second reloader (§6, §13).
- WebKit's probe for INC-1127 (ruling 2 (5)), cold cache, "/" then at once `page.goto("/settings")`, ten runs each:
  WebKit — interrupted 7 of 10, `ethio:stale-chunk-reloaded-at` SET in 5; Chromium — 0 of 10. The order WebKit heard:
  `beforeunload`, about 40 ms later three `vite:preloadError`, then the reload's own `beforeunload`, then `pagehide`.
  After E6: the mark set in 0 of 10; 2 of 10 still interrupted, each with `tanstack_router_reload:<message>` set to 1
  (the router's reload, not ours).

## 5. Tests

**New unit and law tests** (ids from the diff of test titles, 50783a30e → HEAD):
- `src/components/ui/picture.test.tsx` PIC-1 → PIC-5 (frame and image classes, cover and contain, the error state,
  pass-through attributes, server markup); `listing-picture.test.tsx` LP-14 (the absolutely placed image and the error
  state); `photo-reviews.test.tsx` PRS-1 and `category-image-dialog.test.tsx` CIG-1 (each site draws through the
  primitive with its props, and the error fallback; ruling 1 (7)).
- `scripts/conformance/pictures.test.ts` CF-PICTURE-1 → 3 with a planted bypass; `lint-rules.test.ts` CF-LINT-6's
  planted `img`.
- `e2e-helpers.test.ts` CF-HELPERS-8 and CF-HELPERS-9 with planted specs; the judge `pictureFitProblems` unit-tested
  (INC-1121's 80×480 case red).
- `e2e-browser-guard.test.ts` EBG-1 → EBG-6; `install-browser-deps.test.ts` CF-INSTALL-7; `ci-deadlines.test.ts`
  CF-CID-8, CF-CID-9; `repeat-lane.test.ts` CF-CID-10 (four planted lanes); `briefs.test.ts` CF-BRIEF-17 (a planted
  wrapped ruling).
- `src/test/e2e-colors.test.ts` EC-7 (lightness read; WebKit's `167.600006` equals `167.6` at three places; a
  percentage lightness; oklab).
- `src/components/ui/dialog-opener.test.tsx` DO-1 → DO-5 (focus on the page plus a press → back to the control; focus
  on the box around the control; a panel drawn only while open; a keyboard opening unchanged; a stale press unused).
- `src/lib/stale-chunk.test.ts` STC-3 → STC-6 (leaving → none; a leave that did not happen → staying; an abandoned
  download is not the first failure; a leave heard before mount). Ruling 2 (5)'s four branches: stale → reload (the
  existing "reloads once…"), leaving → none (STC-3), offline → none (STC-2), second failure → none (STC-1, STC-5).

**New browser tests:** AP-56 (the gallery fits a portrait, a landscape and a square photo, in its frame and in the
viewer), PP-35 (photos of every shape fit the photo step, the preview's gallery and the viewer), MLP-9 (each row's
picture fits its box in the table and in the cards, every shape). Every spec naming a picture screen calls
`expectPicturesFit` (CF-HELPERS-8); 31 tests carry `@webkit`, across 14 spec files. No test id was removed or renamed.
Tolerances (decide-and-name): `PICTURE_PX = 1`, `PICTURE_RATIO = 0.01`.

**Red first.**
- INC-1121: the reproduction on 50783a30e in WebKit (§4 and stop 1's table: 60×512, 80×480, 80×360), and Part A's
  re-run fitting (`measurements-part-a-webkit-1280.json`).
- With `dialog.tsx` and `stale-chunk.ts` written back from 50783a30e (`git show` into place, then restored; `git
  status` clean after), `bunx vitest run src/components/ui/dialog-opener.test.tsx src/lib/stale-chunk.test.ts` gives
  `Tests 8 failed | 8 passed (16)`: DO-1, DO-2, DO-4, DO-5 and STC-3 → STC-6 fail; DO-3 (the keyboard opening,
  unchanged) passes. All pass on the final tree.
  - DO-5 was written after the first E5 form (an effect-installed listener) still failed DLG-E8's preview in WebKit,
    so the module-level install is what it proves.
  - STC-5 first passed on the old code by coincidence; it was tightened with intermediate counts until it failed there.
- With `e2e/helpers/colors.ts` written back from 50783a30e, `src/test/e2e-colors.test.ts` gives `Tests 1 failed | 6
  passed (7)`; the one is EC-7.
- EBG-6, CF-CID-10 and CF-BRIEF-17 fail on their planted cases.

**The judged WebKit run.** `webkit` lane on run 43355488221 (4268c6c09): 68 passed · 0 failed · 0 flaky · 24 skipped
· total 92 (46 a project). On the final run 43426917119 (e61da5bfc): 68 passed · 0 failed · 0 flaky
· 24 skipped · total 92.

**Local browser runs** (`bun run e2e:local`, ethio-staging, 0 retries):
- The changed specs whole in Chromium (`mobile-360`, `desktop-1280`), on 4268c6c09's code: 518 tests — 460 passed,
  2 failed, 56 skipped. The two are PP-8 in both projects (`DELETE removes the row and the objects`): the storage
  objects remain after DELETE on ethio-staging. Nothing in its path changed, and it passes on CI's temporary backend
  (§12, §13).
- The WebKit set whole (`webkit-1280`, `webkit-390`): 92 tests — 67 passed, 1 failed, 24 skipped. The one is SCS-1 at
  834 light: `page.goto: Frame load interrupted` at `e2e/helpers/ui.ts` :544, with "Importing a module script failed."
  before it — the router's own reload (§13).
- `e2e/on-demand-failure.spec.ts` in Chromium: 2 passed (ruling 2 (5)'s proof).
- STG-1 and SCS-1 in WebKit, three repeats each: 72 tests — 36 passed, 36 skipped, 0 failed.
- DLG-E8 in WebKit: 2 passed.
- `[ssr-error]` lines (`rg -c` over the five logs): one, in the WebKit-set run: `/api/listings/view insert or update
  on table "listing_counters" violates foreign key constraint "listing_counters_listing_id_fkey"`. It is a view
  counted for an ad that was no longer in the listings table, by the message's foreign key. I did not trace which
  test's ad it was; no file of this turn is in the view route's path. The Chromium runs: none.

**Unit totals.**
- `bunx vitest run scripts src --maxWorkers=2` on aa658b697: Test Files 481 passed (481); Tests 3026 passed |
  1 skipped (3027).
- On e61da5bfc, whose only change is a comment in an e2e spec: `bunx vitest run scripts --maxWorkers=2` gives Test
  Files 114 passed (114), Tests 594 passed | 1 skipped (595); `bun run typecheck` exits 0; lint and Prettier are clean
  on the spec.

**THE CHECKS** (`bun run checks`, e61da5bfc):
- fast line: `checks (fast): 26 PASS · 0 FAIL · 425s — laws-first, scope, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)`
- last line: `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 485s`
- The run on aa658b697 before it: `checks: 35 PASS · 0 FAIL · 24 NOT RUN · 482s`.
- NOT RUN, each with the runner's reason:
  - scope › Decide whether the lanes run — needs the push's base and the Actions API (DEC-365), which exist only in a
    GitHub run.
  - build-and-check › Workflow lint (actionlint), and secrets-scan › Secrets scan (gitleaks) — pinned linux/x64
    binaries; this machine is darwin/arm64.
  - The four "Install dependencies" steps (build-and-check, component-tests, dependency-audit, bundle-budget) — the
    dependencies are already installed.
  - dependency-audit › Audit — the advisory service is not reachable from the sandbox.
  - e2e-preflight (four steps) — they compare migrations with ethio-staging through credentials the script never holds.
  - e2e (six steps) — they merge the browser lanes' artifacts from GitHub.
  - promote (four steps) — only CI promotes (DEC-020).
  - semgrep › Upload SARIF and its warning step — only GitHub receives the upload.

`bun scripts/brief/check-go.ts docs/governance/briefs/pictures.md --at 50783a30e` → `[check-go] no finding`.

**J-audit** (e2e/** changed): the new tests make their own scratch rows through the harness (J1, J3), measure real
photos of three shapes uploaded through the photo route (`uploadPhoto`, `e2e/helpers/photos.ts` :211). They wait on
states. The two timers in the added code are both in `e2e/helpers/pictures.ts`:
- :182 caps each image's wait for its `load` or `error` event at `LOAD_WAIT_MS`;
- :248 is the 200 ms interval between re-reads, under the `SETTLE_MS` deadline (a poll, as `expect.poll` does).

No outcome rests on a fixed sleep. `rg` over the added e2e lines finds no `waitForTimeout`, `expect.soft` or retry
setting; three tests raise their own timeout (`test.setTimeout`) for the uploads.

## 6. K2 — siblings that bypass the mechanism

Greps run: the four in §4, plus `rg -n "as unknown as" src --glob '*.test.*'`.
- **The opener (INC-1126).** No other place records who held the focus in order to give it back, so none has the
  Safari gap:
  - `src/features/posting/wizard.tsx` :1286 blurs the focused field when an action button is clicked; it gives nothing
    back.
  - `src/components/shell/app-rail.tsx` :1149 returns the focus to the named ☰ control (`[aria-controls="rail-menu"]`),
    found by query.
  - `src/components/shell/guide-sheet.tsx` :84 returns it to a ref its caller passes (`page-guide.tsx` :94).
  - `src/components/ui/overlay-facade.tsx` :229 replays a focus intent only when the node is already focused.
  - Radix's own return goes to a `DialogTrigger` (always asChild), so it is independent of the click's focus.
  - `press.ts` is the press mechanism; `dialog.tsx` reads its `pressTarget` and keeps no second definition.
- **The stale chunk (INC-1127).** `node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js` :37 → :41 is a
  second reloader for the same concern. On `isModuleNotFoundError` it reloads once per message
  (`tanstack_router_reload:<message>` in sessionStorage), and it knows nothing of the page leaving. It is a dependency,
  so it was not touched. It causes the remaining rare WebKit interruptions (§13).
- **The picture.** No bypass is left under `src/` (CF-PICTURE-1 → 3). The two canvases (`photo-editor.tsx` :269,
  `background-dialog.tsx` :172) are outside the definition, with the reason in the guard's header (ruling 1 (3b)).
- **The project-name branch.** 23 spec files, listed in the allowlist until the e2e leftovers turn (INC-1123).
- **Casts in tests.** `rg -c "as unknown as"` finds 73 hits in tests under `src/`, which TypeScript's law forbids.
  Mine was fixed (aa658b697); the others were not touched.
- **A timeout without a named cause.** PP-23 (`e2e/photo-pipeline.spec.ts` :1335, unchanged by this turn) raises its
  timeout to 150 s with no comment, the form PP-35's fix (e61da5bfc) corrected in this turn's own test. It was not
  touched.

## 7. Allowlists and guards

| allowlist | at 50783a30e | after | lines |
| --- | --- | --- | --- |
| `scripts/conformance/pictures-allowlist.txt` | — (new) | 0 entries (header only) | born empty, ruling 1 (3a) |
| `scripts/conformance/e2e-helpers-allowlist.txt` | 0 | 23 | each `e2e/<spec> project-name \| branches on a Playwright project's name; until the e2e leftovers turn moves it onto layoutOf (e2e/helpers/layout.ts) \| INC-1123` (ruling 1 (4)) |
| `scripts/conformance/non-null-allowlist.txt` | `e2e/admin-listings.spec.ts (11)` | `(7)` | the count only falls |
| `scripts/conformance/briefs-allowlist.txt` | 1 (`investigation-photos.md`) | 0 | removed at STEP 0: PR #36 merged (2026-11-12T21:00:34Z, 50783a30e) |

New guards, each with its planted self-test run green inside `bunx vitest run scripts`: CF-PICTURE-1 → 3, CF-LINT-6
(`RESTRICTED_SYNTAX.picture`), CF-HELPERS-8, CF-HELPERS-9, CF-INSTALL-7, CF-CID-8, CF-CID-9, CF-CID-10, EBG-1 → EBG-6,
CF-BRIEF-17. Their callers are named in `scripts/conformance/wired.test.ts`.

## 8. Strings

None (FLAG no-new-string). `bun run i18n:usage` was run after the moved sites. Each of the two maps changed one line,
`"scanned": 712` → `713` (the new `picture.tsx`); no key changed.

## 9. Migrations

None (FLAG no-migration).

## 10. Departures

- **Ruling 1** (stop 1), `docs/governance/briefs/pictures-ruling-1.md`, saved bare in E1 (sha256 9e83316a…):
  - the frame-and-image form and `Picture`;
  - the gallery's `srcset` out of this turn (INC-1122);
  - the swatch and the canvases outside the definition;
  - `AvatarImage` deleted;
  - `layoutOf` and CF-HELPERS-9, with `scripts/e2e-browser-guard.ts` in scope;
  - the WebKit set by tag in one `webkit` lane;
  - walk line 5;
  - the two new unit tests.
- **Ruling 2** (stop 2), `docs/governance/briefs/pictures-ruling-2.md`, saved bare in E1 (sha256 004d80de…): Part E,
  E1 → E6, and `.github/workflows/ci.yml` for the one token on :682.
- **Decide-and-name** (the brief's list):
  - the frame-and-image form: the image absolute, `inset: 0`, 100 %×100 %, `object-fit`;
  - the primitive: `Picture`, `src/components/ui/picture.tsx` (props `src`, `fit`, `alt`, `className`/`style` for
    the frame, `frameTestId`, `imgTestId`, `imgClassName`, `width`, `height`, `loading`, `fetchPriority`, `decoding`,
    `srcSet`, `sizes`, `draggable`, `onLoad`);
  - the devices: Desktop Safari 1280×800 and iPhone 13 390×664;
  - the named set: by tag (`@webkit`);
  - the helper's tolerances: ±1 px, ±1 %;
  - each site's mapping: §3;
  - the install script's browser list: positional names, default `chromium`.
- **INC-1127's form** (ruling 2 (5), the plan's choice): a leaving mark (`hearLeaving`: `beforeunload` and
  `pagehide`, never `unload`), heard from the module's first evaluation.
  - A "the chunk is really gone" check would need a second request to the same address while the page is leaving, and
    WebKit cancels it too.
  - The mark ends at the next press or key, or at a `pageshow` from the back-forward cache, so a cancelled leave never
    silences a real stale chunk.
- **CF-BRIEF-17 judges the brief in force's rulings only.** 61 of the 89 ruling files under `docs/governance/briefs/`
  do not open with "RULING — ". Judging every file would turn the law red on records it may not edit; the other text
  laws are scoped the same way.
- **CF-CID-10 lives in `scripts/conformance/repeat-lane.test.ts`**, the conformance file that already reads both
  workflows (ruling 2 (1): "the plan names it"). No scope line names that file. Its check compares the evidence
  pattern's lanes as a set, because RPL-2's anchor (kept, as ruling 2 (1) says) fixes the pattern's order differently
  from the matrix.
- **`src/test/e2e-colors.test.ts`** (EC-7) is not named in any scope line. It is the existing unit test of
  `e2e/helpers/colors.ts`, which ruling 2 (3a) changed.
- **The direct `playwright test --list` run.** Once, during part D, I listed the WebKit tests with
  `bunx playwright test --list` directly. It runs no test, but rule 50 forbids `playwright test` outside `e2e:local`.
  Every later list and run went through `bun run e2e:local`.
- **Two extra pushes.** Ruling 2 (10) names one code push and then the report's docs-only push. The self-review's two
  BLOCKER fixes are code commits: aa658b697 (the cast) and e61da5bfc (PP-35's timeout comment). Each was pushed after
  `bun run checks` passed on it and before the report. e61da5bfc's run is §11's judged run.
- **The review's line.** The first review ended with 2 MINOR. While writing this report I could not recover which two
  they were, so I ran the review again on the whole diff. It found the PP-35 BLOCKER above, and its line is the one in
  the header. Its three MINOR items are left as they are:
  - Three `expectPicturesFit` calls take `atLeast: 0` (§13). Each screen is measured elsewhere with at least one
    picture.
  - The dialog's press record keeps the last pressed control until the next press or key when that press opened
    nothing. Ruling 2 (4)'s law, "holds no element after the opening", holds, because an opening empties it. This is
    one module-level reference, replaced at the next press.
  - MLP-9's `{ timeout: 15000 }` wait for its rows follows the file's own convention (48 uses at the base) and names
    no cause of its own.
- **Amended before their push.** E5 and E6 were each amended before any push, to switch to `pressTarget` and to the
  module-level `hearLeaving`. No pushed commit was rewritten.
- **The records' wording** (§14): two substitutions follow the rulings' own instructions. DEC-371's lane phrase follows
  ruling 1 (5), and INC-1121's cause line follows ruling 1's Records. The brief's changelog clause "the gallery's
  `srcset` gives true widths" no longer holds (ruling 1 (2), INC-1122). It is copied word for word, with a note beside
  it for the supervisor.

## 11. CI

dev's base, `docs/tracking/ci-status.md` on ci-evidence, first six lines:

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `50783a30ef18689b9b362d82397e1a3de4650b8c` (short `50783a3`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-12T21:24:25Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43305919223
```

Two-step SHA check: the file's commit equals `origin/dev` (50783a30e, unchanged through the turn), and
`gh run view 43305919223` gives headSha 50783a30ef18…, success, push. No red from an earlier turn.

This pull request's runs:
- 43306270722 (77cdacf62, the task saved) — success.
- 43308761396 (c20a844dd, stop 1) — success.
- 43319295611 (ea41af488, stop 2) — failure. The `webkit` lane passed 14, failed 38 and had 2 flaky. Class: this
  turn's defect. The browser did not trust the temporary backend's certificate (INC-1125, fixed e4c536539). The merged
  report named no failing test because `ci.yml` did not list the lane (INC-1124, fixed 6aaf10822). Nothing was
  re-run.
- 43355488221 (4268c6c09, part E) — success, every job.
  - `webkit` 68 passed · 0 failed · 0 flaky · 24 skipped · total 92.
  - DEC-371's lane time: the `webkit` job took 717 s (its proof step 698 s, the tests 503 s). The slowest Chromium lane
    was Lane 2 at 1,305 s, so WebKit runs inside it and adds no wall time; the machine time added is about 12 min.
- 43423646341 (aa658b697, the first review fix) — success, every job; its `webkit` job passed in 698 s (its counts
  were not read: the branch's evidence file now holds the later run).
- 43426917119 (e61da5bfc, the second review fix) — success, every job; `gh pr checks 37`: 43 pass, 1 skipping. The
  branch's evidence (`docs/tracking/branches/cursor/pictures/ci-status.md`) names e61da5bfc, SUCCESS, completed
  2026-11-13T13:03:59Z; its `local-backend-proof.md` names db6596e44, the pull request's merge ref of e61da5bfc in the
  same run. `webkit` 68 passed · 0 failed · 0 flaky · 24 skipped · total 92; the job took 787 s (`gh run view`), its
  proof 761 s; the slowest Chromium lane was Lane 2 at 1,324 s.

## 12. Limits

- **CF-REDACT-1 failed once** under the concurrent browser build: `× CF-REDACT-1 the module masks every pattern and the INC-794 probes; the commit stays 65ms`.
  It then passed 5 of 5 alone, and every later whole run was green. This turn did not touch it (ruling 2 (8): the
  supervisor ledgers it).
- **PP-8 fails on ethio-staging** in both Chromium projects: the storage objects remain after DELETE. It passes on CI's
  temporary backend. I cannot see staging's storage configuration, and nothing in the test's path changed (§13).
- **The lanes' proof artifacts were not all downloaded.** One download of every artifact of 43355488221 was
  interrupted. The lane times come from `gh run view --json jobs`, and the WebKit counts from the lane's own evidence
  on ci-evidence.
- **DEC-371's frozen judge** asks for ten runs. The WebKit lane completed three runs in this turn after its fixes
  (43355488221, 43423646341, 43426917119), all green; the rest are the next pushes'.
- **Rendered acceptance** is the operator's walk (§3). I verified by typecheck, unit tests, the guards, and the
  browser runs above.
- The scratch copy `/tmp/ethio-scratch/pictures/` (logs, probes, the base build `dist-base`) is the operator's to
  remove.

## 13. Findings

- **The router's own stale-chunk reload.** `node_modules/@tanstack/react-router/dist/esm/lazyRouteComponent.js` :37 →
  :41 reloads once per message on a failed route-module download, even while the page is leaving. In WebKit it still
  interrupts a navigation that starts during the first load:
  - 2 of 10 in the probe after E6;
  - SCS-1 once in the local WebKit-set run (`Frame load interrupted` at `e2e/helpers/ui.ts` :544);
  - once in 52 local runs of STG-1 and SCS-1 after E6.

  It is a second reloader for the stale-chunk concern, outside `stale-chunk.ts`. Suggested fix, in its own turn: route
  the router's module errors to the one mechanism, for example by wrapping the route loader so a leaving page never
  reloads.
- **PP-8 on ethio-staging.** `e2e/photo-pipeline.spec.ts` :340: the DELETE leaves storage objects on staging while the
  temporary backend removes them. Staging's storage policies or its cleanup differ from the migrations' backend.
- **A stale comment.** `e2e/shell-table-law.spec.ts` :13 says "playwright.config.ts defines only mobile-360 and
  desktop-1280". The config now has four projects.
- **INC-1123's count.** Ruling 1 records 42 spec files that branch on a project's name. The guard's census found 30
  at Part C: 7 moved onto `layoutOf` with the WebKit set, and 23 are in the allowlist.
- **AP-30 and AP-44 stay out of WebKit.** AP-30 needs the clipboard permission, which only Chromium grants, and AP-44
  needs a mouse wheel, which mobile WebKit does not take. Their screens are measured in WebKit by the tests named for
  them, so the WebKit set is 46 tests a project. `docs/features/e2e-harness.md` :655 records it.
- **`atLeast: 0` in three places.** `e2e/sage-cards.spec.ts` :203 (the wells), `e2e/sage-tiers.spec.ts` :475 and
  `e2e/admin-screening.spec.ts` :1028 (SC-21, a removed photo's change draws none) pass with no picture measured.
  Each screen is measured elsewhere with `atLeast ≥ 1`, but these three calls alone prove nothing.
- **SC-20's photo rows have no files.** `e2e/admin-screening.spec.ts` :733 (`seedHeldPhotos`) inserts photo rows with
  no stored file, so SC-20's pictures cannot load or be measured. The photos card is measured in AL-28 instead.
- **Controlled panels that are not screen-sized give the focus back nowhere.** This holds in every engine: Radix
  returns the focus only to a `DialogTrigger`, and `dialog.tsx` :138 → :140 restores it only for screen-sized panels.
  A centred dialog opened from a tap without a trigger leaves the focus on the page after it closes.
- **Rules that name only Chromium.** `.cursor/rules/00-protocol.mdc` :118 and `.cursor/rules/20-tests.mdc` :97, :105
  still say "both projects (mobile-360, desktop-1280)" (stop 1's finding; the brief's rules turn 4).
- No security hole was met.

## 14. Records

INC — (ruling 1's Records, the cause line it gives, in the brief's INC-1121 with its brackets filled) INC-1121 — in
WebKit (Safari, every iPhone), the picture mechanism drew every photo at its frame's width and its NATURAL height and
every category picture blank (its empty top margin), on My listings and every screen drawing `ListingPicture` at large
widths (the operator's measurements, Safari 1352 wide: 480×320 → 80×320, 640×480 → 80×480, 512×512 → 60×512; Chrome
correct); cause: the image sized by a percentage height (`listing-picture.tsx` :222) inside a table cell — My listings'
table form at 1280 and up; WebKit only (the census's reproduction: portrait 360×480 → 80×480, landscape 480×360 →
80×360, square 512×512 → 60×512); why unseen: the lanes ran Blink only and no test measured a drawn picture against its
frame. Evidence: the operator's two snippets; the investigation (PR #36: every picture fits in Blink at three commits);
the WebKit reproduction (50783a30e, WebKit 26.0 at 1280, My listings' table form: category 512×512 drawn 60×512 in a
60×60 frame, portrait 360×480 drawn 80×480 in 80×60, landscape 480×360 drawn 80×360 in 80×60; the card form at 1024,
the feed, the gallery and the illustration fit). Fix: the mechanism's frame-and-image form; the fourteen raw images onto
one primitive (CF-PICTURE-1 → 3); `expectPicturesFit` on every picture screen in both engines (CF-HELPERS-8); DEC-371.
Class: a browser engine the users use that CI never ran; a rendering concern with fourteen local copies. Status: FIXED
(the pictures turn).

INC — (ruling 1's Records) INC-1122 — the ad gallery's `srcset` gives a photo's long edge as its width
(`photo-gallery.tsx` :271 → :273), so browsers fetch a file too small for a portrait (softer, never distorted); fix:
carry each photo's width and height through the photo links, the posting service and the public listing read; the
photo-data turn; OPEN.

INC — (ruling 1's Records) INC-1123 — 42 spec files branch on the Playwright project's name (`"desktop-1280"`,
`"mobile-360"`), so a new project (WebKit) silently skips their layout branches; fix: `layoutOf(page)` everywhere,
CF-HELPERS-9's allowlist to zero; the e2e leftovers turn; OPEN.

INC — INC-1124 — the merged E2E report in `ci.yml` (:682) did not list the `webkit` lane, so a red WebKit lane turned
E2E red while `e2e-last-failure.md` named no failing test, and a WebKit test that passed on retry never reached the
flake ledger (run 43319295611); the second lane missed by a list that reads lanes (INC-966: `repeat`); fix: the token,
and CF-CID-10 — the lane matrix is the one list, and every reader equals it; the pictures turn; FIXED 6aaf10822.

INC — INC-1125 — the `webkit` lane's browser did not trust the temporary backend's certificate (an authority made for
the run, trusted through the NSS database and `NODE_EXTRA_CA_CERTS` only), so every photo, and the calls behind the
sign-in and read timeouts, failed at `https://127.0.0.1:31321`: 14 passed, 38 failed and 2 flaky on the lane's first
run (43319295611); the census had run WebKit against ethio-staging; fix: `ignoreHTTPSErrors` on the two WebKit
projects for the temporary backend only, EBG-6; the pictures turn; FIXED e4c536539; the judged run's `webkit` line:
68 passed · 0 failed · 0 flaky · 24 skipped · total 92 (run 43355488221).

INC — INC-1126 — in Safari a click does not focus a button, so a screen-sized dialog opened by a click (the photo
viewer) recorded the page as its opener and gave the focus to the page on close (`dialog.tsx` :113 → :115; DLG-E8 in
WebKit); fix: the opener falls back to the control the opening press landed on; the pictures turn; FIXED 7a1238685;
K2: `wizard.tsx` :1286 (blurs a field, gives nothing back — no gap), `app-rail.tsx` :1149 (returns to the named ☰
control — no gap), `guide-sheet.tsx` :84 (returns to its caller's ref — no gap), `overlay-facade.tsx` :229 (replays a
focus already held — no gap), Radix's own return to a `DialogTrigger` (no gap); non-screen panels opened without a
trigger return the focus nowhere in every engine (§13).

INC — INC-1127 — HYPOTHESIS: in WebKit the downloads a page abandons when it navigates away fail as errors, and the
stale-chunk handler (`stale-chunk.ts` :57 → :69) reloads the page over the navigation ("Navigation to "/settings" is
interrupted by another navigation to "/"" — STG-1 on staging; LY-1, LY-3, LY-4, PP-12 and PW-3 in the lane's first
run); probe: cold-cache WebKit, '/' then at once '/settings': interrupted 7 of 10, the mark SET in 5; Chromium 0 of 10;
fix: a leaving mark (`hearLeaving`: beforeunload and pagehide, never unload), heard from the module's first evaluation;
the router's own lazyRouteComponent reload remains (2 of 10); the pictures turn; FIXED 4268c6c09.

DEC — (the brief's, with ruling 1 (5)'s lane phrase) DEC-371 (the supervisor, 2026-11-12 16:xx New York, under G17 and
G22 — the e2e harness is a closed surface; INC-1121; the operator's walk and Console measurements in Safari,
2026-11-12) — the browser tests run in WebKit as well as Blink for the screens whose rendering differs by engine: one
dedicated WebKit lane running the `@webkit`-tagged tests on two devices (Desktop Safari at 1280×800, `webkit-1280`;
iPhone 13 at 390×664, `webkit-390`) on every push, the lanes install WebKit through `install-browser-deps.sh` (DEC-366's
probe) beside Chromium, and the repeat lane repeats a changed spec of the set in both engines; the rest of the suite
stays Blink-only until measured. Why: every iPhone visitor uses WebKit whatever browser they open, and a picture defect
drew wrong there for every seller while 2,800 Blink tests passed. Frozen judge: adopted when the WebKit projects
reproduce INC-1121 on the base and pass on the fix, and ten runs pass with the added lane time within [12 → 12]
minutes (the `webkit` job's 717 s on run 43355488221, beside the slowest Chromium lane's 1,305 s); widened to the full
suite only by a new DEC on measured cost; reverted never for a WebKit-only red (that is a defect).

DEC — DEC-371 amendment — the WebKit lane runs against the temporary backend with `ignoreHTTPSErrors` on its two
projects only (INC-1125; EBG-6); the WebKit set is the `@webkit`-tagged tests: 46 per project on the judged run
(43355488221), the tests that left it: AP-30 (the clipboard permission is Chromium's alone) and AP-44 (mobile WebKit
takes no mouse wheel), their screens measured in WebKit by the tests named for them (§13;
`docs/features/e2e-harness.md` :655).

register row — "a picture fills its frame in every engine" → listing-picture.tsx + `src/components/ui/picture.tsx`
(`Picture`) → CF-PICTURE-1 → 3, the lint rule → exceptions: none

register row — "drawn pictures fit their frames (behaviour)" → e2e/helpers/pictures.ts → CF-HELPERS-8 → exceptions:
none

register row — "the browser tests run in every engine users use (DEC-371)" → playwright.config.ts +
install-browser-deps.sh → the install-matches-projects rule → exceptions: the full suite in WebKit (roadmap)

register row — (ruling 2 (9)) the CI-lanes row gains CF-CID-10; the browser-guard row gains EBG-6; the briefs row gains
CF-BRIEF-17.

changelog — 2026-11-1x the pictures turn (Opus 5.5): every picture fills its frame in every engine — the picture
mechanism's frame-and-image form fixed for WebKit, with an error state (INC-1121); the fourteen hand-sized images
through one primitive (CF-PICTURE-1 → 3 and a lint rule); `expectPicturesFit` on every picture screen with portrait,
landscape and square photos (CF-HELPERS-8); the picture and layout specs run in WebKit too (DEC-371; 12 min of lane
time); the gallery's `srcset` gives true widths; the merged report reads the webkit lane; WebKit trusts the temporary
backend's certificate; a dialog opened by a click in Safari gives the focus back; a download abandoned by leaving the
page no longer reloads it.
(Note for the records turn: the clause "the gallery's `srcset` gives true widths" did not land — ruling 1 (2) moved it
to INC-1122, OPEN.)

roadmap — "the full suite in WebKit — measure after DEC-371's first ten runs" (the records turn writes it — DEC-346).

roadmap — (ruling 1, PREVENTION) the GO template's `environments` item gains "a rendering defect is reproduced in each
layout form the screen has (table, cards, grid) and each engine, before its cause is written".

roadmap — (ruling 2, PREVENTION (2)) template line: a GO that adds a browser or a lane names each environment fact the
lane relies on (certificate trust, fonts, locale), and the census proves each for the new engine on the lane's own
backend, or says it cannot and names the first CI run as the proof.

slip — CF-REDACT-1's one failure under the concurrent build (§12; ruling 2 (8): the supervisor ledgers it).
