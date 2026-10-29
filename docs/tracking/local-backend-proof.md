# Local backend proof (non-gating)

- Commit: `17ef198fac52c555fa14851a92d2d659237b5fcb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40794666365

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 90 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | not run | 109 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 109 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 101 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 80 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | not run | 89 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | not run | 97 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 6 | not run | 100 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | not run | 99 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 8 | not run | 78 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 100 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 105 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 93 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 78 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 87 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 96 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 108 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 110 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | not run | 99 | not confirmed; backend failure | 0 | 0 | 0 | 18 | 18 |
| TOTAL | — | — | — | 0 | 0 | 0 | 18 | 18 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: none 0 s
- Repeat lane (DEC-283): Repeat: each 4 on both projects; 18 tests selected, 18 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 1 repeated; importers of a changed helper: 0 of 0
- Database session samples during each start (INC-944): smoke 7, email 11, 1 11, 2 8, 3 7, 4 7, 5 10, 6 10, 7 8, 8 7, 9 11, 10 10, 11 10, 12 6, 13 6, 14 11, 15 10, 16 11, repeat 8
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
TIME-WAIT  0      0                127.0.0.1:56008               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:35:26 | 231 | @effect/sql-pg | active | : | -- Proofs — a scratch admin and scratch rows inside a block that always rolls back. DO $p$ DECLARE v_uid uuid := gen_ran
00:35:26 | 206 |  |  | Activity:AutovacuumMain | 
00:35:26 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:35:26 | 209 |  |  | Activity:LogicalLauncherMain | 
00:35:26 | 202 |  |  | Activity:CheckpointerMain | 
00:35:26 | 203 |  |  | Activity:BgwriterMain | 
00:35:26 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:59054               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:18 | 231 | @effect/sql-pg | active | : | -- ===== 1 and 2 — the columns ===== ALTER TABLE public.legal_settings ADD COLUMN operator_details text NULL CONSTRAINT 
00:34:18 | 206 |  |  | Activity:AutovacuumMain | 
00:34:18 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:18 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:18 | 202 |  |  | Activity:CheckpointerMain | 
00:34:18 | 203 |  |  | Activity:BgwriterMain | 
00:34:18 | 205 |  |  | Activity:WalWriterMain | 
```

## Lane 1
- No JSON results; smoke skipped

