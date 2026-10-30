# Redesign Part 2 — the Sage look: the plan

Turn P1 (brief `docs/governance/briefs/foundations-turn-p1.md`). Base `d5b48d71`. Plan only: no app code, no test and no style change land with this file. The spec is `docs/governance/sage/sage-3d-style-change-spec.md` (DEC-289, R1–R11). The designer's files are in `docs/governance/sage/`. Either executor can build each part (DEC-303). Each part names its files, its tests and what it must not touch. Each part uses only repository commands: `bun run checks`, `bun run e2e:local -- <specs>` (or `e2e:changed`), and the conformance censuses.

## 0. Premises the census found wrong or incomplete (read first)

- **P-1. A theme mechanism partly exists already.** `src/providers/theme-provider.tsx` holds the light/dark mode. It has the storage key `ethio.theme` (:7), the pre-paint script `THEME_INIT_SCRIPT` (:16, inlined by `src/routes/__root.tsx` :26/:379), and `applyMode` (:35), which sets `data-mode` and the `.dark` class. The brief's "NONE YET" is right for *a theme as named data* and *its resolver*. But D250's mechanism must **extend** this provider and script (K1). It must not add a second pre-paint script or a second storage key. The stored value becomes `{name, mode}`. A legacy bare `"light"`/`"dark"` value reads as `{sage, <mode>}`.
- **P-2. The language mechanism lives in `src/i18n/provider.tsx`, not `src/lib`.** It holds D239's account-against-device order, proven by `src/i18n/provider-d239.test.tsx`. The account side is read in `src/features/auth/auth-service.ts`. The theme resolver follows its order and its failure rule: a failed read is unknown, never "system" (CF-SESSION-1). It does not share code. A theme has no catalogue and no server row in this part.
- **P-3. Tier data already exists.** `ListingTier` and `TIERS` are in `src/features/feed/feed-page.ts` :52/:113. The tier column is in migrations `20261014022725`, `20261015023155` and `20261028225001`. The card reads `listing.tier` (`listing-card.tsx` :114–:123, `data-testid="listing-card-tier"`, `data-tier`). So "no listing has a tier" is true of the data, not the schema. Tests can seed tiers with no migration (§4).
- **P-4. Two look values are already written outside the tokens** in app code: `src/components/shell/filter-choices.tsx` :58 (`shadow-[inset_0_-1px_0_rgb(0_0_0/0.2)]`) and `src/features/posting/photo-editor.tsx` :280 (`shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]`, the crop mask). The first becomes `--shadow-tile-on`'s sibling token in Part S1. The second is a functional mask, not a look; it gets a census allowlist line with its reason.

## 1. Census (base `d5b48d71`)

