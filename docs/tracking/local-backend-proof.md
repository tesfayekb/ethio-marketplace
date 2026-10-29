# Local backend proof (non-gating)

- Commit: `a64c4dc668d2d1b299f7473c4aa89710fa3f9ef0`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40803324867

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 106 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 76 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 88 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 103 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 106 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 107 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 102 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 94 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 111 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 102 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 108 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 91 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 80 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 77 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 110 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 112 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 77 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 100 | not confirmed; backend failure | 0 | 0 | 0 | 18 | 18 |
| TOTAL | — | — | — | 0 | 0 | 0 | 18 | 18 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 18 tests selected, 18 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 10, email 6, 1 9, 2 10, 3 10, 4 10, 5 10, 6 8, 7 7, 8 9, 9 9, 10 8, 11 10, 12 10, 13 6, 14 11, 15 8, 16 6, repeat 9
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
TIME-WAIT  0      0                127.0.0.1:56504              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:44 | 230 | @effect/sql-pg | active | : | -- Bundle 11, the Listings console, turn L1 (2026-10-11). Tier A. The console's doors and the seller's notices -- (D134,
01:57:44 | 212 |  |  | Activity:AutovacuumMain | 
01:57:44 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:57:44 | 215 |  |  | Activity:LogicalLauncherMain | 
01:57:44 | 208 |  |  | Activity:CheckpointerMain | 
01:57:44 | 209 |  |  | Activity:BgwriterMain | 
01:57:44 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:36900              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:14 | 231 | @effect/sql-pg | active | : | DO $t$ DECLARE v_name text; i int; t0 timestamptz; v text; b boolean; BEGIN -- The fold sets the rewrite relies on hold 
01:57:14 | 206 |  |  | Activity:AutovacuumMain | 
01:57:14 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:14 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:14 | 202 |  |  | Activity:CheckpointerMain | 
01:57:14 | 203 |  |  | Activity:BgwriterMain | 
01:57:14 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:43010              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:40 | 229 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:40 | 211 |  |  | Activity:AutovacuumMain | 
01:57:40 | 304 |  | active | Timeout:VacuumDelay | autovacuum: ANALYZE public.audit_log
01:57:40 | 213 | pg_cron scheduler |  | Extension:Extension | 
01:57:40 | 214 |  |  | Activity:LogicalLauncherMain | 
01:57:40 | 207 |  |  | Activity:CheckpointerMain | 
01:57:40 | 208 |  |  | Activity:BgwriterMain | 
01:57:40 | 210 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:39464              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:58:14 | 230 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
01:58:14 | 212 |  |  | Activity:AutovacuumMain | 
01:58:14 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:58:14 | 215 |  |  | Activity:LogicalLauncherMain | 
01:58:14 | 208 |  |  | Activity:CheckpointerMain | 
01:58:14 | 209 |  |  | Activity:BgwriterMain | 
01:58:14 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:51846              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:41 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:41 | 206 |  |  | Activity:AutovacuumMain | 
01:57:41 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:41 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:41 | 202 |  |  | Activity:CheckpointerMain | 
01:57:41 | 203 |  |  | Activity:BgwriterMain | 
01:57:41 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 4
- No JSON results; smoke skipped

## Lane 4
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
TIME-WAIT  0      0                127.0.0.1:46606              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:46 | 212 |  |  | Activity:AutovacuumMain | 
01:57:46 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:57:46 | 215 |  |  | Activity:LogicalLauncherMain | 
01:57:46 | 208 |  |  | Activity:CheckpointerMain | 
01:57:46 | 209 |  |  | Activity:BgwriterMain | 
01:57:46 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:36706              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:51 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:51 | 206 |  |  | Activity:AutovacuumMain | 
01:57:51 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:51 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:51 | 202 |  |  | Activity:CheckpointerMain | 
01:57:51 | 203 |  |  | Activity:BgwriterMain | 
01:57:51 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:58888              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:59:27 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:59:27 | 206 |  |  | Activity:AutovacuumMain | 
01:59:27 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:59:27 | 209 |  |  | Activity:LogicalLauncherMain | 
01:59:27 | 202 |  |  | Activity:CheckpointerMain | 
01:59:27 | 203 |  |  | Activity:BgwriterMain | 
01:59:27 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:36166              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:30 | 231 | @effect/sql-pg | active | : | -- ===== C — proofs ===== DO $proof$ DECLARE v_fp text; v_vol "char"; v_def boolean; v_cfg text; v_n integer; v_err text
01:57:30 | 206 |  |  | Activity:AutovacuumMain | 
01:57:30 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:30 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:30 | 202 |  |  | Activity:CheckpointerMain | 
01:57:30 | 203 |  |  | Activity:BgwriterMain | 
01:57:30 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 8
- No JSON results; smoke skipped

## Lane 8
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
TIME-WAIT  0      0                127.0.0.1:43524              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:47 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:47 | 206 |  |  | Activity:AutovacuumMain | 
01:57:47 | 298 |  | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories
01:57:47 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:47 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:47 | 202 |  |  | Activity:CheckpointerMain | 
01:57:47 | 203 |  |  | Activity:BgwriterMain | 
01:57:47 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:54138              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:37 | 229 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:37 | 211 |  |  | Activity:AutovacuumMain | 
01:57:37 | 213 | pg_cron scheduler |  | Extension:Extension | 
01:57:37 | 214 |  |  | Activity:LogicalLauncherMain | 
01:57:37 | 207 |  |  | Activity:CheckpointerMain | 
01:57:37 | 208 |  |  | Activity:BgwriterMain | 
01:57:37 | 210 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:35098              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:51 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:51 | 212 |  |  | Activity:AutovacuumMain | 
01:57:51 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:57:51 | 215 |  |  | Activity:LogicalLauncherMain | 
01:57:51 | 208 |  |  | Activity:CheckpointerMain | 
01:57:51 | 209 |  |  | Activity:BgwriterMain | 
01:57:51 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:55858              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:59:22 | 231 | @effect/sql-pg | active | : | -- Proofs — a scratch admin and scratch rows inside a block that always rolls back. DO $p$ DECLARE v_uid uuid := gen_ran
01:59:22 | 206 |  |  | Activity:AutovacuumMain | 
01:59:22 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:59:22 | 209 |  |  | Activity:LogicalLauncherMain | 
01:59:22 | 202 |  |  | Activity:CheckpointerMain | 
01:59:22 | 203 |  |  | Activity:BgwriterMain | 
01:59:22 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:40392              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:16 | 232 | @effect/sql-pg | active | : | -- Proof: the rebuild runs under safe-update (as the API connection does), returns -- rows above zero, and writes one ne
01:57:16 | 207 |  |  | Activity:AutovacuumMain | 
01:57:16 | 209 | pg_cron scheduler |  | Extension:Extension | 
01:57:16 | 210 |  |  | Activity:LogicalLauncherMain | 
01:57:16 | 203 |  |  | Activity:CheckpointerMain | 
01:57:16 | 204 |  |  | Activity:BgwriterMain | 
01:57:16 | 206 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:48840              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:11 | 231 | @effect/sql-pg | active | : | DO $t$ DECLARE v_name text; i int; t0 timestamptz; v text; b boolean; BEGIN -- The fold sets the rewrite relies on hold 
01:57:11 | 206 |  |  | Activity:AutovacuumMain | 
01:57:11 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:11 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:11 | 202 |  |  | Activity:CheckpointerMain | 
01:57:11 | 203 |  |  | Activity:BgwriterMain | 
01:57:11 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:35548              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:53 | 231 | @effect/sql-pg | active | : | RESET ALL
01:57:53 | 206 |  |  | Activity:AutovacuumMain | 
01:57:53 | 208 | pg_cron scheduler |  | Extension:Extension | 
01:57:53 | 209 |  |  | Activity:LogicalLauncherMain | 
01:57:53 | 202 |  |  | Activity:CheckpointerMain | 
01:57:53 | 203 |  |  | Activity:BgwriterMain | 
01:57:53 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 15
- No JSON results; smoke skipped

## Lane 15
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
TIME-WAIT  0      0                127.0.0.1:43228              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:59:28 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:59:28 | 212 |  |  | Activity:AutovacuumMain | 
01:59:28 | 297 |  | active | Timeout:VacuumTruncate | autovacuum: VACUUM ANALYZE public.categories
01:59:28 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:59:28 | 215 |  |  | Activity:LogicalLauncherMain | 
01:59:28 | 208 |  |  | Activity:CheckpointerMain | 
01:59:28 | 209 |  |  | Activity:BgwriterMain | 
01:59:28 | 211 |  |  | Activity:WalWriterMain | 
```

## Lane 16
- No JSON results; smoke skipped

## Lane 16
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
TIME-WAIT  0      0               127.0.0.1:40488              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:32 | 230 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
01:57:32 | 212 |  |  | Activity:AutovacuumMain | 
01:57:32 | 214 | pg_cron scheduler |  | Extension:Extension | 
01:57:32 | 215 |  |  | Activity:LogicalLauncherMain | 
01:57:32 | 208 |  |  | Activity:CheckpointerMain | 
01:57:32 | 209 |  |  | Activity:BgwriterMain | 
01:57:32 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:46948              127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
01:57:59 | 232 | @effect/sql-pg | active | : | RESET ALL
01:57:59 | 207 |  |  | Activity:AutovacuumMain | 
01:57:59 | 209 | pg_cron scheduler |  | Extension:Extension | 
01:57:59 | 210 |  |  | Activity:LogicalLauncherMain | 
01:57:59 | 203 |  |  | Activity:CheckpointerMain | 
01:57:59 | 204 |  |  | Activity:BgwriterMain | 
01:57:59 | 206 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
