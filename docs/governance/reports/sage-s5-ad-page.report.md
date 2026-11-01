# Turn SAGE-S5 — the ad page in the Sage look, by tier — report

Base: e3a6dfd22 · Final commit: 1b67bf8f5 · Brief: docs/governance/briefs/sage-s5-ad-page.md (no sha256 given)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on 1b67bf8

CI on the base: `e3a6dfd` **SUCCESS** (run 41318529337, completed 2026-11-01T15:16:02Z; see
section 11). `origin/dev` did not move during the turn (`git rev-parse origin/dev` =
`e3a6dfd22a19…` at the start and again before THE CHECKS), so no anchor went stale.

## 1. Done / not done, by part and step

The plan was approved by ruling 1 ("Approved with these answers; one pull request in your order"),
saved word for word as `docs/governance/briefs/sage-s5-ad-page.ruling-1.md`. Every part is done.

- **A — the task saved** (`156ac1a37`): the brief and ruling 1, roadmap line 3.
- **B — the section bar's offset onto visible-area.ts** (`35272a7e0`, ruling 1 answer 2):
  `visibleArea(margin)` and `watchChromeTop(onTop)` (the top chrome's bottom edge, told again on
  every resize, stopped by its return); `listing-detail.tsx`'s own sub-band reader is gone, and the
  bar loads the module through `loadOnce` only once the bar shows (`showSections`), so the preview
  pages never download it. A failed download is logged through `logOnDemandFailure` and the bar
  keeps the stylesheet's `8.5rem`. CF-AREA-1 gains VA-5 (a sticky band's own read) and VA-6 (a
  fetch of the module outside `AREA_ON_DEMAND`).
- **C — the tier to the buyer's view** (`c127772ea`, answer 1): `tierOf` (card-tier.ts) reads the
  public document's tier; `adPageView` carries it; anything unknown is `null` (the free look, no
  `data-tier`).
- **D — tokens, light and dark** (`58f802b4d`, answer 6): `--tier-premium-ring`,
  `--tier-featured-ring`, `--tier-premium-edge`, `--lift-contact-premium`, `--lift-arrow`,
  `--box-radius(-md)`, `--bar-radius(-md)`, `--radius-thumb`; THEMES and the theme schema mirror them;
  six new contrast pairs in `styles.tokens.test.ts`.
- **E — the mechanisms** (`45686917b`, answers 3 and 5): `adPageLookOf(tier)`, `TierFlag on="photo"`,
  `TierTag`, `PhotoRibbon` and ListingPicture's `corner`, `BAND_TAB` / `BAND_TAB_IDLE` /
  `BAND_TAB_CURRENT` (= `CURRENT_PILL`; the stale band-row.ts comment corrected),
  `NegotiableBadge`'s `tone`; CF-TIER-1/2 widened to the ring, chip and contact classes and the
  page's tier marks.
- **F — the page** (`84d55859b`): listing-detail.tsx and photo-gallery.tsx read `adPageLookOf`; the
  title box is the one tinted box; every other box white on the tier's frame; the accents, Show
  contact, the chips, rules and edges by tier; the safety box unchanged; the flag and tag are slots
  that only `/l/$slug` fills; the segmented bar; the map well (answer 4d); `ShareAd`'s `ink`.
  CF-BAND-1 holds the section bar to the band's tab constants.
- **G — the browser spec** (`025c4e1a2`): `e2e/sage-ad-page.spec.ts` SAP-1 at 390, 834 and 1440,
  light and dark, for a free, a Premium and a Featured ad; its area in `scripts/e2e-select.ts`.
- **H — ceilings and docs** (`458a84747`, answer 7): eleven ceilings raised by DEC-296's form, each
  line naming its cause; design-foundation's S5 section; register rows 81, 85 and 90; the
  changelog line; the roadmap's S5 line ticked.
- **THE CHECKS fix** (`1b67bf8f5`): the string scan read `title="Scratch ad"` as a literal JSX
  attribute in the new unit test; the test's page became one fixture object.

Left for a later turn (ruling 1, answer 1), each drawing the free look because it passes no tier:
- the seller's own ad: `src/features/my-listings/my-listing-page.tsx:624` (its `my_listing` read,
  `my-listing.ts:77–78`, carries no tier; the SQL behind it,
  `supabase/migrations/20261017060602…sql:338`, returns none);
- the wizard's Review preview: `src/features/posting/step-review.tsx:699` (`readDraft`,
  `posting-service.ts:376`);
