# Lovable bundle 5 — plan (base `1b0af44c4`, branch `lovable/next`)

CI at the base: `1b0af44c4` SUCCESS (run 45123082781). Nothing changed this turn.

## (a) Files per part, each with its tests

- **Part A**: `src/components/ui/switch.tsx` (press area, once) + `switch.test.tsx` (SW-U2); `src/components/shell/filter-panel-body.tsx` + `filter-panel-body.test.tsx` (FP-U50, FP-U51; FP-U27 rewritten to the switch). The board's Filters/Columns pair: `src/routes/dev.style.tsx`.
- **Part B**: `src/features/posting/preview/preview-sheet.tsx` + `preview-sheet.test.tsx` (PS-U1, PS-U2); `src/features/admin-screening/screening-page.tsx` + `screening-decisions.test.tsx` (SCP-U1); `src/features/admin-listings/listing-photos.tsx` + `listing-photos.test.tsx` (LPH-U1, LPH-U2); `src/features/admin-countries/country-verb-dialogs.tsx` + its test; `src/features/admin-attributes/category-attributes-dialog.tsx` + its test; `src/features/admin/impersonation/impersonation-starter.tsx` + its test; `src/components/ui/dialog-parts.tsx` test file only (PFT-U1, the footer-holds-actions census held in my folders); `src/routes/dev.style.tsx` (board); `docs/features/design-foundation.md` (one section).
- **Part C**: `src/components/marketplace/feed.tsx` + `feed.test.tsx` (FD-U1); `src/features/admin/translations/use-translations.ts` + test (UM-U1) — only if decision C-3 rules option (i).

## (b) Part A — the switch as built

