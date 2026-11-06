# Local backend proof (non-gating)

- Commit: `695554dd1f72248272daed52c134a926df0c2104`
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/42236422436

| Lane | Job seconds | Start seconds | Migrations | Passed | Failed | Flaky | Skipped | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| smoke | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| email | 766 | 65 | applied 415/415 | 6 | 0 | 0 | 0 | 6 |
| 1 | 1010 | 66 | applied 415/415 | 168 | 0 | 0 | 6 | 174 |
| 2 | not run | 73 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 3 | not run | 70 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 4 | 838 | 54 | applied 415/415 | 178 | 0 | 0 | 2 | 180 |
| 5 | 608 | 49 | applied 415/415 | 151 | 0 | 0 | 7 | 158 |
| 6 | not run | 72 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 7 | 366 | 52 | applied 415/415 | 91 | 0 | 0 | 68 | 159 |
| 8 | 1246 | 62 | applied 415/415 | 115 | 0 | 0 | 51 | 166 |
| 9 | 907 | 56 | applied 415/415 | 166 | 0 | 0 | 13 | 179 |
| 10 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 11 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 12 | not run | 74 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 13 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 14 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| 15 | 421 | 63 | applied 415/415 | 96 | 0 | 0 | 62 | 158 |
| 16 | not run | 75 | not confirmed; backend failure | 0 | 0 | 0 | 0 | 0 |
| repeat | 637 | 51 | applied 415/415 | 152 | 0 | 0 | 0 | 152 |
| TOTAL | — | — | — | 1123 | 0 | 0 | 209 | 1332 |
- Full evidence: docs/tracking/local-backend-last-failure.md (CI's failure reporter over the nineteen lanes)

- Slowest lane: 8 1246 s
- Repeat lane (DEC-283): Not repeated: e2e/auth-caller-gates.spec.ts (4 tests); Not repeated: e2e/door-refusals.spec.ts (6 tests); Not repeated: e2e/legal-admin.spec.ts (22 tests); Not repeated: e2e/legal-certify.spec.ts (22 tests); Not repeated: e2e/my-listings-doors.spec.ts (14 tests); Not repeated: e2e/my-listings-page.spec.ts (8 tests); Not repeated: e2e/posting-routes-dials.spec.ts (7 tests); Not repeated: e2e/account-saved.spec.ts (2 tests); Not repeated: e2e/ad-page-doors.spec.ts (15 tests); Not repeated: e2e/ad-page-layout.spec.ts (1 tests); Not repeated: e2e/ad-page.spec.ts (39 tests); Not repeated: e2e/admin-ai-calls.spec.ts (1 tests); Not repeated: e2e/admin-attributes-editor.spec.ts (18 tests); Not repeated: e2e/admin-attributes-import.spec.ts (20 tests); Not repeated: e2e/admin-attributes-library.spec.ts (21 tests); Not repeated: e2e/admin-attributes-links.spec.ts (17 tests); Not repeated: e2e/admin-attributes-safety.spec.ts (9 tests); Not repeated: e2e/admin-audit.spec.ts (7 tests); Not repeated: e2e/admin-categories-console.spec.ts (17 tests); Not repeated: e2e/admin-categories-home.spec.ts (5 tests); Not repeated: e2e/admin-categories-images.spec.ts (1 tests); Not repeated: e2e/admin-categories-lifecycle.spec.ts (26 tests); Not repeated: e2e/admin-countries.spec.ts (9 tests); Not repeated: e2e/admin-guides.spec.ts (7 tests); Not repeated: e2e/admin-locations.spec.ts (19 tests); Not repeated: e2e/admin-monetisation.spec.ts (17 tests); Not repeated: e2e/admin-roles.spec.ts (14 tests); Not repeated: e2e/admin-screening.spec.ts (27 tests); Not repeated: e2e/admin-services.spec.ts (5 tests); Not repeated: e2e/admin-shell.spec.ts (6 tests); Not repeated: e2e/admin-translations-console.spec.ts (22 tests); Not repeated: e2e/admin-translations-data.spec.ts (5 tests); Not repeated: e2e/admin-translations-governance.spec.ts (4 tests); Not repeated: e2e/admin-users.spec.ts (14 tests); Not repeated: e2e/auth-callback.spec.ts (4 tests); Not repeated: e2e/auth-google.spec.ts (2 tests); Not repeated: e2e/auth-reset.spec.ts (6 tests); Not repeated: e2e/auth-signin-errors.spec.ts (5 tests); Not repeated: e2e/auth-signout.spec.ts (18 tests); Not repeated: e2e/breadcrumbs.spec.ts (3 tests); Not repeated: e2e/category-nav.spec.ts (5 tests); Not repeated: e2e/choice-lists.spec.ts (48 tests); Not repeated: e2e/dark-cards.spec.ts (2 tests); Not repeated: e2e/dialogs.spec.ts (7 tests); Not repeated: e2e/feed-index.spec.ts (15 tests); Not repeated: e2e/feed-route.spec.ts (11 tests); Not repeated: e2e/feed-screens.spec.ts (18 tests); Not repeated: e2e/fonts.spec.ts (1 tests); Not repeated: e2e/house-style.spec.ts (6 tests); Not repeated: e2e/i18n-bundle.spec.ts (3 tests); Not repeated: e2e/i18n-coverage.spec.ts (7 tests); Not repeated: e2e/i18n-layers.spec.ts (3 tests); Not repeated: e2e/i18n-sign-in-language.spec.ts (6 tests); Not repeated: e2e/import-security.spec.ts (18 tests); Not repeated: e2e/layout.spec.ts (5 tests); Not repeated: e2e/legal-accept.spec.ts (6 tests); Not repeated: e2e/legal-doors.spec.ts (17 tests); Not repeated: e2e/legal-history.spec.ts (3 tests); Not repeated: e2e/legal-pages.spec.ts (5 tests); Not repeated: e2e/locale-format.spec.ts (1 tests); Not repeated: e2e/menu-rows.spec.ts (3 tests); Not repeated: e2e/mfa-stepup.spec.ts (10 tests); Not repeated: e2e/my-listings-ad.spec.ts (18 tests); Not repeated: e2e/my-listings-levels.spec.ts (13 tests); Not repeated: e2e/name-check-queue.spec.ts (4 tests); Not repeated: e2e/on-demand-failure.spec.ts (1 tests); Not repeated: e2e/one-line-slots-admin.spec.ts (5 tests); Not repeated: e2e/one-line-slots.spec.ts (5 tests); Not repeated: e2e/overlay-shift.spec.ts (3 tests); Not repeated: e2e/overlays.spec.ts (4 tests); Not repeated: e2e/page-head.spec.ts (2 tests); Not repeated: e2e/phone-frame.spec.ts (9 tests); Not repeated: e2e/photo-pipeline.spec.ts (34 tests); Not repeated: e2e/post-wizard-bundle2.spec.ts (35 tests); Not repeated: e2e/post-wizard-category.spec.ts (24 tests); Not repeated: e2e/post-wizard-details.spec.ts (4 tests); Not repeated: e2e/post-wizard-finder.spec.ts (4 tests); Not repeated: e2e/post-wizard-place.spec.ts (19 tests); Not repeated: e2e/post-wizard-pricing.spec.ts (26 tests); Not repeated: e2e/post-wizard-recent.spec.ts (1 tests); Not repeated: e2e/post-wizard-removed.spec.ts (2 tests); Not repeated: e2e/post-wizard-resets.spec.ts (17 tests); Not repeated: e2e/post-wizard-specs.spec.ts (41 tests); Not repeated: e2e/post-wizard-units.spec.ts (2 tests); Not repeated: e2e/post-wizard-where.spec.ts (16 tests); Not repeated: e2e/posting-routes-catalog.spec.ts (9 tests); Not repeated: e2e/posting-routes-identity.spec.ts (2 tests); Not repeated: e2e/posting-routes.spec.ts (40 tests); Not repeated: e2e/press.spec.ts (11 tests); Not repeated: e2e/primitives-law.spec.ts (12 tests); Not repeated: e2e/rail-first-paint.spec.ts (2 tests); Not repeated: e2e/rbac.spec.ts (3 tests); Not repeated: e2e/sage-ad-page.spec.ts (9 tests); Not repeated: e2e/sage-bands.spec.ts (38 tests); Not repeated: e2e/sage-cards.spec.ts (14 tests); Not repeated: e2e/sage-shell.spec.ts (40 tests); Not repeated: e2e/sage-tiers.spec.ts (20 tests); Not repeated: e2e/seller-name-hidden.spec.ts (1 tests); Not repeated: e2e/settings.spec.ts (9 tests); Not repeated: e2e/shell-bands.spec.ts (8 tests); Not repeated: e2e/shell-table-law.spec.ts (1 tests); Not repeated: e2e/shell.spec.ts (117 tests); Not repeated: e2e/smoke-auth-i18n.spec.ts (1 tests); Not repeated: e2e/submenu-look.spec.ts (6 tests); Not repeated: e2e/submenu-touch.spec.ts (4 tests); Not repeated: e2e/submenu.spec.ts (7 tests); Not repeated: e2e/supabase-door.spec.ts (6 tests); Not repeated: e2e/user-guides.spec.ts (9 tests); Not repeated: e2e/viewing-place.spec.ts (11 tests); Repeat: each 2 on both projects; 1376 tests selected, 38 repeated; budget 720 s at 4.7 s a test; directly changed: 1 of 8 repeated; importers of a changed helper: 0 of 102
- Database session samples during each start (INC-944): smoke 9, email 7, 1 7, 2 9, 3 8, 4 5, 5 4, 6 9, 7 5, 8 6, 9 5, 10 9, 11 9, 12 9, 13 9, 14 9, 15 7, 16 9, repeat 4
- Teardown:
  - smoke: not found
  - email: [e2e:teardown] deleted 3 user(s) owned by process 42236422436-local-email
  - 1: [e2e:teardown] deleted 9 user(s) owned by process 42236422436-local-1
  - 2: not found
  - 3: not found
  - 4: [e2e:teardown] deleted 40 user(s) owned by process 42236422436-local-4
  - 5: [e2e:teardown] deleted 3 user(s) owned by process 42236422436-local-5
  - 6: not found
  - 7: [e2e:teardown] deleted 2 user(s) owned by process 42236422436-local-7
  - 8: [e2e:teardown] deleted 3 user(s) owned by process 42236422436-local-8
  - 9: [e2e:teardown] deleted 9 user(s) owned by process 42236422436-local-9
  - 10: not found
  - 11: not found
  - 12: not found
  - 13: not found
  - 14: not found
  - 15: [e2e:teardown] deleted 2 user(s) owned by process 42236422436-local-15
  - 16: not found
  - repeat: [e2e:teardown] deleted 6 user(s) owned by process 42236422436-local-repeat
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
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane smoke
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.274 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:09.137 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.274 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:09.137 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:09.137 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:07 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real -- row read, G27), rol
14:46:07 | 430 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
14:46:07 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:07 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:07 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:07 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:46:07 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.246 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:03.996 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.246 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:03.996 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:03.996 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:03 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 5. PROOFS -- (a) catalog facts: three functions VOLATILE
14:46:03 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:03 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:03 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:03 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:46:03 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 3
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 3
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.163 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:09.575 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.163 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:09.575 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:09.575 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:06 | 274 | @effect/sql-pg | client backend | active | : | -- e2e-areas: legal -- Bundle 22 turn 23 M17b: readers and actual shown-language acceptance (DEC-228). CREATE OR REPLACE
14:46:06 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:06 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:06 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:06 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:46:06 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 0
```

## Lane 6
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 6
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.169 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:44.164 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.169 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:44.164 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:44.164 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:44 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:44 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:44 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:44 | 204 |  | background writer |  | Activity:BgwriterMain | 
14:46:44 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 0
```

