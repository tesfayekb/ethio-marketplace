# Local backend proof (non-gating)

- Commit: `24808d5fa58e83a3f0513e173a0c40f8809e60df`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40787524583

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 93 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 105 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 83 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 106 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 97 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 106 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 94 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 101 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 98 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 94 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 96 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 105 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 94 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 111 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 101 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 96 | not confirmed; backend failure | 0 | 0 | 0 | 18 | 18 |
| TOTAL | — | — | — | 0 | 0 | 0 | 18 | 18 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 18 tests selected, 18 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 10, email 11, 1 9, 2 10, 3 8, 4 10, 5 8, 6 10, 7 11, 8 10, 9 10, 10 9, 11 11, 12 10, 13 10, 14 9, 15 11, 16 10, repeat 11
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

## Lane smoke
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:44696              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:51 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:34:51 | 206 |  |  | Activity:AutovacuumMain | 
23:34:51 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:34:51 | 209 |  |  | Activity:LogicalLauncherMain | 
23:34:51 | 202 |  |  | Activity:CheckpointerMain | 
23:34:51 | 203 |  |  | Activity:BgwriterMain | 
23:34:51 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane email
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:60756              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:20 | 232 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
23:35:20 | 206 |  |  | Activity:AutovacuumMain | 
23:35:20 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:35:20 | 209 |  |  | Activity:LogicalLauncherMain | 
23:35:20 | 202 |  |  | Activity:CheckpointerMain | 
23:35:20 | 203 |  |  | Activity:BgwriterMain | 
23:35:20 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 1
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:33900              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:47 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:34:47 | 206 |  |  | Activity:AutovacuumMain | 
23:34:47 | 299 |  | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories
23:34:47 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:34:47 | 209 |  |  | Activity:LogicalLauncherMain | 
23:34:47 | 202 |  |  | Activity:CheckpointerMain | 
23:34:47 | 203 |  |  | Activity:BgwriterMain | 
23:34:47 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 2
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:53184              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:05 | 231 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
23:35:05 | 213 |  |  | Activity:AutovacuumMain | 
23:35:05 | 215 | pg_cron scheduler |  | Extension:Extension | 
23:35:05 | 216 |  |  | Activity:LogicalLauncherMain | 
23:35:05 | 209 |  |  | Activity:CheckpointerMain | 
23:35:05 | 210 |  |  | Activity:BgwriterMain | 
23:35:05 | 212 |  |  | Activity:WalWriterMain | 
```

## Lane 3
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:37820              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:37:08 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:37:08 | 212 |  |  | Activity:AutovacuumMain | 
23:37:08 | 294 |  | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories
23:37:08 | 215 |  |  | Activity:LogicalLauncherMain | 
23:37:08 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:37:08 | 208 |  |  | Activity:CheckpointerMain | 
23:37:08 | 209 |  |  | Activity:BgwriterMain | 
23:37:08 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 4
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:46762              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:00 | 230 | @effect/sql-pg | active | : | -- Proofs — scratch rows inside a block that always rolls back. DO $p$ DECLARE v_s text := 'm8b-proof-' || substr(md5(ra
23:35:00 | 212 |  |  | Activity:AutovacuumMain | 
23:35:00 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:35:00 | 215 |  |  | Activity:LogicalLauncherMain | 
23:35:00 | 208 |  |  | Activity:CheckpointerMain | 
23:35:00 | 209 |  |  | Activity:BgwriterMain | 
23:35:00 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 5
- No JSON results; smoke skipped

## Lane 5
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:37820               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:47 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:34:47 | 206 |  |  | Activity:AutovacuumMain | 
23:34:47 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:34:47 | 209 |  |  | Activity:LogicalLauncherMain | 
23:34:47 | 202 |  |  | Activity:CheckpointerMain | 
23:34:47 | 203 |  |  | Activity:BgwriterMain | 
23:34:47 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 6
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:53446              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:18 | 230 | @effect/sql-pg | active | : | -- ===== C — proofs ===== DO $proof$ DECLARE v_role text; v_cols text; v_lints jsonb; v_n int; v_t text; BEGIN -- C1: no
23:35:18 | 212 |  |  | Activity:AutovacuumMain | 
23:35:18 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:35:18 | 215 |  |  | Activity:LogicalLauncherMain | 
23:35:18 | 208 |  |  | Activity:CheckpointerMain | 
23:35:18 | 209 |  |  | Activity:BgwriterMain | 
23:35:18 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 7
- No JSON results; smoke skipped

## Lane 7
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:55198               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:07 | 232 | @effect/sql-pg | active | : | RESET ALL
23:35:07 | 206 |  |  | Activity:AutovacuumMain | 
23:35:07 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:35:07 | 209 |  |  | Activity:LogicalLauncherMain | 
23:35:07 | 202 |  |  | Activity:CheckpointerMain | 
23:35:07 | 203 |  |  | Activity:BgwriterMain | 
23:35:07 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 8
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:46530              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:14 | 230 | @effect/sql-pg | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
23:35:14 | 212 |  |  | Activity:AutovacuumMain | 
23:35:14 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:35:14 | 215 |  |  | Activity:LogicalLauncherMain | 
23:35:14 | 208 |  |  | Activity:CheckpointerMain | 
23:35:14 | 209 |  |  | Activity:BgwriterMain | 
23:35:14 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 9
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:50576               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:54 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:34:54 | 206 |  |  | Activity:AutovacuumMain | 
23:34:54 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:34:54 | 209 |  |  | Activity:LogicalLauncherMain | 
23:34:54 | 202 |  |  | Activity:CheckpointerMain | 
23:34:54 | 203 |  |  | Activity:BgwriterMain | 
23:34:54 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 10
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:33382              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:57 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:34:57 | 212 |  |  | Activity:AutovacuumMain | 
23:34:57 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:34:57 | 215 |  |  | Activity:LogicalLauncherMain | 
23:34:57 | 208 |  |  | Activity:CheckpointerMain | 
23:34:57 | 209 |  |  | Activity:BgwriterMain | 
23:34:57 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 11
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:59670              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:47 | 231 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
23:34:47 | 206 |  |  | Activity:AutovacuumMain | 
23:34:47 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:34:47 | 209 |  |  | Activity:LogicalLauncherMain | 
23:34:47 | 202 |  |  | Activity:CheckpointerMain | 
23:34:47 | 203 |  |  | Activity:BgwriterMain | 
23:34:47 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 12
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:32958              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:36:56 | 231 | @effect/sql-pg | active | : | GRANT ALL ON FUNCTION public.admin_undo_listing_edit(uuid, timestamptz, text) TO service_role
23:36:56 | 213 |  |  | Activity:AutovacuumMain | 
23:36:56 | 215 | pg_cron scheduler |  | Extension:Extension | 
23:36:56 | 216 |  |  | Activity:LogicalLauncherMain | 
23:36:56 | 209 |  |  | Activity:CheckpointerMain | 
23:36:56 | 210 |  |  | Activity:BgwriterMain | 
23:36:56 | 212 |  |  | Activity:WalWriterMain | 
```

