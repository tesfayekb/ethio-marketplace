# Foundations turn D1 — stop 4: M3b (INC-949 follow-up) applied on ethio-prod

- File: `supabase/migrations/20261028225628_e2358bd4-2732-40ce-adcc-f4537ee64564.sql` (applied on the first attempt).
- Mark: `20261029030000`. The G39 hour is 00:00, and 00:00–02:00 are taken by M1–M3, so this is the next free hour. M4 re-derives its own mark. Read back on ethio-prod → `20261029030000`.

## Changes

- `public.shown_locations` is a new view holding today's rule written once: `SELECT l.* FROM locations l WHERE <the predicate>`. It has `security_invoker=true`. ACL: `{postgres=arwdDxtm/postgres,service_role=rDxtm/postgres}`, so there is no browser grant.
  - The view freezes `l.*` at creation, so a column added to `locations` later needs the view redeclared.
- `place_is_shown(uuid)` is now `EXISTS (SELECT 1 FROM shown_locations s WHERE s.id = p_id)`. Its header and grant are unchanged (sql, STABLE, INVOKER, search_path public; service_role).
- `get_location_tree` now selects `FROM public.shown_locations l WHERE l.country_code = upper(p_country_code)`. The ORDER BY, header and ACL are unchanged (anon, authenticated, service_role).
- `public_listing_json` is unchanged; its two FILTERs call `place_is_shown`.
- `locations_one_anchor_per_country`: `CREATE UNIQUE INDEX … ON public.locations USING btree (country_code) WHERE (level = 'country'::text)`.

## Read-back

- md5 values: `get_location_tree` `bc9ff5e32f44b699cb2715b5065da2c2`, `place_is_shown` `98cbc98d9450586a908785ed1bfd9c4d`, `pg_get_viewdef(shown_locations)` `e3d4255d12331afed18f0ed4f6ae3442`.
- Scratch market `XZ`: 0 rows left.

## Performance — EXPLAIN (ANALYZE), ethio-prod

**Departure:** the read-only query role may not EXECUTE `get_location_tree` (42501, permission denied). So the measurement is the function's own body, run inline, which is the same form as the 4.9 ms baseline. The function is SQL and SECURITY DEFINER, so its body is planned as a whole statement each call, and the view now inlines into it.

Run twice. Second run, pasted:

```text
Sort  (actual time=2.852..2.874 rows=214 loops=1)
  Sort Key: (CASE l.level WHEN 'country' THEN 0 WHEN 'region' THEN 1 WHEN 'city' THEN 2 ELSE 3 END), l.display_order, l.name_en
  Sort Method: quicksort  Memory: 50kB
  ->  Nested Loop  (actual time=0.641..2.020 rows=214 loops=1)
        Join Filter: (l.country_code = k.code)
        ->  Hash Join  (actual time=0.290..0.309 rows=17 loops=1)
              Hash Cond: (a.country_code = k.code)
              ->  HashAggregate  (actual time=0.190..0.198 rows=17 loops=1)
                    Group Key: a.country_code
                    ->  Index Scan using locations_active_idx on locations a  (actual time=0.016..0.181 rows=17 loops=1)
                          Filter: (level = 'country'::text)   Rows Removed by Filter: 477
              ->  Hash  (actual time=0.075..0.076 rows=17 loops=1)
                    ->  Seq Scan on countries k  (actual time=0.039..0.063 rows=17 loops=1)
                          Filter: is_active   Rows Removed by Filter: 232
        ->  Bitmap Heap Scan on locations l  (actual time=0.035..0.092 rows=13 loops=17)
              Recheck Cond: ((country_code = a.country_code) AND is_active)
              Filter: (((country_code)::text = 'ET'::text) AND ((level = 'country') OR (level = 'region') OR ((level = 'city') AND EXISTS(SubPlan 1)) OR ((level = 'sub_city') AND EXISTS(SubPlan 3) AND EXISTS(SubPlan 5))))
              ->  BitmapAnd  (loops=17)
                    ->  Bitmap Index Scan on locations_country_idx  (rows=29 loops=17)
                    ->  Bitmap Index Scan on locations_active_idx   (rows=500 loops=17)
              SubPlan 1 ->  Index Scan using locations_pkey on locations r   (loops=188)
              SubPlan 3 ->  Index Scan using locations_pkey on locations c   (loops=11)
              SubPlan 5 ->  Index Scan using locations_pkey on locations r_1 (loops=11)
Planning Time: 2.911 ms
Execution Time: 3.175 ms
```

- First run: 2.857 ms execution and 5.642 ms planning.
- 3.175 ms is under the 1.5 × 4.9 ms = 7.35 ms tolerance. No STOP.
- Seen in the plan, not changed: `country_code` is `char(2)`, so `= upper(text)` is compared as `::text`. The constant is not used as an index condition, and the probe runs once per open market (17 loops). This is the same as the old WHERE, and it is reported for a later ruling.

## Proofs

The sentinel `d1-m3b-proof-ok` was reached. Each check ran on the scratch market `XZ`:

- (e) a second country anchor for `XZ` is refused with `unique_violation`;
- (d) `place_is_shown` is true for C1 and false for C2 (switched off) and C3 (its region is off);
- (a) the tree has the anchor, R1 and C1, and none of C2, C3 or R2;
- (b/c) the ad's list and coverage are `[C1]`, and C1's path is exactly [anchor, R1];
- the ACLs, headers and `security_invoker=true` are checked, and any difference RAISEs.

## App — the Maps address reads `path` (ruling item 3)

- `src/features/ad-page/maps-links.ts`: new `PathedPlace` type and `mapsPathQuery(places)`. It gives the places' shared ancestry, nearest first. It gives `""` when there is no place, or when any place has no path.
- `src/features/ad-page/public-listing.ts`: `placeList` entries carry `path` (`{ id, nameEn }`, country first) when the document sends one.
- `src/features/posting/preview/listing-detail.tsx`:
  - `placeList` is typed `PathedPlace`;
  - the query is `mapsPathQuery(placeList) || mapsPlaceQuery(nodes, coverage) || places.join(", ")`;
  - so the ad page no longer waits for the country tree, and the seller's and staff's views (no `placeList`) keep the tree.
- Tests added: GML-4 (one place, two sharing a city, two sharing only the country), GML-5 (no place, no path, mixed), and AV-10 (the path travels into the view).
- Checks: `vitest run src/features/ad-page src/features/posting/preview` 20 files / 137 tests passed. eslint: 0 errors. The 2 warnings in `listing-detail.tsx` (:150, :333) are on lines this change does not touch. prettier clean. Build log: build OK.

## Other

- Linter: 233 findings from before this change, none from it.
- Open: M4–M7 follow on "continue". The supervisor applies this file on ethio-staging (the unique index needs no duplicate anchors there).
