# P-2 (c) — The fold, build turn c2a — report

Base: 5bd54705d (cursor/p2-fold, c1's last commit; the brief's base is dev af50ca802, unmoved at every read) · Final commit: 8d55cde5c · Brief: docs/governance/briefs/p2-fold.md, with rulings c2a-1 … c2a-9 (`docs/governance/briefs/p2-fold-c2a-ruling-<n>.md`; ruling 9's sha256 `1721388db71f4ad267f6164fa7bcdab1a86520ba3406e06237292751cc622f9e`, equal to the attachment's)
Review: READY · 0 BLOCKER · 0 MAJOR · 4 MINOR · on 8d55cde

## 1. Done / not done, by part and step

c2a is the app fold of the level rows, with the card look and the ad page's names on the SQL side (M-3c-a). Every part the rulings ordered is done; nothing is left for c2a.

- **Step 1, the census (stop 1):** done; ruling 1 approved the file list with its twenty additions.
- **M-3c-a parts 1–6 (stops 2–4; rulings 2 and 3, DEC-352, DEC-353):** done. The card look is precomputed into `feed_index` (`placement`, `badge`) by `feed_index_refresh`. Two triggers queue a level's live ads when its look changes, and `feed_index_check` counts drift. The four doors read the look from the index row; the three card doors answer the `levels` dictionary. Applied on ethio-staging by the supervisor; the types patch is commit 0a78d6a51.
- **INC-1086 (ruling 4 §3.2):** done (1004c1b6a). FR-6's exact card list gains `level`; §4 has the whole-tree census.
- **INC-1085 (rulings 2 §4, 4 §3.3, 5 §2):** done as ruled (2d10fbd6f). One helper, `expectAliasAccepted`, now carries the alias route's answer into the failure. PW-27, PW-48 and PW-141 call it. The scratch names now pass the shape rule (FINDINGS).
- **The GO's steps 3–7 (fd4709864, a09f988f1).** Built:
  - the levels store, seeded from the dictionary;
  - `cardLookOf` / `adPageLookOf` on `{placement, badge}`;
  - the readers and the two routes passing `levels`;
  - the previews and the admin console reading the rows;
  - the seeders (dev style page, feed bench, the e2e ad-page helper);
  - the strings by script, and W1;
  - the CF-LEVEL-1 empties;
  - `ranking.ts` removed, with `[intentional-delete]`.
- **M-3c-a part 7 (stop 7; ruling 6 §2):** done (e7f3e3782). `public_listing_json`'s `level` carries the row's `name_en` / `name_am`. Applied on staging; read back by the supervisor (ruling 7 §1).
- **Ruling 6 §3, the ad page reads its document:** done (ec5dd5420). The pure fields and THE name chooser `levelNameOf` moved to `src/features/levels/level-fields.ts`. `adPageLevelName` names the ad's level from its own document; `l.$slug.tsx` no longer imports the store.
- **Ruling 8 §2, CF-LIST-1's second heard state:** done (4a9263c13). The Promote sheet's current row carries `aria-current`, and the sheet's allowance line is gone.
- **Ruling 6 §5, one level-name helper:** done (a98389e71). `levelNameFor` is in `e2e/helpers/level-overrides.ts`; the four spec copies are gone.
- **The read split (78dee82d5; accepted by ruling 9 §1):** the level rows' hooks sit in `use-level-rows.ts`, beside the store.
- **Ruling 9 §2:**
  - (4c8d75288, af947d8cd) the table read moved to `src/features/levels/level-table-read.ts`, fetched through `loadOnce`, with LVS-10;
  - (d635c89c5) four ceilings moved by DEC-296 with their causes;
  - (8d55cde5c) the changelog line.
- **Ruling 6 §6 / ruling 9 §4:** `bun run checks` whole, the budgets, the self-review, this report.

## 2. Files changed  (verbatim `git diff --name-only 5bd54705d`)