## Lane 13
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:56676              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:09 | 230 | @effect/sql-pg | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
23:35:09 | 212 |  |  | Activity:AutovacuumMain | 
23:35:09 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:35:09 | 215 |  |  | Activity:LogicalLauncherMain | 
23:35:09 | 208 |  |  | Activity:CheckpointerMain | 
23:35:09 | 209 |  |  | Activity:BgwriterMain | 
23:35:09 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 14
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:59970              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:34:50 | 232 | @effect/sql-pg | active | : | CREATE TABLE public.legal_versions ( id uuid PRIMARY KEY DEFAULT gen_random_uuid(), document_id uuid NOT NULL REFERENCES
23:34:50 | 207 |  |  | Activity:AutovacuumMain | 
23:34:50 | 209 | pg_cron scheduler |  | Extension:Extension | 
23:34:50 | 210 |  |  | Activity:LogicalLauncherMain | 
23:34:50 | 203 |  |  | Activity:CheckpointerMain | 
23:34:50 | 204 |  |  | Activity:BgwriterMain | 
23:34:50 | 206 |  |  | Activity:WalWriterMain | 
```

## Lane 15
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:60938               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:09 | 231 | @effect/sql-pg | active | : | -- ===== C — proofs ===== DO $proof$ DECLARE v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text
23:35:09 | 206 |  |  | Activity:AutovacuumMain | 
23:35:09 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:35:09 | 209 |  |  | Activity:LogicalLauncherMain | 
23:35:09 | 202 |  |  | Activity:CheckpointerMain | 
23:35:09 | 203 |  |  | Activity:BgwriterMain | 
23:35:09 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 16
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0                127.0.0.1:51420              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:09 | 206 |  |  | Activity:AutovacuumMain | 
23:35:09 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:35:09 | 209 |  |  | Activity:LogicalLauncherMain | 
23:35:09 | 202 |  |  | Activity:CheckpointerMain | 
23:35:09 | 203 |  |  | Activity:BgwriterMain | 
23:35:09 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane repeat
## Migration/start failure
Last migration line: Applying migration 20261028230748_23f4ae4e-f7bc-4a94-a8ef-24cbddcb47a6.sql...
```text
      RAISE EXCEPTION 'INC-951 3a proof (accept_legal): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (3) remove_listing_photo
    PERFORM public.remove_listing_photo(v_lst, v_p1);
    v_msg := NULL;
    BEGIN
      PERFORM public.remove_listing_photo(v_lst, v_p2);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.listing_photos WHERE listing_id = v_lst;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1
       OR NOT EXISTS (SELECT 1 FROM public.listing_photos WHERE id = v_p2) THEN
      RAISE EXCEPTION 'INC-951 3a proof (remove_listing_photo): % photos %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (4) begin_impersonation (the first session is ended so the second meets the gate)
    PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    UPDATE public.impersonation_sessions SET ended_at = now() WHERE actor_id = v_uid;
    v_msg := NULL;
    BEGIN
      PERFORM public.begin_impersonation(v_target, 'e2e proof session');
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.impersonation_sessions WHERE actor_id = v_uid;
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (begin_impersonation): % sessions %', coalesce(v_msg, 'success'), v_n;
    END IF;

    -- (5) admin_export_legal_acceptances (first pages)
    PERFORM public.admin_export_legal_acceptances(v_va);
    v_msg := NULL;
    BEGIN
      PERFORM public.admin_export_legal_acceptances(v_va);
    EXCEPTION WHEN raise_exception THEN v_msg := SQLERRM;
    END;
    SELECT count(*) INTO v_n FROM public.audit_log WHERE actor_id = v_uid AND action = 'legal.acceptances_exported';
    IF v_msg IS DISTINCT FROM 'rateLimited' OR v_n <> 1 THEN
      RAISE EXCEPTION 'INC-951 3a proof (admin_export_legal_acceptances): % rows %', coalesce(v_msg, 'success'), v_n;
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (54320-54329):
TIME-WAIT  0      0               127.0.0.1:58856              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:35:20 | 231 | @effect/sql-pg | active | : | REVOKE ALL ON TABLE public.feed_index FROM PUBLIC, anon, authenticated
23:35:20 | 206 |  |  | Activity:AutovacuumMain | 
23:35:20 | 208 | pg_cron scheduler |  | : | 
23:35:20 | 209 |  |  | Activity:LogicalLauncherMain | 
23:35:20 | 202 |  |  | Activity:CheckpointerMain | 
23:35:20 | 203 |  |  | Activity:BgwriterMain | 
23:35:20 | 205 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
