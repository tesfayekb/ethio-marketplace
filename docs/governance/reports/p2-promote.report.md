# P-2 — turn (b): Promote, the seller's level sheet and the staff Days field — report

Base: 7acae2b4d · Final commit: 68bec0dcd · Brief: docs/governance/briefs/p2-promote.md (sha256 65d9bf40dabdeccf77e99d5a5b7737a88cbf9fddc29aa3d8a6eb3e00a10a0dec)
Review: READY · 0 BLOCKER · 0 MAJOR · 2 MINOR · on 68bec0d

Rulings in force, each saved byte for byte (sha256 of the fenced text):
`p2-promote-ruling-1.md` e8d5ae137f12b8d575effd4cdccf3139439e45c3f8d9d53c316a2ed392d5cd6a ·
ruling 2 (pasted in the chat; the migration stop closed, the types patch, the temporary allowance) ·
`p2-promote-ruling-3.md` 83d71f8b4a1b1cba5d4bf9a47b85795627b501a68e37444f6913b1d3ef3c198f ·
`p2-promote-ruling-4.md` 84117d0334073de5a89950e7d21e22679b4f1b82ad1747bacc17280575da47cf.
`origin/dev` is still 7acae2b4d (read at the report); no drift during the turn.

## 1. Done / not done, by part and step

- STEP 0 — task saved (`9645c7ae3`), roadmap line 3, draft pull request
  [#29](https://github.com/tesfayekb/ethio-marketplace/pull/29).
- STEP 1 — the plan census, stop 1 (`c2327fc28`); ruling 1 saved (`d4e34e163`).
- M-2a — `promote_options`, the reader door (`ffb8590db`), migration stop 2 (`87cbc5777`); ruling 2:
  applied on ethio-staging, the types patch applied in the service commit.
- The build, in ruling 1 §8's order:
  - the service and the sheet on `promote_options` and `set_listing_level` (`40c7cce55`; the
    temporary check-doors line left in the same commit);
  - Promote on the row menu and the ad page through `promotable` (`36d6958e0`), their places in the
    box census (`4e0b806da`);
  - staff Days on both pages, the level's source and end, the typed absence (`404fc0dfa`);
  - `moneyText` with the product prices table (`c85638108`) and `priceLine` (`621f2bfe3`, ruling 3
    Q1; `post.review.priceLine` retired);
  - the sheet names sameLevel's end from its fresh read (`14c93e321`);
  - LVP-1…4 (`5e37960d7`); MLP-6's list (`8d16efece`, ruling 3 Q2);
  - docs (`2528f75f7`); stop 3 (`50b3eb8d2`), ruling 3 (`352c48ed1`); stop 4 (`016cfe272`),
    ruling 4 (`25e116f3e`);
  - `wholeNumber` a leaf in `src/lib` (`391d008ef`, ruling 4 Q1); `/auth`'s ceiling by DEC-296's
    NEAR band (`5e9a14ebb`); the i18n maps after the new file (`29f688c26`);
  - at the self-review, LVP-3's seven days read from the door's own audit stamp instead of this
    computer's clock (`5e66f3398`, INC-1075's class; FINDINGS);
  - ruling 5 (pasted in the chat, not saved — it widens no scope): `moneyText` keeps the digits'
    own spaces, FMT-13 (`68bec0dcd`); its records below.
- THE CHECKS whole (section 5), the browser check (section 5), the self-review (the line
  above), this report.
- Not done: the brief's LVP-3 (Resume) and LVP-5 (the level line as its own test) — ruling 1 E12
  dropped LVP-3 (FSL-3 is the test) and renumbered LVP-1…4 contiguously; the level line is LVP-4.

## 2. Files changed

