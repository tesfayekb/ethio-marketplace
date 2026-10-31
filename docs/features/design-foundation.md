# Feature: design foundation — the ethio.com house style

The first substantial frontend build. Every later page inherits from it.

## Palette — "coffee on cool slate"

> Superseded by the Sage 3D look (DEC-289; turn SAGE-S1, ruling C of SAGE-S0): the values
> below are the pre-Sage palette, kept for history. The tokens in force are in `src/styles.css`
> and `src/lib/themes.ts` — see "Themes as data" and "The shell in the Sage look".

Tokens live in `src/styles.css` in the existing `@theme inline` / `:root` /
`.dark` structure. All values are `oklch`.

| Token                        | Light (hex → oklch)                    | Dark (hex → oklch)                     |
| ---------------------------- | -------------------------------------- | -------------------------------------- |
| `--background`               | `#F3F5F8` → `oklch(0.969 0.005 258.3)` | `#14181C` → `oklch(0.207 0.010 248.3)` |
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
| foreground / background       | 14.48:1 | 14.53:1 |
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

### House style tokens (bundle 9, 2026-10-08)

| Token                           | Light                       | Dark                        | Meaning                              |
| ------------------------------- | --------------------------- | --------------------------- | ------------------------------------ |
| `--border`                      | #D3D8DF                     | #343B43                     | lines of cards, tables, bars         |
| `--input`                       | #C3C9D1                     | #3F4750                     | edge of a field or an outline button |
| `--rule`                        | #E4E8ED                     | #262C32                     | fine line between two rows           |
| `--muted-foreground`            | #4A515A                     | #A3ABB3                     | secondary text                       |
| `--destructive`                 | #B42318                     | #FF6467                     | danger: delete, remove, a refusal    |
| `--destructive-foreground`      | #FFFFFF                     | #1F0A08                     | text on a solid danger fill          |
| `--destructive-soft` / `-line`  | #FDECEA / #F3C1BC           | #3A1C1A / #5E2B27           | tinted danger surface / edge         |
| `--success` / `-soft` / `-line` | #17503A / #E3F1EA / #B9DCCB | #7FC9A6 / #1C2B24 / #2E4A3C | done, active, approved               |
| `--warning` / `-soft` / `-line` | #7A4E00 / #FFF3D6 / #EDD49A | #E6B655 / #2D2513 / #4F4020 | paused, needs attention              |
| `--info` / `-soft` / `-line`    | #1D4E89 / #E6F0FB / #BBD3EF | #8DB8EA / #17253A / #2A4366 | information, a link-like action      |
| `--neutral` / `-soft`           | #3B424A / #EEF1F4           | #C5CBD1 / #262C32           | draft, off, nothing to say           |

- **Three tokens per meaning:** the strong colour (text, icon, solid fill), `-soft` (a tinted surface), `-line` (a tinted edge). Badge variants `success`, `warning`, `info`, `danger`, `neutral` use them.
- **Corners:** 6 px (`--radius`) for controls, cards and tables (`rounded-md`, `rounded-lg`); 4 px for small marks (`rounded-sm`); 8 px for the large surfaces (`rounded-xl`).
- **Shadows:** soft (`shadow-card`, `shadow-sm`, `shadow-xs`, bare `shadow`) on cards, tables and figures; `shadow-button` on a primary or danger button; `shadow-md` on menus, `shadow-lg` on dialogs and sheets; `shadow-bar` / `shadow-bar-up` are for the frame in a later part. Shadows are black or the foreground at an alpha — the one exception to oklch-only.
- **Secondary text is `text-muted-foreground`.**
- Contrast of every pair is recomputed from the file by `src/styles.tokens.test.ts`; the fixture page is `/dev/style` (`e2e/house-style.spec.ts`).

## Typography

The device's own fonts (DEC-262, Foundations turn 33): no page downloads a font.

