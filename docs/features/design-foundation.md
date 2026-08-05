# Feature: design foundation — the ethio.com house style

The first substantial frontend build. Every later page inherits from it.

## Palette — "coffee on cool slate"

Tokens live in `src/styles.css` in the existing `@theme inline` / `:root` /
`.dark` structure. All values are `oklch`.

| Token                        | Light (hex → oklch)                    | Dark (hex → oklch)                     |
| ---------------------------- | -------------------------------------- | -------------------------------------- |
| `--background`               | `#F6F7F9` → `oklch(0.976 0.003 264.5)` | `#14181C` → `oklch(0.207 0.010 248.3)` |
| `--card` / `--popover`       | `#FFFFFF` → `oklch(1 0 89.9)`          | `#1A1F24` → `oklch(0.236 0.012 248.3)` |
| `--foreground`               | `#1E2329` → `oklch(0.254 0.014 253.1)` | `#E6E8EB` → `oklch(0.930 0.005 258.3)` |
| `--muted-foreground`         | `#686F78` → `oklch(0.539 0.016 254.7)` | `#8A9299` → `oklch(0.656 0.014 244.4)` |
| `--primary`                  | `#1E5A43` → `oklch(0.422 0.073 164.4)` | `#7FC9A6` → `oklch(0.777 0.090 162.9)` |
| `--primary-foreground`       | `#FFFFFF` → `oklch(1 0 89.9)`          | `#0B1A13` → `oklch(0.202 0.025 162.8)` |
| `--accent`                   | `#C98A2B` → `oklch(0.681 0.130 72.5)`  | `#E0A94A` → `oklch(0.769 0.128 78.3)`  |
| `--accent-foreground`        | `#3D2A08` → `oklch(0.301 0.055 77.9)`  | `#221704` → `oklch(0.214 0.037 79.9)`  |
| `--secondary`                | `#EAEDF1` → `oklch(0.945 0.006 255.5)` | `#222930` → `oklch(0.277 0.016 248.4)` |
| `--muted`                    | `#F0F2F5` → `oklch(0.960 0.005 258.3)` | `#222930` → `oklch(0.277 0.016 248.4)` |
| `--border` / `--input`       | `#E8EBEF` → `oklch(0.939 0.006 255.5)` | `#262C32` → `oklch(0.290 0.014 248.3)` |
| `--ring`                     | primary green                          | lighter green                          |
| `--sidebar`                  | `#FFFFFF`                              | `#1A1F24`                              |
| `--sidebar-accent` (rail on) | `#EDF3EF` → `oklch(0.958 0.008 157.1)` | `#22302A` → `oklch(0.294 0.022 166.7)` |

### WCAG contrast (measured)

| Pair                          | Light   | Dark    |
| ----------------------------- | ------- | ------- |
| foreground / background       | 14.76:1 | 14.53:1 |
| muted-foreground / background | 4.74:1  | 5.65:1  |
| primary-foreground / primary  | 8.08:1  | 9.23:1  |
| accent-foreground / accent    | 4.67:1  | 8.34:1  |
| primary text on rail-active   | 7.18:1  | 7.09:1  |

**Deviation:** the brief's light `--muted-foreground` `#7A828C` measures 3.63:1
on `#F6F7F9` — below AA for normal text. Darkened to `#686F78` (4.74:1).

**Dark primary decision:** `#1E5A43` with white text scores 8.08:1 _on itself_
but only ~1.5:1 against the `#14181C` page, so a filled button would vanish.
Dark mode therefore uses the lighter leaf `#7FC9A6` with near-black text
(9.23:1 on itself, clearly separated from the page).

## Typography

- `--font-sans`: `Inter, "Noto Sans Ethiopic", system-ui, sans-serif`
- `--font-display`: `Bricolage Grotesque, "Noto Sans Ethiopic", system-ui, sans-serif`
  (headings + logo wordmark)

**Ge'ez fallback rule:** Inter carries no Ethiopic glyphs. Browsers resolve font
stacks _per glyph_, so Latin renders in Inter and every Ge'ez codepoint falls
through to Noto Sans Ethiopic automatically — no locale-conditional class is
needed, and mixed Amharic/Latin strings render correctly. The shell smoke spec
asserts a rendered `U+1200–U+137F` heading after the language toggle.

