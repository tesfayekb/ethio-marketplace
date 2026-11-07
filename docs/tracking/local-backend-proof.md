# Local backend proof (non-gating)

- Commit: `9995901e2ead3e4b5260906e554bec2430aff892`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42372372981

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 68 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | 213 | 65 | applied 418/418 | 6 | 0 | 0 | 0 | 6 |
| 1 | 979 | 62 | applied 418/418 | 168 | 0 | 0 | 6 | 174 |
| 2 | 1274 | 75 | applied 418/418 | 190 | 0 | 0 | 1 | 191 |
| 3 | 694 | 61 | applied 418/418 | 140 | 0 | 0 | 24 | 164 |
| 4 | 972 | 75 | applied 418/418 | 178 | 0 | 0 | 2 | 180 |
| 5 | 883 | 75 | applied 418/418 | 152 | 3 | 0 | 7 | 162 |
| 6 | 954 | 74 | applied 418/418 | 189 | 0 | 0 | 1 | 190 |
| 7 | 450 | 74 | applied 418/418 | 82 | 0 | 0 | 68 | 150 |
| 8 | 690 | 64 | applied 418/418 | 124 | 0 | 0 | 51 | 175 |
| 9 | 968 | 61 | applied 418/418 | 166 | 0 | 0 | 13 | 179 |
| 10 | 1228 | 78 | applied 418/418 | 167 | 0 | 0 | 1 | 168 |
| 11 | 755 | 50 | applied 418/418 | 139 | 0 | 0 | 36 | 175 |
| 12 | 883 | 60 | applied 418/418 | 175 | 0 | 0 | 5 | 180 |
| 13 | 806 | 70 | applied 418/418 | 142 | 3 | 0 | 17 | 162 |
| 14 | 984 | 75 | applied 418/418 | 188 | 0 | 0 | 2 | 190 |
| 15 | 464 | 75 | applied 418/418 | 96 | 0 | 0 | 62 | 158 |
| 16 | 662 | 61 | applied 418/418 | 132 | 0 | 0 | 36 | 168 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2434 | 6 | 0 | 332 | 2772 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 2 1274 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 8, email 7, 1 6, 2 9, 3 6, 4 9, 5 9, 6 9, 7 9, 8 7, 9 6, 10 9, 11 5, 12 6, 13 8, 14 9, 15 9, 16 7, repeat not run
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42372372981-local-1
  - 2: [e2e:teardown] deleted 5 user(s) owned by process 42372372981-local-2
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42372372981-local-3
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42372372981-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42372372981-local-9
  - 10: [e2e:teardown] deleted 4 user(s) owned by process 42372372981-local-10
  - 11: [e2e:teardown] deleted 13 user(s) owned by process 42372372981-local-11
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42372372981-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42372372981-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42372372981-local-16
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
start failed in 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05 stmt 18; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql...
Cause:
```text
ERROR: duplicate key value violates unique constraint "languages_pkey" (SQLSTATE 23505)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres ERROR:  duplicate key value violates unique constraint "languages_pkey"
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres DETAIL:  Key (code)=(q95) already exists.
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
	    VALUES (v_lang_on, v_tag || ' on', v_tag, true, true, 9001), (v_lang_off, v_tag || ' off', v_tag, true, false, 9002)"
	PL/pgSQL function inline_code_block line 57 at SQL statement
172.18.0.1 2026-11-07 12:27:36.261 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 4. PROOFS
(189 statement lines dropped)
```
Statement:
```text
At statement: 18
-- ------------------------------------------------------------ 4. PROOFS
-- (a) catalog facts: the three headers (VOLATILE, definer, search_path), their grants as restated (authenticated
--     EXECUTE, service_role, never anon or PUBLIC), the new bodies' md5s, the two return types now jsonb.
-- (b) user_set_preferred_language: a published scratch language is set ({ok:true, language}, the profile and an
--     audit row {new}, the dial counted once); an unpublished one is refused languageNotPublished at 400 with
--     the profile unchanged, the dial counted (INC-844) and a door_refusals row; a deactivated caller is refused
--     accountDeactivated at 403 with no count.
-- (c) remove_own_password: without a fresh proof → P0009 (recent sign-in required) propagates unchanged and, being
--     a RAISE, leaves no count; a scratch user with only the email identity → lastSignInMethod at 400, the
--     password kept, the dial counted, a door_refusals row; a scratch user with a password, a non-email identity
(170 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a5-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a5-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:27:35 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 5. PROOFS -- (a) catalog facts: three functions VOLATILE
12:27:35 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:27:35 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:27:35 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:27:35 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:27:35 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05 stmt 18; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 5
- Step failure:
Step smoke: outcome failure
  
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-7 the eleventh photo is refused tooManyPhotos / mobile-360 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) / mobile-360 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- post-wizard-category.spec.ts / POSTING WIZARD / PW-29 the photos caption counts against the plan's cap / mobile-360 — Error: PW-29: the caption never rendered the plan's cap

## Lane 13
- Step failure:
Step smoke: outcome failure
  
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-7 the eleventh photo is refused tooManyPhotos / desktop-1280 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- photo-pipeline.spec.ts / PHOTO PIPELINE / PP-25 an edited photo takes the old photo's place; its objects go; at the cap it is still taken (D154 B2) / desktop-1280 — Error: upload 5: {"ok":false,"refusals":[{"field":"door","reason":"tooManyPhotos:4"}]}
- post-wizard-category.spec.ts / POSTING WIZARD / PW-29 the photos caption counts against the plan's cap / desktop-1280 — Error: PW-29: the caption never rendered the plan's cap

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