- `--font-sans`, the device's stack (CF-FT-2 pins it):

  ```css
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial,
  "Noto Sans Ethiopic", Kefa, Nyala, Ebrima, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
  "Noto Color Emoji"
  ```

- `--font-display`: `var(--font-sans)` (headings and the logo wordmark keep their
  weight classes)

**Ge'ez fallback rule:** browsers resolve a font stack _per glyph_, so Latin
renders in the platform's UI face (San Francisco on Apple devices, Segoe UI on
Windows, Roboto on Android) and every Ge'ez codepoint falls through to the
platform's Ethiopic face (Noto Sans Ethiopic on Android and Linux, Kefa on Apple
devices, Nyala or Ebrima on Windows) — no locale-conditional class is needed, and
mixed Amharic/Latin strings render correctly. `system-ui` is left out on purpose:
on Windows it follows the system's locale font. The shell smoke spec asserts a
rendered `U+1200–U+137F` heading after the language toggle.

Nothing names a web-font host, declares `@font-face` or ships a font file, and a
family is set only through the two tokens (`scripts/conformance/fonts.test.ts`,
CF-FT-1…3; `e2e/fonts.spec.ts`, FTE-1). A brand face, if one is ever chosen, is
an ADR: one self-hosted, subset, non-blocking file and one token change.

## Performance stance

- **Flat surfaces only.** No background images, no gradients anywhere.
- Listing photos will be `loading="lazy"` with explicit dimensions when the
  EXIF-strip pass surfaces them; today every card renders a placeholder.
- The brand mark and the spinner are inline SVG + CSS — zero image requests.
- `prefers-reduced-motion` turns the spinner's rotation into a gentle pulse.

## Dark mode

Class-based (`@custom-variant dark (&:is(.dark *))`). Every token has a dark
value; components use semantic tokens only, never raw colours.

## Themes as data (turn SAGE-S0, DEC-289, D250)

- The Sage 3D light set and the Sage dark set (spec §13) live in `src/styles.css` `:root` and
  `.dark`: the new surfaces (`--hairline`, `--field`, `--track`, `--photo-empty`, `--leaf-ink`),
  the tier set (`--tier-premium-*`, `--tier-featured-*`), the D260 band set (`--band`,
  `--band-edge`, `--band-label`, `--shadow-subband`, `--shadow-groove`), R1's green-tinted
  `--lift-*` shadows (black in dark), and the radii (controls 12 px; cards 12 / 14 / 20 px at
  3 / 4 / 5 a row). No component reads the new tokens until its part (S1–S6).
- `src/lib/themes.ts` holds the same values as data (`THEMES.sage.light` / `.dark`), validated by
  the strict shape in `src/lib/schemas/theme.ts`; `themes.test.ts` holds them equal both ways.
- `src/lib/theme-resolver.ts` picks the theme and mode: shop → account → device → system. An
  unknown, removed or malformed value falls through; a failed account read keeps the device's.
- The pre-paint script stores `{name, mode}` under `ethio.theme` (a legacy bare `light` /
  `dark` reads as sage) and writes `data-theme`, `data-mode` and `.dark` before the paint.
- CF-LOOK-1 (`scripts/conformance/look-values.test.ts`) refuses arbitrary look values and raw
  colours under `src/`, with recorded exceptions in `look-values-allowlist.txt`.
- `/dev/style` shows theme × mode × card type (regular, Featured, Premium) with fixture data.
- Ruling A (turn SAGE-S1): the light page tone `--background` is the Sage #EEF3EF; the
  removed-photo backdrop stays #F3F5F8 in `photo-background.ts` (D155), no longer tied to the
  page tone (PBG-1).

## The shell in the Sage look (turn SAGE-S1, spec §1–§3, §10, §11)

