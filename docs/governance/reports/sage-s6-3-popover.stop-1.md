QUESTION — sage-s6-3-popover parts 1–3 (the census): three files the moves need are outside the scope
DONE: steps 1–3 (orient, the brief saved at 930d415ac, the census of every part); no part's code
LEFT: parts 1–5; THE CHECKS; THE BROWSER CHECK; THE SELF-REVIEW; THE REPORT; the pull request's CI
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `2bf2a0b90e2657f98bba3c7f0141aae2ebee44a0` (short `2bf2a0b`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T05:02:53Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41274141818
FILES:
docs/governance/briefs/sage-s6-3-popover.md
docs/governance/reports/sage-s6-3-popover.stop-1.md
roadmap.md

The base: `origin/dev` is cc77e93e, the task's base, so there is no diff to check. 2bf2a0b is the
S6-2 pull request's last commit (SUCCESS). CI on the merge commit cc77e93e (run 41275709062) was
still running when this stop was written; it is read again when the turn resumes.

## The census, by part

Part 1 (the popover facade):
- `src/components/ui/popover.tsx` has one consumer, `src/components/shell/toolbar-panel.tsx:6`.
  `PopoverAnchor` has none, so it leaves both files.
- `src/lib/visible-area.ts` is imported by `dropdown-menu-impl.tsx:19`, `searchable-picker.tsx:6`
  and `popover.tsx:6`. The popover's import is the one F4b's nine ceilings name.
- **Hit 1.** CF-AREA-1 (`scripts/conformance/visible-area.test.ts:22–25` and `:44–47`) names
  `src/components/ui/popover.tsx` as a reader of `visible-area.ts`, and exempts it from the
  own-padding rule. Once `collisionPaddingNow` moves into `popover-impl.tsx` (item 1), CF-AREA-1
  fails on `popover-impl.tsx`: "imports visible-area.ts outside its on-demand readers". Its reader
  set must name `popover-impl.tsx` instead of `popover.tsx`. The plan's G38 list named this file
  ("`visible-area.test.ts` (the popover's owner moves)"). The brief's scope lists
  `overlays.test.ts`, `dialogs.test.ts` and `choice-lists.test.ts` only. Its allowlist is unchanged.

Part 2 (the toolbar panel):
- `ToolbarPanel` has two consumers, `filter-chips.tsx:93` and `columns-button.tsx:55`. They are drawn
  from 19 files (`rg -l "<FiltersButton|<ColumnsButton|<FilterChips" src`): dev.style, ai-calls,
  ai-page, attributes, categories, countries, coverage, listings, locations, name-checks,
  screening, audit, impersonation, roles-list, data-scope, languages, strings, users-list and
  my-listings. Neither consumer file changes: the test ids `${testid}`, `-panel`, `-close`,
  `-done`, `-clear` and `-all` all hold.
- **Hit 2.** CF-NO-1 (`scripts/conformance/notice-outlet.test.ts:108`) requires at least 4 modal
  contents drawn from the dialog-primitive namespaces. It reads exactly 4 today ("[notice-outlet]
  modal contents: 4", run on the base): `dialog.tsx`, `sheet.tsx`, `alert-dialog.tsx` and
  `toolbar-panel.tsx:69`. Item 2 removes the toolbar panel's own `DialogPrimitive.Content`; the
  Sheet draws the `NoticeOutlet` for it. The count becomes 3 and the floor fails. Its floor must
  go 4 → 3, as S6-1's went 5 → 4 when drawer.tsx was retired (S6-1 stop 2, ruling 4).
  `notice-outlet.test.ts` is not in the scope.
- The phone footer: the shared footer part (`DIALOG_FOOTER`) stacks its buttons below `sm`. The two
  consumers lay a link button and a `ms-auto flex-1` Done button in one row, and those files are out
  of scope. So the toolbar panel's footer part keeps today's row with a layout class
  (`flex-row items-center`), which DG-1 does not read as a look. That is not a question; it is
  named here so the ruling can say otherwise.

Part 3 (the step-up gate's dialog on demand):
- **Hit 3, a premise.** The brief says "the one place that mounts it". `StepUpGate` is mounted in
  19 page files, not one: `admin.listings_.$listingId_.edit.tsx:104`, `listings-page.tsx:542`,
  `categories-page.tsx:949`, `listing-page.tsx:399`, `ai-page.tsx:231`, `strings-page.tsx:278`,
  `languages-page.tsx:114`, `legal-page.tsx:296`, `legal-version-view.tsx:176`,
  `legal-editor-form.tsx:108`, `attributes-page.tsx:475`, `coverage-page.tsx:195`,
  `roles-list.tsx:278`, `user-detail.tsx:115`, `locations-page.tsx:361`, `role-detail.tsx:123` and
  `:226`, `permission-matrix.tsx:77`, `screening-page.tsx:410`, `countries-page.tsx:272`. The gate
  is a render-prop wrapper around each page's content, so it cannot itself arrive late.
- None of the 19 needs to change. The split is inside the gate: `step-up-gate.tsx` keeps the hook
  and the render prop, and its dialog moves to a module fetched on the first step-up.
- **Hit 4.** That module is a new file, `src/features/auth/mfa/step-up-dialog.tsx`, which the scope
  does not name. The gate fetches it through `resilientLazy` (the on-demand mechanism, rule 10).
  It draws only while `mode` is not `closed`, keeps `layer="top"`, and its fallback calls the
  gate's `unavailable`. So a failed download still settles the guarded action as
  `StepUpUnavailable` (INC-911, SUG-1), and it is reported through `reportOnDemandFailure`.
- Today's numbers (local build of the base): the `step-up-gate` chunk is 1.36 KiB gzipped, and
  `dialog-look` is 0.91 KiB. `visible-area` is 0.49 KiB, and the `toolbar-panel` chunk (with the
  Radix popover) is 3.68 KiB. The nine F4b pages measure: `/admin/countries` 344.1 of 345,
  `/admin/coverage` 336.9 of 338, `/admin/impersonation_/$sessionId` 315.6 of 317,
  `/admin/listings` 360.7 of 362, `/admin/listings_/$listingId_/edit` 408.7 of 410,
  `/admin/places` 345.6 of 346, `/admin/roles` 312.1 of 313, `/admin/screening` 385.9 of 387 and
  `/admin/users` 311.5 of 312.
- The alternative without a new file is for `step-up-gate.tsx` to fetch `ui/dialog.tsx` and
  `ui/input.tsx` itself through `loadOnce` and draw the dialog from the fetched modules. It works,
  but it is a second way to fetch a component beside `resilientLazy`, and the modal's JSX would
  wait on two module objects.

Part 4 (the guards), and where the tests go (my reading; the ruling can change it):
- CF-OV-4 in the tree (S6-1) is "no file reaches a retired overlay package". The popover package
  is not retired: it is reached by one file. So it joins CF-OV-1's watched list and `MAY_REACH`.
  `@radix-ui/react-popover` may be reached only by `popover-impl.tsx`, and `./popover-impl` only by
  `overlays-impl.ts`. CF-OV-2 plants the bypass, and `check-marketplace-imports.mjs` gains the
  package. CF-OV-4's own list is unchanged.
- DG-1's namespace clause covers a part of any namespace imported from `dialog-primitive` outside
  the primitive files, and `PopoverContent` outside `popover.tsx` and `popover-impl.tsx`. It skips
  a `Root` with `modal={false}` (`app-rail.tsx:1129`, ruling 9). After part 2 the only namespace
  consumer left outside the primitives is `app-rail.tsx`.
- DLG-E4 and OVE-4 are one test, titled "DLG-E4+OVE-4" (TI-1 reads both ids), in
  `e2e/overlays.spec.ts`. The step-up test goes in `e2e/mfa-stepup.spec.ts`, on MF-3's
  surface: a staff member with no factor on `/admin/users/<id>`, with no TOTP. Both are existing
  specs with area lines, so `scripts/e2e-select.ts` does not change.

## The question

1. May `scripts/conformance/visible-area.test.ts` join the scope, for its reader set and its
   padding exemption (`popover.tsx` → `popover-impl.tsx`)? (Recommended: yes. Without it, item 1
   cannot land green.)
2. May `scripts/conformance/notice-outlet.test.ts` join the scope, for CF-NO-1's floor 4 → 3? This
   is the toolbar panel's own modal content leaving; the Sheet draws its NoticeOutlet.
   (Recommended: yes.)
3. For item 3, choose one:
   - (a) Recommended: the new file `src/features/auth/mfa/step-up-dialog.tsx` joins the scope,
     fetched through `resilientLazy`, and the 19 mounting files stay untouched.
   - (b) No new file: `step-up-gate.tsx` fetches `ui/dialog.tsx` and `ui/input.tsx` through
     `loadOnce`.
4. Confirm or correct the readings in part 4:
   - the popover package goes on CF-OV-1's `MAY_REACH`, not CF-OV-4's retired list;
   - DLG-E4+OVE-4 goes in `overlays.spec.ts`;
   - the step-up test goes in `mfa-stepup.spec.ts`.
