# Geography (locations tree)

Phase 2 feature P2-a laid the schema and the seed. **L1a** (Locations era, spec
`docs/governance/locations-era-spec.md` §3–§4, ratified 2026-09-15) widened it to
four levels, made the ancestry machine-enforced, gave countries a profile, and
replaced the broad `locations:manage` / `countries:manage` rights with granular
actions plus ten admin doors. There is still **no console UI, no import family
and no public tree route** — those are L2, L1b and L1c.

## The tree model

`public.locations` is ONE canonical, self-referencing tree:

- `level` ∈ `country` | `region` | `city` | `sub_city`
- `parent_id` references `public.locations(id)`; NULL for country rows only
  (`CHECK ((level='country') = (parent_id IS NULL))`)
- `country_code` references `public.countries(code)` on every row, so any node
  answers "which country?" without walking to the root

| Column                  | Notes                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| id                      | uuid PK — listings FK this, regardless of activation state                   |
| parent_id               | self-FK; NULL at country level                                               |
| level                   | country / region / city / sub_city (`locations_level_check`)                 |
| country_code            | char(2) → `countries.code`; a child never carries another country            |
| region_id               | ANCESTOR column — the row's region; NULL on country and region rows          |
| city_id                 | ANCESTOR column — the row's city; set on sub-cities only                     |
| name_en / name_am       | display names (see Names, below)                                             |
| slug                    | unique within a parent; root slugs globally unique (partial index)           |
| iso_3166_2              | region code (regions only); unique where not null                            |
| aliases                 | text[] — other spellings a search must match; defaults `{}`                  |
| display_order           | integer, default 0 — sibling order, written by the reorder door              |
| source                  | `seed` \| `admin` \| `import` — where the row came from                      |
| center_lat / center_lng | centre point for maps and nearest-first (REQ-005); REQUIRED on city/sub_city |
| is_active               | visibility gate — see RLS                                                    |
| created_at / updated_at | timestamptz (UTC); `updated_at` maintained by trigger                        |

Uniqueness: `UNIQUE (parent_id, slug)` plus a partial unique index on `(slug)
WHERE parent_id IS NULL`, because Postgres does not constrain NULL parents in a
plain composite unique.

**Ancestor columns hold ANCESTORS only, never self.** A region's `region_id` is
NULL. They are written by the trigger below and are never a caller's input — the
guard overwrites whatever was sent.

### Coordinates law

`locations_city_needs_center` — `level NOT IN ('city','sub_city') OR (center_lat
IS NOT NULL AND center_lng IS NOT NULL)`. Regions and countries MAY carry a
centre; cities and sub-cities MUST, because the feed's nearest-first ordering
(DEC-065) cannot rank a place with no point. The L1a migration proved every
existing city row already carried one before adding the constraint; no data was
touched.

## The ancestry triggers

`locations_ancestry_guard` (BEFORE INSERT OR UPDATE, per row, SECURITY DEFINER)
refuses and then fills. Each refusal raises exactly one message id, so the
console can translate it:

| Refusal              | When                                                 |
| -------------------- | ---------------------------------------------------- |
| `rootMustBeCountry`  | a NULL parent that is not a country, or the reverse  |
| `parentMissing`      | `parent_id` names no row                             |
| `levelMismatch`      | the level is not exactly one step below the parent's |
| `crossCountry`       | the row's `country_code` differs from its parent's   |
| `badSlug`            | the slug is not `^[a-z0-9]+(-[a-z0-9]+)*$`           |
| `parentInactive`     | an ACTIVE row written under an inactive parent       |
| `missingCoordinates` | a city or sub-city with no centre                    |

Then it fills, ignoring the caller: country/region → both ancestor columns NULL;
city → `region_id = parent.id`, `city_id = NULL`; sub-city → `region_id =
parent.region_id`, `city_id = parent.id`.

