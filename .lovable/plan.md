# Turn S6 plan — every dialog, sheet and overlay from one primitive, one look

(Turn C's plan, written just before this request, is drafted and can be shown again when C is asked for. Summary: one `--press` token + `PRESSED` constant in menu-row.ts with a small root pointerdown listener; `useMenuAt()` in menu-current.ts reads the router's pending location for the chosen-item mark only, while the frame stays on INC-581's committed path; CF-PRESS-1 rules 1–3, PS-1…4, about +0.4 KiB per page.)

## CI first
- Newest completed run on the evidence page (12:27Z): 53aaccf3 FAILURE. Brief names its two reds (/dev/style 245.9/246; lane 1 start, INC-1028) as B2's to fix first; this plan does not fix them.
- No completed run on 836d1030 yet. Read again before the build turn's push.

## What the operator will see
Report this ad, Share this ad, the photo editor, every confirm box, the translation history drawer, the staff filter panel, the map pin dropper, the photo viewer and the ad preview all share one panel, one dark backdrop, one title size, one 40 px close button, one footer divider, the same choice rows as the dropdowns and the same pressed-in text fields — in light and dark, at every width.

## Census (836d1030; build turn pastes full file:line)
Primitive consumers — "uses the primitive":
- dialog (11 incl. command.tsx): report-ad, share-ad, background-dialog, category-dialogs, listing-detail, step-up-gate, legal-publish-dialog, photo-editor, legal-page, dev.style, command.tsx.
- alert-dialog (12): my-listings-page, my-listing-page, certify-confirm, pseudo-bar, delete-language-dialog, approve-bar, ai-bulk-bar, category-move-dialog, legal-editor-form, admin edit route, screening-page, name-checks.
- sheet (2): history-drawer, sidebar.tsx (phone sidebar).
- popover (1): toolbar-panel.tsx — imports `@radix-ui/react-popover` by value via popover.tsx, plus visible-area: rides nine staff pages' first paint (F4b's raised ceilings).
- native-select (4 importers: locations-toolbar, categories-page, attributes-page, data-table).

"Draws its own":
- toolbar-panel.tsx :68 — phone branch draws its own `DialogPrimitive.Overlay` `bg-foreground/45`.
- preview-sheet.tsx :73–75 — `fixed inset-0`, role=dialog, aria-modal.
- photo-gallery.tsx :357–361 — full-screen viewer, own role/aria-modal.
- map-pin-dropper.tsx :352–357 — own overlay `bg-background/80` and panel.

Own classes on dialog parts outside the primitive:
- photo-editor.tsx :237 (`max-h-[95vh] overflow-y-auto`), :350 (`DialogFooter gap-2`); background-dialog.tsx :203 (`gap-2`); legal-publish-dialog.tsx :46 (`max-h-[85dvh] overflow…`). Build turn greps every `*Content|Title|Description|Footer|Header|Close` className across src.

Unused primitives:
- drawer.tsx (vaul): no consumer — **retire** (delete, intentional-deletions line; drops its CF-LOOK-1 line look-values-allowlist :3; vaul stays in package.json — a package change is its own turn, K2).
- select.tsx (Radix select): no consumer — **retire** (same); the searchable picker and native select own those concerns (D264).

Allowlists:
- choice-lists-allowlist.txt holds **21** native-select lines "until SAGE-S6", not five as the request says, plus toolbar-panel#PopoverContent. Proposal: the closed native select is a field, not an overlay (D264 premise 4) — each line gets reason "a native select is a dialog field: closed control takes DIALOG_FIELD; the device draws its list" and until `permanent`, collapsed to one rule in CF-LIST-1 (native-select.tsx is the only `<select>` drawer; the 20 consumer lines go once they import NativeSelect — itself a K2 count, ruled per file in the build census). toolbar-panel#PopoverContent goes (S6-2).
- look-values-allowlist :3 (drawer) goes with drawer.tsx.

## Mechanism
1. **Constants** in `src/components/shell/menu-row.ts` beside the list constants (one look file; rename to `overlay-look.ts` only if ruled):
   `DIALOG_OVERLAY`, `DIALOG_PANEL` (`bg-popover rounded-dialog px-6 py-5.5 shadow-dialog`), `DIALOG_TITLE` (`font-display text-xl font-extrabold`), `DIALOG_TEXT`, `DIALOG_CLOSE` (40 px, control style), `DIALOG_FOOTER` (`shadow-divider-top pt-4`), `DIALOG_CHOICE` (40 px, 12 px radius, chosen `bg-nav-pill` + `inset ring --nav-ink`), `DIALOG_FIELD` (`bg-field shadow-field`), `SHEET_PANEL` (edge variant of DIALOG_PANEL), `VIEWER_PANEL` (full-screen, no radius). Separators and labels reuse LIST_SEPARATOR/LIST_LABEL.
