# Bundle 8 — plan (base `4af9f0dc8`, branch `lovable/next`; nothing changed)

HEAD = `4af9f0dc88c2fb48ca9ef9c924377eb718a85cb7`, and the diff to the base is empty. My sandbox cannot run a browser against a built page in a way that gives evidence, so the browser reds on the base are the supervisor's.

## (a) Files I touch, with their tests
| File | Tests |
|---|---|
| `src/components/shell/data-table.tsx` (DataTablePagination) | `data-table-pagination.test.tsx`, `data-table.test.tsx` |
| `src/features/admin-listings/listings-page.tsx` | `listings-page.test.tsx` |
| `src/features/admin-screening/screening-page.tsx` | its page test (`screening-page.test.tsx`, or a new one if none) |
| `src/features/admin/translations/strings-page.tsx` (passes `countState` to AiBulkBar) | `strings-page.test.tsx` |
| `src/features/admin/users/users-list.tsx`, `src/features/admin/audit/audit-page.tsx`, `src/features/my-listings/my-listings-page.tsx`, `src/features/admin/translations/data-scope.tsx` (pagination `total` gets `undefined` when the read has not answered) | each one's own test |
| `src/components/shell/toolbar-panel.tsx` (side read at open) | new `toolbar-panel-side.test.tsx` |
| `src/components/select-list.tsx` (blur path) | `select-list.test.tsx`, `filter-panel-body.test.tsx` |
| `e2e/dialogs.spec.ts` | only the lines the ruling names (DLG-E12 mid-window case) |
| `docs/features/display-primitives.md` | the pagination's unknown state, the panel side rule, the blur rule |
| `docs/generated/i18n-usage.json`, `public/i18n-usage.json` | regenerated only if a file is added |

Impersonation (`impersonation-view.tsx:233`) is Tier A. I list it below and touch it only if the ruling says so.

## (b) Part A census: every number drawn from a read (src/features and src/routes)
| File:line | Read | Loading | Failed | Disabled / not started | Verdict |
|---|---|---|---|---|---|
| admin-listings/listings-page.tsx:246 → :682 `resultCount={total}`, :748 `total={total}` | useAdminListings (`paging.ready && filtersReady`) | "Show 0 results", "0–0 of 0" | same | same (the query waits on `filtersReady`) | **BYPASSES** |
| admin-screening/screening-page.tsx:770 `total={data?.total ?? 0}` | useScreening | "0 of 0" if the pager is drawn | the pager is hidden on error (Bundle 6) | 0 | **BYPASSES** (pager) |
| admin/impersonation/impersonation-view.tsx:233 `totalCount ?? 0` | listings | 0 | hidden on error | 0 while `!paging.ready` | **BYPASSES** (Tier A, ruling decides) |
| admin/translations/strings-page.tsx:385–387 `<AiBulkBar untranslated={counts.untranslated ?? 0}>` with no `countState` (default `"success"`) | langStats | the bar believes 0 | the bar believes 0 | 0 | **BYPASSES** (the gap in ai-bulk-bar is its caller) |
| admin/translations/ai-bulk-bar.tsx:187–195 | filteredCount / caller | `pending` | `error` | `pending` (`data === undefined`) | uses (correct once the caller passes a state) |
| admin/translations/data-scope.tsx:207–211 | langStats | `countState` passed | passed | passed | uses |
| admin/users/user-detail.tsx:383–422 (activity) | activity | loading line | error line | n/a (always enabled on the page) | uses (confirmed) |
| admin-listings/listing-page.tsx:616–622 (reports) | useListingReports(listingId, mayReview) | null | failed | **cannot happen**: the card draws only when `mayReview` is true, and that is the query's `enabled`. `listingId` comes from the route param and is always set. | uses (confirmed; see (j)) |
| users-list.tsx:148/273/297 | users | resultCount `undefined`; pager `total=0` | pager hidden; resultCount `undefined` | — | Filters uses; **pager bypasses while loading** |
| audit-page.tsx:165/350/408 | audit list | resultCount `undefined`; pager 0 | hidden | — | Filters uses; **pager bypasses while loading** |
| strings-page.tsx:277/453/522 | list | same shape | | | Filters uses; **pager bypasses while loading** |
| data-scope.tsx:177 + its pager | list | same shape | | | Filters uses; **pager bypasses while loading** |
| my-listings-page.tsx:785/845 `counts[group]` | my listings | resultCount `undefined`; pager counts 0 | | | Filters uses; **pager bypasses while loading** |
| strings-page.tsx:308–319 coverage line; :158–164 choice counts; data-scope.tsx:119–123 | langStats / dataStats | fixed in Bundle 6 through `counted-label` and the coverage gate | | | uses. I re-read each one at the build, and any `?? 0` I find drawn without a gate is named in the build answer. |
| countries / locations / categories / ai-page / markets / products / product-prices / level-overrides / languages `total={rows.length}` and similar | client lists already loaded | the table is in its loading state, and `rows.length` counts what was read | error | — | uses (a local count of rows that answered; DataTable owns its error) |
| dev.style.tsx:1334, dev.primitives.tsx:461 | constants | — | — | — | not a read |
| translator-card.tsx:107, legal gate, posting | not a drawn number, or gated by `isLoading`/`isError` | | | | not in scope |

