# cursor-bundle-2 — the census (STEP 1)

Brief: `docs/governance/briefs/cursor-bundle-2.md`, copied by script from the operator's file
`~/Downloads/cursor-bundle-2/cursor-bundle-2.md`. Its sha256
ca29d6a05d13f8d0d142463790c2329793b0cde0f55fbe674f972fea5e292ed6 is equal to the value in the
operator's message. It is saved raw, as bundle 1's brief was.

Base `63d6bee0d` = `origin/dev` at the census's read (`git rev-parse origin/dev`:
63d6bee0d60517187cf1a636666c5ffeb308f7d4), so no file moved under the anchors. Branch
`cursor/bundle-2` holds one commit, `5bf75c693 cursor-bundle-2: the task saved`, not pushed alone.
`git status --short` was empty at STEP 0 and is empty at this read.

CI for the base (`git show origin/ci-evidence:docs/tracking/ci-status.md | head -6`):

```
# CI Status (auto-generated — do not edit by hand)

- Commit: `63d6bee0d60517187cf1a636666c5ffeb308f7d4` (short `63d6bee`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T23:06:30Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44959633359
```

The base's run skipped its lanes as proven by run 44957024871 (cursor/bundle-1 head `9d74f80`).
`e2e-last-failure.md` and `guards-last-failure.md` name the same run with no failure.
`local-backend-proof.md` names an older commit (`8df5d28db`, run 44756753510): it is non-gating
and was not republished for the base. There is no red to fix first.

`bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-2.md`:

```
[check-go] no finding
```

How the census was read. Every number below comes from a command run in this chat.

- The first downloads come from a lock-exact local build of the base (`bun install --frozen-lockfile`,
  `bun run build`, `node scripts/check-bundle-size.mjs`). The pages carrying each reader come from
  the check's own closure helpers in `scripts/bundle-closure.mjs` (`readRouteManifest`,
  `routePreloads`, `staticClosure`).