```
`git diff --name-only 5bd54705d` (with this report staged): 122 files.

```
docs/_changelog.md
docs/features/admin-listings.md
docs/features/design-foundation.md
docs/features/e2e-harness.md
docs/features/feed-engine.md
docs/features/levels-store.md
docs/generated/i18n-usage.json
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/briefs/p2-fold-c2a-ruling-2.md
docs/governance/briefs/p2-fold-c2a-ruling-3.md
docs/governance/briefs/p2-fold-c2a-ruling-4.md
docs/governance/briefs/p2-fold-c2a-ruling-5.md
docs/governance/briefs/p2-fold-c2a-ruling-6.md
docs/governance/briefs/p2-fold-c2a-ruling-7.md
docs/governance/briefs/p2-fold-c2a-ruling-8.md
docs/governance/briefs/p2-fold-c2a-ruling-9.md
docs/governance/mechanisms.md
docs/governance/reports/p2-fold-c2a.report.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md
docs/governance/reports/p2-fold-c2a.stop-4.md
docs/governance/reports/p2-fold-c2a.stop-5.md
docs/governance/reports/p2-fold-c2a.stop-6.md
docs/governance/reports/p2-fold-c2a.stop-7.md
docs/governance/reports/p2-fold-c2a.stop-8.md
docs/governance/reports/p2-fold-c2a.stop-9.md
docs/tracking/intentional-deletions.txt
e2e/admin-listings.spec.ts
e2e/admin-screening.spec.ts
e2e/dark-cards.spec.ts
e2e/feed-route.spec.ts
e2e/helpers/ad-page.ts
e2e/helpers/alias-check.ts
e2e/helpers/level-overrides.ts
e2e/my-listings-promote.spec.ts
e2e/post-wizard-category.spec.ts
e2e/sage-tiers.spec.ts
public/i18n-usage.json
scripts/conformance/card-tiers.test.ts
scripts/conformance/choice-lists.test.ts
scripts/conformance/listing-levels-allowlist.txt
scripts/conformance/listing-levels.ts
scripts/feed-bench.test.ts
scripts/feed-bench.ts
scripts/route-budgets.mjs
src/components/marketplace/card-tier.test.ts
src/components/marketplace/card-tier.ts
src/components/marketplace/listing-card.test.tsx
src/components/marketplace/listing-card.tsx
src/components/marketplace/negotiable-badge.test.tsx
src/components/marketplace/tier-flag.test.tsx
src/components/marketplace/tier-flag.tsx
src/features/ad-page/public-listing.test.ts
src/features/ad-page/public-listing.ts
src/features/ad-page/save.ts
src/features/ad-page/similar-ads.test.tsx
src/features/ad-page/similar.test.ts
src/features/ad-page/similar.ts
src/features/admin-listings/change-listing-tier.test.ts
src/features/admin-listings/history.ts
src/features/admin-listings/listing-page.tsx
src/features/admin-listings/listings-page.tsx
src/features/admin-listings/tier-dialog.test.tsx
src/features/admin-listings/tier-dialog.tsx
src/features/admin-listings/tier-reasons.test.ts
src/features/admin-listings/tier-reasons.ts
src/features/admin-listings/use-admin-listings.ts
src/features/admin-screening/screening-page.tsx
src/features/admin-screening/use-screening.test.ts
src/features/admin-screening/use-screening.ts
src/features/feed/feed-page.test.ts
src/features/feed/feed-page.ts
src/features/feed/held-first-page.test.ts
src/features/feed/ranking.ts
src/features/feed/use-feed.ts
src/features/levels/level-fields.ts
src/features/levels/level-table-read.ts
src/features/levels/levels-store.test.ts
src/features/levels/levels-store.ts
src/features/levels/use-level-rows.test.ts
src/features/levels/use-level-rows.ts
src/features/my-listings/my-listing-page.tsx
src/features/my-listings/promote-sheet.test.tsx
src/features/my-listings/promote-sheet.tsx
src/features/posting/posting-service.test.ts
src/features/posting/posting-service.ts
src/features/posting/preview/listing-detail-map-failed.test.tsx
src/features/posting/preview/listing-detail-map.test.tsx
src/features/posting/preview/listing-detail-tier.test.tsx
src/features/posting/preview/listing-detail.test.tsx
src/features/posting/preview/listing-detail.tsx
src/features/posting/preview/preview-sheet.tsx
src/features/posting/refusal-text.ts
src/features/posting/step-review.tsx
src/features/posting/step-where.tsx
src/features/posting/use-draft.ts
src/features/posting/use-edit-draft.ts
src/features/seller/seller-page.test.tsx
src/features/seller/use-seller-feed.ts
src/i18n/locales/am-admin.ts
src/i18n/locales/am-base.ts
src/i18n/locales/am-member.ts
src/i18n/locales/en-admin.ts
src/i18n/locales/en-base.ts
src/i18n/locales/en-guide.ts
src/i18n/locales/en-member.ts
src/integrations/supabase/types.ts
src/routes/api/feed.test.ts
src/routes/api/feed.ts
src/routes/api/seller.test.ts
src/routes/api/seller.ts
src/routes/dev.style.tsx
src/routes/l.$slug.tsx
src/test/e2e-alias-check.test.ts
supabase/migrations/20261108070500_f5397010-c354-4ed9-81fd-0799efc8c7a7.sql
supabase/migrations/20261108070501_6da335da-6663-4037-94a5-428169504eef.sql
supabase/migrations/20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql
supabase/migrations/20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql
supabase/migrations/20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql
supabase/migrations/20261108070505_2d85fa86-6df7-452a-97d2-cb32e7f7a977.sql
supabase/migrations/20261108112436_4d6e08ad-e0c6-4c0e-b675-08a72819b842.sql
```
```

New files in this turn, by `git ls-files`:

```
35 files added, each tracked (`git ls-files` over the list: 35); one deleted, `src/features/feed/ranking.ts`, declared in `docs/tracking/intentional-deletions.txt`.

```
docs/features/levels-store.md
docs/governance/briefs/p2-fold-c2a-ruling-1.md
docs/governance/briefs/p2-fold-c2a-ruling-2.md
docs/governance/briefs/p2-fold-c2a-ruling-3.md
docs/governance/briefs/p2-fold-c2a-ruling-4.md
docs/governance/briefs/p2-fold-c2a-ruling-5.md
docs/governance/briefs/p2-fold-c2a-ruling-6.md
docs/governance/briefs/p2-fold-c2a-ruling-7.md
docs/governance/briefs/p2-fold-c2a-ruling-8.md
docs/governance/briefs/p2-fold-c2a-ruling-9.md
docs/governance/reports/p2-fold-c2a.report.md
docs/governance/reports/p2-fold-c2a.stop-1.md
docs/governance/reports/p2-fold-c2a.stop-2.md
docs/governance/reports/p2-fold-c2a.stop-3.md
docs/governance/reports/p2-fold-c2a.stop-4.md
docs/governance/reports/p2-fold-c2a.stop-5.md
docs/governance/reports/p2-fold-c2a.stop-6.md
docs/governance/reports/p2-fold-c2a.stop-7.md
docs/governance/reports/p2-fold-c2a.stop-8.md
docs/governance/reports/p2-fold-c2a.stop-9.md
e2e/helpers/alias-check.ts
src/features/levels/level-fields.ts
src/features/levels/level-table-read.ts
src/features/levels/levels-store.test.ts
src/features/levels/levels-store.ts
src/features/levels/use-level-rows.test.ts
src/features/levels/use-level-rows.ts
src/test/e2e-alias-check.test.ts
supabase/migrations/20261108070500_f5397010-c354-4ed9-81fd-0799efc8c7a7.sql
supabase/migrations/20261108070501_6da335da-6663-4037-94a5-428169504eef.sql
supabase/migrations/20261108070502_6ea5ac5b-1a2f-4a63-8c3a-a69b6443e755.sql
supabase/migrations/20261108070503_ff2ee3b9-0e37-46b4-9214-e35bec6b61a2.sql
supabase/migrations/20261108070504_5e07ef82-a019-4294-95c9-bc6f44d4335b.sql
supabase/migrations/20261108070505_2d85fa86-6df7-452a-97d2-cb32e7f7a977.sql
supabase/migrations/20261108112436_4d6e08ad-e0c6-4c0e-b675-08a72819b842.sql
```
```

## 3. Behaviour contract — answer tables before → after

