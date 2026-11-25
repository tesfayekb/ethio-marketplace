# Bundle 10b — failure notice and refusal words on the screens bundle 6 held; one read on admin Edit; the size list in WebKit

CI: last completed dev run `db0b43c` SUCCESS (run 45633122112). Tree read at `1094b3d1b`. Plan only; nothing changed.

## 1. Items, files, and the four states today

### D31 View as: refusal words
- `src/features/admin/impersonation/impersonation-starter.tsx:80-81` calls `readRefusal(failure, { generic: "impersonation.failed" })` with no `words`, so every code shows `impersonation.failed`.
- Fix: add an `IMPERSONATION_REFUSALS` family inside the impersonation folder (`impersonation-refusals.ts`), and pass it at :80.
- Test: `impersonation-starter.test.tsx` has one unnamed layout case. The new family test is `impersonation-refusals.test.ts` (IMR-1..3).

### D38 Retry on audit and view-as reads
| Read | Loading | Failed | Empty | Retry today |
|---|---|---|---|---|
| Audit rows, `audit-page.tsx:327-331` | `admin.audit.loading` | a local `errorState` `<p>` with `admin.audit.error`, so not the notice | `admin.audit.empty` | none |
| Audit chart, `audit-page.tsx:290-297` → `chart-frame.tsx:111-115` | skeleton | FailureNotice, but no `onRetry` is passed | `prim.state.empty` | none |
| View-as profile, `impersonation-view.tsx:~190` → `detail-panel.tsx:51-55` | skeleton | FailureNotice, but no `onRetry` | `prim.state.empty` | none |

- Fix: remove the local `errorState`. DataTable draws the notice with `onRetry={() => void list.refetch()}`. The chart gets `onRetry={() => void stats.refetch()}`, and the profile gets `onRetry={() => void profile.refetch()}`.
- Both primitives already take `onRetry`, so no primitive changes.

### D39 a failed End now is never shown
- **View-as page** (`impersonation-view.tsx:175-188`): `end.mutate` has `onSuccess` only. A refusal draws nothing.
  - Fix: add an `onError` that reads `readRefusal(e, IMPERSONATION_END_REFUSALS)`, and an `ActionMessage` with test id `impersonation-end-error` beside the button.
- **Bar** (`impersonation-banner.tsx:48-55`): `end.mutate(session.id)` draws nothing on failure. Same fix; new test id `impersonation-banner-end-error`.
- **Shell fallback bar** (`src/components/shell/impersonation-notice.tsx:51-53, 66-83`): any failure becomes `DOOR_REFUSED_KEY` plus Refresh page, and the code is dropped.
  - Fix: keep the existing test ids `impersonation-notice-failed` and `impersonation-notice-refresh`. The words come from the end family:
    - `noActiveSession` → `impersonation.noneActive` ("No view-as session is active.", base, already present), with no Refresh.
    - Other codes → their words.
    - A network or server failure → the notice's Retry, which calls `endNow` again in place of reloading the page. A page reload in Retry is banned by the guard.
  - The family must sit in a file that is not on the first download. This file is on the shell's first paint, so it reads the family through the on-demand service it already loads (`SERVICE.load()`). Nothing new reaches the first download.

### D40 view-as ad list
- `impersonation-view.tsx:262-263` passes `loading` and `error` but no `loadingState`. The error slot draws the DataTable default, and the census line says it is not on the notice.
- Fix: add `loadingState` with `prim.state.loading`, and `onRetry={() => void listings.refetch()}`.
  - States: loading (`prim.state.loading`), failed (notice with Retry), empty (`impersonation.listings.empty`).

### D42 audit facets
- `audit-page.tsx:114, 122-135`: `choicesReady: !facets.isLoading`. On failure, `facets.data` is undefined, so both selects silently offer only "All".
- Fix: when `facets.error` is set, draw `<FailureNotice error={facets.error} onRetry={() => void facets.refetch()} testid="audit-facets-error" />` in the toolbar slot.
  - `choicesReady` stays true, so the list still loads; the kept-filter wait must not hang on a failure.
  - States: loading (selects wait), failed (notice and Retry), empty (only "All", a real answer).

