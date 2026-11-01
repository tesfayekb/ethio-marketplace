# Turn SAGE-S4: Premium and Featured cards, the status ribbon and the invite card — report

Base: 043f8aa9 · Final commit: f670aef8d · Brief: docs/governance/briefs/sage-s4-tiers.md (no sha256 given)
Review: READY · 0 BLOCKER · 0 MAJOR · 3 MINOR · on f670aef

CI on the base: `043f8aa` **SUCCESS** (run 41298434038, completed 2026-11-01T11:00:43Z, read at the
start of the turn; see section 11).

## 1. Done / not done, by part and step

Plan approved by ruling 1 ("build as one pull request in your order"); stop 1 answered by ruling 2
("continue"). Both rulings are saved word for word beside the brief
(`sage-s4-tiers.ruling-1.md`, `sage-s4-tiers.ruling-2.md`).

| Part | Commit | What |
| --- | --- | --- |
| task saved | `96e8a710e` | brief, roadmap line 3 |
| 1 | `4b597b95d` | ribbon, flag and invite tokens (light, dark, set once) in `themes.ts` / `styles.css`, and their grammar in `schemas/theme.ts` |
| 2 | `8e8261980` | the satin ribbon in CSS from tokens, its rolled caps; geometry in `ribbon-geometry.ts` (place, angle and size unchanged) |
| 3 | `a3c251c74` | the tier look from one mechanism (`card-tier.ts` `cardLookOf`, `tier-flag.tsx` `TierFlag` / `TierWord`) drawn by `ListingCard`; `NegotiableBadge` in its own module |
| stop 1 | `813f97313` | card pages grow more than 1 KiB → ruling 2 |
| ruling 2 | `06a4fba19` | saved; the bounded trim measured 0.10 KiB on `/` (under 0.3), so part 3 stays as committed |
| 4 | `3704bb83f` | the invite card in the Sage look |
| 5 | `2826cd632` | `/dev/style` draws the real `ListingCard` per tier with a ribbon, and the real `InviteCard`, in both modes |
| 6 | `248103f31` | CF-TIER-1…3 (the census, the planted bypasses, the build judge that the flag rides card pages only) |
| 7 | `b79bad55a` | `e2e/sage-tiers.spec.ts` STG-1…4, STG-6; the gloss and shade strips held inside the text's padding (RBN-7, RBN-8) |
| 8 | `f670aef8d` | ceilings by DEC-296 with their causes; design-foundation's S4 section, register row 90 (rows 24, 81 noted), changelog line, roadmap tick |

Steps: THE CHECKS done (section 5); THE BROWSER CHECK done (section 5); THE SELF-REVIEW done
(header line); this report. Nothing in the plan is left undone in this turn. Left for later turns
by ruling (section 10): the pearl satin on the ad page, the preview, the seller's own ad and the
wizard (S5, ruling 1 answer 5), and task D (one shared chunk, ruling 2 answer 4).

## 2. Files changed

`git diff --name-only 043f8aa9`:

```
docs/_changelog.md
docs/features/design-foundation.md
docs/generated/i18n-usage.json
docs/governance/briefs/sage-s4-tiers.md
docs/governance/briefs/sage-s4-tiers.ruling-1.md
docs/governance/briefs/sage-s4-tiers.ruling-2.md
docs/governance/mechanisms.md
docs/governance/reports/sage-s4-tiers.stop-1.md
e2e/sage-tiers.spec.ts
public/i18n-usage.json
roadmap.md
scripts/check-bundle-size.mjs
scripts/conformance/card-tiers-allowlist.txt
scripts/conformance/card-tiers.test.ts
scripts/conformance/wired.test.ts
scripts/e2e-select.ts
scripts/route-budgets.mjs
src/components/marketplace/card-tier.test.ts
src/components/marketplace/card-tier.ts
src/components/marketplace/invite-card.tsx
src/components/marketplace/listing-card.test.tsx
src/components/marketplace/listing-card.tsx
src/components/marketplace/listing-picture.tsx
src/components/marketplace/negotiable-badge.tsx
src/components/marketplace/ribbon-geometry.test.ts
src/components/marketplace/ribbon-geometry.ts
src/components/marketplace/tier-flag.test.tsx
src/components/marketplace/tier-flag.tsx
src/lib/schemas/theme.ts
src/lib/themes.test.ts
src/lib/themes.ts
src/routes/dev.style.tsx
src/styles.css
src/styles.tokens.test.ts
```

