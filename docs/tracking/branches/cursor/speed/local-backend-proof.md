# Local backend proof (non-gating)

- Commit: `5e36f569f071600db18f229a1a0691e0c09949ab`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/43457682073

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 342 | 55 | applied 437/437 | 15 | 1 | 0 | 4 | 20 |
| email | 172 | 53 | applied 437/437 | 6 | 0 | 0 | 0 | 6 |
| webkit | not run | 63 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | 612 | 78 | applied 437/437 | 188 | 0 | 0 | 69 | 257 |
| 2 | 543 | 61 | applied 437/437 | 174 | 0 | 0 | 26 | 200 |
| 3 | 583 | 63 | applied 437/437 | 169 | 0 | 0 | 5 | 174 |
| 4 | 602 | 74 | applied 437/437 | 137 | 0 | 0 | 5 | 142 |
| 5 | 598 | 74 | applied 437/437 | 97 | 0 | 0 | 1 | 98 |
| 6 | 609 | 75 | applied 437/437 | 153 | 0 | 0 | 41 | 194 |
| 7 | 500 | 51 | applied 437/437 | 147 | 0 | 0 | 77 | 224 |
| 8 | 563 | 62 | applied 437/437 | 181 | 0 | 0 | 7 | 188 |
| 9 | 523 | 58 | applied 437/437 | 122 | 0 | 0 | 2 | 124 |
| 10 | 604 | 61 | applied 437/437 | 161 | 1 | 0 | 2 | 164 |
| 11 | 658 | 68 | applied 437/437 | 120 | 0 | 0 | 8 | 128 |
| 12 | 667 | 70 | applied 437/437 | 164 | 0 | 0 | 19 | 183 |
| 13 | 579 | 75 | applied 437/437 | 157 | 0 | 0 | 9 | 166 |
| 14 | 624 | 76 | applied 437/437 | 183 | 0 | 0 | 5 | 188 |
| 15 | 670 | 77 | applied 437/437 | 124 | 0 | 0 | 8 | 132 |
| 16 | 598 | 68 | applied 437/437 | 172 | 0 | 0 | 48 | 220 |
| repeat | not run | not run | not confirmed; backend skipped | 0 | 0 | 0 | 0 | 0 |
| TOTAL | — | — | — | 2470 | 2 | 0 | 336 | 2808 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 15 670 s
- Repeat lane (DEC-283): Repeat: nothing to repeat
- Database session samples during each start (INC-944): smoke 5, email 5, webkit 7, 1 9, 2 6, 3 7, 4 9, 5 9, 6 9, 7 5, 8 7, 9 5, 10 7, 11 8, 12 8, 13 9, 14 9, 15 9, 16 8, repeat not run
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 482 s; planned/test seconds: 1 642/391, 2 641/365, 3 641/398, 4 640/417, 5 640/410, 6 641/424, 7 641/345, 8 641/387, 9 641/341, 10 643/426, 11 640/453, 12 641/489, 13 640/395, 14 641/427, 15 641/477, 16 641/409
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 43457682073-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-email
  - webkit: not found
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 43457682073-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 43457682073-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 43457682073-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 43457682073-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 43457682073-local-8
  - 9: [e2e:teardown] deleted 11 user(s) owned by process 43457682073-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 43457682073-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 43457682073-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 43457682073-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 43457682073-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 43457682073-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 43457682073-local-16
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
RLS on 90 of 90 public tables
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

## Lane smoke
- Step failure:
Step smoke: outcome failure
  
- admin-translations-governance.spec.ts / U4g bulk approval, order and orphans / TR-30 pseudo-localization fills zxa with stretched machine rows that can never be published @global-state / desktop-1280 — Error: pseudo text never landed for admin.translations.title

## Lane webkit
- Step failure:
start failed in 20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane webkit
## Migration/start failure
Last migration line: Applying migration 20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e.sql...
Cause:
```text
ERROR: M5b proof (2): the door after the import answered success (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-13 16:00:00.002 UTC [274] postgres@postgres ERROR:  M5b proof (2): the door after the import answered success
172.18.0.1 2026-11-13 16:00:00.002 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 82 at RAISE
172.18.0.1 2026-11-13 16:00:00.002 UTC [274] postgres@postgres STATEMENT:  DO $proof$
(91 statement lines dropped)
```
Statement:
```text
At statement: 23
DO $proof$
DECLARE
  v_sig text; v_callee text; v_md5 text; v_acl text; v_oid oid;
  v_uid uuid := gen_random_uuid();
  v_session uuid := gen_random_uuid();
  v_base text; v_lang text;
  v_pre text := 'e2e-d1-m5b.' || substr(gen_random_uuid()::text, 1, 8) || '.';
  v_out jsonb; v_msg text;
BEGIN
  -- (1) each caller: the written body, the core as callee, no door call left, header and ACL unchanged.
(72 lines omitted)
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m5b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m5b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
      RAISE EXCEPTION 'M5b proof (2): the door after the import answered %', coalesce(v_msg, 'success');
    END IF;

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'd1-m5b-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'd1-m5b-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
15:59:59 | 274 | @effect/sql-pg | client backend | active | : | -- ===== P - the end state, proved against the file (G27: no rule is run against a real name - the door tests do that) =
15:59:59 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
15:59:59 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
15:59:59 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
15:59:59 | 203 |  | background writer |  | Activity:BgwriterMain | 
15:59:59 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261028235443_3e3ea913-f01e-472e-a2dd-671adba96a2e stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
Step smoke: outcome failure
  
- admin-listings.spec.ts / ADMIN LISTINGS — the console's doors / ATR-1 Premium from the console: the badge, the preview's look, the History line, the row, one audit row, the feed's rank; then Regular again / desktop-1280 — Error: expect(received).toEqual(expected) // deep equality

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
