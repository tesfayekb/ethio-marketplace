# Turn S6-1 — one dialog look — report

Base: 04fee757 · Final commit: 7364e0ddc · Brief: docs/governance/briefs/sage-s6-1-dialog-look.md (rulings beside it: .ruling-1.md, .ruling-2.md, .ruling-3.md; the task gave no sha256)
Review: READY · 0 BLOCKER · 1 MAJOR · 3 MINOR · on 7364e0d

CI on the base: 04fee757 SUCCESS (run 41230127440). `origin/dev` was still 04fee757 at the last
fetch, so no file of this turn's scope moved under it.

## 1. Done / not done, by part and step

- Task saved (b22aa0a03): the ruling on the plan and the plan's S6-1 sections, roadmap line 3, and
  task 0's nine rule files, unchanged.
- Part A (7da6f0341): the tokens in `src/styles.css` (`:root`, `.dark`, `@theme`): `--scrim`,
  `--lift-dialog`, `--lift-rule-top`, `--lift-choice-on`, `--radius-dialog`; the theme data in
  `src/lib/themes.ts`; the four MODED_TOKENS lines in `src/lib/schemas/theme.ts` (stop 1, ruling 1).
- Parts B–G (ae0c22cba):
  - `src/components/ui/dialog-look.ts`;
  - `dialog.tsx`, `alert-dialog.tsx` and `sheet.tsx` rebuilt on it (size, fit, phone, layer,
    closeTestId; the alert's `tone`; touch-sized Action and Cancel; logical sheet edges);
  - the field look through `in-data-[dialog-panel]:` on Input, Textarea and NativeSelect;
  - the consumers' own part classes moved, CategoryModal and StepUpGate on DialogTitle, and the four
    button rows on DialogFooter;
  - the report reasons on the choice row (LIST_ROW plus LIST_CHOICE_ON);
  - eight unused primitives retired (drawer, select, command, hover-card, context-menu, menubar,
    navigation-menu, sidebar) with `[intentional-delete]` and their manifest lines.
- Part F (0f78a033a):
  - the seven further action rows on DialogFooter (AlertDialogFooter in `legal-editor-form.tsx`);
  - the two choice lists on the choice row, LIST_ROW_WRAP where a name runs long (stop 2, ruling 2);
  - the /dev/style specimens from existing keys (ruling 13).
- Part H (01f697870): the CF-DIALOG-1 guard (DG-1 and DG-3 to DG-6) and CF-OV-4/5, wired.
- Part I: the unit tests DG-U1 to DG-U4 (88278faa4) and `e2e/dialogs.spec.ts` (ff2de8377).
- Part J (7f92fce23): register rows 87 (renumbered), 88 and 89; the design-foundation "Dialogs (turn
  S6-1)" section; the changelog and roadmap lines.
- Part K (1de478955), ruling 3 of stop 3:
  - CONTROL_LOOK and SEARCH_FIELD now live in `src/components/shell/menu-row.ts`, and
    `dialog-look.ts` holds dialog parts only;
  - `e2e/dialogs.spec.ts` joins the house-style area in `scripts/e2e-select.ts`.
- Part L (7364e0ddc): 31 page ceilings moved by DEC-296, each with its cause.
- Not done: the plan ruling's fix of the `as unknown as` in `category-dialogs.tsx:681` (see
  Departures); DG-1's namespace clause, which moves to S6-3 (stop 2, ruling 3).
- THE CHECKS, THE BROWSER CHECK and THE SELF-REVIEW ran on 7364e0ddc (sections 5 and 11).

## 2. Files changed

`git diff --name-only 04fee757..7364e0ddc` (85 paths):

```
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
docs/governance/briefs/sage-s6-1-dialog-look.ruling-3.md
docs/governance/mechanisms.md
docs/governance/reports/sage-s6-1-dialog-look.stop-1.md
docs/governance/reports/sage-s6-1-dialog-look.stop-2.md
docs/governance/reports/sage-s6-1-dialog-look.stop-3.md
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
scripts/e2e-select.ts
scripts/route-budgets.mjs
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
```

