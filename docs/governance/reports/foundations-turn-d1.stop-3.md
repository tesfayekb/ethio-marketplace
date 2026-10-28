# Foundations turn D1 — stop 3: M3 (INC-949) applied on ethio-prod

- App shape first (ruling 4): `src/features/ad-page/public-listing.ts` gains an optional `path` on each `places.list` entry: `{ id, name_en, name_am, level, slug }[]`, country first.
  - The ad document is a TypeScript type, not a `.strict()` shape. `rg map_visible src` finds no zod shape for it, so the new key could not have been refused before or after M3.
  - The Maps address does not read `path` yet: this stop lands the shape only, as ruled. The reader stays on `mapsPlaceQuery(nodes, view.coverage)` (`listing-detail.tsx:416`), which is the step left open.
  - Checks: eslint clean, prettier clean, `public-listing.test.ts` 10/10.
- File: `supabase/migrations/20261028225001_e419d062-9dd9-4a04-83aa-e7948c69b23d.sql` (the final, patched text).
- Mark: `20261029020000` (G39: 22:48 UTC → 23:00 + 1 h = 00:00, already taken by M1 and M2, so the next free hour). Read back on ethio-prod → `20261029020000`.
- Definition read-back (md5 of `pg_get_functiondef`, each equal to the scratch text — the live body read once at 22:47 UTC with only the named hunk):
  - `get_location_tree`: `2e091d3ee8917e6043433bb6e0d34859`. Its WHERE is reduced to `l.country_code = upper(p_country_code) AND public.place_is_shown(l.id)`.
  - `public_listing_json`: `cea4b59bcf168c8c3859a19e8d755b01`. The places select filters both `list` and `coverage` and adds `path`.
  - `place_is_shown`: `0d01522e76814b9a2f013867d1c999ee`. It is new: sql, STABLE, INVOKER, search_path public, ACL `{postgres=X/postgres,service_role=X/postgres}`.
- Headers and ACLs are unchanged on both redeclared doors (tree: anon, authenticated, service_role; listing JSON: service_role). The proof RAISEs on a difference.
- Indexes: the existing `locations_pkey`, `countries_pkey` and `locations_country_idx`. None was added.
- Ruling 3, `v_coverage`: it is drawn on a public screen, so it is filtered too.
  - `adPageView` passes `doc.places.coverage` as `coverage` (`public-listing.ts:140`).
  - `listing-detail.tsx:291–296` falls back to it for the place lines when `placeList` is absent.
  - `listing-detail.tsx:416` builds the Maps query from it.
  - The other `rg` hits are posting/admin/my-listings code and do not read the public document.
  - So `places.coverage` now carries the same `place_is_shown` filter as `places.list`.
- Proofs (the sentinel `d1-m3-proof-ok` was reached; scratch market `XZ`, 0 rows left):
  - (a) the tree has C1 and neither C2 (switched off) nor C3 (its region is off);
  - (b) the ad's list and coverage are `[C1]` only;
  - (c) C1's path is exactly [anchor, R1];
  - (d) `place_is_shown` is true for C1 and false for C2 and C3.
- Attempts before the clean apply (each failed whole; read back: no function, no mark):
  1. `missingCoordinates`: `locations_ancestry_guard` requires a city's centre, and refuses an active city under an inactive region. The proof now gives coordinates and switches R2 off after C3 is placed.
  2. Proof (c) RAISEd because the path held two country rows: a new `countries` row brings its own anchor location, and the proof had added a second one. The proof now uses the one auto-created anchor and RAISEs unless there is exactly one. (a), (b) and (d) had already passed on that attempt.
  - The path's `a.level = 'country' AND a.country_code = …` assumes one anchor per market. This is reported, not changed: is that a unique rule in the schema? I did not read for one.
- Linter: 233 pre-existing findings, none from this migration.
- Open: M4–M7 follow on "continue". The supervisor applies this file on ethio-staging. The Maps address reading `path` is still open.
