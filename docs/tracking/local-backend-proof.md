# Local backend proof (non-gating)

- Commit: `f95f3c00ad1ea92452718d8aafc12b67f4ca7945`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41585603042

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 57 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 49 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 65 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 64 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 66 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 56 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 6, email 4, 1 5, 2 9, 3 7, 4 9, 5 9, 6 7, 7 9, 8 8, 9 9, 10 4, 11 9, 12 9, 13 9, 14 8, 15 6, 16 6, repeat not run
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
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:53 | 274 | @effect/sql-pg | client backend | active | : | CREATE FUNCTION public.ai_record_call( p_feature text, p_task text, p_task_version integer, p_model text, p_actor uuid, 
05:46:53 | 390 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:46:53 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:53 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:53 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:53 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:53 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane email
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:47:05 | 274 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.transition_listing(uuid, text) FROM PUBLIC, anon
05:47:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:47:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:47:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:47:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:47:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:49 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
05:46:49 | 368 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:46:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 2
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:48 | 274 | @effect/sql-pg | client backend | active | : | DO $proof$ DECLARE v_fn text; v_types text; v_md5 text; v_door_md5 text; v_acl text; v_oid oid; v_core oid; v_src text; 
05:46:48 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:48 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:48 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:48 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:48 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:59 | 274 | @effect/sql-pg | client backend | active | : | -- ===== C — proofs ===== DO $proof$ DECLARE v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text
05:46:59 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:59 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:59 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:59 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:59 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 4
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:49 | 273 | @effect/sql-pg | client backend | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
05:46:49 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:49 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:49 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:49 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:49 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 5
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:53 | 430 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:46:53 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:53 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:53 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:53 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:53 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:47:00 | 275 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the resolver's heade
05:47:00 | 412 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:47:00 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:47:00 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:47:00 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:47:00 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:47:00 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 7
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:55 | 275 | @effect/sql-pg | client backend | active | : | -- PROOF (INC-793): scratch rows only, rolled back by the sentinel. DO $proof$ DECLARE v_uid uuid := gen_random_uuid(); 
05:46:55 | 428 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
05:46:55 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:55 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:55 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:55 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:46:55 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:50 | 273 | @effect/sql-pg | client backend | active | : | -- ── 10. After: the same timings on the new rules ─────────────────────── DO $t$ DECLARE v_name text; i int; t0 timesta
05:46:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:47:08 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (NCQ-9…12): its own scratch users only; the queue is read through the core scoped to them -- (the door's allow 
05:47:08 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:47:08 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:47:08 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:47:08 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:47:08 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:08 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
05:46:08 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:08 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:08 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:08 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:08 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:47 | 274 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.require_recent_password(interval) FROM PUBLIC, anon, authenticated
05:46:47 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:47 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:47 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:47 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:47 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:48:41 | 275 | @effect/sql-pg | client backend | active | : | -- PROOF (T1 M1): scratch rows only, rolled back by the sentinel. -- (a) the header: VOLATILE, SECURITY DEFINER, search_
05:48:41 | 438 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:48:41 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:48:41 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:48:41 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
05:48:41 | 204 |  | background writer |  | Activity:BgwriterMain | 
05:48:41 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 13
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:52 | 274 | @effect/sql-pg | client backend | active | : | CREATE TABLE public.ai_calls_prune_runs ( id bigserial PRIMARY KEY, ran_at timestamptz NOT NULL DEFAULT now(), deleted i
05:46:52 | 433 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:46:52 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:52 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:52 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:52 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:52 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 14
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    EXCEPTION WHEN OTHERS THEN v_state := SQLSTATE;
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:48:51 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:48:51 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:48:51 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:48:51 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:48:51 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:32 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
05:46:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 16
- Step failure:
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql...
Cause:
```text
ERROR: function public.admin_save_listing_package(text, unknown, unknown, integer, boolean, boolean, boolean, unknown, integer, unknown, boolean, integer) does not exist (SQLSTATE 42883)
```
Statement:
```text
At statement: 40
-- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27).
--   (a) the resolver's header and grants (STABLE, INVOKER, search_path public; anon, authenticated,
--       service_role); the three doors' (VOLATILE, DEFINER; closed to PUBLIC and anon, open to
--       authenticated and service_role); the old save signature gone; the browser roles read the
--       new columns of listing_packages and every column of level_overrides but created_by and
--       updated_by, hold no write, tier and label_key are gone; row security on; the three levels
--       carry their names and perks, the old keys are gone.
--   (b) a price row follows a renamed key (the foreign key cascades).
--   (c) the resolver, per column, on a scratch level over a scratch root → leaf → leaf2 and
--       another root, in a scratch market XZ: the level's values; (root, any) days; (any, XZ)
(366 lines omitted)
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END;
    RESET ROLE;
    IF v_state IS DISTINCT FROM '42501' THEN RAISE EXCEPTION 'P-1b M-a proof (i): anon read created_by (%)', coalesce(v_state, 'no error'); END IF;

    RAISE EXCEPTION 'p1b-ma-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'p1b-ma-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
05:46:30 | 391 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
05:46:30 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
05:46:30 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
05:46:30 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
05:46:30 | 203 |  | background writer |  | Activity:BgwriterMain | 
05:46:30 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a stmt 40; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
