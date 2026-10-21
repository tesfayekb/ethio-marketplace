# Temporary CI backend census (D228, DEC-209) — phase 1

Measured 2026-10-20 against dev `7bdeb9feda28705fed4b4c53a7a64b348644fc9d`.
This is a prerequisite census, not a claim of local-stack parity. The proof gates
nothing; hosted staging remains unchanged. CLI version: **2.120.0**.

## Evidence commands

- `git grep -in 'create extension' -- supabase/migrations`
- `git grep -n 'storage.buckets\|storage.objects' -- supabase/migrations`
- `git grep -n 'cron.schedule' -- supabase/migrations`
- `git grep -n 'jatpuhfdjfzctjipklmk'`
- `rg -n 'safeupdate|unaccent|pgcrypto|gen_random_uuid' supabase/migrations`
- `rg -n 'E2E_FAKE|GEMINI_FAKE' src/server src/routes .github/workflows/ci.yml`
- `rg -n '\.from\(|\.rpc\(' e2e`
- ethio-prod read tool: `select version()` → PostgreSQL **17.6**, x86_64 Linux.
- Staging-only service client, URL checked against the staging ref before use:
  `createClient(process.env.E2E_SUPABASE_URL, process.env.E2E_SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } })`;
  each named table: `.from(table).select('*', { count: 'exact', head: true })`;
  bucket flags: `.storage.listBuckets()` (only id and public flag reported).
  No credential or personal row was printed. Counts below are live totals, **not
  seed sizes**: ongoing CI scratch writes changed categories from 166 to 160 and
  attributes from 222 to 217 between reads. Phase 2 must filter scratch rows and
  freeze the selected reference records, not copy those totals or test identities.

## Hosted dependencies and local gaps

