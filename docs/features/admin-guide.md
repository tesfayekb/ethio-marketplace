# The admin Guide (D313, turn P-1c)

> **LAW:** every admin block explains itself in its own place. One control on the
> block's toolbar opens one sheet of four fixed parts — _What this is · Each
> column · How to add, change or remove · What to do next_ — whose every text is
> a translation key under the block's prefix, in a strings layer no page downloads
> before the first open. A block without its Guide does not land (CF-GUIDE-1,
> T10).

## The mechanism

- **`src/components/shell/block-guide.tsx`** — `BlockGuide({ spec, title, columns })`:
  the control (`TableActionButton`, `BookOpen`, label `prim.guide.open`,
  `max-md:sr-only`, inside `SheetTrigger asChild` — the facade's trigger states
  `aria-haspopup="dialog"` / `aria-expanded` and the sheet's close hands the
  focus back to it; testid `<anchor>-guide`) and the `Sheet` (`side="end"`, testid `<anchor>-guide-sheet`,
  close `<anchor>-guide-close`, title = the table's caption). The sheet's body is
  on demand: `resilientLazy(() => import("./block-guide-sheet"), …, { inPlace: true })`
  under `Suspense`, inside `<StringsLayerGate layers={["guide"]}>` (the layer
  and the body download together on the first open; the gate sits in the
  control's chunk, so the on-demand body shares no module with the entry —
  measured: the other way split `useMatches`' module out of the entry, +1.5 KiB
  on every page); a failed download says so in place (`<anchor>-guide-failed`,
  INC-911). `BlockGuideSpec = { prefix, next: GuideNext, anchor? }`;
  `guideAnchor(spec)` = `anchor ?? prefix.replace(/\./g, "-")`. On close after a
  next-link the focus is handed to the landing frame (`onCloseAutoFocus`, by its
  id, `preventScroll`); on Escape it returns to the control (Radix).
- **`src/components/shell/block-guide-sheet.tsx`** — the four parts: `<h3>` `prim.guide.what` /
  `.columns` / `.how` / `.next`; the column lines as a `<dl>` (`<anchor>-guide-col-<key>`:
  `<dt>` the column's header, `<dd>` `<prefix>.guide.col.<key>`), for the
  columns the table SHOWS (a hidden column loses its line); one `Link`
  (`<anchor>-guide-next`) to `resolveGuideNext(spec.next, permissions)`.
- **`src/features/admin/guide-next.ts`** — `GuideNext = { section: AdminSectionId; block?: string }`
  resolved through `ADMIN_SECTIONS`: the section's path with the block as the
  hash; a section the caller's permissions do not hold → `/admin`
  (`allowed: false`). Only the sheet imports `sections.ts` by value: the control
  stays off the seller's My listings path.
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
`<prefix>.guide.what`, `.col.<columnKey>` for every column, `.how`, `.next`;
the shell's own four headings and the control are `prim.guide.*` (member layer);
the strip's words `prim.orderStrip.*` sit in the admin layer (CF-SL-1: only
admin pages show them).

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
  excepted) and the layer holds nothing no table claims ("unclaimed"). The
  allowlist's lines `file | guide owed in turn (b) | 2026-11-10` name the
  sixteen admin tables turn (b) guides.
- **T10** (`scripts/admin-tables.ts`, TBL-1/TBL-4/TBL-6): an admin block's
  DataTable carries `guide=`; a seller's table (My listings) is not asked; a
  table in CF-GUIDE-1's allowlist is not asked yet (`check(sources, guideOwed)`
  reads that ONE allowlist).
- `holds-its-box` (INC-940): `block-guide.tsx#BlockGuideSheet` is allowlisted —
  the sheet draws in a portal on the top layer; the page has no box of it.

## Turn (a) — Monetisation

The six guides (`en-guide.ts` / `am-guide.ts`, prefixes
`admin.monetisation.{markets,level,reach,levelOverrides,productPrices,caps}`),
the strip (`monetisation-order`, `monetisationSteps` in
`monetisation-order.ts`: Markets → Products → Prices → Posting caps) and the
regroup by product (`docs/features/plans.md` §The console). The Monetisation
page keeps one h1; its blocks and inner tables pass `level="h2"`.

## Tests

`e2e/admin-guides.spec.ts` (area `admin-guides`; also in the shell area) —
AG-1 every section draws; in a guided section every table's toolbar holds one
Guide and its frame; Monetisation's four, six once a level is open · AG-2 the
four parts; the column lines are the shown columns in order; a hidden column
loses its line · AG-3 the next link closes the sheet and lands on the named
block (hash, in view, focused) · AG-4 Escape returns the focus to the control ·
AG-5 the Amharic texts · AG-7 the guide layer and the sheet's code are fetched
on the first open, never before, and once. AG-6 (a cross-section next without
the permission → `/admin`) is turn (b)'s, with AG-1 widened to every section.
Unit: `block-guide.test.tsx` BG-1…5, `order-strip.test.tsx` OS-1…3,
`guide-next.test.ts` GN-1…2, `monetisation-order.test.ts` MNO-1…4,
`monetisation-page.test.tsx` MNP-1, `strings-layer-gate.test.tsx` SLG-5.

## Related

- `docs/features/plans.md` — Monetisation's console, strip and guides.
- `docs/features/display-primitives.md` — the agreed table (T1–T10).
- `docs/features/admin-shell.md` — the sections and their permissions.