New files (14), each tracked (`git ls-files` returns all 14): `card-tier.ts`, `card-tier.test.ts`,
`tier-flag.tsx`, `tier-flag.test.tsx`, `negotiable-badge.tsx`, `ribbon-geometry.ts`,
`ribbon-geometry.test.ts` (under `src/components/marketplace/`); `scripts/conformance/card-tiers.test.ts`,
`scripts/conformance/card-tiers-allowlist.txt`; `e2e/sage-tiers.spec.ts`; the brief and its two
rulings; the stop-1 report. Every path is in SCOPE (`src/components/marketplace/` and tests;
`styles.css`, `themes.ts`, `schemas/theme.ts` and tests; `dev.style.tsx`; `scripts/conformance/`;
`route-budgets.mjs`, `check-bundle-size.mjs`, `e2e-select.ts`; `e2e/` sage-tiers) or the standing
allowance (the docs, briefs, reports, roadmap, i18n maps). No deletion. `AGENTS.md` untouched.

## 3. Behaviour contract — before → after

No route, door, server function, migration or string changed. Screens and functions:

| Touched | Base (043f8aa9) | Now |
| --- | --- | --- |
| `ListingCard` tier mark | a pill on the picture's corner (`listing-card-tier`, `bg-primary` / `bg-gold`, text `tier.premium` / `tier.featured`) | the mini flag (`TierFlag`, an SVG; same test id `listing-card-tier`, `data-tier`; its accessible name is the same translated key) plus the tier word with its stars beside the place (`listing-card-tier-word`, `aria-hidden`, the flag speaks) |
| `ListingCard` surface | `CARD_SURFACE` for every tier | regular unchanged; Premium / Featured take their fill, frame and glow, the place rule and ink from `cardLookOf` (tokens `tier-premium*`, `tier-featured*`) |
| `ListingCard` clip | the card clipped its children | the card no longer clips so the flag's fold and the ribbon's caps show; the picture keeps the card's top corners itself (`rounded-t-card`) |
| compact card place line | kept one line, empty without a place | reserves two lines on every compact card (ruling 1 answer 3), so grids with and without a paid card match |
| `ListingPicture` ribbon | flat gold band | satin band from tokens in the card's palette (`palette` prop: regular pearl, Premium gold, Featured sage; default pearl on every other caller), rolled caps beyond the right and bottom edges on a copy of the drawn frame; band place, angle, size and words unchanged (RBN-1) |
| photos-soon band | gold | the picture's palette like the status ribbons (D197 test re-pointed) |
| `InviteCard` | gold border, `bg-gold/15`, flat star disc, the sentence in body type | the gold border kept; fill `--invite` (light `#FFF8EC`, dark the Premium fill token, ruling 4); the card's lift; disc 24/36/46 px with the badge lift; sentence 12/13/18 px, display face at 700 on a wide card; button radius 10 px on a phone, 12 px from md |
| `NegotiableBadge` | defined in `listing-card.tsx` | identical markup in `negotiable-badge.tsx`, re-exported from `listing-card.tsx`; the five importers unchanged |
| theme schema | `MODED_TOKENS` / `MODE_FREE_TOKENS` | + 13 moded tokens (pearl ribbon, flag shade, invite), + 31 set-once tokens (gold and sage ribbons, gloss, flag body and stops); the `invite` token accepts a colour or a `var(--…)` reference, the set-once colours a colour (TH-5) |
| `/dev/style` Sage grid | three static cells drawn by hand (`CARD_TYPES`, "★★ PREMIUM" literal) | the real `ListingCard` per tier with a ribbon, and the real `InviteCard`, in both modes; cell ids `style-card-<tier>-<mode>` kept, `style-card-invite-<mode>` added |