```tsx
<Switch
  id={filter.id}
  data-testid={filter.id}
  checked={filter.value}
  onCheckedChange={filter.onChange}
/>
```
- Name: `FilterRow` already renders `<label htmlFor={filter.id}>` (`htmlFor={filter.id}` at :67), so the switch is named by the row's label and the label presses it; the hand `aria-label` goes (no duplicate name). Radix gives `role="switch"` and `aria-checked`.
- Press area, in the primitive once (so Columns, settings, listing settings, languages and step-review switches gain it too): the root gets `relative after:absolute after:-inset-x-1 after:-inset-y-3 pointer-fine:after:-inset-y-2 after:content-['']` — the 20 px track presses over 44 px tall on touch, 36 px on a fine pointer; nothing in the drawn track changes, so the five existing consumers look the same. Direction already in the primitive (`rtl:data-[state=checked]:-translate-x-4`).
- Filters and Columns then draw the same element, same classes.
- Spec lines reading `aria-pressed` on it (for the supervisor's script): `e2e/dialogs.spec.ts:979` (`style-filters-full-missing`), `e2e/admin-categories-console.spec.ts:745-748` (`category-missing-filter`). `e2e/helpers/filters.ts` reads none. `e2e/admin-categories-images.spec.ts:268` presses only (unchanged contract).

## (c) Part B — footer census (every `PanelFooter`, every `footer` prop ending in one)

Actions only (buttons, AlertDialog Cancel/Action, shared `*DialogActions`, `ClosedPrimary`, link-variant buttons):
admin.listings_.$listingId_.edit.tsx:150 · dev.style.tsx:667, 737, 788, 818, 880 · photo-editor.tsx:348 · background-dialog.tsx:223 · map-pin-dropper.tsx:590 · promote-sheet.tsx:129 · columns-button.tsx:72 · filter-chips.tsx:108 · my-listings-page.tsx:890 · my-listing-page.tsx:828 · product-editor.tsx:182 · market-dialog.tsx:115 · price-end-dialog.tsx:70 · price-dialog.tsx:134 · override-dialog.tsx:148 · tier-dialog.tsx:79 · move-dialog.tsx:87 · undo-dialog.tsx:50 · listing-photos.tsx:343 · listing-settings.tsx:137 · country-verb-dialogs.tsx:194 · country-editor.tsx:93 · location-verb-dialogs.tsx:83, 158, 278, 378 · location-editor.tsx:105 · location-dialogs.tsx:171 · category-dialogs.tsx:284, 502, 595, 686, 784, 888, 1100 · category-image-dialog.tsx:331 · attribute-dialogs.tsx:346, 687, 799, 973, 1095 · category-move-dialog.tsx:45 · listing-detail.tsx:1412 · screening-page.tsx:851 · name-checks.tsx:343 · pseudo-bar.tsx:122 · approve-bar.tsx:163 · ai-bulk-bar.tsx:355 · delete-language-dialog.tsx:161 · legal-publish-dialog.tsx:163 · legal-editor-form.tsx:409 · legal-page.tsx:468 · certify-confirm.tsx:83 · report-ad-dialog.tsx:154 · import-dialog.tsx:447 · ai-editor.tsx:75 (from `ai-feature-form.tsx` `actions`: buttons; its error lines are in the body) · toolbar-panel.tsx:78, category-modal.tsx:81, preview-sheet.tsx:63 (pass-through parts).

Holds content, and where it goes:
| File:line | Holds | Moves to |
|---|---|---|
| screening-page.tsx:872 (PreviewSheet `footer`) | `ListingPhotos` grid; held-photos note `admin-screening-preview-unscreened`; "Open the ad's page" link | grid + note into the body under the preview (Part B first); link stays (it acts) |
| impersonation-starter.tsx:87 (`actions`, used by listings-page.tsx:811 and listing-page.tsx:944) | error alert `impersonation-error` | the body, under the reason field |
| country-verb-dialogs.tsx:76 | status note `country-close-scoped` | the body, after the existing text |
| category-attributes-dialog.tsx:236 | autosave note `category-attributes-autosave` | the body's end |
| photo-gallery.tsx:442 | thumbnail strip + strip arrows | **kept**, reason: each thumb is a button that picks the shown photo — the viewer's own controls; in the body it would scroll away with the photo it steers |
| auth: step-up-dialog.tsx:120 | Button + acting Link | actions only; reported, not touched |

Outside the definition (not a panel footer), reported: `wizard.tsx:1240` (`FormLayout` page action bar, holds `CertifyBlock`), `audit-page.tsx:290` (`ChartFrame` axis labels).

A footer that becomes empty: none does in this census; `PreviewSheet` keeps `end={!footer}` for DG-9.

## (d) Part B — PreviewSheet's shape

```ts
PreviewSheet({ view, onClose, footer?, body?, staff? }: { ...; staff?: ReactNode })
```
- `staff`: drawn in the body after `ListingDetail`, in the same `max-w-2xl` column, under a separator; absent for the owner (step-review passes nothing — unchanged). Screening passes `<ListingPhotos …>` and the held note; the heading is the grid's own `admin.listings.detail.photos` ("Photos", already drawn by `ListingPhotos`), so no new heading.
- `footer` stays, now actions only: Edit, Approve, Reject and the link. Layout is `BANDS_FOOT` (`flex-wrap-reverse justify-end gap-2`, `max-sm:[&>button]:flex-1`): on a phone the buttons share the row and the link (no longer `basis-full`) wraps above them at the start; on a large screen all four sit in one row at the end, the link first, `min-h-11 inline-flex items-center`. Logical properties only; no count of actions assumed.
- Permissions unchanged: grid still only under `mayEnforce`, `mayAllow={mayReview}`, note under `mayReview && heldCount > 0`.
- Failure lens: `ListingPhotos` today returns `null` while loading and on failure (`listing-photos.tsx:92`, `if (rows.length === 0) return null`) — silent. In the body it draws its card with `common.loading` (aria-busy) while loading, and `common.loadFailed` with Retry (`common.retry`) on failure; empty stays nothing. Both consumers (screening, listing-page) gain it — see (j).

## (e) Part C

- **INC-1140 stands**: `src/components/marketplace/feed.tsx:206` `onRetry={() => window.location.reload()}`. Fix: `onRetry={refreshPage}` imported from `src/lib/on-demand-failure.ts` (its own chunk already in the shell). Then the allowlist line in `scripts/conformance/stale-reload-allowlist.txt` for feed.tsx is removed by the supervisor's text (DEC-396).
- **INC-1141 stands**: `ai-bulk-bar.tsx:122-138` and `:144-166` page by `offset` until `totalCount`. The keyed reader is `readAllPages` (`src/lib/read-all-pages.ts:15`, `after` cursor). `listTranslations`/`listEntityTranslations` call `admin_list_translations` / its entity twin with `p_offset` only; no keyed door exists for a filtered (untranslated + search) list. The fix needs a door argument (SQL, Cursor's). Proposal: Cursor adds `p_after` to both doors; then I switch both collectors to `readAllPages` keyed by `key` / `entityType:entityId:field`. Not buildable by me alone — STOP item for Part C.
- **INC-1142 stands**: `use-translations.ts:390` bare `fetch("/i18n-usage.json")`, allowlisted in `scripts/conformance/route-client-allowlist.txt:3` until 2027-04-24, beside `src/i18n/bundle.ts:158` (same kind, line 4). The app's one way to fetch is `callRoute` (`src/lib/route-client.ts:154`, its one `fetch` at :115), which takes `/api/…` paths only. Options for the ruling: (i) Cursor adds a static-asset reader to `route-client.ts` (or `/api/` route) and I move both callers onto it; (ii) leave both as the allowlist says. I propose (i), built after Cursor's piece lands.

## (f) Exported types changed

- `PreviewSheet` props gain `staff?: ReactNode` (inline type; no exported type name).
- `Switch` props unchanged (className only).
- No reader, store, filter or route type changes.

## (g) Laws of the base and guard laws for Cursor

- Part A: CF-FORM-1..7 read `filter-panel-body.tsx` (`FILTER_HOSTS` admits `Switch` in `FilterRow`); CF-OV-* read nothing new. Guard law: no `aria-pressed` toggle drawn as a switch; `role="switch"` only from `ui/switch.tsx`. Held meanwhile by FP-U50.
- Part B: DG-1..11 read every changed dialog (DG-9 body end on PreviewSheet). Guard law: a `PanelFooter` (and any `footer` prop reaching one) has only `Button`, `ClosedPrimary`, `AlertDialogAction/Cancel`, `DialogClose`, shared `*DialogActions`, or a `Link` as children. Held meanwhile by PFT-U1 (a source census in `dialog-parts` tests over `src`, photo-gallery as its one named exception).
- Part C: CF-STALE-1 reads feed.tsx; routes.test/route-client census read use-translations. Guard law: no `location.reload` outside `stale-chunk.ts`, `refreshPage`, the root error page; no offset paging loop in `src/features`.
No allowlist line is added.

## (h) New test ids (each searched in `src`, `e2e`, `scripts`: 0 hits)

SW-U2, FP-U50, FP-U51, PS-U1, PS-U2, SCP-U1, LPH-U1, LPH-U2, PFT-U1, FD-U1, UM-U1. (FP-U47–49 are taken; FP-U50 onward free.)

## (i) Words

No new key. Reused: `admin.listings.detail.photos`, `common.loading`, `common.loadFailed`, `common.retry`, `admin.screening.openListing`. No Amharic written.

## (j) Not answered / wrong in the task

1. INC-1141 and INC-1142 cannot be fixed inside my folders: both need a Cursor piece (a keyed door argument; a static reader). Ruling needed: defer, or order Cursor first.
2. The task says the grid "still says so" when loading or failed — today it says nothing (returns null). The plan adds both states; that changes what staff see on the listing page too.
3. The thumbnail strip footer: kept with a reason; operator to accept or overrule.
4. The impersonation error moving into the body changes both "view as seller" dialogs.
5. The primitive's larger press area reaches all five Switch consumers; none overlaps neighbours at their row heights (min-h-12 rows) — to be measured on the board.
6. Build order proposed: Turn 1 Part A; Turn 2 Part B + board + doc; Turn 3 Part C (feed only unless Cursor's pieces land); last turn spec script, ceilings, platform write-back (`package.json`, `bun.lock`, `src/integrations/supabase/**`, `.lovable/**`) with the two empty proofs; no pull request.