### D49 attributes secondary reads (`src/features/admin-attributes/attributes-page.tsx`)
| Read | Today (loading / failed / empty) | Planned |
|---|---|---|
| Category roster (:96, 124-132) | `undefined` becomes `[]` for both loading and failure, so no categories show and the filter is silently dropped (:129-144) | Filter control waits while loading. On failure, notice `attribute-categories-error` with Retry, and the filter keeps its slug unresolved and does not clear it |
| Effective links (:140-144) | `[]`, so the table shows `admin.attributes.filter.empty` | Waiting while loading. On failure, notice `attribute-links-error` with Retry, and no "no match" caption |
| Used by (:175-178, 345-370) | `[]`, which shows "—" or `admin.attributes.usage.none` | Cell shows `prim.state.loading` while loading. On failure, `CellFailed` words (existing `prim.state.failed` or its equivalent), plus one notice above the table with Retry; never "none" |
| Coverage (:185-191, 313-333) | Falls back to `{total, withAm: 0}`, so it looks like real 0/N | Same pattern; never "0/N" while unknown |

- Staff-only reads refused (`permissionDenied`) read as `noAccess` through `failureKind`, never as empty.

### D50 attribute link refusals
- `attribute-refusals.ts:16-56` lacks: `unknownCategory`, `badAllowedOption`, `badDefault`, `badVisibleWhen`, `priceBasisDuplicate` and `badClearCell`.
- Already present: `unknownAttribute` :25, `unknownLink` :26, `alreadyLinked` :31, `cardLimit` :32, `factLimit` :33, `rankInherited` :34, `orderMismatch` :35. The census list in the brief overstates these; see Findings.
- The cell caption `attribute-link-cells.tsx:136-166` always shows `admin.attributes.link.saveFailed`. The caller's refusal handler (`category-attributes-dialog.tsx:192-196, 439-440`) gets the code.
  - Fix: the cell's error caption shows the family words the parent passes, and the test id is unchanged.

### D55 attributes export
- `attributes-page.tsx:207-230, 525-534` uses one boolean, so it always shows `admin.attributes.export.error`.
- Fix: read the route's answer code through the `downloadRoute` result and an `ATTRIBUTE_EXPORT_REFUSALS` family:
  - `forbidden` → `admin.ai.error.denied` (reuse, admin layer, as ruled in 10a-2)
  - `unknownCategory` → `admin.categories.error.unknownCategory`
  - `badScope` → new key
  - anything else → `admin.attributes.export.error`
- The test id `attribute-export-error` is kept.

### INC-1292 one read on admin Edit
- The route calls `useAdminListing(listingId)` (`src/routes/admin.listings_.$listingId_.edit.tsx:80`) only to fill the crumb.
- The wizard reads the same door: `readForStaff` → `readAdminListing` (`src/features/posting/use-edit-draft.ts:133-140`, called :269).
- Fix:
  - `use-admin-listing.ts` exports `adminListingKey(id)` (the key `[...ADMIN_LISTINGS_KEY, "detail", id]`, one definition), and `useAdminListing` uses it.
  - `readForStaff` takes the query client and writes `setQueryData(adminListingKey(id), detail)` with the detail it already read.
  - The route drops line 80 and its import.
  - The crumb (`admin-detail-crumbs.tsx:28`, `cacheOnly`) then reads the wizard's answer.
- Tests that read the second read:
  - `admin-detail-crumbs.test.tsx`, which is unchanged because it seeds the cache.
  - e2e `admin-listings.spec.ts` AL-21 :1469, which checks the crumb on the listing page, not the Edit page.
  - `breadcrumbs.spec.ts` :142-151, which covers member edit only.
  - `use-admin-listing.test.ts` is lane 7a's and is not touched. A new unit test `use-edit-draft.test.ts` EDR-1 proves one door call and a filled crumb key.

