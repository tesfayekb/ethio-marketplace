# Local backend proof (non-gating)

- Commit: `fa42235995c3136370ebc6e58761f694386cf31d`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41579268496

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 76 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 68 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 9, 1 9, 2 6, 3 9, 4 6, 5 6, 6 8, 7 6, 8 8, 9 6, 10 6, 11 8, 12 6, 13 6, 14 9, 15 9, 16 8, repeat not run
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
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:53.238941+00, 2026-11-03 04:55:53.238941+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:51 | 274 | @effect/sql-pg | client backend | active | : | -- ===== B — admin_set_ai_feature, whole ===== CREATE OR REPLACE FUNCTION public.admin_set_ai_feature( p_feature text, p
04:55:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:55:51 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
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
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:06.459061+00, 2026-11-03 04:56:06.459061+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:04 | 427 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:56:04 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:04 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:04 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:04 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:04 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 1
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
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
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:59.506159+00, 2026-11-03 04:55:59.506159+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:00 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:00 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:00 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:00 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:00 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:06.0342+00, 2026-11-03 04:56:06.0342+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:03 | 272 | @effect/sql-pg | client backend | active | : | -- Proofs — a scratch admin and scratch rows inside a block that always rolls back. DO $p$ DECLARE v_uid uuid := gen_ran
04:56:03 | 207 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:03 | 208 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:03 | 201 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:03 | 202 |  | background writer |  | Activity:BgwriterMain | 
04:56:03 | 204 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:59.54239+00, 2026-11-03 04:55:59.54239+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:59 | 275 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): its own scratch e2e-n1b2 seller (v_u) only, the legacy mixed-case alias shape included (INC-986); ro
04:55:59 | 432 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:55:59 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:59 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:59 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:59 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:55:59 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:03.291554+00, 2026-11-03 04:56:03.291554+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:00 | 274 | @effect/sql-pg | client backend | active | : | -- 9. Proofs. Behaviour on listings is proven by e2e/feed-index.spec.ts (a proof cannot create a listing: -- listings.se
04:56:00 | 378 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:56:00 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:00 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:00 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:00 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:00 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 5
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:53.855059+00, 2026-11-03 04:55:53.855059+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:51 | 274 | @effect/sql-pg | client backend | active | IO:WalSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
04:55:51 | 376 | PostgREST 16.4 | client backend | idle in transaction | Client:ClientRead | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:55:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:55:51 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:08.459621+00, 2026-11-03 04:56:08.459621+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:04 | 403 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:56:04 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:04 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:04 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:04 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:04 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 7
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:52.834748+00, 2026-11-03 04:55:52.834748+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:51 | 275 | @effect/sql-pg | client backend | active | : | UPDATE public.protected_names n SET country_code = c.code FROM public.countries c WHERE n.country <> 'International' AND
04:55:51 | 388 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:55:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:55:51 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:57.751868+00, 2026-11-03 04:55:57.751868+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:53 | 274 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
04:55:53 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:53 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:53 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:53 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:55:53 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
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
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:58:35.316469+00, 2026-11-03 04:58:35.316469+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:58:33 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:58:33 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:58:33 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:58:33 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:58:33 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
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
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:54.448822+00, 2026-11-03 04:55:54.448822+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:51 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:51 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:51 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:51 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:55:51 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:55.424408+00, 2026-11-03 04:55:55.424408+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:55 | 411 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:55:55 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:55 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:55 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:55 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:55:55 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 12
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:55:51.241681+00, 2026-11-03 04:55:51.241681+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:55:48 | 274 | @effect/sql-pg | client backend | active | : | -- ===== C — proofs (catalogue reads, and calls with no session or a scratch identity that holds nothing) ===== DO $proo
04:55:48 | 379 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:55:48 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:55:48 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:55:48 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:55:48 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:55:48 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 13
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
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
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:24.890848+00, 2026-11-03 04:56:24.890848+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:23 | 274 | @effect/sql-pg | client backend | active | : | CREATE OR REPLACE FUNCTION public.listing_counts(p_listing_id uuid) RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFIN
04:56:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:58:06.570198+00, 2026-11-03 04:58:06.570198+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:58:05 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
04:58:05 | 426 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:58:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:58:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:58:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:58:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:58:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 15
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
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
Applying migration 20261102052535_4fb5d636-3ae7-42f3-8737-290ae63e7237.sql...
Applying migration 20261102081500_ecdb5eab-5fad-4802-aa10-5ecefb0d8cf6.sql...
Applying migration 20261102081600_502ee113-368f-4016-9c4c-2ed447989599.sql...
Applying migration 20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql...
Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
ERROR: null value in column "tier" of relation "listing_packages" violates not-null constraint (SQLSTATE 23502)
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:09.610058+00, 2026-11-03 04:56:09.610058+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:10 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:10 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:10 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:10 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:10 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
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
Failing row contains (regular, null, 30, t, t, t, null, 0, null, 2026-11-03 04:56:26.393992+00, 2026-11-03 04:56:26.393992+00, level, Regular, መደበኛ, 4, standard, f, null).
At statement: 12
INSERT INTO public.listing_packages
  (key, kind, name_en, name_am, days, max_photos, placement, badge, enabled, self_serve, extends_lifetime, sort)
VALUES ('regular', 'level', 'Regular', 'መደበኛ', 30, 4, 'standard', false, true, true, true, 0)
ON CONFLICT (key) DO NOTHING
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:56:23 | 274 | @effect/sql-pg | client backend | active | : | -- ===== E6 — proofs (scratch rows only; no auth.users row; claims are a random id) ===== DO $proof$ DECLARE v_key text 
04:56:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:56:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:56:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:56:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:56:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 12; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
