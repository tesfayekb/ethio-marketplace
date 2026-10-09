# Bundle 10 — the feed engine: brief, version 5 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 — THE FEED ENGINE, VERSION 5 (2026-10-09). THIS FILE REPLACES VERSION 4. Turn 4 (Part E2a) landed at 41b46aa6 and matches version 4. This version specifies TURN 5 = PART E2b, the read door:
- the database function feed_page;
- the public route /api/feed;
- their tests.
It is ONE migration and one route, Tier A (a new public surface). No screen changes in this turn; the screens read /api/feed in E3.
The supervisor ran the migration text below on a local Postgres 16 copy of the shapes it touches, after E1's and E2a's texts:
- the proofs pass;
- the order, the paging and the widening give the expected cards;
- one page took 2 to 6 ms over 240,000 index rows;
- scripts/check-migrations.sh passes with the allowlist line of E2b.3 and fails without it (Public-surface guard), as it should.
Line numbers are as of commit 41b46aa6 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 4
- Verified by the diff of 38582ff0..41b46aa6:
  - the saved brief equals version 4;
  - the migration file equals the appendix of version 4 with the mark 20261009180000, byte for byte;
  - FE-10, FE-13 and PR-23 prove their heartbeat by a larger id;
  - the docs and the changelog line describe the wake and the drain.
- The read-back is accepted. Turn 4 is CLEAN, with CI green on its commit after the operator's staging apply.

WHAT A PAGE IS (D99, D100, D108)
- A page answers one category (or all categories) in one place (or everywhere).
- Order: premium, then featured, then regular; newest first inside each.
- The chosen place comes first. When the chosen place holds fewer than 8 listings of that category, the page continues with its parent (region), then the country, then everywhere, and stops at the first of these that holds 8 or more. Each listing appears once, under the narrowest place that holds it.
- At most 50 cards per call (20 by default). The next page continues after the last card shown; page 50 costs what page 1 costs.
- A card carries the fields the listing card shows today and nothing else: no seller.

STEP 0 — keep this brief
- Save this file byte for byte OVER docs/governance/briefs/bundle-10.md (it is already in its saved form). roadmap.md line 3 stays as it is. Tick no roadmap line. On every later turn, read the brief first.

HOW TO WORK
- Order of the turn:
  1. step 0;
  2. E2b.0, the read-only census. If any result differs from what it expects, STOP and report: write nothing else;
  3. E2b.1 to E2b.5: the tests, the route, the allowlist and selector lines, the docs, the changelog;
  4. E2b.6 LAST: the migration;
  5. the unit tests;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- The turn starts by reading CI for the last commit on dev at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. You cannot git-fetch that branch. Paste the first six lines of ci-status.md.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions and roles. Never an e-mail address, a user id, a token or a row of user data.
- Browser tests: try once (`bun run e2e:local e2e/feed-route.spec.ts`). If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- No package or dependency change, no new string shown to a person, no screen change.
- Scope:
  - one new migration file under supabase/migrations/ (the database tool names it);
  - src/routes/api/feed.ts (new);
  - e2e/feed-route.spec.ts (new);
  - scripts/public-surface-allowlist.txt (one line);
  - scripts/e2e-select.ts (the area "feed");
  - docs/features/feed-engine.md;
  - docs/_changelog.md;
  - the brief.
  The platform may regenerate src/integrations/supabase/types.ts and src/routeTree.gen.ts; that is allowed and named in the report. Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, scripts/check-migrations.sh, the e2e helpers and e2e/global-setup.ts are not touched.