| Concern | Where today | Notes |
|---|---|---|
| Token module | `src/styles.css`: radii :103–:110 (`--radius` 0.375rem :209, `--radius-card` 0.75rem :110); shadows :183–:200 (black/foreground alpha, `--lift-*` aliases); light `:root` :214–:251; `.dark` :272–:308 | Colours are oklch only; hex is in comments |
| Contrast test | `src/styles.tokens.test.ts` — `PAIRS` :60ff, both modes; :95 every `--color-x` declared in both; :102 no hex/rgb in `:root`/`.dark` | Extended per theme in S0 |
| Look law | `src/look-law.test.ts` (LL-1 and siblings); `CARD_SURFACE` `src/components/layout/surface.ts` (D135, no 1-px border) | |
| Fixture page | `src/routes/dev.style.tsx` (also `dev.primitives.tsx`, `dev.tall.tsx`) | Gains a theme × tier grid in S0/S4 |
| Dark switch | `theme-provider.tsx` :7, :16, :35; `theme-toggle.tsx`; `__root.tsx` :26, :379 | P-1 |
| Top band §1 | `app-shell.tsx` (shell-band), `app-header.tsx`, `brand/logo.tsx` | `shadow-bar` |
| Rail §2–3 | `app-rail.tsx`; row classes only in `menu-row.ts` (CF-ROWS-1); width `menu-width.ts` (CF-WIDTH-1) | D247/D248/D254 sizes stay |
| Band rows §4 | `band-row.ts` (CF-BAND-1, 40 px); `location-selector.tsx` (`Picker`) | D258/D260 |
| Footer §10 | `shell/app-footer.tsx` (D252/D253/D257 places) | |
| Bottom bar §11 | `shell/bottom-bar.tsx` (`shadow-bar-up`, `rounded-t-[1rem]`) | |
| Cards §6–9 | `listing-card.tsx` (tier pill :114), `listing-picture.tsx` (`ListingRibbon` :65, flat `bg-gold` :57), `invite-card.tsx`, `surface.ts` | |
| Ad page §12 | `routes/l.$slug.tsx`, `posting/preview/listing-detail.tsx`, `photo-gallery.tsx`, `safety-box.tsx`, `ad-page/*` | DEC-200 placement fixed |
| Overlays §14 | facades `ui/dropdown-menu.tsx`, `ui/dialog.tsx` (over `dialog-primitive.tsx`), `ui/alert-dialog.tsx`, `ui/sheet.tsx`, `ui/select.tsx`, `ui/popover.tsx`, `ui/drawer.tsx`; Radix code arrives through `overlay-loader.ts` (DEC-259/260) | Styles live in the facades' class strings; impl files untouched |
| Tests reading look values | e2e: `house-style`, `layout`, `shell`, `submenu`, `submenu-look`, `submenu-touch`, `ad-page`, `feed-screens`, `primitives-law`, `fonts`, `my-listings-ad`, `post-wizard-*`, `photo-pipeline`, `admin-attributes-library`; helpers `e2e/helpers/colors.ts`, `ui.ts`, `categories.ts`; unit: `styles.tokens.test.ts`, `look-law.test.ts`, `scripts/conformance/shell-bands.test.ts`, `menu-row`/`menu-width` censuses | Each part greps these for the value it changes before it changes it (§7) |

A full file:line table of every component surface is the first deliverable of each part's census. Each part reads it again at its own base, because Parts 1's files move between turns.

## 2. Spec against later decisions (the later governs)

| Spec | Later decision | The plan |
|---|---|---|
| §2 rows 42 px, gap 11 px, 3 px between rows | D247, D248, D254 | Heights stay `menu-row.ts`'s (32–40 px below 768, 32–48 from 768, panels at the main menu's measured height). Tile, 14 px radius, colours and shadows of §2/§3 apply. The 11 px gap applies inside the row; there is no 3 px between rows (the rows share the height) |
| §2 rail padding 14 × 10 px | D258 | The band stays flush under the top bar. Horizontal 10 px inset only, inside `menu-width.ts`'s widths |
| §4 location row 48 / 46 px | D258 | 40 px (`BAND_ROW`). Track 34 px (3 px padding), segments 28 px (32 px in the spec). Segment text 13/12 px stays |
| §4 band look | D260 | One `--band-*` token set (surface `--sidebar`, edge, shadow `--shadow-subband`, label style) is read by the panel tabs bar, the breadcrumb row and the location row through `band-row.ts`. CF-BAND-1 also refuses a band row with its own surface class |
| §10 footer | D252, D253, D257 | Look only (surface, wordmark, groove). Place, insets and spacing are unchanged |
| Menu rows | D259, D255 | "Home" and the strip's back item take the same tile as every row (`menu-row.ts`) |
| §8 per-instance SVG with its own gradient ids | DEC-289 (shared drawings) | One hidden `<svg>` sprite in the shell. It holds `<symbol>` ribbon and flag shapes plus one `<linearGradient>` per palette: pearl, pearl-dark, gold, sage, and flag premium/featured. Each card uses `<use href="#ribbon">` with `fill="url(#rb-<palette>)"`. Pearl-dark is picked by `.dark` CSS (`--ribbon-pearl: url(#rb-pearl-dark)`), so there is no per-card gradient and no filter. The shadow is a CSS `drop-shadow` from a token. The sprite comes from `docs/governance/sage/*.svg` and costs one set of bytes per page |
| Spec "dark keeps today's tokens" | R10 approved | The Sage dark set of §13 is built (Part S7) |