| What it is                                                                                                                                                                                                        | Where it lives today; evidence                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | CLI 2.120.0 local provision                                                                                                      | Gap and phase 2 closure                                                                                                                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| (a1) Postgres 17.6                                                                                                                                                                                                | Production `select version()` above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `[db].major_version = 17`                                                                                                        | Same major, not proof of identical image/minor; record actual local version in proof.                                                                                                                                                                                                           |
| (a2) `pg_trgm`                                                                                                                                                                                                    | `supabase/migrations/20260903033520_7d1627a4-07be-44a4-bdf6-eeb6536282f4.sql:22`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Supabase Postgres extension, repository creates it                                                                               | Replay unchanged; first failing file belongs in proof evidence.                                                                                                                                                                                                                                 |
| (a3) `pg_cron`                                                                                                                                                                                                    | `supabase/migrations/20261002013936_a35e45fa-1bd1-4eae-a750-01bc675230f1.sql:574`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Supabase Postgres supports cron                                                                                                  | Replay schedules; verify actual extension availability in the proof, not assume success.                                                                                                                                                                                                        |
| (a4) API safe-update / UUID / unaccent                                                                                                                                                                            | `supabase/migrations/20261005021121_9347e038-8b61-48f2-9ea3-de2f571decaf.sql:60` sets `safeupdate.enabled`; `20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql:13` uses `gen_random_uuid`; `20260924084437_231d2821-bdd1-4447-996a-60cfc3009497.sql:2` explicitly excludes unaccent                                                                                                                                                                                                                                                                                                                                                                                   | UUID generation is built into PG17; extension creation search finds pg_trgm and pg_cron only                                     | Hosted pg-safeupdate API preload (INC-432) is an assumption, not independently read here. Verify local PostgREST session/preload parity; do not add unaccent.                                                                                                                                   |
| (b1) Before User Created hook                                                                                                                                                                                     | Hosted Auth hook; `supabase/migrations/20261015110000_ed5dcaf6-f56d-41f7-94d4-eb1a1bad15d0.sql:9932,9959-9960`; `e2e/auth-signup.spec.ts:190-220`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `[auth.hook.before_user_created]`, enabled, `pg-functions://postgres/public/hook_before_user_created`                            | Replay body and auth-admin grant; prove disposable-domain refusal. Dashboard setting not separately read; test documents dependency.                                                                                                                                                            |
| (b2) TOTP, AAL2, worker super admin                                                                                                                                                                               | `e2e/global-setup.ts:282-379`; `e2e/helpers/totp.ts:31-53`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `[auth.mfa] max_enrolled_factors=10`; TOTP enrollment/verification true                                                          | Existing setup enrolls/verifies locally; no hosted factors or identities copied.                                                                                                                                                                                                                |
| (b3) Confirmation, password, recovery, redirects                                                                                                                                                                  | `e2e/auth-signup.spec.ts:67-76,157-181`; `e2e/helpers/users.ts:81,105`; `src/features/auth/auth-service.ts:18-36,190-201,420-460`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Signup enabled, password minimum 8, refresh rotation, JWT expiry 3600; site URL 127.0.0.1:4173 and both localhost callback globs | Smoke uses preconfirmed admin-created users. Config intentionally has email confirmations false as supplied; phase 2's real signup/recovery tests need confirmations and inbox-link retrieval, not SMTP delivery to hosted sink. Hosted password/redirect settings remain dashboard-unverified. |
| (b4) OAuth and email throttles                                                                                                                                                                                    | `e2e/auth-google.spec.ts`; `e2e/auth-reset.spec.ts`; `e2e/auth-signup.spec.ts`; smoke file list `.github/workflows/ci.yml:538`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Inbucket on 54324; no Google provider configured                                                                                 | Auth-Google mock flows must stay mocked; distinguish real provider coverage. Census/test full auth rate limits before moving email lane. Inbucket replaces external email, not a fake signup success.                                                                                           |
| (c1) `category-assets` **public**                                                                                                                                                                                 | Hosted bucket read above; `supabase/migrations/20260903105611_6f3acd98-5d43-484d-b422-6f10d76581e6.sql:6-11`; `20260903114705_81fd36ba-7244-4f5d-aebe-a2ce13ab0bf0.sql:2-15` asserts public                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Local Storage enabled, 50MiB limit                                                                                               | Runtime-only earliest `00000000000000_ci_local_buckets.sql` inserts public bucket before repository assertions; seed any real image dependencies in phase 2.                                                                                                                                    |
| (c2) `listing-photos` **private**                                                                                                                                                                                 | Hosted bucket read above; `supabase/migrations/20260804174739_0ce87c13-1bf0-4cc8-8d61-8dd8212d961c.sql:378-413`; `20261015102153_cb2ce284-09ce-4a1e-adab-baf061d8910e.sql:170-172,214-219`; `src/server/media/storage.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Local Storage API and service client                                                                                             | Same earliest runtime-only bucket seed, private; scratch photo uploads remain generated by tests, no production objects copied.                                                                                                                                                                 |
| (d) Scheduled jobs                                                                                                                                                                                                | `cron.schedule` search: catalog-find-sweep `20261002013936_a35e45fa-1bd1-4eae-a750-01bc675230f1.sql:575`, amended to 5min at `20261003005802_7423f49a-182c-47a8-b92e-d6417ed57452.sql:1607`; seller-name-sweep `20261004011235:1118`; listing-expiry-sweep/name-folds-rebuild `20261004144146:1794,1798`; feed-reindex-drain/feed-index-check `20261009052418:268,502`; rate-limits-prune `20261015110000:9997` (timestamp prefixes uniquely identify files)                                                                                                                                                                                                                | PG cron schedules are replayed, not external cron                                                                                | Smoke does not explicitly wait for a schedule. Full suite's finder/feed/expiry tests must be censused for eventual-job assumptions, seed/rebuild derived indexes deliberately, keep nightly elapsed-time tests on staging.                                                                      |
| (e1) categories **160**, attributes **217**, category_attribute_links **229**, category_tree_pointers **158**                                                                                                     | Counts above; readers `e2e/ad-page.spec.ts:287`, `e2e/feed-screens.spec.ts:74`, `e2e/admin-attributes-editor.spec.ts:909`, `e2e/helpers/category-menu.ts`; migration category/attribute seeds `20260810065832:57,269`                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Migrations provide some historical rows, not the current curated catalogue                                                       | Export clean graph, option records, exclusions and order from staging read-only; filter scratch; preserve IDs/links. Smoke's electronics route needs catalogue availability.                                                                                                                    |
| (e2) locations **297**, countries **249**, currencies **156**, coverage_plans **1**                                                                                                                               | `e2e/helpers/locations.ts:204`, `e2e/helpers/countries.ts:43,63`, `e2e/post-wizard-category.spec.ts:1304`; historical country inserts `20260729110912:20`, location proof inserts `20260810075629:153,156`                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Schema plus historical/proof inserts, not assured open-market tree                                                               | Seed countries, active/open coverage and currency data with parent graph; proof scratch inserts are not reference seeds. Capture clean immutable fixture output.                                                                                                                                |
| (e3) ui_translations **42808**, entity_translations **181**, languages **15**                                                                                                                                     | `e2e/i18n-bundle.spec.ts:122`; `e2e/i18n-coverage.spec.ts:347`; `e2e/helpers/translations.ts:200,221`; `e2e/global-setup.ts:526,603`; language seed `20260901225202:112`, translations `20260829050332:300-346`                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Compiled fallback and partial historical seeds; EN healer updates existing rows                                                  | Seed approved published language/translation coverage, exclude scratch fence languages/keys; do not treat empty catalogue as complete.                                                                                                                                                          |
| (e4) reserved-name family: protected_names **762**, protected_handles **2964**, protected_handles_am **39**, name_rule_words **68**, exact_only_words **101**, site_words **331**, blocked_email_domains **9892** | Counts above; `e2e/helpers/users.ts` alias-release/pool reset; signup hook `20261015110000:9932`; `e2e/auth-signup.spec.ts:190-220`; `rg -n 'protected_names                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | protected_handles                                                                                                                | name_rule_words                                                                                                                                                                                                                                                                                 | exact_only_words                                                                                                                                       | site_words                                                                                                                                           | blocked_email_domains' supabase/migrations e2e` | Tables and some migrated lists; not a guaranteed current maintained corpus | Freeze real policy dictionaries and aliases, exclude scratch. `reserved_names` is not a public table; these are its actual tables. |
| (e5) legal_settings **1**, legal_documents **3**, legal_versions **3**, listing_policy **1**                                                                                                                      | `e2e/legal-admin.spec.ts:23`, `e2e/legal-doors.spec.ts:752`, `e2e/legal-certify.spec.ts:260,681`, `e2e/admin-listings.spec.ts:2119`; settings seed `20261019063500:136`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Legal singleton seeded by migration; legal docs/version publication is runtime data                                              | Seed only required reference legal state/snapshot facts, no personal acceptances; retain test scratch-kind isolation and refusal checks.                                                                                                                                                        |
| (e6) roles **104**, resources **16**, permissions **67**, role_permissions **92**, rate_dials **14**, ai_features **7**                                                                                           | `e2e/shell.spec.ts:47-57`, `e2e/ad-page-doors.spec.ts:145-168`, `e2e/admin-screening.spec.ts:266-288`, `e2e/admin-services.spec.ts:100-115`; counts above                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Migrated RBAC/dials, possible hosted edits; totals include scratch roles                                                         | Seed only real RBAC/policy settings and grants required by setup, preserve `super_admin` behavior; no hosted user_roles or user IDs.                                                                                                                                                            |
| (f1) Geocode/maps                                                                                                                                                                                                 | `src/server/geo/geocode.ts:60,74,78`; `.github/workflows/ci.yml:491-492`; `rg -n 'E2E_FAKE_GEOCODE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | page.route                                                                                                                       | route.fulfill' e2e src/server/geo`                                                                                                                                                                                                                                                              | `E2E_FAKE_GEOCODE=1`; test-specific browser route mocks                                                                                                | Search/reverse are fake; maps tiles/outlines not thereby globally fake. Phase 2 inventories real network calls/fixtures, keeps explicit route mocks. |
| (f2) Translation, AI screening/category pictures                                                                                                                                                                  | `.github/workflows/ci.yml:489-492`; `src/server/category-images/gemini.ts:19-31`; `rg -n 'E2E_FAKE_TRANSLATE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | GEMINI_FAKE' src/server src/routes`                                                                                              | `E2E_FAKE_TRANSLATE=1`; category-image fallback without GEMINI_API_KEY (or GEMINI_FAKE)                                                                                                                                                                                                         | Existing fake behavior, no provider secret needed by proof; full phase 2 maps screening provider calls separately, not assumed covered by translation. |
| (f3) Photos/background removal/email                                                                                                                                                                              | `src/server/media/background.ts:29,56,86`; `e2e/photo-pipeline.spec.ts`; `.github/workflows/ci.yml:475`; `e2e/auth-signup.spec.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Background fake inherits E2E_FAKE_TRANSLATE; local private storage; Inbucket                                                     | Photo codecs still real. Smoke excludes email-signup project; full phase 2 adapts email link handling and avoids hosted email sink.                                                                                                                                                             |
| (g) Staging-ref census                                                                                                                                                                                            | `git grep` matches: ci.yml **380,432,434,476,479,481,617,620,622,764,767,769,892,895,897**; feed-bench.yml **34**; flake-check.yml **43,47,49**; guard-proof.yml **19,22,24**; nightly-e2e.yml **37,41,43,285,288,290**; global-setup.ts **22**; helpers/session.ts **23-24** (comment); src/test/app-target.test.ts **5**; scripts/feed-bench.ts **26**. Documentary matches: docs/features/auth-google-door.md:24, e2e-harness.md:72, bundle-10-ruling-turn-14.md:131,379, bundle-10.md:121,234, bundle-22-turn-14-v2.md:40, 2026-10-05-bundle4-close-handover.md:124,458, docs/tracking/nightly-last-failure.md:259, scripts/fixtures/e2e-ssr-census/job.log.txt:375,377 | New proof sets local URLs dynamically; current workflows unchanged                                                               | Part C narrowly permits exact loopback under flag. Session derives storage key from URL, comment not a hard gate; feed bench stays hosted. Docs/archive/captured evidence unchanged.                                                                                                            |
| (h) Secrets/variables                                                                                                                                                                                             | `.github/workflows/ci.yml:473-483`: E2E_SHARD, E2E_EMAIL_SINK variable, E2E_SUPABASE_PUBLISHABLE_KEY variable, E2E_SUPABASE_SERVICE_ROLE_KEY secret; global-setup.ts:428 optional E2E_USER_PASSWORD; ci.yml:487-492 flags                                                                                                                                                                                                                                                                                                                                                                                                                                                   | CLI local ANON_KEY/SERVICE_ROLE_KEY, masked and step environment; generated passwords; E2E_SHARD=localproof                      | No hosted Supabase credentials or provider key. GitHub token exposed only to publication step; one write-capable job is necessary for one-job evidence publishing (Actions permissions are job-scoped, not step-scoped).                                                                        |
| (i) Pool and fresh accounts                                                                                                                                                                                       | `e2e/helpers/users.ts:134-164,396-405`; `e2e/global-setup.ts:282-379,428-498`; docs/features/e2e-harness.md:340-363                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Empty database per job; existing lane pool creates missing seats on demand, worker admin minted locally                          | Phase 1 unchanged identity default. Phase 3 retires CI pool; fresh/private identity subjects stay real doors; no shared hosted MAU, staging pool kept only until its separately ruled tidy-up.                                                                                                  |