## 4. Censuses

- CONCERN 1 (who draws a card's tier), by definition (`rg "tier ===|\.tier\b|listing-card-tier|tier-premium|tier-featured" src`):
  the one drawer is `ListingCard` (`src/components/marketplace/listing-card.tsx`), reached by the
  feed (`src/components/marketplace/feed.tsx`), category pages (the same feed), saved
  (`src/features/account/saved-page.tsx`), similar ads (`src/features/ad-page/similar-ads.tsx`) and
  the seller page (`src/features/seller/seller-page.tsx`). My listings draws status pills, not a
  tier (K2). After the change, CF-TIER-1 finds no other drawer (its allowlist holds the D262
  candidate board in `dev.style.tsx` only).
- CONCERN 2 (ribbon and flag geometry and colours): `ribbon-geometry.ts` and `tier-flag.tsx` hold
  every number; every colour is a token (`TFL-2`, `CTR-2`, `RBN-5`); the stylesheet's `.ribbon-band`
  reads the geometry's two strip lengths (`RBN-8`).
- The flag off non-card pages: `check-bundle-size.mjs` → `tierFlagViolations` prints
  "Tier flag: card pages only (CF-TIER-3) — ok" on the final tree.
- The test-id census: no spec reads the old `/dev/style` static cells' contents; `listing-card-tier`
  is read by `listing-card.test.tsx`, `tier-flag.test.tsx`, `card-tiers.test.ts` and
  `e2e/sage-tiers.spec.ts` only (`rg listing-card-tier src e2e scripts`).
- Banned patterns in the added lines (`git diff 043f8aa9..HEAD -- e2e src scripts | rg "^\+.*(\.first\(\)|waitForTimeout|test\.only|as unknown as|: any\b|@ts-expect-error|@ts-ignore|!\.)"`): none.

## 5. Tests

Added: CTR-1…3 (`card-tier.test.ts`); TFL-1…4 (`tier-flag.test.tsx`); RBN-1…5, RBN-7, RBN-8
(`ribbon-geometry.test.ts`); RBN-6, LC-8, LC-9, LC-10 (`listing-card.test.tsx`); TH-5
(`themes.test.ts`); "ribbon and invite contrast, theme %s, %s mode" (`styles.tokens.test.ts`: each
ribbon ink on its shown stops 2–5 and the foreground on `invite`, ≥ 4.5 : 1, every theme and mode);
CF-TIER-1…3 (`scripts/conformance/card-tiers.test.ts`, with planted bypasses); STG-1…4, STG-6
(`e2e/sage-tiers.spec.ts`, at 390 / 834 / 1440, light and dark; the Premium and Featured rows are
ethio-staging scratch rows made and removed by the harness, J3).

G38 (changed, old → new):
- LC-1 "the tier pill sits on the picture … the place line is kept without a place" → "the tier's
  flag sits on the picture … holding the tier word alone": the place line of a paid card without a
  place holds the tier word (`toBeEmptyDOMElement` → the word as its first child).
- D197 "the photos-soon band is drawn in the gold" → "takes the picture's palette … pearl unless
  the card names gold or sage": `bg-gold` → the band's `data-ribbon` palette.
- `/dev/style`'s Sage grid cells: the static hand-drawn cells became the real cards (section 3);
  no spec read their contents.

Unit totals (THE CHECKS, on the final tree; the run's logs are dated after `f670aef8d`):
component tests `Test Files 1 failed | 415 passed (416)`, `Tests 1 failed | 2571 passed (2572)` —
the one failure is NH-6 (section 12). The laws (`bunx vitest run scripts --maxWorkers=2`, part 8):
`Test Files 1 failed | 82 passed (83)`, `Tests 1 failed | 414 passed (415)` — NH-6 again.
`bun run typecheck`: clean.

THE CHECKS:
- fast line: `checks (fast): 17 PASS · 4 FAIL · 245s`
- last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 302s`
- the four FAILs, each environmental (section 12): laws-first (NH-6), actionlint (the pinned
  binary is linux_amd64), component tests (NH-6 only), gitleaks (linux_amd64).
- NOT RUN, named by the runner: the steps after a failed step in laws-first (changed folders' unit
  tests, Semgrep on changed files) and build-and-check (typecheck, format check, lint, the e2e
  selector self-test, root route names, build, bundle report); every "Install dependencies" (the
  dependencies are installed; a package change is its own turn); dependency-audit (the advisory
  service is not reachable); e2e-preflight (staging credentials the script never holds); the e2e
  merge job (GitHub artifacts); promote (CI only, DEC-020); semgrep's SARIF upload (GitHub only).
- The blocked steps, run by hand on the final tree, each exit 0: laws-changed units
  `Tests 364 passed (364)`; laws-changed semgrep `Ran 45 rules on 22 files: 0 findings.`;
  format check; lint `✖ 46 problems (0 errors, 46 warnings)`; the e2e selector self-test; root
  route names and its self-test; `bun run build && node scripts/check-bundle-size.mjs`:
  `Tier flag: card pages only (CF-TIER-3) — ok`, `Bundle budget OK.`

THE BROWSER CHECK (`bun run e2e:local`, both projects, 0 retries, ethio-staging):
- 14 spec files (sage-tiers, sage-cards, dark-cards, house-style, account-saved, press, sage-bands,
  supabase-door, feed-screens, my-listings-ad, ad-page, post-wizard-category,
  post-wizard-pricing, photo-pipeline): `13 failed`, `86 skipped`, `411 passed (32.2m)`. Every
  sage-tiers test passed on both projects.
- The 13, each read from its error:
  - 8 died on the network: AP-19, AP-23, AP-26, FS-7, FS-8, FS-9, FS-10, FS-11 (mobile-360): `fetch
    failed (ENOTFOUND)` / `ERR_NETWORK_CHANGED` from this machine's resolver mid-run (two then hit
    the pool's "already been registered" after a lost reply). Rerun alone, both projects, together
    with PP-8: `2 failed`, `16 passed (2.1m)` — all 16 of these pass; the 2 are PP-8.
  - MLA-13 (both projects): price stored `90100`, expected `90` — `Control+A` does not select on
    macOS, so "90" was typed before "100" at the Price step, before any card or preview.
  - PW-140 (mobile-360): `"… own" erej narrow` — `End` does not move the caret on macOS; the
    title step, no card.
  - PP-8 (both projects): a photo's stored object remains after DELETE. No file this turn touched is
    on that route's path (section 2). In an earlier turn, PP-8 failed the same way on this machine
    with the base's code swapped in and passed in CI ([Finish S6-4 screens turn](427d2407-7c93-488a-a8bb-557d978973fc)).
    CI is the proof here.
- `e2e/shell.spec.ts` with `--grep "invitation alone|feed grid reflows|centred with equal|no horizontal overflow and text stays legible at 360"`:
  `1 failed`, `6 passed`; the failure (desktop-1280, "an empty category shows the invitation
  alone") stopped at its seed: `duplicate key value violates unique constraint "categories_slug_key"`.
  Its slug is `e2e-feed-empty-${Date.now().toString(36)}`, made by both projects in the same
  millisecond (section 6). Rerun on desktop-1280 alone: `1 passed`.
- `[ssr-error]` lines in the runs: none (`rg -c "\[ssr-error\]"` over the four run logs found no
  match).
- J-audit (e2e/** changed): the new spec makes its rows through the harness on ethio-staging and
  removes them in `afterEach` (J1, J3); no real row, no `.first()`, no `waitForTimeout`, no
  `test.only`; twin projects run.

Contrast measured in the page (STG-2; every ribbon word of every public language, en and am, at
its worst point under the text's content box; the second figure is the padding box, where no
letter is drawn): lows gold 4.551 (`Not available`, 390), sage 4.552 (`Not available` /
`Price reduced`, 390), pearl 7.122 (390 dark); padding-box lows gold 3.749, sage 3.726. Tier words:
Premium 6.434 light / 6.973 dark, Featured 8.043 light / 6.278 dark. Stops changed (ruling 1
answer 2): gold `--ribbon-gold-5` L 0.651 → 0.671, sage `--ribbon-sage-5` L 0.543 → 0.61; no 7 %
stop moved; pearl unchanged.

## 6. K2 — siblings that bypass the mechanism

Greps: `rg "bg-gold|text-gold" src/features`, `rg "grid-cols-2 .*auto-rows-fr|auto-rows-fr" src`,
`rg "function (contrast|resolvedIn|tokenStyle)|const (contrast|resolvedIn)" e2e`,
`rg "NegotiableBadge.*from" src`, `rg "Date.now\(\).toString\(36\)" e2e/shell.spec.ts`.

- Gold status pills drawn locally (not a tier, outside scope): `src/features/my-listings/my-listing-page.tsx:167`,
  `src/features/my-listings/my-listings-page.tsx:279,287,295,303`.
- The card-grid class string, five copies: `src/components/marketplace/feed.tsx:55,244`,
  `src/features/seller/seller-page.tsx:98`, `src/features/ad-page/similar-ads.tsx:73`,
  `src/features/account/saved-page.tsx:84`.
- The seller page joins the card surfaces (it draws `ListingCard`, so it takes the tiers today).
- Local e2e colour helpers: `e2e/sage-tiers.spec.ts:62–101` beside `e2e/sage-cards.spec.ts:27,42,51`,
  `e2e/sage-bands.spec.ts:21,36`, `e2e/press.spec.ts:48` — no shared helper exists; one is a later
  turn's.
- `NegotiableBadge` reached through `listing-card.tsx`'s re-export by five screens outside scope:
  `src/features/posting/preview/listing-detail.tsx:102`, `src/features/my-listings/my-listings-page.tsx:9`,
  `src/features/posting/step-review.tsx:44`, `src/features/posting/listing-preview.tsx:3`,
  `src/features/admin/impersonation/impersonation-view.tsx:4`. Their pages measured lighter, so the
  bundler follows the re-export; pointing them at `negotiable-badge.tsx` is a later turn's.
- Not a tier: `src/features/posting/step-photos.tsx:612` (the gold cover label),
  `src/features/admin/translations/strings-page.tsx:847` (a gold-edged admin badge).
- Outside scope, test harness: `e2e/shell.spec.ts:267` makes its fence slug from `Date.now()` only,
  so the two projects can collide (seen in this turn's browser check).

Left as found: each is outside this brief's numbered changes.

## 7. Allowlists and guards

- `scripts/conformance/card-tiers-allowlist.txt` (new): 0 → 1 line —
  `src/routes/dev.style.tsx (4) | D262's dark-card choice board (DEC-314): three candidate card sets drawn by hand so e2e/dark-cards.spec.ts measures each candidate's fill and ink; a fixture, never a public page | DEC-314`.
- `scripts/conformance/non-null-allowlist.txt`: 146 → 146 lines, unchanged.
- New guard CF-TIER-1…3 (`scripts/conformance/card-tiers.test.ts`, through `kit.ts`): CF-TIER-1 the
  census of tier drawing outside the mechanism; CF-TIER-2 planted bypasses (each second copy fails,
  the mechanism files pass); CF-TIER-3 the build judge (`tierFlagViolations` in `route-budgets.mjs`,
  run by `check-bundle-size.mjs`) with its own planted case. Wired in `scripts/conformance/wired.test.ts`.
- `scripts/e2e-select.ts`: a new area `sage-tiers` (its sources and the spec); the selector's
  self-test passed.
- `scripts/route-budgets.mjs` (DEC-296, each line naming its cause; local sizes):
  - card pages: `/` 227 → 230 (229.4), `/c/$slug` 227 → 230 (229.4), `/$name` 225 → 228 (227.4),
    `/account_/saved` 226 → 228 (227.5), `/l/$slug` 257 → 260 (259.3), `/dev/style` 238 → 250
    (249.2, the real cards);
  - NEAR band (the entry's +0.2): `/admin` 213 → 214 (212.7), `/admin/countries` 327 → 328
    (326.7), `/admin/roles` 294 → 295 (293.7), `/admin/translations` 400 → 401 (399.7),
    `/my-listings` 317 → 318 (316.6).

Growth per page (local builds, base 043f8aa9 → final tree):

| Page | Base | Now | Change |
| --- | --- | --- | --- |
| `/`, `/c/$slug` | 226.2 | 229.4 | +3.2 |
| `/$name` | 224.6 | 227.4 | +2.8 |
| `/account_/saved` | 224.7 | 227.5 | +2.8 |
| `/l/$slug` | 256.4 | 259.3 | +2.9 |
| `/dev/style` | 237.2 | 249.2 | +12.0 |
| `/admin/impersonation_/$sessionId` | 297.4 | 291.6 | −5.8 |
| `/admin/screening` | 367.8 | 366.5 | −1.3 |
| `/admin/listings_/$listingId` | 386.0 | 384.8 | −1.2 |
| `/admin/listings_/$listingId_/edit` | 408.6 | 407.6 | −1.0 |
| `/post`, `/my-listings_/$listingId_/edit` | 403.3 | 402.3 | −1.0 |
| `/post_/$listingId` | 403.2 | 402.2 | −1.0 |
| every other page | — | — | +0.1 to +0.3 |
| entry JS | 211.6 | 211.8 | +0.2 |

The causes on `/` (ruling 2 answer 2): the ribbon +0.5; the tier look, flag and word +1.0; the
badge split +1.0 (the bounded trim saved 0.10 KiB and was not kept); `/dev/style` drawing the real
cards cut the shared modules again +0.56; the entry's +0.2 (its preload map names the new chunks).
`/dev/style`'s +12.0 is the real card and invite code on a fixture page.

The net for the site (ruling 2 answer 1): seven non-card screens that draw `NegotiableBadge`
became 1.0 to 5.8 KiB lighter (−12.3 KiB across them), because they no longer download the card's
chunk.

The stylesheet (Node's gzip, the checker's): 21,930 → 23,111 B (+1,181 B). Part 3 +999 B (the
ribbon palettes, the flag and the tier tokens); part 4 +141 B (the invite's fill token and utility,
the disc sizes, the button radius); part 7 +41 B (the two strip variables). Check: `CSS: 22.6 KiB /
40 KiB — ok`.

## 8. Strings

None. No key added or changed (`git diff 043f8aa9..HEAD -- src/i18n` is empty). The flag's name and
the tier word use the existing `tier.premium` / `tier.featured`; the ribbon words are the existing
status keys. Both i18n maps were regenerated (`bun run i18n:usage`: 1780 keys across 636 files) —
`/dev/style` now reaches the card's keys, and the new modules raised the scanned count from 632 to 636.

## 9. Migrations

None.

## 10. Departures

- **Ruling 1 answer 2, read as the text's content box.** The ruling measures "under the text's own
  box, at its worst point". I judge the box the letters occupy (the content box). STG-2 also logs
  the padding box, where no letter is drawn: gold ≥ 3.749 and sage ≥ 3.726 there. If the ruling
  meant the padding box, the strips and stops need another pass.
- **The mechanism fix chosen for the strips.** At the 9 px letter floor (the narrowest cards), the
  satin's shade strip, sized in percent of the band, reached under the letters' bottom row, and
  raising the 92 % stop could not lift sage past 4.5 there. Under "fix at the mechanism, not the
  ink", I put the gloss and shade strips into the picture's units (`SATIN_STRIPS`: 12 % and 14 % of
  the band at its own size, held inside the text's 1.4cqw padding at every width; RBN-7, RBN-8). The
  satin's look is unchanged at the design width. The 92 % stops were then raised by the least
  lightness that passes (section 5). No 7 % stop moved.
- **The badge split** (`negotiable-badge.tsx`), the plan's way to keep the flag off non-card pages
  (ruling 1 answer 1, CF-TIER-3): accepted by ruling 2 answer 1, with the numbers above.
- **"More than 1 KiB is a STOP"**: stop 1 was raised (`sage-s4-tiers.stop-1.md`); ruling 2 answer 2
  made it a tolerance with named causes (section 7).
- **The NEAR raises** for five non-card pages (`/admin`, `/admin/countries`, `/admin/roles`,
  `/admin/translations`, `/my-listings`): the entry's +0.2 left them inside the 0.3 KiB band; raised
  by DEC-296's form as rule 10 requires.
- **Left for a later turn:**
  - S5 (ruling 1 answer 5): the pearl satin on the ad page, the preview, the seller's own ad and the wizard.
  - Task D (ruling 2 answer 4): the shared card code grouped into one chunk in `vite.config.ts`,
    with its own DEC and every page measured before and after. Today's numbers: `/` is 229.4 KiB,
    and reads 17.59 KiB beyond the entry against 16.01 KiB with the card chunk whole.
- STG-5 does not exist: the approved plan listed STG-1…4 and STG-6.
- The rulings' files: ruling 1 and ruling 2 saved word for word beside the brief.

## 11. CI

- The base: ci-status.md read at the start, `043f8aa925ec2d417b8430da069b6d2eea285ebf`, **SUCCESS**,
  completed 2026-11-01T11:00:43Z, run 41298434038. The two-step SHA check: ci-status names the
  base's full sha, and `git rev-parse origin/dev` equals it (`043f8aa9…`, unchanged at the time of
  this report). No red of an earlier turn.
- This pull request's draft run on the stop-1 commit `813f973` (run 41301746037): **FAILURE**, two jobs.
  - First-paint bundle budget: the card pages over their ceilings. Class: this turn's code. It was
    the subject of stop 1; the ceilings were raised in part 8 (`f670aef8d`).
  - i18n used-on map is fresh: `"scanned": 635` committed against 636. Class: this turn's code. The
    maps were made before `negotiable-badge.tsx` existed; they were regenerated in part 7
    (`b79bad55a`), and `bun run i18n:usage` on the final tree leaves `git status` clean.
- The runs on the commits after the stop are reported on the pull request.

## 12. Limits

- NH-6 (`scripts/ci/nightly-hour.test.ts`) fails on this Mac: its `date` ignores `TZDIR`. CI runs
  Linux; nothing in this turn touches it.
- actionlint and gitleaks: the pinned binaries are linux_amd64 and cannot run on this Mac; CI's
  jobs are the judges.
- dependency-audit, the staging preflight, the e2e merge and promote cannot run locally (named in
  section 5).
- The local browser check runs on macOS. `Control+A` and `End` behave differently there (MLA-13,
  PW-140), and the network dropped once mid-run. PP-8 fails here on the base too. CI's browser lanes
  are the proof for those four specs.
- The walk on `/dev/style`'s real cards belongs to the operator (rendered-output acceptance).
