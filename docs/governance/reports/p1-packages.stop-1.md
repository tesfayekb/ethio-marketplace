MIGRATION — p1-packages part A: the plan's dials, the packages and their prices (M1a, M1b, M1c)
— second round after ruling 2 (INC-1035, S512)
DONE: STEP 0 (the task, the spec, the rulings saved); part A (three migration files written, not
applied; the allowlist lines; the pool-reset map); ruling 2's two fixes
LEFT: parts B (Admin › Plans), C (Admin › Packages, CF-PRICE-1, CF-PERM-1), D (W4), E (docs, THE
CHECKS, THE BROWSER CHECK, THE SELF-REVIEW, THE REPORT); the Amharic strings commit after the
ruling this stop asks for (ruling 1, answer 12)
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `94249bf88fcee970622ba118e3961f0422b5cd66` (short `94249bf`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-02T07:45:18Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41406025561
FILES:
docs/governance/briefs/p1-packages.md
docs/governance/briefs/p1-packages.ruling-1.md
docs/governance/plans-packages-spec-v1.md
e2e/helpers/pool-reset-map.ts
roadmap.md
scripts/acceptance-doors-allowlist.txt
scripts/public-surface-allowlist.txt
supabase/migrations/20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql
supabase/migrations/20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql
supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql

## Round 2 (ruling 2 on stop 1): the keys' pattern

The first round's three files failed their staging apply cleanly (the supervisor's read-back:
nothing landed). Two causes, both fixed in their own commits, nothing else changed:
- M1a proof (c) — `badPlan` from the scratch plan `e2e_mig_p_…`: the live plan pattern
  `^[a-z_]{2,32}$` (the table CHECK of `20260915162131…sql:300` and the door's rule) takes no
  digit. The scratch plan is now `emig_plan_<8 letters>` (letters and underscores only). The
  real-row guard's `e2e-mig-` namespace is for the identity and reference tables
  (`scripts/check-migrations.sh:663–686`: `auth.users`, `user_roles`, `profiles`,
  `user_directory`, `locations`, `categories`, `attributes`); `coverage_plans` is not among them,
  and every read of it is keyed by `v_plan`. Side effect worth naming: in round 1, proof (c)'s
  three CHECK probes would have been refused by the plan CHECK itself rather than by the CHECK
  under test; now each probe reaches its own CHECK. Commit `46171810` (INC-1035).
- M1b seeds — `listing_packages_key_check` on `featured_45`: the key pattern becomes
  `^[a-z][a-z0-9_]{1,31}$` (S512) in the table CHECK (M1b) and the save door's `bad key` rule
  (M1c); the seeds stand; the `bad key` probe now leads with a digit (`1_bad`), which only the
  new rule refuses. The scratch package key `e2e_mig_pk_<8 letters>` matches the new pattern
  (round 1's direct INSERT of it in M1b would have failed the old CHECK too). Commit `4735e811`.
  The EN hint and refusal texts (`admin.packages.field.keyHint`, `admin.packages.error.badKey`)
  and any pattern test come with part C's strings (no string file is touched before the screens).
- M1c had failed only on the missing table; nothing else changed there.
- The four-check scan gained its fifth check (answer 5; `/tmp/mig-scan.py`, outside the
  repository): every scratch key built as `'<prefix>' || translate(substr(gen_random_uuid()…))`
  is matched against every `~ '…'` pattern in the file plus the live coverage plan pattern (a
  note the reader judges by the column it is written to), and every string literal in an INSERT
  at the position of a column with a pattern CHECK is matched against that CHECK. Planted on the
  round-1 files it reports exactly staging's three failures (M1a `v_plan` vs the plan pattern;
  M1b `featured_45`, `premium_60` vs the old key CHECK) plus `v_pkg` vs the old CHECK; on the
  round-2 files it reports only `v_pkg` against the coverage plan pattern (a column `v_pkg` is
  never written to).

## Three files, not two (a departure from ruling 1, answer 13, under rule 30)

The ruling named two files and two marks. The second file, written whole, came to 47 810 bytes;
rule 30 ("a very large migration (about 25 KB or more) is split by concern into ordered parts,
each with its own mark, proofs and stop") and the stop-14 standing rule in
`docs/features/ci-guards.md` bind, so it was split by concern before this stop: M1b keeps the
tables, the resolver and the resource; M1c holds the three staff doors. Every file written since
that ruling is 23.8 KB or under; M1c is 25 853 bytes, "about 25 KB" — the next cut would split one
concern (the three doors). The marks: M1a `20261102220000`, M1b `20261102230000` (as ruled), M1c
`20261103000000` (the next full hour, after every file stamp). One stop, three pairing lines.

## The files

- `supabase/migrations/20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql` — M1a, 19 969
  bytes, sha256 `c6405baa15d84f30d6363c79241b18f27178bf6032f586d01fac648cd1527074` (commit
  `46171810`; round 1 was 19 685 bytes, `e542414e…62a1`). Header `-- e2e-areas: admin-coverage,
  posting`. Mark `20261102220000`.
- `supabase/migrations/20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql` — M1b, 24 273
  bytes, sha256 `79e44a3fe5977c1be603ebb395ecbd42c35b2d0d3038124aeeefecf7b9fccc91` (commit
  `4735e811`; round 1 was 24 173 bytes, `7893ef35…9494`). Header `-- e2e-areas: admin-packages,
  admin-roles`. Mark `20261102230000`.
- `supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql` — M1c, 25 863
  bytes, sha256 `7551b59ad42ceee6636d113e51fc012100e52964de3b9a367345df6c20216bf1` (commit
  `4735e811`; round 1 was 25 853 bytes, `1b3957cb…5e3a`). Header `-- e2e-areas: admin-packages`.
  Mark `20261103000000`.
- The order is the stamp order: M1a → M1b → M1c; M1c's doors write M1b's tables and M1b's
  resource row answers their `has_permission`.
- `origin/dev` is still `94249bf8` (the base) at this stop; no file in scope moved.

## M1a — what it creates (D279, D280; ruling 1, answers 2, 6, 7)

- `public.coverage_plans` gains `default_days integer NOT NULL DEFAULT 30` (CHECK `> 0`),
  `max_active_ads integer NULL` (CHECK `IS NULL OR > 0`; NULL = unlimited) and `label_key text
  NULL` (CHECK `~ '^[a-z][a-z0-9_.]{1,79}$'`), each with a COMMENT; the free plan is backfilled
  30 / NULL / `plan.free`; `GRANT SELECT (default_days, max_active_ads, label_key) ON
  public.coverage_plans TO anon, authenticated` (the T14 column form; `updated_by` stays closed).
  The existing `coverage_plans | anon,authenticated` public-surface line covers the grant.
- `admin_set_coverage_plan`: `DROP FUNCTION public.admin_set_coverage_plan(text, integer, integer,
  integer, boolean, smallint)`; `CREATE FUNCTION … (p_plan text, p_max_cities integer,
  p_max_regions integer, p_max_countries integer, p_allow_everywhere boolean, p_max_photos
  smallint DEFAULT NULL, p_default_days integer DEFAULT NULL, p_max_active_ads integer DEFAULT
  NULL, p_ads_unlimited boolean DEFAULT false, p_label_key text DEFAULT NULL) RETURNS void` —
  plpgsql, VOLATILE, SECURITY DEFINER, `search_path = public`; `REVOKE ALL … FROM PUBLIC, anon`,
  `GRANT EXECUTE … TO authenticated, service_role` restated. The body is ethio-prod's live
  definition (answer 2: prosrc md5 `c45aa8a3edbc9b45cb4df01273bdaf3b`; checked here against
  `20261029015441…sql:198–247` with the leading newline — 2405 bytes, the same md5) plus eight
  insertions and nothing else: three declarations (`v_days`, `v_ads`, `v_label`); three refusals
  (`badDefaultDays` on `p_default_days < 1`, `badMaxActiveAds` on `p_max_active_ads < 1`,
  `badLabelKey` on a malformed key) beside `badMaxPhotos`; the three values (`v_days :=
  COALESCE(p_default_days, v_old.default_days, 30)`; `v_ads := CASE WHEN p_ads_unlimited THEN NULL
  ELSE COALESCE(p_max_active_ads, v_old.max_active_ads) END`; `v_label := COALESCE(p_label_key,
  v_old.label_key)`) the way `p_max_photos` is read (NULL = no change); the three columns in the
  INSERT, its VALUES and its ON CONFLICT set; the three in the audit row's `old` and `new`. The
  order inside is the live one (INC-951 3c): not authenticated → `coverage:update` → the second
  factor → the `staff_config` dial → the rules → the write.
- `seller_plan()`, `plan_caps()`, `validate_listing_draft` unchanged (answer 7; INC-1034 is the
  supervisor's, CF-PLAN-1 in P-3).

## M1a — the proof (one sentinel block, scratch rows only, rolled back whole)

- (a) header and grants: SECURITY DEFINER, VOLATILE, `{search_path=public}`; no PUBLIC grantee;
  anon cannot execute; authenticated and service_role can; the old signature is gone;
  `coverage:update` asks a second factor.
- (b) the stripped body: the live `prosrc` with the eight insertions removed (each by exact text)
  has md5 `c45aa8a3edbc9b45cb4df01273bdaf3b`.
- (c) the columns: anon and authenticated read the three, never `updated_by`; the CHECKs refuse
  0 days, 0 ads and `Bad Key` (SQLSTATE 23514, on a scratch plan row).
- (d) the free plan reads 30 / NULL / `plan.free`.
- (e) a scratch super admin (aal2 session, verified totp factor, totp amr) saves a scratch plan
  with every dial: the row and its audit row (`old` null, `new` with the three) hold them.
- (f) `badDefaultDays`, `badMaxActiveAds`, `badLabelKey` each refused, nothing written (the audit
  count and the row unchanged).
- (g) a call with the three absent changes nothing; `p_ads_unlimited` clears the quota; the audit
  row carries old and new.
- (h) the same super admin on an aal1 session → SQLSTATE `P0009`.
- Scratch rows: one `auth.users` (tag `e2e-mig-p1-m1a-<8 hex>`), its super_admin role row, a
  session, a factor, an amr claim, one `coverage_plans` row (`emig_plan_<8 letters>`, round 2). No
  real row read.

## M1b — what it creates (D281, D282, D283; answers 5, 8)

- `public.listing_packages` (`key text PRIMARY KEY` CHECK `^[a-z][a-z0-9_]{1,31}$` — S512; `tier` IN featured /
  premium; `days > 0`; `enabled`, `self_serve`, `extends_lifetime` booleans; `label_key` CHECK
  as the plan's; `sort`; `updated_by` → profiles ON DELETE SET NULL; `created_at`, `updated_at`
  with the `updated_at` trigger). Born closed: REVOKE from PUBLIC, anon, authenticated; GRANT ALL
  to service_role; `GRANT SELECT (every column but updated_by) TO anon, authenticated`; RLS on;
  policies `listing_packages_public_read USING (enabled)`, `listing_packages_staff_read USING
  (has_permission(auth.uid(), 'packages', 'view'))`, insert / update / delete `USING (false)` for
  the browser roles. Seeds `featured_45` (featured, 45 days, on, self-serve, extends,
  `package.featured_45`, sort 10) and `premium_60` (premium, 60, …, `package.premium_60`, 20).
- `public.package_prices` (`id uuid`; `package_key` → listing_packages; `country_code char(2)`
  NULL → countries; `category_id uuid` NULL → categories; `amount numeric(12,2) >= 0`; `currency
  char(3)` → currencies; `valid_from` default now(); `valid_to` NULL; CHECK `valid_to IS NULL OR
  valid_to > valid_from`; `updated_by`; timestamps; index `package_prices_lookup (package_key,
  country_code, category_id, valid_from)`). Born closed the same way; policies
  `package_prices_public_read USING (valid_from <= now() AND (valid_to IS NULL OR valid_to >
  now()))`, the staff read, the three denies.
- `public.package_price_for(p_listing_id uuid, p_package_key text) RETURNS jsonb` — SQL, STABLE,
  SECURITY INVOKER, `search_path = public`; `REVOKE … FROM PUBLIC; GRANT EXECUTE … TO anon,
  authenticated, service_role`. The ad's market is `locations.country_code` of
  `listings.location_id` (answer 5); its category's ancestors come from `category_tree_pointers`
  (a recursive walk with depth); among the valid rows of an enabled package the order is market
  match DESC, category match DESC, ancestor depth ASC NULLS LAST, `valid_from` DESC, id; the
  answer is `{price_id, amount, currency, valid_from, valid_to, country_code, category_id}` or
  NULL (not offered). No row of a switched-off package, no row outside its window.
- The resource `packages` (`20260915162505` §3.1 pattern) with `view` (no step-up) and `update`
  (step-up), both assignable.

## M1b — the proof

- (a) the resolver's header and grants; the two permission rows; for anon and authenticated every
  listed column of both tables readable, `updated_by` not, no INSERT / UPDATE / DELETE;
  service_role whole; row security on both; the two seeds.
- (b) the precedence, on rows the proof writes itself (the doors are M1c's): a scratch market `XZ`
  (the INC-949 way: country `e2e-mig-p1-m1b`, its anchor read and switched on by that name, a
  region, a city), one scratch user, a scratch tree (root → leaf, and another root, with pointers),
  an active scratch listing in the leaf placed in the city, a scratch package and seven prices —
  A (market, leaf) 1.00, B (market, any) 2.00, C (any, leaf) 3.00, D (any, root) 5.00, E (any,
  any) 4.00, F (market, other) 9.00, G (market, leaf) from tomorrow. The answer is A with every
  field checked; ending A → B; B → C; C → D; D → E; E → NULL; F never; G never (not yet valid);
  with A back: a switched-off package → NULL, then A again; an unknown package and an unknown ad →
  NULL.
- (c) as anon (`SET LOCAL ROLE anon`, claims empty): the enabled package is visible; of the seven
  prices only A and F; `updated_by` → 42501; the package switched off is not visible.
- No real row read.

## M1c — what it creates (answers 3, 4)

- `admin_save_listing_package(p_key text, p_tier text, p_days integer, p_enabled boolean,
  p_self_serve boolean, p_extends_lifetime boolean, p_label_key text DEFAULT NULL, p_sort integer
  DEFAULT NULL) RETURNS jsonb` — upsert on `key`; a NULL label key or sort keeps the stored one
  (defaults: label as given, sort 0). Audit `package.saved`, entity `listing_package`, meta `{old,
  new}` (rows without `updated_by`, `updated_at`, `created_at`; `old` null on create). Answer
  `{ok, key, created}`. Refusals `bad key`, `unknown tier`, `bad days`, `bad label key`.
- `admin_save_package_price(p_package_key text, p_amount numeric, p_currency character,
  p_country_code character DEFAULT NULL, p_category_id uuid DEFAULT NULL, p_valid_from timestamptz
  DEFAULT NULL, p_valid_to timestamptz DEFAULT NULL) RETURNS jsonb` — insert only (answer 3); the
  package row `FOR UPDATE` first, then: `unknown package`, `bad amount` (NULL or < 0), `unknown
  currency`, `unknown country`, `unknown category`, `bad window` (to ≤ from), `overlapping
  window` (another row of the same package, market and category whose `[from, to)` intersects —
  answer 4, under the package lock, no extension). Audit `package_price.saved`, entity
  `package_price`, meta the row's values (nulls stripped). Answer `{ok, id}`.
- `admin_end_package_price(p_id uuid, p_valid_to timestamptz DEFAULT now()) RETURNS jsonb` — the
  package row locked `FOR UPDATE OF k` through the price, then the price `FOR UPDATE`: `price not
  found`, `price already ended` (its `valid_to` ≤ now()), `bad window` (to ≤ from), `overlapping
  window` (a later row the new end would cross). Writes `valid_to` and `updated_by` only. Audit
  `package_price.ended`, meta `{package, from, to}` (nulls stripped). Answer `{ok, id, valid_to}`.
- Each door: plpgsql, VOLATILE, SECURITY DEFINER, `search_path = public`; `REVOKE ALL … FROM
  PUBLIC, anon`; `GRANT EXECUTE … TO authenticated, service_role`. The order inside is the config
  doors' (INC-951 3c, as `admin_set_coverage_plan` beside them): not signed in →
  `packages:update` (`permission denied`) → `require_step_up_if_needed('packages','update')` →
  the `staff_config` dial (`rateLimited`) → the door's rules → the write and its audit row. A
  refusal raises, so nothing it reached is kept (INC-844).
- Two departures from the first draft, both inside this stop's commits: (1) the doors first took
  the staff listing doors' order (dial before the rules, the second factor after them, T1 M1);
  commit `979336f2` moved the second factor before the dial — the config doors' order, and the
  one under which proof (g) reaches the second factor on every door. (2) The doors first carried
  an inline `profiles.account_status = 'deactivated'` read; DEC-241 made
  `account_is_deactivated` / `assert_caller_active` the one mechanism, called by `has_permission`
  and `rate_gate`, so the inline copy was a second version (K1) and was removed in `37725f58`.
  K2: T1's `admin_set_listing_tier` (`20261102045918…sql:32`) still carries that inline read —
  landed, outside this scope, reported here.

## M1c — the proof

- (a) the three doors' headers and grants (VOLATILE, SECURITY DEFINER, `{search_path=public}`; no
  PUBLIC grantee; anon cannot execute; authenticated and service_role can).
- (b) a scratch super admin (aal2, totp factor and amr) creates a scratch package: the answer
  `{ok, key, created true}`, the row (every field, `updated_by`), one audit row with `old` null
  and `new.days` 7; edits it (featured, 14 days, off, NULL label and sort): `created false`, the
  row with the kept label and sort, the audit row with old 7 → new 14 and enabled true → false.
- (h) with a `rate_overrides` row of 1 on `staff_config`, the second call → `rateLimited`, the
  row and the audit count unchanged; the override is then widened to 1000.
- (c) two price rows (A: any market, the scratch leaf, 1.00; B: any, any, 2.00; both from an
  hour ago): the rows, two audit rows with the package and currency in meta; ending A at now():
  the answer `{ok, id, valid_to}`, the row, the audit row (`package`, `to`, no `from`).
- (d) before anything ends, the same scope again (open, and a future window) → `overlapping
  window`, nothing written; after A ends, two adjacent future windows G `[+1d, +2d)` and H
  `[+2d, +3d)` on A's scope are accepted; ending G at +2.5 d → `overlapping window`, G unchanged.
- (e) thirteen refusals, each its own words, each writing nothing: `bad key` (`1_bad`), `unknown tier`,
  `bad days`, `bad label key`; `unknown package`, `bad amount`, `unknown currency` (`e2e`),
  `unknown country` (`XQ`, no such market — the K4 exception, as `XZ`), `unknown category`
  (a random uuid), `bad window`; `price not found`, `bad window` (ending H before it starts),
  `price already ended` (A).
- (f) a scratch user without `packages:update` → `permission denied` at each door.
- (g) the super admin on an aal1 session → `P0009` at each door.
- After (d)–(g): four price rows, days 14, H's `valid_to` intact, three `package.saved`, four
  `package_price.saved`, one `package_price.ended` for the scratch ids.
- Scratch rows: two `auth.users` (tag `e2e-mig-p1-m1c-<8 hex>`), a role row, a session, a factor,
  an amr claim, a `rate_overrides` row, one category with its pointer, one package, four prices.
  No market in this file (the market precedence is M1b's); no real row read.
- Not run anywhere: no SQL runner here; the staging apply is the proofs' first run (as T1).

## The guards (`bash scripts/check-migrations.sh`, this tree, after `4735e811`)

```
Born-closed guard OK (floor 20261007143529).
Definer guard OK.
Self-marking guard OK (floor 20260817054246).
Public-surface guard OK (floor 20261003215043).
Real-row proof guard OK (floor 20261007000000).
Migration guard OK.
```

- The scan (`/tmp/mig-scan.py`, ruling T1 stop 2, now five checks) on the three files: M1a 0
  findings; M1b 2, M1c 3 — one each is the (v) note on `v_pkg` against the coverage plan pattern
  (above), the other three are class (iv) notes on reads inside FUNCTION bodies keyed by their
  arguments (the resolver's `listings`/`locations` read by `p_listing_id`; the price door's
  `countries` / `categories` existence checks by `p_country_code` / `p_category_id`), not proof
  reads; the real-row guard (the authority for (iv)) is OK. No (i) CASE-in-condition, (ii) literal
  or (iii) listing finding.
- Neither the guard nor the laws parse plpgsql (INC-1033): "Migration guard OK" says nothing about
  a proof block's syntax. Each file was read whole once more before this stop; the points checked
  are in the chat.
- `scripts/public-surface-allowlist.txt` +6: `listing_packages | anon,authenticated`,
  `package_prices | anon,authenticated`, `package_price_for | anon,authenticated`,
  `admin_save_listing_package | authenticated`, `admin_save_package_price | authenticated`,
  `admin_end_package_price | authenticated`.
- `scripts/acceptance-doors-allowlist.txt`: the `admin_set_coverage_plan(…smallint)` line
  replaced by `admin_set_coverage_plan(text,integer,integer,integer,boolean,smallint,integer,integer,boolean,text)
  | staff | …`; +3 lines for the three doors (`staff`). The guard runs against CI's temporary
  backend.
- `e2e/helpers/pool-reset-map.ts`: `POOL_EXEMPT_TABLES` +`listing_packages`, +`package_prices`
  (`updated_by` is attribution on a global row) — ruling 1, answer 1.
- Laws (`bunx vitest run scripts --maxWorkers=2`, after the split; round 2 touched only the
  three migration files, which no law parses — the migration guard ran again, above): 429 passed, 1 failed — NH-6
  (`scripts/ci/nightly-hour.test.ts`), red on the base tree too (macOS `date` ignores `TZDIR`;
  the same red T1 and C1 named); outside scope; CI (Ubuntu) is its proof. `bun run typecheck`
  green; `bun run lint` 0 errors, 46 warnings, the base tree's 46.
- Expected after the merge until the files are applied: STAGING BEHIND for the three marks.

apply ecdb5eab → expect mark 20261102220000
apply 502ee113 → expect mark 20261102230000
apply ac5b1435 → expect mark 20261103000000

Asked with this stop (ruling 1, answer 12): the Amharic for every §4 key, for the strings commit
after the screens. Next after `continue`: part B (Admin › Plans), then C, D, E. The branch head
at this stop is the commit that carries this report (round 2).