| (j) Default grants in public | B3: all six rows in the hosted read-back below | Local twin: proof's `Default grants in public:` parity line | Compare the local image's defaults; no browser-role default table/sequence grants in the fixture. |
| (k) Platform RLS event trigger | B1 owner `postgres`; B2 `ensure_rls`, `ddl_command_end`, enabled `O`, tags `CREATE TABLE`, `CREATE TABLE AS`, `SELECT INTO`, function `rls_auto_enable()` | Function body copied exactly into the workflow; one event trigger | B4: RLS on 76 of 76 public tables; local twin in the proof's parity line. Other platform triggers are not copied. |
| (l) Hosted migration ledger | B5: 322 rows; both version differences in the hosted read-back below | Repository versions except `20260922120000`, plus every runtime `*_ci_local_*.sql` version | Literal hosted/repository timestamps differ beyond the never-applied file; report them, do not rewrite landed migrations. The supervisor's tracing (2026-10-20; `git log --all --name-status -- supabase/migrations`): four pairs are one file each, renamed by the platform after the tool recorded its first stamp — 20260729110912/…110913, 20260822050500/…050200, 20260822065530/…065542, 20260822073000/…072304 (R100 renames, same SQL). Three hosted versions have files only on the platform's side branches, never on dev — 20260830084410 and 20260830084458 (lovable-sync; service_role grant sweeps that 20260830091427 and 20260830091455 restate on dev) and 20260907065759 (lovable-sync-1788764600; public.admin_export_attributes, redefined on dev by 20260907173330, 20260907181251 and 20260907221756; its mark 20260907070000 exists on hosted only). 20260922120000 never applied anywhere (INC-266). 20261004212627, 20261015110000 and 20261017044823 were applied by the operator from the raw file (G39), which writes no tool-ledger row. No SQL ran on hosted that dev's files do not hold. |

