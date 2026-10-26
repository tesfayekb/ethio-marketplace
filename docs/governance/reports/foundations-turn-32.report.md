# Turn 32 — speed S9: the dialogs' code on demand (D234, DEC-260)
Base: 2b8160c9e239ca87b69ba80f26991dd31fe159c2 · Final commit: b17220e · Brief: docs/governance/briefs/foundations-turn-32.md (sha256 6bae6b37b6ad1507f8e635e0b0535e0ddc835e53cb1a5f2b1f580457cc62ba41)

## 1. Done / not done, by part and step

| Part / step | State | Commit |
| --- | --- | --- |
| A1 orient, CI first | done — `git rev-parse HEAD origin/dev` → `2b8160c9e239ca87b69ba80f26991dd31fe159c2` twice; origin/dev = BASE, so no BASE..origin/dev list; CI on BASE SUCCESS (§11); re-read before Part D: unchanged | — |
| STEP 0 | done — brief saved; `sha256sum` → `6bae6b37b6ad1507f8e635e0b0535e0ddc835e53cb1a5f2b1f580457cc62ba41` (= the carrying message's); roadmap line 3 and the turn-31 line replaced by the brief's five lines | 6a614fa |
| B1–B10 the modal facades | done, one commit | d2a9a66 |
| C1–C4 tests, census, planted proof | done | 54ca448 |
| D1–D3 first-paint guards | done (D1 planted proof run and put back) | 44ffe0a |
| E1 OVE-3 | done | 0033571 |
| F1–F7 docs, register, changelog, AGENTS.md, maps; roadmap turn-32 `[x]` | done | b17220e |
| THE CHECKS | all green (§5) | — |
| THE END-TO-END CHECK | all green (§5) | — |

## 2. Files changed  (verbatim `git diff --name-only <BASE>`; new files with `git ls-files` proof)

`git diff --name-only 2b8160c9e239ca87b69ba80f26991dd31fe159c2..HEAD` (before this report's commit):

```
AGENTS.md
docs/_changelog.md
docs/features/ci-guards.md
docs/features/display-primitives.md
docs/features/performance-strategy.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-32.md
docs/governance/mechanisms.md
e2e/overlays.spec.ts
public/i18n-usage.json
roadmap.md
scripts/check-bundle-size.mjs
scripts/check-marketplace-imports.mjs
scripts/conformance/overlays.test.ts
scripts/route-budgets.mjs
src/components/shell/app-rail.tsx
src/components/shell/toolbar-panel.tsx
src/components/ui/alert-dialog-impl.ts
src/components/ui/alert-dialog-primitive.tsx
src/components/ui/alert-dialog.tsx
src/components/ui/dialog-impl.ts
src/components/ui/dialog-primitive.tsx
src/components/ui/dialog.tsx
src/components/ui/modal-facade.test.tsx
src/components/ui/overlay-facade-failure.test.tsx
src/components/ui/overlay-facade.tsx
src/components/ui/overlays-impl.ts
src/components/ui/sheet.tsx
```

plus this report, docs/governance/reports/foundations-turn-32.report.md. New files, `git ls-files --` proof:

```
docs/governance/briefs/foundations-turn-32.md
src/components/ui/alert-dialog-impl.ts
src/components/ui/alert-dialog-primitive.tsx
src/components/ui/dialog-impl.ts
src/components/ui/dialog-primitive.tsx
src/components/ui/modal-facade.test.tsx
```

No file deleted. The brief's hash list: `grep -E '^[0-9a-f]{64}  ' docs/governance/briefs/foundations-turn-32.md | sha256sum -c` → 24 lines `OK`, 0 `FAILED`, exit 0.

## 3. Behaviour contract — answer tables before → after  (every touched route/function/screen)

| Surface | Moment | Before (BASE: Radix's dialog on the first download) | After (the facade) |
| --- | --- | --- | --- |
| Dialog (ui/dialog.tsx) | closed | Radix root; trigger `type=button`, `aria-haspopup=dialog`, `aria-expanded=false`, `data-state=closed`; no content | the facade's root; the trigger drawn by Slot with the same four attributes (OVF-11, server and client); no content |
| Dialog | first opening (trigger click) | Radix opens, focus moves inside | the click asks for the module; the real Radix root is drawn around the children, open; focus inside (OVF-12); `aria-expanded=true` |
| Dialog | first opening (owner's `open`) | Radix opens | the owner's `open=true` asks for the module and the real root draws with `open` (OVF-13; the twenty-two controlled roots of §4) |
| Dialog | Escape | closes; focus back to the trigger | the same — Radix's (OVF-12, OVF-15) |
| Dialog | owner's onOpenChange | `true` on the trigger's click, `false` on close | `true` from the facade's trigger before the root is real, then Radix's (`[true]` OVF-13; `[true, false]` OVF-15) |
| Dialog | download fails | n/a (code on the first download) | the closed trigger stays (`aria-expanded=false`, `data-state=closed`), the loader logs `[overlays] loading the overlay primitives failed: …`, the next click asks again and opens (OVF-16) |
| Sheet (ui/sheet.tsx; toolbar panel's phone sheet; history drawer; sidebar) | all moments | as Dialog (same Radix package) | as Dialog (same facade, dialog-primitive.tsx); the toolbar panel's phone sheet (controlled, a trigger) proven in AS-3 on mobile-360 |
| AlertDialog (ui/alert-dialog.tsx) | closed / first opening / Cancel / focus back | Radix's alert dialog | the alert-dialog facade: first click opens `role=alertdialog`; Cancel closes; focus back to the trigger (OVF-14); MLA-5's confirm green both projects |
| Phone menu (app-rail.tsx, owner-opened, `modal={false}`) | closed | Radix root, no content | the facade's root; nothing drawn but the owner's scrim condition (false) |
| Phone menu | first tap on ☰ | opens | the owner's `navOpen=true` asks for the module; the real root draws open; `aria-expanded=true` on ☰ (OVE-3, RM-1, "the menu opens in place", "the menu follows the active panel" — all green on mobile-360) |
| Phone menu | Escape / focus back | closes; focus to ☰ | the same (OVE-3) |

Nothing else changed: `git diff 2b8160c9… --stat -- src/features src/routes src/components/ui/sidebar.tsx` printed nothing.

## 4. Censuses  (every grep the brief asked for, with file:line; "none found" only after the grep)

Radix's dialog and alert dialog by value, re-located at START (`git grep -n -E '@radix-ui/react-(alert-)?dialog' 2b8160c9… -- src e2e scripts`, the census test itself left out):

- src/components/shell/app-rail.tsx:2 · src/components/shell/toolbar-panel.tsx:1 · src/components/ui/dialog.tsx:4 · src/components/ui/sheet.tsx:4 · src/components/ui/alert-dialog.tsx:2 — the five direct importers, all moved onto the facades.
- src/components/ui/command.tsx:4 — `import { type DialogProps }`, type-only, passes CF-OV-1 by its rule.
- scripts/fixtures/e2e-ssr-census/job.log.txt:354 — a captured build-log line naming the package; text, not an import (the census reads ts/tsx/mts/mjs only).

After the turn the same grep over the tree finds only the two impl files (value) and command.tsx (type) — CF-OV-1 reads 1034 files and reports nothing.

Roots through ui/dialog, ui/sheet and ui/alert-dialog (`git grep -n -E '<(Dialog|Sheet|AlertDialog)$|<(Dialog|Sheet|AlertDialog)[ >]' 2b8160c9… -- src`, the three ui files left out): every file:line the brief's CONSUMERS line names was found — report-ad.tsx:67, share-ad.tsx:118, category-dialogs.tsx:76, screening-page.tsx:637, legal-editor-form.tsx:348, legal-page.tsx:395, legal-publish-dialog.tsx:40, ai-bulk-bar.tsx:339, approve-bar.tsx:144, delete-language-dialog.tsx:81, history-drawer.tsx:126, pseudo-bar.tsx:95, step-up-gate.tsx:43, certify-confirm.tsx:60, my-listing-page.tsx:757, my-listings-page.tsx:854, background-dialog.tsx:152, category-move-dialog.tsx:32, photo-editor.tsx:231, listing-detail.tsx:1167 and :1233, admin.listings_.$listingId_.edit.tsx:118, sidebar.tsx:191, dev.style.tsx:186. The grep also hit src/features/admin-ai/ai-page.tsx:65, admin-countries/countries-page.tsx:84, admin-coverage/coverage-page.tsx:68, admin-locations/locations-page.tsx:108 — each `useState<Dialog>(…)`, a local type named Dialog, not a root — and src/components/ui/command.tsx:28 (CommandDialog, which the brief names: no importer). No census hit beyond the brief's.

Triggers without asChild: `grep -rn -E '<(DialogTrigger|SheetTrigger|AlertDialogTrigger|DialogPrimitive\.Trigger|SheetPrimitive\.Trigger|AlertDialogPrimitive\.Trigger)\b' src | grep -v asChild` → none found; the multi-line form `…Trigger$` → none found; the facades' `asChild: true` type makes the typecheck the proof (clean).

## 5. Tests  (ids added/changed/re-pointed with reasons; red-first evidence; unit totals; the E2E count lines and [ssr-error] counts; the J-audit line when e2e/** changed)

Added: OVF-11, OVF-12, OVF-13, OVF-14, OVF-15 (src/components/ui/modal-facade.test.tsx); OVF-16 (src/components/ui/overlay-facade-failure.test.tsx); OVE-3 (e2e/overlays.spec.ts). Changed: CF-OV-1 (title; the census watches the two Radix packages and the two impl files), CF-OV-3 (title; pins the modal facades' parts), the failure file's describe title and header comment. No assertion loosened, no test removed. IDs grepped before use: OVF-11…16 and OVE-3 appear nowhere else in src/, e2e/, scripts/.

New behaviour, so no red-first run is owed; the guards were shown red on planted imports (never committed):
- C4: with `import * as PlantedDialog from "@radix-ui/react-dialog";` as app-rail.tsx's first line, `bunx vitest run scripts/conformance/overlays.test.ts -t "CF-OV-1"` failed: `+ src/components/shell/app-rail.tsx:1 reaches @radix-ui/react-dialog by value; only src/components/ui/dialog-impl.ts may (DEC-259)` — `Tests  1 failed | 2 skipped (3)`. Put back: `sha256sum src/components/shell/app-rail.tsx` → `fc93f855903a8dfa2a78313d4d1f0b3fbc102fe1bce4518e69a0cd2883f4d3d6`.
- D1: the same planted line, `node scripts/check-marketplace-imports.mjs` → `findings: 1` and `  src/components/shell/app-rail.tsx imports @radix-ui/react-dialog`. Put back: sha256 `fc93f855…d3d6` again; the guard then printed `findings: 0`.

C4's run, `--reporter=verbose` over the four files: OVF-1…16 and CF-OV-1…3 each `✓`; `Test Files  4 passed (4)`, `Tests  19 passed (19)`. The modal tests print Radix's own development warnings (`Missing Description or aria-describedby={undefined} for {DialogContent}` ×4, `AlertDialogContent requires a description…` ×1) because the brief's fixtures give no Description; they are warnings, not failures.

Unit, whole suite: after Part B `Test Files  303 passed (303)` / `Tests  1888 passed (1888)`; after Part F and at THE CHECKS `Test Files  304 passed (304)` / `Tests  1894 passed (1894)`. No EXH timeout occurred.

THE END-TO-END CHECK (`bun run e2e:local -- …`, both projects, 2 workers, fake mode, 0 retries, against ethio-staging):
- e2e/overlays.spec.ts whole: `1 skipped` · `5 passed (23.1s)` (OVE-1 and OVE-2 both projects; OVE-3 mobile-360; its desktop-1280 skip is the test's own). Run on the Part E tree, before E's commit (a spec is not committed until green); after it only docs and the two usage maps changed, so it was not run again.
- e2e/shell.spec.ts `--grep "RM-1 |the menu opens in place|the menu follows the active panel"`: `3 skipped` · `3 passed (17.5s)` (mobile-360 passed; desktop-1280 skipped by the tests' own phone-only rule).
- e2e/ad-page.spec.ts `--grep "AP-29 |AP-30 "`: `4 passed (40.7s)`.
- e2e/my-listings-ad.spec.ts `--grep "MLA-5 "`: `2 passed (17.8s)`.
- e2e/admin-audit.spec.ts `--grep "AS-3 "`: `2 passed (17.9s)`.
- `[ssr-error]`: 0 in each of the five runs' output (the server's own lines arrive there as `[WebServer] …`: `stdout: "pipe"` in playwright.config.ts) — no path to list.

J-audit (e2e/overlays.spec.ts): J1/J3 no fixture, no row written (read-only, the home page); J2 no global sweep; J4 no count; J5 locators by test id and the one `[aria-controls="rail-menu"]` element (app-header.tsx:115, the only one), no `.first()`; J6 no shared roster; J7 `gotoReady` before acting, built-in waiting only, no `waitForTimeout`; J8 not `@global-state`; J9 no identity.

## 6. K2 — siblings that bypass the mechanism  (file:line, in scope or not; what was left and why)

Files under src/ that still import a Radix overlay by value (`grep -rn -E 'from "@radix-ui/' src`, the non-overlay primitives left out): src/components/ui/popover.tsx:2, select.tsx:4, hover-card.tsx:2, context-menu.tsx:2, menubar.tsx:2, navigation-menu.tsx:2 — the brief's LEFT line; left for the next speed turns (the roadmap's "Speed, after turn 37" line). The same grep shows the non-overlay Radix primitives (aspect-ratio, progress, tabs, toggle, accordion, checkbox, avatar, label ×2, collapsible, toggle-group, scroll-area, radio-group, switch, slider, separator) — not overlays, outside this concern.

DialogTrigger / SheetTrigger / AlertDialogTrigger without asChild: none (§4's greps; the typecheck).

Consumers keeping state inside a modal's root but outside its content (`grep -A6` after every root, elements other than Trigger/Content/Portal/Overlay at the root's own depth): none. The phone rail draws a scrim `div` between its root and content (app-rail.tsx:934–940); it holds no state of its own (`navOpen` belongs to the owner, outside the root).

## 7. Allowlists and guards  (each allowlist's count before → after; every new line with reason and until; guard self-tests run)

No allowlist changed: `git diff --stat 2b8160c9…..HEAD -- 'scripts/conformance/*-allowlist.txt' scripts/public-surface-allowlist.txt` printed nothing. Guards extended: CF-OV-1 (WATCHED and MAY_REACH gain the two Radix packages and the two impl files; reads 1034 files), CF-OV-3 (the modal facades' parts), the weight guard's FORBIDDEN (+2 packages; `modules walked: 106`, `findings: 0`), the entry ceiling 263 → 257 KiB, every page's ceiling line re-measured (none rises). Self-tests: CF-OV-2 passed; the weight guard prints no self-test line of its own (its proof here is D1's planted run); check-hardcoded-strings.sh printed `self-test: bad fixture findings=1 (expect >=1), good fixture findings=0 (expect 0)` / `findings: 0`; scripts/bundle-closure.test.ts `Tests  12 passed (12)`. Both guards shown red on planted imports (§5).

## 8. Strings  (every new or changed key with EN and AM text; "none" when the brief says No new string)

None. `git diff --name-only 2b8160c9…..HEAD -- src/i18n/` printed nothing; `bun run i18n:usage` → `1736 keys across 586 files (395 dynamic call sites)` (only the `scanned` count moved, 582 → 586, for the four new src files); `bun run i18n:map-guard` → `usage maps match the tree.`; check-hardcoded-strings.sh `findings: 0`.

## 9. Migrations  (file, sha256, mark, apply pairing line; or "none")

None. `git diff --name-only 2b8160c9…..HEAD -- supabase/` printed nothing.

## 10. Departures  (every difference from the brief with its reason; every STOP and ruling in the turn)

- E's spec run came before E's commit and is counted as THE END-TO-END CHECK's overlays run. Reason: 20-tests.md, "A spec file not fully green is not committed". After that run only docs and the usage maps changed, so it was not repeated (DEC-184: no local repeat runs).
- The roadmap's turn-32 line names `Last code commit 0033571` (Part E, the last commit that touched code). Reason: the line is written inside Part F's own commit, which cannot name its own sha. This report's "Final commit" is b17220e (Part F), the commit land.ts counts as the last code commit (the last one touching anything outside docs/governance/reports).
- The two usage maps moved after Part B (the four new src files); they ride Part F, as F7 says, not B. Each part's commit passed typecheck, lint and its touched tests.
No STOP; no ruling.

## 11. CI  (the first six lines of ci-status.md for the last landed commit you can read, with the two-step SHA check; "this landing's run has not completed" when it has not)

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `2b8160c9e239ca87b69ba80f26991dd31fe159c2` (short `2b8160c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-10-26T00:49:09Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40248987616
```

Two-step: the conclusion is SUCCESS, and the reported commit 2b8160c9 = BASE = origin/dev before this landing. guards-last-failure.md: `No failed build/guard jobs in this run.`; e2e-last-failure.md: `last E2E run 40248987616 passed`. This landing's run has not completed; the supervisor reads it.

## 12. Limits  (what you could not run or prove, and why — logs unavailable, no browser, no secret)

- The browser runs were local against ethio-staging, a subset; CI on the landing runs every test in every lane.
- The bundle numbers are this sandbox's build; they equal the supervisor's to the tenth (JS 254.1 / 257 KiB; every page line as D3's comments).
- The lab timings in performance-strategy.md §15 (127 ms / 306 ms) are the supervisor's measurements, copied from the brief; not re-measured here.
- Rendered-output acceptance (how the dialogs look at 360/768/1024/1280) belongs to the operator's walk.