`locations_ancestry_cascade` (AFTER UPDATE, per row) touches the children
(`SET parent_id = parent_id`) when the parent's own parent, country, ancestor
columns or activation changed, so each child re-runs the guard and cascades in
turn; the trigger's WHEN clause ends the recursion (depth ≤ 3). **Deactivating a
parent does not touch its children**: the path rule already hides them, and
`parentInactive` fires only for a row being written active under an inactive
parent — so the cascade skips the touch when the row just became inactive.

Both trigger functions have EXECUTE revoked from PUBLIC, `anon` and
`authenticated`: trigger functions are never callable directly.

## Distance

`public.geo_distance_km(lat1, lng1, lat2, lng2)` — haversine on radius 6371.0088
km, `LANGUAGE sql IMMUTABLE PARALLEL SAFE`, SECURITY INVOKER, `search_path`
pinned to `pg_catalog`, EXECUTE granted to `anon`, `authenticated` and
`service_role`. It is pure arithmetic: no table, no policy, no privilege. The
feed's nearest-first ladder (DEC-065) is built on it at U7.

## RLS posture

Locations:

- **Read:** `locations_public_read` FOR SELECT TO `anon, authenticated`
  USING `(is_active = true)`. Inactive rows are invisible through the Data API.
- **Write:** three granular policies TO `authenticated` —
  `locations_admin_insert` (`locations:create`), `locations_admin_update`
  (`locations:update`), `locations_admin_delete` (`locations:restructure`).
- `GRANT SELECT ON public.locations TO anon, authenticated;` plus the existing
  INSERT/UPDATE/DELETE grants, which the policies above gate.

Countries are **RPC-ONLY**: `countries_public_read` and its SELECT grant are the
whole client surface; INSERT/UPDATE/DELETE are revoked from `authenticated` and
there is no write policy. A table-level `update` right cannot tell a currency
edit from opening a market, so the step-up on `countries:activate` is only real
when every write goes through the definer doors.

Indexes: partial `(is_active) WHERE is_active`, `(parent_id)`, `(country_code)`,
plus `locations_region_idx (region_id)`, `locations_city_idx (city_id)` and the
partial unique `locations_iso_3166_2_unique`.

## Permissions

`locations:manage` and `countries:manage` are **retired** — the permission rows
remain, granted to no role, and `has_permission()` reads a `manage` grant as
every action, so removing the grants is what removes the broad power. Every role
that held them inherited the granular actions in the same migration.

| Resource    | Actions                                                                |
| ----------- | ---------------------------------------------------------------------- |
| `locations` | view · create · update · **restructure** · **import** (bold = step-up) |
| `countries` | view · update · **activate**                                           |
| `coverage`  | view · **update** (new resource, "Advertising coverage")               |

The admin shell's Locations section now renders on `locations:view`.

## Admin doors (the contract L2 copies by name — E7)

Every one is plpgsql SECURITY DEFINER with `search_path` pinned, follows the F5
order (permission → step-up → scope → capture old → mutate → audit), refuses
with `permission denied` when the right is missing, and has EXECUTE revoked from
PUBLIC/`anon` and granted to `authenticated`.

| Door                                                                                  | Right                        | Refusals                                                                                                            | Audit                                   |
| ------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `admin_list_locations(country, search, level, active)`                                | locations:view               | —                                                                                                                   | none (read)                             |
| `admin_upsert_location(id, parent, level, name, slug, iso, aliases, order, lat, lng)` | create / update              | `badLevel`, `nameRequired`, `unknownCountry`, `parentMissing`, `isoOnRegionsOnly`, `useMoveDoor`, `locationMissing` | `location.create` / `location.update`   |
| `admin_set_location_active(id, active)`                                               | locations:update             | `locationMissing`; the trigger's `parentInactive` surfaces unchanged                                                | `location.activate` / `location.retire` |
| `admin_move_location(id, new_parent)`                                                 | restructure (step-up)        | `cannotMoveCountry`, `parentMissing`, `crossCountry`, plus the trigger's `levelMismatch`                            | `location.move`                         |
| `admin_reorder_locations(parent, ids)`                                                | locations:update             | `orderCountriesInProfile`, `notAChild`                                                                              | `location.reorder`                      |
| `admin_delete_location(id, slug)`                                                     | restructure (step-up)        | `slugMismatch`, `retireInstead:hasChildren` / `:hasListings` / `:hasCoverage` / `:hasProfileDefaults`               | `location.delete`                       |
| `admin_upsert_country(code, name, unit_system, currency, order)`                      | countries:update             | `badCountryCode`, `badUnitSystem`, `badCurrency`, `nameRequired`                                                    | `country.upsert`                        |
| `admin_set_country_active(code, active, force_hide)`                                  | countries:activate (step-up) | `badCountryCode`, `unknownCountry`, `scopedRolesExist`                                                              | `country.open` / `country.close`        |
| `admin_set_country_root_order(code, category_ids)`                                    | countries:update             | `badCountryCode`, `unknownCountry`, `duplicateCategory`, `notARoot`                                                 | `country.rootOrder`                     |
| `admin_set_coverage_plan(plan, cities, regions, countries, everywhere)`               | coverage:update (step-up)    | `badPlan`, `belowMinimum`                                                                                           | `coverage.plan.update`                  |

