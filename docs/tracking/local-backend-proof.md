# Local backend proof (non-gating)

- Commit: `573368b2060f23f0ec228cdc6454f557e5b1a8d1`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40785320552

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 92 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 109 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 104 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 88 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 110 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 110 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 108 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 85 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 110 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 88 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 106 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 100 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 110 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 90 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 99 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 86 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 0 | 0 | 0 | 0 | 0 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 10, email 9, 1 10, 2 7, 3 11, 4 10, 5 11, 6 10, 7 6, 8 11, 9 6, 10 10, 11 10, 12 8, 13 11, 14 7, 15 8, 16 9, repeat not run
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
TIME-WAIT  0      0               127.0.0.1:41356              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:40 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:19:40 | 206 |  |  | Activity:AutovacuumMain | 
23:19:40 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:40 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:40 | 202 |  |  | Activity:CheckpointerMain | 
23:19:40 | 203 |  |  | Activity:BgwriterMain | 
23:19:40 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:45806               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:20:30 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
23:20:30 | 206 |  |  | Activity:AutovacuumMain | 
23:20:30 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:20:30 | 209 |  |  | Activity:LogicalLauncherMain | 
23:20:30 | 202 |  |  | Activity:CheckpointerMain | 
23:20:30 | 203 |  |  | Activity:BgwriterMain | 
23:20:30 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 1
- No JSON results; smoke skipped

## Lane 1
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
TIME-WAIT  0      0               127.0.0.1:55770              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:44 | 230 | @effect/sql-pg | active | : | RESET ALL
23:19:44 | 212 |  |  | Activity:AutovacuumMain | 
23:19:44 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:19:44 | 215 |  |  | Activity:LogicalLauncherMain | 
23:19:44 | 208 |  |  | Activity:CheckpointerMain | 
23:19:44 | 209 |  |  | Activity:BgwriterMain | 
23:19:44 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:55252              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:36 | 232 | @effect/sql-pg | active | : | -- ===== 3 — proofs (a failure raises; a clean apply is the pass) ===== DO $$ DECLARE v_ghost uuid := gen_random_uuid();
23:19:36 | 207 |  |  | Activity:AutovacuumMain | 
23:19:36 | 209 | pg_cron scheduler |  | Extension:Extension | 
23:19:36 | 210 |  |  | Activity:LogicalLauncherMain | 
23:19:36 | 203 |  |  | Activity:CheckpointerMain | 
23:19:36 | 204 |  |  | Activity:BgwriterMain | 
23:19:36 | 206 |  |  | Activity:WalWriterMain | 
```

## Lane 3
- No JSON results; smoke skipped

## Lane 3
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
TIME-WAIT  0      0               127.0.0.1:40552              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:49 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
23:19:49 | 206 |  |  | Activity:AutovacuumMain | 
23:19:49 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:49 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:49 | 202 |  |  | Activity:CheckpointerMain | 
23:19:49 | 203 |  |  | Activity:BgwriterMain | 
23:19:49 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:35170              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:44 | 231 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
23:19:44 | 206 |  |  | Activity:AutovacuumMain | 
23:19:44 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:44 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:44 | 202 |  |  | Activity:CheckpointerMain | 
23:19:44 | 203 |  |  | Activity:BgwriterMain | 
23:19:44 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:50318              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:20:26 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
23:20:26 | 206 |  |  | Activity:AutovacuumMain | 
23:20:26 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:20:26 | 209 |  |  | Activity:LogicalLauncherMain | 
23:20:26 | 202 |  |  | Activity:CheckpointerMain | 
23:20:26 | 203 |  |  | Activity:BgwriterMain | 
23:20:26 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:45910              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:39 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:19:39 | 212 |  |  | Activity:AutovacuumMain | 
23:19:39 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:19:39 | 215 |  |  | Activity:LogicalLauncherMain | 
23:19:39 | 208 |  |  | Activity:CheckpointerMain | 
23:19:39 | 209 |  |  | Activity:BgwriterMain | 
23:19:39 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:37636              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:26 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:19:26 | 212 |  |  | Activity:AutovacuumMain | 
23:19:26 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:19:26 | 215 |  |  | Activity:LogicalLauncherMain | 
23:19:26 | 208 |  |  | Activity:CheckpointerMain | 
23:19:26 | 209 |  |  | Activity:BgwriterMain | 
23:19:26 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:60944              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:49 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
23:19:49 | 206 |  |  | Activity:AutovacuumMain | 
23:19:49 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:49 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:49 | 202 |  |  | Activity:CheckpointerMain | 
23:19:49 | 203 |  |  | Activity:BgwriterMain | 
23:19:49 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:39578               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:25 | 231 | @effect/sql-pg | active | : | -- PROOFS — every row is an ASSERT; a wrong verdict fails the migration. DO $$ BEGIN ASSERT public.alias_rule('telebirr1
23:19:25 | 206 |  |  | Activity:AutovacuumMain | 
23:19:25 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:25 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:25 | 202 |  |  | Activity:CheckpointerMain | 
23:19:25 | 203 |  |  | Activity:BgwriterMain | 
23:19:25 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:41746               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:49 | 230 | @effect/sql-pg | active | : | CREATE OR REPLACE FUNCTION public.get_posting_schema(p_category_id uuid) RETURNS jsonb LANGUAGE plpgsql VOLATILE SECURIT
23:19:49 | 212 |  |  | Activity:AutovacuumMain | 
23:19:49 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:19:49 | 215 |  |  | Activity:LogicalLauncherMain | 
23:19:49 | 208 |  |  | Activity:CheckpointerMain | 
23:19:49 | 209 |  |  | Activity:BgwriterMain | 
23:19:49 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:59418               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:21:27 | 232 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:21:27 | 207 |  |  | Activity:AutovacuumMain | 
23:21:27 | 209 | pg_cron scheduler |  | Extension:Extension | 
23:21:27 | 210 |  |  | Activity:LogicalLauncherMain | 
23:21:27 | 203 |  |  | Activity:CheckpointerMain | 
23:21:27 | 204 |  |  | Activity:BgwriterMain | 
23:21:27 | 206 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:60604              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:48 | 231 | @effect/sql-pg | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
23:19:48 | 213 |  |  | Activity:AutovacuumMain | 
23:19:48 | 215 | pg_cron scheduler |  | Extension:Extension | 
23:19:48 | 216 |  |  | Activity:LogicalLauncherMain | 
23:19:48 | 209 |  |  | Activity:CheckpointerMain | 
23:19:48 | 210 |  |  | Activity:BgwriterMain | 
23:19:48 | 212 |  |  | Activity:WalWriterMain | 
```

