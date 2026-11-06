# Local backend proof (non-gating)

- Commit: `2bcca530fc58f240dec98dd0c0b998089a2cb241`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42214769331

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 66 | applied 415/415 | 0 | 0 | 0 | 0 | 0 |
| email | not run | 76 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 76 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | 640 | 50 | applied 415/415 | 140 | 0 | 0 | 24 | 164 |
| 4 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 5 | 650 | 51 | applied 415/415 | 151 | 0 | 0 | 7 | 158 |
| 6 | not run | 54 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | 1008 | 61 | applied 415/415 | 91 | 0 | 0 | 68 | 159 |
| 8 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 9 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 10 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 76 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | 555 | 50 | applied 415/415 | 141 | 0 | 0 | 17 | 158 |
| 14 | 851 | 60 | applied 415/415 | 188 | 0 | 0 | 2 | 190 |
| 15 | 397 | 60 | applied 415/415 | 96 | 0 | 0 | 62 | 158 |
| 16 | 662 | 61 | applied 415/415 | 132 | 0 | 0 | 36 | 168 |
| repeat | 680 | 60 | applied 415/415 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 1091 | 0 | 0 | 216 | 1307 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 7 1008 s
- Repeat lane (DEC-283): Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/door-refusals.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (1 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (18 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (5 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (10 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-levels.spec.ts (13 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1376 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 8 repeated; importers of a changed helper: 0 of 102
- Database session samples during each start (INC-944): smoke 7, email 9, 1 9, 2 9, 3 4, 4 8, 5 5, 6 5, 7 6, 8 8, 9 8, 10 9, 11 9, 12 9, 13 4, 14 6, 15 6, 16 6, repeat 6
- Teardown:
  - smoke: not found
  - email: not found
  - 1: not found
  - 2: not found
  - 3: [e2e:teardown] deleted 19 user(s) owned by process 42214769331-local-3
  - 4: not found
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42214769331-local-5
  - 6: not found
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42214769331-local-7
  - 8: not found
  - 9: not found
  - 10: not found
  - 11: not found
  - 12: not found
  - 13: [e2e:teardown] deleted 3 user(s) owned by process 42214769331-local-13
  - 14: [e2e:teardown] deleted 2 user(s) owned by process 42214769331-local-14
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42214769331-local-15
  - 16: [e2e:teardown] deleted 3 user(s) owned by process 42214769331-local-16
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 42214769331-local-repeat
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

## Lane smoke
- Step failure:
Step door-guard: outcome failure
  check-doors self-test OK: 7 finding kinds fired on their planted fixtures, the clean pair fired nothing
  56 |     .forEach((text, index) => {
  57 |       if (!text.trim() || text.trim().startsWith("#")) return;
  58 |       const cells = text.split("|").map((cell) => cell.trim());
  59 |       const line = index + 1;
  60 |       const fail = (message: string): never => {
  61 |         throw new Error(`${path}:${line} ${message}: ${text}`);
                         ^
  error: /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/doors/check-doors-allowlist.txt:4 stale allowance: grant-without-caller attr_option_norm_v2(jsonb) | census F1-1: an attribute helper no code, policy or body names; family F1-4a (categories · attributes) revokes or names its caller
        at fail (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/kit.ts:61:19)
        at <anonymous> (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/kit.ts:72:27)
        at forEach (1:11)
        at readAllowlist (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/conformance/kit.ts:56:6)
        at allow (/home/runner/work/ethio-marketplace/ethio-marketplace/scripts/doors/check-doors.ts:171:22)
        at /home/runner/work/ethio-marketplace/ethio-marketplace/scripts/doors/check-doors.ts:221:22
        at loadAndEvaluateModule (2:1)
  
  Bun v1.3.10 (Linux x64)
- No JSON results; smoke skipped

## Lane email
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane email
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.312 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:47.600 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.312 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:47.600 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:47.600 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:22:45 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-a): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the resolver's heade
12:22:45 | 431 | PostgREST 16.4 | client backend | active | Lock:relation | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
12:22:45 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:45 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:45 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:45 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:22:45 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 1
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 1
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.289 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:42.183 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.289 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:42.183 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:42.183 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text


    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:22:40 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-c): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the door's header an
12:22:40 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:40 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:40 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:40 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:22:40 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.280 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:24:22.798 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.280 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:24:22.798 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:24:22.798 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:24:20 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): one scratch e2e-n1b2 seller whose alias is then set mixed-case on its own profile (the -- legacy sha
12:24:20 | 430 | PostgREST 16.4 | client backend | active | : | with recursive pks_fks as ( -- pk + fk referencing col select contype::text as contype, conname, array_length(conkey, 1)
12:24:20 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:24:20 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:24:20 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:24:20 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:24:20 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 4
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 4
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.140 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:33.491 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.140 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:33.491 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:33.491 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:22:31 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
12:22:31 | 413 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
12:22:31 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:31 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:31 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:31 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:22:31 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 6
- Step failure:
start failed in 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05 stmt 18; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05.sql...
Cause:
```text
ERROR: duplicate key value violates unique constraint "languages_pkey" (SQLSTATE 23505)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:17.776 UTC [274] postgres@postgres ERROR:  duplicate key value violates unique constraint "languages_pkey"
172.18.0.1 2026-11-06 12:22:17.776 UTC [274] postgres@postgres DETAIL:  Key (code)=(qb2) already exists.
172.18.0.1 2026-11-06 12:22:17.776 UTC [274] postgres@postgres CONTEXT:  SQL statement "INSERT INTO public.languages (code, name_en, name_native, enabled_admin, enabled_public, sort)
	    VALUES (v_lang_on, v_tag || ' on', v_tag, true, true, 9001), (v_lang_off, v_tag || ' off', v_tag, true, false, 9002)"
	PL/pgSQL function inline_code_block line 57 at SQL statement
172.18.0.1 2026-11-06 12:22:17.776 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 4. PROOFS
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
12:22:15 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
12:22:15 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:15 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:15 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:15 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:22:15 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051900_a9d4c7e2-1b8f-4e3a-b6d5-0c7f9e1a3b05 stmt 18; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 8
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 8
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.147 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:24.091 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.147 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:24.091 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:24.091 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text


    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:22:21 | 274 | @effect/sql-pg | client backend | active | : | CREATE OR REPLACE FUNCTION public.remove_listing_photo(p_listing_id uuid, p_photo_id uuid) RETURNS jsonb LANGUAGE plpgsq
12:22:21 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:21 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:21 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:21 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:22:21 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 9
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 9
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.152 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:21.972 UTC [273] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.152 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:21.972 UTC [273] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:21.972 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:22:19 | 273 | @effect/sql-pg | client backend | active | : | -- admin_commit_category_import: live body (md5(prosrc) [masked hex]) whole; the only change: 2 call
12:22:19 | 411 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
12:22:19 | 207 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:19 | 208 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:19 | 201 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:19 | 202 |  | background writer |  | Activity:BgwriterMain | 
12:22:19 | 204 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 10
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.285 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:22:47.080 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.285 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:22:47.080 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:22:47.080 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text


    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:22:44 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (NCQ-9…12): its own scratch users only; the queue is read through the core scoped to them -- (the door's allow 
12:22:44 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:22:44 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:22:44 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:22:44 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:22:44 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 11
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.266 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:23:06.572 UTC [275] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.266 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:23:06.572 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:23:06.572 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text


    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:23:04 | 275 | @effect/sql-pg | client backend | active | : | -- Proof (INC-970, INC-980): it reads only the job_runs rows it created (by the returned id) and net's queue -- filtered
12:23:04 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:23:04 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:23:04 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:23:04 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:23:04 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 12
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 12
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.273 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 12:23:07.132 UTC [275] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.273 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 12:23:07.132 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 12:23:07.132 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
(241 statement lines dropped)
```
Statement:
```text
At statement: 23
-- ------------------------------------------------------------ 5. PROOFS
-- (a) catalog facts: three functions VOLATILE SECURITY DEFINER with search_path public, closed to browser roles;
--     the table closed (no browser privilege, RLS on, four deny policies, the updated_at trigger).
-- (b) the premise (STEP 2, SQL side): a planted scratch door on the shell writing e2e_mig_door_rows under the
--     dial 'draft' — a refused call RETURNS {ok:false, code:P0D01, message, refusals}, rate_limits counts it, a
--     door_refusals row exists, the table has no row; an allowed call counts once and writes one row; the dial
--     over its limit refuses rateLimited at 429 and counts. The door and its table are dropped by the block.
-- (c) the gates in the law's order: no caller → notSignedIn; a signed-out public call passes without a count; a
--     deactivated caller → accountDeactivated (before the permission is read); a caller without the permission →
--     permissionDenied; a country grant for another country in match mode → permissionDenied:scope, for its own
(222 lines omitted)

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
```
Last 20 lines:
```text

    PERFORM set_config('request.jwt.claims', '{}', true);
    RAISE EXCEPTION 'f1a2-proof-ok';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'f1a2-proof-ok' THEN RAISE; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '{}', true);
END;
$proof$
Try rerunning the command with --debug to troubleshoot the error.
Database sessions at the last sample (INC-944; time | pid | application | backend | state | wait | query):
12:23:05 | 275 | @effect/sql-pg | client backend | active | : | INSERT INTO supabase_migrations.schema_migrations(version, name, statements) VALUES($1, $2, $3)
12:23:05 | 433 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
12:23:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
12:23:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
12:23:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
12:23:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
12:23:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
