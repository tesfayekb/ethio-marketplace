STOP — f1-doors phase 1: the plan posted (lane B; PLAN ONLY)
DONE: step 0 (brief saved, roadmap line 4, draft PR #20); the census; the plan below
LEFT: phase 2 (the build), on the supervisor's ruling and after P-2 (a) has merged
CI: # CI Status (auto-generated — do not edit by hand)

- Commit: `7c89b1f60a95caa2832d85252cedbd081f274884` (short `7c89b1f`)
- Conclusion: **SUCCESS**
- Completed (UTC): 2026-11-04T11:44:13Z
- Run: https://github.com/tesfayekb/ethio-marketplace/actions/runs/41820752903
FILES:
docs/governance/briefs/f1-doors.md
docs/governance/reports/f1-doors.stop-1.md
roadmap.md

Base: dev 7c89b1f60 (origin/dev at the start; P-2 (a) had not merged). No code, no test, no
`bun run checks` was run (lane A's Mac). Every number below comes from a scratch census run under
/tmp (a last-declaration reader built on `scripts/conformance/plan-seam.ts`'s grammar plus a
grant/revoke/drop/ALTER tracker with the hosted birth ACL — functions born closed — and the
FOREACH-format grant form of INC-443), from `rg` over the tree at the base, and from the files
named. The live catalogue was NOT read (no backend in lane B); the first build turn confirms the
static count against the smoke lane's catalogue, as check-caller-gates does today.

---

# THE PLAN

## 1. THE CENSUS

### 1.1 The population

The last declarations of `supabase/migrations/` (386 files) leave 474 functions alive in schema
public; 209 are service-only (EXECUTE to service_role or nobody); **265 are browser-callable**
(EXECUTE to anon, authenticated or PUBLIC in the last grant state; trigger and event-trigger
functions excluded, as the live guards exclude them). By class (the class is read from the
grant roles, the volatility and the gates the body names):

| class | count | definition |
|---|---|---|
| owner door | 31 | VOLATILE, authenticated only, the body reads `auth.uid()` as the owner |
| staff door | 91 | VOLATILE, authenticated only, the body calls `has_permission` or `is_super_admin` |
| public door | 1 | VOLATILE, anon too: `public_listing(text)` (its dial `listing_read`) |
| dial-only helper | 1 | VOLATILE, authenticated, no `auth.uid()` of its own: `get_attribute_options(uuid)` (rate_gate inside) |
| public reader | 22 | STABLE/IMMUTABLE, anon too (feed_page, seller_feed_page, the bundles, trees, legal_in_force…) |
| signed-in reader | 62 | STABLE/IMMUTABLE, authenticated only, no permission: 21 person-facing (`my_*`, `listing_*`, has_password, get_active_impersonation…) and 41 pure helpers (attr_*, import_*, cat_*, slug candidates, validate_listing_attributes, require_step_up_if_needed…) |
| staff reader | 57 | STABLE, authenticated only, `has_permission` inside (admin_list_*, admin_get_*, previews, exports, has_permission itself, get_my_permissions) |

VOLATILE and authenticated-callable: **124** = the 120 lines of `scripts/acceptance-doors-allowlist.txt`
+ the 4 doors that name `legal_acceptance_pending(` (edit_my_listing, publish_listing,
renew_listing, reveal_listing_contact). The static census and the acceptance guard's live domain
reconcile exactly; no allowlist line is stale.

A 125th VOLATILE authenticated grant exists and is invisible to every guard today:
`languages_country_codes_valid()` RETURNS trigger, `GRANT EXECUTE … TO authenticated`
(20260901181602 :204). The live queries filter `prorettype <> trigger`, so neither the acceptance
guard nor the caller-gates guard sees it. A stray grant, nothing a browser can call usefully (a
trigger function cannot be invoked by RPC), revoked in turn 1 (no door gains a grant; one loses).

### 1.2 The gates each class HAS (the body) against what it OWES

Codes: AC assert_caller_active, HP has_permission, SA is_super_admin, SU
require_step_up_if_needed, RG rate_gate, UID auth.uid() ownership, LA legal_acceptance_pending,
AUD log_audit.

**Staff doors (91)** — owe: not deactivated → permission → step-up (where the permission row
says) → dial → audit.
- HP: 91 of 91 (begin_impersonation by SA). Deactivation: all 91, through has_permission's
 `account_is_deactivated` branch (it answers false → 'permission denied', never the deactivation
 code — a wording fold for the codes turn).
- SU: 86 direct + 2 inside their `_core` (admin_move_listing, admin_review_photo_change) = 88.
 Three without: admin_reorder_categories (C2h, recorded in row 5), admin_reveal_listing_contact
 (D129, recorded), **catalog_find_rebuild (unrecorded)** — a manifest line `step-up: none`
 with its DEC or a step-up added; the ruling decides.
- RG: 40 of 91 (`staff_config` 40 sites, `staff_moderation` 5, `staff_translation` 2,
 `staff_machine_translation` 3, `import_commit`/`import_undo` 4+4, `review_reveal` 2). **51 staff
 doors spend no dial**: every door of categories, attributes, locations, roles, users, languages,
 translations status/keys, imports' undo (the Aug–Sept 2026 consoles). The manifest names the
 dial each owes (`staff_config` for all 51 unless the ruling says otherwise).
- AUD: 80 name log_audit directly; the rest audit inside a core or write their own audit row
 (the legal doors, the monetisation doors write `audit_log` by INSERT — row 5's "76 audit" is
 now 80 direct).
- Gate ORDER today, four shapes: `HP → SU` (the 2026-08/09 doors, ~50), `UID → HP → SU → RG`
 (the 2026-10 doors, ~37), `UID → HP → RG → SU` (admin_set_listing_tier: dial before step-up),
 `UID → RG → HP → SU → SA` (transition_listing: dial before permission — a refused staff
 transition spends the dial of a door it had no right to). Both deviants take the one order on
 migration.

**Owner doors (31)** — owe: not deactivated → ownership (auth.uid() = the row's owner) → dial →
(acceptance, where the class says) → audit where the brief says.
- Deactivation: 31 of 31 — 25 through rate_gate's `assert_caller_active`, 6 directly (the M20
 six: clear_seller_place, end_impersonation, move_listing_photo, set_cover_photo,
 unsave_listing, user_set_preferred_language). Those 6 are also the 6 owner doors with **no
 dial** (M20 gave them the gate, not a dial): the manifest names one (`revise` for the three
 photo/listing ones, `save` for unsave_listing, a new `account_pref` or `revise` for the two
 preference doors — the ruling picks).
- Order shapes: `UID → RG` (22), `UID → AC → RG` (3), `UID → AC` (3 with no dial), `UID → RG → LA`
 (3), `UID → LA → RG` (reveal_listing_contact: acceptance before the dial), `RG → UID`
 (get_posting_schema, public_listing: the dial before the ownership read — a refused read
 spends). All onto `door_context`'s order.

**Readers (62 signed-in + 22 public)** — owe (INC-838): a deactivated token is refused. Today
**0 of 84** check deactivation; the 57 staff readers do, through has_permission. The 21
person-facing signed-in readers (my_listings, my_listing, my_listing_private, listing_counts,
listing_history, listing_saved, my_saved_listings, my_seller_line, my_seller_place,
my_viewing_location, my_legal_*, my_recent_categories, has_password, get_active_impersonation,
impersonation_target, my_last_listing_private, listing_reveal_count, get_my_translator_languages,
my_listing_certification) are INC-838's set. The 41 helper readers and the 22 public readers are
discussed under §3.6 (a public reader with a deactivated token).

**Browser-callable helpers with no browser caller** (INC-836's class, by grep over src/ and e2e/):
65 names have no `.rpc("name")` / `rpc("name")` / `doorCall` site in src by name, of which:
- 11 import doors are called through `defineImportRoute`'s dynamic `call(fn, args)`
 (src/server/imports/route.ts :191) — callers exist, under one name the grep cannot see;
- 2 (save_listing, unsave_listing) are called through a `door` variable (ad-page/save.ts :14);
- 3 are INC-836 part 2 (edit_listing, set_listing_price, relist_listing: e2e only — §4.4);
- 8 public readers have no src caller by name (get_browse_tree, get_category_attributes,
 get_ui_bundle, catalog_find_version, sold_cutoff, package_price_for, price_shape_for_basis,
 product_price_for) — SSR or superseded (get_ui_bundle_parts); each gets a manifest line with
 its caller or loses its grant in the turn that touches its family;
- 41 helper readers (attr_*, import_*, cat_*, catalog_find_norm, slug candidates,
 validate_listing_attributes, listing_contact_refusals, ui_translation_reviewable,
 entity_source_value, assert_parent_not_catchall, user_has_translation_permission,
 impersonation_target, listing_reveal_count, require_step_up_if_needed, admin_export_attributes()
 — the zero-argument overload) are granted to authenticated for no caller the tree shows. Most
 are called only inside SECURITY DEFINER doors (which do not need the caller's EXECUTE) or inside
 policies/CHECKs (which do). The manifest classes them `helper` with a `reason` column
 (`policy` / `invoker-chain` / `none`); check-doors' static finding `grant-without-caller`
 lists every `none`; the revokes land family by family in the turns of §5 (a revoke is a
 migration; proof: the policies and CHECK constraints that name the helper still evaluate for a
 scratch authenticated session).

Two helpers deserve their own lines: `has_permission(uuid,text,text)` is EXECUTE to
authenticated (INC-409; it must stay so — 229 `CREATE POLICY` expressions call it as the invoking
role); `require_step_up_if_needed(text,text)` is EXECUTE to authenticated (20260817100845) and is
called only inside definer doors — revoked in turn 1 after a live check that no policy names it.

### 1.3 The call sites

667 `.rpc(` / `rpc(` / `doorCall(` / `anonRpc(` sites in src/ and e2e/ (tests under src excluded):
src names 222 distinct door names, e2e 105. In browser code: 39 go through the seam
`src/lib/supabase-door.ts rpc()` and **205 call `.rpc(` on a raw client in 54 files** (25 under
src/features and src/lib, 29 under src/server and src/routes with the service or user client).
The 25 feature files are the typed-Result consumers of §4.3 and the `null as unknown as` sites of
§4.3 (INC-942). Server callers: `doorCall` (src/server/door.ts) in 4 routes; `callerHasPermission`
(user-client.ts :154) calls `has_permission` with the token's own id through the user's bearer
client; the import routes through `defineImportRoute`; the jobs and counters with the service role.

Dynamic-name sites the census could not resolve: 14 in e2e (the `rpcResult(page, name, …)`
helpers, `call.fn` tables), 3 in src (ad-page/save.ts, imports/route.ts, supabase-door.ts) — none
hides a door the static set lacks.

### 1.4 The refusals

Over the 265 browser-callable last bodies: **741 `RAISE EXCEPTION` sites, 299 distinct literals**:
147 bare camelCase codes (`notYours`, `rateLimited`, `unknownVersion`, `badValue:…`), 37
`code:detail`, 504 sentences, 53 with `%` (dynamic), 56 `USING ERRCODE` (P0009 step-up and the
proof codes). The sentences are five messages mostly: 'permission denied' ×138, 'not
authenticated' ×63, 'not your listing' ×23, 'not signed in' ×21, 'listing not found' ×18,
'account is deactivated' ×14, 'step-up required…' (P0009) ×56. **Premise: the register's "278
messages" is 299 today.**

The five client contracts that read them (each a mechanism that stays until its fold):
`src/features/posting/door-error.ts` (`doorRefusal`: a code keeps its code, else `doorError`),
`src/lib/refusal-tail.ts` (`doorKeyText`: `admin.<family>.error.<name>[:tail]` and
`rateLimited`), `src/lib/reader-failure.ts` (`readerFailure`: a fixed list of 9 codes → class
`refused`), `src/server/imports/route.ts` REFUSALS + `imports/csv.ts` (`permission denied` → 403
forbidden, `step-up required` → 428), `src/server/answer.ts stepUpRequired` (P0009 → 428).
`src/features/auth/auth-error-key.ts` reads GoTrue, not doors, and stays. 50 non-test src files
match a door sentence or code by text.

### 1.5 The three allowlists reconciled

- `scripts/caller-gates-allowlist.txt` — 6 lines (7 with the unterminated last), all comments,
 **0 allowances**. Nothing to absorb; the file, `scripts/check-caller-gates.ts`, its fixture
 `scripts/fixtures/caller-gates-bad.tsv`, the CI self-test step (ci.yml :84) and the smoke-lane
 step (local-backend-proof.yml :825–:829) retire when check-doors' live check lands (turn 1).
 INC-837 closes then.
- `scripts/acceptance-doors-allowlist.txt` — 125 lines = 5 comments + 120 door lines (staff 90,
 account 7, helper 5, signal 3, guarded 10, takedown 2, draft 2, legal 1). All 120 absorbed: the
 class becomes the manifest's `acceptance` column (the same eight words); the file dies;
 `check-acceptance-doors.ts` keeps its live regex (`legal_acceptance_pending|legal_certify`) and
 the three-trigger count but reads classes from the manifest. Row 2's guard column changes.
- `scripts/public-surface-allowlist.txt` — 180 lines = 4 comments + 175 entries, 174 distinct
 names (`transition_listing` twice: :22 and :54), 14 relations + 161 function names (34 lines
 name anon). Against the census: **0 anon-callable functions absent** (DEC-310's compare holds);
 **106 authenticated-only functions absent** (the list was anon-complete only; the authenticated
 compare is INC-1025's roadmap follow-up) — 9 of them are roadmap :671's "eleven older browser
 grants" (get_category_tree_version and price_shape_for_basis are listed now), the other 97 are
 the staff doors and helpers of 2026-08/09 that predate the list's floor. The manifest takes the
 FUNCTION side whole: a door's roles follow its class (public-* → anon+authenticated, the rest
 authenticated); `public-surface-allowlist.txt` keeps its 14 relation/column lines;
 `security-lints.ts compareSurface` and `check-migrations.sh`'s whole-statement rule read
 functions from the manifest. The duplicate line and the stale D129 wording die with the
 function lines. Row 8 changes.

## 2. THE MANIFEST

**File:** `scripts/doors/manifest.txt`, one line per browser-callable function, read by
`scripts/doors/manifest.ts` (the parser; the kit's grammar for comments and `|` cells):

```
name(arg types) | class | roles | permission | step-up | dial | audit | country | acceptance | codes | reason
```

- `name(arg types)` — the identity-argument signature as `pg_get_function_identity_arguments`
 prints it (the live key; the static reader normalises aliases the same way).
- `class` — `owner | staff | public-door | public-reader | signed-in-reader | staff-reader | helper`.
 The class fixes the gates OWED: owner → deactivation, ownership, dial; staff → deactivation,
 permission, step-up-per-row, dial, audit; public-door → dial, deactivation-if-signed-in;
 readers → deactivation (staff-reader: permission); helper → none, `reason` required.
- `roles` — `anon,authenticated | authenticated` (row 8's function side).
- `permission` — `resource:action` or `-`; `step-up` — `row` (the permissions row decides, the
 default for staff) | `none:<DEC>` (the three opt-outs) ; `dial` — the rate_dials action or `-`
 (a reader); `audit` — the audit action string the door writes or `-`; `country` — `arg:<name>`
 (the door takes a country), `row:<table.column>` (its target row carries one), `filter`
 (a list reader that narrows by the caller's scope), `global` (configuration: only a global grant
 passes), `-` (owner/public: no staff scope); `acceptance` — row 2's eight words; `codes` — the
 door's OWN refusal codes, comma-separated, besides the shared gate codes; `reason` — free text,
 required for `helper` and for every `none:`.

**Who writes it — three options, one recommended.**
- (a) A generator from the last declarations: cannot work — what a door OWES is not in its body;
 a generator mirrors the body and a missing gate is never a finding. Failure mode: silently
 widens.
- (b) A migration's closer inserts a `door_manifest` row: database truth, live-checkable, but
 the static side still needs the file; the record is scattered over append-only migrations; and
 this executor never applies a migration, so the static census would lag the live row by a turn.
 Failure mode: a forgotten row fails only live, after the apply.
- (c) **Hand-kept, double-entry, the census proving both sides (recommended).** The line says
 what the door owes; the body's `door_context(...)` call carries the same literals (class,
 permission, dial, country mode); `check-doors.ts` parses the call's arguments from the last
 declaration and from `pg_get_functiondef` and fails on any disagreement. Failure mode: a line
 and a body wrong TOGETHER (a staff door entered as `owner`) — caught by the class-derived owed
 gates where possible (an `owner` line for a body that calls has_permission is a finding
 `class-mismatch`), otherwise by review; the same exposure every hand-kept allowlist carries
 today, with the body now a second witness.

New door = one line + one `door_context` call. P-2's `set_listing_level`, `set_listing_reach`,
`resume_listing` are lines on day one (they land before turn 1; the first census includes them or
turn 1 STOPs).

## 3. `door_context`, `door_refuse`, `door_audit`, `base_languages()`

### 3.1 The one function

```sql
CREATE FUNCTION public.door_context(
  p_class      text,                 -- owner | staff | public | reader | staff-reader
  p_resource   text DEFAULT NULL,    -- the permission it owes
  p_action     text DEFAULT NULL,
  p_dial       text DEFAULT NULL,    -- the rate_dials action, NULL for a reader
  p_country    char(2) DEFAULT NULL, -- the target's country, when the manifest says arg:/row:
  p_scope_mode text DEFAULT 'none'   -- none | match | global | filter
) RETURNS public.door_ctx            -- (uid uuid, countries char(2)[], dial_remaining int, resets_at timestamptz)
LANGUAGE plpgsql VOLATILE SECURITY DEFINER SET search_path = public
```

Body, in the law's order, every refusal through `door_refuse`:
1. caller class: `v_uid := auth.uid()`; `p_class <> 'public' AND v_uid IS NULL` →
 `door_refuse('notSignedIn')`; `auth.role()` read once (`service_role` passes every gate but the
 dial — a job is not a person).
2. deactivation: `account_is_deactivated(v_uid)` (one PK read of profiles) → `accountDeactivated`.
 For `public` with `v_uid IS NULL` this step is skipped.
3. permission with scope: `p_resource IS NOT NULL` → `has_permission_scoped(v_uid, p_resource,
 p_action, p_country, p_scope_mode)` (§3.3) → `permissionDenied`. The super-admin branch stays
 inside it.
4. step-up: `p_resource IS NOT NULL` → `require_step_up_if_needed(p_resource, p_action)`
 unchanged, its P0009 kept (the server's 428 and the client's step-up dialog read it) — folded
 onto `door_refuse('stepUpRequired')` with `ERRCODE 'P0009'` so both readings hold.
5. dial: `p_dial IS NOT NULL` → the count (§3.4) → `rateLimited`.
Returns the context the door needs (uid; the countries a `filter` reader may show — NULL = all).

A reader calls it as `door_context('reader')` (or `'staff-reader', resource, action`): under
PostgREST a STABLE function runs READ ONLY, so a reader never spends a dial; its refusal is a
plain RAISE (nothing to count). A new gate kind (a quota, a plan) is one more parameter with a
NULL default, never a fork.

### 3.2 `door_refuse(code text, detail text DEFAULT NULL)`

`RAISE EXCEPTION USING ERRCODE = 'P0D01', MESSAGE = code || coalesce(':' || detail, '')` — the
`code[:detail]` shape every client contract already parses (`splitRefusal`, `doorRefusal`,
`readerFailure`), so the 184 existing code-shaped sites are compatible on day one and the 504
sentence sites fold to codes door by door as each door migrates: 'permission denied' →
`permissionDenied`, 'not authenticated' / 'not signed in' → `notSignedIn`, 'not your listing' →
`notYours`, 'account is deactivated' → `accountDeactivated`, 'listing not found' → `notFound`,
step-up → `stepUpRequired` (P0009). The class `P0D01` is how the shell of §3.4 recognises a
refusal. Codes are a closed list in `src/lib/door-codes.ts` (the client's one reader
`doorCode(error)`, folding `splitRefusal` + `doorRefusal` + `readerFailure`'s regex over turns);
an unknown code renders the one generic key (named in turn 1 with its Amharic), never the raw
message. The server's `doorCall` keeps the envelope and maps `P0D01` codes to their statuses
(`notSignedIn` 401, `permissionDenied` 403, `stepUpRequired` 428, `rateLimited` 429, else 400).

### 3.3 Country scope (INC-834)

`user_roles` carries `scope_type` ('global' | 'country') and `scope_country`; written by
`assign_role`, read today by 7 "may this country be deleted/deactivated" guards and nothing else.
`has_permission(uuid,text,text)` keeps its meaning — the permission in ANY scope — because 229
policies and every menu read it; **`has_permission_scoped(uid, resource, action, country,
mode)`** is the scope-aware check `door_context` uses:
- `match` (the manifest's `arg:`/`row:`): a global grant passes; a country grant passes only
 when its `scope_country = p_country`; `p_country IS NULL` with a country-only grant refuses
 (`permissionDenied:scope`).
- `global` (configuration doors: roles, languages, translations' keys, categories, attributes,
 AI, packages, legal texts): only a global grant passes.
- `filter` (list readers over country-bearing rows: admin_list_listings, admin_list_users,
 admin_list_locations, admin_screening_facts…): any grant passes; `door_ctx.countries` carries
 the scoped set and the reader's WHERE narrows by it (NULL = all).
- `none`: owner and public doors.
Which doors are `match`: the census's coarse read (a `character` argument or a country column in
the body) marks 10 `arg` doors (assign_role, admin_update_profile, admin_save_legal_draft,
admin_save_level_override, admin_save_market_settings, admin_save_package_price,
admin_edit_package_price, change_home_country, save_posting_identity, and
edit_listing/set_listing_price/submit_listing whose `character` is a CURRENCY — excluded on a
by-name read) and 12 `row` staff doors (admin_commit/undo_location_import, admin_move_location,
admin_upsert_location, admin_upsert_language, admin_set_country_active,
admin_set_country_root_order, admin_add_legal_translation, admin_mark_legal_reviewed,
admin_end_package_price, admin_export_legal_acceptances, admin_edit_listing via
listings.home_country_code). Turn 1's census refines this by argument NAME and target table, and
the manifest's `country` column is the record; the residency wave (DEC-251–254) adds `row:` lines,
not code.

### 3.4 The dial counted on a refusal (INC-844)

Postgres has no autonomous transaction; `pg_background` is not on the platform and `dblink` needs
credentials in the database — both rejected. PostgREST commits when a function RETURNS with
`set_config('response.status', '4xx', true)` and rolls back on any RAISE (its transactions
reference; issue #1525, landed v8). So a door's shell is:

```sql
BEGIN
  v_ctx := public.door_context('owner', NULL, NULL, 'revise');   -- counts: INSERT … ON CONFLICT count+1
  -- the door's work; every refusal still RAISEs (door_refuse or the 741 existing sites)
  RETURN jsonb_build_object('ok', true, …);
EXCEPTION WHEN SQLSTATE 'P0D01' THEN               -- a refusal: the sub-transaction rolled the work AND the count back
  RETURN public.door_refused('door_name', 'revise', SQLERRM);  -- counts again, meters, sets response.status
END;
```

`door_refused(name, dial, message)` re-counts the dial (plain upsert, no check), writes one row to
`public.door_refusals (door, code, day, count)` (the metered refusal rows 4 and 20 want; ACT-020
reads it), calls `set_config('response.status', <status for the code>, true)` and returns
`jsonb_build_object('message', code[:detail], 'code', 'P0D01', 'ok', false)` — the body PostgREST
sends at the status, which supabase-js surfaces as `PostgrestError.message = code[:detail]`,
**byte-identical to what a RAISE gives the client today**. Net: exactly one count per call,
success or refusal; the door's partial writes never commit (the plpgsql block is a
sub-transaction); the existing RAISE sites need no rewrite. Unexpected errors (not `P0D01`)
propagate as today.

Proof (planted, turn 1): on a scratch dial, N refused calls raise `rate_limits.count` by N and
leave the door's table unchanged (the refusal proof the brief asks for: the refused side effect
did not happen, the count did); the smoke lane's PostgREST honours `response.status` on a
returned refusal (a scratch door; if it does not, the turn STOPs — the design rests on it).

Consequence to size (G37): a door on the shell returns jsonb. 66 VOLATILE browser doors return
something else today (void 46, uuid 6, the 9 import doors' records, timestamptz 1, integer 1,
text 1); each becomes `RETURNS jsonb` (DROP + CREATE, generated types change: `Returns: undefined
→ Json`) and the callers that read a uuid/int (admin_create_category, admin_create_role,
admin_link_attribute, admin_upsert_attribute, admin_upsert_location, admin_add_category_pointer,
catalog_find_rebuild, user_set_preferred_language, admin_accept_category_image) read `data.id`
etc. Alternative kept open for the ruling: the shell on jsonb doors first (60 of 126), the void
doors keeping RAISE (their refusals uncounted until their turn) — same end state, smaller windows.

### 3.5 `door_audit(ctx, action, old, new)`

A thin, named call over `log_audit(text,text,text,jsonb)` that stamps the door's manifest `audit`
action and the ctx's uid — one shape for the 11 staff doors that write `audit_log` by hand
(legal, monetisation) and the 80 that call log_audit. No new table.

### 3.6 `base_languages()` (INC-850) and the readers' rule (INC-838)

`base_languages()` — STABLE, EXECUTE to authenticated behind `door_context('staff-reader',
'legal', 'edit')`: the enabled languages less the base pair and the hidden tag (K4: the codes come
from the one constants function, never literals), so `legal-editor-form.tsx` leaves
`useLanguages()` → `admin_list_languages()` (translations:view). A legal-only editor test (LGA)
proves it. The `languages` console keeps its own reader.

Readers: the 21 person-facing signed-in readers and the 57 staff readers call `door_context` in
turn 7; cost = one PK probe on `profiles(user_id)` per call (plus the permission read staff
readers already pay). The 41 helpers are not callers of door_context (class `helper`; they lose
their grants family by family). The 22 public readers: with `auth.uid() IS NULL` nothing is read;
with a deactivated token the feed refuses (`accountDeactivated`) — the client already signs a
deactivated account out and shows the banner (en-base :48), so the refusal is a backstop, not a
screen. Measurement: no scratch backend in lane B, so no EXPLAIN here; turn 1's migration proof
block times 1,000 `door_context` calls per class with `clock_timestamp()` and RAISE NOTICEs the
per-call cost, and `scripts/feed-bench.ts` runs on `feed_page` before and after turn 7 (the three
hot paths: the feed, the ad page's `public_listing` — which already pays rate_gate's probe — and
`my_listings`). The acceptance bar proposed: ≤ 0.1 ms per call median on the smoke lane; a
`door_context` over that budget is a STOP, not a merge.

## 4. THE INCIDENTS

**INC-409** — `has_permission(uuid,text,text)` (20261023100132 :78) compares nothing to the
caller. Census: of the 554 textual `has_permission(` sites in all migrations, in the last bodies
every door passes `auth.uid()` or a `v_uid := auth.uid()` (one `v_actor` in the service-only
`import_gate_audit`); the "other users' ids inside admin functions" of the 2026-10-04 record are
gone — the only foreign-id calls are DO proof blocks and the 229 policies (auth.uid()). Server:
`callerHasPermission` (user-client.ts :154) passes the token's own id; e2e admin-users.spec.ts
:607/:624 asks with the service role. Fix (migration, turn 1): a first branch `WHEN p_user_id IS
DISTINCT FROM auth.uid() AND auth.role() = 'authenticated' AND NOT is_super_admin(auth.uid())
THEN false` — false, not a RAISE, because a policy expression cannot raise; the grant stays (the
policies need it). Test: a new spec `e2e/door-refusals.spec.ts` DR-1: user B asks about A (holder)
→ false, A about A → true, super admin about A → true; the migration's proof block compares a
policy-driven read for a scratch holder before and after the redeclaration.

**INC-786 / INC-821** — `count_listing_view` / `count_listing_share` (20261019223105; service-only,
called by src/server/ad-view.ts :40 and ad-share.ts :24) read `listings` then insert
`listing_counters`. Fix (migration, turn 5b): the select takes `FOR KEY SHARE` (the FK's own lock:
a concurrent DELETE waits or fails, never the insert) and the insert sits in a block whose
`EXCEPTION WHEN foreign_key_violation THEN RETURN false` makes "listing gone" the quiet state.
Census of the class (every door that reads a listing then writes a row keyed to it): save_listing,
report_listing, reveal_listing_contact, the photo doors — the same lock, same turn. Test: the
proof block deletes a scratch listing between a held read and the counter's insert from a second
session is not scriptable in one proof; the handler is proven by a planted FK failure (a counter
for an unknown id through a scratch wrapper, removed in the block) and the route's AP test
deletes the listing before the beacon (answers `{counted:false}` 200, no `[ssr-error]`).

**INC-942** — ten sites today (not eleven): attributes-service.ts :300, :303, :436, :463, :464,
:465, :468; locations-service.ts :99, :100; category-images-service.ts :159. The generated types
(`src/integrations/supabase/types.ts`, platform-generated, never hand-edited) declare every
argument non-null; `rpc()` in supabase-door.ts takes `Functions[F]["Args"]`. Fix (app, turn 4
with the attributes/locations/categories doors): the seam's argument type becomes
`DoorArgs<F> = { [K in keyof Args]: Args[K] | null }` — the database's declaration is the
authority for which null it accepts (a null it refuses is the door's `badValue:<arg>` code, never
a compile error); the three services move onto `rpc()`; a kit census `CF-DOOR-ARGS` refuses
`null as unknown as` under src/ with an allowlist that starts at the ten and only falls, emptied
in the same turn. Omitting a key (the DEFAULT applies) stays `undefined`.

**INC-836 part 2** — `edit_listing` (20261014194317 :330), `set_listing_price` (:702),
`relist_listing` (:466): no app caller; 24 e2e call sites in 6 files, 12 tests:
posting-routes-dials PR-27, PR-32, PR-46 (the revise dial — edit_my_listing replaces them);
my-listings-doors ML-2 (:462, :469 the stranger's refusals), ML-4 (relist ×3), ML-5 (price ×8: the
price-drop rules, now `edit_my_listing`'s price keys — ML-11 covers them), ML-6 (editTitle ×3),
ML-9 (:790); my-listings-page MLP-1 (:258 seeding), MLP-5 (:519); admin-listings AL-5 (:588),
AL-29 (:2087); legal-certify LG-28 (×4). Turn 5a: DROP the three (a migration; their 3
acceptance lines, 3 public-surface lines and the generated types go), the 12 tests rewritten onto
`edit_my_listing` / service-role seeding, CG-2 extended from three retired doors to six. **A
product question for the ruling:** `relist_listing` is the only relist mechanism (ML-4's "relist
takes a sold ad only"); no screen calls it, so retiring it retires relist until a seller door
brings it back. (INC-836 part 1 — delete_draft, confirm_home_country, promote_to_super_admin — is
done: CG-2.)

**INC-837** — the allowlist is empty; file, script, fixture, two CI steps and row 1's guard
column retire in turn 1 when `check-doors --live` replaces the caller-gates step. Closes.

**INC-849** — FIXED (`aece54b7`): the D2 anchors have moved and the `if (error) return null`
census over src/features is 0 (reader-failure.test.ts). `readSellerIdentity` (posting-service.ts
:969) throws `ReaderError`; its four callers (my-listing-page.tsx :261 via react-query,
step-who.tsx :244, step-review.tsx :279, wizard.tsx :390) each catch. What the door item still
owes is the compiler-enforced Result: `rpc()` returns `{ ok: true, data } | { ok: false, code,
detail }` (turn 7, with `doorCode`); the 25 raw-client feature files move onto it over turns
4–7 and `route-client`'s shape-guard law applies to `data`.

**INC-443** — (i) the grant form: the manifest's static reader resolves whole GRANT/REVOKE
statements AND the FOREACH-`format('… %s …')` loop (20261004011235 :1125–:1143 is the one
instance), so the static set equals the live set; a grant the reader cannot resolve is the
finding `grant-unseen` (planted: a `format` grant with a computed target). (ii) the absent names:
the 9 of roadmap :671 and the other 97 authenticated-only functions become manifest lines in turn
1 (the function side of the public-surface list moves whole; INC-1025's authenticated compare is
then `check-doors --live`'s own: every authenticated-executable function has a line, every line a
function).

## 5. MIGRATION ORDER (G37) — 7 turns, 8 migration stops

Doors oldest first by their creation migration, grouped so each turn's owed e2e is one family.
Each turn: one migration (rule 30 stop), the doors' bodies redeclared whole onto `door_context` +
the shell, their refusals to codes, their manifest lines, their tests, the typecheck/lint/laws, the
checks, the browser check for the specs named. Expected-red window per turn = between the
operator's apply and the next Publish: a published client matching a SENTENCE the turn folded to a
code shows the generic line for that door (the fold lands with the same turn's client; the window
is the apply→Publish gap the stop report names). No CI red window is expected: each turn's e2e
lands with it.

| turn | lands | doors (count) | e2e by id | stops |
|---|---|---|---|---|
| **F1-1** mechanism + census | M-F1a: `door_refuse`, `door_context`, `door_refused` + `door_refusals`, `has_permission_scoped`, `door_audit`, INC-409's branch, `base_languages()`, the two stray revokes (languages_country_codes_valid, require_step_up_if_needed); `scripts/doors/manifest.txt` (265 lines + P-2's 3), `manifest.ts`, `check-doors.ts` static + `--live`, planted proofs for every finding kind (missing-line, line-without-door, gate-missing, class-mismatch, grant-unseen, grant-without-caller, scope-mode-missing), wired; caller-gates retired; `src/lib/door-codes.ts` + the generic key (EN+AM); legal editor onto base_languages | the account doors (oldest owner doors, 2026-08): remove_own_password, has_password, user_set_preferred_language, change_home_country, get_my_permissions (8) | new DR-1…DR-6 (INC-409 ×2, INC-838 reader refusal, INC-844 count-on-refusal, scope match/global), CG-1…CG-4, S-1…S-4, SO/SP, MF-1…MF-10, LGA-21 + the base_languages test | 1 |
| **F1-2** roles · users · impersonation · audit | assign_role (scope `arg`), revoke_role, admin_create/update/delete_role, admin_set_role_permission, admin_set_account_status, admin_update_profile, begin/end_impersonation, admin_get_user, admin_list_users (`filter`), admin_list_roles*, admin_user_activity, admin_list_audit, admin_audit_* (≈22) | RP-1…14, AU-1…14, AS-1…7, R-1…3, IN, MF | 1 |
| **F1-3** translations · languages · legal | admin_save/set/approve/import/undo/machine translation doors, languages doors, admin_sync_ui_keys, admin_set_key_context, the legal admin doors (`row` for texts), the legal readers (≈38) | TR-1…38 (3 files), LGA-1…21, LG (legal-doors 17), LGC, LGH, LAC | 1 |
| **F1-4a** categories · attributes | the categories and attributes doors and readers, imports' previews/commits/undo for both (≈60); INC-942's `DoorArgs` + CF-DOOR-ARGS (attributes, category-images) | CT-1…48, CI, AT-1…85, IG-1…6, AG | 1 |
| **F1-4b** locations · countries | locations, countries, root order, location imports (`row`), coverage/markets (≈22); INC-942 (locations) | LT, OV, CO-1…9, LR, GE, VP | 1 |
| **F1-5a** the seller's posting doors | submit_listing, publish_listing, renew_listing, edit_my_listing, transition_listing (one order), the photo doors, set_listing_pin/photos_soon/reserved, mark_sold, copy_my_listing, get_posting_schema, get_attribute_options, save_posting_identity, check/suggest alias, seller place; INC-836 part 2 (the three dropped, 12 tests rewritten, CG-2 ×6); P-2's set_listing_level/reach/resume_listing (≈30) | PW (≈190), PR-1…60, PP-1…34, ML-1…14, MLA, MLP, LG-28, PS | 1 |
| **F1-5b** the buyer's doors + counters | save/unsave_listing, report_listing, reveal_listing_contact, user_set_viewing_location, public_listing, accept_legal; INC-786/821 (counters, FOR KEY SHARE, the class census) | AP-1…56, SAVED, VP, LAC, OVW | 1 |
| **F1-6** listings admin · screening · services · monetisation | admin_edit/move/undo_listing, admin_set_listing_tier, photo review doors, admin_reveal_listing_contact, name checks, jobs, AI features, the monetisation doors (`arg`/`row`), their readers (≈45) | AL-1…38, ATR, SC-1…27, SV-1…5, MON-1…17 | 1 |
| **F1-7** readers (INC-838) · codes · the folds | the 21 person-facing readers + remaining staff readers onto `door_context`; the 22 public readers; `rpc()` returns the typed Result; the five contracts fold onto `doorCode` (the sentence readers in 50 files); acceptance classes and the public-surface function side absorbed (rows 2, 8); feed-bench before/after; register rows 1, 4, 5, 20 + the two new rows | FE, FR, FS, AP, MLP, SBE, the a11y/perf lanes; the whole roster once (the fold touches every screen) | 1 |

Estimate: 7 turns (8 stops), each Tier A; the first alone carries the mechanism, the census and
the guards. The doors retired or revoked along the way: 3 (INC-836 part 2) + the helper revokes
the census settles per family.

## 6. CONFLICTS AND WRONG PREMISES

1. **Register row 5** says 77 staff write doors, 72 step-up: today **91** staff doors; 88
 step-up (86 direct, 2 in a core); 3 without — row 5 records two (admin_reorder_categories,
 admin_reveal_listing_contact); `catalog_find_rebuild` is the third and unrecorded.
2. **Row 1 / INC-837** say 115 gated after M20: today **124** VOLATILE authenticated-callable,
 all gated; plus the trigger function `languages_country_codes_valid()` granted to
 authenticated outside every guard's domain (§1.1).
3. **Row 20 / the brief**: "five refusal contracts (278 messages)" → 299 distinct literals over
 741 sites (§1.4); "the baseline's anon count" — DEC-310 already removed anon from the baseline
 (`security-lints-baseline.json` holds four names); nothing to retire there, only row 9's note.
 Row 20's "three records by hand" are rows 1 (the empty caller-gates list), 2 and 8.
4. **INC-942** says eleven sites; ten exist at the base (§4.3).
5. **INC-409's** "called with other users' ids inside admin functions" no longer holds in any last
 body; the constraint that shapes the fix is the 229 policies (the grant stays; false, not RAISE).
6. **INC-443**: "nine absent names" is right for roadmap :671's list; the whole authenticated
 side has 106 absent functions, invisible because DEC-310 compares anon only (INC-1025).
7. **The brief's "door_context runs on EVERY signed-in call … the dial counted"**: under
 PostgREST a STABLE reader runs READ ONLY and cannot count; door_context has a reader mode with
 no dial (§3.1). Not a conflict, a precision.
8. **Knowledge F5 / rule 10 "gates (permission → step-up → scope)"** vs the brief's
 "permission with scope → step-up → dial": compatible if F5's "scope" is the row's ownership and
 the brief's is the grant's country; I read it so. Two doors invert the dial today
 (transition_listing, admin_set_listing_tier) and take the one order on migration.
9. **AGENTS.md :52** ("every VOLATILE signed-in door names a caller gate or has its
 caller-gates-allowlist line") and **:18** (the acceptance-doors allowlist) name mechanisms turn 1
 retires: turn 1's scope must name `AGENTS.md` (its `agents-lines` allowlist) and
 `.github/workflows/ci.yml` + `local-backend-proof.yml` (the retired steps and the new
 `check-doors --live` step) — files the standing allowance does not cover; the ruling grants them
 or turn 1 STOPs at step 1.
10. **`src/integrations/supabase/types.ts` is platform-generated** (Lovable regenerates it after an
 apply): every turn that changes a return type (void → jsonb) or an argument leaves the client's
 types stale between the apply and Lovable's regeneration; the Cursor executor cannot regenerate
 it. The build turns therefore read `data` through shape guards (the law) and never depend on
 the new `Returns`; the stop report of each migration turn names the regen as the apply pairing's
 third step.
11. **INC-836 part 2 retires the only relist mechanism** (§4.4) — a product consequence, not a
 code one; named for the ruling.
12. **The shell's premise** (PostgREST commits on `response.status` 4xx returned normally) is
 documented upstream and unproven on the platform's version; turn 1 proves it on the smoke lane
 before any door depends on it (a planted scratch door; red = STOP and the fallback is a
 `door_refusals` row written by the server route after the door's RAISE — weaker: only routed
 doors would count).
13. The brief's "`scripts/doors/manifest.*`" — adopted as `scripts/doors/manifest.txt` +
 `manifest.ts`; `check-doors.ts` lives in `scripts/` beside the other `check-*.ts` so
 `wired.test.ts`'s domain picks it up unchanged.

Nothing here conflicts with a Cursor rule; the lane B rules were kept (roadmap line 3 untouched;
line 4 added; nothing lane A owns touched).

---

STOP. Phase 2 waits for the supervisor's ruling on: the manifest form (§2 c), the shell and its
jsonb consequence (§3.4 — whole or jsonb-doors-first), the three step-up opt-outs and the 51 + 6
dial-less doors' dials (§1.2), the scope modes per door (§3.3), relist (§4.4), the files turn 1
needs beyond the allowance (§6.9), and P-2 (a)'s merge.
