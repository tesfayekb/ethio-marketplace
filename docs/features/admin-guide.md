# The Guide (D313 turn P-1c (a) — the admin blocks; D315 turn P-1c (b) — the pages people use; turn P-1c (c) — the sixteen remaining admin blocks)

> **LAW:** every admin block, and every page a seller or a buyer uses, explains
> itself in its own place. One control opens one sheet of four fixed parts —
> _What this is · Each column_ (a table) or _Each part_ (a page) _· How · What
> to do next_ — whose every text is a translation key under the block's or the
> page's prefix, in a strings layer no page downloads before the first open. A
> block or a page route without its Guide does not land (CF-GUIDE-1, T10).

## The mechanism

- **`src/components/shell/guide-spec.ts`** — the contract both forms import and
  neither form imports the other (ruling 2 of turn (b): a DataTable page never
  carries the page form's chunk): `BlockGuideSpec = { prefix, next: GuideNext,
anchor?, partsPrefix? }`, `GuidePart = { key, label?, labelKey? }`,
  `GuideColumn`, `PartsKind = "columns" | "parts"`, `GuideOpenKey`
  (`"prim.guide.open"`, written as a literal in each form under `satisfies`, so
  the usage map attributes it), `guideAnchor(spec)` = `anchor ??
prefix.replace(/\./g, "-")`, `GuideIcon` (`BookOpen`).
- **`src/components/shell/block-guide.tsx`** — the TABLE form, `BlockGuide({ spec, title, columns })`:
  the control (`TableActionButton`, `GuideIcon`, label `prim.guide.open`,
  `max-md:sr-only`, inside `SheetTrigger asChild` — the facade's trigger states
  `aria-haspopup="dialog"` / `aria-expanded` and the sheet's close hands the
  focus back to it; testid `<anchor>-guide`) and the one sheet's content
  (`GuideSheetContent`, `partsKind="columns"`, title = the table's caption).
- **`src/components/shell/page-guide.tsx`** — the PAGE form, `PageGuide({ spec, title, parts, current?, className? })`:
  a `Button` (`variant="ghost" size="touch"`, `GuideIcon`, `prim.guide.open`,
  `aria-haspopup="dialog"` / `aria-expanded`, testid `<anchor>-guide`) and
  nothing else until the first tap; the tap fetches `guide-sheet.tsx` through
  `resilientLazy` (a failed download → the shell's one notice, INC-911), mounts
  `PageGuideSheet` (`partsKind="parts"`, `returnFocusTo={control}` — the sheet
  has no trigger, so its close hands the focus back to the button itself) and
  keeps it mounted shut, so a second open is instant. The page's control sits
  in the title row: `PageHeader`'s `guide` slot (My listings' listing page,
  Account, Settings, Saved, the seller page), the wizard's header row, the
  feed's heading row, the ad page's actions row (`listing-detail.tsx`'s `guide`
  slot, ink by tier), sign-in's heading row. A wizard passes
  `current={stepPartKey(current.nameKey)}` (`wizard-guide.ts`: `POST_GUIDE`,
  `EDIT_GUIDE` with `partsPrefix: "post"`, `WIZARD_GUIDE_PARTS` = the eight
  steps with `labelKey: "post.step.<key>"`); the admin's edit (`edit.actor ===
