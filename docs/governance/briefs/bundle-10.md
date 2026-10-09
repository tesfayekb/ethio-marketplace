# Bundle 10 — the feed engine: brief, version 1 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 — THE FEED ENGINE, VERSION 1 (2026-10-09). The spec is docs/governance/feed-engine-spec.md, approved by the operator on 2026-10-08 (D101). This version specifies TURN 1 = PART E1:
- the index table;
- the key function;
- the refresh function;
- the consistency check;
- the backfill of today's active listings;
- its test.
It is ONE migration, Tier A. No screen and no route changes in this turn. The supervisor ran the migration text below on a local Postgres 16 copy of the shapes it touches (proofs pass; a broken key function makes P1 fail) and through scripts/check-migrations.sh (every guard OK).
Line numbers are as of commit 97676945 (dev). This file is public: it is written as build instructions.

STEP 0 — keep this brief
- Before anything else, save this file byte for byte as docs/governance/briefs/bundle-10.md. It is already in its saved form: the header line and one fenced text block.
- Replace line 3 of the root roadmap.md with exactly: Bundle 10 brief: docs/governance/briefs/bundle-10.md (read first every turn).
- On every later turn, read the brief first. Tick no roadmap line in this turn.

HOW TO WORK
- Order of the turn:
  1. step 0;
  2. E1.0, the read-only census on ethio-prod. If any result differs from what it expects, STOP and report: write nothing else;
  3. E1.1 to E1.3: the test, the selector line, the docs and the changelog;
  4. E1.4 LAST: the migration;
  5. the report;
  6. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the platform's "Modify Supabase database" dialog and allow it.
- The turn starts by reading CI for the last commit on dev at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. You cannot git-fetch that branch. Paste the first six lines of ci-status.md.
- Production reads are SELECT-only. Reports carry counts, booleans and the names of tables, columns, functions and roles. Never an e-mail address, a user id, a token or a row of user data.
- Browser tests: try once (`bun run e2e:local e2e/feed-index.spec.ts`). If the browser guard or the browser stops it, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- No package or dependency change, no new string, no screen change.
- Scope:
  - one new migration file under supabase/migrations/ (the database tool names it);
  - e2e/feed-index.spec.ts (new);
  - scripts/e2e-select.ts (one spec added to the area "feed");
  - docs/features/feed-engine.md (new);
  - docs/_changelog.md;
  - the brief and roadmap.md line 3.
  The platform may regenerate src/integrations/supabase/types.ts after the migration; that is allowed, and the report names it. Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, scripts/check-migrations.sh, the e2e helpers and e2e/global-setup.ts are not touched.

THE MIGRATION RULES (G39 — every one applies)
- The migration text is in the appendix at the end of this brief. Write it EXACTLY, changing only `<MARK>`. Do not reformat it, do not add to it, do not "improve" it. If the census shows that a line cannot work as written, STOP before saving and report the line.
- Write the file in a scratch folder first and run the migration check there:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the new text under a name of the form 20261009000000_feed-e1-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time, from E1.0 (f):
  - take now() at time zone 'utc' on ethio-prod, round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - it must be later than the saved file's own stamp and above 20261008050000.
  Fourteen digits, e.g. 20261009050000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- What the text does, so the report can say it:
  - a table closed to the browser roles (RLS on; one policy closing it, as migration_marks has; ALL to service_role only);
  - three functions, each with an in-file REVOKE from PUBLIC, anon and authenticated and EXECUTE for service_role only;
  - a backfill that locks the four tables it reads in SHARE mode for its own few moments, so that the backfill and its check see one state;
  - one DO block of proofs on scratch rows it creates (a free user-assigned country code; places and categories named e2e-mig-feed-…), all rolled back by the P0099 pattern of M14;
  - the self-mark.
  No proof reads a real row, uses a real account or writes in auth.users. No DELETE or UPDATE lacks a WHERE clause.

PART E1 — THE INDEX

