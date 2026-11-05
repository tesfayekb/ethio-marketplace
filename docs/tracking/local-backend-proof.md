# Local backend proof (non-gating)

- Commit: `ae30c327d615da521c8e42140bc7abd73d821814`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41969678989

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 67 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 55 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 65 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 58 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 59 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 67 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 50 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 56 | not confirmed; backend failure | 0 | 0 | 0 | 15 | 15 |
| TOTAL | — | — | — | 0 | 0 | 0 | 15 | 15 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: each 5 on both projects; 15 tests selected, 15 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 9, email 8, 1 8, 2 9, 3 5, 4 6, 5 5, 6 7, 7 7, 8 6, 9 6, 10 4, 11 6, 12 9, 13 9, 14 5, 15 8, 16 4, repeat 5
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
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:39 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:39 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:39 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:39 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:39 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:23 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (INC-970, INC-980): it reads only the job_runs rows it created (by the returned id) and net's queue -- filtered
04:47:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:49:26 | 275 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
04:49:26 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:49:26 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:49:26 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:49:26 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:49:26 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:42 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:42 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:42 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:42 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:42 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:15 | 274 | @effect/sql-pg | client backend | active | IO:WalInitSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
04:47:15 | 360 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:47:15 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:15 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:15 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:15 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:15 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 4
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:28 | 275 | @effect/sql-pg | client backend | active | : | -- ── 10. Proofs: scratch rows inside a rolled-back block ───────────────── DO $p$ DECLARE c_a uuid; a_kind uuid; a_cond
04:47:28 | 378 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:47:28 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:28 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:28 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:28 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:47:28 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 5
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:03 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real -- row read, G27), rol
04:47:03 | 375 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:47:03 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:03 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:03 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:03 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:03 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:48:43 | 274 | @effect/sql-pg | client backend | active | IO:WalSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
04:48:43 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:48:43 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:48:43 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:48:43 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:48:43 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 7
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:46 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (INC-970, INC-980): scratch e2e-n1b users and scratch job rows only, read by their own ids; job_leases and -- j
04:47:46 | 408 | PostgREST 16.4 | client backend | idle in transaction | Client:ClientRead | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:47:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 8
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:49:15 | 274 | @effect/sql-pg | client backend | active | IO:DataFileExtend | SELECT public.name_folds_rebuild()
04:49:15 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:49:15 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:49:15 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:49:15 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:49:15 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:16 | 274 | @effect/sql-pg | client backend | active | : | SELECT public.name_folds_rebuild()
04:47:16 | 381 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:47:16 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:16 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:16 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:16 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:16 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 10
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:49:23 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
04:49:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:49:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:49:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:49:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:49:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:48:12 | 275 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.attr_import_plan(jsonb, jsonb, text) FROM authenticated
04:48:12 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:48:12 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:48:12 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
04:48:12 | 204 |  | background writer |  | Activity:BgwriterMain | 
04:48:12 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:38 | 428 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:47:38 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:38 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:38 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:38 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:38 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 13
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:56 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-c): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the door's header an
04:47:56 | 430 | PostgREST 16.4 | client backend | active | : | WITH pks_uniques_cols AS ( SELECT conrelid, array_agg(key order by key) as cols FROM pg_constraint, LATERAL unnest(conke
04:47:56 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:56 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:56 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:56 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:56 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 14
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:46:46 | 274 | @effect/sql-pg | client backend | active | : | -- ===== E6 — proofs (scratch rows only; no auth.users row; claims are a random id) ===== DO $proof$ DECLARE v_key text 
04:46:46 | 355 | PostgREST 16.4 | client backend | active | Lock:relation | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
04:46:46 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:46:46 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:46:46 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:46:46 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:46:46 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 15
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:55 | 273 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): its own scratch e2e-n1b2 seller (v_u) and scratch staff (v_u2, role v_role, session -- v_sess) only,
04:47:55 | 418 | PostgREST 16.4 | client backend | active | : | with role_setting as ( select r.rolname, unnest(r.rolconfig) as setting from pg_auth_members m join pg_roles r on r.oid 
04:47:55 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:55 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:55 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:55 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:55 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:16 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
04:47:16 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:16 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:16 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:16 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:16 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane repeat
- Step failure:
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]

## Lane repeat
## Migration/start failure
Last migration line: Applying migration 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd.sql...
Cause:
```text
ERROR: P-2 rank proof (a): the trigger differs (CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild()) (SQLSTATE P0001)
```
Statement:
```text
At statement: 24
-- PROOF: (a) the table (RLS, no browser privilege, service_role, the one policy, the cascading key),
-- the trigger (after insert, delete, update of sort, key, kind; per statement), the headers and
-- grants of the four functions (refresh volatile, check stable sql), feed_tier_rank gone; (b) the
-- seeded ranks regular 0, featured 1, premium 2, one row per level — feed_tier_rank's numbers, so no
-- live feed row changed (a plain INSERT seeds: nothing queued or refreshed); (c) scratch rows (an XZ
-- market, a seller, a leaf, a premium ad and a baseline ad, both live): a level sorted between
-- featured and premium takes 2 and premium 3 — read into variables, never beside a column — the
-- premium ad is queued, the baseline ad not, and after feed_reindex_sweep(500) the premium ad's feed
-- row carries 3; (d) a sort change that moves no rank queues nothing; (e) a disabled level keeps its
-- rank; deleting it puts premium back at 2 and queues the premium ad again. Everything, the
(161 lines omitted)
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
```
Last 20 lines:
```text
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-rank-proof-ok' THEN RAISE; END IF;
  END;
  IF EXISTS (SELECT 1 FROM public.listing_packages WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.level_ranks WHERE key = v_lv)
     OR EXISTS (SELECT 1 FROM public.listings WHERE id IN (v_p, v_r))
     OR EXISTS (SELECT 1 FROM public.countries WHERE code = v_code) THEN
    RAISE EXCEPTION 'P-2 rank proof: a scratch row survived the rollback';
  END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
04:47:32 | 274 | @effect/sql-pg | client backend | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
04:47:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
04:47:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
04:47:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
04:47:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
04:47:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261104153313_f5c8063d-3369-43fe-acd2-20a1b6e5b7dd stmt 24; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