## (c) Pagination's unknown state, at the primitive
- The one form is `total: number | undefined`. When it is `undefined`, the range text is not drawn (no "of N"), the page buttons and the page-number picker are not drawn, and Prev/Next are disabled. The page-size choice stays (it is not a number from the read). `totalLabel` only matters when there is a total.
- Callers:
  - Pass `undefined` until the read answers: listings (`query.isSuccess ? total : undefined`), screening, users-list, audit, strings, data-scope and my-listings, each on its own read's `isSuccess`.
  - Unchanged, because they count rows that already answered: countries, locations, categories, ai-page, markets, products, product-prices, level-overrides and languages.
  - Impersonation only by ruling.
  - Boards keep their numbers.
- Listings' Filters button: `resultCount={query.isSuccess ? total : undefined}`.
- Strings' AiBulkBar: passes `countState` from langStats (`pending` / `error` / `success`), the way data-scope already does.

## (d) Part B: the panel's room
- Callers: `PopoverContent variant="panel"` has exactly one caller, `toolbar-panel.tsx:108`. ToolbarPanel has exactly two callers, `filter-chips.tsx:82` (FiltersButton, used by every table's Filters) and `columns-button.tsx:55`.
- The cause: the panel's `max-h` equals the available height on its side, so it always "fits" below and Radix never flips it.
- The one rule, in ToolbarPanel, read once at open (like the padding at D267):
  - Measure the room below and above the button inside `visibleArea()`.
  - `side` is `"bottom"` when the room below holds the panel's floor, `min(28rem, room above)`, or when the room below is at least the room above. Otherwise it is `"top"`.
  - The `max-h` stays the available height on the chosen side.
- Why this rule: it is deterministic and read once. A pure CSS floor would push the panel out of the window when neither side holds the floor, and that breaks `panelInsideWindow`.
- DLG-E12 additions (lines named in the ruling): after the tall-window case, close the panel and scroll the Filters button to the middle of the 900-px window (`scrollIntoView({block:"center"})` + `settled`). Then reopen the panel, open Colour, and repeat the same `listFacts` match and the same "six choices" assertion with the label `@ ${width} x 900 mid-window`.
- The red on the base is the supervisor's, in its own clone. It should be 2–3 choices, as in run 45187492568.

## (e) Part C: one press on another row
- The path:
  - `filter-panel-body.tsx:28–32` closes on the landed click (capture).
  - `select-list.tsx:171–175`: the trigger toggles on click.
  - `select-list.tsx:193–201` (`onBlur`): a controlled list closes when focus leaves the rows **and `relatedTarget` is null counts as leaving**.
- Finding: the hypothesis holds, by a more precise route.
  - On macOS WebKit, pressing a button does not focus it. So pointer-down on the Size row blurs the focused element in the Colour list with `relatedTarget === null`.
  - The `onBlur` then closes Colour **on pointer-down**, and the Size row moves up before pointer-up, so the click does not land on Size.
  - Linux WebKit (CI) and Chromium focus the button. There `relatedTarget` is the Size button, which is inside the rows, so nothing closes until the click. That is why CI passes and the Mac fails.
- The fix, at the list mechanism: a blur whose `relatedTarget` is null does not close. Only focus that moves to an element outside the rows closes the list (Tab out). A press outside the rows is already closed by the panel's landed-click capture, and a press outside the panel is closed by the panel itself.
- Unit test SL-U40, red first on the base:
  1. Render the panel body and open Colour.
  2. Fire `pointerdown`, then a `blur` with `relatedTarget: null` (the Mac WebKit order), and assert the Colour list is still in the document and the Size row has not moved (the list node is still present).
  3. Fire `click` on Size and assert the Size list is open and Colour is gone.
- A second test, FP-U56: Tab from the open list to an element outside the rows still closes it.

## (f) Exported types changed
- `DataTablePagination`'s props: `total: number` becomes `total: number | undefined` (the props are typed inline; if a named props type is exported, it is that type).
- Nothing else. ToolbarPanel's props, SelectListProps and FilterSelectProps are unchanged.

## (g) Laws
- Laws of the base that read what I change:
  - C7 ("never NaN/undefined drawn"; INC-130 `totalLabel`).
  - D267 (padding read at open).
  - Decision M (rows move only on the landed click).
  - DLG-E12.
  - F4 (no phantom state).
- The guard law for Cursor, LAW-NUM-1: no screen passes `?? 0` (or `?? []).length`) of a query's data to `resultCount`, `total` or a StatCard `value`. An unanswered read passes `undefined`, and DataTablePagination draws no range for `undefined`.
- Meanwhile it is held by PGN-U1/PGN-U2 and ALT-U1.

## (h) New test ids (each searched as an exact string in src, e2e and scripts: 0 hits)
| Id | What it checks |
|---|---|
| PGN-U1 | the pager with an unknown total draws no range |
| PGN-U2 | Prev/Next are disabled when the total is unknown |
| ALT-U1 | listings loading or failed: no "0" in Filters or the pager |
| SCRN-U1 | screening's pager while loading |
| TBP-U1 | the panel opens below when there is room |
| TBP-U2 | the panel opens above when the room below is short of its floor |
| TBP-U3 | the panel opens below when below ≥ above |
| SL-U40 | the Mac WebKit order |
| FP-U56 | Tab out of the rows still closes |
| IMPV-U1 | impersonation (only if ruled) |

DLG-E12 gains a case, and its id does not change.

## (i) First download
- Part A: a few bytes on the listings, screening, users, audit, strings, my-listings and data-scope pages, plus DataTable's chunk (on every table page).
- Part B: about 0.2 KB in ToolbarPanel. It rides the pages that draw a Filters or Columns button; the shell entry is not affected.
- Part C: a few bytes less in SelectList's on-demand chunk.
- If my local page-size check names `/admin/roles_/$roleId` in its NEAR band, I will report it.

## (j) Open points and possible errors in the task
1. The brief's ai-bulk-bar reading is right about the bar, but the gap is its Strings caller, which passes no `countState`.
2. listing-page reports: "disabled reads as none" cannot happen at the base, because `enabled === mayReview` gates the card itself. I propose no change.
3. Several pagers already hide on *failure* (Bundle 6), but they draw "0 of 0" while *loading*. The primitive form fixes both.
4. Part B's floor of 28rem is my proposal; the supervisor may prefer another value.
5. Whether macOS WebKit fires blur with a null `relatedTarget` was not observed in a browser here. It is inferred from the platform's focus convention, and the unit test simulates that order.
6. The Strings "orphaned" label from Bundle 6 (`{count}` can show 0 on a stats failure) is still open and outside this brief unless the ruling adds it.

## Build order (after the ruling)
- Turn 1: Part A + Part C, with their unit tests and folder runs.
- Turn 2: Part B, the ruled DLG-E12 lines and the doc, then the whole scripts suite.
- Then commit and stop.
- The last step, on the supervisor's script, writes back the platform paths, runs both empty proofs and commits.
