STOP — p2-fold step 1: the plan (census only; G60)
DONE: STEP 0 (brief saved, roadmap line 3, draft pull request #30), STEP 1 (this census)
LEFT: STEP 2 — the build turns, after the supervisor's ruling
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `af50ca802c2b44974d3abe4d7f3fb68340bc4eaa` (short `af50ca8`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-07T09:53:38Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42360042346
FILES:
docs/governance/briefs/p2-fold.md
roadmap.md
docs/governance/reports/p2-fold.stop-1.md

Base af50ca802; `origin/dev` read again at the stop: still af50ca802. Nothing outside the brief,
roadmap line 3 and this report changed. The questions the ruling must answer are collected in
**(e) QUESTIONS** at the end; the STOP lines (premises the tree proves wrong) are in **(e)**.

How the census was read: SQL by each function's LAST declaration (the `lastDeclarations()` reader
in scripts/conformance/plan-seam.ts, run from a scratch script outside the repository), src/,
scripts/ and e2e/ by `rg` on the definitions named in the task. Line numbers are at af50ca802.

---

## (a) CONSUMERS

### (a1) An ad's level or reach is read or named

**scripts/conformance/listing-levels-allowlist.txt** has **11** `tier:` lines, not twelve (the
twelfth, `use-admin-listing.ts`, left in turn (b)), each `until 2027-03-31`, plus one
`reader:e2e/helpers/listing-seed.ts | … | DEC-342` line:

| File:line | What it does | Verdict |
|---|---|---|
| src/features/feed/ranking.ts:5 | `export type ListingTier = "premium" \| "featured" \| "regular"` | bypasses (the rows are the vocabulary) |
| src/features/feed/feed-page.ts:87, :113, :136 | `TIERS` list; `!TIERS.includes(v.tier)` → `return null` (a card of a fourth level is dropped silently); `v.tier as ListingTier` | bypasses (and a silent drop: STOP line E-9) |
| src/components/marketplace/card-tier.ts:13, :69, :136, :167, :173 | `PaidTier`; `cardLookOf` (premium gold, featured sage, regular plain); `adPageLookOf`; `CARD_TIERS`; `tierOf` | bypasses (look keyed by the word, not by `placement`/`badge`) |
| src/components/marketplace/tier-flag.tsx:39 | `tier === "premium" ? t("tier.premium") : t("tier.featured")` | bypasses (name from a key, not the row) |
| src/features/admin-listings/tier-reasons.ts:19, :26–28, :51, :71–72, :86–88 | `TIERS`; `TIER_LABEL` (tier.premium, tier.featured, admin.listings.tier.regular); `BASELINE_TIER = "regular"` (INC-1077); `tierProblem`; `tierErrorKey` | bypasses |
| src/features/admin-listings/use-admin-listings.ts:16 | `LISTING_TIERS` (the filter's options) | bypasses |
| src/features/admin-listings/listings-page.tsx:220 (also :263, :370, :780) | local `tierLabel` closure, the filter, the row tag | bypasses |
| src/features/admin-listings/listing-page.tsx:467 (also :181, :391, :525, :736) | `listing.tier !== "regular"`; local `tierLabel` | bypasses |
| src/routes/dev.style.tsx:155, :177–179, :267, :274 | the style page's sample cards by word | bypasses (sample data; seeds by key) |
| scripts/feed-bench.ts:464, :470 | bench seeds by word | bypasses (seeds by key) |
| e2e/helpers/ad-page.ts:122 | seeds `"regular"` | bypasses (seeds the baseline key) |
| e2e/helpers/listing-seed.ts (`reader:` line) | reads the baseline through its own query | uses (DEC-342's recorded reader) |

Other sites the allowlist does not name:

| File:line | What it does | Verdict |
|---|---|---|
| src/features/admin-listings/history.ts:25, :45, :66, :87 | the history panel's `tier` field, labelled `admin.listings.filter.tier` ("Tier") | bypasses (a person reads "Tier") |
| src/features/admin-screening/use-screening.ts:14, :69, :132, :175 | `ListingTier`, `tierOf(row.tier)`, the queue's `.eq("tier", …)` filter | uses card-tier's `tierOf` (which bypasses) |
| src/features/admin-screening/screening-page.tsx:39–41, :140, :421, :578, :581 | `TierValue`, `isTierValue`, `TIER_LABEL`, the Tier filter with `admin.listings.filter.tier` | bypasses (through tier-reasons) |
| src/components/shell/app-shell.tsx:754 | `("regular" as const)` | **not a level**: the session tier (`SessionTier`, src/lib/session-policy.ts:43); outside the fold (premise correction) |
| SQL `admin_list_listings` 20261105080110:76 | `p_tier NOT IN ('premium','featured','regular')` | bypasses (the only level word left in any last declaration) |
| SQL column default 20260804213701:8 | `tier text NOT NULL DEFAULT 'regular'` (never altered since) | bypasses (E-10) |
| SQL `baseline_level_key()` 20261104124957:89; `transition_listing` 20261104124958:37; `level_perks_for` 20261103040805:131; `promote_options` 20261106233808:27 | read the rows | use |
| SQL readers of an ad's `reach`: `admin_listing_detail` 20261105080110:178, `designation_sweep_core` 20261105080106:130/:137, `my_listing` / `my_listings` 20261105080109:219/:127, `set_listing_reach` 20261104153959:64–91 | show or end the reach | use; **no reader turns an ad's reach into a cap** (plan §9.6 still true at this base) |

**e2e specs with level-word literals** (`rg` counts, 125 lines over 15 specs): admin-listings 35,
feed-screens 32, feed-route 16, sage-ad-page 13, sage-tiers 13, admin-screening 5, feed-index 3,
and 1 each in ad-page-doors, breadcrumbs, dark-cards, locale-format, my-listings-ad,
my-listings-doors, my-listings-page, one-line-slots. These are seeds and expectations by key;
under ruling 1 Q1 the column keeps its keys, so they stay valid as keys. The ones that assert the
**word "tier" or a tier key's text** are listed under (c) "Exact lists and fake-t text".

### (a2) A seller's cap is read

SQL (last declarations):

| Function | File:line | Reads | Verdict |
|---|---|---|---|
| `seller_plan(uuid)` | 20260919054044:73 | answers the literal `'free'` | the seam (retires) |
| `plan_photo_cap(text)` | 20260919054044:86 | `coalesce(…, 10)` from `coverage_plans.max_photos` | the seam (retires) |
| `plan_caps(text)` | 20260919054044:101 | `coalesce(p_plan, 'free')` → the plan row | the seam (retires) |
| `register_listing_photo` | 20261019140533:122, cap at :158 | `plan_photo_cap(seller_plan(…))` | bypasses the level |
| `get_posting_schema(p_category_id)` | 20261017091410:90, block at :203 | `'plan', plan_caps(seller_plan(auth.uid()))` | bypasses; **takes no listing id** (E-2) |
| `validate_listing_draft(p_uid, p_step, …)` | 20261103040808:22, `v_plan coverage_plans` :42, caps :383–392 | `coverage_plans WHERE plan = seller_plan(p_uid)` | bypasses; **takes no listing id or reach** (E-3) |
| `listing_places_trim(p_listing_id)` | 20261105080105:29, caps at :53–54 | `seller_plan` → `coverage_plans` (the sweep's reach-end trim; called by `designation_sweep_core` 20261105080106:122) | bypasses; **not in the task's list** (census hit; ruling 10 H1 / ruling 15 §4 place it in (c)) |
| `admin_set_coverage_plan(…10 args)` | 20261102081500:52 | writes `coverage_plans`; `has_permission(…,'coverage','update')` + step-up; audit `coverage.plan.update`; the only reader of `max_active_ads` (:90–:119) | the console's door (retires) |

`validate_listing_draft`'s six callers (each a whole redeclaration if its signature changes):
`submit_listing` 20261006225254:488, `edit_listing` 20261014194317:369, `set_listing_price`
20261014194317:736, `publish_listing` 20261104154001:65, `edit_my_listing` 20261019115951:200,
`admin_edit_listing_core` 20261028233839:224.

Two facts in the validator matter to the fold: it already computes the ad's market from its places
(`min(l.country_code) INTO … v_market`, :381), and it computes `v_anchors` (country-level places)
which nothing reads, while `cityRequired` (:369) refuses every place that is not a city or a
sub-city. So `coverage_plans.allow_everywhere` is enforced nowhere today (E-5).

src:

| File:line | What it does | Verdict |
|---|---|---|
| src/server/media/photo.ts:131–146 `planPhotoCap` | service rpcs `seller_plan` then `plan_photo_cap` | bypasses — **the task's "no src reader names a cap" is wrong** (E-1b) |
| src/features/posting/schema-shape.ts:90–104 | parses the schema's `plan` block | uses the schema door |
| src/features/posting/posting-service.ts:805–816 (`PlanCaps`), :838, :847 | the plan block's type and reader | uses |
| src/features/posting/wizard.tsx:462, :570–582 (`setPlanCaps`), :1537, :1650–1652, :1688 | holds the caps; the wizard also edits LIVE ads (`useEditDraft`) | uses (but reads a new ad's caps for an edit: E-2) |
| src/features/my-listings/my-listing-page.tsx:233–243 | caps for the owner's page | uses |
| src/features/posting/step-photos.tsx:132; step-where.tsx:1127, :1350, :1700–1729; step-review :449 | draw the caps | use |
| src/features/admin-monetisation/monetisation-service.ts:107 | `.from("coverage_plans")` (the caps block) | the console's reader (retires) |
| src/features/admin-monetisation/caps-forms.ts, caps-editor.tsx, caps-section.tsx; monetisation-page.tsx:9, :39–40 (`maySeeCaps`/`mayUpdateCaps` on `coverage:view`/`coverage:update`); use-monetisation.ts:41–44; monetisation-order.ts:26, :113–116 (the strip's fourth step) | the Posting caps block | retire |

scripts: scripts/conformance/plan-seam.ts and its allowlist (CF-PLAN-1); `reads:admin_set_coverage_plan | … | INC-1034` is its line. **plan-seam.ts also exports the shared SQL reader**
(`declarationsOf`, `dropsOf`, `functionCodeOf`, `lastDeclarations`) imported by listing-designation.ts,
sql-writes.ts, status-map.ts, proof-readers.ts, door-answers.ts (each with its test) and
scripts/doors/catalogue.ts. Retiring CF-PLAN-1 therefore means moving the reader to its own module
first (E-7). wired.test.ts:134–135 names plan-seam.test.ts.

e2e: admin-monetisation.spec.ts MON-15 (:1524–1620) and MON-16 (:1639), the caps step and block in
MON-1 (:614, :618) and MON-2 (:706–708); post-wizard-category.spec.ts PW-29 (:1274, reads
`coverage_plans` at :1286); post-wizard-place.spec.ts PW-82 (:1147, :1149); my-listings-doors.spec.ts
:1201 and my-listings-ad.spec.ts:1147 (`coverageExceedsPlan`); photo-pipeline.spec.ts PP-7 (:290,
:1493, "the eleventh photo is refused": it expects 10); e2e/helpers/pool-reset-map.ts:54.

Permissions: the `coverage` resource with `view` and `update` (update step-up) is seeded at
20260915162505:40–69, and every role holding `locations:manage` inherits both through
`role_permissions` (:80–90). Lines that name the door: scripts/acceptance-doors-allowlist.txt:55,
scripts/doors/manifest.txt:120, scripts/public-surface-allowlist.txt:144 (and :61 for the table).
The admin navigation does not name `coverage`: sections.ts:88 gates Monetisation on `packages:view`;
only the page's block gate reads `coverage:*`. perm-vocabulary.test.ts:135 names `coverage`.

### (a3) The word "tier" reaches a person

| Key (EN file:line; AM file:line) | Text | Callers |
|---|---|---|
| `tier.premium` (en-base :401; am-base :380) | "Premium" | tier-flag.tsx:39, tier-reasons.ts:26, listing-card.test.tsx:144 |
| `tier.featured` (en-base :402; am-base :381) | "Featured" | tier-flag.tsx:39, tier-reasons.ts:27 |
| `admin.listings.filter.tier` (en-member :196; am-member :193) | "Tier" | listings-page.tsx, screening-page.tsx:578, history.ts:66 |
| `admin.listings.tier.regular` (en-admin :357; am-admin :348) | "Regular" | tier-reasons.ts:28 |
| `admin.listings.action.tier` (en-admin :358; am :349) | "Set tier" | listings-page.tsx, listing-page.tsx |
| `admin.listings.tier.title` (:359; :350) | "Set the tier" | tier-dialog.tsx |
| `admin.listings.tier.done` (:360; :351) | "Tier set to {tier}." | change-listing-tier.ts |
| `admin.listings.tier.error.same` / `.removed` / `.unknown` (:361–363; :352–354) | "The ad already has this tier." / "A removed ad takes no tier." / "Unknown tier." | tier-reasons.ts:86–88 |
| `admin.listings.guide.col.status` (en-guide :324–325; am-guide :286) | "…the ad's tier when it has one…" | the listings guide |
| `admin.listings.guide.how` (en-guide :328–329; am-guide :290) | "…date and tier. … Set tier …" | the listings guide |

There is no `admin.listings.tier.hint` key at this base (the plan §6 names one).

"Plan" also reaches sellers (the same seam's words): `post.refusal.coverageExceedsPlan` (en-base
:578, "That is more places than your plan allows."), `post.where.planCaption` (en-member :405,
"Your plan: {cities} city"), and `post.where.planFull` (en-base :611), **which has no caller in src
at this base** (a dead key; finding).

Done already, born "level" in (a)/(b): en-base `myListings.ad.resume` :119, `myListings.paused`
:179, `post.refusal.noFreeSlot` :707; en-member `myListings.levelEnding` :121, `pausedHelp` :122,
`admin.listings.action.levelEnded` / `levelPaused` / `reachEnded` :200–202,
`admin.listings.history.field.reach` :247, `error.noFreeSlot` :252, `myListings.promote.*` :666–686;
en-admin `admin.listings.level.*` :2178–2190. The monetisation guide's level texts do not say
"tier" (plan §9.5 still true).

---

## (b) MECHANISMS already present

- **A level store: none exists.** Today `promote_options` (20261106233808:27, STABLE SECURITY
  DEFINER, `door_context('reader')`) answers per ad; the console reads levels through
  `admin_list_monetisation` (with `catalogText` in use-monetisation-names.ts); cards know only the
  ad's key (`feed_index.tier`, `public_listing_json`). The browser roles may read enabled
  `listing_packages` rows through RLS (scripts/public-surface-allowlist.txt:166). The pattern to
  copy is the category tree (src/lib/category-tree.ts, 539 lines: the route
  `/api/categories/tree` with an ETag `versionCache` and `useSyncExternalStore`; 1.7 KiB in the
  entry today). Two facts shape the store (E-8): the card's look is drawn on the server (SSR), so
  the rows must be there at first paint; and the store's reader file must join CF-LEVEL-1's
  `LEVEL_READER_HOMES` (today only monetisation-service.ts).
- **`catalogText(en, am, lang)`** (src/i18n/entity.ts:57) handles English and Amharic only;
  `EntityType` is category | location | attribute. Register row 101 already records that a third
  public language adds the entity type `product` to the translations doors, so Oromo and Tigrinya
  readers see the English name until then. That is a recorded deferral, not a new conflict, but
  "in the reader's language" (STEP 2) holds for EN/AM only.
- **card-tier.ts / register row 90**: `cardLookOf(tier)` and `adPageLookOf(tier)` key the look by
  the word; the design tokens are named `tier-premium` / `tier-featured` (src/styles.css).
  CF-TIER-1…4 (scripts/conformance/card-tiers.test.ts) judge the look through regexes on those
  token names and on comparisons with `"premium"` / `"featured"` (`TIER_COMPARE`), so keying the
  look by `placement` changes the guard too (its rules, its planted files, possibly
  card-tiers-allowlist.txt). Register row 93 (the staff dialog, runner and door) names
  `TIER_LABEL` and the two local `tierLabel` closures as its known bypasses.
- **`baseline_level_key()`** (20261104124957:89): the row with `is_baseline`, used by
  `transition_listing` and the sweep. **`level_perks_for(key, category, market)`**
  (20261103040805:131; callers `set_listing_level`, `promote_options`): max_photos, placement,
  badge, days by override order.
- **The level seeds** (20261103040805:79): regular `max_photos` 4 (standard), featured 8 (boost,
  badge), premium 12 (top, badge). **The free plan's photo cap is 10** (E-1).
- **The reach rows** (20261103040807:19–22): `city` (30 days, enabled, `self_serve` false, sort
  100), `nationwide` (self-serve, 110), `worldwide` (self-serve, 120). `market_settings` holds
  `included_reach` (FK to the key); the default market row (country NULL) is seeded with `'city'`
  (:64–66). `market_settings_for(country)` (20261104153957:23, service-only) answers the country's
  row, **else the default row**, else raises `marketNotSet`, so a new ad with no place yet still
  has a market to read.
- **`set_listing_reach`'s contract** (20261104153959:30), in order: notSignedIn, deactivated,
  listingNotFound (owner, FOR UPDATE), notLive (live or paused), rateLimited (`promote`),
  unknownReach (`kind='reach' AND enabled AND self_serve`), listingNotPlaced (no place),
  includedReach (the market's included key), sameReach, lowerReach (`sort <=` the current reach,
  where the current reach is `coalesce(l.reach, market.included_reach)`), notOffered
  (`product_price_for` NULL), creditsNotAvailable (market `paid_levels` on). The days come from the
  row's `days`, the source is `launch`, and `used_count` is incremented (:83). **What
  `promote_options` would answer for reach**, by the same reads: the ad's current reach
  (`coalesce(reach, included)`, `reach_until`, `reach_source`), the market's included key, and each
  enabled self-serve reach row with names, sort, current/below (by sort against the current),
  days, the price from `product_price_for` (amount, currency) and availability (included /
  notOffered / creditsNotAvailable). Its answer today is levels only (Q4 kept it so), and its proof
  at :123 uses `languages ORDER BY code LIMIT 1` (an INC-1040 site).
- **`LIST_ROW_CURRENT`** is at src/components/shell/menu-row.ts:87 (the task says :86). The Promote
  sheet (src/features/my-listings/promote-sheet.tsx, 219 lines) marks the current row with
  `data-current` (:150–151) and a "Current level" label (:188–191), not with `LIST_ROW_CURRENT`.
  That is W1's site.
- **INC-1040's home**: the real-row guard (INC-445) in scripts/check-migrations.sh (:663–815: the
  perl `real_row_offenders` with its table list `$t`, `REAL_ROW_FLOOR` 20261007000000, the
  allowlist scripts/migration-real-row-allowlist.txt, 49 lines, `file | head | reason | until` with
  a sha256 key, and the fixture scripts/fixtures/bad-real-row-proof-example.sql). The new rule
  belongs in that table, not a second guard. **The landed post-floor proofs that select a real
  reference row by `ORDER BY … LIMIT 1` are 9 sites in 8 files**, not four: 20261102081600:296,
  20261102081700:244 (currencies), 20261104124958:255, 20261104153958:139, 20261104153959:161,
  20261105080108:286 and :297, 20261105080111:145, 20261106233808:123. Older ones are listed in
  INC-1040 itself (incidental-findings.md:5793) (E-12).
- **INC-443's hygiene, read at this base.** Roadmap :681 says what "the rest" is: the allowlist
  **gains** the eleven older browser grants it lacks, each with its reason. Two of the eleven
  (`get_category_tree_version` :156, `price_shape_for_basis` :164) were added since (DEC-310), so
  **nine are absent and must be ADDED**: `listing_reveal_count`, `cat_primary_pointer`,
  `cat_primary_parent`, `admin_list_categories`, `impersonated_list_listings`,
  `attr_answer_tokens`, `attr_answer_other_text`, `attr_contact_like`,
  `listing_contact_refusals`. Each still holds `GRANT EXECUTE … TO authenticated` as its last grant
  (read file by file). The stale wording is :52, `admin_reveal_listing_contact` "with a fresh
  second factor" (D129 removed it). The duplicate is `transition_listing` at :22 and :54. The task's
  STEP 2 says "without INC-443's nine absent names", which reads as removing them (E-11). The
  f1-doors stop report (:503) also recorded that the authenticated side has 106 functions absent in
  all, invisible because DEC-310 compares anon only (INC-1025); out of this task's scope.

---

## (c) THE SPLIT

The supervisor's c1/c2/c3 holds in its order, with four corrections the tree forces:
1. **Three migrations, not two.** The validator's six callers are whole redeclarations of the
   largest doors, so the reach caps on the validator are their own migration and stop.
2. **The DROPs move to the end of c2.** If c1 drops `coverage_plans`, the console's caps block
   (still drawn until c2) breaks, and MON-1, MON-2, MON-15 and MON-16 go red between turns. The
   retirements land after the app stops reading them, so nothing is red at any turn's end.
3. **`listing_places_trim`** joins the reach-caps migration.
4. **`photo.ts:131–146`** joins c1, since it is a src reader of the cap.

### c1 — Tier A, the SQL side (with the src photo reader), three stops

**M-3a — the additive caps (stop 1).**
- `listing_packages` gains nullable `max_cities`, `max_regions`, `max_countries` and
  `allow_everywhere`, with a CHECK by kind (perks NULL on reach; caps NULL on level, the way the
  perks are). The seeds: city = today's free row (1/1/1, not everywhere); nationwide = no city or
  region cap (NULL means unlimited, Q-C) within one country; worldwide = `allow_everywhere`.
- `listing_photo_cap(p_listing uuid)`: service-only, the ad's `level_perks_for(l.tier,
  l.category_id, market)->>'max_photos'`, where the market is the ad's place's country through
  `market_settings_for`'s rule.
- `register_listing_photo` (20261019140533) redeclared whole onto it.
- `get_posting_schema`'s `plan` block onto the baseline level's perks plus the default market's
  included reach's caps (E-2 decides whether it also takes a listing).
- Possibly the column default (E-10).
- src: photo.ts `planPhotoCap` onto `listing_photo_cap`; posting-service.ts / schema-shape.ts if
  the block's shape changes (the plan keeps the name `plan`).
- Tests: the migration proofs (scratch rows, sentinel rollback, laws 11–14, a scratch language);
  photo.ts unit test; PP-7's expectation read from the ad's level row in a scratch category, never
  a literal 10 or the real row (G27; the value is E-1's answer).

**M-3b — the reach caps on the validator and the trim, the reach answer (stop 2).**
- `validate_listing_draft` reads the reach row: for a draft or new ad, the included reach of the
  market its places give (`v_market` is already computed); for a live ad, the ad's own reach.
- This changes the validator's signature (E-3), so DROP + CREATE and the six callers redeclared
  whole from their live definitions.
- `listing_places_trim` onto the included reach's caps.
- `promote_options` answers `reach` beside `levels` (the same reads as `set_listing_reach`).
- Refusal reason names stay `coverageExceedsPlan:<level>` so no app map goes red; only the words
  change (d).
- Tests: proofs per caller (a nationwide ad's edit keeps its places; a city ad over its cap is
  refused, nothing written); e2e PW-29 and PW-82 move from `coverage_plans` onto the scratch reach
  row; SWP-3 (the trim) against the reach row; a new door test for `promote_options`' reach answer.

**Expected red after c1: none.** The console still reads `coverage_plans`, which is still there
and now unread by any door.

### c2 — Opus, the app fold, and the retirements (stop 3 for M-3c)

- **The one store of level and reach rows** (E-8 decides its shape), its reader file in
  `LEVEL_READER_HOMES`.
- The fold of the 11 + 6 sites above:
  - `ListingTier` → `string`;
  - feed-page.ts accepts any key;
  - card-tier.ts keyed by `placement`/`badge` with CF-TIER-1…4 updated and their planted files;
  - tier-flag's word from `catalogText`;
  - tier-reasons / use-admin-listings / listings-page / listing-page / screening-page /
    use-screening / history read the rows (`BASELINE_TIER` reads `is_baseline`, INC-1077);
  - dev.style.tsx, feed-bench.ts and ad-page.ts seed by the baseline key;
  - `admin_list_listings`' literal set goes (in M-3c).
- **The caps block retires**: caps-editor.tsx, caps-forms.ts and caps-section.tsx deleted
  (intentional-deletions.txt); monetisation-page.tsx, use-monetisation.ts and monetisation-service.ts
  lose their caps parts; the strip's fourth step leaves monetisation-order.ts.
- **The strings** "tier" → "level" and "plan" → reach, by script from the supervisor's file.
- **W1**: the sheet's current row carries `LIST_ROW_CURRENT`.
- **The guards**: the CF-LEVEL-1 allowlist empties (DEC-331 replaces its date); the shared SQL
  reader moves out of plan-seam.ts into its own module (its seven importers re-pointed), then
  CF-PLAN-1, its allowlist and the wired.test.ts line retire; CF-PERM-1 per Q-P.
- **M-3c — the retirements**, after the app no longer reads them:
  - DROP `plan_photo_cap`, `seller_plan`, `plan_caps`, `admin_set_coverage_plan`, then
    `coverage_plans` (I propose DROP, not a deferral: after M-3b and c2 nothing reads it, and
    keeping it leaves a browser-readable table of dead numbers, public-surface :61);
  - the `coverage` permissions deleted from `role_permissions` / `permissions` / `resources`;
  - `admin_list_listings` redeclared without the literal set;
  - the allowlist lines retired (public-surface :61 and :144, acceptance-doors :55,
    doors/manifest :120, pool-reset-map :54), with INC-443's hygiene in the same edit of
    public-surface-allowlist.txt.
- **Tests**:
  - unit: card-tier, tier-flag (name from a row), feed-page (a fourth key kept), the reasons and
    dialog, the store, monetisation-order (three steps);
  - e2e: sage-tiers, feed-screens, admin-listings ATR-2/3/5/6/7 and SC-27 words, MON-1 (:614/:618
    lists lose `caps`), MON-2 (:706–708 removed), MON-15 and MON-16 retired with their ids
    recorded.

**Expected red inside c2 before M-3c is applied: none.** The app stops reading, then the DROP
lands.

### c3 — Opus, the reach surface and the housekeeping (no migration)

- **The Promote sheet's Reach section** on `promote_options`' reach answer and `set_listing_reach`
  (promote-sheet.tsx, promote-service.ts, the seller's words), with its unit tests and e2e in
  my-listings-promote.spec.ts.
- **INC-1037**: scripts/admin-tables.test.ts:**246** (TBS-2, `GOOD.replace("<ColumnsButton />",
  "<ColumnsButton />")`; not :199; the only no-op replace in the tree by a pcre2 scan).
- **INC-1040**: a rule in check-migrations.sh's real-row table with a planted fixture; the 9 sites
  per the ruling.
- **#431**: check-outbound-calls.ts:60.
- **#432**: src/server/jobs/route.ts:69 (`JOBS[job]` through `ownValue` on a frozen registry).
- **PR #11**: perm-vocabulary.ts:47 (`new RegExp(\`insert\\s+into\\s+public\\.${table}\\b\`)`); a
  literal table of the two patterns.

### Lists a new or retired name must join or leave

- scripts/conformance/listing-levels-allowlist.txt (empties) and listing-levels.ts
  `LEVEL_READER_HOMES` (the store's file joins).
- scripts/conformance/plan-seam-allowlist.txt and wired.test.ts:134–135 (retire).
- card-tiers-allowlist.txt (if the look's keys change).
- scripts/public-surface-allowlist.txt (:61, :144 out; nine in; :52 reworded; :22/:54 once).
- scripts/acceptance-doors-allowlist.txt:55 and scripts/doors/manifest.txt:120 (out).
- The doors manifest and public-surface line for `get_posting_schema` if its signature changes (E-2).
- e2e/helpers/pool-reset-map.ts:54 (out).
- scripts/migration-real-row-allowlist.txt (if INC-1040 is allowlisted).
- docs/tracking/intentional-deletions.txt (the three caps files, plan-seam.ts/test/allowlist).
- docs/generated/i18n-usage.json and public/i18n-usage.json.
- The route budgets below.
- If the store becomes a first read: `firstReadLinks` (src/lib/first-reads.ts) and the box census
  for its loading place.

### Route budgets — readings from the lock-exact build at af50ca802

`bun install --frozen-lockfile` reported no changes; `bun run build && node
scripts/check-bundle-size.mjs` printed "Bundle budget OK." (entry JS 212.0 / 215 KiB, CSS
23.1 / 40 KiB). The pages the fold touches:

| Page | Reading / ceiling (KiB, gzip) | Why touched |
|---|---|---|
| `/` | 232.1 / 235 | cards (look, flag, store) |
| `/c/$slug` | 232.1 / 235 | cards |
| `/$name` | 230.1 / 233 | seller page cards |
| `/account_/saved` | 230.1 / 233 | cards |
| `/l/$slug` | 262.0 / 265 | ad page look, word |
| `/dev/style` | 253.1 / 256 | sample cards |
| `/my-listings` | 320.7 / 322 | Promote (chunk on demand), cards |
| `/my-listings_/$listingId` | 327.7 / 329 | Promote, caps words |
| `/my-listings_/$listingId_/edit` | 406.0 / 408 | wizard caps |
| `/post`, `/post_/$listingId` | 405.9 / 408 each | wizard caps, photo cap |
| `/admin/listings` | 349.5 / 351 | roster, filter, dialog |
| `/admin/listings_/$listingId` | 351.1 / 353 | ad page, dialog, history |
| `/admin/listings_/$listingId_/edit` | 411.4 / 414 | wizard caps |
| `/admin/screening` | 370.6 / 373 | filter, preview look |
| `/admin/monetisation` | 338.7 / 341 | caps block leaves (expect a drop) |

No page is inside the 0.3 KiB band today. Retired strings shrink the admin and member layers; any
NEW base-layer key grows every page, so the drafts below put the new keys in the member and admin
layers wherever only those routes show them. A store module on the card pages is the one likely
growth (E-8).

### Exact lists and function text through a fake `t`

- e2e lists: admin-monetisation.spec.ts:614 (the strip's steps `["markets", "products", "prices",
  "caps"]`) and :618 (the blocks `["markets", "levels", "reach", "caps"]`), both in MON-1;
  MON-2 :706–708 (the caps block and step absent for a viewer).
- e2e tier-key text: admin-screening.spec.ts :1520–1528 (SC-27); my-listings-promote.spec.ts
  :142–144, :449, :493; sage-tiers.spec.ts :486, :592, :653, :664; admin-listings.spec.ts
  :2333–2404, :2546 (ATR-*).
- Unit tests through a fake `t`: tier-flag.test.tsx :30, :81, :106, :120 (`tier.premium` /
  `tier.featured` as the flag's name); listing-card.test.tsx:144 (`` `tier.${tier}` ``);
  tier-reasons.test.ts; tier-dialog.test.tsx; change-listing-tier.test.ts:72;
  monetisation-order.test.ts MNO-1 (:93, the four steps with `["caps", "set"]` :109 and
  `steps[3]` the caps anchor :113) and MNO-2 (:116); monetisation-page.test.tsx:135
  (`admin.monetisation.caps.title`).
  src/test/own-key-sites.test.ts names no level key.

---

## (d) STRINGS (EN drafts; AM is the supervisor's file)

New keys:

| Key (layer) | EN draft | Replaces |
|---|---|---|
| `admin.listings.filter.level` (member) | Level | `admin.listings.filter.tier` (filter, screening filter, history field) |
| `admin.listings.action.level` (admin) | Set level | `admin.listings.action.tier` |
| `admin.listings.level.title` (admin) | Set the level | `admin.listings.tier.title` |
| `admin.listings.level.done` (admin) | Level set to {level}. | `admin.listings.tier.done` |
| `admin.listings.level.error.same` (admin) | The ad already has this level. | `admin.listings.tier.error.same` |
| `admin.listings.level.error.removed` (admin) | A removed ad takes no level. | `admin.listings.tier.error.removed` |
| `admin.listings.level.error.unknown` (admin) | Unknown level. | `admin.listings.tier.error.unknown` |
| `post.refusal.coverageExceedsReach` (base) | That is more places than this ad's reach allows. | `post.refusal.coverageExceedsPlan` (the SQL reason name stays) |
| `post.where.reachCaption` (member) | This ad's reach: {cities} city | `post.where.planCaption` |
| `myListings.promote.reach.title` (member) | Reach | — (c3) |
| `myListings.promote.reach.hint` (member) | A wider reach shows your ad in more places for a set number of days. | — (c3) |
| `myListings.promote.reach.current` (member) | Current reach | — (c3) |
| `myListings.promote.reach.included` (member) | Included | — (c3) |
| `myListings.promote.reach.choose` (member) | Choose reach | — (c3) |
| `myListings.promote.reach.done` (member) | Reach set until {date}. | — (c3) |
| `myListings.promote.reach.empty` (member) | No wider reach is offered for this ad. | — (c3) |
| `myListings.promote.error.sameReach` (member) | This ad already has this reach until {date}. | — (c3) |
| `myListings.promote.error.lowerReach` (member) | Choose a reach wider than the current one. | — (c3) |
| `myListings.promote.error.unknownReach` (member) | This reach is no longer offered. | — (c3) |
| `myListings.promote.error.includedReach` (member) | This reach is already included with the ad. | — (c3) |
| `myListings.promote.error.reachNotOffered` (member) | This reach has no price here yet. | — (c3; `notOffered` today is worded for a level) |

If the reach caps are edited in the product editor (Q-E), these join too (admin layer):
`admin.monetisation.reach.field.cities` "Cities", `.regions` "Regions", `.countries` "Countries",
`.everywhere` "Everywhere", `.unlimited` "No limit", `.capsHint` "Leave blank for no limit."

Retired (EN + AM each):
- `tier.premium`, `tier.featured`, `admin.listings.tier.regular` (names come from the rows);
- `admin.listings.filter.tier`, `admin.listings.action.tier`, `admin.listings.tier.title`,
  `.done`, `.error.same`, `.error.removed`, `.error.unknown`;
- `post.refusal.coverageExceedsPlan`, `post.where.planCaption`, `post.where.planFull` (no caller);
- the caps block's 53 admin keys: `admin.coverage.*` (50) and `admin.monetisation.caps.edit` /
  `.title` / `.untilP2`;
- the 12 `admin.monetisation.caps.guide.*` keys;
- `admin.roles.perm.resource.coverage` (only if Q-P retires it from CF-PERM-1's reading).

`post.where.planLine`, `planLineUnknown`, `planLevels`, `planDetails` and `planHide` carry no
"plan" in their text and keep their keys.

Guide sentences reworded (new keys, same layer):
- `admin.listings.guide.col.status` → "Live, Reduced reach, Waiting for review, Held, Expired,
  Sold, Rejected, Closed or Removed; the ad's level when it has one; its open reports, when you
  review ads."
- `admin.listings.guide.how` → the same text with "date and tier" → "date and level" and "Set
  tier" → "Set level".

---

## (e) CONFLICTS and STOP lines

Plan §9, re-checked at af50ca802:
1. `transition_listing`'s live site moved again in (a): now 20261104124958:37 (uses
   `baseline_level_key()`). Not (c)'s.
2. `coalesce(expiry_days, 60)`: absent from every last declaration (rg over the bodies: 0). Q8
   ruled it.
3. The job kit premise: (a)'s; unchanged.
4. `max_active_ads`: still read only by `admin_set_coverage_plan` (:90–119); it retires with the
   table.
5. The level guide texts: still no "tier".
6. Reach has no effect: **still true** — no last declaration turns an ad's reach into a cap. M-3b
   ends it.
7. `used_count`: done for reach (set_listing_reach 20261104153959:83).
8. seller_notices: (a)'s; unchanged.
9. `reach` NULL means the market's included reach: confirmed (`coalesce(v_row.reach,
   v_market.included_reach)`, 20261104153959:64).
10. Rule 50: the plan names no live hole, and this census found none.
11. K4 level words in SQL: two remain, the `admin_list_listings` literal set (:76) and the column
    default (E-10).

New STOP lines (premises the tree proves wrong) and conflicts:

- **E-1 — the photo cap falls.** The level rows say regular 4, featured 8, premium 12; every ad
  today gets 10. Folded as written, a baseline ad drops from 10 photos to 4, Featured gets fewer
  than today's free ad, and PP-7 (expects 10) goes red. A product decision: change the seeds in
  M-3a (e.g. regular 10), or accept the drop.
- **E-1b — "no src reader names a cap" is wrong**: src/server/media/photo.ts:131–146 reads
  `seller_plan` and `plan_photo_cap`. It joins c1.
- **E-2 — `get_posting_schema(p_category_id)` has no listing**, and the wizard edits live ads with
  it. A Premium ad's edit would show the baseline cap (4) while the door allows 12. Either the
  schema door gains an optional listing argument (a signature change: DROP + CREATE, manifest,
  public-surface, generated types), or the edit reader (`useEditDraft`'s source) carries the ad's
  caps. Q-A.
- **E-3 — `validate_listing_draft` has no listing or reach argument.** Drafts are always at the
  included reach (`set_listing_reach` refuses non-live ads), so the validator can read that from
  `v_market`. But edits of a live ad with a bought reach (`edit_listing`, `edit_my_listing`,
  `admin_edit_listing_core`, `set_listing_price`) need the ad's reach, or a nationwide ad's own
  places would be refused on edit. That is a signature change and six whole redeclarations (Tier A,
  the reason for M-3b as its own stop). Q-B.
- **E-4 — new-ad caps at schema time** come from the default market (country NULL). A seller who
  then picks a country whose market includes a wider reach sees the default's caps in the wizard,
  while the validator judges by the chosen market. Q-D.
- **E-5 — `allow_everywhere` is enforced nowhere** (`v_anchors` unread; `cityRequired` refuses
  country places). Worldwide's seed means nothing until the validator gives it a rule. Q-D.
- **E-6 — staff have no place to edit the reach caps** once the caps block retires: the product
  editor and `admin_save_listing_package` know only level perks. Adding the caps means a new
  argument list (DROP + CREATE), `admin_list_monetisation` answering them, fields and strings.
  Otherwise the caps are seeds edited by migration (a named deferral). Q-E.
- **E-7 — plan-seam.ts is a shared reader.** Seven files import `lastDeclarations` and its
  siblings from it; CF-PLAN-1 cannot retire by deleting the file. The reader moves to its own
  module first. This is a new mechanism by K3's letter: a module, not a guard, but its register
  row moves.
- **E-8 — the one store and first paint.** Cards are drawn on the server with their look; a
  browser store answers after hydration. Either the store's rows ride the page stream (like
  `HeldFirstPage`) or a first read (`firstReadLinks`), or the card answer carries `placement` /
  `badge` / names from the server while the store serves the screens. The LAW "one store … for
  every screen" and the TOLERANCE "a first download that grows on any page is a STOP" pull against
  each other on the card pages. Q-F.
- **E-9 — feed-page.ts:113 drops a card silently** when its key is not one of the three words (no
  phantom success). Fixed by the fold; named because it is a live rule-10 breach for any fourth
  level staff create today.
- **E-10 — the column default** `tier DEFAULT 'regular'` (20260804213701:8) names a level. If
  staff move `is_baseline`, a new row still defaults to `'regular'`. Q-G: `SET DEFAULT
  public.baseline_level_key()` in M-3a, or leave it and record why.
- **E-11 — INC-443's "nine absent names" means ADD, not remove** (roadmap :681; all nine still
  granted to `authenticated`). STEP 2's "without INC-443's nine absent names" would delete the
  census lines for live grants. I read it as add-with-reason unless ruled otherwise.
- **E-12 — INC-1040's sites are 9 in 8 post-floor files**, not four; the ruling picks
  allowlist-by-file (sha256 key, the existing grammar) or DEC-345 proof-text edits per file
  (only where schema, mark and grant stay byte-identical and the file is not applied where the
  correction matters; which of the eight are applied where is the supervisor's record, not
  readable from here).
- **E-13 — CF-PERM-1 reads INSERT statements only.** The `coverage` resource's INSERT stays in
  20260915162505 forever, so retiring `admin.roles.perm.resource.coverage` fails the guard unless
  it learns DELETE. Q-P.
- **Count and line corrections**: 11 `tier:` lines (not 12); INC-1037 at :246 (not :199);
  `LIST_ROW_CURRENT` at :87 (not :86); app-shell.tsx:754 is the session tier.

## (e) QUESTIONS for the ruling

- **Q-A** (E-2): the schema door gains an optional listing, or the edit reader carries the ad's
  caps?
- **Q-B** (E-3): the validator takes the reach key (callers resolve it) or a listing id (it
  resolves it)? Either is a signature change with six redeclarations; or a different form you
  rule.
- **Q-C**: NULL means "no limit" for `max_cities` / `max_regions` / `max_countries` on reach rows
  (a typed absence, CHECK by kind)?
- **Q-D** (E-4, E-5): worldwide's `allow_everywhere` becomes a validator rule in M-3b (and
  `cityRequired` relaxed for it), or stays unread with a named deferral; and the wizard's caps per
  chosen market or the default's?
- **Q-E** (E-6): reach caps editable in the product editor in (c), or seeds plus a named
  deferral?
- **Q-F** (E-8): the store's shape and how the card pages get their look at first paint.
- **Q-G** (E-10): the column default onto `baseline_level_key()`?
- **Q-P** (E-13): `coverage` leaves the vocabulary (CF-PERM-1 learns DELETE, planted) or the key
  stays while the rows go?
- **Q-photo** (E-1): the levels' photo caps — new seeds, or the drop accepted?
- **Q-split**: three migrations in all — M-3a and M-3b in c1, M-3c (the DROPs) at the end of
  c2 — as above?
- **Q-1040** (E-12): allowlist or proof-text edits for the 9 sites?
- **Q-443** (E-11): add the nine with reasons?
