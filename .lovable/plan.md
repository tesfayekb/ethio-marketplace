# Lovable — Errors page (DEC-474 Part F screen) — plan

Tree check: HEAD `32f68bb96` (merge of #117, Cursor bundle 8b); `src/features/admin-errors/errors-service.ts` exists. Nothing changed this turn except this plan file.

## Three decisions I need in the ruling (each blocks part of the build)

1. **Guide words are outside YOUR FILES.** `scripts/admin-tables.ts` T10 requires `guide={...}` on every DataTable file under `src/features/admin*`, and CF-GUIDE-1 (`scripts/conformance/admin-guides.ts`) reads `<prefix>.guide.what / .col.<key> / .how / .next` from the `guide` layer — `src/i18n/locales/en-guide.ts` and `am-guide.ts`. `e2e/admin-guides.spec.ts:132` walks every `ADMIN_SECTIONS` entry, so the new section is visited too. Either (a) add `en-guide.ts` / `am-guide.ts` to my files (I list the guide English below, you send the Amharic), or (b) you add two lines to `scripts/conformance/admin-guides-allowlist.txt` (one per file below) and the guide is owed. I recommend (a).
2. **"Load more" against DataTable's keyset.** The `keyset` prop (data-table.tsx:251) draws Previous / Next (`hasPrevious`, `hasNext`, `onPrevious`, `onNext`) and T6 accepts `keyset=` as the footer. It has no "Load more" form. I propose keyset pages of 50 with a cursor stack held in the hook (Next pushes `next`, Previous pops; Next is disabled when `next` is null). A real "Load more" would mean changing DataTable, which is not mine — say if you want that instead.
3. **The group key's shape.** `GROUP_KEY` (`/^[0-9a-f]{32}$/`) is not exported from `errors-service.ts`. `listErrorOccurrences` throws for a bad key before any rpc, but the route has to check before calling it. Either Cursor exports `isGroupKey` (or `GROUP_KEY`) from errors-service.ts, or I copy the regex into `src/features/admin-errors/group-key.ts` — a second copy of the same check, which is a K1 bypass. I recommend the export. Until it lands, the copy can carry a note naming it.

Other findings (not blockers):
- `ChartFrame` already exists (`src/components/shell/chart-frame.tsx`; Audit's sparkline uses it). As ruled, I add no chart; a day-bar chart could reuse it later.
- `listErrorOccurrences` names its cursor `after` but sends `p_before_*` (newest first). The screen only passes `next` back, so this changes nothing on screen.
- Not screen-only: nothing. No new door, route call or permission. `errors:view` is already in `door-permissions.generated.ts:37-39`.

## Files

New:
- `src/routes/admin.errors.tsx` — Audit's form (pageHead with `admin.section.errors.title`, noindex), with `validateSearch` for `days` (1|7|30|90, fallback 7) and `kind` (an ERROR_KINDS value or absent) so the window and kind live in the URL (url-search-state). Renders `<AdminErrorsPage/>`.
- `src/routes/admin.errors_.$group.tsx` — a separate page, not a child (trailing underscore). It checks the key's shape before rendering; a bad key draws the not-found state and mounts no reader. The `days`/`kind` search params are carried back on its Back link.
- `src/features/admin-errors/use-errors.ts` — React Query hooks: `useErrorStats(days)`, `useErrorGroups(days, kind)`, `useErrorOccurrences(group)` (cursor stack). Keys include their arguments.
- `src/features/admin-errors/errors-page.tsx` — toolbar, the counts per day, the three top lists and the groups.
- `src/features/admin-errors/error-reports-page.tsx` — one group's reports.
- `src/features/admin-errors/error-labels.ts` — kind → key map, and an `unknown` fallback for null values.
- Tests: `errors-page.test.tsx`, `error-reports-page.test.tsx`, `use-errors.test.ts`.
- `src/routeTree.gen.ts` — generated.

Changed: `src/features/admin/sections.ts` (the `errors` entry right after `audit`, no group); `en-admin.ts` / `am-admin.ts` (by your script); and, if decision 1 is (a), `en-guide.ts` / `am-guide.ts`.
Tests that enumerate sections: `sections.test.ts` (ANM-1 only — unaffected); `breadcrumbs.test.tsx`, `rail-first-paint.test.tsx` and the nav tests read the register, and I adapt any that pin a count. The whole suite at build names each one.

## Layout

The frame test id is `admin-section-errors` (the spec's default in `admin-guides.spec.ts:61`, so `OWN_FRAMES` needs no change).

```text
360 (cards)               768 (cards <lg / table)       1280 (tables)
[TableActions: Errors]    [heading ............ ]       [heading ..................]
[Window▾][Kind▾][Cols]    [Window▾][Kind▾][Cols]        [Window▾][Kind▾][Columns]
 caption (empty/more)      caption                       caption
Counts per day (cards)    Counts per day (table)        Counts | Top pages
Top pages (cards)         Top pages | Top browsers      Top browsers | App versions
Top browsers (cards)      App versions                  Groups (full width)
App versions (cards)      Groups (cards until lg)
Groups (cards)
```
- The four stats tables sit in one column at 360 and 768 and in a two-column grid at 1280 (`lg:grid-cols-2`). The groups table is always full width.
- On the reports page, Back (Link) and the group's title (kind · code, `CutText` shape) come first, then the reports table with the keyset footer.
- Toolbar: the window and kind are two `Select`s as direct children of `TableToolbar` (C8), with no labels above them; the accessible names come from the keys below. Filters are exempt from Field (K6).

## Tables (priority: primary / secondary / detail; sizes from the shared set)

Counts per day (`errors-days`): Day (primary, date, card title), then one column per kind present (secondary, short, `formatLocale` number), then Total (primary, short). Below `md`, a card shows the day as its title and the total, kinds in the card body.
Top pages (`errors-pages`): Page (primary, text, CutText, plain text, card title), Count (primary, short).
Top browsers (`errors-browsers`): Browser (primary, name, card title; "name version", or `admin.errors.unknown` for a null), Count (primary, short).
App versions (`errors-versions`): Version (primary, name, card title; unknown for a null), Count (primary, short).
Groups (`errors-groups`, `cardUntil="lg"`): Kind (primary, short), Message (primary, text, CutText, card title), Code (secondary, short; unknown for a null), Place (detail, text, CutText; unknown for a null), Count (primary, short), First seen (detail, date), Last seen (secondary, date). Dates go through formatLocale. A row opens `/admin/errors/$group` (rowHref plus an Open item `key: "open"` per T9). Below lg, a card shows message, kind and count, with last seen in the body.
Reports (`errors-reports`, keyset, 50 rows, `cardUntil="lg"`): When (primary, date, card title), Message (primary, text, CutText), Page (secondary, text, CutText, plain text), Browser (secondary, name: browser + version, unknown), Device (detail, short, unknown), Language (detail, short, unknown), Signed in (detail, short: Yes/No words), App version (detail, name, unknown).
Every value that came from a browser is a text node. No dangerouslySetInnerHTML, no `<a>`/Link around a path.
The groups table uses `DataTablePagination` + `useKeptPage` (T6); the reports table uses `keyset`. Each file has `TableActions` (T1), `TableToolbar` (T2), `ColumnsButton` + `useHiddenColumns` (T3), a `card: "title"` column (T7) and `guide=` (T10). `ColumnsButton` sits on the groups and reports tables. The stats tables are fixed and compact, and the census is per file, so they are covered by the page file's single set.

States (each read on its own): loading is the DataTable's loading slot. An empty table shows a caption beside the controls. A failed read is a `FailureNotice` in the table's error slot, with the subject naming that read, a Retry (refetch) and `errorsRefusalKey(error)`'s words for a refusal. A failure in one read leaves the others drawn.

## Keys (admin layer, English only; you send the Amharic)

admin.section.errors.title — Errors
admin.section.errors.body — Where the product fails: counts by day and kind, the top pages, browsers and versions, and each group of like failures with its reports.
admin.errors.window.label — Time window
admin.errors.window.1 — Last day
admin.errors.window.7 — Last 7 days
admin.errors.window.30 — Last 30 days
admin.errors.window.90 — Last 90 days
admin.errors.kind.label — Error kind
admin.errors.kind.all — All kinds
admin.errors.kind.notice — Failed request
admin.errors.kind.crash — Page crash
admin.errors.kind.unhandled — Unhandled error
admin.errors.kind.route — Page load failure
admin.errors.kind.upstream — Outside service failure
admin.errors.kind.render — Display error
admin.errors.days.title — Errors per day
admin.errors.pages.title — Top pages
admin.errors.browsers.title — Top browsers
admin.errors.versions.title — App versions
admin.errors.groups.title — Error groups
admin.errors.reports.title — Reports
admin.errors.col.day — Day
admin.errors.col.total — Total
admin.errors.col.page — Page
admin.errors.col.browser — Browser
admin.errors.col.version — Version
admin.errors.col.count — Count
admin.errors.col.kind — Kind
admin.errors.col.code — Code
admin.errors.col.message — Message
admin.errors.col.place — Place
admin.errors.col.firstSeen — First seen
admin.errors.col.lastSeen — Last seen
admin.errors.col.when — When
admin.errors.col.device — Device
admin.errors.col.language — Language
admin.errors.col.signedIn — Signed in
admin.errors.col.appVersion — App version
admin.errors.unknown — Unknown
admin.errors.yes — Yes
admin.errors.no — No
admin.errors.empty — No errors in this window.
admin.errors.groups.more — Only the most frequent groups are shown. Narrow the window to see more.
admin.errors.reports.empty — No reports in this group.
admin.errors.group.notFound — This error group was not found.
admin.errors.back — Back to errors
admin.errors.read.stats — the error counts
admin.errors.read.groups — the error groups
admin.errors.read.reports — the group's reports

Device values (`DEVICES`) reuse their existing words if a key exists (I will check before build). Otherwise three more keys, `admin.errors.device.<value>`, which I will list in the build report before writing any — no literal text in the meantime.
Guide (only under decision 1a; guide layer): `admin.errors.guide.what`, `.how`, `.next` and `.col.<key>` for each visible column, and the same under `admin.errors.reports.guide.*`. You approve the English in the ruling, and I send the full list as a block at the start of the build.

## Tests (component; ids free: 0 `it(`/`test(` hits for ERP-, ERR- in src, e2e, scripts — re-checked at build)

ERP-1 each read's loading state draws, per table
ERP-2 each read's empty state draws its caption
ERP-3 one read failing draws its FailureNotice while the other tables stay drawn
ERP-4 a refusal (permissionDenied) draws `failure.noAccess`'s words
ERP-5 the window choice calls readErrorStats(30) and listErrorGroups({days:30,kind:null}); the kind choice calls listErrorGroups({days:7,kind:"crash"}); default 7/null
ERP-6 a null browser, version or app version draws Unknown
ERP-7 `more: true` draws the narrow-the-window caption
ERP-8 a group row opens /admin/errors/<group>
ERR-1 the reports page reads page 1 (after null, limit 50), Next reads with `next`, and Next is disabled when `next` is null
ERR-2 a bad group key draws not-found and makes no read
ERR-3 a message and path holding `<img onerror>` markup are drawn as text (no element created)
ERR-4 the reports read's loading, empty and failed states
SEC-ER-1 (sections test) the `errors` entry sits right after `audit`, with `errors:view` and no group

## Lists and censuses the new route or section joins

- `scripts/route-budgets.mjs` — the ceiling lines for `/admin/errors` and `/admin/errors/$group`: yours, measured.
- `scripts/admin-tables.ts` / `scripts/admin-tables.test.ts` — met by construction (above). No `SECTIONS` line is needed, since each file has its own TableActions.
- `scripts/conformance/admin-guides*.ts` / allowlist — decision 1.
- `e2e/helpers/crawl-pages.ts` (FCR list, e.g. next to `FCR-65 /admin/audit`) and `scripts/conformance/failure-crawl-allowlist.txt` — Cursor: add both routes as staff pages.
- `scripts/conformance/signed-in-routes.test.ts`, `routes.test.ts` — no change expected, because admin routes sit under the /admin layout gate. Confirmed at build by running them.
- i18n usage maps — not committed (bundle 8b), so I do not run them.

Browser tests (Cursor's):
- `e2e/admin-guides.spec.ts:132` (iterates sections) and `e2e/one-line-slots-admin.spec.ts:23` (all section paths) will visit /admin/errors. They need no edit if the guide and frame id hold.
- `e2e/admin-shell.spec.ts:86` derives sections from permissions. With admin holding `errors:view`, full-staff fixtures gain the section and the moderator A-7 (`:193-199`) does not. Check that the fixtures that grant a full list grant `errors:view`.
- A new `e2e/admin-errors.spec.ts` should cover: an admin sees the page with its four stats tables and groups at 360/768/1280; window and kind change the address and the rows; a group opens its reports page, Next pages and Back returns with the filters kept; a bad key shows not-found; a staff member without `errors:view` is refused the section; a planted report with markup in message and path is drawn as text with no link; nothing overflows at 360.

## At build

Typecheck; eslint and prettier on every touched file; `bunx vitest run src`; the locale guards, the forms guard, `scripts/admin-tables.test.ts` and `scripts/conformance/admin-guides.test.ts`; the words written by script and proven byte-equal. Last, the write-back from `32f68bb96` of package.json, bun.lock, src/integrations/supabase/** and .lovable/**. I will name every check the sandbox cannot run.