`public.location_slug_candidate(name, parent_id)` derives a slug the same way
`category_slug_candidate` does (lowercase, non-`[a-z0-9]` runs → `-`, trimmed),
suffixed `-2`, `-3` … until unique among siblings.

Opening a market sets `countries.is_active` and ensures an active country anchor
row in the tree; closing it hides the anchor (the path rule hides the subtree,
so child rows are never rewritten) and refuses while a role is scoped to that
country unless the caller forces it.

The positive paths of these doors are proven at L2 through the route (E2E LT-\*):
a migration cannot hold a permitted, step-up-fresh identity, and faking one would
prove nothing. The L1a proofs cover deny, permissions, policies and ACLs.

## Country profile and per-country order

`public.countries` gains `unit_system` (`metric` | `imperial`, default metric),
`currency_code` (char(3), `^[A-Z]{3}$`), `display_order` and `updated_at` with an
update trigger (DEC-055 first landing). Canonical storage of measurements and the
viewer's unit toggle stay at U6-C / U7.

`public.country_root_order (country_code, category_id, position)` holds the
per-country category rail order. RLS enabled with a single deny-all policy for
`authenticated` and no client grants: reads come through the L1c tree route,
writes through `admin_set_country_root_order`. An empty array deletes the
country's rows, which means "use the global order".

## Coverage plans (DEC-064)

`public.coverage_plans (plan, max_cities, max_regions, max_countries,
allow_everywhere, updated_by, updated_at)` — admin-set limits per advertisement
type. Seeded `free` = 1 city / 1 region / 1 country / worldwide off. Readable by
everyone (`coverage_plans_public_read`), written only through
`admin_set_coverage_plan`. **Posting enforces the plan server-side from U6-A**,
which is also where A2's one-country trigger is retired by named DEC. Every tier
is free in v1; the table is the pay-ready seam.

## Shared reference data — no partition seam

Ruling (operator, frozen): `locations` is **globally shared reference data with no
partition column**, like `countries`. Personal-data tables carry
`home_country_code` (Rule E3); this is a lookup, not personal data. A diaspora user
in the US browsing Ethiopia must be able to read Ethiopia's locations — partitioning
this table would break exactly the cross-border read the product is built for.

## Names

`name_en` + `name_am` columns, mirroring the `countries` pattern, with Amharic
approved through the translation door (`entity_translations`, entity type
`location`). `aliases` is a search aid, not a display name: other spellings and
old names a curator wants found. Amharic totality on every active row is an
era-gate item (L3).

## Coordinates

`center_lat` / `center_lng` are the location's centre point, for map display and
the nearest-first ordering in the geo-scoped feed (REQ-005). Required on cities
and sub-cities (coordinates law, above); optional above them.

## Shallow seed (launch posture)

Active markets only, ET + US: country rows, major regions, and a handful of seed
cities per region — enough to post against, deliberately NOT comprehensive. The
comprehensive world city list is an **admin-side picking source (the L3 curator
files), explicitly not a DB table**.

