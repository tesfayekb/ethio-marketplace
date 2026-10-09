# Bundle 10 — the feed engine: brief, version 4 (saved unchanged, 2026-10-09)

```text
BUNDLE 10 — THE FEED ENGINE, VERSION 4 (2026-10-09). THIS FILE REPLACES VERSION 3. Turn 3 saved version 3 (38582ff0) and stopped before writing anything else: your database rules ask that a queue drain wake when work is queued and stop when the queue is empty (no standing poll), and that a new table's grants come before its row level security and policies. This version's appendix does both. It specifies TURN 4 = E2a.5, E2a.6, then E2a.4. Part E2a, the index keeps itself right:
- the tier sets the rank;
- every write to a listing or its places refreshes that listing in the same transaction;
- a moved category or place queues the listings under it and wakes a drain that runs every minute until the queue is empty, with a heartbeat;
- a daily check writes its counts.
It is ONE migration, Tier A. No screen and no route changes in this turn. The read door and /api/feed are Part E2b, the next turn.
The supervisor ran the migration text below on a local Postgres 16 copy of the shapes it touches, after E1's text:
- the proofs pass;
- a missing trigger makes P2 fail;
- its behaviour checks give the expected rows: an insert, an extra place added and removed, a tier change, leaving and returning to active, a moved category, a moved city, a bulk expiry, a delete, and a write by a role that cannot call the refresh itself;
- scripts/check-migrations.sh: every guard OK (again with this version's text);
- the drain wakes when listings are queued, stops when the queue is empty, is woken again by the daily check while rows remain, and keeps running when a listing is queued during its last look (tried with two sessions).
Line numbers are as of commit 38582ff0 (dev). This file is public: it is written as build instructions.

ANSWERS TO TURN 3
- Verified: dev 38582ff0 holds version 3 byte for byte and nothing else changed. Your stop was right: the text conflicted with your database rules, and nothing was rewritten.
- The drain (your first rule): there is no standing schedule any more. feed_reindex_wake() schedules the job feed-reindex-drain (every minute) when listings are queued; each run refreshes up to 500 and unschedules the job when the queue is empty; an advisory lock orders a wake against the drain's last look at the queue; the daily check wakes the drain again if rows remain. The review marker stays as the first line because the drain, while it runs, runs every minute; its reason now says so.
- The order (your second rule): each of the three new tables now reads table, comment, REVOKE and GRANT (and the sequence's), then ENABLE ROW LEVEL SECURITY, then the policy.
- If any other rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.

ANSWERS TO TURN 2 (its ruling on the five-minute schedule is replaced by the answers to turn 3)
- Verified by the diff of 74f17e56..dc990588: the saved brief equals version 2; FE-6 to FE-14, the docs and the changelog line are as version 2 wrote them. The census results are accepted. The ":29" in E2a.1 named the helper's line in e2e/helpers/locations.ts, as you read it.
- The ruling on the five-minute sweep: KEEP the design, as catalog-find-sweep does (supabase/migrations/20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql line 1 carries the same marker). The appendix's first line is now the marker; every other line is unchanged.
- CI on dc990588 is expected RED in FE-6 to FE-14 only: their functions do not exist until the migration applies. Any other red is named in the report.

ANSWERS TO TURN 1
- Verified by the diff of 97676945..74f17e56:
  - the saved brief equals the delivered copy;
  - roadmap line 3 is exact;
  - the migration equals the appendix with the mark 20261009160000 (the final newline left off by the tool);
  - FE-1 to FE-5, the selector line, the docs and the changelog are as written.
- The report's E1.0 results, guard lines, apply and read-back are accepted. Turn 1 is CLEAN, with CI green on its commit after the operator's staging apply.
- The "171 older findings" in the database's warning list are not taken up in this bundle; they belong to the weekly security review.

THE ORDER OF LISTINGS (D108, the operator, 2026-10-09)
- On every page (home, any category, any subcategory, any place): premium listings first, then featured, then regular.
- Newest first inside each. The tier always wins over age.
- When a page widens beyond the chosen place, the chosen place's premium, featured and regular come first, then the next place's, and so on. There is no per-page cap on promoted listings.
- listings.tier already holds premium, featured or regular (default regular; listings_tier_check). Version 1 wrote rank 0 for every listing; this turn ranks premium 2, featured 1, regular 0, read first when higher.

STEP 0 — keep this brief
- Save this file byte for byte OVER docs/governance/briefs/bundle-10.md (it is already in its saved form). roadmap.md line 3 stays as it is. Tick no roadmap line. On every later turn, read the brief first.

HOW TO WORK
- Order of the turn:
  1. step 0;
  2. E2a.5: the test corrections;
  3. E2a.6: the docs and changelog corrections;
  4. E2a.4 LAST: the migration (E2a.0 to E2a.3 were done in turn 2 and are not repeated);
  5. the unit tests;
  6. the report;
  7. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it.
- The turn starts by reading CI for the last commit on dev at https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md, then e2e-last-failure.md and guards-last-failure.md at the same address. You cannot git-fetch that branch. Paste the first six lines of ci-status.md.
- Production reads are SELECT-only. Reports carry counts, booleans and the names of tables, columns, functions, triggers, jobs and roles. Never an e-mail address, a user id, a token or a row of user data.
- Browser tests: try once (`bun run e2e:local e2e/feed-index.spec.ts`). If it does not start, write "local browser runs unavailable"; CI on the final commit is the proof (INC-506). Nothing runs against ethio-prod or the published site.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- No package or dependency change, no new string, no screen change.
- Scope:
  - one new migration file under supabase/migrations/ (the database tool names it);
  - e2e/feed-index.spec.ts;
  - e2e/posting-routes.spec.ts (PR-23 only, E2a.5);
  - docs/features/feed-engine.md;
  - docs/_changelog.md;
  - the brief.
  The platform may regenerate src/integrations/supabase/types.ts; that is allowed and named in the report. Name any other file in the report's first lines with its reason.
- Closed surfaces (G22): the workflow files, the failure reporter, scripts/check-migrations.sh, the e2e helpers and e2e/global-setup.ts are not touched.

THE MIGRATION RULES (G39 — every one applies)
- The migration text is in the appendix at the end of this brief. Its first line is the platform's review marker for the drain's per-minute schedule while it runs. Write it EXACTLY, changing only `<MARK>`. Do not reformat it, add to it or "improve" it. If the census shows that a line cannot work as written, STOP before saving and report the line.
- Two functions are redeclared WHOLE with one change each (the rank from the tier):
  - feed_index_refresh: the tier is read with the listing and ranked by feed_tier_rank;
  - feed_index_check: the expected rank comes from the tier.
  Their header facts stay E1's (E2a.0 (f) checks the live text first).
- Write the file in a scratch folder first and run the migration check there:
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the new text under a name of the form 20261009000000_feed-e2a-check.sql;
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines: Born-closed, Definer, Self-marking, Public-surface, Real-row proof, and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - take now() at time zone 'utc' on ethio-prod, round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - it must be later than the saved file's own stamp and above 20261009160000.
  Turn 2 chose 20261009180000 and the changelog line names it: keep it if it still meets both conditions; otherwise choose by the rule and change the changelog line to the new mark.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- What the text does, so the report can say it:
  - the rank function;
  - the two redeclarations;
  - five triggers that refresh a listing on every write to it or to its extra places (statement-level, one refresh per listing per statement, in the writer's own transaction);
  - a queue, its two enqueue functions and four triggers that queue the active listings under a moved category or place;
  - the wake (feed_reindex_wake schedules feed-reindex-drain when listings are queued) and the drain (feed_reindex_sweep: 500 per run, a heartbeat row per run in feed_reindex_runs, the job unscheduled when the queue is empty);
  - the daily check (heartbeat and counts in feed_index_check_runs; it wakes the drain if the queue still holds rows);
  - a rewrite of every active listing's rows with its tier, checked on one state under brief SHARE locks;
  - the daily schedule (the drain has none of its own);
  - the proofs;
  - the self-mark.
  Every new table is closed to the browser roles (grants first: ALL to service_role only; then RLS on and one closing policy). Every new function has an in-file REVOKE from PUBLIC, anon and authenticated. The trigger functions run as their owner, so a write by any role refreshes the index.

PART E2a — THE INDEX KEEPS ITSELF RIGHT
E2a.0 to E2a.3 were done in turn 2 (dc990588). They stay here as the record and are not repeated; turn 4 is E2a.5, E2a.6, then E2a.4.

E2a.0 — CENSUS (read-only, ethio-prod, with your query tool, before writing anything). Paste each result:
- (a) `select tgrelid::regclass as tab, tgname from pg_trigger where not tgisinternal and tgrelid in ('public.listings'::regclass, 'public.listing_locations'::regclass, 'public.category_tree_pointers'::regclass, 'public.locations'::regclass) order by 1, 2;` — no name begins with feed_.
- (b) `select status, tier, count(*) from public.listings group by 1, 2 order by 1, 2;`
- (c) `select pg_get_constraintdef(oid) from pg_constraint where conname = 'listings_tier_check';` — CHECK of the three tiers premium, featured, regular.
- (d) `select jobname, schedule from cron.job order by jobname;` — no job named feed-…; if your tool is refused, report "refused".
- (e) The new names are free — expected 0 rows and three nulls:
  `select proname from pg_proc where pronamespace = 'public'::regnamespace and proname in ('feed_tier_rank','feed_index_on_listing_insert','feed_index_on_listing_update','feed_index_on_place_insert','feed_index_on_place_delete','feed_index_on_place_update','feed_reindex_enqueue_categories','feed_reindex_enqueue_places','feed_reindex_on_pointer_insert','feed_reindex_on_pointer_delete','feed_reindex_on_pointer_update','feed_reindex_on_place_move','feed_reindex_sweep','feed_index_check_sweep');` and `select to_regclass('public.feed_reindex_queue'), to_regclass('public.feed_reindex_runs'), to_regclass('public.feed_index_check_runs');`
- (f) The live E1 functions: paste `select pg_get_functiondef('public.feed_index_refresh(uuid)'::regprocedure);` and the same for `public.feed_index_check(uuid)`. Say whether each body equals the E1 file's text (supabase/migrations/20261009032615_41aa8133-3f7d-48d9-a5d2-5d4b69abafdd.sql). If not, STOP.
- (g) `select version from public.migration_marks where version = '20261009160000';` (one row), `select max(version) from public.migration_marks;` and `select now() at time zone 'utc';`

E2a.1 — THE TESTS: e2e/feed-index.spec.ts. FE-1 to FE-5 stay as they are; they still hold, because the refresh is idempotent and the insert trigger has already written the rows.
- Add to the imports `scratchSlug` from "./helpers/locations" (:29).
- Add two small functions inside the describe:
  - `sweepUntil(listingId, predicate)`: calls `rpc("feed_reindex_sweep", { p_limit: 500 })` (no error) and reads the rows, inside `expect.poll(...)` with its default timeout, until `predicate(rows)` is true;
  - `setListing(listingId, patch)`: a service-client update of the listing with no error.
- Build expected sets from the seeded rows as FE-1 does (categories = [leaf, parent, guest, NIL]; places = [subCity, city, region, anchor, NIL]), never a written-out count.
- FE-6 "a listing written active is indexed by itself": `seedIndexedListing()`, then WITHOUT calling the refresh: the rows equal the cross product; `check(listingId)` gives active_without_rows 0 and listings_with_wrong_rows 0.
- FE-7 "leaving active removes the rows and returning restores them":
  - status "expired" → no rows;
  - status "active" → the full cross product;
  - published_at set to one minute earlier → every row's published_at equals the new time (compared as times).
- FE-8 "the tier sets the rank": tier "premium" → every row has tier_rank 2; "featured" → 1; "regular" → 0. The row count stays the cross product.
- FE-9 "an extra place removed or added changes the rows":
  - delete the listing_locations row (`.eq("listing_id", id).eq("location_id", chain.subCity.id)`) → the rows equal categories × [city, region, anchor, NIL];
  - insert it again → the full cross product.
- FE-10 "a category surfaced under a new parent is re-indexed by the sweep":
  - a scratch top category X (inserted like the guest; its slug added to the branch before the insert) and a pointer `{ parent_id: X.id, child_id: leaf.id, display_order: 3 }`;
  - `sweepUntil` the rows include X × every place;
  - then a feed_reindex_runs row exists with ran_at at or after the test's start time.
- FE-11 "a city moved to another region is re-indexed by the sweep":
  - a second scratch region R2 under `chain.anchor` (parent_id anchor, level "region", country_code "ET", slug and name_en `scratchSlug("fe-region")`, is_active true, source "admin"), its slug registered for the afterEach before the insert;
  - update the city's parent_id to R2;
  - `sweepUntil` the rows have place_key R2 for every category and none with chain.region.id.
- FE-12 "the reviewer's door to active indexes the listing":
  - a listing inserted with status "screening" and published_at null → no rows;
  - `rpc("transition_listing", { p_listing_id, p_new_status: "active" })` by the service client (as e2e/posting-routes.spec.ts :1038–1042 does) → no error;
  - the rows equal its categories × [city, region, anchor, NIL] (no extra place) with the door's published_at.
- FE-13 "the daily check writes its counts": `rpc("feed_index_check_sweep")` → no error; the result has the keys active_listings, active_without_published_at, active_without_rows, rows_for_inactive, listings_with_wrong_rows and queued; a feed_index_check_runs row exists with ran_at at or after the test's start. Its values are not asserted: other lanes change them.
- FE-14 "browsers cannot read the queue, the heartbeats or call the new functions": the anonymous client of FE-5:
  - `from(...)` of feed_reindex_queue, feed_reindex_runs and feed_index_check_runs each returns an error;
  - `rpc` of feed_reindex_sweep, feed_index_check_sweep and feed_tier_rank each returns an error.
- The selector is unchanged: the migration's header names the areas feed and posting.

E2a.2 — docs/features/feed-engine.md: a section "What E2a built":
- the rank;
- the five refresh triggers;
- the queue, its four triggers and the sweep with its heartbeat;
- the daily check;
- the two schedules;
- the migration and its mark.
In "What it does not do yet", replace the E2 lines with: E2b adds the read door and /api/feed; E3 the screens.

E2a.3 — One changelog line.

E2a.5 — THE TEST CORRECTIONS (before the migration). A heartbeat row is proven by its id, never by its time or by a count:
- the runner's clock and the database's clock differ, so "ran_at at or after the test's start" can miss the row just written;
- each sweep also deletes its rows older than its keeping period, so a count can stay level or fall in the same call that wrote a row.
- FE-10: before the pointer insert, read the largest id of feed_reindex_runs (`select("id").order("id", { ascending: false }).limit(1)`). After `sweepUntil`, a row with a larger id exists. When there was no row before, any row counts. The ran_at comparison goes.
- FE-13: the same for feed_index_check_runs, read before the `rpc("feed_index_check_sweep")` call.
- PR-23 (e2e/posting-routes.spec.ts :1069–1080, INC-511): the same for listing_expiry_sweep_runs, in place of the two exact counts. The count comparison starts to fail once the ledger is older than fourteen days, about 2026-10-18 on ethio-staging. Nothing else in PR-23 changes.
- Census (G29): `grep -rn "_runs" e2e` printed five lines at 38582ff0: e2e/posting-routes.spec.ts :1070 and :1076 (PR-23), e2e/feed-index.spec.ts :347 (FE-10), :429 (FE-13) and :443 (FE-14's table list, which reads no heartbeat and stays as it is). Run it again and name any other line that proves a heartbeat row.

E2a.6 — THE DOCS AND CHANGELOG CORRECTIONS (the drain no longer has a standing schedule):
- docs/features/feed-engine.md, in "The queue and the sweep", replace the sentence beginning "`feed_reindex_sweep(limit 500)` refreshes queued listings" with: `feed_reindex_wake()` starts the job `feed-reindex-drain` (every minute) when listings are queued; each run of `feed_reindex_sweep(limit 500)` refreshes up to 500 queued listings, writes one heartbeat row in `feed_reindex_runs` (kept 14 days) and unschedules the job when the queue is empty. An advisory lock orders a wake against the drain's last look, so a queued listing always has a drain; the daily check wakes it again if rows remain.
- The same file: replace the bullet "**The two schedules** — …" with: - **The schedules** — `feed-index-check` daily at 03:53 UTC; `feed-reindex-drain` only while the queue holds listings.
- docs/_changelog.md, the E2a line: replace "feed_reindex_sweep (500 per run, every five minutes, heartbeat feed_reindex_runs)" with "feed_reindex_wake and feed_reindex_sweep (a drain every minute only while the queue holds listings, 500 per run, heartbeat feed_reindex_runs)", and "two schedules" with "the daily schedule". If the mark changes, change it there too.
- Run the formatter's check on both files.

E2a.4 — THE MIGRATION (last). Write the appendix's text; run the check as above; choose the mark; hand the final text to the database tool once. Then the read-back with your query tool (it cannot call service-role-only functions — the migration's own proofs are the proof of those). Paste each result; a read refused to your tool's role is reported as refused:
- `select version from public.migration_marks where version = '<MARK>';` — one row;
- `select tier_rank, count(*) from public.feed_index group by 1 order by 1;`
- `select count(*) from pg_trigger where not tgisinternal and tgname like 'feed\_%';` — 9;
- `select jobname, schedule from cron.job where jobname like 'feed-%' order by 1;` — feed-index-check at 53 3 * * *, and no feed-reindex-drain (the queue is empty after the apply);
- `select proname, prosecdef, provolatile from pg_proc where pronamespace = 'public'::regnamespace and proname like 'feed%' order by proname;`

NAMED FOR THE NEXT VERSIONS (not specified here; build none of it)
- E2b — the read door feed_page and /api/feed:
  - D108's order;
  - the widening ladder with the chosen place first;
  - cursor paging;
  - the edge cache for visitors;
  - its tests.
- E3 — the screens on /api/feed; subcategory addresses; the performance job.
- A listing a seller publishes goes to `screening`, and only the gateway (stage 2) or a reviewer makes it active. How the published site gets active listings for E3's walk is decided with E3's brief.
- Then (agreed, D106 and D107): the chosen place kept on the account, and the amber "different place" notice.

REPORT (one, at the end). First lines:
- done or not done for step 0, E2a.5, E2a.6 and E2a.4;
- the E2a.5 census;
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
- the file list from `git diff --name-only 38582ff0` (untracked new files listed by name);
- "Logs read: … · unavailable: …".
Never "CI green" from a local run. END THE TURN after the report.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)

-- lovable-cron-fallback-reviewed: bundle 10 brief version 4 (E2a) - feed-reindex-drain runs every minute ONLY while the tree-change queue holds listings: it is scheduled when listings are queued and unschedules itself when the queue is empty; the five write triggers are the main path. The only standing schedule is the daily feed-index-check.
-- E2a (bundle 10, the feed engine): the index keeps itself right. The tier sets the rank (D108: premium, then featured, then regular); every write to a listing or its places refreshes that listing's rows in the same transaction; a moved category or place queues the listings under it and wakes a drain that runs every minute until the queue is empty, with a heartbeat; a daily check writes its counts. Spec: docs/governance/feed-engine-spec.md.
-- e2e-areas: feed, posting

-- 1. The tier's rank: premium 2, featured 1, regular 0; read first when higher.
CREATE FUNCTION public.feed_tier_rank(p_tier text)
RETURNS smallint
LANGUAGE plpgsql
IMMUTABLE
SET search_path TO 'public'
AS $fn$
DECLARE
  v_rank smallint;
BEGIN
  v_rank := CASE p_tier WHEN 'premium' THEN 2 WHEN 'featured' THEN 1 WHEN 'regular' THEN 0 END;
  IF v_rank IS NULL THEN
    RAISE EXCEPTION 'feed_tier_rank: unknown tier %', p_tier;
  END IF;
  RETURN v_rank;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_tier_rank(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_tier_rank(text) TO service_role;

COMMENT ON COLUMN public.feed_index.tier_rank IS
  'The listing''s tier (D108): premium 2, featured 1, regular 0 (feed_tier_rank). A higher rank is read first; newest first inside a rank.';

-- 2. The refresh, redeclared whole from E1 with one change: the rank comes from the listing's tier.
CREATE OR REPLACE FUNCTION public.feed_index_refresh(p_listing_id uuid)
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
  v_tier        text;
  v_n           integer := 0;
BEGIN
  -- The listing's row lock serialises two refreshes of the same listing.
  SELECT l.status, l.published_at, l.category_id, l.location_id, l.tier
    INTO v_status, v_published, v_category_id, v_location_id, v_tier
    FROM public.listings l
   WHERE l.id = p_listing_id
     FOR UPDATE;
  DELETE FROM public.feed_index WHERE listing_id = p_listing_id;
  IF v_status IS DISTINCT FROM 'active' OR v_published IS NULL THEN
    RETURN 0;
  END IF;
  INSERT INTO public.feed_index (category_key, place_key, tier_rank, published_at, listing_id)
  SELECT k.category_key, k.place_key, public.feed_tier_rank(v_tier), v_published, p_listing_id
    FROM public.feed_keys(
           v_category_id,
           ARRAY[v_location_id] || ARRAY(
             SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = p_listing_id)) k;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_refresh(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_refresh(uuid) TO service_role;

-- 3. The check, redeclared whole from E1 with one change: the expected rank comes from the tier.
CREATE OR REPLACE FUNCTION public.feed_index_check(p_listing_id uuid DEFAULT NULL)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
  WITH scope AS (
    SELECT l.id, l.status, l.published_at, l.category_id, l.location_id, l.tier
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
             SELECT k.category_key, k.place_key, public.feed_tier_rank(v.tier), v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k)
            UNION ALL
            (SELECT k.category_key, k.place_key, public.feed_tier_rank(v.tier), v.published_at
               FROM public.feed_keys(v.category_id, ARRAY[v.location_id] || ARRAY(
                      SELECT ll.location_id FROM public.listing_locations ll WHERE ll.listing_id = v.id)) k
             EXCEPT
             SELECT f.category_key, f.place_key, f.tier_rank, f.published_at
               FROM public.feed_index f WHERE f.listing_id = v.id)))
  );
$fn$;
REVOKE ALL ON FUNCTION public.feed_index_check(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check(uuid) TO service_role;

-- 4. Every write to a listing refreshes it in the same transaction (statement-level, one refresh per listing).
CREATE FUNCTION public.feed_index_on_listing_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(n.id) FROM new_rows n WHERE n.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_insert() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_listing_insert
  AFTER INSERT ON public.listings
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_listing_insert();

CREATE FUNCTION public.feed_index_on_listing_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(n.id)
     FROM new_rows n
     JOIN old_rows o ON o.id = n.id
    WHERE (o.status = 'active' OR n.status = 'active')
      AND (o.status, o.published_at, o.category_id, o.location_id, o.tier)
          IS DISTINCT FROM (n.status, n.published_at, n.category_id, n.location_id, n.tier);
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_listing_update() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_listing_update
  AFTER UPDATE ON public.listings
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_listing_update();

-- 5. Every write to a listing's extra places refreshes that listing (an active one only).
CREATE FUNCTION public.feed_index_on_place_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(x.listing_id)
     FROM (SELECT DISTINCT n.listing_id FROM new_rows n) x
     JOIN public.listings l ON l.id = x.listing_id
    WHERE l.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_place_insert() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_place_insert
  AFTER INSERT ON public.listing_locations
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_place_insert();

CREATE FUNCTION public.feed_index_on_place_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(x.listing_id)
     FROM (SELECT DISTINCT o.listing_id FROM old_rows o) x
     JOIN public.listings l ON l.id = x.listing_id
    WHERE l.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_place_delete() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_place_delete
  AFTER DELETE ON public.listing_locations
  REFERENCING OLD TABLE AS old_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_place_delete();

CREATE FUNCTION public.feed_index_on_place_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_index_refresh(x.listing_id)
     FROM (SELECT n.listing_id FROM new_rows n UNION SELECT o.listing_id FROM old_rows o) x
     JOIN public.listings l ON l.id = x.listing_id
    WHERE l.status = 'active';
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_on_place_update() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_index_on_place_update
  AFTER UPDATE ON public.listing_locations
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_index_on_place_update();

-- 6. A moved category or place queues the active listings under it; a sweep refreshes them.
CREATE TABLE public.feed_reindex_queue (
  listing_id uuid NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  queued_at  timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT feed_reindex_queue_pkey PRIMARY KEY (listing_id)
);
CREATE INDEX feed_reindex_queue_queued_idx ON public.feed_reindex_queue (queued_at);
COMMENT ON TABLE public.feed_reindex_queue IS
  'Listings whose feed rows must be rewritten after a category or place moved; drained by feed_reindex_sweep, which the job feed-reindex-drain runs every minute while this queue holds rows.';
REVOKE ALL ON TABLE public.feed_reindex_queue FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_reindex_queue TO service_role;
ALTER TABLE public.feed_reindex_queue ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_reindex_queue_no_client_access" ON public.feed_reindex_queue
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE TABLE public.feed_reindex_runs (
  id        bigserial PRIMARY KEY,
  ran_at    timestamptz NOT NULL DEFAULT now(),
  refreshed integer NOT NULL,
  remaining integer NOT NULL
);
COMMENT ON TABLE public.feed_reindex_runs IS
  'Heartbeat of feed_reindex_sweep: one row per run, "nothing to do" included; kept 14 days.';
REVOKE ALL ON TABLE public.feed_reindex_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_reindex_runs TO service_role;
REVOKE ALL ON SEQUENCE public.feed_reindex_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.feed_reindex_runs_id_seq TO service_role;
ALTER TABLE public.feed_reindex_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_reindex_runs_no_client_access" ON public.feed_reindex_runs
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

CREATE TABLE public.feed_index_check_runs (
  id     bigserial PRIMARY KEY,
  ran_at timestamptz NOT NULL DEFAULT now(),
  result jsonb NOT NULL
);
COMMENT ON TABLE public.feed_index_check_runs IS
  'Heartbeat and counts of the daily feed_index_check_sweep (counts only, no listing id); kept 60 days.';
REVOKE ALL ON TABLE public.feed_index_check_runs FROM PUBLIC, anon, authenticated;
GRANT ALL ON TABLE public.feed_index_check_runs TO service_role;
REVOKE ALL ON SEQUENCE public.feed_index_check_runs_id_seq FROM PUBLIC, anon, authenticated;
GRANT USAGE, SELECT ON SEQUENCE public.feed_index_check_runs_id_seq TO service_role;
ALTER TABLE public.feed_index_check_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "feed_index_check_runs_no_client_access" ON public.feed_index_check_runs
  FOR ALL TO anon, authenticated USING (false) WITH CHECK (false);

-- The drain wakes when listings are queued and stops when the queue is empty. One advisory lock orders
-- a wake against the drain's last look at the queue, so a queued listing is never left without a drain.
CREATE FUNCTION public.feed_reindex_wake()
RETURNS void
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('public.feed_reindex_queue'));
  PERFORM cron.schedule('feed-reindex-drain', '* * * * *', 'SELECT public.feed_reindex_sweep(500)');
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_wake() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_wake() TO service_role;

CREATE FUNCTION public.feed_reindex_enqueue_categories(p_category_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_category_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT t.child_id
      FROM sub s
      JOIN public.category_tree_pointers t ON t.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status = 'active'
     AND l.category_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_categories(uuid[]) TO service_role;

CREATE FUNCTION public.feed_reindex_enqueue_places(p_location_ids uuid[])
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_n integer := 0;
BEGIN
  WITH RECURSIVE sub(id) AS (
    SELECT u.id FROM unnest(p_location_ids) AS u(id) WHERE u.id IS NOT NULL
    UNION
    SELECT l.id
      FROM sub s
      JOIN public.locations l ON l.parent_id = s.id
  )
  INSERT INTO public.feed_reindex_queue (listing_id)
  SELECT l.id
    FROM public.listings l
   WHERE l.status = 'active'
     AND l.location_id IN (SELECT id FROM sub)
  UNION
  SELECT l.id
    FROM public.listing_locations ll
    JOIN public.listings l ON l.id = ll.listing_id
   WHERE l.status = 'active'
     AND ll.location_id IN (SELECT id FROM sub)
  ON CONFLICT (listing_id) DO NOTHING;
  GET DIAGNOSTICS v_n = ROW_COUNT;
  IF v_n > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_n;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_enqueue_places(uuid[]) TO service_role;

CREATE FUNCTION public.feed_reindex_on_pointer_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_reindex_enqueue_categories(ARRAY(SELECT DISTINCT n.child_id FROM new_rows n));
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_pointer_insert() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_pointer_insert
  AFTER INSERT ON public.category_tree_pointers
  REFERENCING NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_pointer_insert();

CREATE FUNCTION public.feed_reindex_on_pointer_delete()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_reindex_enqueue_categories(ARRAY(SELECT DISTINCT o.child_id FROM old_rows o));
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_pointer_delete() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_pointer_delete
  AFTER DELETE ON public.category_tree_pointers
  REFERENCING OLD TABLE AS old_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_pointer_delete();

CREATE FUNCTION public.feed_reindex_on_pointer_update()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
BEGIN
  PERFORM public.feed_reindex_enqueue_categories(ARRAY(
    SELECT n.child_id
      FROM new_rows n
      JOIN old_rows o ON o.id = n.id
     WHERE (o.parent_id, o.child_id) IS DISTINCT FROM (n.parent_id, n.child_id)
    UNION
    SELECT o.child_id
      FROM old_rows o
      JOIN new_rows n ON n.id = o.id
     WHERE (o.parent_id, o.child_id) IS DISTINCT FROM (n.parent_id, n.child_id)));
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_pointer_update() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_pointer_update
  AFTER UPDATE ON public.category_tree_pointers
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_pointer_update();

CREATE FUNCTION public.feed_reindex_on_place_move()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_moved uuid[];
BEGIN
  v_moved := ARRAY(
    SELECT n.id
      FROM new_rows n
      JOIN old_rows o ON o.id = n.id
     WHERE o.parent_id IS DISTINCT FROM n.parent_id);
  IF cardinality(v_moved) > 0 THEN
    PERFORM public.feed_reindex_enqueue_places(v_moved);
  END IF;
  RETURN NULL;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_on_place_move() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER feed_reindex_on_place_move
  AFTER UPDATE ON public.locations
  REFERENCING OLD TABLE AS old_rows NEW TABLE AS new_rows
  FOR EACH STATEMENT EXECUTE FUNCTION public.feed_reindex_on_place_move();

CREATE FUNCTION public.feed_reindex_sweep(p_limit integer DEFAULT 500)
RETURNS integer
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_ids  uuid[];
  v_id   uuid;
  v_left integer;
BEGIN
  IF p_limit IS NULL OR p_limit < 1 THEN
    RAISE EXCEPTION 'feed_reindex_sweep: the limit must be a positive number';
  END IF;
  v_ids := ARRAY(
    SELECT q.listing_id
      FROM public.feed_reindex_queue q
     ORDER BY q.queued_at, q.listing_id
     LIMIT p_limit
       FOR UPDATE SKIP LOCKED);
  FOREACH v_id IN ARRAY v_ids LOOP
    PERFORM public.feed_index_refresh(v_id);
  END LOOP;
  DELETE FROM public.feed_reindex_queue WHERE listing_id = ANY (v_ids);
  PERFORM pg_advisory_xact_lock(hashtext('public.feed_reindex_queue'));
  SELECT count(*) INTO v_left FROM public.feed_reindex_queue;
  INSERT INTO public.feed_reindex_runs (refreshed, remaining) VALUES (cardinality(v_ids), v_left);
  DELETE FROM public.feed_reindex_runs WHERE ran_at < now() - interval '14 days';
  IF v_left = 0 AND EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain') THEN
    PERFORM cron.unschedule('feed-reindex-drain');
  END IF;
  RETURN cardinality(v_ids);
END $fn$;
REVOKE ALL ON FUNCTION public.feed_reindex_sweep(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_reindex_sweep(integer) TO service_role;

CREATE FUNCTION public.feed_index_check_sweep()
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE SECURITY DEFINER
SET search_path TO 'public'
AS $fn$
DECLARE
  v_result jsonb;
BEGIN
  v_result := public.feed_index_check(NULL)
              || jsonb_build_object('queued', (SELECT count(*) FROM public.feed_reindex_queue));
  INSERT INTO public.feed_index_check_runs (result) VALUES (v_result);
  DELETE FROM public.feed_index_check_runs WHERE ran_at < now() - interval '60 days';
  -- A queue that still holds rows is woken again (its drain stops only when the queue is empty).
  IF (v_result->>'queued')::int > 0 THEN
    PERFORM public.feed_reindex_wake();
  END IF;
  RETURN v_result;
END $fn$;
REVOKE ALL ON FUNCTION public.feed_index_check_sweep() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.feed_index_check_sweep() TO service_role;

-- 7. Rewrite every active listing's rows with its tier, and check, on one state.
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
    RAISE EXCEPTION 'E2a backfill check failed: %', v_check;
  END IF;
END $backfill$;

-- 8. Schedules: the check daily. The drain has no standing schedule: feed_reindex_wake starts it.
DO $cron$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'feed-index-check') THEN
    PERFORM cron.unschedule('feed-index-check');
  END IF;
  PERFORM cron.schedule('feed-index-check', '53 3 * * *', 'SELECT public.feed_index_check_sweep()');
END $cron$;

-- 9. Proofs. Behaviour on listings is proven by e2e/feed-index.spec.ts (a proof cannot create a listing:
--    listings.seller_id references auth.users). These prove the rank, the wiring and the privileges.
DO $proof$
DECLARE
  v_role text;
  v_priv text;
  v_fn   text;
  v_tab  text;
  v_n    integer;
  v_runs integer;
  v_res  jsonb;
BEGIN
  -- P1: the rank of each tier, and an unknown tier is refused.
  IF public.feed_tier_rank('premium') <> 2 OR public.feed_tier_rank('featured') <> 1
     OR public.feed_tier_rank('regular') <> 0 THEN
    RAISE EXCEPTION 'E2a P1: the tier ranks differ';
  END IF;
  BEGIN
    PERFORM public.feed_tier_rank('gold');
    RAISE EXCEPTION 'E2a P1: an unknown tier was ranked';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM NOT LIKE 'feed_tier_rank: unknown tier%' THEN
      RAISE;
    END IF;
  END;

  -- P2: the nine triggers are in place and enabled.
  SELECT count(*) INTO v_n
    FROM pg_trigger t
   WHERE NOT t.tgisinternal AND t.tgenabled = 'O'
     AND (t.tgrelid, t.tgname) IN (
       ('public.listings'::regclass, 'feed_index_on_listing_insert'),
       ('public.listings'::regclass, 'feed_index_on_listing_update'),
       ('public.listing_locations'::regclass, 'feed_index_on_place_insert'),
       ('public.listing_locations'::regclass, 'feed_index_on_place_delete'),
       ('public.listing_locations'::regclass, 'feed_index_on_place_update'),
       ('public.category_tree_pointers'::regclass, 'feed_reindex_on_pointer_insert'),
       ('public.category_tree_pointers'::regclass, 'feed_reindex_on_pointer_delete'),
       ('public.category_tree_pointers'::regclass, 'feed_reindex_on_pointer_update'),
       ('public.locations'::regclass, 'feed_reindex_on_place_move'));
  IF v_n <> 9 THEN
    RAISE EXCEPTION 'E2a P2: % of the nine triggers are in place', v_n;
  END IF;

  -- P3: the daily check is scheduled; the standing sweep schedule of version 2 does not exist.
  IF NOT EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-index-check' AND j.schedule = '53 3 * * *') THEN
    RAISE EXCEPTION 'E2a P3: the daily check is not scheduled';
  END IF;
  IF EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-sweep') THEN
    RAISE EXCEPTION 'E2a P3: a standing sweep schedule exists';
  END IF;

  -- P4: a wake schedules the drain; a sweep writes its heartbeat row and stops the drain when the
  -- queue is empty; a check writes its row (all rolled back).
  BEGIN
    PERFORM public.feed_reindex_wake();
    IF NOT EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain' AND j.schedule = '* * * * *') THEN
      RAISE EXCEPTION 'E2a P4: a wake did not schedule the drain';
    END IF;
    SELECT count(*) INTO v_runs FROM public.feed_reindex_runs;
    PERFORM public.feed_reindex_sweep(500);
    IF (SELECT count(*) FROM public.feed_reindex_runs) <> v_runs + 1 THEN
      RAISE EXCEPTION 'E2a P4: the sweep wrote no heartbeat row';
    END IF;
    IF (SELECT count(*) FROM public.feed_reindex_queue) = 0
       AND EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain') THEN
      RAISE EXCEPTION 'E2a P4: the drain kept running on an empty queue';
    END IF;
    IF (SELECT count(*) FROM public.feed_reindex_queue) > 0
       AND NOT EXISTS (SELECT 1 FROM cron.job j WHERE j.jobname = 'feed-reindex-drain') THEN
      RAISE EXCEPTION 'E2a P4: the drain stopped while the queue holds rows';
    END IF;
    BEGIN
      PERFORM public.feed_reindex_sweep(0);
      RAISE EXCEPTION 'E2a P4: a zero limit was accepted';
    EXCEPTION WHEN raise_exception THEN
      IF SQLERRM NOT LIKE 'feed_reindex_sweep: the limit%' THEN
        RAISE;
      END IF;
    END;
    SELECT count(*) INTO v_runs FROM public.feed_index_check_runs;
    v_res := public.feed_index_check_sweep();
    IF NOT (v_res ?& ARRAY['active_listings', 'active_without_published_at', 'active_without_rows',
                           'rows_for_inactive', 'listings_with_wrong_rows', 'queued'])
       OR (SELECT count(*) FROM public.feed_index_check_runs) <> v_runs + 1 THEN
      RAISE EXCEPTION 'E2a P4: the check sweep wrote no complete row';
    END IF;
    RAISE EXCEPTION USING ERRCODE = 'P0099', MESSAGE = 'e2e-mig-feed-e2a-rollback';
  EXCEPTION WHEN SQLSTATE 'P0099' THEN
    IF SQLERRM <> 'e2e-mig-feed-e2a-rollback' THEN
      RAISE;
    END IF;
  END;

  -- P5: the three new tables are closed to the browser roles; the new functions run for service_role only.
  FOREACH v_tab IN ARRAY ARRAY['public.feed_reindex_queue', 'public.feed_reindex_runs', 'public.feed_index_check_runs'] LOOP
    IF NOT (SELECT c.relrowsecurity FROM pg_class c WHERE c.oid = v_tab::regclass) THEN
      RAISE EXCEPTION 'E2a P5: row level security is off on %', v_tab;
    END IF;
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      FOREACH v_priv IN ARRAY ARRAY['SELECT', 'INSERT', 'UPDATE', 'DELETE'] LOOP
        IF has_table_privilege(v_role, v_tab, v_priv) THEN
          RAISE EXCEPTION 'E2a P5: % holds % on %', v_role, v_priv, v_tab;
        END IF;
      END LOOP;
    END LOOP;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY[
    'public.feed_tier_rank(text)', 'public.feed_index_refresh(uuid)', 'public.feed_index_check(uuid)',
    'public.feed_reindex_enqueue_categories(uuid[])', 'public.feed_reindex_enqueue_places(uuid[])',
    'public.feed_reindex_wake()', 'public.feed_reindex_sweep(integer)', 'public.feed_index_check_sweep()'] LOOP
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      IF has_function_privilege(v_role, v_fn, 'EXECUTE') THEN
        RAISE EXCEPTION 'E2a P5: % can execute %', v_role, v_fn;
      END IF;
    END LOOP;
    IF NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'E2a P5: service_role cannot execute %', v_fn;
    END IF;
  END LOOP;
  FOREACH v_fn IN ARRAY ARRAY[
    'public.feed_index_on_listing_insert()', 'public.feed_index_on_listing_update()',
    'public.feed_index_on_place_insert()', 'public.feed_index_on_place_delete()',
    'public.feed_index_on_place_update()', 'public.feed_reindex_on_pointer_insert()',
    'public.feed_reindex_on_pointer_delete()', 'public.feed_reindex_on_pointer_update()',
    'public.feed_reindex_on_place_move()'] LOOP
    FOREACH v_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
      IF has_function_privilege(v_role, v_fn, 'EXECUTE') THEN
        RAISE EXCEPTION 'E2a P5: % can execute %', v_role, v_fn;
      END IF;
    END LOOP;
  END LOOP;

  -- P6: header facts of the two redeclared functions are E1's.
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_refresh(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 'v' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E2a P6: feed_index_refresh header facts differ';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_proc p WHERE p.oid = 'public.feed_index_check(uuid)'::regprocedure
                  AND p.prosecdef AND p.provolatile = 's' AND p.proconfig = ARRAY['search_path=public']) THEN
    RAISE EXCEPTION 'E2a P6: feed_index_check header facts differ';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
```