## Lane 10
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 10
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.270 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:07.288 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.270 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:07.288 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:07.288 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:05 | 274 | @effect/sql-pg | client backend | active | : | RESET ALL
14:46:05 | 431 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
14:46:05 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:05 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:05 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:05 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:46:05 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 11
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 11
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.281 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:15.784 UTC [275] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.281 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:15.784 UTC [275] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:15.784 UTC [275] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:13 | 432 | PostgREST 16.4 | client backend | active | : | with recursive pks_fks as ( -- pk + fk referencing col select contype::text as contype, conname, array_length(conkey, 1)
14:46:13 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:13 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:13 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:13 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:46:13 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 0; autovacuum: 0; other sessions: 1
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.257 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:05.165 UTC [273] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.257 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:05.165 UTC [273] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:05.165 UTC [273] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:03 | 273 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1 M1c): scratch rows only (two users, one category, one package, four prices; no real -- row read, G27), rol
14:46:03 | 428 | PostgREST 16.4 | client backend | active | : | with all_relations as ( select reltype from pg_class where relkind in ('v','r','m','f','p') union select oid from pg_typ
14:46:03 | 209 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:03 | 210 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:03 | 203 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:03 | 204 |  | background writer |  | Activity:BgwriterMain | 
14:46:03 | 206 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.252 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:46:46.778 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.252 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:46:46.778 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:46:46.778 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:46:45 | 274 | @effect/sql-pg | client backend | active | : | -- ------------------------------------------------------------ 5. PROOFS -- (a) catalog facts: three functions VOLATILE
14:46:45 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:46:45 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:46:45 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:46:45 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:46:45 | 205 |  | walwriter |  | Activity:WalWriterMain | 
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
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.277 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:48:59.779 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.277 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:48:59.779 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:48:59.779 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:48:58 | 274 | @effect/sql-pg | client backend | active | : | -- PROOF (P-1b M-c): scratch rows only, rolled back by the sentinel; no real row read (G27). -- (a) the door's header an
14:48:58 | 431 | PostgREST 16.4 | client backend | active | : | WITH base_types AS ( SELECT t.oid, bt.typnamespace AS base_namespace, bt.oid AS base_type FROM pg_type t JOIN pg_type bt
14:48:58 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:48:58 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:48:58 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:48:58 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:48:58 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

## Lane 16
- Step failure:
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
Step backend: outcome failure
  ::add-mask::[masked]
  ::add-mask::[masked]
- No JSON results; smoke skipped

## Lane 16
## Migration/start failure
Last migration line: Applying migration 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02.sql...
Cause:
```text
ERROR: F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.290 ms per call (the bar is 1 ms, ruling 5 §2) (SQLSTATE P0001)
```
Server record (DEC-340, stream):
```text
172.18.0.1 2026-11-06 14:48:02.528 UTC [274] postgres@postgres ERROR:  F1-1 M-F1a part 2 proof (d): door_context(staff) costs 1.290 ms per call (the bar is 1 ms, ruling 5 §2)
172.18.0.1 2026-11-06 14:48:02.528 UTC [274] postgres@postgres CONTEXT:  PL/pgSQL function inline_code_block line 213 at RAISE
172.18.0.1 2026-11-06 14:48:02.528 UTC [274] postgres@postgres STATEMENT:  -- ------------------------------------------------------------ 5. PROOFS
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
14:48:00 | 274 | @effect/sql-pg | client backend | active | : | -- Proof (INC-980): its own scratch e2e-n1b2 seller (v_u) only, the legacy mixed-case alias shape included (INC-986); ro
14:48:00 | 431 | PostgREST 16.4 | client backend | active | : | WITH pks_uniques_cols AS ( SELECT conrelid, array_agg(key order by key) as cols FROM pg_constraint, LATERAL unnest(conke
14:48:00 | 208 | pg_cron scheduler | pg_cron launcher |  | Extension:Extension | 
14:48:00 | 209 |  | logical replication launcher |  | Activity:LogicalLauncherMain | 
14:48:00 | 202 |  | checkpointer |  | Activity:CheckpointerMain | 
14:48:00 | 203 |  | background writer |  | Activity:BgwriterMain | 
14:48:00 | 205 |  | walwriter |  | Activity:WalWriterMain | 
start failed in 20261106051600_8b7c2e41-3d5f-4a9b-b0c6-2e9d4f7a1b02 stmt 23; cron jobs: 0 (scheduler present); appliers: 1; autovacuum: 0; other sessions: 1
```

DEC-211, DEC-218, DEC-232: every gating browser test runs here — nineteen lanes (eighteen and the repeat lane, DEC-283), the email lane included; two consecutive full dev runs judge each change.