E1.0 — CENSUS (read-only, ethio-prod, with your query tool, before writing anything). Paste each result:
- (a) `select status, count(*) from public.listings group by status order by status;`
- (b) `select count(*) from public.listings where status = 'active' and published_at is null;` — such listings get no rows (no publish time is never invented); the check reports them as active_without_published_at.
- (c) Every column the text names exists — expected 30:
  select count(*) from information_schema.columns c
  join (values ('listings','id'),('listings','status'),('listings','published_at'),('listings','category_id'),('listings','location_id'),
    ('listing_locations','listing_id'),('listing_locations','location_id'),
    ('category_tree_pointers','parent_id'),('category_tree_pointers','child_id'),
    ('locations','id'),('locations','parent_id'),('locations','level'),('locations','country_code'),('locations','name_en'),('locations','slug'),
    ('locations','is_active'),('locations','source'),('locations','center_lat'),('locations','center_lng'),
    ('countries','code'),('countries','name_en'),('countries','is_active'),
    ('categories','id'),('categories','slug'),('categories','name_en'),('categories','is_active'),('categories','allow_listings'),
    ('categories','is_catchall'),('categories','display_order'),('migration_marks','version')) v(t, col)
    on c.table_schema = 'public' and c.table_name = v.t and c.column_name = v.col;
- (d) The proofs' inserts fill every required column — expected 0:
  select count(*) from information_schema.columns
  where table_schema = 'public' and is_nullable = 'NO' and column_default is null
    and is_generated = 'NEVER' and is_identity = 'NO'
    and ((table_name = 'countries' and column_name not in ('code','name_en','is_active'))
      or (table_name = 'locations' and column_name not in ('parent_id','level','country_code','name_en','slug','is_active','source','center_lat','center_lng'))
      or (table_name = 'categories' and column_name not in ('slug','name_en','is_active','allow_listings','is_catchall','display_order'))
      or (table_name = 'category_tree_pointers' and column_name not in ('parent_id','child_id')));
- (e) The new names are free — expected 0 rows and null:
  `select proname from pg_proc where pronamespace = 'public'::regnamespace and proname in ('feed_keys','feed_index_refresh','feed_index_check');` and `select to_regclass('public.feed_index');`
- (f) `select max(version) from public.migration_marks;` and `select now() at time zone 'utc';`

E1.1 — THE TEST: e2e/feed-index.spec.ts (new; ids FE-1 to FE-5). API only: no page, service client and one anonymous client.
- Conventions:
  - imports as e2e/posting-routes.spec.ts :1–25 has them: `expect, test` from "./fixtures"; `adminClient` from "./helpers/users";
  - `seedScratchChain` and `destroyLocation` from "./helpers/locations" (:319, :217);
  - `leaseSeller`, `seedCategoryBranch`, `destroyCategoryBranch`, `destroyListingsOf`, `scratchCategorySlug`, `rand` and `RUN` from "./helpers/posting" (:93, :361, :417, :309, :21, :17, :15);
  - `createClient` from "@supabase/supabase-js".
  No helper file changes; any small function the spec needs lives in the spec.
- Cleanup in `test.afterEach`, in this order (as e2e/posting-routes.spec.ts :64–74 does):
  - `destroyListingsOf` for each seller;
  - `destroyLocation` of each scratch region slug;
  - `destroyCategoryBranch` of each branch's slugs.
- A function in the spec, `seedIndexedListing()`:
  - `leaseSeller()`;
  - `seedCategoryBranch()` gives `{ parent, leaf }`;
  - a scratch GUEST category inserted with the service client (slug and name_en `scratchCategorySlug()`, is_active true, allow_listings false, is_catchall false, display_order 9102), and a pointer `{ parent_id: guest.id, child_id: leaf.id, display_order: 2 }`;
  - `seedScratchChain("ET")` gives `{ anchor, region, city, subCity }`;
  - one listing inserted with the service client, with the columns `seedActiveListing` uses (e2e/helpers/categories.ts :224–257): category_id leaf.id, seller_id, location_id chain.city.id, home_country_code "ET", title `e2e-feed-${RUN}-${rand()}`, a description, status "active", and published_at = now as an ISO string;
  - one listing_locations row `{ listing_id, location_id: chain.subCity.id }`.
  Register every seller, region slug and branch (parent, leaf, guest slugs) for the afterEach before the next step can throw.