### INC-1273 WebKit size list
- Reading from `src/components/select-list.tsx` and `src/components/shell/filter-panel-body.tsx`:
  - Rows share one `openSelect` state (filter-panel-body :18, 41-42). The trigger opens on `onClick` (select-list :171-175).
  - The wrapper `onBlur` (:193-200) already keeps the list open on a null-target blur, from bundle 8's change.
  - Remaining cause (unconfirmed):
    - On macOS WebKit a pressed button does not take focus, so focus stays in the colour list's search input.
    - On pointer-down on Size, focus leaves that input. The colour body's `useEffect` scroll (`select-list-body.tsx:119-126`) and the panel body's layout can move the Size row between mousedown and mouseup.
    - When mousedown and mouseup land on different elements, WebKit fires no click. That fits "click ok in 52 ms, list never opens".
    - A second candidate is the rows' `onClickCapture` (:28-32) when the click lands on the panel gap after the shift.
  - The confirming evidence is a WebKit 26 trace from the operator's Mac (pointer and focus events, and the Size box before and after mousedown). Linux CI WebKit passes, so it cannot confirm.
- Fix at the primitive, not the page:
  - SelectList opens on the trigger's own `pointerdown` for primary mouse and pen, where focus does not follow press, and records the press so the following `click` does not toggle it shut.
  - Touch and keyboard keep `click` and keys as now.
  - The open list's scroll-into-view effect runs only for the list that just opened, never on blur.
  - Unit test `select-list.test.tsx` SLW-1 reproduces the WebKit order: focus in another list's search, a null-target blur, pointerdown on Size, no click. Size's list must be open.
  - DLG-E12 is unchanged and proves it in CI's webkit lane. The operator's Mac run is the real proof.
- Open point: if the supervisor prefers to confirm with the trace before the fix, the fix waits.

## 2. Codes and words (D31, D39, D50, D55)

Doors: `begin_impersonation` manifest :160; migration `20261114070700…sql`. `end_impersonation` manifest :167; newest `20261114070900…sql`.

| Door / code | Raised at | Words |
|---|---|---|
| begin `impersonateSelf` | :66 | NEW `impersonation.error.self`: "You can't view as yourself." (admin) |
| begin `impersonateSuperAdmin` | :67 | NEW `impersonation.error.superAdmin`: "A super admin can't be viewed as." (admin) |
| begin `unknownUser` | :69 | reuse `admin.users.error.unknownUser` (base): "This account is no longer on record." |
| begin `badLength:reason` | :73 | reuse `impersonation.reasonTooShort` (admin): "Give a reason of at least 5 characters." |
| begin `sessionActive` | :77 | NEW `impersonation.error.sessionActive`: "A view-as session is already active. End it first." (admin) |
| begin `rateLimited` (dial `impersonation`) | gate | timed `admin.error.rateLimitedWhen` (existing tail) |
| end `noActiveSession` | :163 | reuse `impersonation.noneActive` (base) |
| end other | - | NEW `impersonation.error.endFailed`: "The session could not be ended." (base, because the shell bar draws it on every page) |
| link `unknownCategory` | M1:52 | reuse `admin.categories.error.unknownCategory` (admin): "This category is no longer on record." |
| link/update `badAllowedOption` | M1:67, M2:91 | NEW `admin.attributes.error.badAllowedOption`: "An allowed choice is not one of this attribute's options." (admin) |
| link/update `badDefault` | M1:68, M2:92 | NEW `admin.attributes.error.badDefault`: "The default is not a value this attribute accepts." (admin) |
| link/update `badVisibleWhen` | M1:69, M2:93 | NEW `admin.attributes.error.badVisibleWhen`: "The show-when condition names an attribute or value this category doesn't have." (admin) |
| link `priceBasisDuplicate` | M1:80 | NEW `admin.attributes.error.priceBasisDuplicate`: "This category already has a price basis attribute." (admin) |
| update `badClearCell` | M2:65 | NEW `admin.attributes.error.badClearCell`: "That setting can't be cleared here." (admin) |
| export `badScope` | route :69-72 | NEW `admin.attributes.export.badScope`: "The export's filter is not valid. Clear it and try again." (admin) |

Gate codes (`notSignedIn`, `accountDeactivated`, `permissionDenied`, step-up) keep going to the shell, as every family does.

Eight new keys, English only. Layers are as CF-SL-1 names them. The Amharic comes from the supervisor.

## 3. Tests that change, and census lines that leave