Seeded at P2-a and marked `source = 'seed'` by L1a: 2 countries, 12 regions,
18 cities.

- **Ethiopia** (`ethiopia`, ኢትዮጵያ) — regions: Addis Ababa, Oromia, Amhara, Tigray,
  Dire Dawa, Sidama. Cities: Addis Ababa; Adama, Bishoftu, Jimma (Oromia);
  Bahir Dar, Gondar (Amhara); Mekelle (Tigray); Dire Dawa; Hawassa (Sidama).
- **United States** (`united-states`) — states: California, New York, Texas,
  Minnesota, Maryland, Washington. Cities: Los Angeles, San Jose; New York City;
  Dallas, Houston; Minneapolis, Saint Paul; Silver Spring; Seattle.

## Seams (named, not built here)

- **Import family** — L1b: the countries and locations import/export family,
  previewed and undoable like the catalog importers.
- **Public per-country tree route** — L1c, ETag-cached.
- **Console** — L2: the Tree · Countries · Coverage · Import/Export tabs on the
  doors above, with E2E (LT-\*) and the DEC-062 scratch-location reaper delta.
- **Curator files** — L3: countries, Ethiopia-deep, diaspora; Amharic approval.
- **Guess** — L4a/L4b: the edge's request geo facts mapped to the curated tree
  (DEC-063), never persisted, plus the shell picker and the saved-area cookie.
- **"Add my city" post-flow path** — a later feature lets a poster submit a missing
  city; it inserts an `is_active = false` row for admin review, invisible to
  everyone under the read policy until approved. This is why a shallow seed is safe:
  a missing city never blocks a post.
- **Listings** FK `locations.id`, and may reference a location regardless of its
  activation state (an existing listing must not break when a location is
  deactivated). Coverage rows live in `listing_locations` (DEC-064).
- **Screening gateway** (REQ-021) lands at P2-d; geography writes are admin-side and
  outside it.

## Import family

Geography is curated as two files behind the one import gate
(`docs/features/imports.md`): `POST /api/admin/locations/import`
(preview · commit · undo) and `GET /api/admin/locations/export`. Either file may
be sent alone; both empty is the only refusal the route makes on its own. A run
may be confined to one country with a two-letter `scope`, or left open to all.

**countries** — `country_code` (identity) · `name_en` · `is_active` ·
`unit_system` · `currency_code` · `display_order` · `root_order` (the pipe list
of root category slugs, in order) · `action`.

**locations** — `location_path` (read-only) · `location_key` (identity) ·
`name_en` · `name_am` · `iso_3166_2` · `aliases` (pipe list) · `display_order` ·
`center_lat` · `center_lng` · `is_active` · `level` (read-only) ·
`country_code` (read-only) · `source` (read-only) · `listing_count`
(read-only) · `action`.

The identity is the SLASH KEY of slugs — `ethiopia/oromia/adama` — and the
level is derived from its depth, which is why `level` and `country_code` are
reported and never applied. Every read-only column carries a
`" (read-only)"` suffix in the exported header, so the file states what the
importer will ignore. Column order in both files is the export contract of
`country_export_row` / `loc_export_row`.

**Actions.** A location row takes `upsert`, `activate`, `retire` or `delete`; a
country row takes `upsert`, `open` or `close`. An action row still applies its
other cells.

**Refusals** are named by `loc_import_plan`, which stays the only authority on
meaning: `badKey`, `unknownParent`, `missingCoordinates`, `isoOnRegionsOnly`,
`statusNeedsAction` (naming both the stored and the requested state),
`deleteBlocked` (naming the child that blocks it), `parentInactive`,
`badCountryCode`, `badCurrency`, `notARoot`, `countryRowByActivation` and
`outOfScope`.

**Undo returns deleted rows parents-first (INC-201)** — a taken-back run
re-inserts the shallowest deleted place first, so a parent exists before its
children come back; every other group is still undone deepest-first.

The admin surface over all of this — the Tree and Transfer tabs, every verb and
its door, and how each refusal renders — is
[`locations-console.md`](./locations-console.md) (L2a).