- New tokens (light / dark): `--nav-ink` (selected row and bar label text), `--logo-gold`,
  `--nav-pill` (the bar's current pill), `--lift-pill`, `--lift-disc` (its ring takes `--card`),
  and `--bar-rise` (layout: the Post disc's rise, 0 from 48rem).
- One tile: `ITEM_TILE` / `ITEM_TILE_ON` in `menu-row.ts` for every menu icon (rail, strip,
  phone menu, side panels, Home, back); CF-ROWS-1 refuses a menu without it. The selected row
  is the card surface with `--lift-row-on` and the nav ink; its tile is filled.
- One control look in the top bar (`CONTROL_LOOK`): card, hairline, `--lift-control`; 44 px on
  phones. The search field is the pill on `--field`.
- The phone bar: 18 px top corners, the current pill, the Post disc raised by `--bar-rise`.
  Every surface pinned above the bar (the FormSection / FormLayout / PageHeader action bars, the
  shell's notices) and the page's bottom scroll padding clear the rise; SGS-7 judges.
- One "chosen" lift: the chosen filter pill takes `shadow-tile-on`.

## One Sage band look and the location track (turn SAGE-S2, D260, spec §4)

- `band-row.ts` owns `BAND_LOOK`: every panel tabs row, panel header, breadcrumb and
  location row takes `bg-band text-band-label shadow-groove`; the containing sub-band
  takes `bg-band band-drop` (the theme’s `--lift-subband`). `BAND_ROW` still sets 40 px, unchanged (D258).
- CF-BAND-1 (`scripts/conformance/shell-bands.test.ts`) retains its height cases and
  adds the look census: a band's own surface, border or shadow, a missing shared look,
  and a second look source are refused, including planted bypasses.
- The panel header's label takes the shared heading style; its switch control is unchanged.
  Location captions keep their words at 12 px on phones and 13 px otherwise.
- One pressed-in track (`--track`, `--lift-track`, `--radius-track`) holds the decorative
  map pin and all picker segments. It is 34 px with 3 px padding; each segment is 28 px,
  with `--radius-segment`, 5 / 10 px horizontal padding, 12 / 13 px text, weight 500 and
  a 13 px muted chevron. Only the deepest chosen segment is raised on `--card` with
  `--lift-segment`, `--nav-ink` and semibold. `CutText` and `useLabelRoom` retain the
  one-line name priority. Dropdowns, PlaceNotice and read-state captions are unchanged.
- `ActionMessage` clears the phone bar through `--bar-rise`, not its own offset.
- D261: adjacent rows meet at zero gap, with only their groove at each boundary. One
  location visibility observer transfers the last-row drop from location to the sticky
  sub-band after location scrolls beneath it; row positions and sticky behavior stay.
- Panel tabs and the phone bar read `CURRENT_PILL` from `band-row.ts`: `--nav-pill`,
  `--lift-pill`, `--nav-ink`. The obsolete `--nav-active` token is retired.
- INC-1023: the track and its pickers retain their intrinsic minimum name width so
  `useLabelRoom` detects pressure and hides the caption before sacrificing name heads.
- SGB-1…5 check the four bands, track geometry and the deepest scratch chain at 360 px
  in English and Amharic, both modes. The exact Tailwind empty-shadow-layer probe lives
  in `e2e/helpers/shadows.ts`, shared with SGS. BND-E1…4 remain unchanged.

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

Same skeleton at every breakpoint. Below `md` the persistent rail becomes a
48px icon strip. Its top-bar control widens that strip in place to 256px, showing
the same rows with their names on one line; there is no logo block or panel switcher.
A tap outside, the close control or Escape shrinks it back. The current item stays
highlighted in both forms, while tapping a strip icon navigates directly. Mobile-first at 360px; all controls ≥ 44px;
logical properties only (`ps-*`, `pe-*`, `me-*`, `text-start`).

## Motif rule

See `docs/features/panels.md`. In short: religiously neutral tibeb geometry
only, and it appears in exactly two places — logo, spinner (the feed empty state was retired by D215).

## Verified posture (2026-08-04)

Mobile (360 primary, 768, 1280): no horizontal overflow on `/` or the feed at any
of the three widths; every visible button and link ≥ 44px; no text under 11px; the
rail is a drawer below `md` and persistent above; the feed grid reflows 1→2→3→4
without clipping. All five are `shell.spec` assertions, not claims.

Performance: no web font since DEC-262 (Foundations turn 33) — the two render-blocking
font stylesheets and about 87 KB of Latin fonts (281 KB with the Ethiopic weights on
an Amharic ad page, turn 23's lab) left every page.
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
- `--gold` / `--gold-foreground` are new, dedicated tokens with exactly **three**
  sanctioned placements: the dot inside the logo mark, the Featured badge on a
  listing card, and the invite card on the listings pages (DEC-169, the
  operator's choice of 2026-10-09; two until then). Nothing else may consume them.

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
(`md:h-full`); it FILLS grid row 1 (3.5rem), so its top and bottom edges are the
logo cell's by construction — one clean aligned top band, asserted numerically
in `shell.spec`. On phones there is no grid row to fill and the bar is its own
compact 3.25rem, fixed while the page scrolls.

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

What it measures (INC-556, DEC-176, bundle 11 turn C8): the build emits no HTML,
so the guard used to count the chunks whose file name starts with client, entry,
index, main or styles — 231.0 KiB at turn C8's base, while the entry chunk's
static import closure was 309.6 KiB, and the figure moved by 57 KiB whenever the
bundler named a shared chunk "client-…". JS is now the entry chunk's static
import closure (`scripts/bundle-closure.mjs`: every chunk reached through
`import … from "./x.js"` and `import "./x.js"`; a dynamic `import("./x.js")` is
left out; BC-1..BC-4 in `scripts/bundle-closure.test.ts`); CSS keeps the name
rule. The ceiling stays 320 KiB: the operator kept it on 2026-10-12 (D144, G52).

## The vertical stack (final layout refinement, 2026-08-04)

The shell renders five bands, top to bottom, inside the preserved corner-block
grid (logo cell = rail width × top-bar height, one continuous sidebar hairline):

```text
1. TOP BAR       wordmark · search · language · theme · account/sign-in
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
  controls — a real search FIELD with its placeholder text, three quarters of the band's free space up to 42rem, centred and proportional to the screen (bundle 21 turn 9), the language control
  reading the language NAME ("English"), and a labelled account control /
  "Sign in" button. No bare icon a non-technical user has to decode. Verified to
  fit with zero horizontal overflow at exactly 768px.
- **Below `md`** (phones only): a 48px icon strip shares the collapsed rail’s
  rows and widens in place to a 256px named menu from the top bar. The 52px bar, strip and
  tabs/breadcrumb band stay while the page scrolls; search opens a row over the page below the bar, from the strip's edge to the screen's edge, as the page (bundle 21 turn 9). Only this size minimizes the bar.
  `PHONE_STRIP=false` restores the header menu button and removes the strip offset.
  A phone never widens the page (bundle 21 turns 10/12, INC-743): the shell's wrapper clips horizontal overflow (html hidden, body clip — turn 12; Safari's handling of a root clip is not assumed), person- and catalogue-written text breaks inside its box (wrap-anywhere on the ad and the listing card), and the breadcrumb stays one line, cutting its last crumb. The trail's nav is min-w-0, so its last crumb truncates (INC-745). The footer's "Buy and sell" is centred under the wordmark from 768 px (bundle 21 turn 13). Below 768 px every text field is at least 16 px — one unlayered rule in styles.css, so iPhone Safari never zooms into a field (INC-747, bundle 21 turn 14).

- **Top bar** is minimal and evenly distributed at 360px, full at `md`+. On
  phones search is an icon that opens a row below the bar beside the strip (room for
  long queries) rather than a cramped in-bar field. The panel dropdown is gone.
- **Panel tabs** (`shell/panel-tabs.tsx`) use the locked green for emphasis
  (underline + text). Mobile users switch panels through the bottom bar; the
  opened menu shows only the active panel's rows.
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
- Exactly ONE sidebar affordance per breakpoint: strip menu below `md`, collapse
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

### Top bar alignment (INC-059)

The right-hand cluster (language, theme, account/sign-in) carries `md:ms-auto` so it sits
flush against the bar's right edge at md+; the search field stays left of centre with its
per-breakpoint width cap.

## The size rule (bundle 9, Part B)

A control a finger may press is 44 px on its short side, 36 px with a mouse: `size-11 md:pointer-fine:size-9` (square) or `h-11 md:pointer-fine:h-9` (field, text button); below md always 44 px.

## The phone bottom bar (bundle 9, Part C2b)

Below `md` (768 px) a fixed bottom bar (`bottom-bar`) holds the most-used destinations — at most five, Post emphasised in a filled circle, nothing appearing twice on a phone. Signed in: Home · My listings · Post · Account. Signed out: Home · Post · Sign in. An admin sees the same four and reaches Admin through the drawer's panel switcher. The bar renders nothing while the session is read. The posting wizard ("/post" and "/post/…") has no exception (C2e; INC-499's first fix withdrawn by the operator): it keeps the strip and the bottom bar like every page, and its Back/Next bar sits just above the bottom bar (`inset-block-end: var(--bottom-bar)`; static from `md`), the bottom bar carrying the safe area. The panel tabs and top-bar Sign in link show from `md` only; the signed-in account picture and its menu show at the top right at every width, with Sign out last in that menu.

### Bundle 9 C2c — reviewed phone frame

Below 768px one top-bar menu control sits above the 48px strip and toggles the drawer. The strip holds only its section items: Home, Post and Sign out are not duplicated there. Rows share the available height at 28–44px; scrolling is permitted when the actual category census cannot fit at the 28px minimum (operator ruling). Admin appears after Account in the bottom bar for admins. The account menu remains at the top right at every width and owns Sign out. The footer paints behind both bars and its content starts beside the strip with balanced 16px content padding (operator ruling). Location controls share one 32px line with full selected names exposed accessibly. Every password field has an inline-end eye toggle and retains its input/form contract. The category step's two "Used before" choices also stay on one line; long names truncate visually while their full names remain accessible.

Bundle 21 turn 17 (INC-755): below 768px the rail's lists (strip and drawer) fill when their rows fit and scroll when they do not — the compact branches size by flex, never by h-full/min-h-0 — so a row is never shorter than 32px and rows never overlap; RL-1 proves it on the Admin and Account panels.

### Three widths, one frame rule each (bundle 9 C2g/C2h)

Bundle 21: one ☰ per width in the top-left corner (D115, D117), the logo after it over the menu’s labels; folded, the logo with its mark moves into the bar. Search is centred (D111); tables switch on the space they have (`tbl-md`). D204 supersedes the historical width rules below: from 768 the rail is open by default (224 px to 1023, 256 px from 1024), or 64 px when folded; only phones use the overlay.

- Below 768 px: the strip, the bottom bar and the » / « in-place menu.
- 768–1023 px: the icon rail (64 px, tooltips), the same » / « menu (the rail's content with names, no foot band), the tabs at the top.
- From 1024 px: the rail with its stored choice and the collapse toggle.
- The frame is chosen by width alone (`rail-icons` custom variant, width media queries); the width walk in e2e/phone-frame.spec.ts is the guard.
- Selected look: `--nav-active` (primary at 15 % light / 22 % dark) — the bottom bar's pill (`bottom-bar-pill`) and the same tint on the current row of every menu.

## Cut names

D104: `CutText` is one inline grid holding three overlapping cells: one visible element with the whole name (so the accessible name and textContent stay whole and are read once) that ellipsizes when cut, and two unpainted, `aria-hidden` size-setters whose CSS-generated content sets the column's smallest width (the first five graphemes and "…"; shorter names stay whole) and widest width (the whole name, breakable anywhere). D105: `useLabelRoom` measures only the row after layout; when names need the room, a row's optional parts step aside in order — first its visible caption (`sr-only`), then its arrows (`hidden`, the location row's `[data-row-arrow]`) — and return when space comes back; the admin/dev census is deferred to Part D's shared table/card blocks.

## Focus ring

Action-control rings show after keyboard input only; `installInputModality` records the last capture-phase pointer or keyboard input as `html[data-input]`, installed after hydration and removed at cleanup. No marker is written before input; text inputs, textareas and native selects are excluded from the pointer-only rule because their ring marks the typing location, and focus restoration itself is unchanged.

## The agreed look (bundle 11 V2; D132)

The operator chose the boards' look for every page (2026-10-11): the page tone **cool grey** (`--background` `#F3F5F8`, was `#F6F7F9`; foreground on it 14.48:1, muted text 7.35:1), the depth **Soft**, pills for every badge. Soft depth is four tokens: `shadow-card` (a hairline and a short soft drop: `0 1px 2px` at 6 % and `0 3px 10px` at 7 %) on cards and the table's card; `shadow-tile` (a hairline and a bottom edge) on every white tile — an outline button, a toolbar icon, the pager's arrows; `shadow-button` (a firmer bottom edge and a drop) on a filled button; `shadow-sheet` (an upward drop) on a bottom sheet. An outline button and a native select are white (`bg-card`), so they read as tiles on the grey page. A badge is a pill (`rounded-full`); `TipBadge`'s tones are drawn soft — a live state green (`success`), a stopping state red (`danger`), a classification grey (`neutral`) — with `data-tone` unchanged. The table blocks are in docs/features/display-primitives.md ("The agreed tables").

## Look B — soft surfaces (bundle 21, D135)

The phone footer hides its brand block below 768 and follows one 28-px row rhythm, with compact padding (the operator, 2026-10-18 14:38 local). Footer items keep their 44-px targets.

Cards take `CARD_SURFACE` (`rounded-card`, 12-px corners; `bg-card`; `shadow-card`), never a 1-px border. State borders (destructive, gold, focus rings and dashed placeholders) go on top. The `--lift-*` shadows are defined in `:root` and `.dark`; dark mode keeps a faint ring to separate surfaces.

The top band and place row lift by shadow; the breadcrumb and panel-tab rows part by the faint `--neutral-soft` line. Panel tabs are pills sized to their labels and shrink to fit. The rail and phone strip use a side shadow. The bottom bar has 16-px top corners and the short Post label (D97). The footer spans the page with its brand block and three equal link columns (D116), without How it works. The look law in `src/look-law.test.ts` guards the card class across all non-primitive surfaces.

## Open lists of choices (D264, turn F)

Every list of choices that opens from a control (the language, account, location and panel menus, the row actions, the currency and phone-code pickers) takes its rows and panel from `menu-row.ts`: rows are 44 px to tap on a phone or any coarse pointer and 40 px with a 10 px radius from md on a fine pointer, one line each; the current radio row takes the nav pill from its checked state (`data-[state=checked]`), heard through `aria-checked`, with its tick in the nav ink; picker options keep `aria-selected`; the panel opens against its control's edge, at least as wide, with a fade and a 2 px slide and never a zoom, on the popover surface (14 px radius, 6 px padding, the menu shadow whose first layer is its ring). The control shows its open state with `OPEN_CONTROL`. Native selects keep the device's own list (CF-LIST-1 allowlist, until Sage S6).

Turn F3: the searchable picker owns horizontal placement and width: logical start first, logical end when start crosses the 16 px viewport gutter, at least the anchor width and at most the available viewport room. Its placement hook applies `OPEN_CONTROL` to its control; row actions read the same constant. No consumer sets a picker panel’s width or side (CF-LIST-1, CL-7).

## Dark cards: the D262 choice (turn B1, DEC-314)

The operator's note (D262): a dark card barely differed from the page (#1A221E on #121815, 1.11 : 1;
its #26302B ring 1.32 : 1). Three candidate sets sit on /dev/style ("Dark cards: pick one"), each a
`.dark [data-card-candidate]` block in styles.css setting `--card`, the two tier fills, the
`--lift-card` edge ring (and `--shadow-card`, re-resolved inside the box). `.dark` carries **B**
until the operator picks; the pick lands as a one-line token change (B2). The no-photo well is
#303C35 in every candidate. e2e/dark-cards.spec.ts measures each in the page (DCC-1: surface
≥ 1.25, plain-card edge ≥ 1.8, text ≥ 4.5) and proves the live dark card equals B (DCC-2).

| Set | Card    | Edge    | Premium | Featured | surface / edge / text (in-page) |
| --- | ------- | ------- | ------- | -------- | ------------------------------- |
| A   | #232E28 | #3A4740 | #33291A | #1F3329  | 1.28 / 1.85 / 11.58             |
| B   | #25302A | #3E4B44 | #382D1C | #22362C  | 1.32 / 1.97 / 11.26             |
| C   | #28342E | #42504A | #3A2F1D | #243A2F  | 1.39 / 2.12 / 10.67             |

## An open list stays in sight (D267, turns F4a and F4a-2)

`src/lib/visible-area.ts` is the one reader of the visible area: the bottom edge of the `data-chrome="top"` markers (the bands) and the top edge of the `data-chrome="bottom"` markers (the phone bottom bar, the form's action bar), else `scroll-padding-top`; 8 px margin. The searchable picker places its list with `placeList`: down when it fits; when the room below is short and the page can scroll, it scrolls the control up first and opens down after the scroll ends (instant under reduced motion); the larger side only when the page cannot scroll. Its height is bounded by `--picker-max-height`; the rows scroll in `LIST_SCROLLER`, never a consumer's own height (CL-10). Once placed, the panel carries `data-settled="true"` (F4b): a test measures an open picker list only after that mark. The facade's menus and the popover read `collisionPaddingNow()` on open. CF-AREA-1 judges.

## A list's parts (D268, turn F4b)

Beyond its rows and panel, every list's parts come from menu-row.ts: `LIST_LABEL` (a non-interactive header row on the row's padding, muted ink, semibold `text-sm`, cut by CutText), `LIST_SEPARATOR` (the one hairline rule) and `LIST_ICON` (`size-4 shrink-0` in the row's own ink, spaced by the row's gap only). The facade's `DropdownMenuLabel` and `DropdownMenuSeparator` read them, and `DropdownMenuIcon` (a slot) applies `LIST_ICON` to the consumer's glyph. CF-LIST-1 rules 8 and 9 refuse a label's or separator's own class and a row icon's own size, margin or colour. The S6 dialog parts reuse these constants.

## Sage S3 (turn B2)

- Dark card C live (#28342E card, #42504A edge, #3A2F1D / #243A2F tier fills).
- Feed heading 21/25/30 px, 800, -0.9 px, place in primary, one line via ONE_LINE_SLOT.
- Card body 13/14/14 px (compact 8/9 tablet, 6/7 phone); price 16/13/12 bold; Negotiable pill success-soft + success ink, 11 px semibold; place line divider (rule) with 9/6 px top, leaf ink (Featured: its own ink, D269); empty well photo-empty with a bottom rule.

## The press (turn C1, D263/D270, DEC-317)

- A press is the raised look, never a darkening: src/lib/press.ts marks `data-pressed` at pointerdown or Enter/Space and clears it on release, cancel, keyup, scroll, a 10 px move, or focus leaving the pressed element. Disabled elements are never marked.
- PRESSED (menu-row.ts): row → card + lift-row-on + nav ink; list → nav pill + nav ink; segment/tab → card + lift-segment + nav ink; button and top-bar control → lift-row-on; card → lift-row-on on the card; a plain link → the nav pill behind its text (styles.css base layer).
- On at once, off within 120 ms; no transition under reduced motion; only shadow, fill and ink change.