Everything not listed here answers as it did at 5bd54705d. The migrations prove each door's body, with its fragments put back, hashes to its last declaration (stops 4 and 7).

| Touched | Before (5bd54705d) | After |
| --- | --- | --- |
| `feed_page`, `seller_feed_page`, `my_saved_listings` (cards) | each card `tier` | each card also `level: {key, placement, badge}` from its own `feed_index` row; NULL axes for a switched-off level, card kept |
| the same three (answer) | `cards`, `next` … | also `levels`: every enabled level row's `key, sort, name_en, name_am, is_baseline`, in (sort, key) order |
| `public_listing_json` | `tier` | also `level: {key, placement, badge, name_en, name_am}` (the nil-key index row's look; the row's names whether enabled or not); no `levels` |
| `feed_index_refresh` | rank only | also writes `placement`, `badge` from one `level_perks_for` call. **The one behavioural change to the writer:** its first SELECT LEFT JOINs `locations` for the country and still locks only the listing (`FOR UPDATE OF l`) |
| `feed_index_check` | its counts | also `listings_with_wrong_look` |
| `listing_packages`, `level_overrides` | no trigger | a look change (`placement`, `badge`, `enabled` on a level row; any write on an override) queues the level's live ads; a name or price change queues nothing |
| `/api/feed`, `/api/seller` | body without `levels` | pass `levels` on; an answer without it is a server error (`readFailure`), never an empty dictionary |
| `parseFeedPage` (feed-page.ts) | a card whose `tier` was not one of three words was dropped (INC-1079) | any level key is kept; an unknown key reads as the baseline row |
| the card (`listing-card.tsx`, `tier-flag.tsx`, `card-tier.ts`) | look and word per tier word | the frame by `placement`, the flag by `badge` (independent axes); the flag's word from the level row's name in the reader's language; no word, no flag |
| the ad page (`l.$slug.tsx`) | look and word per tier word | look and word from its own document's `level`; no store, no read (SBE-1) |
| the previews (Review, Screening, the owner's ad, staff's listing) | the tier word's look | the level row's base look (`useLevelLook`); the plain look while unknown or on a failed read |
| the admin console (roster filter, Set level, reasons, listing page, screening filter) | `TIERS` / `LISTING_TIERS` / `BASELINE_TIER` literals | the level rows; the baseline by `is_baseline` (INC-1077); a row with no name says "Level not known" (`admin.listings.level.unknown`) |
| the Promote sheet | the current row by class only | the current row also carries `aria-current="true"` |
| the level rows' table read | — (new) | fetched on demand (`loadOnce`) when a screen without a card answer first needs it; a failed download goes through `reportOnDemandFailure` and is the screen's error |
| strings | `tier.*`, `admin.listings.tier.*`, the plan keys | the 26 keys of `p2-fold-strings.json`; 13 retired (§8) |

## 4. Censuses

- **INC-1086 — exact-list assertions over the four doors' answers** (`e2e/`, `src/**/*.test.ts`, `scripts/`; `Object.keys(` with `toEqual(` / `toStrictEqual(`, and `toMatchObject(`).
  - The 19 exact `Object.keys(…)` lists:
    - over these answers, one: FR-6, `e2e/feed-route.spec.ts:262` (the card list at :229–262). It gains `level` and stays exact.
    - over other objects, eighteen:
      - `scripts/conformance/import-doors.test.ts:161`
      - `e2e/legal-doors.spec.ts:1429`
      - `e2e/photo-pipeline.spec.ts:1189`, `:1190`
      - `scripts/conformance/strings-layers.test.ts:77`
      - `scripts/ci/turn-checks.test.ts:53`
      - `e2e/my-listings-doors.spec.ts:792`
      - `e2e/ad-page-doors.spec.ts:1088`, `:1158`
      - `e2e/locations-tree.spec.ts:250`, `:256`
      - `src/components/marketplace/ribbon-geometry.test.ts:164`
      - `src/i18n/compiled-layer-loader.test.ts:42`
      - `src/server/imports/route.test.ts:315`
      - `src/lib/themes.test.ts:39`
      - `src/lib/supabase-door.test.ts:317`
      - `src/features/auth/auth-client.test.ts:109`
      - `src/features/posting/edit-step-changes.test.ts:98`
  - The other matches:
    - 222 `toMatchObject` lines, which check a subset;
    - no `toStrictEqual`.
  - No test enumerates the answer keys of `feed_page`, `seller_feed_page` or `my_saved_listings`, so no list gains `levels`.
- **Level names.**
  - `levelNameOf(` has four callers:
    - `listing-card.tsx:113`
    - `public-listing.ts:124`
    - `tier-reasons.ts:37`
    - `tier-dialog.tsx:80`
  - `catalogText(` reads a level's names in two more places:
    - `level-fields.ts:64` (the chooser itself);
    - `promote-sheet.tsx:165`, a bypass (§6).
- **Reads of `listing_packages`.**
  - In `src/` (CF-LEVEL-1): the console's reader, and the table read in `level-table-read.ts`.
  - In `e2e/`, outside the helpers: read by key, sort, caps or whole row, none for a level's name. §6 names the lines.
- **`LIST_ROW_CURRENT` (CF-LIST-1):**
  - the owners;
  - `promote-sheet.tsx`, with `aria-current` on the same element;
  - `location-selector`'s allowance (§6).
- **On-demand loaders (ODC-1):** `use-level-rows.ts` calls `TABLE_READ.load()` and `getSupabase()` inside one awaited `Promise.all` in a try whose catch reports. The census passes.
- **The alias door's rules (ruling 5 §2):** `alias_rule` (20261018142627 :102, mirrored by `aliasShapeOk`) refuses a name with fewer than three letters. `e2e_` holds two, so an all-digit random tail was refusable. `scratchAlias()` writes letters only after `e2e_`. Eight sibling sites still type `e2e_${rand()}` (§6).

## 5. Tests