## The working copy (turn 14b)

- Skip `20260922120000` (INC-266): never applied on hosted; its own proof asserted `update` where the planner says `change`; `20260922121913` restates it.
- Patch `20260830091427`: service-role privilege proof uses table oid; the name-based check ran before its namespace filter (`relation public.buckets does not exist`).
- Patch `20260830091455`: service-role census uses table oid; the same name-before-namespace error.
- Patch `20260924084437`: PROOF 5 reports catalogue size as a warning, not a refusal; migrations' catalogue answered 2,111 bytes, above hosted's 2,048-byte bound.
- Fixture `00000000000001`: hosted default browser grants and RLS event trigger; `20260810075629` P5 otherwise permits `home_country_code` update, and `20260911223744` fails `function public.rls_auto_enable() does not exist`.
- Fixture `20260809010129`: bootstrap and three plain accounts, no password or sign-in; serves `20260809010130`, `20260809103904`, `20260817061418`, `20260917210349` and `20260917210459`; without them, `bootstrap failed: no auth.users row`.
- Fixture `20260917112955`: currencies for ET, US, GB, DE, KE and CA; `20260917112956` P5b otherwise refuses `price_currency required`.
- Fixture `20260921092129`: voltage definition and three digit-led values; `20260921092130` otherwise refuses `PROOF setup: voltage definition absent`.
- Fixture `20260927045939`: home country ET for the three plain accounts; `20260927045940` otherwise refuses `no active seller`.
- Fixture `20260929201600`: active Bole sub-city under Addis Ababa; `20260929201601` otherwise refuses `PROOF setup failed: places`.

Supervisor's replay, 2026-10-20: a local PostgreSQL 16 stand-in applied the 322 migrations hosted applied, in order, each in one transaction, with these fixes and no others, in 132 to 143 seconds; RLS on 76 of 76 public tables. Unproven there: the CLI's Postgres 17 image, its default grants, event-trigger privilege, the real Auth and Storage schemas.

Turn 14c: the start step records the reason of any failure after `supabase start` (local-backend-failure.txt), the status variables' names and the key names it used (local-backend-status.txt); proof run #2 (7464c799) applied every migration in 106 s and then failed with no reason recorded.

<!-- prettier-ignore -->
Turn 14d: proof #3 (a4dee36c) applied every migration in 100 s; the CLI printed both key pairs (ANON_KEY and SERVICE_ROLE_KEY were used); the ledger check failed on an assumed container name — the step now finds the single supabase_db_ container. The evidence keeps its own commit unmasked.

Turn 14e: proof #4 (efb581af) passed — applied 329/329, start 106 s, smoke 186 passed / 0 failed / 60 skipped of 246 in 733 s, RLS on 76 of 76; the stack had been named after production's ref (the CLI read `SUPABASE_PROJECT_ID` from the repository's .env), now set to `ethio-ci-local` in the proof job's env.

### Hosted read-backs (turn 14b; SELECT only)

B1 — owner: `postgres`; `def` (the executable copy lives in the workflow):

```sql
CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$
```

B2 — `evtname | evtevent | evtenabled | evttags | evtfoid` (all rows):

```text
ensure_rls | ddl_command_end | O | {"CREATE TABLE","CREATE TABLE AS","SELECT INTO"} | rls_auto_enable()
issue_graphql_placeholder | sql_drop | O | {"DROP EXTENSION"} | extensions.set_graphql_placeholder()
issue_pg_cron_access | ddl_command_end | O | {"CREATE EXTENSION"} | extensions.grant_pg_cron_access()
issue_pg_graphql_access | ddl_command_end | O | {"CREATE EXTENSION"} | extensions.grant_pg_graphql_access()
issue_pg_net_access | ddl_command_end | O | {"CREATE EXTENSION"} | extensions.grant_pg_net_access()
pgrst_ddl_watch | ddl_command_end | O | NULL | extensions.pgrst_ddl_watch()
pgrst_drop_watch | sql_drop | O | NULL | extensions.pgrst_drop_watch()
```

B3 — `role | defaclobjtype | defaclacl` (all rows):

```text
postgres | S | {postgres=rwU/postgres}
postgres | f | {postgres=X/postgres}
postgres | r | {postgres=arwdDxtm/postgres,service_role=Dxtm/postgres}
supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}
supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}
```

B4 — `rls_on: 76; tables: 76`.

B5 — all results:

