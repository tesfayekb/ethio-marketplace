# Local backend proof (non-gating)

- Commit: `67e66c0633a385d35a2a1b77bd317469008aaf20`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41579242447

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 48 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 67 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 64 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 68 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 6, 1 9, 2 9, 3 6, 4 9, 5 4, 6 9, 7 8, 8 7, 9 8, 10 9, 11 6, 12 8, 13 9, 14 9, 15 9, 16 6, repeat not run
- Teardown:
  - smoke: not found
  - email: not found
  - 1: not found
  - 2: not found
  - 3: not found
  - 4: not found
  - 5: not found
  - 6: not found
  - 7: not found
  - 8: not found
  - 9: not found
  - 10: not found
  - 11: not found
  - 12: not found
  - 13: not found
  - 14: not found
  - 15: not found
  - 16: not found
  - repeat: not found
- Working copy:
- skipped 20260922120000: never applied on hosted (INC-266); 20260922121913 restates it
- patched 20260830091427 (10d1e2493220 -> ec49d56298cd): the service_role proof checks each table by oid
- patched 20260830091455 (ad9ad9937fb4 -> b84ca0b721a1): the service_role census checks each table by oid
- patched 20260924084437 (e04f82beab8f -> 29f7e1b761d4): PROOF 5 reports the size instead of refusing
- patched 20261029073342 (3dd11fa31551 -> 4287abad5fa3): CL-3's ahead check reads the clock just before the call (INC-1028, DEC-316)
- fixture 00000000000001: hosted defaults: no browser-role default grants; the platform's RLS event trigger (needed by 20260911223744 and by every table created without its own ENABLE ROW LEVEL SECURITY)
- fixture 20260809010129: four accounts: the bootstrap account by its landed e-mail and id, and three plain ones ([e-mail]); the auth server's text columns '' (INC-808)
- fixture 20260917112955: the currencies of ET, US, GB, DE, KE and CA (ISO 4217), which no migration sets
- fixture 20260921092129: a 'voltage' definition with the three digit-led values the proof names
- fixture 20260927045939: home country ET for the three plain accounts
- fixture 20260929201600: the sub-city Bole under Addis Ababa
- Parity:
not written
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local
pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1

## Lane smoke
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:37.889222+00, 2026-11-03 04:40:37.889222+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:38 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:38 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:38 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:38 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:38 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:34.933207+00, 2026-11-03 04:40:34.933207+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:32 | 274 | @effect/sql-pg | client backend | active | : | -- ===== D — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) ===== DO $proo
04:40:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:41:10.70395+00, 2026-11-03 04:41:10.70395+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:41:10 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_old text; v_new text; v_svc boolean; v_oid oid; v_src text; v_gate text; v_uid uuid := g
04:41:10 | 429 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:41:10 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:41:10 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:41:10 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:41:10 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:41:10 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 2
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:37.992296+00, 2026-11-03 04:40:37.992296+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:38 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:38 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:38 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:38 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:38 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:34.468545+00, 2026-11-03 04:40:34.468545+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:31 | 274 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
04:40:31 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:31 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:31 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:31 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:31 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 4
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:51.877035+00, 2026-11-03 04:40:51.877035+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:52 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 2. THE PRICES CREATE TABLE public.package_prices ( id uu
04:40:52 | 429 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:40:52 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:52 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:52 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:52 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:52 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 5
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:55.458517+00, 2026-11-03 04:40:55.458517+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:53 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
04:40:53 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:53 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:53 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:53 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:53 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:42:47.616736+00, 2026-11-03 04:42:47.616736+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:42:47 | 274 | @effect/sql-pg | client backend | active | : | CREATE OR REPLACE FUNCTION public.public_listing_json(l listings, p_viewer uuid) RETURNS jsonb LANGUAGE plpgsql STABLE S
04:42:47 | 430 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:42:47 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:42:47 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:42:47 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:42:47 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:42:47 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 7
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:43:26.486565+00, 2026-11-03 04:43:26.486565+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:43:26 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (NCAP-1…7): its own scratch seller and scratch staff only, rolled back whole, raising on failure. DO $proof$ DE
04:43:26 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:43:26 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:43:26 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:43:26 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:43:26 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 8
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:41:16.902372+00, 2026-11-03 04:41:16.902372+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:41:15 | 275 | @effect/sql-pg | client backend | active | : | GRANT EXECUTE ON FUNCTION public.admin_set_legal_settings(jsonb) TO authenticated
04:41:15 | 400 | PostgREST 16.4 | client backend | idle in transaction | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:41:15 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:41:15 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:41:15 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:41:15 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:41:15 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 9
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:41:10.946233+00, 2026-11-03 04:41:10.946233+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:41:10 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_id uuid := gen_random_uuid(); v_key text := 'e2e-m18-' || left(replace(v_id::text, '-', ''), 8); v_
04:41:10 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:41:10 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:41:10 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:41:10 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:41:10 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:33.860256+00, 2026-11-03 04:40:33.860256+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:34 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:34 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:34 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:34 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:34 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:41:52.284492+00, 2026-11-03 04:41:52.284492+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:41:50 | 274 | @effect/sql-pg | client backend | active | : | -- Bundle 19 turn 9c (2026-10-17). Tier A. D201 §4 — M2 PART c1 OF EIGHT: attr_import_plan's TEXT, CHUNK 1 OF 4. -- e2e-
04:41:50 | 378 | PostgREST 16.4 | client backend | idle in transaction | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:41:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:41:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:41:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:41:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:41:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 12
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:38.258082+00, 2026-11-03 04:40:38.258082+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:38 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:38 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:38 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:38 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:38 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:41:17.253146+00, 2026-11-03 04:41:17.253146+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:41:17 | 275 | @effect/sql-pg | client backend | active | : | -- Proof (INC-970): scratch e2e-n1 users only; every row it reads it creates; the sentinel rolls it all back. DO $proof$
04:41:17 | 430 | PostgREST 16.4 | client backend | active | : | WITH pks_uniques_cols AS ( SELECT conrelid, array_agg(key order by key) as cols FROM pg_constraint, LATERAL unnest(conke
04:41:17 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:41:17 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:41:17 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:41:17 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:41:17 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 14
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:45.248578+00, 2026-11-03 04:40:45.248578+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:45 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (JLOST-1…3): the close step's own predicate on scratch job_runs rows (negative ts, never a real -- run's), roll
04:40:45 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:45 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:45 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:45 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:45 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:41:09.796649+00, 2026-11-03 04:41:09.796649+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:41:09 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (INC-970): scratch e2e-n1 users only; every row it reads it creates; the sentinel rolls it all back. DO $proof$
04:41:09 | 431 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:41:09 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:41:09 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:41:09 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:41:09 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:41:09 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
```
Statement:
```text
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
```
Last 20 lines:
```text
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:40:48.437346+00, 2026-11-03 04:40:48.437346+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:40:46 | 273 | @effect/sql-pg | client backend | active | : | -- Bundle 12 (the tidy-up round), turn T7 (2026-10-13). Tier A. DEC-144 rule 2 (parent first) on a pointer change. -- e2
04:40:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:40:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:40:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:40:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:40:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