## Lane 13
- No JSON results; smoke skipped

## Lane 13
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
TIME-WAIT  0      0                127.0.0.1:38062              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:21:49 | 206 |  |  | Activity:AutovacuumMain | 
23:21:49 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:21:49 | 209 |  |  | Activity:LogicalLauncherMain | 
23:21:49 | 202 |  |  | Activity:CheckpointerMain | 
23:21:49 | 203 |  |  | Activity:BgwriterMain | 
23:21:49 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:60080              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:32 | 231 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
23:19:32 | 206 |  |  | Activity:AutovacuumMain | 
23:19:32 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:32 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:32 | 202 |  |  | Activity:CheckpointerMain | 
23:19:32 | 203 |  |  | Activity:BgwriterMain | 
23:19:32 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:54438              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:31 | 230 | @effect/sql-pg | active | : | -- ===== H — proofs ===== DO $proof$ DECLARE v_src text; v_n integer; v_m text; BEGIN -- P1 — the table: row security, i
23:19:31 | 212 |  |  | Activity:AutovacuumMain | 
23:19:31 | 214 | pg_cron scheduler |  | Extension:Extension | 
23:19:31 | 215 |  |  | Activity:LogicalLauncherMain | 
23:19:31 | 208 |  |  | Activity:CheckpointerMain | 
23:19:31 | 209 |  |  | Activity:BgwriterMain | 
23:19:31 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 16
- No JSON results; smoke skipped

## Lane 16
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
TIME-WAIT  0      0                127.0.0.1:60916              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
23:19:40 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
23:19:40 | 206 |  |  | Activity:AutovacuumMain | 
23:19:40 | 300 |  | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories
23:19:40 | 208 | pg_cron scheduler |  | Extension:Extension | 
23:19:40 | 209 |  |  | Activity:LogicalLauncherMain | 
23:19:40 | 202 |  |  | Activity:CheckpointerMain | 
23:19:40 | 203 |  |  | Activity:BgwriterMain | 
23:19:40 | 205 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