## 3. Themes as data (D250, built-in only)

- `src/lib/themes.ts` (new, pure): `THEMES = { sage: { light: {...}, dark: {...} } }`, each a map of token name to oklch string, validated by a strict shape (`src/lib/schemas/theme.ts`, `.strict()`, allowlisted token names, values matching `^oklch\(…\)$` or a shadow grammar). There is no raw CSS. `DEFAULT_THEME = "sage"`.
- `src/lib/theme-resolver.ts` (new, pure): `resolveTheme({shop, account, device, system})` returns `{name, mode}`. The order is shop → account → device → system. An unknown or removed name falls through, and the fall is logged. A failed account read returns `unknown`, which keeps the device value; it is never "system".
- Before the first paint: `THEME_INIT_SCRIPT` is extended (P-1). It reads `ethio.theme`, sets `data-theme` and `data-mode`/`.dark`, and that is all it does. Only `sage` exists, so the CSS ships one set and `data-theme` only selects it. Scope: `[data-theme="<name>"]` on any container applies that set below it (shop pages later).
- `styles.css` is generated from the data or checked against it. The plan picks **checked**: a unit test proves every `THEMES.sage.{light,dark}` value equals the `:root` / `.dark` value. This adds no build step and no new runtime bytes.
- Contrast: `styles.tokens.test.ts` runs `PAIRS` (today's plus the spec's acceptance pairs) for every theme × mode in `THEMES`.
- Not now: account, shop or staff themes, any admin screen, any migration, any new string.

## 4. Cards, tiers, ribbons, invite

- Card types: regular, Featured and Premium per §7 (tint, frame, flag, tier word), by tokens `--tier-premium-*` / `--tier-featured-*`. `data-testid="listing-card-tier"` and `data-tier` stay. The flag carries the tier word as its accessible name (existing `tier.*` keys, no new string).
- Ribbon: the §8 geometry is kept exactly (INC-670/D220). The finish and palette come from the shared sprite (§2); the palette is picked by `listing.tier` and the mode.
- Invite card §9: tokens only.
- **Test seeding (G27):** e2e seeds scratch listings through the existing seed helpers with `tier: "premium" | "featured"` set by the service role on the backend under test. No real row, J3; afterEach destroys. No migration is needed (P-3).
- **The walk:** the operator marks two of his own preview listings, one Premium and one Featured, on staging only, with one SQL statement the supervisor writes. That is an operator step on ethio-staging, never ethio-prod. D242's control is not built here.

## 5. Open questions and their measurements

- Amharic tier word on the flag at ×1: an e2e at 1440/5-a-row, in `am`, measures the word's computed font-size and its box against the flag's body width. Fit-shrink is allowed down to 9 px; below 9 px is a STOP for a ruling.
- Raised Post listing disc (R6): an e2e at 360 and 390 measures the disc's box against the last feed card's box and the ad page's bottom action when scrolled to the end. If they overlap by more than 0 px, the decision goes to the operator with the screenshot numbers.
- "No longer available" at 3 a row: an e2e at 360/390 measures the ribbon text's scrollWidth against the band's inner width (already done for flat ribbons, INC-675). It must fit at `clamp(9px, 5cqw, 20px)`, otherwise it is a STOP.

## 6. The build, in ordered parts (one turn each at most)

Growth is first-download KiB per page (ESTIMATE). More than 1 KiB on any page, or growth with no named cause, is a STOP (DEC-296).