Fonts load as `<link rel="stylesheet">` in `src/routes/__root.tsx`'s `head()`
with `display=swap` (Lightning CSS cannot resolve a remote `@import` from
`src/styles.css`); Noto is requested with `subset=ethiopic`.

## Performance stance

- **Flat surfaces only.** No background images, no gradients anywhere.
- Listing photos will be `loading="lazy"` with explicit dimensions when the
  EXIF-strip pass surfaces them; today every card renders a placeholder.
- The brand mark and the spinner are inline SVG + CSS — zero image requests.
- `prefers-reduced-motion` turns the spinner's rotation into a gentle pulse.

## Dark mode

Class-based (`@custom-variant dark (&:is(.dark *))`). Every token has a dark
value; components use semantic tokens only, never raw colours.

## The AppShell slot model

`src/components/app-shell.tsx` is the ONE shell:

```text
+--------------------------------------------------+
| header  (logo | search | panels | lang | account) |
+---------+----------------------------------------+
| rail    | body (route outlet / panel placeholder) |
+---------+----------------------------------------+
| footer  (link columns, language, copyright)       |
+--------------------------------------------------+
```

Same skeleton at every breakpoint. Below `md` the rail is hidden and opens as a
drawer (`ui/sheet`, the same primitive `ui/sidebar` uses for its own mobile
mode) from the header hamburger. Mobile-first at 360px; all controls ≥ 44px;
logical properties only (`ps-*`, `pe-*`, `me-*`, `text-start`).

## Motif rule

See `docs/features/panels.md`. In short: religiously neutral tibeb geometry
only, and it appears in exactly three places — logo, spinner, feed empty state.

## Verified posture (2026-08-04)

Mobile (360 primary, 768, 1280): no horizontal overflow on `/` or the feed at any
of the three widths; every visible button and link ≥ 44px; no text under 11px; the
rail is a drawer below `md` and persistent above; the feed grid reflows 1→2→3→4
without clipping. All five are `shell.spec` assertions, not claims.

Performance: fonts are `display=swap`, Noto Sans Ethiopic subset to `ethiopic` and
Inter to `latin`, so neither pulls the other's glyphs and none blocks first paint.
Listing cards reserve a fixed `aspect-4/3` box, so the loading→empty/error
transition costs no layout shift; when the photo strip lands the image goes in that
box `loading="lazy"` with explicit dimensions. The marketplace module graph is 28
modules and contains no chart, map or 3D library — enforced by
`scripts/check-marketplace-imports.mjs` in CI. No background image, no gradient.

Security: the feed is strictly read-only — it filters `status = 'active'` on top of
the table's public-read RLS policy rather than in place of it, and no write call
exists in any feed or card module. The browser holds the publishable key only. The
search control is inert and builds no query. The admin panel is hidden by an
`isAdmin` flag that is UI convenience only; per law F3 its routes and data reads
must carry server-side RLS/RBAC when their bodies are built. Nothing admin-scoped is
fetched today.

## Layout revision (2026-08-04)

### Surface law: cool slate only

The palette census found the warm/cream leak was structural, not cosmetic: the
gold hue sat on `--accent`, and `--accent` is what shadcn hovers, dropdown
highlights, muted panels and sidebar selection all resolve to — so a token
intended for one badge tinted the whole interface warm.

The fix separates the two jobs:

- `--accent` / `--accent-foreground` are now **cool-slate neutral**, and every
  generic hover, highlight and inactive surface uses them.
- `--gold` / `--gold-foreground` are new, dedicated tokens with exactly **two**
  sanctioned placements: the dot inside the logo mark, and the Featured badge
  on a listing card. Nothing else may consume them.

Selection emphasis is GREEN (`--sidebar-accent`), never a cream tint. There are
no warm surfaces left in `src/styles.css`.

### The corner-block grid

Tablet and desktop (`md` and up) are one CSS grid, not nested flex rows:

```text
+----------------+-------------------------------------+
| logo cell      | top bar                             |  row 1 (fixed height)
+----------------+-------------------------------------+
| rail           | content (breadcrumbs + body)        |  row 2 (1fr)
+----------------+-------------------------------------+
| footer (spans both columns)                          |  row 3
+------------------------------------------------------+
```