- New files (`git ls-files --error-unmatch`, all tracked):
  - `.cursor/rules/12-ui.mdc`, `e2e/dialogs.spec.ts`;
  - `scripts/conformance/dialogs.test.ts`, `scripts/conformance/dialogs-allowlist.txt`;
  - `src/components/ui/dialog-look.ts`, `src/components/ui/dialog-look.test.tsx`;
  - the brief, its three rulings and the three stop reports.
- Deleted (`--diff-filter=D`): the eight retired primitives, each listed in
  `docs/tracking/intentional-deletions.txt` in commit ae0c22cba, whose message carries
  `[intentional-delete]`.
- Scope:
  - `.cursor/rules/**` is in scope for the first commit only;
  - `src/lib/schemas/theme.ts` by ruling 1 of stop 1;
  - `app-header.tsx` and `layers.ts` by plan rulings 4 and 8;
  - the seven action-row files and the two choice-list files by ruling 2 of stop 2;
  - `scripts/e2e-select.ts` by ruling 3 of stop 3.
- `scripts/check-bundle-size.mjs`, which ruling 3 brought into scope, is not changed (Departures).

## 3. Behaviour contract — answer tables before → after

No route, door, server function, schema or string changed. Every change is to how a dialog,
an alert dialog or a sheet draws, and to which props its primitive takes.

| Part | At 04fee757 | At 7364e0ddc |
|---|---|---|
| `DialogContent` | `overlayClassName`; its look from Tailwind classes in dialog.tsx and in each consumer | `size` (narrow / default / wide), `fit` (bounded / fill), `phone` (float / sheet), `layer` (modal / viewer / top), `closeTestId`; the look only from dialog-look.ts; `data-dialog-panel`, `data-dialog-scrim`, and `data-dialog-grabber` on the phone sheet |
| Close button | 16 px icon, physical `right-4` | 44 px below md and on coarse pointers, 40 px on a fine pointer from md; the control look; logical `end` |
| `AlertDialogAction` / `Cancel` | default button sizes | touch-sized; Action takes `tone="destructive"` (red) |
| `SheetContent` `side` | `top / right / bottom / left` (cva) | `start / end / bottom` (logical); the bottom sheet draws the grabber; the close follows the content |
| Footer rows | eleven dialogs drew their own button rows | all on DialogFooter / AlertDialogFooter: the top rule, Cancel first, then the primary |
| Step-up gate | `z-[100]` on its own classes | `layer="top"` (`Z_TOP` in layers.ts, the same z-index) |
| Report reasons, merge sources, country exclusions | their own label classes | LIST_ROW plus LIST_CHOICE_ON (LIST_ROW_WRAP for long names) |
| Fields inside a dialog panel | the form kit's look | the pressed-in field (`DIALOG_FIELD`) through `in-data-[dialog-panel]:`; outside a panel, unchanged |

The differences beyond the plan's wording are listed under Departures.

## 4. Censuses

- Dialog parts with a look of their own (DG-1) over `src/`: none after part F; 630 files read. The
  guard runs on the tree in `bunx vitest run scripts`.
- Button rows outside a footer (DG-4): 12 found at stop 2. The seven action rows were moved. The five
  in-body rows pass the narrowed rule; photo-editor.tsx:314 is a direct child of DialogContent, so it
  has an allowlist line (INC-899).
- Choice labels (DG-5): 6 found at stop 2. The two lists were moved. The four toggles in
  category-attributes-dialog.tsx:281, 308, 333 and 346 pass, as ruled.
- Retired packages and files (CF-OV-4): no file reaches cmdk, vaul, `@radix-ui/react-select`,
  hover-card, context-menu, menubar or navigation-menu, and the eight files stay gone.
- Who carries the dialog look (`/tmp/who-carries.mjs` over `dist/client`): dialog-look is a chunk of
  its own (0.89 KiB gzipped). It is imported by input, data-table, dialog, alert-dialog, sheet,
  wizard, textarea and one page index chunk; it is not in the entry. The step-up gate is a 1.33 KiB
  page chunk on the admin pages, not in the root.

## 5. Tests

- Added:
  - DG-U1–DG-U4 (`src/components/ui/dialog-look.test.tsx`);
  - DLG-E1, E2, E3, E5, E6 and E7 (`e2e/dialogs.spec.ts`);
  - DG-1, DG-3, DG-4, DG-5 and DG-6, each with its planted case (`scripts/conformance/dialogs.test.ts`);
  - CF-OV-4 and CF-OV-5 (`overlays.test.ts`).
  
  A grep showed no id collision.
