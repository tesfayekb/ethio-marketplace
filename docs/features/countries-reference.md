# Countries Reference

## Purpose
Root of the geography hierarchy (REQ-005 / REQ-012). Provides the canonical ISO-3166-1 alpha-2 country codes every other location-aware entity references (profiles' `home_country_code`, regions/cities tree, banned-country lists, geo-scoped feeds).

## Table
`public.countries`

| Column      | Type         | Notes                                              |
|-------------|--------------|----------------------------------------------------|
| code        | char(2) PK   | Uppercase ISO-3166-1 alpha-2 (CHECK enforces case) |
| name_en     | text         | English display name                               |
| is_active   | boolean      | Gate for country availability in the product       |
| created_at  | timestamptz  | UTC                                                |

## RLS Posture
- **Read:** public — `anon` and `authenticated` may SELECT all rows.
- **Write:** none — no INSERT/UPDATE/DELETE policy exists, so writes are deliberately impossible through the Data API until the admin/RBAC machinery lands (deny-by-default). Seeded rows are inserted by migration only.

## Seeds (migration 0001)
Active: ET (Ethiopia), US (United States).
Inactive: CA (Canada), GB (United Kingdom), DE (Germany), KE (Kenya).

## Consumers (to come)
- `profiles.home_country_code` — every personal-data table (Rule E3).
- Geography tree (regions → cities) foreign-keyed to `countries.code`.
- Banned-countries / allow-lists governing signup and feed scope.
- Country toggles surfaced to admins once RBAC exists — flipping `is_active` will gate country availability app-wide.
