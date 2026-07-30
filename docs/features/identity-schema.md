# Identity schema

Status: applied and proven on ethio-prod (2026-07-30).

Migrations:

- `supabase/migrations/20260730015333_87dbf472-b8ca-4e8d-b9d9-d48fd13278e8.sql` — tables, RLS,
  grants, trigger, `confirm_home_country`.
- `supabase/migrations/20260730021240_a0dbaf49-19a0-4761-a3f3-2a1f85117528.sql` — function
  hardening (deny-by-default EXECUTE).

Deny-proofs: `scripts/deny-tests/phase1-identity.md` (D1–D7, all PASS).

## The two tables

### `public.user_directory` — system-owned identity record

One row per account, written only by the signup trigger. Columns: `user_id` (PK),
`home_country_code` (FK → `countries.code`), `country_source`, `handle`, `account_status`,
`created_at` (timestamptz, UTC).

Access: RLS enabled. Single policy `directory_owner_read` — SELECT to `authenticated` where
`auth.uid() = user_id`. No INSERT/UPDATE/DELETE policy and no such grant: the table is
system-owned. All mutation happens through `SECURITY DEFINER` functions.

### `public.profiles` — user-editable presentation record

One row per account, created by the signup trigger. Columns: `user_id` (PK),
`home_country_code` (FK → `countries.code`), `country_source`, `display_name`, `avatar_url`,
`preferred_language`, `viewing_location`, `notification_prefs`, `contact_prefs`, `created_at`,
`updated_at` (all timestamps timestamptz, UTC).

Access: RLS enabled. `profiles_owner_read` (SELECT) and `profiles_owner_update` (UPDATE), both
scoped to `auth.uid() = user_id`.

Both tables carry `home_country_code` per Knowledge E3.

## The column-grant mechanism

RLS decides _which rows_ a caller may touch. It does not decide _which columns_. Row-scoped
UPDATE alone would let a user rewrite their own `home_country_code` or `country_source` and
defeat the one-shot country-confirmation rule.

So the writable surface is defined by a column-level grant instead of a table-level one.
`authenticated` holds UPDATE on exactly:

```
display_name, avatar_url, preferred_language, viewing_location,
notification_prefs, contact_prefs, updated_at
```

Live ACL (`pg_attribute.attacl`) confirms `{authenticated=w/postgres}` on those seven columns and
nothing else; the table ACL grants `authenticated` only `r` (SELECT). An UPDATE that names any
other column fails with `42501 permission denied for table profiles` _before_ RLS runs — proven
by D4. `user_directory` has no column ACLs at all, so every UPDATE is refused (D6).

Two layers, two jobs: grants gate the columns, RLS gates the rows.

## The two SECURITY DEFINER functions

### `handle_new_user() → trigger`

Fires on `auth.users` insert. Derives a display name (`full_name` → `name` → email local part →
`'user'`) and a home country from `raw_user_meta_data.country_guess`, falling back to `'US'` when
the code is absent or not present in `public.countries`. Inserts one `user_directory` row and one
`profiles` row. `SECURITY DEFINER` with `search_path = public`.

### `confirm_home_country(p_country char) → void`

The user's one-shot correction of the IP-guessed country. Raises on no session, raises on an
unknown country code, then updates `user_directory` **only where `country_source = 'ip_guess'`**
and raises `country already confirmed` if that matched nothing; on success it mirrors the value
into `profiles` and sets `country_source = 'user_confirmed'`. `SECURITY DEFINER` with
`search_path = public` — it must write `user_directory`, which no client role can write directly.

### Hardening rationale

Postgres grants `EXECUTE` to `PUBLIC` on every new function by default. For a `SECURITY DEFINER`
function that is the opposite of what we want: it means anyone reachable through PostgREST —
including anonymous visitors — can invoke privileged code. The hardening migration revokes those
defaults:

```sql
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.confirm_home_country(char) FROM PUBLIC, anon;
```

`handle_new_user` is now callable by no client role at all — it only ever runs as the trigger
owner, which is correct; a client calling it directly would be forging identity rows.
`confirm_home_country` keeps its explicit grant to `authenticated` and loses `anon`. Resulting
ACLs: `handle_new_user {postgres=X}`, `confirm_home_country {postgres=X,authenticated=X}`.

The function's internal `auth.uid() IS NULL` guard stays as defence in depth, but the privilege
layer now refuses anonymous callers first (D7).

## DEC-008 extraction seam

Every personal-data table carries `home_country_code` so a country's data can be located in one
predicate, with no joins and no inference:

```sql
SELECT * FROM public.user_directory WHERE home_country_code = 'ET';
SELECT * FROM public.profiles       WHERE home_country_code = 'ET';
```

Any future personal-data table must keep this column and stay answerable to the same query shape.

## Named deferral

`confirm_home_country` has no UI moment yet. There is deliberately no country-confirmation prompt,
banner, or settings control in the app: asking a visitor to confirm their country before they have
any reason to care is friction without payoff. **The UI for `confirm_home_country` ships with the
first contribution surface** (the first screen where a user posts or contacts), where the country
actually determines what happens. Until then the function exists, is proven, and is unreachable
from the UI by design — not by oversight.
