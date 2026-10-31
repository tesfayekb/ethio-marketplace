# Turn S6-1 — one dialog look (the supervisor's ruling on the S6 plan, and the plan's S6-1 sections)

```text
Base: dev 04fee757

RULING on your S6 plan. Base: dev 04fee757. The plan is approved as written, with the answers below. Build S6-1 now (stem sage-s6-1-dialog-look, branch cursor/sage-s6-1-dialog-look); S6-2, S6-3 and S6-4 follow as their own tasks after S6-1 is merged.

Open points:
1. 71fec9ff is the S6 plan; the brief's 836d1030 was my error. Checked against 71fec9ff, as you did.
2. Field look: inside dialogs, sheets and the filter panel only, through the `in-data-[dialog-panel]:` variant; the posting form keeps the form kit's look. NativeSelect stays the only file that draws a `<select>`.
3. The constants live in `src/components/ui/dialog-look.ts`, for the reason you give (menu-row.ts rides every page).
4. Yes: CONTROL_LOOK and SEARCH_FIELD move out of app-header.tsx into the shared module (app-header.tsx joins the scope); the close button reads the control look. One look, one home.
5. Close button: 44 px below md and on coarse pointers, 40 px on a fine pointer from md. The touch law wins.
6. Choice rows reuse LIST_ROW (the D264 radius) with one added option that lets the label wrap onto a second line; a report reason in Amharic is never cut. LIST_CHOICE_ON as proposed.
7. Yes: retire command, hover-card, context-menu, menubar, navigation-menu and sidebar with drawer and select — each with its intentional-deletions line and the `[intentional-delete]` marker; every package stays (a later package turn). CF-OV-4 watches all of them.
8. Yes: layers.ts joins the scope for the `layer` prop.
9. The phone menu: report only. It is non-modal and belongs to the menu-panel mechanism (DEC-288, D240), not to this concern.
10. Yes: the dark close button follows D262's card. §14's hex values are the design's starting point; the tokens as landed govern.
11. Yes: every bottom sheet draws the grabber, Share this ad included.
12. Four turns, one pull request each. Stems: sage-s6-1-dialog-look, sage-s6-2-select, sage-s6-3-popover, sage-s6-4-screens. Each saves its own brief (this ruling plus your plan's section for that turn, in one fenced block, with `Base: dev <sha>` on its first line) and names it on roadmap line 3.
13. Yes: /dev/style gains alert-dialog and sheet specimens from existing keys only.

Your K2 findings, filed: the duplicate row 84 in mechanisms.md (fix it in S6-1's docs part: the second becomes 87 and your new rows follow); the five local fieldClass constants (queued for the form-kit turn, not this one); the two `as unknown as` (fix the one in category-dialogs.tsx since S6-1 touches it; dropdown-menu.tsx's goes in S6-3); the three hand-drawn surfaces skipping NoticeOutlet (S6-4, as you say).

S6-1 also carries: the nine rule files from task 0, unchanged, in its first commit (`.cursor/rules/**` is in scope for that commit only); the register rows for dialog-look.ts and CF-DIALOG-1; the design-foundation.md section "Dialogs (turn S6-1)"; the changelog line. The report's growth section lists every page's change measured on the base and on your tree.

Then the full flow of rule 00: parts, THE CHECKS, THE BROWSER CHECK (dialogs.spec.ts whole, both projects, retries 0, plus every spec the G38 list names for S6-1's files), THE SELF-REVIEW, THE REPORT, the pull request, and its CI green.

---- THE PLAN'S S6-1 SECTIONS (the executor's plan of 2026-10-31, approved above) ----

TURN S6-1 — one dialog look: the tokens, dialog-look.ts and the three primitives rebuilt on
them; the field look; the consumers' own part classes moved; CategoryModal and StepUpGate
moved; the four button rows replaced; the report choice rows; drawer.tsx and select.tsx retired
(with command, hover-card, context-menu, menubar, navigation-menu and sidebar, ruling 7);
CF-DIALOG-1 rules 1, 3, 4 and 5; tests DLG-E1–E3, E5 and E6. The nine rule files ride its first
commit unchanged.

MECHANISM
- Tokens in styles.css (:root, .dark, @theme) and THEMES together (TH-2): --scrim
  (rgba(16,40,30,.55) light, rgba(0,0,0,.62) dark); --lift-dialog (a 1 px ring in the hairline
  colour plus two drops, black in dark); --lift-rule-top (inset 0 1px 0 in the rule colour);
  --lift-choice-on (a 1.5px inset ring in --primary); --radius-dialog 1.25rem. The field look
  reuses --field and --lift-field. --shadow-sheet retires with the toolbar sheet (S6-3).
- Constants in src/components/ui/dialog-look.ts: DIALOG_SCRIM, DIALOG_PANEL (popover surface,
  22 × 24 px padding, rounded-dialog, shadow-dialog), DIALOG_TITLE (display face, 20 px, 800),
  DIALOG_TEXT (14 px, muted), DIALOG_CLOSE (44 px below md and on coarse pointers, 40 px on a
  fine pointer from md; the control look), DIALOG_FOOTER (the top divider, then the buttons),
  DIALOG_FIELD (the pressed-in field), SHEET_PANEL (the start, end and bottom edges). Choice
  rows and separators import LIST_ROW, LIST_SEPARATOR and LIST_LABEL from menu-row.ts, which
  gains LIST_CHOICE_ON (the chosen ring) and the wrapping option (ruling 6).
- Parts: dialog.tsx, alert-dialog.tsx and sheet.tsx rebuilt on the constants, right-to-left
  safe (no right-4, sm:text-left, space-x or left/translate centring). DialogContent takes size
  (narrow / default / wide), fit (bounded / fill) and phone (float / sheet); layer (modal /
  viewer / top) replaces overlayClassName and the step-up's z-[100]; closeTestId;
  AlertDialogAction takes tone="destructive"; Action and Cancel are touch-sized by default. The
  panel carries data-dialog-panel, and Input, Textarea and NativeSelect take DIALOG_FIELD
  through an in-data-[dialog-panel]: variant. CategoryModal and StepUpGate stop emptying the
  panel and show their titles through DialogTitle; the four local button rows become
  DialogFooter.

GUARD — CF-DIALOG-1 (scripts/conformance/dialogs.test.ts + dialogs-allowlist.txt, kit.ts,
wired.test.ts), the allowlist empty:
- Rule 1 (DG-1): a dialog, alert-dialog or sheet part, or a dialog-primitive namespace part,
  with overlayClassName or a look class (background, border, shadow, radius, padding, text size
  or weight, height, width, z-index, position or translate, animation) outside the primitive
  files fails; sr-only passes; CategoryModal is read as a content part.
- Rule 3 (DG-3): each primitive file reads the constants; input, textarea and native-select
  read DIALOG_FIELD.
- Rule 4 (DG-4): two or more buttons in a row inside a dialog content, outside a footer part,
  fail.
- Rule 5 (DG-5): a label wrapping a radio or checkbox inside a dialog content reads LIST_ROW
  and LIST_CHOICE_ON.
- DG-6: a stale or expired allowlist line fails. Each rule has a planted case.
- CF-OV-4 (ruling 7): the retired overlay packages are watched; no file may reach them.

TESTS
- e2e/dialogs.spec.ts at 390, 834 and 1440, light and dark: DLG-E1–E3 the look of a dialog,
  an alert dialog and a sheet (panel radius and padding; the shadow's layers, the first the
  ring; the backdrop colour; title size and weight; description size and ink; close size; the
  footer divider; a choice row's height and chosen ring; a field's background and inset
  shadow), on /dev/style specimens from existing keys (ruling 13) and real surfaces; DLG-E5
  focus (the first field or the title on open, back to the trigger on close, Escape closes);
  OVS-4 opening a dialog or sheet does not move the page; DLG-E6 reduced motion.
- Unit: DG-U1–DG-U3 (the parts render the constants; the alert's destructive tone; the sheet's
  logical edges).

GROWTH — measured on the base and on the tree, every page, DEC-296's form for a ceiling
crossed or left inside the band.
```