THE MIGRATION RULES (G39 — every one applies)
- The migration text is in the appendix at the end of this brief. Write it EXACTLY, changing only `<MARK>`. Do not reformat it, add to it or "improve" it.
- Write the file in a scratch folder first and run the migration check there:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the new text under a name of the form 20261009000000_feed-e2b-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh` AFTER the allowlist line of E2b.3 is in place.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - take now() at time zone 'utc' on ethio-prod, round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - it must be later than the saved file's own stamp and above 20261009180000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- What the text does, so the report can say it:
  - one function, feed_page(category, place, after, size);
  - it is SECURITY DEFINER and STABLE, and reads feed_index as its owner;
  - it is executable by anon, authenticated and service_role — the one new public surface, named in the allowlist;
  - proofs on scratch rows (the ladder, the empty page, every refusal by its name, the privileges, the header facts), rolled back by the P0099 pattern;
  - the self-mark.

PART E2b — THE READ DOOR

E2b.0 — CENSUS (read-only, before writing anything). Paste each result:
- (a) on ethio-prod: `select proname from pg_proc where pronamespace = 'public'::regnamespace and proname = 'feed_page';` — 0 rows;
- (b) on ethio-prod: `select version from public.migration_marks where version = '20261009180000';` (one row), `select max(version) from public.migration_marks;` and `select now() at time zone 'utc';`;
- (c) in the repository: src/routes/api/feed.ts and e2e/feed-route.spec.ts do not exist, and `grep -n "^feed_page" scripts/public-surface-allowlist.txt` prints nothing.

E2b.1 — THE TESTS: e2e/feed-route.spec.ts (new; ids FR-1 to FR-8). They call the route with Playwright's `request` fixture (as e2e/category-image-routes.spec.ts :111 does) and seed with the service client.
- Imports and cleanup exactly as e2e/feed-index.spec.ts :1–14 and its afterEach (listings of each seller, then each scratch region, then each branch).
- A function `seedPage()` in the spec:
  - `leaseSeller()`;
  - `seedCategoryBranch()` gives `{ parent, leaf }`;
  - `seedScratchChain("ET")` gives `{ anchor, region, city, subCity }`;
  - a second scratch city C2 under `chain.region`: parent_id region, level "city", country_code "ET", slug and name_en `scratchSlug("fr-city")`, is_active true, source "admin", center_lat 9.04, center_lng 38.75. It is removed with the region (destroyLocation is child-first).
  Register the seller, the region slug and the branch slugs for the afterEach before the next step can throw.
- A function `addListing(seed, { place, tier, minutesAgo })` inserts one active listing with the service client: the columns e2e/feed-index.spec.ts `insertListing` uses; status "active"; published_at = now minus `minutesAgo` minutes; the given tier. It returns the id. The insert trigger indexes it.
- A function `getFeed(request, params)` builds `/api/feed?…` from category, place, size and after, and returns the status, the Cache-Control header and the parsed body.
- Expected lists are built from what the test seeded (tier first, then newest), never written out as ids.
- FR-1 "a page lists premium, then featured, then regular, newest first in each": in the city, five listings —
  - regular 60 minutes ago;
  - regular 300 minutes ago;
  - featured 540 minutes ago;
  - premium 1,200 minutes ago;
  - premium 600 minutes ago.
  Then `?category=leaf&place=city` → 200, and the card ids in order are: premium 600, premium 1,200, featured, regular 60, regular 300.
- FR-2 "a category's page holds its whole branch": the same five, then `?category=parent&place=city` → the same ids in the same order.
- FR-3 "the chosen place comes first, then the wider place": the five in the city and one premium in C2, 30 minutes ago.
  - `?category=leaf&place=city` → the city's five in FR-1's order, then C2's premium;
  - `ladder` starts [city, region];
  - `steps` is [{ step 1, shown 5 }, { step 2, shown 1 }];
  - every card's `step` is 1, except the last, which is 2.
- FR-4 "a place with 8 listings does not widen": FR-3's six, plus three regular listings in the city (120, 180 and 240 minutes ago) → the city's eight only, in order; `ladder` has one entry; C2's premium is absent.
- FR-5 "paging continues after the last card without repeats": FR-3's six with `size=2`, following `next` until it is null (at most 10 calls) → the concatenated ids equal FR-3's list, with no repeat. An empty last page is allowed.
- FR-6 "the answer is public and carries no seller":
  - Cache-Control is exactly `public, max-age=60, stale-while-revalidate=300`;
  - every card's keys are exactly id, title, priceAmount, priceCurrency, priceMode, priceBp, priceNegotiable, pricePeriod, priceUnit, priceUnitText, photosSoon, tier, publishedAt, categoryId, locationId, locationNameEn, locationNameAm, step.
- FR-7 "bad input is refused honestly":
  - `category=not-a-uuid` → 400;
  - `size=0` → 400 and `size=51` → 400;
  - `after=garbage` → 400;
  - a random uuid as category → 404, and as place → 404.
  None of these answers is cached (Cache-Control `no-store`).
- FR-8 "a browser may call the read door but not read the index": the anonymous client of e2e/feed-index.spec.ts FE-5 →
  - `rpc("feed_page", { p_category_id: leaf, p_location_id: city })` has no error;
  - `from("feed_index").select("listing_id").limit(1)` has an error.

E2b.2 — THE ROUTE: src/routes/api/feed.ts (new), built like src/routes/api/categories.tree.ts:
- `createFileRoute` server GET;
- the anon publishable client created inside the handler (F1);
- no bearer, no session, no has_permission (DEC-013 §10);
- `fail()` logging one `[ssr-error]` line for a 5xx and naming no raw message (INC-447).
- GET /api/feed with optional query parameters:
  - `category` and `place`: each a uuid (`/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i`) or absent. A malformed value → 400 `{ "error": "badCategory" }` or `{ "error": "badPlace" }`.
  - `size`: an integer from 1 to 50, default 20. Anything else → 400 `{ "error": "badSize" }`.
  - `after`: the `next` of a previous answer — base64url of the cursor's JSON. A value that does not decode to a JSON object → 400 `{ "error": "badCursor" }`.
- Call `rpc("feed_page", { p_category_id, p_location_id, p_after, p_size })`, with null for an absent category, place or cursor.
- An error whose message contains:
  - "feed_page: unknownCategory" or "feed_page: unknownPlace" → 404 with that name as `error`;
  - "feed_page: badCursor" or "feed_page: badSize" → 400 with that name;
  - anything else → 502 through `fail()`.
- Every error answer has `Cache-Control: no-store`.
- 200 → `{ cards, ladder, steps, next }`:
  - `next` is base64url(JSON.stringify(the function's `next`)) or null;
  - headers: Content-Type `application/json; charset=utf-8`, Cache-Control `public, max-age=60, stale-while-revalidate=300`, Vary `Accept-Encoding`.
- The route keeps no in-process cache (the answer depends on fresh listings; the browser and edge cache it for a minute).

E2b.3 — scripts/public-surface-allowlist.txt: append exactly this line:
feed_page | the public feed's read door (bundle 10 E2b): card fields of active listings only, no seller; reads feed_index as its owner
Then scripts/e2e-select.ts, the area "feed" (:160–164): add `src/routes/api/feed.ts` to its src and `e2e/feed-route.spec.ts` to its specs. Run `bun run scripts/e2e-select.ts --self-test`.

E2b.4 — docs/features/feed-engine.md: a section "What E2b built":
- feed_page: its arguments, its order, the ladder and the threshold of 8, the cursor, its refusals, who may call it;
- /api/feed: its parameters, answers and cache.
In "What it does not do yet", leave only: E3 adds the screens.

E2b.5 — One changelog line.

E2b.6 — THE MIGRATION (last). Write the appendix's text; run the check as above; choose the mark; hand the final text to the database tool once. Then the read-back with your query tool. Paste each result; a read refused to your tool's role is reported as refused:
- `select version from public.migration_marks where version = '<MARK>';` — one row;
- `select proname, prosecdef, provolatile from pg_proc where pronamespace = 'public'::regnamespace and proname = 'feed_page';`
- `select has_function_privilege('anon', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE');` — true.

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- E3 — the screens on /api/feed:
  - 20 per page, the next page as the last card comes into view;
  - the step labels ("No cars in Bole — showing Addis Ababa");
  - subcategory addresses resolved through the whole tree;
  - the breadcrumbs;
  - the performance job.
  How the published site gets active listings for the walk (a seller's ad stays in `screening` until stage 2 or a reviewer) is decided with E3's brief.
- Then (agreed, D106 and D107): the chosen place kept on the account, and the amber "different place" notice.

REPORT (one, at the end). First lines:
- done or not done for step 0 and E2b.0 to E2b.6;
- the E2b.0 results;
- whether the browser started;
- any cited line that read differently;
- any file outside the lists.
Then:
- the check-migrations "guard OK" lines;
- the mark and the now() reading it came from;
- the apply outcome;
- the read-back;
- the line "apply <uuid-fragment of the filename> → expect mark <MARK>" for the operator's staging apply;
- the six ci-status lines;
- unit tests, format:check, lint;
- the file list from `git diff --name-only 41b46aa6` (untracked new files listed by name);
- "Logs read: … · unavailable: …".
Never "CI green" from a local run. END THE TURN after the report.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)

-- E2b (bundle 10, the feed engine): the read door. feed_page returns one page of cards for a category (or all) and a place (or everywhere), in D108's order — premium, then featured, then regular, newest first in each — from the chosen place outward (the widening ladder: the chosen place, then each parent, then everywhere, stopping at the first step that holds at least 8 listings; the chosen place's listings always come first). Continue-after-last paging by cursor. Spec: docs/governance/feed-engine-spec.md.
-- e2e-areas: feed

