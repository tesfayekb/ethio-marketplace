# Local backend proof (non-gating)

- Commit: `f95692986852094a1f76ede28a3d22a573021acb`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/40884980032

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 845 | 84 | applied 381/381 | 196 | 0 | 0 | 62 | 258 |
| email | 186 | 117 | applied 381/381 | 6 | 0 | 0 | 0 | 6 |
| 1 | 706 | 113 | applied 381/381 | 132 | 0 | 0 | 4 | 136 |
| 2 | 971 | 104 | applied 381/381 | 142 | 0 | 0 | 3 | 145 |
| 3 | not run | 103 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | 710 | 122 | applied 381/381 | 149 | 0 | 0 | 2 | 151 |
| 5 | 548 | 92 | applied 381/381 | 121 | 0 | 0 | 7 | 128 |
| 6 | 648 | 100 | applied 381/381 | 131 | 0 | 0 | 1 | 132 |
| 7 | 546 | 110 | applied 381/381 | 131 | 0 | 0 | 0 | 131 |
| 8 | 524 | 113 | applied 381/381 | 102 | 0 | 0 | 30 | 132 |
| 9 | 899 | 118 | applied 381/381 | 145 | 0 | 0 | 2 | 147 |
| 10 | 984 | 117 | applied 381/381 | 130 | 0 | 0 | 2 | 132 |
| 11 | 831 | 88 | applied 381/381 | 128 | 0 | 0 | 1 | 129 |
| 12 | 678 | 119 | applied 381/381 | 141 | 0 | 0 | 5 | 146 |
| 13 | 570 | 110 | applied 381/381 | 123 | 0 | 0 | 5 | 128 |
| 14 | 800 | 108 | applied 381/381 | 129 | 0 | 0 | 3 | 132 |
| 15 | 452 | 87 | applied 381/381 | 130 | 0 | 0 | 1 | 131 |
| 16 | 557 | 112 | applied 381/381 | 102 | 0 | 0 | 32 | 134 |
| repeat | 872 | 123 | applied 381/381 | 144 | 0 | 0 | 8 | 152 |
| TOTAL | — | — | — | 2282 | 0 | 0 | 168 | 2450 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 984 s
- Repeat lane (DEC-283): Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/shell.spec.ts (109 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (1 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-coverage.spec.ts (8 tests); Not repeated: e2e/admin-listings.spec.ts (31 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-roles.spec.ts (13 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (17 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-image-routes.spec.ts (5 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (5 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (21 tests); Not repeated: e2e/legal-certify.spec.ts (21 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locations-tree.spec.ts (4 tests); Not repeated: e2e/mfa-stepup.spec.ts (9 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/overlays.spec.ts (3 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-dials.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1087 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 5 of 7 repeated; importers of a changed helper: 0 of 82
- Database session samples during each start (INC-944): smoke 8, email 13, 1 12, 2 9, 3 8, 4 13, 5 12, 6 9, 7 10, 8 13, 9 13, 10 13, 11 9, 12 13, 13 11, 14 13, 15 9, 16 11, repeat 14
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 40884980032-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 40884980032-local-email
  - 1: [e2e:teardown] deleted 6 user(s) owned by process 40884980032-local-1
  - 2: [e2e:teardown] deleted 7 user(s) owned by process 40884980032-local-2
  - 3: not found
  - 4: [e2e:teardown] deleted 15 user(s) owned by process 40884980032-local-4
  - 5: [e2e:teardown] deleted 19 user(s) owned by process 40884980032-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 40884980032-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 40884980032-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 40884980032-local-8
  - 9: [e2e:teardown] deleted 6 user(s) owned by process 40884980032-local-9
  - 10: [e2e:teardown] deleted 6 user(s) owned by process 40884980032-local-10
  - 11: [e2e:teardown] deleted 14 user(s) owned by process 40884980032-local-11
  - 12: [e2e:teardown] deleted 15 user(s) owned by process 40884980032-local-12
  - 13: [e2e:teardown] deleted 19 user(s) owned by process 40884980032-local-13
  - 14: [e2e:teardown] deleted 3 user(s) owned by process 40884980032-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 40884980032-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 40884980032-local-16
  - repeat: [e2e:teardown] deleted 2 user(s) owned by process 40884980032-local-repeat
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
RLS on 85 of 85 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local

## Lane 3
- Step failure:
Step backend: outcome failure
  
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql...
```text
  IF NOT public.job_lease_take('name-check-catchup', v_h1, 120) THEN RAISE EXCEPTION 'LS-1 take'; END IF;
  IF public.job_lease_take('name-check-catchup', v_h2, 120) THEN RAISE EXCEPTION 'LS-1 second holder took it'; END IF;
  IF public.job_lease_release('name-check-catchup', v_h2) THEN RAISE EXCEPTION 'LS-1 wrong holder released'; END IF;
  IF NOT public.job_lease_release('name-check-catchup', v_h1) THEN RAISE EXCEPTION 'LS-1 release'; END IF;
  IF NOT public.job_lease_take('name-check-catchup', v_h2, 120) THEN RAISE EXCEPTION 'LS-1 retake'; END IF;
  UPDATE public.job_leases SET expires_at = now() - interval '1 second' WHERE job = 'name-check-catchup' AND holder = v_h2;
  IF NOT public.job_lease_take('name-check-catchup', v_h1, 120) THEN RAISE EXCEPTION 'LS-1 expired retake'; END IF;
  IF (SELECT holder FROM public.job_leases WHERE job = 'name-check-catchup') <> v_h1 THEN RAISE EXCEPTION 'LS-1 expired holder'; END IF;
  BEGIN PERFORM public.job_lease_take('name-check-catchup', v_h1, 5); RAISE EXCEPTION 'LS-2 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:seconds' THEN RAISE; END IF; END;

  -- PS-1: pause read/set/clear.
  IF (public.job_pause_read('name-check-catchup')->>'paused')::boolean THEN RAISE EXCEPTION 'PS-1 paused at birth'; END IF;
  PERFORM public.job_pause_set('name-check-catchup', 'credits');
  v_p := public.job_pause_read('name-check-catchup');
  IF NOT (v_p->>'paused')::boolean OR v_p->>'reason' <> 'credits' THEN RAISE EXCEPTION 'PS-1 set: %', v_p; END IF;
  BEGIN PERFORM public.job_pause_set('name-check-catchup', 'e2e'); RAISE EXCEPTION 'PS-2 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:reason' THEN RAISE; END IF; END;
  IF NOT public.job_pause_clear('name-check-catchup') THEN RAISE EXCEPTION 'PS-1 clear'; END IF;
  IF (public.job_pause_read('name-check-catchup')->>'paused')::boolean THEN RAISE EXCEPTION 'PS-1 still paused'; END IF;

  -- FN-1: a claimed run finishes once; an unclaimed one never.
  IF NOT public.job_run_finish(v_run, 'ok', NULL, 3, 2, 1, 0) THEN RAISE EXCEPTION 'FN-1 finish'; END IF;
  SELECT * INTO v_j FROM public.job_runs WHERE id = v_run;
  IF v_j.outcome <> 'ok' OR v_j.asked <> 3 OR v_j.clean <> 2 OR v_j.imitates <> 1 OR v_j.finished_at IS NULL THEN
    RAISE EXCEPTION 'FN-1 row'; END IF;
  IF public.job_run_finish(v_run, 'failed', NULL, 0, 0, 0, 0) THEN RAISE EXCEPTION 'FN-1 finished twice'; END IF;
  IF public.job_run_finish(v_old, 'ok', NULL, 0, 0, 0, 0) THEN RAISE EXCEPTION 'FN-2 unclaimed finished'; END IF;
  BEGIN PERFORM public.job_run_finish(v_old, 'dispatched', NULL, 0, 0, 0, 0); RAISE EXCEPTION 'FN-3 refusal absent';
  EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'badValue:outcome' THEN RAISE; END IF; END;

  -- AC-1: every door is service-only.
  FOREACH v_fn IN ARRAY ARRAY['public.name_check_mark(uuid,text,text,text)','public.job_run_claim(text,bigint)',
      'public.job_lease_take(text,uuid,integer)','public.job_lease_release(text,uuid)','public.job_pause_read(text)',
      'public.job_pause_set(text,text)','public.job_pause_clear(text)',
      'public.job_run_finish(uuid,text,text,integer,integer,integer,integer)'] LOOP
    IF has_function_privilege('public', v_fn, 'EXECUTE') OR has_function_privilege('anon', v_fn, 'EXECUTE')
       OR has_function_privilege('authenticated', v_fn, 'EXECUTE') OR NOT has_function_privilege('service_role', v_fn, 'EXECUTE') THEN
      RAISE EXCEPTION 'AC-1 %', v_fn; END IF;
  END LOOP;

  RAISE EXCEPTION 'M3 proof ok';
 EXCEPTION WHEN OTHERS THEN IF SQLERRM <> 'M3 proof ok' THEN RAISE; END IF; END;
 IF EXISTS (SELECT 1 FROM auth.users WHERE id = v_u1) OR EXISTS (SELECT 1 FROM public.name_checks WHERE profile_id = v_u1)
    OR EXISTS (SELECT 1 FROM public.job_runs WHERE id IN (v_run, v_old))
    OR EXISTS (SELECT 1 FROM public.job_leases WHERE holder IN (v_h1, v_h2)) THEN
   RAISE EXCEPTION 'M3 rollback failed'; END IF;
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Port holders (31320-31329, DEC-284; 54320-54329, the retired block):
TIME-WAIT  0      0                127.0.0.1:38870               127.0.0.1:31322                                            
Database sessions at the last sample (INC-944; time | pid | application | state | wait | query):
13:48:14 | 231 | @effect/sql-pg | active | : | -- The verdicts of the live rules for every name the proofs of M2, M4, M4b -- and M5 use; after the rewrite each must be
13:48:14 | 206 |  |  | Activity:AutovacuumMain | 
13:48:14 | 208 | pg_cron scheduler |  | Extension:Extension | 
13:48:14 | 209 |  |  | Activity:LogicalLauncherMain | 
13:48:14 | 202 |  |  | Activity:CheckpointerMain | 
13:48:14 | 203 |  |  | Activity:BgwriterMain | 
13:48:14 | 205 |  |  | Activity:WalWriterMain | 
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