## Public read

The tree a visitor sees is read through three anon-executable functions
(migration `efbee3c4`), and no permission check exists anywhere on this path —
authority lives entirely in the read's own visibility rule:

- `get_location_tree(country_code)` — the rows of ONE open market. A row is
  returned only when the market is open, the country anchor is active, and the
  row AND every ancestor are active; ancestry is read from the `region_id` /
  `city_id` columns, never a recursive walk. The anchor row comes first, then
  region, city, sub-city, each level ordered by `display_order` then name.
- `get_location_tree_version(country_code)` — one md5 over the country's rows
  (newest change plus row count) and its market row. Any edit, activation, move
  or market switch changes it; nothing else does.
- `get_open_countries()` — the open markets and each one's anchor slug.

**The route.** `GET /api/locations/:country` serves that tree behind exactly the
pattern the translation bundle uses: read the version, keep one in-process entry
per country for 15 seconds, derive a strong `ETag` from the version, and answer
a matching `If-None-Match` with `304`. Inside the freshness window a request
costs zero database round trips; after it, one small version read, and only a
CHANGED version rebuilds the body. Responses carry
`public, max-age=300, stale-while-revalidate=3600`.

A code that is not two letters is `400 badCountry`. A closed or unknown market
is `404 closedOrUnknownMarket` with `no-store` — **never an empty `200`**, and
never cached, so opening a market is visible on the next request.

The payload carries exactly the eleven read fields (`id`, `parent_id`, `level`,
`slug`, `iso_3166_2`, `region_id`, `city_id`, `display_order`, `center_lat`,
`center_lng`, `name_en`). Translated names are NOT served here — they come from
the entity overlay, keyed by id.

`e2e/locations-tree.spec.ts` (LR-1..4) proves the anchor-first order, the
conditional request, both refusals, the ancestor rule against a retired scratch
region, and that no field outside the eleven ever appears.

## Geo guess (L4a spike)

`GET /api/geo` (`src/routes/api/geo.ts`) answers
`{ country, regionCode, city, source }` with `Cache-Control: no-store`. It reads
the request and NOTHING else: no database, no cookie, no storage, no listing.

THE JUDGE (DEC-063, pre-committed — this order and nothing else):

| Order | Source                                                   | Answer                                       |
| ----- | -------------------------------------------------------- | -------------------------------------------- |
| 1     | the Cloudflare `cf` object, when it carries a `country`   | country, `regionCode`/`city` when present    |
| 2     | else the `cf-ipcountry` header, exactly two letters       | the country, upper-cased; region and city null |
| 3     | else nothing                                             | all three null, `source: "none"`             |

There is no other fallback, no default market and no `x-forwarded-*` parsing.
A7 census: no export of `@tanstack/react-start/server` hands out the nitro
request event, so branch 1 reads the non-standard `cf` property workerd hangs on
the handler's own `Request` (the Cloudflare preset, `vite.config.ts`). In the
node runtime that property is absent and the judge falls through.

The guess must never take a page down (F4/I4): every throw logs
`[ssr-error] /api/geo <message>` and still answers `{ source: "none" }` with
nulls. Values are echoed as strings trimmed to 64 characters, never as HTML.

`e2e/geo.spec.ts` — GE-1 the node runtime answers `none` with three nulls and
`no-store` · GE-2 a `cf-ipcountry` header is the second source (an honest seam:
production's edge overwrites the header) · GE-3 `e`, `ETH` and `<b>` are no
guess at all.

**Verdict pending the operator's published-URL read** — nothing consumes this
route yet; the picker and provider are L4b, after the verdict.

## Related

- `docs/features/locations-console.md` — the Places roster over this tree.
- `docs/features/countries-console.md` — the markets register and the
  open/close, profile and rail-order verbs.
- `docs/governance/locations-era-spec.md` — the ratified era spec (§3–§4 land here).
- `docs/features/countries-reference.md` — the root reference table this FKs.
- `docs/governance/migrations.md` — append-only migration law.