- NIL = "00000000-0000-0000-0000-000000000000".
- FE-1 "the refresh writes one row per category key and place key":
  - `rpc("feed_index_refresh", { p_listing_id })` returns no error and a count equal to categories.length × places.length;
  - categories = [leaf, parent, guest, NIL] and places = [subCity, city, region, anchor, NIL], both built from the seeded rows, never a written-out count;
  - the rows read from feed_index for that listing: their `${category_key}|${place_key}` set equals the cross product (sorted arrays compared);
  - every tier_rank is 0;
  - every published_at equals the listing's stored published_at (compare as times).
- FE-2 "a listing that is not active gets no rows": a second listing by the same seller, the same columns, status "draft" and published_at null → the refresh returns 0 and no feed_index row exists for it.
- FE-3 "deleting a listing removes its rows": after a refresh, `destroyListingsOf(seller)` → no feed_index row exists for that listing id.
- FE-4 "the check reads one listing's rows" (always `rpc("feed_index_check", { p_listing_id })`, scoped to the test's own listing, so other lanes cannot change what it reads):
  - after a refresh: active_listings 1, active_without_rows 0, listings_with_wrong_rows 0;
  - delete ONE of its own rows (`.delete().eq("listing_id", id).eq("category_key", guest.id).eq("place_key", chain.city.id)`) → listings_with_wrong_rows 1;
  - refresh → listings_with_wrong_rows 0;
  - delete all its own rows (`.delete().eq("listing_id", id)`) → active_without_rows 1, listings_with_wrong_rows 0.
- FE-5 "browsers cannot read the index or call its functions": an anonymous client (`createClient(process.env["E2E_SUPABASE_URL"]!, process.env["E2E_SUPABASE_PUBLISHABLE_KEY"]!, { auth: { persistSession: false } })`, as e2e/posting-routes-catalog.spec.ts :695–701 builds it):
  - `from("feed_index").select("listing_id").limit(1)` returns an error;
  - `rpc` of feed_keys, feed_index_refresh and feed_index_check (each with valid-shaped arguments) each returns an error.
- scripts/e2e-select.ts: the area "feed" (:160–164; src `src/features/feed/**`, specs `e2e/category-nav.spec.ts`) gains `e2e/feed-index.spec.ts` in its specs, so the migration's `-- e2e-areas: feed` line selects it. Run `bun run scripts/e2e-select.ts --self-test` and the unit tests; both pass.

E1.2 — docs/features/feed-engine.md (new), with these sections:
- What E1 built: the table and its key order; the nil-uuid keys; the three functions and who may call them; the backfill and its check.
- What it does not do yet: E2 makes the write doors call the refresh and adds the tree-change re-index job, the read door and /api/feed. Until then the index is not kept current by the doors, and nothing reads it.
- The migration file and its mark.

E1.3 — One changelog line.

E1.4 — THE MIGRATION (last). Write the appendix's text; run the check as above; choose the mark; hand the final text to the database tool once. Then the read-back, with your query tool (it cannot call service-role-only functions — the migration's own checks are the proof of those). Paste each result; a read refused to your tool's role is reported as refused:
- `select version from public.migration_marks where version = '<MARK>';` — one row;
- `select count(*) as rows, count(distinct listing_id) as listings from public.feed_index;`
- `select count(*) from public.listings where status = 'active' and published_at is not null;` — equals the listings count above (a listing published after the apply may differ until E2);
- `select proname, prosecdef, provolatile from pg_proc where pronamespace = 'public'::regnamespace and proname like 'feed%' order by proname;`

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- E2:
  - the write doors call feed_index_refresh;
  - the tree-change re-index job with its heartbeat;
  - feed_page and /api/feed with cursor paging and the widening ladder;
  - the nightly check.
  What a visitor may see (an inactive category or place, a closed country) is the read door's rule; the index holds keys only.
- E3: the feed on the route; subcategory addresses; the performance job.
- Then (agreed, D106 and D107): the chosen place kept on the account, and the amber "different place" notice.

REPORT (one, at the end). First lines:
- done or not done for step 0 and E1.0 to E1.4;
- the E1.0 results;
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
- the file list from `git diff --name-only 97676945` (new files that are not yet tracked are listed by name);
- "Logs read: … · unavailable: …".
Never "CI green" from a local run. END THE TURN after the report.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)

-- E1 (bundle 10, the feed engine): the feed's ordered index. feed_index, feed_keys, feed_index_refresh, feed_index_check, the backfill of today's active listings, and the proofs. Spec: docs/governance/feed-engine-spec.md.
-- e2e-areas: feed