- staff's Screening preview: `src/features/admin-screening/screening-page.tsx:692`;
- staff's listing page: `src/features/admin-listings/listing-page.tsx:492` (it holds the tier at
  `use-admin-listing.ts:115` and shows it as a Badge at `:418`).

D-item for the operator (answer 4b): Show contact keeps its size and width; its full-width 48 px
form from §12 waits on a ruling.

## 2. Files changed

`git diff --name-only e3a6dfd22..HEAD` (37 files):

```
docs/_changelog.md
docs/features/design-foundation.md
docs/governance/briefs/sage-s5-ad-page.md
docs/governance/briefs/sage-s5-ad-page.ruling-1.md
docs/governance/mechanisms.md
e2e/helpers/sage-look.ts
e2e/sage-ad-page.spec.ts
roadmap.md
scripts/conformance/card-tiers.test.ts
scripts/conformance/shell-bands.test.ts
scripts/conformance/visible-area.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/marketplace/card-tier.test.ts
src/components/marketplace/card-tier.ts
src/components/marketplace/listing-picture.test.tsx
src/components/marketplace/listing-picture.tsx
src/components/marketplace/negotiable-badge.test.tsx
src/components/marketplace/negotiable-badge.tsx
src/components/marketplace/tier-flag.test.tsx
src/components/marketplace/tier-flag.tsx
src/components/shell/band-row.ts
src/features/ad-page/public-listing.test.ts
src/features/ad-page/public-listing.ts
src/features/ad-page/share-ad.test.tsx
src/features/ad-page/share-ad.tsx
src/features/posting/preview/listing-detail-tier.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/photo-gallery.test.tsx
src/features/posting/preview/photo-gallery.tsx
src/lib/schemas/theme.ts
src/lib/themes.ts
src/lib/visible-area.test.ts
src/lib/visible-area.ts
src/routes/l.$slug.tsx
src/styles.css
src/styles.tokens.test.ts
```

New files (`git ls-files` lists each): `docs/governance/briefs/sage-s5-ad-page.md`,
`docs/governance/briefs/sage-s5-ad-page.ruling-1.md`, `e2e/helpers/sage-look.ts`,
`e2e/sage-ad-page.spec.ts`, `src/components/marketplace/negotiable-badge.test.tsx`,
`src/features/posting/preview/listing-detail-tier.test.tsx`. No file deleted.

`share-ad.tsx` is plan item 8 (approved by ruling 1); `negotiable-badge.tsx` is answer 5;
`e2e/helpers/sage-look.ts` is a departure (section 10).

## 3. Behaviour contract

| Surface | At e3a6dfd22 | Now |
|---|---|---|
| `adPageView` (public-listing.ts) | no tier | `tier: tierOf(doc.tier)`: "premium" / "featured" / "regular", anything else `null` |
| `ListingDetail` props | — | optional `tier`, `tierFlag`, `tierTag`; absent = today's free look; every existing caller passes none |
| `<article data-testid="listing-detail">` | no `data-tier` | `data-tier` only when the tier is known |
| The buyer's page, regular or unknown tier | white boxes, `text-primary` accents, green Show contact, underline tabs, the title 20/24 px semibold | white boxes on the Sage frame and radii (16 / 20 px boxes, 12 / 14 px bar, 14 px photo well, 6 px thumbnails), the same green accents and Show contact, the segmented bar with the band's pill, the title 21/27 px extrabold, the price 24/30 px extrabold |
| Premium / Featured | as regular | the title box tinted and framed; the other boxes white on the tier's frame; Premium's accents gold-ink and Show contact gold; Featured's accents green; the flag on the main photo, the tag above the title, the ribbon in the tier's palette |
| The safety box | white, the card's lift, the gold edge | unchanged at every tier |
| The section bar's sticky offset | the sub-band's own `top + height`, read by the page | `watchChromeTop`: the bottom of every `data-chrome="top"` marker, margin 0, loaded on demand; the stylesheet's `8.5rem` until it answers (AP-37 measures it, green locally) |
| The seller's page, the wizard's preview, staff's previews | — | the free look above (no tier passed), no flag or tag, no on-demand watcher unless the bar shows |
| `ShareAd` | ghost opener `text-primary` | `ink` prop, default `text-primary` |
| `NegotiableBadge` | fixed colours | `tone` replaces the colours; default unchanged |
| `ListingPicture` | — | optional `corner`, drawn on the box outside the clip; default unchanged |

