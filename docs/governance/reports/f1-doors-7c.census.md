# f1-doors-7c — the census (STEP 1)

Base: dev 7e7040c99 (`origin/dev` = `origin/main` = 7e7040c99 when read). CI for 7e7040c: SUCCESS
(run 44706314775, completed 2026-11-20T09:02:58Z, `ci-evidence:docs/tracking/ci-status.md`).
Every number below comes from a command run in this turn on this tree. The scratch scripts live in
`/tmp/ethio-scratch/f1-doors-7c/` (`callers.ts`, `prosrc.ts`, `md5.ts`, `body.ts`, `db-census*.ts`).

VERDICT: STOP after the census, on three of the brief's conditions: (a) THE CUT (the typed `Result`
reaches 117 further sites; the fold and the session reach about 41 source files), (b) the session's
cause cannot be found from the code, and (d) the session's one end-state needs
`src/components/app-shell.tsx` and `src/routes/auth.tsx`, which no clause of SCOPE reaches. Condition
(c) does not hold (the drop set below has no SQL, policy, route or published-client caller). Condition
(e) does not hold (the reader's-status mechanism below leaves every door shell untouched). The split
the brief asks for is proposed at the end.

## consumers

### Client parsers of a refusal (PREVENTION (1), then by definition)

The mechanism: `splitRefusal` / `readRefusal` / `refusalsOf` / `fillRefusal` in `src/lib/refusal.ts`
(the code is the text before the first `:`, the detail the rest).

| File:line | Its rule today | After the fold |
| --- | --- | --- |
| `src/lib/refusal.ts` | the mechanism | the mechanism |
| `src/lib/door-codes.ts` (`CODE_SHAPE`, `doorCode`) | its own regex `^([a-z][A-Za-z]*)(?::(.*))?$` beside `splitRefusal` (a second parser) | `doorCode` reads through `splitRefusal`; `DOOR_CODES` stays |
| `src/lib/reader-failure.ts:54` | a regex of leading codes for `refused`; the class judged by status first (401/403/PGRST301/42501 → `auth`, ≥ 500 → `server`) | the code from `splitRefusal`, then the (now real) status |
| `src/lib/door-error.ts` (`REASON_CODE`, `CODE_HEAD`, `doorRefusal`) | its own head pattern | reads through `splitRefusal` |
| `src/lib/refusal-tail.ts` | already `splitRefusal` | unchanged |
| `src/features/posting/door-error.ts` | a re-export of `doorRefusal` | unchanged |
| `src/server/door.ts:52` | whole-message compare `refusal.reason === error.message.trim()`, else `logRouteError` (INC-1214) | logs only `doorError` |
| `src/server/answer.ts:164` | `error instanceof Error ? error.stack : error` (INC-1215: `[object Object]`) | `errorWithStack` / `errorText` |
| `src/server/imports/route.ts` (`CODE_WORD`, `CODE_DETAIL`, `CODE_STATUS`, `codedRefusal` gated on `error.code !== "P0D01"`, `IMPORT_REFUSALS`) | its own split and a SECOND status table (`CODE_STATUS`, `rateLimited: 429` at :100) | `splitRefusal`; the status from the one table (a finding: a second status table) |
| `src/server/imports/csv.ts` (`exportRefusal`) | already `doorCode` + `splitRefusal` | unchanged but for `doorCode`'s fold |
| `src/routes/api/translate.ts:64-76` | an exact-message map `WRITER_REASONS` and `startsWith("step-up required")` | reads codes |
| `src/features/admin/impersonation/impersonation-service.ts:142-145` (`isExpiredSessionError`) | `/^noActiveSession(?::|$)/` and the old sentence | `splitRefusal`; the old sentence leaves |
| `src/features/auth/deactivated.ts:37` (`isDeactivatedRefusal`) | dead | see premises: only this function is dead |
| `src/routes/api/feed.ts:80,83`, `src/routes/api/seller.ts:59,63` | `message.includes(...)` | `splitRefusal` |
| `src/server/seller-page.ts:28` | `startsWith("seller_feed_page: unknownSeller")` (a sentence) | the code |
| `src/routes/api/attributes.$id.options.ts:44-45` | `message.includes("attributeNotFound" / "rateLimited")` | the code |
| `src/features/admin-countries/country-verb-dialogs.tsx:54,166`, `src/features/admin-locations/location-verb-dialogs.tsx:253` | `errorText(error).startsWith(code)` | the code |
| `src/features/posting/posting-service.ts:1149-1151` (`pinAnswer`) | `message.includes("rateLimited")` | the code |
| `src/features/admin-categories/use-image-failure.ts:10` | `CODE_SHAPED` regex | the code |
| `src/features/posting/refusal-text.ts:17`, `src/features/my-listings/my-listing.ts:595`, `src/features/legal/legal-reader.ts:101` | `split(":")[0]` | `splitRefusal` |
| `src/features/admin/import-dialog.tsx:203` (and its status reads :267-273) | `indexOf(":")` | `splitRefusal` |
| `src/features/admin-listings/listings-page.tsx:317` | `doorCode(message)` | through the folded `doorCode` |
| `src/features/admin/translations/translations-service.ts` | a text match (hit by the definition's grep) | to classify at the fold |
| `src/lib/error-text.ts`, `src/lib/route-client.ts`, `src/server.ts` | hits of the grep; not refusal parsers (error text, transport) | unchanged |
| `src/routes/api/listings/draft.ts:104,107` | constraint names (a Postgres error, not a refusal) | unchanged |
| `src/features/auth/mfa/mfa-service.ts:100`, `src/features/auth/auth-error-key.ts` | GoTrue's errors | unchanged |

Importers of the parsers (`rg -l` of the import, tests excluded): `door-codes` 8, `reader-failure` 27,
`door-error` 3, `refusal-tail` 7, `deactivated` 2, `impersonation-service` 2.

### Readers of a status

`src/lib/supabase-door.ts` `rpc()` returns `{message, code, details, hint}` and DROPS the HTTP status
(a finding; the typed `Result` would carry it). `reader-failure.ts` judges a status where one
arrives. `import-dialog.tsx:267-273` reads route statuses. `stepUpRequired()` (`answer.ts`) answers 428
`P0009`.

### The session's end

`src/integrations/supabase/client.ts` (platform: implicit flow, `detectSessionInUrl`,
`persistSession`, `autoRefreshToken: true`, `storage: brokeredPreviewStorage()`);
`src/integrations/supabase/previewAuthStorage.ts` (platform: `localStorage` off the framed preview);
`src/lib/supabase-door.ts` (`currentSession`, `forgetStoredSession`, `hasStoredSession`,
`onAuthChange`, a storage-event listener); `src/features/auth/auth-service.ts` (`storedSession`,
`evictExpiredSession`, `awaitSessionCommit`, `rehydrate` :439-480, `signOut({scope:"others"})` at
:266, :345, :591, :652); `src/features/auth/sign-out.ts`; `src/features/auth/use-auth.ts`
(`applyUser`, the deactivation sign-out); `src/features/session/session-policy.ts`;
`src/components/app-shell.tsx` (`hardReset` :681-742, `onExpire` :766, the live guard :827-846);
`src/routes/auth.tsx` (the mount rehydrate :189, the check-email poll :256);
`src/components/shell/app-rail.tsx`, `src/routes/admin.tsx`, `src/routes/settings.tsx` (sign-out
callers); `src/lib/session-bearer.ts`, `auth-attacher.ts` (the bearer).

### Every poll and its stop condition

| Poll | Cadence | Stops when |
| --- | --- | --- |
| `use-impersonation.ts:31` `get_active_impersonation` | 30 s, plus a re-read on every route change (:40), plus React Query's defaults (`src/router.tsx:6` `new QueryClient()` with no options: 3 retries at 1, 2, 4 s, refetch on focus) — the 1–10 s cadence the logs show | `enabled` false (signed out, signing out, not staff); never on a 401 |
| `use-impersonation.ts:89` | 1 s clock (no network) | unmount |
| `session-policy.ts:324` | 1 s tick (no network) | inactive |
| `src/routes/auth.tsx:256` check-email | 5 s plus focus / visibility / pageshow | signed in or unmount |
| `src/features/posting/step-review.tsx:270` | 10 s | unmount; never on a 401 |

## definition

`door_context`'s classes (last declaration
`20261119150000_1b7e8a6b-7a49-469b-918b-36a244454c88.sql:32`): `owner`, `staff`, `public`, `reader`,
`staff-reader`. Manifest classes (`scripts/doors/manifest.txt`): owner 33, staff 90, public-door 1
(`public_listing`, dial `listing_read`), public-reader 13 (11 `public-data` readers off the gate;
`legal_in_force`, `legal_scheduled` on `door_context('public')`), signed-in-reader 26, staff-reader 55,
helper 2. On the shell: 124 doors, every one with a dial and the P0D01 handler; 83 readers on the
gate, every one with no dial and `door_context` first; no reader is called from a door's body.

Callers of `door_refuse` outside a shell (the readers' refusals): the 83 readers on the gate; and
helpers with no `door_context` of their own: `impersonation_target` (called by the readers
`impersonated_get_profile`, `impersonated_list_listings`); `attr_export_payload` (the reader
`admin_export_attributes`; `import_readonly_ignored`, plain); `transition_listing_core` (doors; the
job `designation_sweep_core`); `locations_ancestry_guard` (a trigger); the `*_core` / `*_impl`
functions (doors only). `my_saved_listings` raises inside its own `WHEN others` handler and
`promote_options` catches only `marketNotSet`: both reach the caller unchanged.

### The reader's-status mechanism (proposed; it keeps every door's shell untouched)

PostgREST v14 (the generated types record `PostgrestVersion "14.5"`): a raise with SQLSTATE `PTxyz`
answers status xyz, but its body's `code` becomes `PTxyz`. A raise with SQLSTATE `PGRST`,
`MESSAGE = '{"code":"P0D01","message":…,"details":…,"hint":…}'` and
`DETAIL = '{"status":N,"headers":{}}'` answers status N with that body exactly (unparseable JSON
answers `PGRST121` at 500). So `PGRST` is better than `PT`: the body keeps `code: "P0D01"` and the
`code[:detail]` message every client already reads.

1. `door_refusal_status(p_code text) RETURNS text`, a CASE on one text, STABLE, closed (REVOKE from PUBLIC, anon, authenticated): `notSignedIn` 401, `permissionDenied` 403,
   `accountDeactivated` 403, `stepUpRequired` 428, `rateLimited` 429, otherwise 400 — today's CASE.
2. `door_context` sets a transaction-local `door.outer` BEFORE the service-role early return and
   before any refusal: `'door'` when `p_dial IS NOT NULL` (always overwriting), `'reader'` only when
   the setting is unset or `''` and `p_dial IS NULL`.
3. `door_refuse` raises `PGRST` with the code `P0D01` in the JSON body and the status from the table
   when `current_setting('door.outer', true) = 'reader'`; otherwise P0D01 as today.
4. `door_refused` reads the table instead of its own CASE.

`door_context`, `door_refuse` and `door_refused` are redeclared; no door or reader body is. A door
that calls a reader inside its body has set `'door'` first, so it still raises P0D01 into its shell
(the proof). A job or trigger that never calls `door_context` leaves it unset: P0D01 as today.

### RETIRED lines and their callers

26 RETIRED lines in `scripts/public-surface-allowlist.txt` (callers: SQL bodies by catalogue,
policies in every migration, then `src/`, `e2e/`, `scripts/`; types.ts and the allowlist excluded).
`origin/main` (the published client) = 7e7040c99: `git grep -nw` over its `src/` finds no call of any
of the seven droppable names (only tests of `get_ui_bundle`).

| Function | SQL callers | Policies | `src/` `e2e/` `scripts/` | Drop |
| --- | --- | --- | --- | --- |
| `edit_listing` | none | 0 | e2e comments; `auth-caller-gates.spec.ts:239` proves it closed | DROP |
| `relist_listing` | none | 0 | e2e comments; `auth-caller-gates.spec.ts:236` | DROP |
| `set_listing_price` | none | 0 | e2e comments; `auth-caller-gates.spec.ts:237` | DROP |
| `get_browse_tree` | none | 0 | none | DROP |
| `get_category_attributes` | none | 0 | none | DROP |
| `get_ui_bundle` | none | 0 | `src/lib/supabase-door.test.ts:120,124` (a name for a mocked fetch); `src/routes/api/i18n.lang.test.ts:111` (asserts it is NOT called) | DROP |
| `package_price_for` | none | 0 | `scripts/conformance/package-price.*` (the guard's pattern and comments) | DROP |
| `attr_visible_when_ok` | `attr_link_cells_refusal` | 0 | `visible-when.ts` (a comment) | stays |
| `attr_visible_when_met` | `price_basis_in_force`, `validate_listing_attributes`, `validate_listing_draft` | 0 | — | stays |
| `attr_cell_check` | `admin_upsert_attribute` | 0 | — | stays |
| `attr_option_shape` | `admin_upsert_attribute`, `attr_import_plan` | 0 | — | stays |
| `attr_link_cells_refusal` | `admin_link_attribute`, `admin_update_attribute_link` | 0 | none | stays |
| `attr_export_payload` | `admin_export_attributes`, `import_readonly_ignored` | 0 | — | stays |
| `validate_listing_attributes` | `validate_listing_draft` | 0 | — | stays |
| `entity_source_value` | `admin_machine_entity_translation_core`, `admin_save_entity_translation_core` | 0 | none | stays |
| `catalog_find_version` | `catalog_find_refresh`, `catalog_find_sweep`, `catalog_search` | 0 | none | stays |
| `price_shape_for_basis` | `validate_listing_draft` | 0 | — | stays |
| `level_perks_for` | `feed_index_check`, `feed_index_refresh`, `get_posting_schema`, `listing_photo_cap`, `promote_options`, `set_listing_level` | 0 | — | stays |
| `product_price_for` | `package_price_for`, `promote_options`, `set_listing_level`, `set_listing_reach` | 0 | — | stays |
| `cat_primary_pointer` | `admin_commit_category_import`, `admin_undo_category_import`, `cat_export_rows` | 0 | — | stays |
| `cat_primary_parent` | 12 bodies (`admin_list_categories` … `public_listing_json`) | 0 | — | stays |
| `attr_answer_tokens` | `attr_visible_when_met`, `attribute_holders`, `validate_listing_attributes` | 0 | — | stays |
| `attr_answer_other_text` | `edit_my_listing`, `listings_search_tsv_refresh`, `validate_listing_attributes`, `validate_listing_draft` | 0 | — | stays |
| `attr_contact_like` | `edit_my_listing`, `set_listing_pin`, `validate_listing_attributes`, `validate_listing_draft` | 0 | — | stays |
| `listing_contact_refusals` | `listing_contact_refusals_read`, `save_posting_identity`, `validate_listing_draft` | 0 | — | stays |
| `assert_parent_not_catchall` | `admin_add_category_pointer_core`, `admin_create_category_core`, `admin_move_category_pointer_core` | 0 | — | stays |

Dropping `package_price_for` leaves `product_price_for` with three callers, so its line stays. The
guards that learn a retirement: `scripts/check-migrations.sh:621-635` runs `scripts/public-surface.ts
--migration`; `scripts/security-lints.ts:95,224` reads the allowlist. `scripts/public-surface.ts` is
the reader both use; SCOPE names "the migration guard's public-surface step", which I read as reaching
it.

## tests

Unit tests of the consumers: `refusal.test.ts`, `door-codes.test.ts`, `reader-failure.test.ts`,
`door-error.test.ts`, `refusal-tail.test.ts`, `door.test.ts`, `answer.test.ts`,
`imports/route.test.ts`, `imports/csv.test.ts`, `translate.test.ts`,
`impersonation-service.test.ts`, `deactivated.test.ts`, `use-auth.test.tsx`,
`supabase-door.test.ts`, `session-policy.test.ts`, `feed.test.ts`, `seller.test.ts`,
`refusal-text.test.ts`, `my-listing.test.ts`, `legal-reader.test.ts`, `import-dialog.test.tsx`,
`country-verb-dialogs.test.tsx`, `location-verb-dialogs.test.tsx`, `posting-service.test.ts`,
`use-image-failure.test.ts`. No own test: `posting/door-error.ts`, `auth-service.ts` (covered by
`auth-client.test.ts`), `sign-out.ts`, `use-impersonation.ts`, `client.ts` (SCOPE names
`client.test.ts` new), `seller-page.ts`, `attributes.$id.options.ts`.

e2e assertions of a reader's status 500 (`rg -n "500" e2e`, each read by its call): one —
`e2e/legal-certify.spec.ts:1343` (`legal_in_force`, `legal_scheduled` for a visitor: 500,
`{code:"P0D01", message:"notSignedIn"}`); after the turn 401 with the same body. The other hits are
timeouts, byte counts and a budget value.

e2e assertions of a refusal sentence: `my-listings-doors.spec.ts:737`, `admin-screening.spec.ts:311`,
`admin-listings.spec.ts:357,634,635,2379`, `mfa-stepup.spec.ts:206`, `admin-roles.spec.ts:321` (the
step-up sentence `step-up required: no verified factor`, raised by doors' own step-up check, not by
`door_refuse`: unchanged by the status); `auth-caller-gates.spec.ts:259`,
`my-listings-levels.spec.ts:411` (alternations including the code). The reset time:
`ad-page-doors.spec.ts:36,490,563` reads `rateLimited:<instant>` and `resets_at`.

Next free ids: the sign-out family `SO-` (used 1–4, 8–13): SO-14; `SBE-` (1–6): SBE-7; the new
conformance census `CF-REFUSAL-1` (no hit for `CF-REFUSAL` across `src`, `e2e`, `scripts`).

## lists

`scripts/doors/manifest.txt` (the classes above; no line changes for the status; the seven dropped
functions have no manifest line — they are closed); `scripts/doors/check-doors-allowlist.txt`;
`scripts/public-surface-allowlist.txt` (seven RETIRED lines leave); `scripts/security-lints.ts`'s
surface list (read from the allowlist); the migration reader `scripts/doors/catalogue.ts` and
`scripts/conformance/migration-reader.*` (`dropsOf` already reads a DROP); the register
`docs/governance/mechanisms.md` (the doors' and clients' rows — Records only); the conformance
allowlists `door-answers-allowlist.txt`, `door-args-allowlist.txt`.

## old-file-readers

`rg -n "supabase/migrations" src e2e scripts --glob '*.test.*' --glob '*.spec.*'`: the scripts'
fixtures (planted trees) and `import-doors.test.ts:138`, `lanes.test.ts:385` (walk every file); in
`src/`: `alias-rules.test.ts:40`, `tier-reasons.test.ts:30,32`, `legal-kinds.test.ts:18`,
`move-reasons.test.ts:12`, `monetisation-service.test.ts:40-51`, `history.test.ts:18`.
`rg -n "FUNCTION public\\." src --glob '*.test.*'`: `monetisation-service.test.ts:370`,
`tier-reasons.test.ts:36-37`, `legal-kinds.test.ts:20`. None names `door_context`, `door_refuse`,
`door_refused`, `assign_role`, `admin_set_location_active` or a dropped function. `rg -F` of each
dropped name: the table above.

## second-readers

`vi.mock` of a module the turn changes: `@/lib/supabase-door` in 20 tests (`auth-forms`,
`signed-in-route`, `route-client`, `session-bearer`, the i18n providers, `use-auth`, `auth-client`,
`preferred-language`, the posting, levels, legal, monetisation, listings, countries, categories and
locations services); `@/features/auth/auth-service` (`settings-messages`, `auth-forms`);
`@/features/auth/use-auth` (`settings-messages`); `use-impersonation` (`staff-form-gates`). Dynamic:
`impersonation-notice.tsx:13` `loadOnce(import(impersonation-service))`; `preferred-language.ts:31`
`loadOnce(import(reader-failure))`; tests' `await import` of `answer`, `door`, `reader-failure`,
`use-auth`, `auth-service`, `supabase-door`.

## chunk-graph

Before only (the client files change in the client half, after the ruling). The pages whose closures
carry the fold's modules are the admin consoles, `/my-listings*`, `/post*`, `/l/$slug`, `/auth`,
`/settings`; their first-download numbers are below. The per-chunk after-table belongs to the half
that changes them.

## environments

The migration reaches ethio-staging and ethio-prod, applied by the operator (Lovable's database tool),
staging first; the proofs' first run on a shared database is the staging apply. The status, before →
after: a browser through PostgREST — a reader's refusal 500 → its code's status, the body unchanged
(`code: "P0D01"`, `message: code[:detail]`); a door's refusal unchanged (its shell's `{ok:false}` at
its status); a server route through its own client — the same body, the status now 4xx, which
`doorCall` / `readFailure` read by the message, so unchanged; a test's service client — the
service-role early return sets `door.outer` first, the same status; a migration's proof — a raise
inside the transaction, read by SQLSTATE (`PGRST` for a reader). Published screens that misread
between the apply and the Publish: `reader-failure.ts` classes 401/403 as `auth` (a signed-in reader's
`permissionDenied` 403 would read as `auth`, not `refused`), so the status must ship with
`reader-failure.ts`'s change in the same Publish (PREVENTION (5)). For the session: the published site
(localStorage), the preview (the framed zone's brokered storage), the E2E build (localStorage, the
E2E hooks).

## mechanisms

Read whole at their last declarations, with the live md5 of `prosrc` (the method reproduces F1-7a's
recorded post-check values):

| Function | Last declaration | md5 |
| --- | --- | --- |
| `door_context(text,text,text,text,character,text)` | `20261119150000_1b7e8a6b-…sql:32` | `1136caf7f43e38e4ee9a1852635333f8` |
| `door_refused(text,text,text)` | `20261119150000_1b7e8a6b-…sql:97` | `990719366502e9e9f0e92a62692cb3f8` |
| `door_refuse(text,text)` | `20261106051500_6d2f0f3e-…sql:31` | `55f9bf0a6c4c4b2cc57d304df779e7fc` |
| `assign_role(uuid,text,character)` | `20261120030500_2c3654f9-…sql:36` | `28ba9888b3e7973c692d0c84fa805efb` |
| `admin_set_location_active(uuid,boolean)` | `20261115122900_069b543e-…sql:80` | `80e42fb16ab528da01e3178ec495f666` |

`admin_set_location_active`'s sentence is its `COMMENT ON FUNCTION`
(`20261115122900_069b543e-…sql:108`), not inside the body: a `COMMENT ON FUNCTION` restates it. Also
read whole: `src/lib/refusal.ts`, `src/lib/reader-failure.ts`, the client's construction
(`client.ts`, `previewAuthStorage.ts`), every auth listener (`supabase-door.ts`, `use-auth.ts`,
`app-shell.tsx`), and auth-js 2.110.9's `signInWithPassword`, `__loadSession`, `_recoverAndRefresh`,
`_callRefreshToken` and its broadcast channel.

### The session's cause — cannot be found from the code (STOP (b))

What the code shows:

1. auth-js 2.110.9 (the lock-exact version) does not let a stale refresh clear a fresh session. Three
   guards in `_callRefreshToken` prevent it. First, a refresh that fails while the stored access token
   is still inside its real expiry keeps the stored session (proactive-preserve; `__loadSession`
   mirrors it). Second, the commit guard discards a refresh whose stored session changed under it.
   Third, a failure cooldown caches the answer per refresh token. Another tab's `SIGNED_IN` broadcast
   clears that tab's cooldown, and its own refresh then runs on the new session, under the same
   guards. A refresh with a stale token, this tab's or another's, one second after a sign-in, would be
   refused (`refresh_token_not_found`), and the new session would stay. So the hypothesis explains the
   07:01:22 refusal but not the loss.
2. The calls after it answered 401. PostgREST does not check a session's existence, only the JWT.
   Fresh-sign-in tokens therefore cannot explain those 401s, even if the session had been revoked on
   the server. The 401s mean those calls carried no token (anon → `42501` → 401) or a token PostgREST
   refused (`PGRST301/303`). The logs given say neither which, nor how many tabs, nor whether a
   `/logout` ran in that second, nor the device's clock.
3. The tab never ended its session: the screens drew "could not be loaded", and only a reload showed
   the sign-in page. The shell's live guard (`app-shell.tsx:827-846`) ends one only when `useAuth`'s
   user becomes null, which a `SIGNED_OUT` does. So no `SIGNED_OUT` reached that tab: the library
   still held a session there.
4. The code paths that could send a token they read earlier:
   - `rehydrate()` (`auth-service.ts:439-480`) hands stored tokens to `refreshSession` or
     `setSession`, from `/auth`'s mount (`src/routes/auth.tsx:189`).
   - `evictExpiredSession` runs before a sign-in.
   - Four `signOut({scope:"others"})` sites.

   None is reached on the sign-in → `land` → `landAfterSignIn` path in the same tab. A second tab
   standing on `/auth` (its mount rehydrate, its 5 s check-email poll) could reach `rehydrate()`, but
   nothing in the code or the logs shows a second tab.

What would find it: ethio-prod's auth audit log for that user at 07:01:21–22Z (a `logout` or
`token_revoked` row, and the session id the refresh named), and the edge log's 401 bodies (`42501`
versus `PGRST303`) — both reads for the supervisor. Or a reproduction on the preview with the
browser's network panel, naming which tab sent the refresh (never a token's value).