-- 1. The table: one row per (category key, place key) of each active, published listing.
CREATE TABLE public.feed_index (
  category_key uuid NOT NULL,
  place_key    uuid NOT NULL,
  tier_rank    smallint NOT NULL DEFAULT 0,
  published_at timestamptz NOT NULL,
  listing_id   uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  CONSTRAINT feed_index_pkey PRIMARY KEY (category_key, place_key, tier_rank, published_at, listing_id)
);
CREATE INDEX feed_index_listing_idx ON public.feed_index (listing_id);

COMMENT ON TABLE public.feed_index IS
  'The feed''s ordered index (docs/governance/feed-engine-spec.md): one row per (category key, place key) of each active listing with a publish time. A page is one range of the primary key read backwards: higher tier first, then newest, then id. Written only by feed_index_refresh; read by the feed''s read door (E2). Holds no personal data.';
COMMENT ON COLUMN public.feed_index.category_key IS
  'The listing''s category, each of its parents along every pointer, or the named key 00000000-0000-0000-0000-000000000000 = all categories (an explicit key, never a default for a missing value).';
COMMENT ON COLUMN public.feed_index.place_key IS
  'Each place the listing is shown in, each of their parents up to the country, or the named key 00000000-0000-0000-0000-000000000000 = everywhere (an explicit key, never a default for a missing value).';
COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The promotion tier''s order (REQ-024): a higher rank is read first. 0 for every listing in v1.';

ALTER TABLE public.feed_index ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_index_no_client_access" ON public.feed_index
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);
REVOKE ALL ON TABLE public.feed_index FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_index TO service_role;