```text
Rows: 322
Repository versions not in hosted ledger: 20260729110912, 20260822050500, 20260822065530, 20260822073000, 20260922120000, 20261004212627, 20261015110000, 20261017044823
Hosted versions not in repository: 20260729110913, 20260822050200, 20260822065542, 20260822072304, 20260830084410, 20260830084458, 20260907065759
Versions (ordered):
20260729110913
20260730015333
20260730021240
20260730094625
20260803075756
20260803100407
20260804133231
20260804150657
20260804152522
20260804174739
20260804213701
20260809010130
20260809010922
20260809014125
20260809061244
20260809103904
20260809105042
20260810065832
20260810071215
20260810073508
20260810074522
20260810075629
20260816092211
20260816120338
20260817023555
20260817033146
20260817052646
20260817054246
20260817055252
20260817055438
20260817061418
20260817100845
20260822050200
20260822065542
20260822072304
20260829050332
20260829060103
20260829060155
20260829060329
20260829084528
20260830034154
20260830041754
20260830045700
20260830080548
20260830084410
20260830084458
20260830091427
20260830091455
20260830113828
20260831052750
20260831060745
20260831062918
20260831064939
20260831065057
20260831071056
20260831101616
20260831105914
20260901143032
20260901165322
20260901181602
20260901193740
20260901205020
20260901225202
20260901234603
20260902021248
20260902025514
20260902031625
20260902031954
20260903022519
20260903025501
20260903033520
20260903042028
20260903044526
20260903052438
20260903054922
20260903061515
20260903064413
20260903073853
20260903080633
20260903083012
20260903085419
20260903105611
20260903114705
20260904050152
20260904053127
20260905082325
20260906021852
20260906024322
20260906033048
20260906035541
20260906043420
20260906043646
20260906050949
20260906204408
20260907033910
20260907050122
20260907053238
20260907065759
20260907173330
20260907181251
20260907185010
20260907191856
20260907194932
20260907202049
20260907221756
20260908022337
20260908024055
20260908032617
20260908034033
20260908041703
20260908050101
20260908072145
20260908111546
20260909034642
20260909035515
20260909035656
20260909045217
20260909054432
20260909054514
20260909140408
20260909142634
20260910042749
20260910045047
20260910053535
20260910064921
20260911100932
20260911193208
20260911223202
20260911223744
20260911224612
20260912002709
20260912061005
20260913053747
20260913054138
20260913060622
20260913114828
20260914095503
20260914140901
20260915114812
20260915134912
20260915162131
20260915162505
20260915170752
20260915172839
20260915190024
20260915232928
20260915235233
20260916013820
20260916215832
20260916235955
20260917000149
20260917112956
20260917113152
20260917205429
20260917210006
20260917210349
20260917210459
20260917210704
20260917214504
20260917214536
20260919054044
20260919061105
20260919134523
20260919134621
20260920035859
20260920072310
20260920074901
20260920075213
20260920082208
20260920090257
20260920150901
20260920151236
20260920151351
20260921081850
20260921092130
20260921092804
20260921094000
20260922001023
20260922050704
20260922121913
20260922150126
20260923070512
20260923070813
20260923072520
20260924002531
20260924084437
20260924084544
20260924084606
20260924084639
20260924084700
20260924084727
20260924084745
20260924084842
20260924090042
20260924091805
20260924092749
20260924104238
20260924110035
20260924215854
20260925004046
20260927003341
20260927003818
20260927004035
20260927013608
20260927045940
20260928002133
20260928013646
20260928034942
20260928054510
20260928072330
20260928135721
20260928140742
20260929045106
20260929093107
20260929201601
20260929205914
20260930172006
20261002013936
20261003005802
20261003012503
20261003215007
20261003215042
20261003221958
20261004010309
20261004011235
20261004021819
20261004034256
20261004055007
20261004055819
20261004072852
20261004144146
20261004144628
20261005021121
20261005165621
20261005171442
20261005172453
20261006005138
20261006010039
20261006225254
20261007033719
20261007063049
20261007143529
20261007150540
20261007222234
20261009032615
20261009052418
20261009060703
20261009070008
20261009092434
20261010055801
20261010065637
20261010103356
20261010145454
20261011085637
20261011124548
20261011143218
20261012042142
20261012101642
20261013053246
20261013073618
20261013142425
20261013150607
20261013161059
20261013184636
20261013195204
20261013200740
20261014022725
20261014080034
20261014084432
20261014094752
20261014103719
20261014155221
20261014194317
20261014212353
20261014230715
20261015012743
20261015023155
20261015071455
20261015081040
20261015083928
20261015102153
20261015113334
20261015130915
20261015204631
20261016150556
20261016183525
20261017060602
20261017091410
20261017091554
20261017092635
20261017092747
20261017092854
20261017093039
20261017093157
20261017093325
20261017103843
20261017105713
20261017105751
20261017115807
20261017122742
20261017132201
20261017135824
20261017153217
20261018142444
20261018142627
20261018163842
20261018165306
20261018165354
20261019063500
20261019063635
20261019084720
20261019103558
20261019103756
20261019115742
20261019115951
20261019140533
20261019222105
20261019223105
20261019223222
20261019224505
20261019232513
20261020041607
```

## Phase 2 — the full suite (turn 15)

Proof #6 (`244b1e71`): every lane 329/329; start 90–118 s; slowest lane 1,251 s;
2,076 passed, 36 failed, 7 flaky, 154 skipped of 2,273 — 23 tests in nine causes:
the ad page and photo pipeline (AP-9, AP-19, AP-36, AP-41, AP-48, AP-49, AP-50,
PP-12, PP-21, PP-22, PP-23, PP-27, PP-28); the attributes import's per-user preview
budget (AT-27, AT-70, AT-71); the translations coverage gate (TR-6); Google sign-in
(G-1); the card ribbon (FS-15); the staff listing card (LGC-3); Edit's place
(MLA-15, MLA-17); and the price page (PW-162). These are the brief's named causes,
not yet reporter-body diagnoses; its enumeration contains eight groups and 24
distinct test IDs, despite its stated nine causes and 23 tests. The summary now
runs CI's failure reporter (`docs/tracking/local-backend-last-failure.md`).

