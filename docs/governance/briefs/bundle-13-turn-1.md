# Bundle 13 — photos, turn 1: the AI switches and meter, at the doors and on the server (D158, INC-600): brief, version 1 (saved unchanged, 2026-10-13)

```text
BUNDLE 13 — PHOTOS (D154–D159) — TURN 1 (2026-10-13). ONE TURN, ONE MIGRATION. Two new strings. No package change.
Base: dev 60f29722 (bundle 12's records landing). The census below proves every file by content. This file is public: it is written as build instructions.
Tier A: the migration (a resource and its two permissions, two closed tables, two service-only doors, two admin doors, their proofs), the public-surface allowlist lines, the meter module (src/server/ai/meter.ts) and every paid AI route that now asks it: the photo upload, the writing helper, the shop-name check, category pictures and icons, machine translation.
Tier B: the database types entry, the posting refusal map, the two strings, the selector's new area, the pool-reset map, the tests (three new E2E tests SV-1..SV-3, four new unit tests AIM-1..AIM-4 and one AIM-5 added to the icon route's test file), the generated usage maps, the docs, the roadmap and the changelog.

ANSWERS TO THE LAST TURN
- The records turn (bundle 12 closed): CLEAN. The nine files on dev equal the supervisor's copies byte for byte, and nothing outside scope changed. CI on its commit is the supervisor's to read.
- Your note that the uploads arrived under other names is harmless: you matched them by size and sha256, which is right. This brief now says so.

WHY THIS TURN
- The operator's decision D158 (2026-10-13): every AI feature has an on/off switch, a monthly budget and the spend so far; at its budget every feature switches itself off except photo screening, which only alerts; while photo screening is off, new photos are held for staff; a seller has daily limits.
- INC-600: today no AI feature has a switch or a budget. Every paid call (the photo screen, the writing helper, the shop-name check, category pictures and icons, machine translation) runs with per-seller hourly limits only.
- Bundle 13 builds D158 in three turns: this one (the doors and the server), then the page Admin › Services › AI, then photos held for staff. Until that third turn the switch for photo screening cannot be turned off: its door refuses.

WHAT THIS TURN BUILDS
- PART 1 — the migration (the appendix; read it whole):
  - A. The resource `services` and its permissions `view` (no second factor) and `manage` (a second factor). No role is granted them; the super admin holds every permission.
  - B. Two tables, closed to browser roles (RLS on, a deny policy for each verb, REVOKE from PUBLIC, anon and authenticated; service_role only):
    - `ai_features` — one row per feature: `enabled`, `off_reason` ('staff' | 'budget') and `off_at` when off; `monthly_budget_cents` (null = no budget); `unit` ('call' | 'character'); `unit_cost_microusd` (the price of one unit in millionths of a dollar); `alert_month` and `alert_level` (0, 80 or 100); `updated_at`, `updated_by`. A row named `e2e-…` is a test's scratch row: no code path names it, and the admin list leaves it out.
    - `ai_spend_days` — per feature and UTC day: `calls`, `units`, `cost_microusd`.
    - Six rows seeded: photo_screen (call, 2000), writing_helper (call, 3000), name_check (call, 300), category_images (call, 40000), category_icons (call, 300), translations (character, 20). No budget is set.
  - C. Two doors for the service role only (REVOKE from PUBLIC, anon and authenticated; GRANT EXECUTE TO service_role):
    - `ai_feature_gate(p_feature text) RETURNS jsonb` — `{ feature, on, off_reason }`. A feature its budget switched off in an earlier month reads as on.
    - `ai_record_spend(p_feature text, p_units integer) RETURNS jsonb` — one call and its units on today's row at the feature's price; an audit row `ai.budget_alert` at 80 % and at 100 % of the month's budget (once a level a month); at 100 % the feature switches off (`ai.budget_off`) — every feature except `photo_screen`, which only alerts; a feature its budget switched off in an earlier month comes back on first (`ai.budget_on`). Refuses negative units (`badValue:units`) and an unknown feature (`unknownFeature`).
  - D. Two admin doors (REVOKE from PUBLIC and anon; GRANT EXECUTE TO authenticated; GRANT ALL TO service_role). Each checks its own permission:
    - `admin_ai_features() RETURNS jsonb` — `services:view`; every feature (scratch rows left out) with its state, budget, unit, price, this month's spend, calls and units, today's calls and the month's alert level;
    - `admin_set_ai_feature(p_feature text, p_enabled boolean, p_monthly_budget_cents integer, p_unit_cost_microusd integer) RETURNS jsonb` — `services:manage` and a fresh second factor. It refuses photo screening off (`screeningStaysOn`), switching a feature on while the month's spend has reached the budget given (`overBudget`), an unknown feature (`unknownFeature`) and bad values (`badValue:enabled`, `badValue:budget`, `badValue:unitCost`). It writes an audit row `ai.feature_set` with the row before and after.
  - E. Proofs E1–E7: the headers, the grants, the closed tables, the seed and the permissions, the door bodies, the refusals with no caller and with a caller without the permission (a random id: no account is read), and the meter on a scratch feature `e2e-mig-…` inside a block that rolls itself back. They leave no row behind (audit_log is append-only, so the block's own rollback removes its audit rows).
- scripts/public-surface-allowlist.txt — two lines: `admin_ai_features` and `admin_set_ai_feature`. Without them the migration guard fails, naming both.
- src/integrations/supabase/types.ts — the two tables under Tables, in their alphabetical place (before `alias_history`); the four functions under Functions (`admin_ai_features` after `admin_add_category_pointer`; `admin_set_ai_feature` after `admin_set_account_status`; `ai_feature_gate` and `ai_record_spend` before `alias_next_change_at`).
- src/server/ai/meter.ts (NEW):
  - `AI_FEATURES`, the six features;
  - `aiGate(feature, log)` asks `ai_feature_gate` with the service role. Its answer is `{ on: true }` or `{ on: false, reason: 'staff' | 'budget' | 'unavailable' }`. A gate that cannot be read is OFF with the reason 'unavailable', and is logged: it fails closed;
  - `recordAiSpend(feature, units, log)` calls `ai_record_spend` with whole units. A failed write is logged and never thrown: the provider has already answered.
- The routes (each now asks its switch, and meters every answer the provider — or fake mode — gives):
  - src/routes/api/upload/photo.ts:
    - a daily dial after the hourly one: `consume_rate_limit('upload:day', …)`, `RATE_LIMIT_UPLOAD_PER_DAY`, 200, '1 day';
    - before the policy pass, `aiGate('photo_screen')`. Off can only be 'unavailable' until photos can be held, and it is the refusal `providerUnavailable` with `retry: true`;
    - after the pass, one call is metered unless the answer was `providerUnavailable`;
  - src/routes/api/listings/assist.ts:
    - `aiGate('writing_helper')` FIRST, before any dial, so a switched-off helper spends none of the seller's tries. Off is the refusal `featureOff`; 'unavailable' is `providerUnavailable`;
    - a daily dial after the hourly one: `assist:day`, `RATE_LIMIT_ASSIST_PER_DAY`, 60;
    - one call is metered for each answer, fake mode's too;
  - src/routes/api/listings/identity.ts — a new seller name. When `name_check` is off (or unreadable), the name is not asked about: it goes to the door unchecked and is audited `alias.unchecked`, exactly as when the provider cannot answer. An answer that checked the name is metered;
  - src/routes/api/admin/categories/generate-image.ts (POST and the probe GET) — `category_images`. Off answers 409 `{ error, stage: 'switched-off' }`; unreadable answers 503. One image is metered;
  - src/routes/api/admin/categories/suggest-icon.ts — `category_icons`, the same answers. One answer is metered;
  - src/routes/api/translate.ts (POST) — `translations`, after the permission gate and before the provider. Off answers 409; unreadable answers 503. The characters of every chunk the provider answered (all items in fake mode) are metered once.
- src/features/posting/refusal-text.ts — `featureOff` maps to `post.refusal.featureOff`.
- The strings (both languages, listed key by key below): `post.refusal.featureOff` and `admin.roles.perm.resource.services`.
- scripts/e2e-select.ts — a new area `admin-services` (src: src/server/ai/**, src/routes/admin.services*.tsx, src/features/admin-services/**; spec: e2e/admin-services.spec.ts).
- e2e/helpers/pool-reset-map.ts — `ai_features` is EXEMPT (its `updated_by` is attribution on a global switch row). Without this line the pool-reset guard fails.
- docs/generated/i18n-usage.json and public/i18n-usage.json — regenerated (one more file scanned).
- docs/features/ai-services.md (NEW), the changelog, and the roadmap (line 3, and the turn-1 line under bundle 13).

THE TWO STRINGS (G43 — the supervisor wrote the Amharic; the carrier carries both exactly)
- `post.refusal.featureOff` — "The writing help is switched off for now." · «የመጻፍ እገዛው ለጊዜው ተዘግቷል።»
- `admin.roles.perm.resource.services` — "Services" · «አገልግሎቶች»

DECIDED BY THE SUPERVISOR (listed to the operator; his paste approves them)
- The door half lands first, the page next, the hold for staff third. Photo screening's switch cannot be turned off until the hold exists.
- A gate that cannot be read is OFF (fails closed). A meter write that fails is logged and never fails the seller, who has the answer already.
- A budget-off feature comes back on at the start of the next month (UTC): each month's budget starts again.
- Switching on a feature at or over its budget is refused (`overBudget`): raise or clear the budget first.
- The starting prices are ESTIMATES, edited by staff: $0.002 a photo screen, $0.003 a writing suggestion, $0.0003 a name check or icon suggestion, $0.04 a category picture, $20 per million characters translated. No budget is set by the migration: the operator sets them on the page next turn.
- The shop-name check, switched off, lets the name through unchecked and audited, as today when the provider cannot answer; it never blocks a seller.
- Daily limits: 200 uploads and 60 writing suggestions a seller a day, over the hourly 60 and 30.
- The 80 % and 100 % alerts are audit rows until the app has an e-mail sender (DEC-091's sender); the page shows them next turn.
- Fake mode is gated and metered, so a switch behaves the same on ethio-staging.
- The new ids: SV-1..SV-3 (E2E), AIM-1..AIM-5 (unit).

TESTS
- E2E (e2e/admin-services.spec.ts, NEW):
  - SV-1 — a leased seller is refused `permission denied` by both admin doors; the two meter doors are not executable for the seller; both tables refuse the seller's read.
  - SV-2 — the super admin reads the six features (and no scratch row): translations' unit is 'character' and photo screening is on. The door refuses photo screening off, an unknown feature, a budget of -1 and a price of -1. On a scratch feature `e2e-sv-…` it switches off (reason 'staff', the budget and the price saved, `updated_by` the admin) and back on (budget cleared), writing two `ai.feature_set` rows.
  - SV-3 — the meter through the service role (the app's own connection): a scratch feature at 1,000 a unit with a budget of 1 cent. Spending 5, 3 and 2 units gives levels 0, 80 and 100, off at the budget, and the gate's answer off for 'budget'. The day rows sum to 3 calls, 10 units, 10,000. The audit rows are two alerts and one off. Negative units and an unknown feature are refused.
  - G27: no real switch row is changed; every scratch row is deleted in `finally` (its day rows cascade; audit rows are append-only and stay).
  - Leases: SV-1 leases one seller; SV-2 uses the job's super admin; SV-3 leases none.
- Unit: AIM-1..AIM-4 (src/server/ai/meter.test.ts, NEW) — the gate's answers, the gate failing closed, whole units and a meter that never throws, and the six features. AIM-5 (added to src/server/category-images/suggest-icon-route.test.ts, with the meter mocked for its other tests): switched off, the route answers 409 and asks the provider nothing; unreadable, 503; switched on, one answer is metered.
- Not edited: every other test.
- Red first: new behaviour, no red run (G38). On the base SV-1 fails at its first call (no such function), and the unit tests fail at their import.
- The migration's proofs E1–E7. The supervisor applied the migration to a local PostgreSQL 16 copy, with stand-ins for `resources`, `permissions`, `audit_log` (append-only), `has_permission`, `require_step_up_if_needed`, `auth.users`, `auth.uid()` and Supabase's default grants to anon and authenticated:
  - it applied, and its proofs passed, leaving no row;
  - with a stand-in admin: no second factor gave P0009; photo screening off gave `screeningStaysOn`; switching on under a spent budget gave `overBudget`; the writing helper went off at its budget after an 80 % alert; photo screening at 100 % stayed on with both alerts;
  - with photo screening allowed to switch itself off, E5 fails; with the gate granted to authenticated, E2 fails;
  - without the two allowlist lines, the migration guard fails, naming `admin_ai_features` and `admin_set_ai_feature`.

WHAT THE SUPERVISOR RAN BEFORE WRITING THIS (its own copy, dev 60f29722 with this turn's files)
- Clean:
  - typecheck (it covers e2e/), format, lint (0 errors, 33 warnings);
  - 751 unit tests (127 files);
  - the usage maps (regenerated; they match);
  - the hardcoded-strings guard (0 findings);
  - the selector self-test.
- `MIGRATIONS_DIR=<a copy with the migration as 20261013190000_b13t1-check.sql, its mark filled> bash scripts/check-migrations.sh`: "Migration guard OK" (born-closed, definer, self-marking, public-surface, real-row proof).

STEP 0 — save this file byte for byte as docs/governance/briefs/bundle-13-turn-1.md. (roadmap.md line 3 comes from the carrier.)

HOW TO WORK
- Order of the turn:
  1. the CI read — read https://raw.githubusercontent.com/tesfayekb/ethio-marketplace/ci-evidence/docs/tracking/ci-status.md and paste its first six lines. It may name the records commit 60f29722 or the commit before it, with any conclusion. Whatever it shows, go on: the CI read is the supervisor's, and a fix it needs comes in the next turn. Do not stop on it. You cannot git-fetch that branch. Paste `git rev-parse HEAD`: this is <START>;
  2. step 0;
  3. the census (below). If any result differs from what it expects, STOP and report: write nothing else;
  4. the carrier, then the hashes;
  5. the checks;
  6. the migration LAST, then its read-back;
  7. the report;
  8. END THE TURN.
  Do not stop between steps.
- The migration is the last thing written, because the database tool applies it on ethio-prod the moment it is saved. The operator will see the "Modify Supabase database" dialog and allow it. The published site keeps its old code until the operator Publishes, so ethio-prod has the doors before any code calls them.
- The expected red window (G35): CI on any commit the platform pushes before the migration file is in the tree runs the new routes against an ethio-staging without the switches. There every AI route answers as if its switch could not be read: photos are refused `providerUnavailable`, the writing helper too, category pictures and icons and translations answer 503, and SV-1..SV-3 fail. That is expected and is not fixed. CI on the final commit waits at its preflight ("STAGING BEHIND", up to 25 minutes) until the operator applies the migration on ethio-staging.
- If any rule of yours conflicts with the text, STOP before saving and quote that rule's exact words in the report.
- Production reads are SELECT-only. Reports carry counts, booleans and names of tables, columns, functions, roles and policies. Never an e-mail address, a user id, a token, a phone number or a row of user data.
- Tests (G38): no assertion loosened, no timeout raised, no retry added. A test this brief does not name is not edited.
- Scope — these files only: the one new migration file (the database tool names it), the 22 carrier paths and the brief. The platform may regenerate src/integrations/supabase/types.ts; that is allowed, name it in the report. Name any other file in the report's first lines, with its reason. Delete no file. Do not use a patch tool.

THE CENSUS (paste each result)
- (a) `git status --porcelain` → only `?? docs/governance/briefs/bundle-13-turn-1.md`, or nothing if the platform has already committed the brief.
- (b) `sha256sum` of these 18 files → each equal to:
  4df382bb78e7f800e8717221ab11ce492736d79f992dc0a8fc156f5e2f0f3f50  docs/_changelog.md
  d6a2fb86447b561cb981dcce7772d7c74d91459aaf93ce3f8c2be143ad28211d  docs/generated/i18n-usage.json
  6f0303d10a87d6c0c3b4b431e6f082483ade861daac1f14b03b79ad1d17b93b5  e2e/helpers/pool-reset-map.ts
  d6a2fb86447b561cb981dcce7772d7c74d91459aaf93ce3f8c2be143ad28211d  public/i18n-usage.json
  3e7a96e8d7ebdfc6e719be34b9a3e1fbc9c20cf42f040a7d6755f8cc5b411370  roadmap.md
  0b28358605524952877f20ef709647ed08df9397d11fe778c868b2c33e42fad6  scripts/e2e-select.ts
  4a8945ceeb2d40846522f0aa9e605731d6f4c4c05f9677962acfc967af7bb4ab  scripts/public-surface-allowlist.txt
  a86b8c919899e1894da17e33a8b958cd2a424cc110b7c91d2eff0b7467da10b5  src/features/posting/refusal-text.ts
  b7a91cedb52c17df339e9b072ae2c502b47fa763c9cbf279c6800b4328e9726c  src/i18n/locales/am.ts
  a5a6d98a148f8135f2bfbc15c22bc10161c6016096fa57c805e6884cbec28931  src/i18n/locales/en.ts
  8749ed39da2ce333afa73be9498e7ee75257afddfda454bb2022e6f86f457266  src/integrations/supabase/types.ts
  22c8188fcb926994107669bb0f9e8637f5c0fc4593046dc09039e86652eea0cb  src/routes/api/admin/categories/generate-image.ts
  4822e4dbd3cd5c84b155affc526ff6a59f60a0ef7b3fd3789bc0d2900fce2f93  src/routes/api/admin/categories/suggest-icon.ts
  f02b1676590a192d58a823b36df4cb57611dce3af3c10c8cafcd052628669528  src/routes/api/listings/assist.ts
  329ab31e18caccad5958cc90428bff355da5f91311559c5277011054208ee23e  src/routes/api/listings/identity.ts
  690a0e5786467d443b33797a64187a36b5aa4434beb321cb1ae96db8e83a85d7  src/routes/api/translate.ts
  daaf41ec40bafcf8ec76bebd2314d839c66c1ae44e67a430b7fde0312dad44c0  src/routes/api/upload/photo.ts
  72fa1449e0f1ea1edf8217e862eef216214a4f96af53920b464ed78b212d2970  src/server/category-images/suggest-icon-route.test.ts
- (c) `ls src/server/ai e2e/admin-services.spec.ts docs/features/ai-services.md` → none exists.
- On ethio-prod with your query tool (SELECT only):
- (d) `select count(*) from pg_proc where proname in ('ai_feature_gate', 'ai_record_spend', 'admin_ai_features', 'admin_set_ai_feature');` → 0, and `select to_regclass('public.ai_features') is null, to_regclass('public.ai_spend_days') is null, (select count(*) from public.resources where name = 'services');` → t | t | 0. Anything else is a STOP.
- (e) `select max(version) from public.migration_marks;` → 20261014050000

THE CARRIER — B13T1-TURN-CARRIER-2026-10-13.md (44,941 bytes; sha256 fcaa34d28ae45cd1cd7e743ca23bc5cc33ef16d443d041ebc6ad8e3f6de2d162; 51 sections)
- Its first line starts "B13T1 TURN CARRIER". Each section starts with a line `===== <path> ===== <mode>`. No blank line separates the sections.
- Modes:
  - REPLACE: the section is the whole file;
  - NEW: a new file; the section is the whole file;
  - APPEND: added at the end of the file;
  - INSERT-AFTER <n>: insert the section's lines after line n of the file (INSERT-AFTER 0: at the top of the file);
  - REPLACE-LINES <a>-<b>: replace lines a to b of the file (both included) by the section's lines.
  - Lines are counted from 1, as the pieces you get by splitting the file on newline characters. A section ends with a newline; that newline ends its last line and adds no empty line. A file with several sections lists them from the bottom of the file up, so every number is a line number of the census's file: take them in carrier order.
- Check the carrier's sha256 first. Write every section by script. The carrier is never committed. If your upload arrives under another name, match it by its size and sha256.

THE HASHES — `sha256sum` each of the 22 paths below; each must equal the table. On any mismatch, STOP. Also paste the saved brief's sha256sum.
  1dd4f174a16fb5fdae475b2d6f5c5b15e7115df075888790d6e8f590c43ea87f  docs/_changelog.md
  6fe7b6853b5be5e1deb3e48577fe2feb7e936d33b2b647095b7d7ed03bc96e30  docs/features/ai-services.md
  ffd3895831535e354047ec28f0e9aeb57044f901affcf19843d056f89354acf3  docs/generated/i18n-usage.json
  13c72fcc18a061b143e84db6177a2a0f2d6f35d7e26d0cc94211ddbc97dd65d7  e2e/admin-services.spec.ts
  7e675a0c665c8d8bca666d7e3e12b4e87fc355725379a4e73cc55b61267827ae  e2e/helpers/pool-reset-map.ts
  ffd3895831535e354047ec28f0e9aeb57044f901affcf19843d056f89354acf3  public/i18n-usage.json
  5ce481bd5c38bf75f6be50002657b0c864ee860c796927b125c11eb36722e7d4  roadmap.md
  a9036fe608ff65ba93b5ba7886a5efffbd7a628f4cfacc833b7f830edd684c40  scripts/e2e-select.ts
  65582f204a4296e6b2a2988935e0eb5693e3b5354f6107b21d1567cfe1401249  scripts/public-surface-allowlist.txt
  3102a8bf719b0af20eb3c5dfa5721fb4c9dc5fc1f03f8099eb64b086a14d578d  src/features/posting/refusal-text.ts
  7e51c176036f1504c64233e9a06b7d39826303277706089e295182078dc6784e  src/i18n/locales/am.ts
  bd84f3571fb06d35bfe9b13b339a1d68616a9432550e23f50d238247b5ff032a  src/i18n/locales/en.ts
  1816516b0e2034ef1bb006f02edc83023d480872d424521e40285d82a9190db8  src/integrations/supabase/types.ts
  c0088aa455676f20f3dff31402f29235e36f507b3a874ca6eab8749ff3317740  src/routes/api/admin/categories/generate-image.ts
  039f385e64299304aa6ef58762533aa61cc3681eb3353f5bc7cabc8757ab7fa7  src/routes/api/admin/categories/suggest-icon.ts
  eb557cb7543024520affe633b81c3d733b4b93edb2c0ed8fdea10d7e379e2caa  src/routes/api/listings/assist.ts
  edc343448ed09e18f7fa3f50298b0d538b8b96238bf8d1573ad95922f512cc8e  src/routes/api/listings/identity.ts
  fbc06a80d76f68556c9b34ed5b68035e8d34ffff436e12b6272aab87a90fd7c6  src/routes/api/translate.ts
  100cd53b8952d46f3d324d308572e2eebee02b9c4ea1429032ff6f74a7fef525  src/routes/api/upload/photo.ts
  5db594036876fd8828d0f336d5ae25bfd9760bdf3e5633cce62328285064f398  src/server/ai/meter.test.ts
  c4489c02fc9aa580fc9ad5c8afbbb4bda24f759e642cc53afb21baa9d488d3f8  src/server/ai/meter.ts
  5994a8678550e7dc34e609c8420f5006b442c8692a14b548e9a6f5953d5f5623  src/server/category-images/suggest-icon-route.test.ts

THE CHECKS — run each whole, as CI runs it, and paste the last line. The supervisor's results on its own copy (not lock-exact, INC-420):
- `bun run format:check` clean;
- `bun run lint` 0 errors / 33 warnings;
- `bun run test:unit 2>&1 | tee /tmp/unit-b13t1.log` — 751 passed (127 files). Keep the whole output; if any test fails, paste its name and its first error line;
- `bun run i18n:map-guard` "usage maps match the tree." (the carrier already holds the regenerated maps);
- `bash scripts/check-hardcoded-strings.sh` "findings: 0";
- `bun run scripts/e2e-select.ts --self-test` OK;
- Not run by you: the typecheck, the build and the bundle budget (your platform's rule: "Do not run the Lovable project's builds or typechecks manually because the harness runs them automatically."). CI's jobs judge them; the supervisor ran the typecheck on its own copy.

THE BROWSER RUN — not this turn: the local browser does not start (INC-506). CI on the final commit runs SV-1..SV-3 and every spec of the four areas the migration names.

THE MIGRATION RULES (G39 — every one applies)
- The text is between the BEGIN and END lines of the appendix below. Write it EXACTLY, changing only `<MARK>`. Before the change, its sha256 is 5b07deb5288775c2617a354a155db039276b920f3845701c391d9e91038fc9b1 (26,799 bytes, 488 lines, ending with a newline).
- Check it in a scratch folder first (after the carrier, so the allowlist lines are in place):
  - copy supabase/migrations/*.sql into a temporary folder;
  - add the text, its `<MARK>` replaced by the mark you will use, under the name 20261013190000_b13t1-check.sql (a stamp earlier than any mark you will choose);
  - run `MIGRATIONS_DIR=<that folder> bash scripts/check-migrations.sh`.
  Paste its "guard OK" lines and "Migration guard OK".
- `<MARK>` is chosen at apply time:
  - read now() at time zone 'utc' on ethio-prod;
  - round it up to the next whole hour and add one hour (add twelve hours instead if the save dialog may wait);
  - the mark must be later than the saved file's own stamp AND above 20261014050000 (the newest mark): if the reading gives 20261014050000 or less, use 20261014060000.
- Then hand the FINAL text to the database tool ONCE. Never a stub, a comment or a draft (INC-491).
- A clean apply is the proofs' pass: they RAISE EXCEPTION on any failure.

THE READ-BACK (ethio-prod, your query tool, SELECT only; paste each result)
- `select version from public.migration_marks where version = '<MARK>';` → one row;
- `select proname, md5(prosrc), length(prosrc), provolatile, prosecdef, proconfig from pg_proc where proname in ('ai_feature_gate', 'ai_record_spend', 'admin_ai_features', 'admin_set_ai_feature') order by 1;` →
    admin_ai_features | fe97165ba126161e6ec01d124724ee9f | 1868 | s | t | {search_path=public}
    admin_set_ai_feature | f2fff58887e0392c868682a00374f70c | 2967 | v | t | {search_path=public}
    ai_feature_gate | cf1eee7ab8de747c710dd07eb12514fa | 527 | s | t | {search_path=public}
    ai_record_spend | 4221db8e42fff316dc7f2ae8328e2bf8 | 3185 | v | t | {search_path=public}
- `select has_function_privilege('authenticated', 'public.ai_feature_gate(text)', 'EXECUTE'), has_function_privilege('authenticated', 'public.ai_record_spend(text, integer)', 'EXECUTE'), has_function_privilege('anon', 'public.admin_ai_features()', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_ai_features()', 'EXECUTE'), has_function_privilege('authenticated', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE');` → f | f | f | t | t;
- `select feature, enabled, unit, unit_cost_microusd, monthly_budget_cents is null from public.ai_features order by feature;` → category_icons t call 300 t; category_images t call 40000 t; name_check t call 300 t; photo_screen t call 2000 t; translations t character 20 t; writing_helper t call 3000 t. If your query tool cannot read this table, paste its error and go on: it is not a STOP;
- `select c.relname, c.relrowsecurity from pg_class c where c.oid in ('public.ai_features'::regclass, 'public.ai_spend_days'::regclass) order by 1;` → ai_features t; ai_spend_days t;
- `select p.action, p.requires_step_up from public.permissions p join public.resources r on r.id = p.resource_id where r.name = 'services' order by 1;` → manage t; view f.

THE REPORT
- Done or not done, by step.
- The six ci-status lines, and <START>.
- The census results (a)–(e).
- The 22 sha256sum lines and the brief's.
- `git diff --name-only <START>` plus `git ls-files --others --exclude-standard`. If the platform committed mid-turn, give `git diff --name-only <START> HEAD` too. Expect the 22 carrier paths, the brief and the one migration file (and types.ts if regenerated). `git ls-files` of the four new files, so they are shown tracked (G20).
- The checks.
- The two strings, each key with its English and its Amharic, as written (G43).
- The check-migrations "guard OK" lines; the mark and the now() reading it came from; the apply outcome; the read-back.
- The line "apply <uuid-fragment of the migration's filename> → expect mark <MARK>", for the operator's staging apply.
- Anything not foreseen.

REVERT: `git revert <commit>` (forward only). The database change is undone only by a new migration — never by editing this file.

AFTER THIS TURN (for the operator): apply the migration on ethio-staging (the SQL editor) and read back its mark; CI's preflight waits for it (up to 25 minutes) — if the run has already failed at the preflight, use "Re-run failed jobs". Publish once CI is green on the final commit. No walk for this turn: it has no screen; the next turn's page is walked.

APPENDIX — THE MIGRATION TEXT (write it exactly; change only <MARK>)
----- BEGIN MIGRATION -----
-- Bundle 13 (photos, D154–D159), turn 1 (2026-10-13). Tier A. The AI meter and switches (D158, INC-600).
-- e2e-areas: admin-services, posting, admin-categories, admin-translations
-- The rule (D158, the operator, 2026-10-13): every AI feature has an on/off switch, a monthly budget and the spend so
-- far; at its budget every feature switches itself off except photo screening, which only alerts. This file is the
-- door half: the switches and the meter. The page (Admin › Services › AI) is the next turn; photos held for staff
-- while screening is off come after it, so until then photo screening cannot be switched off (its door refuses).
-- A. The resource `services` and its permissions: view (no second factor) and manage (a second factor, as every
--    admin change). No role is granted either: the super admin holds every permission (has_permission).
-- B. Two tables, closed to browser roles (RLS on, deny policies, service_role only):
--    ai_features — one row per AI feature: on/off and why, the monthly budget in cents (null = none), the price of
--      one unit in millionths of a dollar (an ESTIMATE until the provider's bill; staff edit it), the unit (a call,
--      or a character for translations), the month's alert level; six rows seeded. A row named e2e-… is a test's
--      scratch row: no code path names it and the admin list leaves it out.
--    ai_spend_days — per feature and UTC day: calls, units and cost.
-- C. Two service-only doors (no browser role may call them; the server calls them with the service role):
--    ai_feature_gate(feature) — on, or off with its reason; a feature switched off by its budget in an earlier month
--      reads as on (each month's budget starts again);
--    ai_record_spend(feature, units) — one call and its units on today's row at the feature's price; at 80 % and at
--      100 % of the budget an audit row ('ai.budget_alert', once a level a month); at 100 % the feature switches off
--      ('ai.budget_off'), photo screening excepted; a budget-off feature from an earlier month comes back on first
--      ('ai.budget_on').
-- D. Two admin doors (authenticated; each checks its permission itself):
--    admin_ai_features() — services:view; every feature with its state, budget, price and this month's spend;
--    admin_set_ai_feature(feature, enabled, budget, price) — services:manage and a fresh second factor; refuses
--      switching photo screening off (screeningStaysOn), switching on a feature at or over a budget (overBudget), and
--      bad values; writes an audit row ('ai.feature_set') with the row before and after.
-- E. Proofs on scratch rows inside a block that rolls itself back, so they leave no row (audit_log is append-only).

-- ===== A — the resource and its permissions =====
INSERT INTO public.resources (name, display_name, description)
VALUES ('services', 'Services', 'Outside services: the AI switches, budgets and spend (D158; DEC-091)')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.permissions (resource_id, action, description, requires_step_up, assignable)
SELECT r.id, v.action, v.descr, v.step_up, true
  FROM public.resources r
  CROSS JOIN (VALUES
    ('view',   'See the AI features, their switches, budgets and spend', false),
    ('manage', 'Switch an AI feature on or off, set its budget and its price', true)
  ) AS v(action, descr, step_up)
 WHERE r.name = 'services'
   AND NOT EXISTS (
     SELECT 1 FROM public.permissions p
      WHERE p.resource_id = r.id AND p.action = v.action);

-- ===== B — the tables =====
CREATE TABLE public.ai_features (
  feature text PRIMARY KEY
    CONSTRAINT ai_features_feature_check CHECK (
      feature IN ('photo_screen', 'writing_helper', 'name_check', 'category_images', 'category_icons', 'translations')
      OR feature ~ '^e2e-[a-z0-9-]{1,40}$'),
  enabled boolean NOT NULL DEFAULT true,
  off_reason text NULL CONSTRAINT ai_features_off_reason_check CHECK (off_reason IN ('staff', 'budget')),
  off_at timestamptz NULL,
  monthly_budget_cents integer NULL
    CONSTRAINT ai_features_budget_check CHECK (monthly_budget_cents BETWEEN 0 AND 100000000),
  unit text NOT NULL DEFAULT 'call' CONSTRAINT ai_features_unit_check CHECK (unit IN ('call', 'character')),
  unit_cost_microusd integer NOT NULL
    CONSTRAINT ai_features_unit_cost_check CHECK (unit_cost_microusd BETWEEN 0 AND 10000000),
  alert_month date NULL,
  alert_level smallint NOT NULL DEFAULT 0 CONSTRAINT ai_features_alert_level_check CHECK (alert_level IN (0, 80, 100)),
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid NULL REFERENCES auth.users(id) ON DELETE SET NULL,
  CONSTRAINT ai_features_off_check CHECK (
    (enabled AND off_reason IS NULL AND off_at IS NULL) OR (NOT enabled AND off_reason IS NOT NULL AND off_at IS NOT NULL))
);

CREATE TABLE public.ai_spend_days (
  feature text NOT NULL REFERENCES public.ai_features(feature) ON DELETE CASCADE,
  day date NOT NULL,
  calls integer NOT NULL DEFAULT 0 CONSTRAINT ai_spend_days_calls_check CHECK (calls >= 0),
  units bigint NOT NULL DEFAULT 0 CONSTRAINT ai_spend_days_units_check CHECK (units >= 0),
  cost_microusd bigint NOT NULL DEFAULT 0 CONSTRAINT ai_spend_days_cost_check CHECK (cost_microusd >= 0),
  PRIMARY KEY (feature, day)
);

DO $acl$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['ai_features', 'ai_spend_days'] LOOP
    EXECUTE format('REVOKE ALL ON public.%I FROM PUBLIC, anon, authenticated', t);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR SELECT TO anon, authenticated USING (false)', t || '_deny_select', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR INSERT TO anon, authenticated WITH CHECK (false)', t || '_deny_insert', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR UPDATE TO anon, authenticated USING (false)', t || '_deny_update', t);
    EXECUTE format('CREATE POLICY %I ON public.%I FOR DELETE TO anon, authenticated USING (false)', t || '_deny_delete', t);
  END LOOP;
END $acl$;

-- The six features and their starting prices (ESTIMATES, edited by staff): photo screening $0.002 an upload (three
-- sizes, one call); the writing helper $0.003 a call; the shop-name check $0.0003; a category picture $0.04; an icon
-- suggestion $0.0003; machine translation $20 per million characters. No budget is set: the operator sets them.
INSERT INTO public.ai_features (feature, unit, unit_cost_microusd) VALUES
  ('photo_screen',    'call',      2000),
  ('writing_helper',  'call',      3000),
  ('name_check',      'call',       300),
  ('category_images', 'call',     40000),
  ('category_icons',  'call',       300),
  ('translations',    'character',   20)
ON CONFLICT (feature) DO NOTHING;

-- ===== C — the service-only doors =====
CREATE OR REPLACE FUNCTION public.ai_feature_gate(p_feature text)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v       public.ai_features%ROWTYPE;
  v_month timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_on    boolean;
BEGIN
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  RETURN jsonb_build_object('feature', v.feature, 'on', v_on,
                            'off_reason', CASE WHEN v_on THEN NULL ELSE v.off_reason END);
END;
$$;

REVOKE ALL ON FUNCTION public.ai_feature_gate(text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_feature_gate(text) TO service_role;

CREATE OR REPLACE FUNCTION public.ai_record_spend(p_feature text, p_units integer)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v         public.ai_features%ROWTYPE;
  v_day     date := (now() AT TIME ZONE 'utc')::date;
  v_first   date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month   timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_cost    bigint;
  v_spent   bigint;
  v_budget  bigint;
  v_level   smallint := 0;
BEGIN
  IF p_units IS NULL OR p_units < 0 THEN RAISE EXCEPTION 'badValue:units'; END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- A new month: the alert level starts again, and a feature its budget switched off in an earlier month comes back on.
  IF v.alert_month IS DISTINCT FROM v_first THEN
    v.alert_month := v_first;
    v.alert_level := 0;
  END IF;
  IF NOT v.enabled AND v.off_reason = 'budget' AND v.off_at < v_month THEN
    v.enabled := true;
    v.off_reason := NULL;
    v.off_at := NULL;
    INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
    VALUES (NULL, 'ai.budget_on', 'ai_feature', v.feature, jsonb_build_object('month', v_first));
  END IF;
  v_cost := p_units::bigint * v.unit_cost_microusd;
  INSERT INTO public.ai_spend_days AS d (feature, day, calls, units, cost_microusd)
  VALUES (v.feature, v_day, 1, p_units, v_cost)
  ON CONFLICT (feature, day) DO UPDATE
    SET calls = d.calls + 1,
        units = d.units + EXCLUDED.units,
        cost_microusd = d.cost_microusd + EXCLUDED.cost_microusd;
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF v.monthly_budget_cents IS NOT NULL THEN
    v_budget := v.monthly_budget_cents::bigint * 10000;
    v_level := CASE WHEN v_spent >= v_budget THEN 100
                    WHEN v_spent * 10 >= v_budget * 8 THEN 80
                    ELSE 0 END;
    IF v_level > v.alert_level THEN
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'ai.budget_alert', 'ai_feature', v.feature,
              jsonb_build_object('level', v_level, 'spent_microusd', v_spent,
                                 'budget_cents', v.monthly_budget_cents));
      v.alert_level := v_level;
    END IF;
    -- D158: at the budget every feature switches itself off except photo screening, which only alerts.
    IF v_level = 100 AND v.enabled AND v.feature <> 'photo_screen' THEN
      v.enabled := false;
      v.off_reason := 'budget';
      v.off_at := now();
      INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
      VALUES (NULL, 'ai.budget_off', 'ai_feature', v.feature,
              jsonb_build_object('spent_microusd', v_spent, 'budget_cents', v.monthly_budget_cents));
    END IF;
  END IF;
  UPDATE public.ai_features
     SET enabled = v.enabled, off_reason = v.off_reason, off_at = v.off_at,
         alert_month = v.alert_month, alert_level = v.alert_level
   WHERE feature = v.feature;
  RETURN jsonb_build_object('feature', v.feature, 'on', v.enabled, 'spent_microusd', v_spent,
                            'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.ai_record_spend(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.ai_record_spend(text, integer) TO service_role;

-- ===== D — the admin doors =====
CREATE OR REPLACE FUNCTION public.admin_ai_features()
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid   uuid := auth.uid();
  v_first date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_today date := (now() AT TIME ZONE 'utc')::date;
  v_month timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'view') THEN RAISE EXCEPTION 'permission denied'; END IF;
  RETURN coalesce((
    SELECT jsonb_agg(jsonb_build_object(
             'feature', f.feature,
             'on', f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month),
             'off_reason', CASE WHEN f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month)
                                THEN NULL ELSE f.off_reason END,
             'off_at', CASE WHEN f.enabled OR (f.off_reason = 'budget' AND f.off_at < v_month)
                            THEN NULL ELSE f.off_at END,
             'monthly_budget_cents', f.monthly_budget_cents,
             'unit', f.unit,
             'unit_cost_microusd', f.unit_cost_microusd,
             'month_spent_microusd', coalesce(m.cost, 0),
             'month_calls', coalesce(m.calls, 0),
             'month_units', coalesce(m.units, 0),
             'today_calls', coalesce(t.calls, 0),
             'alert_level', CASE WHEN f.alert_month = v_first THEN f.alert_level ELSE 0 END,
             'updated_at', f.updated_at)
           ORDER BY f.feature)
      FROM public.ai_features f
      LEFT JOIN LATERAL (
        SELECT sum(s.cost_microusd)::bigint AS cost, sum(s.calls)::bigint AS calls, sum(s.units)::bigint AS units
          FROM public.ai_spend_days s
         WHERE s.feature = f.feature AND s.day >= v_first) m ON true
      LEFT JOIN public.ai_spend_days t ON t.feature = f.feature AND t.day = v_today
     WHERE f.feature !~ '^e2e-'), '[]'::jsonb);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_ai_features() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_ai_features() TO authenticated;
GRANT ALL ON FUNCTION public.admin_ai_features() TO service_role;

CREATE OR REPLACE FUNCTION public.admin_set_ai_feature(
  p_feature text,
  p_enabled boolean,
  p_monthly_budget_cents integer,
  p_unit_cost_microusd integer
)
RETURNS jsonb
LANGUAGE plpgsql
VOLATILE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_uid    uuid := auth.uid();
  v        public.ai_features%ROWTYPE;
  v_before jsonb;
  v_first  date := date_trunc('month', now() AT TIME ZONE 'utc')::date;
  v_month  timestamptz := (date_trunc('month', now() AT TIME ZONE 'utc')) AT TIME ZONE 'utc';
  v_spent  bigint;
  v_level  smallint := 0;
  v_on     boolean;
BEGIN
  IF v_uid IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
  IF NOT public.has_permission(v_uid, 'services', 'manage') THEN RAISE EXCEPTION 'permission denied'; END IF;
  PERFORM public.require_step_up_if_needed('services', 'manage');
  IF p_enabled IS NULL THEN RAISE EXCEPTION 'badValue:enabled'; END IF;
  IF p_unit_cost_microusd IS NULL OR p_unit_cost_microusd < 0 OR p_unit_cost_microusd > 10000000 THEN
    RAISE EXCEPTION 'badValue:unitCost';
  END IF;
  IF p_monthly_budget_cents IS NOT NULL AND (p_monthly_budget_cents < 0 OR p_monthly_budget_cents > 100000000) THEN
    RAISE EXCEPTION 'badValue:budget';
  END IF;
  SELECT * INTO v FROM public.ai_features WHERE feature = p_feature FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'unknownFeature'; END IF;
  -- Until photos can be held for staff (bundle 13), photo screening stays on.
  IF v.feature = 'photo_screen' AND NOT p_enabled THEN RAISE EXCEPTION 'screeningStaysOn'; END IF;
  v_before := to_jsonb(v) - 'updated_by';
  SELECT coalesce(sum(s.cost_microusd), 0)::bigint INTO v_spent
    FROM public.ai_spend_days s
   WHERE s.feature = v.feature AND s.day >= v_first;
  IF p_monthly_budget_cents IS NOT NULL THEN
    v_level := CASE WHEN v_spent >= p_monthly_budget_cents::bigint * 10000 THEN 100
                    WHEN v_spent * 10 >= p_monthly_budget_cents::bigint * 10000 * 8 THEN 80
                    ELSE 0 END;
  END IF;
  IF p_enabled AND v_level = 100 AND v.feature <> 'photo_screen' THEN RAISE EXCEPTION 'overBudget'; END IF;
  v_on := v.enabled OR (v.off_reason = 'budget' AND v.off_at < v_month);
  UPDATE public.ai_features
     SET enabled = p_enabled,
         off_reason = CASE WHEN p_enabled THEN NULL WHEN v_on THEN 'staff' ELSE v.off_reason END,
         off_at = CASE WHEN p_enabled THEN NULL WHEN v_on THEN now() ELSE v.off_at END,
         monthly_budget_cents = p_monthly_budget_cents,
         unit_cost_microusd = p_unit_cost_microusd,
         alert_month = v_first,
         alert_level = v_level,
         updated_at = now(),
         updated_by = v_uid
   WHERE feature = v.feature
  RETURNING * INTO v;
  INSERT INTO public.audit_log (actor_id, action, entity_type, entity_id, meta)
  VALUES (v_uid, 'ai.feature_set', 'ai_feature', v.feature,
          jsonb_build_object('before', v_before, 'after', to_jsonb(v) - 'updated_by'));
  RETURN jsonb_build_object('ok', true, 'feature', v.feature, 'on', v.enabled, 'off_reason', v.off_reason,
                            'monthly_budget_cents', v.monthly_budget_cents,
                            'unit_cost_microusd', v.unit_cost_microusd, 'alert_level', v.alert_level);
END;
$$;

REVOKE ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO authenticated;
GRANT ALL ON FUNCTION public.admin_set_ai_feature(text, boolean, integer, integer) TO service_role;

-- ===== E — proofs (RAISE EXCEPTION on any failure; a clean apply is the pass) =====
DO $proof$
DECLARE
  v_f        text := 'e2e-mig-' || substr(md5(random()::text || clock_timestamp()::text), 1, 12);
  v_g        jsonb;
  v_r1       jsonb;
  v_r2       jsonb;
  v_r3       jsonb;
  v_r4       jsonb;
  v_g_off    jsonb;
  v_g_back   jsonb;
  v_alerts   integer;
  v_offs     integer;
  v_ons      integer;
  v_day      record;
  v_msg      text;
  v_fn       text;
  v_n        integer;
BEGIN
  -- E1 — the headers: every door SECURITY DEFINER with search_path public.
  FOREACH v_fn IN ARRAY ARRAY['public.ai_feature_gate(text)', 'public.ai_record_spend(text, integer)',
                              'public.admin_ai_features()',
                              'public.admin_set_ai_feature(text, boolean, integer, integer)'] LOOP
    IF NOT EXISTS (SELECT 1 FROM pg_proc WHERE oid = v_fn::regprocedure AND prosecdef
                     AND proconfig @> ARRAY['search_path=public']) THEN
      RAISE EXCEPTION 'proof E1 failed: % is not SECURITY DEFINER with search_path public', v_fn;
    END IF;
  END LOOP;

  -- E2 — the grants: the meter's doors are the service role's alone; the admin doors are signed-in only.
  IF has_function_privilege('anon', 'public.ai_feature_gate(text)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.ai_feature_gate(text)', 'EXECUTE')
     OR has_function_privilege('anon', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR has_function_privilege('authenticated', 'public.ai_record_spend(text, integer)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.ai_feature_gate(text)', 'EXECUTE')
     OR NOT has_function_privilege('service_role', 'public.ai_record_spend(text, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof E2 failed: the meter doors are not service-only';
  END IF;
  IF has_function_privilege('anon', 'public.admin_ai_features()', 'EXECUTE')
     OR has_function_privilege('anon', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_ai_features()', 'EXECUTE')
     OR NOT has_function_privilege('authenticated', 'public.admin_set_ai_feature(text, boolean, integer, integer)', 'EXECUTE') THEN
    RAISE EXCEPTION 'proof E2 failed: the admin doors are not signed-in only';
  END IF;

  -- E3 — the tables are closed to browser roles.
  FOREACH v_fn IN ARRAY ARRAY['public.ai_features', 'public.ai_spend_days'] LOOP
    IF NOT (SELECT relrowsecurity FROM pg_class WHERE oid = v_fn::regclass)
       OR has_table_privilege('anon', v_fn, 'SELECT') OR has_table_privilege('authenticated', v_fn, 'SELECT')
       OR has_table_privilege('authenticated', v_fn, 'INSERT') OR has_table_privilege('authenticated', v_fn, 'UPDATE') THEN
      RAISE EXCEPTION 'proof E3 failed: % is open to a browser role', v_fn;
    END IF;
  END LOOP;

  -- E4 — the seed and the permissions.
  SELECT count(*) INTO v_n FROM public.ai_features
   WHERE feature IN ('photo_screen', 'writing_helper', 'name_check', 'category_images', 'category_icons', 'translations');
  IF v_n <> 6 OR (SELECT unit FROM public.ai_features WHERE feature = 'translations') <> 'character' THEN
    RAISE EXCEPTION 'proof E4 failed: the six features are not seeded (%)', v_n;
  END IF;
  IF (SELECT count(*) FROM public.permissions p JOIN public.resources r ON r.id = p.resource_id
       WHERE r.name = 'services' AND ((p.action = 'view' AND NOT p.requires_step_up)
                                   OR (p.action = 'manage' AND p.requires_step_up))) <> 2 THEN
    RAISE EXCEPTION 'proof E4 failed: services:view and services:manage are not as written';
  END IF;

  -- E5 — the body rules no scratch row can reach: photo screening never switches itself off, and the admin list
  -- leaves test rows out; the admin doors check their permissions and the second factor.
  IF (SELECT prosrc FROM pg_proc WHERE oid = 'public.ai_record_spend(text, integer)'::regprocedure)
       NOT LIKE '%v_level = 100 AND v.enabled AND v.feature <> ''photo_screen''%'
     OR (SELECT prosrc FROM pg_proc WHERE oid = 'public.admin_ai_features()'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''services'', ''view'')%f.feature !~ ''^e2e-''%'
     OR (SELECT prosrc FROM pg_proc WHERE oid = 'public.admin_set_ai_feature(text, boolean, integer, integer)'::regprocedure)
       NOT LIKE '%has_permission(v_uid, ''services'', ''manage'')%require_step_up_if_needed(''services'', ''manage'')%screeningStaysOn%overBudget%INSERT INTO public.audit_log%' THEN
    RAISE EXCEPTION 'proof E5 failed: a door body is not as written';
  END IF;

  -- E6 — no caller, and a caller without the permission (a random id: no such account exists), are refused.
  PERFORM set_config('request.jwt.claims', '', true);
  BEGIN
    PERFORM public.admin_ai_features();
    RAISE EXCEPTION 'proof E6 failed: no caller read the features';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'not authenticated' THEN RAISE EXCEPTION 'proof E6 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims',
                     json_build_object('sub', gen_random_uuid()::text, 'role', 'authenticated')::text, true);
  BEGIN
    PERFORM public.admin_set_ai_feature('writing_helper', false, NULL, 3000);
    RAISE EXCEPTION 'proof E6 failed: a caller without services:manage changed a feature';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'proof E6 failed: %', v_msg; END IF;
  END;
  BEGIN
    PERFORM public.admin_ai_features();
    RAISE EXCEPTION 'proof E6 failed: a caller without services:view read the features';
  EXCEPTION WHEN raise_exception THEN
    GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    IF v_msg <> 'permission denied' THEN RAISE EXCEPTION 'proof E6 failed: %', v_msg; END IF;
  END;
  PERFORM set_config('request.jwt.claims', '', true);

  -- E7 — the meter on a scratch feature: price 1,000 a unit, budget 1 cent (10,000). Everything inside this block
  -- is rolled back at its end (its rows and its audit rows); only the answers, kept in variables, survive.
  BEGIN
    INSERT INTO public.ai_features (feature, unit_cost_microusd, monthly_budget_cents) VALUES (v_f, 1000, 1);
    v_g := public.ai_feature_gate(v_f);
    v_r1 := public.ai_record_spend(v_f, 5);   -- 5,000: half the budget
    v_r2 := public.ai_record_spend(v_f, 3);   -- 8,000: 80 %
    v_r3 := public.ai_record_spend(v_f, 2);   -- 10,000: the budget — off
    v_g_off := public.ai_feature_gate(v_f);
    SELECT calls, units, cost_microusd INTO v_day FROM public.ai_spend_days
     WHERE feature = v_f AND day = (now() AT TIME ZONE 'utc')::date;
    SELECT count(*) FILTER (WHERE action = 'ai.budget_alert'),
           count(*) FILTER (WHERE action = 'ai.budget_off')
      INTO v_alerts, v_offs
      FROM public.audit_log WHERE entity_type = 'ai_feature' AND entity_id = v_f;
    -- A budget-off from an earlier month: the gate reads on, and the next record turns it back on.
    UPDATE public.ai_features SET off_at = now() - interval '40 days', alert_month = NULL WHERE feature = v_f;
    DELETE FROM public.ai_spend_days WHERE feature = v_f;
    v_g_back := public.ai_feature_gate(v_f);
    v_r4 := public.ai_record_spend(v_f, 1);
    SELECT count(*) INTO v_ons FROM public.audit_log
     WHERE entity_type = 'ai_feature' AND entity_id = v_f AND action = 'ai.budget_on';
    BEGIN
      PERFORM public.ai_record_spend(v_f, -1);
      v_msg := 'accepted';
    EXCEPTION WHEN raise_exception THEN
      GET STACKED DIAGNOSTICS v_msg = MESSAGE_TEXT;
    END;
    RAISE EXCEPTION 'proof-rollback';
  EXCEPTION WHEN raise_exception THEN
    IF SQLERRM <> 'proof-rollback' THEN RAISE; END IF;
  END;
  IF (v_g->>'on')::boolean IS NOT TRUE THEN RAISE EXCEPTION 'proof E7 failed: a new feature is not on'; END IF;
  IF (v_r1->>'on')::boolean IS NOT TRUE OR (v_r1->>'alert_level')::int <> 0 OR (v_r1->>'spent_microusd')::bigint <> 5000 THEN
    RAISE EXCEPTION 'proof E7 failed: half the budget %', v_r1;
  END IF;
  IF (v_r2->>'on')::boolean IS NOT TRUE OR (v_r2->>'alert_level')::int <> 80 THEN
    RAISE EXCEPTION 'proof E7 failed: 80 %% %', v_r2;
  END IF;
  IF (v_r3->>'on')::boolean IS NOT FALSE OR (v_r3->>'alert_level')::int <> 100 OR (v_r3->>'spent_microusd')::bigint <> 10000 THEN
    RAISE EXCEPTION 'proof E7 failed: the budget %', v_r3;
  END IF;
  IF (v_g_off->>'on')::boolean IS NOT FALSE OR v_g_off->>'off_reason' <> 'budget' THEN
    RAISE EXCEPTION 'proof E7 failed: the gate after the budget %', v_g_off;
  END IF;
  IF v_day.calls <> 3 OR v_day.units <> 10 OR v_day.cost_microusd <> 10000 THEN
    RAISE EXCEPTION 'proof E7 failed: the day row % % %', v_day.calls, v_day.units, v_day.cost_microusd;
  END IF;
  IF v_alerts <> 2 OR v_offs <> 1 THEN
    RAISE EXCEPTION 'proof E7 failed: % alert rows and % off rows', v_alerts, v_offs;
  END IF;
  IF (v_g_back->>'on')::boolean IS NOT TRUE OR (v_r4->>'on')::boolean IS NOT TRUE OR v_ons <> 1 THEN
    RAISE EXCEPTION 'proof E7 failed: a new month did not bring the feature back (% % %)', v_g_back, v_r4, v_ons;
  END IF;
  IF v_msg <> 'badValue:units' THEN RAISE EXCEPTION 'proof E7 failed: negative units %', v_msg; END IF;
  IF EXISTS (SELECT 1 FROM public.ai_features WHERE feature = v_f)
     OR EXISTS (SELECT 1 FROM public.audit_log WHERE entity_type = 'ai_feature' AND entity_id = v_f) THEN
    RAISE EXCEPTION 'proof E7 failed: the scratch rows outlived the block';
  END IF;
END $proof$;

INSERT INTO public.migration_marks (version) VALUES ('<MARK>') ON CONFLICT (version) DO NOTHING;
----- END MIGRATION -----
```
