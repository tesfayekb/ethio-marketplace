# Task: sage-s6-4-screens. Base: dev 0ca681c0a. — report

Base: 0ca681c0a · Final commit: acf1b0551 · Brief: docs/governance/briefs/sage-s6-4-screens.md (no sha256 given)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on acf1b05

CI on the base: 0ca681c0a, **SUCCESS** (run 41287917217); `origin/dev` is still 0ca681c0a. This pull request's first run (6491b6492, the stop-2 push) was red on the first-paint budget only (section 11).

## 1. Done / not done, by part and step

Every item is done.

- **Stops and rulings.**
  - Stop 1 (3f221b8fe): DLG-E7 was already taken. Ruling 1 (saved 526e9d642): the screens' test is DLG-E8, and the four choices stand (the panel's focus, the preview's close, the viewer's arrows' allowlist line, the pin dropper's frame).
  - Stop 2 (6491b6492): the place step moved the page when the pin map opened, from a file outside scope. Ruling 2 (saved b9976404c): `step-where.tsx` joins the scope, and `stillPage` becomes a helper in `e2e/helpers/ui.ts`.
- **Item 1, commit 0a40b21d3: the screen variants.**
  - `DialogContent` gains `variant="screen"` (`SCREEN_PANEL`: the page's surface, edge to edge, at every width) and `phone="full"` (`DIALOG_PHONE.full`: the whole screen below md, the card from md).
  - The photo viewer (`photo-gallery.tsx`, `layer="viewer"`), the ad preview (`preview-sheet.tsx`) and the map pin dropper (`map-pin-dropper.tsx`, `phone="full" fit="fill"`) ride it. Each now gets Radix's focus trap and layer stack, Escape, row 77's scroll lock, NoticeOutlet (row 52) and the one scrim.
  - Gone from the three surfaces: their portals, their `role="dialog"` / `aria-modal` layers, their Escape handlers (the viewer's document capture, the preview's document listener, the dropper's window listener), their focus code, and the preview's `body.style.overflow` lock.
  - A screen-sized panel (`variant="screen"` or `phone="full"`) takes the focus on itself when it opens and gives it back to what held it when it closes. Radix 1.1.15 returns the focus only to a `DialogTrigger`, and none of the three has one.
  - The viewer's arrow keys stay, as the panel's own `onKeyDown`.
  - The dropper's state moved into an inner `PinSheet` that mounts with the panel: the facade draws the content only once the overlay module has arrived, and Leaflet needs its box. The thumbnail strip's keep-in-view moved into `Thumbs` for the same reason.
  - The dropper's frame follows ruling 1: Cancel then Save in `DialogFooter`, `LIST_ROW` result rows, `LIST_ROW` / `LIST_CHOICE_ON` choice rows, `DialogDescription`.
  - Ruling 3 of the plan (Leaflet under Radix's focus trap) was not needed: the where, place and bundle2 specs pass whole (section 5).
- **Item 2, commit 58b7cec02: CF-DIALOG-1 rule 2 (DG-2).** In any .ts or .tsx file outside the primitive's own files (MODAL_OWNERS), each of these fails, planted:
  - `role="dialog"` or `"alertdialog"`, as an attribute, a prop object or `setAttribute`;
  - `aria-modal`;
  - a class list holding both `fixed` and `inset-0`, whether a string, a template or a whole className.

  Its allowlist starts empty, and the phone menu passes by definition (ruling 9).
- **Item 3, commit 51fc2bd3c.** No z-index literal is left in the three surfaces. `Z_SHEET` and `Z_VIEWER` are read only through `DIALOG_LAYER`, and `layers.ts` says so.
- **Item 4, commit 87893ddc6: DLG-E8 and ruling 2.**
  - DLG-E8 opens three surfaces at 390 (mobile project) and 1440 (desktop project), light, then dark with reduced motion:
    - the viewer on the ad page;
    - the preview on the review step, then the viewer over it;
    - the pin map on the place step.
  - `step-where.tsx` keeps its pin line (`post-pin-position`) drawn while the sheet is open. The sheet's own line is `post-pin-sheet-position`.
  - The ten reads were re-pointed (section 5).
  - `stillPage(target, { what, timeout })` sits in `e2e/helpers/ui.ts` beside `settled`. It is documented as the wait for content that arrives late over the network, and it is a bounded `expect.poll` with no sleep.
- **Item 5, commits d1b7d5581 and 7d9ff6b92: growth** (section 3).
- **Docs, commit 180604b05:**
  - design-foundation's "The full-screen surfaces (turn S6-4)";
  - register rows 48 and 88;
  - one changelog line;
  - the roadmap line, plus line 3's note that ruling 1 named the test DLG-E8.
- **Review fix, acf1b0551:** DLG-E8's raised timeout names its cause.
- **THE CHECKS, THE BROWSER CHECK and THE SELF-REVIEW** were run (section 5).

## 2. Files changed

`git diff --name-only 0ca681c0a` (this report added by its own commit):

```
docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s6-4-screens.md
docs/governance/briefs/sage-s6-4-screens.ruling-1.md
docs/governance/briefs/sage-s6-4-screens.ruling-2.md
docs/governance/mechanisms.md
docs/governance/reports/sage-s6-4-screens.stop-1.md
docs/governance/reports/sage-s6-4-screens.stop-2.md
e2e/dialogs.spec.ts
e2e/helpers/ui.ts
e2e/post-wizard-bundle2.spec.ts
e2e/post-wizard-place.spec.ts
e2e/post-wizard-where.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
scripts/route-budgets.mjs
src/components/layout/layers.ts
src/components/ui/dialog-look.test.tsx
src/components/ui/dialog-look.ts
src/components/ui/dialog.tsx
src/features/posting/map/map-pin-dropper-offline.test.tsx
src/features/posting/map/map-pin-dropper.tsx
src/features/posting/preview/photo-gallery.test.tsx
src/features/posting/preview/photo-gallery.tsx
src/features/posting/preview/preview-sheet.test.tsx
src/features/posting/preview/preview-sheet.tsx
src/features/posting/step-where.tsx
```

- **New files** (`git diff --name-status 0ca681c0a`, status A): the brief, its two rulings and the two stop reports. Each is in `git ls-files`.
- **Deleted files:** none.
- **Scope:**
  - `step-where.tsx` and the where, place and bundle2 specs joined by ruling 2, as did `e2e/helpers/ui.ts`.
  - The i18n maps, the allowlist and the docs are under the standing allowance.
  - Named in scope but not changed:
    - `scripts/check-bundle-size.mjs` (the entry did not move);
    - `scripts/e2e-select.ts` (no new spec; its self-test passes);
    - the holds-its-box and notice-outlet guards (their lists did not change: the three surfaces now ride Dialog, which NoticeOutlet's census already reads).
  - AGENTS.md is untouched.

## 3. Behaviour contract — before → after

| What | Base 0ca681c0a | Now |
|---|---|---|
| The photo viewer | its own portal on `document.body`, `role="dialog"` `aria-modal`, `Z_VIEWER` literal; Escape and the arrows captured on the document | `DialogContent variant="screen" layer="viewer"`; Escape is Radix's (top layer only); the arrows are the panel's `onKeyDown` (the same keys under the focus trap) |
| The viewer's close | a text button "Close" (`common.close`), focused on open | the primitive's icon close (screen-reader text `common.close`, test id `gallery-viewer-close` kept); the panel takes the focus on open (MINOR) |
| The viewer's focus on close | sent to the gallery's main photo by the gallery's own code | given back to what held it when it opened (the main photo), by the primitive |
| The ad preview | its own portal, `role="dialog"` `aria-modal`, `Z_SHEET`, its own Escape listener and body overflow lock; the title `text-base font-semibold`; a text button "Close preview" (`post.preview.close`), focused on open | `DialogContent variant="screen"`: the primitive's title look (the display face, 20 px, 800), its icon close (test id `post-preview-close` kept, ruling 1), the panel focused on open, row 77's lock; the newest `onClose` is called (PSH-2) |
| The pin dropper | its own backdrop (`bg-background/80`), full screen ≤ 640 px, a 42rem dialog above; a sticky action row Save then Cancel (`min-h-11 flex-1`); Escape on the window | `DialogContent phone="full" fit="fill"`: the whole screen below md, a 32rem card from md (ruling 1); `DialogFooter` Cancel then Save (`size="touch"`); the scrim, the close and Escape cancel |
| The pin dropper's position line | test id `post-pin-position`, the same id as the step's own line, which was hidden while the sheet was open | `post-pin-sheet-position`; the step's line stays drawn under the sheet (ruling 2) |
| The pin dropper while a save is in flight | Cancel disabled; Escape closed it | Cancel disabled; Escape, the close button and a press on the scrim close it (MINOR) |
| Every other dialog | — | unchanged: the same classes; the new focus code runs only for a screen-sized panel |
| Words, keys, routes, doors | — | no key added or changed; `post.preview.close` now has no reader (section 8) |

**Page sizes**, from `node scripts/check-bundle-size.mjs` on the base's build and the tree's (local builds). The base was measured by writing the base's versions of the 11 changed source files into the tree, then restoring them; `git status` was then clean.

- **The entry:** 126.1 → 126.1 KiB. The CSS: 21.5 → 21.4 KiB.
- **The ad page** (`/l/$slug`): 256.4 → 256.4 KiB, unchanged. The viewer now rides Dialog, which the page already carried.
- **Grew** (they carry `dialog.tsx`: the screen variant and the focus return):
  - +0.3 KiB: `/admin/ai`, `/admin/attributes`, `/admin/categories`, `/admin/countries`, `/admin/coverage`, `/admin/legal`, `/admin/legal_/edit`, `/admin/listings`, `/admin/places`, `/dev/style`, `/my-listings`;
  - +0.1 KiB: `/admin/audit`, `/admin/legal_/$versionId`, `/admin/roles_/$roleId`, `/admin/translations_/$lang`, `/my-listings_/$listingId`.
- **Shrank** (the three surfaces' own portals, Escape and focus code left):
  - −0.3 KiB: `/admin/listings_/$listingId_/edit`, `/admin/screening`, `/my-listings_/$listingId_/edit`, `/post_/$listingId`;
  - −0.2 KiB: `/post`;
  - −0.1 KiB: `/account`, `/admin/locations`.
- **Every other page:** unchanged.

**Ceilings raised** (`scripts/route-budgets.mjs`, DEC-296's form, each line carrying its cause):

| Page | Base → tree, local (KiB) | CI on 6491b6492 (KiB) | Ceiling | Form |
|---|---|---|---|---|
| `/admin/ai` | 323.4 → 323.7 | 323.7, inside its band | 324 → 325 | `ceilingFor(323.7)` (CI's size) = `ceilingForLocal(323.7)` |
| `/admin/legal` | 284.3 → 284.6 | 284.6, outside its band | 285 → 286 | `ceilingForLocal(284.6)`; CI's `ceilingFor` gives 285, which the local check refuses |
| `/admin/legal_/edit` | 288.6 → 288.9 | 288.9, inside its band | 289 → 290 | `ceilingFor(288.9)` (CI's size) = `ceilingForLocal(288.9)` |

On the final tree, the build and `check-bundle-size` report "Bundle budget OK", and THE CHECKS' band step reads "0 NEAR, none grew". By CI's sizes on 6491b6492, every other page is 0.4 KiB or more under its ceiling.

## 4. Censuses

- **The three surfaces' own layers on the base:** each had its own `createPortal`, `role="dialog"` / `aria-modal` layer and Escape handler:
  - `preview-sheet.tsx` (lines 73–75, plus its body lock);
  - `photo-gallery.tsx` (the viewer);
  - `map-pin-dropper.tsx` (the sheet).
- **The tree:** `rg -n "createPortal|aria-modal|role=\"dialog\"" src/features/posting/preview src/features/posting/map` finds none. DG-2 reads the whole tree with an empty allowlist.
- **z-index in the three surfaces:** `rg -n "Z_SHEET|Z_VIEWER|z-\[|z-[0-9]" photo-gallery.tsx preview-sheet.tsx map-pin-dropper.tsx` finds none. `Z_SHEET` and `Z_VIEWER` are read only by `dialog-look.ts`'s `DIALOG_LAYER`.
- **`post-pin-position` readers** (`rg -n` over `src` and `e2e`): the step's line (`step-where.tsx:1772`) and the ten spec reads, re-pointed in section 5. No unit test reads it.
- **`pinOpen` in `step-where.tsx`** (`rg -n pinOpen`): the state (:790), the preview map's hide (:1851, section 6) and the dropper's mount (:1928).
- **The `Suspense` fallback at :1928:** while the map's code downloads it draws a 16 px "searching" line in the page's flow, below the opener. A probe in DLG-E8 measured it: the document grows 24 px, while the opener and the scroll do not move.

## 5. Tests

- **New test ids**, each checked free before use; TI-1 passes in the laws:
  - DG-U5 (`dialog-look.test.tsx`: the screen variant and `phone="full"`);
  - "DG-2 planted" (`dialogs.test.ts`);
  - DLG-E8 (`e2e/dialogs.spec.ts`).
- **Re-pointed unit tests, old → new:**
  - **GAL-1:** the viewer was a `role="dialog"` portal → it is the primitive's panel (`data-dialog-panel`, `SCREEN_PANEL` and `DIALOG_LAYER.viewer`); the focus returns to the main photo.
  - **GAL-4:** Escape on the viewer stopped at the document → the gallery inside a `variant="screen"` Dialog: Escape closes the viewer only, the outer dialog's `onOpenChange` is not called, and the focus returns to the main photo.
  - **PSH-1:** the focus went to "Close preview" once → the sheet is the screen with the modal layer and takes the focus; a step-up stand-in Dialog (`layer="top"`) over it keeps its input's focus across a rerender with a new `onClose` (INC-618).
  - **PSH-2:** Escape calls the newest `onClose` once (unchanged claim, through the primitive).
  - **PMD-1:** the pin sheet is a `role="dialog"` panel with `data-dialog-panel` and `DIALOG_LAYER.modal`, and the failure note sits inside it.
  - **DG-7:** its planted case now filters to DG-1's findings, because line 2's `fixed inset-0` is also DG-2's own planted case.
- **Re-pointed spec reads, `post-pin-position` → `post-pin-sheet-position`** (each read while the sheet is open):
  - `post-wizard-where.spec.ts:633` (PW-92), `:885` (PW-100), `:911` (PW-96);
  - `post-wizard-place.spec.ts:1229–1235` (PW-37's two in-sheet reads, as `inSheet`), `:1280` (PW-38), `:1386` (PW-160);
  - `post-wizard-bundle2.spec.ts:196` (`savePinOnMap`, used by four tests), `:417` (PW-186).

  Kept on the step's line (read with the sheet closed):
  - PW-37's after-Save read (`:1244`);
  - `post-wizard-place.spec.ts:1353` (PW-40, after Remove);
  - `post-wizard-bundle2.spec.ts:1321` (PW-142, the reopened draft).

  No assertion was loosened.
- **Red-first:**
  - DG-2 was red on the base's `preview-sheet.tsx` (lines 73, 74, 75), proven by writing the base file into the tree, then restoring it.
  - DLG-E8 failed on the desktop project before ruling 2's change, at stop 2: "the opener moved", and the opener's document y went from 1132 to 1104 while the step's line was hidden.
- **Unit totals** (THE CHECKS on acf1b0551):
  - component tests: Test Files 1 failed | 411 passed (412); Tests 1 failed | 2514 passed (2515);
  - the scripts laws: Test Files 1 failed | 81 passed (82); Tests 1 failed | 411 passed (412).

  The one failure in each is NH-6, the macOS time-zone case (Limits).
- **`bun run typecheck`:** 0 errors on acf1b0551.
- **`bun run lint`:** 0 errors, 46 warnings, the same total as S6-3's end.
- **THE CHECKS** (`bun run checks` on acf1b0551):
  - fast line: `checks (fast): 17 PASS · 4 FAIL · 247s`;
  - last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 308s`.

  The FAILs:
  - laws-first and component-tests fail on NH-6 only;
  - actionlint and gitleaks fail because the runner downloads Linux x64 binaries, which do not run on this Mac.

  Run by hand behind the actionlint FAIL, all OK:
  - `bun run format:check`;
  - `bun run lint`;
  - `scripts/e2e-select.ts --self-test`;
  - `check-root-routes` (self-test: 12 allowed, 5 refused; 59 entries);
  - the build and `check-bundle-size` ("Bundle budget OK"; THE CHECKS' own band step: "0 NEAR, none grew").

  NOT RUN because an earlier step failed:
  - the changed folders' unit tests (the component tests cover them);
  - Semgrep on changed files (the whole Semgrep scan passed);
  - the build-and-check steps behind actionlint (each run by hand, above).

  NOT RUN by design:
  - the installs (dependencies are present);
  - the dependency audit (its service is unreachable);
  - the e2e preflight (staging credentials);
  - the e2e merge and Verdict, and promote;
  - the SARIF upload and its warning.
- **THE BROWSER CHECK**, against ethio-staging, both projects (`mobile-360`, `desktop-1280`), 0 retries.
  - **DLG-E8:** `bun run e2e:local -- e2e/dialogs.spec.ts --grep "DLG-E8" --retries=0` on part 4's code: **2 passed**.
  - **The map's proof** (ruling 3), on part 4's code: `e2e:local -- post-wizard-where post-wizard-place post-wizard-bundle2 --retries=0`: **140 passed** (13.4 min).
  - **The long run**, on 180604b05's source: `e2e:local --` 12 specs `--retries=0`.
    - The specs:
      - `dialogs` (whole);
      - those that reach the gallery, the preview or the pin sheet (`rg -l "gallery-|post-preview|post-pin-|listing-detail-gallery" e2e`, the three map specs aside): `ad-page`, `admin-screening`, `my-listings-ad`, `photo-pipeline`, `post-wizard-category`, `post-wizard-details`, `post-wizard-pricing`, `post-wizard-specs`;
      - `overlay-shift` (the scroll lock), `overlays` and `mfa-stepup` (the facade and the top layer).
    - The result: **450 passed, 9 failed, 13 skipped** (39.0 min). The 9:
      - **SC-25 and SC-26, both projects** (4): the Control+A class on macOS, named in S6-1's ruling 3 and S6-3's report.
      - **PW-140, mobile-360** (1): the same as in earlier turns' local runs.
      - **MLA-13, both projects** (2): `expect(await priceOf(X)).toBe(90)` received **90100**.
        - The test clicks the price field, presses `Control+A`, then Backspace, then types "90" (`my-listings-ad.spec.ts:1007–1010`).
        - On macOS, `Control+A` moves the caret to the line's start and selects nothing. Backspace then deletes nothing, and "90" lands in front of the old "100".
        - This is the Control+A class. The test fails at the Price step, before the preview or the gallery.
      - **PP-8, both projects** (2): "default/…/cover.webp must be gone from storage". The objects remain after the photo route's DELETE answered `ok`.
        - PP-8 drives only the photo routes (upload, cover, delete) and reads storage through the admin client, with no screen.
        - This turn changed no server, route, library, migration or storage file (`git diff --name-only 0ca681c0a..HEAD -- src/server src/routes src/lib supabase e2e/helpers` names only `e2e/helpers/ui.ts`, whose one change adds `stillPage`, which PP-8 does not call).
        - Run alone on the tree it failed the same way on both projects.
        - On the base's source (the 11 source files, `e2e/helpers/ui.ts` and both i18n maps written from 0ca681c0a, then restored; `git status` clean after) it also failed the same way on both projects.
        - No cleanup failure was logged (the route logs `object delete <key>: …` when the storage delete throws; `rg` over the run's log finds none).
        - The base's CI (run 41287917217, SUCCESS) ran it on CI's temporary backend. Not caused by this turn (Limits).
  - **`[ssr-error]`:** 0 lines in the long run's log (`rg -c ssr-error`).
- **A probe of the saved-pin reopen**, temporary and reverted, so no commit:
  - Inserted into PW-96 before its reopen, run on both projects: 2 passed.
  - Opening the sheet over a saved pin shrinks the document by 248 px: the preview map below the opener is hidden (`step-where.tsx:1851`).
  - The opener's y and `scrollY` did not move: 379 / 533 at 360, 446 / 444 at 1280 (section 6).
- **The J-audit** (`e2e/**` changed):
  - DLG-E8 makes its own scratch rows (a seller's ad with seeded photos, a leased seller, a draft through the posting route, a category, a place chain) and removes them in `afterEach`, after `stopPageBeforePurge` (J1, J3);
  - no `.first()`, `.nth(`, `waitForTimeout` or `test.only` was added (`rg` over the e2e diff);
  - the one raised timeout (DLG-E8's 300 s) names its cause;
  - the waits are 20 s on a step's or panel's visibility, the specs' standard.

## 6. K2 — siblings that bypass the mechanism

| Where | What | Left because |
|---|---|---|
| `src/features/posting/step-where.tsx:1851` | the step's preview map (`post-where-pin-preview`) is hidden while the pin sheet is open, so opening "Change pin" over a saved pin shrinks the document by 248 px below the opener (the same concern as row 77) | ruling 2 names the pin line only. The probe measured no move of the opener or the scroll at 360 or 1280; a page scrolled to its very end would clamp. Named for the supervisor (MINOR) |
| every controlled `Dialog` without a `DialogTrigger` outside the three surfaces | Radix returns the focus to a trigger only, so on close the focus falls to the page body | the focus return is scoped to screen-sized panels (ruling 1); named only |
| `post.preview.close` (`en-base.ts` / `am-base.ts`) | the key now has no reader | ruling 1: a K2 line for the next strings turn, not touched here |
| `src/components/shell/app-rail.tsx:1129` | the phone menu draws `DialogPrimitive.Root modal={false}` with its own content | plan ruling 9: non-modal; DG-1 and DG-2 pass it |

Greps run for this concern:
- `createPortal` outside `src/components/ui`: none in the three surfaces' folders;
- DG-2 over the whole tree: no finding, empty allowlist;
- `post-pin-position` and `pinOpen`: section 4.

S6-1's K2 line for S6-4 (the three hand-drawn surfaces skipping NoticeOutlet) is closed: the three now ride Dialog.

## 7. Allowlists and guards

- **`scripts/conformance/dialogs-allowlist.txt`:** 3 lines → 4 (two headers, then the entries). The new line (ruling 1):
  - `src/features/posting/preview/photo-gallery.tsx#DG-4 | the viewer's ‹ › arrows sit on the photo at its two edges and step through the photos — the photo's own controls, not actions on the dialog (as the photo editor's rotate tools, ruling 2 of S6-1's stop 2) | 2027-05-01`
- **DG-2's allowlist:** none, as item 2 asks; DG-2 reads the same file and no `#DG-2` line exists.
- **`non-null-allowlist.txt`:** unchanged. No `!` was added (CF-NN-1 passes).
- **`layout-reads-allowlist.txt`:** unchanged.
  - BX-1 refused `stillPage`'s first form, a lone `.boundingBox()`.
  - Its final form reads the target's rectangle, the document's height and the scroll in one `evaluate`, as `layoutBoxes` does.
- **Guards changed and their self-tests:** CF-DIALOG-1 gains DG-2 (planted: every spelling fails; non-modal layers and the primitive's own files pass) and DG-3's owner list gains `SCREEN_PANEL`. CF-DIALOG-1 is already wired (`wired.test.ts` unchanged and passing).

## 8. Strings

None added or changed (no `t(` key is new). `post.preview.close` lost its one reader, so `bun run i18n:usage` dropped it from both maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`). Its EN and AM values stay in the locale files (ruling 1).

## 9. Migrations

None.

## 10. Departures

- **Stop 1 and ruling 1:** DLG-E8 for the screens' test; the four choices, as built.
- **Stop 2 and ruling 2:** `step-where.tsx` in scope (the pin line kept, `post-pin-sheet-position`, the ten reads); `stillPage` in `e2e/helpers/ui.ts`.
- **Correction to stop 2's diagnosis.** Stop 2 put the 1440 `scrollY` change (234 → 276) down to the browser's scroll anchoring. After ruling 2's change it still failed the same way. A probe then showed the opener at y=898 in a 900 px viewport: late content had pushed it to the viewport's edge after `scrollIntoViewIfNeeded`, and Playwright's click scrolled it into view by 42 px. `opens` now waits for the page to stop, centres the opener, then waits again. The opener's 28 px move from the hidden line was real, and ruling 2's change removed it; DLG-E8 asserts both.
- **`stillPage`'s signature** takes the target and `{ what, timeout }`, not the page: it reads everything from the target's own document.
- **Behaviour beyond the items, from the mandated primitive** (section 3, each MINOR):
  - the viewer's text "Close" became the primitive's icon close;
  - the panel, not a button, takes the focus on open;
  - the pin dropper closes from the close button or the scrim while a save is in flight (Escape already did).
- **Ceilings beyond the ad page:** the shared `dialog.tsx` moved every page that draws a dialog (section 3). Three were inside the band and were raised by DEC-296's form, which the brief's item 5 asks for.

## 11. CI

- **The base's CI**, two-step check: the commit line names `0ca681c0ab215776629404f59693482d52cc95a0`, and `origin/dev` is 0ca681c0a.

  ```
  # CI Status (auto-generated — do not edit by hand)

  - Commit: `0ca681c0ab215776629404f59693482d52cc95a0` (short `0ca681c`)
  - Conclusion: **SUCCESS**
  - Completed (UTC): 2026-11-01T08:34:34Z
  - Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41287917217
  ```

- **Earlier reds fixed:** none; the base was green.
- **This pull request's run on 6491b6492** (the stop-2 push; run 41290534728; ci-status names it, FAILURE). Its one red job was "First-paint bundle budget (gzipped ceiling)":

  ```
  NEAR band failed (DEC-296):
    /admin/ai: 323.7 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 324 KiB — DEC-296: set it to ceilingFor(size) = 325
    /admin/legal_/edit: 288.9 KiB sits within the NEAR band (0.3 KiB) of its ceiling of 289 KiB — DEC-296: set it to ceilingFor(size) = 290
  ```

  - **Class (e), this turn's own:** a page inside its band is a guard failure, never re-run.
  - **The cause:** `dialog.tsx`'s screen variant and focus return (+0.3 KiB on each page that draws a dialog).
  - **The fix:** that run predates part 5 (d1b7d5581), which had already raised both pages, with `/admin/legal`, to the same ceilings from the local build. 7d9ff6b92 states CI's measured sizes on the lines, with `ceilingFor` by CI's size (section 3).
  - CI's entry read 126.1 KiB, the same as the local build. Every other page in that run reads 0.4 KiB or more under the tree's ceiling.
- **No re-run was asked.**

## 12. Limits

- **NH-6** (`scripts/ci/nightly-hour.test.ts`) fails on macOS, whose C library ignores TZDIR. CI on Linux is its proof.
- **actionlint and gitleaks** cannot run here: the runner fetches Linux x64 binaries. CI judges both.
- **Specs that cannot be proven locally:**
  - SC-25, SC-26 and MLA-13 (the Control+A class on macOS);
  - PW-140 at 360.

  CI's lanes are their proof.
- **PP-8** fails locally against ethio-staging on the base's source as on the tree. The objects remain after a delete the route reports as done and logs no cleanup failure for. Its cause is outside this turn and was not found here. CI's temporary backend is its proof.
- **The local browser check** ran with `PLAYWRIGHT_BROWSERS_PATH` pointed at the installed Playwright browsers (`~/Library/Caches/ms-playwright`); nothing was installed.
- **Rendered look:** checked by tests and structure only. The three surfaces at 360, 768, 1024 and 1280 px are for the operator's walk.
