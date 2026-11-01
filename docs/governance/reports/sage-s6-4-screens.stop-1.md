QUESTION — sage-s6-4-screens part 4: the test id DLG-E7 is already taken
DONE: parts 1, 2, 3 (rule 00 steps 1–4 for each: census, change, tests, typecheck, lint, laws, commit)
LEFT: parts 4, 5; then THE CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT, the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `0ca681c0ab215776629404f59693482d52cc95a0` (short `0ca681c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T08:34:34Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41287917217
FILES:
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s6-4-screens.md
public/i18n-usage.json
roadmap.md
scripts/conformance/dialogs-allowlist.txt
scripts/conformance/dialogs.test.ts
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

## The question

The task's step 4 names DLG-E7 for the three screens' browser test. Part 4's census found that
DLG-E7 is already in use. `e2e/dialogs.spec.ts:327` is "DLG-E7 Share this ad: a bottom sheet with
its grabber below md, a floating dialog from md". Turn S6-1 added it as an id beyond the plan (S6-1
report, line 443), after the plan had reserved DLG-E7 for S6-4. TI-1 (`scripts/test-ids.test.ts`)
refuses an id used twice, so the task cannot be built as written. It is a premise the census proves
wrong, so this is a STOP before part 4's code. Which do you rule?

1. The screens' test takes **DLG-E8**, the next free id (no `DLG-E8` anywhere in the repository).
   Share's test keeps DLG-E7, and no existing id or record changes. (My recommendation.)
2. Share's test becomes DLG-E8 and the screens' test takes DLG-E7. This renames an id that the S6-1
   report cites.

## What parts 1–3 did (for the ruling's context; the report will carry it in full)

- **Part 1 (0a40b21d3).**
  - `DialogContent` gains `variant="screen"` (`SCREEN_PANEL`: the page surface, edge to edge, at
    every width) and `phone="full"` (`DIALOG_PHONE.full`: the whole screen below md, the card
    from md).
  - The photo viewer, the preview sheet and the pin dropper now ride it. Their portals, their
    `role="dialog"` / `aria-modal` layers, their Escape handlers, their focus code and the preview's
    `body.style.overflow` lock are gone. Each gets Radix's focus trap and layer stack, row 77's
    lock, NoticeOutlet and the one scrim.
  - The viewer's arrow keys stay, as the panel's own `onKeyDown`.
  - The pin dropper's state moved into an inner `PinSheet` that mounts with the panel, because the
    facade draws the content only once the overlay module has arrived, and Leaflet needs its box.
  - The thumbnail strip's keep-in-view moved into `Thumbs` for the same reason.
  - GAL-1, GAL-4, PSH-1, PSH-2 and PMD-1 were re-pointed (old → new in the report), and DG-U5 was
    added.
- **Part 2 (58b7cec02).**
  - DG-2 in `scripts/conformance/dialogs.test.ts`, planted: `role="dialog"` / `"alertdialog"` (as an
    attribute, a prop object or `setAttribute`), `aria-modal`, or a class list holding `fixed` and
    `inset-0`, outside MODAL_OWNERS.
  - It has no allowlist line, and the tree passes.
  - It is red on the base's `preview-sheet.tsx` (lines 73, 74, 75), proven by writing the base file
    into the tree, then restoring it.
- **Part 3 (51fc2bd3c).**
  - No z-index literal is left in the three surfaces; `Z_SHEET`, `Z_VIEWER` and `Z_TOP` are read
    only by `DIALOG_LAYER`.
  - `layers.ts` now says so, and GAL-1, PSH-1 and PMD-1 assert the layer class.
- **Ruling 3 (Leaflet):** `e2e/post-wizard-where.spec.ts` ran whole on both projects with 0 retries:
  32 passed (3.1 min). The fallback was not needed. The place spec runs at THE BROWSER CHECK.

## Choices made inside parts 1–3 that the report will name (no ruling asked; named so you can overrule)

- **Focus on screen-sized surfaces.**
  - A `variant="screen"` or `phone="full"` panel takes the focus on itself when it opens, so a
    phone's keyboard does not rise over the map.
  - On close it gives the focus back to what held it at the opening. Radix's modal content returns
    the focus to a `DialogTrigger` only (`@radix-ui/react-dialog` 1.1.15), and none of the three
    surfaces has one.
  - Every other dialog is unchanged.
  - K2: every controlled dialog without a trigger still loses the focus to the page body on close.
    This is reported only.
- **The preview's close.** The text button "Close preview" gave way to the primitive's close (the
  icon button, screen-reader text `common.close`; test id `post-preview-close` kept).
  `post.preview.close` now has no reader. Removing it means touching the locale files, which are
  outside this scope.
- **CF-DIALOG-1 DG-4.**
  - It read the viewer's ‹ › arrows as a button row outside the footer.
  - One allowlist line was added (`photo-gallery.tsx#DG-4`, until 2027-05-01), with the reason that
    they are the photo's own controls on its two edges, as with the photo editor's rotate tools
    (ruling 2 of S6-1's stop 2).
  - DG-2's own allowlist has no line.
- **The pin dropper's frame.**
  - It is the whole screen below md (it was ≤ 640 px) and the default 32rem card from md (it was
    42rem). The fill fit keeps the footer on screen.
  - Its verbs sit in `DialogFooter`, Cancel then Save (stacked with Save on top below sm).
  - Its choice rows read `LIST_ROW` and `LIST_CHOICE_ON`, and its result rows read `LIST_ROW`.
  - Its description is `DialogDescription` (14 px; it was 12 px).
  - A press on the scrim from md now cancels, as Escape does.