| Part | Builds | Files | Tests | Must not touch | Growth |
|---|---|---|---|---|---|
| S0 tokens + themes | New light tokens (§tokens), shadows retinted (R1), radii; `themes.ts`, schema, resolver; pre-paint script extended | `src/styles.css`, `src/lib/themes.ts`, `src/lib/schemas/theme.ts`, `src/lib/theme-resolver.ts`, `src/providers/theme-provider.tsx`, `src/routes/dev.style.tsx` | `styles.tokens.test.ts` per theme × mode with the spec pairs; resolver unit tests (order, unknown name, failed read); script test (legacy value); new census CF-LOOK-1 (no hex/rgb/arbitrary shadow in `src/**/*.tsx`, allowlist P-4) | Component class strings | +0.3 CSS, +0.15 JS (script) |
| S1 shell | Top band, logo, search pill, controls, Sign in; rail and strip tiles; menu rows' look; footer look; bottom bar | `app-shell.tsx`, `app-header.tsx`, `brand/logo.tsx`, `menu-row.ts`, `app-rail.tsx` (tile markup), `app-footer.tsx`, `bottom-bar.tsx`, `filter-choices.tsx` | Computed-style e2e `sage-shell.spec.ts` at 390/834/1440, both modes; existing CF-ROWS-1, CF-WIDTH-1, CF-BAR-1 green unchanged | Row heights, widths, spacing (D247–D257) | +0.3 |
| S2 bands + location track | D260 band look; the location track and its segments inside 40 px | `band-row.ts`, `location-selector.tsx`, `app-shell.tsx` (sub-band) | `sage-bands.spec.ts`; BND-E1…E4 unchanged; 360 no-wrap check | Band heights | +0.15 |
| S3 feed | Heading, gap, padding, card surface, body, price, Negotiable, place line | `feed.tsx`, `listing-card.tsx`, `surface.ts`, `listing-picture.tsx` (empty well) | `sage-cards.spec.ts`; LL-1 | One card size, `auto-rows-fr` | +0.15 |
| S4 tiers + ribbons | Shared sprite; flag; tier word; satin ribbon by tier and mode; invite card | `listing-card.tsx`, `listing-picture.tsx`, new `src/components/marketplace/sage-sprite.tsx`, `invite-card.tsx` | Seeded tier e2e (§4); §5 measures; ribbon geometry tests unchanged | Ribbon place, angle, size, words | +0.8 (the sprite, a named cause) |
| S5 ad page | §12 looks by tier; segmented section bar (R9); flag and ribbon corners | `listing-detail.tsx`, `photo-gallery.tsx`, `safety-box.tsx`, `ad-page/*`, `l.$slug.tsx` | `ad-page.spec.ts` placement tests unchanged; new `sage-ad-page.spec.ts` | DEC-200 placement | +0.2 (ad page only) |
| S6 overlays | §14 menus, dialogs, sheets, choice rows | the seven facade files' class strings | `primitives-law.spec.ts` and the overlay census unchanged; `sage-overlays.spec.ts` | Impl files, loader (DEC-259/260) | 0 first paint (on demand) |
| S7 dark set | §13 Sage dark tokens, tier dark values, card hairline | `src/styles.css` `.dark`, `src/lib/themes.ts` | Contrast for dark pairs; every `sage-*.spec.ts` in dark | — | +0.1 |

Every part: run `bun run checks` once on the final tree; run the changed and new specs whole on both projects with retries 0; update `docs/features/<name>.md` and add one `_changelog.md` line.

## 7. Tests that will change (G38), and new checks

- Any existing assertion of a value the spec changes is named in its part's report with its replacement, after a grep of the tests listed in §1 for that value. Expected so far: `house-style.spec.ts` (shadow and radius values), `layout.spec.ts` (card radius), `submenu-look.spec.ts` (row colours and selected look), `ad-page.spec.ts` (tab look under R9), `feed-screens.spec.ts` (tier pill → flag), and `e2e/helpers/colors.ts` (expected token colours). Each gets the new token value. No assertion is loosened.
- New: contrast per theme (S0, S7); LL-1 kept; CF-LOOK-1 (S0); a computed-style check per component at 390, 834 and 1440 px, light and dark (S1–S7); the spec's acceptance list mapped one line per check in the last part's report.

## 8. The walk

There is one walk at the end of S7, at 390, 834 and 1440 px and in dark mode, with the two staging listings from §4. The supervisor writes it at the close (G31).
