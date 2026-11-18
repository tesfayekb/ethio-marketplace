# Local backend proof (non-gating)

- Commit: `4cd29db8039d29d1973b14212597135ad298f304`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/44309748223

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | 648 | 62 | applied 515/515 | 27 | 0 | 0 | 5 | 32 |
| email | 200 | 52 | applied 515/515 | 6 | 0 | 0 | 0 | 6 |
| webkit | not run | 60 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | 1032 | 63 | applied 515/515 | 188 | 0 | 0 | 69 | 257 |
| 2 | 613 | 73 | applied 515/515 | 174 | 0 | 0 | 26 | 200 |
| 3 | 814 | 61 | applied 515/515 | 169 | 0 | 0 | 5 | 174 |
| 4 | 628 | 79 | applied 515/515 | 137 | 0 | 0 | 5 | 142 |
| 5 | 576 | 64 | applied 515/515 | 93 | 0 | 0 | 1 | 94 |
| 6 | 595 | 69 | applied 515/515 | 153 | 0 | 0 | 41 | 194 |
| 7 | 523 | 62 | applied 515/515 | 147 | 0 | 0 | 77 | 224 |
| 8 | 642 | 63 | applied 515/515 | 179 | 0 | 0 | 7 | 186 |
| 9 | 597 | 79 | applied 515/515 | 123 | 0 | 0 | 1 | 124 |
| 10 | 909 | 62 | applied 515/515 | 160 | 0 | 0 | 2 | 162 |
| 11 | 674 | 82 | applied 515/515 | 120 | 0 | 0 | 8 | 128 |
| 12 | 689 | 76 | applied 515/515 | 164 | 0 | 0 | 19 | 183 |
| 13 | 608 | 81 | applied 515/515 | 157 | 0 | 0 | 9 | 166 |
| 14 | 568 | 65 | applied 515/515 | 183 | 0 | 0 | 5 | 188 |
| 15 | 553 | 53 | applied 515/515 | 124 | 0 | 0 | 8 | 132 |
| 16 | 923 | 60 | applied 515/515 | 172 | 0 | 0 | 48 | 220 |
| repeat | 347 | 80 | applied 515/515 | 116 | 0 | 0 | 0 | 116 |
| TOTAL | — | — | — | 2592 | 0 | 0 | 336 | 2928 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the twenty lanes)

- Slowest lane: 1 1032 s
- Repeat lane (DEC-283): Not repeated: e2e/admin-listings.spec.ts (39 tests); Not repeated: e2e/admin-screening.spec.ts (29 tests); Repeat: each 2 on both projects; 97 tests selected, 29 repeated; budget 643 s at 4.7 s a test; directly changed: 2 of 4 repeated; importers of a changed helper: 0 of 0; Repeat in WebKit (DEC-371): 0 of the repeated tests, on webkit-1280 and webkit-390
- Database session samples during each start (INC-944): smoke 6, email 5, webkit 6, 1 6, 2 9, 3 6, 4 10, 5 7, 6 8, 7 6, 8 6, 9 10, 10 6, 11 10, 12 9, 13 10, 14 7, 15 5, 16 6, repeat 10
- Lane plan (DEC-375 b): 16 lanes over 115 files, weights from run 43431755160 (2026-11-13); mean 641 s, largest 643 s (+0 %); alone: none; unweighed (median 39 s): none; repeat budget 643 s; planned/test seconds: 1 642/336, 2 641/406, 3 641/337, 4 640/435, 5 640/379, 6 641/403, 7 641/314, 8 641/350, 9 641/405, 10 643/299, 11 640/440, 12 641/484, 13 640/408, 14 641/375, 15 641/375, 16 641/325
- Teardown:
  - smoke: [e2e:teardown] deleted 2 user(s) owned by process 44309748223-localproof
  - email: [e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-email
  - webkit: not found
  - 1: [e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-1
  - 2: [e2e:teardown] deleted 9 user(s) owned by process 44309748223-local-2
  - 3: [e2e:teardown] deleted 5 user(s) owned by process 44309748223-local-3
  - 4: [e2e:teardown] deleted 25 user(s) owned by process 44309748223-local-4
  - 5: [e2e:teardown] deleted 15 user(s) owned by process 44309748223-local-5
  - 6: [e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-6
  - 7: [e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-7
  - 8: [e2e:teardown] deleted 8 user(s) owned by process 44309748223-local-8
  - 9: [e2e:teardown] deleted 13 user(s) owned by process 44309748223-local-9
  - 10: [e2e:teardown] deleted 5 user(s) owned by process 44309748223-local-10
  - 11: [e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-11
  - 12: [e2e:teardown] deleted 5 user(s) owned by process 44309748223-local-12
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 44309748223-local-13
  - 14: [e2e:teardown] deleted 11 user(s) owned by process 44309748223-local-14
  - 15: [e2e:teardown] deleted 43 user(s) owned by process 44309748223-local-15
  - 16: [e2e:teardown] deleted 23 user(s) owned by process 44309748223-local-16
  - repeat: [e2e:teardown] deleted 18 user(s) owned by process 44309748223-local-repeat
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

## Lane webkit
- Step failure:
start failed in 20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58 stmt 7; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane webkit
## Migration/start failure
Last migration line: Applying migration 20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58.sql...
Cause:
```text
ERROR: F1-6a part 4 proof (d): a country enforcer's edit of its country's ad answered {"ok": false, "refusals": [{"field": "title", "reason": "contactInText"}]} (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-18 13:05:24.636 UTC [274] postgres@postgres ERROR:  F1-6a part 4 proof (d): a country enforcer's edit of its country's ad answered {"ok": false, "refusals": [{"field": "title", "reason": "contactInText"}]}
172.18.0.1 2026-11-18 13:05:24.636 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 232 at RAISE
172.18.0.1 2026-11-18 13:05:24.636 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 3. PROOFS
(279 statement lines dropped)
```
Statement:
```text
At statement: 7
-- ------------------------------------------------------------ 3. PROOFS
-- (a) catalog facts of both doors: VOLATILE SECURITY DEFINER, RETURNS jsonb, EXECUTE for authenticated and the service
--     role, never anon or PUBLIC; each body this file's (md5).
-- (b) the gates of both: no caller notSignedIn (401); a person without listings:enforce permissionDenied (403); a
--     deactivated holder accountDeactivated (403); a holder with no verified factor 'step-up required: no verified
--     factor' (P0009).
-- (c) the codes with every earlier check cleared, 400: the move's badValue:to, listingNotFound, ownListing,
--     illegalTransition:removed-removed; the edit's badValue:reason, nothingChanged, listingNotFound, listingRemoved,
--     ownListing. A country enforcer: the edit of an ad in another country and any move permissionDenied:scope (403).
-- (d) the global enforcer removes an ad; the country enforcer edits an ad of its country: {ok:true}.
(260 lines omitted)
    END IF;

    RAISE EXCEPTION 'f1-6a-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text
         IS DISTINCT FROM v_edit0 + 9 THEN
      RAISE EXCEPTION 'F1-6a part 4 proof (e): door_refusals did not meter the 8 + 9 refusals';
    END IF;

    RAISE EXCEPTION 'f1-6a-part-4-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1-6a-part-4-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
13:05:23 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
13:05:23 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
13:05:23 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
13:05:23 | 203 |  | background writer |  | Activity:BgwriterMain | 
13:05:23 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261118012400_64aca671-da4e-4957-9b60-d2507bbdec58 stmt 7; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — twenty lanes (eighteen, the WebKit lane of DEC-371 and the repeat lane of DEC-283), the email lane included; two consecutive full dev runs judge each change.