The logo cell and the rail share column 1, so the sidebar edge is a single
continuous hairline and the logo block sits exactly above the rail — asserted
numerically in `shell.spec` (same x, same width, bar starts where the cell
ends). Below `md` the grid collapses to one column, the logo moves into the top
bar, and the rail becomes the drawer.

**Top-bar height rule:** the bar carries no height of its own from `md` up
(`md:h-full`); it FILLS grid row 1 (4rem), so its top and bottom edges are the
logo cell's by construction — one clean aligned top band, asserted numerically
in `shell.spec`. On phones there is no grid row to fill and the bar is its own
compact 3.5rem.

### Logo lockup FIT rule

"MARKETPLACE" renders exactly as wide as "ethio.com" above it, at any size. The
lockup is a flex column (both lines share the wider line's measured width) and
the sub-line is a flex row of individual letters with `justify-between`, so the
browser computes the tracking. There is no letter-spacing constant to drift.
Below `sm` the top bar shows the mark alone — 360px has no room for the
two-line lockup beside five controls.

### Minimal top bar

Every item is icon-sized or compact: search is an icon that expands into an
inline field (and collapses on blur or Escape), the language switcher renders
short codes with the full language name as its accessible name, and the theme
toggle and account control are icon buttons. Breadcrumbs deliberately live on
the content's top line, not in the bar. All controls keep the 44px floor.

### Dark mode

`src/providers/theme-provider.tsx` owns the mode; the toggle only calls it.
`THEME_INIT_SCRIPT` runs in `<head>` before the body paints, so `data-mode` and
the `.dark` class are already correct on the first frame — there is no flash of
the wrong theme, and the choice survives a reload (asserted in `shell.spec`).

### Nested rail submenus

One recursive `RailRow` renders every rail node at any depth: a node with
children becomes an expand/collapse submenu (`ui/collapsible`), a node without
children is a leaf row. Depth adds start-padding only, so the 44px target and
the 360px fit hold all the way down. Admin's former flat sections are now
parent items with `children`; a parent whose every child is permission-filtered
away disappears entirely rather than leaving an empty heading. Law F3 is
untouched — this shapes UI, it does not authorize anything.

Marketplace categories use the same renderer but stay one level deep until the
category-children read lands with its own feature.

### Bundle budget

`scripts/check-bundle-size.mjs` (CI job `bundle-budget`) measures the gzipped
first-paint JS and CSS and fails over a declared ceiling — currently 320 KiB JS
/ 40 KiB CSS, against a measured 149.8 KiB / 12.8 KiB. It complements the
weight guard: that one catches a banned library, this one catches a hundred
small additions doing the same damage. The ceiling is a ratchet — raising it is
a deliberate commit that says why.

## The vertical stack (final layout refinement, 2026-08-04)

The shell renders five bands, top to bottom, inside the preserved corner-block
grid (logo cell = rail width × top-bar height, one continuous sidebar hairline):

```text
1. TOP BAR       hamburger · wordmark · search · language · theme · account/sign-in
2. PANEL TABS    signed-in AND >1 panel only — absent entirely when logged out
3. LOCATION ROW  cascading country → region → city (→ sub-city when seeded)
4. BREADCRUMBS   Home › panel › category path — every segment clickable
5. BODY
```

Bands 2–4 live in the content column (right of the rail) on desktop and stack
full-width on mobile. **Spacing rule:** every band is a flat full-width strip
whose only separator is its own `border-b` hairline, so the gap above a band
equals the gap below it _by construction_ — there is no vertical padding to
drift out of symmetry, and a band that renders nothing collapses to zero.

### The `md` rule (768px) — phones minimize, nothing else does

ONE breakpoint governs both the sidebar collapse and the top-bar minimization:
`md` (768px). Tablets are NOT phones.

- **`md` and up** (tablets ~768px, desktops): persistent sidebar + FULL top-bar
  controls — a real search FIELD with its placeholder text, the language control
  reading the language NAME ("English"), and a labelled account control /
  "Sign in" button. No bare icon a non-technical user has to decode. Verified to
  fit with zero horizontal overflow at exactly 768px.
- **Below `md`** (phones only): the rail becomes the drawer, the bar minimizes to
  icons, and search opens the full-width row below the bar. This is the ONLY
  size that minimizes.

- **Top bar** is minimal and evenly distributed at 360px, full at `md`+. On
  phones search is an icon that opens a FULL-WIDTH row below the bar (room for
  long queries) rather than a cramped in-bar field. The panel dropdown is gone.
- **Panel tabs** (`shell/panel-tabs.tsx`) use the locked green for emphasis
  (underline + text). Mobile users switch panels in the drawer via
  `panel-switcher.tsx`'s list, which is now that file's only variant.
- **Language** is ONE affordance at every width, in two presentations: `EN ▾` on
  phones, `English ▾` (the language NAME) from `md` up. Its menu lists every
  language including the current one, ticked.
- **Location row** shows the resolved area EXACTLY ONCE. The area label carries
  the current selection; the cascade dropdown that holds that same node reads as
  its LEVEL name ("City") instead of repeating the city, so no name appears
  twice in the row. Filtering itself stays stubbed (location-scoping.md).
- **Breadcrumb root** is "Home", and Home IS the marketplace feed — there is no
  separate home page. Clicking it from any panel returns to the unfiltered
  Marketplace feed: it sets the active panel back to `marketplace` AND clears the
  category filter. The panel TAB stays labelled "Marketplace".
- **Logo**: the two-line lockup's sub-line gap is reduced to a hairline and the
  FIT rule (MARKETPLACE exactly as wide as ethio.com) still holds. The mobile
  bar uses the new `wordmark` variant (mark + "ethio.com"); `icon` stays
  reserved for the collapsed rail.
- **Spinner** is SELF-DRAWING: the diamond's outline sweeps and loops. Under
  `prefers-reduced-motion` it holds fully drawn and static — never a spin.
- **Footer**: an explicit `grid-cols-3` — exactly equal thirds, not `flex-1`
  guesses — centred as a group and centred within each column, with the row
  stack pulled together (`-my-1` per row, roughly half the previous height)
  while every link's own box stays a 44px tap target. © row centred below.
- **Rail rows** are visually tighter (row gap 0.5, tighter headings) while the
  44px tap target is untouched.

No new colour was introduced: cool slate + green, gold only on the logo dot and
the Featured badge. No background image, no gradient.

## Stabilization notes (2026-08-05)

- Expandable search positions with the real logical utilities `start-*` / `end-*`.
  `inset-inline-start-*` is not a Tailwind class and silently emitted nothing,
  which caused the 360px overflow recorded as INC-037.
- The signed-in identity renders in two places (top-bar trigger, account-menu
  label). The menu label carries `data-testid="account-menu-identity"` so tests
  assert one deterministic element.

## Layout polish round 2 (2026-08-05)

- Feed body is centred with EQUAL left/right gutters (INC-044); the empty-state
  card is centred inside it.
- The desktop wordmark follows the rail: corner cell when expanded, top bar
  (after the collapse toggle, before search) when collapsed (INC-045). Placement
  keys off `html[data-rail]`, so it never flashes and never renders twice.
- Exactly ONE sidebar affordance per breakpoint: hamburger below `md`, collapse
  toggle at `md`+ (INC-046).
- Footer link rows are tighter; anchors keep their 44px tap boxes (INC-047).

The bar search field is width-capped per breakpoint so it can never grow into the
language/theme/account cluster (768/1024/1280 all lay out clean, nothing clipped). When the
desktop rail is collapsed the top bar carries the two-line lockup WITHOUT the mark — the
corner cell already shows the icon — so the brand is present exactly once, in one form, in
every rail state. Footer links keep a 44px touch box under a visually tight row rhythm.

### Band 3 is conditional (2026-08-05)

The location row shares the body's `activePanel === "marketplace"` gate, so the
vertical stack collapses that band entirely on non-marketplace panels
(INC-052). Location filtering itself remains stubbed.

## Conflicting utility classes must go through cn() (INC-055)

Shared class constants (e.g. `ICON_BUTTON`) already set a display utility. Appending
another one as a raw template string leaves both in the class list and lets the CSS
cascade decide — which is how the rail-collapse toggle leaked onto phones. Compose such
class strings with `cn()`/twMerge so the last display utility deterministically wins.
