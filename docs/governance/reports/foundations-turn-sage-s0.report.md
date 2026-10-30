# Turn SAGE-S0 — report

Ruling: docs/governance/briefs/foundations-turn-sage-s0.md. Base: dev 50eb7468.

## 1. Step 0

sha256 of the saved ruling: `6817fd2516fe84b26e6a002a322921f101aa1b84d8cced4454c43d3c73bfaa83` — equals the value after END.

## 2. CI read first

Run 41106419359 on 50eb7468: SUCCESS, 0 flaky, main promoted; guards-last-failure and e2e-last-failure clean (0 off-allowlist server errors). No red to classify.

## 3. Census

- Token module: `src/styles.css` (`:root`, `.dark`, `@theme inline`); contrast test `src/styles.tokens.test.ts`; fixture page `src/routes/dev.style.tsx`; the dark switch `src/providers/theme-provider.tsx` (`THEME_INIT_SCRIPT`, `ethio.theme`), its one caller `src/routes/__root.tsx` :26 (import) and :380 (inline) — unchanged; no other reader of `ethio.theme`.
- Language mechanism followed by the resolver: `src/i18n/provider.tsx` (D239, DEC-287) — a failed account read is unknown, the device's value stands.
- Tests asserting a look value: `e2e/feed-screens.spec.ts` FS-16 (card radius; changed, §5); `e2e/shell.spec.ts` (bottom radius 16 px, shadows present — unchanged values); `e2e/post-wizard-specs.spec.ts` RGB checks are product swatches, not tokens; `src/features/posting/photo-background.test.ts` PBG-1 pins the photo backdrop to `--background` (see Limits).
- CF-LOOK-1 (ruling 4): 15 files, 54 findings, every one an allowlist line `file (count) | reason | until` in `scripts/conformance/look-values-allowlist.txt`:
  - fixed by a later Sage part (until DEC-289): app-rail.tsx (1, S1), bottom-bar.tsx (1, S1), filter-choices.tsx (1, S1), drawer.tsx (1, S6);
  - lasting exceptions (review 2027-04-30): chart.tsx (7), sidebar.tsx (2), category-image-variants.ts (1), colour-swatches.ts (19), map/leaflet.ts (1), photo-background.ts (1), photo-editor.tsx (1), step-specifications.tsx (1), brand-mark.ts (1), error-page.ts (11), server/ai/tasks.ts (5).
  - `src/lib/themes.ts` is token data by definition and is held equal to the stylesheet by TH-2, so the census does not read it.

## 4. What is true at the end

- Sage light set and Sage dark set (§13) in `src/styles.css`, oklch, registered in `@theme inline`: surfaces (`--hairline`, `--field`, `--track`, `--photo-empty`, `--leaf-ink`), tiers (`--tier-premium-*`, `--tier-featured-*`), the D260 band set, 24 light / 22 dark `--lift-*` shadows (dark cards keep one lift at every width), radii (controls 12 px, cards 12/14/20 px). No component reads the new tokens yet. Tests: styles.tokens.test.ts.
- `THEMES = { sage: { light, dark } }`, `DEFAULT_THEME = "sage"` in `src/lib/themes.ts`; strict shape in `src/lib/schemas/theme.ts`. Tests: themes.test.ts TH-1 (default, equal to the resolver's), TH-2 (every value equals `:root` / `.dark`, both ways), TH-3 (every set parses; raw CSS refused). The shape runs in tests only, so the browser carries no validator.
- Resolver `src/lib/theme-resolver.ts`: shop → account → device → system; unknown, removed and malformed names fall through; a failed account read keeps the device's value. Tests: theme-resolver.test.ts.
- Pre-paint script stores `{name, mode}` in `ethio.theme`; a bare legacy `light`/`dark` reads as sage; writes `data-theme`, `data-mode`, `.dark`. Tests: theme-provider.test.ts (legacy, malformed, parity with the resolver), pre-paint-scripts.test.ts.
- Contrast (WCAG 2.2 AA, 4.5 : 1): today's pairs + the spec's acceptance pairs, per theme × mode, plus the spec's literal pairs.
- `/dev/style`: a grid per theme × mode of fixture cards (regular, Featured, Premium) and the token swatches, fixture data only; theme data fetched on demand (`loadOnce`, failure via `reportOnDemandFailure`).
- CF-LOOK-1: `scripts/conformance/look-values.test.ts` (census + planted bypass), wired in `wired.test.ts`.

## 5. Tests changed under G38

- FS-16 (`e2e/feed-screens.spec.ts`): card corner `12px` → `12px` below 768 px, `14px` 768–1023 px, `20px` from 1024 px (spec § Radii). No assertion loosened.

Browser runs (`bun run e2e:local`, both projects, retries 0): house-style + feed-screens + phone-frame 56 passed, 10 skipped; after the last change, house-style + feed-screens 47 passed, 1 skipped.

## 6. Growth per page (JS first download, gzipped, against 50eb7468)

- Every page: +0.2 to +0.3 KiB (entry +267 B) — the pre-paint script's `{name, mode}` reading and the theme names.
- `/dev/style`: +0.994 KiB (242.6 → 243.6) — the fixture grid (ruling 1) + the entry's share; theme data (2.0 KiB) on demand. Ceiling 243 → 244 with that cause (DEC-296).
- CSS (one file, every page): 20.7 → 21.8 KiB (+1.1 KiB), ceiling 40 — the Sage light and dark token values. **For a ruling:** if the >1 KiB rule counts the stylesheet with the page, each page grows about +1.3 to +1.4 KiB.
- Entry JS total 207.9 / 208 KiB: 0.1 KiB margin left.

## 7. Unit count

See §8 (from the checks run).

## 8. Checks' last line

`checks: 34 PASS · 0 FAIL · 21 NOT RUN · 941s` (the first run failed TI-1 — TR-1…5 already used by admin-translations-console.spec.ts, renamed THR-1…5 — CF-NN-1 on two non-null assertions in themes.test.ts, removed, and the NEAR band on 11 pages at +0.2–0.3 KiB, each ceiling +1 KiB with its cause; then run again whole).

## 9. Limits and rulings owed

- PBG-1: the light `--background` stays #F3F5F8 (not Sage #EEF3EF), because `photo-background.ts` burns that tone into stored photos and PBG-1 pins the two together; both are outside this scope. Ruling owed.
- The i18n usage maps (`docs/generated/i18n-usage.json`, `public/i18n-usage.json`) were regenerated by the map guard because `/dev/style`'s lines moved; no string changed.

## 10. K2

- The brand green #1E5A43 appears twice: `src/lib/brand-mark.ts` and `src/server/ai/tasks.ts`.
- `design-foundation.md`'s older "coffee on cool slate" palette section still describes the pre-Sage values (left as history; the new section says what holds).

## 11. git diff --name-only 50eb7468

```text
docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/foundations-turn-sage-s0.md
docs/governance/mechanisms.md
docs/governance/reports/foundations-turn-sage-s0.report.md
e2e/feed-screens.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/look-values-allowlist.txt
scripts/conformance/look-values.test.ts
scripts/conformance/wired.test.ts
scripts/route-budgets.mjs
src/lib/schemas/theme.ts
src/lib/theme-resolver.test.ts
src/lib/theme-resolver.ts
src/lib/themes.test.ts
src/lib/themes.ts
src/providers/theme-provider.test.ts
src/providers/theme-provider.tsx
src/routes/dev.style.tsx
src/styles.css
src/styles.tokens.test.ts
```
