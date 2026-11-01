# Turn S6-4 — the full-screen surfaces onto the one primitive (the task, and the plan's S6-4 sections)

```text
Task: sage-s6-4-screens. Base: dev 0ca681c0a. Build S6-4, the last of your approved S6 plan (the plan and its rulings: docs/governance/briefs/sage-s6-1-dialog-look.md; what landed: the S6-1, S6-2 and S6-3 reports). No plan round; a census hit the plan did not anticipate is still a STOP.

THE TURN: the full-screen surfaces onto the one primitive.
1. Dialog gains the screen variants your plan named (variant="screen" / phone="full" or the names S6-1 settled on): the photo viewer (photo-gallery.tsx), the ad preview (preview-sheet.tsx) and the map pin dropper (map-pin-dropper.tsx) move onto it, so each gets the focus trap, Escape, the scroll lock of row 77, NoticeOutlet (row 52) and the one scrim; their own layers, Escape handlers, focus code and body scroll locks go. Ruling 3 of the plan: if Radix's focus trap breaks the map's keyboard use (Leaflet), the dropper keeps its own layer with an allowlist line (key | reason | until <the INC you register in the report>) and the report says what broke.
2. CF-DIALOG-1 rule 2 (DG-2): role="dialog" / "alertdialog", aria-modal or a fixed inset-0 layer outside the primitive files fails, planted; its allowlist starts empty (the phone menu is non-modal and passes by definition, ruling 9).
3. Every z-index these three surfaces used comes from layers.ts through DIALOG_LAYER; no literal.
4. DLG-E7: the viewer, the preview and the pin dropper: Escape closes only the top layer, focus returns to the opener, the page does not move (layoutBoxes), reduced motion respected; at 390 and 1440, light and dark. GAL-1/GAL-4, PSH-1/PSH-2 and PMD-1 re-pointed and named old → new (your G38 list); the where and place specs run whole as the map's proof.
5. Growth: the ad page's change measured on the base and on your tree (the viewer now rides Dialog, which that page already carries); every page, DEC-296's form for a ceiling crossed.

SCOPE (by area): src/components/ui/ (dialog.tsx, dialog-look.ts, the primitives) and their tests; src/features/ad-page/ or wherever photo-gallery.tsx lives, src/features/posting/preview/ (preview-sheet.tsx), the map pin dropper's folder, each file with its tests; src/components/layout/layers.ts; scripts/conformance/ (dialogs.test.ts, its allowlist, holds-its-box and notice-outlet guards if a move changes their lists); scripts/route-budgets.mjs, scripts/check-bundle-size.mjs; scripts/e2e-select.ts if a new spec needs an area line; e2e/ (dialogs.spec.ts, the G38 specs); docs/features/design-foundation.md, docs/governance/mechanisms.md (rows 48, 88), docs/_changelog.md, roadmap.md, docs/tracking/intentional-deletions.txt, the brief and the report. AGENTS.md is not in scope. A guard whose list or floor a move changes is in scope by that reason (standing, S6-3 ruling).

Then the full flow of rule 00: parts, THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT, the pull request and its CI green.

---- THE PLAN'S S6-4 SECTIONS (the executor's plan of 2026-10-31, approved by the ruling saved in docs/governance/briefs/sage-s6-1-dialog-look.md) ----

## 1. The census (draws its own)

- map-pin-dropper.tsx:350–579 is a portal: layer `fixed inset-0 bg-background/80` at :352; panel `role="dialog" aria-modal` at :356–359; its own Escape handler at :292–298; it never moves focus into itself, has no focus trap and no NoticeOutlet; its own result rows at :383–400, radio rows at :527–543 and footer at :554.
- photo-gallery.tsx:355–437 is the photo viewer: Z_VIEWER at :361, its own close at :368–375, and its own Escape capture at :341–352.
- preview-sheet.tsx:71–100: Z_SHEET at :73, its own focus handling and body scroll lock at :52–65 (which bypasses row 77's lock), and its own close at :82–90.

## 2. The mechanism (the screens' part)

- Constants: SHEET_PANEL (the start, end and bottom edges) and SCREEN_PANEL (full screen).
- DialogContent takes phone (float / sheet / full); layer (modal / viewer / top).

## 3. The guard (the screens' part)

- Rule 2 (DG-2), a modal surface the primitive did not draw. role="dialog" or "alertdialog", aria-modal, or a fixed inset-0 layer outside the primitive files fails. This lands in S6-4.

## 4. The tests (the screens' part)

- DLG-E7, the full-screen surfaces (S6-4): the viewer, the preview and the pin dropper. Escape closes only the top layer, and focus returns.

## 5. The G38 list (the screens' part)

- photo-gallery.test.tsx GAL-1, GAL-4: the viewer's Escape now goes through Radix's layer stack.
- preview-sheet.test.tsx PSH-1, PSH-2: focus and Escape through Radix.
- map-pin-dropper-offline.test.tsx PMD-1: the content appears after the overlay module.
- modal-facade.test.tsx OVF-11 to OVF-15: re-run.
- notice-outlet.test.ts; holds-its-box-allowlist (the pin map's line).
- photo-pipeline.spec.ts:1221–1346; the post-wizard-specs, -category, -details, -pricing, -place and -where specs (:657, :714); post-wizard-bundle2.spec.ts:1019; helpers/ui.ts:1339, and helpers/categories.ts:460, which counts role="dialog" elements, so more modal surfaces change its meaning.

## 6. Growth (the screens' part)

- The ad page changes, because the viewer moves onto Dialog, which that page already carries for Share and Report.
- Every ceiling crossed, or left inside the 0.3 KiB band, is raised with its cause written on its line.

## 7. The turns

4. S6-4, the full-screen surfaces: variant="screen" and phone="full"; the viewer, the preview and the pin dropper (with ruling 3's fallback if Leaflet's keyboard breaks); CF-DIALOG-1 rule 2 with an empty allowlist; DLG-E7.

On ruling 3, I read Radix's focus trap and scroll lock as safe for Leaflet: the map sits inside the content, and Leaflet drives its own pointer and wheel handling. The where and place specs are the proof.

---- THE RULINGS THE TASK CITES (as saved) ----

Plan ruling 9: The phone menu: report only. It is non-modal and belongs to the menu-panel mechanism (DEC-288, D240), not to this concern.
S6-3 stop 1 ruling, standing for S6-4: a guard whose list or floor a move changes is in scope by that reason; name it in the report.
```