`git diff --name-only 7acae2b4d` (before this report's commit):

```
docs/features/admin-listings.md
docs/features/doors.md
docs/features/my-listings.md
docs/features/plans.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-promote-ruling-1.md
docs/governance/briefs/p2-promote-ruling-3.md
docs/governance/briefs/p2-promote-ruling-4.md
docs/governance/briefs/p2-promote.md
docs/governance/reports/p2-promote.stop-1.md
docs/governance/reports/p2-promote.stop-2.md
docs/governance/reports/p2-promote.stop-3.md
docs/governance/reports/p2-promote.stop-4.md
e2e/my-listings-page.spec.ts
e2e/my-listings-promote.spec.ts
public/i18n-usage.json
roadmap.md
scripts/conformance/holds-its-box-allowlist.txt
scripts/conformance/listing-levels-allowlist.txt
scripts/doors/manifest.txt
scripts/public-surface-allowlist.txt
scripts/route-budgets.mjs
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/change-listing-tier.ts
src/features/admin-listings/history.test.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-listings/tier-dialog.test.tsx
src/features/admin-listings/tier-dialog.tsx
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/use-admin-listing.test.ts
src/features/admin-listings/use-admin-listing.ts
src/features/admin-listings/use-admin-listings.ts
src/features/admin-monetisation/caps-forms.ts
src/features/admin-monetisation/monetisation-forms.test.ts
src/features/admin-monetisation/monetisation-forms.ts
src/features/admin-monetisation/price-forms.ts
src/features/admin-monetisation/product-prices-table.tsx
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/my-listing.test.ts
src/features/my-listings/my-listing.ts
src/features/my-listings/my-listings-page.tsx
src/features/my-listings/promote-service.test.ts
src/features/my-listings/promote-service.ts
src/features/my-listings/promote-sheet-lazy.ts
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/features/posting/price-line.test.ts
src/features/posting/price-line.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/lib/door-codes.test.ts
src/lib/door-codes.ts
src/lib/format.test.ts
src/lib/format.ts
src/lib/whole-number.test.ts
src/lib/whole-number.ts
src/test/own-key-sites.test.ts
supabase/migrations/20261106233808_bc86fa74-d073-4c1d-8250-f767b6251152.sql
```

New files (`git diff --name-only --diff-filter=A 7acae2b4d`, each in `git ls-files`): the four briefs
and rulings, the four stop reports, `e2e/my-listings-promote.spec.ts`,
`src/features/admin-listings/use-admin-listing.test.ts`, `promote-service.ts` and its test,
`promote-sheet-lazy.ts`, `promote-sheet.tsx` and its test, `src/lib/whole-number.ts` and its test,
the migration. No deletion.

Scope: the brief's areas and ruling 1's approved list, widened by ruling 1 (§1 the migration, the
manifest and public-surface lines; §4 `listings-page.tsx`, `change-listing-tier.ts`; §5
`price-line.ts`, `price-line.test.ts`, `product-prices-table.tsx`), ruling 2
(`src/integrations/supabase/types.ts`, the one line), ruling 3 (`src/test/own-key-sites.test.ts`,
`en-base.ts`, `am-base.ts`, `e2e/my-listings-page.spec.ts`) and ruling 4 (`monetisation-forms.ts`,
its test, `caps-forms.ts`, `price-forms.ts`, the new `src/lib/whole-number.ts` and its test,
`scripts/route-budgets.mjs` for a NEAR-band page). The rest is the standing allowance
(`docs/features/**` — `plans.md:285` names MNF-1's move —, the briefs, reports, roadmap, the two
i18n maps, the two `scripts/conformance/*-allowlist.txt` files).

## 3. Behaviour contract — before → after

| Touched | At 7acae2b4d | Now |
| --- | --- | --- |
| `public.promote_options(uuid)` | absent | a STABLE definer reader behind `door_context('reader')`: the caller's own ad (else `listingNotFound`), the location's country only (`listingNotPlaced`), `market_settings_for` (`marketNotSet`); answers `{ok, status, level{key,until,source}, country, paidLevels, currency, levels[…]}` (stop 2 has the shape); EXECUTE to authenticated only |
| My listings, a row's ⋯ menu | open, share, offer actions, copy | the same, with **Promote ad** between the offer actions and Copy for a live or paused ad (`promotable`) |
| My listings, the seller's ad page | no Promote | a **Promote ad** control near the bottom for a live or paused ad; the band keeps "Level ends {date}" and the paused notice and Resume as (a) built them |
| The Promote sheet | absent | on demand (`resilientLazy` in `promote-sheet-lazy.ts`): every level the door answers, the current named with its end, the lower ones "Not available", each other row's days and either the launch line (paid levels off) or the door's amount through `moneyText`; choosing calls `set_listing_level`; a refusal named by its code (`doorCode`), sameLevel with the end from a fresh read; nothing computed |
| Staff ad page, the level line | the level's name; an absent level printed "Regular" | the level, its source and its end ("No end" when open); an absent level "Level not known" |
| Set tier dialog (ad page and roster) | level, reason, note | the same plus **Days** (blank = open-ended → `p_days` NULL; 1…3650; none on the baseline), refused at the field before the door |
| `changeListingTier(...)` | `(guard, listingId, tier, reason, note)` | `(guard, listingId, tier, reason, note, days: number \| null)`; `p_days` reaches the door; `badDays` reads as the days rule |
| `tierProblem(...)` | `(tier, current, reason, note)` | `(tier, current: string \| null, reason, note, days: string)` — the field's text, read by `wholeNumber` |
| `use-admin-listing.ts` / `use-admin-listings.ts` | `tier: String(l["tier"] ?? "regular")` | `tier: string \| null` (the typed absence), with `tierSource`, `tierUntil` on the detail |
| `DOOR_CODES` | F1's codes | plus the family's 13 (`listingNotFound … noFreeSlot`) |
| `moneyText(amount, currency, language, intent?)` | absent | `src/lib/format.ts`: the amount by intent with its own spaces kept, a plain space, the currency; trimmed, so a blank currency gives the amount alone |
| `priceLine`, fixed price | `fill(t("post.review.priceLine"), {amount, currency, period: ""})` collapsed | `moneyText(amount, currency, language)` — byte-equal in English and Amharic (ruling 3 Q1); in a language whose grouping is a no-break or narrow no-break space, the number's own space is now kept where the template's collapse made it a breaking one (ruling 5, FMT-13) |
| Product prices table, the amount cell | `` `${number.format(row.amount)} ${row.currency}` `` | `moneyText(row.amount, row.currency, language, "exact")` — byte-equal for every language: the number's own spaces (a no-break or narrow no-break group separator) are kept since ruling 5 |
| `wholeNumber` | `monetisation-forms.ts:35-39` | `src/lib/whole-number.ts`, byte for byte; every caller imports it there |
| The buyer's page `/l/$slug` | — | nothing new on screen; its first download +125 B (the turn's shared bytes, section "Budgets") |

Nothing else differs: the census for each row is in stops 1 and 3 and section 4.

## 4. Censuses

- Stop 1 (at 7acae2b4d): `rg "tier\b|tierUntil|levelUntil|level_perks_for|product_price_for|
  package_price_for|market_settings|set_listing_level|resume_listing|admin_set_listing_tier"` over
  `src/`, `supabase/migrations/`, `e2e/`, `scripts/`; `rg "number.format|Intl.NumberFormat"`;
  `rg '?? "regular"'`; the test-id prefixes `LVP|PMS|PMV|ALV|PRS|MNY` (LVP, PMS only in the briefs).
- Stop 3: `rg -n "post.review.priceLine" src --glob '!src/i18n/**'` — `price-line.ts:64` only;
  `rg -n "more-promote|more-copy|more-close" e2e` and `rg -n 'my-listing-\$\{[A-Za-z]+\}-more-"' e2e`
  — MLP-6 is the only exact-list reader of that menu.
- Ruling 4: `rg -n '\^-\?\\d\+\$' src` — `wholeNumber` the only typed whole-number parse; the test id
  WN-1 free at the base.