No route, door, string, server answer or database read changed (`git diff --name-only
e3a6dfd22..HEAD -- src/server src/routes/api supabase` is empty).

## 4. Censuses

- The section bar's own chrome read: `rg -n "shell-subband" src --glob '!*.test.*'` → only
  `src/components/app-shell.tsx:1070` (the marker itself) and `src/styles.css:44`; the shell's own
  stuck-state reader at `src/components/app-shell.tsx:591` is K2 (section 6).
- Tier comparisons and tier classes outside card-tier.ts / tier-flag.tsx: CF-TIER-1 on the tree
  (green), with the widened pattern; the one allowlist line (`src/routes/dev.style.tsx`) still
  matches.
- The tier's readers: `rg -n "<ListingDetail" src` → `src/routes/l.$slug.tsx:226` (passes the
  tier), `my-listing-page.tsx:624`, `listing-page.tsx:492`, `preview-sheet.tsx:53` (the wizard's
  Review and Screening previews draw through it) — the last three pass none (section 1).
- Private tier lists: `rg -n '"premium"' src` beyond card-tier.ts → `src/features/feed/feed-page.ts:87`
  and `src/features/admin-listings/use-admin-listings.ts:16` (K2).
- `CURRENT_PILL`'s readers (ruling 3): `rg -n "CURRENT_PILL" src` → the bottom bar, `PRESSED.barIcon`
  by value, and now `BAND_TAB_CURRENT`. The panel tabs (`panel-tabs.tsx:66`) read
  `BAND_SEGMENT` / `BAND_SEGMENT_CURRENT`, not `CURRENT_PILL`, so the comment names the three real
  readers rather than ruling 3's wording (section 10).

## 5. Tests

Added (ids checked unique by TI-1 in the laws run):
- unit: VA-U5, VA-U6; AV-11; CTR-4, CTR-5; TFL-5, TFL-6; LP-12, LP-13; NGB-1; SH-6; LD-25…LD-30
  (new file `listing-detail-tier.test.tsx`; `listing-detail.test.tsx` is over 1,000 lines);
  GAL-11…GAL-13; six contrast pairs in `styles.tokens.test.ts`'s `SAGE_PAIRS`;
- guards: VA-5, VA-6 (CF-AREA-1, planted); CF-TIER-2's planted list grows by the ring, chip and
  contact classes and a planted ad-page file; CF-BAND-1 "the ad page's section bar reads BAND_TAB
  and BAND_TAB_CURRENT; a private pill or underline fails (S5)" (planted);
- browser: SAP-1 in `e2e/sage-ad-page.spec.ts`.

Assertions that changed shape: CF-TIER-1/2's `TIER_CLASS` pattern (now the ring, chip, edge and
contact classes) and its tier-mark pattern (`listing-(?:card|detail)-tier`); CF-AREA-1's
`CHROME_READ` (adds `shell-band|shell-subband`) and VA-3's header; `card-tier.test.ts`'s token
reader (adds `ring-`). No existing assertion was loosened; ad-page.spec.ts is unchanged.

Red-first: none owed (new behaviour). The guards' new rules are each proven on a planted bypass.

