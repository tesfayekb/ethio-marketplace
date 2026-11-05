# Local backend proof (non-gating)

- Commit: `5ac4f8b528586435fb11fc5c2ca22b7b0e793397`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41996927177

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 65 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 52 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 62 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 51 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 75 | 75 |
| TOTAL | — | — | — | 0 | 0 | 0 | 75 | 75 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Repeat: each 2 on both projects; 75 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 3 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 7, email 9, 1 6, 2 6, 3 6, 4 9, 5 8, 6 9, 7 9, 8 9, 9 5, 10 6, 11 6, 12 5, 13 9, 14 9, 15 9, 16 9, repeat 9
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
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:49:50.738 UTC [275] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:49:50.738 UTC [275] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_affc9152, 10, t, t, f, 9000, null, 2026-11-05 08:49:50.732445+00, 2026-11-05 08:49:50.732445+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:49:50.738 UTC [275] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:49:50.738 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:49:50 | 275 | @effect/sql-pg | client backend | active | IO:WalSync | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
08:49:50 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:49:50 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:49:50 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:49:50 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:49:50 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane email
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:38.896 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:38.896 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_b772060e, 10, t, t, f, 9000, null, 2026-11-05 08:48:38.889985+00, 2026-11-05 08:48:38.889985+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:38.896 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:38.896 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:39 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 2. PROOFS -- (a) the header and the grants (catalog fact
08:48:39 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:39 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:39 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:39 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:39 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 1
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:48.987 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:48.987 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_50f641c0, 10, t, t, f, 9000, null, 2026-11-05 08:48:48.980339+00, 2026-11-05 08:48:48.980339+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:48.987 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:48.987 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:45 | 274 | @effect/sql-pg | client backend | active | : | -- ===== C — proofs ===== DO $proof$ DECLARE v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text
08:48:45 | 380 | PostgREST 16.4 | client backend | active | : | WITH pks_uniques_cols AS ( SELECT conrelid, array_agg(key order by key) as cols FROM pg_constraint, LATERAL unnest(conke
08:48:45 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:45 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:45 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:45 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:45 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 2
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:08.273 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:08.273 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_b3c7e58d, 10, t, t, f, 9000, null, 2026-11-05 08:48:08.267614+00, 2026-11-05 08:48:08.267614+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:08.273 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:08.273 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:05 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
08:48:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:11.943 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:11.943 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_2d7f8ef1, 10, t, t, f, 9000, null, 2026-11-05 08:48:11.939035+00, 2026-11-05 08:48:11.939035+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:11.943 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:11.943 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:09 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:09 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:09 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:09 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:09 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 4
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:51.588 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:51.588 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_f5b85725, 10, t, t, f, 9000, null, 2026-11-05 08:48:51.582457+00, 2026-11-05 08:48:51.582457+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:51.588 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:51.588 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 5
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:49:34.221 UTC [273] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:49:34.221 UTC [273] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_21fa6d0d, 10, t, t, f, 9000, null, 2026-11-05 08:49:34.214361+00, 2026-11-05 08:49:34.214361+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:49:34.221 UTC [273] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:49:34.221 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:49:32 | 273 | @effect/sql-pg | client backend | active | : | -- B8 ───────────────────────────────────────────────────────────────────────────────────────────────────────── DO $proo
08:49:32 | 419 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
08:49:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:49:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:49:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:49:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:49:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:21.834 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:21.834 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_a5b464a1, 10, t, t, f, 9000, null, 2026-11-05 08:48:21.829299+00, 2026-11-05 08:48:21.829299+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:21.834 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:21.834 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:22 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:22 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:22 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:22 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:22 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 7
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:50:42.965 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:50:42.965 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_af36f302, 10, t, t, f, 9000, null, 2026-11-05 08:50:42.958974+00, 2026-11-05 08:50:42.958974+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:50:42.965 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:50:42.965 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:50:43 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:50:43 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:50:43 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:50:43 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:50:43 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 8
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:32.421 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:32.421 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_870be97a, 10, t, t, f, 9000, null, 2026-11-05 08:48:32.415822+00, 2026-11-05 08:48:32.415822+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:32.421 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:32.421 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:32 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the resolver's heade
08:48:32 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:32 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:32 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:32 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:32 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:47:57.370 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:47:57.370 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_70275064, 10, t, t, f, 9000, null, 2026-11-05 08:47:57.366558+00, 2026-11-05 08:47:57.366558+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:47:57.370 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:47:57.370 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:47:57 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (T1 M1): scratch rows only, rolled back by the sentinel. -- (a) the header: VOLATILE, SECURITY DEFINER, search_
08:47:57 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:47:57 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:47:57 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:47:57 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:47:57 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:09.847 UTC [273] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:09.847 UTC [273] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_b0e85e5f, 10, t, t, f, 9000, null, 2026-11-05 08:48:09.842568+00, 2026-11-05 08:48:09.842568+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:09.847 UTC [273] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:09.847 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:06 | 273 | @effect/sql-pg | client backend | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
08:48:06 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:06 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:06 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:06 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:06 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:20.312 UTC [275] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:20.312 UTC [275] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_4a055854, 10, t, t, f, 9000, null, 2026-11-05 08:48:20.30845+00, 2026-11-05 08:48:20.30845+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:20.312 UTC [275] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:20.312 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:16 | 275 | @effect/sql-pg | client backend | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
08:48:16 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:16 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:16 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:16 | 204 |  | background writer |  | Activity:BgwriterMain | 
08:48:16 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:47:51.895 UTC [273] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:47:51.895 UTC [273] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_ea807205, 10, t, t, f, 9000, null, 2026-11-05 08:47:51.89166+00, 2026-11-05 08:47:51.89166+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:47:51.895 UTC [273] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:47:51.895 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:47:52 | 376 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
08:47:52 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:47:52 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:47:52 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:47:52 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:47:52 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 13
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:18.134 UTC [275] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:18.134 UTC [275] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_50f5a3c2, 10, t, t, f, 9000, null, 2026-11-05 08:48:18.128668+00, 2026-11-05 08:48:18.128668+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:18.134 UTC [275] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:18.134 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:18 | 275 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 2. THE MARKETS CREATE TABLE public.market_settings ( id 
08:48:18 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:18 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:18 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:18 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:18 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:31.893 UTC [273] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:31.893 UTC [273] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_fd7af386, 10, t, t, f, 9000, null, 2026-11-05 08:48:31.886282+00, 2026-11-05 08:48:31.886282+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:31.893 UTC [273] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:31.893 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:31 | 207 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:31 | 208 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:31 | 201 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:31 | 202 |  | background writer |  | Activity:BgwriterMain | 
08:48:31 | 204 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 15
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:50:25.236 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:50:25.236 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_c757c4ad, 10, t, t, f, 9000, null, 2026-11-05 08:50:25.230829+00, 2026-11-05 08:50:25.230829+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:50:25.236 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:50:25.236 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:50:25 | 432 | PostgREST 16.4 | client backend | idle in transaction | Client:ClientRead | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
08:50:25 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:50:25 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:50:25 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:50:25 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:50:25 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:36.750 UTC [275] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:36.750 UTC [275] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_6f520b76, 10, t, t, f, 9000, null, 2026-11-05 08:48:36.743484+00, 2026-11-05 08:48:36.743484+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:36.750 UTC [275] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:36.750 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END LOOP;
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:37 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:37 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:37 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:37 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:37 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane repeat
- Step failure:
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]

## Lane repeat
## Migration/start failure
Last migration line: Applying migration 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb.sql...
Cause:
```text
ERROR: new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check" (SQLSTATE 23514)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-05 08:48:24.474 UTC [274] postgres@postgres ERROR:  new row for relation "listing_packages" violates check constraint "listing_packages_perks_by_kind_check"
172.18.0.1 2026-11-05 08:48:24.474 UTC [274] postgres@postgres DETAIL:  Failing row contains (e2e_mig_lv_57848d17, 10, t, t, f, 9000, null, 2026-11-05 08:48:24.467338+00, 2026-11-05 08:48:24.467338+00, level, E2E P2 level, null, null, null, f, null, f).
172.18.0.1 2026-11-05 08:48:24.474 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.listing_packages (key, kind, name_en, days, enabled, self_serve, extends_lifetime, sort) VALUES
	      (v_lv, 'level', 'E2E P2 level', 10, true, true, false, 9000),
	      (v_r0, 'reach', 'E2E P2 reach 0', 30, true, true, false, 9001),
	      (v_r1, 'reach', 'E2E P2 reach 1', 15, true, true, false, 9002)"
	PL/pgSQL function inline_code_block line 66 at SQL statement
172.18.0.1 2026-11-05 08:48:24.474 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 2. PROOFS
(210 statement lines dropped)
```
Statement:
```text
At statement: 5
-- ------------------------------------------------------------ 2. PROOFS
-- (a) the header and the grants (catalog facts); (b) the core on scratch ads, scoped by p_only: a level ended with a
-- slot → the baseline, live, its revision and audit row; a second level ended without a slot → the baseline,
-- paused through the state machine (clock kept), audit level_paused, one notice; a reach ended → the three
-- columns NULL, the places trimmed (the primary kept; part 2 proves the walk), the removed ids in the
-- revision, the audit row, the feed queue; a level ending in two days → one level_ending notice, the end
-- remembered; an expired ad → expired; an ad outside the scope untouched; a second run moves nothing.
DO $proof$
DECLARE
  v_core    regprocedure := 'public.designation_sweep_core(uuid[])'::regprocedure;
(191 lines omitted)
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_n.n_expired + v_n.n_level_ended + v_n.n_level_paused + v_n.n_reach_ended + v_n.n_reminded <> 0 OR v_snap2 IS DISTINCT FROM v_snap THEN
      RAISE EXCEPTION 'P-2 M-1c part 3 proof (b): the second run moved something (% -> %)', v_snap, v_snap2;
    END IF;
    RAISE EXCEPTION 'p2-m1c3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'p2-m1c3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
08:48:22 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
08:48:22 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
08:48:22 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
08:48:22 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
08:48:22 | 203 |  | background writer |  | Activity:BgwriterMain | 
08:48:22 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261105080106_42c3a28d-f534-41c9-b85a-aeeefcba3ebb stmt 5; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