- This report: the banned patterns over the turn's added lines (`git diff 7acae2b4d..HEAD -- src
  e2e scripts`, 1930 lines): `as unknown as`, `: any`, `@ts-expect-error|@ts-ignore`, a non-null
  `!`, `?? 'ET'`, `?? guest`, `waitForTimeout`, `.first()`, `test.only`, a hex colour,
  `instanceof Error`, `if (error) return null`, `React.lazy`, `createClient`, `new Response` — none;
  `?? 0` — three, all in the e2e spec (viewport width, a count the head query answers); `fetch(` —
  one, `query.refetch()`; `"en"`/`"am"`/`"ETB"` — nine, all in test files.
- At the self-review, INC-1075's class in the turn's own spec: `rg -n "Date.now|new Date\("
  e2e/my-listings-promote.spec.ts` — one comparison of a server-stamped field with this computer's
  clock (LVP-3's `tier_until`), fixed in 5e66f3398; the rest (`at(...)`) only date seeded rows.

## 5. Tests

Added:
- `promote-sheet.test.tsx` PMS-1…6; `promote-service.test.ts` PMV-1…6; `use-admin-listing.test.ts`
  ALV-1…2 (new file); `whole-number.test.ts` WN-1 (MNF-1's five expectations, moved — ruling 4).
- FMT-13 (ruling 5): `moneyText(1500, "XTS", "fr")` equals `` `${formatNumber(1500, "fr")} XTS` ``
  and contains U+202F (the narrow no-break space Intl prints for French grouping); `moneyText(1500,
  "XTS", "en")` is still "1,500 XTS". Red-first on the old text (`bunx vitest run
  src/lib/format.test.ts -t FMT-13` before the fix): `Expected: "1 500 XTS"`, `Received: "1 500
  XTS"` (U+202F made a plain space), `Tests  1 failed | 9 skipped (10)`; after the fix
  `format.test.ts`, `price-line.test.ts`, `own-key-sites.test.ts`, `promote-sheet.test.tsx` and the
  admin-monetisation tests: `Test Files  8 passed (8)`, `Tests  59 passed (59)`. Census `rg -n
  "moneyText\(" src e2e`: the three callers (`promote-sheet.tsx:132`, `price-line.ts:64`,
  `product-prices-table.tsx:102`) pass the text through; none depends on the collapse.
- CLT-5, TD-6, TD-7, TIR-7, ML-U28, DRC-6, FMT-12, and in `price-line.test.ts` "the amount alone is
  the one money formatter's text in every language (DEC-349)".
- `e2e/my-listings-promote.spec.ts` LVP-1…4 (ruling 1 E12: the brief's LVP-3 dropped for FSL-3,
  LVP-4's door half is LDR-4, renumbered contiguously).

Changed shape (each listed):
- `history.test.ts` — the fixture's `tier: "regular"` became `tier: null` (the typed absence).
- `tier-dialog.test.tsx` — the helper `open(current: string …)` takes `string | null` (TD-7 opens
  with `null`).
- `change-listing-tier.test.ts` — every call gains the Days argument (`null`, open-ended);
  `tier-reasons.test.ts` — every call gains the Days field's text (`""`, blank). `tier-dialog.test.tsx`
  TD-4's expected call gains `null` (no Days typed).
- `src/test/own-key-sites.test.ts:52` — `"t:post.review.priceLine"` → `"5 ETB"` (ruling 3 Q1).
- `e2e/my-listings-page.spec.ts` MLP-6 — the menu list gains `-more-promote` (ruling 3 Q2).
- `monetisation-forms.test.ts` — MNF-1 and its import removed (moved to WN-1).
- `e2e/my-listings-promote.spec.ts` LVP-3 (the turn's own spec, changed at the self-review) — the
  staff's seven days were "within two minutes of `Date.now()` + 7 days"; now `tier_until` minus the
  door's own `listing.admin_tier` audit stamp is exactly 7 days (both are the door's transaction
  `now()`: `audit_log.created_at DEFAULT now()`, the door's `v_until := now() + make_interval(days =>
  p_days)`). A tighter assertion, no longer on this computer's clock.

Red-first: FMT-13 (above); no other defect fixed by a test. Behaviour moves (`wholeNumber`) are
proven by the moved test.

Unit totals (THE CHECKS' component tests, the whole tree): `Tests  1 failed | 2804 passed (2805)` —
the one is NH-6 (section 12). The laws: `Tests  1 failed | 491 passed (492)` — NH-6.

`bun run typecheck`: `tsc --noEmit`, exit 0.

THE CHECKS (`bun run checks`, whole, on the final code tree 68bec0dcd), fast line and last line:

```
checks (fast): 17 PASS · 4 FAIL · 288s — laws-first, build-and-check, component-tests, secrets-scan, migration-lint, i18n-usage-map, string-scan, import-gate, listing-write-seam, browse-path-guard, marketplace-weight, dependency-audit, e2e-preflight, e2e, promote; slow steps follow (build, budget, semgrep)
checks: 24 PASS · 4 FAIL · 30 NOT RUN · 354s
```

Earlier whole runs: on 5e9a14ebb `checks: 23 PASS · 5 FAIL · 30 NOT RUN · 360s` — its fifth FAIL,
the i18n map's drift (`"scanned": 681 → 682`, the new `whole-number.ts`), fixed in 29f688c26; on
29f688c26 `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 346s`; on 5e66f3398 (the self-review's spec
fix) `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 350s`; then ruling 5's fix (68bec0dcd) and the run
above. The four FAILs that stand are this computer's, each read in its log:
- laws-first › scripts/ tests first and component-tests — NH-6 alone (section 12);
- build-and-check › Workflow lint and secrets-scan — the pinned actionlint and gitleaks are Linux
  x86-64 builds (`file` reads "ELF 64-bit LSB executable, x86-64"), which cannot execute on this
  arm64 Mac; CI judges both.

Run by hand behind the actionlint FAIL, on 29f688c26, 5e66f3398 and 68bec0dcd, all exit 0:
`bun run format:check` ("All matched files use
Prettier code style!"); `bun run lint` (0 errors, 46 warnings, none in a file this turn changed);
`bun run scripts/e2e-select.ts --self-test` ("every spec is reachable; every area glob matches");
`check-root-routes` (self-test "12 allowed, 5 refused"; "61 entries; every root segment is safe");
typecheck (above); the build and bundle check ran in THE CHECKS' own budget job: "Check the
first-paint budget" PASS and "the NEAR band (R4) — 0 NEAR, none grew".

NOT RUN (30), each with the script's reason:
- because an earlier step failed: laws-first's changed folders' unit tests (the component tests
  ran the whole tree) and Semgrep on changed files (the whole Semgrep scan passed); build-and-check's
  Typecheck, Format check, Lint, e2e selector self-test, Root route names, Build, Bundle report
  (each run by hand, above);
- by design: three Install-dependencies steps (installed; a package change is its own turn); the
  dependency audit (2: the advisory service is not reachable from here); e2e-preflight (4: staging
  credentials the script never holds); e2e's merge steps (6: GitHub artefacts); promote (4: only CI
  promotes); Semgrep's SARIF upload and its warning (2: GitHub-only).

THE BROWSER CHECK (`bun run e2e:local`, ethio-staging, each file whole and alone, 0 retries, both
projects):
- `e2e/my-listings-promote.spec.ts` (new): 8 passed, twice, before its commit; on the final code
  (5e66f3398) `8 passed (47.0s)`, 0 `[ssr-error]` lines (the served build's stdout and stderr are
  piped into the run's log, `playwright.config.ts:118-119`).
- `e2e/my-listings-levels.spec.ts`: 26 passed.
- `e2e/my-listings-page.spec.ts`: 14 passed, 2 failed — MLP-6 at line 671 after `Control+A`
  (INC-1066, section 12); CI on 016cfe272 passed it on Linux with the new list.
- `e2e/my-listings-ad.spec.ts`: 34 passed, 2 failed — MLA-13 (INC-1066).
- `e2e/admin-listings.spec.ts`: 70 passed, 6 failed — AL-20, AL-23, AL-30 (INC-1066); every Set
  tier test passed.
- `e2e/admin-monetisation.spec.ts`: 30 passed, 4 failed — MON-11, MON-17 (INC-1075, section 12).

`[ssr-error]`: CI's server-error census on run 42350853426 (016cfe272): "62 line(s), 27 message(s):
0 off the allowlist, 27 allowlisted"; locally, LVP's final run 0; the other local runs' logs were
not tallied (section 12).

J-audit (`e2e/**` changed): J1 — every LVP test runs in a scratch market of its own (letters-only
scratch names, `e2e-` keys) with a scratch price row for the level it promotes to · J2 — no global
sweep; real level rows read for keys and order only · J3 — real reference rows never written;
every scratch row removed in `afterEach` by destroys that throw · J4 — truth through the service
client (`truth()`, the ad's row unchanged after each refusal) · J5 — test ids and the viewport twins
(`rowBox`, `rowTwin`); words by key through `ownValue(en, …)`, never English literals · J6 — no
global list mutated; the ad located by its id · J7 — seed before navigate; the seeded row asserted
before acting · J8 — both projects, not `@global-state` · J9 — the job super admin from the pool
and the seeded seller by session; no test changes its own auth state. `rg` over the spec: no
`waitForTimeout`, `.first()` or `test.only`.

## 6. K2 — siblings that bypass the mechanism

From stop 1 (left, each outside this turn's numbered changes):
- Level-name closures: `listings-page.tsx:219`, `listing-page.tsx:174` (the base's "Regular"
  fallback for a key outside P-1's three stands in `tierLabel`).
- Sentence matchers, not `doorCode`: `my-listing.ts:253` `actionErrorKey` (Resume stays on it,
  ruling 1 §2; F1-5a moves it), `tier-reasons.ts:54` `tierErrorKey`.
- Raw platform client, not the Supabase door: `my-listing.ts`, `use-admin-listing.ts`,
  `use-admin-listings.ts`.
- Other sentinel defaults beside the two fixed: `detailOf` / `listAdminListings` (`?? "fixed"`,
  `?? 0`, `String(l["id"])`).
- Screening's tier filter: `use-screening.ts:175`.
- Files over ~300 lines: `my-listings-page.tsx`, `my-listing-page.tsx`, `listing-page.tsx`.
- `e2e/admin-listings.spec.ts` at 40 tests — the housekeeping turn's split (ruling 1 §9).

Paid in this turn: hand-made money at `product-prices-table.tsx:103` (now `moneyText`).

Added by rulings 3 and 4:
- "post.review.pricePer (en-base, am-base) carries {amount} {currency} as separate placeholders —
  fold onto moneyText through one {money} placeholder in a strings turn (both languages, the
  translator's 'per' wording kept)".
- PRELOAD-1: "the dynamic import's preload list is the bundler's whole static closure of the piece;
  trim it at build time to the chunks outside the host's static closure (vite
  build.modulePreload.resolveDependencies + a closure-map plugin), judged on every page's first
  download (at or under its reading; DEC-296's ratchet where 8 KiB under) with the E2E suite green;
  second occurrence of the class after P-1c b's Guide sheet (route-budgets.mjs rows 28–33)".

Added by ruling 5: "moneyText joins the amount and the currency with a plain space; CLDR's currency
patterns use a no-break space — decide by a DEC in a strings turn (every money text at once; tests
that read the text follow)".

Found at the self-review: two number reads beside `wholeNumber` —
`src/features/admin-countries/country-dialogs.tsx:172` `numberOrZero` (a sentinel 0) and
`src/features/admin-locations/location-dialogs.tsx:118` `numberOrNull` — outside scope, for
Foundations 2's form kit.

## 7. Allowlists and guards

| File | Before → after | Change |
| --- | --- | --- |
| `scripts/doors/manifest.txt` | 276 → 277 lines | + `promote_options(uuid) \| signed-in-reader \| authenticated \| - \| - \| - \| - \| - \| - \| listingNotFound,listingNotPlaced,marketNotSet \| P-2 (b) M-2a (DEC-349): …` |
| `scripts/public-surface-allowlist.txt` | 187 → 188 | + `promote_options \| authenticated \| P-2 (b) M-2a (DEC-349): …` with its reason |
| `scripts/doors/check-doors-allowlist.txt` | 12 → 12 lines (9 → 10 → 9 entries) | the temporary `grant-without-caller promote_options(uuid) \| … \| 2026-11-20` came in M-2a and left in the service commit `40c7cce55` (ruling 2) |
| `scripts/conformance/holds-its-box-allowlist.txt` | 15 → 18 | + `my-listing-page.tsx#LazyPromoteSheet`, `my-listings-page.tsx#LazyPromoteSheet`, `promote-sheet-lazy.ts#LazyPromoteSheet` — the sheet draws in a portal on the top layer, out of the page's flow · until 2027-05-01 |
| `scripts/conformance/listing-levels-allowlist.txt` | 15 → 14 | − `tier:src/features/admin-listings/use-admin-listing.ts` (the P-1 default is gone) |
| `scripts/route-budgets.mjs` | `/auth` 230 → 231 | DEC-296's NEAR band, its cause on the line (section "Budgets") |

Guards run: check-doors self-test ("7 finding kinds fired on their planted fixtures, the clean pair
fired nothing") and static; `scripts/check-migrations.sh` (every guard OK); the laws
(`bunx vitest run scripts`) after every part that touched a guard or allowlist; THE CHECKS' guard
self-tests (deletions, shell pipes, promote, acceptance doors, door guard, outbound calls,
listing-write seam, browse path, migration lint) — PASS.

## 8. Strings

New keys, EN and AM (copied by script from ruling 1's `p2b-strings.json`; 0 differ).

Member layer (`en-member.ts` / `am-member.ts`):

| Key | EN | AM |
| --- | --- | --- |
| `myListings.action.promote` | Promote ad | ማስታወቂያውን አሳድግ |
| `myListings.promote.title` | Promote this ad | ይህን ማስታወቂያ ያሳድጉ |
| `myListings.promote.hint` | A higher level shows your ad above others for a set number of days. | ከፍ ያለ ደረጃ ማስታወቂያዎን ለተወሰኑ ቀናት ከሌሎች በላይ ያሳያል። |
| `myListings.promote.days` | {count} days | {count} ቀናት |
| `myListings.promote.freeLaunch` | Free while the launch runs | በመክፈቻው ወቅት ነጻ |
| `myListings.promote.current` | Current level | የአሁኑ ደረጃ |
| `myListings.promote.notAvailable` | Not available | አይገኝም |
| `myListings.promote.choose` | Choose level | ደረጃ ይምረጡ |
| `myListings.promote.until` | Until {date} | እስከ {date} |
| `myListings.promote.done` | Level set until {date}. | ደረጃው እስከ {date} ተቀምጧል። |
| `myListings.promote.empty` | No higher level is offered for this ad. | ለዚህ ማስታወቂያ ከፍ ያለ ደረጃ አይቀርብም። |
| `myListings.promote.error.notLive` | Only a live or paused ad can be promoted. | በቀጥታ ያለ ወይም የቆመ ማስታወቂያ ብቻ ሊያድግ ይችላል። |
| `myListings.promote.error.sameLevel` | This ad already has this level until {date}. | ይህ ማስታወቂያ እስከ {date} ድረስ ይህ ደረጃ አለው። |
| `myListings.promote.error.lowerLevel` | Choose a level above the current one. | ከአሁኑ በላይ ያለ ደረጃ ይምረጡ። |
| `myListings.promote.error.unknownLevel` | This level is no longer offered. | ይህ ደረጃ ከእንግዲህ አይቀርብም። |
| `myListings.promote.error.listingNotPlaced` | Add the ad's place before promoting it. | ማስታወቂያውን ከማሳደግ በፊት ቦታውን ይጨምሩ። |
| `myListings.promote.error.levelNotAvailable` | This level is not offered in this category or place. | ይህ ደረጃ በዚህ ምድብ ወይም ቦታ አይቀርብም። |
| `myListings.promote.error.seasonEnded` | This level's season has ended. | የዚህ ደረጃ ወቅት አብቅቷል። |
| `myListings.promote.error.notOffered` | This level has no price here yet. | ይህ ደረጃ እዚህ እስካሁን ዋጋ የለውም። |
| `myListings.promote.error.marketNotSet` | Levels are not open in this country yet. | ደረጃዎች በዚህ አገር እስካሁን አልተከፈቱም። |
| `myListings.promote.error.creditsNotAvailable` | Paid levels are not open yet. | የሚከፈልባቸው ደረጃዎች እስካሁን አልተከፈቱም። |

Admin layer (`en-admin.ts` / `am-admin.ts`):

| Key | EN | AM |
| --- | --- | --- |
| `admin.listings.level.days` | Days | ቀናት |
| `admin.listings.level.daysHelp` | Leave blank to keep the level until staff change it. | ሠራተኞች እስኪቀይሩት ድረስ ደረጃው እንዲቆይ ባዶ ይተዉት። |
| `admin.listings.level.hint` | The ad moves to this level for the days you set, or until staff change it. | ማስታወቂያው ለሚያስቀምጧቸው ቀናት፣ ወይም ሠራተኞች እስኪቀይሩት ድረስ፣ ወደዚህ ደረጃ ይዛወራል። |
| `admin.listings.level.error.days` | Days must be a whole number from 1 to 3650. | ቀናት ከ1 እስከ 3650 ያለ ሙሉ ቁጥር መሆን አለበት። |
| `admin.listings.level.error.baselineDays` | The baseline level takes no days. | መሠረታዊው ደረጃ ቀናት አይወስድም። |
| `admin.listings.level.until` | Until {date} | እስከ {date} |
| `admin.listings.level.noEnd` | No end | መጨረሻ የለውም |
| `admin.listings.level.source.launch` | Launch offer | የመክፈቻ ቅናሽ |
| `admin.listings.level.source.staff` | Set by staff | በሠራተኞች የተቀመጠ |
| `admin.listings.level.source.money` | Paid | የተከፈለ |
| `admin.listings.level.source.credits` | Credits | ክሬዲት |
| `admin.listings.level.unknown` | Level not known | ደረጃው አይታወቅም |

Retired (removed from both languages): `admin.listings.tier.hint` (P2b-a, the untrue sentence) and
`post.review.priceLine` (ruling 3 Q1, the money form's second home). 33 new, 2 retired; both usage
maps regenerated (`bun run i18n:usage`, 1874 keys, 682 files scanned).

## 9. Migrations

- `supabase/migrations/20261106233808_bc86fa74-d073-4c1d-8250-f767b6251152.sql` — sha256
  `75a6bd836b9733768d57da148f7834a567905e51bf9de466f14ccffb4aa899a2` (unchanged since stop 2:
  `git log 87cbc5777..HEAD -- supabase/migrations` is empty).
- Mark `20261107001000`; pairing line `apply bc86fa74 → expect mark 20261107001000`; applied on
  ethio-staging by the supervisor (ruling 2: body md5 289edad282d69672248641cbef4a7224, grants as
  declared, every scratch row gone).
- `bun run db:proof`, last line, on 29f688c26 (5e66f3398 after it changed only an e2e spec):
  `db:proof PASS — applied 416/416, CLI 2.120.0, warm, 4 s`

## 10. Departures

- The rulings widened scope (section 2); every widened file is named there with its ruling.
- STOPS in the turn: stop 1 (the plan, ruling 1); stop 2 (the migration, ruling 2); stop 3 (two
  test files outside scope — `own-key-sites.test.ts` and MLP-6's list — ruling 3); stop 4 (three
  admin pages over their ceilings through `monetisation-forms` riding the Days parse, and E11's
  tolerances — ruling 4).
- M-2a's departures from ruling 1 §1, recorded in stop 2 and accepted by ruling 2: each level row
  carries its price row's own `currency`; `levelNotAvailable` cannot arise for a listed row today
  (kept for parity); a current level that is not self-serve is named from `level.key` only; the
  temporary check-doors allowlist line (10 → 9 inside the turn).
- The brief's LVP-3 and LVP-5: dropped and renumbered by ruling 1 E12 (section 1).
- E11's ≤ 0.3 KiB on the three Promote pages: an ESTIMATE superseded by measurement (ruling 4 Q2,
  G5); the readings stand with their causes (section "Budgets").
- `/auth`'s ceiling 230 → 231: inside DEC-296's NEAR band after ruling 4's fix, moved by
  `ceilingForLocal` with its cause as ruling 4 Q1 directs.
- Ruling 5 (after the pull request's green run on 3207e3b5f): MINOR 1 fixed in the mechanism
  (`moneyText` keeps the digits' own spaces, FMT-13); MINOR 2 recorded as INC-1077; INC-1076
  recorded. Not saved to the repository (it widens no scope).
- `docs/_changelog.md` and `docs/governance/mechanisms.md` are not edited (the brief's STEP 0,
  DEC-346): their lines are in Records.

## 11. CI

- The base: ci-status.md at stop 1 read `f8fb55bc0887cabc4b1def60f6d995b382292541` (short
  `f8fb55b`), **SUCCESS**, 2026-11-06T15:40:52Z, run 42241564230; two-step check: f8fb55b is the
  second parent of `origin/dev` 7acae2b4d (the merge of PR #28) and `git diff --stat f8fb55b
  7acae2b` is empty. No red of an earlier turn.
- This pull request's runs:
  - 36d6958e0 — HB-1 (the box census) red, class (a) this turn's code: the sheet's three places
    joined the box census in `4e0b806da`.
  - 87cbc5777 (migration stop) — the preflight's "STAGING BEHIND" until the apply, expected;
    green after the supervisor's re-run (ruling 2).
  - 50b3eb8d2 — lanes 5 and 13, MLP-6's list (class (a); `8d16efece`); the bundle budget, three
    admin pages over (class (a); stop 4, fixed by `391d008ef`).
  - 016cfe272 — one red, the bundle budget (the same three pages; `391d008ef`, and `/auth`'s NEAR
    band in `5e9a14ebb`). Every E2E lane passed there, MLP-6 with its new list and MON-11 / MON-17
    included; e2e-last-failure.md: "last E2E run 42350853426 passed", flaky 0.
  - 3207e3b5f — every check green (41 pass, promote-to-main skipping on a pull request); ci-status.md
    "Commit: `3207e3b5fcd7eea8a45b6fa0db3118b3c4cde007` … Conclusion: **SUCCESS**", run
    42355237856; "last E2E run 42355237856 passed", flaky 0. Ruling 5's commit follows it.
- No re-run by me.

## 12. Limits

- INC-1066 (open): `Control+A` on macOS Chromium moves the caret, so MLP-6 (line 671), MLA-13,
  AL-20, AL-23 and AL-30 are red on this computer only; CI's Linux judges them (green on 016cfe272).
- INC-1075 (ruling 3): MON-11 (`admin-monetisation.spec.ts:1303`, `valid_to <= Date.now()`) and
  MON-17 (`:1724`, `unpricedPairs(new Date().toISOString())`) compare a server-stamped time with
  this computer's clock, read +0.30 s behind (`sntp time.apple.com`: +0.302577 s); neither test
  changed; CI judges.
- NH-6 (`scripts/ci/nightly-hour.test.ts:99`) fails on macOS: the BSD `date` ignores `TZDIR`.
  Pre-existing, outside scope, a finding for its own fix.
- actionlint and gitleaks cannot execute here (Linux x86-64 binaries); CI judges both.
- The dependency audit and the staging preflight are not reachable from THE CHECKS; CI judges.
- PMS and PMV fixtures are transcribed from the migration's declared answer, not captured from a
  live call; LVP-1…4 drive the real `promote_options` answer on ethio-staging end to end.
- The `[ssr-error]` lines of the local runs before the final LVP run were not tallied; CI's census
  (section 5) is the count for those files.

## Records (DEC-346 — verbatim for the supervisor; numbers are the supervisor's)

- **DEC-349** (ruling 1 §1): the seller's Promote reads ONE door, `promote_options`, which answers
  every candidate level with its availability by the same reads and the same country rule as
  `set_listing_level`; the sheet computes nothing and reads no price or level row; ruling 1 Q7's
  widening of CF-PRICE-1 is withdrawn — one reader home stands in CF-PRICE-1 and CF-LEVEL-1. A
  family's screens turn may add its doors' codes to `DOOR_CODES` ahead of the family's shell turn.
- **INC-1074** (P2b-b): `my_listing.countryCode` falls back to the home country while
  `set_listing_level` reads the location's country only, so a client preview by `countryCode` would
  disagree with the door for an unplaced ad. Fix: `promote_options` answers from the door's rule;
  the sheet never previews by `countryCode`. Class: a client re-deriving a door's rule from a
  reader's convenience field.
- **INC-1075**: a browser test compares a time the staging server stamped with this computer's
  clock — MON-11 (`e2e/admin-monetisation.spec.ts:1303`, `valid_to <= Date.now()`) and MON-17
  (`:1724`, `unpricedPairs(new Date().toISOString())`), the clock read +0.30 s behind. Class: a
  test's time comparison reads the server's clock or the row's own stamps, never `Date.now()`. Fix:
  the housekeeping turn (the census and the fix); neither test changed here.
- **P2b-a**: `admin.listings.tier.hint` said the level never ends — untrue once Days ships; fixed
  by the new key `admin.listings.level.hint`, the old key retired; a changelog line, no INC.
- **P2b-c, P2b-d**: F1-5a's subject (recorded there; no number now) — `set_listing_level` and
  `resume_listing` refuse with a plain `RAISE` (P0001), not `door_refuse`; the deactivated refusal
  is a sentence on every door that calls `assert_caller_active`.
- **The changelog line** (for `docs/_changelog.md`): "P-2 (b) — Promote: the seller's level sheet
  on one reader door `promote_options` (DEC-349; INC-1074), Promote on the row menu and the ad page,
  staff Days on both Set tier dialogs with the level's source and end and a typed absence;
  `moneyText` the one money formatter (the prices table and the price line); `wholeNumber` a leaf
  in `src/lib`. Retired keys: `admin.listings.tier.hint` (P2b-a) and `post.review.priceLine`."
- **Register row — the money formatter**: concern "an amount of money shown to a person" →
  mechanism `moneyText` (`src/lib/format.ts`: the amount by intent through `formatNumber`, one
  space, the currency) → guard: FMT-12, FMT-13 and the K1 rule → consumers: `product-prices-table.tsx`,
  `price-line.ts`, `promote-sheet.tsx` → "the order is a product constant in format.ts, per-language
  only in its digits; post.review.priceLine, the form's second home, retired in P-2 (b);
  post.review.pricePer still carries {amount} {currency} as separate placeholders — K2".
- **Register row — the whole-number read**: concern "a typed whole-number read from a text field"
  → mechanism `src/lib/whole-number.ts` (wholeNumber: a whole number or null; never a sentinel) →
  guard: its unit test WN-1 and the K1 rule (one parse) → consumers: monetisation-forms.ts
  (products, levels, market rows), caps-forms.ts, price-forms.ts, tier-reasons.ts (staff Days) →
  forward-scan: Foundations 2's form kit takes it as the kit's number read (one parse behind one
  Field).
- **The manifest line** (`scripts/doors/manifest.txt`): `promote_options(uuid) | signed-in-reader |
  authenticated | - | - | - | - | - | - | listingNotFound,listingNotPlaced,marketNotSet | P-2 (b)
  M-2a (DEC-349): the seller's Promote sheet in one read — every candidate level's availability by
  set_listing_level's own reads and country rule`.
- **PRELOAD-1** (K2 / roadmap line; the supervisor numbers its DEC): as quoted in section 6.
- **ESTIMATE superseded (G5)** (ruling 4's words): "E11's ≤ 0.3 KiB on the three Promote pages →
  measured +0.8 KiB (/admin/listings_/$listingId: Days, source, until, the typed absence) and +1.2 /
  +1.4 KiB (the seller pages: the preload list ~1.1 of it); the 31 pages' +0.1–0.3 KiB = moneyText
  79 B + the entry's 38 B." The final tree's readings (section "Budgets"): +0.81 KiB, and +1.35 /
  +1.48 KiB on the seller pages; the entry's closure +47 B.
- **INC-1076** (ruling 5 §3, in its words): "docs/governance/briefs/p2-promote-ruling-3.md and -4.md
  hold the rulings' words exactly (verified by the supervisor) but not their Markdown — the
  backticks around code names, the numbered-list and bullet marks and the blank lines are gone,
  because the text was copied from the rendered chat. Class: a ruling that must be saved travels as
  a FILE the operator attaches, and is copied from the file by script (as briefs are), never from
  the chat; the supervisor sends them so from now on. Fix: the records turn R13 replaces both files
  with the supervisor's byte-exact copies (sha256 10d25113… and 90d75eea…). Nothing for you to
  change in this turn."
- **INC-1077** (ruling 5 §2, in its words): "tier-reasons.ts:51 BASELINE_TIER = "regular" mirrors
  the door's baseline rule on the client (the level row's is_baseline is the truth: migration
  20261104124957); INC-1074's class (a client re-deriving a door's rule), second occurrence → the
  class rule stands: a screen reads the baseline from the rows the door reads (is_baseline), never
  from a literal. Fix: P-2 turn (c), with DEC-331's tier-word fold (the census of "regular" literals
  in src — card-tier.ts, feed-page.ts, ranking.ts, tier-reasons.ts TIERS, use-admin-listings.ts
  LISTING_TIERS, listings-page.tsx:220, listing-page.tsx:467, app-shell.tsx:754 — is that turn's)."
- **K2 (ruling 5)**: "moneyText joins the amount and the currency with a plain space; CLDR's
  currency patterns use a no-break space — decide by a DEC in a strings turn (every money text at
  once; tests that read the text follow)".

## FINDINGS

- The self-review's MINORs (three found; two stand after ruling 5):
  1. `moneyText` collapsed whitespace, so in a language staff add whose number grouping uses a
     (narrow) no-break space the prices table printed a plain space, which may wrap inside a
     number (`src/lib/format.ts`, `moneyText`). English and Amharic were byte-equal. It was
     `priceLine`'s existing behaviour, which ruling 1 E6 made the one form. Fixed in 68bec0dcd
     (ruling 5): the collapse is gone, FMT-13 proves the number's own space is kept.
  2. `tier-reasons.ts:51` `BASELINE_TIER = "regular"` mirrors the door's baseline rule on the client
     to refuse Days at the field (the door refuses too). It is INC-1074's class on the staff side:
     a renamed baseline would make the field's refusal wrong while the door stays right. Recorded
     as INC-1077 (ruling 5); fixed in P-2 turn (c).
  3. The PMS and PMV fixtures are authored from the migration's declared shape. Rule 10 says
     fixtures are captured; LVP-1…4 prove the real answer (section 12).
- Fixed at the self-review (not counted above): LVP-3 compared the door's `tier_until` with this
  computer's clock — INC-1075's class in the turn's own new spec; now read against the door's own
  audit stamp, exactly (5e66f3398; section 5).
- NH-6 cannot pass on macOS (section 12).
- `numberOrZero` / `numberOrNull` beside `wholeNumber` (section 6).
- The PostgREST version pin (ruling 2: "14.5" in the file, staging reports 14.15) — the
  supervisor's finding, named for completeness.

## Budgets (ruling 4 Q2 — the measurement of record for this turn; the repository's check judges)

The repository's check on the final tree (`bun run build && node scripts/check-bundle-size.mjs`,
and THE CHECKS' budget job): "Bundle budget OK", 0 NEAR. The Promote and admin pages read (KiB,
reading / ceiling): `/admin/listings` 349.6 / 351, `/admin/listings_/$listingId` 351.1 / 353,
`/admin/screening` 370.6 / 373, `/auth` 229.7 / 231, `/my-listings` 320.7 / 322,
`/my-listings_/$listingId` 327.7 / 329, `/settings` 283.3 / 284.

**The method.** The check prints 0.1 KiB, too coarse for E11. Two scratch copies of the repository
under `/tmp` (no `.git`, no `.env*`, `node_modules` linked), identical but for this turn's files —
in the base copy every changed `src/` and `public/` file holds its bytes from `git show
7acae2b4d:<path>` and the new files are absent — were each built with `bun run build`. Every page's
first download was summed in gzipped bytes by the check's own functions (`readRouteManifest`,
`routePreloads`, `staticClosure` from `scripts/bundle-closure.mjs`). Neither copy has a `.env`,
which makes both about 0.1 KiB lighter than the repository's build; the differences are like for
like. Nothing in the repository changed for the measurement.

**Per page, base → final tree** (gzipped KiB; delta in bytes):

```
/                                          231.879 →   231.999 KiB  +123 B
/$name                                     229.842 →   229.955 KiB  +116 B
/account                                   274.241 →   274.374 KiB  +136 B
/account_/legal                            214.333 →   214.457 KiB  +127 B
/account_/legal_/$versionId                215.021 →   215.068 KiB  +49 B
/account_/saved                            229.843 →   229.955 KiB  +115 B
/admin                                     212.702 →   212.750 KiB  +49 B
/admin/                                    213.537 →   213.588 KiB  +52 B
/admin/ai                                  326.164 →   326.317 KiB  +157 B
/admin/attributes                          339.464 →   339.614 KiB  +154 B
/admin/audit                               299.136 →   299.283 KiB  +151 B
/admin/categories                          347.505 →   347.658 KiB  +157 B
/admin/countries                           328.985 →   329.143 KiB  +161 B
/admin/images                              213.350 →   213.400 KiB  +52 B
/admin/impersonation_/$sessionId           293.830 →   293.968 KiB  +141 B
/admin/legal                               284.746 →   284.877 KiB  +134 B
/admin/legal_/$versionId                   282.103 →   282.230 KiB  +131 B
/admin/legal_/edit                         283.799 →   283.856 KiB  +59 B
/admin/listings                            348.625 →   349.329 KiB  +721 B
/admin/listings_/$listingId                350.008 →   350.818 KiB  +830 B
/admin/listings_/$listingId_/edit          411.029 →   411.173 KiB  +147 B
/admin/locations                           273.396 →   273.445 KiB  +50 B
/admin/monetisation                        338.235 →   338.484 KiB  +255 B
/admin/places                              330.482 →   330.638 KiB  +159 B
/admin/roles                               295.967 →   296.033 KiB  +68 B
/admin/roles_/$roleId                      276.357 →   276.410 KiB  +54 B
/admin/screening                           369.935 →   370.382 KiB  +458 B
/admin/translations                        306.873 →   306.935 KiB  +63 B
/admin/translations_/$lang                 310.406 →   310.553 KiB  +150 B
/admin/users                               295.631 →   295.771 KiB  +144 B
/admin/users_/$userId                      290.938 →   291.069 KiB  +134 B
/auth                                      229.200 →   229.494 KiB  +301 B
/auth_/callback                            215.631 →   215.918 KiB  +294 B
/auth_/reset                               217.584 →   217.873 KiB  +296 B
/c/$slug                                   231.879 →   231.999 KiB  +123 B
/dev/primitives                            233.308 →   233.361 KiB  +55 B
/dev/style                                 252.797 →   252.921 KiB  +127 B
/dev/tall                                  212.053 →   212.102 KiB  +50 B
/l/$slug                                   261.766 →   261.888 KiB  +125 B
/legal/$kind                               216.402 →   216.522 KiB  +123 B
/legal/accept                              223.444 →   223.492 KiB  +49 B
/legal/publishing                          217.158 →   217.280 KiB  +125 B
/my-listings                               319.119 →   320.470 KiB  +1383 B
/my-listings_/$listingId                   325.975 →   327.450 KiB  +1511 B
/my-listings_/$listingId_/edit             405.600 →   405.737 KiB  +141 B
/post                                      405.561 →   405.699 KiB  +142 B
/post_/$listingId                          405.524 →   405.663 KiB  +142 B
/privacy                                   216.391 →   216.512 KiB  +124 B
/settings                                  282.649 →   283.022 KiB  +382 B
/terms                                     216.387 →   216.508 KiB  +124 B
(entry closure)                            211.739 →   211.785 KiB  +47 B
```

The buyer's page `/l/$slug`: +125 B (`moneyText` and the entry's preload table; nothing on screen).

**The causes, by chunk** (the same functions, per chunk name without its hash; final tree):
- `/auth` (and `/auth_/callback`, `/auth_/reset`, `/settings`): `door-codes` +533 B, now a chunk of
  its own where it rode inside `auth-service` (−286 B) — the Promote service is the mechanism's
  second consumer, and the 13 family codes are in it; the entry's `index` +45 B; `provider` −11 B.
- `/admin/listings_/$listingId`: the page chunk +132 B (the level line), `change-listing-tier`
  +265 B (the dialog with Days), `tier-reasons` +207 B, `whole-number` +101 B, `format` +79 B,
  `index` +45 B, `use-price-unit-labels` −25 B, `provider` −11 B. `/admin/listings` and
  `/admin/screening` carry the same dialog, `tier-reasons` and `whole-number`.
- `/my-listings`: `promote-sheet-lazy` +2702 B, merged by the bundler with `state-line` (−1574 B,
  which leaves the page's list), `my-listings` +120 B, `my-listing` +16 B, `format` +79 B, `index`
  +45 B. Most of the net is the dynamic import's preload list (the sheet's whole static closure,
  the entry's chunks among them) — PRELOAD-1. The sheet itself (`promote-sheet`, 2331 B) and its
  service stay on demand.
- `/my-listings_/$listingId`: `promote-sheet-lazy` +2705 B, `state-line` −1577 B, the page chunk
  `my-listings_._listingId` +247 B (the control and the done line), `format` +80 B, `index` +39 B,
  `my-listing` +17 B, `use-price-unit-labels` −25 B, `provider` −8 B, the rest ±6 B each.
- Every other page: `format` +79 B (`moneyText`) and the entry's preload table, less the retired
  key's bytes in `provider` (−8 to −11 B) and `use-price-unit-labels` (−25 B) where they ride.

**The base-layer drop** (ruling 3): `post.review.priceLine` leaving the English and Amharic base
strings takes 11 B from `provider` on every page and 25 B from `use-price-unit-labels` on the pages
that carry the price line; no page reads lower overall, because the growth above is larger.

**After ruling 5** (`moneyText` one expression shorter): the repository's check on 68bec0dcd
("Bundle budget OK", 0 NEAR) against its reading on the post-ruling-4 tree: ten pages 0.1 KiB
lower (`/`, `/admin/ai`, `/admin/attributes`, `/admin/listings` 349.5, `/admin/roles_/$roleId`,
`/c/$slug`, `/l/$slug` 262.0, `/legal/publishing`, `/post`, `/settings` 283.2), the rest
unchanged, none higher.

**Ceilings**: one moves — `/auth` 230 → 231 (`ceilingForLocal(229.7)`; DEC-296's NEAR band after
ruling 4's fix; the cause on its line in `scripts/route-budgets.mjs`). No other ceiling moves.
