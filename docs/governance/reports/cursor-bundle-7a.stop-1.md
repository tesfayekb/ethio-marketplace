QUESTION — cursor-bundle-7a STEP 1: the census and the plan (PLAN FIRST)
DONE: STEP 0, STEP 1
LEFT: STEP 2 (Parts 1 to 5), STEP 3, STEP 4, STEP 5, STEP 6
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `db0b43c9cb8c83a3ae8236ab38b12b71244042e4` (short `db0b43c`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-25T14:27:40Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/45633122112
FILES: docs/governance/briefs/cursor-bundle-7a.md
docs/governance/reports/cursor-bundle-7a.stop-1.md
roadmap.md
scripts/conformance/briefs-allowlist.txt

The questions for ruling 1 are at the end (Q1 to Q12). Nothing outside the files above was changed.

## STEP 0

- `origin/dev` = `db0b43c9c` = the brief's base; `git status --short` was empty; branch `cursor/bundle-7a`.
- The brief was saved by `cp` from the carrier's file; `sha256sum` = `44bd83e5172490a0cdd0ff00f89147c58bf76516245c91e5fb2dd15aeb218fae`, equal to the carrier's value.
- Roadmap line 3 names `docs/governance/briefs/cursor-bundle-7a.md`; `bunx prettier --check roadmap.md` passed.
- `scripts/conformance/briefs-allowlist.txt`: the eight `cursor-bundle-6.md:` lines removed; the header stays.
- `bun scripts/brief/check-go.ts docs/governance/briefs/cursor-bundle-7a.md --root .` (run again just before this report):

```
[check-go] no finding
```

- CI of dev at `db0b43c`: SUCCESS (above); `guards-last-failure.md` for the same commit: "No failed build/guard jobs in this run."; `e2e-last-failure.md`: "last E2E run 45633122112 ran no lanes — the code tree was proven by run 45547063987". No red to fix first.

## mechanisms (read before anything is proposed)

- `has_permission_core` — `supabase/migrations/20261124203700_35cf3a64-bf12-4a27-91fe-5fb7c778855f.sql:58`. Order: another person asked by a non-super-admin → false; deactivated → false; `is_super_admin` → true; then EXISTS exact grant (hierarchy via `get_role_hierarchy`) OR EXISTS `manage` grant (:83).
- `staff_session_holds` — same file :92; the member-role read at :117 is `p.action IN (p_action, 'manage')`.
- `has_permission` — :126 (core, then the rule). `has_permission_scoped_core` — :142; deactivated, super admin, `p_mode='none'` → `has_permission_core`; otherwise the scope aggregate at :177 is `p.action IN (p_action, 'manage')`. `has_permission_scoped` follows.
- `door_context` — last declaration `20261124203800_a437e3a7….sql:50`: `has_permission_scoped_core` → for staff classes `staff_session_holds` (P0009 `step-up required[: no verified factor]`) → `require_step_up_if_needed` (not staff-reader) → `rate_gate(p_dial)`. It sets `door.outer` to `door` when a dial is named, else `reader`, when empty.
- `my_permission_answer` — `20261124221200_d9701480….sql:58`: the core → `staff_session_holds` → `stepUp` / `stepUpNoFactor`.
- `get_my_permissions` — `20261106051800….sql:57`: exact grants with hierarchy (the screens' reader).
- `door_refusal_status` — `20261120100000_909988ad-e5cb-4942-9f99-4ec49d32a179.sql:43`: notSignedIn 401, permissionDenied 403, accountDeactivated 403, stepUpRequired 428, rateLimited 429, else 400. `door_refuse` :138 (with `door.outer='reader'` it raises SQLSTATE `PGRST` with DETAIL `{"status": …}`, else P0D01). `door_refused` :163 (spends the dial for a non-gate code, counts `door_refusals`, `set_config('response.status', …)`, returns `{ok:false, code:'P0D01', refusals:[…]}`).
- The two status mirrors: `src/lib/reader-failure.ts:23` `REFUSAL_STATUS`, :32 `refusalStatus` (default 400); `classify` and `gateRefusal` (:142) accept a P0D01 code only when the answer's status equals `refusalStatus(code)`.
- CF-RLS-1 — `scripts/conformance/rls-initplan.ts`; it judges only the permission functions; "bare" = not directly preceded by `(SELECT `; tests CF-RLS-1a/1b/1c.
- `lastDeclarations` — `scripts/conformance/migration-reader.ts:450`: 504 functions; 5 are computed from string pieces (attr_import_plan, cat_import_plan, loc_import_plan, validate_listing_draft, public_listing_json; none names `manage`).
- The manifest's reader — `scripts/doors/manifest.ts`; `HELPER_REASONS = ["policy","invoker-chain","none"]` (:71), checked by the first word split on `[\s:]` (:239–242). `policiesOf` (`scripts/doors/policies.ts`) reads CREATE/DROP POLICY and DROP TABLE; its doc comment (:18) says it does not read `ALTER POLICY` or dynamic `EXECUTE format(…)`.
- `user_set_preferred_language`'s shell order — `20261106051900_a9d4c7e2….sql:86`: `door_context('owner', NULL, NULL, 'account_pref')` (dial spent first) → refuse `languageNotPublished` → read the profile (no `FOR UPDATE`) → refuse `noProfile` → UPDATE always → `door_audit(…,'profile.preferred_language',…)` always → `EXCEPTION P0D01 → door_refused`.

## definition and consumers, by concern

### Concern 1 — every SQL reader of `manage` in a last declaration

| Reader (last declaration) | Mark |
|---|---|
| `has_permission_core` :83 (`p.action = 'manage'`) | the asked action — moves |
| `staff_session_holds` :117 (`IN (p_action, 'manage')`) | the asked action — moves |
| `has_permission_scoped_core` :177 (`IN (p_action, 'manage')`) | the asked action — moves |
| `security_lints` (`20261114070900….sql:226`, impersonation `p.action IN ('use','manage')`) | the asked action — moves (asks `use` alone) |
| `door_context(…'translations','manage'…)` in admin_delete_language, admin_get_translator_scope, admin_language_delete_preview, admin_set_key_context, admin_set_language_flags, admin_set_language_order, admin_set_translator_languages, admin_sync_ui_keys, admin_undo_import, admin_upsert_language | a named permission — stays |
| `door_context(…'services','manage'…)` in admin_job_resume, admin_set_ai_feature | a named permission — stays |
| `translation_scope_ok` (`20260829050332….sql:184`, `has_permission(…,'translations','manage')`) | a named permission — stays |
| `user_has_translation_permission` (`20260830034154….sql:15` named; :27 the list `('view','update','machine','approve','manage')` decides who may be a translator target) | a named permission — stays (finding F4 below) |
| `admin_get_translator_scope` (`20261114114500….sql:381`, the same list) | a named permission — stays (finding F4) |

TS readers: `src/routes/api/translate.ts:252` asks `translations:manage` by name (stays); `src/server/route.test.ts:282,289` uses `listings:manage` as a fixture word only; `scripts/conformance/perm-vocabulary.test.ts` fixture; the screens' `permissions.includes("translations:manage" | "services:manage")` read exact grants (stay).

Grants in the migrations: the seed `20260809010130….sql:441–443` gave `admin` categories/locations/countries `manage`; `20260903025501….sql:91–108` expanded `categories:manage` into view/create/update/restructure/assets and deleted it; `20260915162505….sql:100–110` the same for locations/countries; `20260917000149….sql:188–200` for listings. After the last migration NO role holds a `manage` grant from a migration; the prod rows the supervisor read (`admin`: `categories:manage`, `translations:manage`) came from the Roles console.

### Concern 2 — the codes

- `scripts/doors/manifest.txt` lists 198 codes; `door_refuse('…')` raises 226 in last declarations; 28 are raised but listed nowhere (mostly in internal cores: accountDeactivated, alreadyActive, badCoordinates, catchallParent, categoryFixed, changeGone, deleteActive, deleteHasChildren, deleteHasListings, deleteSlugMismatch, enforcementOnly, levelMismatch, mergeNoSources, mergeTargetInSources, missingCoordinates, ownerDeleted, ownerOnly, photoNotFound, rateLimited, reassignRequired, reassignTargetInvalid, reviewGone, reviewerOnly, serviceOnly, severeRemove, severeRestore, slugTaken, unknownEntity). Each code with the bodies raising it was printed by script (`/tmp/ethio-scratch/cursor-bundle-7a/c2-codes.txt`); the proposals below were read against each body.
- The rule I applied: GONE (404) — every body that raises it has just looked up a row by an identifier the caller sent and found it absent, deleted, or not the caller's. CHANGED (409) — the row exists and is the caller's to see, but its state now forbids the action. Everything else stays 400 (a bad value, a rule, a conflict between two values the caller sent).
- Proposed GONE (31): attributeNotFound, categoryNotFound, changeGone, listingNotAvailable, listingNotFound, locationMissing, noActiveSession, noProfile, notYourListing, notYours, overrideNotFound, ownerDeleted, parentMissing, photoGone, photoNotFound, priceNotFound, reviewGone, unknownAttribute, unknownBatch, unknownCategory, unknownCountry, unknownEntity, unknownFeature, unknownKey, unknownPackage, unknownPermission, unknownPointer, unknownRole, unknownTranslation, unknownUser, unknownVersion.
- Proposed CHANGED (29): alreadyActive, alreadyLinked, alreadyReported, batchAlreadyUndone, categoryInactive, draftNotEdited, illegalTransition, importRunning, inReview, languagePublished, listingChanged, listingNotEditable, listingRemoved, notADraft, notCopied, notDraft, notInForce, notLive, notPaused, notPublished, nothingToUndo, parentInactive, photoRemovalFinal, photosSoonNotEditable, pinNotEditable, priceEnded, renewFirst, seasonEnded, sessionActive.
- Borderline, proposed 400, for the ruling (17): unknownCurrency, unknownLevel, unknownReach, unknownLink (a value from a short list, not a row the caller named), aliasTaken, labelTaken, duplicateKey, duplicateCategory, translationExists, slugTaken (a conflict with another row), overlappingWindow, translationFlagged, notFullyApproved, priceInUse, deleteActive, levelNotAvailable, notOffered (a rule over related rows).
- The manifest's other 142 listed codes stay 400 by name (validation `bad*`, rules, refusals of a value); the class census test would carry them by name with a reason (Q3).
- Every proposed code was checked by script to be raised somewhere (none missing, no code in two classes).

### Concern 3 — every policy's last state

128 standing policies; 13 name an auth or setting function. Nine call `auth.uid()` bare — exactly the advisor's nine:

| Policy | Last CREATE |
|---|---|
| `user_directory.directory_owner_read` `USING (auth.uid() = user_id)` | `20260730015333:13` |
| `profiles.profiles_owner_read` `USING (auth.uid() = user_id)` | `20260730015333:34` |
| `listings.listings_seller_read` `USING (auth.uid() = seller_id)` | `20260804174739:339` |
| `listing_photos.listing_photos_seller_read` (EXISTS … `l.seller_id = auth.uid()`) | `20260804174739:362` |
| `listing_locations.listing_locations_owner_read` (EXISTS …) | `20260810074522:56` |
| `seller_notices.seller_notices_own_read` `USING (seller_id = auth.uid())` | `20261011085637:48` |
| `listing_photo_warnings.listing_photo_warnings_seller_read` (EXISTS …) | `20261014084432:42` |
| `listing_photo_reviews.listing_photo_reviews_seller_read` (EXISTS …) | `20261015113334:55` |
| `listing_reports.listing_reports_own_read` `USING (reporter_id = auth.uid())` | `20261017115807:51` |

The other four are `storage.objects` `category_assets_*`: `auth.uid()` sits inside `(SELECT public.has_permission(auth.uid(), 'categories', 'assets'))`, a FROM-less sub-select that is already one InitPlan. No policy calls `auth.jwt()`, `auth.role()`, `auth.email()` or `current_setting(` bare.

### Concern 4 — every `owner`, `signed-in-reader` and `helper` line

60 doors (33 owner, 24 signed-in-reader, 3 helper), the same 60 as bundle 6's §13 item 2 table. A scripted reading (`/tmp/ethio-scratch/cursor-bundle-7a/c4-doors.ts`: the caller's id and its aliases, DECLARE defaults included; comparisons `=`, `<>`, `!=`, `IS [NOT] DISTINCT FROM`) finds 51 comparing an owner column or a row variable with the caller. The 9 without: check_seller_alias, get_attribute_options, get_attribute_options_version_read, get_posting_schema, listing_contact_refusals_read, sold_cutoff, suggest_seller_aliases, translation_scope_ok_read (all "public" in bundle 6's table) and `has_permission` (helper; delegates to the core, which compares `p_user_id` with `auth.uid()`).

### Concern 5 — every `owner` door of class `own`

| Door | Audits an unchanged value? |
|---|---|
| `user_set_preferred_language` | yes — UPDATE and `door_audit` always |
| `change_home_country` | no — `IF v_code = v_cur.home_country_code THEN RETURN ok` before the update and the audit |
| `remove_own_password` | no — `require_recent_password()` needs a fresh password proof, which the call deletes; a repeat has none |
| `accept_legal`, `save_listing` | no audit; INSERT … ON CONFLICT DO NOTHING |
| `clear_seller_place`, `unsave_listing` | no audit; a DELETE of nothing writes nothing |
| `save_seller_place` | no audit; the upsert rewrites the same row |
| `save_posting_identity` | no audit; the profile UPDATE always sets `updated_at = now()`; alias history only on change |
| `user_set_viewing_location` | no audit; the UPDATE stamps its `at` |

The own-listing setters `set_listing_level` / `set_listing_reach` audit, but a repeat extends a window (an action, not a setter). Precedent for contrast: `edit_my_listing` :72/:244, `admin_edit_listing_core` :231/:353 and `admin_set_listing_tier` :72 REFUSE an empty change with `nothingChanged` (and `door_refused` spends their dial).

### Concern 6 — the duplicate indexes

- `profiles_alias_unique` (`20260810075629:48`, UNIQUE on `lower(seller_alias)` WHERE NOT NULL) and `profiles_seller_alias_lower_key` (`20260917113152:28`, identical); `category_tree_pointers_child_idx` (`20260804152522:47`, beside `category_tree_pointers_parent_idx`) and `idx_ctp_child` (`20260903025501:149`, beside `idx_ctp_parent(parent_id, display_order)`).
- Neither of either pair backs a constraint (both are `CREATE [UNIQUE] INDEX`, no `ADD CONSTRAINT … USING INDEX`). No file under `supabase/`, `src/`, `e2e/` or `scripts/` reads any of the four names; the alias doors catch `23505` by SQLSTATE, not by name. `docs/governance/briefs/bundle-3.md:114` names `profiles_seller_alias_lower_key`.

## premises (OPEN a–e, and premises found wrong)

(a) Yes, on both paths. A reader (`door.outer='reader'`) raises SQLSTATE `PGRST` with DETAIL `{"status": <n>}` (`door_refuse`, `20261120100000…:138`); PostgREST answers that status. A door's shell `door_refused` (:163) sets `response.status`, and PostgREST answers that status with the shell's body. 401, 403, 428 and 429 reach the browser this way today, so 404 and 409 would too. `door_refused` returns `{ok:false, code:'P0D01', refusals:[{reason, detail}]}` for every class, with only the status differing. PostgREST also answers 404 (PGRST202, a missing function) and 409 (23505/23503) by itself; the clients separate those by the P0D01 mark, which `classify` already requires.
Consumers that must widen: `src/server/answer.ts:242` `refusalAnswerStatus` passes only 400/401/403/429, so a reader's 404/409 refusal would fall to `serverError` 500. `src/server/imports/route.ts:98` `codeStatus` turns everything but 401/403/429 into 400. `doorCall` (`src/server/door.ts:39–54`) answers a door's refusal as a 200 verdict whatever the status, and `upstreamFailed` (`src/server/supabase/user-client.ts:214`) marks only gateway statuses, so door routes are unaffected. `src/lib/supabase-door.ts` `rpcError` (:279) passes the status through and classifies nothing, so it does not change and is not in the plan.
TRANSITION HAZARD: `classify` / `gateRefusal` accept a code only when the status equals `refusalStatus(code)`. Between the SQL apply and the client's publish (in either order), a moved code is read as `malformed` and a route answers 500 (Q2).

(b) Neither index of either pair backs a constraint (above). Proposal: keep `profiles_seller_alias_lower_key` (the one a document names) and `category_tree_pointers_child_idx` (the table's own naming, beside `category_tree_pointers_parent_idx`); drop `profiles_alias_unique` and `idx_ctp_child` (Q8).

(c) Yes: `door_context(…, 'account_pref')` spends the dial before the body reads anything. A database-only "unchanged → ok" removes CT-23's audit exclusion but not its meter exclusion. For an unchanged call to spend nothing, the row must be read before `door_context`'s dial, which needs a change in the mechanism. `door_context` without a dial sets `door.outer='reader'`, so `door_refuse` would raise PGRST instead of P0D01, and the dial would be named twice in the body. Bundle 6's ruling 3 (`docs/governance/briefs/cursor-bundle-6-ruling-3.md:11`) already wrote "answers ok with no update, no audit and no dial when nothing changes" (Q5).

(d) The hierarchy is `roles.parent_role_id` read by `get_role_hierarchy`. From the migrations no role holds a `manage` grant (above), so none inherits one. The live rows on either project I cannot read: no read-only Supabase MCP is configured in this Cursor. The supervisor's reading (prod: `admin` holds two; staging: none) stands, and whether any role has `admin` as its parent is the supervisor's read (Limit).

(e) The pinned CLI (2.120.0, `scripts/ci/cli-pin.ts`) has `supabase db advisors` with `--local` / `--db-url`, `--type performance` and `--fail-on`. It runs the splinter lints, `auth_rls_initplan` and `duplicate_index` among them, inside a rolled-back transaction (the CLI's source at tag v2.120.0: `apps/cli/src/commands/db/advisors/` and its lint SQL). Splinter's `auth_rls_initplan` checks `auth.uid()`, `auth.jwt()`, `auth.role()`, `auth.email()` and `current_setting(` and skips schema `storage`. Proposal: a smoke-lane step after the local backend's migrations, `--type performance`, its JSON read for those two lint names, counts only in the log. Its files are `.github/workflows/ci.yml` and a script under `scripts/ci/`; neither is in this brief's scope (Q9).

Premises found wrong:
- P1 — Lovable's `GONE_CODES` (#104) holds `unknownPlace`, which is never a `door_refuse` code: it exists only as the verdict reason `coverage:unknownPlace` and the plain raise `feed_page: unknownPlace` (read by `src/routes/api/feed.ts` by its text, FD-6). It cannot gain a status from this table.
- P2 — the routes answer some of these codes at their own status: `notYourListing` at 403 (`src/routes/api/upload/photo.ts:188`, `src/routes/api/listings/photos.$id.ts:66`, `src/routes/api/listings/background.ts:115`) and `photoGone` at 409 (`src/routes/api/upload/photo.ts:260`, `src/routes/api/listings/background.ts:136`). The browser tests PP-26 (`e2e/photo-pipeline.spec.ts:1645`, 409), `:2023` (403) and PR-49 (`e2e/posting-routes.spec.ts:1296`, 403) pin them. With the proposal, the database says 404 for both and the routes something else. `src/routes/` is closed to this lane (Q4).
- P3 — bundle 6's finding 6 said the no-factor state "is reached only from a guarded action on a page outside the gate". No page outside the gate mounts `StepUpGate`: all 21 mounts are staff screens under `src/routes/admin.tsx:122` `LazyStaffFactorGate` (`admin.listings_.$listingId_.edit` included: only `listings_` leaves its parent, `admin` still nests it).
- P4 — the brief's CONSUMERS for concern 3 list four functions; the advisor's lint also checks `auth.email()`. The widened guard includes it.

## tests

- Each consumer's own tests. Concern 1: the proofs in `20261124203700…` (b6p3f1, scratch roles); `perm-vocabulary.test.ts`; `src/server/route.test.ts` (fixture only). Concern 2: `src/lib/reader-failure.test.ts`, `src/server/answer.test.ts`, `src/server/imports/route.test.ts`, `scripts/conformance/refusal-readers.test.ts` (CF-REFUSAL-1…5, CFRR-n). Concern 3: `rls-initplan.test.ts`. Concern 4: `scripts/doors/*.test.ts`. Concern 5: CT-23 (`e2e/admin-categories-lifecycle.spec.ts` ~:1936 `.neq("action","account_pref")`, ~:1968 `.neq("action","profile.preferred_language")`).
- Tests asserting a status for a code that moves (in scope, mine): `src/lib/reader-failure.test.ts:43,44` (notYourListing, notYours at 400), `:51` (notInForce), `:152` (listingNotFound with no mark, stays malformed); `src/server/answer.test.ts:229` (listingNotFound at 400); `src/server/imports/route.test.ts:430` (importRunning), `:445` (unknownBatch), `:446` (batchAlreadyUndone), `:512` (unknownCategory); `scripts/conformance/refusal-readers.test.ts:284` (a fixture with `notYours` at 400).
- Out of this lane (SIDE BY SIDE). These go RED: `src/features/admin-listings/use-admin-listing.test.ts:72` (`{listingNotFound, P0D01, 400}` → "refused" becomes "malformed"). These stay green but would carry a status the database no longer sends, because `doorCall` ignores the status or the route reads the code by itself: `src/routes/api/listings/photos.test.ts:152–153` (PHT-5), `src/routes/api/listings/draft.test.ts:177`, `src/routes/api/publish.test.ts:112–113`, `src/routes/api/attributes.options.test.ts:123,150` (ATO-7/8). (Q4)
- Browser tests: no e2e assertion of a status for a database code that moves; the e2e `toBe(400)` lines (ad-page, import-security, admin-*-import, posting-routes, locations-tree) are each route's own codes, read one by one.
- Proofs that rely on a `manage` grant answering for another action: `20261109044936….sql` proof (a) (:47–:73) gives a scratch role only `locations:manage` and requires `has_permission(…, 'locations', 'view')` true. It runs before file A in every apply (`db:proof` applies in order; staging and prod applied it long ago), so it stays green, and an applied migration is never edited. No proof written after it relies on `manage` (the b6p3f1 proofs grant exact actions; the file names `manage` only at :83, :117 and :177).

## lists

- `scripts/doors/manifest.txt` — `user_set_preferred_language` :237 changes only if Q5 drops its dial; a new door: none.
- `scripts/public-surface-allowlist.txt` — no new browser grant.
- `scripts/conformance/briefs-allowlist.txt` — done in STEP 0.
- `scripts/conformance/wired.test.ts` — a new census is named by its own test (`permission-grants.test.ts` imports `permission-grants.ts`, `door-rows.test.ts` imports `door-rows.ts`), as `rls-initplan` is.
- The conformance register — `docs/features/ci-guards.md` (a section per bundle) and `docs/features/doors.md` (CF-REFUSAL-n); the register rows in `docs/governance/mechanisms.md` go to §14.
- The e2e selector (`scripts/e2e-select.ts`) — a migration without an `-- e2e-areas:` header selects ALL; the plan's files carry none (cores and policies touch every area). No new spec joins an area.
- Exact-list assertions — CF-REFUSAL-2 compares the two tables both ways; `refusal-readers.ts:267` requires every `REFUSAL_STATUS` key to be a literal in a last declaration; `user-client.test.ts:25` lists the four permission words (unchanged).

## old-file-readers

None reads `profiles_alias_unique`, `profiles_seller_alias_lower_key`, `category_tree_pointers_child_idx` or `idx_ctp_child` (supabase/, src/, e2e/, scripts/). Only the brief `bundle-3.md:114` names one, the one kept.

## second-readers

- `vi.mock("@/lib/reader-failure")`: none. Dynamic imports: `src/server/imports/route.test.ts:517` (`refusalStatus`), `src/features/posting/pricing-data.test.ts:53`, `src/features/seller/seller-review.test.ts:6`, `src/features/ad-page/save.test.ts:8`, and `src/features/auth/preferred-language.ts:31` through `loadOnce`. Lovable's #104 adds `src/components/shell/failure-reason.ts`, loading it through `loadOnce` and using `gateRefusal` and `readerFailure`. The exports' names and shapes stay; only `REFUSAL_STATUS` gains rows.
- `vi.mock("@/lib/supabase-door")`: 35 test files; `supabase-door.ts` does not change.

## chunk-graph

`src/lib/reader-failure.ts` gains table rows only, no import; `src/server/answer.ts` and `src/server/imports/route.ts` are server code. No module joins a chunk.

## environments

Not applicable — no build option changes.

## first-download (before; my lock-exact build of `db0b43c` + the task-saved commit, docs only)

`bun install --frozen-lockfile` ("no changes"), `bun run build` (exit 0), `node scripts/check-bundle-size.mjs` (exit 0): `JS: 202.2 KiB / 203 KiB — ok`, `CSS: 22.7 KiB / 24 KiB — ok`. Every page inside its ceiling, for example `/` 223.7 / 225, `/l/$slug` 249.1 / 250, `/settings` 278.0 / 279, `/admin/listings_/$listingId_/edit` 412.1 / 413. The full table is in `/tmp/ethio-scratch/cursor-bundle-7a/size-base.log`. "After" is measured at STEP 4.

## callee-codes (doors whose body changes)

- `user_set_preferred_language`: after the turn it answers notSignedIn 401, accountDeactivated 403, rateLimited 429 (unless Q5 drops the dial), languageNotPublished 400, noProfile 404 (proposed GONE). Its one caller, `savePreferredLanguage` (`src/features/auth/preferred-language.ts:81`), returns `{ok:false, reason: error.message}` for any error. `src/i18n/provider.tsx:438,547` reads that result; a status class does not change what it sees.
- The cores (`has_permission_core`, `staff_session_holds`, `has_permission_scoped_core`) answer booleans and rows, with no refusal code. Their callers (`has_permission`, `has_permission_scoped`, `door_context`, `my_permission_answer`, every policy and door) see `false` / permissionDenied where a `manage` grant alone used to answer.
- `security_lints`: no refusal code changes.

## cell-meaning

Not applicable unless Q5 removes `account_pref`'s spend for an unchanged call; then the dial rations changed values only (a person changes their language a few times in an hour at most).

## gate-reach

No spec or helper grants a `manage` permission: `rg` over `e2e/` finds no `manage` grant, and `grantRole(…, "admin")` grants the role whose migration grants hold no `manage` (staging: none, per the supervisor). Nothing moves.

## user-cases (the step-up dialog's no-factor state, finding 6)

The state is set in `src/features/auth/mfa/use-step-up.ts:98` `setMode(hasFactor ? "code" : "no-factor")`, where `hasFactor = factors.ok && factors.factors.length > 0`:
1. A staff session whose factor is removed while a staff screen is open (another tab, Settings), then a guarded action — the gate passed earlier; the dialog draws the no-factor body and releases the action with `StepUpUnavailable`. Test: NONE.
2. `listFactors()` fails (`factors.ok === false`) — the dialog says "set up an authenticator" for a read that failed. The staff gate reads the same failure as `failed` (`src/features/auth/mfa/staff-factor.ts:14`). Test: NONE.
3. A page outside the factor gate mounting `StepUpGate` — none exists (P3).
MF-3, MF-6, MF-7c and STAFF-E1 assert the gate's setup panel, not this dialog. `src/routes/settings.tsx:639` draws `mfa.stepUpNoFactorBody` itself (out of lane). Q6 asks remove or keep.

## findings

- F1 — `src/features/auth/mfa/use-step-up.ts:97–98`: a failed factor read is drawn as "no factor" (user-case 2): a failure shown as a state.
- F2 — `notYourListing` and `listingNotFound` are separate codes: even both at 404, the code tells a stranger the row exists (`set_listing_level` :24, `photos.$id.ts:66` and others). The ASVS lens in concern 2 holds for the status, not the body.
- F3 — `category_tree_pointers_parent_idx` (`20260804152522`) is a prefix of `idx_ctp_parent(parent_id, display_order)` (`20260903025501`): redundant, not identical, so the advisor's `duplicate_index` does not name it.
- F4 — `user_has_translation_permission` (`20260830034154….sql:27`) and `admin_get_translator_scope` (`20261114114500….sql:381`) choose translator targets from direct `user_roles` grants without `get_role_hierarchy`, so a role inheriting translations actions is not offered. Outside this brief.
- F5 — `scripts/doors/policies.ts` does not read `ALTER POLICY`: a policy changed by `ALTER POLICY` would be judged by its old text (affects Part 3's form, Q7).
- F6 — `save_posting_identity` stamps `updated_at = now()` on every call and `save_seller_place` rewrites its row: writes with no change and no audit (Q5).
- No security hole found.

## queued (rg across docs/governance/briefs, reports, docs/features, roadmap.md)

- `cursor-bundle-6-ruling-3.md:11` — the setter locks its row, answers ok with no update, no audit and no dial (built here: Part 5; the "no dial" half is Q5).
- `cursor-bundle-6-ruling-3.md:46` — findings 6 and 7 go to bundle 7 (built here: STEP 3).
- `cursor-bundle-6-ruling-2.md:15,70` — the standing check seeded by decision 6's list (built here: Part 4).
- `cursor-bundle-6.report.md:259,515,537` — INC-1283 (built here: Part 3); `:539` INC-1290 (built here: Part 5).
- `cursor-bundle-6.report.md` §13 item 8 / ruling 3 — the line-keyed allowlists, INC-1293, owned by Cursor bundle 8 (left).
- The other hits are Lovable's old "bundle 7" (Oct 2026) or roadmap history, not this bundle.

## finding 7

`scripts/doors/manifest.ts:71` `HELPER_REASONS`: the grammar comment (~:40) says `(policy | invoker-chain | none | caller:<where>)`, but the check accepts `policy <names>`, `invoker-chain`, `none[: …]` by first word. STEP 3 makes the comment name exactly those forms (no behaviour change).

## THE PLAN

### Parts and files

- Part 1 (DEC-466): migration A (below); `scripts/conformance/permission-grants.ts` + `.test.ts` (new); `docs/features/step-up-auth.md` (the cores' paragraph).
- Part 2 (INC-1287): migration B; `src/lib/reader-failure.ts` + `.test.ts`; `src/server/answer.ts` (`refusalAnswerStatus` adds 404/409) + `answer.test.ts`; `src/server/imports/route.ts` (`codeStatus` adds 404/409) + `route.test.ts`; `scripts/conformance/refusal-readers.ts` + `.test.ts` (the class census), and its class file if Q3 chooses one; `docs/features/doors.md`.
- Part 3 (INC-1283, INC-1294): migration C (policies) and D (indexes); `scripts/conformance/rls-initplan.ts` + `.test.ts`; `scripts/doors/policies.ts` + its test if Q7 chooses ALTER POLICY; `docs/features/ci-guards.md`.
- Part 4 (INC-1282's check): `scripts/conformance/door-rows.ts` + `.test.ts` + `door-rows-allowlist.txt` (new) (or a manifest column, Q10); `docs/features/doors.md`.
- Part 5 (INC-1290): migration E; `e2e/admin-categories-lifecycle.spec.ts` (CT-23's two exclusions out; the meter one only if Q5 = no dial); `scripts/doors/manifest.txt` :237 only if Q5 needs it.
- STEP 3: `src/features/auth/mfa/use-step-up.ts` (+ a new test in `src/features/auth/mfa/`), per Q6; `scripts/doors/manifest.ts` comment (finding 7).

### Migration files, in order (G74 law 6: the cores, then the SQL callers, then the doors)

- A — the cores. `has_permission_core`, `staff_session_holds` and `has_permission_scoped_core` are redeclared whole (`CREATE OR REPLACE`, signatures unchanged), each from its last declaration in `20261124203700…`. The md5 pre-check pins the five bodies: c633eae927473b96a4e228a7bdd1356a, 669f735c798c7aeba8bb540a9762d649, 47b2959aec21aef39c5e510880487665, 43918073e2633dc9c9e37a1d53debd11, ceeaf84a52ea75626203f7410a9daf77. Changes: the second EXISTS goes, `IN (p_action, 'manage')` becomes `= p_action`, and the comments drop "with manage". Proof on scratch rows: a role holding only `categories:manage` is refused `categories:update` and admitted `categories:manage`, through `has_permission`, `has_permission_scoped` and `door_context`. Sentinel raise, then the real apply. Plus the grants DATA per Q1. Drops nothing.
- B — the SQL callers and the table. `security_lints` redeclared whole (impersonation asks `use`). `door_refusal_status` redeclared whole with the two classes. Drops nothing.
- C — the nine policies: `ALTER POLICY … USING ((SELECT auth.uid()) …)`, each expression otherwise byte for byte (Q7). Proof: for each, rows read as the owner and as another person, before and after, equal. One EXPLAIN of `listings_seller_read` (the seller's own listings) in the report.
- D — `DROP INDEX IF EXISTS public.profiles_alias_unique; DROP INDEX IF EXISTS public.idx_ctp_child;` (per Q8). A file with a DROP: the operator's paste (DEC-384).
- E — the doors: `user_set_preferred_language` redeclared whole: the profile `SELECT … FOR UPDATE`; equal → ok with no update and no audit; the dial per Q5. Proof: an unchanged value leaves the audit count unchanged, a changed value writes one row.

Each file runs `bun run db:proof --fresh`; the MIGRATION stop (stop-2) carries the pairing lines and the md5 table.

### The codes of each status class

GONE 404 and CHANGED 409 as proposed above (31 and 29), or as ruling 1 fixes them. 400 holds the 17 borderline codes and every other code. `door_refusal_status` and `REFUSAL_STATUS` gain the same rows in the same commit.

### The guards' ids (each checked unused by `rg` over scripts/, src/, e2e/, docs/)

- CF-GRANT-1 — `scripts/conformance/permission-grants.ts`: a permission reader's last declaration that matches `manage` in place of the asked action fails (planted: `p.action IN (p_action, 'manage')`). Test cases CFPG-1…; `CF-PERM-1` is taken.
- CF-REFUSAL-6 — in `refusal-readers.test.ts`: every manifest code sits in exactly one class, or in 400 by name with its reason (planted: a code in two classes). The next free number after CF-REFUSAL-5.
- CF-RLS-1d / CF-RLS-1e — CF-RLS-1 widened: `auth.uid()`, `auth.jwt()`, `auth.role()`, `auth.email()`, `current_setting(`; a call inside a FROM-less `(SELECT …)` counts as wrapped, one inside a correlated `EXISTS (SELECT … FROM …)` does not (planted: `USING (auth.uid() = user_id)` fails; the storage form passes).
- CF-DOOR-ROWS-1 — `scripts/conformance/door-rows.ts`: each owner / signed-in-reader / helper door compares an owner column with the caller in its last declaration, or has an allowlist line with its class; a body it cannot read fails (planted: an owner door reading by argument alone). Test cases CFDR-1…; `CF-DOOR-1` is taken.

## Questions for ruling 1

- Q1 (concern 1) — Prod's `admin` holds `categories:manage` and `translations:manage`. After DEC-466, `categories:manage` answers nothing: no door, policy or route asks `categories:manage` (the manifest asks categories:view/create/update/restructure/import/assets). Proposal: migration A expands every `manage` grant a role holds into that resource's explicit actions, as `20260903025501` did, then deletes `categories:manage` grants. `translations:manage` stays a grant, since ten doors ask it by name; its holders also gain translations' other actions only if the ruling says so. Or: the operator re-grants in the Roles console before the apply. Which?
- Q2 (concern 2, the transition) — between the SQL apply and the client's publish, a moved code is `malformed` (a route answers 500). Same-moment apply and publish in THE OPERATOR'S STEPS, or a time-limited tolerance in `classify` (a moved code accepted at 400 or its class until a date)?
- Q3 — the class lists as proposed, or which codes move. And CF-REFUSAL-6's 400-by-name list: 142 codes with a reason each; may the reason be by family (`bad*` = a bad value), and does it live in a new `scripts/conformance/refusal-classes.txt`?
- Q4 (SIDE BY SIDE) — `src/features/admin-listings/use-admin-listing.test.ts:72` goes red with the client table, and it is outside this lane. The routes' own 403/409 for `notYourListing` / `photoGone` (P2), and the green-but-stale mocks under `src/routes/`, are too. May I edit that one test (DECIDE-AND-NAME), or does Lovable change it in #104? Do the routes' statuses stay (named in §13) for bundle 7b?
- Q5 (OPEN c) — does an unchanged `user_set_preferred_language` spend `account_pref`? Spending keeps `door_context` as it is, and CT-23 keeps its meter exclusion. "No dial" (bundle 6 ruling 3) needs a door shape that reads before the dial (a mechanism change). Also: do `save_posting_identity` (`updated_at` on every call) and `save_seller_place` join Part 5, or stay named?
- Q6 (finding 6) — remove the dialog's no-factor mode (user-case 1 then releases the action with `StepUpUnavailable` and the caller's existing hint, `stepUpAbortKey`) and make user-case 2 a failure; or keep the mode for user-case 1 and fix user-case 2 only. Either way, a unit test for each case. no-new-string holds: the failure uses an existing key.
- Q7 (concern 3) — `ALTER POLICY` (then `policiesOf` learns `ALTER POLICY … USING/WITH CHECK`, F5), or DROP + CREATE (the manifest's policy reader works as it is)?
- Q8 (concern 6) — keep `profiles_seller_alias_lower_key` and `category_tree_pointers_child_idx`?
- Q9 (OPEN e) — the advisors' step in the smoke lane needs `.github/workflows/ci.yml` and `scripts/ci/` (not in SCOPE). Add them to scope, or leave the advisors as the supervisor's read?
- Q10 (concern 4) — where each door's class lives: an allowlist `scripts/conformance/door-rows-allowlist.txt` (`door | public: <reason> | until`), or a manifest column (all 240 lines and `check-doors --live`). The kit's `until` is a date or `INC-n`/`DEC-n`: these exceptions are permanent, so which DEC number may they carry?
- Q11 (concern 4) — the matching rule: a comparison (`=`, `<>`, `!=`, `IS [NOT] DISTINCT FROM`) between the caller's id (`auth.uid()`, `v_ctx.uid` or a variable assigned from either) and any column or row field. A body in LANGUAGE sql with no caller id fails unless allowlisted.
- Q12 — `has_permission` (helper) compares nothing itself; allowlisted as `held` (it delegates to the core) or taught to follow the core?
