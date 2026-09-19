# Layout primitives — design memo (2026-09-18)

Operator directive (walk 2026-09-18): pages fill wide screens, are organised, and look and work
excellently on every device; build primitives, not per-page fixes. References: Phoenix and Falcon
admin templates (fluid content area, page header with actions, responsive card grid, two-column
forms on desktop / single column on the phone, sticky action bar).

## 1. What the clone shows (the cause)

- `src/components/shell/page-card.tsx` exports ONE layout constant:
  `PAGE_MAIN_CLASS = "mx-auto w-full max-w-sm px-4 py-10"` — a 384 px column designed for the
  sign-in form — and 17 pages/features import it (Settings, the posting wizard, verification
  pages…). Two admin consoles hand-roll `max-w-6xl`; three pages hand-roll `max-w-md`.
- The shell's `<main>` is already fluid (`min-w-0 flex-1 px-3 py-4 md:px-4`) beside a 256 px
  sidebar (`w-64`, collapsible to `w-16`); nothing in the shell constrains width. The constraint is
  the page-level constant.
- There is no page header primitive, no grid primitive, no form layout, no split layout.

## 2. The primitive set (`src/components/layout/`)

All primitives: design tokens only (C3), logical properties (C5), 44 px targets (C2), no hover
dependence, translated strings only (D1). One component per file.

| Primitive | Purpose | Behaviour |
|---|---|---|
| `PageShell` | the content column | `width="narrow" \| "reading" \| "wide" \| "full"` → max 28rem / 48rem / 96rem / none, `mx-auto w-full`, gutters `px-4 md:px-6 xl:px-8`, vertical rhythm `py-4 md:py-6`. Default `wide`. |
| `PageHeader` | title row | title (h1), optional description, breadcrumb slot (existing `Breadcrumbs`), `actions` slot: inline at `md+`, rendered into a sticky bottom bar below `md` (primary actions near the thumb, C2). |
| `ContentGrid` | card grid | `grid gap-4 md:gap-6`, columns `1 → 2 (lg) → 3 (2xl)`, item `span={1\|2\|3}`; dashboards, Settings, Account overview. |
| `Section` | titled card | heading + optional description + body; `p-4 md:p-6`; replaces `PageCard` for content (PageCard stays for the auth family). |
| `FormLayout` | form rhythm | one column below `md`; `md+` a 2-column field grid where a field declares `span="full"` for long inputs; consistent `gap-4`; footer slot = the action bar (sticky below `md`). The posting field primitive (`src/features/posting/field.tsx`) renders inside unchanged. |
| `SplitLayout` | main + aside | `lg+`: main `minmax(0,1fr)` + aside `20rem` (`xl`: `24rem`), aside sticky; below `lg` the aside stacks under (or collapses into the header when `asideCollapsible`). Wizard, listing detail, admin editors. |
| `Toolbar` | list/console top bar | search + filters left, actions right; wraps at narrow widths; already the C8 console shape — extract, do not duplicate. |

Readable prose caps at `max-w-prose` inside `Section`, never at the page.

## 3. Page families and their layout

| Family | Shell | Layout |
|---|---|---|
| Auth (sign-in, verify, reset) | `PageShell width="narrow"` | unchanged look; `PAGE_MAIN_CLASS` retired in favour of the primitive |
| Settings | `wide` + `PageHeader` | `ContentGrid`: account · sign-in methods · two-factor · security · email; 1 col phone, 2 col `lg`, 3 col `2xl` |
| Account overview (new, `/account`) | `wide` + `PageHeader` | `ContentGrid`: profile card (alias, seller type, member since, home country, Edit) · My listings at a glance (counts by status from the owner read, links) · Saved (count, link) · Notifications (recent, link) · Quick actions (Post a listing, Settings). Account panel `homePath` → `/account`. |
| Posting wizard | `SplitLayout` | main = the step (`FormLayout`, `reading`-width column inside), aside (`lg+`) = the step rail with completion ticks + the chosen-category chip + a live mini-preview (card) from step 4 on; on the phone the rail is the existing progress header |
| My Listings (E1, later) | `full` | `Toolbar` + `DataTable` (C7) |
| Admin consoles | `full` | `Toolbar` + `DataTable`; the two `max-w-6xl` wrappers removed |
| Marketplace feed | `full` | unchanged this landing |
| Listing detail (U7) | `SplitLayout` | gallery + description main, price/contact aside |

## 4. Acceptance (operator walk + E2E)

- Walk at 360 / 768 / 1280 / 1920: no page narrower than its family width; no horizontal
  scroll; the action bar reachable with the thumb on the phone; wizard aside visible at 1280.
- `e2e/layout.spec.ts` LY-1..4: at desktop-1280 the main content of Settings, /account and /post
  is ≥ 60 % of the viewport width; at mobile-360 nothing overflows (`scrollWidth <= clientWidth`);
  the sticky action bar exists below `md` and not above.
- Bundle guards unchanged (primitives are CSS-class components, no dependency).

## 5. Out of scope here

Visual restyling of the marketplace feed and cards (U7), the listing detail page (U7), My Listings
(E1). Those adopt the primitives when they land.