CREATE FUNCTION public.feed_page(
  p_category_id uuid DEFAULT NULL,
  p_location_id uuid DEFAULT NULL,
  p_after jsonb DEFAULT NULL,
  p_size integer DEFAULT 20)
RETURNS jsonb
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  c_nil     constant uuid := '00000000-0000-0000-0000-000000000000';
  c_widen   constant integer := 8;
  v_cat     uuid;
  v_steps   uuid[];
  v_last    integer;
  v_first   integer := 1;
  v_has_cur boolean := false;
  v_c_tier  smallint;
  v_c_pub   timestamptz;
  v_c_id    uuid;
  v_s       integer;
  v_left    integer;
  v_got     integer;
  v_cards   jsonb := '[]'::jsonb;
  v_n       integer := 0;
  v_rec     record;
  v_end_s   integer;
  v_end_t   smallint;
  v_end_p   timestamptz;
  v_end_i   uuid;
  v_steps_j jsonb := '[]'::jsonb;
BEGIN
  IF p_size IS NULL OR p_size < 1 OR p_size > 50 THEN
    RAISE EXCEPTION 'feed_page: badSize';
  END IF;

  -- The category: none means all categories (the named all key); one must be a live category.
  IF p_category_id IS NULL THEN
    v_cat := c_nil;
  ELSIF EXISTS (SELECT 1 FROM public.categories c WHERE c.id = p_category_id AND c.is_active) THEN
    v_cat := p_category_id;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownCategory';
  END IF;

  -- The ladder: the chosen place, each parent up to its country, then everywhere.
  IF p_location_id IS NULL THEN
    v_steps := ARRAY[c_nil];
  ELSIF EXISTS (SELECT 1 FROM public.locations l WHERE l.id = p_location_id AND l.is_active) THEN
    v_steps := ARRAY(
      WITH RECURSIVE up(id, depth) AS (
        SELECT p_location_id, 0
        UNION ALL
        SELECT l.parent_id, u.depth + 1
          FROM up u
          JOIN public.locations l ON l.id = u.id
         WHERE l.parent_id IS NOT NULL AND u.depth < 8
      )
      SELECT up.id FROM up ORDER BY up.depth) || c_nil;
  ELSE
    RAISE EXCEPTION 'feed_page: unknownPlace';
  END IF;

  -- The widest step read: the first step that holds at least 8 listings, else everywhere.
  v_last := cardinality(v_steps);
  FOR v_s IN 1 .. cardinality(v_steps) LOOP
    IF (SELECT count(*) FROM (
          SELECT 1 FROM public.feed_index f
           WHERE f.category_key = v_cat AND f.place_key = v_steps[v_s]
           LIMIT c_widen) x) >= c_widen THEN
      v_last := v_s;
      EXIT;
    END IF;
  END LOOP;

  -- The cursor: the step and the last card's (tier, publish time, id) of the previous page.
  IF p_after IS NOT NULL THEN
    BEGIN
      v_first  := (p_after->>'s')::integer;
      v_c_tier := (p_after->>'t')::smallint;
      v_c_pub  := (p_after->>'p')::timestamptz;
      v_c_id   := (p_after->>'i')::uuid;
    EXCEPTION WHEN others THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END;
    IF v_first IS NULL OR v_c_tier IS NULL OR v_c_pub IS NULL OR v_c_id IS NULL
       OR v_first < 1 OR v_first > cardinality(v_steps) THEN
      RAISE EXCEPTION 'feed_page: badCursor';
    END IF;
    v_has_cur := true;
  END IF;

  FOR v_s IN v_first .. v_last LOOP
    v_left := p_size - v_n;
    EXIT WHEN v_left = 0;
    v_got := 0;
    FOR v_rec IN
      SELECT f.tier_rank, f.published_at, f.listing_id,
             l.title, l.price_amount, l.price_currency, l.price_mode, l.price_bp,
             l.price_negotiable, l.price_period, l.price_unit, l.price_unit_text,
             l.photos_soon, l.tier, l.category_id, l.location_id,
             loc.name_en AS location_name_en, loc.name_am AS location_name_am
        FROM public.feed_index f
        JOIN public.listings l ON l.id = f.listing_id AND l.status = 'active'
        LEFT JOIN public.locations loc ON loc.id = l.location_id
       WHERE f.category_key = v_cat
         AND f.place_key = v_steps[v_s]
         AND (NOT v_has_cur OR v_s <> v_first
              OR (f.tier_rank, f.published_at, f.listing_id) < (v_c_tier, v_c_pub, v_c_id))
         AND (v_s = 1 OR NOT EXISTS (
               SELECT 1 FROM public.feed_index g
                WHERE g.category_key = v_cat AND g.place_key = v_steps[v_s - 1]
                  AND g.tier_rank = f.tier_rank AND g.published_at = f.published_at
                  AND g.listing_id = f.listing_id))
       ORDER BY f.tier_rank DESC, f.published_at DESC, f.listing_id DESC
       LIMIT v_left
    LOOP
      v_cards := v_cards || jsonb_build_array(jsonb_build_object(
        'id', v_rec.listing_id,
        'title', v_rec.title,
        'priceAmount', v_rec.price_amount,
        'priceCurrency', v_rec.price_currency,
        'priceMode', v_rec.price_mode,
        'priceBp', v_rec.price_bp,
        'priceNegotiable', v_rec.price_negotiable,
        'pricePeriod', v_rec.price_period,
        'priceUnit', v_rec.price_unit,
        'priceUnitText', v_rec.price_unit_text,
        'photosSoon', v_rec.photos_soon,
        'tier', v_rec.tier,
        'publishedAt', v_rec.published_at,
        'categoryId', v_rec.category_id,
        'locationId', v_rec.location_id,
        'locationNameEn', v_rec.location_name_en,
        'locationNameAm', v_rec.location_name_am,
        'step', v_s));
      v_n := v_n + 1;
      v_got := v_got + 1;
      v_end_s := v_s;
      v_end_t := v_rec.tier_rank;
      v_end_p := v_rec.published_at;
      v_end_i := v_rec.listing_id;
    END LOOP;
    IF v_got > 0 THEN
      v_steps_j := v_steps_j || jsonb_build_array(jsonb_build_object('step', v_s, 'placeId', v_steps[v_s], 'shown', v_got));
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'cards', v_cards,
    'ladder', to_jsonb(v_steps[1:v_last]),
    'steps', v_steps_j,
    'next', CASE WHEN v_n = p_size
                 THEN jsonb_build_object('s', v_end_s, 't', v_end_t, 'p', v_end_p, 'i', v_end_i)
            END);
