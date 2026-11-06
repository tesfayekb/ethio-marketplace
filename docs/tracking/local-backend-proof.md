# Local backend proof (non-gating)

- Commit: `1cc806ce729336dc0710939f9ede8fae0a25801c`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42232739640

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 67 | applied 415/415 | 0 | 0 | 0 | 0 | 0 |
| email | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 1 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 2 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | 890 | 63 | applied 415/415 | 178 | 0 | 0 | 2 | 180 |
| 5 | 617 | 49 | applied 415/415 | 151 | 0 | 0 | 7 | 158 |
| 6 | 785 | 51 | applied 415/415 | 189 | 0 | 0 | 1 | 190 |
| 7 | 429 | 61 | applied 415/415 | 91 | 0 | 0 | 68 | 159 |
| 8 | 612 | 51 | applied 415/415 | 115 | 0 | 0 | 51 | 166 |
| 9 | 872 | 52 | applied 415/415 | 166 | 0 | 0 | 13 | 179 |
| 10 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | 865 | 62 | applied 415/415 | 175 | 0 | 0 | 5 | 180 |
| 13 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 69 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | not run | 68 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 16 | not run | 68 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | 686 | 61 | applied 415/415 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 1217 | 0 | 0 | 147 | 1364 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 4 890 s
- Repeat lane (DEC-283): Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/door-refusals.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (1 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (18 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (5 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (10 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-levels.spec.ts (13 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1376 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 8 repeated; importers of a changed helper: 0 of 102
- Database session samples during each start (INC-944): smoke 7, email 9, 1 9, 2 9, 3 8, 4 7, 5 4, 6 5, 7 6, 8 4, 9 5, 10 9, 11 9, 12 6, 13 8, 14 8, 15 8, 16 8, repeat 6
- Teardown:
  - smoke: not found
  - email: not found
  - 1: not found
  - 2: not found
  - 3: not found
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42232739640-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42232739640-local-5
  - 6: [e2e:teardown] deleted 2 user(s) owned by process 42232739640-local-6
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42232739640-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42232739640-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42232739640-local-9
  - 10: not found
  - 11: not found
  - 12: [e2e:teardown] deleted 40 user(s) owned by process 42232739640-local-12
  - 13: not found
  - 14: not found
  - 15: not found
  - 16: not found
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 42232739640-local-repeat
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.269 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:22:02.051 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.269 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:22:02.051 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:22:02.051 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:22:01 | 438 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
14:22:01 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 5. PROOFS -- (a) catalog facts: three functions VOLATILE
14:22:01 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:22:01 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:22:01 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:22:01 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:22:01 | 205 |  | walwriter |  | Activity:WalWriterMain | 
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.272 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:43.027 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.272 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:43.027 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:43.027 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:41 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 2. PROOFS -- Scratch rows only, rolled back by the senti
14:21:41 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:41 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:41 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:41 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:41 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 2
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 2
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.278 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:26.419 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.278 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:26.419 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:26.419 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:24 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-c): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the door's header an
14:21:24 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:24 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:24 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:24 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:24 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.185 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:38.755 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.185 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:38.755 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:38.755 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:37 | 274 | @effect/sql-pg | client backend | active | : | -- e2e-areas: my-listings, posting -- P-2 (a) M-1c, part 8 of 9 — the free-slot law at the table (ruling 12, DEC-342; CF
14:21:37 | 425 | PostgREST 16.4 | client backend | active | : | with role_setting as ( select r.rolname, unnest(r.rolconfig) as setting from pg_auth_members m join pg_roles r on r.oid 
14:21:37 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:37 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:37 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:37 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:37 | 205 |  | walwriter |  | Activity:WalWriterMain | 
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.275 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:27.898 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.275 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:27.898 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:27.898 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:25 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
14:21:25 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:25 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:25 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:25 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:25 | 205 |  | walwriter |  | Activity:WalWriterMain | 
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.243 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:22.718 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.243 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:22.718 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:22.718 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:21 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 4. PROOFS -- (a) headers, grants, the trigger's catalog 
14:21:21 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:21 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:21 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:21 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:21 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 13
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 13
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.150 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:14.251 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.150 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:14.251 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:14.251 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:12 | 274 | @effect/sql-pg | client backend | active | : | SELECT count(*) = 3 AS provisioned FROM pg_catalog.pg_attribute a JOIN pg_catalog.pg_class c ON c.oid = a.attrelid WHERE
14:21:12 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:12 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:12 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:12 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:12 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 14
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 14
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.147 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:08.490 UTC [275] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.147 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:08.490 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:08.490 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:05 | 275 | @effect/sql-pg | client backend | active | : | REVOKE ALL ON FUNCTION public.admin_undo_category_import(uuid) FROM PUBLIC, anon
14:21:05 | 410 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
14:21:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 15
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 15
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.175 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:33.316 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.175 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:33.316 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:33.316 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:33 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 5. PROOFS -- (a) catalog facts: three functions VOLATILE
14:21:33 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:33 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:33 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:33 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:33 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 16
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.159 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:21:13.066 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.159 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:21:13.066 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:21:13.066 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:21:11 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:21:11 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:21:11 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:21:11 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:21:11 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
