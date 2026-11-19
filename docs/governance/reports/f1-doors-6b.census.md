# F1-6b — the census (STEP 1)

Brief: `docs/governance/briefs/f1-doors-6b.md` (sha256 f19a59171732ae13a6c6d205219d8ac56138c308cb1b5b99929de47dc7eec070).
BASE = HEAD = `45db563460c200e331f894d71aff0d8b971c0e25` (the merge of pull request #69). Lane `cursor/f1-doors-6b`.
CI for 45db563: SUCCESS (run 44421006250, completed 2026-11-18T23:33:48Z; its E2E lanes ran none, the code tree
proven by run 44416426239; "No failed build/guard jobs in this run"). `origin/dev` read again before this
census: still `45db563`.

Every reading below comes from a command run in this turn. The scratch tools live under
`/tmp/ethio-scratch/f1-doors-6b/`: `census.ts` (the static last declarations), `probe1.sql` (the local-stack
probe), `callers.ts`, `stems.ts`, `e2e-ids.ts`, `closure.mjs`, `parse.ts`. Their raw outputs are appendices
A–E. The probe ran as a scratch migration `20261120000000_9b6bf3af-….sql` through `bun run db:proof --fresh`.
It raises its readings by design. The file was moved out of the tree after the run, and `git status --short`
was empty.

## The verdict for the brief's stop list

**No stop.** Each of the four stops is answered below.

- (a) Every permission, class and step-up cell of the family holds on `door_context`. The flags agree:
  `packages:update` and `services:manage` require step-up, while `packages:view`, `services:view` and
  `profiles:view` do not (local probe, #PERMS, equal to the supervisor's staging read). Every door line names
  `row`, and every door calls `require_step_up_if_needed` today. Every reader line names `-`.
  The country cells that change are `admin_edit_package_price` (`arg:` to `row:`) and
  `admin_clear_level_override` (`global` to `row:`). These are the supervisor's own proposals in THE LAWS. The
  brief names a country cell as not a stop, and the cell-meaning item confirms both.
  One fact applies to every door of the family. Today's bodies call `has_permission`, which ignores a grant's
  scope (`20261106051700_c4e9a6d7…:42–68`). So a country-scoped holder of `packages:update` may write any
  market today. Every country cell, `arg:`, `row:` or `global`, narrows such a holder. The brief records that
  every role assignment on ethio-prod is global, so no real holder narrows. The cells are the manifest's
  declared design (F1-1's census), not a cell that cannot hold.
- (b) No return type changes. Every door and reader keeps `RETURNS jsonb`.
- (c) Every file the family needs lies in SCOPE. Three files outside SCOPE are only REPORTED (K2), never
  touched:
  - `src/features/admin-listings/listing-refusals.ts` (the `badValueWords` helper; decision 12);
  - `src/features/admin-screening/name-checks.test.tsx` (a second reader; see second-readers);
  - `scripts/public-surface-allowlist.txt:63` (a stale reason; see findings).
- (d) No browser caller of a resolver exists. The definition item has the command and its hits.

## consumers

Each function is read from its LIVE body, with these columns:
- the file that last declared it and its line;
- its full md5 of `replace(prosrc, chr(13), '')` on the local proof stack (appendix A, `## FN`). Every
  twelve-digit prefix equals the supervisor's ethio-staging read in the brief. No body carries CR line ends in
  the repository (appendix B, `crlf=false`);
- its manifest line;
- the gates its body has today, in body order.

Every door and reader is SECURITY DEFINER with `search_path=public` and returns jsonb. Each is executable by
`authenticated` and `service_role`, not by `anon`, and has no PUBLIC grant (appendix A). The doors are VOLATILE
and the readers STABLE.

### The doors (staff lines, step-up `row`, dial `staff_config`, audit `manual` unless named)

| function | last declared | md5 (local) | manifest | gates today |
|---|---|---|---|---|
| `admin_clear_level_override(uuid)` | `20261103040805_1fc03fef…:373` | b36a2428334919371725ffe3d28df066 | :25 packages:update, **global** | 'not signed in' → has_permission(packages,update) 'permission denied' → step-up → rate_gate staff_config 'rateLimited' → 'not found' → DELETE → audit `level_override.cleared` |
| `admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamptz,timestamptz)` | `20261103040806_3f552dc1…:175` | 17b4f48616e93109f6602d1ac81986e5 | :38 packages:update, **arg:country_code** | the same four gates → the package row lock → the price row lock → 'price not found' → 'price in use' → 'price already ended' → 'bad amount' → 'bad credit cost' → 'unknown currency' → 'unknown country' → 'unknown category' → 'bad window' → 'overlapping window' → UPDATE (sets `country_code = p_country_code`: **the edit can move the row to another market**) → audit `package_price.edited` |
| `admin_end_package_price(uuid,timestamptz)` | `20261102081700_ac5b1435…:139` | 4e2cfdd4d137f0f724ec1c1899e0a5ab | :39 packages:update, `row:package_prices.country_code` | the four gates → the locks → 'price not found' → 'price already ended' → 'bad window' → 'overlapping window' (within the row's own country and category) → UPDATE valid_to → audit `package_price.ended`; **no country check** |
| `admin_job_resume(text)` | `20261029110745_2a2066ed…:59` | 53ae69f7bb64a21ce0b73a9972b2b1fe | :53 services:manage, dial staff_config, audit `job.resumed`, global | 'not authenticated' → has_permission(services,manage) 'permission denied' → step-up → 'badValue:job'; **no dial** (INC-1038); the pause FOR UPDATE; none → RETURNS `{ok:false, reason:'notPaused'}` at 200; `job_pause_clear` → `log_audit('job.resumed')` → `{ok:true}`. Its header has no VOLATILE keyword (the default: provolatile `v`, appendix A) |
| `admin_save_level_override(text,uuid,character,integer,smallint,text,boolean)` | `20261103040805_1fc03fef…:297` | 3e9f4bbf42a4962c7697d90d70ab79b1 | :106 packages:update, `arg:country_code` | the four gates → the level row lock 'unknown level' → 'not a main category' → 'unknown country' → 'bad days' → 'bad photos' → 'unknown placement' → 'empty override' → upsert on `level_overrides_scope_unique` (level, category, country) → audit `level_override.saved`; **no country check** |
| `admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb)` | `20261109044934_b2f1fad4…:33` | 61aa36df2245ba685201bb0dc33e28ca | :107 packages:update, global | the four gates → 'bad key' → 'unknown kind' → 'bad name' → 'bad days' → the row FOR UPDATE → 'kind change' → level: 'caps on level' → 'bad photos' → 'unknown placement'; reach: 'perks on reach' → 'bad caps' → upsert on key → audit `package.saved` |
| `admin_save_market_settings(integer,text,boolean,character,integer,integer)` | `20261103040807_0cdc612d…:71` | 099dd961a52251a050eb2aafa2521bcd | :108 packages:update, `arg:country_code` | the four gates → 'unknown country' → 'bad free ads' → the reach row lock 'unknown reach' → 'launch bundle required' → 'bad launch bundle' → upsert on `market_settings_scope_unique` (country; NULL = every other market) → audit `market.saved`; **no country check** |
| `admin_save_package_price(text,numeric,character,integer,character,uuid,timestamptz,timestamptz)` | `20261103040806_3f552dc1…:103` | aff779cf3d659dae0aeddc57e8b782ca | :109 packages:update, `arg:country_code` | the four gates → the product row lock 'unknown package' → 'bad amount' → 'bad credit cost' → 'unknown currency' → 'unknown country' → 'unknown category' → 'bad window' → 'overlapping window' → INSERT (the row's country is `p_country_code`) → audit `package_price.saved`; **no country check** |
| `admin_set_ai_feature(text,boolean,integer,integer)` | `20261029015441_88c7da1c…:15` | 91bdeb81c03d4a00d7d07362324f175e | :113 services:manage, global | 'not authenticated' → has_permission(services,manage) 'permission denied' → step-up → rate_gate staff_config 'rateLimited' → 'badValue:enabled' → 'badValue:unitCost' → 'badValue:budget' → the feature FOR UPDATE 'unknownFeature' → 'overBudget' (switched on past its budget) → UPDATE → audit `ai.feature_set`. `CREATE OR REPLACE` header, no VOLATILE keyword (provolatile `v`), `END;` before `$function$` |

None of the doors has a deactivation sentence of its own. `has_permission` answers false for a deactivated
account (`20261106051700_c4e9a6d7…:55`), so such a caller is refused 'permission denied' today. On
`door_context` the same caller is refused `accountDeactivated`. The set of who may call does not change; only
the code changes.

### The readers (staff-reader lines, no step-up, no dial, global)

| function | last declared | md5 (local) | manifest | gates today |
|---|---|---|---|---|
| `admin_ai_features()` | `20261013184636_ddaa7759…:204` | fe97165ba126161e6ec01d124724ee9f | :16 services:view | 'not authenticated' → 'permission denied' |
| `admin_ai_spend_days(integer)` | `20261014103719_ff659d97…:18` | a8b2161a8b86fecb9e62942cb07d842d | :17 services:view | 'not authenticated' → 'permission denied' → 'badValue:days' (1–92) |
| `admin_job_health(text)` | `20261029110745_2a2066ed…:45` | 0093fdc7f97b8e264b99055012d2cdd2 | :52 services:view | has_permission(auth.uid()) 'permission denied' only (a visitor gets 'permission denied') → `job_health_core(p_job, NULL)` |
| `admin_list_ai_calls(text,text,timestamptz,uuid,integer)` | `20261029044433_175bb84e…:37` | 1f18e0da99886c6d81f7c07171bd7007 | :59 services:view | 'not authenticated' → 'permission denied' → 'badValue:limit' → 'badValue:feature' → 'badValue:outcome' → 'badValue:cursor' → the core with `has_permission(v_uid,'profiles','view')` as `p_show_person` (the field rule the brief keeps). Dollar tag `$door$` |
| `admin_list_monetisation()` | `20261103040807_0cdc612d…:142` | 6af21e1705a12f7dd9f23e5f7abc87fc | :72 packages:view | `v_uid IS NULL OR NOT has_permission(packages,view)` → 'denied' |

The two hot readers' cost BEFORE the turn was measured on the local proof stack (appendix A, `## COST`). The
caller was a scratch staff member holding `packages:view` and `services:view` globally, at aal1. Each figure is
the mean of 20 calls inside one block:
- `admin_list_monetisation`: 0.21 ms;
- `admin_job_health('name-check-catchup')`: 0.18 ms.

The figure AFTER is measured by STEP 2's proof the same way and named at the migration stop.

### The callees and the resolvers

| function | last declared | md5 (local) | grants (local) | callers (appendix A, `## CALLERS`) |
|---|---|---|---|---|
| `admin_list_ai_calls_core(…,boolean,boolean)` sql STABLE INVOKER, `$core$` | `20261029044433_175bb84e…:6` | cb54d805e3f37a28d2ba02a7cd29eba4 | none (postgres only) | `admin_list_ai_calls` |
| `job_health_core(text,uuid)` plpgsql STABLE INVOKER | `20261029110745_2a2066ed…:10` | 48dd2264b7ace8513cb1500fcd964f82 | service_role | `admin_job_health` |
| `job_pause_clear(text)` VOLATILE DEFINER → boolean | `20261029073342_cba46fd4…:110` | 2a506869adee38ddf964e4449ea5d3ec | service_role | `admin_job_resume`; `e2e/name-check-queue.spec.ts:56` (the service role) |
| `package_price_for(uuid,text)` sql STABLE INVOKER | `20261103040806_3f552dc1…:85` | 68a7d7e26e100bbb55eacbde14c3c04e | anon, authenticated, service_role | **none** |
| `product_price_for(text,uuid,character)` sql STABLE INVOKER | `20261103040806_3f552dc1…:35` | 4b6f682fd38679c23091ad077e0bba43 | anon, authenticated, service_role | `package_price_for`, `promote_options` (`20261109085715_a63f48fe…:29`, DEFINER :33), `set_listing_level` (`20261115204000_5cf2054f…:40`, DEFINER :44), `set_listing_reach` (same file :128, DEFINER :132) |

No policy, view or scheduled job names any function of the family (appendix A: `pol=- view=- cron=-` for all
nineteen). No function calls a door or reader of the family.

### Each sentence today → the code it becomes (detail after the colon)

The gate sentences, in every door and reader, become door_context's codes:
- 'not signed in', 'not authenticated' (and `admin_job_health`'s visitor) → `notSignedIn`;
- 'permission denied' and 'denied' → `permissionDenied`, or `permissionDenied:scope` from a country cell or a
  `global` cell refusing a country-only holder;
- the deactivated caller (today 'permission denied') → `accountDeactivated`;
- step-up stays P0009 (`step-up required: …`);
- 'rateLimited' → `rateLimited`, raised by door_context.

The work sentences become codes as below. An existing code is reused where one exists: `unknownLevel` and
`unknownReach` are in `src/lib/door-codes.ts` (P-2), and `unknownCountry`, `unknownCategory`, `badDays` and
`badValue:<field>` are codes other families already raise. The AI doors and readers keep the codes they
already raise today. The monetisation codes are named after the key the console draws today, so the
console's words map them head by head (decision 2). `src/lib/door-codes.ts` does not grow.

| door | today | code | the key the console draws today (kept) |
|---|---|---|---|
| save_listing_package | 'bad key' | `badKey` | admin.packages.error.badKey |
| save_listing_package | 'unknown kind' | `unknownKind` | admin.monetisation.error.unknownKind |
| save_listing_package | 'bad name' | `badName` | admin.monetisation.error.badName |
| save_listing_package, save_level_override | 'bad days' | `badDays` (reused) | admin.packages.error.badDays |
| save_listing_package | 'kind change' | `kindChange` | admin.monetisation.error.kindChange |
| save_listing_package | 'caps on level' | `capsOnLevel` | admin.monetisation.error.capsOnLevel |
| save_listing_package, save_level_override | 'bad photos' | `badPhotos` | admin.monetisation.error.badPhotos |
| save_listing_package, save_level_override | 'unknown placement' | `unknownPlacement` | admin.monetisation.error.unknownPlacement |
| save_listing_package | 'perks on reach' | `perksOnReach` | admin.monetisation.error.perksOnReach |
| save_listing_package | 'bad caps' | `badCaps` | admin.monetisation.error.badCaps |
| save_level_override | 'unknown level' | `unknownLevel` (reused) | admin.monetisation.error.unknownLevel |
| save_level_override | 'not a main category' | `notMainCategory` | admin.monetisation.error.notMainCategory |
| save_level_override, save_market_settings, save/edit_package_price | 'unknown country' | `unknownCountry` (reused) | admin.packages.error.unknownCountry |
| save_level_override | 'empty override' | `emptyOverride` | admin.monetisation.error.emptyOverride |
| clear_level_override | 'not found' | `overrideNotFound` | admin.monetisation.error.overrideNotFound |
| save_package_price | 'unknown package' | `unknownPackage` | admin.packages.error.unknownPackage |
| save/edit_package_price | 'bad amount' | `badAmount` | admin.packages.error.badAmount |
| save/edit_package_price | 'bad credit cost' | `badCreditCost` | admin.monetisation.error.badCreditCost |
| save/edit_package_price | 'unknown currency' | `unknownCurrency` | admin.packages.error.unknownCurrency |
| save/edit_package_price | 'unknown category' | `unknownCategory` (reused) | admin.packages.error.unknownCategory |
| save/edit/end_package_price | 'bad window' | `badWindow` | admin.packages.error.badWindow |
| save/edit/end_package_price | 'overlapping window' | `overlappingWindow` | admin.packages.error.overlap |
| edit/end_package_price | 'price not found' | `priceNotFound` | admin.packages.error.notFound |
| edit_package_price | 'price in use' | `priceInUse` | admin.monetisation.error.priceInUse |
| edit/end_package_price | 'price already ended' | `priceEnded` | admin.packages.error.alreadyEnded |
| edit_package_price | (new) the new market outside the caller's countries | `permissionDenied:scope` (decision 3) | admin.packages.error.denied |
| save_market_settings | 'bad free ads' | `badFreeAds` | admin.monetisation.error.badFreeAds |
| save_market_settings | 'unknown reach' | `unknownReach` (reused) | admin.monetisation.error.unknownReach |
| save_market_settings | 'launch bundle required' | `launchRequired` | admin.monetisation.error.launchRequired |
| save_market_settings | 'bad launch bundle' | `badLaunch` | admin.monetisation.error.badLaunch |
| set_ai_feature | 'badValue:enabled' / 'badValue:unitCost' / 'badValue:budget' | `badValue:enabled` / `badValue:unitCost` / `badValue:budget` (kept) | admin.ai.error.unknown (+raw) / admin.ai.error.badPriceDoor / admin.ai.error.badBudget |
| set_ai_feature | 'unknownFeature' / 'overBudget' | kept | admin.ai.error.unknownFeature / admin.ai.error.overBudget |
| job_resume | 'badValue:job' | `badValue:job` (kept) | the job line's notice `common.error` |
| job_resume | returned `{ok:false, reason:'notPaused'}` | stays RETURNED at 200 (decision 7) | admin.screening.job.resume.notPaused |
| ai_spend_days | 'badValue:days' | `badValue:days` (kept) | the spend panel's failed read |
| list_ai_calls | 'badValue:limit' / 'feature' / 'outcome' / 'cursor' | kept | the calls table's failed read |
| list_monetisation | 'denied' | `permissionDenied` | the console's ReaderError |

The door that gains a gate: `admin_job_resume` spends `staff_config` and can answer `rateLimited`.

### The client callers and what each reads

| file:line | function | reads |
|---|---|---|
| `src/features/admin-monetisation/monetisation-service.ts:58` | admin_list_monetisation | the answer, shape-checked; an error → `ReaderError` (MNS-2) |
| `monetisation-service.ts:113`, `:155`, `:168`, `:200`, `:209`, `:214`, `:233` | the seven monetisation doors | `refused(error)` throws `MonetisationDoorError(message, code)`; `use-monetisation-error.ts:24` maps it through `monetisationErrorKey` (`:298–311`, the sentence map `DOOR_MESSAGE_KEYS` `:252–290`; P0009 → `admin.packages.error.stepUp`; fallback `admin.packages.error.unknown` with the raw text). The answers' `id`/`key`/`created` are not read |
| `src/features/admin-monetisation/monetisation-refusals.ts:24` | (the field family) | `MONETISATION_REFUSALS`: the judges' keys read as themselves, for the one Field (`price-dialog.tsx:133,:220`, `monetisation-dialogs.tsx:130`, `product-editor.tsx:148,:179`) |
| `src/features/admin-ai/ai-service.ts:165`, `:210`, `:403` | admin_ai_features, admin_ai_spend_days, admin_list_ai_calls | the answers, shape-checked; errors thrown as they are (`ReaderError` for the calls) |
| `src/features/admin-ai/ai-service.ts:245` | admin_set_ai_feature | the error thrown; `ai-editor.tsx:48` maps it through `aiErrorKey` (`ai-service.ts:437–452`: /permission denied/ → denied; /step[ -]?up/ → stepUp; badValue:budget / unitCost; `AI_REFUSAL_IDS`; else unknown + raw) |
| `src/features/admin-screening/use-name-checks.ts:237` | admin_job_health | the answer, shape-checked → `ReaderError` |
| `src/features/admin-screening/use-name-checks.ts:254–259` | admin_job_resume | an error thrown; the RETURNED `{ok:false, reason:'notPaused'}` → `"notPaused"`; `job-line.tsx:68–84` draws `admin.screening.job.resume.done` / `.notPaused`, an error → `onNotice(abort ?? "common.error")` |

The e2e callers are under the tests item and appendix D.

### The order of the files (proposed, THE LAWS' order)

1. Cores: none must change. No core raises a sentence a door must fold. `job_health_core`'s plain
   `RAISE 'badValue:job'` passes through its reader unchanged (decision 8). `admin_list_ai_calls_core` and
   `job_pause_clear` raise nothing.
2. SQL callers: none. The probe finds no function, policy, view or job that calls a door or reader of the
   family.
3. The doors and readers onto `door_context` and the shell, in five files by concern (decision 1):
   - the prices (save, edit, end);
   - the level overrides (save, clear);
   - the products and the markets;
   - the services' two doors (the AI switch and the job resume);
   - the five readers.
4. The resolvers' grants: REVOKE EXECUTE on both resolvers from `anon`, `authenticated` and PUBLIC. Last,
   because nothing above depends on it.

No caller meets a returned refusal. No SQL caller exists for any door or reader. The readers raise and take no
shell. The resolvers keep their bodies; their SQL callers are SECURITY DEFINER and run as their owner, so the
revoke reaches no caller. The browser clients read `error.message`, which carries `code[:detail]` for both a
raise and the shell's envelope (`src/lib/door-codes.ts:5–12`).

## callee-codes

| callee | what it can answer | what the door does with it |
|---|---|---|
| `door_context` (`20261106051600_8b7c2e41…:39–98`) | `notSignedIn`, `accountDeactivated`, `permissionDenied[:scope]`, P0009 from `require_step_up_if_needed`, `rateLimited`; the service role returns at once (no gate, no dial) | a door's shell returns `door_refused` (P0D01 only; P0009 passes the shell and rises); a reader lets it rise |
| `has_permission_scoped` (`20261106051500_6d2f0f3e…:60–114`) | (allowed, countries, detail `scope`) — read through door_context; and, in `admin_edit_package_price` only, called once more inside the body for the new market (decision 3) | the body raises `door_refuse('permissionDenied', 'scope')` |
| `require_step_up_if_needed` | P0009 'step-up required: …' | rises past the shell to the client's step-up gate |
| `rate_gate` | `{allowed, remaining, resets_at}`, never raises | through door_context only, once per call |
| `job_health_core` | a plain `RAISE 'badValue:job'` (P0001) for any job but `name-check-catchup` | rises through the reader unchanged (no shell); the message is identical to today's |
| `job_pause_clear` | boolean, never raises | `admin_job_resume` ignores its answer (it read the pause FOR UPDATE first) |
| `admin_list_ai_calls_core` | nothing (sql, no RAISE) | — |
| `log_audit` (`20260809010130_05add65c…:170`) | never raises (an INSERT with `auth.uid()`; NULL for the service role) | — |
| the direct `INSERT INTO public.audit_log` of the other eight doors | `audit_log_append_only` refuses UPDATE/DELETE only | — |
| triggers on the written tables (appendix A, `## TRIG`) | `package_prices_updated_at`, `listing_packages_updated_at`, `level_overrides_updated_at`, `market_settings_updated_at`, `door_refusals_updated_at` (timestamps); `listing_packages_level_ranks` (statement-level rebuild), `listing_packages_level_look` and `level_overrides_level_look` (feed requeues) raise nothing a caller reads; `ai_features`, `ai_spend_days`, `job_pauses`, `rate_limits` have none | — |
| the tables' CHECKs (appendix A, `## CON`) | each door validates before its write, so no CHECK fires on a valid call; `listing_packages_key_check` `^[a-z][a-z0-9_]{1,31}$` equals the door's 'bad key' pattern; `job_pauses_job_check` admits only `name-check-catchup` | — |
| `product_price_for` / `package_price_for` | NULL = not offered; no RAISE | not called by any door of this family |

## cell-meaning

The dial `staff_config` is 600 an hour (local probe `## DIAL`, equal to the supervisor's staging read).

- `admin_save_listing_package` · staff_config: creates or edits one product (a level or a reach). A staff
  member sets up a handful of products when a market opens. 600 holds.
- `admin_save_level_override` · staff_config: one level's perks for one main category or market, a few dozen
  in a session at most. Holds.
- `admin_clear_level_override` · staff_config: clears one such row. Holds.
- `admin_save_package_price` · staff_config: one price window. Setting up a market's price matrix is tens of
  rows an hour. Holds.
- `admin_edit_package_price` · staff_config: corrects one unused price, a handful an hour. Holds.
- `admin_end_package_price` · staff_config: ends one price window, a handful an hour. Holds.
- `admin_save_market_settings` · staff_config: one market's free ads, reach and paid-levels switch, a few a
  day. Holds.
- `admin_set_ai_feature` · staff_config: switches one AI feature or sets its budget, a few a day. Holds.
- `admin_job_resume` · staff_config (NEW on the shell; INC-1038): resumes the name re-check after a pause,
  once or twice a day at most. Holds. It spends no dial today; door_context spends it.

Step-up: every door cell `row` holds. Its permission's flag is true (`packages:update`, `services:manage`),
and door_context's staff form calls `require_step_up_if_needed`. Every door calls it today in the same place,
after the permission and before the dial and the validation. Every reader cell `-` holds: door_context's
staff-reader form skips step-up, and `packages:view` and `services:view` need none.

Country — `door_context` passes its country to `has_permission_scoped`. In `match` mode a global grant
passes, a country grant passes only for its own code, and a NULL country (the every-market row) refuses a
country-only holder with `scope` (`20261106051500_6d2f0f3e…:106–111`). So no country-scoped holder can write
an every-market row through any `arg:` or `row:` door.

- `admin_save_level_override` · `arg:country_code`: the upsert is keyed by (level, category, country), so
  the argument names the row the door writes or creates. Holds.
- `admin_save_market_settings` · `arg:country_code`: the upsert is keyed by country, so the argument names
  the row written. Holds.
- `admin_save_package_price` · `arg:country_code`: the INSERT creates the row of that country. Holds.
- `admin_edit_package_price` · `arg:country_code` does NOT hold (DEC-380, G74 (2)). The door edits an
  existing row found by its id, and the argument is a NEW value for that row's country: the UPDATE sets
  `country_code = p_country_code`. PROPOSED and built as the supervisor proposes: `row:package_prices.country_code`
  (the row's current country, read before `door_context`, as 6a's match form reads it). The new value is then
  checked inside the body by the same scoped permission: `has_permission_scoped(…, 'packages', 'update',
  p_country_code, 'match')`, refused `permissionDenied:scope`. That check is skipped for the service role and
  when the country does not change. The locked row's country is checked again after the row lock, so an edit
  that moved the row between the read and the lock cannot slip through (decision 3). A price is neither edited
  nor moved outside the caller's countries.
- `admin_end_package_price` · `row:package_prices.country_code` HOLDS. This answers the queued F1-3 item. The
  door writes only that row's `valid_to`, and its overlap check reads only rows of the same country and
  category, so the row's own country is exactly the market the change touches. The locked row's country is
  checked again after the lock, as for the edit.
- `admin_clear_level_override` · `global` holds as a mode, but it does not name what the door touches. The
  door deletes one row that carries a country. PROPOSED and built as the supervisor proposes:
  `row:level_overrides.country_code`. A row's country never changes: no door updates `level_overrides.country_code`,
  and the save door's upsert is keyed by it. So the row read before the gate is the row deleted. On the
  `row:` cell an unknown id reads a NULL country. A global holder then passes and meets `overrideNotFound`; a
  country-only holder is refused `permissionDenied:scope`.
- `admin_save_listing_package`, `admin_set_ai_feature`, `admin_job_resume`, and the five readers · `global`:
  products, AI features, the job and the consoles' reads span every market. Holds.

## definition

The family by the concern's definition (PREVENTION (1)): every manifest line of class `staff` or
`staff-reader` whose permission's resource is `packages` or `services`. Command:
`awk -F' \\| ' '($2=="staff"||$2=="staff-reader") && $4 ~ /^(packages|services):/' scripts/doors/manifest.txt`.
It finds the fourteen lines :16, :17, :25, :38, :39, :52, :53, :59, :72, :106, :107, :108, :109, :113, equal to
the GO's list of nine doors and five readers. Added to these are the two resolvers whose door-check allowlist
line names the family (`check-doors-allowlist.txt:6`, `package_price_for`; `product_price_for` beside it), and
every function those bodies call that a browser role may execute: none (appendix A).
`admin_list_ai_calls_core` has no grant, `job_health_core` and `job_pause_clear` are the service role's, and
`has_permission`, `require_step_up_if_needed`, `rate_gate` and `log_audit` are closed to the browser roles (the
F1-1 census). The plan's §5 row F1-6 ("… services · monetisation") is matched: F1-6a took the listings,
screening and name-check half, and this turn takes the rest. Difference: none.

The resolvers' browser callers:
`rg -n "package_price_for|product_price_for" src e2e --glob '!src/integrations/supabase/types.ts'` finds one hit,
`src/features/admin-monetisation/monetisation-service.ts:28`, which is a comment ("`product_price_for`, its
perks only ever `level_perks_for`"). No policy or view calls either (appendix A). The only SECURITY INVOKER body
that calls `product_price_for` is `package_price_for` itself, which no one calls. So no browser role runs one.
`scripts/conformance/package-price.ts` and its test name both resolvers as patterns over TypeScript; neither
calls the database. Stop (d) does not apply.

## tests

### The e2e ids (appendix D; the client's other callers by `rg -n "<fn>" e2e`)

| id | file:line | function | what it reads | the exact new expectation |
|---|---|---|---|---|
| MON-2 | `e2e/admin-monetisation.spec.ts:555` | admin_save_listing_package (:580), admin_list_monetisation (:591), admin_save_market_settings (:623) as a reviewer | :590 `.toBe("permission denied")`; :591 `.toBe("denied")`; :629 `.toBe("permission denied")` | :590, :591, :629 → `"permissionDenied"`. The reviewer holds no packages grant, so `has_permission_scoped` returns (false, NULL, NULL): no detail, so the message is the bare code. The viewer holding only packages:view gets the same at :629 on the `arg:` cell with a NULL country |
| MON-5 | `:767` | admin_save_listing_package (:804) | :815 `.toBe("perks on reach")` | `"perksOnReach"` |
| MON-10 | `:1119` | the edit door through the UI | :1147 the line `monetisation-price-edit-error` = `en["admin.monetisation.error.priceInUse"]` | unchanged after STEP 3 (the code `priceInUse` maps to the same key). Between STEP 2 and STEP 3 the console draws `admin.packages.error.unknown` with the raw code: expected red |
| MON-6 | `:819` | the override dialog | :874 `emptyOverride` | unchanged: the client's judge refuses it before the round trip (`monetisation-forms.ts:233`) |
| MON-12 | `:1217` | admin_save_market_settings (:1243) | :1236 the UI line `launchRequired` (the client's judge, `monetisation-forms.ts:303`, unchanged); :1250 `.toBe("launch bundle required")` | :1250 → `"launchRequired"` |
| MON-13 | `:1308` | admin_list_monetisation (:1389) as anon and as a signed-in seller | :1390–1391 `toMatch(/denied|not signed in|permission denied/)` | anon is refused by the grant (PostgREST's 'permission denied for function admin_list_monetisation'); the seller now gets `"permissionDenied"`, which the case-sensitive `/denied/` does NOT match. The expectation becomes, per caller: anon → `toContain("permission denied for function admin_list_monetisation")`; signed-in → `.toBe("permissionDenied")` |
| MON-14 | `:1397` | the step-up modal | P0009 | unchanged |
| SV-1 | `e2e/admin-services.spec.ts:117` | admin_ai_features (:124), admin_ai_spend_days (:127), admin_set_ai_feature (:130) as a seller | :125, :128, :136 `.toBe("permission denied")` | → `"permissionDenied"` (no grant, so no detail). :140, :145 and :149 read the service-only meter doors' and tables' GRANT refusals: unchanged |
| SV-2 | `:153` | admin_ai_features, admin_set_ai_feature as the pool's super admin | :182–184 `unknownFeature`, `badValue:budget`, `badValue:unitCost` | unchanged (the codes are kept; the super admin passes every gate; the pool's super admin holds the step-up session) |
| SV-3 | `:218` | the meter (service role) | :267, :269 | unchanged (not this family) |
| SV-5 | `:327` | admin_ai_spend_days | :357 `.toBe("badValue:days")` | unchanged |
| ACR-E1 | `e2e/admin-ai-calls.spec.ts:7` | admin_list_ai_calls | `error` null | unchanged |
| NCQ-E2E-3 | `e2e/name-check-queue.spec.ts:206` | admin_job_resume through the job line, as the pool's super admin | done, the pause gone, one `job.resumed` audit row | unchanged. The resume spends one `staff_config` of the super admin's. `@global-state`, desktop-1280 only |

No spec outside these reads a sentence of this family: PREVENTION (3), old-file-readers item, appendix C.

### Each client file's own unit tests

| file | its tests | what changes in STEP 3 |
|---|---|---|
| `monetisation-service.ts` | `monetisation-service.test.ts`: MNS-1 … MNS-7 | MNS-2 :185 `rpcError("denied")` → `permissionDenied`; MNS-5 :350–357 (a refusal is thrown with its message and SQLSTATE; :357 `"price in use"`); MNS-6 :363–400 reads the four OLD files by name (`MIGRATIONS`, :37–51) for their RAISE sentences. It is re-pointed at this turn's files and their `door_refuse` codes, and each code is mapped. MNS-7 :403, :407 (`bad caps`, `caps on level`) → the codes |
| `use-monetisation-error.ts`, `monetisation-refusals.ts`, `monetisation-dialogs.tsx` | `monetisation-field-gates.test.tsx` KMO-6 … KMO-8 (:213 "a bad amount's own words" — the judge's key, not the door's sentence; unchanged), `monetisation-forms.test.ts`, `monetisation-page.test.tsx` | the dialogs read the door's refusal through `readRefusal` with the family's words |
| `ai-service.ts`, `ai-editor.tsx` | `ai-service.test.ts` AIS-5 :157–172 (the sentence map), `ai-feature-form.test.tsx` AIF-4 :179–195 (`overBudget` as a P0001 message), `ai-spend-days.test.tsx` AID-6 :79 (`new Error("permission denied")` as a failed read — the panel's error state, not a mapping; unchanged), `ai-calls.test.tsx`, `ai-page.test.tsx` | AIS-5 and AIF-4 read the codes through the reader |
| `use-name-checks.ts`, `job-line.tsx` | `use-name-checks.test.ts` NCR-1 … NCR-3; `JobHealthLine` is tested in `name-checks.test.tsx` (outside SCOPE, unchanged) | the resume keeps reading the returned `notPaused`; no mapping changes |

### Every code a door can answer, and what reaches it after the shell's gate order (PREVENTION (5))

The migration's proofs (STEP 2) reach EVERY code below, each on a scratch caller who clears every earlier
check (law 14). Each door's proof covers:
- `notSignedIn`, with no `sub` in the claims;
- `accountDeactivated`, a scratch staff member with the permission, deactivated;
- `permissionDenied`, a signed-in scratch person without the permission;
- `permissionDenied:scope`, a country-scoped holder, wherever a cell names a country, both on another market
  and on an every-market row;
- P0009 `step-up required: no verified factor`, a holder with no factor;
- `rateLimited`, the scratch caller's own `rate_overrides` row at its ceiling, the window spent;
- every work code in the body's order.

The e2e ids that reach codes after STEP 4:
- `permissionDenied`: MON-2, SV-1, MON-13;
- `perksOnReach`: MON-5;
- `launchRequired`: MON-12;
- `priceInUse` through the UI: MON-10;
- `unknownFeature`, `badValue:budget` and `badValue:unitCost`: SV-2;
- `badValue:days`: SV-5;
- P0009: MON-14.

No code is left unreached. Every code the body can answer is reached at least by its proof.

### The next id of each family this turn adds to

MON-19, SV-6, ACR-E2, NCQ-E2E-5, AL-32 (none planned; AL-8 is changed, not added); MNS-8, AIS-6, AIF-5, KMO-9, NCR-4,
AID-8. (Highest today: MON-18, SV-5, ACR-E1, NCQ-E2E-4, AL-31, MNS-7, AIS-5, AIF-4, KMO-8, NCR-3, AID-7, by
`rg -o '"<id>-[0-9]+' e2e src scripts`.)

### INC-1197's test, AL-8 (`e2e/admin-listings.spec.ts:595`)

The move door today: `door_context('staff', 'listings', 'enforce', 'staff_moderation', v_scope, 'match')` asks the
second factor first (6a ruling 1 §7). `admin_move_listing_core` (`20261118012100_bc29ea76…:111–183`) then
checks, in order:
1. `notSignedIn`;
2. `permissionDenied`;
3. `accountDeactivated`;
4. `badValue:to`;
5. `listingNotFound`;
6. `ownListing`;
7. `illegalTransition:<from>-<to>`;
8. `badValue:reason`;
9. `noteRequired` / `noteTooLong`;
10. **the severe rule (:166–169)**: `IF v_kind = 'admin_restore' AND screening.severe AND NOT is_super_admin(v_uid)
    THEN door_refuse('severeRestore')`. There is **no detail**, so the message is exactly `severeRestore`;
11. the core's own step-up;
12. `transition_listing_core`;
13. the audit `listing.admin_restore`;
14. a seller notice → `{ok:true, kind:'admin_restore', status:'screening'}`.

AL-8 after the turn:
- It keeps :608–616, the owner's `enforcementOnly:removed-screening`.
- It keeps :630–631, the two no-factor refusals
  `step-up required: no verified factor`.
- It then adds the case its title promises. The scratch enforcer signs in on the test's own page, and
  `enrollAndStepUp(page)` gives it a fresh factor. `pageDoor(page, "admin_move_listing", severe)` answers
  `.error` = `"severeRestore"`. `listingTruth(severe.id).status` stays `"removed"`.
- What that holder may do, read from the body: `pageDoor(page, "admin_move_listing", plainRemoved)` answers
  `.data` = `{ ok: true, kind: "admin_restore", status: "screening" }`.
- The later expectations are rewritten to that:
  - the super admin's severe restore still answers `{ok:true, status:"screening"}`;
  - `listingTruth(severe.id).status` = `"screening"`;
  - `listingTruth(plainRemoved.id).status` = `"screening"` (today `"removed"`);
  - `auditRows(plainRemoved.id)` = one row, action `listing.admin_restore`, actor the enforcer, meta
    `{from:"removed", to:"screening", reason:"appeal_accepted"}` (today `[]`).
- A test that calls `enrollAndStepUp` must carry `@private-identity` (`scripts/check-identity-tags.sh:17,:31`).
  AL-8 gains that tag, so its `signInJobSuperAdmin` takes a private mint (J9). The tag's form is a test's
  options object, as at `e2e/admin-locations.spec.ts:515`.

## lists

- **The manifest** (`scripts/doors/manifest.txt`):
  - The fourteen family lines take their codes cells: the codes above, sorted, the body's `door_refuse` first
    literals. `admin_edit_package_price` adds `permissionDenied` (decision 3).
  - Two country cells change: :25 `global` → `row:level_overrides.country_code`, and :38 `arg:country_code` →
    `row:package_prices.country_code`.
  - The reasons that name F1-1's census stay.
  - :237 `package_price_for(uuid,text)` and :240 `product_price_for(text,uuid,character)` LEAVE: no longer
    browser-callable.
- **The door check's allowlist** (`scripts/doors/check-doors-allowlist.txt:6`): the `grant-without-caller
  package_price_for(uuid,text)` line LEAVES. The `get_browse_tree` and `get_category_attributes` lines stay
  (F1-7's).
- **The forms allowlist** (`scripts/conformance/forms-allowlist.txt`): :8 `ai-service.ts`, :9
  `monetisation-dialogs.tsx`, :10 `monetisation-service.ts` and :11 `use-monetisation-error.ts` (CF-FORM-3,
  DEC-339) LEAVE in STEP 3, when the screens read codes through `readRefusal`.
- **The public-surface allowlist** (`scripts/public-surface-allowlist.txt`): :165 `package_price_for` and :173
  `product_price_for` LEAVE with their grants. The family's door lines stay true except :63 (findings).
- **The acceptance-doors allowlist** (outside SCOPE): :48 `admin_set_ai_feature` and :118–:125 stay true. Each
  still rejects callers lacking its permission before its mutation.
- **The migration reader's computed-declaration list** (`scripts/conformance/migration-reader.ts:39`,
  `COMPUTED_BY_HAND`): unchanged. Every body is under 10 KB (the largest, `admin_save_listing_package`, is
  5,931 bytes) and is written out whole by script, as literal text the reader reads.
- **The shared-value tables this family's tests write**: `package_prices`, `level_overrides`, `market_settings`,
  `listing_packages`, `ai_features`.
  - The changed assertions (MON-2, MON-5, MON-12, MON-13, SV-1) add no write.
  - MON-5 and MON-12 already write only `e2e`-keyed scratch products and markets.
  - The two tests that change a real market's rows carry `@global-state` (`:1447`, `:1508`).
  - AL-8 writes no shared-value table.
- **The register** (`docs/governance/mechanisms.md`): the doors' row and the forms row, by the records turn
  (§14).
- **CF-PRICE-1** (`scripts/conformance/package-price.ts`): unchanged. It judges TypeScript only. The one reader
  home stays `monetisation-service.ts`, and the comment at :28 is not code.
- **`scripts/security-lints.ts` and `scripts/public-surface.test.ts`**: name no resolver. No change.

## old-file-readers

- Every folded sentence was searched with `rg -n -F '<sentence>' src e2e scripts`. Excluded were the generated
  types, `*.sql`, the locale files and the manifest. There were 48 commands; the hits are in appendix C.
  - The hits that read THIS family:
    - the sentence map `monetisation-service.ts:252–290`;
    - `monetisation-service.test.ts:185`, `:351–357`, `:363–400`, `:403`, `:407`;
    - `ai-service.ts:430–451` and `ai-service.test.ts:157–172`;
    - `ai-feature-form.test.tsx:183`;
    - `e2e/admin-monetisation.spec.ts:590`, `:591`, `:629`, `:815`, `:1250`, `:1390–1391`;
    - `e2e/admin-services.spec.ts:125`, `:128`, `:136`.
  - The comments `price-dialog.tsx:45` ('price in use', 'price already ended') and `monetisation-service.ts:250`,
    `:317` change wording in STEP 3.
  - Every other hit reads another family's door, a provider, or a test title. Examples: 'unknown kind' in
    `e2e/legal-pages.spec.ts:215` and `use-photo-changes.ts:43`; 'bad key' in `src/server/route.test.ts:513`;
    'badValue:limit' in `legal-doors.spec.ts:1293`; 'unknownFeature' in `src/server/ai/meter.test.ts`, which is
    the meter's door `ai_feature_gate`; 'notPaused' in `my-listing.ts:276`, which is P-2's resume.
- By function name, appendix B's `callers.txt`. The readers that read an answer whose shape changes:
  - Only a refusal's shape changes. The shell returns its envelope at 4xx where a raise answered before, and
    `error.message` carries `code[:detail]` in both.
  - No success answer changes shape.
  - The feature docs name the doors: `docs/features/packages.md:97`, `docs/features/plans.md:117–120`,
    `docs/features/doors.md:53`, `docs/features/hidden-seller-name.md:59`. Each is updated in STEP 3/4.
- Old migration files read by a test: `monetisation-service.test.ts:37–51` (MNS-6, above) is the only one.
  `rg -ln "supabase/migrations/[0-9]+" scripts src e2e` piped to `xargs rg -l "<the nineteen names>"` finds that
  file alone. `tier-reasons.test.ts` reads 6a's file, not this family.

## second-readers

`rg -n "vi\.mock\(['\"][^'\"]*(monetisation-service|use-monetisation-error|monetisation-refusals|ai-service|use-ai-features|use-ai-calls|use-name-checks|job-line)" src e2e scripts`:

- `src/features/admin-screening/name-checks.test.tsx:21` mocks `./use-name-checks` by spreading the real module
  and replacing `useNameQueue` and `useJobLine`. It is outside SCOPE and holds as long as STEP 3 keeps those two
  names; the resume's shape does not change.
- `src/features/admin-ai/ai-calls.test.tsx:7` and `ai-page.test.tsx:25` mock `./use-ai-calls`.
- `ai-spend-days.test.tsx:21`, `ai-page.test.tsx:81` and `ai-feature-form.test.tsx:19` mock `./use-ai-features`.

`rg -n "import\(['\"][^'\"]*(admin-monetisation|admin-ai|use-name-checks|job-line)" src` finds only the type
argument `real<typeof import("./use-name-checks")>()` in `name-checks.test.tsx:22`. `loadOnce` in these folders: none. The two routes import the pages
statically (`src/routes/admin.monetisation.tsx:4`, `src/routes/admin.ai.tsx:4`).

## chunk-graph

From the base build (lock-exact: `bun install --frozen-lockfile` answered "no changes"; `bun run build`,
appendix E). Each page's static closure is in gzip bytes, with the chunks a client change may touch named
(`closure.mjs`, over `scripts/bundle-closure.mjs`):

- `/admin/monetisation`: 71 chunks, 316,286 B; `admin.monetisation-Cbs4LO1C.js` 14,331, `refusal-CcJP3zJX.js` 1,131.
- `/admin/ai`: 68 chunks, 305,845 B; `admin.ai-BYt3p4Mf.js` 6,988, `refusal-CcJP3zJX.js` 1,131.
- `/admin/screening`: 89 chunks, 349,048 B; `admin.screening-Cpc6t0pk.js` 9,005, `use-screening-DqrjjUwI.js`
  2,055, `refusal-CcJP3zJX.js` 1,131 (and `ad-page-refusals`, `price-basis`, `use-price-unit-labels`).

The one refusal reader's chunk is already in all three closures. A console moving onto `readRefusal`
therefore adds no chunk; only the page chunks change. The "after" numbers come from STEP 5's build.

## environments

- The local proof stack: me, `bun run db:proof --fresh`, 127.0.0.1 only (DEC-343). This census's probe and
  STEP 2's proofs run there.
- ethio-staging: the supervisor's step after the migration stop. Either the operator pastes the files from
  the supervisor's message of links, or the supervisor uses the connector for one or two files without a DROP
  (DEC-384). This turn plans six files, none with a DROP.
- ethio-prod: after the merge, with the Publish (6a ruling 2 §3's form).
- CI's temporary backends apply every migration on the pull request's lanes. STEP 2's proofs run there too,
  and the preflight reports STAGING BEHIND until staging holds the marks.

## mechanisms

Read whole at their last declarations:

- **`door_context`** (`20261106051600_8b7c2e41…:39–98`), in this order:
  1. the class;
  2. the service role returns at once;
  3. `notSignedIn` (except a public call);
  4. `accountDeactivated`;
  5. `has_permission_scoped` → `permissionDenied[:detail]`;
  6. `require_step_up_if_needed`, except for staff-reader;
  7. the dial → `rateLimited`.

  Its staff-reader form refuses a dial (`a reader spends no dial`). Its NULL country is passed through
  unchanged, and `has_permission_scoped` judges it.
- **`has_permission_scoped`** (`20261106051500_6d2f0f3e…:60–114`): a deactivated or NULL user answers false
  with no detail, and a super admin true. The `global` mode refuses a country-only holder with `scope`. In
  `match` mode a global grant passes, a country grant passes only for its code, and a NULL code refuses with
  `scope`. `manage` counts as the action.
- **`door_refuse` and the shell**: `door_refuse` (`20261106051500…:31`) raises P0D01 `code[:detail]`.
  `door_refused` (`20261106051600…:128–165`) re-counts the dial except for gate codes (INC-844, `:140–145`).
  `rateLimited` is not among the exempt codes, so a rate refusal is counted once more (INC-1196, F1-7's LEFT).
  It meters `door_refusals`, sets `response.status` (`notSignedIn` 401, `permissionDenied` and
  `accountDeactivated` 403, `rateLimited` 429, else 400), and returns `{ok:false, code:'P0D01', message,
  refusals}`.
  `door_audit` (`…:172`) is not used by this family (decision 9).
- **`readRefusal`** (`src/lib/refusal.ts:221–257`), in this order:
  1. step-up;
  2. the family's words by the code's HEAD;
  3. a door key;
  4. a DOOR_CODES code, giving the family generic;
  5. the retiring sentences;
  6. the provider.

  A `badValue:<field>` tail is not distinguished by the words: the admin-listings mappers read it first through
  `badValueWords` (`src/features/admin-listings/listing-refusals.ts:58–65`). `ADMIN_REFUSALS`
  (`src/lib/refusal-tail.ts:23`) maps `rateLimited` → `admin.error.rateLimited`.
- **The consoles' words today**:
  - `monetisation-service.ts:252–311` (sentences → keys);
  - `monetisation-refusals.ts` (the judges' keys for the one Field);
  - `use-monetisation-error.ts` (P0009 / step-up abort);
  - `ai-service.ts:429–452`;
  - `job-line.tsx:68–84` (`common.error` for any refused resume).

  The keys are in `src/i18n/locales/en-admin.ts` (`admin.ai.error.*` :312–321, `admin.screening.job.*`
  :482–501, `admin.packages.error.*` :1863–1878, `admin.monetisation.error.*` :1794–1959).
- **F1-6a's staff proofs as the patterns**: `20261118012500_f28efa6b…` (a staff_config door: the `$pre$` md5
  loop, the gates a)–e), the scratch `XZ` market, `rate_overrides` 1000 per scratch caller per dial, the
  factor/session/amr rows for step-up, the sentinel rollback). Also `20261118012900_14117b17…` (the
  staff-reader form) and `20261118012400_64aca671…:60–64` (the `match` form: the row's country read before
  `door_context`; a country role `user_roles (…, 'country', v_code)`).

## first-download

From the base build (`node scripts/check-bundle-size.mjs`, appendix E). JS 200.7 / 205 KiB, CSS 22.6 / 40 KiB.
Every page is under its ceiling, and "Bundle budget OK". The three pages this turn's client touches:

- `/admin/monetisation`: 308.9 / 313 KiB, 4.1 KiB of room;
- `/admin/ai`: 298.7 / 303 KiB, 4.3 KiB of room;
- `/admin/screening`: 340.9 / 348 KiB, 7.1 KiB of room.

The other pages are listed whole in appendix E. This turn touches no code every page carries (the client
change sits in the three consoles' own chunks), so no other page moves.

## premises

1. The GO says "none of these bodies is on the shell yet; none has a SQL caller; every one is SECURITY
   DEFINER and executable by `authenticated`, none by `anon`". True (appendix A).
2. The GO says the resolvers are "SECURITY INVOKER, executable by `anon` and `authenticated` … their only SQL
   callers are `package_price_for` itself and the SECURITY DEFINER doors …". True. More precisely,
   `package_price_for` has NO caller; it is `product_price_for` that has the four.
3. The GO says "every door of this family but one passes `rate_gate('staff_config')` today; `admin_job_resume`
   spends none". True.
4. The GO says "every door calls `require_step_up_if_needed` today". True.
5. The GO says the bodies call `has_permission` without a scope. True. Its consequence is that country cells
   narrow a country-scoped holder (the verdict). The GO's "building a country cell narrows no real holder"
   rests on ethio-prod's reading (all global), which I cannot read.
6. **Not true as worded — DEC-407's record text.** It says "a price reaches a browser only through those doors'
   answers and the staff's `admin_list_monetisation`". The browser roles read `package_prices` rows directly
   (`scripts/public-surface-allowlist.txt:164`: "browser roles read every column except created_by and
   updated_by, and only valid rows (RLS)"; MON-13 asserts it at `e2e/admin-monetisation.spec.ts:1357–1361`).
   What becomes true is that the resolvers' COMPUTED price reaches a browser only through those doors' answers.
   The record's wording is the supervisor's to rule (decision 14). The revoke itself is unaffected.
7. The GO says "several live bodies carry CR line ends". None of this family's does, in the repository
   (appendix B, `crlf=false` for all nineteen). The supervisor's staging read may differ; both sides are
   stripped anyway (THE CARRIER LAW).
8. The GO's CONSUMERS names `use-ai-features.ts`, `use-ai-calls.ts` and `ai-spend-days.tsx` as callers. They
   call through `ai-service.ts` (`:165`, `:210`, `:403`), which is the only file with the `rpc` calls. They are
   consumers through it.

## findings

1. `scripts/public-surface-allowlist.txt:63` (`admin_set_ai_feature`) says the door "refuses photo screening
   off". That is untrue since bundle 13 turn 6: the body's comment (D158) and AIS-5's case `screeningStaysOn` →
   unknown. It is a stale reason outside this turn's clause for that file (only the resolvers' lines). Rule 10
   forbids known-error debt, so it is reported for a ruling (decision 13).
2. The flake ledger (`origin/ci-evidence:docs/tracking/flake-ledger.md`, 2026-11-12 → 2026-11-18) has four tests
   at three or more lines in seven days:
   - SMN-E3, 5 lines. INC-1161 records it as closed by the tests-ci turn (`tests-ci.report.md:215`), so its
     return is a finding.
   - CL-E10, 5 lines, with no incident found by `rg`.
   - SMN-E13, 3 lines. INC-1015 is older.
   - AP-26, 3 lines, with no incident found.

   None is this family's.
3. `src/features/admin-listings/listing-refusals.ts:58` holds `badValueWords`, a reader of the `badValue:<field>`
   tail, in a feature folder. Two other consoles (AI here, and any later one) need the same reading (K2;
   decision 12). It is outside SCOPE and in Lovable's L13.
4. `scripts/public-surface-allowlist.txt:172` describes the clear as "a per-category row". The door clears any
   override row (category and/or country). The wording is imprecise but not untrue; it is left.

No security hole found.

## queued

`rg -n "F1-6" docs/governance/briefs docs/governance/reports roadmap.md scripts/conformance scripts/doors`, with this
turn's brief and the F1-6a records excluded (52 lines, scratch `queued.txt`). The items for this family:

- `docs/governance/reports/f1-doors-3.report.md:336`: whether `admin_end_package_price`'s row country is the
  right scope. **Built here**: it holds (cell-meaning).
- `docs/governance/briefs/f1-doors-3-ruling-2.md:33`: the end door's column name. Already corrected in F1-3, read
  here.
- `scripts/doors/check-doors-allowlist.txt:6`: "family F1-6 revokes or names its caller". **Built here**: the
  revoke, and the line leaves.
- `docs/governance/briefs/f1-doors-2.md:60` and `f1-doors-6a.report.md:277`: INC-1038's last door, `admin_job_resume`.
  **Built here**.
- `docs/governance/reports/f1-doors-3.report.md:187` and `f1-doors-6a.report.md:154–155, :271`: the monetisation
  and AI sentence mappers and their e2e sentence expectations. **Built here** (STEP 3–4).
- `roadmap.md:15`: "F1-6 (enforcement) — a signed photo link outlives a takedown (INC-1167)". **Left**: the GO's
  LEFT (INC-1167, the before-launch list).
- `roadmap.md:31`: "The staff move's and the reviewer's decisions spend `staff_moderation`". Built by F1-6a, not
  this family.
- `docs/governance/reports/f1-doors-4b.census.md:161`: `admin_save_market_settings` is `packages:update`, F1-6.
  **Built here**.

## Decisions for the supervisor (numbered; built as proposed unless ruled otherwise)

1. **The split.** There are six files, in THE LAWS' order (no core, no SQL caller):
   1. the prices (save, edit, end);
   2. the level overrides (save, clear);
   3. the products and the markets (`admin_save_listing_package`, `admin_save_market_settings`);
   4. the services' doors (`admin_set_ai_feature`, `admin_job_resume`);
   5. the five readers, with their cost before and after;
   6. the resolvers' grants.

   Each file is one concern, about 25 KB by its proofs, and never split inside a body (6a ruling 2 §9).
2. **The codes.** The monetisation doors take distinct camelCase codes named after the key each line draws
   today (the table under consumers). The console's words map them head by head, with no tail reading. Existing
   codes are reused: `unknownCountry`, `unknownCategory`, `unknownLevel`, `unknownReach`, `badDays`. The AI door
   and the readers keep the codes they raise today (`badValue:<field>`, `unknownFeature`, `overBudget`), so SV-2
   and SV-5 do not change. `src/lib/door-codes.ts` does not grow.
3. **`admin_edit_package_price`.** Its cell becomes `row:package_prices.country_code` (the supervisor's
   proposal). The row's country is read before `door_context` (6a's match form).
   - Inside the body, after the row lock, `has_permission_scoped(uid, 'packages', 'update', <country>, 'match')`
     is asked for each country other than the gated one that the call touches: the locked row's current country
     (a concurrent move) and the new value. A refusal raises `door_refuse('permissionDenied', 'scope')`.
   - The check is skipped for the service role (door_context's role, 6a ruling 2 §4).
   - The codes cell gains `permissionDenied`; six translation doors already list it in theirs.
   - `admin_end_package_price` takes the same post-lock check for the locked row's country.
4. **`admin_clear_level_override`**: `global` → `row:level_overrides.country_code` (the supervisor's proposal;
   the row's country never changes).
5. **`admin_end_package_price`'s row scope holds** (the queued F1-3 item).
6. **The three `arg:` cells hold**: `admin_save_level_override`, `admin_save_market_settings` and
   `admin_save_package_price` (`match` on `p_country_code`; NULL = the every-market row, refused to a
   country-only holder).
7. **`admin_job_resume`** gains `staff_config` on `door_context` (INC-1038). Its `notPaused` stays a RETURNED
   answer at 200, as 6a's 'stale' (6a ruling 1 §6): `job-line.tsx` and `use-name-checks.ts:258` read it as a
   state, not a refusal. Its 'badValue:job' becomes `door_refuse('badValue', 'job')`, after the dial (6a ruling
   2 §5's class: a bad job name spends one unit).
8. **The readers.** Each is `door_context('staff-reader', <packages|services>, 'view', NULL, NULL, 'global')`
   with no shell. `job_health_core` keeps its plain 'badValue:job' (no core changes; the message is identical).
   `admin_list_ai_calls` keeps its `profiles:view` field rule.
9. **Audit** stays each door's own write (eight direct INSERTs and `log_audit`), as F1-6a. The manifest's audit
   cells (`manual`, `job.resumed`) stay.
10. **`accountDeactivated`** is a new code for these doors (today such a caller is refused 'permission denied').
    The consoles map it to their denied words, so no new string is needed.
11. **New strings: none proposed.** Every code maps to a key the line draws today. The AI console's
    `notSignedIn`, `permissionDenied` and `accountDeactivated` map to `admin.ai.error.denied`; its `rateLimited`
    maps to the consoles' shared `admin.error.rateLimited` (`ADMIN_REFUSALS`; today the AI console draws
    unknown with the raw text). The job line keeps `common.error` for any refused resume.
12. **STEP 3, the AI console's `badValue` tails.** `badValue:budget` and `badValue:unitCost` draw different keys
    today, and `readRefusal` maps by the head. The one tail reader, `badValueWords`, lives in
    `src/features/admin-listings/listing-refusals.ts`, which is outside SCOPE and in L13. Proposal: import it
    unchanged from there. K2: it belongs beside the reader in `src/lib/`, a move for a turn whose scope holds
    that file.
13. **Finding 1** (`public-surface-allowlist.txt:63`'s stale reason): widen SCOPE for that reason text, or file
    it.
14. **Premise 6**: DEC-407's record text reads "the resolvers' computed price", since browsers read the price rows
    directly.
15. **The service role** passes `door_context` with no gate and no dial (6a ruling 2 §4). No service caller of
    these doors exists today (`rg -n "<names>" src/server` finds none).
16. **AL-8** gains `@private-identity` with its enrolled case (`check-identity-tags.sh`).

## Appendices

The raw outputs of the scratch tools follow, as they were written. A: the local probe (its own message,
split at `##`). B: the static last declarations (`census.txt`) and the callers by name (`callers.txt`).
C: the sentences' hits (`stems.txt`). D: the e2e ids that call a family function (`e2e-ids.txt`). E: the
base build's first downloads and the three closures.

### Appendix A — the local probe (probe1.trim.txt)

````text
ERROR: PROBE
## FN admin_ai_features|md5=fe97165ba126161e6ec01d124724ee9f|vol=s|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_ai_spend_days|md5=a8b2161a8b86fecb9e62942cb07d842d|vol=s|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_clear_level_override|md5=b36a2428334919371725ffe3d28df066|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_edit_package_price|md5=17b4f48616e93109f6602d1ac81986e5|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_end_package_price|md5=4e2cfdd4d137f0f724ec1c1899e0a5ab|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_job_health|md5=0093fdc7f97b8e264b99055012d2cdd2|vol=s|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_job_resume|md5=53ae69f7bb64a21ce0b73a9972b2b1fe|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_list_ai_calls|md5=1f18e0da99886c6d81f7c07171bd7007|vol=s|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_list_monetisation|md5=6af21e1705a12f7dd9f23e5f7abc87fc|vol=s|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_save_level_override|md5=3e9f4bbf42a4962c7697d90d70ab79b1|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_save_listing_package|md5=61aa36df2245ba685201bb0dc33e28ca|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_save_market_settings|md5=099dd961a52251a050eb2aafa2521bcd|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_save_package_price|md5=aff779cf3d659dae0aeddc57e8b782ca|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_set_ai_feature|md5=91bdeb81c03d4a00d7d07362324f175e|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=t|svc=t|public=f
## FN admin_list_ai_calls_core|md5=cb54d805e3f37a28d2ba02a7cd29eba4|vol=s|def=f|cfg={search_path=public}|ret=jsonb|anon=f|auth=f|svc=f|public=f
## FN job_health_core|md5=48dd2264b7ace8513cb1500fcd964f82|vol=s|def=f|cfg={search_path=public}|ret=jsonb|anon=f|auth=f|svc=t|public=f
## FN job_pause_clear|md5=2a506869adee38ddf964e4449ea5d3ec|vol=v|def=t|cfg={search_path=public}|ret=boolean|anon=f|auth=f|svc=t|public=f
## FN package_price_for|md5=68a7d7e26e100bbb55eacbde14c3c04e|vol=s|def=f|cfg={search_path=public}|ret=jsonb|anon=t|auth=t|svc=t|public=f
## FN product_price_for|md5=4b6f682fd38679c23091ad077e0bba43|vol=s|def=f|cfg={search_path=public}|ret=jsonb|anon=t|auth=t|svc=t|public=f
## FN door_context|md5=5a05ee77766181a4256d5b7efce36c41|vol=v|def=t|cfg={search_path=public}|ret=door_ctx|anon=f|auth=f|svc=t|public=f
## FN door_refused|md5=1a94a1b3ad3446749a1d08d9c096df02|vol=v|def=t|cfg={search_path=public}|ret=jsonb|anon=f|auth=f|svc=t|public=f
## FN has_permission_scoped|md5=3825186312d23eb61175be8134b624f8|vol=s|def=t|cfg={search_path=public}|ret=TABLE(allowed boolean, countries character[], detail text)|anon=f|auth=f|svc=t|public=f
## CALLERS admin_ai_features fn=- pol=- view=- cron=-
## CALLERS admin_ai_spend_days fn=- pol=- view=- cron=-
## CALLERS admin_clear_level_override fn=- pol=- view=- cron=-
## CALLERS admin_edit_package_price fn=- pol=- view=- cron=-
## CALLERS admin_end_package_price fn=- pol=- view=- cron=-
## CALLERS admin_job_health fn=- pol=- view=- cron=-
## CALLERS admin_job_resume fn=- pol=- view=- cron=-
## CALLERS admin_list_ai_calls fn=- pol=- view=- cron=-
## CALLERS admin_list_monetisation fn=- pol=- view=- cron=-
## CALLERS admin_save_level_override fn=- pol=- view=- cron=-
## CALLERS admin_save_listing_package fn=- pol=- view=- cron=-
## CALLERS admin_save_market_settings fn=- pol=- view=- cron=-
## CALLERS admin_save_package_price fn=- pol=- view=- cron=-
## CALLERS admin_set_ai_feature fn=- pol=- view=- cron=-
## CALLERS admin_list_ai_calls_core fn=admin_list_ai_calls pol=- view=- cron=-
## CALLERS job_health_core fn=admin_job_health pol=- view=- cron=-
## CALLERS job_pause_clear fn=admin_job_resume pol=- view=- cron=-
## CALLERS package_price_for fn=- pol=- view=- cron=-
## CALLERS product_price_for fn=package_price_for,promote_options,set_listing_level,set_listing_reach pol=- view=- cron=-
## TRIG package_prices package_prices_updated_at:CREATE TRIGGER package_prices_updated_at BEFORE UPDATE ON public.package_prices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
## CON package_prices package_prices_amount_check:CHECK ((amount >= (0)::numeric)) ;; package_prices_category_id_fkey:FOREIGN KEY (category_id) REFERENCES categories(id) ;; package_prices_country_code_fkey:FOREIGN KEY (country_code) REFERENCES countries(code) ;; package_prices_created_by_fkey:FOREIGN KEY (created_by) REFERENCES profiles(user_id) ON DELETE SET NULL ;; package_prices_credit_cost_check:CHECK ((credit_cost >= 0)) ;; package_prices_currency_fkey:FOREIGN KEY (currency) REFERENCES currencies(code) ;; package_prices_package_key_fkey:FOREIGN KEY (package_key) REFERENCES listing_packages(key) ON UPDATE CASCADE ;; package_prices_updated_by_fkey:FOREIGN KEY (updated_by) REFERENCES profiles(user_id) ON DELETE SET NULL ;; package_prices_used_count_check:CHECK ((used_count >= 0)) ;; package_prices_window_check:CHECK (((valid_to IS NULL) OR (valid_to > valid_from)))
## COLS package_prices id:uuid:NO,package_key:text:NO,country_code:character:YES,category_id:uuid:YES,amount:numeric:NO,currency:character:NO,valid_from:timestamp with time zone:NO,valid_to:timestamp with time zone:YES,updated_by:uuid:YES,created_at:timestamp with time zone:NO,updated_at:timestamp with time zone:NO,credit_cost:integer:NO,used_count:integer:NO,created_by:uuid:YES
## TRIG listing_packages listing_packages_updated_at:CREATE TRIGGER listing_packages_updated_at BEFORE UPDATE ON public.listing_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column() ;; listing_packages_level_ranks:CREATE TRIGGER listing_packages_level_ranks AFTER INSERT OR DELETE OR UPDATE OF sort, key, kind ON public.listing_packages FOR EACH STATEMENT EXECUTE FUNCTION level_ranks_rebuild() ;; listing_packages_level_look:CREATE TRIGGER listing_packages_level_look AFTER UPDATE OF placement, badge, enabled ON public.listing_packages FOR EACH ROW WHEN (((new.kind = 'level'::text) AND (((old.placement IS DISTINCT FROM new.placement) OR (old.badge IS DISTINCT FROM new.badge)) OR (old.enabled IS DISTINCT FROM new.enabled)))) EXECUTE FUNCTION feed_index_level_look_requeue()
## CON listing_packages listing_packages_caps_by_kind_check:CHECK (((kind <> 'level'::text) OR ((max_cities IS NULL) AND (max_regions IS NULL) AND (max_countries IS NULL)))) ;; listing_packages_created_by_fkey:FOREIGN KEY (created_by) REFERENCES profiles(user_id) ON DELETE SET NULL ;; listing_packages_days_check:CHECK ((days > 0)) ;; listing_packages_key_check:CHECK ((key ~ '^[a-z][a-z0-9_]{1,31}$'::text)) ;; listing_packages_kind_check:CHECK ((kind = ANY (ARRAY['level'::text, 'reach'::text]))) ;; listing_packages_max_cities_check:CHECK (((max_cities IS NULL) OR (max_cities >= 1))) ;; listing_packages_max_countries_check:CHECK (((max_countries IS NULL) OR (max_countries >= 1))) ;; listing_packages_max_photos_check:CHECK (((max_photos IS NULL) OR ((max_photos >= 0) AND (max_photos <= 30)))) ;; listing_packages_max_regions_check:CHECK (((max_regions IS NULL) OR (max_regions >= 1))) ;; listing_packages_perks_by_kind_check:CHECK (
CASE
    WHEN (kind = 'level'::text) THEN ((max_photos IS NOT NULL) AND (placement IS NOT NULL))
    ELSE ((max_photos IS NULL) AND (placement IS NULL) AND (NOT badge))
END) ;; listing_packages_placement_check:CHECK (((placement IS NULL) OR (placement = ANY (ARRAY['standard'::text, 'boost'::text, 'top'::text])))) ;; listing_packages_updated_by_fkey:FOREIGN KEY (updated_by) REFERENCES profiles(user_id) ON DELETE SET NULL
## COLS listing_packages key:text:NO,days:integer:NO,enabled:boolean:NO,self_serve:boolean:NO,extends_lifetime:boolean:NO,sort:integer:NO,updated_by:uuid:YES,created_at:timestamp with time zone:NO,updated_at:timestamp with time zone:NO,kind:text:NO,name_en:text:NO,name_am:text:YES,max_photos:smallint:YES,placement:text:YES,badge:boolean:NO,created_by:uuid:YES,is_baseline:boolean:NO,max_cities:integer:YES,max_regions:integer:YES,max_countries:integer:YES
## TRIG level_overrides level_overrides_updated_at:CREATE TRIGGER level_overrides_updated_at BEFORE UPDATE ON public.level_overrides FOR EACH ROW EXECUTE FUNCTION update_updated_at_column() ;; level_overrides_level_look:CREATE TRIGGER level_overrides_level_look AFTER INSERT OR DELETE OR UPDATE ON public.level_overrides FOR EACH ROW EXECUTE FUNCTION feed_index_level_override_requeue()
## CON level_overrides level_overrides_category_id_fkey:FOREIGN KEY (category_id) REFERENCES categories(id) ;; level_overrides_country_code_fkey:FOREIGN KEY (country_code) REFERENCES countries(code) ;; level_overrides_created_by_fkey:FOREIGN KEY (created_by) REFERENCES profiles(user_id) ON DELETE SET NULL ;; level_overrides_days_check:CHECK (((days IS NULL) OR (days > 0))) ;; level_overrides_level_key_fkey:FOREIGN KEY (level_key) REFERENCES listing_packages(key) ON UPDATE CASCADE ;; level_overrides_max_photos_check:CHECK (((max_photos IS NULL) OR ((max_photos >= 0) AND (max_photos <= 30)))) ;; level_overrides_one_cell_check:CHECK (((days IS NOT NULL) OR (max_photos IS NOT NULL) OR (placement IS NOT NULL) OR (badge IS NOT NULL))) ;; level_overrides_placement_check:CHECK (((placement IS NULL) OR (placement = ANY (ARRAY['standard'::text, 'boost'::text, 'top'::text])))) ;; level_overrides_scope_unique:UNIQUE NULLS NOT DISTINCT (level_key, category_id, country_code) ;; level_overrides_updated_by_fkey:FOREIGN KEY (updated_by) REFERENCES profiles(user_id) ON DELETE SET NULL
## COLS level_overrides id:uuid:NO,level_key:text:NO,category_id:uuid:YES,country_code:character:YES,days:integer:YES,max_photos:smallint:YES,placement:text:YES,badge:boolean:YES,created_by:uuid:YES,updated_by:uuid:YES,created_at:timestamp with time zone:NO,updated_at:timestamp with time zone:NO
## TRIG market_settings market_settings_updated_at:CREATE TRIGGER market_settings_updated_at BEFORE UPDATE ON public.market_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
## CON market_settings market_settings_country_code_fkey:FOREIGN KEY (country_code) REFERENCES countries(code) ;; market_settings_created_by_fkey:FOREIGN KEY (created_by) REFERENCES profiles(user_id) ON DELETE SET NULL ;; market_settings_free_regular_ads_check:CHECK ((free_regular_ads >= 0)) ;; market_settings_included_reach_fkey:FOREIGN KEY (included_reach) REFERENCES listing_packages(key) ON UPDATE CASCADE ;; market_settings_launch_check:CHECK (((NOT paid_levels) OR ((launch_credits IS NOT NULL) AND (launch_days IS NOT NULL)))) ;; market_settings_launch_credits_check:CHECK (((launch_credits IS NULL) OR (launch_credits > 0))) ;; market_settings_launch_days_check:CHECK (((launch_days IS NULL) OR (launch_days > 0))) ;; market_settings_scope_unique:UNIQUE NULLS NOT DISTINCT (country_code) ;; market_settings_since_check:CHECK ((paid_levels = (paid_levels_since IS NOT NULL))) ;; market_settings_updated_by_fkey:FOREIGN KEY (updated_by) REFERENCES profiles(user_id) ON DELETE SET NULL
## COLS market_settings id:uuid:NO,country_code:character:YES,free_regular_ads:integer:NO,included_reach:text:NO,paid_levels:boolean:NO,paid_levels_since:timestamp with time zone:YES,launch_credits:integer:YES,launch_days:integer:YES,created_by:uuid:YES,updated_by:uuid:YES,created_at:timestamp with time zone:NO,updated_at:timestamp with time zone:NO
## TRIG ai_features -
## CON ai_features ai_features_alert_level_check:CHECK ((alert_level = ANY (ARRAY[0, 80, 100]))) ;; ai_features_budget_check:CHECK (((monthly_budget_cents >= 0) AND (monthly_budget_cents <= 100000000))) ;; ai_features_feature_check:CHECK (((feature = ANY (ARRAY['photo_screen'::text, 'writing_helper'::text, 'name_check'::text, 'category_images'::text, 'category_icons'::text, 'translations'::text, 'background_removal'::text])) OR (feature ~ '^e2e-[a-z0-9-]{1,40}$'::text))) ;; ai_features_off_check:CHECK (((enabled AND (off_reason IS NULL) AND (off_at IS NULL)) OR ((NOT enabled) AND (off_reason IS NOT NULL) AND (off_at IS NOT NULL)))) ;; ai_features_off_reason_check:CHECK ((off_reason = ANY (ARRAY['staff'::text, 'budget'::text]))) ;; ai_features_unit_check:CHECK ((unit = ANY (ARRAY['call'::text, 'character'::text]))) ;; ai_features_unit_cost_check:CHECK (((unit_cost_microusd >= 0) AND (unit_cost_microusd <= 10000000))) ;; ai_features_updated_by_fkey:FOREIGN KEY (updated_by) REFERENCES auth.users(id) ON DELETE SET NULL
## COLS ai_features feature:text:NO,enabled:boolean:NO,off_reason:text:YES,off_at:timestamp with time zone:YES,monthly_budget_cents:integer:YES,unit:text:NO,unit_cost_microusd:integer:NO,alert_month:date:YES,alert_level:smallint:NO,updated_at:timestamp with time zone:NO,updated_by:uuid:YES
## TRIG ai_spend_days -
## CON ai_spend_days ai_spend_days_calls_check:CHECK ((calls >= 0)) ;; ai_spend_days_units_check:CHECK ((units >= 0)) ;; ai_spend_days_cost_check:CHECK ((cost_microusd >= 0)) ;; ai_spend_days_feature_fkey:FOREIGN KEY (feature) REFERENCES ai_features(feature) ON DELETE CASCADE
## COLS ai_spend_days feature:text:NO,day:date:NO,calls:integer:NO,units:bigint:NO,cost_microusd:bigint:NO
## TRIG job_pauses -
## CON job_pauses job_pauses_job_check:CHECK ((job = 'name-check-catchup'::text)) ;; job_pauses_reason_check:CHECK ((reason = ANY (ARRAY['credits'::text, 'policy'::text, 'rate_limit'::text])))
## COLS job_pauses job:text:NO,reason:text:NO,since:timestamp with time zone:NO
## TRIG audit_log audit_log_append_only:CREATE TRIGGER audit_log_append_only BEFORE DELETE OR UPDATE ON public.audit_log FOR EACH ROW EXECUTE FUNCTION audit_log_append_only()
## CON audit_log -
## COLS audit_log id:uuid:NO,actor_id:uuid:YES,action:text:NO,entity_type:text:NO,entity_id:text:YES,meta:jsonb:NO,created_at:timestamp with time zone:NO
## TRIG door_refusals door_refusals_updated_at:CREATE TRIGGER door_refusals_updated_at BEFORE UPDATE ON public.door_refusals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()
## CON door_refusals door_refusals_count_check:CHECK ((count >= 0))
## COLS door_refusals door:text:NO,code:text:NO,day:date:NO,count:integer:NO,created_at:timestamp with time zone:NO,updated_at:timestamp with time zone:NO
## TRIG rate_limits -
## CON rate_limits -
## COLS rate_limits key:text:NO,action:text:NO,window_start:timestamp with time zone:NO,count:integer:NO
## DIAL {"action":"staff_config","max_count":600,"window_seconds":3600}
## PERMS packages:update:true,packages:view:false,profiles:create:true,profiles:delete:true,profiles:manage:false,profiles:update:true,profiles:view:false,services:manage:true,services:view:false
## USER_ROLES CHECK ((scope_type = ANY (ARRAY['global'::text, 'country'::text])))
## MON_KEYS prices,markets,products,overrides
## JOB_KEYS job,last,paused,dispatched_unclaimed
## COST list_monetisation_ms=0.21 job_health_ms=0.18 (SQLSTATE P0001)
````

### Appendix B — the static last declarations (census.txt) and the callers by name (callers.txt)

````text
admin_ai_features() | manifest:16 | supabase/migrations/20261013184636_ddaa7759-f545-43eb-bf25-27d41c04fab9.sql:204 | literal | returns=jsonb | vol=s | definer=true | roles=authenticated,service_role | md5=fe97165ba126161e6ec01d124724ee9f | crlf=false | bytes=1868 | calls-browser=has_permission | calls-closed=-
admin_ai_spend_days(integer) | manifest:17 | supabase/migrations/20261014103719_ff659d97-f576-4881-95e7-01290b58c825.sql:18 | literal | returns=jsonb | vol=s | definer=true | roles=authenticated,service_role | md5=a8b2161a8b86fecb9e62942cb07d842d | crlf=false | bytes=785 | calls-browser=has_permission | calls-closed=-
admin_clear_level_override(uuid) | manifest:25 | supabase/migrations/20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql:373 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=b36a2428334919371725ffe3d28df066 | crlf=false | bytes=988 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | manifest:38 | supabase/migrations/20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql:175 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=17b4f48616e93109f6602d1ac81986e5 | crlf=false | bytes=3064 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_end_package_price(uuid,timestamp with time zone) | manifest:39 | supabase/migrations/20261102081700_ac5b1435-aeda-47be-a0a0-30c39b54bb97.sql:139 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=4e2cfdd4d137f0f724ec1c1899e0a5ab | crlf=false | bytes=2014 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_job_health(text) | manifest:52 | supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql:45 | literal | returns=jsonb | vol=s | definer=true | roles=authenticated,service_role | md5=0093fdc7f97b8e264b99055012d2cdd2 | crlf=false | bytes=170 | calls-browser=has_permission | calls-closed=job_health_core
admin_job_resume(text) | manifest:53 | supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql:59 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=53ae69f7bb64a21ce0b73a9972b2b1fe | crlf=false | bytes=821 | calls-browser=has_permission | calls-closed=job_pause_clear,log_audit,require_step_up_if_needed
admin_list_ai_calls(text,text,timestamp with time zone,uuid,integer) | manifest:59 | supabase/migrations/20261029044433_175bb84e-0bb9-4d2e-aa3c-40dd1045d387.sql:37 | literal | returns=jsonb | vol=s | definer=true | roles=authenticated,service_role | md5=1f18e0da99886c6d81f7c07171bd7007 | crlf=false | bytes=966 | calls-browser=has_permission | calls-closed=admin_list_ai_calls_core
admin_list_monetisation() | manifest:72 | supabase/migrations/20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql:142 | literal | returns=jsonb | vol=s | definer=true | roles=authenticated,service_role | md5=6af21e1705a12f7dd9f23e5f7abc87fc | crlf=false | bytes=2030 | calls-browser=has_permission | calls-closed=-
admin_save_level_override(text,uuid,character,integer,smallint,text,boolean) | manifest:106 | supabase/migrations/20261103040805_1fc03fef-6725-4f22-93c0-7b86ef13246a.sql:297 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=3e9f4bbf42a4962c7697d90d70ab79b1 | crlf=false | bytes=3045 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb) | manifest:107 | supabase/migrations/20261109044934_b2f1fad4-455f-48bd-b1ce-15aa1048a75f.sql:33 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=61aa36df2245ba685201bb0dc33e28ca | crlf=false | bytes=5410 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_save_market_settings(integer,text,boolean,character,integer,integer) | manifest:108 | supabase/migrations/20261103040807_0cdc612d-5dd2-4bf0-a0da-78f8131a70cf.sql:71 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=099dd961a52251a050eb2aafa2521bcd | crlf=false | bytes=2995 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_save_package_price(text,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | manifest:109 | supabase/migrations/20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql:103 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=aff779cf3d659dae0aeddc57e8b782ca | crlf=false | bytes=2799 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_set_ai_feature(text,boolean,integer,integer) | manifest:113 | supabase/migrations/20261029015441_88c7da1c-4a03-4af4-8551-0b105ecb73a0.sql:15 | literal | returns=jsonb | vol=v | definer=true | roles=authenticated,service_role | md5=91bdeb81c03d4a00d7d07362324f175e | crlf=false | bytes=3282 | calls-browser=has_permission | calls-closed=rate_gate,require_step_up_if_needed
admin_list_ai_calls_core(text,text,timestamp with time zone,uuid,integer,boolean,boolean) | manifest:- | supabase/migrations/20261029044433_175bb84e-0bb9-4d2e-aa3c-40dd1045d387.sql:6 | literal | returns=jsonb | vol=s | definer=false | roles= | md5=cb54d805e3f37a28d2ba02a7cd29eba4 | crlf=false | bytes=1312 | calls-browser=- | calls-closed=-
job_health_core(text,uuid) | manifest:- | supabase/migrations/20261029110745_2a2066ed-e6fe-4216-9de0-aab433a869cd.sql:10 | literal | returns=jsonb | vol=s | definer=false | roles=service_role | md5=48dd2264b7ace8513cb1500fcd964f82 | crlf=false | bytes=1162 | calls-browser=- | calls-closed=-
job_pause_clear(text) | manifest:- | supabase/migrations/20261029073342_cba46fd4-8476-4450-8253-ec69daedcf2b.sql:110 | literal | returns=boolean | vol=v | definer=true | roles=service_role | md5=2a506869adee38ddf964e4449ea5d3ec | crlf=false | bytes=136 | calls-browser=- | calls-closed=-
package_price_for(uuid,text) | manifest:237 | supabase/migrations/20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql:85 | literal | returns=jsonb | vol=s | definer=false | roles=anon,authenticated,service_role | md5=68a7d7e26e100bbb55eacbde14c3c04e | crlf=false | bytes=201 | calls-browser=product_price_for | calls-closed=-
product_price_for(text,uuid,character) | manifest:240 | supabase/migrations/20261103040806_3f552dc1-73ac-4377-a5ea-c01e1725dfea.sql:35 | literal | returns=jsonb | vol=s | definer=false | roles=anon,authenticated,service_role | md5=4b6f682fd38679c23091ad077e0bba43 | crlf=false | bytes=1464 | calls-browser=- | calls-closed=-

== admin_clear_level_override (10)
scripts/public-surface-allowlist.txt:169:level_overrides | anon,authenticated | Turn P-1b M-a (D295, D308): a level's perks for a main category and/or a country; browser roles read every column except created_by and upda…
scripts/public-surface-allowlist.txt:172:admin_clear_level_override | authenticated | Turn P-1b M-a: staff clear a per-category row (the level's own values apply again); packages:update with a fresh second factor and the…
docs/features/plans.md:117:| `admin_clear_level_override(id)`                                                                                                                                                               …
scripts/doors/manifest.txt:25:admin_clear_level_override(uuid) | staff | authenticated | packages:update | row | staff_config | manual | global | staff | - | census F1-1: no country argument or country-bearing target row…
scripts/acceptance-doors-allowlist.txt:124:admin_clear_level_override(uuid) | staff | Deletes one level_overrides row, writes audit_log; rejects callers lacking packages:update (then step-up) before its mutations
src/features/admin-monetisation/monetisation-service.test.ts:43:    "admin_clear_level_override",
src/features/admin-monetisation/monetisation-service.test.ts:275:      name: "admin_clear_level_override",
src/features/admin-monetisation/monetisation-service.ts:33: * `admin_clear_level_override`, `admin_save_package_price`,
src/features/admin-monetisation/monetisation-service.ts:168:  const { error } = await rpc("admin_clear_level_override", { p_id: id });
src/features/admin-monetisation/monetisation-service.ts:268:  // admin_save_level_override / admin_clear_level_override
== admin_edit_package_price (9)
scripts/public-surface-allowlist.txt:174:admin_edit_package_price | authenticated | Turn P-1b M-b (D288): staff edit a price row until its first use (used_count > 0 refuses); packages:update with a fresh second factor an…
docs/features/plans.md:119:| `admin_edit_package_price(id, amount, currency, credit_cost, country?, category?, from?, to?)` — while `used_count = 0` and live; a NULL `from` keeps the stored start                         …
scripts/doors/manifest.txt:38:admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | staff | authenticated | packages:update | row | staff_config | man…
scripts/acceptance-doors-allowlist.txt:122:admin_edit_package_price(uuid,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | staff | Writes package_prices (an unused, live row), …
src/features/admin-monetisation/monetisation-service.test.ts:47:    "admin_edit_package_price",
src/features/admin-monetisation/monetisation-service.test.ts:302:      name: "admin_edit_package_price",
src/features/admin-monetisation/monetisation-service.ts:34: * `admin_edit_package_price`, `admin_end_package_price` and
src/features/admin-monetisation/monetisation-service.ts:209:  const { error } = await rpc("admin_edit_package_price", { p_id: id, ...priceArgs(input) });
src/features/admin-monetisation/monetisation-service.ts:274:  // admin_save_package_price / admin_edit_package_price / admin_end_package_price
== admin_end_package_price (10)
docs/features/packages.md:97:| End price (red) | `packages-price-end` (a day; today = now)      | `admin_end_package_price`    | `packages:update` |
docs/features/doors.md:53:acceptance | codes | reason`. F1-3 corrected one cell's column name: `admin_end_package_price`
scripts/public-surface-allowlist.txt:168:admin_end_package_price | authenticated | Turn P-1: staff end a price row (valid_to; history stays); packages:update with a fresh second factor and the staff_config dial checked i…
docs/features/plans.md:120:| `admin_end_package_price(id, to?)`                                                                                                                                                             …
scripts/doors/manifest.txt:39:admin_end_package_price(uuid,timestamp with time zone) | staff | authenticated | packages:update | row | staff_config | manual | row:package_prices.country_code | staff | - | -
scripts/acceptance-doors-allowlist.txt:121:admin_end_package_price(uuid,timestamp with time zone) | staff | Writes package_prices (valid_to only), audit_log; rejects callers lacking packages:update (then step-up) before …
src/features/admin-monetisation/monetisation-service.test.ts:313:      name: "admin_end_package_price",
src/features/admin-monetisation/monetisation-service.ts:34: * `admin_edit_package_price`, `admin_end_package_price` and
src/features/admin-monetisation/monetisation-service.ts:214:  const { error } = await rpc("admin_end_package_price", {
src/features/admin-monetisation/monetisation-service.ts:274:  // admin_save_package_price / admin_edit_package_price / admin_end_package_price
== admin_job_resume (8)
docs/features/hidden-seller-name.md:59:**The seller-name re-check** (`src/features/admin-screening/job-line.tsx`, services:view, `admin_job_health`). One line: the last run's outcome and time; "The site did not answer" f…
scripts/public-surface-allowlist.txt:150:admin_job_resume | authenticated | Foundations turn N1b-3 M3 (INC-977): staff resume a paused job; services:manage then step-up inside before the capture; no pause writes nothing;…
scripts/doors/manifest.txt:53:admin_job_resume(text) | staff | authenticated | services:manage | row | staff_config | job.resumed | global | staff | - | census F1-1: no country argument or country-bearing target row read…
scripts/acceptance-doors-allowlist.txt:118:admin_job_resume(text) | staff | Deletes job_pauses (through job_pause_clear) and writes audit_log; rejects callers lacking services:manage (then step-up) before its capture and…
src/features/admin-screening/use-name-checks.ts:19: *   admin_job_resume        services:manage → step-up → the pause FOR UPDATE;
src/features/admin-screening/use-name-checks.ts:254:  const { data, error } = await rpc("admin_job_resume", { p_job: NAME_JOB });
src/features/admin-screening/use-name-checks.ts:259:  throw new ReaderError({ class: "malformed", message: "admin_job_resume: out of shape" });
src/features/admin-screening/job-line.tsx:20: * (admin_job_resume, under the page's second factor); "Not set up yet" before
== admin_save_level_override (10)
docs/features/plans.md:116:| `admin_save_level_override(level, category?, country?, days?, max_photos?, placement?, badge?)`                                                                                                …
scripts/public-surface-allowlist.txt:169:level_overrides | anon,authenticated | Turn P-1b M-a (D295, D308): a level's perks for a main category and/or a country; browser roles read every column except created_by and upda…
scripts/public-surface-allowlist.txt:171:admin_save_level_override | authenticated | Turn P-1b M-a: staff set a level's perks for a main category and/or a country (upsert on the scope); packages:update with a fresh secon…
scripts/doors/manifest.txt:106:admin_save_level_override(text,uuid,character,integer,smallint,text,boolean) | staff | authenticated | packages:update | row | staff_config | manual | arg:country_code | staff | - | -
scripts/acceptance-doors-allowlist.txt:123:admin_save_level_override(text,uuid,character,integer,smallint,text,boolean) | staff | Writes level_overrides, audit_log; rejects callers lacking packages:update (then step-up) …
src/features/admin-monetisation/monetisation-service.ts:32: * `admin_save_listing_package`, `admin_save_level_override`,
src/features/admin-monetisation/monetisation-service.ts:155:  const { error } = await rpc("admin_save_level_override", {
src/features/admin-monetisation/monetisation-service.ts:268:  // admin_save_level_override / admin_clear_level_override
src/features/admin-monetisation/monetisation-service.test.ts:42:    "admin_save_level_override",
src/features/admin-monetisation/monetisation-service.test.ts:265:      name: "admin_save_level_override",
== admin_save_listing_package (14)
docs/features/packages.md:94:| Add package     | `packages-create` (key, tier, days, on, …)     | `admin_save_listing_package` | `packages:update` |
docs/features/packages.md:95:| the row's Edit  | `packages-editor` (the key shown, never typed) | `admin_save_listing_package` | `packages:update` |
scripts/public-surface-allowlist.txt:163:listing_packages | anon,authenticated | Turn P-1 (D279, D280), restated by P-1b M-a for the levels' shape (kind, name_en, name_am, max_photos, placement, badge) and by P-2 M-1a fo…
scripts/public-surface-allowlist.txt:166:admin_save_listing_package | authenticated | Turn P-1, a new argument list in P-1b M-a (kind, names, perks) and in P-2 (c) M-3c-b (a reach row's caps, p_caps): staff create or edi…
docs/features/plans.md:115:| `admin_save_listing_package(key, kind, name_en, days, enabled, self_serve, extends, name_am?, max_photos?, placement?, badge?, sort?, caps?)` — `caps` a reach row's `{max_cities, max_regions,…
scripts/acceptance-doors-allowlist.txt:119:admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb) | staff | Writes listing_packages, audit_log (P-1b: kind, nam…
scripts/doors/manifest.txt:107:admin_save_listing_package(text,text,text,integer,boolean,boolean,boolean,text,smallint,text,boolean,integer,jsonb) | staff | authenticated | packages:update | row | staff_config | manual |…
e2e/admin-monetisation.spec.ts:580:        await pageDoor(page, "admin_save_listing_package", {
e2e/admin-monetisation.spec.ts:804:        await pageDoor(page, "admin_save_listing_package", {
src/features/admin-monetisation/monetisation-service.test.ts:39:    "admin_save_listing_package",
src/features/admin-monetisation/monetisation-service.test.ts:213:      name: "admin_save_listing_package",
src/features/admin-monetisation/monetisation-service.ts:32: * `admin_save_listing_package`, `admin_save_level_override`,
src/features/admin-monetisation/monetisation-service.ts:113:  const { error } = await rpc("admin_save_listing_package", {
src/features/admin-monetisation/monetisation-service.ts:257:  // admin_save_listing_package
== admin_save_market_settings (12)
scripts/public-surface-allowlist.txt:175:market_settings | anon,authenticated | Turn P-1b M-c (D300, D305, D310): the free baseline and the paid-levels switch per country (NULL = every other country); browser roles read …
scripts/public-surface-allowlist.txt:176:admin_save_market_settings | authenticated | Turn P-1b M-c: staff set a country's free Regular ads, included reach and paid-levels switch with its launch bundle (upsert on the sco…
docs/features/plans.md:121:| `admin_save_market_settings(free_regular_ads, included_reach, paid_levels, country?, launch_credits?, launch_days?)`                                                                           …
scripts/doors/manifest.txt:108:admin_save_market_settings(integer,text,boolean,character,integer,integer) | staff | authenticated | packages:update | row | staff_config | manual | arg:country_code | staff | - | -
scripts/acceptance-doors-allowlist.txt:125:admin_save_market_settings(integer,text,boolean,character,integer,integer) | staff | Writes market_settings, audit_log; rejects callers lacking packages:update (then step-up) be…
e2e/admin-monetisation.spec.ts:623:        await pageDoor(page, "admin_save_market_settings", {
e2e/admin-monetisation.spec.ts:1243:        await pageDoor(page, "admin_save_market_settings", {
src/features/admin-monetisation/monetisation-service.test.ts:50:    "admin_save_market_settings",
src/features/admin-monetisation/monetisation-service.test.ts:325:      name: "admin_save_market_settings",
src/features/admin-monetisation/monetisation-service.ts:35: * `admin_save_market_settings`.
src/features/admin-monetisation/monetisation-service.ts:233:  const { error } = await rpc("admin_save_market_settings", {
src/features/admin-monetisation/monetisation-service.ts:285:  // admin_save_market_settings
== admin_save_package_price (10)
docs/features/packages.md:96:| Add price       | `packages-price-create`                        | `admin_save_package_price`   | `packages:update` |
scripts/public-surface-allowlist.txt:167:admin_save_package_price | authenticated | Turn P-1, a new argument list in P-1b M-b (credit_cost): staff add a price row (insert only; overlapping windows refused under the produ…
docs/features/plans.md:118:| `admin_save_package_price(product, amount, currency, credit_cost, country?, category?, from?, to?)`                                                                                            …
scripts/doors/manifest.txt:109:admin_save_package_price(text,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | staff | authenticated | packages:update | row | staff_config | ma…
scripts/acceptance-doors-allowlist.txt:120:admin_save_package_price(text,numeric,character,integer,character,uuid,timestamp with time zone,timestamp with time zone) | staff | Writes package_prices, audit_log (P-1b: credi…
src/features/admin-monetisation/monetisation-service.test.ts:46:    "admin_save_package_price",
src/features/admin-monetisation/monetisation-service.test.ts:290:      name: "admin_save_package_price",
src/features/admin-monetisation/monetisation-service.ts:33: * `admin_clear_level_override`, `admin_save_package_price`,
src/features/admin-monetisation/monetisation-service.ts:200:  const { error } = await rpc("admin_save_package_price", {
src/features/admin-monetisation/monetisation-service.ts:274:  // admin_save_package_price / admin_edit_package_price / admin_end_package_price
== admin_set_ai_feature (12)
docs/features/ai-services.md:36:- `admin_set_ai_feature(feature, enabled, budget_cents, unit_cost_microusd)` — `services:manage` and a fresh second factor. Refuses `overBudget` (switching on a feature whose month's spend…
docs/features/ai-services.md:137:- **At its monthly budget** photo screening switches itself off like every other feature (`ai_record_spend`), and staff cannot switch it on again past its budget (`admin_set_ai_feature`: …
scripts/public-surface-allowlist.txt:63:admin_set_ai_feature | authenticated | admin door, bundle 13 turn 1 (D158): services:manage and a fresh second factor checked inside; switches an AI feature on or off and sets its …
scripts/acceptance-doors-allowlist.txt:48:admin_set_ai_feature(text,boolean,integer,integer) | staff | Writes ai_features, audit_log; rejects callers lacking services:manage before its mutations
scripts/doors/manifest.txt:113:admin_set_ai_feature(text,boolean,integer,integer) | staff | authenticated | services:manage | row | staff_config | manual | global | staff | - | census F1-1: no country argument or country…
e2e/admin-services.spec.ts:130:    const set = await pageDoor(page, "admin_set_ai_feature", {
e2e/admin-services.spec.ts:172:          await pageDoor(page, "admin_set_ai_feature", {
e2e/admin-services.spec.ts:186:      const off = await pageDoor(page, "admin_set_ai_feature", {
e2e/admin-services.spec.ts:200:      const on = await pageDoor(page, "admin_set_ai_feature", {
src/features/admin-ai/ai-service.ts:11: * door `admin_set_ai_feature(feature, enabled, budget_cents, unit_cost)`
src/features/admin-ai/ai-service.ts:245:  const { error } = await supabase.rpc("admin_set_ai_feature", {
src/features/admin-ai/ai-service.ts:291:/** The door's ceilings (admin_set_ai_feature), mirrored so the form refuses first (F3). */
== admin_ai_features (11)
docs/features/ai-services.md:35:- `admin_ai_features()` — `services:view`. Every feature with its state, budget, unit and price, and this month's spend, calls and units, today's calls and the month's alert level.
docs/features/ai-services.md:80:- **One read, one table** (src/features/admin-ai/ai-page.tsx, the coverage console's convention, on the agreed blocks of D118 / D128 — the header, the toolbar with a search and Columns, th…
scripts/public-surface-allowlist.txt:62:admin_ai_features | authenticated | admin door, bundle 13 turn 1 (D158): services:view checked inside; reads every AI feature's switch, budget, price and this month's spend; read o…
scripts/doors/manifest.txt:16:admin_ai_features() | staff-reader | authenticated | services:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row read by name; global is the s…
e2e/admin-services.spec.ts:124:    const list = await pageDoor(page, "admin_ai_features", {});
e2e/admin-services.spec.ts:162:      const list = await pageDoor(page, "admin_ai_features", {});
src/features/admin-ai/ai-service.ts:10: * The READ is the door `admin_ai_features()` (`services:view`), the WRITE the
src/features/admin-ai/ai-service.ts:152:  if (!Array.isArray(payload)) throw new Error("admin_ai_features: not a list");
src/features/admin-ai/ai-service.ts:154:  if (rows.some((row) => row === null)) throw new Error("admin_ai_features: a row out of shape");
src/features/admin-ai/ai-service.ts:165:  const { data, error } = await supabase.rpc("admin_ai_features");
src/features/admin-ai/ai-page.tsx:46: * of D118 / D128): the rows of `admin_ai_features` (seven since bundle 13 turn
== admin_ai_spend_days (13)
docs/features/ai-services.md:132:- **Spend by day** sits under the table: the last 30 UTC days, newest first, for every feature together or one (a picker), the days with no call left out, and the total of the days shown.…
scripts/public-surface-allowlist.txt:71:admin_ai_spend_days | authenticated | admin door, bundle 13 turn 14: services:view checked inside; reads each AI feature's calls and cost per UTC day for the last 1 to 92 days, scr…
scripts/doors/manifest.txt:17:admin_ai_spend_days(integer) | staff-reader | authenticated | services:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row read by name; global…
e2e/admin-services.spec.ts:127:    const days = await pageDoor(page, "admin_ai_spend_days", { p_days: 30 });
e2e/admin-services.spec.ts:333:    const answer = await pageDoor(page, "admin_ai_spend_days", { p_days: 30 });
e2e/admin-services.spec.ts:356:      const refused = await pageDoor(page, "admin_ai_spend_days", { p_days: days });
src/features/admin-ai/ai-service.ts:175:/** One feature's spend on one UTC day, as `admin_ai_spend_days` answers it. */
src/features/admin-ai/ai-service.ts:189:  if (!Array.isArray(payload)) throw new Error("admin_ai_spend_days: not a list");
src/features/admin-ai/ai-service.ts:196:      throw new Error("admin_ai_spend_days: a row out of shape");
src/features/admin-ai/ai-service.ts:199:      throw new Error("admin_ai_spend_days: a row out of shape");
src/features/admin-ai/ai-service.ts:202:      throw new Error("admin_ai_spend_days: a row out of shape");
src/features/admin-ai/ai-service.ts:210:  const { data, error } = await supabase.rpc("admin_ai_spend_days", { p_days: days });
src/features/admin-ai/ai-spend-days.tsx:23: * One read (`admin_ai_spend_days`, services:view, the last 30 UTC days): every
== admin_job_health (7)
docs/features/hidden-seller-name.md:59:**The seller-name re-check** (`src/features/admin-screening/job-line.tsx`, services:view, `admin_job_health`). One line: the last run's outcome and time; "The site did not answer" f…
scripts/public-surface-allowlist.txt:149:admin_job_health | authenticated | Foundations turn N1b-3 M3 (INC-977): a scheduled job's last run, unanswered dispatch and pause for staff; services:view checked inside before an…
scripts/doors/manifest.txt:52:admin_job_health(text) | staff-reader | authenticated | services:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row read by name; global is th…
src/features/admin-screening/use-name-checks.ts:18: *   admin_job_health        services:view; the job's newest run and its pause
src/features/admin-screening/use-name-checks.ts:197:    new ReaderError({ class: "malformed", message: "admin_job_health: answer out of shape" });
src/features/admin-screening/use-name-checks.ts:237:  const { data, error } = await rpc("admin_job_health", { p_job: NAME_JOB });
src/features/admin-screening/job-line.tsx:17: * Screening for staff with services:view (admin_job_health). It says the last
== admin_list_ai_calls (7)
docs/features/ai-gateway.md:55:`admin_list_ai_calls(p_feature, p_outcome, p_before_at, p_before_id, p_limit)` gates authentication then `services:view`, validates the paired cursor and the 1–100 limit, and invokes the pr…
scripts/public-surface-allowlist.txt:145:admin_list_ai_calls | authenticated | Foundations turn A2: services:view checked before validation/read; 90-day keyset page, no hashes or actor IDs; profiles:view controls names; …
scripts/doors/manifest.txt:59:admin_list_ai_calls(text,text,timestamp with time zone,uuid,integer) | staff-reader | authenticated | services:view | - | - | - | global | - | - | census F1-1: no country argument or country…
e2e/admin-ai-calls.spec.ts:15:    client.rpc<{ rows: { id: string; feature: string }[]; next: unknown }>("admin_list_ai_calls", {
e2e/admin-ai-calls.spec.ts:38:      "admin_list_ai_calls",
src/features/admin-ai/ai-service.ts:350:    new ReaderError({ class: "malformed", message: "admin_list_ai_calls: answer out of shape" });
src/features/admin-ai/ai-service.ts:403:  const { data, error } = await supabase.rpc("admin_list_ai_calls", {
== admin_list_monetisation (23)
scripts/conformance/package-price.test.ts:13: * price rows (`admin_list_monetisation` through the monetisation service); no
scripts/conformance/package-price.test.ts:63:export const console = (rpc: (n: string) => unknown) => rpc("admin_list_monetisation");
scripts/conformance/package-price.test.ts:85:  return rpc("admin_list_monetisation");
scripts/public-surface-allowlist.txt:163:listing_packages | anon,authenticated | Turn P-1 (D279, D280), restated by P-1b M-a for the levels' shape (kind, name_en, name_am, max_photos, placement, badge) and by P-2 M-1a fo…
scripts/public-surface-allowlist.txt:177:admin_list_monetisation | authenticated | Turn P-1b M-c (D289): the staff reader of the Monetisation console — markets, products, overrides and prices with created_by_name / updat…
scripts/conformance/package-price-allowlist.txt:1:# P-1 (scripts/conformance/package-price.test.ts, CF-PRICE-1): a read of package_prices, a call of product_price_for / package_price_for or of the admin_list_monetisation…
docs/features/plans.md:107:`admin_list_monetisation()` (`{markets, products, overrides, prices}` with
docs/features/plans.md:140:door, `admin_list_monetisation`, the doors, `DOOR_MESSAGE_KEYS`),
docs/features/plans.md:219:  console rpc `admin_list_monetisation`; a file that handles prices never puts
scripts/doors/manifest.txt:72:admin_list_monetisation() | staff-reader | authenticated | packages:view | - | - | - | global | - | - | census F1-1: no country argument or country-bearing target row read by name; global is…
scripts/conformance/package-price.ts:17: *    `admin_list_monetisation` rpc anywhere but the one admin reader
scripts/conformance/listing-levels.test.ts:76:  return rpc("admin_list_monetisation");
scripts/conformance/listing-levels.ts:21: *    lists the console's rows through `admin_list_monetisation` and picks none);
e2e/admin-monetisation.spec.ts:591:    expect((await pageDoor(page, "admin_list_monetisation", {})).error).toBe("denied");
e2e/admin-monetisation.spec.ts:1389:      const console = await client.rpc("admin_list_monetisation");
src/features/admin-monetisation/monetisation-page.tsx:28: * ONE READ (`admin_list_monetisation`) feeds the strip and every block; one
src/features/admin-monetisation/monetisation-service.test.ts:51:    "admin_list_monetisation",
src/features/admin-monetisation/monetisation-service.test.ts:135:    expect(door.calls).toEqual([{ name: "admin_list_monetisation", args: undefined }]);
src/features/admin-monetisation/monetisation-service.ts:23: * `admin_list_monetisation()` (M-c) answers `{markets, products, overrides,
src/features/admin-monetisation/monetisation-service.ts:58:  const { data, error } = await rpc("admin_list_monetisation");
src/features/admin-monetisation/monetisation-service.ts:60:  const answer = rowOf(data, "admin_list_monetisation");
src/features/admin-monetisation/monetisation-order.ts:9: * (`admin_list_monetisation`), never a second one. Three steps in the ruled
src/features/admin-monetisation/monetisation-rows.ts:4: * P-1b — the console's rows as `admin_list_monetisation()` answers them (jsonb),
== admin_list_ai_calls_core (0)

== job_health_core (0)

== job_pause_clear (4)
scripts/acceptance-doors-allowlist.txt:118:admin_job_resume(text) | staff | Deletes job_pauses (through job_pause_clear) and writes audit_log; rejects callers lacking services:manage (then step-up) before its capture and…
e2e/name-check-queue.spec.ts:23: * the service door job_pause_set and removed in afterEach through job_pause_clear.
e2e/name-check-queue.spec.ts:56:        const cleared = await adminClient().rpc("job_pause_clear", { p_job: JOB });
e2e/name-check-queue.spec.ts:57:        if (cleared.error) throw new Error(`[e2e:ncq] job_pause_clear: ${cleared.error.message}`);
== package_price_for (15)
docs/features/packages.md:44:### The one resolver — `package_price_for(listing_id, package_key)`
docs/features/packages.md:138:  `package_price_for`; a file that handles package prices never puts `amount`
scripts/conformance/package-price.test.ts:12: * (and its wrapper `package_price_for`) in SQL and the one admin reader of the
scripts/conformance/package-price.test.ts:61:export const call = (rpc: (n: string) => unknown) => rpc("package_price_for");
scripts/conformance/package-price.test.ts:114:// the resolver is package_price_for; a screen never reads package_prices
scripts/public-surface-allowlist.txt:165:package_price_for | anon,authenticated | Turn P-1 (CF-PRICE-1), redeclared by P-1b M-b over product_price_for: the listing wrapper of a product's price for an ad; SECURITY INVOKER…
docs/features/plans.md:63:`package_price_for` under its new name (the most specific valid row wins; none →
docs/features/plans.md:218:  reads `package_prices`, calls `product_price_for` / `package_price_for` or the
scripts/conformance/package-price-allowlist.txt:1:# P-1 (scripts/conformance/package-price.test.ts, CF-PRICE-1): a read of package_prices, a call of product_price_for / package_price_for or of the admin_list_monetisation…
scripts/conformance/package-price.ts:10: * its listing wrapper `package_price_for(listing, package)`); the browser never
scripts/conformance/package-price.ts:16: *    `package_price_for` / `product_price_for` call, or the staff console's
scripts/conformance/package-price.ts:21: *    `package_prices`, `package_price_for`, `product_price_for`, `PriceRow` or
scripts/conformance/package-price.ts:53:  /package_prices|package_price_for|product_price_for|\bPriceRow\b|monetisation-service/;
scripts/doors/check-doors-allowlist.txt:6:grant-without-caller package_price_for(uuid,text) | census F1-1: a monetisation reader no code names (scripts/conformance/package-price.ts reads its SQL, not the door); family F1…
scripts/doors/manifest.txt:237:package_price_for(uuid,text) | public-reader | anon,authenticated | - | - | - | - | - | - | - | -
== product_price_for (14)
docs/features/packages.md:10:> `product_price_for`. What follows is P-1's record.
scripts/public-surface-allowlist.txt:165:package_price_for | anon,authenticated | Turn P-1 (CF-PRICE-1), redeclared by P-1b M-b over product_price_for: the listing wrapper of a product's price for an ad; SECURITY INVOKER…
scripts/public-surface-allowlist.txt:173:product_price_for | anon,authenticated | Turn P-1b M-b (CF-PRICE-1): the core resolver of a product's price and credit cost for a category chain and a market; SECURITY INVOKER ove…
scripts/conformance/package-price.test.ts:11: * P-1 (CF-PRICE-1), extended by P-1b — one price resolver: `product_price_for`
scripts/conformance/package-price.test.ts:62:export const core = (rpc: (n: string) => unknown) => rpc("product_price_for");
scripts/conformance/package-price-allowlist.txt:1:# P-1 (scripts/conformance/package-price.test.ts, CF-PRICE-1): a read of package_prices, a call of product_price_for / package_price_for or of the admin_list_monetisation…
docs/features/plans.md:62:overlap. The resolver `product_price_for(listing_id, product_key)` is P-1's
docs/features/plans.md:218:  reads `package_prices`, calls `product_price_for` / `package_price_for` or the
scripts/conformance/package-price.ts:9: * is only ever the SQL core `product_price_for(product, category, market)` (or
scripts/conformance/package-price.ts:16: *    `package_price_for` / `product_price_for` call, or the staff console's
scripts/conformance/package-price.ts:21: *    `package_prices`, `package_price_for`, `product_price_for`, `PriceRow` or
scripts/conformance/package-price.ts:53:  /package_prices|package_price_for|product_price_for|\bPriceRow\b|monetisation-service/;
scripts/doors/manifest.txt:240:product_price_for(text,uuid,character) | public-reader | anon,authenticated | - | - | - | - | - | - | - | -
src/features/admin-monetisation/monetisation-service.ts:28: * `product_price_for`, its perks only ever `level_perks_for`.
````

### Appendix C — every folded sentence by rg -F (stems.txt)

````text
== rg -n -F 'not signed in' src e2e scripts (15)
e2e/admin-monetisation.spec.ts:1391:        /denied|not signed in|permission denied/,
src/server/route.test.ts:53:      return routeJson({ error: "not signed in" }, 401);
src/server/supabase/upstream.test.ts:136:  it("UP-3 an auth server that does not answer is 'upstream' (503), a refused bearer stays 'not signed in' (401)", async () => {
src/server/supabase/user-client.ts:36: * "not signed in": the route answers 503 and the client tries again.
src/server/supabase/user-client.ts:221: * wording of "not signed in" is written once.
src/server/supabase/user-client.ts:233:  // Turn S3 — a deactivated account: refused, not "not signed in"; nothing is logged (no incident, no secret).
src/server/supabase/user-client.ts:236:    console.error(`[ssr-error] ${path} not signed in ${errorText(answer.message)}`);
src/server/supabase/user-client.ts:239:    { error: answer.reason === "missingBearer" ? "missing bearer token" : "not signed in" },
src/features/posting/posting-service.ts:35:/** The bearer the routes demand; absent means "not signed in" and the route 401s. */
src/features/admin-categories/category-images-service.ts:51:  if (answer.kind === "signedOut") throw new CategoryImageError("not signed in", 401, "model-call");
src/features/admin-monetisation/monetisation-service.ts:253:  "not signed in": "admin.packages.error.denied",
src/features/admin/translations/translations-service.test.ts:119:    await expect(translate()).rejects.toThrow("not signed in");
src/features/admin/translations/translations-service.test.ts:120:    await expect(listProviderLanguages()).rejects.toThrow("not signed in");
src/features/admin/translations/translations-service.ts:552:  if (answer.kind === "signedOut") throw new Error("not signed in");
src/features/admin/translations/translations-service.ts:623:  if (answer.kind === "signedOut") throw new Error("not signed in");
== rg -n -F 'not authenticated' src e2e scripts (5)
e2e/auth-caller-gates.spec.ts:259:      /only a super admin|not your listing|not authenticated|illegal transition/,
e2e/ad-page-doors.spec.ts:442:    expect(refused.error).toMatch(/permission denied|not authenticated/);
src/lib/reader-failure.ts:25:    /JWT|not authenticated/i.test(message)
src/features/seller/seller-review.test.ts:23:      error: { message: "not authenticated", code: "P0001", details: "", hint: "" },
src/features/auth/deactivated.test.ts:31:    expect(isDeactivatedRefusal("not authenticated")).toBe(false);
== rg -n -F 'permission denied' src e2e scripts (43)
e2e/legal-doors.spec.ts:796:    expect(refused.error, "record_legal_notice is service-only").toContain("permission denied");
e2e/legal-doors.spec.ts:1277:      "permission denied",
e2e/ad-page-doors.spec.ts:176:    expect(unsigned.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:442:    expect(refused.error).toMatch(/permission denied|not authenticated/);
e2e/ad-page-doors.spec.ts:728:      expect(answer.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:732:    expect(savedList.error).toContain("permission denied");
e2e/ad-page-doors.spec.ts:848:      ).toContain("permission denied");
e2e/ad-page-doors.spec.ts:936:      expect(insert.error).toContain("permission denied");
e2e/auth-caller-gates.spec.ts:257:    expect(error?.message, fn).toContain("permission denied for function");
e2e/my-listings-levels.spec.ts:411:    expect(JSON.stringify(anonymous.body), "anonymous").toMatch(/notSignedIn|permission denied/);
src/lib/refusal-tail.test.ts:68:    expect(doorKeyText("permission denied", translate)).toBeNull();
src/routes/api/translate.route.test.ts:331:      ["permission denied", "writerFailed"],
e2e/admin-services.spec.ts:125:    expect(list.error).toBe("permission denied");
e2e/admin-services.spec.ts:128:    expect(days.error).toBe("permission denied");
e2e/admin-services.spec.ts:136:    expect(set.error).toBe("permission denied");
e2e/admin-services.spec.ts:140:    expect(gate.error ?? "").toContain("permission denied");
e2e/admin-services.spec.ts:145:    expect(spend.error ?? "").toContain("permission denied");
e2e/admin-services.spec.ts:149:      expect(read.error ?? "", `${table} read`).toContain("permission denied");
e2e/admin-monetisation.spec.ts:590:    ).toBe("permission denied");
e2e/admin-monetisation.spec.ts:629:    ).toBe("permission denied");
e2e/admin-monetisation.spec.ts:1391:        /denied|not signed in|permission denied/,
src/lib/supabase-door.test.ts:143:      json({ code: "42501", message: "permission denied", details: "d", hint: "h" }, 403),
src/lib/supabase-door.test.ts:148:      error: { code: "42501", message: "permission denied", details: "d", hint: "h" },
scripts/deny-tests/phase1-identity.md:121:    "message": "permission denied for table profiles",
scripts/deny-tests/phase1-identity.md:170:    "message": "permission denied for table user_directory",
scripts/deny-tests/phase1-identity.md:191:    "message": "permission denied for function confirm_home_country"
src/server/imports/csv.test.ts:66:    expect(exportRefusal({ message: "permission denied" }, "unknown country scope")).toBeNull();
src/features/admin-screening/name-checks.test.tsx:57:      error: new Error("permission denied"),
src/server/imports/route.test.ts:297:    // F1-4b — the seven rows that read `permission denied`, `import already running`,
src/server/imports/route.test.ts:303:      "permission denied",
src/features/admin-ai/ai-service.ts:439:  if (/permission denied/i.test(raw)) return { key: "admin.ai.error.denied", raw: null };
src/features/admin-ai/ai-service.test.ts:158:    expect(aiErrorKey("permission denied")).toEqual({ key: "admin.ai.error.denied", raw: null });
src/features/admin-monetisation/monetisation-service.ts:254:  "permission denied": "admin.packages.error.denied",
src/features/admin-ai/ai-spend-days.test.tsx:79:    read.error = new Error("permission denied");
src/features/admin/translations/export-all.test.ts:114:    const reader = vi.fn(async () => ({ data: null, error: new Error("permission denied") }));
src/features/admin/translations/export-all.test.ts:115:    await expect(fetchAllTranslationRows("zxx-mo", reader)).rejects.toThrow("permission denied");
src/features/admin/translations/history-drawer.test.tsx:92:    listRevisions.mockRejectedValue(new Error("permission denied"));
src/features/admin/legal/legal-service.test.ts:245:  expect(legalRefusalKey({ message: "permission denied" })).toBe("admin.legal.error.generic");
src/features/admin/translations/pseudo-generate.test.tsx:126:      if (key === "a.first") throw new Error("permission denied");
src/features/admin/translations/pseudo-generate.test.tsx:164:    mocks.write.mockRejectedValue(new Error("permission denied"));
src/features/levels/levels-store.test.ts:166:    tableAnswers.push({ data: null, error: { message: "permission denied", code: "42501" } });
src/features/levels/levels-store.test.ts:172:    expect(logged).toHaveBeenCalledWith("[levels] the level rows read failed", "permission denied");
src/features/admin-listings/tier-dialog.test.tsx:188:    tableAnswers.push({ data: null, error: { message: "permission denied", code: "42501" } });
== rg -n -F '"denied"' src e2e scripts (9)
src/routes/admin.tsx:23: * Gate semantics: REDIRECT, never a dead-end "denied" page. Law F3 — this is
e2e/admin-attributes-library.spec.ts:839:            p_name_en: "denied",
e2e/admin-attributes-editor.spec.ts:412:        p_name_en: "denied",
e2e/ad-page-doors.spec.ts:292:        p_rate_key: rateKey("denied"),
e2e/admin-monetisation.spec.ts:591:    expect((await pageDoor(page, "admin_list_monetisation", {})).error).toBe("denied");
src/features/admin-monetisation/monetisation-service.test.ts:185:    door.rpc = rpcError("denied", "P0001");
src/features/ad-page/share-ad.test.tsx:84:    writeText.mockRejectedValue(new Error("denied"));
src/features/admin/import-dialog.test.tsx:127:    ["denied", 403, "planHasRefusals", "error.denied"],
src/providers/theme-provider.test.ts:23:        if (storageThrows) throw new Error("denied");
== rg -n -F ''denied'' src e2e scripts (0)

== rg -n -F 'rateLimited' src e2e scripts (269)
e2e/photo-pipeline.spec.ts:445:    expect(reasons(answer.payload)).toEqual([{ field: "rate", reason: "rateLimited" }]);
src/routes/l.$slug.tsx:39:    if (answer.kind === "rate") console.error("[ssr-error] /l rateLimited");
src/routes/l.$slug.tsx:141:  const [saveRefusal, setSaveRefusal] = useState<"rateLimited" | "failed" | null>(null);
src/routes/l.$slug.tsx:167:        else setSaveRefusal(answer.reason === "rateLimited" ? "rateLimited" : "failed");
e2e/posting-routes-dials.spec.ts:21: * naming `rateLimited` (no return type changes). Each test lowers that dial for its OWN leased seller through
e2e/posting-routes-dials.spec.ts:37:/** The refusal of the `revise` dial: the door's exception names rateLimited. */
e2e/posting-routes-dials.spec.ts:39:  return answer.error !== null && answer.error.includes("rateLimited");
src/routes/api/media/photo-links.test.ts:101:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
src/routes/api/media/photo-links.ts:74:    if (!rate.allowed) return refusal("rate", "rateLimited", rate.resetsAt ?? undefined);
src/routes/api/upload/photo.test.ts:194:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
e2e/viewing-place.spec.ts:184:    expect(await refusedPlace(own, c.subCity.id)).toBe("rateLimited");
src/routes/api/attributes.$id.options.ts:20:  readonly code = "rateLimited";
src/routes/api/attributes.$id.options.ts:44:          if (error.message.includes("rateLimited")) throw new OptionsRefusal();
e2e/posting-routes.spec.ts:551:        const rate = reasonsOf(answer.payload).find((entry) => entry.reason === "rateLimited");
e2e/posting-routes.spec.ts:563:      expect(entry["reason"]).toBe("rateLimited");
e2e/posting-routes.spec.ts:564:      // INC-1170: the gate's rateLimited names no reset time until F1-7; it restores the detail assertion here.
e2e/posting-routes.spec.ts:1311:      const refusal = refusals.find((entry) => entry["reason"] === "rateLimited");
scripts/conformance/error-text-allowlist.txt:7:src/features/admin-listings/listings-page.tsx | :291 maps a refusal's own message to the words shown (moveErrorKey; an empty message …
e2e/post-wizard-bundle2.spec.ts:1140:        body: JSON.stringify({ ok: false, refusals: [{ field: "rate", reason: "rateLimited" }] }),
e2e/fixtures.ts:144: * (429, `rateLimited`): step 1 shows the name matches and its notice, as nearly
e2e/fixtures.ts:164:      body: JSON.stringify({ error: "rateLimited" }),
src/routes/api/translate.ts:140:              "rateLimited",
e2e/post-wizard-place.spec.ts:1540:      expect(refusal?.reason, "PW-41: the refusal used another word").toBe("rateLimited");
e2e/posting-routes-identity.spec.ts:94:      reason: "rateLimited",
e2e/helpers/rate-window.ts:48: * Sends once; any answer but a 429 `rateLimited` returns at once. On that
e2e/helpers/rate-window.ts:57:  const refused = (value: T) => value.status === 429 && value.payload["error"] === "rateLimited";
src/routes/api/catalog.find.ts:14: * `^[a-z]{2,3}$`); a bad shape is 400 `bad query`, a spent dial 429 `rateLimited`.
src/routes/api/catalog.find.ts:27:  if (answer === null) return clientError("rateLimited", 429);
src/routes/api/catalog.find.test.ts:49:it("CFR-4 a null search is 429 rateLimited", async () => {
src/routes/api/catalog.find.test.ts:53:  expect(await response.json()).toEqual({ error: "rateLimited" });
e2e/post-wizard-specs.spec.ts:380:          body: JSON.stringify({ ok: false, reason: "rateLimited" }),
e2e/post-wizard-specs.spec.ts:399:      `[data-testid="post-attr-options-error"][data-attr="${spec.select.attrKey}"][data-reason="rateLimited"]`,
e2e/post-wizard-specs.spec.ts:401:    await expect(line).toHaveText(en["post.specs.rateLimited"]);
src/routes/api/geo/search.test.ts:63:it("GSR-2 a spent dial is rateLimited with resetsAt and no outbound call", async () => {
src/routes/api/geo/search.test.ts:68:    refusals: [{ field: "geocode", reason: "rateLimited", detail: SPENT.resetsAt }],
e2e/import-security.spec.ts:834:          expect(answer.payload["error"]).toBe("rateLimited");
src/routes/api/geo/outline.ts:76:        { field: "geocode", reason: "rateLimited", detail: error.resetsAt ?? undefined },
src/routes/api/geo/search.ts:29: *     request. A spent dial is `rateLimited` in the door's own vocabulary (F4).
scripts/fixtures/e2e-results-flaky-stdout.json:103:                      "text": "[client-error] HTTP 429 POST /api/listings/identity ({\"ok\":false,\"refusals\":[{\"field\":\"rate…
src/routes/api/geo/outline.test.ts:87:it("GOL-4 a spent dial is rateLimited, no outbound call, nothing cached", async () => {
src/routes/api/geo/outline.test.ts:91:    refusals: [{ field: "geocode", reason: "rateLimited", detail: SPENT.resetsAt }],
e2e/ad-page-doors.spec.ts:549:    expect(sixth.data).toMatchObject({ ok: false, reason: "rateLimited" });
e2e/ad-page-doors.spec.ts:752:      expect(repeat.error).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:756:      expect(third.error).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:855:      expect(limited.error).toBe("rateLimited");
e2e/ad-page-doors.spec.ts:860:      expect(duplicate.error).toBe("rateLimited");
src/routes/api/listings/photos.test.ts:117:      refusals: [{ field: "photos", reason: "rateLimited", detail: "2026-10-24T12:00:00Z" }],
src/routes/api/listings/photos.test.ts:154:      ["rateLimited", 429],
src/routes/api/listings/alias.ts:18: * (the dial's `rateLimited` included) reaches the client as its code, through `doorCall`.
src/routes/api/listings/background.ts:94:      refused = refusal("rate", "rateLimited", daily.resetsAt ?? undefined);
src/routes/api/listings/assist.test.ts:175:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T12:00:00Z" }],
src/routes/api/translate.route.test.ts:268:      body: { error: "rateLimited" },
src/routes/api/translate.route.test.ts:330:      ["rateLimited", "writerFailed"],
src/routes/api/listings/alias.test.ts:123:        ["rateLimited", 429],
src/lib/refusal.ts:19: *    such as a rate gate's `rateLimited` included: the consoles' shared words
src/routes/api/attributes.options.test.ts:98:it("ATO-6 rateLimited is not cached", async () => {
src/routes/api/attributes.options.test.ts:102:    error: name === "get_attribute_options" ? { message: "rateLimited" } : null,
src/routes/api/attributes.options.test.ts:108:    expect(await response.json()).toEqual({ error: "rateLimited" });
src/routes/api/attributes.options.test.ts:114:it("ATO-7 the shell's refusals: attributeNotFound is a 404, rateLimited a 429 that is not cached, any other code a read failure", asyn…
src/routes/api/attributes.options.test.ts:126:  refuse("rateLimited", 429);
src/routes/api/attributes.options.test.ts:129:  expect(await limited.json()).toEqual({ error: "rateLimited" });
src/server/supabase/user-client.ts:370:      if (rest["reason"] !== "rateLimited") return entry;
src/routes/api/listings/identity.test.ts:188:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-25T00:00:00Z" }],
src/routes/api/listings/identity.test.ts:271:   * route (through doorCall) keeps its code as the reason. The gate's `rateLimited` names no
src/routes/api/listings/identity.test.ts:277:      ["rateLimited", 429],
src/routes/api/publish.test.ts:111:      ["rateLimited", 429],
src/routes/api/listings/draft.test.ts:163:      "rateLimited",
src/routes/api/listings/draft.test.ts:176:      ["rateLimited", 429],
src/routes/api/listings/identity.ts:148:        { field: "rate", reason: "rateLimited", detail: rate.resetsAt ?? undefined },
src/routes/api/listings/identity.ts:202:  // F1-5a — the door is on the shell: a refusal (the gate's `rateLimited` included, which names
src/routes/api/listings/draft.ts:98: * `doorCall`'s (`doorRefusal`), which keeps a door's code (`rateLimited`,
src/server/door.test.ts:50:    for (const code of ["notReady:photos", "rateLimited", "notYourListing", "other"]) {
src/server/imports/route.ts:71:  "rateLimited",
src/server/imports/route.ts:100:  rateLimited: 429,
src/server/imports/route.ts:251:          "rateLimited",
src/features/admin/translations/translations-service.test.ts:103:  it("TRS-6 the press dial's 429 shows admin.translations.ai.rateLimited, with no detail line", async () => {
src/features/admin/translations/translations-service.test.ts:104:    route.answer = answered(429, { error: "rateLimited" });
src/features/admin/translations/translations-service.test.ts:108:    expect(translationRefusalKey(failure)).toBe("admin.translations.ai.rateLimited");
src/features/admin/translations/translations-service.test.ts:110:    // An import's own rateLimited refusal keeps its file key.
src/features/admin/translations/translations-service.test.ts:111:    expect(translationRefusalKey(new Error("rateLimited"))).toBe(
src/features/admin/translations/translations-service.test.ts:195:      ["rateLimited", "admin.translations.error.fileTooMany"],
src/server/imports/csv.test.ts:71:    expect(exportRefusal({ message: "rateLimited" }, scope)).toBeNull();
src/features/admin-attributes/attribute-refusals.ts:18:    rateLimited: RATE_LIMITED_KEY,
src/lib/door-error.test.ts:20:    expect(doorRefusal("rateLimited")).toEqual({ field: "door", reason: "rateLimited" });
src/server/imports/route.test.ts:259:  it("IMR-6 a spent dial on preview answers 429 rateLimited with no RPC; commit metering follows budgetModes", async () => {
src/server/imports/route.test.ts:264:    expect(await limited.json()).toEqual({ error: "rateLimited" });
src/server/imports/route.test.ts:350:        envelope("rateLimited", "2026-11-14T15:00:00+00:00"),
src/server/imports/route.test.ts:352:        { error: "rateLimited", detail: "2026-11-14T15:00:00+00:00" },
src/server/imports/route.test.ts:600:        expect(await second.json()).toEqual({ error: "rateLimited" });
src/server/imports/route.test.ts:622:        expect(await second.json()).toEqual({ error: "rateLimited" });
src/features/admin-locations/location-refusals.ts:21:    rateLimited: RATE_LIMITED_KEY,
src/features/admin-attributes/attribute-refusals.test.tsx:23:      ["rateLimited", "admin.error.rateLimited"],
src/server/route.test.ts:406:      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T11:00:00Z" }],
src/server/route.test.ts:438:      error: "rateLimited",
src/lib/reader-failure.ts:32:              /^(?:rateLimited|notYours|notYourListing|permissionDenied|accountDeactivated|acceptancePending|legalAcceptancePending|stepUpRequired|notI…
src/features/posting/refusal-text.ts:46:  rateLimited: "post.refusal.rateLimited",
src/features/posting/refusal-text.ts:123:  rateLimited: "post.photo.refusal.rateLimited",
src/features/posting/refusal-text.ts:176: * F1-5a — A REFUSAL THAT IS THE DIAL'S: a door's error (the shell's `rateLimited`, or the
src/features/posting/refusal-text.ts:181:  return readRefusal(refusal, DRAFT_REFUSALS).key === DRAFT_REASONS["rateLimited"];
src/lib/reader-failure.test.ts:18:    expect(readerFailure({ code: "P0001", message: "rateLimited" }).class).toBe("refused"));
src/features/admin-locations/location-refusals.test.tsx:58:      [...IDS, "permissionDenied", "rateLimited", "required", "badType"].sort(),
src/features/admin-locations/location-refusals.test.tsx:72:    expect(readRefusal(refused("rateLimited"), LOCATION_REFUSALS).key).toBe(
src/features/admin-locations/location-refusals.test.tsx:73:      "admin.error.rateLimited",
src/server/door.ts:47:    // Ruling 4 (F1-5a) — a door's own machine code (`notYourListing`, `rateLimited`,
src/features/admin/translations/translations-service.ts:435:    rateLimited: FILE_TOO_MANY,
src/features/admin/translations/translations-service.ts:436:    [MACHINE_TRANSLATE_RATE_LIMITED]: "admin.translations.ai.rateLimited",
src/features/posting/photo-background.test.ts:54:    expect(backgroundRefusalKey("rateLimited:2026-10-15T00:00:00Z")).toBe(
src/features/posting/photo-background.test.ts:55:      "post.photo.refusal.rateLimited",
src/features/admin/legal/legal-service.test.ts:247:  for (const code of ["permissionDenied", "notSignedIn", "rateLimited", "unknownVersion"])
src/server/route.ts:67:   * (`{field, reason: reason ?? "rateLimited", detail: resetsAt}`) instead of
src/server/route.ts:252:                  reason: entry.refuseAs.verdict.reason ?? "rateLimited",
src/server/route.ts:258:              "rateLimited",
src/features/posting/step-specifications-last-answer.test.tsx:32:    rateLimited: false,
src/features/admin-screening/use-screening.ts:346:  | { ok: false; reason: "notShown" | "rateLimited" };
src/features/admin-screening/use-screening.ts:349:export function revealProblemKey(reason: "notShown" | "rateLimited") {
src/features/admin-screening/use-screening.ts:350:  return reason === "rateLimited"
src/features/admin-screening/use-screening.ts:357:  words: { rateLimited: "admin.screening.revealLimited" },
src/features/admin-screening/use-screening.ts:370:    // INC-1170: the gate raises the dial's refusal as the code `rateLimited` (no reset time
src/features/admin-screening/use-screening.ts:372:    if (readRefusal(error, REVEAL_REFUSALS).key === revealProblemKey("rateLimited")) {
src/features/admin-screening/use-screening.ts:373:      return { ok: false, reason: "rateLimited" };
src/features/admin-screening/use-screening.ts:381:  if (payload["reason"] === "notShown" || payload["reason"] === "rateLimited") {
src/lib/refusal.test.ts:19:  "admin.error.rateLimited",
src/lib/refusal.test.ts:60:      { kind: "answered", status: 429, ok: false, payload: null, error: "rateLimited", detail: "" },
src/lib/refusal.test.ts:63:    expect(coded).toMatchObject({ key: "admin.error.rateLimited", branch: "family" });
src/features/admin/legal/legal-service.ts:396: * `rateLimited` and the whole export fails, never a file cut short.
src/features/admin/users/admin-users-service.ts:243: * F1-2); unknownUser and rateLimited read as the generic. Two sentences remain: step-up stays
src/features/posting/preview/listing-detail.tsx:279:    refusal: "rateLimited" | "failed" | null;
src/features/posting/preview/listing-detail.tsx:794:                    view.save.refusal === "rateLimited"
src/features/posting/preview/listing-detail.tsx:795:                      ? "adPage.save.rateLimited"
src/features/posting/preview/listing-detail.tsx:1522:            : state.reason === "rateLimited"
src/features/posting/preview/listing-detail.tsx:1523:              ? t("adPage.contact.rateLimited")
src/features/admin-countries/country-refusals.ts:17:    rateLimited: RATE_LIMITED_KEY,
src/features/admin/users/alias-reason.test.ts:41:    ["rateLimited", "admin.users.edit.failed"],
src/features/legal/certify-refusal.test.ts:35:    expect(certifyRefusal("rateLimited", navigate, { pathname: "/", search: "" })).toBe(false);
src/features/posting/use-draft.test.tsx:166:    refusals: [{ field: "door", reason: "rateLimited", detail: "2099-01-01T00:00:00Z" }],
src/features/admin/roles/roles-service.ts:150: * words here (unknownRole, unknownPermission, roleReserved, rateLimited) reads
src/lib/door-codes.test.ts:45:      "rateLimited",
src/lib/door-codes.test.ts:90:    expect(doorCode("rateLimited:2026-11-06T10:00:00Z")).toEqual({
src/lib/door-codes.test.ts:91:      code: "rateLimited",
src/features/admin-screening/use-screening.test.ts:177:    expect(revealProblemKey("rateLimited")).toBe("admin.screening.revealLimited");
src/features/admin-screening/use-screening.test.ts:198:  it("SF-9 a raised rateLimited is the returned reason the screen words; any other refusal is thrown", async () => {
src/features/admin-screening/use-screening.test.ts:214:    doors.answer = { data: null, error: { message: "rateLimited" } };
src/features/admin-screening/use-screening.test.ts:217:      reason: "rateLimited",
src/features/admin/roles/roles-service.test.ts:29:      "rateLimited:2026-11-14T10:00:00Z",
src/features/posting/preview/listing-detail.test.tsx:297:        state: { kind: "refused", reason: "rateLimited" },
src/features/posting/preview/listing-detail.test.tsx:302:    en["adPage.contact.rateLimited"],
src/features/posting/preview/listing-detail.test.tsx:359:      save={{ ...save, viewer: "signedIn", busy: true, refusal: "rateLimited" }}
src/features/posting/preview/listing-detail.test.tsx:363:  expect(screen.getByRole("status")).toHaveTextContent(en["adPage.save.rateLimited"]);
src/features/legal/legal-accept-refusals.ts:7: * `emptyList`, `notApplicable`, the gate's `rateLimited`); the one the person can mend by
src/features/admin-countries/country-refusals.test.tsx:31:      [...IDS, "permissionDenied", "rateLimited", "required", "badType"].sort(),
src/features/admin-countries/country-refusals.test.tsx:42:    expect(readRefusal(refused("rateLimited"), COUNTRY_REFUSALS).key).toBe(
src/features/admin-countries/country-refusals.test.tsx:43:      "admin.error.rateLimited",
src/features/legal/legal-accept-refusals.test.ts:27:    "rateLimited",
src/features/posting/posting-service.ts:839: * `rateLimited` past it, as the shell's error (F1-5a); the details step says so in plain words
src/features/posting/posting-service.ts:845:): Promise<{ schema: PostingSchema | null; rateLimited: boolean }> {
src/features/posting/posting-service.ts:850:    const rateLimited = isRateRefusal(error);
src/features/posting/posting-service.ts:851:    if (!rateLimited) console.error("[posting] schema read failed:", error.message);
src/features/posting/posting-service.ts:852:    return { schema: null, rateLimited };
src/features/posting/posting-service.ts:854:  return { schema: shapePostingSchema(data), rateLimited: false };
src/features/posting/posting-service.ts:1146:function pinAnswer(message: string): "contactInNote" | "rateLimited" | "failed" {
src/features/posting/posting-service.ts:1149:  // M9b / INC-444 — the revise dial refuses by exception naming rateLimited.
src/features/posting/posting-service.ts:1150:  return message.includes("rateLimited") ? "rateLimited" : "failed";
src/features/posting/posting-service.ts:1243:): Promise<"saved" | "contactInNote" | "rateLimited" | "failed"> {
src/features/posting/step-where.tsx:155:type LineState = "idle" | "busy" | "saved" | "failed" | "long" | "contact" | "rateLimited";
src/features/posting/step-where.tsx:2129:          {(dirState === "failed" || dirState === "rateLimited") && (
src/features/posting/step-where.tsx:2136:                dirState === "rateLimited"
src/features/posting/step-where.tsx:2137:                  ? "post.refusal.rateLimited"
src/features/posting/step-where.tsx:2223:          {(noteState === "failed" || noteState === "rateLimited") && (
src/features/posting/step-where.tsx:2230:                noteState === "rateLimited"
src/features/posting/step-where.tsx:2231:                  ? "post.refusal.rateLimited"
src/features/admin-listings/edit-listing.test.ts:151:    expect(editErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
src/features/admin-monetisation/monetisation-service.ts:256:  rateLimited: "admin.packages.error.rateLimited",
src/features/my-listings/promote-service.ts:181:  rateLimited: "myListings.error.rateLimited",
src/features/admin-listings/listing-refusals.ts:24:  rateLimited: "admin.listings.move.error.rateLimited",
src/features/my-listings/my-listings-page.tsx:389:        if (outcome.key === "myListings.error.rateLimited") break;
src/features/posting/use-draft.ts:425:    const limited = answer.refusals.find((refusal) => refusal.reason === "rateLimited");
src/features/posting/attribute-options.ts:156: * route's 429 (rateLimited), so a control the seller opened can say so in
src/features/posting/attribute-options.ts:178:    // F4 — never silent: a refused read (429 = rateLimited) is logged.
src/features/admin-listings/tier-reasons.test.ts:114:    expect(tierErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
src/features/ad-page/save.ts:19:      // F1-5b — the shell's refusal is a code (`ownListing`, `rateLimited`, ...), read by the one reader.
src/features/my-listings/my-listing.ts:260:    rateLimited: "myListings.error.rateLimited",
src/features/my-listings/my-listing-edit.test.ts:93:      ["rateLimited", "myListings.error.rateLimited"],
src/features/my-listings/my-listing-edit.test.ts:117:      ["rateLimited", "myListings.error.rateLimited"],
src/features/my-listings/my-listing-edit.test.ts:170:    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
src/features/my-listings/my-listing-edit.test.ts:172:    expect(other).toEqual({ ok: false, key: "myListings.error.rateLimited" });
src/features/posting/step-specifications.tsx:97:  rateLimited?: boolean;
src/features/posting/step-specifications.tsx:173:  const [rateLimited, setRateLimited] = useState(false);
src/features/posting/step-specifications.tsx:244:      setRateLimited(read.rateLimited);
src/features/posting/step-specifications.tsx:288:            ? { state: "failed", list: [], rateLimited: limited }
src/features/posting/step-specifications.tsx:1194:            {t(rateLimited ? "post.specs.rateLimited" : "post.specs.loadFailed")}
src/features/posting/step-specifications.tsx:1207:        {t(rateLimited ? "post.specs.rateLimited" : "post.specs.loadFailed")}
src/features/posting/step-specifications.tsx:1754:                data-reason={held.rateLimited ? "rateLimited" : "failed"}
src/features/posting/step-specifications.tsx:1756:                {t(held.rateLimited ? "post.specs.rateLimited" : "post.specs.optionsFailed")}
src/features/admin-listings/listings-page.tsx:317:            if (doorCode(message).code === "rateLimited") break;
src/features/posting/posting-service.test.ts:325:      tables.doorAnswer = { data: null, error: { message: "rateLimited", code: "P0D01" } };
src/features/posting/posting-service.test.ts:326:      expect(await readPostingSchemaAnswer("cat-1")).toEqual({ schema: null, rateLimited: true });
src/features/posting/posting-service.test.ts:332:        "a sentence that names rateLimited",
src/features/posting/posting-service.test.ts:338:          rateLimited: false,
src/features/my-listings/my-listing.test.ts:131:      ["rateLimited", "myListings.error.rateLimited"],
src/features/ad-page/report.test.ts:29:  it.each(["alreadyReported", "rateLimited", "ownListing"])(
src/features/posting/refusal-text.test.ts:16:    expect(draftRefusalKey("rateLimited")).toBe("post.refusal.rateLimited");
src/features/posting/refusal-text.test.ts:19:    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
src/features/posting/refusal-text.test.ts:27:    expect(isRateRefusal("rateLimited")).toBe(true);
src/features/posting/refusal-text.test.ts:28:    expect(isRateRefusal({ message: "rateLimited", code: "P0D01" })).toBe(true);
src/features/posting/refusal-text.test.ts:29:    expect(isRateRefusal({ field: "door", reason: "rateLimited" })).toBe(true);
src/features/posting/refusal-text.test.ts:31:    expect(isRateRefusal({ message: "a sentence that names rateLimited" })).toBe(false);
src/features/admin-listings/move-reasons.test.ts:56:    expect(moveErrorKey("rateLimited")).toBe("admin.listings.move.error.rateLimited");
src/features/my-listings/promote-service.test.ts:156:      ["rateLimited", "myListings.error.rateLimited"],
src/features/ad-page/report-ad.test.tsx:52:  it.each(["sent", "already", "rateLimited", "failed", "ownListing"])(
src/features/ad-page/report-ad.test.tsx:95:          state === "rateLimited" || state === "failed",
src/features/ad-page/ad-page-refusals.test.ts:28:    ["rateLimited", "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:55:    ["rateLimited", "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:69:    ["rateLimited", "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:86:    [{ message: "rateLimited" }, "rateLimited"],
src/features/ad-page/ad-page-refusals.test.ts:91:    [{ ok: false, reason: "rateLimited", resets_at: "2026-11-18T00:00:00Z" }, "rateLimited"],
src/lib/door-error.ts:25: * own machine code (`tooManyPhotos:10`, `rateLimited`) keeps that code — the
src/features/posting/photo-refusal.test.ts:10:    expect(photoRefusalKey("rateLimited")).toBe("post.photo.refusal.rateLimited");
src/features/ad-page/contact.test.ts:61:      data: { ok: false, reason: "rateLimited", resets_at: "2026-11-18T00:00:00Z" },
src/features/ad-page/contact.test.ts:64:    expect(await revealContact("abc")).toEqual({ ok: false, reason: "rateLimited" });
src/features/ad-page/contact.test.ts:67:  it("reads the shell's codes as errors: listingNotAvailable and the gate's rateLimited", async () => {
src/features/ad-page/contact.test.ts:70:    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
src/features/ad-page/contact.test.ts:71:    expect(await revealContact("abc")).toEqual({ ok: false, reason: "rateLimited" });
src/lib/refusal-tail.ts:17: * `rateLimited` (rate_gate, INC-951). Every staff screen reads it as ONE shared
src/lib/refusal-tail.ts:18: * sentence; a screen with its own specific rateLimited key maps it before here.
src/lib/refusal-tail.ts:20:export const RATE_LIMITED_KEY = "admin.error.rateLimited" satisfies MessageKey;
src/lib/refusal-tail.ts:23:export const ADMIN_REFUSALS: RefusalFamily = { words: { rateLimited: RATE_LIMITED_KEY } };
src/lib/refusal-tail.ts:38:  const key = code === "rateLimited" ? RATE_LIMITED_KEY : code;
src/features/ad-page/save.test.ts:18:  it("SAVE-2 (SV-2) the shell's ownListing and rateLimited codes are read as errors", async () => {
src/features/ad-page/save.test.ts:19:    for (const reason of ["ownListing", "rateLimited"]) {
src/features/ad-page/save.test.ts:23:    rpc.mockResolvedValueOnce({ data: null, error: { message: "rateLimited" } });
src/features/ad-page/save.test.ts:24:    expect(await unsaveListing("abc")).toEqual({ ok: false, reason: "rateLimited" });
src/features/ad-page/save.test.ts:45:      { ok: false, reason: "rateLimited" },
src/features/posting/map/geocode.ts:20:export type GeoReason = "rateLimited" | "unavailable" | "signedOut" | null;
src/features/posting/map/geocode.ts:44:    return { payload, reason: first["reason"] === "rateLimited" ? "rateLimited" : "unavailable" };
src/features/posting/map/map-pin-dropper.tsx:71:  rateLimited: "post.pin.geocodeRateLimited",
src/features/ad-page/report-ad-dialog.tsx:41:  const [state, setState] = useState<"sent" | "already" | "rateLimited" | "failed" | null>(null);
src/features/ad-page/report-ad-dialog.tsx:73:                  : state === "rateLimited"
src/features/ad-page/report-ad-dialog.tsx:74:                    ? "adPage.report.rateLimited"
src/lib/error-text.test.ts:19:    expect(errorText({ code: "P0001", message: "rateLimited" })).toBe("rateLimited");
src/lib/door-codes.ts:28:  "rateLimited",
src/lib/route-client.test.ts:204:    fetchMock.mockResolvedValue(jsonAnswer({ error: "rateLimited", detail: "60" }, 429));
src/lib/route-client.test.ts:210:      payload: { error: "rateLimited", detail: "60" },
src/lib/route-client.test.ts:211:      error: "rateLimited",
src/features/ad-page/report.ts:32:      // F1-5b — the shell's refusal is a code (`alreadyReported`, `ownListing`, `rateLimited`, ...).
src/features/ad-page/contact.ts:35:  // `rateLimited`) arrive as an error whose message is the code; the body's own two ceilings
src/features/ad-page/contact.ts:36:  // (`sellersCapReached`, the new-account `rateLimited`) stay a returned answer (D3).
src/features/ad-page/ad-page-refusals.ts:5: * answers a refusal as `code[:detail]` (`ownListing`, `rateLimited`, ...); a code with
src/features/ad-page/ad-page-refusals.ts:11:  words: { rateLimited: "adPage.save.rateLimited" },
src/features/ad-page/ad-page-refusals.ts:17:    rateLimited: "adPage.report.rateLimited",
src/features/ad-page/ad-page-refusals.ts:23:/** The contact door's two returned ceilings (`sellersCapReached`, the new-account `rateLimited`) read here too. */
src/features/ad-page/ad-page-refusals.ts:26:    rateLimited: "adPage.contact.rateLimited",
src/features/ad-page/ad-page-refusals.ts:47: * `rateLimited` or a returned one. The ceiling a screen words as "try again tomorrow".
src/features/ad-page/ad-page-refusals.ts:49:function isRate(failure: unknown, family: RefusalFamily & { words: { rateLimited: string } }) {
src/features/ad-page/ad-page-refusals.ts:50:  return readRefusal(failure, family).key === family.words.rateLimited;
src/features/ad-page/ad-page-refusals.ts:53:export type SaveRefusal = "rateLimited" | "ownListing" | "listingNotAvailable" | "failed";
src/features/ad-page/ad-page-refusals.ts:59:  return isRate(failure, SAVE_REFUSALS) ? "rateLimited" : "failed";
src/features/ad-page/ad-page-refusals.ts:62:export type ReportRefusal = "alreadyReported" | "rateLimited" | "ownListing" | "failed";
src/features/ad-page/ad-page-refusals.ts:69:  return key === REPORT_REFUSALS.words.rateLimited ? "rateLimited" : "failed";
src/features/ad-page/ad-page-refusals.ts:74:  | "rateLimited"
src/features/ad-page/ad-page-refusals.ts:85:  return key === CONTACT_REFUSALS.words.rateLimited ? "rateLimited" : "failed";
src/features/admin-categories/use-image-failure.test.ts:19:    expect(line(new CategoryImageError("rateLimited", 429, "model-call"))).toBe(
src/features/admin-categories/use-image-failure.test.ts:20:      `admin.categories.error.imageFailed${stage("model-call")}: rateLimited`,
src/features/admin-categories/use-image-failure.test.ts:25:    expect(line(new CategoryImageError("rateLimited", 0, "persist"))).toBe(
src/features/admin-categories/use-image-failure.test.ts:26:      "admin.error.rateLimited",
src/features/admin-categories/category-refusals.ts:16:    rateLimited: RATE_LIMITED_KEY,
src/features/admin-categories/category-refusals.test.tsx:24:      ["rateLimited", "admin.error.rateLimited"],
src/features/admin-categories/category-dialogs.test.tsx:24:  it("CDR-1: a save refused by a rate gate shows the shared admin.error.rateLimited", () => {
src/features/admin-categories/category-dialogs.test.tsx:27:    act(() => result.current.fail({ message: "rateLimited", code: "P0D01" }));
src/features/admin-categories/category-dialogs.test.tsx:28:    expect(result.current.message).toBe("T(admin.error.rateLimited)");
== rg -n -F 'not found' src e2e scripts (96)
e2e/photo-pipeline.spec.ts:103:    // save already sent to land as "listing not found").
src/routes/seller-name.test.ts:21:  "SNAME-1 a name holding a path separator, or an escape that does not decode, is not found before any redirect (%s, INC-1117)",
src/routes/l.photo.test.ts:37:it("PHR-1 a bad id is 404 not found, with no dial, no rpc and no redirect", async () => {
src/routes/l.photo.test.ts:40:  expect(await response.text()).toBe("not found");
src/routes/l.photo.test.ts:69:  expect(await response.text()).toBe("not found");
e2e/helpers/countries.ts:136: * waited 20 s for the search box and their failures said only "not found"
e2e/helpers/users.ts:427:    throw new Error(`[e2e:users] role ${roleName} not found: ${roleError?.message ?? "no row"}`);
e2e/helpers/ui.ts:897:    throw new Error(`[e2e:pool] role super_admin not found: ${roleError?.message ?? "no row"}`);
e2e/helpers/posting.ts:2419: * "listing not found". So the page first waits for its network to go quiet (a
e2e/helpers/categories.ts:113: * the console had just created was not found by its search for 20 s, with no
e2e/admin-listings.spec.ts:1202:   * draft's address answers "not found".
e2e/admin-listings.spec.ts:1204:  test("AL-18 The listing's page with listings:view alone: no e-mail, no moves, a staff line without a name, drafts not found", async ({
e2e/my-listings-promote.spec.ts:87:  if (!data) throw new Error(`${TAG} listing ${listingId} not found`);
e2e/my-listings-page.spec.ts:65:  if (!data) throw new Error(`[e2e:mlp] listing ${listingId} not found`);
e2e/legal-history.spec.ts:160:  test("LGH-2 one version: frozen facts, the site's language, Back; a version not his is not found", async ({
scripts/conformance/shell-bands.test.ts:151:      else findings.push({ file: SHELL, line: 1, what: "the shell's band is not found (D256)" });
scripts/ci/laws-changed.ts:39:    throw new Error("ci.yml: Semgrep pins not found");
e2e/my-listings-ad.spec.ts:67:  if (!data) throw new Error(`[e2e:mla] listing ${listingId} not found`);
e2e/my-listings-ad.spec.ts:252:    if (!data) throw new Error(`[e2e:mla] listing ${listingId} not found`);
scripts/ci/prepare-local-backend.sh:115:if [ -z "$bootstrap_email" ] || [ -z "$bootstrap_id" ]; then echo "::error::the bootstrap account was not found in its landed migrations"; e…
e2e/category-image-routes.spec.ts:151:    expect((await response.json()) as { error: string }).toEqual({ error: "category not found" });
scripts/perf/lab.ts:213:      console.log(`[lab] ${name}: not found on the home page — skipped`);
e2e/feed-screens.spec.ts:359:  test("FS-5 an address nobody has shows not found and asks the feed nothing", async ({ page }) => {
e2e/my-listings-doors.spec.ts:96:  if (!data) throw new Error(`[e2e:ml] listing ${listingId} not found`);
e2e/admin-users.spec.ts:129: * same dump, not just AU-3's. A bare "element(s) not found" cannot distinguish
e2e/admin-users.spec.ts:221:    // but "element(s) not found". No budget or assertion change: on failure the
e2e/i18n-coverage.spec.ts:239:    if (error || !role) throw new Error(`[e2e:i18n] super_admin role not found`);
e2e/auth-signup.spec.ts:74: * bare "heading not found". Waits for whichever surface appears first, so a
scripts/fixtures/lane-smoke-step-failure.txt:14:- Teardown: not found
src/routes/api/admin/categories/generate-image.ts:46:  if (category === null) return clientError("category not found", 404);
e2e/ad-page.spec.ts:805:  test("AP-35 the seller card links to the seller's page; the page lists his live ads and pages them; an unknown key says not found", async ({
e2e/nightly/auth-resend-exhaustion.spec.ts:23: * bare "heading not found". Adds no tolerance — a clean run is unaffected.
e2e/my-listings-levels.spec.ts:94:  if (!data) throw new Error(`${TAG} listing ${listingId} not found`);
e2e/seller-name-hidden.spec.ts:27:  test("SPA-E2E-1 a held name: the ad shows the neutral label with no link, and /<name> is not found", async ({
e2e/seller-name-hidden.spec.ts:55:    // /<name>: not found, exactly as an unknown name — the same status and the same page.
e2e/global-setup.ts:325:    throw new Error(`[e2e:setup] role super_admin not found: ${roleError?.message ?? "no row"}`);
e2e/global-setup.ts:474:      `[e2e:setup] user ${userId} not found after create: ${readError ? authErrorText(readError) : "no user returned"}`,
src/routes/api/admin/categories/generate-image.test.ts:102:    expect(await response.json()).toEqual({ error: "category not found" });
e2e/legal-pages.spec.ts:210:  test("LGP-3 /legal/terms lands on /terms; /legal/not-a-kind is not found", async ({ page }) => {
e2e/legal-pages.spec.ts:215:    expect(response?.status(), "an unknown kind is not found").toBe(404);
src/routes/$name.tsx:35:    // N1b-2c (INC-977) — a held name is not found, exactly like an unknown one (SPA-3).
e2e/admin-roles.spec.ts:79:  if (error || !data) throw new Error(`[e2e:u2] role ${name} not found after create`);
src/routes/legal.$kind.tsx:25: * kind (e2e-…) is served only by the E2E build (DEC-018), unindexed; anything else is not found.
src/routes/legal.$kind.tsx:27: * served only by the signed-in route /legal/publishing — here it is not found.
src/routes/l.qr.test.ts:12:it("QRR-1 a bad id is 404 not found with no-store", async () => {
src/routes/l.qr.test.ts:15:  expect(await response.text()).toBe("not found");
src/routes/l.$id.qr[.]svg.ts:24:        badShape: () => plain("not found", 404),
src/routes/l.$id.photo[.]jpg.ts:23:        badShape: () => plain("not found", 404),
scripts/string-scan-evidence.test.ts:18:  if (!match?.[1]) throw new Error("the reporter's EVIDENCE filter was not found");
scripts/ci/backend-config.test.ts:10: * before_user_created hook off and nothing else changed; a switch not found once fails loudly. The
scripts/ci/backend-config.test.ts:57:  it("CF-BCFG-2 an unknown variant or a switch not found once fails; the images job calls it", () => {
scripts/e2e-failure-report.ts:351:  return `Context: context file not found for \`${contextSlug(spec)}\` — Playwright's name \`${exact}\`; this run carried ${candidates.length} con…
scripts/e2e-failure-report.ts:1175: * the census self-test shows it: its "listing not found" lines were followed by
scripts/e2e-failure-report.ts:1652: * tail or the "context file not found" line), rendered right after the Flake
scripts/e2e-failure-report.ts:2130:      "Context: context file not found for `tmp-capture-CAP-2-a-test-level-timeout-records-no-failed-step-desktop-1280`",
scripts/e2e-failure-report.ts:2301:      if (expectedCount === 0 && !rendered.includes("Context: context file not found for")) {
scripts/e2e-failure-report.ts:2326:      describeOut.includes("context file not found") ||
scripts/e2e-failure-report.ts:2393:          "Context: context file not found for `post-wizard-specs-POSTING-WIZARD-PW-74-",
scripts/e2e-failure-report.ts:2920:      const notFound = rows.find((row) => row.message === "listing not found");
scripts/e2e-failure-report.ts:2927:        ["listing not found ×2 is loud", notFound?.count === 2 && !notFound.quiet],
scripts/e2e-failure-report.ts:2928:        // INC-398 — on this capture both "listing not found" lines were followed by
scripts/e2e-failure-report.ts:2968:          green.includes("### listing not found") &&
scripts/e2e-failure-report.ts:2969:            green.includes("[ssr-error] /api/listings/draft listing not found"),
scripts/check-migrations.sh:103:  echo "GUARD SELF-TEST FAILED: fixture $BAD_FIXTURE not found"
scripts/check-migrations.sh:546:  echo "GUARD SELF-TEST FAILED: fixture $MARK_BAD_FIXTURE not found"
scripts/fixtures/e2e-ssr-census/job.log.txt:416:[WebServer] [0m[31m[ssr-error] /api/listings/draft listing not found[0m
scripts/fixtures/e2e-ssr-census/job.log.txt:449:[WebServer] [0m[31m[ssr-error] /api/listings/draft listing not found[0m
scripts/deny-tests/p1f-identity-unlink.ts:171:    console.log("FAIL — operator user not found for the operator account");
scripts/deny-tests/p1f-identity-unlink.ts:352:    console.error("FAIL: throwaway user not found.");
scripts/fixtures/e2e-context-sample-describe/results.json:34:                        "message": "Error: \u001b[2mexpect(\u001b[22m\u001b[31mlocator\u001b[39m\u001b[2m).\u001b[22mto…
scripts/fixtures/e2e-context-sample-describe/results.json:35:                        "stack": "Error: \u001b[2mexpect(\u001b[22m\u001b[31mlocator\u001b[39m\u001b[2m).\u001b[22mtoBe…
scripts/fixtures/e2e-context-sample-describe/results.json:50:                          "message": "Error: \u001b[2mexpect(\u001b[22m\u001b[31mlocator\u001b[39m\u001b[2m).\u001b[22m…
src/server/answer.test.ts:112:    const response = plain("not found", 404);
src/server/answer.test.ts:117:    expect(await response.text()).toBe("not found");
src/server/ad-photo.ts:33:  if (data === null) return photoRefusal(404, "not found");
src/server/ad-photo.ts:36:  if (cover === undefined) return photoRefusal(404, "not found");
src/server/ad-photo.ts:40:  if (link === undefined) return photoRefusal(404, "not found");
src/server/supabase/upstream.test.ts:109:      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400),
src/server/supabase/upstream.test.ts:129:    logRouteError("/api/x", "listing not found");
src/server/supabase/upstream.test.ts:132:      ["[ssr-error]", "/api/x", "listing not found"],
src/server/supabase/upstream.test.ts:175:      json({ code: "P0001", details: null, hint: null, message: "listing not found" }, 400);
src/lib/door-error.test.ts:13:    expect(doorErrorDetail("listing not found")).toBeUndefined();
src/lib/error-text.test.ts:15:    expect(errorText("listing not found")).toBe("listing not found");
src/features/admin/translations/strings-page.tsx:815:       * `undefined` (map not loaded) and an empty list (key not found in any
src/features/seller/use-seller-feed.ts:14: * never an empty page (F4); a 404 is the seller not found.
src/features/admin-monetisation/monetisation-service.test.ts:363:  it("MNS-6 every message the seven doors and the reader RAISE has a key of its own — the cleared override's `not f…
src/features/admin-monetisation/monetisation-service.test.ts:377:    expect(raised.has("not found")).toBe(true);
src/features/admin-monetisation/monetisation-service.test.ts:383:    expect(monetisationErrorKey("not found")).toEqual({
src/features/seller/seller-page.tsx:19: * list comes into view. Every state is visible (F4): loading, not found,
src/features/seller/seller-head.ts:6: * ('imitates') or an unknown one is not found, and its head carries no name at all —
src/features/admin-monetisation/monetisation-service.ts:250: * departure (`not found`, the cleared override: no key of its own this turn).
src/features/admin-monetisation/monetisation-service.ts:273:  "not found": "admin.monetisation.error.overrideNotFound",
src/features/admin-monetisation/monetisation-service.ts:282:  "price not found": "admin.packages.error.notFound",
src/features/admin/translations/languages-page.tsx:177:               * the walk reported "not found".
src/features/admin/users/alias-reason.test.ts:64:    expect(profileEditRefusalKey({ message: "user not found" })).toBe("admin.users.edit.failed");
src/features/admin-listings/use-admin-listing.ts:12: * a draft answers "listing not found"). The door decides what this person may
== rg -n -F 'price not found' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:282:  "price not found": "admin.packages.error.notFound",
== rg -n -F 'price in use' src e2e scripts (4)
src/features/admin-monetisation/price-dialog.tsx:45: * (`price in use`, `price already ended`) and a window overlapping another
src/features/admin-monetisation/monetisation-service.test.ts:357:    door.rpc = rpcError("price in use");
src/features/admin-monetisation/monetisation-service.test.ts:391:    expect(monetisationErrorKey("price in use")).toEqual({
src/features/admin-monetisation/monetisation-service.ts:283:  "price in use": "admin.monetisation.error.priceInUse",
== rg -n -F 'price already ended' src e2e scripts (2)
src/features/admin-monetisation/price-dialog.tsx:45: * (`price in use`, `price already ended`) and a window overlapping another
src/features/admin-monetisation/monetisation-service.ts:284:  "price already ended": "admin.packages.error.alreadyEnded",
== rg -n -F 'bad amount' src e2e scripts (2)
src/features/admin-monetisation/monetisation-service.ts:276:  "bad amount": "admin.packages.error.badAmount",
src/features/admin-monetisation/monetisation-field-gates.test.tsx:213:  it("KMO-7 a bad amount's own words move under its Field, linked by aria-describedby", async () => {
== rg -n -F 'bad credit cost' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:277:  "bad credit cost": "admin.monetisation.error.badCreditCost",
== rg -n -F 'unknown currency' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:278:  "unknown currency": "admin.packages.error.unknownCurrency",
== rg -n -F 'unknown country' src e2e scripts (9)
src/routes/api/admin/locations/export.ts:44:    const refused = exportRefusal(error, "unknown country scope");
src/server/imports/route.ts:51: * `unknown category scope` / `unknown country scope` (F1-7).
src/server/imports/route.ts:60:  { match: "unknown country scope", kind: "exact", status: 404 },
src/server/imports/csv.test.ts:63:    expect(exportRefusal({ message: "permissionDenied:scope" }, "unknown country scope")).toBe(
src/server/imports/csv.test.ts:66:    expect(exportRefusal({ message: "permission denied" }, "unknown country scope")).toBeNull();
src/server/imports/csv.test.ts:68:    expect(exportRefusal({ message: "unknown country scope" }, "unknown country scope")).toBe(
src/server/imports/csv.test.ts:69:      "unknown country scope",
src/server/imports/csv.ts:66:  unknownScope: "unknown category scope" | "unknown country scope",
src/features/admin-monetisation/monetisation-service.ts:271:  "unknown country": "admin.packages.error.unknownCountry",
== rg -n -F 'unknown category' src e2e scripts (12)
src/routes/api/admin/categories/export.ts:40:    const refused = exportRefusal(error, "unknown category scope");
src/routes/api/admin/categories/generate-image.test.ts:98:  it("CIR-2 unknown category is 404 before the gateway", async () => {
e2e/admin-attributes-links.spec.ts:1598:  test("AT-68 an import naming an unknown category is refused", async ({ page }) => {
src/routes/api/admin/attributes/export.ts:43:    const refused = exportRefusal(error, "unknown category scope");
e2e/category-image-routes.spec.ts:144:  test("CI-2b unknown categoryId is an honest 404, never a 502", async ({ request }) => {
e2e/admin-attributes-import.spec.ts:1068:    // (c) an unknown category slug is refused per row, and nothing is written.
src/server/imports/route.ts:51: * `unknown category scope` / `unknown country scope` (F1-7).
src/server/imports/route.ts:59:  { match: "unknown category scope", kind: "exact", status: 404 },
src/server/imports/csv.test.ts:61:    const scope = "unknown category scope" as const;
src/server/imports/csv.test.ts:67:    expect(exportRefusal({ message: "unknown category scope" }, scope)).toBe(scope);
src/server/imports/csv.ts:66:  unknownScope: "unknown category scope" | "unknown country scope",
src/features/admin-monetisation/monetisation-service.ts:279:  "unknown category": "admin.packages.error.unknownCategory",
== rg -n -F 'bad window' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:280:  "bad window": "admin.packages.error.badWindow",
== rg -n -F 'overlapping window' src e2e scripts (2)
scripts/public-surface-allowlist.txt:167:admin_save_package_price | authenticated | Turn P-1, a new argument list in P-1b M-b (credit_cost): staff add a price row (insert only; ove…
src/features/admin-monetisation/monetisation-service.ts:281:  "overlapping window": "admin.packages.error.overlap",
== rg -n -F 'unknown level' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:269:  "unknown level": "admin.monetisation.error.unknownLevel",
== rg -n -F 'not a main category' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:270:  "not a main category": "admin.monetisation.error.notMainCategory",
== rg -n -F 'bad days' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:262:  "bad days": "admin.packages.error.badDays",
== rg -n -F 'bad photos' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:263:  "bad photos": "admin.monetisation.error.badPhotos",
== rg -n -F 'unknown placement' src e2e scripts (4)
src/components/marketplace/card-tier.ts:16: * whatever the frame (a plain frame flies the green flag). A NULL or unknown placement is the
src/features/admin-monetisation/monetisation-forms.test.ts:108:  it("MNF-3 the product judge refuses what the door refuses: the key's shape, a missing or long name, a blank day cou…
src/features/admin-monetisation/monetisation-service.ts:264:  "unknown placement": "admin.monetisation.error.unknownPlacement",
src/components/marketplace/card-tier.test.ts:69:  it("CTR-1b a NULL or unknown placement is the plain frame; a NULL badge is no flag", () => {
== rg -n -F 'empty override' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:272:  "empty override": "admin.monetisation.error.emptyOverride",
== rg -n -F 'bad key' src e2e scripts (2)
src/server/route.test.ts:513:  it("RT-18 query passes only its first bad key to the route's answer", async () => {
src/features/admin-monetisation/monetisation-service.ts:258:  "bad key": "admin.packages.error.badKey",
== rg -n -F 'unknown kind' src e2e scripts (4)
e2e/legal-pages.spec.ts:215:    expect(response?.status(), "an unknown kind is not found").toBe(404);
src/features/admin-screening/use-photo-changes.test.ts:9:  it("PCH-1 a change row is read with its kind, its photos, its codes and its ad; an unknown kind is left out", () => {
src/features/admin-screening/use-photo-changes.ts:43:/** B5 — a change row as the read returns it; a row of an unknown kind is left out. */
src/features/admin-monetisation/monetisation-service.ts:259:  "unknown kind": "admin.monetisation.error.unknownKind",
== rg -n -F 'bad name' src e2e scripts (2)
src/features/admin-monetisation/monetisation-service.ts:261:  "bad name": "admin.monetisation.error.badName",
src/features/admin-monetisation/monetisation-service.ts:317:/** The door's name bound (`bad name`): required English, 80 characters at most. */
== rg -n -F 'kind change' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:260:  "kind change": "admin.monetisation.error.kindChange",
== rg -n -F 'caps on level' src e2e scripts (2)
src/features/admin-monetisation/monetisation-service.test.ts:407:    expect(monetisationErrorKey("caps on level")).toEqual({
src/features/admin-monetisation/monetisation-service.ts:266:  "caps on level": "admin.monetisation.error.capsOnLevel",
== rg -n -F 'perks on reach' src e2e scripts (2)
e2e/admin-monetisation.spec.ts:815:    ).toBe("perks on reach");
src/features/admin-monetisation/monetisation-service.ts:265:  "perks on reach": "admin.monetisation.error.perksOnReach",
== rg -n -F 'bad caps' src e2e scripts (2)
src/features/admin-monetisation/monetisation-service.test.ts:403:    expect(monetisationErrorKey("bad caps")).toEqual({
src/features/admin-monetisation/monetisation-service.ts:267:  "bad caps": "admin.monetisation.error.badCaps",
== rg -n -F 'bad free ads' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:287:  "bad free ads": "admin.monetisation.error.badFreeAds",
== rg -n -F 'unknown reach' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:286:  "unknown reach": "admin.monetisation.error.unknownReach",
== rg -n -F 'launch bundle required' src e2e scripts (2)
e2e/admin-monetisation.spec.ts:1250:    ).toBe("launch bundle required");
src/features/admin-monetisation/monetisation-service.ts:288:  "launch bundle required": "admin.monetisation.error.launchRequired",
== rg -n -F 'bad launch bundle' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:289:  "bad launch bundle": "admin.monetisation.error.badLaunch",
== rg -n -F 'unknown package' src e2e scripts (1)
src/features/admin-monetisation/monetisation-service.ts:275:  "unknown package": "admin.packages.error.unknownPackage",
== rg -n -F 'badValue:enabled' src e2e scripts (2)
src/features/admin-ai/ai-service.test.ts:169:    expect(aiErrorKey("badValue:enabled")).toEqual({
src/features/admin-ai/ai-service.test.ts:171:      raw: "badValue:enabled",
== rg -n -F 'badValue:unitCost' src e2e scripts (2)
e2e/admin-services.spec.ts:184:      expect(await refused({ p_unit_cost_microusd: -1 })).toBe("badValue:unitCost");
src/features/admin-ai/ai-service.test.ts:168:    expect(aiErrorKey("badValue:unitCost").key).toBe("admin.ai.error.badPriceDoor");
== rg -n -F 'badValue:budget' src e2e scripts (2)
e2e/admin-services.spec.ts:183:      expect(await refused({ p_monthly_budget_cents: -1 })).toBe("badValue:budget");
src/features/admin-ai/ai-service.test.ts:167:    expect(aiErrorKey("badValue:budget").key).toBe("admin.ai.error.badBudget");
== rg -n -F 'badValue:days' src e2e scripts (1)
e2e/admin-services.spec.ts:357:      expect(refused.error, `SV-5: a ${days}-day window`).toBe("badValue:days");
== rg -n -F 'badValue:limit' src e2e scripts (2)
e2e/legal-doors.spec.ts:1293:      ).toContain("badValue:limit");
src/features/admin/legal/legal-service.ts:390:/** The export door's largest page (`badValue:limit` beyond it). */
== rg -n -F 'badValue:feature' src e2e scripts (0)

== rg -n -F 'badValue:outcome' src e2e scripts (0)

== rg -n -F 'badValue:cursor' src e2e scripts (0)

== rg -n -F 'badValue:job' src e2e scripts (0)

== rg -n -F 'unknownFeature' src e2e scripts (6)
e2e/admin-services.spec.ts:182:      expect(await refused({ p_feature: "e2e-sv-no-such-feature" })).toBe("unknownFeature");
e2e/admin-services.spec.ts:269:      expect(unknown.error?.message).toBe("unknownFeature");
src/features/admin-ai/ai-service.ts:430:export const AI_REFUSAL_IDS = ["overBudget", "unknownFeature", "badValue"] as const;
src/features/admin-ai/ai-service.test.ts:166:    expect(aiErrorKey("unknownFeature").key).toBe("admin.ai.error.unknownFeature");
src/server/ai/meter.test.ts:79:    next.answer = async () => ({ data: null, error: { message: "unknownFeature" } });
src/server/ai/meter.test.ts:86:      "ai meter name_check: unknownFeature",
== rg -n -F 'overBudget' src e2e scripts (4)
src/features/admin-ai/ai-service.ts:430:export const AI_REFUSAL_IDS = ["overBudget", "unknownFeature", "badValue"] as const;
src/features/admin-ai/ai-service.test.ts:165:    expect(aiErrorKey("overBudget").key).toBe("admin.ai.error.overBudget");
src/features/admin-ai/ai-feature-form.test.tsx:183:        { message: "overBudget", code: "P0001", details: null, hint: null },
src/features/admin-ai/ai-feature-form.test.tsx:184:        "admin.ai.error.overBudget",
== rg -n -F 'notPaused' src e2e scripts (10)
src/lib/door-codes.test.ts:55:      "notPaused",
src/features/admin-screening/use-name-checks.ts:20: *                           no pause answers `notPaused` and writes nothing
src/features/admin-screening/use-name-checks.ts:251:export type ResumeAnswer = "done" | "notPaused";
src/features/admin-screening/use-name-checks.ts:258:  if (answer?.ok === false && answer.reason === "notPaused") return "notPaused";
src/lib/door-codes.ts:36:  "notPaused",
src/features/admin-screening/job-line.tsx:68:    let answer: "done" | "notPaused";
src/features/admin-screening/job-line.tsx:84:        : "admin.screening.job.resume.notPaused",
src/features/my-listings/my-listing.ts:276:    notPaused: "myListings.error.changed",
src/features/my-listings/my-listing.test.ts:145:      ["notPaused", "myListings.error.changed"],
src/features/my-listings/my-listing.test.ts:349:  expect(actionErrorKey("notPaused")).toBe("myListings.error.changed");
== rg -n -F 'step-up required' src e2e scripts (37)
src/routes/api/translate.ts:75:  if (message.startsWith("step-up required")) return "stepUp";
e2e/admin-roles.spec.ts:321:      ).toMatch(/no verified factor|step-up required/i);
e2e/admin-screening.spec.ts:311:    expect(deniedReviewer).toBe("step-up required: no verified factor");
e2e/my-listings-doors.spec.ts:736:    expect((await set(enforcer, true, 30)).error).toBe("step-up required: no verified factor");
e2e/admin-listings.spec.ts:356:    await refusedEdit(holder, "step-up required: no verified factor");
e2e/admin-listings.spec.ts:630:    expect((await restoreAs(plainRemoved.id)).error).toBe("step-up required: no verified factor");
e2e/admin-listings.spec.ts:631:    expect((await restoreAs(severe.id)).error).toBe("step-up required: no verified factor");
e2e/admin-listings.spec.ts:2355:    expect(asked.error ?? "").toMatch(/^step-up required/);
e2e/mfa-stepup.spec.ts:206:    expect(staffError ?? "").toMatch(/step-up required/i);
src/routes/api/translate.route.test.ts:321:      ["step-up required", "stepUp"],
src/routes/api/translate.route.test.ts:322:      ["step-up required: no verified factor", "stepUp"],
src/routes/api/translate.route.test.ts:323:      ["step-up required: verification expired", "stepUp"],
src/server/answer.ts:140:  return routeJson({ error: "step-up required", code: "P0009" }, 428);
src/server/answer.test.ts:143:    expect(await response.text()).toBe('{"error":"step-up required","code":"P0009"}');
src/server/imports/route.ts:48: * `step-up required` or begins `step-up required:`. A fixed sentence answers ITSELF (a server
src/server/imports/route.ts:58:  { match: "step-up required", kind: "stepUp", status: 428 },
src/features/admin-ai/ai-service.test.ts:159:    expect(aiErrorKey("step-up required: no verified factor").key).toBe("admin.ai.error.stepUp");
src/features/admin-attributes/attribute-refusals.test.tsx:92:      "step-up required",
src/features/admin-locations/location-refusals.test.tsx:124:    for (const message of ["step-up required", "step-up required: verification expired"]) {
src/features/admin/translations/translations-service.test.ts:223:    expect(translationRefusalKey({ code: "P0009", message: "step-up required" })).toBe(
src/features/auth/mfa/use-step-up.ts:42: * 'step-up required' (SQLSTATE P0009), the same modal re-opens against the same
src/features/admin-listings/tier-reasons.test.ts:124:    expect(tierErrorKey("step-up required: listings:enforce")).toBe("common.error");
src/features/auth/mfa/mfa-service.ts:149:  return candidate.code === "P0009" || (candidate.message ?? "").includes("step-up required");
src/features/admin-monetisation/monetisation-service.test.ts:351:    door.rpc = rpcError("step-up required", "P0009");
src/features/admin-monetisation/monetisation-service.test.ts:354:      message: "step-up required",
src/features/admin/translations/translations-service.ts:455:    [/step-up required/i, "admin.translations.error.stepUp"],
src/features/admin/translations/translations-service.ts:1028:  if (status === 428) return new Error("step-up required");
src/features/admin-categories/categories-page.tsx:391:   * `step-up required` (P0009), the shared defence-in-depth path in
src/features/admin-screening/use-photo-reviews.test.ts:46:    expect(photoAllowErrorKey("step-up required: listings:review")).toBe("common.error");
src/features/admin-monetisation/monetisation-service.ts:303:  if (code === "P0009" || /step-up required/i.test(raw)) {
src/features/admin-listings/move-reasons.test.ts:65:    expect(moveErrorKey("step-up required: listings:enforce")).toBe("common.error");
src/features/admin-categories/category-refusals.test.tsx:56:      "step-up required",
src/features/admin-countries/country-refusals.test.tsx:71:    const stepUp = readRefusal({ message: "step-up required", code: "P0009" }, COUNTRY_REFUSALS);
src/features/admin/roles/roles-service.ts:167:  sentences: [[/step-up required/i, "admin.roles.error.stepUp"]],
src/features/admin/roles/roles-service.test.ts:42:      roleRefusalKey({ code: "P0009", message: "step-up required" }, "admin.roles.perm.failed"),
src/features/admin/users/admin-users-service.ts:258:    [/step-up required/i, "admin.users.edit.errorStepUp"],
src/features/admin/users/alias-reason.test.ts:48:    expect(profileEditRefusalKey({ code: "P0009", message: "step-up required" })).toBe(
````

### Appendix D — the e2e ids that call a family function (e2e-ids.txt)

````text
## e2e/admin-ai-calls.spec.ts:7 ACR-E1 — admin_list_ai_calls
  19: expect(answer.error).toBeNull();
  42: expect(filtered.error).toBeNull();
## e2e/admin-monetisation.spec.ts:368 P-1b — (console)
  385: const a = await supabase.from("role_permissions").delete().eq("role_id", roleId);
  386: if (a.error) throw new Error(`${TAG} role_permissions reap failed: ${a.error.message}`);
  388: if (b.error) throw new Error(`${TAG} user_roles reap failed: ${b.error.message}`);
  390: if (c.error) throw new Error(`${TAG} roles reap failed: ${c.error.message}`);
  419: if (top.error)
  420: throw new Error(`${TAG} reading the top ${kind} sort failed: ${top.error.message}`);
  440: if (error) throw new Error(`${TAG} seeding ${key} failed: ${error.message}`);
  473: if (error || !data) throw new Error(`${TAG} seeding a price failed: ${error?.message}`);
## e2e/admin-monetisation.spec.ts:490 MON-1 — (console)
  524: if (error) throw new Error(`${TAG} reading the levels failed: ${error.message}`);
## e2e/admin-monetisation.spec.ts:555 MON-2 — admin_save_listing_package, admin_list_monetisation, admin_save_market_settings
  589: ).error,
  590: ).toBe("permission denied");
  591: expect((await pageDoor(page, "admin_list_monetisation", {})).error).toBe("denied");
  628: ).error,
  629: ).toBe("permission denied");
## e2e/admin-monetisation.spec.ts:634 MON-3 — (console)
## e2e/admin-monetisation.spec.ts:646 MON-4 — (console)
## e2e/admin-monetisation.spec.ts:767 MON-5 — admin_save_listing_package
  814: ).error,
## e2e/admin-monetisation.spec.ts:819 MON-6 — (console)
  874: await expect(empty.getByTestId("monetisation-override-create-error")).toHaveText(
  875: en["admin.monetisation.error.emptyOverride"],
## e2e/admin-monetisation.spec.ts:950 MON-7 — (console)
  962: if (season.error) throw new Error(`${TAG} the season failed: ${season.error.message}`);
  979: if (ended.error) throw new Error(`${TAG} ending the season failed: ${ended.error.message}`);
## e2e/admin-monetisation.spec.ts:983 MON-8 — (console)
## e2e/admin-monetisation.spec.ts:1066 MON-9 — (console)
## e2e/admin-monetisation.spec.ts:1119 MON-10 — (console)
  1139: if (used.error) throw new Error(`${TAG} marking ${priceId} used failed: ${used.error.message}`);
  1146: await awaitGuardedOutcome(page, secret, edit.getByTestId("monetisation-price-edit-error"));
  1147: await expect(edit.getByTestId("monetisation-price-edit-error")).toHaveText(
  1148: en["admin.monetisation.error.priceInUse"],
## e2e/admin-monetisation.spec.ts:1167 MON-11 — (console)
  1181: if (error) throw new Error(`${TAG} the public read failed: ${error.message}`);
## e2e/admin-monetisation.spec.ts:1217 MON-12 — admin_save_market_settings
  1236: await expect(create.getByTestId("monetisation-market-create-error")).toHaveText(
  1237: en["admin.monetisation.error.launchRequired"],
  1249: ).error,
## e2e/admin-monetisation.spec.ts:1308 MON-13 — admin_list_monetisation
  1337: `MON-13 the account did not sign in: ${signInError?.message ?? ""}`,
  1350: productsRead.error,
  1361: expect(pricesRead.error, `MON-13 ${who}: the price's own columns were refused`).toBeNull();
  1369: expect(hiddenColumn.error?.code, `MON-13 ${who}: ${table}.${column} was readable`).toBe(
  1374: expect(every.error?.code, `MON-13 ${who}: every column of ${table} was readable`).toBe(
  1383: expect(market.error, `MON-13 ${who}: the market's own columns were refused`).toBeNull();
  1386: marketAuthor.error?.code,
  1390: expect(console.error?.message, `MON-13 ${who}: the console rpc answered`).toMatch(
  1391: /denied|not signed in|permission denied/,
## e2e/admin-monetisation.spec.ts:1397 MON-14 — (console)
  1397: test("MON-14 step-up: a staff session without a fresh second factor is asked for one before any write; the write lands once the code is given", async ({
  1414: // INC-620 — the client is told its step-up is stale; the next guarded action asks.
  1417: await expect(page.getByTestId("step-up-modal")).toBeVisible({ timeout: 20000 });
  1441: if (error) throw new Error(`${TAG} seeding the market ${code} on failed: ${error.message}`);
## e2e/admin-monetisation.spec.ts:1566 MON-18 — (console)
## e2e/admin-services.spec.ts:117 SV-1 — admin_ai_features, admin_ai_spend_days, admin_set_ai_feature
  125: expect(list.error).toBe("permission denied");
  128: expect(days.error).toBe("permission denied");
  136: expect(set.error).toBe("permission denied");
  140: expect(gate.error ?? "").toContain("permission denied");
  145: expect(spend.error ?? "").toContain("permission denied");
  149: expect(read.error ?? "", `${table} read`).toContain("permission denied");
## e2e/admin-services.spec.ts:153 SV-2 — admin_ai_features, admin_set_ai_feature
  163: expect(list.error).toBeNull();
  179: ).error;
  181: // staff), so its refusal is gone; the real row is never switched by a test (G27).
  192: expect(off.error).toBeNull();
  206: expect(on.error).toBeNull();
## e2e/admin-services.spec.ts:218 SV-3 — (console)
  267: expect(bad.error?.message).toBe("badValue:units");
  269: expect(unknown.error?.message).toBe("unknownFeature");
## e2e/admin-services.spec.ts:279 SV-4 — (console)
## e2e/admin-services.spec.ts:327 SV-5 — admin_ai_spend_days
  334: expect(answer.error).toBeNull();
  345: expect(SEVEN, `SV-5: ${row.feature} is not one of the seven`).toContain(row.feature);
  357: expect(refused.error, `SV-5: a ${days}-day window`).toBe("badValue:days");
````

### Appendix E — the base build: first downloads (check-bundle-size) and the three closures

````text
Bundle budget — the entry's static import closure under dist/client (gzipped):
     141.6 KiB  dist/client/assets/index-Cetm1qaa.js
      29.2 KiB  dist/client/assets/shared-shell-C3CUDfKL.js
      22.6 KiB  dist/client/assets/styles-pLaELzbr.css
       8.1 KiB  dist/client/assets/bundle-mjs-ry-q0ArR.js
       7.7 KiB  dist/client/assets/useQuery-B_datWrR.js
       2.9 KiB  dist/client/assets/link-CkQjZMj4.js
       2.8 KiB  dist/client/assets/react-DPqvtlQV.js
       2.2 KiB  dist/client/assets/useSelector-DSbyHGUA.js
       1.3 KiB  dist/client/assets/react-dom-B6cvz6ju.js
       1.0 KiB  dist/client/assets/dist-mRIjv3bL.js
       0.7 KiB  dist/client/assets/createLucideIcon-DGPfniA1.js
       0.7 KiB  dist/client/assets/preload-helper-Czpn1I53.js
       0.4 KiB  dist/client/assets/rolldown-runtime-QTnfLwEv.js
       0.4 KiB  dist/client/assets/useMatch-i8-xg83V.js
       0.4 KiB  dist/client/assets/dist-DGFCZd-W.js
       0.3 KiB  dist/client/assets/utils-DtbVXzXx.js
       0.3 KiB  dist/client/assets/jsx-runtime-By8HlURe.js
       0.3 KiB  dist/client/assets/ClientOnly-CTnPRrI8.js
       0.2 KiB  dist/client/assets/useRouter-CI6lzJu4.js
       0.1 KiB  dist/client/assets/x-drj1Vrig.js
       0.1 KiB  dist/client/assets/not-found-i5RsCZif.js
       0.1 KiB  dist/client/assets/root-DLTE-HSj.js
JS: 200.7 KiB / 205 KiB — ok
CSS: 22.6 KiB / 40 KiB — ok
Admin code in the entry's closure: 0 module(s), each allowlisted (BC-16) — ok

Per-page first download (entry + the page's chunks, gzipped):
    221.6 / 227 KiB  /
    219.7 / 225 KiB  /$name
    262.8 / 268 KiB  /account
    203.3 / 208 KiB  /account_/legal
    204.0 / 209 KiB  /account_/legal_/$versionId
    220.3 / 225 KiB  /account_/saved
    205.1 / 210 KiB  /admin
    205.9 / 211 KiB  /admin/
    298.7 / 303 KiB  /admin/ai
    313.3 / 318 KiB  /admin/attributes
    290.5 / 295 KiB  /admin/audit
    343.9 / 348 KiB  /admin/categories
    302.6 / 309 KiB  /admin/countries
    205.8 / 210 KiB  /admin/images
    288.4 / 293 KiB  /admin/impersonation_/$sessionId
    281.1 / 285 KiB  /admin/legal
    277.7 / 282 KiB  /admin/legal_/$versionId
    279.8 / 284 KiB  /admin/legal_/edit
    324.3 / 329 KiB  /admin/listings
    324.9 / 330 KiB  /admin/listings_/$listingId
    406.0 / 412 KiB  /admin/listings_/$listingId_/edit
    266.3 / 271 KiB  /admin/locations
    308.9 / 313 KiB  /admin/monetisation
    303.1 / 310 KiB  /admin/places
    291.2 / 295 KiB  /admin/roles
    271.4 / 275 KiB  /admin/roles_/$roleId
    340.9 / 348 KiB  /admin/screening
    302.6 / 307 KiB  /admin/translations
    305.2 / 309 KiB  /admin/translations_/$lang
    288.6 / 293 KiB  /admin/users
    288.6 / 293 KiB  /admin/users_/$userId
    217.2 / 223 KiB  /auth
    204.2 / 209 KiB  /auth_/callback
    210.3 / 214 KiB  /auth_/reset
    221.6 / 227 KiB  /c/$slug
    224.3 / 228 KiB  /dev/primitives
    243.8 / 248 KiB  /dev/style
    201.0 / 206 KiB  /dev/tall
    246.7 / 250 KiB  /l/$slug
    205.4 / 210 KiB  /legal/$kind
    211.7 / 217 KiB  /legal/accept
    206.2 / 211 KiB  /legal/publishing
    307.5 / 315 KiB  /my-listings
    317.7 / 323 KiB  /my-listings_/$listingId
    398.3 / 404 KiB  /my-listings_/$listingId_/edit
    398.3 / 404 KiB  /post
    398.3 / 404 KiB  /post_/$listingId
    205.4 / 210 KiB  /privacy
    275.3 / 279 KiB  /settings
    205.4 / 210 KiB  /terms
Tier flag: card pages only (CF-TIER-3) — ok
Bundle budget OK.
bundle exit 0

/admin/monetisation: 71 chunks, 316286 B gzip; admin.monetisation-Cbs4LO1C.js=14331 refusal-CcJP3zJX.js=1131
/admin/ai: 68 chunks, 305845 B gzip; admin.ai-BYt3p4Mf.js=6988 refusal-CcJP3zJX.js=1131
/admin/screening: 89 chunks, 349048 B gzip; ad-page-refusals-DlU09tlx.js=466 admin.screening-Cpc6t0pk.js=9005 price-basis-DsiTw_dG.js=726 refusal-CcJP3zJX.js=1131 use-price-unit-labels-CEvy5Wya.js=1509 use-screening-DqrjjUwI.js=2055
````

### Appendix F — the queued items (queued.txt)

````text
roadmap.md:3:The brief in force: docs/governance/briefs/f1-doors-6b.md (Foundations 1, turn F1-6b — the staff's monetisation and services doors onto door_context and the shell). Previous: docs/governance/briefs/tci-overlay-guards.md (two guards: overlays by ki
roadmap.md:10:- [ ] The order of work from 2026-11-15 (DEC-379; block S90): F1-5a (Cursor, Opus 5.5 with the split — first the dropped-function grants guard, `answeredId` → `src/lib` with the six ceilings back, the `callee-codes` census item; then the seller o
roadmap.md:15:  - [ ] F1-6 (enforcement) — a signed photo link outlives a takedown (INC-1167: the object moves or is deleted at the takedown)
roadmap.md:21:- [ ] The order of work from 2026-11-16 (DEC-379; block S91): the tests and CI turn (Cursor, Opus 5.5 — the list under 2026-11-15, INC-1173 added) → Lovable's third judged turn after the operator pastes Knowledge v3.14 (DEC-377's judge: L1 MISS,
roadmap.md:30:  - [ ] [turn F1-5a] roadmap: the Foundations 1 line gains "F1-5a DONE (pull request #50, marks 20261115220000 and 20261116030000 to 20261116031300)"; LEFT: F1-6 (the staff doors), F1-7 (`door_context`'s `rateLimited` reset time; every door call'
roadmap.md:31:  - [ ] [turn F1-5a, ruling 1] roadmap — under Foundations 1, F1-6: "The staff move's and the reviewer's decisions spend `staff_moderation`, not the seller's `revise` (F1-5a, ruling 1 §4, §5)."
roadmap.md:108:- [ ] Foundations 1 — the door mechanism (DEC-333 → DEC-336; the brief docs/governance/briefs/f1-doors.md, the plan docs/governance/reports/f1-doors.stop-1.md and rulings 1 and 2 on `cursor/f1-doors-plan`, pull request #20, the plan record): sev
scripts/doors/step-ups.ts:9: * F1-6a (ruling 1, Part A; INC-1195's class) — EACH PERMISSION'S DECLARED STEP-UP. door_context's
scripts/doors/check-doors.ts:88: * The planted permission rows of `opt-out-over-step-up` (F1-6a ruling 1, Part A), in the two forms the
scripts/doors/check-doors.test.ts:47: * `none:` step-up cell names a permission the migrations declare without step-up (DOORS-11, F1-6a).
scripts/doors/check-doors.test.ts:375:    "DOORS-11 a none: step-up cell holds only over a permission declared without step-up: fires over listings:review, not over listings:reveal (F1-6a ruling 1, Part A)",
scripts/doors/check-doors.test.ts:411:      // The tree: the flags the local proof stack reads (F1-6a census, #PERMS).
scripts/doors/check-doors-allowlist.txt:6:grant-without-caller package_price_for(uuid,text) | census F1-1: a monetisation reader no code names (scripts/conformance/package-price.ts reads its SQL, not the door); family F1-6 revokes or names its caller | 2026-12
scripts/doors/judge.ts:29: *                          F1-6a ruling 1 Part A): door_context's staff
scripts/conformance/wired.test.ts:288:    // DOORS-11 (F1-6a ruling 1, Part A): scripts/doors/step-ups.ts is read by check-doors.ts in both
docs/governance/reports/f1-doors-3.report.md:187:- `src/features/admin-ai/ai-service.ts:439`, `src/features/admin-locations/locations-service.ts:403`, `src/features/admin-countries/countries-service.ts:131`, `src/features/admin-monetisation/monetisation-servic
docs/governance/reports/f1-doors-3.report.md:336:- `admin_end_package_price`'s cell correction fixes the column's NAME only; whether that row's country is the right scope for the door is F1-6's census.
docs/governance/reports/f1-doors-5b.report.md:437:INC-838); `door_context`'s `rateLimited` reset time (F1-7, INC-1170); the staff doors (F1-6); the
docs/governance/reports/f1-doors.stop-1.md:481:| **F1-6** listings admin · screening · services · monetisation | admin_edit/move/undo_listing, admin_set_listing_tier, photo review doors, admin_reveal_listing_contact, name checks, jobs, AI features, the monetis
docs/governance/reports/f1-doors-5a.stop-3.md:472:6. `admin_move_listing` MEETS THE CORE'S CODES RAISED. It is not on the shell (F1-6). A transition refusal now reaches
docs/governance/reports/f1-doors-2.report.md:523:INC — INC-1038 — status line: `admin_update_profile` spends the dial `[staff_moderation]` (F1-2, [5e54ac8a6]); three doors remain for F1-6.
docs/governance/reports/f1-doors-5a.stop-1.md:77:   alternative is to drop it and leave the staff move's dial to F1-6.
docs/governance/reports/f1-doors-5a.stop-1.md:78:5. A reviewer's decision keeps spending `revise`, as today (the body spends it for every caller). It is named for F1-6:
docs/governance/reports/f1-doors-5a.report.md:20:- Not done: nothing of STEPS 3 to 7 is left. LEFT for later turns: F1-6 (the staff doors), F1-7 (`door_context`'s `rateLimited` with its reset time; every door call's `Result` typed; the three assertions of §13)
docs/governance/reports/f1-doors-5a.report.md:261:roadmap — the Foundations 1 line gains "F1-5a DONE (pull request #50, marks 20261115220000 and 20261116030000 to 20261116031300)"; LEFT: F1-6 (the staff move's and the reviewer's decisions), F1-7 (`door_context
docs/governance/reports/f1-doors-5a.report.md:266:roadmap — under Foundations 1, F1-6: "The staff move's and the reviewer's decisions spend `staff_moderation`, not the seller's `revise` (F1-5a, ruling 1 §4, §5)."
docs/governance/reports/tci-overlay-guards.report.md:397:INC — INC-1202: the proofs of F1-6a's files 2 and 4 sent a title carrying ten random hex characters through the edit door; an all-digit draw (about one in a hundred) read as a phone number to `attr_conta
docs/governance/reports/tci-overlay-guards.report.md:405:changelog — 2026-11-18 — tci-overlay-guards: the box census passes a top-layer overlay whose places draw nothing by its kind (five allowance lines retired); the Lovable branch guard's test stands on fixt
docs/governance/reports/f1-doors-5a.census.md:208:| `admin_move_listing_core(uuid,text,text,text)` 20261028233839:342 | SECURITY INVOKER (under the definer `admin_move_listing`), F1-6's staff move | runs its own checks first (not signed in, `listings:enforce`,
docs/governance/reports/f1-doors-5a.census.md:254:| `transition_listing_core` (new) | the codes of `transition_listing` above (P0D01) | `transition_listing`, `resume_listing`, `set_listing_level` pass them through their shells as their own refusal; `admin_move
docs/governance/reports/f1-doors-5a.census.md:267:| `revise` on `transition_listing`'s staff path | one review decision (a reviewer's approve / reject from the screening console) | a reviewer clearing a queue honestly decides one ad every half-minute to two mi
docs/governance/reports/f1-doors-5a.census.md:513:  the stop (keep the count by a `rate_gate('revise')` in the move's own redeclaration, or leave it to F1-6).
docs/governance/reports/f1-doors-5a.census.md:538:  built here (STEP 3); `tier-reasons.ts:54` `tierErrorKey` → left (F1-6, the staff tier door).
docs/governance/reports/f1-doors-4b.census.md:161:  `packages:update`, F1-6); the family is fourteen, not about twenty-two.
docs/governance/reports/f1-doors-3.stop-2.md:266:table's column is `package_prices.country_code` (the F1-6 family's doors). Which of these should the guard land with
docs/governance/reports/f1-doors-3.stop-2.md:268:`key | reason | until` naming F1-6, or the roadmap line item 5 allows instead of the guard?
docs/governance/reports/f1-doors-1.stop-1.md:114:- `scripts/doors/check-doors-allowlist.txt`: 10 `grant-without-caller` census lines (five import helpers → F1-4a; get_browse_tree, get_category_attributes → F1-7; listing_reveal_count → F1-5b; package_price_for
docs/governance/briefs/tci-overlay-guards.md:1:THREE TEST DEFECTS THAT REDDEN LANES THEY DO NOT JUDGE — the box census judges a top-layer overlay by its kind, the Lovable branch guard's test stands on its own fixtures, and two F1-6a proofs stop feeding a rando
docs/governance/briefs/tci-overlay-guards.md:35:THE RED: CI run 44330082986, lane 4, the backend's start: `F1-6a part 4 proof (d): a country enforcer's edit of its country's ad answered {"ok": false, "refusals": [{"field": "title", "reason": "contactInText"}]}
docs/governance/briefs/tci-overlay-guards.md:54:RECORDS (the report's §14, word for word; the executor fills the bracketed parts): INC — INC-1200: the box census (`holds-its-box.test.ts`) knew one kind of late part and carried every top-layer overlay by an all
docs/governance/briefs/f1-doors-5a-ruling-1.md:15:4. THE STAFF MOVE'S DIAL — accepted as your default: `admin_move_listing_core`'s redeclaration calls `rate_gate('revise')` exactly where the transition used to, so the staff move's count and its `rateLimited` r
docs/governance/briefs/f1-doors-5a-ruling-1.md:17:5. THE REVIEWER'S DIAL — accepted: a reviewer's decision keeps spending `revise` as today; F1-6's roadmap line names `staff_moderation` for it.
docs/governance/briefs/f1-doors-5a-ruling-1.md:32:roadmap — under Foundations 1, F1-6: "The staff move's and the reviewer's decisions spend `staff_moderation`, not the seller's `revise` (F1-5a, ruling 1 §4, §5)."
docs/governance/briefs/tests-ci.md:90:FORWARD-SCAN: F1-5b, F1-6, F1-7 answer the item. REGISTER: none.
docs/governance/briefs/f1-doors-5b.md:12:LEFT: the buyer's readers (`listing_saved`, `my_saved_listings`, `my_viewing_location`, `listing_contact_refusals`, `listing_reveal_count` if it stays a reader — F1-7, INC-838); the typed result of every door call (F1-7
docs/governance/briefs/f1-doors-5b.md:16:FORWARD-SCAN: F1-6 (staff doors), F1-7 (the readers, the typed Result, the reset time); the buyer's messaging stage (a new owner door on the same form). REGISTER: the doors' row gains "the buyer's doors on the shell (F1
docs/governance/briefs/f1-doors-5a.md:19:FORWARD-SCAN: F1-5b (the buyer's doors reuse this family's owner proofs as the pattern), F1-6 (the staff's listing doors meet `transition_listing`'s staff path), F1-7 (the readers; the typed Result; the DROPs); the form
docs/governance/briefs/pkg-picomatch.md:22:STEP 0 — in a NEW chat, only when the F1-6a lane is at its migration stop with nothing uncommitted: `git status --short` empty (if it is not, STOP and say so — never stash or discard the other lane's work); `git fetch
docs/governance/briefs/f1-doors-2.md:15:LEFT: the families of F1-3 → F1-7 (the plan's §5); INC-1038's other three doors (F1-6); view-as v2 (DEC-373) rebuilds the impersonation doors in the Ops phase — today's two are moved onto the shell as they are, behaviour
docs/governance/briefs/f1-doors-2.md:60:INC-1038 — status line: `admin_update_profile` spends the dial `[name]` (F1-2, [commit]); three doors remain for F1-6.
docs/governance/briefs/f1-doors-3-ruling-2.md:33:4. YOUR QUESTION — correct the cell in this turn. The scope is widened to that one line of `scripts/doors/manifest.txt`: `admin_end_package_price`'s country cell becomes `row:package_prices.country_code`. The ro
docs/governance/briefs/f1-doors-5a-ruling-3.md:15:2. THE REPORT'S EIGHT DECISIONS — all accepted. (1) The split: fourteen files by concern, eight above about 25 KB by their proofs; DEC-322's size is a guide and "never inside a body" is the law — recorded, no c
````