END $fn$;
REVOKE ALL ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) TO anon, authenticated, service_role;
COMMENT ON FUNCTION public.feed_page(uuid, uuid, jsonb, integer) IS
  'The public feed''s read door (bundle 10 E2b): at most 50 cards of active listings with the card''s public fields only (no seller), in D108''s order from the chosen place outward, and the cursor of the next page. Reads feed_index (closed to browsers) as its owner.';

-- Proofs on scratch rows only (a proof cannot create a listing: listings.seller_id references auth.users),
-- so these prove the input rules, the ladder and the privileges; the order and paging are proven by the route tests.
DO $proof$
DECLARE
  v_tag     text := replace(gen_random_uuid()::text, '-', '');
  v_cc      text;
  v_country uuid;
  v_region  uuid;
  v_city    uuid;
  v_cat     uuid;
  v_dead    uuid;
  v_r       jsonb;
  v_err     text;
  v_want    text;
BEGIN
  BEGIN
    SELECT s.c INTO v_cc
      FROM unnest(ARRAY['AA', 'ZZ']
           || ARRAY(SELECT 'Q' || chr(g) FROM generate_series(ascii('M'), ascii('Z')) g)
           || ARRAY(SELECT 'X' || chr(g) FROM generate_series(ascii('A'), ascii('Z')) g)) AS s(c)
     WHERE NOT EXISTS (SELECT 1 FROM public.countries k WHERE k.code = s.c)
     ORDER BY s.c
     LIMIT 1;
    IF v_cc IS NULL THEN
      RAISE EXCEPTION 'E2b proof setup: no free user-assigned country code';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_cc, 'e2e-mig-feed ' || v_cc, false);
    SELECT l.id INTO STRICT v_country
      FROM public.locations l
     WHERE l.level = 'country' AND l.country_code = v_cc AND l.name_en = 'e2e-mig-feed ' || v_cc;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (v_country, 'region', v_cc, 'e2e-mig-feed region', 'e2e-mig-feed-r-' || v_tag, true, 'admin')
      RETURNING id INTO v_region;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
      VALUES (v_region, 'city', v_cc, 'e2e-mig-feed city', 'e2e-mig-feed-c-' || v_tag, true, 'admin', 9.03, 38.74)
      RETURNING id INTO v_city;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-p-' || v_tag, 'e2e-mig-feed P', true, true, false, 999999) RETURNING id INTO v_cat;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-d-' || v_tag, 'e2e-mig-feed D', false, true, false, 999999) RETURNING id INTO v_dead;

    -- P1: an empty scratch branch gives an empty page; the ladder is city, region, country, everywhere.
    v_r := public.feed_page(v_cat, v_city, NULL, 20);
    IF jsonb_array_length(v_r->'cards') <> 0 OR v_r->'next' <> 'null'::jsonb
       OR v_r->'ladder' <> jsonb_build_array(v_city, v_region, v_country, '00000000-0000-0000-0000-000000000000'::uuid) THEN
      RAISE EXCEPTION 'E2b P1: the empty page or its ladder differs: %', v_r;
    END IF;
    -- P2: everywhere is a one-step ladder.
    v_r := public.feed_page(v_cat, NULL, NULL, 20);
    IF v_r->'ladder' <> jsonb_build_array('00000000-0000-0000-0000-000000000000'::uuid) THEN
      RAISE EXCEPTION 'E2b P2: the everywhere ladder differs: %', v_r->'ladder';
    END IF;
    -- P3: refusals, each by its own name.
    FOREACH v_err IN ARRAY ARRAY['badSize0', 'badSize51', 'unknownCategory', 'deadCategory', 'unknownPlace', 'badCursor', 'cursorStep'] LOOP
      BEGIN
        CASE v_err
          WHEN 'badSize0' THEN PERFORM public.feed_page(v_cat, v_city, NULL, 0);
          WHEN 'badSize51' THEN PERFORM public.feed_page(v_cat, v_city, NULL, 51);
          WHEN 'unknownCategory' THEN PERFORM public.feed_page(gen_random_uuid(), v_city, NULL, 20);
          WHEN 'deadCategory' THEN PERFORM public.feed_page(v_dead, v_city, NULL, 20);
          WHEN 'unknownPlace' THEN PERFORM public.feed_page(v_cat, gen_random_uuid(), NULL, 20);
          WHEN 'badCursor' THEN PERFORM public.feed_page(v_cat, v_city, '{"s": "x"}'::jsonb, 20);
          WHEN 'cursorStep' THEN PERFORM public.feed_page(v_cat, v_city,
            jsonb_build_object('s', 9, 't', 0, 'p', now(), 'i', gen_random_uuid()), 20);
        END CASE;
        RAISE EXCEPTION 'E2b P3: % was not refused', v_err;
      EXCEPTION WHEN raise_exception THEN
        IF SQLERRM LIKE 'E2b P3:%' THEN
          RAISE;
        END IF;
        v_want := CASE v_err
                    WHEN 'badSize0' THEN 'feed_page: badSize'
                    WHEN 'badSize51' THEN 'feed_page: badSize'
                    WHEN 'unknownCategory' THEN 'feed_page: unknownCategory'
                    WHEN 'deadCategory' THEN 'feed_page: unknownCategory'
                    WHEN 'unknownPlace' THEN 'feed_page: unknownPlace'
                    ELSE 'feed_page: badCursor'
                  END;
        IF SQLERRM <> v_want THEN
          RAISE EXCEPTION 'E2b P3: % was refused as "%"', v_err, SQLERRM;
        END IF;
      END;
    END LOOP;

    RAISE EXCEPTION USING ERRCODE = 'P0099', MESSAGE = 'e2e-mig-feed-e2b-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-feed-e2b-rollback' THEN
      RAISE;
    END IF;
  END;

  -- P4: the browser roles may call the read door, and still cannot read the index.
  IF NOT has_function_privilege('anon', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.feed_page(uuid,uuid,jsonb,integer)', 'EXECUTE')
     OR has_table_privilege('anon', 'public.feed_index', 'SELECT')
     OR has_table_privilege('authenticated', 'public.feed_index', 'SELECT') THEN
    RAISE EXCEPTION 'E2b P4: the read door''s privileges differ';
  END IF;
  -- P5: header facts.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_page(uuid,uuid,jsonb,integer)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E2b P5: feed_page header facts differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
```