-- 2. The keys of a category and a set of places.
CREATE FUNCTION public.feed_keys(p_category_id uuid, p_location_ids uuid[])
RETURNS TABLE (category_key uuid, place_key uuid)
LANGUAGE sql
STABLE SECURITY INVOKER
SET search_path TO 'public'
AS $fn$
  WITH RECURSIVE
  cats(id) AS (
    SELECT p_category_id WHERE p_category_id IS NOT NULL
    UNION
    SELECT t.parent_id
      FROM cats c
      JOIN public.category_tree_pointers t ON t.child_id = c.id
     WHERE t.parent_id IS NOT NULL
  ),
  places(id) AS (
    SELECT u.id FROM unnest(p_location_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT l.parent_id
      FROM places p
      JOIN public.locations l ON l.id = p.id
     WHERE l.parent_id IS NOT NULL
  ),
  ck(id) AS (
    SELECT id FROM cats
    UNION
    SELECT '00000000-0000-0000-0000-000000000000'::uuid WHERE p_category_id IS NOT NULL
  ),
  pk(id) AS (
    SELECT id FROM places
    UNION
    SELECT '00000000-0000-0000-0000-000000000000'::uuid
  )
  SELECT ck.id, pk.id FROM ck CROSS JOIN pk;
$fn$;
REVOKE ALL ON FUNCTION public.feed_keys(uuid, uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_keys(uuid, uuid[]) TO service_role;

-- 3. Rewrite one listing's rows.
CREATE FUNCTION public.feed_index_refresh(p_listing_id uuid)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_status      text;
  v_published   timestamptz;
  v_category_id uuid;
  v_location_id uuid;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id
    INTO v_status, v_published, v_category_id, v_location_id
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  IF v_status IS DISTINCT FROM 'active' OR v_published IS NULL THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key, 0, v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- 4. Counts only: is the index what the listings say it should be?
CREATE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id
      FROM public.listings l
     WHERE p_listing_id IS NULL OR l.id = p_listing_id
  ),
  live AS (
    SELECT * FROM scope WHERE status = 'active' AND published_at IS NOT NULL
  ),
  indexed AS (
    SELECT DISTINCT f.listing_id
      FROM public.feed_index f
     WHERE p_listing_id IS NULL OR f.listing_id = p_listing_id
  )
  SELECT jsonb_build_object(
    'active_listings',
      (SELECT count(*) FROM scope WHERE status = 'active'),
    'active_without_published_at',
      (SELECT count(*) FROM scope WHERE status = 'active' AND published_at IS NULL),
    'active_without_rows',
      (SELECT count(*) FROM live v WHERE NOT EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)),
    'rows_for_inactive',
      (SELECT count(*) FROM public.feed_index f JOIN scope s ON s.id = f.listing_id
        WHERE s.status <> 'active' OR s.published_at IS NULL),
    'listings_with_wrong_rows',
      (SELECT count(*) FROM live v
        WHERE EXISTS (SELECT 1 FROM indexed i WHERE i.listing_id = v.id)
          AND EXISTS (
            (SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id
             EXCEPT
             SELECT k.category_key, k.place_key, 0::smallint, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, 0::smallint, v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- 5. The backfill of today's active listings, and its check on the same state.
DO $backfill$
DECLARE
  v_check jsonb;
BEGIN
  LOCK TABLE public.listings, public.listing_locations, public.category_tree_pointers, public.locations IN SHARE MODE;
  PERFORM public.feed_index_refresh(l.id) FROM public.listings l WHERE l.status = 'active';
  v_check := public.feed_index_check(NULL);
  IF (v_check->>'active_without_rows')::int <> 0
     OR (v_check->>'rows_for_inactive')::int <> 0
     OR (v_check->>'listings_with_wrong_rows')::int <> 0 THEN
    RAISE EXCEPTION 'E1 backfill check failed: %', v_check;
  END IF;
END $backfill$;

-- 6. Proofs on scratch rows only; everything inside the inner block is rolled back.
DO $proof$
DECLARE
  v_tag     text := replace(gen_random_uuid()::text, '-', '');
  v_nil     constant uuid := '00000000-0000-0000-0000-000000000000';
  v_cc      text;
  v_country uuid;
  v_region  uuid;
  v_city1   uuid;
  v_city2   uuid;
  v_a       uuid;
  v_b       uuid;
  v_c       uuid;
  v_g       uuid;
  v_n       integer;
  v_role    text;
  v_priv    text;
  v_fn      text;
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
      RAISE EXCEPTION 'E1 proof setup: no free user-assigned country code';
    END IF;
    INSERT INTO public.countries (code, name_en, is_active) VALUES (v_cc, 'e2e-mig-feed ' || v_cc, false);
    SELECT l.id INTO STRICT v_country
      FROM public.locations l
     WHERE l.level = 'country' AND l.country_code = v_cc AND l.name_en = 'e2e-mig-feed ' || v_cc;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source)
      VALUES (v_country, 'region', v_cc, 'e2e-mig-feed region', 'e2e-mig-feed-r-' || v_tag, true, 'admin')
      RETURNING id INTO v_region;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
      VALUES (v_region, 'city', v_cc, 'e2e-mig-feed city one', 'e2e-mig-feed-c1-' || v_tag, true, 'admin', 9.03, 38.74)
      RETURNING id INTO v_city1;
    INSERT INTO public.locations (parent_id, level, country_code, name_en, slug, is_active, source, center_lat, center_lng)
      VALUES (v_region, 'city', v_cc, 'e2e-mig-feed city two', 'e2e-mig-feed-c2-' || v_tag, true, 'admin', 9.04, 38.75)
      RETURNING id INTO v_city2;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-a-' || v_tag, 'e2e-mig-feed A', true, false, false, 999999) RETURNING id INTO v_a;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-b-' || v_tag, 'e2e-mig-feed B', true, false, false, 999999) RETURNING id INTO v_b;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-c-' || v_tag, 'e2e-mig-feed C', true, true, false, 999999) RETURNING id INTO v_c;
    INSERT INTO public.categories (slug, name_en, is_active, allow_listings, is_catchall, display_order)
      VALUES ('e2e-mig-feed-g-' || v_tag, 'e2e-mig-feed G', true, false, false, 999999) RETURNING id INTO v_g;
    INSERT INTO public.category_tree_pointers (parent_id, child_id)
      VALUES (v_a, v_b), (v_b, v_c), (v_g, v_c);

    -- P1: C under B under A, and surfaced under G; city one under the region under the country.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, ARRAY[v_city1]);
    IF v_n <> 20 THEN
      RAISE EXCEPTION 'E1 P1: feed_keys(C, city one) gave % rows, expected 20', v_n;
    END IF;
    IF EXISTS (
      SELECT 1
        FROM unnest(ARRAY[v_c, v_b, v_a, v_g, v_nil]) AS e(id)
       CROSS JOIN unnest(ARRAY[v_city1, v_region, v_country, v_nil]) AS p(id)
       WHERE NOT EXISTS (
         SELECT 1 FROM public.feed_keys(v_c, ARRAY[v_city1]) k
          WHERE k.category_key = e.id AND k.place_key = p.id)) THEN
      RAISE EXCEPTION 'E1 P1: a named key pair is missing';
    END IF;
    -- P2: a top category in a country.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_a, ARRAY[v_country]);
    IF v_n <> 4 THEN
      RAISE EXCEPTION 'E1 P2: feed_keys(A, country) gave % rows, expected 4', v_n;
    END IF;
    -- P3: two cities share their parents once.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, ARRAY[v_city1, v_city2]);
    IF v_n <> 25 THEN
      RAISE EXCEPTION 'E1 P3: feed_keys(C, city one and two) gave % rows, expected 25', v_n;
    END IF;
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, ARRAY[v_city1, v_city1]);
    IF v_n <> 20 THEN
      RAISE EXCEPTION 'E1 P3: a repeated place gave % rows, expected 20', v_n;
    END IF;
    -- P4: no place gives the everywhere key only.
    SELECT count(*) INTO v_n FROM public.feed_keys(v_c, NULL) k WHERE k.place_key = v_nil;
    IF v_n <> 5 OR (SELECT count(*) FROM public.feed_keys(v_c, NULL)) <> 5 THEN
      RAISE EXCEPTION 'E1 P4: feed_keys(C, null) is not the 5 category keys with the everywhere key';
    END IF;
    IF (SELECT count(*) FROM public.feed_keys(v_c, ARRAY[]::uuid[])) <> 5 THEN
      RAISE EXCEPTION 'E1 P4: feed_keys(C, empty) is not 5 rows';
    END IF;
    -- P5: no category gives no rows.
    IF (SELECT count(*) FROM public.feed_keys(NULL, ARRAY[v_city1])) <> 0 THEN
      RAISE EXCEPTION 'E1 P5: feed_keys(null, city one) is not empty';
    END IF;
    -- P6: a refresh of an id that is no listing writes nothing.
    IF public.feed_index_refresh(gen_random_uuid()) <> 0 THEN
      RAISE EXCEPTION 'E1 P6: a refresh of a missing listing wrote rows';
    END IF;

    RAISE EXCEPTION USING ERRCODE = 'P0099', MESSAGE = 'e2e-mig-feed-e1-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-feed-e1-rollback' THEN
      RAISE;
    END IF;
  END;

  -- P7: the table is closed to the browser roles; the functions run for service_role only.
  FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    FOREACH v_priv IN ARRAY ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE'] LOOP
      IF has_table_privilege(v_role, 'public.feed_index', v_priv) THEN
        RAISE EXCEPTION 'E1 P7: % holds % on public.feed_index', v_role, v_priv;
      END IF;
    END LOOP;
    FOREACH v_fn IN ARRAY ARRAY['public.feed_keys(uuid,uuid[])', 'public.feed_index_refresh(uuid)', 'public.feed_index_check(uuid)'] LOOP
      IF has_function_privilege(v_role, v_fn, 'EXECUTE') THEN
        RAISE EXCEPTION 'E1 P7: % can execute %', v_role, v_fn;
      END IF;
    END LOOP;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY['public.feed_keys(uuid,uuid[])', 'public.feed_index_refresh(uuid)', 'public.feed_index_check(uuid)'] LOOP
    IF NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'E1 P7: service_role cannot execute %', v_fn;
    END IF;
  END LOOP;
  IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = 'public.feed_index'::regclass) THEN
    RAISE EXCEPTION 'E1 P7: row level security is off on public.feed_index';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies p
                  WHERE p.schemaname = 'public' AND p.tablename = 'feed_index'
                    AND p.policyname = 'feed_index_no_client_access') THEN
    RAISE EXCEPTION 'E1 P7: the closing policy is missing';
  END IF;

  -- P8: header facts.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_keys(uuid,uuid[])'::regprocedure
                  AND NOT p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E1 P8: feed_keys header facts differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E1 P8: feed_index_refresh header facts differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E1 P8: feed_index_check header facts differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
```