- **Added or changed unit tests:**
  - LVS-1…9 (`levels-store.test.ts`), LVS-10 (`use-level-rows.test.ts`, new);
  - CTR-1, CTR-1b, CTR-3…5;
  - LC-1, LC-8, LC-11;
  - TFL-1, TFL-3, TFL-4;
  - NGB-1;
  - AV-11, AV-12;
  - TD-1, TD-2, TD-8;
  - TIR-1, TIR-3, TIR-8;
  - SF-6;
  - FP-1, and FP-3 reversed as INC-1079 says;
  - FD-5, SLR-5;
  - PSV-7;
  - PMS-7;
  - FB-7;
  - CL-12 (the planted cases);
  - the alias helper's message-builder tests (`src/test/e2e-alias-check.test.ts`).
- **Red first:**
  - **CL-12:** the tree test failed with the allowance removed before the attribute (`promote-sheet.tsx:150 current: LIST_ROW_CURRENT by class — …`).
  - **PMS-7:** red with a planted constant `"true"` on every row (1 failed, 6 passed).
  - **LVS-10:** red with the hook's report removed (`expected [] to deeply equal [ 'the level rows\' reader' ]`), then green.
- **Unit totals on the final tree** (inside `bun run checks`): component tests 2837 of 2838, scripts 493 of 494. The one red in each is NH-6, this computer's time zone (§12).
- **`bun run typecheck`:** clean.
- **THE CHECKS:**
  - fast line: `checks (fast): 17 PASS · 4 FAIL · 262s`
  - last line: `checks: 24 PASS · 4 FAIL · 30 NOT RUN · 319s`
  - The FAILs:
    - NH-6, in laws-first and component-tests;
    - actionlint and gitleaks, pinned Linux x86-64 builds that cannot run on this arm64 Mac.
  - The NOT RUN steps:
    - the eight behind actionlint, which I ran by hand: format check "All matched files use Prettier code style!"; lint "0 errors, 46 warnings"; typecheck clean; "e2e-select self-test OK"; root routes "12 allowed, 5 refused" and "61 entries; every root segment is safe"; the build, which the bundle-budget job built and passed;
    - two behind laws-first (the changed folders' unit tests, which the component tests ran whole, and Semgrep on changed files, which the semgrep job ran);
    - three installs (no package change);
    - the advisory service (unreachable);
    - the staging-credentialed preflight;
    - the GitHub-only e2e merges and SARIF upload;
    - the promote job.
- **Browser, this turn** (`bun run e2e:local`, ethio-staging, each file whole, alone, both projects, 0 retries):
  - at fd4709864 (stop 6), every file listed there: all green but SBE-1 (stop 6's subject) and the ten INC-1066 tests;
  - at ruling 8's parts: `my-listings-promote` 8 passed; `sage-tiers` 20 passed, 20 skipped; `admin-listings` 70 passed, 6 failed; `admin-screening` 50 passed, 4 failed. The ten failures are AL-20, AL-23, AL-30, SC-25 and SC-26 on both projects (INC-1066). ATR-1…7 and SC-27 passed;
  - on the final tree: `supabase-door` 12 passed; `my-listings-promote` 8 passed; `sage-tiers` 20 passed, 20 skipped; `admin-listings` 70 passed, 6 failed; `admin-screening` 50 passed, 4 failed. The ten failures are AL-20, AL-23, AL-30, SC-25 and SC-26 on both projects, INC-1066 (macOS `Control+A`), the same set as at ruling 8's parts
  - No `[ssr-error]` line in any log read.
- **J-audit (e2e/** changed):** the scratch rows are the harness's own (leased accounts, scratch levels by `e2e_` keys); `levelNameFor` reads by key and writes nothing; no `.first()`, no `waitForTimeout`, no `test.only` in the added lines (grep of the diff).

## 6. K2 — siblings that bypass the mechanism

Greps run: `catalogText(` near level names in `src/`; `levelNameOf(`; `.from("listing_packages")` in `e2e/`; `post-who-alias-ok` and `e2e_${rand()}` in `e2e/`; `LIST_ROW_CURRENT` allowances; `feed_index_check_runs` readers.

- `src/features/my-listings/promote-sheet.tsx:165` names a level with `catalogText(level.nameEn, level.nameAm, language)`, not through `levelNameOf`. The file is in scope (W1), but the chooser move was not ordered for it.
- `src/features/admin-monetisation/use-monetisation-names.ts:55`: `catalogText(…) : key`, the console's product names, with the key as fallback.
- e2e reads of `listing_packages` that are not name reads:
  - `post-wizard-place.spec.ts:1162` (reach caps);
  - `admin-guides.spec.ts:82` (keys);
  - `admin-monetisation.spec.ts:197` (the whole-row round trip);
  - `my-listings-levels.spec.ts:169`, `:282` (sort and keys);
  - `legal-certify.spec.ts:363`, `:372`.
- **INC-1085's class (the alias-tick siblings).** Fourteen `post-who-alias-ok` waits outside the helper:
  - `post-wizard-place.spec.ts`, 4: :443, :561, :735, :1340;
  - `post-wizard-bundle2.spec.ts`, 10: :525, :592, :663, :774, :800, :848, :937, :972, :1698, :1744.

  Eight of them type `e2e_${rand()}`, which the shape rule can refuse:
  - `post-wizard-bundle2.spec.ts:503`, `:773`, `:936`, `:971`;
  - `post-wizard-place.spec.ts:439`, `:560`, `:733`, `:1339`.

  Outside c2a; proposed for c3 with `scratchAlias()` and `expectAliasAccepted`.
- FE-13 (`e2e/feed-index.spec.ts:426–435`) checks a fixed list of the sweep's keys and does not assert `listings_with_wrong_look`. No screen renders `feed_index_check_runs`. Proposed c3 line: FE-13's list gains the key.
- **The `permanent` allowance form.** `scripts/conformance/choice-lists-allowlist.txt` keeps its location-selector line with `until` = `permanent`, a form this guard accepts. G55 says every line carries an expiry. Ruling 8 sends this to R13 as a records question; nothing changed here.
- **For c2b, from stop 1 (g):**
  - the caps block: `monetisation-service.ts:107` (`.from("coverage_plans")`), `caps-editor.tsx`, `caps-forms.ts`, `caps-section.tsx`, `monetisation-order.ts:113`, `e2e/admin-monetisation.spec.ts:290`, `:348`, `:531`, `e2e/helpers/pool-reset-map.ts:54`;
  - INC-1080 (the edit reader's caps, `use-edit-draft.ts`);
  - INC-1084 (`step-where.tsx:134–137`, `1350–1352`, `1700` read a NULL cap as "plan not known");
  - `posting-service.ts:803–807`'s stale comment and the schema's `plan` key;
  - the plan-seam reader's move (`scripts/conformance/plan-seam.ts:54–147`);
  - the product editor's reach caps;
  - M-3c-b, including `admin_list_listings` (20261105080110:76).
- **The alias helper has no census guard of its own (K3):** a departure (§10).

## 7. Allowlists and guards

- `scripts/conformance/listing-levels-allowlist.txt`: 13 → 2 lines.
  - The eleven `tier:` lines leave (DEC-331; ruling 1 Q5).
  - The two `reader:` lines stay. `e2e/helpers/level-overrides.ts`'s reason now also names `levelNameFor`'s read.
- `scripts/conformance/choice-lists-allowlist.txt`: 1 → 1. The Promote sheet's line was added at stop 8 and removed by ruling 8; the location-selector line stays.
- **CF-LIST-1** (`choice-lists.test.ts`): the whole-file regex is gone, and the AST walk hears `aria-current` on the same element. CL-12 tests the planted cases, red first (§5).
- **CF-LEVEL-1** (`listing-levels.ts`): `LEVEL_READER_HOMES` holds `monetisation-service.ts` and `src/features/levels/level-table-read.ts`. Its scripts test passes.
- **ODC-1** (`on-demand-failure.test.ts`): passes with the new loader.
- **Budgets** (`scripts/route-budgets.mjs`): four ceilings moved by DEC-296's form, each with its cause on its line (§10). The checker reports "Bundle budget OK." and the NEAR band "0 NEAR, none grew".

## 8. Strings

`python3 land_strings.py check` (the scripted landing's own check, re-run on the final tree): `strings check: 26 keys x 2 languages, 0 differences; 13 retired keys, 0 still present`.

| Key | Layer | EN | AM |
|---|---|---|---|
| `admin.listings.filter.level` | member | Level | ደረጃ |
| `admin.listings.action.level` | admin | Set level | ደረጃ አስቀምጥ |
| `admin.listings.level.title` | admin | Set the level | የማስታወቂያውን ደረጃ አስቀምጥ |
| `admin.listings.level.done` | admin | Level set to {level}. | ደረጃው ወደ {level} ተቀይሯል። |
| `admin.listings.level.error.same` | admin | The ad already has this level. | ማስታወቂያው አስቀድሞ ይህ ደረጃ አለው። |
| `admin.listings.level.error.removed` | admin | A removed ad takes no level. | የተወገደ ማስታወቂያ ደረጃ አይቀበልም። |
| `admin.listings.level.error.unknown` | admin | Unknown level. | ያልታወቀ ደረጃ። |
| `post.refusal.coverageExceedsReach` | base | That is more places than this ad's reach allows. | ይህ የማስታወቂያው ተደራሽነት ከሚፈቅደው በላይ ቦታዎች ነው። |
| `post.where.reachCaption` | member | This ad's reach: {cities} city | የማስታወቂያው ተደራሽነት፦ {cities} ከተማ |
| `myListings.promote.reach.title` | member | Reach | ተደራሽነት |
| `myListings.promote.reach.hint` | member | A wider reach shows your ad in more places for a set number of days. | ሰፊ ተደራሽነት ማስታወቂያዎን ለተወሰኑ ቀናት በብዙ ቦታዎች ያሳያል። |
| `myListings.promote.reach.current` | member | Current reach | የአሁኑ ተደራሽነት |
| `myListings.promote.reach.included` | member | Included | የተካተተ |
| `myListings.promote.reach.choose` | member | Choose reach | ተደራሽነት ይምረጡ |
| `myListings.promote.reach.done` | member | Reach set until {date}. | ተደራሽነቱ እስከ {date} ተቀምጧል። |
| `myListings.promote.reach.empty` | member | No wider reach is offered for this ad. | ለዚህ ማስታወቂያ ሰፊ ተደራሽነት አይቀርብም። |
| `myListings.promote.error.sameReach` | member | This ad already has this reach until {date}. | ይህ ማስታወቂያ እስከ {date} ድረስ ይህ ተደራሽነት አለው። |
| `myListings.promote.error.lowerReach` | member | Choose a reach wider than the current one. | ከአሁኑ የሰፋ ተደራሽነት ይምረጡ። |
| `myListings.promote.error.unknownReach` | member | This reach is no longer offered. | ይህ ተደራሽነት ከእንግዲህ አይቀርብም። |
| `myListings.promote.error.includedReach` | member | This reach is already included with the ad. | ይህ ተደራሽነት ከማስታወቂያው ጋር አስቀድሞ ተካትቷል። |
| `myListings.promote.error.reachNotOffered` | member | This reach has no price here yet. | ይህ ተደራሽነት እዚህ እስካሁን ዋጋ የለውም። |
| `admin.monetisation.reach.field.cities` | admin | Cities | ከተሞች |
| `admin.monetisation.reach.field.regions` | admin | Regions | ክልሎች |
| `admin.monetisation.reach.field.countries` | admin | Countries | ሀገራት |
| `admin.monetisation.reach.field.unlimited` | admin | No limit | ገደብ የለም |
| `admin.monetisation.reach.field.capsHint` | admin | Leave blank for no limit. | ገደብ እንዳይኖር ባዶ ይተዉት። |

- **Retired:**
  - the Set tier keys: `admin.listings.filter.tier`, `admin.listings.action.tier`, `admin.listings.tier.title`, `admin.listings.tier.done`, `admin.listings.tier.error.same`, `admin.listings.tier.error.removed`, `admin.listings.tier.error.unknown`;
  - the plan keys: `post.refusal.coverageExceedsPlan`, `post.where.planCaption`, `post.where.planFull`;
  - the tier words: `tier.premium`, `tier.featured`, `admin.listings.tier.regular`.
- **EN-only edits of two existing keys** (the turn's ruling 1 §12): `admin.listings.guide.col.status` and `admin.listings.guide.how`, "tier" → "level" (and "Set tier" → "Set level"). Their Amharic already said ደረጃ. This conflicts with rule 10 ("A renamed string is a NEW key; editing a compiled value never reaches production"); §10 names it.
- **The usage maps:** regenerated and committed (1871 keys across 685 files).

## 9. Migrations

Seven files, all applied on ethio-staging by the supervisor and read back (rulings 4 §1 and 7 §1).

| File | sha256 | Mark |
| --- | --- | --- |
| `20261108070500_f5397010-…sql` | `d5e9e9eec22ce6fc64df91ecbd049703e4a57777f9f613d3364298fd36a8b774` | 20261108090000 |
| `20261108070501_6da335da-…sql` | `db4ed5d492b7d4a668518ab429ef348122adda5d1a16dad7fa7bfb270a1418b7` | 20261108090100 |
| `20261108070502_6ea5ac5b-…sql` | `b5b01b3c44a1ef7c3e5a7be13295706c32b1b367a55c45b603c0296a0e0a9dc6` | 20261108090200 |
| `20261108070503_ff2ee3b9-…sql` | `0aa82e5feb7f423063ce6add6c3a6325a414588aabcf195e47a6cfa364569ead` | 20261108090300 |
| `20261108070504_5e07ef82-…sql` | `89efbfd70bba58bdca935eaa20394a23f9471240dfb9066ca92455f0dead7252` | 20261108090400 |
| `20261108070505_2d85fa86-…sql` | `c8a001535102840bf61a4821e4a2a0772db38759967d22f0c4c3d9d6c4d99ad2` | 20261108090500 |
| `20261108112436_4d6e08ad-…sql` | `f7b916f63ad31d0b6cb687abbc9bbe56314082cec94a5a2a1eb278e15f9230bf` | 20261108130000 |

- **Pairing lines:**
  - `apply f5397010 → expect mark 20261108090000`, `6da335da → …090100`, `6ea5ac5b → …090200`, `ff2ee3b9 → …090300`, `5e07ef82 → …090400`, `2d85fa86 → …090500`;
  - `apply 4d6e08ad → expect mark 20261108130000`.
- **`bun run db:proof --fresh`** on the last migration's tree: `db:proof PASS — applied 431/431, CLI 2.120.0, cold, 50 s`. No migration changed after it.
- **The feed doors' timing (DEC-353):** no per-card call; +0.07 ms per 20-card page (`feed_page` 0.437 → 0.513 ms, `seller_feed_page` 0.398 → 0.470 ms).

### Records (plain labels; the numbers are the supervisor's)

- **DEC-351 §8, as built here:** the look rides each card; the dictionary carries the names, the sort and the baseline flag; the ad page stays out of the store. Register row 118 carries it.
- **DEC-352:** the card look is precomputed into `feed_index` (`placement`, `badge`) by `feed_index_refresh` from the one resolver, and the doors read the row. Two triggers queue the level's live ads on a look change; `feed_index_check` guards drift; the ad page reads the same row (stale together with the cards). Alternative P2 was recorded and not taken. Measurement: × 32.9 / × 35.4 with the per-card resolver, whose 0.32 ms per call is planned each call. The propagation window is the drain's (500 a run, every minute). An override's change queues the level's whole set, an accepted superset.
- **DEC-353:** the feed doors' timing tolerance. A change is a STOP when (a) it calls a function PostgreSQL does not inline once per card, or (b) the time per 20-card page grows by more than 1 ms. Class rule: a timing tolerance on a sub-millisecond function is an absolute per-page number plus a named defect.
- **DEC-354 (the supervisor's):** a stop whose pushed migration files carry `bun run db:proof --fresh` PASS satisfies the staging-apply gate; CI's backend start remains the proof before the prod apply.
- **DEC-355:** the growth is ruled by its cause. The reading screens' table read goes behind `loadOnce`; the card pages' and the ad page's growth is the mechanism's cost; ceilings move by DEC-296 with their causes. From here on in P-2 (c), a page's first download grows only by a named cause, listed chunk by chunk.
- **INC-1085:** PW-141 in the repeat lane.
  - Ruling 5 §3's wording: OPEN, watched; cause not reproduced (48 of 48 against staging); the dial excluded by reading; the capture of §2 lands, so the next red carries the route's answer; the flake ledger is read at every verification.
  - Read since: `alias_rule` refuses fewer than three letters, and the old scratch name could carry only two. `scratchAlias()` removes that path (FINDINGS).
- **INC-1086:** FR-6 asserted the card's exact key list; the c2a census and the stop-4 expected-red list missed it. Fixed: the list gains `level`, with the whole-tree census in §4. Class: a door answer's new key makes every exact-list assertion over that answer a consumer.
- **INC-1079:** fixed (`feed-page.ts`: any key kept, an unknown key reads as the baseline; FP-3 reversed).
- **INC-1077:** fixed (`BASELINE_TIER` → `is_baseline` from the dictionary).
- **Register row 118, as landed** (`docs/governance/mechanisms.md`): every screen reads an ad's level from the level rows.
  - `levels-store.ts`: seed, held rows, `levelOf`.
  - `level-fields.ts`: the look, the parsers, THE chooser `levelNameOf`.
  - `use-level-rows.ts`: the hooks.
  - `level-table-read.ts`: the read, on demand.
  - Guards: CF-LEVEL-1, CF-TIER-1…4, ODC-1, the units and the e2e specs it names.
  - Growth: a new level is a row; a new card answer carries the dictionary.
- **The card-look register row** (ruling 2 §5, unnumbered until R13).
- **S555, S556, S557:** the supervisor's records (ruling 3 §2, ruling 3 §3.2, ruling 6 §1). Nothing for the executor.
- **The executor's slips** (ruling 9 §3 records the first two for the Cursor-rules turn):
  1. `git cat-file -e` used for the base rebuild;
  2. `/tmp/c2a-base` left on disk;
  3. `git checkout <file>` used once to restore `use-level-rows.ts` after LVS-10's red-first check (§10).

## 10. Departures

- **The read split and the on-demand module.** `use-level-rows.ts` (78dee82d5) was accepted by ruling 9 §1. `level-table-read.ts` (4c8d75288) is how ruling 9 §2's `loadOnce` was built.
  - Its first shape imported the store and `on-demand-failure`. The bundler then split `levels-store` (0.90 KiB), `entity` (0.48) and `on-demand-failure` (0.31) into chunks of their own on every page.
  - af947d8cd hands the module the client and parses in the hook. The module imports only the pager.
- **Ruling 9's premise ("about 1 KiB back on eight pages") came from my stop 9's estimate, which was wrong.** Most of `use-level-rows.js` (0.79 KiB) is the hooks, not the read. Measured on the final tree against 78dee82d5:
  - the five pages that carried the pager lose it (`read-all-pages.js` left): `/post`, `/post_/$listingId`, `/my-listings_/$listingId_/edit` and `/admin/listings_/$listingId_/edit` −0.16 KiB each, `/my-listings_/$listingId` −0.17;
  - the three admin reading pages without it (`/admin/listings`, `/admin/listings_/$listingId`, `/admin/screening`): +0.06 to +0.07 KiB (the on-demand code).
- **The budgets (ruling 7 §2, ruling 9 §2).** Local build of the final tree against the base (base 5bd54705d, its `.env`-less `supabase-door.js` and `client.js` taken out):

  | Page | Base | Now / ceiling | Change | Chunks that changed (KiB) |
  | --- | --- | --- | --- | --- |
  | `/` | 232.1 | 233.2 / 235 | +1.08 | use-price-unit-labels.js +0.78, feed-page.js +0.13, card-tier.js +0.12, provider.js -0.06, feed.js +0.06, index.js +0.03 |
  | `/$name` | 230.1 | 231.2 / 233 | +1.08 | use-price-unit-labels.js +0.78, feed-page.js +0.13, card-tier.js +0.12, provider.js -0.06, _name.js +0.06, index.js +0.03 |
  | `/account_/saved` | 230.2 | 231.4 / 233 | +1.25 | use-price-unit-labels.js +0.78, save.js +0.23, feed-page.js +0.13, card-tier.js +0.12, provider.js -0.06, index.js +0.03 |
  | `/admin/listings` | 349.6 | 351.4 / 352 | +1.83 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, change-listing-tier.js +0.15, card-tier.js +0.12, provider.js -0.06, index.js +0.03, admin.listings.js +0.03, use-admin-listing.js -0.03 |
  | `/admin/listings_/$listingId` | 351.0 | 352.9 / 354 | +1.87 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, change-listing-tier.js +0.15, card-tier.js +0.12, admin.listings_._listingId.js +0.06, provider.js -0.06, index.js +0.03, use-admin-listing.js -0.03 |
  | `/admin/listings_/$listingId_/edit` | 411.4 | 413.1 / 414 | +1.68 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, card-tier.js +0.12, provider.js -0.06, preview-sheet.js +0.03, index.js +0.03, use-admin-listing.js -0.03 |
  | `/admin/screening` | 370.6 | 372.3 / 373 | +1.74 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, card-tier.js +0.12, provider.js -0.06, admin.screening.js +0.06, preview-sheet.js +0.03, index.js +0.03, use-admin-listing.js -0.03 |
  | `/c/$slug` | 232.1 | 233.2 / 235 | +1.08 | use-price-unit-labels.js +0.78, feed-page.js +0.13, card-tier.js +0.12, provider.js -0.06, feed.js +0.06, index.js +0.03 |
  | `/dev/style` | 253.1 | 254.2 / 256 | +1.14 | use-price-unit-labels.js +0.78, feed-page.js +0.13, card-tier.js +0.12, dev.style.js +0.11, provider.js -0.06, index.js +0.03 |
  | `/l/$slug` | 262.0 | 263.4 / 265 | +1.38 | use-price-unit-labels.js +0.78, save.js +0.23, feed-page.js +0.13, l._slug.js +0.12, card-tier.js +0.12, provider.js -0.06, index.js +0.03 |
  | `/my-listings` | 320.7 | 321.6 / 322 | +0.89 | use-price-unit-labels.js +0.78, feed-page.js +0.13, provider.js -0.06, index.js +0.03 |
  | `/my-listings_/$listingId` | 327.7 | 329.5 / 330 | +1.85 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, feed-page.js +0.13, card-tier.js +0.12, provider.js -0.06, my-listings_._listingId.js +0.05, index.js +0.03 |
  | `/my-listings_/$listingId_/edit` | 405.9 | 407.6 / 409 | +1.68 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, card-tier.js +0.12, provider.js -0.06, preview-sheet.js +0.03, index.js +0.03, use-admin-listing.js -0.03 |
  | `/post` | 405.9 | 407.6 / 408 | +1.68 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, card-tier.js +0.12, provider.js -0.06, preview-sheet.js +0.03, index.js +0.03, use-admin-listing.js -0.03 |
  | `/post_/$listingId` | 405.9 | 407.6 / 408 | +1.68 | use-level-rows.js +0.79, use-price-unit-labels.js +0.78, card-tier.js +0.12, provider.js -0.06, preview-sheet.js +0.03, index.js +0.03, use-admin-listing.js -0.03 |

  Every other page shrinks by 0.01–0.04 KiB (`provider.js` −0.06: the tier words and lists that left; `index.js` +0.03).

  - **Ceilings moved**, each by `ceilingForLocal` with its cause on its line ("the levels store's parser and chooser on hydration, P-2 (c) c2a, DEC-355"):
    - `/admin/listings` 351 → 352 (local 351.4; CI read 351.3 on a69bb24a0);
    - `/admin/listings_/$listingId` 353 → 354 (352.9; CI 352.8);
    - `/my-listings_/$listingId` 329 → 330 (329.5; CI 329.7; ruling 7 §2's cause also named: "the levels store on the owner's ad page, P-2 (c) c2a");
    - `/my-listings_/$listingId_/edit` 408 → 409 (407.6, inside the local NEAR band; CI 407.8).
  - **Not moved:**
    - `/post` and `/post_/$listingId` (407.6 / 408) sit 8 and 45 bytes outside the local NEAR band; DEC-296's form gives 408;
    - every card page, the ad page and `/my-listings` stay under their ceilings and are reported.
  - **The public ad page `/l/$slug`:** 263.4 KiB (ceiling 265; base 262.0; CI 263.4 on a69bb24a0). Its growth is the store's parser and seed through the card readers on that page (similar ads, the save button, `feed-page.js`), not the reader: no `listing_packages`, `useSyncExternalStore` or `getSupabase` is in its first download, and SBE-1 passes.
- **`level-fields.ts`** (ec5dd5420): a new file beside the store, a departure from ruling 1 Q9's "one file"; accepted by ruling 8 §1.
- **The feed bench's mix** uses the feed answer's dictionary for its keys (ruling 1 Q7).
- **A failed read draws the plain look.** On a failed table read the previews draw the plain look, and the filters offer only All.
- **The admin labels say "Level not known" while the rows load** (`admin.listings.level.unknown`).
- **No census guard for the alias helper (K3):** the three tests call `expectAliasAccepted`; fourteen other waits remain (§6).
- **The e2e names are read from the rows** (`levelNameFor`), never typed.
- **Ruling 6's text** was taken by script from the chat, since no attachment was on disk; its sha256 equals the ruling's (stop 7).
- **The guide's EN-only edits** of two existing keys (ruling 1 §12) differ from rule 10's "a renamed string is a NEW key"; ruled.
- **The self-review's MINORs**, outside the ordered changes:
  1. The unit fixtures compose Amharic from words the catalogue already ships (`ደረጃ`, `መሠረት`) and the letter `ሀ` (`levels-store.test.ts`, `public-listing.test.ts`, `tier-reasons.test.ts`). No screen shows them.
  2. `/post` and `/post_/$listingId` are close to the NEAR band (above); CI judges.
  3. `use-level-rows.ts` reports a failed download of the read's module and of the client under one name ("the level rows' reader").
  4. `promote-sheet.tsx:165`'s chooser bypass (§6).
- **FINDINGS:**
  - **SBE-1's cause.** The buyer's ad page asked the levels store for its level's name; on a direct landing the store's one read downloaded the Supabase client (DEC-261). Fixed by M-3c-a part 7 and `adPageLevelName`: the page reads its own document, with no store. SBE-1 passes on both projects, locally (12 of 12 on the final tree) and in CI since 65304c8af.
  - **CF-LIST-1's second heard state:** `aria-current` on the same element as `LIST_ROW_CURRENT` (ruling 8 §2).
  - **The helper:** `levelNameFor` (ruling 6 §5).
  - **The read split:** above.
  - **The budget table:** above, chunk by chunk.
  - **INC-1085's cause, as read:** a shape-rule refusal path (§4). It is not proven to be the 2026-11-08 failure, since that run uploaded no context; it is the one rule that can refuse the old names.
  - **The writer's LEFT JOIN** (§3).
- **The rule-00 git list.** `git cat-file -e` and `git checkout <file>` are not on it. The second restored `use-level-rows.ts` to HEAD for one moment during LVS-10's red-first check; my backup copy then overwrote it with the working version, checked by grep (`loadOnce`, `readTableOnDemand`, `reportOnDemandFailure` present) and by the tests.
- **The STOPs and rulings in c2a:**
  - stop 1 (the census) → ruling 1;
  - stop 2 (the feed door × 33) → ruling 2;
  - stop 3 (15–18 % against 10 %) → ruling 3, DEC-353;
  - stop 4 (MIGRATION, six parts) → ruling 4;
  - stop 5 (INC-1085 not reproduced) → ruling 5;
  - stop 6 (the ad page's name on a direct landing) → ruling 6;
  - stop 7 (MIGRATION, part 7) → ruling 7, DEC-354;
  - stop 8 (CF-LIST-1 by place) → ruling 8;
  - stop 9 (the budgets) → ruling 9, DEC-355.

## 11. CI

The base's CI, read with `gh run view 42444923983` (`ci-status.md` now holds the newest run, a69bb24a0; the two-step check: the run's commit is the base):

```
- Commit: `5bd54705db6c54e6f158ce9585479e158efc657b` (short `5bd5470`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-08T04:21:10Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42444923983
```

`origin/dev` was af50ca802 at every read; no red of an earlier turn.

This pull request's runs in c2a:
- **e515800b8 (42447608177):** PW-141 in the repeat lane, rule 40 (e), not re-run → INC-1085.
- **be5cb21ad, 6e62092ad, fdd1eb4b2:** SUCCESS.
- **9c2671ce1 (42458299530):** the preflight STAGING BEHIND (expected) and FR-6 on lanes 3 and 11 → INC-1086, fixed in 1004c1b6a.
- **12ab0a712 (42470396343):**
  - pinned-tool fetches answered 504 (infrastructure; not re-run, since the next push started a new run);
  - SBE-1 → ruling 6;
  - the budget on `/my-listings_/$listingId` → ruling 7.
- **e2e0f7365 (42476014167):** SBE-1 (fixed in ec5dd5420), the preflight before part 7's apply, the budget.
- **65304c8af (42479258760) and a69bb24a0 (42508660761):** the bundle budget only. On a69bb24a0: `/admin/listings` 351.3/351, `/my-listings_/$listingId` 329.7/329 → ruling 9, fixed in d635c89c5.

No re-run was asked. The run on this report's commit:

Not yet run: this report's own commit is the last code tree's; the first six lines of `ci-status.md` for it are added in the next commit, once its run completes.

## 12. Limits

- **NH-6 fails on this computer only** (its time zone resolves New York). It is the one red in the scripts tests and in the component tests; CI's Linux runners judge it.
- **actionlint and gitleaks** are pinned Linux x86-64 builds and cannot run here. CI judges both.
- **INC-1066:** AL-20, AL-23, AL-30, SC-25 and SC-26 fail locally on macOS (`Control+A`); CI's Linux lanes are their proof.
- **Full-permission tool calls.** The first two attempts of this turn's browser run were refused by the tool itself ("Failed to find tool call context"); the third ran. The scratch copies `/tmp/c2a-base` and `/tmp/ulr.bak` (the hook's backup during LVS-10's red) remain outside the repository for the operator to clear.
- **The base's per-chunk sizes** come from a base build without `.env`; its two env-bearing chunks are taken out of the comparison (§10).
- **The timing figures** come from this computer's Docker, not from staging or CI.