2. **Tokens** in styles.css + themes.ts (light/dark): `--radius-dialog` 20px, `--shadow-dialog` (ring + two layers, §14), `--overlay-scrim`, `--shadow-divider-top`. Field tokens reuse `--shadow-field` if present, else added.
3. **Parts read them only:** dialog.tsx, alert-dialog.tsx, sheet.tsx take the constants; size props (`size="tall"` = bounded height + scroll) replace the consumers' `max-h-…` classes; `DialogFooter` owns its gap.
4. **Full-screen surfaces join the facade:** a `variant="viewer"` / `variant="sheet-full"` on dialog.tsx (Radix Dialog, so focus trap, Escape, scroll lock, row 77 and NoticeOutlet come free). photo-gallery, preview-sheet and map-pin-dropper move onto it. Fallback if Radix focus trap breaks the map (Leaflet keyboard): map-pin-dropper keeps its layer with an allowlist line `key | reason | until S6-3`.
5. **Popover joins row 48:** `popover-impl.tsx` (Radix popover + collisionPaddingNow) behind overlay-loader.ts / overlays-impl.ts; popover.tsx becomes a facade (OverlayRoot/Trigger/Content) like dropdown-menu. visible-area leaves first paint again (F4a ruling 2). toolbar-panel's phone branch uses the facade's sheet, not its own Overlay.
6. **Select** retired, so nothing to join; CF-OV gets a rule that a Radix select import fails.

## Guard
- **CF-DIALOG-1** (scripts/conformance/dialogs.test.ts, kit census, wired.test.ts): rule 1 a dialog/sheet/alert part with a look class (radius, shadow, bg, padding, text size/weight, max-h) outside src/components/ui fails; rule 2 `role="dialog"|"alertdialog"`, `aria-modal` or `fixed inset-0` outside the primitives fails; rule 3 a primitive file not reading the DIALOG_* constants fails. Planted DG-1…3. Allowlist `key | reason | until`, empty unless the map fallback is ruled.
- **CF-OV-4**: popover-impl / any `@radix-ui/react-popover|react-select` import by value outside the impl fails (planted OV-4); the weight guard's MUST_NOT_CARRY adds the popover impl and visible-area for staff pages.

## Tests
- Unit: DG-U1…3 (constants read by each part), facade popover test (OVE pattern: impl not imported until open).
- Browser `e2e/dialogs.spec.ts` at 390, 834, 1440, light and dark, for a dialog (Report this ad), an alert dialog (delete listing confirm) and a sheet (history drawer): panel radius, padding, ring and shadow layers (box-shadow layers parsed as in DCC-1), overlay colour, title size/weight, close 40 px, footer divider, choice row height and chosen ring, field inset. DLG-E1…3.
- DLG-E4 popover code absent from /admin/… first download, present on first press (OVE).
- DLG-E5 focus: first field or title on open, back to trigger on close; Escape closes; page does not move (OVS).
- DLG-E6 reduced motion: no transition.
- DLG-E7 photo viewer and preview sheet: same overlay token, Escape closes, focus returns.
- Touched specs whole, both projects, retries 0.

## G38 list (build turn greps and names old → new)
- Specs reading `bg-black/80` / overlay colour, dialog `rounded-lg`, `p-6`, title `text-lg`; toolbar-panel phone overlay `foreground/45`; photo-gallery / preview-sheet / map-pin-dropper `role=dialog` selectors (testids kept, so most hold); OVE/OVS specs gaining popover rows; the nine staff ceilings lowered in route-budgets.mjs.

## Growth
- Nine staff pages: shrink by popover Radix + visible-area (est. −8 to −12 KiB); ceilings lowered to measured + DEC-296 margin.
- Public pages: dialog constants ride only the on-demand impl; header/feed change ≈ 0 (tokens ≈ +0.1 KiB CSS on every page). Ad page (photo viewer moves onto the facade): est. −0.5 to +0.3 KiB; DEC-296 form for any ceiling crossed.

## Turns
- S6-1: tokens, constants, parts, CF-DIALOG-1 rules 1/3, DLG-E1…3/E5/E6, own-class consumers moved, drawer/select retired.
- S6-2: popover facade + impl, toolbar-panel, CF-OV-4, DLG-E4, staff ceilings lowered, allowlist lines settled.
- S6-3: viewer/full sheet variant; photo-gallery, preview-sheet, map-pin-dropper; CF-DIALOG-1 rule 2 with empty allowlist; DLG-E7.

## Open points for the ruling
1. The 21 native-select lines (not 5): permanent as dialog fields, or each converted to NativeSelect.
2. Retiring drawer.tsx and select.tsx (vaul / Radix select packages removed in a later package turn).
3. Map pin dropper on the Radix dialog, or allowlisted.

## Technical scope (build)
src/components/ui/{dialog,alert-dialog,sheet,popover,dialog-primitive,overlay-facade,overlay-loader,overlays-impl}.tsx, new popover-impl.tsx; menu-row.ts; styles.css, themes.ts; the consumers above; scripts/conformance/; e2e/dialogs.spec.ts; route-budgets.mjs; docs; intentional-deletions.txt. AGENTS.md not in scope.
