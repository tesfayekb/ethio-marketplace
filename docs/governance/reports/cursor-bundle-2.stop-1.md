STOP — cursor-bundle-2 STEP 1: the census and the plan (PLAN FIRST)
DONE: STEP 0 (the brief saved by scripted copy, sha256 equal; roadmap line 3; check-go no finding), STEP 1 (the census: docs/governance/reports/cursor-bundle-2.census.md)
LEFT: STEPS 2–8 (items 1–6)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `63d6bee0d60517187cf1a636666c5ffeb308f7d4` (short `63d6bee`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-21T23:06:30Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44959633359
FILES:
docs/governance/briefs/cursor-bundle-2.md
docs/governance/reports/cursor-bundle-2.census.md
docs/governance/reports/cursor-bundle-2.stop-1.md
roadmap.md

The plan by item follows: the files, the tests, each door's old and new argument list, whether it
is a DROP, and the order of the files. Then the decisions named for §10, and the questions the
supervisor's ruling answers by number. Every measured number is in the census, with its command.

THE CUT is not met:

- Item 4 reaches 13 spec files (the census, item 4), against the cut's "about twenty".
- Item 1 reaches 2 doors, plus `admin_list_locations` named and left (question 4), plus item 2's
  new reader: at most 4, against the cut's four.

## STEP 2 — the migrations (items 1, 2, 3), the one migration stop

Three files, applied in this order. The door laws' "a callee before its caller" sets the order: the
list helpers come first when question 6 rules (a); otherwise A, B and C hold no call between them.

- **A0** (only if question 6 rules (a)) — `<ts>_<uuid>.sql`: the two list helpers.
  - `door_filter_countries(p_values text[], p_field text) RETURNS character(2)[]`:
    - NULL or `'{}'` returns NULL (no filter);
    - more than 20 elements → `door_refuse('badValue', p_field)`;
    - a NULL element → the same refusal;
    - each element is `upper(btrim(...))` and must match `^[A-Z]{2}$`, or the same refusal
      (question 1);
    - the answer is the de-duplicated `character(2)[]`.
  - `door_filter_categories(p_values uuid[], p_field text) RETURNS uuid[]`:
    - the same NULL, empty, count and NULL-element rules;
    - the answer is the union of each root's `cat_descendants`.
  - Both are `STABLE`, `SECURITY INVOKER` and `SET search_path = public`, with `REVOKE ALL … FROM
    PUBLIC, anon, authenticated` and `GRANT EXECUTE … TO service_role`. They are closed to browsers,
    so they take no manifest line.
- **A** — `<ts>_<uuid>.sql`, commit `cursor-bundle-2: the list doors take several values (DEC-420)`.
  - A pre-check, in the form of F1-7a part 3: each live body's md5 must equal its last
    declaration's.
    - `admin_list_listings`: ec92e6b6d2453d53a24fb9622f9ec9d7 (its 20261118012800 proof).
    - `my_listings`: the md5 of `20261119150200`'s body, computed at STEP 2 on the proof stack and
      named in the stop.
  - `admin_list_listings`:
    - OLD `(text,text,text,uuid,text,date,date,text,integer,integer)`;
    - NEW `(text,text,text[],uuid[],text,date,date,text,integer,integer)`.
    - The names are kept: `p_country text[]`, `p_category uuid[]`.
    - It is a DROP + CREATE: an argument's type changes, and `CREATE OR REPLACE` would add an
      overload. The body is written out whole. `RETURNS TABLE` and every other clause are
      unchanged, and the view arrays are kept verbatim (CF-STATUS-1 reads them). The grants are
      restated: `REVOKE ALL … FROM PUBLIC, anon`; `GRANT EXECUTE … TO authenticated, service_role`.
    - The new clauses:
      - `v_countries := <the list rule>(p_country, 'country')` and
        `v_categories := <the list rule>(p_category, 'category')`, AFTER `door_context` (the law
        order: the gate first, as today's `badValue:view` check comes after it);
      - the country: `(v_countries IS NULL OR coalesce(loc.country_code, l.home_country_code) =
        ANY(v_countries))`, the place's market as today;
      - the category: `(v_categories IS NULL OR l.category_id = ANY(v_categories))`;
      - the reach clause `(v_ctx.countries IS NULL OR l.home_country_code = ANY(v_ctx.countries))`
        stays as it is and is AND-ed.
  - `my_listings`:
    - OLD `(text,integer,integer,text,uuid,text)`; NEW `(text,integer,integer,text,uuid[],text)`.
    - It is a DROP + CREATE, `RETURNS jsonb` unchanged, the body whole, and both reads (the counts
      and the rows) filtered by `v_categories`. The grants are restated as its last declaration
      gives them: `REVOKE … FROM PUBLIC, anon`; `GRANT EXECUTE … TO authenticated`; `GRANT ALL … TO
      service_role`.
  - The proof block, lettered:
    - (a) both bodies, headers and grants.
    - (b) a list of two categories gives their union, and a list of two countries gives both
      markets.
    - (c) NULL and `'{}'` filter nothing.
    - (d) 21 values → `badValue:country` / `badValue:category`; a NULL element and a three-letter
      country → `badValue:country`.
    - (e) the reach is AND-ed: a scratch country-scoped `listings:view` holder whose list names a
      country outside their reach gets no row of it.
    - (f) `my_listings` stays the caller's: a list naming another seller's ad's category returns
      none of that seller's ads.
    - (g) a line of `EXPLAIN (COSTS OFF)` per list form, beside its one-value form, shows the
      same index.
  - Lists:
    - `scripts/doors/manifest.txt` :70 →
      `admin_list_listings(text,text,text[],uuid[],text,date,date,text,integer,integer) | staff-reader | authenticated | listings:view | - | - | - | filter | - | badValue | -`.
    - `scripts/doors/manifest.txt` :196 →
      `my_listings(text,integer,integer,text,uuid[],text) | signed-in-reader | authenticated | - | - | - | - | - | - | badValue,notSignedIn | -`.
    - `scripts/public-surface-allowlist.txt` :52 and :74: each reason gains "a new argument list in
      cursor-bundle-2 (DEC-420): a country and a category list, each value as one was, at most 20".
  - The e2e door calls that pass a scalar change in this commit, so no lane is red on CI's local
    backend:
    - `e2e/admin-listings.spec.ts` :280–282;
    - `e2e/ad-page-doors.spec.ts` :373;
    - `e2e/my-listings-page.spec.ts` :528, :532 and :545.
- **B** — `<ts>_<uuid>.sql`, commit `cursor-bundle-2: the Screening queue's reader (ACT-022)`.
  - The queue's reader is a door of its own, NOT `admin_list_listings`' view. The census (item 2,
    definition) gives the reasons:
    - that door lacks `description`, `attributes`, `photos_soon` and `location_id`;
    - it orders newest first, where the queue reads oldest first by `updated_at`;
    - its `waiting` view holds `held`;
    - it gates on `listings:view`;
    - adding the queue's columns would be a DROP of the listings console's door.
  - NEW `admin_screening_queue(p_search text DEFAULT NULL, p_country text[] DEFAULT NULL, p_tier text
    DEFAULT NULL, p_seller text DEFAULT NULL, p_limit integer DEFAULT 25, p_offset integer DEFAULT
    0) RETURNS jsonb`, `STABLE SECURITY DEFINER SET search_path = public`. It is a CREATE, not a
    DROP. The gate and checks:
    - `door_context('staff-reader','listings','review',NULL,NULL,'filter')`, whose reach is the
      ad's home country, as `admin_screening_facts` (question 2);
    - `v_countries` by item 1's list rule;
    - `badValue:tier` exactly as `admin_list_listings` checks it;
    - `v_email := has_permission(v_uid,'profiles','view')`.
  - The rows are `status = 'screening'` AND the reach AND:
    - the search: a UUID-shaped term matches the id, otherwise
      `position(lower(term) IN lower(title))`, the form of `admin_list_listings`. The id term serves
      `readScreeningRow`;
    - the country: `(v_countries IS NULL OR loc.country_code = ANY(v_countries))`, the place's
      market. An ad with no place matches no country, as today's select (INC-537);
    - the tier;
    - the seller term: the public name (`seller_alias`), the business name when the seller is a
      business, and the e-mail only `v_email AND …`.
  - Order and paging: `updated_at ASC, id ASC`, `LIMIT LEAST(GREATEST(coalesce(p_limit,25),1),100)`
    and `OFFSET GREATEST(coalesce(p_offset,0),0)`. The screen's sizes are 25, 50 and 100.
  - The answer is `{"total": <count of every matching row>, "rows": [...]}`.
    - Each row holds today's `SCREENING_SELECT` columns, with the category and place names flat
      (`category_name_en`, `category_name_am`, `place_name_en`, `place_name_am`, `country_code`).
    - Each row adds `seller_alias`, `seller_business_name` (only when `seller_type = 'business'`)
      and `seller_email` (`CASE WHEN v_email THEN u.email::text END`).
    - The total is counted apart from the page, so a page past the end still answers the true
      total, as today's `count: "exact"` does. A `RETURNS TABLE` with a windowed count would answer
      0 there.
  - Grants: `REVOKE ALL … FROM PUBLIC, anon`; `GRANT EXECUTE … TO authenticated, service_role`. No
    table grant changes.
  - The proof block, lettered:
    - (a) the header and grants;
    - (b) a global reviewer's rows equal what today's select reads (status, columns, order);
    - (c) without `profiles:view`: no e-mail in any row, and an e-mail term matches nothing;
    - (d) with it: the e-mail is shown and matched;
    - (e) the name and the business name match for both;
    - (f) no `listings:review` → `permissionDenied`;
    - (g) a two-country list gives both markets, and 21 → `badValue:country`;
    - (h) the reach is AND-ed for a country-scoped reviewer.
  - Lists:
    - `scripts/doors/manifest.txt` gains (sorted by key)
      `admin_screening_queue(text,text[],text,text,integer,integer) | staff-reader | authenticated | listings:review | - | - | - | filter | - | badValue | -`.
    - `scripts/public-surface-allowlist.txt` gains `admin_screening_queue | authenticated |
      cursor-bundle-2 (ACT-022, DEC-417): the Screening queue's rows; listings:review with its
      country reach; the seller's public name and business name, the e-mail read and matched only
      for profiles:view holders`.
    - `scripts/conformance/seller-names-allowlist.txt` gains `admin_screening_queue | staff door
      (has_permission listings review); staff see the name | 2027-04-30` (the until of its
      siblings).
- **C** — `<ts>_<uuid>.sql`, commit `cursor-bundle-2: two unread public reads (INC-1236)`. This file
  is written only if question 3 rules (a).
  - `REVOKE SELECT (<the ten columns>) ON public.level_overrides FROM anon, authenticated`.
  - `REVOKE SELECT (<the ten columns>) ON public.market_settings FROM anon, authenticated`.
  - `DROP POLICY level_overrides_public_read ON public.level_overrides`.
  - `DROP POLICY market_settings_public_read ON public.market_settings`.
  - The catalogue's rows before the change (census, item 3; proof stack):
    - table-level: every privilege `false` for anon and authenticated on both tables;
    - column-level: the two `SELECT(...)` lists of ten columns for each role;
    - the policies: `*_public_read` SELECT `true`, plus the three `false` rules each.
    - No browser-executable function reads either table as its caller: the two INVOKER functions
      are closed. No table forces row security, so the definers keep their reads.
  - The proof block: (a) after the change, `column_privileges` holds no row for anon or
    authenticated on either table, and only the three `false` policies stand on each; (b) as
    `authenticated`, a column read answers 42501.
  - Lists:
    - `scripts/public-surface-allowlist.txt` :161 and :167 STAY (earlier migrations still grant the
      columns, and the migration guard reads them). Each reason takes DEC-407's RETIRED form:
      `RETIRED (DEC-407, cursor-bundle-2, INC-1236): browser SELECT revoked and the open read rule
      dropped; no browser reader (src: none; the forward-scan: none); the line stays because the
      migration guard still reads its earlier grants`.
    - `scripts/doors/open-rules.txt` loses :10 and :12.
  - With (a): `e2e/admin-monetisation.spec.ts` MON-13 :1381–1386 changes in this commit. Its
    `market_settings` read expects 42501, as its authors' column does today, and its stale comment
    goes.

Then `bun run db:proof --fresh` (its last line pasted), the push, and the MIGRATION stop, with:

- a pairing line per file: "apply <fragment> → expect mark <value>";
- every redeclared body's md5;
- the types patch (f1-doors-ruling-1 §11) as the pairing's third step. STEP 3 compiles only after
  it lands, because the Args of `admin_list_listings`, `my_listings` and the new door change in
  `src/integrations/supabase/types.ts`.

## STEP 3 — the readers (items 1 and 2), after the types patch

Commit `cursor-bundle-2: the readers pass lists, the queue reads its door`.

- `src/features/admin-listings/use-admin-listings.ts`:
  - `listAdminListings` passes `p_country: [filters.country]` and `p_category: [filters.category]`
    (a list of one, or nothing when null). `AdminListingFilters` is unchanged, so the screen is too.
  - :81 reads its failure as `ReaderError(readerFailure(error))`, the form of `my_listings`
    (question 5).
- `src/features/my-listings/my-listings.ts`: `filterArgs` passes `p_category: [filters.category]`.
  `MyListingsFilters` is unchanged.
- `src/features/admin-screening/use-screening.ts`:
  - `listScreening` and `readScreeningRow` call `admin_screening_queue`:
    - `p_search` (the term, or the id for `readScreeningRow` with `p_limit: 1`, keeping the row
      only when its id is the one asked);
    - `p_country: [country]` when one is chosen;
    - `p_tier`; `p_seller` when given;
    - `p_limit: pageSize`, `p_offset: page × pageSize`.
  - The answer is read through a shape guard (no cast; the two `as unknown as` at :155 and :185
    go). A malformed answer is `ReaderError({ class: "malformed" })`, and a refusal is
    `ReaderError(readerFailure(error))` (question 5).
  - `ScreeningRow` keeps every field the screen reads and gains `sellerAlias`,
    `sellerBusinessName` and `sellerEmail` (`string | null`).
  - `ScreeningFilters` gains an optional `seller?: string`, so the screen's `{ country, tier }`
    still compiles. `useScreeningQueue`'s key gains the seller.
- Tests:
  - `src/features/admin-screening/use-screening.test.ts`: SF-2, SF-4, SF-5, SF-6 and SF-7 prove
    today's select. They move onto the door's call and keep their ids, with titles reworded to say
    what the door is sent and read. New:
    - SF-10: the three seller fields are read, and an absent e-mail is null;
    - SF-11: a page past the end keeps the door's total;
    - SF-12: a malformed answer is a typed failure, not an empty queue.
  - `src/features/my-listings/my-listings.test.ts`: ML-U29, `filterArgs` sends the category as a
    list of one.
  - `src/features/admin-listings/use-admin-listings.test.ts` (new): ALR-1, the lists of one and
    nothing for null; ALR-2, a refusal is a `ReaderError`.
  - e2e, with the door's lists in place:
    - `e2e/admin-listings.spec.ts`:
      - AL-32: two categories are OR-ed and two countries OR-ed; an empty list filters nothing;
        21 values → `badValue:country` / `badValue:category`;
      - AL-33: deny, a signed-in person without `listings:view` sending lists → `permissionDenied`.
    - `e2e/my-listings-page.spec.ts`:
      - MLP-10: two categories OR-ed; 21 → `badValue:category`;
      - MLP-11: deny, a list naming another seller's ad's category returns none of that seller's
        ads.
    - `e2e/admin-screening.spec.ts`:
      - SC-28: a reviewer without `profiles:view` sees the name and business name, no e-mail in any
        row, and an e-mail term matches nothing;
      - SC-29: with `profiles:view` the e-mail is shown and matched;
      - SC-30: a two-country list OR-ed; 21 → `badValue:country`; no `listings:review` →
        `permissionDenied`.
  - The two `vi.mock`s of `use-screening` name no changed export and stay.
- `docs/features/admin-listings.md`, `my-listings.md` and `admin-screening.md`: the new argument
  lists and the queue's door.

## STEP 4 — the harness (items 4 and 5)

Commit `cursor-bundle-2: one step chooses a filter, the pin specs choose`.

- Item 4's contract. `e2e/helpers/filters.ts` (new) holds the one
  `chooseFilter(page, panel, filter, value?)`:
  1. When `<panel>-panel` is not visible, press `<panel>` (the table's Filters button) and wait for
     the panel.
  2. The choice is `<filter>-<value>`. `""` is `<filter>-all`, as the copies map it. With no value,
     the choice is `<filter>` itself, a one-choice toggle such as `category-missing-filter`. It is
     looked up inside the panel.
  3. When the choice is not in view, press the filter's own control (`<filter>` inside the panel)
     first. Today's pills are always in view, so this step is for Lovable's rows.
  4. Press the choice, press Escape, and expect `<panel>-panel` to have count 0.
- The specs it reaches (13), each choice onto the helper:
  - `admin-locations` :235, :1014, :1015 and :1123;
  - `admin-countries` :128;
  - `admin-translations-console` :204;
  - `admin-translations-data` :519–528;
  - `admin-translations-governance` :569–573;
  - `admin-ai-calls` :29–34 (two calls);
  - `admin-users` :190–192;
  - `my-listings-page` :667–672;
  - `admin-listings` :2457–2466 (two calls);
  - `admin-screening` :512–525 (two calls) and :1459–1468;
  - `admin-categories-console` :720;
  - `admin-categories-images` :266–271 (one `lazily` step around the helper, replacing the three
    timed steps);
  - `house-style` HS-5 :200–203 (two calls). HS-5's first press (:185–191) stays as the filter
    button's own proof: it asserts the pill's pressed state INSIDE the open panel, which the helper
    closes by contract (§10).
- The lines that only open a panel to look stay. The census lists them.
- The copies go in the same commit as their last caller: `e2e/helpers/countries.ts` :106,
  `locations.ts` :100, `translations.ts` :88 and `categories.ts` :229 `toggleMissingAssets`.
- `scripts/conformance/e2e-helpers.test.ts` `COPIED_NAMES` gains `"chooseFilter"`, so a spec's own
  copy fails CF-HELPERS-1. This is no new id: CF-HELPERS-1 judges every listed name.
- Item 5. `e2e/helpers/posting.ts` gains `choosePinShow(page, precision)`, with `precision` typed
  from `PIN_PRECISIONS` (`src/features/posting/map/pin.ts`). It presses
  `post-pin-precision-<precision>`. Each path that saves a NEW pin calls it before Save, with
  `"exact"` where the test meant no choice:
  - `post-wizard-bundle2`: before `savePinOnMap` at :227, :308 and :358, and before the inline Save
    at :420. Not at :229, since PW-113 moves a saved pin.
  - `post-wizard-place`: :1349, :1400 and :1455. PW-39's direct press at :1420 moves onto the
    helper with `"approx"`.
  - `post-wizard-where`: :657, :888 and :923.
- `docs/features/e2e-harness.md` ("One act, one helper") names both steps.

## STEP 5 — the guard (item 6)

Commit `cursor-bundle-2: the type-cast rule is judged (INC-1239)`.

- The form is a conformance census, not a lint rule. An ESLint `no-restricted-syntax` ban cannot
  carry a per-file allowlist with a reason, an until, and a failure for a stale or expired line,
  and K3 makes a new guard a `kit.ts` census.
- `scripts/conformance/type-casts.ts` (new): `walkFiles` over `e2e/` and `visitTs`. A finding is an
  `AsExpression` whose inner expression is an `as unknown` expression, with its file and line. The
  key is `<file> (<count>)`, as the non-null census keys its lines, so a file's count only falls.
- `scripts/conformance/type-casts.test.ts` (new):
  - CF-CAST-1: the tree's casts are exactly the allowlist's;
  - CF-CAST-2 (planted): a text with one double cast is found at its line, and a clean text is not;
  - CF-CAST-3: a stale or expired line fails (kit).
- `scripts/conformance/type-casts-allowlist.txt` (new): one line per file, `e2e/<file> (<n>) | as
  unknown as written before the rule was judged | INC-1239`.
- The files this bundle touches leave the list. Their casts are rewritten with shape guards:
  `admin-categories-console` (2), `admin-users` (1), `my-listings-page` (3) and
  `post-wizard-bundle2` (1), which is 7 sites in 4 files. The list keeps 55 sites in 30 files
  (62 − 7, 34 − 4; recounted by the command at STEP 6). `admin-roles` is not touched: its panel
  lines only look.
- `scripts/conformance/wired.test.ts`: its domain is derived, and the new census is named by its
  own test.

## DECIDE-AND-NAME (for §10)

- The list form: the type in place, names kept (`p_country text[]`, `p_category uuid[]`).
  - A new argument beside the old would also change the argument list (a DROP or an overload).
  - It would leave two arguments meaning one filter.
  - There is one reader per door to move, and five e2e lines.
- The queue's reader is its own door, `admin_screening_queue`, `RETURNS jsonb` with `total` and
  `rows` (STEP 2 B gives the reasons).
- The helper's file is `e2e/helpers/filters.ts` (new). `ui.ts` holds 3 casts and would join item
  6's work; a new file keeps one act in one place.
- The pin step is `choosePinShow` in `e2e/helpers/posting.ts`.
- Item 6's guard is a kit census keyed `<file> (<count>)`.
- The new test ids, checked free by `ids.ts` over `scripts/test-ids.ts`' `idsIn`: AL-32, AL-33,
  MLP-10, MLP-11, SC-28–SC-30, SF-10–SF-12, ML-U29, ALR-1, ALR-2 (new family), and CF-CAST-1–3
  (new family).

## Findings (beyond the task)

1. The reader-failure bypass (K2): `src/features/admin-listings/use-admin-listings.ts` :81 and
   `src/features/admin-screening/use-screening.ts` :154, :183, :217 and :310 throw
   `new Error(error.message)`, not `ReaderError`. :81, :154 and :183 move here if question 5
   allows; :217 and :310 stay.
2. A success-shaped total: `use-admin-listings.ts` :111 reads the total from the first row `?? 0`,
   so a page past the end answers 0.
3. `rg -n "as unknown as" src | wc -l` gives 114 and `scripts` gives 17: the same rule, outside item
   6's e2e guard.
4. MON-13's comment (`e2e/admin-monetisation.spec.ts` :1381, "the wizard reads them") is stale: no
   `src/` file reads either table.

## Questions (the ruling answers by number)

1. The country list's shape.
   - To keep the place's index, a country list is cast to `character(2)[]`. A `text[]` list casts
     the column, and the queue's filter loses `locations_country_idx`, by EXPLAIN on the proof stack.
   - A cast to `character(2)` truncates a longer value silently (`'ETH'` would match `'ET'`), so
     the list rule refuses a value that is not two letters as `badValue:country`. Today such a value
     matches nothing, and neither door refuses any value.
   - (a) refuse it (recommended); (b) keep a text comparison with no new refusal, and accept the
     queue's lost index.
2. The queue's reach.
   - With `filter` scope, a country-scoped reviewer sees only their markets' ads. Today's RLS read
     (`listings_admin_read`, `has_permission` without scope) shows them every market, while
     `admin_screening_facts` already refuses the preview of an ad outside their reach.
   - (a) `filter` (recommended); (b) `global`, keeping today's rows for every reviewer.
3. INC-1236 and MON-13.
   - The census finds no product reader and no reader named ahead. One browser-role read stands:
     `e2e/admin-monetisation.spec.ts` MON-13 :1382–1386 asserts the surface is readable. That file
     is outside this brief's e2e scope.
   - (a) the file joins the scope, MON-13's `market_settings` read flips to 42501, and file C lands
     (recommended);
   - (b) MON-13 counts as a reader: nothing is dropped, and each line names it.
4. `admin_list_locations`.
   - Its table filters by a country (`20261115123200_e0edb9a7-….sql` :81), and its caller
     `src/features/admin-locations/locations-service.ts` :104 is outside scope.
   - (a) left for the turn that owns the locations console, named here (recommended); (b) it joins
     this bundle, with its caller, its tests and the location specs.
5. The readers' failure type.
   - The readers this turn rewrites (`listAdminListings`, `listScreening`, `readScreeningRow`)
     would throw the typed `ReaderError(readerFailure(error))`, where they throw a bare `Error`
     today. A screen that prints the error's text could word it differently.
   - (a) move them (recommended; rule 10 "No phantom success"); (b) keep `new Error(error.message)`
     and leave finding 1 open.
6. The one form for every list door.
   - (a) two SQL helpers, `door_filter_countries` and `door_filter_categories` (file A0), called by
     every list door. A new mechanism owes its guard in this pull request: a `check-doors` finding
     for a list-filter argument not read through them, planted. That is in `scripts/doors/`, inside
     scope. Recommended, for the growth lens.
   - (b) the rule written inline, identically, in the three bodies, each pinned by its proof block.
