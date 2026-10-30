# Turn SAGE-S1 plan — the shell in the Sage look (and S2: the band rows and the location track)

Base: dev 2a953151. No migration, no dependency, no string. Request sha256 db98ace5…6fd1 (to be saved with the build ruling).

## 0. CI first

The last completed run is 41106419359 on 50eb7468: SUCCESS. The run on 2a953151 is still in progress. If it finishes red, the build turn fixes it first, from the failure body.

## 1. Premises for a ruling (before the parts that depend on them)

These spec targets need a value S0 did not define. None will be written as a literal; each waits for a ruling (a new token in styles.css + themes.ts, or reuse of the named one).

| # | Target (spec) | Need | Proposed |
|---|---|---|---|
| P-S1 | Selected menu row text #17503A (§2) | a nav ink token | new `--nav-ink` (#17503A light, dark from §13); not `--tier-featured-ink`, which is a tier colour of the same value |
| P-S2 | Logo inner diamond #E0B05A (§1) | light gold is #C98A2B | new `--logo-gold`, or keep `fill-gold` |
| P-S3 | Bottom-bar current pill #E3F1EA + inset shadow (§11) | fill and shadow | new `--nav-pill` + `--lift-pill` |
| P-S4 | Post listing disc: extra shadow and a 4 px white ring (§11) | shadow | new `--lift-disc` (ring as part of the shadow) |
| P-S5 | filter-choices chosen pill inset edge (CF-LOOK-1 line) | the allowlist line says a token "beside --shadow-tile-on" | reuse `shadow-tile-on` (same family) — or a new token |
| P-S6 | Phone menu end corner (app-rail.tsx:1135, 16 px today) | the allowlist line names `--radius-bar` (18 px) | `rounded-e-bar` (16 → 18 px) |
| P-S7 | Panel header (the menu's band, D258) | D260 names three rows; the panel header is a fourth band row | the band surface too (`--band` already equals `--sidebar`); §2's 12 px bold uppercase label |

## 2. Census at 2a953151 (today → target → S0 token)

**Top band (§1)**
- `app-shell.tsx:984` shell-band `bg-card shadow-bar` → `shadow-band`.
- `brand/logo.tsx:25,32,39` diamond `fill-none stroke-primary` → filled `fill-primary`, chevrons `stroke-primary-foreground`; `:45` `fill-gold` (P-S2). Wordmark `:76–78` `text-primary` → `text-foreground` with weight 800 and −0.6 px tracking; the dot stays `text-gold`. `:90` sub-line `text-muted-foreground font-medium` → `text-leaf-ink font-semibold`.
- Search `app-header.tsx:63` (phone row) and `:174` (inline): `rounded-md border border-input bg-background` → `rounded-full bg-field shadow-field`, no border. Icon `:53,:168` `text-muted-foreground` → `text-leaf-ink`. Text 15 px inline; the phone row stays ≥16 px (INC-747).
- Controls: `ICON_BUTTON` `app-header.tsx:23` (ghost, `rounded-md`), the account trigger `:221`, the menu toggle `:123`, `theme-toggle.tsx`, the language control → `bg-card border border-hairline shadow-control rounded-[var(--radius)]` (12 px, through the `rounded-lg`/`--radius` scale), `text-foreground`; globe `text-leaf-ink`.
- Sign in (primary Button): 12 px radius, semibold, `shadow-button`.

**Rail and menus (§2, §3)**
- Rail surface `app-rail.tsx:1078` `bg-sidebar shadow-side` → `shadow-rail` (widths unchanged, MENU_WIDTH).
- Strip `:1103` and phone menu `:1135` `bg-sidebar shadow-side` / `shadow-lg` → `shadow-rail-phone`; `:1135` corner P-S6.
- Side panel `ui/submenu-impl.tsx:398` `bg-sidebar shadow-side` → `shadow-rail` (D248: panels match the rail).
- Rows `menu-row.ts` ITEM_CORE `rounded-md` → `rounded-row` (14 px; `--radius-row` exists); ITEM_IDLE `hover:bg-sidebar-accent/60` → `hover:bg-card/70`; ITEM_ACTIVE `bg-nav-active text-primary` → `bg-card shadow-row-on` + P-S1 ink.
- Icons `app-rail.tsx:259–282, 556, 743` bare `h-5 w-5` / `h-6 w-6` → a round tile: `bg-card border border-hairline shadow-tile`, 30 px (rail) / 28 px (strip), icon `text-primary` 16 / 15 px; selected tile `bg-primary text-primary-foreground shadow-tile-on`. One shared constant in menu-row.ts (`ITEM_TILE`, `ITEM_TILE_ON`), read by the rail, strip, phone menu, side panels, D259 "Home" and D255 back item. The favourite star stays on the tile's corner.
- Panel header `panel-header.tsx:33` `bg-sidebar-accent/40` → P-S7.

**Footer (§10)** `app-footer.tsx:37` `bg-card shadow-bar-up` → `bg-sidebar shadow-footer`; the copyright divider `border-t` → `shadow-groove-top`; the wordmark as the logo. Place and insets stay D252/D253/D257.

**Bottom bar (§11)** `bottom-bar.tsx:81` `rounded-t-[1rem] bg-card shadow-bar-up` → `rounded-t-bar` (18 px) `shadow-bar-up` (already Sage); pill `:44` `bg-nav-active` → P-S3; Post disc 36 → 40 px, raised 14 px, P-S4.

**S2 — band rows (§4, D260)**
- Panel tabs `panel-tabs.tsx:40` `border-b border-neutral-soft bg-card`.
- Breadcrumb `app-shell.tsx:1055` `border-b border-neutral-soft` (surface from the subband `:1048` `bg-card shadow-bar`).
- Location row `location-selector.tsx:233` `bg-card shadow-bar`, no edge.
- **The row that differs today:** the location row (shadow, no edge) against the two subband rows (border line, no own shadow); the panel header differs again (`bg-sidebar-accent/40`).
- Target: the subband and the location row get `bg-band shadow-subband`; each row's line is `shadow-groove` (the edge from `--band-edge`); labels `text-band-label`.
- Track: Pickers (`location-selector.tsx:56–97`, `h-8 rounded-md` ghost buttons) sit in one `bg-track shadow-track rounded-track` track with a decorative pin (`text-primary`, aria-hidden). Segments `rounded-segment`; the deepest chosen level is raised `bg-card shadow-segment` + P-S1 ink; unset levels transparent.

## 3. What does not move

The heights, widths and spacing of D247–D258: `menu-row.ts` sizes (ITEM_CORE min/max heights, `--rail-pad`), `.menu-fit`/`.menu-snap`, `band-row.ts` BAND_ROW (40 px), `bar-spacing.ts`, `menu-width.ts`. CF-ROWS-1, CF-WIDTH-1, CF-BAR-1, CF-BAND-1, CF-SUB-1 stay green unchanged; BND-E1…E4 unchanged. Spec numbers that give way: §2's 42 px rows, 11 px gap, 3 px row gap and 14 px 10 px rail padding (D247/D248/D254/D258); §4's 48/46 px location row (D258: 40 px).

## 4. The location track inside 40 px (S2)

Track 34 px (3 px padding), segments 28 px, text 13 px (12 px under 768 px), segment padding 0 10 px (0 5 px phone). Proof: SGB spec at 360 px in English and Amharic, with the deepest chain chosen: the row's height stays 40 px, every segment is on one line (`scrollHeight` equals its height), and nothing overflows the row (the existing CutText truncation holds).

## 5. CF-LOOK-1 lines retired

- `bottom-bar.tsx` (1) → `rounded-t-bar` (`--radius-bar`). S1.
- `app-rail.tsx` (1) → `rounded-e-bar` (P-S6). S1.
- `filter-choices.tsx` (1) → P-S5 token. S1.
- `photo-background.ts` stays; its reason is updated (ruling A).
- No other shell site was found by the census. `drawer.tsx` stays for S6.

## 6. Rulings A and C (in S1)

- A: light `--background` becomes #EEF3EF in `styles.css` and `themes.ts` (TH-2 holds); the contrast run includes it. PBG-1 (`photo-background.test.ts`) changes under G38: old — `PHOTO_BACKDROP` equals the `--background` token; new — it equals #F3F5F8 (D155) and is not read from a token. Allowlist line for `photo-background.ts`: reason "D155: one backdrop for old and new photos, fixed apart from the page tone". This test file and the allowlist reason are in S1's list.
- C: `docs/features/design-foundation.md`'s "coffee on cool slate" section is headed as superseded by the Sage section.

## 7. Tests

- New `e2e/sage-shell.spec.ts` (ids SGS-1…, grep-checked free) at 390, 834, 1440 px, light and dark: computed box-shadow, background, radius and border of the band, search, controls, Sign in, rail/strip/phone menu, a row and its tile (idle, selected), footer, bottom bar and the Post disc. Values are read from the theme data, never retyped.
- New `e2e/sage-bands.spec.ts` (ids SGB-1…, free) with S2: the three band rows' surface, edge and shadow are equal, light and dark; the track geometry and the 360 px no-wrap proof (§4).
- CF-BAND-1 extended (S2): a band row carrying its own surface, edge or shadow class is refused; planted self-test.
- Unit: menu-row tile constants read by every menu (extends CF-ROWS-1's census, no second guard); contrast pairs for any new token from §1.
- G38 changes (old → new):
  - `shell.spec.ts:224` LB-1 bottom-bar corner `16px` → `18px`.
  - `submenu-look.spec.ts` SMN-E7 row classes `rounded-md` → `rounded-row`; `hover:bg-sidebar-accent/60` → `hover:bg-card/70`.
  - `photo-background.test.ts` PBG-1 (ruling A).
  - With S2: any LB-1 location-row line whose value changes (its "box-shadow not none" holds).
- Runs: the touched specs whole, both projects, retries 0, via `bun run e2e:local`; by-id runs of every test using a changed helper.

## 8. One turn or two (ruling 5)

Two turns.
- **S1** (ESTIMATE about 3–4 hours of platform time): the tokens P-S1…P-S7 as ruled; logo, app-header, theme-toggle, the language control, app-rail, menu-row, submenu-impl, panel-header, app-footer, bottom-bar, filter-choices; rulings A and C; sage-shell.spec.ts; the G38 edits; the CF-LOOK-1 allowlist.
- **S2** (ESTIMATE about 2–3 hours): band-row.ts (adds the band look constant), panel-tabs, app-shell (subband and breadcrumb), location-selector (track and segments); the CF-BAND-1 extension; sage-bands.spec.ts.

Reason: S1 touches every page's shell, including a 1,200-line rail. S2's track change and its Amharic proof are a clean separate unit. If S1 ends early, S2 can follow under the same ruling.

## 9. Growth (ESTIMATE, ruling B)

- JS first download, every page: +0.2 to +0.5 KiB. Cause: longer class strings in the shell (tiles, controls) and the logo's filled paths. S2 adds +0.1 to +0.3 KiB (track markup).
- Stylesheet: +0.3 to +0.6 KiB, against 40 KiB. Cause: the new utilities and P-S tokens.
- Entry margin (0.1 KiB at 207.9 of 208): S1 will cross it. The plan is a **raise of the entry ceiling 208 → 209 KiB**, citing the Sage shell classes, plus any NEAR-band page raised by its own named cause. A trim is taken only if the build finds one in the shell's own code.
- A page whose JS grows by more than 1 KiB, or growth without a named cause, is a STOP.

## 10. Conflicts with Knowledge, AGENTS.md or the brief

- None blocking. Spec numbers that D247–D258 override are listed in §3.
- Spec §1 asks for a 15 px inline search text. The phone row stays ≥16 px under INC-747 and the phone-field memory rule.
- The raised Post disc (R6) over the content above the bottom bar is an open spec question. S1 measures it at 390 px: it must not cover a tappable control, or S1 stops.

## Technical details

- Files S1: `src/styles.css`, `src/lib/themes.ts` (P-S tokens, ruling A), `src/styles.tokens.test.ts`, `src/components/brand/logo.tsx`, `src/components/shell/{app-header,theme-toggle,app-rail,menu-row,panel-header,app-footer,bottom-bar,filter-choices}.tsx|ts`, the language control's file, `src/components/ui/submenu-impl.tsx`, `src/components/app-shell.tsx` (the shell-band line only), `src/features/posting/photo-background.test.ts`, `scripts/conformance/look-values-allowlist.txt`, `e2e/sage-shell.spec.ts`, `e2e/shell.spec.ts`, `e2e/submenu-look.spec.ts`, `scripts/route-budgets.mjs` / `check-bundle-size.mjs` (entry ceiling, named cause), docs (design-foundation.md, mechanisms register row 81, one changelog line).
- Files S2: `src/components/shell/{band-row,panel-tabs,location-selector}.ts(x)`, `src/components/app-shell.tsx` (subband and breadcrumb), `scripts/conformance/shell-bands.test.ts`, `e2e/sage-bands.spec.ts`, docs.
- Must not touch: heights and widths (menu-row sizes, band-row height, bar-spacing, menu-width), routes, strings, i18n files, migrations.
