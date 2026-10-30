<!-- Imported 2026-10-30 (turn P1) from the operator's document "ethio.com — Sage 3D style change spec" (claude.ai artifact 3kHyj6fTx23weyMsY55TGz, revision 41), converted to Markdown; its author line names "the operator" in place of his name (the repository is public, G51), and no other word is changed. Approved: R1–R11 by DEC-289 (2026-10-29). Where later decisions differ, they govern: D247, D248 and D254 (menu row heights and the panel), D252 and D253 (the footer's place and insets), D258 (every band row 40 px), D259 ("Home" in the category list), D260 (one Sage look for the tabs bar, the breadcrumb and the location row), D250 (themes as data). The reference boards stay in the operator's canvas (artifact 4zTiozrM4kr46SmL3jmH6k). -->

# ethio.com — Sage 3D style change spec

2026-10-20 · the operator

## Purpose and rules

The marketplace shell and listing feed move to the approved **Sage 3D** look: a sage-tinted page, soft green-tinted shadows that make bars, buttons and cards read as raised or pressed, round icon tiles in the category menu, a segmented location box, and new Premium and Featured flags. This is a style change only. Every element, word, control and position on the page stays where it is today.

Reference designs: the canvas [ethio.com — Sage 3D design](https://claude.ai/artifact/4zTiozrM4kr46SmL3jmH6k), page “Sage 3D — agreed design”. Light: **Home · Desktop 1440**, **Home · Tablet 834**, **Home · Phone 390**, **Ad page · Premium · Desktop 1440**, **Ad page · Featured · Desktop 1440**, **Ad page · Premium · Phone 390**. Dark: **Dark mode · Home · Desktop 1440**, **Dark mode · Ad page · Premium**, **Dark mode · Ad page · Featured**. Also **Dropdowns and dialogs · light and dark** and **For review · ribbon colour by card type**. “Current” values were read from the repo at commit `78b96e2`; the ad page was re-checked at `663ced8` (`origin/dev`, 2026-10-21).

Hard rules for the implementer:

- Nothing is removed, added, renamed or moved. The order of the top band, the rail, the breadcrumb band, the location row, the feed and the footer is unchanged, and so are the breakpoints (768 px, 1024 px) and the 3 / 4 / 5 cards a row.
- Allowed changes: colour tokens, shadows (the 3D effect), corner radii, the weight and size of text that already exists, the rail’s icon tiles, the location box’s look, and the drawing of the Premium and Featured flags.
- The language control stays a dropdown that shows the language name (“English”), so more languages can be added.
- The status ribbon (Sold, Rented, Filled, No longer available, Reserved, Price reduced, Photos soon) **keeps its place, angle, size and words (−30°, lower-right corner) and takes the satin finish of section 8** (D180, D197, INC-670, D220).
- Card laws stay: one card size, `auto-rows-fr`, cards lift by shadow and never by a plain border (look-law LL-1).
- The listings and photos on the boards are sample content; only their styling is the spec.
- This spec covers light mode. Dark mode keeps today’s tokens until a dark Sage set is ruled (see the last section).

## Design tokens (src/styles.css)

All new looks come from tokens added or changed in `src/styles.css`, so components change class names, not hex values. Hex values below are the approved ones. Convert colours to oklch as the file requires, add each to `:root` and `@theme inline`, and extend `styles.tokens.test.ts` with the new contrast pairs.

### Colours

| Token | Current (light) | Sage 3D (light) | Used by |
|---|---|---|---|
| `--background` | #F3F5F8 cool grey | #EEF3EF sage | page behind the feed |
| `--sidebar` | #FFFFFF | #F7FAF8 | rail, breadcrumb + location band, footer |
| `--card` | #FFFFFF | #FFFFFF (unchanged) | top band, cards, controls |
| `--rule` | #E4E8ED | #E2EAE4 | breadcrumb underline, card place-line divider |
| `--hairline` (new) | — | #DCE6DF | 1 px edges of band, rail, footer, control borders, rail tile border |
| `--field` (new) | — | #F4F8F5 | search field fill |
| `--track` (new) | — | #E6EEE8 | location box track |
| `--photo-empty` (new) | `bg-muted` #F0F2F5 | #E3E8E5 | picture box when no photo has loaded |
| `--leaf-ink` (new) | — | #3E7A62 | search icon, globe icon, map-pin icons, logo sub-line “MARKETPLACE” |
| `--success-soft` | #E3F1EA (exists) | #E3F1EA (unchanged) | Negotiable badge fill (new use) |
| `--primary`, `--gold`, `--foreground`, `--muted-foreground` | unchanged | unchanged | — |

### Shadows (the 3D effect)

Two families: **raised** (a hairline, a soft drop, and on buttons a darker bottom edge) and **pressed in** (an inner shadow at the top and a white line at the bottom). The tint is the page green at an alpha, `rgba(23,64,47,a)`.

| Token (new) | Value | Applied to |
|---|---|---|
| `--shadow-band` | `0 1px 0 #D6E2DA, 0 10px 20px -12px rgba(23,64,47,.35)` | top band (logo cell + bar) |
| `--shadow-rail` | `1px 0 0 #DCE6DF, 8px 0 18px -12px rgba(23,64,47,.30)`; phone strip `… 6px 0 14px -10px …` | rail and phone strip |
| `--shadow-subband` | `0 1px 0 #DCE6DF, 0 8px 16px -12px rgba(23,64,47,.30)` | breadcrumb + location band |
| `--shadow-footer` | `0 -1px 0 #DCE6DF, inset 0 1px 0 #FFF, 0 -10px 20px -14px rgba(23,64,47,.30)` | footer top edge |
| `--shadow-field` | `inset 0 2px 4px rgba(23,64,47,.10), inset 0 0 0 1px #CFE0D6, 0 1px 0 #FFF` | search field (pressed in) |
| `--shadow-control` | `0 1px 2px rgba(23,64,47,.12), inset 0 -2px 0 rgba(23,64,47,.07)` | language, theme, search-icon buttons |
| `--shadow-button` (changed) | `inset 0 1px 0 rgba(255,255,255,.18), inset 0 -2px 0 rgba(0,0,0,.22), 0 2px 5px rgba(23,64,47,.30)` | Sign in, Post listing, every filled green button |
| `--shadow-tile` | `0 1px 2px rgba(23,64,47,.14), inset 0 -2px 0 rgba(23,64,47,.06)` | rail icon tiles (idle) |
| `--shadow-tile-on` | `inset 0 1px 0 rgba(255,255,255,.28), inset 0 -2px 0 rgba(0,0,0,.22), 0 2px 5px rgba(23,64,47,.30)` | rail icon tile (selected) |
| `--shadow-row-on` | `0 1px 2px rgba(23,64,47,.08), 0 6px 14px -4px rgba(23,64,47,.14)` | selected rail row |
| `--shadow-track` | `inset 0 2px 3px rgba(23,64,47,.12), inset 0 -1px 0 #FFF` | location box track (pressed in) |
| `--shadow-segment` | `0 1px 2px rgba(23,64,47,.20), 0 3px 8px rgba(23,64,47,.10), inset 0 -1px 0 rgba(23,64,47,.06)` | chosen location segment (raised) |
| `--shadow-card` (changed) | `0 1px 1px rgba(23,64,47,.04), 0 4px 10px rgba(23,64,47,.06), 0 14px 28px -8px rgba(23,64,47,.12)`; below 1024 px the last part is `0 12px 24px -8px …`; phone `0 1px 1px ….04, 0 3px 8px ….07, 0 10px 18px -8px ….14` | listing cards, invite card |
| `--shadow-badge` | `inset 0 1px 0 rgba(255,255,255,.35), inset 0 -2px 0 rgba(0,0,0,.18), 0 3px 8px rgba(201,138,43,.35)` | invite card’s gold star disc |
| `--shadow-bar-up` (changed) | `0 -1px 0 #DCE6DF, 0 -10px 24px -10px rgba(23,64,47,.30)` | phone bottom bar |

### Radii

| Element | Current | Sage 3D |
|---|---|---|
| Listing and invite cards (`--radius-card`) | 12 px | 20 px at 5 a row; 14 px at 4 a row; 12 px at 3 a row |
| Buttons and controls (`--radius`) | 6 px | 12 px |
| Search field | 6 px | fully round (pill) |
| Rail rows | 6 px | 14 px |
| Location track / segment | — | 12 px / 9 px (phone 11 px / 8 px) |

## Changes by component

Fourteen components change. Each table sets today’s value against the Sage 3D value; anything not listed stays as it is.

### 1. Top band — `app-shell.tsx` (shell-band), `app-header.tsx`, `brand/logo.tsx`

| Part | Current | Sage 3D |
|---|---|---|
| Band | `bg-card shadow-bar`, 56 px (md+) / 52 px (phone) | same colour and heights; shadow `--shadow-band` |
| Logo mark (`WovenMark`) | outlined green diamond, green chevrons, gold inner diamond | same geometry: outer diamond **filled** `primary`, chevrons white, inner diamond gold #E0B05A |
| Wordmark | “ethio” and “com” in `primary`, semibold | “ethio.com” in `foreground`, weight 800, letter-spacing −0.6 px; the dot stays gold |
| Sub-line “MARKETPLACE” | `muted-foreground`, 500 | `--leaf-ink`, 600; fit rule unchanged |
| Search field (inline and phone row) | `rounded-md border border-input bg-background`, 14 px text | pill (`rounded-full`), no border, fill `--field`, `--shadow-field`; icon `--leaf-ink` 18 px stroke 2.25; text 15 px (phone row stays ≥ 16 px per INC-747) |
| Language and theme controls | ghost: no fill, `text-muted-foreground`, `hover:bg-muted`, 6 px radius | white fill, 1 px `--hairline` border, `--shadow-control`, 12 px radius, `text-foreground`; globe icon `--leaf-ink`. The language control stays a dropdown showing the language name with its chevron |
| Phone search-icon button | ghost | same treatment as the controls above |
| Sign in | `bg-primary rounded-md`, medium | 12 px radius, semibold, `--shadow-button` |
| Account menu trigger (signed in) | ghost | same treatment as the controls |

### 2. Category rail, 768 px and up — `app-rail.tsx`

The spacing approved on desktop and tablet is the roomy one shown on the boards.

| Part | Current | Sage 3D |
|---|---|---|
| Rail surface | `bg-sidebar` #FFFFFF, `shadow-side`, padding 8 px | `--sidebar` #F7FAF8, `--shadow-rail`, padding 14 px 10 px; widths unchanged (224 / 256 / 64 px) |
| Panel header (“Marketplace” + switch) | as today | label 12 px, bold, uppercase, letter-spacing 1.2 px, `muted-foreground`; switch control unchanged |
| Row (`ITEM_CORE`) | `min-h-8` on fine pointers, gap 8 px, `rounded-md`, 14 px text | min-height 42 px, gap 11 px, 3 px between rows, 14 px radius, 14 px text weight 500 |
| Icon | bare 20 px Lucide icon in text colour | the same icon at 16 px, stroke 1.9, `primary`, centred in a **30 px round tile**: white fill, 1 px `--hairline` border, `--shadow-tile` |
| Selected row (`ITEM_ACTIVE`) | `bg-nav-active`, `text-primary`, semibold | white row, `--shadow-row-on`, text #17503A semibold; its tile filled `primary` with a white icon and `--shadow-tile-on` |
| Hover (`ITEM_IDLE`) | `bg-sidebar-accent/60` | white at 70 % |
| Favourite star | gold star on the icon’s corner | unchanged, on the tile’s corner |
| Folded rail (64 px, `rail-icons`) | icons only | tiles only, same tile styles, centred |

### 3. Phone strip and phone menu, under 768 px — `app-rail.tsx` (`strip`, `menu`)

On phones the strip must stay **compact so all ~16 root categories fit** between the top band and the bottom bar without scrolling.

| Part | Current | Sage 3D |
|---|---|---|
| Strip surface | `bg-sidebar shadow-side`, 48 px wide | `--sidebar`, `--shadow-rail` (phone values), width unchanged |
| Strip rows | `min-h-8 max-h-10 flex-1` (INC-756), bare 24 px icons | keep the flex rows (32–40 px each); each icon at 15 px inside a **28 px round tile** (same idle and selected styles as the rail), 2 px between tiles |
| Phone menu (drawer) rows | compact rows with labels | same compact heights; tile + label styles as the rail |

### 4. Breadcrumb and location band — `app-shell.tsx` (shell-subband), `location-selector.tsx`

Both rows keep their place, order and words; the location row stays on its own line under the breadcrumb.

| Part | Current | Sage 3D |
|---|---|---|
| Band surface | `bg-card shadow-bar` | `--sidebar`, `--shadow-subband` |
| Breadcrumb row | `min-h-8`, `border-b border-neutral-soft`, 14 px | same height; the line becomes a groove: `inset 0 -1px 0 var(--rule), 0 1px 0 #FFF`; 13 px muted text |
| Location row | `h-8`, `bg-card shadow-bar`, nowrap | min-height 48 px (46 px phone) so the box fits; same surface as the band; nowrap and truncation kept |
| Row label | “Showing listings in” / “Listings in”, 14 px muted | unchanged words; 13 px (12 px phone) |
| Pickers (`Picker`) | separate ghost buttons, `h-8 rounded-md px-2`, chevrons | the pickers sit together in **one track**: fill `--track`, 12 px radius, 3 px padding, `--shadow-track` (pressed in); a decorative map-pin (16 px, `primary`, `aria-hidden`) at the track’s start |
| Each picker | as above | a segment: min-height 32 px, 9 px radius, padding 0 10 px (phone 0 5 px, 8 px radius), 13 px (12 px phone), weight 500, chevron 13 px muted |
| Deepest chosen level (e.g. Addis Ababa) | `font-medium text-foreground` | **raised**: white fill, `--shadow-segment`, text #17503A semibold |
| Unset level (“Any area”) | muted | transparent, `foreground`, 500 |
| Dropdown menus, PlaceNotice band, loading and error texts | — | unchanged |

### 5. Feed heading — `marketplace/feed.tsx`

| Part | Current | Sage 3D |
|---|---|---|
| h1 “Listings in {place}” / “All listings” | 20 px semibold | 30 px (25 px tablet, 21 px phone), weight 800, letter-spacing −0.9 px; the place name in `primary` |
| Grid gap | 8 px phone, 16 px from 640 px | unchanged, except 20 px from 1024 px |
| Main padding | 8 px / 16 px | unchanged on phone and tablet; 28 px top and bottom from 1024 px |
| Wider-place h2 labels, favourite star, errors | — | unchanged |

### 6. Listing card — `listing-card.tsx`, `listing-picture.tsx`, `layout/surface.ts`

| Part | Current | Sage 3D |
|---|---|---|
| Card surface (`CARD_SURFACE`) | `rounded-card bg-card shadow-card`, `overflow-hidden` | radius per size (radii table), `--shadow-card`; the card lets the flag’s fold show past its left edge, so the picture box keeps its own top radius and clipping |
| Picture box, no photo | `bg-muted` | `--photo-empty`, bottom separator `inset 0 -1px 0 rgba(23,64,47,.10)`; photos, crop and the 4:3 frame unchanged |
| Body padding | 12 px; compact 8 px | 13 px 14 px 14 px; compact 8–9 px (tablet), 6–7 px (phone) |
| Title | 14 px semibold, one line; compact 12 px | unchanged |
| Price | 14 px semibold; compact 12 px | 16 px bold; compact 13 px (tablet) / 12 px (phone) bold; the price slot’s minimum heights keep the one-card-shape law |
| Old price (Price reduced) | struck, muted | unchanged, 13 px |
| Negotiable badge | outlined pill, `muted-foreground` | filled pill `--success-soft`, text #17503A, 11 px semibold, no border |
| Place line | pin + place, `muted-foreground` | adds a divider above (`inset 0 1px 0 #EEF3EF`, 9 px top padding, 6 px compact); pin in `--leaf-ink`; text unchanged |

### 7. Premium and Featured cards — replaces the tier pill in `listing-card.tsx`

Today each tier is a small pill on the picture (Premium green, Featured gold). Sage 3D marks a paid card three ways at once: the **whole card is tinted with a light frame**, a **white mini flag with a coloured border and coloured stars** sits on the photo’s top-left, and the **tier word** sits small beside the place. The card’s size and slots do not change.

| Part | Premium (gold) | Featured (green) |
|---|---|---|
| Card fill | #FDF1DA | #E4F1E9 |
| Frame and glow (instead of `--shadow-card`) | `0 0 0 1.5px #D9A94F, 0 10px 24px -8px rgba(201,138,43,.35)` | `0 0 0 1.5px #4F8A70, 0 10px 24px -8px rgba(30,90,67,.26)` |
| Place-line divider | #F1DDB5 | #CFE3D7 |
| Flag fill | white | white |
| Flag border (2.2 units) | #D9A94F | #4F8A70 |
| Flag length (photo units) | 64 | 44 |
| Fold (past the card edge) | #B5862F | #2F5E49 |
| Stars | two, gradient #F2D28A → #D49A38 → #A06B16 | one, gradient #3E8C6B → #1E5A43 → #133B2C |
| Word beside the place | “★★ PREMIUM”: stars #D9A94F, word #7A4E00 | “★ FEATURED”: stars #4F8A70, word #17503A |

Flag drawing (SVG over the picture, `viewBox="0 0 400 300"`, `overflow: visible`, so it scales with the card):

- Body with notched tail: `M0 16 L(L) 16 L(L−12) 36 L(L) 56 L0 56 Z`, L = flag length; white fill, border in the tier colour, round joins.
- Fold: `M0 16 L-7 21 L-7 61 L0 56 Z` in the darker tier tone, just past the card’s left edge.
- Stars: the star path at 0.82 (18 units), at x = 9 and x = 29, y = 27.5.
- Shadow: `drop-shadow(0 2px 2px rgba(30,35,41,.22))`.
- Scale: ×1 at 5 a row, ×1.25 at 4 a row, ×1.6 at 3 a row.
- Word beside the place: 11 px (10 px tablet, 9 px phone), weight 800, uppercase, letter-spacing 0.6 px, from `tier.premium` / `tier.featured`; on 3 and 4 a row it wraps under the place.
- Kept: `data-testid="listing-card-tier"`, `data-tier`, one tier per card; the flag carries the tier word as its accessible name.
- Similar ads on the ad page use the same treatment.

### 8. Status ribbon — satin finish, colour by card type — `listing-picture.tsx` (`ListingRibbon`)

Place, angle, size and words stay as today: lower-right, −30°, centre 25.72cqw / 14.85cqw from the corner, letters `clamp(9px, 5cqw, 20px)` bold uppercase with 0.06em tracking and 1.4cqw above and below, one ribbon per picture. Two things change: the **finish** (satin band with rolled ends) and the **colour, which follows the card the ribbon sits on**: a regular ad gets pearl white, a Premium ad gold, a Featured ad sage green. The same rule holds on the home feed, similar ads and the ad page's main photo, at every width.

| Part | Current | Sage 3D |
|---|---|---|
| Band shape | flat `bg-gold`, clipped by the picture | ends exactly at the picture's right and bottom edges; filled with a gradient along the band, from its lower-left end to its right end, with six stops at 0 %, 7 %, 22 %, 58 %, 92 % and 100 % (colours per card type below) |
| Regular ad — pearl (light mode) | gold | stops #8E9893, #FFFFFF, #F7F9F8, #E4E9E6, #C6CEC9, #87918C; rolled ends #7A847F → #F4F6F5 → #7A847F; text #26302B with a white emboss at 70 %; shadow colour #0F1A14 at 30 % |
| Regular ad — pearl (dark mode) | gold | stops #5E6863, #F2F5F3, #DEE4E0, #C5CDC8, #A3ADA7, #57615C (a softer white so it does not glare on dark cards); rolled ends #4F5954 → #E6EBE8 → #4F5954; text #1A221E with a white emboss at 45 %; shadow black at 55 % |
| Premium — gold (both modes) | gold | stops #9A6A1C, #FBEBB8, #EFCB72, #D9A443, #B98428, #8A5A12; rolled ends #7A4E0E → #E7C26A → #7A4E0E; text #3D2A08 with a white emboss at 50 %; shadow #2A1A03 at 30 % |
| Featured — sage (both modes) | gold | stops #1E5A43, #D3EEDF, #93D0B1, #5BA584, #3A7F62, #18412F; rolled ends #143A2B → #86C9A7 → #143A2B; text #0B2419 with a white emboss at 45 %; shadow #0A2016 at 32 % |
| Gloss | — | white strip at 38 % along the top 12 % of the band's width; black strip at 12 % along the bottom 14 % (all card types) |
| Rolled ends (new) | — | a small rounded cap beyond each edge (≈ 1.75cqw deep), as if the ribbon wraps behind the photo; colours per card type above |
| Shadow | `shadow-sm` | `drop-shadow(0 2.5px 2.5px <shadow colour>)`, colour per card type above |
| Text | `text-gold-foreground` #3D2A08 | bold uppercase in the card type's text colour, plus a copy one unit below in the emboss colour |

Implementation: draw the ribbon as SVG over the picture (`viewBox="0 0 400 300"`), with the outer picture box `overflow: visible` so the rolled caps show; the photo itself stays clipped. Choose the palette from the listing's tier (none → pearl, premium → gold, featured → sage) and the theme (pearl has a dark-mode set; gold and sage are the same in both). Each ribbon instance needs its own gradient ids. Contrast of the text on the band body: pearl 11.1 : 1, dark pearl 10.0 : 1, gold 6.1 : 1, sage 5.6 : 1. Boards: every home and ad-page board, and **For review · ribbon colour by card type**.

### 9. Invite card — `marketplace/invite-card.tsx`

| Part | Current | Sage 3D |
|---|---|---|
| Surface | `border-2 border-gold bg-gold/15 rounded-card` | 2 px #C98A2B border, fill #FFF8EC, card radius, `--shadow-card` |
| Star disc | `bg-gold`, 36 px | 46 px desktop (36 tablet, 24 phone), `--shadow-badge` |
| Sentence | 14 px semibold | 18 px display bold desktop; 13 px tablet; 12 px phone |
| Post listing button | `bg-primary`, 6 px radius | 12 px radius (10 px phone), semibold, `--shadow-button` |

### 10. Footer — `shell/app-footer.tsx`

| Part | Current | Sage 3D |
|---|---|---|
| Surface | `bg-card` | `--sidebar`, `--shadow-footer` |
| Wordmark | as the logo | `foreground`, weight 800, gold dot |
| Copyright row divider | `border-t` | groove: `inset 0 1px 0 #DCE6DF, inset 0 2px 0 #FFF` |
| Sections, links, words, insets | — | unchanged |

### 11. Phone bottom bar — `shell/bottom-bar.tsx`

| Part | Current | Sage 3D |
|---|---|---|
| Bar | `bg-card rounded-t-[1rem] shadow-bar-up` | 18 px top radius, new `--shadow-bar-up` |
| Current-item pill | `bg-nav-active`, 32 × 56 px | fill #E3F1EA with `inset 0 1px 2px rgba(23,64,47,.12)`, label #17503A bold |
| Post listing (emphasised) | 36 px green disc | 40 px green disc, `--shadow-button` plus `0 4px 10px rgba(23,64,47,.35)` and a 4 px white ring, raised 14 px above the bar’s top edge |
| Items, order, labels | Home, (My listings), Post listing, Sign in / Account, (Admin) | unchanged |

### 12. Ad page — `routes/l.$slug.tsx`, `posting/preview/listing-detail.tsx`, `photo-gallery.tsx`, `safety-box.tsx`, `ad-page/report-ad.tsx`, `ad-page/similar-ads.tsx`

**Placement is exactly as live.** Every box, row, link and button stays where `listing-detail.tsx` and `box-layout.ts` (DEC-200/201) put it today, at every width; only colour, shadow, radius and type change, plus the flag, ribbon and tier tag. Live placement was re-checked against `origin/dev` at `663ced8` on 2026-10-21.

**Colour rule.** A free ad's boxes are white. On a paid ad **only the title box is tinted**; every other box is white with the **tier frame**, and every accent *inside* the ad body takes the tier colour. Tinting every box was tried and rejected (the page turns one colour and long text reads worse). Outside the ad body (top band, search, Sign in, rail, breadcrumb, footer) nothing changes with the tier.

| Tier | Title box | Other boxes | Accents inside the ad body |
|---|---|---|---|
| Free | white, `--shadow-card` | white, `--shadow-card` | site green: Show contact `primary`; links, Save, Share, Read more `primary`; current tab #E3F1EA / #17503A; selected thumbnail 2 px `primary`; price `primary` |
| Premium | #FDF1DA, `--shadow-premium` | white, `--shadow-premium` frame (1.5 px #D9A94F) | gold: **Show contact** fill #C98A2B, text #3D2A08 (4.67 : 1), shadow `0 2px 5px rgba(201,138,43,.45)`; **links, Save, Share, Read more, place link, All ads by this seller, Open in Google Maps** #7A4E00 (6.4 : 1 on #FDF1DA, 7.2 : 1 on white); **price** #7A4E00; **Negotiable** chip #F6E3BC / #7A4E00; **seller initials disc** #F6E3BC / #7A4E00; **key-fact chip ring** #EBD3A6; **section bar** frame 1.5 px #D9A94F, current tab #FDF1DA / #7A4E00 with `inset 0 0 0 1px #EBD3A6`; **Enlarge map** outline #E2C48A; **selected thumbnail** 2 px #C98A2B; dividers #F1DDB5 |
| Featured | #E4F1E9, `--shadow-featured` | white, `--shadow-featured` frame (1.5 px #4F8A70) | site green as free, plus the section bar frame 1.5 px #4F8A70; dividers #CFE3D7 |

The safety box keeps its live gold start edge and is not re-coloured by tier (it is ethio.com speaking, not the seller).

| Part | Live placement (unchanged) | Sage 3D look |
|---|---|---|
| Layout and box sizes | DEC-200: from 57.5rem a 3fr / 2fr top row (photo · title box over seller box), then the section bar, then Details, Description, Location one third each (`col-span-2` of 6), Safety and Report full width; below 57.5rem the phone order photo, title box, section bar, Details, Description, seller, Location, Safety, Report | unchanged |
| Shell | band, rail, breadcrumb, footer, phone bottom bar | sections 1–4, 10 and 11; no location row on this page, as today |
| Photo card | thumbnails 64 × 48 in a column on the left (row below the photo under 32rem), main photo fills the card's height (`fill`, `min-h-full`, image `object-contain` top) | white card (paid: tier frame), 20 px radius (16 px phone), 12 px padding (8 px); photo well #E3E8E5, 14 px radius; thumbnails 6 px radius, others 1 px `--hairline` ring |
| Flag and ribbon on the main photo | ribbon in the picture overlay (`inset-0` when the photo fills) | the flag of section 7 pinned to the photo box's **top-left corner**, the ribbon of section 8 pinned to its **bottom-right corner** (two overlays: `preserveAspectRatio` `xMinYMin` for the flag, `xMaxYMax` for the ribbon), so both stay on the corners however tall the box is; flag ×0.72 of photo units at desktop, ×1.15 on phone; Premium and Featured only |
| Arrows and counter | arrows start / end, vertically centred; counter **bottom-end** | arrows 44 px round, white 92 %, `0 2px 6px rgba(30,35,41,.2)`; counter pill unchanged |
| Title box | title, price row (+ Negotiable), key-fact chips, place link · Posted on one row, Seen / Shared line, Save · Share · saves row with a top rule | tier tag (new, paid only) above the title: white pill, “★★ PREMIUM” / “★ FEATURED” 12 px 800 uppercase, word #7A4E00 / #17503A, stars #D9A94F / #4F8A70, ring #EBD3A6 / #C9DFD1; title 27 px (21 px phone) display 800; price 30 px (24 px) 800; chips white, 10 px radius; **no pin icon** on the place link (live has none) |
| Seller box | seller line, rule, contact block (Show contact), All ads by this seller at the foot | 20 px radius; initials disc 44 px; Show contact full-width 48 px button with `--shadow-button` |
| Section bar | sticky; Details · Description · Location from 57.5rem; **Seller tab shown below 57.5rem** (Details · Description · Seller · Location) | segmented bar (R9): white, 14 px radius (12 px phone), current tab pressed in; same items and anchors |
| Details | heading, then **one list; each row a two-equal-column grid** (label muted at the start, value start-aligned), 8 px between rows, no row lines | white box, heading 18 px display |
| Description | heading, text (8 lines then Read more, buyer only) | unchanged apart from colours |
| Location | heading, **area line** (“Kirkos, Addis Ababa”, muted), directions, map with **Enlarge map on the map's top-end corner**, **Open in Google Maps an underlined text link below the map** | map well pressed in (`--shadow-field`); Enlarge map in the control style |
| Safety | gold start edge (`border-s-4 border-s-gold`), small heading, **numbered list** of four lines | unchanged apart from radius and shadow; **no shield icon** |
| Report this ad | underlined muted link | unchanged |
| Similar ads | inside its own card (`PageCard`), heading 16 px semibold, 3 / 4 / 5 a row | Sage cards with section 7's paid treatment and section 8's ribbon colours |

Boards: **Ad page · Premium · Desktop 1440**, **Ad page · Featured · Desktop 1440**, **Ad page · Premium · Phone 390**, and their dark-mode boards.

### 13. Dark mode — `.dark` block of `src/styles.css` (new Sage dark set)

Dark mode keeps today's approach (light green `primary` #7FC9A6 with near-black text) and shifts the slate neutrals slightly toward sage so it matches the light design. Shadows are black; every card also gets a 1 px #26302B hairline so edges read on a dark page.

| Token | Today (dark) | Sage dark |
|---|---|---|
| Page `--background` | #14181C | #121815 |
| Card `--card` | #1A1F24 | #1A221E |
| Rail, bands, footer `--sidebar` | #1A1F24 | #171E1A |
| Popover, dialog surface | #1A1F24 | #1D2621 |
| Text `--foreground` | #E6E8EB | #E6EAE7 (14.8 : 1 on the page) |
| Muted text | #A3ABB3 | #A3B0A8 (7.2 : 1 on cards) |
| `primary` / on primary | #7FC9A6 / #0B1A13 | unchanged (9.2 : 1) |
| Hairline, control border | #343B43 | #2F3B34 |
| Rule | #262C32 | #27322C |
| Search field, location track | #222930 | #0F1512, pressed in with `inset 0 2px 4px rgba(0,0,0,.45)` |
| Photo well | #222930 | #26302B |
| Current row / tab | #22302A | #1C2B24, text #7FC9A6 |
| Gold (logo dot, invite) | #E0A94A | unchanged |
| Premium card / title box | — | fill #2B2314, frame 1.5 px #C9973F, rule #4F4020, word and price **#E6B655** (8.3 : 1), Show contact #E0A94A with #221704 (8.3 : 1), chips #3A2E15 |
| Featured card / title box | — | fill #1A2C23, frame 1.5 px #4F9C7A, rule #2E4A3C, word #7FC9A6 (7.6 : 1) |
| Mini flag | — | white body as in light mode, border #C9973F (Premium) / #4F9C7A (Featured), shadow black 45 % |
| Status ribbon | gold | section 8: dark pearl for regular ads; gold and sage unchanged |

Boards: **Dark mode · Home · Desktop 1440**, **Dark mode · Ad page · Premium**, **Dark mode · Ad page · Featured**.

### 14. Dropdowns and dialogs — `ui/dropdown-menu.tsx`, `ui/dialog.tsx`, `ui/alert-dialog.tsx`, `ui/select.tsx`, `ui/popover.tsx`, `ui/sheet.tsx`, `ui/drawer.tsx`

Every menu and dialog takes the same Sage surfaces in both modes, so the language and location dropdowns, Report this ad, Share this ad, the maps choice and the confirm dialogs all match the cards. Contents, words, order and behaviour are unchanged.

| Part | Current | Sage 3D light | Sage 3D dark |
|---|---|---|---|
| Menu panel | `rounded-md border bg-popover shadow-lg` | white, 14 px radius, 6 px padding, `0 0 0 1px #DCE6DF, 0 2px 6px rgba(23,64,47,.10), 0 14px 30px -8px rgba(23,64,47,.30)` | #1D2621, ring #2F3B34, black shadows 35 % / 65 % |
| Menu row | `rounded-sm px-2 py-1.5`, focus `bg-accent` | 40 px tall, 10 px radius; current / focused row #E3F1EA, text #17503A semibold, tick #1E5A43 at the end | current row #22302A, text and tick #7FC9A6 |
| Separator | `bg-muted` | 1 px #E2EAE4 | #27322C |
| Overlay | `bg-black/80` | rgba(16,40,30,.55) | rgba(0,0,0,.62) |
| Dialog panel | `border bg-background p-6 shadow-lg sm:rounded-lg` | white, 20 px radius, 22 × 24 px padding, `0 0 0 1px #DCE6DF, 0 4px 12px rgba(23,64,47,.12), 0 28px 60px -12px rgba(23,64,47,.45)` | #1D2621, ring #2F3B34, black shadows |
| Dialog title / text | `text-lg semibold` / muted | title 20 px display 800; description 14 px muted | #E6EAE7 / #A3B0A8 |
| Close button | small × | 40 px control-style button (white, hairline, `--shadow-control`, 12 px radius) | #1A221E, #2F3B34 border |
| Footer buttons | default | divider `inset 0 1px 0 #E2EAE4` above; secondary in the control style, primary green raised (`--shadow-button`) | primary #7FC9A6 with #0B1A13 |
| Radio / choice rows | default | 40 px rows, 12 px radius; chosen row #E3F1EA with `inset 0 0 0 1.5px #1E5A43` | #22302A with #7FC9A6 ring |
| Text fields in dialogs | `border-input` | pressed-in field (`--shadow-field`, #F4F8F5) | #0F1512, inset black 45 % |

Board: **Dropdowns and dialogs · light and dark**.

## By screen size

The same changes apply at every width; only sizes step down. Layouts, breakpoints and cards a row are today’s.

|  | Phone, under 768 px | Tablet, 768–1023 px | Desktop, 1024 px and up |
|---|---|---|---|
| Board | Phone 390 | Tablet 834 | Desktop 1440 |
| Top band | 52 px; logo · search button · English ▾ · theme (Sign in stays in the bottom bar) | 56 px; full controls | 56 px; full controls |
| Category menu | 48 px strip, 28 px tiles, compact flex rows so ~16 roots fit | 224 px rail, 30 px tiles, 42 px rows | 256 px rail (64 px folded), 30 px tiles, 42 px rows |
| Location row | “Listings in” + track, 46 px, 12 px text | “Showing listings in” + track, 48 px | same as tablet |
| Heading | 21 px | 25 px | 30 px |
| Cards a row / card radius | 3 / 12 px | 4 / 14 px | 5 / 20 px |
| Price size | 12 px bold | 13 px bold | 16 px bold |
| Flag scale | ×1.6 | ×1.25 | ×1 |
| Bottom bar | Sage bar, raised Post listing | none | none |

## Rulings needed, scope and acceptance

Eleven house rules in `styles.css` and the brand files conflict with this design and need a ruling before implementation.

### Rulings needed

| # | Current rule | What Sage 3D needs |
|---|---|---|
| R1 | Shadows are black or the foreground at an alpha, never a hue | shadows tinted with the page green `rgba(23,64,47,a)` |
| R2 | Gold is used in exactly four places: logo dot, Featured, invite card, cover ribbon (and status ribbons, D180/D197) | **Premium** becomes the gold tier (card tint and frame, flag border, stars, word; on the ad page also the Premium price, Show contact, links, chips, section-bar frame and selected thumbnail); Featured leaves gold; logo dot and invite card stay gold; the status ribbon is gold on Premium cards only (section 8) |
| R3 | Premium is `bg-primary` green, Featured `bg-gold` | Premium gold, Featured green (operator choice, 2026-10-20) |
| R4 | One uniform cool-slate neutral surface (“surface purge”) | sage-tinted page (#EEF3EF), rail and bands (#F7FAF8), track (#E6EEE8), field (#F4F8F5) |
| R5 | Logo: outlined mark, green wordmark (a working mark, not yet cleared) | filled green mark, dark wordmark; geometry unchanged |
| R6 | Phone bottom bar items sit inside the bar | Post listing disc raised 14 px above the bar’s edge |
| R7 | Images and gradients are not surfaces | gradients are used on the status ribbon’s satin finish and the flag stars only (decoration, not a surface); the status ribbon changes from flat gold to satin in three colours by card type — pearl, gold, sage (D180/D197/INC-670 geometry kept) |
| R8 | Every card is one white surface | paid cards are tinted (gold or green) with a light frame; size and slots unchanged |
| R9 | Ad page sections use underline tabs | segmented bar, same items and anchors |
| R10 | Dark mode uses the cool-slate dark set (#14181C page) | the Sage dark set of section 13 (sage-shifted neutrals, black shadows plus a 1 px hairline on cards, gold and sage tier surfaces) |
| R11 | Dialogs on bg-background with rounded-lg; menus rounded-md with a border | dialogs and menus on the card surface with Sage radii and raised shadows (section 14); look-law LL-1 kept by using a ring shadow, not a border |

### Not in this change

- Layout and placement anywhere: every page keeps its live structure; only the look changes (the ad page is checked box by box in section 12).
- Page content: the posting form, account and admin pages keep their own content and layout. Note that the top band, rail, breadcrumb band and footer are shared by every page, so their new look appears on all of them.
- Photos, crop, card size law, breakpoints, routes and words; the status ribbon's place, angle, size and words (only its finish and colour change).

### Open questions

- Do the Amharic tier words fit the flag at ×1 (57.5 % of the picture width)? If not: shrink the word to fit, never below 9 px.
- Should the raised Post listing disc (R6) be dropped if it covers content just above the bar?

- Long ribbon words (“No longer available”) need a fit check on the satin band at 3 cards a row.

### Acceptance checks

- `styles.tokens.test.ts` covers every new pair and passes: #17503A on white, #7A4E00 on #F3EFE6, `muted-foreground` on #F7FAF8 and #EEF3EF, `foreground` on #E6EEE8 (all ≥ 4.5:1)
- Look-law LL-1 passes: no card gets a plain border
- No element, word, order or `data-testid` changes; existing unit and E2E tests pass unchanged
- Status ribbon keeps its place, angle, size and words at all three widths, shows the satin finish with rolled ends, and takes its card's colour: pearl on regular ads (dark pearl in dark mode), gold on Premium, sage on Featured
- At 390 × 844 all root categories show in the phone strip with no scroll
- At 360 px the location row does not wrap and long place names truncate
- Tier flag word is ≥ 9 px at 3 cards a row, never collides with a status ribbon, and its fold shows past the card edge without being clipped
- Walk the boards side by side at 390, 834 and 1440 px, plus the folded rail at 1440 px
- Dark mode follows section 13 on every page; every text pair listed there stays ≥ 4.5 : 1

- Paid cards show tint, frame, satin tab and the word at 390, 834 and 1440 px; the tab never meets the status ribbon; the word is ≥ 9 px
- The ad page shows the tier tab and tag only on Premium and Featured ads; its order, words and `data-testid`s are unchanged
- The tab’s rolled end shows past the card edge and is not clipped by the card or the grid
- Ad page placement matches live at 390, 834 and 1440 px: Details is one list with two-column rows; Location shows the area line, Enlarge map on the map's corner and Open in Google Maps as a link below; Safety is a numbered list with the gold start edge and no icon; the photo counter sits bottom-end; the Seller tab shows below 57.5rem; Similar ads sits in its card
- On a Premium ad only the title box is tinted; the other boxes are white with the gold frame; the price, Show contact, links, chips, section bar and selected thumbnail are gold (light and dark); a Featured ad uses the green equivalents; outside the ad body nothing changes
- On the ad page the flag stays on the photo box's top-left corner and the ribbon on its bottom-right corner at every photo height
- Language and location dropdowns, Report, Share, maps choice and confirm dialogs follow section 14 in light and dark
- New contrast pairs pass in `styles.tokens.test.ts`: #7A4E00 on #FDF1DA (6.4) and on white (7.2); #3D2A08 on #C98A2B (4.67); #E6B655 on #2B2314 (8.3); #221704 on #E0A94A (8.3); #E6EAE7 on #121815 (14.8); #A3B0A8 on #1A221E (7.2); #7FC9A6 on #1A2C23 (7.6)
