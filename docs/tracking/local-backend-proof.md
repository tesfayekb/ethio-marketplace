# Local backend proof (non-gating)

- Commit: `8a4a4f29a6d3c06ffc3ce3b328a13cecce1e9420`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42385875615

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 1030 | 74 | applied 424/424 | 206 | 0 | 0 | 70 | 276 |
| email | 183 | 60 | applied 424/424 | 6 | 0 | 0 | 0 | 6 |
| 1 | 926 | 55 | applied 424/424 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1142 | 61 | applied 424/424 | 190 | 0 | 0 | 1 | 191 |
| 3 | 667 | 53 | applied 424/424 | 140 | 0 | 0 | 24 | 164 |
| 4 | 930 | 67 | applied 424/424 | 178 | 0 | 0 | 2 | 180 |
| 5 | 832 | 65 | applied 424/424 | 151 | 3 | 1 | 7 | 162 |
| 6 | 983 | 76 | applied 424/424 | 189 | 0 | 0 | 1 | 190 |
| 7 | 451 | 76 | applied 424/424 | 82 | 0 | 0 | 68 | 150 |
| 8 | 664 | 61 | applied 424/424 | 124 | 0 | 0 | 51 | 175 |
| 9 | 860 | 50 | applied 424/424 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1153 | 66 | applied 424/424 | 167 | 0 | 0 | 1 | 168 |
| 11 | not run | 61 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | 821 | 52 | applied 424/424 | 175 | 0 | 0 | 5 | 180 |
| 13 | 728 | 61 | applied 424/424 | 142 | 3 | 0 | 17 | 162 |
| 14 | 986 | 76 | applied 424/424 | 188 | 0 | 0 | 2 | 190 |
| 15 | 349 | 51 | applied 424/424 | 96 | 0 | 0 | 62 | 158 |
| 16 | 711 | 75 | applied 424/424 | 132 | 0 | 0 | 36 | 168 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2500 | 6 | 1 | 366 | 2873 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 10 1153 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 9, email 6, 1 5, 2 7, 3 5, 4 8, 5 7, 6 9, 7 9, 8 6, 9 4, 10 7, 11 6, 12 5, 13 6, 14 9, 15 5, 16 9, repeat not run
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 42385875615-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42385875615-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42385875615-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42385875615-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42385875615-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42385875615-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42385875615-local-10
  - 11: not found
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42385875615-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42385875615-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42385875615-local-16
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
RLS on 91 of 91 public tables
Default grants in public: postgres | f | {postgres=X/postgres}; postgres | r | {postgres=arwdDxtm/postgres,service_role=arwdDxtm/postgres}; postgres | S | {postgres=rwU/postgres,service_role=rwU/postgres}; supabase_admin | f | {postgres=X/supabase_admin,anon=X/supabase_admin,authenticated=X/supabase_admin,service_role=X/supabase_admin}; supabase_admin | r | {postgres=arwdDxtm/supabase_admin,anon=arwdDxtm/supabase_admin,authenticated=arwdDxtm/supabase_admin,service_role=arwdDxtm/supabase_admin}; supabase_admin | S | {postgres=rwU/supabase_admin,anon=rwU/supabase_admin,authenticated=rwU/supabase_admin,service_role=rwU/supabase_admin}
- Status:
certutil: present
Status variables: ANON_KEY, API_URL, DB_URL, GRAPHQL_URL, INBUCKET_URL, JWT_SECRET, MAILPIT_URL, PUBLISHABLE_KEY, REST_URL, S3_PROTOCOL_ACCESS_KEY_ID, S3_PROTOCOL_ACCESS_KEY_SECRET, S3_PROTOCOL_REGION, SECRET_KEY, SERVICE_ROLE_KEY, STORAGE_S3_URL
Keys used: ANON_KEY, SERVICE_ROLE_KEY
API: https://127.0.0.1:31321 (per-run certificate authority)
Database container: supabase_db_ethio-ci-local
pg_cron: available 1.6.4; cron.launch_active_jobs settings: 1
Restored (cron.launch_active_jobs, autovacuum, scheduler sessions): on on 1
Start proofs (DEC-313): PostgREST serves job_runs; the sign-up hook answered 200

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- one-line-slots.spec.ts / OLS-1 the home heading and the signed-out bar fit in every public language / mobile-360 — Error: the switcher lists the public languages
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-7 the eleventh photo is refused tooManyPhotos / mobile-360 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) / mobile-360 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- post-wizard-category.spec.ts / POSTING WIZARD / PW-29 the photos caption counts against the plan's cap / mobile-360 — Error: PW-29: the caption never rendered the plan's cap

## Lane 11
- Step failure:
start failed in 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03 stmt 15; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03.sql...
Cause:
```text
ERROR: duplicate key value violates unique constraint "languages_pkey" (SQLSTATE 23505)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres ERROR:  duplicate key value violates unique constraint "languages_pkey"
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres DETAIL:  Key (code)=(qc9) already exists.
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
	    VALUES (v_lang_on, v_tag || ' on', v_tag, true, false, 9001), (v_lang_off, v_tag || ' off', v_tag, false, false, 9002)"
	PL/pgSQL function inline_code_block line 93 at SQL statement
172.18.0.1 2026-11-07 15:22:53.596 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(137 statement lines dropped)
```
Statement:
```text
At statement: 15
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: has_permission's header, grants and the new body's md5; base_languages STABLE SECURITY
--     DEFINER with search_path public, EXECUTE to authenticated and not anon; the two revoked functions hold no
--     browser grant; the dial row.
-- (b) INC-409 on scratch accounts: holder A with a scratch permission — B (authenticated, no super admin) asking
--     about A → false; A about A → true; super admin S about A → true; the service role about A → true; with no
--     claims (a proof) → true; and B about B → B's own truth (false), the policy reading.
-- (c) base_languages on a scratch language (enabled_admin): a legal editor (legal:edit only) reads it, en and am
--     and zxa are absent, a disabled scratch language is absent; a caller without legal:edit → permissionDenied
--     (P0D01); no caller → notSignedIn.
(118 lines omitted)
      RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (c): no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    RAISE EXCEPTION 'f1a3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    IF v_msg IS DISTINCT FROM 'notSignedIn' OR v_state IS DISTINCT FROM 'P0D01' THEN
      RAISE EXCEPTION 'F1-1 M-F1a part 3 proof (c): no caller answered % (%)', coalesce(v_msg, 'success'), v_state;
    END IF;
    RAISE EXCEPTION 'f1a3-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a3-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
15:22:50 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
15:22:50 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
15:22:50 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
15:22:50 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
15:22:50 | 203 |  | background writer |  | Activity:BgwriterMain | 
15:22:50 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051700_c4e9a6d7-5f2b-4e8c-a1d3-7b6f0e2c9a03 stmt 15; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
Step smoke: outcome failure
  
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-7 the eleventh photo is refused tooManyPhotos / desktop-1280 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) / desktop-1280 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- post-wizard-category.spec.ts / POSTING WIZARD / PW-29 the photos caption counts against the plan's cap / desktop-1280 — Error: PW-29: the caption never rendered the plan's cap

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