What can be built without the cause: (b) one session-end state and (c) polls that stop on a 401. They
end the session the logs show as one state, whatever its cause, and the security clause ("never
re-uses a refresh token it has seen refused") is met by `rehydrate()` reading the stored session after
its await, never before. But (b) lives in `app-shell.tsx` (`hardReset`, the live guard) and
`auth.tsx` (the sign-in offer), outside SCOPE: STOP (d).

## callee-codes

A reader's refusal after the turn, by the one table: `notSignedIn` 401; `permissionDenied` 403;
`accountDeactivated` 403; `stepUpRequired` 428; `rateLimited` (with `:<instant>`) 429; every other
code a reader raises (`notFound`-family codes, `invalidCursor`, `noActiveSession`, `notInForce`,
`legalAcceptancePending`, `acceptancePending`, `unknownSeller`, …) 400. A door's shell: the same table,
unchanged values; `{ok:false, code:"P0D01", …}`.

## cell-meaning

No manifest line changes for the status (the class decides, not the line). The seven dropped
functions have no manifest line. Every `signed-in-reader`, `staff-reader` and gate `public-reader`
line: its refusals now get the table's status instead of 500.

## first-download

From my build at the base (`bun run build && node scripts/check-bundle-size.mjs`, exit 0, "Bundle
budget OK."): entry JS 200.8 / 205 KiB, CSS 22.5 / 40 KiB. Per page (size / ceiling, KiB): `/` 221.7 /
227; `/$name` 219.7 / 225; `/account` 264.1 / 268; `/account_/legal` 203.4 / 208;
`/account_/legal_/$versionId` 204.0 / 209; `/account_/saved` 220.4 / 225; `/admin` 205.2 / 210;
`/admin/` 206.0 / 211; `/admin/ai` 299.3 / 303; `/admin/attributes` 313.5 / 318; `/admin/audit` 290.6 /
295; `/admin/categories` 344.2 / 348; `/admin/countries` 302.9 / 309; `/admin/images` 205.8 / 210;
`/admin/impersonation_/$sessionId` 288.6 / 293; `/admin/legal` 281.1 / 285;
`/admin/legal_/$versionId` 277.8 / 282; `/admin/legal_/edit` 279.8 / 284; `/admin/listings` 324.8 /
329; `/admin/listings_/$listingId` 325.3 / 330; `/admin/listings_/$listingId_/edit` 406.4 / 412;
`/admin/locations` 266.4 / 271; `/admin/monetisation` 310.1 / 313; `/admin/places` 303.4 / 310;
`/admin/roles` 291.4 / 295; `/admin/roles_/$roleId` 271.5 / 275; `/admin/screening` 341.4 / 348;
`/admin/translations` 302.7 / 307; `/admin/translations_/$lang` 305.3 / 309; `/admin/users` 288.7 /
293; `/admin/users_/$userId` 288.7 / 293; `/auth` 217.3 / 223; `/auth_/callback` 204.3 / 209;
`/auth_/reset` 210.4 / 214; `/c/$slug` 221.7 / 227; `/dev/primitives` 224.4 / 228; `/dev/style` 244.0 /
248; `/dev/tall` 201.1 / 206; `/l/$slug` 247.0 / 250; `/legal/$kind` 205.5 / 210; `/legal/accept`
211.8 / 217; `/legal/publishing` 207.5 / 211; `/my-listings` 307.8 / 315; `/my-listings_/$listingId`
317.8 / 323; `/my-listings_/$listingId_/edit` 398.6 / 404; `/post` 398.5 / 404; `/post_/$listingId`
398.5 / 404; `/privacy` 205.5 / 210; `/settings` 275.4 / 279; `/terms` 205.5 / 210.

## premises

1. "`src/features/auth/deactivated.ts` is removed with its test (INC-1188)": only `isDeactivatedRefusal`
   (:37) is dead. `markDeactivatedSignOut`, `takeDeactivatedSignOut` and `DEACTIVATED_MARK` are live
   (`use-auth.ts:98`, `app-shell.tsx:840`). The function and its cases leave; the file stays.
2. The session hypothesis: a stale refresh does not clear a fresh session under auth-js 2.110.9
   (above), and it does not explain the 401s.
3. "`door_refuse` then raises SQLSTATE `PT` followed by the status": `PTxyz` changes the body's `code`
   to `PTxyz`, which every client reading `P0D01` would misread; `PGRST` with a JSON body keeps it. The
   census proposes `PGRST`.
4. "the classes `reader`, `staff-reader`, `public`, `signed-in-reader`": `signed-in-reader` is a
   manifest class, not a `door_context` class (the readers pass `reader`). The mode is told by the
   dial (`p_dial IS NULL`), which matches the manifest exactly (124 doors with dials, 83 readers
   without).
5. "the plan's §1.3 typed `Result` … how many sites remain": 117 raw `.rpc(` calls in 25 browser
   files (`src/features`, `src/lib`, `src/components`, `src/routes` outside `api/`; tests excluded)
   besides `supabase-door.ts`'s own — far past "about thirty".
6. SCOPE's `src/features/` "only the files that read a refusal, a status or the session" does not
   reach `src/components/app-shell.tsx` or `src/routes/auth.tsx`, where the session's end and the
   sign-in offer live.

## findings

- `src/server/imports/route.ts:100` holds a second status table (`CODE_STATUS`), beside
  `door_refused`'s CASE.
- `src/lib/door-codes.ts` `CODE_SHAPE` is a second `code:detail` parser beside `splitRefusal`.
- `src/lib/supabase-door.ts` `rpc()` drops the HTTP status from its answer.
- `src/router.tsx:6` `new QueryClient()` has no defaults: every auth-derived query retries three
  times on a 401 (the 1–10 s cadence in the logs).
- `src/server/seller-page.ts:28` matches a whole sentence (`seller_feed_page: unknownSeller`).
- No security hole found.

## queued

| Item | Source | Here |
| --- | --- | --- |
| INC-1213 a reader's refusal at its own status | F1-7a ruling 2 item 12; `f1-doors-7b.census.md:404` | the database half (proposed split) |
| the reset-time words | `f1-doors-7a.md:14`; `f1-doors-7b.census.md:404` | the client half |
| DEC-347 the guards learn a retirement; the retired bodies dropped | `roadmap.md:8,28`; `f1-doors-7b.census.md:405` | the database half |
| INC-1191 Save offered to the ad's own seller | `roadmap.md:30`; `f1-doors-7b.census.md:406` | left — not in this brief; named for the ruling |
| INC-1214 `door.ts` logs only `doorError` | `f1-doors-7a.report.md:355,379` | the database half (server) |
| INC-1215 `answer.ts` through `errorText` | `f1-doors-7a.report.md:380` | the database half (server) |
| the one reader (INC-1188, INC-1189); the parsers of `f1-doors-7b.report.md:202-203,323` | F1-7b report | the client half |
| the typed `Result` | `f1-doors-7a.md:34`; `f1-doors-7b.md:5,48` | its own part (117 sites) |
| the RETIRED lines' "until F1-7c" | `public-surface-allowlist.txt` | seven leave; nineteen restate their `until` |
| `admin_set_location_active`'s comment | F1-7b ruling 1 (`f1-doors-7b.report.md:337`) | the database half |

## The proposed split (THE CUT)

- **F1-7c (this lane, the database half and the status):** the status table and the reader's path
  (`door_refusal_status`, `door_context`, `door_refuse`, `door_refused`, with the proof that a door
  calling a reader answers through its shell); `assign_role` (INC-1217); the location comment; the
  guards' retirement reading and the seven drops. Client side, it carries only what the status needs
  in the same Publish (PREVENTION (5)): `reader-failure.ts`, which reads the code before the status,
  and `legal-certify.spec.ts:1343` (500 → 401). It also carries INC-1214 (`door.ts`) and INC-1215
  (`answer.ts`), both server-only.
- **F1-7d (same lane, after this one merges):** the one refusal reader and its conformance census
  (CF-REFUSAL-1); the reset-time words; the session's end-state, its polls and its browser test
  (SO-14). Its SCOPE must name `src/components/app-shell.tsx`, `src/routes/auth.tsx` and
  `src/router.tsx` (the query client's retry on 401). The cause of 07:01:22 is either found first from
  the audit log, or ruled out of scope with the end-state built regardless.
- **The typed `Result`** (117 sites in 25 files): its own turn.