- The catalogue (item 3) and the plans (item 1's performance lens) were read on the proof stack of
  `bun run db:proof`. A scratch migration (a `DO` block that raises its answer, never committed) was
  applied by `db:proof`, read from its output, and deleted. After each deletion `bun run db:proof`
  answered `db:proof PASS — applied 545/545, CLI 2.120.0, warm, 5 s` and `git status --short` was
  empty.
- No Supabase MCP server was used: none is configured in this Cursor.
- Scratch copies live under `/tmp/ethio-scratch/cursor-bundle-2/` (the operator's to remove):
  - `casts.ts`, `doors-filter.ts` / `.txt`, `ids.ts`, `page-carry.mjs` / `.txt`;
  - `catalogue.txt`, `explain.txt`;
  - `item4-panels.txt`, `item4-choices.txt`;
  - `bundle-base.log`, `build-base.log`, `chunk-modules-base.json`;
  - `dbproof-census.log`, `dbproof-explain.log`, `install.log`.
- The E2E values are set in this environment (tested by name only: `E2E_SUPABASE_URL`,
  `E2E_SUPABASE_PUBLISHABLE_KEY`, `E2E_SUPABASE_SERVICE_ROLE_KEY`).

## Item 1 — DEC-420 (the list doors take several countries and categories)

- **consumers**
  - `admin_list_listings` (manifest :70):
    - `src/features/admin-listings/use-admin-listings.ts` :68 `listAdminListings`, with
      `p_country` :71 and `p_category` :72, both scalars. It USES the door.
    - e2e callers that pass a country or a category:
      - `e2e/admin-listings.spec.ts` :280 (`p_category`), :281–282 (`p_country`).
      - `e2e/ad-page-doors.spec.ts` :373 (`p_category`).
    - e2e callers that pass neither:
      - `e2e/admin-listings.spec.ts` :227–245, :332;
      - `e2e/my-listings-doors.spec.ts` :282 (`p_view` only).
    - Scripts and SQL: no script calls it. No SQL function body calls it; only landed proofs do.
  - `my_listings` (manifest :196):
    - `src/features/my-listings/my-listings.ts`: `filterArgs` :228–239 (`p_category` :236) and
      `readMyListings` :242–259. It USES the door.
    - e2e callers that pass a category: `e2e/my-listings-page.spec.ts` :528, :532, :545 (MLP-5).
    - e2e callers that pass none:
      - `e2e/my-listings-page.spec.ts` :74, :308, :507, :563, :570;
      - `e2e/my-listings-ad.spec.ts` :284, :614, :652, :710.
    - Scripts and SQL: no script calls it, and no SQL body does.
  - No e2e drives either console's country or category filter through the screen.
- **definition** — every door whose table filters by a country or a category. Read by script over
  the manifest and each door's last declaration (`doors-filter.ts`, output `doors-filter.txt`):
  - `admin_list_listings(text,text,text,uuid,text,date,date,text,integer,integer)`, last declared
    in `20261118012800_2fd5e6a5-….sql` :35.
    - Country: `p_country text`, read as `v_country := upper(btrim(coalesce(p_country,'')))` (:61).
      The filter is `v_country = '' OR coalesce(loc.country_code, l.home_country_code) = v_country`
      (:118): the ad's PLACE's market, falling back to its home country.
    - Category: `p_category uuid`, filtered by
      `l.category_id IN (SELECT d.id FROM public.cat_descendants(p_category) d)` (:119).
  - `my_listings(text,integer,integer,text,uuid,text)`, last declared in
    `20261119150200_77d5acc2-….sql` :43. Its category `p_category uuid` is filtered by
    `cat_descendants` in both reads, the counts (:83) and the rows (:157).
  - `admin_list_locations(text,text,text,boolean)`, in `20261115123200_e0edb9a7-….sql` :36.
    - It filters by `p_country_code text`: `p_country_code IS NULL OR l.country_code =
      upper(p_country_code)` (:81).
    - Its caller is `src/features/admin-locations/locations-service.ts` :104, which is OUTSIDE this
      brief's scope (`src/features/admin-locations/`).
  - Not table filters:
    - `admin_export_locations` and `admin_export_categories` take a download's scope.
    - `feed_page` takes the public feed's category and place.
    - `admin_list_users` holds no country argument.
  - Count: two doors named by the brief, plus `admin_list_locations`, plus item 2's new reader.
    That is 3–4, within THE CUT's four.
- **tests**
  - Unit tests: `src/features/my-listings/my-listings.test.ts` (family ML-U, next ML-U29) asserts
    `filterArgs`. `src/features/admin-listings/` has no reader test for `listAdminListings`
    (`use-admin-listing.test.ts` tests the single-ad reader).
  - e2e: `e2e/admin-listings.spec.ts` (AL-, next AL-32), `e2e/my-listings-page.spec.ts` (MLP-, next
    MLP-10) and `e2e/ad-page-doors.spec.ts` (AP-, next AP-58).
  - Migration proofs: each file's own `DO` block, as every door migration since F1-1.
  - Next ids were read by `ids.ts` over `scripts/test-ids.ts`' own `idsIn`, across `src`, `e2e` and
    `scripts`.
- **lists**
  - `scripts/doors/manifest.txt` :70 and :196: the key carries the argument types, so both lines
    change.
  - `scripts/public-surface-allowlist.txt` :52 (`admin_list_listings`) and :74 (`my_listings`): the
    reason gains "a new argument list in cursor-bundle-2 (DEC-420)", the convention of P-1b's lines.
  - `scripts/conformance/seller-names-allowlist.txt` :4 (`admin_list_listings`): unchanged by name.
  - `scripts/conformance/status-map.ts` :32 and :135 read `admin_list_listings`' view arrays by its
    last declaration (CF-STATUS-1). The redeclared body keeps them verbatim.
  - The usage maps: this bundle adds no file that draws a key.
  - The register: no new mechanism (the door shell serves).
  - Exact-list assertions over these doors' arguments: none in `src/**/*.test.ts` or `e2e/`
    (grepped `p_country`, `p_category`, `toEqual({ p_`).
- **old-file-readers**
  - `scripts/doors/check-doors.ts` reads the manifest key against the last declaration's argument
    types (static).
  - `src/integrations/supabase/types.ts` :4689 (`admin_list_listings` Args, `p_category?: string`,
    `p_country?: string`) and :6109 (`my_listings`). The file changes only by the supervisor's
    patch (f1-doors-ruling-1 §11).
  - `docs/features/admin-listings.md` and `docs/features/my-listings.md` describe the arguments.
- **second-readers** — no `vi.mock`, `import()` or `loadOnce` of `use-admin-listings` or
  `my-listings/my-listings`. Static importers:
  - of `use-admin-listings`: `listing-page.tsx`, `listing-photos.tsx`, `listings-page.tsx`,
    `use-admin-listing.ts` and its test, `use-listing-reports.ts`, and
    `admin-screening/photo-reviews.tsx`;
  - of `my-listings`: `account/account-overview.tsx`, `my-listing-page.tsx`, `my-listing.ts`,
    `my-listings-page.tsx`, `my-listings.test.ts` and `state-line.ts`.
- **chunk-graph** — not applicable. The readers change in place, and no module moves between chunks.
  The record (`dist/.chunk-modules.json`, copied as `chunk-modules-base.json`) puts
  `use-admin-listings.ts` in `use-admin-listing-BTzV6gke.js` and `my-listings.ts` in
  `my-listings-DszQZF_V.js`.
- **environments** — client only.
  - `/my-listings` declares `ssr: false`.
  - `/admin/*` routes hold no loader. The readers run inside react-query hooks of signed-in screens.
  - No server function or nitro route calls either door.
- **mechanisms** — read whole before proposing:
  - the door shell: `door_context` and `door_refuse` (last declared `20261120100000_909988ad-….sql`)
    and the manifest grammar (`scripts/doors/manifest.txt` :1–11);
  - the door laws (`docs/governance/briefs/f1-doors-ruling-1.md`):
    - §2: a return-type or argument-type change is DROP + CREATE with the grants restated;
    - §7: the law order;
    - §11: the types arrive by the supervisor's patch;
  - `admin_list_listings` whole, with the e-mail gate's form at :81–82 (`v_email`), :92 (the row's
    e-mail) and :120–123 (the seller term);
  - the migration reader (`scripts/conformance/migration-reader.ts`), whose last declarations
    status-map and check-doors read;
  - the F1-5b held-read law (INC-786): `FOR KEY SHARE` on the listing read before a keyed insert. It
    does not apply here, because these doors are readers and insert nothing.
- **first-download** — before (base build). Pages whose first download carries `use-admin-listing-*`
  or `my-listings-*` (`page-carry.txt`):

  | page | size / ceiling (KiB) |
  | --- | --- |
  | `/admin/listings` | 326.5 / 328 |
  | `/admin/listings_/$listingId` | 327.3 / 328 |
  | `/admin/listings_/$listingId_/edit` | 408.6 / 410 |
  | `/admin/screening` | 343.3 / 344 |
  | `/my-listings` | 309.0 / 310 |
  | `/my-listings_/$listingId` | 319.4 / 321 |
  | `/my-listings_/$listingId_/edit` | 400.6 / 402 |
  | `/account` | 263.4 / 265 |
  | `/post` | 400.6 / 402 |
  | `/post_/$listingId` | 400.5 / 402 |

  The entry `index-Bz_9Kxyr.js` is 142.1 KiB and `shared-shell` 28.9 KiB. After: measured at STEP 6
  on the final tree.
- **premises**
  - DEC-420 (and DEC-417, DEC-418) are recorded nowhere in the tree yet; the brief cites them.
  - "A value the door refuses today": neither door refuses any country or category value today. An
    unknown country or category gives an empty set; a blank country filters nothing. See callee-codes
    and the plan's question 1.
- **callee-codes**
  - `door_context('staff-reader', …, 'filter')` (`admin_list_listings`) can answer `notSignedIn`,
    `accountDeactivated` or `permissionDenied` (`door_refuse`, P0D01). The door lets each pass
    unchanged. It cannot answer `rateLimited`, because a reader spends no dial: it raises
    "door_context: a reader spends no dial" when given one.
  - `door_context('reader')` (`my_listings`) answers no refusal for a signed-out caller; the body
    refuses `notSignedIn` itself (:60).
  - `cat_descendants(uuid)` is service-role only and called as the definer. It refuses nothing; an
    unknown root gives an empty set.
  - `has_permission(uuid,text,text)` answers a boolean and never raises.
- **cell-meaning**
  - `admin_list_listings`:
    - class `staff-reader`; roles `authenticated`; permission `listings:view`; step-up `-`.
    - dial `-`: a reader spends none (`door_context` refuses one for a reader).
    - audit `-`.
    - country `filter`: the caller's reach is the ad's HOME country (`l.home_country_code =
      ANY(v_ctx.countries)`, :114). This differs from the country FILTER's cell, which is the
      place's market with the home country as fallback (:118).
    - acceptance `-`; codes `badValue`.
  - `my_listings`: class `signed-in-reader`; country `-` (owner-keyed on `auth.uid()`); dial `-`;
    codes `badValue,notSignedIn`.
- **findings**
  - `src/features/admin-listings/use-admin-listings.ts` :81 throws `new Error(error.message)` where
    `my-listings.ts` :254 throws the typed `ReaderError(readerFailure(error))`. The first bypasses the
    reader-failure mechanism (K2).
  - `use-admin-listings.ts` :111 reads the total from the first row, `?? 0`. A page past the end
    reports 0, a success-shaped answer for an out-of-range page (K2).
  - Performance (EXPLAIN on the proof stack, `explain.txt`): `locations.country_code` is
    `character(2)`. A `text[]` list compared to it casts the COLUMN:
    - the queue's country filter then loses `locations_country_idx`: one value
      `Index Scan using locations_country_idx`, a `text[]` list `Seq Scan on locations loc`;
    - with the list cast to `character(2)[]` the plan is the one value's, line for line.
- **queued** — see the end of this file.

The plans, one line each (`explain.txt`). The proof stack is nearly empty, so the planner's defaults
always seq-scan `listings`. The same queries were also read with `enable_seqscan = off`, which shows
the index each form can use:

| query | one value | list (`= ANY` / union over roots) |
| --- | --- | --- |
| AL category | `Index Scan using listings_category_idx` | `Index Scan using listings_category_idx` (roots `unnest` × `cat_descendants`) |
| AL country | `Index Scan using listings_location_idx` + `locations_pkey`; filter on `COALESCE(...)` (no index can serve it, either form) | the same, `= ANY('{..}'::character(2)[])` |
| ML category | `Index Scan using listings_category_idx`, filter `seller_id` | the same |
| queue country (today's select) | `Index Scan using locations_country_idx` | `text[]`: `Index Scan using locations_pkey` + filter (index lost); `character(2)[]`: `Index Scan using locations_country_idx` (same) |

## Item 2 — ACT-022's rest (the advertiser on the Screening queue; DEC-417)

- **consumers**
  - `src/features/admin-screening/use-screening.ts`:
    - `readScreeningRow` :146–156 is a direct `.from("listings")` select with `status = 'screening'`
      and `id`;
    - `listScreening` :158–186 is the same select with `count: "exact"`;
    - `useScreeningQueue` :188 uses it.
  - The screen: `src/features/admin-screening/screening-page.tsx` :176
    `useScreeningQueue(page, search, pageSize, { country, tier })` and :277
    `readScreeningRow(openId)`. Lovable owns it, and this bundle does not touch it.
  - `e2e/admin-screening.spec.ts` presses the queue's filters (:512–525 country, :1459–1468 tier).
    No e2e calls a queue door, since none exists.
- **definition** — what the queue's two selects read today:
  - The columns, `SCREENING_SELECT`:
    - `id, title, description, category_id, location_id`;
    - `price_mode, price_amount, price_currency, price_period, price_bp, price_negotiable, price_unit,
      price_unit_text`;
    - `attributes, photos_soon, tier, updated_at`;
    - `category:categories(name_en,name_am)` and `place:locations(name_en,name_am,country_code)`.
  - The filters:
    - `status = 'screening'`;
    - the title by `ilike` with `escapeLike`;
    - the country by `place.country_code = <one>` with `place NOT NULL` (INC-537: the place's market,
      and an ad with no place does not match a country);
    - `tier = <one>`.
  - Order and paging: `updated_at ASC, id ASC`, `range(page × size, …)`, sizes `[25, 50, 100]`
    (:29–31).
  - The authority:
    - The section opens with `listings:review` (`src/features/admin/sections.ts` :77, DEC-163).
    - The rows are read under RLS `listings_admin_read` (`20260809014125_f143deda-….sql` :29–31:
      `has_permission(auth.uid(),'listings','view')`). That check ignores country scope, as
      `has_permission(uuid,text,text)` in `20261106051700_c4e9a6d7-….sql` shows.
    - `docs/governance/listings-console-spec.md` :7 records this as the design: an admin with
      `listings:view` reads every listing.
  - Whether `admin_list_listings` can serve the queue: it cannot, by its view.
    - It returns no `description`, `attributes`, `photos_soon` or `location_id`.
    - It orders by `published_at`/`created_at` DESC, where the queue reads oldest first by
      `updated_at`.
    - Its `waiting` view is `screening` + `held`, not `screening` alone.
    - It gates on `listings:view`, not `listings:review`.
    - Adding the queue's columns would change its return type, which is a DROP of a second
      consumer's door. The queue needs a reader of its own.
- **tests**
  - `src/features/admin-screening/use-screening.test.ts` (families SF- next SF-10, NCU- next NCU-9,
    RTW- next RTW-23).
  - `src/features/admin-screening/screening-decisions.test.tsx` mocks `./use-screening`.
  - `src/features/admin-listings/listing-photos.test.tsx` mocks `@/features/admin-screening/use-screening`.
  - e2e: `e2e/admin-screening.spec.ts` (SC-, next SC-28).
- **lists** — the new door joins:
  - `scripts/doors/manifest.txt` (one line, sorted by key);
  - `scripts/public-surface-allowlist.txt` (an `authenticated` EXECUTE line);
  - `scripts/conformance/seller-names-allowlist.txt`, because its body reads `profiles.seller_alias`.
    Its readers are the seller-names census, `scripts/conformance/seller-names.test.ts`;
  - no `scripts/acceptance-doors-allowlist.txt` line, because a reader writes nothing.
  - The usage maps: no new key.
  - The register: no new mechanism, since the door shell serves.
- **old-file-readers** — none read the queue's select by text. `use-screening.ts` :155 and :185 hold
  `as unknown as` (src, outside item 6's e2e guard); the move removes both.
- **second-readers**
  - The `vi.mock`s of `use-screening`: `screening-decisions.test.tsx` :49 spreads the original and
    stubs `useScreeningQueue`; `listing-photos.test.tsx` :23 stubs two exports.
  - Neither names `listScreening`, `readScreeningRow` or the row's fields, so both stay valid as long
    as those names stay.
  - No `import()` or `loadOnce`.
- **chunk-graph** — not applicable. `use-screening.ts` stays in `use-screening-D-VblR_a.js`.
- **environments** — client only. `/admin/screening` has no loader; the reads run in react-query
  hooks.
- **mechanisms** — `admin_screening_facts` (same file, `listings:review`, `filter`, home country)
  is the queue door's sibling and model for the gate. `admin_list_listings` is the model for the
  e-mail gate: `v_email := has_permission(v_uid,'profiles','view')`, the row's e-mail `CASE WHEN
  v_email THEN u.email::text END`, and the seller term matching the e-mail only `v_email AND …`.
- **first-download** — before: `/admin/screening` 343.3 / 344. The other pages carrying
  `use-screening-*`: `/admin/listings` 326.5 / 328, `/admin/listings_/$listingId` 327.3 / 328, and
  `/admin/listings_/$listingId_/edit` 408.6 / 410. After: STEP 6. `/admin/screening` and
  `/admin/listings_/$listingId` hold 0.7 KiB of room.
- **premises**
  - "The queue reads `listings` by a direct select (:149, :166)" is confirmed: :149 is inside
    `readScreeningRow` and :166 inside `listScreening`.
  - "A staff reader door on `listings:review` … the rows the queue shows today": a door with
    `filter` scope narrows a COUNTRY-scoped reviewer to their markets. Today's RLS read shows them
    every market. The rows differ only for a country-scoped holder; see the plan's question 2.
- **callee-codes** — `door_context('staff-reader','listings','review',NULL,NULL,'filter')` answers
  `notSignedIn`, `accountDeactivated` or `permissionDenied`, each passed unchanged.
  `has_permission(v_uid,'profiles','view')` is a boolean. No other callee.
- **cell-meaning** — the proposed line, with each cell's meaning:
  - class `staff-reader`; roles `authenticated`; permission `listings:review`; step-up `-`.
  - dial `-`: a reader spends none. audit `-`.
  - country `filter`: the caller's reach is the ad's HOME country, as `admin_screening_facts`
    reads it. The country FILTER is the place's market, as the queue reads it today.
  - acceptance `-`; codes `badValue`.
- **findings** — `use-screening.ts` :154, :183, :217 and :310 throw `new Error(error.message)`, not
  `ReaderError`. :154 and :183 move with this item; :217 (`useScreeningPhotos`' reader) and :310
  stay (K2).

## Item 3 — INC-1236 by its frozen rule

- **consumers** — every read of `level_overrides` or `market_settings`:
  - `src/`: none. `rg -n "market_settings|level_overrides" src --glob '!src/integrations/supabase/types.ts'`
    gives only door names and comments (`admin-monetisation/monetisation-service.ts` :24, :33, :231;
    `monetisation-refusals.ts` :105; `monetisation-service.test.ts` :53, :327).
  - `e2e/` reads through the service client: `admin-monetisation` (`readMarket`, `readOverrides`),
    `my-listings-levels`, `my-listings-promote`, `post-wizard-place` :1151, `legal-certify` :317,
    `helpers/reach-rows.ts` :66, `helpers/level-overrides.ts`, and `helpers/listing-seed.ts`
    (`market_settings_for` rpc).
  - `scripts/feed-bench-market.ts` :138, :142 and :168 insert and delete, so the service role.
  - The ONE browser-role read: `e2e/admin-monetisation.spec.ts` MON-13 :1382–1386 (its other
    reads of both tables, such as `destroyScoped` :304–311, run on `adminClient()`).
    - As anon and as a signed-in person, it asserts that
      `market_settings.select("id, free_regular_ads, included_reach, paid_levels")` answers no
      error. Its comment reads "A market's dials are public (the wizard reads them)", and no wizard
      code reads them (the `src/` grep above).
    - Its `level_overrides` loop (:1369–1380) asserts 42501 for `created_by`, `updated_by` and `*`,
      which a revoke keeps.
    - `admin-monetisation.spec.ts` is OUTSIDE this brief's e2e scope (see the plan's question 3).
  - Functions: the catalogue below.
  - The forward-scan: `rg -n -i "promote|level" roadmap.md` over the open lines names no browser
    reader of either table. Promote and the publish door read through definer doors.
- **definition** — the catalogue's answer, on the proof stack (`catalogue.txt`):
  - Table-level, both tables, anon and authenticated: SELECT, INSERT, UPDATE and DELETE are all
    `false`. `role_table_grants`: none.
  - Column-level:
    - `level_overrides` anon and authenticated:
      `SELECT(badge,category_id,country_code,created_at,days,id,level_key,max_photos,placement,updated_at)`.
    - `market_settings` anon and authenticated:
      `SELECT(country_code,created_at,free_regular_ads,id,included_reach,launch_credits,launch_days,paid_levels,paid_levels_since,updated_at)`.
  - Policies, each table:
    - `*_no_delete`, `*_no_insert` and `*_no_update` (`false`) to anon,authenticated;
    - `*_public_read`: SELECT to anon,authenticated USING `true`.
  - Functions naming either table:
    - Definers that `authenticated` may execute: `admin_clear_level_override`,
      `admin_list_monetisation`, `admin_save_level_override`, `admin_save_market_settings`,
      `admin_set_listing_tier`, `promote_options`, `publish_listing`, `set_listing_level`,
      `set_listing_reach`.
    - Closed definers: `designation_sweep_core`, `listings_free_slot_guard`.
    - INVOKER and closed to anon, authenticated and PUBLIC: `level_perks_for(text,uuid,character)`
      and `market_settings_for(character)`.
    - No function a browser role may execute reads either table as its caller.
  - Views: none.
  - `rg -il "force row level security" supabase/migrations` gives 0 files. Definers owned by the
    owner read past RLS, so dropping the open read rules leaves every definer's read intact.
- **tests** — `e2e/admin-monetisation.spec.ts` MON-13 (out of scope; next MON-19). The migration
  proof owes a catalogue read after the revoke. `scripts/doors/live-open-rules.sql` and the smoke
  lane's `check-doors --live` judge `open-rules.txt` against the live catalogue.
- **lists**
  - `scripts/public-surface-allowlist.txt` :161 and :167. The lines STAY: earlier migrations still
    grant the columns, and `scripts/check-migrations.sh`'s public-surface guard (:642–705, through
    `scripts/public-surface.ts --migration`) reads them. The reason takes DEC-407's RETIRED form, as
    lines :24–27, :162 and :165 hold it.
  - `scripts/doors/open-rules.txt` :10 and :12 are removed (check-doors: `open-rule-gone` fails a
    line whose policy no longer stands).
- **old-file-readers**
  - `scripts/doors/live-open-rules.sql` :9 (the live read);
  - `scripts/conformance/listing-levels.ts` (CF-LEVEL-1, direct `src` reads);
  - the landed proof `20261103040805` :490 (it does not rerun).
- **second-readers** — not applicable: no module changes.
- **chunk-graph** — not applicable: SQL only.
- **environments** — the database. The open-rules list is judged statically by the
  `bun run checks` / CI guards and live by the smoke lane.
- **mechanisms** — DEC-407's RETIRED form, and INC-1166's open-rules census (bundle 1 item 6).
- **first-download** — not applicable: no client code.
- **premises** — the brief's line numbers are all confirmed (:161, :167; :10, :12).
- **callee-codes** — not applicable: no door changes.
- **cell-meaning** — not applicable: no manifest line changes.
- **findings** — MON-13's comment at :1381 ("the wizard reads them") is stale against the tree.

## Item 4 — INC-1237 (one step chooses a filter)

- **consumers** — `rg -n "(ai-calls|style|strings|admin-screening|users|data|country|audit|location|listings|my-listings|category)-filters\b" e2e`
  gives 63 lines (`item4-panels.txt`). The choices' grep over the choice groups' ids gives 32 lines
  (`item4-choices.txt`). The copies:
  - `e2e/helpers/countries.ts` :106 `chooseFilter(page, testid, value)`: opens `country-filters`,
    presses `<testid>-<value|all>`, then Escape, and expects the panel's count 0.
  - `e2e/helpers/locations.ts` :100: the same, over `location-filters`.
  - `e2e/helpers/translations.ts` :88 `chooseFilter(page, filters, choice)`: the panel is a
    parameter and the choice is the whole id.
  - `e2e/helpers/categories.ts` :229 `toggleMissingAssets(page)`: the one-choice toggle
    `category-missing-filter` (a pill with `aria-pressed`, `categories-page.tsx` :1134), with no
    value suffix.
  - Spec lines that CHOOSE a value:
    - through a copy:
      - `admin-locations` :235, :1014, :1015 and :1123;
      - `admin-countries` :128;
      - `admin-translations-console` :204;
      - `admin-categories-console` :720 (`toggleMissingAssets`).
    - directly:
      - `admin-translations-data` :519–528;
      - `admin-translations-governance` :569–573;
      - `admin-ai-calls` :29–34 (two choices in one opening);
      - `admin-users` :190–192;
      - `my-listings-page` :667–672;
      - `admin-listings` :2457–2466 (tier);
      - `admin-screening` :512–525 (country, twice) and :1459–1468 (tier);
      - `admin-categories-images` :266–271 (the toggle, inside its timed `step` walker);
      - `house-style` :185–191 and :200–203 (HS-5, the filter button's own proof).
  - Lines that open a panel only to look or read, choosing nothing:
    - `admin-roles` :66–74 (`expectRoleChosen`);
    - `admin-users` :527–545;
    - `admin-audit` :127–141;
    - `admin-listings` :750–760, :856 and :1007 (the seller TEXT, not a choice);
    - `admin-countries` :131–143;
    - `admin-locations` :144 and :152;
    - `overlays` :113–117;
    - `my-listings-page` :609–612.
  - Spec files that choose: 13 (12 without `house-style`), under THE CUT's ~20.
- **definition** — `src/components/shell/filter-chips.tsx` `FiltersButton` (testid; panel
  `<testid>-panel`; `-count`, `-clear`, `-done`) and `src/components/shell/filter-choices.tsx`
  `FilterChoices` (the group's `data-testid`; each pill `<testid>-<value|all>` with `aria-pressed`).
- **tests**
  - `scripts/conformance/e2e-helpers.test.ts` (CF-HELPERS-1…; next CF-HELPERS-9). Its
    `COPIED_NAMES` (:61) is the list of shared helper names a spec may not redeclare. It scans
    `e2e/*.spec.ts` only (:506), so the helper files' own copies are judged by this item's removal.
  - The specs keep their ids; this item adds no e2e test.
- **lists** — `COPIED_NAMES` gains `chooseFilter`. `scripts/conformance/e2e-helpers-allowlist.txt`
  names none of the copies. `docs/features/e2e-harness.md` (the "One act, one helper" paragraph) names
  the helper.
- **old-file-readers** — the importers of the copies: `admin-translations-console.spec.ts` :28,
  `admin-locations.spec.ts` :22, `admin-countries.spec.ts` :9 and `admin-categories-console.spec.ts`
  :33. No script reads them.
- **second-readers** — none: no `import()` of an e2e helper.
- **chunk-graph** — not applicable: test code.
- **environments** — Playwright, in the lanes that run each spec (mobile-360, desktop-1280).
- **mechanisms** — the harness's authoring laws (`docs/features/e2e-harness.md` :706 onward, J1–J9
  and "One act, one helper"), read whole.
- **first-download** — not applicable.
- **premises** — the brief says "a fourth copy in `e2e/helpers/categories.ts`": it is a toggle
  without a value, so the contract names that case (the plan, item 4).
- **callee-codes**, **cell-meaning** — not applicable: no door.
- **findings** — none.

## Item 5 — the pin specs choose how the pin shows

- **consumers**
  - The control: `src/features/posting/map/map-pin-dropper.tsx` :570 radios
    `post-pin-precision-<value>` (legend `post-pin-precision-label`), and Save `post-pin-save` :601.
  - `src/features/posting/map/pin.ts`: `PIN_PRECISIONS = ["exact","approx"]` and
    `NEW_PIN_PRECISION = "exact"`; the dialog starts at `saved?.precision ?? NEW_PIN_PRECISION`
    (`map-pin-dropper.tsx` :147).
  - The paths that save a pin:
    - `e2e/post-wizard-bundle2.spec.ts`: the spec's own `savePinOnMap` :193–201, called at :227
      (new), :229 (PW-113 MOVES a saved pin, not new), :308 (PW-178, new) and :358 (PW-179, new);
      inline at :420 (PW-186, new).
    - `e2e/post-wizard-place.spec.ts`: :1349 (PW-37, new), :1400 (PW-38, new), :1421 (PW-39,
      already presses `approx` at :1420) and :1455 (PW-40, new).
    - `e2e/post-wizard-where.spec.ts`: :657 (PW-92, new), :888 (PW-100, new) and :923 (PW-96, new).
- **definition** — as above. The only press of a precision today is `post-wizard-place` :1420.
- **tests** — the three specs (PW-, next PW-194; PS-, next PS-10 in bundle2). No new id.
- **lists** — `e2e/helpers/posting.ts` is the pin acts' shared home (it already drives
  `post-pin-*`).
- **old-file-readers**, **second-readers**, **chunk-graph** — not applicable (no src change, no
  removed helper).
- **environments** — Playwright.
- **mechanisms** — the "One act, one helper" law.
- **first-download** — not applicable.
- **premises** — confirmed: nothing in `src/` changes.
- **callee-codes**, **cell-meaning** — not applicable.
- **findings** — none.

## Item 6 — INC-1239 (the type-cast rule is judged)

- **consumers**
  - The counts: `rg -n "as unknown as" e2e | wc -l` gives 62 and `rg -l "as unknown as" e2e | wc -l`
    gives 34. An AST read (`casts.ts`, the repository's TypeScript) agrees: 62 sites in 34 files.
  - Per file:

    | file | sites |
    | --- | --- |
    | `admin-attributes-editor` | 1 |
    | `admin-attributes-import` | 3 |
    | `admin-attributes-library` | 4 |
    | `admin-attributes-links` | 1 |
    | `admin-categories-console` | 2 |
    | `admin-categories-lifecycle` | 1 |
    | `admin-roles` | 1 |
    | `admin-services` | 1 |
    | `admin-shell` | 1 |
    | `admin-users` | 1 |
    | `auth-google` | 1 |
    | `auth-signout` | 4 |
    | `auth-signup` | 2 |
    | `category-image-routes` | 1 |
    | `choice-lists` | 2 |
    | `global-setup` | 1 |
    | `helpers/photos` | 1 |
    | `helpers/ui` | 3 |
    | `i18n-bundle` | 1 |
    | `i18n-sign-in-language` | 2 |
    | `import-security` | 1 |
    | `legal-accept` | 4 |
    | `legal-admin` | 1 |
    | `legal-certify` | 1 |
    | `legal-doors` | 1 |
    | `mfa-stepup` | 1 |
    | `my-listings-ad` | 2 |
    | `my-listings-doors` | 4 |
    | `my-listings-page` | 3 |
    | `post-wizard-bundle2` | 1 |
    | `post-wizard-category` | 2 |
    | `posting-routes-catalog` | 1 |
    | `press` | 2 |
    | `shell` | 4 |

- **definition** — rule 10 §TypeScript: "no `as unknown as`". Lint does not catch it (bundle 1
  report §13 finding 2).
- **tests** — the new census's own test, with a planted case: a spec text with one double cast is
  found with its file and line, and a clean text is not. The family is new, CF-CAST- (unused,
  read by `ids.ts`).
- **lists** — `scripts/conformance/type-casts-allowlist.txt` (new) and `scripts/conformance/wired.test.ts`.
  The wired test derives its domain itself: a census module must be named by its test, which the new
  test does.
- **old-file-readers**, **second-readers**, **chunk-graph** — not applicable.
- **environments** — the census runs in the Component tests job (`.github/workflows/ci.yml` :209
  `component-tests`, `bun run test:unit` = `vitest run`) and in `bun run checks`.
- **mechanisms** — the kit (`scripts/conformance/kit.ts`: `walkFiles`, `visitTs`, `readAllowlist`,
  `report`) and the non-null census (CF-NN, `scripts/conformance/non-null.test.ts`, keys
  `<file> (<count>)` whose counts only fall), read whole.
- **first-download** — not applicable.
- **premises** — the counts are confirmed (62 / 34).
- **callee-codes**, **cell-meaning** — not applicable.
- **findings** — the same rule is broken under `src/` (`rg -n "as unknown as" src | wc -l` gives
  114) and `scripts/` (17), outside this item's e2e guard. Two of the `src` sites
  (`use-screening.ts` :155, :185) go with item 2.

## queued

`rg -n "INC-1236|INC-1237|INC-1239|ACT-022|DEC-420" roadmap.md docs/governance/reports`:

- `roadmap.md:28` (the order of work naming ACT-022) is left: the records turn R18.
- `roadmap.md:37` "After F1-7 — ACT-022: …" is BUILT HERE for its data (item 2); the screen's
  column and filter are Lovable's bundle 3. The tick is the records turn's.
- `docs/governance/reports/cursor-bundle-1.report.md` :267 and :394 (INC-1236) are BUILT HERE
  (item 3, by the ruling on question 3).
- `docs/governance/reports/f1-doors-7a.census.md` :399 and `f1-doors-7b.census.md` :407 (ACT-022,
  as queued then) are the same item, built here.
- No line names INC-1237, INC-1239 or DEC-420 yet.
