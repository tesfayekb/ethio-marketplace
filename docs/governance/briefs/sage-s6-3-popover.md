# Turn S6-3 — the popover on demand (the task, and the plan's S6-3 sections)

```text
Task: sage-s6-3-popover. Base: dev cc77e93e. Build S6-3 of your approved S6 plan (the plan and its rulings: docs/governance/briefs/sage-s6-1-dialog-look.md; what landed: the S6-1 and S6-2 reports in docs/governance/reports/). No plan round; a census hit the plan did not anticipate is still a STOP.

THE TURN (concern 2 of the plan, mechanisms.md row 48): the popover and the step-up gate's dialog wait for the person's intent and never ride a page's first download.
1. The popover joins the overlay facade: popover-impl.tsx (Radix popover, collisionPaddingNow, the list surface) exported through overlays-impl.ts; popover.tsx a facade on OverlayRoot with kind="popover" (aria-haspopup="dialog" closed, the click intent replayed, controlled open passed through); PopoverAnchor retired if unused (CF-OV-3 holds); no `as unknown as` (the dropdown-menu.tsx:55 one goes too, in scope).
2. The toolbar panel: the phone branch becomes Sheet side="bottom" (the primitive draws the grabber); the md branch uses the popover facade with PopoverContent variant="panel"; its own backdrop, panel, grabber, header, title and footer go; its allowlist line (choice-lists-allowlist.txt toolbar-panel.tsx#PopoverContent) goes.
3. The step-up gate's dialog loads on demand (S6-1 stop 3: dialog-look.ts rides the first paint of the pages that draw the gate); the gate keeps its layer (top) and its behaviour; a test proves the gate's dialog code is absent from the first download and present on the first step-up.
4. CF-DIALOG-1's low-level-parts clause (DG-1 on the dialog-primitive namespace and PopoverContent) lands now, skipping non-modal content (the phone menu, ruling 9 of the plan); CF-OV-4 covers the popover package; the weight guard's list (check-marketplace-imports.mjs) gains it.
5. The nine staff pages F4b raised (route-budgets.mjs lines marked "turn F4b") come down to what your tree measures, DEC-296's form; every other page's change measured and named.

TESTS: DLG-E4 / OVE-4 (the popover's code absent from a staff page's first download, present after the first press); HS-16 and the toolbar-panel tests re-pointed and named (old → new); the step-up test of item 3; the G38 list for the filter panel (the 15 specs and helpers that open it), run whole, both projects, retries 0; the laws; THE CHECKS; THE SELF-REVIEW; THE REPORT; the pull request's CI green.

SCOPE (by area): src/components/ui/ (popover.tsx, the new popover-impl.tsx, overlay-facade.tsx, overlays-impl.ts, overlay-loader.ts, dropdown-menu.tsx, dialog-look.ts) and their tests; src/components/shell/toolbar-panel.tsx and its tests; src/features/auth/mfa/step-up-gate.tsx and its tests (and the one place that mounts it, if the on-demand split needs it: name it in the report); src/lib/visible-area.ts if the move needs it; scripts/conformance/ (overlays.test.ts, dialogs.test.ts, choice-lists.test.ts and their allowlists); scripts/check-marketplace-imports.mjs; scripts/route-budgets.mjs, scripts/check-bundle-size.mjs; scripts/e2e-select.ts (a new spec's area line); e2e/ (the specs named); docs/features/design-foundation.md, docs/governance/mechanisms.md (row 48 and row 88), docs/_changelog.md, roadmap.md, the brief and the report. AGENTS.md is not in scope.

---- THE PLAN'S S6-3 SECTIONS (the executor's plan of 2026-10-31, approved by the ruling saved in docs/governance/briefs/sage-s6-1-dialog-look.md) ----

## 2. The mechanism (the popover's part)

**Popover (joins row 48).**

- A new `popover-impl.tsx` holds Radix's popover, `collisionPaddingNow` and the list surface. It is exported through `overlays-impl.ts` as `popover`.
- `popover.tsx` becomes a facade on `OverlayRoot`. The facade gains `kind="popover"`: the closed attributes `aria-haspopup="dialog"` and a click intent that is replayed on the same element. It passes a controlled `open` through.
- `PopoverContent variant="panel"` replaces toolbar-panel's own classes. `PopoverAnchor` has no consumer and leaves both files, so CF-OV-3's "facade exports equal the impl's" still holds.
- This takes `visible-area` and the popover's Radix code off the first paint again.
- The popover facade will not copy the `as unknown as` in `dropdown-menu.tsx:55`.

**Toolbar panel.** Its phone branch becomes `Sheet side="bottom"`, with the primitive drawing the grabber. Its md branch uses the popover facade.

## 3. The guard (the popover's part)

- **Rule 1 (DG-1), own look on a part.** A dialog, alert-dialog or sheet part, a `dialog-primitive` namespace part, or (from S6-3) `PopoverContent` fails outside the primitive files when it carries any of:
  - `overlayClassName`;
  - a look class: background, border, shadow, radius, padding, text size or weight, height, width, z-index, position or translate, or animation.

  `sr-only` passes. `CategoryModal` is read as a content part.
- **CF-OV, first downloads (a new CF-OV-4, planted).**
  - The watched list gains `@radix-ui/react-popover`, react-select and vaul. `MAY_REACH` lets only `popover-impl.tsx` reach the popover; the other two may be reached by no file.
  - `check-marketplace-imports.mjs` gains the same packages.

## 4. The tests (the popover's part)

- **DLG-E4 (and OVE-4):** the popover's code is absent from a staff page's first download and present after the first press.
- **Unit tests:** OVF-23 onward (the popover facade: closed attributes, click replay, controlled open).

## 5. The G38 list (the popover's part)

- `toolbar-panel.test.tsx` **HS-16**: the phone sheet is drawn by `Sheet`, whose close carries `f-close`; the md popover arrives on demand.
- `overlays.test.ts` CF-OV-1 and CF-OV-3 (export lists); `choice-lists.test.ts` (the `OWNERS` popover entry); `visible-area.test.ts` (the popover's owner moves); `notice-outlet.test.ts`.
- `choice-lists.spec.ts:59`, `overlays.spec.ts` and `overlay-shift.spec.ts`; the 15 specs and helpers that open a filters panel.

## 6. Growth (the popover's part)

- **The nine staff pages that F4b raised** should shrink when the popover and `visible-area` leave their first paint: `/admin/countries`, `/coverage`, `/impersonation_/$sessionId`, `/listings`, `/listings_/$listingId_/edit`, `/places`, `/roles`, `/screening` and `/users` (confirmed: 9 "turn F4b" lines in `route-budgets.mjs`). Their ceilings are lowered to what CI measures, using DEC-296's form.

## 7. The turns

3. **S6-3, the popover on demand:** the popover's impl and facade, toolbar-panel, CF-OV-4 and the weight-guard list, DLG-E4 / OVE-4, and the nine ceilings lowered.

---- THE RULINGS THE TASK CITES (as saved) ----

Plan ruling 9: The phone menu: report only. It is non-modal and belongs to the menu-panel mechanism (DEC-288, D240), not to this concern.
S6-1 stop 2, ruling 3: Yes: the low-level-parts clause lands in S6-3 with the toolbar panel, and it skips non-modal content (the phone menu, ruling 9). Note it in S6-1's report under "left for S6-3".
S6-1 stop 3, ruling 1 (its S6-3 part): Option (c), the step-up gate's dialog on demand, becomes a named part of S6-3 (the on-demand turn), where the ceilings come back down; record it in the report under "left for S6-3", with today's numbers.
S6-1 stop 3, ruling 2 (standing): a new spec file always carries its area line, and the entry ceiling always rides the task that moves it; both files are in scope whenever that is the reason.
```