- Changed:
  - CF-NO-1's floor goes 5 → 4 (`notice-outlet.test.ts`; drawer.tsx retired);
  - `press.test.ts` reads the retired files' absence;
  - `wired.test.ts` names CF-DIALOG-1's caller.
  
  No assertion was loosened.
- Red-first: the guards' planted cases each fail on their plant (the planted tests above); DG-6
  fails a stale and an expired line.
- `bun run typecheck`: 0 errors on 7364e0ddc.
- `bun run lint`: 0 errors, 46 warnings (48 on the base; sidebar.tsx's two went with it).
- Unit, from THE CHECKS' logs on the final tree:
  - component tests: Test Files 1 failed | 407 passed (408); Tests 1 failed | 2490 passed (2491);
  - the scripts laws: Test Files 1 failed | 81 passed (82); Tests 1 failed | 406 passed (407).
  
  The one failure in each is NH-6, the macOS time-zone case (Limits).
- THE CHECKS (`bun run checks` on 7364e0ddc):
  - fast line: `checks (fast): 17 PASS · 4 FAIL · 234s`; last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 293s`;
  - the FAILs: laws-first and component-tests (NH-6 only), and actionlint and gitleaks (the runner
    downloads Linux x64 binaries, which do not run on this Mac);
  - run by hand behind the actionlint FAIL, all OK: format:check, lint (above), the
    `e2e-select --self-test`, check-root-routes' self-test (59 entries), and the build plus the
    bundle check;
  - NOT RUN for an earlier failed step: the changed folders' unit tests (the component tests cover
    them), Semgrep on changed files (the whole Semgrep scan passed), typecheck, format, lint, the
    e2e-select self-test, root route names, build and bundle report in build-and-check (each run by
    hand, above);
  - NOT RUN by design: the installs (dependencies are present), the dependency audit (its service is
    unreachable), the e2e preflight (staging credentials), the e2e merge and Verdict, promote, and
    the SARIF upload and its warning.
- THE BROWSER CHECK (`bun run e2e:local -- <files> --retries=0`, ethio-staging, both projects):
  - on 7364e0ddc, `e2e/dialogs.spec.ts` plus `e2e/sage-shell.spec.ts`: 46 passed, 46 skipped (each
    test's other project), 0 [ssr-error].
  - At ff2de8377, the G38 set (the 33 specs that name the changed dialogs' test ids): 1223 passed, 20
    failed, 147 skipped. The 20 failures:
    - 14 from Control+A on macOS (AL-20, AL-23, AL-30, SC-25, SC-26, MLA-13, MLP-6, both projects);
    - AT-12 and PP-8 (both projects) and HM-3, which fail the same way on the base's src;
    - HM-2, which fails on the base in 2 of 3 runs.
  - [ssr-error] 9 in that run:
    - /api/admin/attributes/import 4 and /api/admin/categories/import 4 (the specs' planted bad files);
    - /api/listings/view 1 (a view counted for a listing the test had already removed).
- PSP-1 (`e2e/press.spec.ts`), which CI's Lane 15 failed on ba7edaa4f, is a timing race present at the
  base (section 6).
  - Probe: one requestAnimationFrame after pointer-down on `breadcrumb-home` in light mode, the
    segment's fill reads `oklab(1 0 0 / 0.033)` on the tree and between `/ 0.0065` and `/ 0.031` on
    the base. Both are mid-transition, because the segment carries `transition-colors` (0.15 s).
  - When the alpha rounds to 0 in the test's one-pixel canvas, the fill reads as black, and the dark
    ink gives the 1.3276:1 that CI logged.
  - Lane 15 passed on 3d5f08e9a. The probe spec was deleted, uncommitted.
- J-audit (`e2e/dialogs.spec.ts`):
  - J1/J3: one scratch seller and listing per test from `adPageFixtures()`, removed in `afterEach`;
    no real row.
  - J2: no sweep. J4: no count. J6: no roster. J8: not `@global-state`. J9: the fixture's scratch
    seller, no pooled account.
  - J5: test ids, roles and data attributes; no `.first()`; no English text.
  - J7: seed before navigate; `gotoReady` and Playwright's own waiting.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg 'as unknown as' src`, `rg 'fieldClass =' src`, `rg 'DialogPrimitive\.' src/components/shell`,
`rg 'transition-colors hover:text-foreground' src`.

- `as unknown as`: 56 in 33 non-test files under `src/` (127 in 83 counting tests). This corrects
  the plan's "two". Two are this concern's:
  - `src/features/admin-categories/category-dialogs.tsx:681`: left (Departures);
  - `src/components/ui/dropdown-menu.tsx:55`: S6-3.
- Five local `fieldClass` constants, queued for the form-kit turn: `src/routes/auth_.reset.tsx:44`,
  `src/routes/settings.tsx:83`, `src/routes/auth.tsx:80`, `src/features/posting/step-where.tsx:150`
  and `src/features/posting/step-who.tsx:85`.
- Dialog parts drawn from the primitive namespace in the shell:
  - `src/components/shell/toolbar-panel.tsx:68–99` moves onto the sheet in S6-3;
  - `src/components/shell/app-rail.tsx:1138` is the phone menu (non-modal, ruling 9: report only).
- The posting form's local button classes stay with the form kit.
- In-body control rows with no allowlist line, which the narrowed DG-4 no longer reads:
  - `category-attributes-dialog.tsx:367`;
  - `category-dialogs.tsx:907`;
  - `country-verb-dialogs.tsx:196`;
  - `location-verb-dialogs.tsx:268`.
  
  A line for any of them would fail as stale under DG-6.
- The three hand-drawn surfaces that skip NoticeOutlet: S6-4.
- Ruling 3's findings, filed:
  - The seven specs that clear a field with Control+A fail on macOS, where Meta+A selects (a harness
    portability finding).
  - HM-2 and HM-3 race the language provider's direction rewrite: `src/i18n/provider.tsx:732`
    re-applies `<html dir>` about 0.6 s after load (612 and 625 ms on the base, 617 ms on the tree).
  - AT-12 and PP-8 fail on the base locally; compare CI's result.
- New finding: `src/components/ui/breadcrumb.tsx:58` gives every breadcrumb segment
  `transition-colors`, so the band segment's pressed look fades in over 0.15 s. The press law asks
  it to come on at once, and PSP-1's "pressed ink" check races the fade. The file is outside this
  turn's scope and not touched.

## 7. Allowlists and guards

- `scripts/conformance/dialogs-allowlist.txt`: 0 → 1 (new). The line:
  `src/features/posting/photo-editor.tsx#DG-4 | the rotate tools are the editor's own controls on the photo, not actions on the dialog (ruling 2 of stop 2); their raw buttons move onto Button with the form kit | INC-899`.
- `scripts/conformance/look-values-allowlist.txt`: 12 → 10 (drawer.tsx's and sidebar.tsx's lines
  went with their files).
- `docs/tracking/intentional-deletions.txt`: 25 → 33 entries (the eight retired primitives).
- The guards' self-tests ran: DG-1/3/4/5/6 and CF-OV-5 planted, CF-KIT-7 (the guard's
  `readAllowlist` reason), and `wired.test.ts`. Also green: the deletion guard, the
  `e2e-select --self-test` and the bundle check's NEAR band (0 NEAR).