- New:
  - IMR-1..3 (`impersonation-refusals.test.ts`)
  - IMV-U1..U3 (`impersonation-view.test.tsx`, new): end error, list states, profile Retry
  - IMB-U1 (banner end error)
  - AUD-U2 (rows notice and Retry), AUD-U3 (facets notice)
  - ARF-5 (the six new link codes and the fallback `noSuchCode`)
  - ATP-U1..U4 (secondary reads: failed is not empty)
  - AEX-U1 (export codes)
  - EDR-1
  - SLW-1
- Changed:
  - IMPN-3: unchanged.
  - IMPN-4: "a failed call says so in the refusal key and offers Refresh page" becomes the door's words plus Retry calling `endNow`. A code with no words still shows `DOOR_REFUSED_KEY`.
  - ARF-1: the family list gains the six codes. ARF-3 keeps its generic case with `noSuchCode`.
  - AT-59 (e2e) cell error caption: the same test id, with the text now the family words. Its assertion is reviewed by the supervisor.
- Census lines that leave (`failure-notice.census.test.ts:93-109`):
  - audit-page
  - impersonation-view
  - attributes-page
  - category-attributes-dialog
  - attribute-dialogs
  - impersonation-notice
- They stay:
  - staff-factor-gate, settings, app-shell and auth (7b)
  - import-dialog (bundle 7)
  - step-photos, photo-editor, field-select, language-picker, translator-card, ai-bulk-bar, delete-language-dialog (out of this scope)
  - picture and dev.primitives (permanent)
- The line removal in `src/` is a test file, not `scripts/`.

## 4. Checks
- 10a ruling 1 decision 11 checks
- `bun run i18n:usage` with both maps regenerated
- `bunx vitest run src/components/shell scripts/conformance --maxWorkers=2`
- the touched folders' tests
- final write-back from `1094b3d1b` of `.lovable/**`, `package.json`, `bun.lock`, `src/integrations/supabase/**` and every path outside scope

No build or size run unless ruled.

## 5. First download
- `impersonation-notice.tsx` is on the shell's first paint. Its new words come through the on-demand service, and FailureNotice is already in the entry.
- The admin pages grow only inside their own chunks.
- Expected growth is under 1 KiB per admin page. Any ceiling change is the supervisor's text (DEC-390).

## 6. Files
- `src/features/admin/impersonation/`: impersonation-starter.tsx, impersonation-view.tsx, impersonation-banner.tsx, NEW impersonation-refusals.ts and its test, NEW impersonation-view.test.tsx
- `src/features/admin/impersonation/impersonation-banner.test.tsx` (new)
- `src/components/shell/impersonation-notice.tsx` and its test; `failure-notice.census.test.ts`
- `src/features/admin/audit/audit-page.tsx` and its test
- `src/features/admin-attributes/`: attributes-page.tsx, attribute-refusals.ts and its test, components/attribute-link-cells.tsx, category-attributes-dialog.tsx, NEW attributes-page.test.tsx
- `src/routes/admin.listings_.$listingId_.edit.tsx`; `src/features/admin-listings/use-admin-listing.ts` (key export only); `src/features/posting/use-edit-draft.ts` and its test
- `src/components/select-list.tsx` and its test
- `src/i18n/locales/en-admin.ts`, `en-base.ts`, `am-admin.ts`, `am-base.ts` (Amharic pasted from the ruling)
- both i18n maps

## 7. Findings
- `scripts/doors/manifest.txt:41-42`: the export doors list no codes, but the helper refuses `unknownCategory` (`supabase/migrations/20261120030200…sql:172`). Lane 7b's typed list would miss it.
- The D50 list in the brief names `factLimit`, `cardLimit`, `rankInherited`, `orderMismatch`, `unknownAttribute`, `unknownLink` and `alreadyLinked`. These already have words (`attribute-refusals.ts:25-35`). Only six of the thirteen are missing.
- `supabase/migrations/20261124203800…sql:102-117`: a nearby comment says a reader needs no second factor, but the body requires one. The comment is stale.
- `use-admin-listing.ts:300-306`: the detail key is written inline, and `listings-page`, the crumb and now the edit draft share it. That is why the plan exports `adminListingKey`.
- INC-1273: the root cause is unconfirmed without a macOS WebKit trace.