## Lane 1
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
TIME-WAIT  0      0                127.0.0.1:32808               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:33 | 206 |  |  | Activity:AutovacuumMain | 
00:34:33 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:33 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:33 | 202 |  |  | Activity:CheckpointerMain | 
00:34:33 | 203 |  |  | Activity:BgwriterMain | 
00:34:33 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:53420               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:35:19 | 231 | @effect/sql-pg | active | : | CREATE OR REPLACE FUNCTION public.attr_import_plan(p_definitions jsonb, p_links jsonb, p_scope text) RETURNS jsonb LANGU
00:35:19 | 206 |  |  | Activity:AutovacuumMain | 
00:35:19 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:35:19 | 209 |  |  | Activity:LogicalLauncherMain | 
00:35:19 | 202 |  |  | Activity:CheckpointerMain | 
00:35:19 | 203 |  |  | Activity:BgwriterMain | 
00:35:19 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:41722               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:33:34 | 231 | @effect/sql-pg | active | : | -- edit_listing CREATE OR REPLACE FUNCTION public.edit_listing( p_listing_id uuid, p_category_id uuid, p_title text, p_d
00:33:34 | 206 |  |  | Activity:AutovacuumMain | 
00:33:34 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:33:34 | 209 |  |  | Activity:LogicalLauncherMain | 
00:33:34 | 202 |  |  | Activity:CheckpointerMain | 
00:33:34 | 203 |  |  | Activity:BgwriterMain | 
00:33:34 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:42098               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:33:44 | 231 | @effect/sql-pg | active | : | -- 6. Proofs on scratch rows only; everything inside the inner block is rolled back. DO $proof$ DECLARE v_tag text := re
00:33:44 | 206 |  |  | Activity:AutovacuumMain | 
00:33:44 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:33:44 | 209 |  |  | Activity:LogicalLauncherMain | 
00:33:44 | 202 |  |  | Activity:CheckpointerMain | 
00:33:44 | 203 |  |  | Activity:BgwriterMain | 
00:33:44 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:60434               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:11 | 231 | @effect/sql-pg | active | : | -- ── 9. Proofs (behaviour only; every scratch row is rolled back) ──────── DO $proof$ DECLARE r text[]; v_user uuid; v_
00:34:11 | 206 |  |  | Activity:AutovacuumMain | 
00:34:11 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:11 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:11 | 202 |  |  | Activity:CheckpointerMain | 
00:34:11 | 203 |  |  | Activity:BgwriterMain | 
00:34:11 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:51000               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:04 | 232 | @effect/sql-pg | active | : | -- ===== C — proofs (scratch rows only; no auth.users row; the caller is a random id) ===== DO $proof$ DECLARE v_key tex
00:34:04 | 207 |  |  | Activity:AutovacuumMain | 
00:34:04 | 209 | pg_cron scheduler |  | Extension:Extension | 
00:34:04 | 210 |  |  | Activity:LogicalLauncherMain | 
00:34:04 | 203 |  |  | Activity:CheckpointerMain | 
00:34:04 | 204 |  |  | Activity:BgwriterMain | 
00:34:04 | 206 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:37414               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:02 | 231 | @effect/sql-pg | active | : | -- ===== C — reveal_flags ===== CREATE TABLE IF NOT EXISTS public.reveal_flags ( viewer_id uuid NOT NULL REFERENCES auth
00:34:02 | 212 |  |  | Activity:AutovacuumMain | 
00:34:02 | 214 | pg_cron scheduler |  | Extension:Extension | 
00:34:02 | 215 |  |  | Activity:LogicalLauncherMain | 
00:34:02 | 208 |  |  | Activity:CheckpointerMain | 
00:34:02 | 209 |  |  | Activity:BgwriterMain | 
00:34:02 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:34082               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:35 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
00:34:35 | 206 |  |  | Activity:AutovacuumMain | 
00:34:35 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:35 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:35 | 202 |  |  | Activity:CheckpointerMain | 
00:34:35 | 203 |  |  | Activity:BgwriterMain | 
00:34:35 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:54122               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:03 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
00:34:03 | 206 |  |  | Activity:AutovacuumMain | 
00:34:03 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:03 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:03 | 202 |  |  | Activity:CheckpointerMain | 
00:34:03 | 203 |  |  | Activity:BgwriterMain | 
00:34:03 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:40092               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:08 | 230 | @effect/sql-pg | active | : | -- ===== C — cat_import_plan (redeclared whole) ===== CREATE OR REPLACE FUNCTION public.cat_import_plan(p_rows jsonb, p_
00:34:08 | 212 |  |  | Activity:AutovacuumMain | 
00:34:08 | 214 | pg_cron scheduler |  | Extension:Extension | 
00:34:08 | 215 |  |  | Activity:LogicalLauncherMain | 
00:34:08 | 208 |  |  | Activity:CheckpointerMain | 
00:34:08 | 209 |  |  | Activity:BgwriterMain | 
00:34:08 | 211 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:37298               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:35:38 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
00:35:38 | 206 |  |  | Activity:AutovacuumMain | 
00:35:38 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:35:38 | 209 |  |  | Activity:LogicalLauncherMain | 
00:35:38 | 202 |  |  | Activity:CheckpointerMain | 
00:35:38 | 203 |  |  | Activity:BgwriterMain | 
00:35:38 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:54006               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:33:35 | 231 | @effect/sql-pg | active | : | -- suggest_seller_aliases proof: its OWN scratch identity (a random uuid claim, -- no real account), cleaned up in the s
00:33:35 | 206 |  |  | Activity:AutovacuumMain | 
00:33:35 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:33:35 | 209 |  |  | Activity:LogicalLauncherMain | 
00:33:35 | 202 |  |  | Activity:CheckpointerMain | 
00:33:35 | 203 |  |  | Activity:BgwriterMain | 
00:33:35 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0               127.0.0.1:48394               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:25 | 231 | @effect/sql-pg | active | : | DO $t$ DECLARE v_name text; i int; t0 timestamptz; v text; b boolean; BEGIN -- The fold sets the rewrite relies on hold 
00:34:25 | 206 |  |  | Activity:AutovacuumMain | 
00:34:25 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:25 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:25 | 202 |  |  | Activity:CheckpointerMain | 
00:34:25 | 203 |  |  | Activity:BgwriterMain | 
00:34:25 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:46824               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:33:48 | 231 | @effect/sql-pg | active | : | -- ===== B — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) ===== DO $proof$ DECLARE v_src text; BEG
00:33:48 | 206 |  |  | Activity:AutovacuumMain | 
00:33:48 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:33:48 | 209 |  |  | Activity:LogicalLauncherMain | 
00:33:48 | 202 |  |  | Activity:CheckpointerMain | 
00:33:48 | 203 |  |  | Activity:BgwriterMain | 
00:33:48 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:35040               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:25 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
00:34:25 | 206 |  |  | Activity:AutovacuumMain | 
00:34:25 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:25 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:25 | 202 |  |  | Activity:CheckpointerMain | 
00:34:25 | 203 |  |  | Activity:BgwriterMain | 
00:34:25 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:60286               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:34:28 | 206 |  |  | Activity:AutovacuumMain | 
00:34:28 | 208 | pg_cron scheduler |  | Extension:Extension | 
00:34:28 | 209 |  |  | Activity:LogicalLauncherMain | 
00:34:28 | 202 |  |  | Activity:CheckpointerMain | 
00:34:28 | 203 |  |  | Activity:BgwriterMain | 
00:34:28 | 205 |  |  | Activity:WalWriterMain | 
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
TIME-WAIT  0      0                127.0.0.1:39854               127.0.0.1:54322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
00:35:55 | 231 | @effect/sql-pg | active | : | SELECT public.name_folds_rebuild()
00:35:55 | 213 |  |  | Activity:AutovacuumMain | 
00:35:55 | 215 | pg_cron scheduler |  | Extension:Extension | 
00:35:55 | 216 |  |  | Activity:LogicalLauncherMain | 
00:35:55 | 209 |  |  | Activity:CheckpointerMain | 
00:35:55 | 210 |  |  | Activity:BgwriterMain | 
00:35:55 | 212 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