### Reference data — staging and the temporary backend

Read-only staging census at turn 15b, with the URL checked against the exact
staging reference before any select. Only reference fields and aggregate counts
were read; no profile, account or listing text. The local side is the supervisor's
migration replay, not a local query. Scratch reference rows are observations,
not a mandate to seed them. Legal publication is marked by `legal_versions.status`.

| Reference data      | Staging                                                                                                                                                  | Temporary backend (supervisor)           |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Languages           | 15: am, en (base), om, ti, zxa, zxx, zxx-d, zxx-de, zxx-m, zxx-mo, zxy, zxy-d, zxy-de, zxy-m, zxy-mo; all admin-enabled; only am/en public-enabled       | 4: am, en (base), om, ti                 |
| `ui_translations`   | am/en: 2,938 approved each; om/ti: 2,938 untranslated each; zxa: 2,861 machine and 75 untranslated; each of the ten zxx/zxy variants: 2,805 untranslated | 0 rows                                   |
| Active countries    | ET, US                                                                                                                                                   | ET, US                                   |
| ET active locations | country 1; region 8; city 11; `sub_city` 2; inactive 0                                                                                                   | region 6; city 9; one `sub_city` fixture |
| US active locations | country 1; region 6; city 9; inactive 0                                                                                                                  | region 6; city 9                         |
| Legal documents     | 3 scratch kinds, global (`country_code` null), one document each; no terms/privacy document                                                              | 0                                        |
| Legal versions      | 3 published, one per scratch kind; publication column `status`                                                                                           | 0                                        |
| `rate_dials`        | 14 (below)                                                                                                                                               | 14 from migrations                       |
| `rate_overrides`    | 0                                                                                                                                                        | Not supplied by the supervisor           |

| Action                   | Staging `max_count` | Staging `window_seconds` |
| ------------------------ | ------------------- | ------------------------ |
| `alias_check`            | 60                  | 3600                     |
| `contact_reveal`         | 30                  | 86400                    |
| `contact_reveal_sellers` | 10                  | 86400                    |
| `draft`                  | 600                 | 3600                     |
| `identity`               | 20                  | 86400                    |
| `listing_read`           | 600                 | 3600                     |
| `options_read`           | 400                 | 3600                     |
| `post`                   | 10                  | 86400                    |
| `report`                 | 10                  | 86400                    |
| `review_reveal`          | 60                  | 3600                     |
| `revise`                 | 120                 | 3600                     |
| `save`                   | 200                 | 86400                    |
| `schema_read`            | 120                 | 3600                     |
| `viewing_place`          | 60                  | 3600                     |

DEC-209 VERDICT — PROCEED: proof #4 (`efb581af`) and proof #5 (`3f064e01`)
both applied every migration hosted applied (329/329 with the working copy),
started in 106 s and 99 s, and ran the smoke tier 186 passed, 0 failed, 0 flaky,
60 skipped of 246 (733 s and 637 s, against about 22 minutes on staging).
Staging's smoke tier on the same commit `3f064e01` passed (run 1065, 09:52Z);
each of the 60 local skips is a viewport or project skip in the four smoke specs,
none depending on the backend. Every smoke test that passed on staging passed on
the temporary backend. This verdict is the operator's frozen brief; the published
CI evidence read at the start of turn 15 still named run 1063.

The non-gating proof now runs thirteen lanes: smoke and shards 1–12, each on its
own temporary backend, with its own unchanged migration working copy, build and
Chromium. The smoke lane keeps `E2E_SHARD=localproof`; shards use `local-<n>`.
The shard lanes use twelve slices of the two CI viewport projects, excluding
`@global-state|@a11y`. `email-serial` is not run. Only the summary job publishes:
it gathers lane fragments, JSON results and logs, lists missing evidence, totals
the counts and names the slowest lane. Hosted staging CI continues to gate.

DEC-211 — THE RULE FOR SWITCHING, fixed before any number exists: CI's gating E2E moves from hosted staging to temporary backends (turn 16, which also retires the account pool for CI) when TWO CONSECUTIVE full-suite proof runs on dev commits show: (1) every lane's backend started and applied every migration hosted applied; (2) every test that passed in the same commit's staging CI run passes on the temporary backends, or is named in docs/features/ci-local-backend.md with its cause and the turn that fixes it — at most 10 tests so named; (3) the slowest lane, start included, finishes within 25 minutes. The e-mail lane (project email-serial) stays on staging until its own proof. The named gaps are fixed in the proof's working copy, its seed or the test helpers (turns 15b, 15c), never by weakening a test (G38). ABANDON phase 2 (staging stays the CI backend; the proof stays non-gating) if two fix turns still leave more than 10 named gaps.

