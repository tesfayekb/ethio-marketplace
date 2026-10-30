# Turn P1 — report

## Step 0

`docs/governance/briefs/foundations-turn-p1.md` sha256 `44dd8d9a6a80ef377676813bbe64e2ea9e813959cf5bab363e511501ea9f87eb` — matches the brief.

## CI line

Last completed run: 41096998961 on `8c48bb2a` — SUCCESS. Main was promoted. There was one flaky pass, BND-E1 (INC-1020).

## Step 3

All six data files in /tmp/p1 matched their FILE lines (sha256 and byte count).

## Step 4 — printed (all equal EXPECTED)

```
0bda02f25309c83f0906706b39ae9463f6486fc919e232dcc122624766802042 docs/governance/sage/sage-3d-style-change-spec.md
56cf94517f4cd0d67346773dc6b88852d0efe3f2eeab44c8c35b71cfad749af9 docs/governance/sage/README.md
3be8461ccf879fbeb55b7bdc201bd2c986223c7fd2c347dd27d073db2176b50a roadmap.md
baebf670c4a6dfadf46fa79ca7c25020ad6704f997006ad011e46c4185d0b9e1 docs/_changelog.md
```

INC-1019's format red is fixed: prettier `--check` passes on roadmap.md.

## Part B — INC-1020

In `e2e/shell-bands.spec.ts`, BND-E1 now waits for `panel-tabs` to be visible before it reads the band rows when signed in, at each width and fold state. No assertion changed (G38). The siblings were checked: BND-E2, BND-E3, BAR-E1 and FTE-E1 run signed out only, so none has the same read. Run: `bun run e2e:local -- e2e/shell-bands.spec.ts --retries=0` (both projects, the file whole) gave `8 skipped · 8 passed (52.2s)`. The skips are project-scoped by design.

## The plan

The plan is in `docs/governance/plans/redesign-part-2.md`. These are its parts. The growth figures are first-download KiB per page, as estimates:

- **S0, tokens and themes:** `styles.css`, `lib/themes.ts`, `lib/schemas/theme.ts`, `lib/theme-resolver.ts`, `theme-provider.tsx`, `dev.style.tsx`. Tests: contrast for each theme and mode, the resolver's tests, the script test, and CF-LOOK-1. About +0.45.
- **S1, the shell:** the top band, logo, rail and strip tiles, the footer look, the bottom bar. Test: `sage-shell.spec.ts`. About +0.3.
- **S2, the bands and location track (D258/D260):** `band-row.ts`, `location-selector.tsx`. Test: `sage-bands.spec.ts`. About +0.15.
- **S3, the feed and card surface:** Test: `sage-cards.spec.ts`, with LL-1. About +0.15.
- **S4, tiers, the shared ribbon/flag drawing, the invite card:** tests seed tiered listings, plus the measures of §5. About +0.8; the shared drawing is the named cause.
- **S5, the ad page:** Test: `sage-ad-page.spec.ts`. About +0.2, on the ad page only.
- **S6, menus and dialogs:** the facades only. Test: `sage-overlays.spec.ts`. 0 on the first paint.
- **S7, the Sage dark set:** About +0.1.

## Conflicts (item 2) and wrong premises

Conflicts, where a later decision governs the spec:

- §2 row sizes → D247/D248/D254.
- §2 padding → D258.
- §4 48/46 px → D258's 40 px (track 34 px, segments 28 px).
- §4 band → D260's one `--band-*` set through `band-row.ts`.
- §10 → its look only (D252/D253/D257).
- Home row and back item → the shared tile (D259/D255).
- §8 one SVG per card → DEC-289's shared drawing (one sprite, one gradient for each palette, pearl-dark chosen by `.dark`).
- The spec's "dark keeps today's tokens" → R10's Sage dark set (S7).

Premises that were wrong or incomplete:

- **P-1:** a light/dark mechanism already exists (`theme-provider.tsx`, `THEME_INIT_SCRIPT`). D250 extends it rather than adding a second one.
- **P-2:** the language order (D239) lives in `src/i18n/provider.tsx`.
- **P-3:** the tier column and `ListingTier` already exist, so tests can seed tiers with no migration.
- **P-4:** two look values are written outside the tokens: `filter-choices.tsx:58` and `photo-editor.tsx:280`.

## Checks — last line

```
checks: 34 PASS · 0 FAIL · 21 NOT RUN · 948s
```

## K2

Look values written outside the tokens: `src/components/shell/filter-choices.tsx:58` and `src/features/posting/photo-editor.tsx:280`. They are reported here and not touched; Part S0 takes them.

## git diff --name-only d5b48d71

```
docs/_changelog.md
docs/governance/briefs/foundations-turn-p1.md
docs/governance/plans/redesign-part-2.md
docs/governance/reports/foundations-turn-p1.report.md
docs/governance/sage/README.md
docs/governance/sage/sage-3d-style-change-spec.md
e2e/shell-bands.spec.ts
roadmap.md
```
