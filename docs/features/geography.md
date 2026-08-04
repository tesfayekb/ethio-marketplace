# Geography (locations tree)

Phase 2, feature P2-a. Schema + seed only — no UI, no `src/` code. Later Phase 2
features (posting flow, "add my city", feed) consume this table.

## The tree model

`public.locations` is ONE canonical, self-referencing tree:

- `level` ∈ `country` | `region` | `city`
- `parent_id` references `public.locations(id)`; NULL for country rows only
  (`CHECK ((level='country') = (parent_id IS NULL))`)
- `country_code` references `public.countries(code)` on every row, so any node
  answers "which country?" without walking to the root

| Column                  | Notes                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| id                      | uuid PK — listings FK this, regardless of activation state         |
| parent_id               | self-FK; NULL at country level                                     |
| level                   | country / region / city                                            |
| country_code            | char(2) → `countries.code`                                         |
| name_en / name_am       | display names (see Names, below)                                   |
| slug                    | unique within a parent; root slugs globally unique (partial index) |
| center_lat / center_lng | center point for maps + nearest-first (REQ-005); NULL at country   |
| is_active               | visibility gate — see RLS                                          |
| created_at / updated_at | timestamptz (UTC); `updated_at` maintained by trigger              |

Uniqueness: `UNIQUE (parent_id, slug)` plus a partial unique index on `(slug)
WHERE parent_id IS NULL`, because Postgres does not constrain NULL parents in a
plain composite unique.

`country_code` ancestry consistency (a child must carry its parent's country) is
enforced this phase by **seed discipline** — every seeded child derives its
`country_code` from its parent row. A trigger is deferred until admin writes
exist; today no role holds INSERT/UPDATE on this table at all.

## RLS posture — active-only visibility

Mirrors `public.countries` exactly, with one tightening:

- **Read:** `locations_public_read` FOR SELECT TO `anon, authenticated`
  USING `(is_active = true)`. Inactive rows are invisible through the Data API.
- **Write:** no INSERT/UPDATE/DELETE policy and no write grants — admin writes go
  through the service role only (deny-by-default).
- `GRANT SELECT ON public.locations TO anon, authenticated;`

Indexes: partial `(is_active) WHERE is_active` (the apex `supported_regions`
pattern), plus `(parent_id)` for tree traversal and `(country_code)`.

## Shared reference data — no partition seam

Ruling (operator, frozen): `locations` is **globally shared reference data with no
partition column**, like `countries`. Personal-data tables carry
`home_country_code` (Rule E3); this is a lookup, not personal data. A diaspora user
in the US browsing Ethiopia must be able to read Ethiopia's locations — partitioning
this table would break exactly the cross-border read the product is built for.

## Names

`name_en` + `name_am` columns, mirroring the `countries` pattern. There is **no
translations table** — i18n today is static locale files under `src/i18n/locales`,
and user-data names cannot live there. When the admin translation dashboard is
built, these names migrate into it (Q-P2-2, D-015). `name_am` is filled for
Ethiopian places and left NULL for US cities rather than guessed.

## Coordinates

`center_lat` / `center_lng` are the location's center point, for map display and
the nearest-first ordering in the geo-scoped feed (REQ-005). Populated for cities;
NULL at country level, where a center point is meaningless for ranking.

## Shallow seed (launch posture)

Active markets only, ET + US: country rows, major regions, and a handful of seed
cities per region — enough to post against, deliberately NOT comprehensive. The
comprehensive world city list is an **admin-side picking source (a future static
asset), explicitly not a DB table**.

Seeded: 2 countries, 12 regions, 18 cities.

- **Ethiopia** (`ethiopia`, ኢትዮጵያ) — regions: Addis Ababa, Oromia, Amhara, Tigray,
  Dire Dawa, Sidama. Cities: Addis Ababa; Adama, Bishoftu, Jimma (Oromia);
  Bahir Dar, Gondar (Amhara); Mekelle (Tigray); Dire Dawa; Hawassa (Sidama).
- **United States** (`united-states`) — states: California, New York, Texas,
  Minnesota, Maryland, Washington. Cities: Los Angeles, San Jose; New York City;
  Dallas, Houston; Minneapolis, Saint Paul; Silver Spring; Seattle.

## Seams (named, not built here)

- **"Add my city" post-flow path** — a later feature lets a poster submit a missing
  city; it inserts an `is_active = false` row for admin review, invisible to
  everyone under the read policy until approved. This is why a shallow seed is safe:
  a missing city never blocks a post.
- **Listings** FK `locations.id`, and may reference a location regardless of its
  activation state (an existing listing must not break when a location is
  deactivated).
- **Screening gateway** (REQ-021) lands at P2-d; geography writes are admin-side and
  outside it.
- **Admin activation UI** — flipping `is_active` gates location availability
  app-wide, same as `countries.is_active`.

## Related

- `docs/features/countries-reference.md` — the root reference table this FKs.
- `docs/governance/migrations.md` — append-only migration law.