Turn 15c (proof #7, `78b96e25`, the first with failure bodies): 2,081 passed, 30 failed, 8 flaky, 154 skipped of 2,273. The 30 failures were 16 tests in four causes: the API answered over http while the app keeps only https photo links (INC-789 — the temporary backend now serves https from a certificate authority made for each run, trusted by Chromium through the runner's NSS database and by Node and Bun through `NODE_EXTRA_CA_CERTS`); the languages page measured a language by its own rows (INC-790); a save run queued before a Next carried it (INC-791); the attributes import spec outpaced the preview budget (INC-792). None is a named gap under DEC-211.

Turn 15d (proof #8, `6baac306`): 2,112 passed, 1 failed, 6 flaky, 154 skipped of 2,273; every lane 329/329; the slowest lane 1,143 s. Proof #7's four causes are gone. The flaky tests (AP-41, MLA-15, MLA-17) flake on staging too. The one failure, LGC-3 at 360, rendered “undefined” on the staff ad page; its body was lost because the lane masked its results file as raw text and the e-mail rule broke a JSON escape (INC-794). The lane now masks that file as data, string by string. Under DEC-211 proof #8 does not count: LGC-3's cause could not be named.

Turn 15e (proof #9, `643b49b6`): 2,111 passed, 1 failed, 7 flaky, 154 skipped of 2,273; every lane 329/329; the slowest lane 1,120 s; every lane's results reached the report (INC-794 fixed). LGC-3 failed at 1280 and passed on retry at 360: the staff ad page rendered “undefined” (INC-795), and the guard's page text ended before the token, so the guard now names the element (INC-796). Under DEC-211 proof #9 does not count: LGC-3's cause could not yet be named.

Turn 15f (proof #10, `17e867e2`): the guard named LGC-3's element — the staff history printed “Status: undefined → Waiting for review” because no label existed for the draft status (INC-795, fixed with its key and a test that every status has one). Staging hid it: its history usually arrives after the page is checked. Lane 1 ran on a slow runner (start 359 s) and was cancelled at 45 minutes; lanes now have 60, and DEC-211's criterion (3) still judges each at 25. Under DEC-211 proof #10 does not count (criterion 3).

Turn 15g (proof #11, `1a5b21bd`): 2,113 passed, 0 failed, 6 flaky, 154 skipped of 2,273; every lane 329/329; the slowest lane 1,166 s; LGC-3 green (INC-795). Under DEC-211 proof #11 counts, the first of two. Its retried passes — MLA-15, MLA-17 and AP-41, in both projects and in every proof since #7 — opened a page before the public tree's 15-second copy carried the fixture's new places; every fixture now waits for the route to serve them first (INC-797).

Turn 15h (proof #12, `99e4e619`): 2,119 passed, 0 failed, 0 flaky of 2,273 — every test at its first attempt — but the slowest lane took 1,771 s: turn 15g's route wait (up to the route's 15-second copy) ran in about 115 test calls per project, where only a few read the served place. Under DEC-211 proof #12 does not count (criterion 3) and the pair restarts. A test now waits for the route only when its outcome reads output built from the served place tree; the factories take the wait as an option.

Proof #14 (`cbc98cba`, turn 15j v3): 2,119 passed, 0 failed, 0 flaky of 2,273; every lane 329/329; the slowest lane 1,139 s. With proof #13 it is DEC-211's second consecutive proof, and run 1074 on the same commit passed: the switch is decided (turn 16).

## Phase 3 — the switch (turn 16)

DEC-211 VERDICT — SWITCH: proofs #13 (`54dbf7ad`) and #14 (`cbc98cba`)
each applied 329/329 in every lane; 2,118 and 2,119 passed, zero failed;
the slowest lanes took 1,170 s and 1,139 s. The same commits' staging runs
passed their browser tests. These are the two consecutive qualifying proofs.

CI now calls `local-backend-proof.yml` as `e2e-lanes`: thirteen lanes, smoke
and slices 1–12, each on its own throwaway Supabase built from the repository's
migrations, without hosted secrets. The staging email job remains, with its
staging preflight and shared build. The merged `e2e` verdict requires every
temporary-backend lane and email to succeed, carries smoke, email and 1–12 in
its report, and gates the fast-forward promotion of main.

The staging smoke tier, six staging shards and changed-spec fast lane are
retired. The account pool is retired for hosted CI browser coverage; DEC-097
keeps it for the nightly, email job and manual Flake check. Temporary lanes
create their own accounts through the existing lane-scoped helper. Staging
keeps the nightly full run and the operator's walks.

DEC-214 — THE SWITCH'S KEEP RULE, fixed before any run: KEEP when the CI run on this turn's commit and the next completed run each (1) carry every source in the merged report — smoke, email, 1 to 12, none missing; (2) give a verdict that agrees with the jobs (green only when every lane and the email job are green); (3) promote main on an all-green run. REVERT (git revert of this turn's commits; staging gating comes back whole) when a WIRING failure — a missing source, a verdict that disagrees with its jobs, promote skipped on an all-green run, a lane that fails before its tests start for a reason outside the tests — happens in two of the first three runs. A test that fails is a test failure, fixed as always, not a wiring failure.

Owed later turn: move the email tests to the temporary backend's inbox; until
that proof, email is the last gating browser coverage still on hosted staging.

Turn 17: the smoke lane also runs the write-door guard (DEC-215) against the temporary backend, before its tests.

## Phase 2 plan

1. Read-only capture and review the clean reference-data graph, real RBAC/dials,
   published translations and legal snapshots; use actual output as fixtures.
   Counts are observations, not a mandate to copy scratch or personal data.
2. Put seeds only in the CI working copy after every unchanged migration;
   preserve bucket public flags and ensure needed reference media is present.
3. Read proof's first failed migration/error; fix named replay causes in turn 14b's
   working copy only. Never edit a landed migration to make local replay pass.
4. Verify Auth hook, MFA/AAL2, password/recovery/confirmation/rate limits;
   adapt email tests to the local inbox and document external provider mocks.
5. Build/rebuild required derived indexes, audit eventual cron assumptions,
   and move twelve per-group CI shards to independent stacks only after DEC-209.
   Staging retains nightly full coverage and operator walks; current gates do not change.
6. Follow phase 3 for CI account-pool retirement and separately authorized staging
   tidy-up. FV-1's settlement cause stays a hypothesis until the manual Flake check.

## DEC-209 proof judge

Proceed only after two consecutive dev proof runs show every repository migration
applied; every smoke-tier test passing in staging CI for the same commit also
passes locally, or has a named cause here; and startup including migrations is
within 300 seconds. Fix named migration/smoke causes in turn 14b, in the proof's
working copy only. Abandon if startup still exceeds 300 seconds after fixes, or
more than one smoke-tier spec cannot run locally at all. No verdict exists yet.

## Turn 17c — two workers per lane (DEC-217) and the fixture accounts (INC-808)

DEC-217 — lanes run two workers, smoke stays serial (DEC-024). Scratch identities carry run × shard × worker × project × test, and pool seats are per worker. Baseline run 1080: slowest lane 8 1,156 s; lane 1 1,093 s; lane 7 1,054 s. The next two CI runs judge the change, under the rule frozen before any number:

KEEP when the first two CI runs after it have 0 failed lane tests, no test retried that did not retry in runs 1076/1077 (0 flaky then), and the slowest lane's job ≤ 900 s; REVERT to 1 worker (DEC-024's rule) at the first cross-worker interference failure or a new flaky test, or if the slowest lane does not drop below 1,000 s.

INC-808 evidence: all thirteen lanes in runs 1079 and 1080 reported `[e2e:teardown] WARNING could not list users for process <run>-<lane>: [e2e:teardown] listUsers page 1 failed: {} — the nightly sweep will reap them.` No lane deleted its accounts. Auth-js 2.110.9 maps HTTP 500–504 to AuthRetryableFetchError with the Response stringified as `{}`, hiding the auth server's reason.

**Hypothesis, not an observed auth-server diagnosis:** the fixture's four manually inserted auth.users accounts leave text columns NULL where the auth server expects strings; admin list reads those fixture rows, unlike sign-in for another account. The CI working-copy fixture now sets each listed text column to `''` where NULL, only if the column exists in that backend's schema. Hosted auth-created accounts already use empty strings. This changes no landed migration or hosted account.

The harness's `authErrorText` retains class, positive HTTP status and message for every auth-admin error it prints in setup, teardown and user helpers; existing WARNING/throw behavior is unchanged. The next CI run proves the fixture change: every lane's post-test band must say `[e2e:teardown] deleted N user(s) owned by process …`, or name the error's class and status. E1/E2 are CI-only; staging checks do not establish their result.

## Turn 18 — the e-mail tests on the temporary backend (DEC-218, D228 phase 4)

D228 requires every gating browser test to run on a throwaway backend, without
staging dependence or hosted secrets. Until this turn, the remaining staging
email job ran the four tests of `e2e/auth-signup.spec.ts` in the `email-serial`
project (A-1+A-2, SU-3, SU-1, SU-2), consuming the shared staging build alone.
That job and build are removed; the merged verdict requires `e2e-lanes` alone.
The staging migration preflight remains, including DEC-171's wait.

DEC-218 adds a fourteenth lane, `email`, with its own temporary backend and one
worker. `E2E_EMAIL_SINK=1` enables the unchanged tests: mail goes to the backend's
own recipient-agnostic Inbucket inbox. The temporary backend now uses
`enable_confirmations = true` for parity with hosted sign-up: A-1 reaches the
check-email view and SU-3 confirms before signing in. Other accounts are created
by the service client with `email_confirm: true`. `auth.rate_limit.email_sent = 30`
replaces the CLI's default of two sends per hour; the email lane sends three
(A-1's sign-up and resend, SU-3's sign-up).

KEEP when the first two completed runs on dev after it each run the four tests of e2e/auth-signup.spec.ts in the email lane — none skipped — and pass them without a retry; REVERT (e2e-build and e2e-email restored from 6a175a74's ci.yml, the email lane removed) when, after one fix turn, a run still fails an email-lane test for a cause in the temporary backend's mail or auth settings rather than in the app.

Ethio-staging is now used by in-turn runs and the preflight only, not by any
gating browser job. The sandbox has no Docker; the next CI run is the proof of
the temporary backend's email/auth settings and workflow graph, while the same
four tests are exercised on staging during this turn.

INC-808: every lane fragment includes the last deleted-users or WARNING teardown
line, redacted like other evidence, or `not found`. The proof summary lists these
under `- Teardown:` in smoke, email, 1–12 order, using `no evidence` for a missing
fragment. They are visible even on green runs in
`docs/tracking/local-backend-proof.md`. The nine auth-admin error-only messages
in the five affected specs now use `authErrorText` without changing their
existing failure behavior; SU-2 and SU-3 also exercise the account list on the
temporary backend.

## Turn 22 — one worker per lane again (DEC-230)

Run 1088 (39588958890, db01a7fd): CO-6 failed in lane 2 on both tries — a test in the lane's other worker removed a root category while CO-6 saved the rail order, and the dialog's cached root list sent it again (INC-814). DEC-230's rule (the operator, 2026-10-21) applied with no further exception: every lane runs one test worker (local-backend-proof.yml, E2E_WORKERS). DEC-217's measurement: a lane takes about 19 minutes with one worker.
