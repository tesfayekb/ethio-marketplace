QUESTION — sage-s6-1-dialog-look part H (CF-DIALOG-1): the census finds rows and choice labels the plan did not anticipate
DONE: parts A (commit 7da6f0341), B, C, D, E, G and F except /dev/style (commit ae0c22cba)
LEFT: part F's /dev/style specimens (ruling 13), H (CF-DIALOG-1, CF-OV-4, wired.test.ts line), I (unit DG-U1–U3, e2e/dialogs.spec.ts and the G38 specs), J (docs, growth); then THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT, the pull request's CI
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
docs/governance/briefs/sage-s6-1-dialog-look.md
docs/governance/briefs/sage-s6-1-dialog-look.ruling-1.md
docs/governance/reports/sage-s6-1-dialog-look.stop-1.md
docs/governance/reports/sage-s6-1-dialog-look.stop-2.md
docs/tracking/intentional-deletions.txt
roadmap.md
scripts/conformance/look-values-allowlist.txt
scripts/conformance/notice-outlet.test.ts
scripts/conformance/press.test.ts
src/components/layout/layers.ts
src/components/shell/app-header.tsx
src/components/shell/menu-row.ts
src/components/ui/alert-dialog.tsx
src/components/ui/command.tsx
src/components/ui/context-menu.tsx
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
src/features/admin-locations/location-dialogs.tsx
src/features/admin-screening/name-checks.tsx
src/features/admin-screening/screening-page.tsx
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
src/styles.css

Rule 00, step 3: "A census hit the task did not anticipate, or a premise the census proves wrong, is a STOP before code." The approved plan says CF-DIALOG-1 lands with its allowlist empty and that "the four local button rows become DialogFooter". I built the guard as the plan words its rules. Over the tree after commit ae0c22cba, DG-1 and DG-3 are clean (630 files read), and every planted case passes. Rules 4 and 5 find 18 places the plan did not name, and rule 1's "dialog-primitive namespace part" clause reaches two shell files. The guard draft is held outside the tree, uncommitted, until you rule. Commit ae0c22cba is green: typecheck, lint (0 errors, 46 warnings, down from 48 with sidebar.tsx gone), 134 unit-test files under src for the touched areas (957 tests), the shell and admin areas (63 files, 367 tests), and `bunx vitest run scripts` with 80 of 81 files passing. The one failure is NH-6, which fails on macOS because its C library ignores TZDIR; CI on Linux is its proof.

One edit outside the plan's file list rides commit ae0c22cba as a consequence of ruling 7: CF-NO-1's floor in scripts/conformance/notice-outlet.test.ts goes from 5 to 4 modal contents, because drawer.tsx (one of the five) is retired. The other four (dialog, alert dialog, sheet, the toolbar panel) still each draw a NoticeOutlet.

FINDINGS

1. DG-4, "two or more buttons in a row inside a dialog content, outside a footer part" — 12 hits.
   a. Seven are a dialog's own Cancel-and-confirm row, the same kind as the four rows already moved:
      src/features/admin-countries/country-verb-dialogs.tsx:229 (Reset, Save);
      src/features/admin-listings/listing-photos.tsx:354; src/features/admin-listings/listing-settings.tsx:196;
      src/features/admin-listings/move-dialog.tsx:92; src/features/admin-listings/undo-dialog.tsx:63;
      src/features/admin/import-dialog.tsx:595 (Undo, Close, Apply, Preview, by state);
      src/features/admin/legal/legal-editor-form.tsx:352 (an AlertDialogContent with its buttons in a plain div).
   b. Five are controls inside the dialog's body, not its action row:
      src/features/admin-attributes/category-attributes-dialog.tsx:367 (each attribute's up and down);
      src/features/admin-categories/category-dialogs.tsx:907 (each path's move select and buttons);
      src/features/admin-countries/country-verb-dialogs.tsx:196 (each rail entry's up and down, in an li);
      src/features/admin-locations/location-verb-dialogs.tsx:268 (each peer's up and down);
      src/features/posting/photo-editor.tsx:314 (rotate left and right, a direct child of DialogContent, above its DialogFooter).
2. DG-5, "a label wrapping a radio or checkbox inside a dialog content reads LIST_ROW and LIST_CHOICE_ON" — 6 hits, all checkboxes:
   two choice lists, src/features/admin-attributes/attribute-dialogs.tsx:741 (merge sources) and src/features/admin-categories/category-dialogs.tsx:615 (country exclusions);
   four inline toggles side by side in each attribute's row, src/features/admin-attributes/category-attributes-dialog.tsx:281, 308, 333, 346. LIST_ROW carries w-full, so these four would each become a full-width row: a visible layout change in that dialog.
3. DG-1's namespace clause: src/components/shell/toolbar-panel.tsx:68–79 (its Overlay, Content and Title draw their own scrim, sheet and title; the plan moves it onto the sheet in S6-3) and src/components/shell/app-rail.tsx's Content (the phone menu: non-modal, `modal={false}`; ruling 9 makes it report only).
4. Not a question: CF-KIT-7 refuses the guard's planted readAllowlist calls until the guard's file says why, in the form kit.test.ts reads. I will write that line with the guard.

QUESTION — which of these do you rule?
1. For DG-4: (recommended) the seven action rows in 1a join S6-1's scope and become DialogFooter (AlertDialogFooter for legal-editor-form.tsx). DG-4 then reads only a row that is a direct child of the content part (or of a form that is one), so the in-body rows in 1b pass. photo-editor.tsx:314 is still a direct child: either it takes an allowlist line dated to the form-kit turn, or a rule names a tool strip as such. Which?
2. For DG-5: (recommended) the two choice lists in 2 join and read LIST_ROW and LIST_CHOICE_ON (with LIST_ROW_WRAP where a name can run long), and DG-5 reads a label only when it is one of a list's mapped rows, so the four inline toggles pass. Or all six join, accepting the toggles' change to full-width rows. Which?
3. For DG-1's namespace clause: (recommended) it lands in S6-3 with the toolbar panel, and like CF-NO-1 it does not read a content whose Root is `modal={false}` (the phone menu, ruling 9). Or it lands now with a dated allowlist line for toolbar-panel.tsx. Which?