"admin"`) draws no guide.
- **`src/components/shell/guide-sheet.tsx`** — the ONE sheet: `GuideSheetContent`
  (`Sheet` `side="end"`, testid `<anchor>-guide-sheet`, close
  `<anchor>-guide-close`; the body on demand: `resilientLazy(() =>
import("./block-guide-sheet"), …, { inPlace: true })` under `Suspense`, inside
  `<StringsLayerGate layers={["guide"]}>` — the layer and the body download
  together on the first open; a failed download says so in place,
  `<anchor>-guide-failed`; on close after a next-link the focus is handed to
  the landing frame by its id, else to `returnFocusTo`, else Radix's trigger)
  and `PageGuideSheet` (the controlled, trigger-less `Sheet` the page form
  mounts).
- **`src/components/shell/block-guide-sheet.tsx`** — the four parts: `<h3>` `prim.guide.what` /
  `.columns` or `.parts` / `.how` / `.next`; the part lines for the columns the
  table SHOWS or the page's parts in reading order — named (every part carries
  `label` or `labelKey`) as a `<dl>` (`<anchor>-guide-<col|part>-<key>`: `<dt>`
  the term, `<dd>` `<prefix>.guide.<col|part>.<key>`, or
  `<partsPrefix>.guide.part.<key>`), unnamed as a `<ul>` of the lines; the
  current part `aria-current="step"` with a start border; one `Link`
  (`<anchor>-guide-next`) to `resolveGuideNext(spec.next, permissions)`, the
  permissions from `useAdminShellIfAny()` (`admin-context.tsx`: the one
  context read without throwing — `null` outside the admin shell).
- **`src/features/admin/guide-next.ts`** — `GuideNext = { section: AdminSectionId; block?: string } | { to: GuideRoute; hash? }`:
  a section resolved through `ADMIN_SECTIONS` (the section's path with the
  block as the hash; a section the caller's permissions do not hold → `/admin`,
  `allowed: false`), or a route of this site (`GuideRoute`: the router's
  static full paths, no `$` segment, no `/api/`), allowed for everyone. Only the
  sheet imports `sections.ts` by value: the control stays off every public
  path.
- **`DataTable` (`src/components/shell/data-table.tsx`)** — the one entry:
  `guide?: BlockGuideSpec`. The control joins the toolbar's end group
  (`TableToolbar`'s new `guide` slot, after Filters and Columns; cloned into the
  page's `TableToolbar`, or a toolbar of its own `data-table-guide-toolbar`
  when the page passed none). A guided frame carries `id={anchor}`,
  `tabIndex={-1}`, `scroll-mt-20`: the landing place of a next-link's hash.
- **`TableActions`** — `level?: "h1" | "h2"` (default `h1`): a block drawn
  under a page's own h1 passes `"h2"`, so a console keeps ONE h1 (MNP-1).
- **The order strip `src/components/shell/order-strip.tsx`** — `OrderStrip({ testid, steps })`:
  an `<ol aria-label={prim.orderStrip.label}>` of numbered `Link to="." hash`
  cards (`CARD_SURFACE`; testids `<testid>-<id>`, `-state`, `-detail`;
  `data-state="set" | "needsRow"`), each a `Badge` _Set_ / _Needs a row_ with an
  optional detail line. The states come from the page's own read, never a
  second one.

## The strings — the `guide` layer (DEC-258 grown)

`STRINGS_LAYERS = ["admin", "member", "guide"]` (`src/i18n/compiled-catalog.ts`;
`layerLoaders.guide` → `src/i18n/locales/en-guide.ts` / `am-guide.ts`, joined
into `en.ts` / `am.ts`). No route declares the layer: `StringsLayerGate`'s new
`layers` prop asks for it when the sheet first opens (`useStringsLayers`), so
no page's first download carries a guide text (AG-7); the gate reads the
route's declaration through `useRouterState`. The keys' grammar:
`<prefix>.guide.what`, `.col.<columnKey>` for every column (a table) or
`.part.<key>` for every part (a page), `.how`, `.next`; the shell's own
headings and the control's name are `prim.guide.*` — in the BASE layer since
turn (b), where CF-SL-1 places them once public pages draw the sheet (ruling
2 of turn (b); the plan's §2 note that put them in the guide layer is
superseded); the strip's words `prim.orderStrip.*` sit in the admin layer
(CF-SL-1: only admin pages show them). Turn (b)'s page keys: `myListings`
(six columns), `myListing`, `post` (eight part lines, shared by `post.edit`
through `partsPrefix`), `account`, `settings`, `saved`, `adPage`, `feed`,
`sellerPage`, `auth` — 84 keys EN + AM. Turn (c)'s block keys: the sixteen
prefixes below — 138 keys EN + AM (48 what/how/next + 90 column lines), the
Amharic copied byte for byte from the supervisor's vetted file.

**No braces in a guide text** (ruling 1 of turn (c)): a `{…}` is a template
slot everywhere else in the catalogue (the strings guards, `fill`, the
database's placeholder validator), so no guide value, English or Amharic, may
carry `{` or `}`; a column that names a slot says it in words. `am-script.test.ts`
("no guide value, English or Amharic, carries a brace") judges both files.

## Guards

- **CF-GUIDE-1** (`scripts/conformance/admin-guides.ts`, `.test.ts` CFG-1…3,
  `admin-guides-allowlist.txt`; named in `wired.test.ts`): over
  `src/features/admin*/**` (tests out), every `<DataTable` has `guide={{ prefix:
<literal | conditional of literals>, next: { section: <an ADMIN_SECTIONS id> } }}`
  ("no guide" / "shape"); the file's column keys — every object literal with a
  string-literal `key` and a `cell`, and the same in a relatively-imported
  module a `...spread` names (`attributionColumns`) — are literals ("key"); the
  guide layer holds `what`, `how`, `next` and `col.<key>` for each prefix
  ("missing"); no `.guide.` key sits outside the layer ("astray"; `prim.guide.*`
  excepted) and the layer holds nothing no table or page claims ("unclaimed").
  Turn (b) widened it over the ROUTES (`admin-guides-read.ts` reads the trees;
  CFG-4…7): every `src/routes/*.tsx` not in `ROUTES_WITHOUT_GUIDE` (admin,
  `dev.`, the auth callback and reset, the account's legal pages, the legal
  texts — each with its reason) reaches, through value imports
  (`reachableFrom`), exactly one `<PageGuide spec= parts=` or one `DataTable
guide=` ("no guide" / "two guides"); a page spec is `{ prefix: <literal>,
next: { to: <route> } | { section } }` (or a conditional of such constants —
  the wizard's `POST_GUIDE` / `EDIT_GUIDE`); its parts' keys are literals and
  the layer holds `what`, `how`, `next` and `part.<key>` (under `partsPrefix`
  when set). Since turn (c) the allowlist `admin-guides-allowlist.txt` is EMPTY
  (its header only): every admin table is guided, and CFG-3 asserts no
  allowance and the twenty-three guided prefixes by name. A new admin table
  lands with its guide or does not land.
- **T10** (`scripts/admin-tables.ts`, TBL-1/TBL-4/TBL-6): an admin block's
  DataTable carries `guide=`; a seller's table (My listings) is not asked; a
  table in CF-GUIDE-1's allowlist would not be asked (`check(sources,
guideOwed)` reads that ONE allowlist) — none is since turn (c); TBL-6 proves
  the refusal on a planted strip of one table's `guide=`.
- `holds-its-box` (INC-940): `guide-sheet.tsx#BlockGuideSheet` and
  `page-guide.tsx#PageGuideSheet` are allowlisted — the sheet draws in a portal
  on the top layer; the page has no box of it.
- `block-guide.test.tsx` BG-6/BG-7: the two forms share one accessible name,
  icon and dialog contract, and neither imports the other (`guide-spec.ts`).

## Turn (c) — the sixteen remaining admin blocks

Every admin table now carries the tile; the prefixes and the next each sheet
names, in the consoles' order: `admin.ai.features` (`ai-page.tsx`, → the AI
log on the same page, `admin-ai-log`), `admin.ai.log` (`ai-calls.tsx`, →
Audit), `admin.attributes` (→ Categories), `admin.categories` (→ Attributes),
`admin.countries` (→ Locations), `admin.listings` (→ Screening),
`admin.locations` (→ Countries), `admin.screening` (`screening-page.tsx`, → the
Name checks on the same page, `admin-screening-names`),
`admin.screening.names` (`name-checks.tsx`, → Users), `admin.audit` (→ Roles),
`impersonation.listings` (`impersonation-view.tsx`, → Users), `admin.roles` (→
Users), `admin.translations.data` (`data-scope.tsx`, → Translations),
`admin.translations.languages` (`languages-page.tsx`, → Legal),
`admin.translations.strings` (`strings-page.tsx`, → Translations),
`admin.users` (`users-list.tsx`, → Roles). A `GuideNext` carries a section and
a block, never a search parameter, so no next points at the Data scope. "Tier"
stays the Listings word. Weight (measured against base `484b6bb3f`, local):
each of the sixteen guided pages grows by its guide spec only — 0.0 KiB gz
measured on every one; the three whole-catalogue importers (roadmap line 7's
debt) carried the 138 new texts in their first download (`en-guide.js` +5.5 on
`/admin/listings_/$listingId` and `/admin/roles_/$roleId`; `en-guide.js` +5.5
and `am-guide.js` +7.0 on `/admin/translations`) until turn (d) folded the
imports onto `useI18n().has` and `shippedCatalogues()` (CF-LOC-1,
`docs/features/i18n-runtime.md`): measured against base `cfecc476f`, local,
`/admin/listings_/$listingId` −48.6 KiB, `/admin/roles_/$roleId` −48.6,
`/admin/translations` −123.0; no guide text rides any page's first download.

## Turn (b) — the pages people use (D315)

Thirteen routes draw the page form or the table's tile: `/` and `/c/$slug`
(the feed, `feed`), `/l/$slug` (`adPage`, next → `/post` in both sign-in
states), `/$name` (`sellerPage`), `/auth` (`auth`), `/account` (`account` →
`/settings`), `/settings` (`settings` → `/account`), `/account_/saved`
(`saved`), `/my-listings` (the table, `myListings` → `/post`),
`/my-listings_/$listingId` (`myListing`), `/post`, `/post_/$listingId` and
`/my-listings_/$listingId_/edit` (the wizards: `post`, `post.edit` → `/my-listings`,
the current step marked). Weight (measured against base `eb72f3bd`, local):
the +0.9 KiB artefact on every page (the sheet's strings gate referenced from a
route chunk splits `spinner` and `on-demand-notice` out of the entry); the page
form's pages +2.4…2.9 (the control's chunk, 1.5, is mostly the bundler's
preload list for the on-demand sheet — a bundler-wide setting, its own DEC;
`guide-spec.js` 0.2); the DataTable pages +1.9…2.0 (the one sheet now shared
by both forms split out of `data-table.js`); the three whole-catalogue
importers (`/admin/translations`, `/admin/roles_/$roleId`,
`/admin/listings_/$listingId`) +2.3 per guide catalogue (K2, the roadmap line;
folded in turn (d), §Turn (c)'s weight note). Every ceiling moved by DEC-296's
form with that cause on its line.

## Turn (a) — Monetisation

The six guides (`en-guide.ts` / `am-guide.ts`, prefixes
`admin.monetisation.{markets,level,reach,levelOverrides,productPrices,caps}`),
the strip (`monetisation-order`, `monetisationSteps` in
`monetisation-order.ts`: Markets → Products → Prices → Posting caps) and the
regroup by product (`docs/features/plans.md` §The console). The Monetisation
page keeps one h1; its blocks and inner tables pass `level="h2"`.

## Tests

`e2e/admin-guides.spec.ts` (area `guides` — one area for both forms, renamed from
`admin-guides` by ruling 3 of turn (b); also in the shell area) —
AG-1 every section draws; since turn (c) it asks EVERY section (no
`GUIDED_SECTIONS` list): a tableless section (Images, Legal) has no table
toolbar, every other section's every `data-table-toolbar` holds exactly one
Guide and its frame; Monetisation's four, six once a level is open · AG-2 the
four parts; the column lines are the shown columns in order; a hidden column
loses its line · AG-3 the next link closes the sheet and lands on the named
block (hash, in view, focused) · AG-4 Escape returns the focus to the control ·
AG-5 the Amharic texts · AG-6 (turn (c)) a next whose target section the
signed-in account may not open — a pooled user granted `moderator`
(`listings:view`, never Screening's permission) opens Listings' guide, whose
next names Screening — carries `/admin` as its href and lands on the admin
landing: no access notice, no alert, Listings in the section list, Screening
not · AG-7 the guide layer and the sheet's code are fetched on the first open,
never before, and once.
`e2e/user-guides.spec.ts` (turn (b); area `guides`) — UG-1 the ad page signed out: one
control in the actions row, the four parts in order, eight part lines, next to
Post · UG-2 the sheet's words are the catalogue's, nothing of the ad or of a
person in them · UG-3 My listings signed in: the tile in its toolbar, one line
per shown column, next to Post · UG-4 the posting wizard's first step: the
eight steps as the parts, each named by its step, Category marked current ·
UG-5 the Amharic texts · UG-6 Escape hands the focus back to the control; a
second open is at once · UG-7 the first paint carries nothing but the control ·
UG-8 / UG-9 every covered public (signed out) and member (signed in) route
draws exactly one Guide.
Unit: `block-guide.test.tsx` BG-1…7, `page-guide.test.tsx` PG-1…4,
`order-strip.test.tsx` OS-1…3, `guide-next.test.ts` GN-1…3,
`wizard-guide.test.ts` WG-1…2, `monetisation-order.test.ts` MNO-1…4,
`monetisation-page.test.tsx` MNP-1, `strings-layer-gate.test.tsx` SLG-5.

## Related

- `docs/features/plans.md` — Monetisation's console, strip and guides.
- `docs/features/display-primitives.md` — the agreed table (T1–T10).
- `docs/features/admin-shell.md` — the sections and their permissions.
