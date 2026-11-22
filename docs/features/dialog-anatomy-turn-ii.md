# Bundle 2 — Part C turn (ii)

Branch `lovable/next`; starting head `ea2967a21828a177d21828697a39a0f670a74b5f`.
CI SHA/verdict: unverified — all four branch evidence addresses returned HTTP 404.
Bundle write-back base: `63d6bee0d`.

## Rows

- Step 0 / row 4: Share keeps its public props and opener; content, subject, channel rows and QR load on opening via the existing resilient loader, with the product spinner. Existing IDs and caller-held opening remain.
- Row 5: AI editor description, held feature subject and form-owned footer.
- Rows 6–11: attribute edit/delete/merge/assign/remove and category attributes; descriptions, held subjects, footers, danger/question tones, and wide attributes panel.
- Rows 12–19: category editor/window/exclusions/retire/pointer/paths/delete/image; existing hints moved, conditional editor footers retained, merge/exclusion nested scrollers removed in favour of the anatomy body.
- Rows 20–22: country editor and active/rail dialogs; descriptions, held country subjects, footers and question/warning tones.
- Rows 23–29: View as, photo remove, policy settings, listing disposition/level/undo; descriptions, held listing/photo subjects and footers. Form-owned View as actions compose the existing CategoryModal, without changing its guard or request.
- Rows 30–35: create/edit/active/move/reorder/delete place; whole existing hints, held path subjects, conditional create footer and warning/question tones.
- Rows 36–40: market/override/price/end/product; approved descriptions, held subjects and footers. Standalone shared action helpers retain their previous frame through an opt-in bare rendering prop.

## Evidence and limits

- Touched feature folders: 69 test files, 438 tests passed.
- Scoped guards: 7 test files, 47 tests passed; forms, test IDs, non-null, tables, guides, overlays, dialogs and on-demand failures were requested (the test runner matched 7 files).
- ESLint: no output, success. Prettier: all matched files use Prettier style.
- Hardcoded-string check: findings 0; deletion check: no deletions.
- Usage maps: 1,867 keys / 758 source files / 415 dynamic call sites; both maps regenerated.
- All 10 supplied Amharic fingerprints matched before insertion.
- Preview build: latest entry at 2026-11-22T03:31:52Z says `build OK`.
- `bun run checks` did not complete: scripts-tests exceeded their 300-second deadline; the command then reached its 600-second sandbox deadline. Its earlier typecheck failure was fixed and the subsequent preview build passed. Full-gate verdict remains unverified. Scope artifact steps and install steps were NOT RUN; dependent format/lint/selector/root steps were NOT RUN within that gate. Scoped format/lint and guards above ran separately.
- Exact `/l/$slug` first-download KiB and authenticated staff browser checks remain unverified in this sandbox; no ceiling was raised.
- Row 19's dialog receives only category ID/has-image, not a held name or picture; it adds no subject lookup. Row 25 is a global policy editor, not a single-ad action. Row 39 currently holds the package key, which is shown as text without a new lookup.
- No browser spec was changed or claimed verified. The moved place hint changes its unit assertion from the field's aria-describedby to the dialog's whole description. Existing primary button IDs remain.
- Wizard Next remains untouched, as ruled; turn (iii), including row 65, was not started.
- Root AGENTS.md and dialog-opener.ts are byte-identical to the bundle base.

## Modified paths this turn

- `docs/features/dialog-anatomy-turn-ii.md`
- `docs/generated/i18n-usage.json`
- `public/i18n-usage.json`
- `src/features/ad-page/share-ad-dialog-lazy.ts`
- `src/features/ad-page/share-ad-dialog.tsx`
- `src/features/ad-page/share-ad.test.tsx`
- `src/features/ad-page/share-ad.tsx`
- `src/features/admin-ai/ai-editor.tsx`
- `src/features/admin-ai/ai-feature-form.test.tsx`
- `src/features/admin-ai/ai-feature-form.tsx`
- `src/features/admin-attributes/attribute-dialogs.tsx`
- `src/features/admin-attributes/attribute-editor.test.tsx`
- `src/features/admin-attributes/category-attributes-dialog.tsx`
- `src/features/admin-categories/category-dialogs.test.tsx`
- `src/features/admin-categories/category-dialogs.tsx`
- `src/features/admin-categories/category-editor.test.tsx`
- `src/features/admin-categories/category-image-dialog.tsx`
- `src/features/admin-countries/country-dialogs.tsx`
- `src/features/admin-countries/country-editor.test.tsx`
- `src/features/admin-countries/country-editor.tsx`
- `src/features/admin-countries/country-verb-dialogs.test.tsx`
- `src/features/admin-countries/country-verb-dialogs.tsx`
- `src/features/admin-listings/listing-page.tsx`
- `src/features/admin-listings/listing-photos.test.tsx`
- `src/features/admin-listings/listing-photos.tsx`
- `src/features/admin-listings/listing-settings.test.tsx`
- `src/features/admin-listings/listing-settings.tsx`
- `src/features/admin-listings/listings-page.tsx`
- `src/features/admin-listings/move-dialog.test.tsx`
- `src/features/admin-listings/move-dialog.tsx`
- `src/features/admin-listings/tier-dialog.test.tsx`
- `src/features/admin-listings/tier-dialog.tsx`
- `src/features/admin-listings/undo-dialog.test.tsx`
- `src/features/admin-listings/undo-dialog.tsx`
- `src/features/admin-locations/location-dialogs.tsx`
- `src/features/admin-locations/location-editor.test.tsx`
- `src/features/admin-locations/location-editor.tsx`
- `src/features/admin-locations/location-verb-dialogs.test.tsx`
- `src/features/admin-locations/location-verb-dialogs.tsx`
- `src/features/admin-monetisation/market-dialog.tsx`
- `src/features/admin-monetisation/monetisation-dialogs.tsx`
- `src/features/admin-monetisation/monetisation-field-gates.test.tsx`
- `src/features/admin-monetisation/override-dialog.tsx`
- `src/features/admin-monetisation/price-dialog.tsx`
- `src/features/admin-monetisation/price-end-dialog.tsx`
- `src/features/admin-monetisation/product-editor.tsx`
- `src/features/admin/impersonation/impersonation-starter.tsx`
- `src/i18n/locales/am-admin.ts`
- `src/i18n/locales/en-admin.ts`