Unit totals (THE CHECKS' component-tests job): `Tests  1 failed | 2608 passed (2609)` — the one is
NH-6 (section 12). Laws: `Tests  1 failed | 417 passed (418)`, the same NH-6.

`bun run typecheck`: exit 0.

THE CHECKS, second whole run on `1b67bf8f5`:
- fast line: `checks (fast): 17 PASS · 4 FAIL · 233s`
- last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 286s`
- the four FAILs, all this computer's limits (section 12): laws-first (NH-6), component-tests
  (NH-6), Workflow lint (actionlint is a Linux x64 binary), Secrets scan (gitleaks is a Linux x64
  ELF).
- The build-and-check steps skipped behind actionlint, run by hand: `bun run format:check` (all
  files use Prettier code style), `bun run lint` (0 errors, 46 warnings; the three in touched files
  sit on lines this turn did not change: listing-detail.tsx's react-refresh export and
  exhaustive-deps, share-ad.tsx's react-refresh export), `bun run scripts/e2e-select.ts --self-test`
  (OK), `check-root-routes.ts --self-test` and the check (OK).
- NOT RUN (30), as the runner names them: the install steps (dependencies already installed), the
  steps behind a failed step, dependency-audit (the advisory service is unreachable from here),
  e2e-preflight (staging credentials), the e2e merge and verdict (GitHub artifacts), promote (CI
  only), the SARIF upload (GitHub only).
- The first run had a fifth FAIL, the string scan (fixed in `1b67bf8f5`).
- bundle-budget passed: `0 NEAR, none grew` after the raises.

Browser (ethio-staging, `bun run e2e:local`, both projects, 0 retries):
- `e2e/sage-ad-page.spec.ts` whole: `6 skipped` · `6 passed (1.1m)`; 0 `[ssr-error]`. The six skips
  are by design: each width runs on its own pointer project.
- The specs that draw a changed screen or helper, in one run (ad-page, ad-page-layout,
  ad-page-doors, ad-page-routes, sage-tiers, dialogs, photo-pipeline, my-listings-ad,
  post-wizard-place, sage-bands, press): `7 failed` · `65 skipped` · `330 passed (25.6m)`; one
  `[ssr-error]`, on `/api/listings/view` (a view count posted for a scratch ad already reaped: the
  `listing_counters` foreign key). The seven:
  - AP-22 (mobile; the signed-in marker after a session injection) and PS-4 (mobile, light; the
    box moved by a scroll between reads) passed when re-run once by id (`--grep`), so they were
    flaky;
  - AP-19 (mobile): `read ETIMEDOUT` fetching the photo from staging's storage, a network failure;
  - MLA-13 (both projects): `Expected: 90 · Received: 90100`. The spec selects the price with
    `Control+A` (`e2e/my-listings-ad.spec.ts:1008`, `:1024`, `:1044`), which on macOS does not
    select all; `:170` of the same spec uses `ControlOrMeta+A`. A Mac limit, not this turn's code;
  - PP-8 (both projects, and again on the re-run): a photo object still found in staging's storage
    after DELETE. This turn changes no server, route or storage file and staging's migrations match
    (the preflight's parity line), so the cause is not this turn's. CI's temporary backend is the
    judge.
- Re-run of the three by id: `2 failed` · `6 passed (30.9s)` (PP-8 on both projects); 0
  `[ssr-error]`.

J-audit (e2e/** changed): scratch rows only, through `adPageFixtures` and reaped in `afterEach`
(J1, J3); one leased buyer and the scratch seller (J9, two pooled accounts); locators by test id
and attribute, `getByTestId(...).getByTestId(...)` for the ribbon's caps (J5); no `.first()`,
`waitForTimeout` or `test.only`; boxes read together through `layoutBoxes`, `settled(page)` before
the segment's style is read (the pointer moved away first, so a ghost's hover fill is not read);
seed before navigate (J7).

## 6. K2 — siblings that bypass the mechanism

Greps run: `rg -n "shell-subband|subbandRef" src`, `rg -n '"premium"' src`, `rg -n "as unknown as"
src/server/ad-page.ts`, `rg -n "<ListingDetail" src`, `rg -n "^async function (resolvedIn|tokenStyle|style|liftOf|contrast|setMode)" e2e`.

- `src/components/app-shell.tsx:591`: the shell's stuck-state reader computes the sub-band's edge
  itself (`getComputedStyle(sticky).top + offsetHeight`), a later consumer of `watchChromeTop`.
- `src/server/ad-page.ts:34`: `data as unknown as PublicListingDoc`, a typed parse later.
- `src/features/feed/feed-page.ts:87`: a private tier list beside `CARD_TIERS`.
- `src/features/admin-listings/use-admin-listings.ts:16`: `LISTING_TIERS`, another private tier list.
- `src/features/admin-listings/listing-page.tsx:492`: holds the tier and does not pass it (the staff
  turn).
- `src/features/posting/preview/listing-detail.tsx`: 1,537 lines (`wc -l`); a split in its own turn.
- `e2e/ad-page.spec.ts`: 39 tests (`rg -c "^\s+test\("`; the ruling's 41 counted two regex `.test()`
  calls), over the ~25 a spec should carry; a split in its own turn.
- `e2e/sage-tiers.spec.ts:62–101` and `:344`: its own `resolvedIn`, `tokenStyle`, `style`, `liftOf`,
  `contrast` and `setMode`, the same functions `e2e/helpers/sage-look.ts` now shares; moving them is
  a spec change the brief did not enumerate (rule 20), so it waits.
- `e2e/my-listings-ad.spec.ts:1008`, `:1024`, `:1044`: `Control+A` where `:170` uses
  `ControlOrMeta+A` (found by the browser check; not in scope).

## 7. Allowlists and guards

- `card-tiers-allowlist.txt`: 1 → 1 (`src/routes/dev.style.tsx`, still matching).
- `visible-area-allowlist.txt`: 0 → 0. `AREA_ON_DEMAND` names `listing-detail.tsx` in the guard
  itself.
- `look-values-allowlist.txt`: 10 → 10.
- No new allowlist line. The guards extended (CF-AREA-1, CF-TIER-1/2, CF-BAND-1) are discovered by
  `test:unit`'s `scripts/**/*.test.ts`. Each new rule is proven on a planted bypass in its own test.
  The laws run (`bunx vitest run scripts --maxWorkers=2`) shows 417 of 418 passing (NH-6 aside).

## 8. Strings

None. No key was added or changed, and the i18n usage maps match the tree (i18n-usage-map: PASS).

## 9. Migrations

None.

## 10. Departures

- `e2e/helpers/sage-look.ts` (new helper, not named by the plan): the token, style, lift, contrast
  and mode readers SAP-1 needs, shared rather than copied a second time into a spec;
  `sage-tiers.spec.ts` keeps its own copies (K2).
- Ruling 3's wording: the panel tabs do not read `CURRENT_PILL`
  (`src/components/shell/panel-tabs.tsx:66` reads `BAND_SEGMENT` / `BAND_SEGMENT_CURRENT`), so
  band-row.ts's comment names the three readers there are: the bottom bar, `PRESSED.barIcon` by
  value, and the section bar via `BAND_TAB_CURRENT`.
- `--lift-contact-premium` holds the button's own bevel (the two inset lines of `--lift-button`)
  with a gold drop, so a Premium Show contact keeps the pressed-button shape and only its colour and
  drop change (answer 4b); light drop `oklch(0.681 0.13 72.5 / 0.45)`, dark `oklch(0 0 0 / 0.45)`.
- The seller box's contact list keeps `divide-border` at every tier (its rows are the seller's own
  channels on white; §12 names no tier divider there). MINOR.
- The section bar's offset reads every `data-chrome="top"` marker with margin 0, not the sub-band
  alone: the one visible-area reader (CONCERN 2). AP-37 (|bar − band| ≤ 8 px) passed in the browser
  check.
- The map well is an `aria-hidden`, pointer-less overlay reusing `STILL_MAP_BOX` with the field's
  inset lift (answer 4d); no inner padding on the segmented bar (answer 4c); no initials disc
  (answer 4a).

Self-review (80-review.mdc, read on `1b67bf8`): no BLOCKER, no MAJOR; MINOR: the untiered contact
divide, the duplicated e2e helpers in sage-tiers.spec.ts (K2), and ruling 3's premise (above).

## 11. CI

The base, read at the start and again before THE CHECKS
(`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `e3a6dfd22a19e15bbfd386d68e7b478a6af98f72` (short `e3a6dfd`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-01T15:16:02Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41318529337
```

Two-step check: SUCCESS, and the reported commit is the base. No earlier turn's red to fix.

The flake ledger, read whole: three tests have three or more lines in the last seven days, and none
has an incident covering those lines:
- ODE-1 (on-demand-failure.spec.ts): 5 lines;
- AP-36 (ad-page.spec.ts): 4 lines, on 2026-10-26 and 2026-10-27 (INC-710 and INC-728 are from
  2026-10-17/18);
- "the bar and the band stay while the page scrolls" (shell.spec.ts): 3 lines.

The pull request's own runs: none yet. This section is brought up to date in the same commit as any
fix made while waiting.

## 12. Limits

- NH-6 (`scripts/ci/nightly-hour.test.ts`) fails on this Mac: its `date` ignores `TZDIR`. It fails
  on the base too; Linux CI runs it.
- actionlint and gitleaks are pinned Linux x64 binaries and cannot run on macOS arm64 (the gitleaks
  file is an x86-64 ELF). CI's Workflow lint and Secrets scan are the judges. I read every commit's
  staged diff for secrets by hand before committing.
- dependency-audit and e2e-preflight cannot run from here (the runner's reasons above). The
  browser runs' own preflight printed migration parity OK with staging.
- The browser runs needed `PLAYWRIGHT_BROWSERS_PATH` unset: this shell points it at an empty cache,
  and Chromium 1208 is installed in Playwright's default cache.
- MLA-13 and PP-8 fail locally for the reasons in section 5; CI on the temporary backend judges
  them.
- Rendered-output acceptance is the operator's walk.