## 8. Strings

None (flag no-new-string). The specimens on /dev/style read existing keys only. The i18n usage maps
were regenerated after the moves (part F), and the drift check passes.

## 9. Migrations

None (flag no-migration).

## 10. Departures

**Stops and rulings in this turn:**
- Stop 1: the theme's shape was outside the scope. Ruling 1: `theme.ts` joins for the four MODED_TOKENS lines.
- Stop 2: the CF-DIALOG-1 census. Ruling 2: the seven rows and two lists join; DG-4 and DG-5 are narrowed; photo-editor gets its line; DG-1's namespace clause and the low-level parts go to S6-3; CF-NO-1's floor goes 5 → 4.
- Stop 3: growth and the spec selector's area. Ruling 3, applied as below.

**A correction to stop 3:** its premise was wrong. It said `dialog.tsx` rode the entry through the
root's step-up gate, so ruling 3's reason ("rides the first paint for one reason alone, the step-up
gate in the root") does not hold either. Measured after part K:
- the step-up gate is a page chunk on the admin pages, not in the root;
- `dialog-look.ts` rode the entry only because `app-header.tsx` imported it.

With the top bar's two looks moved to `menu-row.ts`, `dialog-look.ts` is off the entry entirely. Its
comment says what is true now: "It holds dialog parts only; the top bar's looks live in menu-row.ts,
so it stays off the entry and reaches a page's first download only when the page draws a dialog, a
sheet, a field or the step-up gate (S6-3 takes the step-up gate's dialog on demand)."

**Ruling 3, item 1, as applied:**
- The entry measured 211.4 KiB (local) against its ceiling of 212 after part K. `ceilingForLocal(211.4)`
  is 212, outside the band, so `check-bundle-size.mjs` keeps 212. The ruling's 212 → 213 was not
  applied because the measurement does not call for it.
- 31 page lines moved, not 39: moving the looks took most pages back inside their ceilings.

Growth (local; base src vs this tree):
- The entry's JS goes 211.2 → 211.4 KiB, and its CSS 23.6 → 21.5 KiB.
- Pages that draw no dialog grow +0.2 to +0.3 KiB (LIST_CHOICE_ON and LIST_ROW_WRAP in menu-row.ts).
- Pages that draw a dialog, a sheet or a field grow +0.4 to +1.3 KiB.
- /dev/style grows +8.4 KiB (247.7 → 256.1), which is its new specimens.

The moved ceilings:

| Page | Base → tree (KiB) | Ceiling |
|---|---|---|
| `/account_/legal_/$versionId` | 214.4 → 214.7 | 215 → 216 |
| `/admin/ai` | 340.1 → 341.0 | 341 → 342 |
| `/admin/attributes` | 353.4 → 354.3 | 354 → 355 |
| `/admin/audit` | 313.3 → 314.6 | 314 → 316 |
| `/admin/categories` | 361.4 → 362.3 | 362 → 363 |
| `/admin/countries` | 342.9 → 343.8 | 344 → 345 |
| `/admin/impersonation_/$sessionId` | 314.1 → 315.3 | 315 → 316 |
| `/admin/legal` | 282.4 → 283.3 | 283 → 284 |
| `/admin/legal_/edit` | 287.3 → 287.9 | 288 → 289 |
| `/admin/listings` | 359.5 → 360.4 | 360 → 361 |
| `/admin/listings_/$listingId` | 384.2 → 384.9 | 385 → 386 |
| `/admin/listings_/$listingId_/edit` | 407.6 → 408.2 | 408 → 409 |
| `/admin/places` | 344.5 → 345.3 | 345 → 346 |
| `/admin/roles` | 310.9 → 311.8 | 312 → 313 |
| `/admin/roles_/$roleId` | 312.0 → 312.9 | 313 → 314 |
| `/admin/screening` | 385.0 → 385.6 | 386 → 387 |
| `/admin/translations` | 417.0 → 417.8 | 418 → 419 |
| `/admin/translations_/$lang` | 326.1 → 326.9 | 327 → 328 |
| `/admin/users` | 309.9 → 311.1 | 311 → 312 |
| `/admin/users_/$userId` | 289.9 → 290.8 | 291 → 292 |
| `/dev/primitives` | 227.2 → 228.5 | 228 → 229 |
| `/dev/style` | 247.7 → 256.1 | 249 → 257 |
| `/dev/tall` | 211.5 → 211.7 | 212 → 213 |
| `/l/$slug` | 255.0 → 256.1 | 256 → 257 |
| `/legal/publishing` | 216.6 → 216.8 | 217 → 218 |
| `/my-listings` | 333.2 → 334.0 | 334 → 335 |
| `/my-listings_/$listingId` | 322.0 → 322.7 | 323 → 324 |
| `/my-listings_/$listingId_/edit` | 402.1 → 402.9 | 403 → 404 |
| `/post` | 402.1 → 402.8 | 403 → 404 |
| `/post_/$listingId` | 402.0 → 402.8 | 403 → 404 |
| `/settings` | 277.5 → 277.8 | 278 → 279 |

- `/admin/screening` was set by hand. Its unrounded size sat inside the band of the rounded ceiling 386.
- The other 19 pages (`/`, `/admin/coverage`, the legal and auth pages, and the rest) stay under
  their ceilings and outside the band.

**Left for S6-3 (ruling 3):** the step-up gate's dialog on demand. Today's numbers:
- the step-up gate chunk is 1.33 KiB gzipped;
- the dialog-look chunk is 0.89 KiB;
- the gate rides every admin page's first download with dialog.tsx and dialog-look.

**Departures from the brief:**
- **The `as unknown as` in `category-dialogs.tsx:681` was not fixed, though the plan ruling asked.**
  `admin_retire_category`'s generated arguments require `p_reassign_to: string`, and the service and
  the hook pass that type through. Removing the cast needs either a migration (`DEFAULT NULL`, so the
  generated type becomes optional) or a change to `categories-service.ts` and `use-categories.ts`,
  which are outside the scope. Both options are for the supervisor to rule. This is the review's
  MAJOR.
- **CF-NO-1's floor 5 → 4:** drawer.tsx was retired (ruling 2 of stop 2).
- **The legal editor's discard:** now red and touch-sized (`Button variant="destructive"
  size="touch"`) inside AlertDialogFooter; at the base its buttons sat in a plain div.
- **Footer order:** Cancel, then the primary, in every footer, where some dialogs had the primary first.
- **Share this ad:** turns into a sheet below `md`; it was `sm`.
- **The sheet's close:** comes after the content in reading order, so focus lands on the content first.
- **The step-up gate's top layer:** `layer="top"` reads `Z_TOP` (`z-[100]`, unchanged value) from layers.ts.
- **Ids beyond the plan:** CF-OV-5 (the retired packages' planted case) and DLG-E7 (Share's sheet
  and dialog). `data-dialog-scrim` and `data-dialog-grabber` were added for the spec. OVS-4 (the page
  does not move) is asserted inside DLG-E5 rather than under its own id.
- **Base measurements:** to measure the base, I wrote each changed src file's base version into the
  working tree (`git show 04fee757:<path> > <path>`), moved `dialog-look.ts` and its test aside, and
  ran the build or the spec. I then restored every file from HEAD (`git show HEAD:<path>`, with
  `git cat-file -e` to tell base-only files) and checked that `git status` was clean. `git cat-file`
  is a read-only command outside rule 00's list.
- **88278faa4 was amended before it was ever pushed** (no published history changed).
- **Chromium install:** `bunx playwright install chromium` was run once for the local browser check.

## 11. CI

The base's ci-status.md (the two-step check: the Commit line is 04fee757, the task's base):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `04fee7576e6146644bfc2a1059a063aefae5a41a` (short `04fee75`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-31T18:57:12Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41230127440
```

No red of an earlier turn.

This pull request's runs so far:
- **ba7edaa4f (run 41239030996), FAILURE.**
  - The first-paint bundle budget: this turn's growth, fixed by parts K and L.
  - The i18n map: fixed in part F (0f78a033a).
  - E2E Lane 15, PSP-1 "band segment: pressed ink": the timing race at the base (sections 5 and 6),
    not caused by this diff. It passed on 3d5f08e9a.
- **3d5f08e9a (run 41252914051), FAILURE.**
  - "Build, typecheck, lint" and "Component tests": the e2e-select self-test ("spec not reachable from
    any area: e2e/dialogs.spec.ts"), fixed in part K (1de478955).
  - "First-paint bundle budget": fixed by parts K and L.
  - E2E Lane 7 is infrastructure: its "install Chromium's system libraries" step failed before any
    test ran. No re-run, because the next push starts a fresh run.

## 12. Limits

- Not run on this Mac:
  - NH-6, because macOS's C library ignores TZDIR. CI on Linux is its proof.
  - actionlint and gitleaks, because the runner fetches Linux x64 binaries. CI judges both.
- The seven Control+A specs, HM-2/HM-3, AT-12 and PP-8 cannot be proven locally (section 5). CI is
  their proof.
- The dependency audit, the staging migration preflight and the e2e merge cannot run outside CI.
- `/admin/coverage` measures 336.6 KiB locally against 337. The local check finds it outside the band
  (unrounded size under 336.6), but CI measures about 0.1 KiB more, so CI's band check is its judge.
- The look itself (rendered output at 360 / 768 / 1024 / 1280) is the operator's walk. I verified it
  by the spec's measured values, the unit tests and the guards.
